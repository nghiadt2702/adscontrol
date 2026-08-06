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

const googleDeliveryRows = [{
  segments: { date: "2026-08-01" },
  campaign: { id: 1, name: "App campaign", status: "ENABLED" },
  metrics: { costMicros: "10000000", impressions: "1000", clicks: "100", conversions: "75", conversionsValue: "3200" }
}];

const googleCategoryRows = [
  ["DOWNLOAD", "40", "0"],
  ["SIGNUP", "25", "0"],
  ["PURCHASE", "10", "3000"],
  ["PAGE_VIEW", "200", "200"]
].map(([category, conversions, value]) => ({
  segments: { date: "2026-08-01", conversionActionCategory: category },
  campaign: { id: 1 },
  metrics: { conversions, conversionsValue: value }
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
assert.ok(!deliverySent.includes("segments.conversion_action_category"), "delivery query must not carry the category segment");
assert.ok(!categorySent.includes("metrics.cost_micros"), "category query must not carry cost");
assert.ok(!categorySent.includes("metrics.impressions"), "category query must not carry impressions");

// Delivery metrics come from the delivery query and are not multiplied.
assert.equal(googleCampaign.spend, 10, "spend must not be multiplied by category count");
assert.equal(googleCampaign.impressions, 1000);
assert.equal(googleCampaign.clicks, 100);
assert.equal(response.body.daily[0].spend, 10, "daily spend must not be multiplied either");

// Each funnel step reads only its own category.
assert.equal(googleCampaign.installs, 40, "installs come from DOWNLOAD only");
assert.equal(googleCampaign.registrations, 25, "registrations come from SIGNUP-like categories only");
assert.equal(googleCampaign.purchases, 10, "purchases come from PURCHASE-like categories only");
assert.equal(googleCampaign.conversions, 75, "conversions stay available as the total");
assert.equal(googleCampaign.revenue, 3000, "revenue counts purchase value only, ignoring page-view value");

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
assert.equal(degraded.conversions, 75, "total conversions survive as a fallback");

// Meta returns overlapping action types for the same event.
const meta = await import("../api/_lib/meta.js");
const metaToken = meta.encryptToken("token");
const metaRows = [{
  account_id: "act_1", account_name: "Meta Acct", campaign_id: "c1", campaign_name: "VN Purchase",
  date_start: "2026-08-01", spend: "1000", impressions: "20000",
  clicks: "900", inline_link_clicks: "300",
  actions: [
    { action_type: "omni_app_install", value: "50" },
    { action_type: "mobile_app_install", value: "50" },
    { action_type: "omni_purchase", value: "10" },
    { action_type: "purchase", value: "10" },
    { action_type: "offsite_conversion.fb_pixel_purchase", value: "10" },
    { action_type: "omni_complete_registration", value: "30" }
  ],
  action_values: [
    { action_type: "omni_purchase", value: "5000" },
    { action_type: "purchase", value: "5000" }
  ]
}];

globalThis.fetch = supabaseStub((target) => {
  if (target.includes("/rest/v1/meta_authorizations")) return { ok: true, status: 200, json: async () => [{ id: "a1", user_id: "u1", encrypted_access_token: metaToken }] };
  if (target.includes("/rest/v1/meta_ad_accounts")) return { ok: true, status: 200, json: async () => [{ account_id: "act_1", account_name: "Meta Acct", business_id: "b1", business_name: "BM", currency: "VND", timezone_name: "Asia/Ho_Chi_Minh" }] };
  if (target.includes("graph.facebook.com")) return { ok: true, status: 200, json: async () => ({ data: metaRows }) };
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

// CTR must measure clicks to the destination, not likes or profile taps.
assert.equal(metaCampaign.linkClicks, 300);
assert.ok(Math.abs(metaCampaign.ctr - 1.5) < 0.001, "CTR uses link clicks, not all clicks");

console.log("Metric semantics tests passed");
