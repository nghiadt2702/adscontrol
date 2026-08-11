import crypto from "node:crypto";

const DEFAULT_GRAPH_VERSION = "v24.0";

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    const error = new Error(`Missing server configuration: ${name}`);
    error.statusCode = 503;
    throw error;
  }
  return value;
}

export function getMetaConfig() {
  return {
    appId: requiredEnv("META_APP_ID"),
    appSecret: requiredEnv("META_APP_SECRET"),
    redirectUri: requiredEnv("META_REDIRECT_URI"),
    encryptionKey: requiredEnv("META_TOKEN_ENCRYPTION_KEY"),
    graphVersion: process.env.META_GRAPH_VERSION || DEFAULT_GRAPH_VERSION,
    scopes: (process.env.META_SCOPES || "public_profile,ads_read,ads_management,business_management")
      .split(",")
      .map((scope) => scope.trim())
      .filter(Boolean)
  };
}

function base64url(value) {
  return Buffer.from(value).toString("base64url");
}

export function createOauthState(userId, nonce = crypto.randomUUID(), now = Date.now()) {
  const { appSecret } = getMetaConfig();
  const payload = base64url(JSON.stringify({ userId, nonce, exp: now + 10 * 60 * 1000 }));
  const signature = crypto.createHmac("sha256", appSecret).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function verifyOauthState(state, now = Date.now()) {
  const { appSecret } = getMetaConfig();
  const [payload, signature] = String(state || "").split(".");
  if (!payload || !signature) throw Object.assign(new Error("OAuth state không hợp lệ."), { statusCode: 400 });
  const expected = crypto.createHmac("sha256", appSecret).update(payload).digest();
  const actual = Buffer.from(signature, "base64url");
  if (actual.length !== expected.length || !crypto.timingSafeEqual(actual, expected)) {
    throw Object.assign(new Error("OAuth state không hợp lệ."), { statusCode: 400 });
  }
  const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
  if (!parsed.userId || !parsed.exp || parsed.exp < now) {
    throw Object.assign(new Error("Phiên kết nối Meta đã hết hạn. Vui lòng thử lại."), { statusCode: 400 });
  }
  return parsed;
}

function deriveKey(secret) {
  return crypto.createHash("sha256").update(secret).digest();
}

export function encryptToken(token) {
  const { encryptionKey } = getMetaConfig();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", deriveKey(encryptionKey), iv);
  const ciphertext = Buffer.concat([cipher.update(token, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [iv, tag, ciphertext].map((part) => part.toString("base64url")).join(".");
}

export function decryptToken(value) {
  const { encryptionKey } = getMetaConfig();
  const [ivValue, tagValue, ciphertextValue] = String(value || "").split(".");
  if (!ivValue || !tagValue || !ciphertextValue) throw new Error("Meta token không hợp lệ.");
  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    deriveKey(encryptionKey),
    Buffer.from(ivValue, "base64url")
  );
  decipher.setAuthTag(Buffer.from(tagValue, "base64url"));
  return Buffer.concat([
    decipher.update(Buffer.from(ciphertextValue, "base64url")),
    decipher.final()
  ]).toString("utf8");
}

export function buildMetaLoginUrl(userId) {
  const config = getMetaConfig();
  const url = new URL(`https://www.facebook.com/${config.graphVersion}/dialog/oauth`);
  url.searchParams.set("client_id", config.appId);
  url.searchParams.set("redirect_uri", config.redirectUri);
  url.searchParams.set("state", createOauthState(userId));
  url.searchParams.set("scope", config.scopes.join(","));
  url.searchParams.set("response_type", "code");
  url.searchParams.set("auth_type", "rerequest");
  return url.toString();
}

export async function graphRequest(path, accessToken, params = {}, options = {}) {
  const { appSecret, graphVersion } = getMetaConfig();
  const url = new URL(`https://graph.facebook.com/${graphVersion}/${path.replace(/^\//, "")}`);
  Object.entries(params).forEach(([key, value]) => value != null && url.searchParams.set(key, String(value)));
  url.searchParams.set("access_token", accessToken);
  url.searchParams.set(
    "appsecret_proof",
    crypto.createHmac("sha256", appSecret).update(accessToken).digest("hex")
  );
  const response = await fetch(url, {
    method: options.method || "GET",
    headers: options.method === "POST" ? { "Content-Type": "application/json" } : undefined,
    ...(options.method === "POST" ? { body: JSON.stringify(options.body || {}) } : {})
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok || body.error) {
    const error = new Error(body.error?.message || "Meta API request failed");
    error.statusCode = response.status === 401 ? 401 : 502;
    error.details = body.error;
    throw error;
  }
  return body;
}

export async function revokeMetaAuthorization(accessToken) {
  const { appSecret, graphVersion } = getMetaConfig();
  const url = new URL(`https://graph.facebook.com/${graphVersion}/me/permissions`);
  url.searchParams.set("access_token", accessToken);
  url.searchParams.set("appsecret_proof", crypto.createHmac("sha256", appSecret).update(accessToken).digest("hex"));
  const response = await fetch(url, { method: "DELETE" });
  if (!response.ok) throw new Error("Meta permission revocation failed");
}

export async function exchangeCode(code) {
  const config = getMetaConfig();
  const tokenUrl = new URL(`https://graph.facebook.com/${config.graphVersion}/oauth/access_token`);
  tokenUrl.searchParams.set("client_id", config.appId);
  tokenUrl.searchParams.set("client_secret", config.appSecret);
  tokenUrl.searchParams.set("redirect_uri", config.redirectUri);
  tokenUrl.searchParams.set("code", code);
  const shortResponse = await fetch(tokenUrl);
  const shortBody = await shortResponse.json().catch(() => ({}));
  if (!shortResponse.ok || !shortBody.access_token) {
    throw Object.assign(new Error(shortBody.error?.message || "Không thể đổi mã OAuth Meta."), { statusCode: 400 });
  }

  const longUrl = new URL(`https://graph.facebook.com/${config.graphVersion}/oauth/access_token`);
  longUrl.searchParams.set("grant_type", "fb_exchange_token");
  longUrl.searchParams.set("client_id", config.appId);
  longUrl.searchParams.set("client_secret", config.appSecret);
  longUrl.searchParams.set("fb_exchange_token", shortBody.access_token);
  const longResponse = await fetch(longUrl);
  const longBody = await longResponse.json().catch(() => ({}));
  return longResponse.ok && longBody.access_token ? longBody : shortBody;
}

export async function fetchAllAdAccounts(accessToken) {
  const fields = "id,account_id,name,currency,timezone_name,account_status,disable_reason,business{id,name}";
  let page = await graphRequest("me/adaccounts", accessToken, { fields, limit: 200 });
  const accounts = [];
  while (page) {
    accounts.push(...(page.data || []));
    const after = page.paging?.next && page.paging?.cursors?.after;
    page = after ? await graphRequest("me/adaccounts", accessToken, { fields, limit: 200, after }) : null;
  }
  return accounts.map((account) => ({
    id: account.id,
    accountId: account.account_id,
    name: account.name,
    currency: account.currency,
    timezone: account.timezone_name,
    status: Number(account.account_status || 0),
    disableReason: Number(account.disable_reason || 0),
    business: account.business || { id: "personal", name: "Tài khoản cá nhân" }
  }));
}

export function accountCanConnect(account) {
  return account.status === 1 && account.disableReason === 0;
}
