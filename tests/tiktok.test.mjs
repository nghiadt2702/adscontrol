import assert from "node:assert/strict";

process.env.TIKTOK_APP_ID = "app-id";
process.env.TIKTOK_APP_SECRET = "app-secret";
process.env.TIKTOK_REDIRECT_URI = "https://example.test/api/tiktok-oauth-callback";
process.env.TIKTOK_TOKEN_ENCRYPTION_KEY = "a-long-random-key-used-only-for-tiktok-token-encryption";

const tiktok = await import("../api/_lib/tiktok.js");

const encrypted = tiktok.encryptTiktokToken("access-token-value");
assert.notEqual(encrypted, "access-token-value");
assert.equal(tiktok.decryptTiktokToken(encrypted), "access-token-value");

const state = tiktok.createTiktokOauthState("user-1", "nonce-1", 1000);
assert.equal(tiktok.verifyTiktokOauthState(state, 1001).userId, "user-1");
assert.throws(() => tiktok.verifyTiktokOauthState(state, 1000 + 10 * 60 * 1000 + 1));
assert.throws(() => tiktok.verifyTiktokOauthState("tampered.signature"));

assert.equal(tiktok.normalizeTiktokAdvertiserId("adv-123-456"), "123456");
assert.equal(tiktok.tiktokReportLevel("adgroup"), "adgroup");
assert.equal(tiktok.tiktokReportLevel("unknown"), "campaign");

// The portal auth URL must carry app_id, redirect_uri and a signed state.
const loginUrl = new URL(tiktok.buildTiktokLoginUrl("user-1"));
assert.equal(loginUrl.origin + loginUrl.pathname, "https://business-api.tiktok.com/portal/auth");
assert.equal(loginUrl.searchParams.get("app_id"), "app-id");
assert.equal(loginUrl.searchParams.get("redirect_uri"), "https://example.test/api/tiktok-oauth-callback");
assert.equal(tiktok.verifyTiktokOauthState(loginUrl.searchParams.get("state")).userId, "user-1");

// Report rows are normalized to the shared workspace campaign shape.
const account = {
  account_id: "7001", account_name: "Northstar TikTok",
  business_center_id: "9001", business_center_name: "Northstar BC", currency: "VND"
};
const campaignRow = tiktok.normalizeTiktokInsight({
  dimensions: { campaign_id: "111", stat_time_day: "2026-08-01 00:00:00" },
  metrics: {
    campaign_name: "VN · iOS · Purchase", spend: "1250.5", impressions: "10000", clicks: "250",
    real_time_app_install: "40", registration: "25", purchase: "10", total_purchase_value: "3000",
    video_watched_2s: "4000", video_views_p50: "1600"
  }
}, account, "campaign");
assert.equal(campaignRow.platform, "TikTok");
assert.equal(campaignRow.date, "2026-08-01");
assert.equal(campaignRow.entityId, "111");
assert.equal(campaignRow.entityName, "VN · iOS · Purchase");
assert.equal(campaignRow.spend, 1250.5);
assert.equal(campaignRow.installs, 40);
assert.equal(campaignRow.registrations, 25);
assert.equal(campaignRow.purchases, 10);
assert.equal(campaignRow.revenue, 3000);
assert.equal(campaignRow.businessId, "9001");
assert.equal(campaignRow.accountId, "7001");
assert.equal(campaignRow.detail.openingViews, 4000, "TikTok Hook rate starts from 2-second video views");
assert.equal(campaignRow.detail.midpointViews, 1600, "TikTok Hold rate uses 50% video views");
assert.equal(campaignRow.detail.openingMetric, "2-second video views");

// Ad group rows expose the parent campaign so the workspace can show hierarchy.
const adgroupRow = tiktok.normalizeTiktokInsight({
  dimensions: { adgroup_id: "222", stat_time_day: "2026-08-02 00:00:00" },
  metrics: { adgroup_name: "Broad · UGC", campaign_id: "111", campaign_name: "VN · iOS · Purchase", spend: "10", conversion: "5" }
}, account, "adgroup");
assert.equal(adgroupRow.entityId, "222");
assert.equal(adgroupRow.entityName, "Broad · UGC");
assert.equal(adgroupRow.campaignId, "111");
// conversion is the total of every optimisation event, so it must not be read
// as installs or registrations. Only the dedicated columns feed those.
assert.equal(adgroupRow.installs, 0);
assert.equal(adgroupRow.registrations, 0);
assert.equal(adgroupRow.conversions, 5);

// The delayed app_install column is the same event as the real-time one.
const delayedInstallRow = tiktok.normalizeTiktokInsight({
  dimensions: { campaign_id: "444", stat_time_day: "2026-08-04 00:00:00" },
  metrics: { campaign_name: "Delayed", spend: "10", app_install: "7", conversion: "99" }
}, account, "campaign");
assert.equal(delayedInstallRow.installs, 7);
assert.equal(delayedInstallRow.registrations, 0);

// When TikTok omits the level id, the row still gets an id and a label.
const sparseRow = tiktok.normalizeTiktokInsight({
  dimensions: { campaign_id: "333", stat_time_day: "2026-08-03 00:00:00" },
  metrics: { campaign_name: "Fallback campaign", spend: "5" }
}, account, "adgroup");
assert.equal(sparseRow.entityId, "333");
assert.equal(sparseRow.entityName, "Fallback campaign");
assert.equal(sparseRow.detail.openingAvailable, false, "an omitted video metric remains unavailable");

const zeroVideoRow = tiktok.normalizeTiktokInsight({
  dimensions: { campaign_id: "555" },
  metrics: { campaign_name: "Zero video", impressions: "100", video_watched_2s: "0", video_views_p50: "0" }
}, account, "campaign");
assert.equal(zeroVideoRow.detail.openingAvailable, true, "an explicit zero is not treated as missing");
assert.equal(zeroVideoRow.detail.midpointAvailable, true);

// A row with no names at all must not render blank.
const unnamedRow = tiktok.normalizeTiktokInsight({ dimensions: {}, metrics: { spend: "1" } }, account, "campaign");
assert.equal(unnamedRow.entityName, "(không có tên)");

console.log("TikTok connector tests passed");
