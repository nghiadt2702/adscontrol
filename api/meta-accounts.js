import { accountCanConnect, decryptToken, fetchAllAdAccounts, revokeMetaAuthorization } from "./_lib/meta.js";
import { requireAdmin, sendError, serviceRequest } from "./_lib/supabase.js";

const DEFAULT_UA_NAMES = ["David", "Tommy", "Nelson"];

function uaNames() {
  return (process.env.UA_DEFAULT_NAMES || DEFAULT_UA_NAMES.join(","))
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean);
}

async function getAuthorization(userId) {
  const rows = await serviceRequest(`/rest/v1/meta_authorizations?user_id=eq.${encodeURIComponent(userId)}&select=*`);
  return rows[0] || null;
}

async function loadAccounts(userId) {
  const authorization = await getAuthorization(userId);
  if (!authorization) return { authorization: null, accounts: [] };
  try {
    const accounts = await fetchAllAdAccounts(decryptToken(authorization.encrypted_access_token));
    const saved = await serviceRequest(
      `/rest/v1/meta_ad_accounts?authorization_id=eq.${encodeURIComponent(authorization.id)}&select=account_id,selected,assigned_ua_name`
    );
    const savedById = new Map(saved.map((item) => [item.account_id, item]));
    return {
      authorization,
      accounts: accounts.map((account) => ({
        ...account,
        canConnect: accountCanConnect(account),
        selected: Boolean(savedById.get(account.id)?.selected),
        assignedUa: savedById.get(account.id)?.assigned_ua_name || ""
      }))
    };
  } catch (error) {
    await serviceRequest(`/rest/v1/meta_authorizations?id=eq.${encodeURIComponent(authorization.id)}`, {
      method: "PATCH",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({ status: "reauth_required", last_error: error.message, updated_at: new Date().toISOString() })
    });
    throw Object.assign(new Error("Phiên Meta đã hết hạn hoặc bị thu hồi. Vui lòng kết nối lại."), { statusCode: 401 });
  }
}

export default async function handler(request, response) {
  try {
    const { user } = await requireAdmin(request);
    if (request.method === "GET") {
      const { authorization, accounts } = await loadAccounts(user.id);
      response.setHeader("Cache-Control", "no-store");
      return response.status(200).json({
        connected: Boolean(authorization),
        identity: authorization ? { name: authorization.external_user_name, status: authorization.status, expiresAt: authorization.token_expires_at } : null,
        uaNames: uaNames(),
        accounts
      });
    }
    if (request.method === "DELETE") {
      const authorization = await getAuthorization(user.id);
      if (authorization) {
        const linked = await serviceRequest(`/rest/v1/meta_ad_accounts?authorization_id=eq.${encodeURIComponent(authorization.id)}&selected=eq.true&select=account_id`);
        for (const item of linked) {
          await serviceRequest(`/rest/v1/user_assignments?platform=eq.meta&external_account_id=eq.${encodeURIComponent(item.account_id)}`, { method: "DELETE", headers: { Prefer: "return=minimal" } });
          await serviceRequest(`/rest/v1/platform_connections?platform=eq.meta&external_account_id=eq.${encodeURIComponent(item.account_id)}`, { method: "DELETE", headers: { Prefer: "return=minimal" } });
        }
        try { await revokeMetaAuthorization(decryptToken(authorization.encrypted_access_token)); } catch (_) {}
        await serviceRequest(`/rest/v1/meta_authorizations?id=eq.${encodeURIComponent(authorization.id)}`, { method: "DELETE", headers: { Prefer: "return=minimal" } });
      }
      return response.status(200).json({ disconnected: true });
    }
    if (request.method !== "POST") {
      response.setHeader("Allow", "GET, POST, DELETE");
      return response.status(405).json({ error: "Method not allowed" });
    }

    const { authorization, accounts } = await loadAccounts(user.id);
    if (!authorization) throw Object.assign(new Error("Chưa kết nối Facebook với workspace."), { statusCode: 409 });
    const requested = Array.isArray(request.body?.accounts) ? request.body.accounts : [];
    const available = new Map(accounts.map((account) => [account.id, account]));
    const allowedUa = new Set(uaNames());
    const selections = requested.map((item) => {
      const account = available.get(String(item.id));
      if (!account || !account.canConnect) throw Object.assign(new Error("Danh sách ad account có tài khoản không hợp lệ."), { statusCode: 400 });
      const assignedUa = allowedUa.has(item.assignedUa) ? item.assignedUa : null;
      return { account, assignedUa };
    });
    const selectedIds = new Set(selections.map(({ account }) => account.id));
    const accountRows = accounts.map((account) => ({
      authorization_id: authorization.id,
      account_id: account.id,
      account_name: account.name,
      business_id: account.business.id,
      business_name: account.business.name,
      currency: account.currency,
      timezone_name: account.timezone,
      account_status: account.status,
      selected: selectedIds.has(account.id),
      assigned_ua_name: selections.find((item) => item.account.id === account.id)?.assignedUa || null,
      updated_at: new Date().toISOString()
    }));
    await serviceRequest("/rest/v1/meta_ad_accounts?on_conflict=authorization_id,account_id", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify(accountRows)
    });

    for (const { account, assignedUa } of selections) {
      await serviceRequest("/rest/v1/platform_connections?on_conflict=platform,external_account_id", {
        method: "POST",
        headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
        body: JSON.stringify({
          platform: "meta",
          display_name: account.name,
          external_account_id: account.id,
          status: "connected",
          last_error: null,
          created_by: user.id
        })
      });
      if (assignedUa) {
        const profiles = await serviceRequest(`/rest/v1/profiles?full_name=ilike.${encodeURIComponent(assignedUa)}&select=user_id&limit=1`);
        if (profiles[0]) {
          await serviceRequest("/rest/v1/user_assignments?on_conflict=user_id,platform,external_account_id,external_campaign_id", {
            method: "POST",
            headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
            body: JSON.stringify({ user_id: profiles[0].user_id, platform: "meta", external_account_id: account.id, assigned_by: user.id })
          });
        }
      }
    }
    const deselected = accounts.filter((account) => !selectedIds.has(account.id) && account.selected).map((account) => account.id);
    for (const accountId of deselected) {
      await serviceRequest(`/rest/v1/platform_connections?platform=eq.meta&external_account_id=eq.${encodeURIComponent(accountId)}`, { method: "DELETE", headers: { Prefer: "return=minimal" } });
      await serviceRequest(`/rest/v1/user_assignments?platform=eq.meta&external_account_id=eq.${encodeURIComponent(accountId)}`, { method: "DELETE", headers: { Prefer: "return=minimal" } });
    }
    response.status(200).json({ saved: selections.length });
  } catch (error) {
    sendError(response, error);
  }
}
