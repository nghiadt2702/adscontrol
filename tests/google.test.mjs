import assert from "node:assert/strict";

process.env.GOOGLE_ADS_CLIENT_ID = "client-id";
process.env.GOOGLE_ADS_CLIENT_SECRET = "client-secret";
process.env.GOOGLE_ADS_DEVELOPER_TOKEN = "developer-token";
process.env.GOOGLE_ADS_REDIRECT_URI = "https://example.test/api/google-oauth-callback";
process.env.GOOGLE_TOKEN_ENCRYPTION_KEY = "a-long-random-key-used-only-for-google-token-encryption";

const google = await import("../api/_lib/google.js");

const encrypted = google.encryptGoogleToken("refresh-token-value");
assert.notEqual(encrypted, "refresh-token-value");
assert.equal(google.decryptGoogleToken(encrypted), "refresh-token-value");

const state = google.createGoogleOauthState("user-1", "nonce-1", 1000);
assert.equal(google.verifyGoogleOauthState(state, 1001).userId, "user-1");
assert.throws(() => google.verifyGoogleOauthState(state, 1000 + 10 * 60 * 1000 + 1));
assert.equal(google.normalizeGoogleCustomerId("123-456-7890"), "1234567890");

globalThis.fetch = async () => ({
  ok: false,
  status: 400,
  json: async () => ({
    error: {
      code: 400,
      message: "Request contains an invalid argument.",
      details: [{ errors: [{ errorCode: { queryError: "PROHIBITED_FIELD_COMBINATION" }, message: "The field combination is not valid." }] }]
    }
  })
});
await assert.rejects(
  () => google.googleAdsRequest("customers/123/googleAds:searchStream", "token", { method: "POST", body: { query: "SELECT invalid" } }),
  /PROHIBITED_FIELD_COMBINATION: The field combination is not valid\./,
  "Google API errors must retain the actionable field/query code"
);

console.log("Google connector tests passed");
