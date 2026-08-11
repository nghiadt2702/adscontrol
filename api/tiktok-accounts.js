import { buildTiktokLoginUrl, decryptTiktokToken, encryptTiktokToken, exchangeTiktokAuthCode, fetchTiktokAdvertisers, fetchTiktokAudienceInsights, fetchTiktokCampaignStatuses, fetchTiktokInsights, fetchTiktokRegions, normalizeTiktokAdvertiserId, normalizeTiktokInsight, tiktokReportLevel, updateTiktokCampaignStatus, verifyTiktokOauthState } from "./_lib/tiktok.js";
import {
  getWorkspaceOwnerId,
  requireOwner,
  requireWorkspaceEditor,
  requireWorkspaceViewer,
  sendError,
  serviceRequest
} from "./_lib/supabase.js";

const DEFAULT_UA_NAMES = ["David", "Tommy", "Nelson"];

function uaNames() {
  return (process.env.UA_DEFAULT_NAMES || DEFAULT_UA_NAMES.join(",")).split(",").map((name) => name.trim()).filter(Boolean);
}

async function getAuthorization(userId) {
  const rows = await serviceRequest(`/rest/v1/tiktok_authorizations?user_id=eq.${encodeURIComponent(userId)}&select=*`);
  return rows[0] || null;
}

async function loadAccounts(userId) {
  const authorization = await getAuthorization(userId);
  if (!authorization) return { authorization: null, accounts: [] };
  try {
    const accounts = await fetchTiktokAdvertisers(decryptTiktokToken(authorization.encrypted_access_token));
    const saved = await serviceRequest(`/rest/v1/tiktok_ad_accounts?authorization_id=eq.${encodeURIComponent(authorization.id)}&select=account_id,selected,assigned_ua_name`);
    const savedById = new Map(saved.map((item) => [item.account_id, item]));
    return {
      authorization,
      accounts: accounts.map((account) => ({
        ...account,
        selected: Boolean(savedById.get(account.id)?.selected),
        assignedUa: savedById.get(account.id)?.assigned_ua_name || ""
      }))
    };
  } catch (error) {
    await serviceRequest(`/rest/v1/tiktok_authorizations?id=eq.${encodeURIComponent(authorization.id)}`, {
      method: "PATCH", headers: { Prefer: "return=minimal" },
      body: JSON.stringify({ status: "reauth_required", last_error: error.message, updated_at: new Date().toISOString() })
    });
    throw Object.assign(new Error("Phiên TikTok đã hết hạn hoặc bị thu hồi. Vui lòng kết nối lại."), { statusCode: 401 });
  }
}

function aggregate(rows, keyFactory) {
  const map = new Map();
  for (const row of rows) {
    const key = keyFactory(row);
    const current = map.get(key) || { ...row, spend: 0, revenue: 0, installs: 0, registrations: 0, purchases: 0, conversions: 0, impressions: 0, clicks: 0, detail: { ...row.detail, openingViews: 0, midpointViews: 0, openingAvailable: false, midpointAvailable: false } };
    ["spend", "revenue", "installs", "registrations", "purchases", "conversions", "impressions", "clicks"].forEach((metric) => { current[metric] += row[metric] || 0; });
    current.detail.openingViews += row.detail?.openingViews || 0;
    current.detail.midpointViews += row.detail?.midpointViews || 0;
    current.detail.openingAvailable ||= Boolean(row.detail?.openingAvailable);
    current.detail.midpointAvailable ||= Boolean(row.detail?.midpointAvailable);
    map.set(key, current);
  }
  return [...map.values()];
}

async function handleInsights(userId, query, response) {
  const from = String(query.from || ""), to = String(query.to || "");
  // The workspace uses Meta wording (adset); TikTok calls the same level adgroup.
  const requestedLevel = query.level === "adset" ? "adgroup" : String(query.level || "campaign");
  const level = tiktokReportLevel(requestedLevel);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(from) || !/^\d{4}-\d{2}-\d{2}$/.test(to) || from > to) {
    throw Object.assign(new Error("Khoảng ngày TikTok Ads không hợp lệ."), { statusCode: 400 });
  }
  const days = Math.floor((new Date(`${to}T00:00:00Z`) - new Date(`${from}T00:00:00Z`)) / 86400000) + 1;
  if (days > 90) throw Object.assign(new Error("Mỗi lần đồng bộ TikTok Ads tối đa 90 ngày."), { statusCode: 400 });

  const authorization = await getAuthorization(userId);
  if (!authorization) throw Object.assign(new Error("Chưa kết nối TikTok Ads hoặc phiên cần xác thực lại."), { statusCode: 409 });
  let accounts = await serviceRequest(`/rest/v1/tiktok_ad_accounts?authorization_id=eq.${encodeURIComponent(authorization.id)}&selected=eq.true&select=account_id,account_name,business_center_id,business_center_name,currency,timezone_name`);
  if (query.business && query.business !== "all") accounts = accounts.filter((account) => (account.business_center_id || account.account_id) === query.business);
  if (query.account && query.account !== "all") accounts = accounts.filter((account) => account.account_id === normalizeTiktokAdvertiserId(query.account));
  if (!accounts.length) throw Object.assign(new Error("Không có TikTok advertiser trong phạm vi đã chọn."), { statusCode: 404 });

  const accessToken = decryptTiktokToken(authorization.encrypted_access_token);
  const results = await Promise.allSettled(accounts.map(async (account) => {
    const rows = await fetchTiktokInsights({ accessToken, advertiserId: account.account_id, level, from, to });
    const normalized = rows.map((row) => normalizeTiktokInsight(row, account, level));
    let statuses = new Map();
    try {
      statuses = await fetchTiktokCampaignStatuses({
        accessToken,
        advertiserId: account.account_id,
        campaignIds: normalized.map((row) => row.campaignId)
      });
    } catch (error) {
      // Delivery data remains valid when the app has reporting permission but
      // campaign-management permission is still pending. Keep those metrics and
      // expose status as UNKNOWN instead of blanking the whole advertiser.
      console.error(`TikTok campaign status unavailable for ${account.account_name}`, error.message);
    }
    return normalized.map((row) => ({
      ...row,
      configuredStatus: statuses.get(String(row.campaignId))?.configuredStatus || "UNKNOWN",
      status: statuses.get(String(row.campaignId))?.effectiveStatus || "UNKNOWN"
    }));
  }));
  const rows = results.flatMap((item) => item.status === "fulfilled" ? item.value : []);
  const partialErrors = results.flatMap((item, index) => item.status === "rejected"
    ? [{ account: accounts[index].account_name, message: item.reason?.message || "TikTok Ads API error" }]
    : []);
  if (!rows.length && partialErrors.length === accounts.length) throw Object.assign(new Error(partialErrors[0].message), { statusCode: 502 });

  const campaigns = aggregate(rows, (row) => `${row.accountId}:${row.entityId}`).map((row) => ({
    ...row,
    cpi: row.installs ? row.spend / row.installs : 0,
    roas: row.spend ? row.revenue / row.spend : 0,
    ctr: row.impressions ? row.clicks / row.impressions * 100 : 0,
    // Total conversions, since a TikTok advertiser may optimise for purchase or
    // registration without running app installs at all.
    cvr: row.clicks ? row.conversions / row.clicks * 100 : 0,
    detail: {
      ...row.detail,
      hookRate: row.impressions && row.detail.openingAvailable ? row.detail.openingViews / row.impressions * 100 : null,
      holdRate: row.detail.openingViews && row.detail.midpointAvailable ? row.detail.midpointViews / row.detail.openingViews * 100 : null
    },
    status: row.status || "UNKNOWN", configuredStatus: row.configuredStatus || "UNKNOWN",
    trend: "up", market: row.account, sourceMetric: "TikTok integrated report"
  })).sort((a, b) => b.spend - a.spend);
  const daily = aggregate(rows, (row) => row.date)
    .map((row) => ({ date: row.date, spend: row.spend, revenue: row.revenue, installs: row.installs, registrations: row.registrations, purchases: row.purchases }))
    .sort((a, b) => a.date.localeCompare(b.date));
  const currencies = [...new Set(accounts.map((account) => account.currency))];

  response.setHeader("Cache-Control", "no-store");
  return response.status(200).json({
    source: "tiktok", level, from, to,
    currency: currencies.length === 1 ? currencies[0] : "MIXED",
    accounts: accounts.map((account) => ({
      id: account.account_id, name: account.account_name,
      businessId: account.business_center_id || account.account_id,
      businessName: account.business_center_name || "TikTok direct",
      currency: account.currency, timezone: account.timezone_name
    })),
    campaigns, daily, partialErrors, syncedAt: new Date().toISOString()
  });
}

async function handleCampaignStatus(request, response) {
  const { user, profile } = await requireWorkspaceEditor(request);
  const ownerId = profile.role === "owner" ? user.id : await getWorkspaceOwnerId();
  const accountId = normalizeTiktokAdvertiserId(request.body?.accountId);
  const campaignId = normalizeTiktokAdvertiserId(request.body?.campaignId);
  const active = request.body?.active;
  if (!accountId || !campaignId || typeof active !== "boolean") {
    throw Object.assign(new Error("Yêu cầu cập nhật campaign TikTok không hợp lệ."), { statusCode: 400 });
  }
  const authorization = await getAuthorization(ownerId);
  if (!authorization) throw Object.assign(new Error("Chưa kết nối TikTok Ads với workspace."), { statusCode: 409 });
  const selected = await serviceRequest(`/rest/v1/tiktok_ad_accounts?authorization_id=eq.${encodeURIComponent(authorization.id)}&account_id=eq.${encodeURIComponent(accountId)}&selected=eq.true&select=account_id&limit=1`);
  if (!selected.length) throw Object.assign(new Error("Campaign không thuộc advertiser TikTok được chia sẻ trong workspace."), { statusCode: 403 });
  const current = await updateTiktokCampaignStatus({
    accessToken: decryptTiktokToken(authorization.encrypted_access_token),
    advertiserId: accountId,
    campaignId,
    active
  });
  response.setHeader("Cache-Control", "no-store");
  return response.status(200).json({
    campaignId,
    ...current,
    active: current.configuredStatus === "ENABLE"
  });
}

const TIKTOK_AUDIENCE_DIMENSIONS = {
  age: "age",
  gender: "gender",
  platform: "device",
  country_code: "country",
  province_id: "region"
};

function normalizeTiktokBreakdown(row, account, sourceDimension, regionNames = new Map()) {
  const dimensions = row.dimensions || {};
  const metrics = row.metrics || {};
  const rawKey = String(dimensions[sourceDimension] ?? "unknown");
  const targetDimension = TIKTOK_AUDIENCE_DIMENSIONS[sourceDimension];
  const labels = {
    MALE: "Nam", FEMALE: "Nữ", UNKNOWN: "Không xác định",
    AGE_13_17: "13–17", AGE_18_24: "18–24", AGE_25_34: "25–34",
    AGE_35_44: "35–44", AGE_45_54: "45–54", AGE_55_100: "55+"
  };
  return {
    platform: "TikTok", dimension: targetDimension, key: rawKey, label: regionNames.get(rawKey) || labels[rawKey] || rawKey,
    accountId: account.account_id, account: account.account_name,
    campaignId: String(dimensions.campaign_id || ""), campaignName: String(dimensions.campaign_id || ""),
    currency: account.currency, spend: Number(metrics.spend || 0),
    impressions: Number(metrics.impressions || 0), clicks: Number(metrics.clicks || 0)
  };
}

async function handleBreakdowns(userId, query, response) {
  const from = String(query.from || ""), to = String(query.to || "");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(from) || !/^\d{4}-\d{2}-\d{2}$/.test(to) || from > to) throw Object.assign(new Error("Khoảng ngày TikTok Ads không hợp lệ."), { statusCode: 400 });
  const days = Math.floor((new Date(`${to}T00:00:00Z`) - new Date(`${from}T00:00:00Z`)) / 86400000) + 1;
  if (days > 90) throw Object.assign(new Error("Mỗi lần đồng bộ TikTok Ads tối đa 90 ngày."), { statusCode: 400 });
  const authorization = await getAuthorization(userId);
  if (!authorization) throw Object.assign(new Error("Chưa kết nối TikTok Ads hoặc phiên cần xác thực lại."), { statusCode: 409 });
  let accounts = await serviceRequest(`/rest/v1/tiktok_ad_accounts?authorization_id=eq.${encodeURIComponent(authorization.id)}&selected=eq.true&select=account_id,account_name,business_center_id,business_center_name,currency,timezone_name`);
  if (query.business && query.business !== "all") accounts = accounts.filter((account) => (account.business_center_id || account.account_id) === query.business);
  if (query.account && query.account !== "all") accounts = accounts.filter((account) => account.account_id === normalizeTiktokAdvertiserId(query.account));
  if (!accounts.length) throw Object.assign(new Error("Không có TikTok advertiser trong phạm vi đã chọn."), { statusCode: 404 });
  const accessToken = decryptTiktokToken(authorization.encrypted_access_token);
  const dimensions = Object.keys(TIKTOK_AUDIENCE_DIMENSIONS);
  const tasks = accounts.flatMap((account) => dimensions.map((dimension) => ({ account, dimension })));
  const results = await Promise.allSettled(tasks.map(async ({ account, dimension }) => {
    const [rows, regionNames] = await Promise.all([
      fetchTiktokAudienceInsights({ accessToken, advertiserId: account.account_id, dimension, from, to }),
      dimension === "province_id" ? fetchTiktokRegions({ accessToken, advertiserId: account.account_id }) : Promise.resolve(new Map())
    ]);
    return rows.map((row) => normalizeTiktokBreakdown(row, account, dimension, regionNames));
  }));
  const breakdowns = { age: [], gender: [], device: [], country: [], region: [] };
  const partialErrors = [];
  results.forEach((result, index) => {
    const task = tasks[index];
    if (result.status === "fulfilled") result.value.forEach((row) => breakdowns[row.dimension].push(row));
    else partialErrors.push({ account: task.account.account_name, dimension: TIKTOK_AUDIENCE_DIMENSIONS[task.dimension], message: result.reason?.message || "TikTok audience API error" });
  });
  if (results.every((result) => result.status === "rejected")) throw Object.assign(new Error(partialErrors[0]?.message || "Không thể đọc TikTok audience breakdown."), { statusCode: 502 });
  response.setHeader("Cache-Control", "no-store");
  return response.status(200).json({ source: "tiktok", from, to, breakdowns, partialErrors, syncedAt: new Date().toISOString() });
}

function callbackPage(payload) {
  const safePayload = JSON.stringify(payload).replaceAll("<", "\\u003c");
  return `<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>TikTok Ads connection</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f7f7fb;color:#1e1b38;font-family:system-ui,sans-serif}.card{width:min(420px,calc(100% - 40px));padding:30px;border:1px solid #e5e3ee;border-radius:18px;background:#fff;box-shadow:0 18px 50px rgba(33,27,70,.12);text-align:center}.icon{width:54px;height:54px;margin:auto;display:grid;place-items:center;border-radius:16px;color:#fff;background:#111;font-size:24px;font-weight:800}h1{font-size:22px}p{color:#77738a;line-height:1.55}</style></head><body><main class="card"><div class="icon">T</div><h1>${payload.ok ? "Đã kết nối TikTok Ads" : "Chưa thể kết nối"}</h1><p>${payload.ok ? "Đang quay lại Ads Control để chọn advertiser…" : payload.error}</p></main><script>const result=${safePayload};if(window.opener){window.opener.postMessage({type:"tiktok-oauth-result",...result},location.origin);setTimeout(()=>window.close(),900)}else if(result.ok){setTimeout(()=>location.replace("/app#integrations"),900)}</script></body></html>`;
}

async function handleOauthStart(request, response) {
  const { user } = await requireOwner(request);
  response.setHeader("Cache-Control", "no-store");
  return response.status(200).json({ url: buildTiktokLoginUrl(user.id) });
}

async function handleOauthCallback(request, response) {
  try {
    if (request.query.error) throw Object.assign(new Error(request.query.error_description || "Người dùng đã hủy cấp quyền TikTok."), { statusCode: 400 });
    const state = verifyTiktokOauthState(request.query.state);
    // TikTok returns the code as auth_code, older portals still send code.
    const authCode = request.query.auth_code || request.query.code;
    if (!authCode) throw Object.assign(new Error("Thiếu auth code từ TikTok."), { statusCode: 400 });
    const token = await exchangeTiktokAuthCode(String(authCode));
    const advertiserIds = (token.advertiser_ids || []).map((id) => normalizeTiktokAdvertiserId(id)).filter(Boolean);
    await serviceRequest("/rest/v1/tiktok_authorizations?on_conflict=user_id", {
      method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify({
        user_id: state.userId,
        external_user_id: String(token.scope?.[0] || advertiserIds[0] || "tiktok"),
        external_user_name: advertiserIds.length ? `${advertiserIds.length} advertiser` : "TikTok advertiser",
        encrypted_access_token: encryptTiktokToken(token.access_token),
        // TikTok ads access tokens are long-lived and have no documented expiry.
        token_expires_at: null,
        status: "active", last_error: null, updated_at: new Date().toISOString()
      })
    });
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    return response.status(200).send(callbackPage({ ok: true, name: `${advertiserIds.length} advertiser` }));
  } catch (error) {
    console.error(error);
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    return response.status(error.statusCode || 500).send(callbackPage({ ok: false, error: error.message || "Lỗi kết nối TikTok." }));
  }
}

export default async function handler(request, response) {
  // OAuth callback runs before auth checks because TikTok redirects the browser here.
  if (request.query?.route === "callback") return handleOauthCallback(request, response);
  try {
    if (request.method === "POST" && request.query?.mode === "campaign-status") {
      return await handleCampaignStatus(request, response);
    }
    if (request.query?.route === "start") {
      if (request.method !== "POST") { response.setHeader("Allow", "POST"); return response.status(405).json({ error: "Method not allowed" }); }
      return await handleOauthStart(request, response);
    }
    if (request.method === "GET") {
      if (request.query.mode === "breakdowns" || request.query.mode === "insights") {
        const { user, profile } = await requireWorkspaceViewer(request);
        const dataOwnerId = profile.role === "owner" ? user.id : await getWorkspaceOwnerId();
        if (request.query.mode === "breakdowns") return await handleBreakdowns(dataOwnerId, request.query, response);
        return await handleInsights(dataOwnerId, request.query, response);
      }
      const { user } = await requireOwner(request);
      const { authorization, accounts } = await loadAccounts(user.id);
      response.setHeader("Cache-Control", "no-store");
      return response.status(200).json({
        connected: Boolean(authorization),
        identity: authorization ? { name: authorization.external_user_name, status: authorization.status, expiresAt: authorization.token_expires_at } : null,
        uaNames: uaNames(), accounts
      });
    }
    const { user } = await requireOwner(request);
    if (request.method === "DELETE") {
      const authorization = await getAuthorization(user.id);
      if (authorization) {
        const linked = await serviceRequest(`/rest/v1/tiktok_ad_accounts?authorization_id=eq.${encodeURIComponent(authorization.id)}&selected=eq.true&select=account_id`);
        for (const item of linked) {
          await serviceRequest(`/rest/v1/user_assignments?platform=eq.tiktok&external_account_id=eq.${encodeURIComponent(item.account_id)}`, { method: "DELETE", headers: { Prefer: "return=minimal" } });
          await serviceRequest(`/rest/v1/platform_connections?platform=eq.tiktok&external_account_id=eq.${encodeURIComponent(item.account_id)}`, { method: "DELETE", headers: { Prefer: "return=minimal" } });
        }
        // TikTok exposes no token revocation endpoint, so the stored token is deleted.
        await serviceRequest(`/rest/v1/tiktok_authorizations?id=eq.${encodeURIComponent(authorization.id)}`, { method: "DELETE", headers: { Prefer: "return=minimal" } });
      }
      return response.status(200).json({ disconnected: true });
    }
    if (request.method !== "POST") {
      response.setHeader("Allow", "GET, POST, DELETE");
      return response.status(405).json({ error: "Method not allowed" });
    }
    const { authorization, accounts } = await loadAccounts(user.id);
    if (!authorization) throw Object.assign(new Error("Chưa kết nối TikTok với workspace."), { statusCode: 409 });
    const requested = Array.isArray(request.body?.accounts) ? request.body.accounts : [];
    const available = new Map(accounts.map((account) => [account.id, account]));
    const allowedUa = new Set(uaNames());
    const selections = requested.map((item) => {
      const account = available.get(normalizeTiktokAdvertiserId(item.id));
      if (!account?.canConnect) throw Object.assign(new Error("Danh sách TikTok có advertiser không hợp lệ."), { statusCode: 400 });
      return { account, assignedUa: allowedUa.has(item.assignedUa) ? item.assignedUa : null };
    });
    const selectedIds = new Set(selections.map(({ account }) => account.id));
    await serviceRequest("/rest/v1/tiktok_ad_accounts?on_conflict=authorization_id,account_id", {
      method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify(accounts.map((account) => ({
        authorization_id: authorization.id, account_id: account.id, account_name: account.name,
        business_center_id: account.businessCenterId || null,
        business_center_name: account.businessCenterId ? account.business?.name || null : null,
        currency: account.currency, timezone_name: account.timezone, account_status: account.status,
        selected: selectedIds.has(account.id),
        assigned_ua_name: selections.find((item) => item.account.id === account.id)?.assignedUa || null,
        updated_at: new Date().toISOString()
      })))
    });
    for (const { account, assignedUa } of selections) {
      await serviceRequest("/rest/v1/platform_connections?on_conflict=platform,external_account_id", {
        method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
        body: JSON.stringify({ platform: "tiktok", display_name: account.name, external_account_id: account.id, status: "connected", last_error: null, created_by: user.id })
      });
      if (assignedUa) {
        const profiles = await serviceRequest(`/rest/v1/profiles?full_name=ilike.${encodeURIComponent(assignedUa)}&select=user_id&limit=1`);
        if (profiles[0]) await serviceRequest("/rest/v1/user_assignments?on_conflict=user_id,platform,external_account_id,external_campaign_id", {
          method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
          body: JSON.stringify({ user_id: profiles[0].user_id, platform: "tiktok", external_account_id: account.id, assigned_by: user.id })
        });
      }
    }
    for (const account of accounts.filter((item) => !selectedIds.has(item.id) && item.selected)) {
      await serviceRequest(`/rest/v1/platform_connections?platform=eq.tiktok&external_account_id=eq.${encodeURIComponent(account.id)}`, { method: "DELETE", headers: { Prefer: "return=minimal" } });
      await serviceRequest(`/rest/v1/user_assignments?platform=eq.tiktok&external_account_id=eq.${encodeURIComponent(account.id)}`, { method: "DELETE", headers: { Prefer: "return=minimal" } });
    }
    return response.status(200).json({ saved: selections.length });
  } catch (error) {
    return sendError(response, error);
  }
}
