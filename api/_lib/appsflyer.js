const API_BASE = "https://hq1.appsflyer.com/api/raw-data/export/app";

export function getAppsFlyerConfig() {
  const token = process.env.APPSFLYER_API_TOKEN || "";
  const appIds = (process.env.APPSFLYER_APP_IDS || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  return {
    token,
    appIds,
    configured: Boolean(token && appIds.length),
    pushConfigured: Boolean(process.env.APPSFLYER_PUSH_SECRET)
  };
}

export function maskAppId(appId) {
  if (!appId) return "";
  if (appId.length <= 8) return appId;
  return `${appId.slice(0, 5)}…${appId.slice(-4)}`;
}

export function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    const next = text[index + 1];

    if (character === '"' && quoted && next === '"') {
      field += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === "," && !quoted) {
      row.push(field);
      field = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && next === "\n") index += 1;
      row.push(field);
      if (row.some((value) => value !== "")) rows.push(row);
      row = [];
      field = "";
    } else {
      field += character;
    }
  }

  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }

  if (rows.length < 2) return [];
  const headers = rows[0].map((header) => header.trim());
  return rows.slice(1).map((values) =>
    Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]))
  );
}

function read(row, names) {
  for (const name of names) {
    if (row[name] !== undefined && row[name] !== "") return row[name];
  }
  return "";
}

function number(value) {
  const parsed = Number(String(value || "").replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function normalizePlatform(value) {
  const normalized = String(value || "").toLowerCase();
  if (normalized.includes("facebook") || normalized.includes("meta")) return "Facebook";
  if (normalized.includes("google")) return "Google";
  if (normalized.includes("tiktok") || normalized.includes("bytedance")) return "Tiktok";
  return value || "Other";
}

function normalizeOs(row) {
  const platform = read(row, ["Platform", "platform", "OS", "os"]);
  if (/ios|iphone|ipad/i.test(platform)) return "iOS";
  if (/android/i.test(platform)) return "Android";
  return platform || "Unknown";
}

async function fetchRawReport({ appId, report, from, to, token }) {
  const url = new URL(`${API_BASE}/${encodeURIComponent(appId)}/${report}/v5`);
  url.searchParams.set("from", from);
  url.searchParams.set("to", to);
  url.searchParams.set("maximum_rows", "200000");

  const result = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "text/csv"
    }
  });
  const text = await result.text();
  if (!result.ok) {
    const error = new Error(`AppsFlyer ${report} failed (${result.status})`);
    error.statusCode = result.status === 401 || result.status === 403 ? 502 : result.status;
    error.details = text.slice(0, 500);
    throw error;
  }
  return parseCsv(text);
}

export async function pullAppsFlyerSummary({ appId, from, to, token }) {
  const [installs, events] = await Promise.all([
    fetchRawReport({ appId, report: "installs_report", from, to, token }),
    fetchRawReport({ appId, report: "in_app_events_report", from, to, token })
  ]);

  const groups = new Map();
  const dailyGroups = new Map();
  const ensureDay = (value) => {
    const date = String(value || "").slice(0, 10) || from;
    if (!dailyGroups.has(date)) {
      dailyGroups.set(date, { date, cost: 0, installs: 0, registrations: 0, purchases: 0, revenue: 0 });
    }
    return dailyGroups.get(date);
  };
  const ensureGroup = (platform, os) => {
    const key = `${platform}::${os}`;
    if (!groups.has(key)) {
      groups.set(key, {
        platform,
        os,
        cost: 0,
        installs: 0,
        registrations: 0,
        purchases: 0,
        revenue: 0
      });
    }
    return groups.get(key);
  };

  for (const row of installs) {
    const mediaSource = read(row, ["Media Source", "media_source", "mediaSource"]);
    const platform = normalizePlatform(mediaSource);
    const os = normalizeOs(row);
    const group = ensureGroup(platform, os);
    const day = ensureDay(read(row, ["Install Time", "install_time", "Attributed Touch Time"]));
    group.installs += 1;
    day.installs += 1;
    const rowCost = number(read(row, ["Cost Value", "Cost", "cost", "af_cost_value"]));
    group.cost += rowCost;
    day.cost += rowCost;
  }

  for (const row of events) {
    const mediaSource = read(row, ["Media Source", "media_source", "mediaSource"]);
    const platform = normalizePlatform(mediaSource);
    const os = normalizeOs(row);
    const eventName = read(row, ["Event Name", "event_name", "eventName"]).toLowerCase();
    const group = ensureGroup(platform, os);
    const day = ensureDay(read(row, ["Event Time", "event_time", "Install Time"]));
    if (/register|registration|sign_up|signup/.test(eventName)) {
      group.registrations += 1;
      day.registrations += 1;
    }
    if (/purchase|payment|subscribe|subscription/.test(eventName)) {
      group.purchases += 1;
      day.purchases += 1;
    }
    const rowRevenue = number(read(row, [
      "Event Revenue",
      "event_revenue",
      "Event Revenue USD",
      "event_revenue_usd"
    ]));
    group.revenue += rowRevenue;
    day.revenue += rowRevenue;
  }

  const rows = [...groups.values()].map((row) => ({
    ...row,
    cpi: row.installs ? row.cost / row.installs : 0,
    cpr: row.registrations ? row.cost / row.registrations : 0,
    cvr: row.installs ? row.registrations / row.installs * 100 : 0
  }));
  const totals = rows.reduce((sum, row) => ({
    cost: sum.cost + row.cost,
    installs: sum.installs + row.installs,
    registrations: sum.registrations + row.registrations,
    purchases: sum.purchases + row.purchases,
    revenue: sum.revenue + row.revenue
  }), { cost: 0, installs: 0, registrations: 0, purchases: 0, revenue: 0 });

  return {
    appId,
    from,
    to,
    pulledAt: new Date().toISOString(),
    rowCounts: { installs: installs.length, events: events.length },
    totals: {
      ...totals,
      cpi: totals.installs ? totals.cost / totals.installs : 0,
      cpr: totals.registrations ? totals.cost / totals.registrations : 0,
      roas: totals.cost ? totals.revenue / totals.cost : 0
    },
    rows,
    daily: [...dailyGroups.values()].sort((a, b) => a.date.localeCompare(b.date))
  };
}

export function sanitizePushPayload(payload) {
  const blocked = new Set([
    "idfa",
    "advertising_id",
    "android_id",
    "imei",
    "ip",
    "customer_user_id",
    "amazon_aid",
    "oaid"
  ]);
  return Object.fromEntries(
    Object.entries(payload || {}).filter(([key]) => !blocked.has(key.toLowerCase()))
  );
}

export function isAuthorizedPush(request) {
  const expected = process.env.APPSFLYER_PUSH_SECRET || "";
  if (!expected) return false;
  const url = new URL(request.url, `https://${request.headers.host || "localhost"}`);
  const querySecret = url.searchParams.get("key") || "";
  const authorization = request.headers.authorization || "";
  const bearer = authorization.startsWith("Bearer ") ? authorization.slice(7) : authorization;
  return querySecret === expected || bearer === expected;
}

export function hasIntegrationAccess(request) {
  const expected = process.env.APPSFLYER_INTEGRATION_KEY || "";
  if (!expected) return false;
  return request.headers["x-integration-key"] === expected;
}
