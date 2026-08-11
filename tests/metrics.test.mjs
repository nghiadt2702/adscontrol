import assert from "node:assert/strict";

// Guards the funnel semantics of every connector. Each platform reports a
// different shape of "conversion", so these tests pin down which raw column
// feeds installs, registrations, purchases and revenue.
process.env.GOOGLE_ADS_CLIENT_ID = "id";
process.env.GOOGLE_ADS_CLIENT_SECRET = "secret";
process.env.GOOGLE_ADS_DEVELOPER_TOKEN = "dev";
process.env.GOOGLE_ADS_REDIRECT_URI = "https://example.test/api/google-oauth-callback";
process.env.GOOGLE_TOKEN_ENCRYPTION_KEY = "a-long-random-key-for-google-token-encryption";
process.env.META_APP_ID = "app";
process.env.META_APP_SECRET = "secret";
process.env.META_REDIRECT_URI = "https://example.test/api/meta-oauth-callback";
process.env.META_TOKEN_ENCRYPTION_KEY = "a-long-random-key-for-meta-token-encryption";
process.env.SUPABASE_URL = "https://supabase.test";
process.env.SUPABASE_ANON_KEY = "anon";
process.env.SUPABASE_SERVICE_ROLE_KEY = "service";
process.env.ADMIN_EMAILS = "owner@test.com";

function mockResponse() {
  return {
    statusCode: null, body: null, headers: {},
    setHeader(key, value) { this.headers[key] = value; },
    status(code) { this.statusCode = code; return this; },
    json(payload) { this.body = payload; return this; },
    send(payload) { this.body = payload; return this; }
  };
}

const insightsRequest = {
  method: "GET",
  query: { mode: "insights", from: "2026-08-01", to: "2026-08-01", business: "all", account: "all" },
  headers: { authorization: "Bearer token" }
};

function supabaseStub(table, rows) {
  return async (url) => {
    const target = String(url);
    if (target.includes("/auth/v1/user")) return { ok: true, status: 200, json: async () => ({ id: "u1", email: "owner@test.com" }) };
    if (target.includes("/rest/v1/profiles")) return { ok: true, status: 200, json: async () => [{ user_id: "u1", email: "owner@test.com", role: "owner", status: "active" }] };
    return table(target) || { ok: true, status: 200, json: async () => rows };
  };
}

// Google cannot combine segments.conversion_action_category with delivery
// metrics, so the connector issues two queries: delivery totals, then the
// conversion split. The stub answers each query shape separately.
const google = await import("../api/_lib/google.js");
const googleToken = google.encryptGoogleToken("token");

// metrics.conversions only counts biddable actions, so an app campaign reports
// installs there while registrations and purchases appear only in
// all_conversions. The stub mirrors that difference.
// Two days so the impression share averaging is exercised.
const googleDeliveryRows = [
  { segments: { date: "2026-08-01" },
    campaign: { id: 1, name: "App campaign", status: "ENABLED", advertisingChannelType: "MULTI_CHANNEL", biddingStrategyType: "TARGET_CPA" },
    metrics: { costMicros: "5000000", impressions: "500", clicks: "50", interactions: "100", interactionRate: 0.2, conversionsFromInteractionsRate: 0.2, conversions: "20", conversionsValue: "0", allConversions: "137.5", allConversionsValue: "1600", biddableCohortAppPostInstallConversions: "30", searchImpressionShare: 0.4, searchBudgetLostImpressionShare: 0.3, searchRankLostImpressionShare: 0.3, videoTrueviewViewRate: 0.4, videoQuartileP50Rate: 0.2, viewThroughConversions: "5" } },
  { segments: { date: "2026-08-02" },
    campaign: { id: 1, name: "App campaign", status: "ENABLED", advertisingChannelType: "MULTI_CHANNEL", biddingStrategyType: "TARGET_CPA" },
    metrics: { costMicros: "5000000", impressions: "500", clicks: "50", interactions: "100", interactionRate: 0.2, conversionsFromInteractionsRate: 0.2, conversions: "20", conversionsValue: "0", allConversions: "137.5", allConversionsValue: "1600", biddableCohortAppPostInstallConversions: "70", searchImpressionShare: 0.6, searchBudgetLostImpressionShare: 0.2, searchRankLostImpressionShare: 0.2, videoTrueviewViewRate: 0.6, videoQuartileP50Rate: 0.3, viewThroughConversions: "7" } }
];

const googleCategoryRows = [
  ["DOWNLOAD", "40", "0", "firebase_first_open"],
  ["SIGNUP", "25", "0", "web_signup"],
  ["DEFAULT", "7", "0", "firebase_registration_complete"],
  ["PURCHASE", "10", "3000", "in_app_purchase"],
  ["SUBSCRIBE_PAID", "3", "450", "paid_subscription"],
  ["PAGE_VIEW", "200", "200", "screen_view"]
].map(([category, conversions, value, actionName]) => ({
  segments: { date: "2026-08-02", conversionActionCategory: category, conversionActionName: actionName, conversionAction: `customers/111/conversionActions/${actionName}` },
  campaign: { id: 1 },
  metrics: { allConversions: conversions, allConversionsValue: value }
}));

let googleQueries = [];

globalThis.fetch = supabaseStub((target) => {
  if (target.includes("/rest/v1/google_authorizations")) return { ok: true, status: 200, json: async () => [{ id: "a1", user_id: "u1", encrypted_access_token: googleToken, encrypted_refresh_token: googleToken, token_expires_at: new Date(Date.now() + 3600e3).toISOString() }] };
  if (target.includes("/rest/v1/google_ad_accounts")) return { ok: true, status: 200, json: async () => [{ account_id: "111", account_name: "Acct", manager_account_id: "999", manager_account_name: "MCC", currency: "VND", timezone_name: "Asia/Ho_Chi_Minh" }] };
  return null;
}, []);

const supabaseOnly = globalThis.fetch;
globalThis.fetch = async (url, options) => {
  const target = String(url);
  if (target.includes("googleads.googleapis.com")) {
    const query = JSON.parse(options?.body || "{}").query || "";
    googleQueries.push(query);
    const isCategory = query.includes("segments.conversion_action_category");
    return { ok: true, status: 200, json: async () => [{ results: isCategory ? googleCategoryRows : googleDeliveryRows }] };
  }
  return supabaseOnly(url, options);
};

const googleHandler = (await import("../api/google-accounts.js")).default;
let response = mockResponse();
await googleHandler(insightsRequest, response);
const googleCampaign = response.body.campaigns[0];

// The category segment is illegal alongside cost or impressions, so the two
// concerns must never end up in the same SELECT.
const deliverySent = googleQueries.find((query) => query.includes("metrics.cost_micros"));
const categorySent = googleQueries.find((query) => query.includes("segments.conversion_action_category"));
assert.ok(deliverySent, "a delivery query must be sent");
assert.ok(categorySent, "a conversion category query must be sent");
assert.ok(deliverySent.includes("metrics.trueview_average_cpv"), "v25 must use the TrueView CPV field name");
assert.ok(!deliverySent.includes("metrics.average_cpv"), "the removed average_cpv field must not be queried");
assert.ok(deliverySent.includes("metrics.interactions"), "interaction count is needed to aggregate interaction rates");
assert.ok(deliverySent.includes("metrics.biddable_cohort_app_post_install_conversions"), "Registration must use Google's Participated in-app actions metric");
assert.ok(!deliverySent.includes("segments.conversion_action_category"), "delivery query must not carry the category segment");
assert.ok(!categorySent.includes("metrics.cost_micros"), "category query must not carry cost");
assert.ok(!categorySent.includes("metrics.impressions"), "category query must not carry impressions");
assert.ok(categorySent.includes("segments.conversion_action_name"), "conversion action name is needed when Firebase events use DEFAULT category");

// Delivery metrics come from the delivery query and are not multiplied by the
// number of conversion categories.
assert.equal(googleCampaign.spend, 10, "spend must not be multiplied by category count");
assert.equal(googleCampaign.impressions, 1000);
assert.equal(googleCampaign.clicks, 100);
assert.equal(response.body.daily.length, 2);
assert.equal(response.body.daily[0].spend, 5, "each day keeps its own spend");

// Each funnel step reads only its own category.
assert.equal(googleCampaign.installs, 40, "installs come from DOWNLOAD only");
assert.equal(googleCampaign.registrations, 100, "registrations equal Google's Participated in-app actions metric");
assert.equal(response.body.daily[0].registrations, 30, "daily registrations preserve Participated in-app actions by date");
assert.equal(googleCampaign.purchases, 13, "purchases include purchase and paid-subscription categories");
assert.equal(googleCampaign.conversions, 275, "conversions expose the all_conversions total");
assert.equal(googleCampaign.biddableConversions, 40, "the biddable subset stays available for reference");
// PAGE_VIEW says nothing about a funnel step, so it is reported separately
// rather than being folded into a step or silently dropped.
assert.equal(googleCampaign.uncategorisedConversions, 200, "unmapped categories stay visible");
assert.equal(googleCampaign.revenue, 3450, "revenue counts purchase value only, ignoring page-view value");
assert.equal(response.body.conversionActionBreakdown.firebase_registration_complete, 7, "action breakdown exposes registration events used by the fallback mapping");

// Tier 2: Google-only metrics live under detail.
assert.equal(googleCampaign.detail.viewThroughConversions, 12, "view-through conversions add up");
assert.equal("interactions" in googleCampaign.detail, false, "aggregation-only interaction fields stay internal");
assert.equal("searchEligibleImpressions" in googleCampaign.detail, false, "aggregation-only search fields stay internal");
// Impression share is impressions / eligible impressions, so the range result
// is weighted by the implied eligible volume rather than averaged by day.
assert.ok(Math.abs(googleCampaign.detail.searchImpressionShare - 48) < 0.001, "impression share is eligible-volume weighted");
assert.ok(Math.abs(googleCampaign.detail.searchLostIsBudget - 26) < 0.001);
assert.ok(Math.abs(googleCampaign.detail.searchLostIsRank - 26) < 0.001);
assert.equal(googleCampaign.detail.biddingStrategy, "TARGET_CPA");
assert.ok(Math.abs(googleCampaign.detail.averageCpc - 10 / 100) < 0.001, "avg CPC recomputed from totals");
assert.ok(Math.abs(googleCampaign.detail.interactionRate - 20) < 0.001, "interaction rate uses interactions, not clicks");
assert.ok(Math.abs(googleCampaign.detail.conversionRate - 20) < 0.001, "conversion rate uses Google's conversions-from-interactions rate");
assert.equal(googleCampaign.detail.averageCpv, null, "CPV is not applicable when no TrueView views are reported");
assert.ok(Math.abs(googleCampaign.detail.hookRate - 50) < 0.001, "Google Hook rate is TrueView-derived views / impressions");
assert.ok(Math.abs(googleCampaign.detail.holdRate - 50) < 0.001, "Google Hold rate is 50% views / TrueView-derived views");
assert.equal(googleCampaign.detail.openingMetric, "TrueView views");
assert.equal("conversionFromInteractionCount" in googleCampaign.detail, false, "aggregation-only conversion fields stay internal");

// If the category query fails, the workspace must still show delivery data
// rather than an empty table.
googleQueries = [];
globalThis.fetch = async (url, options) => {
  const target = String(url);
  if (target.includes("googleads.googleapis.com")) {
    const query = JSON.parse(options?.body || "{}").query || "";
    if (query.includes("segments.conversion_action_category")) {
      return { ok: false, status: 400, json: async () => ({ error: { message: "PROHIBITED_SEGMENT_WITH_METRIC_IN_SELECT_OR_WHERE_CLAUSE" } }) };
    }
    return { ok: true, status: 200, json: async () => [{ results: googleDeliveryRows }] };
  }
  return supabaseOnly(url, options);
};

response = mockResponse();
await googleHandler(insightsRequest, response);
const degraded = response.body.campaigns[0];
assert.equal(response.statusCode, 200, "a failed category query must not fail the whole sync");
assert.equal(degraded.spend, 10, "delivery metrics survive a failed category query");
assert.equal(degraded.conversions, 275, "total conversions survive as a fallback");
assert.equal(degraded.revenue, 0, "failed category data must not masquerade as purchase revenue");
assert.equal(degraded.purchases, 0, "failed category data must not masquerade as purchases");
assert.equal(response.body.partialErrors.length, 1, "category failures must be visible to the caller");

// An App or Performance Max account rejects Search-only fields. Losing the Tier 2
// columns is acceptable; losing the account's delivery data is not.
googleQueries = [];
globalThis.fetch = async (url, options) => {
  const target = String(url);
  if (target.includes("googleads.googleapis.com")) {
    const query = JSON.parse(options?.body || "{}").query || "";
    googleQueries.push(query);
    if (query.includes("metrics.search_impression_share")) {
      return { ok: false, status: 400, json: async () => ({ error: { message: "Error in query: prohibited metric for this campaign type." } }) };
    }
    const isCategory = query.includes("segments.conversion_action_category");
    return { ok: true, status: 200, json: async () => [{ results: isCategory ? googleCategoryRows : googleDeliveryRows }] };
  }
  return supabaseOnly(url, options);
};

response = mockResponse();
await googleHandler(insightsRequest, response);
assert.equal(response.statusCode, 200, "a rejected Tier 2 field must not fail the sync");
const coreOnly = response.body.campaigns[0];
assert.equal(coreOnly.spend, 10, "core delivery metrics still arrive");
assert.equal(coreOnly.installs, 40, "the funnel split still works");
assert.ok(googleQueries.some((query) => !query.includes("metrics.average_cpc") && query.includes("metrics.cost_micros")), "a core-only retry must be sent");

const breakdownRequest = {
  ...insightsRequest,
  query: { ...insightsRequest.query, mode: "breakdowns" }
};
googleQueries = [];
globalThis.fetch = async (url, options) => {
  const target = String(url);
  if (target.includes("googleads.googleapis.com")) {
    const query = JSON.parse(options?.body || "{}").query || "";
    googleQueries.push(query);
    let results = [];
    if (query.includes("FROM age_range_view")) results = [{ campaign: { id: 1, name: "App campaign" }, adGroupCriterion: { ageRange: { type: "AGE_RANGE_25_34" } }, metrics: { costMicros: "1000000", impressions: "100", clicks: "10" } }];
    else if (query.includes("FROM gender_view")) results = [{ campaign: { id: 1, name: "App campaign" }, adGroupCriterion: { gender: { type: "FEMALE" } }, metrics: { costMicros: "1000000", impressions: "100", clicks: "10" } }];
    else if (query.includes("FROM geographic_view")) results = [{ campaign: { id: 1, name: "App campaign" }, geographicView: { countryCriterionId: "2704", locationType: "LOCATION_OF_PRESENCE" }, segments: { geoTargetRegion: "geoTargetConstants/1028581" }, metrics: { costMicros: "1000000", impressions: "100", clicks: "10" } }];
    else if (query.includes("FROM geo_target_constant")) results = [
      { geoTargetConstant: { id: "2704", name: "Vietnam", canonicalName: "Vietnam" } },
      { geoTargetConstant: { id: "1028581", name: "Ho Chi Minh City", canonicalName: "Ho Chi Minh City, Vietnam" } }
    ];
    else results = [{ campaign: { id: 1, name: "App campaign" }, segments: { device: "MOBILE" }, metrics: { costMicros: "1000000", impressions: "100", clicks: "10" } }];
    return { ok: true, status: 200, json: async () => [{ results }] };
  }
  return supabaseOnly(url, options);
};
response = mockResponse();
await googleHandler(breakdownRequest, response);
assert.equal(response.statusCode, 200);
assert.equal(response.body.breakdowns.age[0].label, "25–34");
assert.equal(response.body.breakdowns.gender[0].label, "Nữ");
assert.equal(response.body.breakdowns.device[0].key, "MOBILE");
assert.equal(response.body.breakdowns.country[0].label, "Vietnam");
assert.equal(response.body.breakdowns.region[0].label, "Ho Chi Minh City, Vietnam");
assert.ok(googleQueries.every((query) => !(query.includes("age_range_view") && query.includes("gender_view"))), "Google age and gender must stay in separate GAQL queries");

// Meta returns overlapping action types for the same event.
const meta = await import("../api/_lib/meta.js");
const metaToken = meta.encryptToken("token");
const metaRows = [{
  account_id: "act_1", account_name: "Meta Acct", campaign_id: "c1", campaign_name: "VN Purchase",
  adset_id: "s1", adset_name: "Broad", ad_id: "ad1", ad_name: "V1-2608-VA · Video",
  date_start: "2026-08-01", spend: "1000", impressions: "20000",
  clicks: "900", inline_link_clicks: "300",
  actions: [
    { action_type: "omni_app_install", value: "50" },
    { action_type: "mobile_app_install", value: "50" },
    { action_type: "omni_purchase", value: "10" },
    { action_type: "purchase", value: "10" },
    { action_type: "offsite_conversion.fb_pixel_purchase", value: "10" },
    { action_type: "omni_complete_registration", value: "30" },
    { action_type: "video_view", value: "5000" }
  ],
  action_values: [
    { action_type: "omni_purchase", value: "5000" },
    { action_type: "purchase", value: "5000" }
  ],
  reach: "12000",
  outbound_clicks: [{ action_type: "outbound_click", value: "250" }],
  video_thruplay_watched_actions: [{ action_type: "video_view", value: "4000" }],
  video_p25_watched_actions: [{ action_type: "video_view", value: "8000" }],
  video_p50_watched_actions: [{ action_type: "video_view", value: "2000" }],
  video_p100_watched_actions: [{ action_type: "video_view", value: "1500" }],
  quality_ranking: "ABOVE_AVERAGE",
  engagement_rate_ranking: "AVERAGE",
  conversion_rate_ranking: "BELOW_AVERAGE_35"
}];

globalThis.fetch = supabaseStub((target) => {
  if (target.includes("/rest/v1/meta_authorizations")) return { ok: true, status: 200, json: async () => [{ id: "a1", user_id: "u1", encrypted_access_token: metaToken }] };
  if (target.includes("/rest/v1/meta_ad_accounts")) return { ok: true, status: 200, json: async () => [{ account_id: "act_1", account_name: "Meta Acct", business_id: "b1", business_name: "BM", currency: "VND", timezone_name: "Asia/Ho_Chi_Minh" }] };
  if (target.includes("graph.facebook.com")) {
    const url = new URL(target);
    if (/\/act_1\/(campaigns|adsets|ads)$/.test(url.pathname)) {
      const id = url.pathname.endsWith("/ads") ? "ad1" : url.pathname.endsWith("/adsets") ? "set1" : "c1";
      return { ok: true, status: 200, json: async () => ({ data: [{ id, configured_status: "ACTIVE", effective_status: "ACTIVE" }] }) };
    }
    if (url.searchParams.has("ids")) {
      const ids = url.searchParams.get("ids").split(",");
      return { ok: true, status: 200, json: async () => ({ ad1: { id: "ad1", creative: { id: "creative1", thumbnail_url: "https://cdn.test/thumb.jpg", video_id: "video1" } } }) };
    }
    const breakdown = url.searchParams.get("breakdowns");
    if (breakdown) return { ok: true, status: 200, json: async () => ({ data: [{
      account_id: "act_1", account_name: "Meta Acct", campaign_id: "c1", campaign_name: "VN Purchase",
      [breakdown]: { age: "25-34", gender: "female", device_platform: "mobile_app", country: "VN", region: "Ho Chi Minh City" }[breakdown],
      spend: "1000", impressions: "20000", clicks: "900", inline_link_clicks: "300"
    }] }) };
    return { ok: true, status: 200, json: async () => ({ data: metaRows }) };
  }
  return null;
}, []);

const metaHandler = (await import("../api/meta-accounts.js")).default;
response = mockResponse();
await metaHandler(insightsRequest, response);
const metaCampaign = response.body.campaigns[0];

// Overlapping action types describe the same event and must not be summed.
assert.equal(metaCampaign.installs, 50, "omni and mobile install are the same event");
assert.equal(metaCampaign.purchases, 10, "omni, pixel and bare purchase are the same event");
assert.equal(metaCampaign.revenue, 5000, "purchase value must not be double counted");
assert.equal(metaCampaign.registrations, 30);
assert.equal(metaCampaign.configuredStatus, "ACTIVE", "Meta switch reads configured_status rather than treating an unread status as off");
assert.equal(metaCampaign.status, "ACTIVE");
response = mockResponse();
await metaHandler(breakdownRequest, response);
assert.equal(response.statusCode, 200);
assert.equal(response.body.breakdowns.age[0].label, "25-34");
assert.equal(response.body.breakdowns.gender[0].label, "female");
assert.equal(response.body.breakdowns.device[0].key, "mobile_app");
assert.equal(response.body.breakdowns.country[0].key, "VN");
assert.equal(response.body.breakdowns.region[0].label, "Ho Chi Minh City");

// CTR must measure clicks to the destination, not likes or profile taps.
assert.equal(metaCampaign.linkClicks, 300);
assert.ok(Math.abs(metaCampaign.ctr - 1.5) < 0.001, "CTR uses link clicks, not all clicks");

// Tier 2: Meta-only metrics live under detail and never in the unified fields.
assert.equal(metaCampaign.detail.reach, 12000);
assert.ok(Math.abs(metaCampaign.detail.frequency - 20000 / 12000) < 0.001, "frequency is impressions over reach");
assert.equal(metaCampaign.detail.thruPlays, 4000);
assert.equal(metaCampaign.detail.videoP100, 1500);
assert.ok(Math.abs(metaCampaign.detail.hookRate - 25) < 0.001, "Meta Hook rate is 3-second plays / impressions");
assert.ok(Math.abs(metaCampaign.detail.holdRate - 40) < 0.001, "Meta Hold rate is 50% views / 3-second plays");
assert.equal(metaCampaign.detail.openingMetric, "3-second video plays");
assert.equal(metaCampaign.detail.qualityRanking, "ABOVE_AVERAGE");
// Cost per 1,000 reached is not the same as CPM, because one person can be
// reached several times.
assert.ok(Math.abs(metaCampaign.detail.costPer1kReached - 1000 / 12000 * 1000) < 0.001);

// Ad-level sync enriches the performance row with the creative thumbnail.
const adLevelUrls = [];
const campaignLevelMetaFetch = globalThis.fetch;
globalThis.fetch = async (url, options) => {
  if (String(url).includes("graph.facebook.com")) adLevelUrls.push(String(url));
  return campaignLevelMetaFetch(url, options);
};
response = mockResponse();
await metaHandler({ ...insightsRequest, query: { ...insightsRequest.query, level: "ad" } }, response);
assert.equal(response.body.campaigns[0].creativeId, "creative1");
assert.equal(response.body.campaigns[0].thumbnailUrl, "https://cdn.test/thumb.jpg");
const adInsightsUrl = adLevelUrls.find((url) => decodeURIComponent(url).includes("level=ad"));
assert.ok(adInsightsUrl, "ad-level creative sync sends an insights request");
assert.ok(!adInsightsUrl.includes("time_increment"), "ad-level creative sync must aggregate the range instead of requesting daily rows");
globalThis.fetch = campaignLevelMetaFetch;

// Attribution window: the request must carry it and the response must state it,
// so a purchase count can be reconciled with Ads Manager.
let metaUrls = [];
const metaFetch = globalThis.fetch;
globalThis.fetch = async (url, options) => {
  if (String(url).includes("graph.facebook.com")) metaUrls.push(String(url));
  return metaFetch(url, options);
};

response = mockResponse();
await metaHandler({ ...insightsRequest, query: { ...insightsRequest.query, attribution: "1d_click" } }, response);
assert.deepEqual(response.body.attribution, ["1d_click"], "an explicit window is honoured");
assert.ok(metaUrls.some((url) => url.includes("action_attribution_windows")), "the window is sent to Meta");
assert.ok(metaUrls.some((url) => decodeURIComponent(url).includes('["1d_click"]')));

// An unknown window must fall back rather than be forwarded to Meta.
metaUrls = [];
response = mockResponse();
await metaHandler({ ...insightsRequest, query: { ...insightsRequest.query, attribution: "9d_click" } }, response);
assert.deepEqual(response.body.attribution, ["7d_click", "1d_view"], "an invalid window falls back to the default");
assert.ok(!metaUrls.some((url) => decodeURIComponent(url).includes("9d_click")), "an invalid window is never forwarded");

console.log("Metric semantics tests passed");
