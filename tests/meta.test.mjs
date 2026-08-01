import assert from "node:assert/strict";

process.env.META_APP_ID = "test-app";
process.env.META_APP_SECRET = "test-secret";
process.env.META_REDIRECT_URI = "https://example.com/api/meta-oauth-callback";
process.env.META_TOKEN_ENCRYPTION_KEY = "local-test-encryption-key";

const {
  accountCanConnect,
  buildMetaLoginUrl,
  createOauthState,
  decryptToken,
  encryptToken,
  verifyOauthState
} = await import("../api/_lib/meta.js");

const state = createOauthState("user-123", "nonce-123", 1_000);
assert.equal(verifyOauthState(state, 2_000).userId, "user-123");
assert.throws(() => verifyOauthState(`${state}broken`, 2_000));
assert.throws(() => verifyOauthState(state, 700_000));

const encrypted = encryptToken("secret-access-token");
assert.notEqual(encrypted, "secret-access-token");
assert.equal(decryptToken(encrypted), "secret-access-token");

const loginUrl = new URL(buildMetaLoginUrl("user-123"));
assert.equal(loginUrl.hostname, "www.facebook.com");
assert.equal(loginUrl.searchParams.get("client_id"), "test-app");
assert.match(loginUrl.searchParams.get("scope"), /ads_read/);

assert.equal(accountCanConnect({ status: 1, disableReason: 0 }), true);
assert.equal(accountCanConnect({ status: 2, disableReason: 0 }), false);

console.log("Meta connector tests passed");
