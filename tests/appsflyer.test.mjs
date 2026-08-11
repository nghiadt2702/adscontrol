import assert from "node:assert/strict";
import {
  getAppsFlyerConfig,
  inferOsFromAppId,
  inferUaFromCampaign,
  isAuthorizedPush,
  mergeAppsFlyerSummaries,
  parseCsv,
  pullAppsFlyerSummary,
  sanitizePushPayload
} from "../api/_lib/appsflyer.js";

const parsed = parseCsv('Media Source,Platform,Install Time\n"Facebook Ads",android,2026-07-30 10:00:00\n');
assert.equal(parsed.length, 1);
assert.equal(parsed[0]["Media Source"], "Facebook Ads");
assert.equal(inferUaFromCampaign("VN_Android_David_Meta_Scale"), "David");
assert.equal(inferUaFromCampaign("Tommy | Google | AEO"), "Tommy");
assert.equal(inferUaFromCampaign("Nelson-TikTok-Test"), "Nelson");
assert.equal(inferUaFromCampaign("Brand campaign"), "Unassigned");
assert.equal(inferOsFromAppId("com.sixlive.mvvm"), "Android");
assert.equal(inferOsFromAppId("id6753162472"), "iOS");

const sanitized = sanitizePushPayload({
  app_id: "com.test.app",
  event_name: "af_purchase",
  advertising_id: "secret-device-id",
  ip: "127.0.0.1"
});
assert.equal(sanitized.app_id, "com.test.app");
assert.equal(sanitized.advertising_id, undefined);
assert.equal(sanitized.ip, undefined);

process.env.APPSFLYER_PUSH_SECRET = "push-secret";
assert.equal(isAuthorizedPush({
  url: "/api/appsflyer-push?key=push-secret",
  headers: { host: "localhost" }
}), true);
assert.equal(isAuthorizedPush({
  url: "/api/appsflyer-push?key=wrong",
  headers: { host: "localhost" }
}), false);

process.env.APPSFLYER_API_TOKEN = "token";
process.env.APPSFLYER_APP_IDS = "com.test.app,id6753162472";
assert.equal(getAppsFlyerConfig().configured, true);
assert.deepEqual(getAppsFlyerConfig().appIds, ["com.test.app", "id6753162472"]);
assert.equal(getAppsFlyerConfig().timezone, "Asia/Ho_Chi_Minh");

const originalFetch = globalThis.fetch;
const requestedReports = [];
globalThis.fetch = async (url) => {
  const requestUrl = new URL(url);
  requestedReports.push(requestUrl.pathname);
  assert.equal(requestUrl.searchParams.get("timezone"), "Asia/Ho_Chi_Minh");
  let body;
  if (requestUrl.pathname.includes("organic_installs_report")) {
    body = [
      "Media Source,Platform,Install Time,Cost Value,Cost Currency,Campaign",
      "Organic,android,2026-07-30 09:00:00,0,USD,"
    ].join("\n");
  } else if (requestUrl.pathname.includes("installs_report")) {
    body = [
        "Media Source,Platform,Install Time,Cost Value,Cost Currency,Campaign",
        "Facebook Ads,android,2026-07-30 10:00:00,2.5,USD,VN David Scale",
        "googleadwords_int,ios,2026-07-30 11:00:00,3.5,USD,US Tommy AEO",
        "Social_facebook_mkt,android,2026-07-30 11:30:00,0,USD,Social"
      ].join("\n");
  } else if (requestUrl.pathname.includes("organic_in_app_events_report")) {
    body = [
      "Media Source,Platform,Event Time,Event Name,Event Revenue,Event Revenue Currency,Campaign",
      "Organic,android,2026-07-30 12:30:00,af_complete_registration,0,USD,"
    ].join("\n");
  } else {
    body = [
        "Media Source,Platform,Event Time,Event Name,Event Revenue,Event Revenue Currency,Campaign",
        "Facebook Ads,android,2026-07-30 12:00:00,af_complete_registration,0,USD,VN David Scale",
        "googleadwords_int,ios,2026-07-30 13:00:00,af_purchase,8,USD,US Tommy AEO"
      ].join("\n");
  }
  return new Response(body, { status: 200, headers: { "Content-Type": "text/csv" } });
};

const summary = await pullAppsFlyerSummary({
  appId: "com.test.app",
  from: "2026-07-30",
  to: "2026-07-31",
  token: "token"
});
assert.equal(summary.totals.installs, 4);
assert.equal(summary.totals.registrations, 2);
assert.equal(summary.totals.purchases, 1);
assert.equal(summary.totals.revenue, 8);
assert.equal(summary.rows.length, 4);
assert.equal(summary.daily.length, 4);
assert.equal(summary.rows.find((row) => row.mediaSource === "Facebook Ads").ua, "David");
assert.equal(summary.rows.find((row) => row.mediaSource === "Social_facebook_mkt").platform, "Other");
assert.equal(summary.rows.find((row) => row.mediaSource === "Organic").registrations, 1);
assert.equal(summary.rowCounts.paidInstalls, 3);
assert.equal(summary.rowCounts.organicInstalls, 1);
assert.equal(summary.estimates.cost, false);
assert.equal(summary.estimates.revenue, false);
assert.equal(requestedReports.length, 4);

globalThis.fetch = async (url) => {
  const requestUrl = new URL(url);
  const isInstalls = requestUrl.pathname.includes("installs_report");
  const isOrganic = requestUrl.pathname.includes("organic_");
  const body = isInstalls
    ? ["Media Source,Platform,Install Time,Cost Value,Campaign", `${isOrganic ? "Organic" : "Facebook Ads"},android,2026-07-30 10:00:00,,VN David Scale`].join("\n")
    : ["Media Source,Platform,Event Time,Event Name,Event Revenue,Campaign", `${isOrganic ? "Organic" : "Facebook Ads"},android,2026-07-30 12:00:00,af_complete_registration,,VN David Scale`].join("\n");
  return new Response(body, { status: 200, headers: { "Content-Type": "text/csv" } });
};
const unavailableMoney = await pullAppsFlyerSummary({
  appId: "com.test.app",
  from: "2026-07-30",
  to: "2026-07-30",
  token: "token"
});
assert.deepEqual(unavailableMoney.availability, { cost: false, revenue: false });
assert.equal(unavailableMoney.totals.cost, 0);
assert.equal(unavailableMoney.totals.revenue, 0);
assert.equal(unavailableMoney.totals.cpi, null);
assert.equal(unavailableMoney.totals.roas, null);
assert.equal(unavailableMoney.rows.filter((row) => row.platform !== "Organic").every((row) => row.costAvailable === false), true);
assert.equal(unavailableMoney.rows.every((row) => row.revenueAvailable === false), true);

const merged = mergeAppsFlyerSummaries([summary, summary], {
  appId: "all",
  appIds: ["com.test.app", "id6753162472"],
  from: "2026-07-29",
  to: "2026-07-31"
});
assert.equal(merged.totals.installs, 8);
assert.equal(merged.totals.registrations, 4);
assert.equal(merged.rows.length, 4);
assert.deepEqual(merged.appIds, ["com.test.app", "id6753162472"]);

globalThis.fetch = originalFetch;
console.log("AppsFlyer connector tests passed");
