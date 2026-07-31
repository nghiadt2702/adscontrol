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

const originalFetch = globalThis.fetch;
globalThis.fetch = async (url) => {
  const isInstall = String(url).includes("installs_report");
  const body = isInstall
    ? [
        "Media Source,Platform,Install Time,Cost Value,Campaign",
        "Facebook Ads,android,2026-07-30 10:00:00,2.5,VN David Scale",
        "googleadwords_int,ios,2026-07-30 11:00:00,3.5,US Tommy AEO"
      ].join("\n")
    : [
        "Media Source,Platform,Event Time,Event Name,Event Revenue,Campaign",
        "Facebook Ads,android,2026-07-30 12:00:00,af_complete_registration,0,VN David Scale",
        "googleadwords_int,ios,2026-07-30 13:00:00,af_purchase,8,US Tommy AEO"
      ].join("\n");
  return new Response(body, { status: 200, headers: { "Content-Type": "text/csv" } });
};

const summary = await pullAppsFlyerSummary({
  appId: "com.test.app",
  from: "2026-07-30",
  to: "2026-07-31",
  token: "token"
});
assert.equal(summary.totals.installs, 2);
assert.equal(summary.totals.registrations, 1);
assert.equal(summary.totals.purchases, 1);
assert.equal(summary.totals.revenue, 8);
assert.equal(summary.rows.length, 2);
assert.equal(summary.daily.length, 2);
assert.equal(summary.rows[0].ua, "David");
assert.equal(summary.estimates.cost, false);
assert.equal(summary.estimates.revenue, false);

const merged = mergeAppsFlyerSummaries([summary, summary], {
  appId: "all",
  appIds: ["com.test.app", "id6753162472"],
  from: "2026-07-29",
  to: "2026-07-31"
});
assert.equal(merged.totals.installs, 4);
assert.equal(merged.rows.length, 2);
assert.deepEqual(merged.appIds, ["com.test.app", "id6753162472"]);

globalThis.fetch = originalFetch;
console.log("AppsFlyer connector tests passed");
