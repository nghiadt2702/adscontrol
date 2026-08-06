import crypto from "node:crypto";

// TikTok Business API. Verified against the official SDK spec
// (github.com/tiktok/tiktok-business-api-sdk, yml_files/report_integrated_get.yml)
// and live endpoint probes: v1.3 is the current available version, v1.4 returns
// "API version is not available".
const DEFAULT_API_VERSION = "v1.3";
const API_HOST = "https://business-api.tiktok.com";

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    const error = new Error(`Missing server configuration: ${name}`);
    error.statusCode = 503;
    throw error;
  }
  return value;
}

export function getTiktokConfig() {
  return {
    appId: requiredEnv("TIKTOK_APP_ID"),
    appSecret: requiredEnv("TIKTOK_APP_SECRET"),
    redirectUri: requiredEnv("TIKTOK_REDIRECT_URI"),
    // TikTok never returns a refresh token for the long-lived ads access token,
    // so the encryption key is only used to protect the stored access token.
    encryptionKey: process.env.TIKTOK_TOKEN_ENCRYPTION_KEY || requiredEnv("TIKTOK_APP_SECRET"),
    apiVersion: process.env.TIKTOK_API_VERSION || DEFAULT_API_VERSION
  };
}

function encode(value) {
  return Buffer.from(value).toString("base64url");
}

function sign(payload) {
  return crypto.createHmac("sha256", getTiktokConfig().appSecret).update(payload).digest("base64url");
}

export function createTiktokOauthState(userId, nonce = crypto.randomUUID(), now = Date.now()) {
  const payload = encode(JSON.stringify({ userId, nonce, exp: now + 10 * 60 * 1000 }));
  return `${payload}.${sign(payload)}`;
}

export function verifyTiktokOauthState(state, now = Date.now()) {
  const [payload, signature] = String(state || "").split(".");
  if (!payload || !signature) throw Object.assign(new Error("OAuth state TikTok không hợp lệ."), { statusCode: 400 });
  const expected = Buffer.from(sign(payload));
  const actual = Buffer.from(signature);
  if (actual.length !== expected.length || !crypto.timingSafeEqual(actual, expected)) {
    throw Object.assign(new Error("OAuth state TikTok không hợp lệ."), { statusCode: 400 });
  }
  const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
  if (!parsed.userId || !parsed.exp || parsed.exp < now) {
    throw Object.assign(new Error("Phiên kết nối TikTok đã hết hạn. Vui lòng thử lại."), { statusCode: 400 });
  }
  return parsed;
}

function encryptionKey() {
  return crypto.createHash("sha256").update(getTiktokConfig().encryptionKey).digest();
}

export function encryptTiktokToken(value) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", encryptionKey(), iv);
  const ciphertext = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  return [iv, cipher.getAuthTag(), ciphertext].map((part) => part.toString("base64url")).join(".");
}

export function decryptTiktokToken(value) {
  const [iv, tag, ciphertext] = String(value || "").split(".");
  if (!iv || !tag || !ciphertext) throw new Error("TikTok token không hợp lệ.");
  const decipher = crypto.createDecipheriv("aes-256-gcm", encryptionKey(), Buffer.from(iv, "base64url"));
  decipher.setAuthTag(Buffer.from(tag, "base64url"));
  return Buffer.concat([decipher.update(Buffer.from(ciphertext, "base64url")), decipher.final()]).toString("utf8");
}

// TikTok uses its own authorization portal instead of a standard OAuth dialog.
export function buildTiktokLoginUrl(userId) {
  const config = getTiktokConfig();
  const url = new URL(`${API_HOST}/portal/auth`);
  url.searchParams.set("app_id", config.appId);
  url.searchParams.set("redirect_uri", config.redirectUri);
  url.searchParams.set("state", createTiktokOauthState(userId));
  return url.toString();
}

function tiktokError(body, fallback, status) {
  const error = new Error(body?.message || fallback);
  // TikTok always answers HTTP 200 and signals failures through `code`.
  error.statusCode = [40001, 40002, 40100, 40104, 40105].includes(Number(body?.code)) ? 401 : status >= 500 ? 502 : 502;
  error.details = { code: body?.code, requestId: body?.request_id };
  return error;
}

async function parseTiktokResponse(response, fallback) {
  const body = await response.json().catch(() => ({}));
  if (!response.ok || Number(body.code) !== 0) throw tiktokError(body, fallback, response.status);
  return body.data || {};
}

export async function tiktokRequest(path, accessToken, params = {}, options = {}) {
  const config = getTiktokConfig();
  const url = new URL(`${API_HOST}/open_api/${config.apiVersion}/${path.replace(/^\//, "")}`);
  if (options.method !== "POST") {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      url.searchParams.set(key, Array.isArray(value) || typeof value === "object" ? JSON.stringify(value) : String(value));
    });
  }
  const response = await fetch(url, {
    method: options.method || "GET",
    headers: {
      "Access-Token": accessToken,
      "Content-Type": "application/json"
    },
    ...(options.method === "POST" ? { body: JSON.stringify(params) } : {})
  });
  return parseTiktokResponse(response, options.fallback || "TikTok Ads API request failed.");
}

// Exchanges the portal auth_code for a long-lived advertiser access token.
export async function exchangeTiktokAuthCode(authCode) {
  const config = getTiktokConfig();
  const response = await fetch(`${API_HOST}/open_api/${config.apiVersion}/oauth2/access_token/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ app_id: config.appId, secret: config.appSecret, auth_code: authCode })
  });
  const data = await parseTiktokResponse(response, "Không thể đổi auth code TikTok.");
  if (!data.access_token) throw Object.assign(new Error("TikTok không trả về access token."), { statusCode: 502 });
  return data;
}

export function normalizeTiktokAdvertiserId(value) {
  return String(value || "").replace(/[^0-9]/g, "");
}

export async function fetchTiktokAdvertisers(accessToken) {
  const config = getTiktokConfig();
  const granted = await tiktokRequest("oauth2/advertiser/get/", accessToken, {
    app_id: config.appId,
    secret: config.appSecret
  }, { fallback: "Không thể đọc danh sách advertiser TikTok." });
  const ids = (granted.list || []).map((row) => normalizeTiktokAdvertiserId(row.advertiser_id)).filter(Boolean);
  if (!ids.length) return [];

  const fields = ["advertiser_id", "advertiser_name", "currency", "timezone", "status", "owner_bc_id", "company"];
  const details = new Map();
  // advertiser/info/ accepts a bounded id list, so page through in chunks.
  for (let index = 0; index < ids.length; index += 100) {
    const chunk = ids.slice(index, index + 100);
    const data = await tiktokRequest("advertiser/info/", accessToken, {
      advertiser_ids: chunk,
      fields
    }, { fallback: "Không thể đọc thông tin advertiser TikTok." });
    (data.list || []).forEach((row) => details.set(normalizeTiktokAdvertiserId(row.advertiser_id), row));
  }

  return ids.map((id) => {
    const row = details.get(id) || {};
    const businessId = normalizeTiktokAdvertiserId(row.owner_bc_id) || "";
    return {
      id,
      accountId: id,
      name: row.advertiser_name || `TikTok ${id}`,
      currency: row.currency || "",
      timezone: row.timezone || "",
      status: row.status || "",
      business: {
        id: businessId || id,
        name: businessId ? row.company || `Business Center ${businessId}` : "TikTok direct"
      },
      businessCenterId: businessId,
      // TikTok exposes STATUS_ENABLE / STATUS_DISABLE and a few review states.
      canConnect: !row.status || !/DISABLE|PUNISH|CONFIRM_FAIL/i.test(String(row.status))
    };
  }).sort((a, b) => a.business.name.localeCompare(b.business.name) || a.name.localeCompare(b.name));
}

const DATA_LEVELS = {
  campaign: "AUCTION_CAMPAIGN",
  adgroup: "AUCTION_ADGROUP",
  ad: "AUCTION_AD"
};

const DIMENSIONS = {
  campaign: ["campaign_id", "stat_time_day"],
  adgroup: ["adgroup_id", "stat_time_day"],
  ad: ["ad_id", "stat_time_day"]
};

// Metric names verified against the TikTok metric catalog in the official SDK
// spec. `conversion_rate` is not a valid column any more, the catalog only
// exposes `conversion_rate_v2`. `real_time_*` columns report attributed app
// events without the delay of the standard conversion columns.
const NAME_METRICS = {
  campaign: ["campaign_name"],
  adgroup: ["adgroup_name", "campaign_id", "campaign_name"],
  ad: ["ad_name", "adgroup_id", "adgroup_name", "campaign_id", "campaign_name"]
};

const CORE_METRICS = ["spend", "impressions", "clicks", "ctr", "cpc", "cpm", "conversion", "cost_per_conversion", "conversion_rate_v2"];

// App/commerce columns only exist for advertisers that run app or purchase
// events. They are requested first and dropped on retry when TikTok rejects
// them for an account.
const APP_METRICS = [
  "real_time_app_install", "real_time_app_install_cost",
  "real_time_conversion", "real_time_cost_per_conversion",
  "registration", "cost_per_registration",
  "purchase", "cost_per_purchase", "total_purchase_value"
];

function metricsFor(level, includeAppMetrics) {
  return [...NAME_METRICS[level], ...CORE_METRICS, ...(includeAppMetrics ? APP_METRICS : [])];
}

export function tiktokReportLevel(level) {
  return DATA_LEVELS[level] ? level : "campaign";
}

function metricNumber(value) {
  const parsed = Number(String(value ?? "").replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

// TikTok paginates synchronous reports; page_size caps at 1000.
export async function fetchTiktokInsights({ accessToken, advertiserId, level, from, to }) {
  const reportLevel = tiktokReportLevel(level);
  const readPage = (page, includeAppMetrics) => tiktokRequest("report/integrated/get/", accessToken, {
    advertiser_id: advertiserId,
    report_type: "BASIC",
    service_type: "AUCTION",
    data_level: DATA_LEVELS[reportLevel],
    dimensions: DIMENSIONS[reportLevel],
    metrics: metricsFor(reportLevel, includeAppMetrics),
    start_date: from,
    end_date: to,
    page,
    page_size: 1000
  }, { fallback: "Không thể đọc báo cáo TikTok Ads." });

  let includeAppMetrics = true;
  let first;
  try {
    first = await readPage(1, true);
  } catch (error) {
    // An advertiser without app/commerce events rejects those columns instead of
    // returning empty values, so retry once with the core metric set only.
    if (Number(error.details?.code) !== 40002) throw error;
    includeAppMetrics = false;
    first = await readPage(1, false);
  }

  const rows = [...(first.list || [])];
  const totalPages = Math.min(Number(first.page_info?.total_page || 1), 50);
  for (let page = 2; page <= totalPages; page += 1) {
    const data = await readPage(page, includeAppMetrics);
    rows.push(...(data.list || []));
  }
  return rows;
}

export function normalizeTiktokInsight(row, account, level) {
  const reportLevel = tiktokReportLevel(level);
  const dimensions = row.dimensions || {};
  const metrics = row.metrics || {};
  const campaignId = String(dimensions.campaign_id || metrics.campaign_id || "");
  const adgroupId = String(dimensions.adgroup_id || metrics.adgroup_id || "");
  const adId = String(dimensions.ad_id || "");
  const entityId = (reportLevel === "ad" ? adId : reportLevel === "adgroup" ? adgroupId : campaignId) || campaignId;
  // Fall back through the hierarchy so a row never renders without a label.
  const entityName = (reportLevel === "ad"
    ? metrics.ad_name || adId
    : reportLevel === "adgroup"
      ? metrics.adgroup_name || adgroupId
      : metrics.campaign_name || campaignId) || metrics.campaign_name || entityId || "(không có tên)";

  // Prefer real-time app install/conversion columns, fall back to standard ones.
  const installs = metricNumber(metrics.real_time_app_install) || metricNumber(metrics.conversion);
  const registrations = metricNumber(metrics.registration) || metricNumber(metrics.real_time_conversion) || metricNumber(metrics.conversion);
  const purchases = metricNumber(metrics.purchase);
  const revenue = metricNumber(metrics.total_purchase_value);
  const spend = metricNumber(metrics.spend);

  return {
    date: String(dimensions.stat_time_day || "").slice(0, 10),
    entityId,
    entityName,
    campaignId,
    campaignName: metrics.campaign_name || campaignId,
    adsetId: adgroupId,
    adsetName: metrics.adgroup_name || "",
    adId,
    adName: metrics.ad_name || "",
    platform: "TikTok",
    businessId: account.business_center_id || account.account_id,
    business: account.business_center_name || "TikTok direct",
    accountId: account.account_id,
    account: account.account_name,
    currency: account.currency,
    spend,
    revenue,
    installs,
    registrations,
    purchases,
    impressions: metricNumber(metrics.impressions),
    clicks: metricNumber(metrics.clicks)
  };
}

// TikTok has no OAuth revoke endpoint for ads access tokens; disconnecting is
// handled by deleting the stored token and the selected advertiser scope.
export const TIKTOK_REVOKE_SUPPORTED = false;
