import { decryptGoogleToken, encryptGoogleToken, fetchGoogleAdAccounts, googleAdsRequest, normalizeGoogleCustomerId, refreshGoogleAccessToken, revokeGoogleAuthorization } from "./_lib/google.js";
import { requireAdmin, sendError, serviceRequest } from "./_lib/supabase.js";

const DEFAULT_UA_NAMES = ["David", "Tommy", "Nelson"];

function uaNames() {
  return (process.env.UA_DEFAULT_NAMES || DEFAULT_UA_NAMES.join(",")).split(",").map((name) => name.trim()).filter(Boolean);
}

async function getAuthorization(userId) {
  const rows = await serviceRequest(`/rest/v1/google_authorizations?user_id=eq.${encodeURIComponent(userId)}&select=*`);
  return rows[0] || null;
}

async function activeAccessToken(authorization) {
  const expiresAt = authorization.token_expires_at ? new Date(authorization.token_expires_at).getTime() : 0;
  if (expiresAt > Date.now() + 5 * 60 * 1000) return decryptGoogleToken(authorization.encrypted_access_token);
  const refreshed = await refreshGoogleAccessToken(decryptGoogleToken(authorization.encrypted_refresh_token));
  const nextExpiry = new Date(Date.now() + Number(refreshed.expires_in || 3600) * 1000).toISOString();
  await serviceRequest(`/rest/v1/google_authorizations?id=eq.${encodeURIComponent(authorization.id)}`, {
    method: "PATCH", headers: { Prefer: "return=minimal" },
    body: JSON.stringify({ encrypted_access_token: encryptGoogleToken(refreshed.access_token), token_expires_at: nextExpiry, status: "active", last_error: null, updated_at: new Date().toISOString() })
  });
  return refreshed.access_token;
}

async function loadAccounts(userId) {
  const authorization = await getAuthorization(userId);
  if (!authorization) return { authorization: null, accounts: [] };
  try {
    const accounts = await fetchGoogleAdAccounts(await activeAccessToken(authorization));
    const saved = await serviceRequest(`/rest/v1/google_ad_accounts?authorization_id=eq.${encodeURIComponent(authorization.id)}&select=account_id,selected,assigned_ua_name`);
    const savedById = new Map(saved.map((item) => [item.account_id, item]));
    return { authorization, accounts: accounts.map((account) => ({ ...account, selected: Boolean(savedById.get(account.id)?.selected), assignedUa: savedById.get(account.id)?.assigned_ua_name || "" })) };
  } catch (error) {
    await serviceRequest(`/rest/v1/google_authorizations?id=eq.${encodeURIComponent(authorization.id)}`, {
      method: "PATCH", headers: { Prefer: "return=minimal" },
      body: JSON.stringify({ status: "reauth_required", last_error: error.message, updated_at: new Date().toISOString() })
    });
    throw Object.assign(new Error("Không thể đọc Google Ads. Kiểm tra Developer Token, quyền truy cập Google Ads hoặc kết nối lại."), { statusCode: 502 });
  }
}

function metricNumber(value) { return Number(value || 0); }

function insightQuery(level, from, to) {
  const base = "segments.date, customer.id, customer.descriptive_name, customer.currency_code, campaign.id, campaign.name, campaign.status, campaign_budget.amount_micros, metrics.cost_micros, metrics.impressions, metrics.clicks, metrics.conversions, metrics.conversions_value";
  if (level === "adgroup") return `SELECT ${base}, ad_group.id, ad_group.name, ad_group.status FROM ad_group WHERE segments.date BETWEEN '${from}' AND '${to}'`;
  if (level === "ad") return `SELECT ${base}, ad_group.id, ad_group.name, ad_group_ad.ad.id, ad_group_ad.ad.name, ad_group_ad.status FROM ad_group_ad WHERE segments.date BETWEEN '${from}' AND '${to}'`;
  return `SELECT ${base} FROM campaign WHERE segments.date BETWEEN '${from}' AND '${to}'`;
}

function normalizedInsight(row, account, level) {
  const campaign = row.campaign || {};
  const adGroup = row.adGroup || {};
  const ad = row.adGroupAd?.ad || {};
  const entity = level === "ad" ? ad : level === "adgroup" ? adGroup : campaign;
  const metrics = row.metrics || {};
  return {
    date: row.segments?.date, entityId: String(entity.id || campaign.id), entityName: entity.name || String(entity.id || campaign.id),
    campaignId: String(campaign.id || ""), campaignName: campaign.name || String(campaign.id || ""), adsetId: adGroup.id ? String(adGroup.id) : "", adsetName: adGroup.name || "",
    adId: ad.id ? String(ad.id) : "", adName: ad.name || "", platform: "Google", businessId: account.manager_account_id || account.account_id,
    business: account.manager_account_name || "Google Ads direct", accountId: account.account_id, account: account.account_name, currency: account.currency,
    spend: metricNumber(metrics.costMicros) / 1e6, revenue: metricNumber(metrics.conversionsValue), installs: metricNumber(metrics.conversions),
    registrations: metricNumber(metrics.conversions), purchases: 0, impressions: metricNumber(metrics.impressions), clicks: metricNumber(metrics.clicks),
    status: entity.status || campaign.status || "UNKNOWN", budget: metricNumber(row.campaignBudget?.amountMicros) / 1e6
  };
}

function aggregate(rows, keyFactory) {
  const map = new Map();
  for (const row of rows) {
    const key = keyFactory(row);
    const current = map.get(key) || { ...row, spend: 0, revenue: 0, installs: 0, registrations: 0, purchases: 0, impressions: 0, clicks: 0 };
    ["spend", "revenue", "installs", "registrations", "purchases", "impressions", "clicks"].forEach((metric) => { current[metric] += row[metric]; });
    map.set(key, current);
  }
  return [...map.values()];
}

async function handleInsights(userId, query, response) {
  const from = String(query.from || ""), to = String(query.to || "");
  const level = ["campaign", "adgroup", "ad"].includes(query.level) ? query.level : "campaign";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(from) || !/^\d{4}-\d{2}-\d{2}$/.test(to) || from > to) throw Object.assign(new Error("Khoảng ngày Google Ads không hợp lệ."), { statusCode: 400 });
  const days = Math.floor((new Date(`${to}T00:00:00Z`) - new Date(`${from}T00:00:00Z`)) / 86400000) + 1;
  if (days > 90) throw Object.assign(new Error("Mỗi lần đồng bộ Google Ads tối đa 90 ngày."), { statusCode: 400 });
  const authorization = await getAuthorization(userId);
  if (!authorization) throw Object.assign(new Error("Chưa kết nối Google Ads hoặc phiên cần xác thực lại."), { statusCode: 409 });
  let accounts = await serviceRequest(`/rest/v1/google_ad_accounts?authorization_id=eq.${encodeURIComponent(authorization.id)}&selected=eq.true&select=account_id,account_name,manager_account_id,manager_account_name,currency,timezone_name`);
  if (query.business && query.business !== "all") accounts = accounts.filter((account) => (account.manager_account_id || account.account_id) === query.business);
  if (query.account && query.account !== "all") accounts = accounts.filter((account) => account.account_id === normalizeGoogleCustomerId(query.account));
  if (!accounts.length) throw Object.assign(new Error("Không có Google Ads account trong phạm vi đã chọn."), { statusCode: 404 });
  const accessToken = await activeAccessToken(authorization);
  const results = await Promise.allSettled(accounts.map(async (account) => {
    const responseBody = await googleAdsRequest(`customers/${normalizeGoogleCustomerId(account.account_id)}/googleAds:searchStream`, accessToken, {
      method: "POST", loginCustomerId: account.manager_account_id || undefined, body: { query: insightQuery(level, from, to) }
    });
    return responseBody.flatMap((chunk) => chunk.results || []).map((row) => normalizedInsight(row, account, level));
  }));
  const rows = results.flatMap((item) => item.status === "fulfilled" ? item.value : []);
  const partialErrors = results.flatMap((item, index) => item.status === "rejected" ? [{ account: accounts[index].account_name, message: item.reason?.message || "Google Ads API error" }] : []);
  if (!rows.length && partialErrors.length === accounts.length) throw Object.assign(new Error(partialErrors[0].message), { statusCode: 502 });
  const campaigns = aggregate(rows, (row) => `${row.accountId}:${row.entityId}`).map((row) => ({
    ...row, cpi: row.installs ? row.spend / row.installs : 0, roas: row.spend ? row.revenue / row.spend : 0,
    ctr: row.impressions ? row.clicks / row.impressions * 100 : 0, cvr: row.clicks ? row.installs / row.clicks * 100 : 0,
    trend: "up", market: row.account, sourceMetric: "Google Ads conversions"
  })).sort((a, b) => b.spend - a.spend);
  const daily = aggregate(rows, (row) => row.date).map((row) => ({ date: row.date, spend: row.spend, revenue: row.revenue, installs: row.installs, registrations: row.registrations })).sort((a, b) => a.date.localeCompare(b.date));
  response.setHeader("Cache-Control", "no-store");
  return response.status(200).json({ source: "google", level, from, to, currency: [...new Set(accounts.map((account) => account.currency))].length === 1 ? accounts[0].currency : "MIXED", accounts: accounts.map((account) => ({ id: account.account_id, name: account.account_name, businessId: account.manager_account_id || account.account_id, businessName: account.manager_account_name || "Google Ads direct", currency: account.currency, timezone: account.timezone_name })), campaigns, daily, partialErrors, syncedAt: new Date().toISOString() });
}

export default async function handler(request, response) {
  try {
    const { user } = await requireAdmin(request);
    if (request.method === "GET") {
      if (request.query.mode === "insights") return handleInsights(user.id, request.query, response);
      const { authorization, accounts } = await loadAccounts(user.id);
      response.setHeader("Cache-Control", "no-store");
      return response.status(200).json({
        connected: Boolean(authorization),
        identity: authorization ? { name: authorization.external_user_name, email: authorization.external_user_email, status: authorization.status, expiresAt: authorization.token_expires_at } : null,
        uaNames: uaNames(), accounts
      });
    }
    if (request.method === "DELETE") {
      const authorization = await getAuthorization(user.id);
      if (authorization) {
        const linked = await serviceRequest(`/rest/v1/google_ad_accounts?authorization_id=eq.${encodeURIComponent(authorization.id)}&selected=eq.true&select=account_id`);
        for (const item of linked) {
          await serviceRequest(`/rest/v1/user_assignments?platform=eq.google&external_account_id=eq.${encodeURIComponent(item.account_id)}`, { method: "DELETE", headers: { Prefer: "return=minimal" } });
          await serviceRequest(`/rest/v1/platform_connections?platform=eq.google&external_account_id=eq.${encodeURIComponent(item.account_id)}`, { method: "DELETE", headers: { Prefer: "return=minimal" } });
        }
        try { await revokeGoogleAuthorization(decryptGoogleToken(authorization.encrypted_refresh_token)); } catch (_) {}
        await serviceRequest(`/rest/v1/google_authorizations?id=eq.${encodeURIComponent(authorization.id)}`, { method: "DELETE", headers: { Prefer: "return=minimal" } });
      }
      return response.status(200).json({ disconnected: true });
    }
    if (request.method !== "POST") {
      response.setHeader("Allow", "GET, POST, DELETE");
      return response.status(405).json({ error: "Method not allowed" });
    }
    const { authorization, accounts } = await loadAccounts(user.id);
    if (!authorization) throw Object.assign(new Error("Chưa kết nối Google với workspace."), { statusCode: 409 });
    const requested = Array.isArray(request.body?.accounts) ? request.body.accounts : [];
    const available = new Map(accounts.map((account) => [account.id, account]));
    const allowedUa = new Set(uaNames());
    const selections = requested.map((item) => {
      const account = available.get(normalizeGoogleCustomerId(item.id));
      if (!account?.canConnect) throw Object.assign(new Error("Danh sách Google Ads có tài khoản không hợp lệ."), { statusCode: 400 });
      return { account, assignedUa: allowedUa.has(item.assignedUa) ? item.assignedUa : null };
    });
    const selectedIds = new Set(selections.map(({ account }) => account.id));
    await serviceRequest("/rest/v1/google_ad_accounts?on_conflict=authorization_id,account_id", {
      method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify(accounts.map((account) => ({
        authorization_id: authorization.id, account_id: account.id, account_name: account.name,
        manager_account_id: account.managerId || null, manager_account_name: account.business?.name || null,
        currency: account.currency, timezone_name: account.timezone, account_status: account.status,
        selected: selectedIds.has(account.id), assigned_ua_name: selections.find((item) => item.account.id === account.id)?.assignedUa || null, updated_at: new Date().toISOString()
      })))
    });
    for (const { account, assignedUa } of selections) {
      await serviceRequest("/rest/v1/platform_connections?on_conflict=platform,external_account_id", {
        method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
        body: JSON.stringify({ platform: "google", display_name: account.name, external_account_id: account.id, status: "connected", last_error: null, created_by: user.id })
      });
      if (assignedUa) {
        const profiles = await serviceRequest(`/rest/v1/profiles?full_name=ilike.${encodeURIComponent(assignedUa)}&select=user_id&limit=1`);
        if (profiles[0]) await serviceRequest("/rest/v1/user_assignments?on_conflict=user_id,platform,external_account_id,external_campaign_id", {
          method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
          body: JSON.stringify({ user_id: profiles[0].user_id, platform: "google", external_account_id: account.id, assigned_by: user.id })
        });
      }
    }
    for (const account of accounts.filter((item) => !selectedIds.has(item.id) && item.selected)) {
      await serviceRequest(`/rest/v1/platform_connections?platform=eq.google&external_account_id=eq.${encodeURIComponent(account.id)}`, { method: "DELETE", headers: { Prefer: "return=minimal" } });
      await serviceRequest(`/rest/v1/user_assignments?platform=eq.google&external_account_id=eq.${encodeURIComponent(account.id)}`, { method: "DELETE", headers: { Prefer: "return=minimal" } });
    }
    return response.status(200).json({ saved: selections.length });
  } catch (error) {
    return sendError(response, error);
  }
}
