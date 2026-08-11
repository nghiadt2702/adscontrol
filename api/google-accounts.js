import { buildGoogleLoginUrl, decryptGoogleToken, encryptGoogleToken, exchangeGoogleCode, fetchGoogleAdAccounts, googleAdsRequest, googleIdentity, normalizeGoogleCustomerId, refreshGoogleAccessToken, revokeGoogleAuthorization, verifyGoogleOauthState } from "./_lib/google.js";
import {
  getWorkspaceOwnerId,
  requireOwner,
  requireWorkspaceViewer,
  sendError,
  serviceRequest
} from "./_lib/supabase.js";

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

function optionalMetric(value, multiplier = 1) {
  return value === undefined || value === null ? null : Number(value) * multiplier;
}

// metrics.conversions only counts conversion actions whose
// include_in_conversions_metric flag is true, which is typically just the
// campaign's bidding goal. On an app install campaign that means installs are
// counted while registration and purchase actions are silently dropped.
// metrics.all_conversions counts every action regardless of that flag, so the
// funnel split reads all_conversions and keeps conversions as the biddable
// subset for reference.
// Categories come from ConversionActionCategory in the Google Ads API.
const GOOGLE_INSTALL_CATEGORIES = new Set(["DOWNLOAD"]);
const GOOGLE_REGISTRATION_CATEGORIES = new Set(["SIGNUP", "PHONE_CALL_LEAD", "CONTACT", "SUBMIT_LEAD_FORM", "CONVERTED_LEAD", "QUALIFIED_LEAD", "IMPORTED_LEAD", "BOOK_APPOINTMENT", "REQUEST_QUOTE"]);
const GOOGLE_PURCHASE_CATEGORIES = new Set(["PURCHASE", "STORE_SALE", "SUBSCRIBE_PAID"]);
const GOOGLE_INSTALL_ACTION_PATTERN = /(^|[^a-z])(first[ _-]?open|install|download)([^a-z]|$)/i;
const GOOGLE_REGISTRATION_ACTION_PATTERN = /(^|[^a-z])(reg|register|registration|sign[ _-]?up|signup|complete[ _-]?registration)([^a-z]|$)/i;
const GOOGLE_PURCHASE_ACTION_PATTERN = /(^|[^a-z])(purchase|subscribe|subscription|store[ _-]?sale|order[ _-]?complete)([^a-z]|$)/i;
// DEFAULT and PAGE_VIEW are deliberately unmapped: they say nothing about which
// funnel step fired. They are reported separately so the gap stays visible
// instead of silently reading as zero.

// segments.conversion_action_category cannot be combined with delivery metrics
// such as cost_micros or impressions: Google rejects that with
// PROHIBITED_SEGMENT_WITH_METRIC_IN_SELECT_OR_WHERE_CLAUSE. So delivery and
// conversions are read in two separate queries and joined on entity + date.
function resourceFor(level) {
  if (level === "adgroup") return "ad_group";
  if (level === "ad") return "ad_group_ad";
  return "campaign";
}

function entityFields(level) {
  if (level === "adgroup") return ", ad_group.id, ad_group.name, ad_group.status";
  if (level === "ad") return ", ad_group.id, ad_group.name, ad_group_ad.ad.id, ad_group_ad.ad.name, ad_group_ad.status";
  return "";
}

// Fields every campaign type supports. This set must always succeed. The
// campaign attributes are kept here because they are valid for campaign,
// ad_group and ad_group_ad reports and should survive a Tier 2 fallback.
const CORE_DELIVERY_FIELDS = [
  "segments.date", "customer.id", "customer.descriptive_name", "customer.currency_code",
  "campaign.id", "campaign.name", "campaign.status", "campaign.advertising_channel_type",
  "campaign.advertising_channel_sub_type", "campaign.bidding_strategy_type",
  "campaign_budget.amount_micros",
  "metrics.cost_micros", "metrics.impressions", "metrics.clicks", "metrics.conversions",
  "metrics.conversions_value", "metrics.all_conversions", "metrics.all_conversions_value"
];

function coreDeliveryFields(level) {
  // Participated in-app actions is available at campaign and ad-group level,
  // but not on ad_group_ad. Keep ad reports on the universally valid core set.
  return level === "ad"
    ? CORE_DELIVERY_FIELDS
    : [...CORE_DELIVERY_FIELDS, "metrics.biddable_cohort_app_post_install_conversions"];
}

// Tier 2 fields. Google returns zero/omits fields that do not apply to an
// entity, but the fields themselves are valid for all three report resources.
// v25 uses trueview_average_cpv rather than the old average_cpv name.
function tier2Fields() {
  return [
    "metrics.average_cpc", "metrics.average_cpm", "metrics.trueview_average_cpv",
    "metrics.video_trueview_views", "metrics.video_trueview_view_rate", "metrics.video_quartile_p50_rate", "metrics.view_through_conversions",
    "metrics.interactions", "metrics.interaction_rate",
    "metrics.conversions_from_interactions_rate",
    "metrics.search_impression_share",
    "metrics.search_budget_lost_impression_share",
    "metrics.search_rank_lost_impression_share"
  ];
}

function deliveryQuery(level, from, to) {
  return `SELECT ${[...coreDeliveryFields(level), ...tier2Fields()].join(", ")}${entityFields(level)} FROM ${resourceFor(level)} WHERE segments.date BETWEEN '${from}' AND '${to}'`;
}

// Google validates the whole SELECT before running it: one field that does not
// apply to a campaign type rejects the entire query. Since an account can mix
// Search, App and Performance Max campaigns, the Tier 2 fields are requested
// separately from the core ones so a rejection costs the extra columns rather
// than the whole sync.
function coreDeliveryQuery(level, from, to) {
  return `SELECT ${coreDeliveryFields(level).join(", ")}${entityFields(level)} FROM ${resourceFor(level)} WHERE segments.date BETWEEN '${from}' AND '${to}'`;
}

// Only conversion metrics are selected here, which is what makes the category
// segment legal.
function conversionQuery(level, from, to) {
  const base = "segments.date, segments.conversion_action, segments.conversion_action_name, segments.conversion_action_category, segments.external_conversion_source, campaign.id, metrics.all_conversions, metrics.all_conversions_value";
  return `SELECT ${base}${entityFields(level)} FROM ${resourceFor(level)} WHERE segments.date BETWEEN '${from}' AND '${to}'`;
}

const GOOGLE_DEEP_QUERIES = {
  appCampaigns: (from, to, extended = true) => `SELECT campaign.id, campaign.name, campaign.status, campaign.app_campaign_setting.app_id, campaign.app_campaign_setting.app_store, campaign.app_campaign_setting.bidding_strategy_goal_type, campaign.bidding_strategy_type, campaign_budget.amount_micros, metrics.cost_micros, metrics.impressions, metrics.clicks${extended ? ", metrics.biddable_app_install_conversions, metrics.biddable_app_post_install_conversions, metrics.biddable_cohort_app_post_install_conversions, metrics.view_through_conversions, metrics.cross_device_conversions" : ""} FROM campaign WHERE campaign.advertising_channel_type = 'MULTI_CHANNEL' AND campaign.advertising_channel_sub_type IN ('APP_CAMPAIGN', 'APP_CAMPAIGN_FOR_ENGAGEMENT', 'APP_CAMPAIGN_FOR_PRE_REGISTRATION') AND segments.date BETWEEN '${from}' AND '${to}'`,
  network: (from, to, extended = true) => `SELECT campaign.id, campaign.name, segments.ad_network_type, metrics.cost_micros, metrics.impressions, metrics.clicks, metrics.all_conversions, metrics.all_conversions_value${extended ? ", metrics.biddable_app_install_conversions, metrics.biddable_app_post_install_conversions, metrics.biddable_cohort_app_post_install_conversions, metrics.view_through_conversions" : ""} FROM campaign WHERE campaign.advertising_channel_type = 'MULTI_CHANNEL' AND segments.date BETWEEN '${from}' AND '${to}'`,
  assets: (from, to, extended = true) => `SELECT campaign.id, campaign.name, ad_group.id, ad_group.name, ad_group_ad_asset_view.asset, ad_group_ad_asset_view.field_type, ad_group_ad_asset_view.performance_label, asset.id, asset.name, asset.type${extended ? ", asset.image_asset.full_size.url, asset.youtube_video_asset.youtube_video_id, asset.text_asset.text" : ""}, metrics.cost_micros, metrics.impressions, metrics.clicks, metrics.conversions, metrics.all_conversions_value, metrics.video_trueview_views, metrics.video_trueview_view_rate, metrics.video_quartile_p25_rate, metrics.video_quartile_p50_rate, metrics.video_quartile_p75_rate, metrics.video_quartile_p100_rate FROM ad_group_ad_asset_view WHERE segments.date BETWEEN '${from}' AND '${to}'`
};

const GOOGLE_BREAKDOWN_QUERIES = {
  age: (from, to) => `SELECT campaign.id, campaign.name, ad_group_criterion.age_range.type, metrics.cost_micros, metrics.impressions, metrics.clicks FROM age_range_view WHERE segments.date BETWEEN '${from}' AND '${to}'`,
  gender: (from, to) => `SELECT campaign.id, campaign.name, ad_group_criterion.gender.type, metrics.cost_micros, metrics.impressions, metrics.clicks FROM gender_view WHERE segments.date BETWEEN '${from}' AND '${to}'`,
  device: (from, to) => `SELECT campaign.id, campaign.name, segments.device, metrics.cost_micros, metrics.impressions, metrics.clicks FROM campaign WHERE segments.date BETWEEN '${from}' AND '${to}'`,
  geo: (from, to) => `SELECT campaign.id, campaign.name, geographic_view.country_criterion_id, geographic_view.location_type, segments.geo_target_region, metrics.cost_micros, metrics.impressions, metrics.clicks FROM geographic_view WHERE segments.date BETWEEN '${from}' AND '${to}'`
};

const GOOGLE_AGE_LABELS = {
  AGE_RANGE_18_24: "18–24", AGE_RANGE_25_34: "25–34", AGE_RANGE_35_44: "35–44",
  AGE_RANGE_45_54: "45–54", AGE_RANGE_55_64: "55–64", AGE_RANGE_65_UP: "65+",
  AGE_RANGE_UNDETERMINED: "Không xác định", UNKNOWN: "Không xác định", UNSPECIFIED: "Không xác định"
};

function googleBreakdownRow(row, account, dimension, key, label = key) {
  return {
    platform: "Google", dimension, key: String(key || "unknown"), label: String(label || key || "Không xác định"),
    accountId: account.account_id, account: account.account_name,
    campaignId: String(row.campaign?.id || ""), campaignName: row.campaign?.name || String(row.campaign?.id || ""),
    currency: account.currency, spend: metricNumber(row.metrics?.costMicros) / 1e6,
    impressions: metricNumber(row.metrics?.impressions), clicks: metricNumber(row.metrics?.clicks)
  };
}

function geoId(value) {
  const match = String(value || "").match(/(\d+)$/);
  return match ? match[1] : "";
}

async function handleBreakdowns(userId, query, response) {
  const from = String(query.from || ""), to = String(query.to || "");
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
  const dimensions = Object.keys(GOOGLE_BREAKDOWN_QUERIES);
  const tasks = accounts.flatMap((account) => dimensions.map((dimension) => ({ account, dimension })));
  const results = await Promise.allSettled(tasks.map(async ({ account, dimension }) => {
    const search = (gaql) => googleAdsRequest(`customers/${normalizeGoogleCustomerId(account.account_id)}/googleAds:searchStream`, accessToken, {
      method: "POST", loginCustomerId: account.manager_account_id || undefined, body: { query: gaql }
    });
    const body = await search(GOOGLE_BREAKDOWN_QUERIES[dimension](from, to));
    const rows = body.flatMap((chunk) => chunk.results || []);
    if (dimension !== "geo") return { dimension, rows };
    const ids = [...new Set(rows.flatMap((row) => [String(row.geographicView?.countryCriterionId || ""), geoId(row.segments?.geoTargetRegion)]).filter(Boolean))];
    const names = new Map();
    for (let index = 0; index < ids.length; index += 500) {
      const subset = ids.slice(index, index + 500);
      const geoBody = await search(`SELECT geo_target_constant.id, geo_target_constant.name, geo_target_constant.country_code, geo_target_constant.target_type, geo_target_constant.canonical_name FROM geo_target_constant WHERE geo_target_constant.id IN (${subset.join(",")})`);
      geoBody.flatMap((chunk) => chunk.results || []).forEach((row) => {
        const geo = row.geoTargetConstant || {};
        names.set(String(geo.id || ""), geo.canonicalName || geo.name || String(geo.id || ""));
      });
    }
    return { dimension, rows, names };
  }));
  const breakdowns = { age: [], gender: [], device: [], country: [], region: [] };
  const partialErrors = [];
  results.forEach((result, index) => {
    const task = tasks[index];
    if (result.status === "rejected") {
      partialErrors.push({ account: task.account.account_name, dimension: task.dimension === "geo" ? "country,region" : task.dimension, message: result.reason?.message || "Google breakdown API error" });
      return;
    }
    const { dimension, rows, names = new Map() } = result.value;
    rows.forEach((row) => {
      if (dimension === "age") {
        const key = row.adGroupCriterion?.ageRange?.type || "UNKNOWN";
        breakdowns.age.push(googleBreakdownRow(row, task.account, "age", key, GOOGLE_AGE_LABELS[key] || key));
      } else if (dimension === "gender") {
        const key = row.adGroupCriterion?.gender?.type || "UNKNOWN";
        const label = { MALE: "Nam", FEMALE: "Nữ", UNDETERMINED: "Không xác định", UNKNOWN: "Không xác định", UNSPECIFIED: "Không xác định" }[key] || key;
        breakdowns.gender.push(googleBreakdownRow(row, task.account, "gender", key, label));
      } else if (dimension === "device") {
        const key = row.segments?.device || "UNKNOWN";
        breakdowns.device.push(googleBreakdownRow(row, task.account, "device", key, key));
      } else {
        const countryId = String(row.geographicView?.countryCriterionId || "");
        const regionId = geoId(row.segments?.geoTargetRegion);
        if (countryId) breakdowns.country.push(googleBreakdownRow(row, task.account, "country", countryId, names.get(countryId) || countryId));
        if (regionId) breakdowns.region.push(googleBreakdownRow(row, task.account, "region", regionId, names.get(regionId) || regionId));
      }
    });
  });
  if (results.every((result) => result.status === "rejected")) throw Object.assign(new Error(partialErrors[0]?.message || "Không thể đọc breakdown Google Ads."), { statusCode: 502 });
  response.setHeader("Cache-Control", "no-store");
  return response.status(200).json({ source: "google", from, to, breakdowns, partialErrors, syncedAt: new Date().toISOString() });
}

async function handleDeepMetrics(userId, query, response) {
  const from = String(query.from || ""), to = String(query.to || "");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(from) || !/^\d{4}-\d{2}-\d{2}$/.test(to) || from > to) {
    throw Object.assign(new Error("Khoảng ngày Google Ads không hợp lệ."), { statusCode: 400 });
  }
  const days = Math.floor((new Date(`${to}T00:00:00Z`) - new Date(`${from}T00:00:00Z`)) / 86400000) + 1;
  if (days > 90) throw Object.assign(new Error("Mỗi lần đồng bộ Google Ads tối đa 90 ngày."), { statusCode: 400 });
  const authorization = await getAuthorization(userId);
  if (!authorization) throw Object.assign(new Error("Chưa kết nối Google Ads hoặc phiên cần xác thực lại."), { statusCode: 409 });
  let accounts = await serviceRequest(`/rest/v1/google_ad_accounts?authorization_id=eq.${encodeURIComponent(authorization.id)}&selected=eq.true&select=account_id,account_name,manager_account_id,manager_account_name,currency,timezone_name`);
  if (query.business && query.business !== "all") accounts = accounts.filter((account) => (account.manager_account_id || account.account_id) === query.business);
  if (query.account && query.account !== "all") accounts = accounts.filter((account) => account.account_id === normalizeGoogleCustomerId(query.account));
  if (!accounts.length) throw Object.assign(new Error("Không có Google Ads account trong phạm vi đã chọn."), { statusCode: 404 });
  const accessToken = await activeAccessToken(authorization);
  const queryTypes = Object.keys(GOOGLE_DEEP_QUERIES);
  const tasks = accounts.flatMap((account) => queryTypes.map((type) => ({ account, type })));
  const results = await Promise.allSettled(tasks.map(async ({ account, type }) => {
    const search = (gaql) => googleAdsRequest(`customers/${normalizeGoogleCustomerId(account.account_id)}/googleAds:searchStream`, accessToken, {
      method: "POST", loginCustomerId: account.manager_account_id || undefined, body: { query: gaql }
    });
    let body;
    let partial = false;
    try {
      body = await search(GOOGLE_DEEP_QUERIES[type](from, to, true));
    } catch (error) {
      console.error(`Google deep ${type} fields rejected for ${account.account_name}, retrying core fields`, error.message);
      body = await search(GOOGLE_DEEP_QUERIES[type](from, to, false));
      partial = true;
    }
    return { rows: body.flatMap((chunk) => chunk.results || []), partial };
  }));
  const payload = { appCampaigns: [], network: [], assets: [] };
  const partialErrors = [];
  results.forEach((result, index) => {
    const { account, type } = tasks[index];
    if (result.status === "rejected") {
      partialErrors.push({ account: account.account_name, dimension: type, message: result.reason?.message || `Google ${type} query failed` });
      return;
    }
    if (result.value.partial) partialErrors.push({ account: account.account_name, dimension: type, message: "Một số metric mở rộng không tương thích; đang hiển thị core fields." });
    result.value.rows.forEach((row) => {
      const metrics = row.metrics || {};
      const common = {
        accountId: account.account_id,
        account: account.account_name,
        currency: account.currency,
        campaignId: String(row.campaign?.id || ""),
        campaignName: row.campaign?.name || String(row.campaign?.id || ""),
        spend: metricNumber(metrics.costMicros) / 1e6,
        impressions: metricNumber(metrics.impressions),
        clicks: metricNumber(metrics.clicks)
      };
      if (type === "appCampaigns") {
        const setting = row.campaign?.appCampaignSetting || {};
        payload.appCampaigns.push({
          ...common,
          status: row.campaign?.status || "UNKNOWN",
          appId: setting.appId || "",
          appStore: setting.appStore || "UNKNOWN",
          biddingGoal: setting.biddingStrategyGoalType || "UNKNOWN",
          biddingStrategy: row.campaign?.biddingStrategyType || "UNKNOWN",
          budget: metricNumber(row.campaignBudget?.amountMicros) / 1e6,
          appInstalls: optionalMetric(metrics.biddableAppInstallConversions),
          postInstallActions: optionalMetric(metrics.biddableAppPostInstallConversions),
          participatedActions: optionalMetric(metrics.biddableCohortAppPostInstallConversions),
          viewThroughConversions: optionalMetric(metrics.viewThroughConversions),
          crossDeviceConversions: optionalMetric(metrics.crossDeviceConversions)
        });
      } else if (type === "network") {
        payload.network.push({
          ...common,
          network: row.segments?.adNetworkType || "UNKNOWN",
          conversions: metricNumber(metrics.allConversions),
          conversionValue: metricNumber(metrics.allConversionsValue),
          appInstalls: optionalMetric(metrics.biddableAppInstallConversions),
          postInstallActions: optionalMetric(metrics.biddableAppPostInstallConversions),
          participatedActions: optionalMetric(metrics.biddableCohortAppPostInstallConversions),
          viewThroughConversions: optionalMetric(metrics.viewThroughConversions)
        });
      } else {
        const asset = row.asset || {};
        payload.assets.push({
          ...common,
          adGroupId: String(row.adGroup?.id || ""),
          adGroupName: row.adGroup?.name || String(row.adGroup?.id || ""),
          assetId: String(asset.id || geoId(row.adGroupAdAssetView?.asset) || ""),
          assetName: asset.name || asset.textAsset?.text || `Asset ${asset.id || ""}`.trim(),
          assetType: asset.type || row.adGroupAdAssetView?.fieldType || "UNKNOWN",
          fieldType: row.adGroupAdAssetView?.fieldType || "UNKNOWN",
          performanceLabel: row.adGroupAdAssetView?.performanceLabel || "UNKNOWN",
          thumbnailUrl: asset.imageAsset?.fullSize?.url || (asset.youtubeVideoAsset?.youtubeVideoId ? `https://i.ytimg.com/vi/${asset.youtubeVideoAsset.youtubeVideoId}/hqdefault.jpg` : ""),
          conversions: metricNumber(metrics.conversions),
          conversionValue: metricNumber(metrics.allConversionsValue),
          videoViews: optionalMetric(metrics.videoTrueviewViews),
          videoViewRate: optionalMetric(metrics.videoTrueviewViewRate, 100),
          videoP25Rate: optionalMetric(metrics.videoQuartileP25Rate, 100),
          videoP50Rate: optionalMetric(metrics.videoQuartileP50Rate, 100),
          videoP75Rate: optionalMetric(metrics.videoQuartileP75Rate, 100),
          videoP100Rate: optionalMetric(metrics.videoQuartileP100Rate, 100)
        });
      }
    });
  });
  if (results.every((result) => result.status === "rejected")) throw Object.assign(new Error(partialErrors[0]?.message || "Không thể đọc Google deep metrics."), { statusCode: 502 });
  response.setHeader("Cache-Control", "no-store");
  return response.status(200).json({ source: "google", from, to, ...payload, partialErrors, syncedAt: new Date().toISOString() });
}

function funnelStep(category, actionName) {
  if (GOOGLE_INSTALL_CATEGORIES.has(category)) return "installs";
  if (GOOGLE_REGISTRATION_CATEGORIES.has(category)) return "registrations";
  if (GOOGLE_PURCHASE_CATEGORIES.has(category)) return "purchases";
  // Firebase/GA4 app events can arrive under DEFAULT even though their action
  // name still carries the funnel meaning. Use the name only as a fallback so
  // an explicit Google category always remains authoritative.
  if (GOOGLE_INSTALL_ACTION_PATTERN.test(actionName)) return "installs";
  if (GOOGLE_REGISTRATION_ACTION_PATTERN.test(actionName)) return "registrations";
  if (GOOGLE_PURCHASE_ACTION_PATTERN.test(actionName)) return "purchases";
  return "uncategorised";
}

function entityIdOf(row, level) {
  if (level === "ad") return String(row.adGroupAd?.ad?.id || "");
  if (level === "adgroup") return String(row.adGroup?.id || "");
  return String(row.campaign?.id || "");
}

// Impression share arrives as a 0-1 ratio and is reported as a percentage.
// Google omits it entirely outside Search, so absence means "not applicable"
// rather than zero.
function googleDetail(row) {
  const metrics = row.metrics || {};
  const campaign = row.campaign || {};
  const share = (value) => optionalMetric(value, 100);
  return {
    searchImpressionShare: share(metrics.searchImpressionShare),
    searchLostIsBudget: share(metrics.searchBudgetLostImpressionShare),
    searchLostIsRank: share(metrics.searchRankLostImpressionShare),
    averageCpc: optionalMetric(metrics.averageCpc, 1e-6),
    averageCpm: optionalMetric(metrics.averageCpm, 1e-6),
    averageCpv: optionalMetric(metrics.trueviewAverageCpv ?? metrics.averageCpv, 1e-6),
    videoTrueviewViews: optionalMetric(metrics.videoTrueviewViews),
    videoViewRate: optionalMetric(metrics.videoTrueviewViewRate, 100),
    videoP50Rate: optionalMetric(metrics.videoQuartileP50Rate, 100),
    viewThroughConversions: optionalMetric(metrics.viewThroughConversions),
    interactions: optionalMetric(metrics.interactions),
    interactionRate: optionalMetric(metrics.interactionRate, 100),
    conversionRate: optionalMetric(metrics.conversionsFromInteractionsRate, 100),
    channelType: campaign.advertisingChannelType || "",
    channelSubType: campaign.advertisingChannelSubType || "",
    biddingStrategy: campaign.biddingStrategyType || ""
  };
}

function normalizedInsight(row, account, level) {
  const campaign = row.campaign || {};
  const adGroup = row.adGroup || {};
  const ad = row.adGroupAd?.ad || {};
  const entity = level === "ad" ? ad : level === "adgroup" ? adGroup : campaign;
  const metrics = row.metrics || {};
  const participatedInAppActions = optionalMetric(metrics.biddableCohortAppPostInstallConversions);
  return {
    date: row.segments?.date, entityId: String(entity.id || campaign.id), entityName: entity.name || String(entity.id || campaign.id),
    campaignId: String(campaign.id || ""), campaignName: campaign.name || String(campaign.id || ""), adsetId: adGroup.id ? String(adGroup.id) : "", adsetName: adGroup.name || "",
    adId: ad.id ? String(ad.id) : "", adName: ad.name || "", platform: "Google", businessId: account.manager_account_id || account.account_id,
    business: account.manager_account_name || "Google Ads direct", accountId: account.account_id, account: account.account_name, currency: account.currency,
    spend: metricNumber(metrics.costMicros) / 1e6,
    // Filled in from the category query. Revenue starts at the account total and
    // is narrowed to purchase categories when that query returns rows.
    revenue: metricNumber(metrics.allConversionsValue) || metricNumber(metrics.conversionsValue),
    installs: 0,
    // Product definition: Registration is the Google Ads column
    // "Participated in-app actions", not a guessed conversion-action subset.
    registrations: participatedInAppActions ?? 0,
    purchases: 0,
    // all_conversions covers every action, conversions only the biddable ones.
    conversions: metricNumber(metrics.allConversions) || metricNumber(metrics.conversions),
    biddableConversions: metricNumber(metrics.conversions),
    uncategorisedConversions: 0,
    impressions: metricNumber(metrics.impressions), clicks: metricNumber(metrics.clicks),
    status: entity.status || campaign.status || "UNKNOWN", budget: metricNumber(row.campaignBudget?.amountMicros) / 1e6,
    detail: { ...googleDetail(row), participatedInAppActions }
  };
}

// Splits the category rows into funnel steps and merges them onto the matching
// delivery row. Delivery rows remain available when the category query fails,
// but purchase revenue is not inferred from an unsegmented conversion total.
function applyConversionCategories(deliveryRows, categoryRows, level) {
  if (!categoryRows.length) return deliveryRows;
  const byKey = new Map();
  for (const row of categoryRows) {
    const key = `${entityIdOf(row, level)}:${row.segments?.date || ""}`;
    const category = row.segments?.conversionActionCategory || "UNSPECIFIED";
    const actionName = row.segments?.conversionActionName || row.segments?.conversionAction || "UNSPECIFIED";
    const conversions = metricNumber(row.metrics?.allConversions);
    const value = metricNumber(row.metrics?.allConversionsValue);
    const current = byKey.get(key) || { installs: 0, registrations: 0, purchases: 0, revenue: 0, uncategorised: 0, categories: {}, actions: {} };
    if (conversions) current.categories[category] = (current.categories[category] || 0) + conversions;
    if (conversions) current.actions[actionName] = (current.actions[actionName] || 0) + conversions;
    const step = funnelStep(category, actionName);
    if (step === "installs") current.installs += conversions;
    else if (step === "registrations") current.registrations += conversions;
    else if (step === "purchases") {
      current.purchases += conversions;
      current.revenue += value;
    } else current.uncategorised += conversions;
    byKey.set(key, current);
  }
  return deliveryRows.map((row) => {
    const split = byKey.get(`${row.entityId}:${row.date}`);
    // A delivery row with no category rows for that date had no conversions at
    // all, so its funnel steps and revenue are zero. Keeping the account-wide
    // conversions_value here would credit revenue to a day that earned none.
    if (!split) return { ...row, installs: 0, registrations: row.detail?.participatedInAppActions ?? row.registrations ?? 0, purchases: 0, revenue: 0, uncategorisedConversions: 0 };
    return {
      ...row,
      installs: split.installs,
      registrations: row.detail?.participatedInAppActions ?? split.registrations,
      purchases: split.purchases,
      uncategorisedConversions: split.uncategorised,
      conversionCategories: split.categories,
      conversionActions: split.actions,
      // Only purchase-like actions carry real revenue, so ROAS is not inflated
      // by lead or page-view conversion values.
      revenue: split.revenue
    };
  });
}

// Delivery rows are already one per entity and date, so every metric is summed.
function aggregate(rows, keyFactory) {
  const map = new Map();
  for (const row of rows) {
    const key = keyFactory(row);
    const current = map.get(key) || { ...row, spend: 0, revenue: 0, installs: 0, registrations: 0, purchases: 0, conversions: 0, biddableConversions: 0, uncategorisedConversions: 0, impressions: 0, clicks: 0, detail: { ...row.detail, averageCpv: null, videoTrueviewViews: 0, videoViewDays: 0, videoCost: 0, videoViewImpressions: 0, videoP50Impressions: 0, videoP50OpeningImpressions: 0, videoRateDays: 0, videoP50RateDays: 0, viewThroughConversions: null, interactions: 0, interactionDays: 0, conversionFromInteractionCount: 0, searchEligibleImpressions: 0, searchLostBudgetImpressions: 0, searchLostRankImpressions: 0 } };
    ["spend", "revenue", "installs", "registrations", "purchases", "conversions", "biddableConversions", "uncategorisedConversions", "impressions", "clicks"].forEach((metric) => { current[metric] += row[metric] || 0; });
    const detail = row.detail || {};
    if (detail.viewThroughConversions !== null && detail.viewThroughConversions !== undefined) {
      current.detail.viewThroughConversions = (current.detail.viewThroughConversions || 0) + detail.viewThroughConversions;
    }
    if (detail.interactions !== null && detail.interactions !== undefined) {
      current.detail.interactionDays += 1;
      current.detail.interactions += detail.interactions;
      if (detail.conversionRate !== null && detail.conversionRate !== undefined) {
        current.detail.conversionFromInteractionCount += detail.interactions * detail.conversionRate / 100;
      }
    }
    if (detail.videoTrueviewViews !== null && detail.videoTrueviewViews !== undefined) {
      current.detail.videoViewDays += 1;
      current.detail.videoTrueviewViews += detail.videoTrueviewViews;
      if (detail.averageCpv !== null && detail.averageCpv !== undefined) {
        current.detail.videoCost += detail.averageCpv * detail.videoTrueviewViews;
      }
    }
    if (detail.videoViewRate !== null && detail.videoViewRate !== undefined) {
      current.detail.videoRateDays += 1;
      current.detail.videoViewImpressions += row.impressions * detail.videoViewRate / 100;
      if (detail.videoP50Rate !== null && detail.videoP50Rate !== undefined) {
        current.detail.videoP50RateDays += 1;
        current.detail.videoP50OpeningImpressions += row.impressions * detail.videoViewRate / 100;
        current.detail.videoP50Impressions += row.impressions * detail.videoP50Rate / 100;
      }
    }
    // Search impression share is impressions / eligible impressions. A simple
    // mean across daily percentages is wrong when daily eligible volume differs,
    // so derive the denominator for a weighted range-level result.
    if (detail.searchImpressionShare !== null && detail.searchImpressionShare > 0 && row.impressions > 0) {
      const eligible = row.impressions / (detail.searchImpressionShare / 100);
      current.detail.searchEligibleImpressions += eligible;
      current.detail.searchLostBudgetImpressions += eligible * ((detail.searchLostIsBudget || 0) / 100);
      current.detail.searchLostRankImpressions += eligible * ((detail.searchLostIsRank || 0) / 100);
    }
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
    const search = (query) => googleAdsRequest(`customers/${normalizeGoogleCustomerId(account.account_id)}/googleAds:searchStream`, accessToken, {
      method: "POST", loginCustomerId: account.manager_account_id || undefined, body: { query }
    });
    // Try the full field set first, then fall back to the core one if Google
    // rejects an optional field or field combination for this account/level.
    // Losing the extra columns is better than losing the whole account's data.
    let deliveryBody;
    try {
      deliveryBody = await search(deliveryQuery(level, from, to));
    } catch (error) {
      console.error(`Google Tier 2 fields rejected for ${account.account_name}, retrying with core fields`, error.message);
      deliveryBody = await search(coreDeliveryQuery(level, from, to));
    }
    const deliveryRows = deliveryBody.flatMap((chunk) => chunk.results || []).map((row) => normalizedInsight(row, account, level));
    // The funnel split is a bonus: if it fails the workspace still shows spend,
    // impressions, clicks and total conversions instead of an empty table.
    let categoryRows = [];
    let categoryError = null;
    try {
      const categoryBody = await search(conversionQuery(level, from, to));
      categoryRows = categoryBody.flatMap((chunk) => chunk.results || []);
    } catch (error) {
      console.error("Google conversion category query failed", error.message);
      categoryError = error;
    }
    // Do not present all conversion value as purchase revenue when the
    // category query failed: that would make ROAS look valid while the funnel
    // split is unavailable. Delivery metrics remain visible and the warning is
    // returned in partialErrors for reconciliation.
    const categoryFailure = categoryError?.message || (!categoryRows.length && deliveryRows.some((row) => row.conversions > 0 || row.revenue > 0)
      ? "Google returned no conversion category rows for non-zero conversions."
      : null);
    const rows = categoryFailure
      ? deliveryRows.map((row) => ({ ...row, revenue: 0, installs: 0, registrations: row.detail?.participatedInAppActions ?? row.registrations ?? 0, purchases: 0, uncategorisedConversions: 0 }))
      : applyConversionCategories(deliveryRows, categoryRows, level);
    return {
      rows,
      categoryError: categoryFailure,
      conversionActions: categoryRows.map((row) => ({
        accountId: account.account_id,
        account: account.account_name,
        currency: account.currency,
        campaignId: String(row.campaign?.id || ""),
        campaignName: row.campaign?.name || String(row.campaign?.id || ""),
        action: row.segments?.conversionActionName || row.segments?.conversionAction || "UNSPECIFIED",
        category: row.segments?.conversionActionCategory || "UNSPECIFIED",
        source: row.segments?.externalConversionSource || "UNSPECIFIED",
        conversions: metricNumber(row.metrics?.allConversions),
        value: metricNumber(row.metrics?.allConversionsValue)
      }))
    };
  }));
  const rows = results.flatMap((item) => item.status === "fulfilled" ? item.value.rows : []);
  const conversionActions = results.flatMap((item) => item.status === "fulfilled" ? item.value.conversionActions || [] : []);
  const partialErrors = results.flatMap((item, index) => {
    if (item.status === "rejected") return [{ account: accounts[index].account_name, message: item.reason?.message || "Google Ads API error" }];
    return item.value.categoryError
      ? [{ account: accounts[index].account_name, message: `Google conversion categories: ${item.value.categoryError}` }]
      : [];
  });
  if (!rows.length && partialErrors.length === accounts.length) throw Object.assign(new Error(partialErrors[0].message), { statusCode: 502 });
  const campaigns = aggregate(rows, (row) => `${row.accountId}:${row.entityId}`).map((row) => {
    const detail = { ...row.detail };
    ["videoTrueviewViews", "videoViewDays", "videoCost", "videoViewImpressions", "videoP50Impressions", "videoP50OpeningImpressions", "videoRateDays", "videoP50RateDays", "interactions", "interactionDays", "conversionFromInteractionCount", "searchEligibleImpressions", "searchLostBudgetImpressions", "searchLostRankImpressions"].forEach((field) => delete detail[field]);
    return {
      ...row, cpi: row.installs ? row.spend / row.installs : 0, roas: row.spend ? row.revenue / row.spend : 0,
      ctr: row.impressions ? row.clicks / row.impressions * 100 : 0,
      // CVR uses total conversions because a Google account may run signup or
      // purchase goals without any install action at all.
      cvr: row.clicks ? row.conversions / row.clicks * 100 : 0,
      // Recomputed from aggregated totals so a low-spend day does not carry the
      // same weight as a high-spend one.
      detail: {
        ...detail,
        averageCpc: row.clicks ? row.spend / row.clicks : 0,
        averageCpm: row.impressions ? row.spend / row.impressions * 1000 : 0,
        averageCpv: row.detail.videoViewDays ? (row.detail.videoTrueviewViews ? row.detail.videoCost / row.detail.videoTrueviewViews : 0) : null,
        hookRate: row.detail.videoRateDays && row.impressions ? row.detail.videoViewImpressions / row.impressions * 100 : null,
        holdRate: row.detail.videoP50RateDays && row.detail.videoP50OpeningImpressions ? row.detail.videoP50Impressions / row.detail.videoP50OpeningImpressions * 100 : null,
        openingMetric: "TrueView views",
        // Google defines interaction rate as interactions / impressions and
        // conversion rate as conversions from interactions / interactions, not
        // clicks. The numerator is weighted from Google's daily rate.
        interactionRate: row.detail.interactionDays ? (row.impressions ? row.detail.interactions / row.impressions * 100 : 0) : null,
        conversionRate: row.detail.interactionDays ? (row.detail.interactions ? row.detail.conversionFromInteractionCount / row.detail.interactions * 100 : 0) : null,
        searchImpressionShare: row.detail.searchEligibleImpressions ? row.impressions / row.detail.searchEligibleImpressions * 100 : null,
        searchLostIsBudget: row.detail.searchEligibleImpressions ? row.detail.searchLostBudgetImpressions / row.detail.searchEligibleImpressions * 100 : null,
        searchLostIsRank: row.detail.searchEligibleImpressions ? row.detail.searchLostRankImpressions / row.detail.searchEligibleImpressions * 100 : null
      },
      trend: "up", market: row.account, sourceMetric: "Google Ads Participated in-app actions"
    };
  }).sort((a, b) => b.spend - a.spend);
  const daily = aggregate(rows, (row) => row.date).map((row) => ({ date: row.date, spend: row.spend, revenue: row.revenue, installs: row.installs, registrations: row.registrations, purchases: row.purchases })).sort((a, b) => a.date.localeCompare(b.date));
  // Reports which conversion categories the account actually fired. Without
  // this an empty Registrations column is indistinguishable from a mapping bug.
  const conversionBreakdown = {};
  const conversionActionBreakdown = {};
  for (const row of rows) {
    for (const [category, value] of Object.entries(row.conversionCategories || {})) {
      conversionBreakdown[category] = (conversionBreakdown[category] || 0) + value;
    }
    for (const [action, value] of Object.entries(row.conversionActions || {})) {
      conversionActionBreakdown[action] = (conversionActionBreakdown[action] || 0) + value;
    }
  }
  response.setHeader("Cache-Control", "no-store");
  return response.status(200).json({ source: "google", level, from, to, currency: [...new Set(accounts.map((account) => account.currency))].length === 1 ? accounts[0].currency : "MIXED", accounts: accounts.map((account) => ({ id: account.account_id, name: account.account_name, businessId: account.manager_account_id || account.account_id, businessName: account.manager_account_name || "Google Ads direct", currency: account.currency, timezone: account.timezone_name })), campaigns, daily, conversionBreakdown, conversionActionBreakdown, conversionActions, partialErrors, syncedAt: new Date().toISOString() });
}

function callbackPage(payload) {
  const safePayload = JSON.stringify(payload).replaceAll("<", "\\u003c");
  return `<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Google Ads connection</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f7f7fb;color:#1e1b38;font-family:system-ui,sans-serif}.card{width:min(420px,calc(100% - 40px));padding:30px;border:1px solid #e5e3ee;border-radius:18px;background:#fff;box-shadow:0 18px 50px rgba(33,27,70,.12);text-align:center}.icon{width:54px;height:54px;margin:auto;display:grid;place-items:center;border-radius:16px;color:#fff;background:#269a6d;font-size:24px;font-weight:800}h1{font-size:22px}p{color:#77738a;line-height:1.55}</style></head><body><main class="card"><div class="icon">G</div><h1>${payload.ok ? "Đã kết nối Google Ads" : "Chưa thể kết nối"}</h1><p>${payload.ok ? "Đang quay lại Ads Control để chọn tài khoản quảng cáo…" : payload.error}</p></main><script>const result=${safePayload};if(window.opener){window.opener.postMessage({type:"google-oauth-result",...result},location.origin);setTimeout(()=>window.close(),900)}else if(result.ok){setTimeout(()=>location.replace("/app#integrations"),900)}</script></body></html>`;
}

async function handleOauthStart(request, response) {
  const { user } = await requireOwner(request);
  response.setHeader("Cache-Control", "no-store");
  return response.status(200).json({ url: buildGoogleLoginUrl(user.id) });
}

async function handleOauthCallback(request, response) {
  try {
    if (request.query.error) throw Object.assign(new Error(request.query.error_description || "Người dùng đã hủy cấp quyền Google."), { statusCode: 400 });
    const state = verifyGoogleOauthState(request.query.state);
    if (!request.query.code) throw Object.assign(new Error("Thiếu authorization code từ Google."), { statusCode: 400 });
    const token = await exchangeGoogleCode(request.query.code);
    if (!token.refresh_token) throw Object.assign(new Error("Google chưa cấp refresh token. Hãy thử kết nối lại và chấp thuận toàn bộ quyền."), { statusCode: 400 });
    const identity = await googleIdentity(token.access_token);
    const expiresAt = token.expires_in ? new Date(Date.now() + Number(token.expires_in) * 1000).toISOString() : null;
    await serviceRequest("/rest/v1/google_authorizations?on_conflict=user_id", {
      method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify({
        user_id: state.userId,
        external_user_id: identity.sub || identity.email,
        external_user_name: identity.name || identity.email || "Google user",
        external_user_email: identity.email || null,
        encrypted_refresh_token: encryptGoogleToken(token.refresh_token),
        encrypted_access_token: encryptGoogleToken(token.access_token),
        token_expires_at: expiresAt, status: "active", last_error: null, updated_at: new Date().toISOString()
      })
    });
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    return response.status(200).send(callbackPage({ ok: true, name: identity.name || identity.email }));
  } catch (error) {
    console.error(error);
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    return response.status(error.statusCode || 500).send(callbackPage({ ok: false, error: error.message || "Lỗi kết nối Google." }));
  }
}

export default async function handler(request, response) {
  // OAuth callback runs before auth checks because Google redirects the browser here.
  if (request.query?.route === "callback") return handleOauthCallback(request, response);
  try {
    if (request.query?.route === "start") {
      if (request.method !== "POST") { response.setHeader("Allow", "POST"); return response.status(405).json({ error: "Method not allowed" }); }
      return await handleOauthStart(request, response);
    }
    if (request.method === "GET") {
      if (["breakdowns", "deep", "insights"].includes(request.query.mode)) {
        const { user, profile } = await requireWorkspaceViewer(request);
        const dataOwnerId = profile.role === "owner" ? user.id : await getWorkspaceOwnerId();
        if (request.query.mode === "breakdowns") return await handleBreakdowns(dataOwnerId, request.query, response);
        if (request.query.mode === "deep") return await handleDeepMetrics(dataOwnerId, request.query, response);
        return await handleInsights(dataOwnerId, request.query, response);
      }
      const { user } = await requireOwner(request);
      const { authorization, accounts } = await loadAccounts(user.id);
      response.setHeader("Cache-Control", "no-store");
      return response.status(200).json({
        connected: Boolean(authorization),
        identity: authorization ? { name: authorization.external_user_name, email: authorization.external_user_email, status: authorization.status, expiresAt: authorization.token_expires_at } : null,
        uaNames: uaNames(), accounts
      });
    }
    const { user } = await requireOwner(request);
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
