import assert from "node:assert/strict";
import {
  getAppsFlyerConfig,
  isAuthorizedPush,
  parseCsv,
  pullAppsFlyerSummary,
  sanitizePushPayload
} from "../api/_lib/appsflyer.js";

const parsed = parseCsv('Media Source,Platform,Install Time\n"Facebook Ads",android,2026-07-30 10:00:00\n');
assert.equal(parsed.length, 1);
assert.equal(parsed[0]["Media Source"], "Facebook Ads");

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
process.env.APPSFLYER_APP_IDS = "com.test.app";
assert.equal(getAppsFlyerConfig().configured, true);

const originalFetch = globalThis.fetch;
globalThis.fetch = async (url) => {
  const isInstall = String(url).includes("installs_report");
  const body = isInstall
    ? [
        "Media Source,Platform,Install Time,Cost Value",
        "Facebook Ads,android,2026-07-30 10:00:00,2.5",
        "googleadwords_int,ios,2026-07-30 11:00:00,3.5"
      ].join("\n")
    : [
        "Media Source,Platform,Event Time,Event Name,Event Revenue",
        "Facebook Ads,android,2026-07-30 12:00:00,af_complete_registration,0",
        "googleadwords_int,ios,2026-07-30 13:00:00,af_purchase,8"
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
assert.equal(summary.daily.length, 1);

globalThis.fetch = originalFetch;
console.log("AppsFlyer connector tests passed");
