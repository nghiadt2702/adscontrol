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
    timezone: process.env.APPSFLYER_TIMEZONE || "Asia/Ho_Chi_Minh",
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
  if (normalized === "organic") return "Organic";
  if (/^social[_\s-]/.test(normalized)) return "Other";
  if (normalized.includes("facebook") || normalized.includes("meta")) return "Facebook";
  if (normalized.includes("google")) return "Google";
  if (normalized.includes("tiktok") || normalized.includes("bytedance")) return "Tiktok";
  return value || "Other";
}

export function inferOsFromAppId(appId) {
  if (/^id\d+$/i.test(String(appId || ""))) return "iOS";
  if (String(appId || "").includes(".")) return "Android";
  return "Unknown";
}

function normalizeOs(row, appId) {
  const platform = read(row, ["Platform", "platform", "OS", "os"]);
  if (/ios|iphone|ipad/i.test(platform)) return "iOS";
  if (/android/i.test(platform)) return "Android";
  return platform || inferOsFromAppId(appId);
}

export function inferUaFromCampaign(value) {
  const campaign = String(value || "")
    .toLowerCase()
    .replace(/[_|./-]+/g, " ");
  if (/\bdavid\b/.test(campaign)) return "David";
  if (/\btommy\b/.test(campaign)) return "Tommy";
  if (/\bnelson\b/.test(campaign)) return "Nelson";
  return "Unassigned";
}

function campaignName(row) {
  return read(row, [
    "Campaign",
    "Campaign Name",
    "campaign",
    "campaign_name",
    "campaignName"
  ]);
}

function estimateMetrics(row, estimateCost, estimateRevenue) {
  const cpiByPlatform = { Facebook: 24000, Google: 19000, Tiktok: 17000, Other: 21000 };
  const purchaseRateByPlatform = { Facebook: 0.16, Google: 0.15, Tiktok: 0.12, Other: 0.14 };
  const orderValueByPlatform = { Facebook: 520000, Google: 500000, Tiktok: 420000, Other: 460000 };
  const uaFactor = { David: 0.97, Tommy: 1.03, Nelson: 1, Unassigned: 1.05 }[row.ua] || 1;
  const result = { ...row };
  if (estimateCost) {
    result.cost = row.platform === "Organic" ? 0 : Math.round(
      row.installs * (cpiByPlatform[row.platform] || cpiByPlatform.Other) * uaFactor
    );
  }
  if (estimateRevenue) {
    const rate = purchaseRateByPlatform[row.platform] || purchaseRateByPlatform.Other;
    result.purchases = Math.max(row.purchases, Math.round(row.registrations * rate));
    result.revenue = Math.round(
      result.purchases * (orderValueByPlatform[row.platform] || orderValueByPlatform.Other)
    );
  }
  result.estimatedCost = estimateCost;
  result.estimatedRevenue = estimateRevenue;
  return result;
}

async function fetchRawReport({ appId, report, from, to, token, timezone }) {
  const url = new URL(`${API_BASE}/${encodeURIComponent(appId)}/${report}/v5`);
  url.searchParams.set("from", from);
  url.searchParams.set("to", to);
  url.searchParams.set("maximum_rows", "200000");
  if (timezone) url.searchParams.set("timezone", timezone);

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

export async function pullAppsFlyerSummary({ appId, from, to, token, timezone = "Asia/Ho_Chi_Minh" }) {
  const [paidInstalls, paidEvents, organicInstalls, organicEvents] = await Promise.all([
    fetchRawReport({ appId, report: "installs_report", from, to, token, timezone }),
    fetchRawReport({ appId, report: "in_app_events_report", from, to, token, timezone }),
    fetchRawReport({ appId, report: "organic_installs_report", from, to, token, timezone }),
    fetchRawReport({ appId, report: "organic_in_app_events_report", from, to, token, timezone })
  ]);

  const groups = new Map();
  const dailyGroups = new Map();
  const ensureDay = (value, platform, mediaSource, os, ua) => {
    const date = String(value || "").slice(0, 10) || from;
    const key = `${date}::${mediaSource}::${os}::${ua}`;
    if (!dailyGroups.has(key)) {
      dailyGroups.set(key, {
        date,
        platform,
        mediaSource,
        os,
        ua,
        cost: 0,
        installs: 0,
        registrations: 0,
        purchases: 0,
        revenue: 0
      });
    }
    return dailyGroups.get(key);
  };
  const ensureGroup = (platform, mediaSource, os, ua) => {
    const key = `${mediaSource}::${os}::${ua}`;
    if (!groups.has(key)) {
      groups.set(key, {
        platform,
        mediaSource,
        os,
        ua,
        cost: 0,
        installs: 0,
        registrations: 0,
        purchases: 0,
        revenue: 0
      });
    }
    return groups.get(key);
  };

  const addInstalls = (installs, organic) => {
    for (const row of installs) {
      const mediaSource = organic
        ? "Organic"
        : read(row, ["Media Source", "media_source", "mediaSource"]) || "Unknown";
      const platform = normalizePlatform(mediaSource);
      const os = normalizeOs(row, appId);
      const ua = organic ? "Unassigned" : inferUaFromCampaign(campaignName(row));
      const group = ensureGroup(platform, mediaSource, os, ua);
      const day = ensureDay(
        read(row, ["Install Time", "install_time", "Attributed Touch Time"]),
        platform,
        mediaSource,
        os,
        ua
      );
      group.installs += 1;
      day.installs += 1;
      const rowCost = number(read(row, ["Cost Value", "Cost", "cost", "af_cost_value"]));
      group.cost += rowCost;
      day.cost += rowCost;
    }
  };

  const addEvents = (events, organic) => {
    for (const row of events) {
      const mediaSource = organic
        ? "Organic"
        : read(row, ["Media Source", "media_source", "mediaSource"]) || "Unknown";
      const platform = normalizePlatform(mediaSource);
      const os = normalizeOs(row, appId);
      const ua = organic ? "Unassigned" : inferUaFromCampaign(campaignName(row));
      const eventName = read(row, ["Event Name", "event_name", "eventName"]).toLowerCase();
      const group = ensureGroup(platform, mediaSource, os, ua);
      const day = ensureDay(
        read(row, ["Event Time", "event_time", "Install Time"]),
        platform,
        mediaSource,
        os,
        ua
      );
      if (eventName === "af_complete_registration") {
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
  };

  addInstalls(paidInstalls, false);
  addInstalls(organicInstalls, true);
  addEvents(paidEvents, false);
  addEvents(organicEvents, true);

  const rawGroups = [...groups.values()];
  const estimateCost = !rawGroups.some((row) => row.cost > 0);
  const estimateRevenue = !rawGroups.some((row) => row.revenue > 0);
  const rows = rawGroups.map((rawRow) => {
    const row = estimateMetrics(rawRow, estimateCost, estimateRevenue);
    return {
      ...row,
      cpi: row.installs ? row.cost / row.installs : 0,
      cpr: row.registrations ? row.cost / row.registrations : 0,
      cvr: row.installs ? row.registrations / row.installs * 100 : 0
    };
  });
  const daily = [...dailyGroups.values()]
    .map((row) => estimateMetrics(row, estimateCost, estimateRevenue))
    .sort((a, b) => a.date.localeCompare(b.date));
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
    rowCounts: {
      installs: paidInstalls.length + organicInstalls.length,
      events: paidEvents.length + organicEvents.length,
      paidInstalls: paidInstalls.length,
      organicInstalls: organicInstalls.length,
      paidEvents: paidEvents.length,
      organicEvents: organicEvents.length
    },
    estimates: { cost: estimateCost, revenue: estimateRevenue },
    totals: {
      ...totals,
      cpi: totals.installs ? totals.cost / totals.installs : 0,
      cpr: totals.registrations ? totals.cost / totals.registrations : 0,
      roas: totals.cost ? totals.revenue / totals.cost : 0
    },
    rows,
    daily
  };
}

export function mergeAppsFlyerSummaries(summaries, { appId, appIds, from, to }) {
  const rowMap = new Map();
  const dailyMap = new Map();
  const add = (map, key, row) => {
    if (!map.has(key)) {
      map.set(key, {
        ...row,
        cost: 0,
        installs: 0,
        registrations: 0,
        purchases: 0,
        revenue: 0
      });
    }
    const target = map.get(key);
    target.cost += row.cost || 0;
    target.installs += row.installs || 0;
    target.registrations += row.registrations || 0;
    target.purchases += row.purchases || 0;
    target.revenue += row.revenue || 0;
    target.estimatedCost ||= Boolean(row.estimatedCost);
    target.estimatedRevenue ||= Boolean(row.estimatedRevenue);
  };

  for (const summary of summaries) {
    for (const row of summary.rows) {
      add(rowMap, `${row.mediaSource}::${row.os}::${row.ua}`, row);
    }
    for (const row of summary.daily) {
      add(dailyMap, `${row.date}::${row.mediaSource}::${row.os}::${row.ua}`, row);
    }
  }

  const rows = [...rowMap.values()].map((row) => ({
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

  const rowCounts = summaries.reduce((sum, summary) => ({
    installs: sum.installs + summary.rowCounts.installs,
    events: sum.events + summary.rowCounts.events,
    paidInstalls: sum.paidInstalls + (summary.rowCounts.paidInstalls || 0),
    organicInstalls: sum.organicInstalls + (summary.rowCounts.organicInstalls || 0),
    paidEvents: sum.paidEvents + (summary.rowCounts.paidEvents || 0),
    organicEvents: sum.organicEvents + (summary.rowCounts.organicEvents || 0)
  }), { installs: 0, events: 0, paidInstalls: 0, organicInstalls: 0, paidEvents: 0, organicEvents: 0 });
  const estimates = {
    cost: summaries.some((summary) => summary.estimates?.cost),
    revenue: summaries.some((summary) => summary.estimates?.revenue)
  };

  return {
    appId,
    appIds: appIds || (appId ? [appId] : []),
    from,
    to,
    pulledAt: new Date().toISOString(),
    rowCounts,
    estimates,
    totals: {
      ...totals,
      cpi: totals.installs ? totals.cost / totals.installs : 0,
      cpr: totals.registrations ? totals.cost / totals.registrations : 0,
      roas: totals.cost ? totals.revenue / totals.cost : 0
    },
    rows,
    daily: [...dailyMap.values()].sort((a, b) => a.date.localeCompare(b.date))
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
