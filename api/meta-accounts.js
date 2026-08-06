import { accountCanConnect, decryptToken, fetchAllAdAccounts, graphRequest, revokeMetaAuthorization } from "./_lib/meta.js";
import { requireAdmin, sendError, serviceRequest } from "./_lib/supabase.js";

const DEFAULT_UA_NAMES = ["David", "Tommy", "Nelson"];
// Meta returns overlapping action types for the same event. The omni_* rows
// already aggregate app and web, and the bare "purchase" row can itself repeat
// a pixel or app purchase, so the lists are ordered most-aggregated first and
// only the first match is read. Summing them would double count.
const INSTALL_TYPES = ["omni_app_install", "mobile_app_install"];
const REGISTRATION_TYPES = ["omni_complete_registration", "mobile_app_complete_registration", "app_custom_event.fb_mobile_complete_registration", "offsite_conversion.fb_pixel_complete_registration", "complete_registration"];
const PURCHASE_TYPES = ["omni_purchase", "mobile_app_purchase", "offsite_conversion.fb_pixel_purchase", "purchase"];

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

function pickAction(items, preferredTypes) {
  const values = new Map((items || []).map((item) => [item.action_type, Number(item.value || 0)]));
  for (const type of preferredTypes) if (values.has(type)) return values.get(type) || 0;
  return 0;
}

async function fetchInsightRows(accountId, accessToken, from, to, level) {
  // clicks counts every click on the ad, including likes, comments and profile
  // taps. inline_link_clicks counts only clicks to the destination, which is
  // what CTR and CPC should measure for acquisition.
  const fields = "account_id,account_name,campaign_id,campaign_name,adset_id,adset_name,ad_id,ad_name,date_start,date_stop,spend,impressions,clicks,inline_link_clicks,actions,action_values";
  const params = { level, fields, time_range:JSON.stringify({ since:from, until:to }), time_increment:1, limit:500 };
  let page = await graphRequest(`${accountId}/insights`, accessToken, params);
  const rows = [];
  while (page) {
    rows.push(...(page.data || []));
    const after = page.paging?.next && page.paging?.cursors?.after;
    page = after ? await graphRequest(`${accountId}/insights`, accessToken, { ...params, after }) : null;
  }
  return rows;
}

function normalizedInsightRow(row, account, level) {
  const entity = level === "ad" ? { id:row.ad_id, name:row.ad_name } : level === "adset" ? { id:row.adset_id, name:row.adset_name } : { id:row.campaign_id, name:row.campaign_name };
  return {
    date:row.date_start, entityId:entity.id, entityName:entity.name || entity.id, campaignId:row.campaign_id, campaignName:row.campaign_name || row.campaign_id,
    adsetId:row.adset_id, adsetName:row.adset_name, adId:row.ad_id, adName:row.ad_name, platform:"Meta",
    businessId:account.business_id, business:account.business_name, accountId:account.account_id, account:account.account_name, currency:account.currency,
    spend:Number(row.spend || 0), revenue:pickAction(row.action_values,PURCHASE_TYPES), installs:pickAction(row.actions,INSTALL_TYPES),
    registrations:pickAction(row.actions,REGISTRATION_TYPES), purchases:pickAction(row.actions,PURCHASE_TYPES),
    impressions:Number(row.impressions || 0), clicks:Number(row.clicks || 0),
    linkClicks:Number(row.inline_link_clicks || 0)
  };
}

function aggregateInsights(rows, keyFactory) {
  const grouped = new Map();
  for (const row of rows) {
    const key=keyFactory(row);
    const current=grouped.get(key) || { ...row, spend:0, revenue:0, installs:0, registrations:0, purchases:0, impressions:0, clicks:0, linkClicks:0 };
    for (const metric of ["spend","revenue","installs","registrations","purchases","impressions","clicks","linkClicks"]) current[metric]+=row[metric] || 0;
    grouped.set(key,current);
  }
  return [...grouped.values()];
}

async function handleInsights(userId, query, response) {
  const from=String(query.from || ""), to=String(query.to || "");
  const level=["campaign","adset","ad"].includes(query.level) ? query.level : "campaign";
  if(!/^\d{4}-\d{2}-\d{2}$/.test(from) || !/^\d{4}-\d{2}-\d{2}$/.test(to) || from>to) throw Object.assign(new Error("Khoảng ngày Meta không hợp lệ."),{statusCode:400});
  const dayCount=Math.floor((new Date(`${to}T00:00:00Z`)-new Date(`${from}T00:00:00Z`))/86400000)+1;
  if(dayCount>90) throw Object.assign(new Error("Mỗi lần đồng bộ Meta tối đa 90 ngày."),{statusCode:400});
  const authorization=await getAuthorization(userId);
  if(!authorization) throw Object.assign(new Error("Chưa kết nối Meta hoặc phiên Meta cần xác thực lại."),{statusCode:409});
  let accounts=await serviceRequest(`/rest/v1/meta_ad_accounts?authorization_id=eq.${encodeURIComponent(authorization.id)}&selected=eq.true&select=account_id,account_name,business_id,business_name,currency,timezone_name`);
  if(query.business && query.business!=="all") accounts=accounts.filter(account=>account.business_id===query.business);
  if(query.account && query.account!=="all") accounts=accounts.filter(account=>account.account_id===query.account);
  if(!accounts.length) throw Object.assign(new Error("Không có tài khoản Meta trong phạm vi đã chọn."),{statusCode:404});
  const token=decryptToken(authorization.encrypted_access_token);
  const results=await Promise.allSettled(accounts.map(async account=>(await fetchInsightRows(account.account_id,token,from,to,level)).map(row=>normalizedInsightRow(row,account,level))));
  const rows=results.flatMap(result=>result.status==="fulfilled"?result.value:[]);
  const errors=results.flatMap((result,index)=>result.status==="rejected"?[{account:accounts[index].account_name,message:result.reason?.message || "Meta API error"}]:[]);
  if(!rows.length && errors.length===accounts.length) throw Object.assign(new Error(errors[0].message),{statusCode:502});
  const campaigns=aggregateInsights(rows,row=>`${row.accountId}:${row.entityId}`).map(row=>({
    ...row, cpi:row.installs?row.spend/row.installs:0, roas:row.spend?row.revenue/row.spend:0,
    // CTR and CVR use link clicks so engagement clicks do not distort them.
    ctr:row.impressions?(row.linkClicks||row.clicks)/row.impressions*100:0,
    cvr:(row.linkClicks||row.clicks)?row.installs/(row.linkClicks||row.clicks)*100:0,
    status:"Meta live", trend:"up", market:row.account
  })).sort((a,b)=>b.spend-a.spend);
  const daily=aggregateInsights(rows,row=>row.date).map(row=>({date:row.date,spend:row.spend,revenue:row.revenue,installs:row.installs,registrations:row.registrations,purchases:row.purchases})).sort((a,b)=>a.date.localeCompare(b.date));
  const currencies=[...new Set(accounts.map(account=>account.currency))];
  response.setHeader("Cache-Control","no-store");
  return response.status(200).json({source:"meta",level,from,to,currency:currencies.length===1?currencies[0]:"MIXED",accounts:accounts.map(account=>({id:account.account_id,name:account.account_name,businessId:account.business_id,businessName:account.business_name,currency:account.currency,timezone:account.timezone_name})),campaigns,daily,partialErrors:errors,syncedAt:new Date().toISOString()});
}

export default async function handler(request, response) {
  try {
    const { user } = await requireAdmin(request);
    if (request.method === "GET") {
      // Awaited so validation/API errors reach sendError instead of rejecting unhandled.
      if (request.query.mode === "insights") return await handleInsights(user.id, request.query, response);
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
