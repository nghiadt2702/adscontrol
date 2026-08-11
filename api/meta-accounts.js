import { accountCanConnect, decryptToken, fetchAllAdAccounts, graphRequest, revokeMetaAuthorization } from "./_lib/meta.js";
import {
  getWorkspaceOwnerId,
  requireOwner,
  requireWorkspaceViewer,
  sendError,
  serviceRequest
} from "./_lib/supabase.js";

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

// Several Tier 2 fields arrive as a one-element array of { value } rather than a
// plain number, and video or ranking fields are omitted entirely when the entity
// is not eligible.
function actionTotal(items) {
  return (items || []).reduce((sum, item) => sum + Number(item.value || 0), 0);
}

function optionalActionTotal(items) {
  return items === undefined || items === null ? null : actionTotal(items);
}

function optionalAction(items, type) {
  const item = (items || []).find((entry) => entry.action_type === type);
  return item ? Number(item.value || 0) : null;
}

function metaDetail(row) {
  const reach = Number(row.reach || 0);
  const linkClicks = Number(row.inline_link_clicks || 0);
  const spend = Number(row.spend || 0);
  const thruPlays = actionTotal(row.video_thruplay_watched_actions);
  // Meta exposes the 3-second play as the video_view action in ad insights.
  // If an account omits that action, the documented 2-second continuous metric
  // is retained as an explicit fallback rather than silently reported as 3s.
  const threeSecondViews = optionalAction(row.actions, "video_view");
  const continuousTwoSecondViews = optionalActionTotal(row.video_continuous_2_sec_watched_actions);
  const openingViews = threeSecondViews ?? continuousTwoSecondViews;
  const midpointViews = optionalActionTotal(row.video_p50_watched_actions);
  return {
    reach,
    frequency: Number(row.frequency || 0),
    // Meta bills reach-based buying per 1,000 people, which is not the same as
    // CPM over impressions because one person can see an ad several times.
    costPer1kReached: reach ? spend / reach * 1000 : 0,
    outboundClicks: actionTotal(row.outbound_clicks),
    outboundCtr: actionTotal(row.outbound_clicks_ctr),
    linkClicks,
    costPerLinkClick: Number(row.cost_per_inline_link_click || 0) || (linkClicks ? spend / linkClicks : 0),
    thruPlays,
    costPerThruPlay: thruPlays ? spend / thruPlays : 0,
    videoP25: actionTotal(row.video_p25_watched_actions),
    videoP50: midpointViews ?? 0,
    videoP75: actionTotal(row.video_p75_watched_actions),
    videoP100: actionTotal(row.video_p100_watched_actions),
    openingViews: openingViews ?? 0,
    openingAvailable: openingViews !== null,
    videoP50Available: midpointViews !== null,
    openingMetric: threeSecondViews !== null ? "3-second video plays" : continuousTwoSecondViews !== null ? "2-second continuous video views" : "",
    // Rankings are enums, not numbers, and read UNKNOWN until the entity has
    // enough delivery to be scored.
    qualityRanking: row.quality_ranking || "",
    engagementRanking: row.engagement_rate_ranking || "",
    conversionRanking: row.conversion_rate_ranking || ""
  };
}

// Meta attributes a conversion to the click or view window configured on the
// account, so the same campaign and date can report different purchase counts
// under different windows. Making it explicit means a number can be reconciled
// with Ads Manager or an MMP instead of silently depending on account defaults.
const META_ATTRIBUTION_WINDOWS = new Set(["1d_click", "7d_click", "28d_click", "1d_view", "7d_view", "28d_view"]);
const DEFAULT_META_ATTRIBUTION = ["7d_click", "1d_view"];

function attributionWindows(value) {
  const requested = String(value || "").split(",").map((item) => item.trim()).filter(Boolean);
  const valid = requested.filter((item) => META_ATTRIBUTION_WINDOWS.has(item));
  return valid.length ? valid : DEFAULT_META_ATTRIBUTION;
}

async function fetchInsightRows(accountId, accessToken, from, to, level, windows) {
  // clicks counts every click on the ad, including likes, comments and profile
  // taps. inline_link_clicks counts only clicks to the destination, which is
  // what CTR and CPC should measure for acquisition.
  // Tier 2 fields are Meta-specific and stay out of the unified summary. Video
  // and ranking fields are only returned for eligible entities, so every reader
  // below tolerates them being absent.
  const fields = [
    "account_id", "account_name", "campaign_id", "campaign_name", "adset_id", "adset_name", "ad_id", "ad_name",
    "date_start", "date_stop", "spend", "impressions", "clicks", "inline_link_clicks", "actions", "action_values",
    "reach", "frequency", "outbound_clicks", "outbound_clicks_ctr", "cost_per_inline_link_click",
    "video_play_actions", "video_continuous_2_sec_watched_actions", "video_thruplay_watched_actions", "video_p25_watched_actions", "video_p50_watched_actions",
    "video_p75_watched_actions", "video_p100_watched_actions",
    "quality_ranking", "engagement_rate_ranking", "conversion_rate_ranking"
  ].join(",");
  // Creative sync only needs one aggregate row per ad for the selected range.
  // Requesting daily rows here multiplies the payload by up to 90 and can make
  // thumbnail enrichment exceed the serverless timeout.
  const params = {
    level,
    fields,
    time_range:JSON.stringify({ since:from, until:to }),
    time_increment:level === "ad" ? undefined : 1,
    limit:500,
    action_attribution_windows:JSON.stringify(windows)
  };
  let page = await graphRequest(`${accountId}/insights`, accessToken, params);
  const rows = [];
  while (page) {
    rows.push(...(page.data || []));
    const after = page.paging?.next && page.paging?.cursors?.after;
    page = after ? await graphRequest(`${accountId}/insights`, accessToken, { ...params, after }) : null;
  }
  return rows;
}

const META_BREAKDOWNS = ["age", "gender", "device_platform", "country", "region"];

async function fetchBreakdownRows(accountId, accessToken, from, to, breakdown, windows) {
  const params = {
    level: "campaign",
    fields: "account_id,account_name,campaign_id,campaign_name,spend,impressions,clicks,inline_link_clicks",
    breakdowns: breakdown,
    time_range: JSON.stringify({ since: from, until: to }),
    limit: 500,
    action_attribution_windows: JSON.stringify(windows)
  };
  let page = await graphRequest(`${accountId}/insights`, accessToken, params);
  const rows = [];
  while (page) {
    rows.push(...(page.data || []));
    const after = page.paging?.next && page.paging?.cursors?.after;
    page = after ? await graphRequest(`${accountId}/insights`, accessToken, { ...params, after }) : null;
  }
  return rows;
}

function normalizeMetaBreakdown(row, account, dimension) {
  const rawKey = String(row[dimension] ?? "unknown");
  return {
    platform: "Meta",
    dimension: dimension === "device_platform" ? "device" : dimension,
    key: rawKey,
    label: rawKey,
    accountId: account.account_id,
    account: account.account_name,
    campaignId: String(row.campaign_id || ""),
    campaignName: row.campaign_name || String(row.campaign_id || ""),
    currency: account.currency,
    spend: Number(row.spend || 0),
    impressions: Number(row.impressions || 0),
    clicks: Number(row.inline_link_clicks || row.clicks || 0)
  };
}

async function handleBreakdowns(userId, query, response) {
  const from = String(query.from || ""), to = String(query.to || "");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(from) || !/^\d{4}-\d{2}-\d{2}$/.test(to) || from > to) throw Object.assign(new Error("Khoảng ngày Meta không hợp lệ."), { statusCode: 400 });
  const days = Math.floor((new Date(`${to}T00:00:00Z`) - new Date(`${from}T00:00:00Z`)) / 86400000) + 1;
  if (days > 90) throw Object.assign(new Error("Mỗi lần đồng bộ Meta tối đa 90 ngày."), { statusCode: 400 });
  const authorization = await getAuthorization(userId);
  if (!authorization) throw Object.assign(new Error("Chưa kết nối Meta hoặc phiên Meta cần xác thực lại."), { statusCode: 409 });
  let accounts = await serviceRequest(`/rest/v1/meta_ad_accounts?authorization_id=eq.${encodeURIComponent(authorization.id)}&selected=eq.true&select=account_id,account_name,business_id,business_name,currency,timezone_name`);
  if (query.business && query.business !== "all") accounts = accounts.filter((account) => account.business_id === query.business);
  if (query.account && query.account !== "all") accounts = accounts.filter((account) => account.account_id === query.account);
  if (!accounts.length) throw Object.assign(new Error("Không có tài khoản Meta trong phạm vi đã chọn."), { statusCode: 404 });
  const token = decryptToken(authorization.encrypted_access_token);
  const windows = attributionWindows(query.attribution);
  const tasks = accounts.flatMap((account) => META_BREAKDOWNS.map((dimension) => ({ account, dimension })));
  const results = await Promise.allSettled(tasks.map(async ({ account, dimension }) =>
    (await fetchBreakdownRows(account.account_id, token, from, to, dimension, windows)).map((row) => normalizeMetaBreakdown(row, account, dimension))
  ));
  const breakdowns = { age: [], gender: [], device: [], country: [], region: [] };
  const partialErrors = [];
  results.forEach((result, index) => {
    const task = tasks[index];
    if (result.status === "fulfilled") result.value.forEach((row) => breakdowns[row.dimension].push(row));
    else partialErrors.push({ account: task.account.account_name, dimension: task.dimension === "device_platform" ? "device" : task.dimension, message: result.reason?.message || "Meta breakdown API error" });
  });
  if (results.every((result) => result.status === "rejected")) throw Object.assign(new Error(partialErrors[0]?.message || "Không thể đọc breakdown Meta."), { statusCode: 502 });
  response.setHeader("Cache-Control", "no-store");
  return response.status(200).json({ source: "meta", from, to, breakdowns, partialErrors, syncedAt: new Date().toISOString() });
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
    linkClicks:Number(row.inline_link_clicks || 0),
    detail:metaDetail(row)
  };
}

function aggregateInsights(rows, keyFactory) {
  const grouped = new Map();
  for (const row of rows) {
    const key=keyFactory(row);
    const current=grouped.get(key) || { ...row, spend:0, revenue:0, installs:0, registrations:0, purchases:0, impressions:0, clicks:0, linkClicks:0, detail:{ reach:0, frequency:0, costPer1kReached:0, outboundClicks:0, outboundCtr:0, linkClicks:0, costPerLinkClick:0, thruPlays:0, costPerThruPlay:0, videoP25:0, videoP50:0, videoP75:0, videoP100:0, openingViews:0, openingAvailable:false, videoP50Available:false, openingMetric:"", qualityRanking:"", engagementRanking:"", conversionRanking:"" } };
    for (const metric of ["spend","revenue","installs","registrations","purchases","impressions","clicks","linkClicks"]) current[metric]+=row[metric] || 0;
    // Counting metrics add up across days. Reach does not: the same person
    // reached on two days is one person, and Meta only dedupes within a single
    // response, so summing daily reach would overstate it. The largest daily
    // value is used as a lower bound instead.
    const detail=row.detail || {};
    for (const metric of ["outboundClicks","thruPlays","videoP25","videoP50","videoP75","videoP100","openingViews"]) current.detail[metric]+=detail[metric] || 0;
    current.detail.reach=Math.max(current.detail.reach, detail.reach || 0);
    current.detail.openingAvailable ||= Boolean(detail.openingAvailable);
    current.detail.videoP50Available ||= Boolean(detail.videoP50Available);
    current.detail.openingMetric=detail.openingMetric || current.detail.openingMetric;
    for (const metric of ["qualityRanking","engagementRanking","conversionRanking"]) current.detail[metric]=detail[metric] || current.detail[metric];
    grouped.set(key,current);
  }
  return [...grouped.values()];
}

async function fetchAdCreativeMetadata(adIds, accessToken) {
  const metadata = new Map();
  const uniqueIds = [...new Set(adIds.filter(Boolean))];
  const chunks = [];
  for (let index = 0; index < uniqueIds.length; index += 50) chunks.push(uniqueIds.slice(index, index + 50));
  const payloads = await Promise.all(chunks.map((chunk) => graphRequest("", accessToken, {
      ids: chunk.join(","),
      fields: "id,creative{id,thumbnail_url,image_url,video_id}"
    })));
  payloads.forEach((payload) => {
    Object.entries(payload || {}).forEach(([adId, row]) => {
      const creative = row?.creative || {};
      metadata.set(String(adId), {
        creativeId: creative.id ? String(creative.id) : "",
        thumbnailUrl: creative.thumbnail_url || creative.image_url || "",
        videoId: creative.video_id ? String(creative.video_id) : ""
      });
    });
  });
  return metadata;
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
  const windows=attributionWindows(query.attribution);
  const results=await Promise.allSettled(accounts.map(async account=>(await fetchInsightRows(account.account_id,token,from,to,level,windows)).map(row=>normalizedInsightRow(row,account,level))));
  const rows=results.flatMap(result=>result.status==="fulfilled"?result.value:[]);
  const errors=results.flatMap((result,index)=>result.status==="rejected"?[{account:accounts[index].account_name,message:result.reason?.message || "Meta API error"}]:[]);
  if(!rows.length && errors.length===accounts.length) throw Object.assign(new Error(errors[0].message),{statusCode:502});
  let creativeMetadata = new Map();
  if(level === "ad" && rows.length) {
    try {
      creativeMetadata = await fetchAdCreativeMetadata(rows.map(row=>row.adId), token);
    } catch(error) {
      errors.push({ account:"Meta creative", message:`Không thể tải thumbnail: ${error.message}` });
    }
  }
  const campaigns=aggregateInsights(rows,row=>`${row.accountId}:${row.entityId}`).map(row=>({
    ...row, cpi:row.installs?row.spend/row.installs:0, roas:row.spend?row.revenue/row.spend:0,
    ...creativeMetadata.get(String(row.adId || "")),
    // CTR and CVR use link clicks so engagement clicks do not distort them.
    ctr:row.impressions?(row.linkClicks||row.clicks)/row.impressions*100:0,
    cvr:(row.linkClicks||row.clicks)?row.installs/(row.linkClicks||row.clicks)*100:0,
    // Rates and per-unit costs are recomputed from the aggregated totals, since
    // averaging the daily values Meta returns would weight every day equally
    // regardless of how much each one spent.
    detail:{
      ...row.detail,
      frequency:row.detail.reach?row.impressions/row.detail.reach:0,
      costPer1kReached:row.detail.reach?row.spend/row.detail.reach*1000:0,
      outboundCtr:row.impressions?row.detail.outboundClicks/row.impressions*100:0,
      linkClicks:row.linkClicks,
      costPerLinkClick:row.linkClicks?row.spend/row.linkClicks:0,
      costPerThruPlay:row.detail.thruPlays?row.spend/row.detail.thruPlays:0,
      hookRate:row.impressions && row.detail.openingAvailable ? row.detail.openingViews/row.impressions*100 : null,
      holdRate:row.detail.openingViews && row.detail.videoP50Available ? row.detail.videoP50/row.detail.openingViews*100 : null
    },
    status:"Meta live", trend:"up", market:row.account
  })).sort((a,b)=>b.spend-a.spend);
  const daily=aggregateInsights(rows,row=>row.date).map(row=>({date:row.date,spend:row.spend,revenue:row.revenue,installs:row.installs,registrations:row.registrations,purchases:row.purchases})).sort((a,b)=>a.date.localeCompare(b.date));
  const currencies=[...new Set(accounts.map(account=>account.currency))];
  response.setHeader("Cache-Control","no-store");
  return response.status(200).json({source:"meta",level,from,to,attribution:windows,currency:currencies.length===1?currencies[0]:"MIXED",accounts:accounts.map(account=>({id:account.account_id,name:account.account_name,businessId:account.business_id,businessName:account.business_name,currency:account.currency,timezone:account.timezone_name})),campaigns,daily,partialErrors:errors,syncedAt:new Date().toISOString()});
}

export default async function handler(request, response) {
  try {
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
        uaNames: uaNames(),
        accounts
      });
    }
    const { user } = await requireOwner(request);
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
