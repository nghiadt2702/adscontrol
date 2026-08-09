import crypto from "node:crypto";

const DEFAULT_API_VERSION = "v25";
const ADS_SCOPE = "https://www.googleapis.com/auth/adwords";

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    const error = new Error(`Missing server configuration: ${name}`);
    error.statusCode = 503;
    throw error;
  }
  return value;
}

export function getGoogleConfig() {
  return {
    clientId: requiredEnv("GOOGLE_ADS_CLIENT_ID"),
    clientSecret: requiredEnv("GOOGLE_ADS_CLIENT_SECRET"),
    developerToken: requiredEnv("GOOGLE_ADS_DEVELOPER_TOKEN"),
    redirectUri: requiredEnv("GOOGLE_ADS_REDIRECT_URI"),
    encryptionKey: requiredEnv("GOOGLE_TOKEN_ENCRYPTION_KEY"),
    apiVersion: process.env.GOOGLE_ADS_API_VERSION || DEFAULT_API_VERSION
  };
}

function encode(value) {
  return Buffer.from(value).toString("base64url");
}

function sign(payload) {
  return crypto.createHmac("sha256", getGoogleConfig().clientSecret).update(payload).digest("base64url");
}

export function createGoogleOauthState(userId, nonce = crypto.randomUUID(), now = Date.now()) {
  const payload = encode(JSON.stringify({ userId, nonce, exp: now + 10 * 60 * 1000 }));
  return `${payload}.${sign(payload)}`;
}

export function verifyGoogleOauthState(state, now = Date.now()) {
  const [payload, signature] = String(state || "").split(".");
  if (!payload || !signature) throw Object.assign(new Error("OAuth state Google không hợp lệ."), { statusCode: 400 });
  const expected = Buffer.from(sign(payload));
  const actual = Buffer.from(signature);
  if (actual.length !== expected.length || !crypto.timingSafeEqual(actual, expected)) {
    throw Object.assign(new Error("OAuth state Google không hợp lệ."), { statusCode: 400 });
  }
  const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
  if (!parsed.userId || !parsed.exp || parsed.exp < now) {
    throw Object.assign(new Error("Phiên kết nối Google đã hết hạn. Vui lòng thử lại."), { statusCode: 400 });
  }
  return parsed;
}

function encryptionKey() {
  return crypto.createHash("sha256").update(getGoogleConfig().encryptionKey).digest();
}

export function encryptGoogleToken(value) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", encryptionKey(), iv);
  const ciphertext = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  return [iv, cipher.getAuthTag(), ciphertext].map((part) => part.toString("base64url")).join(".");
}

export function decryptGoogleToken(value) {
  const [iv, tag, ciphertext] = String(value || "").split(".");
  if (!iv || !tag || !ciphertext) throw new Error("Google token không hợp lệ.");
  const decipher = crypto.createDecipheriv("aes-256-gcm", encryptionKey(), Buffer.from(iv, "base64url"));
  decipher.setAuthTag(Buffer.from(tag, "base64url"));
  return Buffer.concat([decipher.update(Buffer.from(ciphertext, "base64url")), decipher.final()]).toString("utf8");
}

export function buildGoogleLoginUrl(userId) {
  const config = getGoogleConfig();
  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.searchParams.set("client_id", config.clientId);
  url.searchParams.set("redirect_uri", config.redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", `openid email profile ${ADS_SCOPE}`);
  url.searchParams.set("access_type", "offline");
  url.searchParams.set("prompt", "consent");
  url.searchParams.set("include_granted_scopes", "true");
  url.searchParams.set("state", createGoogleOauthState(userId));
  return url.toString();
}

async function parseGoogleResponse(response, fallback) {
  const body = await response.json().catch(() => ({}));
  if (!response.ok || body.error) {
    const apiError = body.error && typeof body.error === "object" ? body.error : {};
    const nestedErrors = [
      ...(Array.isArray(apiError.errors) ? apiError.errors : []),
      ...(Array.isArray(apiError.details) ? apiError.details.flatMap((detail) => Array.isArray(detail.errors) ? detail.errors : []) : [])
    ];
    const nestedMessages = nestedErrors.map((item) => {
      const code = item.errorCode && typeof item.errorCode === "object" ? Object.values(item.errorCode).find(Boolean) : "";
      return [code, item.message].filter(Boolean).join(": ");
    }).filter(Boolean);
    const message = [
      ...nestedMessages,
      body.error_description,
      apiError.message,
      typeof body.error === "string" ? body.error : "",
      body.message,
      !response.ok ? `${fallback} (HTTP ${response.status})` : ""
    ].filter(Boolean).filter((value, index, values) => values.indexOf(value) === index)[0] || fallback;
    const error = new Error(message);
    error.statusCode = response.status === 401 ? 401 : 502;
    error.details = body;
    throw error;
  }
  return body;
}

export async function exchangeGoogleCode(code) {
  const config = getGoogleConfig();
  const body = new URLSearchParams({
    code,
    client_id: config.clientId,
    client_secret: config.clientSecret,
    redirect_uri: config.redirectUri,
    grant_type: "authorization_code"
  });
  return parseGoogleResponse(await fetch("https://oauth2.googleapis.com/token", {
    method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body
  }), "Không thể đổi authorization code Google.");
}

export async function refreshGoogleAccessToken(refreshToken) {
  const config = getGoogleConfig();
  const body = new URLSearchParams({
    refresh_token: refreshToken,
    client_id: config.clientId,
    client_secret: config.clientSecret,
    grant_type: "refresh_token"
  });
  return parseGoogleResponse(await fetch("https://oauth2.googleapis.com/token", {
    method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body
  }), "Không thể làm mới phiên Google.");
}

export async function googleIdentity(accessToken) {
  return parseGoogleResponse(await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` }
  }), "Không thể đọc tài khoản Google.");
}

function customerId(value) {
  return String(value || "").replace(/[^0-9]/g, "");
}

export async function googleAdsRequest(path, accessToken, options = {}) {
  const config = getGoogleConfig();
  const response = await fetch(`https://googleads.googleapis.com/${config.apiVersion}/${path.replace(/^\//, "")}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "developer-token": config.developerToken,
      ...(options.loginCustomerId ? { "login-customer-id": customerId(options.loginCustomerId) } : {})
    },
    ...(options.body ? { body: JSON.stringify(options.body) } : {})
  });
  return parseGoogleResponse(response, "Google Ads API request failed.");
}

async function customerDetails(id, accessToken, loginCustomerId) {
  const rows = await googleAdsRequest(`customers/${customerId(id)}/googleAds:searchStream`, accessToken, {
    method: "POST", loginCustomerId,
    body: { query: "SELECT customer.id, customer.descriptive_name, customer.currency_code, customer.time_zone, customer.manager, customer.status FROM customer LIMIT 1" }
  });
  return rows.flatMap((chunk) => chunk.results || [])[0]?.customer || null;
}

async function managerClients(managerId, accessToken) {
  const rows = await googleAdsRequest(`customers/${customerId(managerId)}/googleAds:searchStream`, accessToken, {
    method: "POST", loginCustomerId: managerId,
    body: { query: "SELECT customer_client.id, customer_client.descriptive_name, customer_client.currency_code, customer_client.time_zone, customer_client.manager, customer_client.status, customer_client.level FROM customer_client WHERE customer_client.manager = FALSE" }
  });
  return rows.flatMap((chunk) => chunk.results || []).map((row) => row.customerClient).filter(Boolean);
}

export async function fetchGoogleAdAccounts(accessToken) {
  const accessible = await googleAdsRequest("customers:listAccessibleCustomers", accessToken);
  const ids = (accessible.resourceNames || []).map((name) => name.split("/").pop()).filter(Boolean);
  const result = new Map();
  for (const id of ids) {
    try {
      const details = await customerDetails(id, accessToken);
      if (!details) continue;
      if (details.manager) {
        const clients = await managerClients(id, accessToken);
        clients.forEach((client) => {
          if (client.status !== "ENABLED") return;
          result.set(customerId(client.id), {
            id: customerId(client.id), accountId: customerId(client.id), name: client.descriptiveName || customerId(client.id),
            currency: client.currencyCode || "", timezone: client.timeZone || "", status: client.status,
            business: { id: customerId(id), name: details.descriptiveName || `Manager ${customerId(id)}` }, managerId: customerId(id), canConnect: true
          });
        });
      } else if (details.status === "ENABLED") {
        result.set(customerId(details.id), {
          id: customerId(details.id), accountId: customerId(details.id), name: details.descriptiveName || customerId(details.id),
          currency: details.currencyCode || "", timezone: details.timeZone || "", status: details.status,
          business: { id: customerId(details.id), name: "Google Ads direct" }, managerId: "", canConnect: true
        });
      }
    } catch (_) {
      // A manager may expose a linked customer that is not queryable by this OAuth identity. Keep loading the rest.
    }
  }
  return [...result.values()].sort((a, b) => a.business.name.localeCompare(b.business.name) || a.name.localeCompare(b.name));
}

export async function revokeGoogleAuthorization(token) {
  const response = await fetch(`https://oauth2.googleapis.com/revoke?token=${encodeURIComponent(token)}`, { method: "POST" });
  if (!response.ok) throw new Error("Google permission revocation failed");
}

export function normalizeGoogleCustomerId(value) { return customerId(value); }
