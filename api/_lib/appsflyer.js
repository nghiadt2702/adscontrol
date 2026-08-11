const API_BASE = "https://hq1.appsflyer.com/api/raw-data/export/app";
const COHORT_API_BASE = "https://hq1.appsflyer.com/api/cohorts/v1/data/app";
const MASTER_API_BASE = "https://hq1.appsflyer.com/api/master-agg-data/v4/app";

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

function mergeCurrency(current, next) {
  const code = String(next || "").trim().toUpperCase();
  if (!code) return current || null;
  if (!current || current === code) return code;
  return "MIXED";
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

export async function pullAppsFlyerRetention({ appId, from, to, token }) {
  const result = await fetch(`${COHORT_API_BASE}/${encodeURIComponent(appId)}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      cohort_type: "user_acquisition",
      from,
      to,
      kpis: ["sessions"],
      aggregation_type: "on_day",
      groupings: ["pid"],
      filters: { period: Array.from({ length: 30 }, (_, index) => index + 1) },
      min_cohort_size: 1,
      partial_data: false,
      preferred_timezone: true,
      preferred_currency: true,
      per_user: false
    })
  });
  const text = await result.text();
  if (!result.ok) {
    const error = new Error(`AppsFlyer Cohort API failed (${result.status})`);
    error.statusCode = result.status === 401 || result.status === 403 || result.status === 404
      ? 502
      : result.status;
    error.details = text.slice(0, 500);
    throw error;
  }

  let payload;
  try {
    payload = JSON.parse(text);
  } catch {
    const error = new Error("AppsFlyer Cohort API returned invalid JSON");
    error.statusCode = 502;
    throw error;
  }

  const rows = (Array.isArray(payload?.results) ? payload.results : []).map((row) => ({
    appId,
    mediaSource: row.pid || "Unknown",
    platform: normalizePlatform(row.pid || "Unknown"),
    users: number(row.users),
    periods: (Array.isArray(row.measures) ? row.measures : [])
      .map((measure) => ({
        day: number(measure.period),
        rate: measure.sessions_rate === null || measure.sessions_rate === undefined
          ? null
          : number(measure.sessions_rate),
        retainedUsers: measure.sessions_unique_users === null || measure.sessions_unique_users === undefined
          ? null
          : number(measure.sessions_unique_users),
        sessions: number(measure.sessions_count)
      }))
      .filter((measure) => measure.day >= 1 && measure.day <= 30)
  }));

  return { appId, from, to, source: "AppsFlyer Cohort API", rows };
}

function readMasterMetric(row, metric) {
  const target = metric.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
  const entry = Object.entries(row).find(([key]) =>
    key.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "") === target
  );
  return entry?.[1] ?? "";
}

export async function pullAppsFlyerMasterRetention({ appId, from, to, token }) {
  const days = Array.from({ length: 30 }, (_, index) => index + 1);
  const url = new URL(`${MASTER_API_BASE}/${encodeURIComponent(appId)}`);
  url.searchParams.set("from", from);
  url.searchParams.set("to", to);
  url.searchParams.set("groupings", "pid");
  url.searchParams.set("kpis", [
    "installs",
    ...days.flatMap((day) => [`retention_day_${day}`, `retention_rate_day_${day}`])
  ].join(","));
  url.searchParams.set("timezone", "preferred");

  const result = await fetch(url, {
    headers: { Authorization: `Bearer ${token}`, Accept: "text/csv" }
  });
  const text = await result.text();
  if (!result.ok) {
    const error = new Error(`AppsFlyer Master API failed (${result.status})`);
    error.statusCode = result.status === 401 || result.status === 403 || result.status === 404
      ? 502
      : result.status;
    error.details = text.slice(0, 500);
    throw error;
  }

  const rows = parseCsv(text).map((row) => {
    const mediaSource = read(row, ["Media Source", "media_source", "pid"])
      || Object.entries(row).find(([key]) => /media source|\(pid\)|^pid$/i.test(key))?.[1]
      || "Unknown";
    const users = number(readMasterMetric(row, "installs"));
    return {
      appId,
      mediaSource,
      platform: normalizePlatform(mediaSource),
      users,
      periods: days.map((day) => {
        const retainedRaw = readMasterMetric(row, `retention_day_${day}`);
        const rateRaw = readMasterMetric(row, `retention_rate_day_${day}`);
        const retainedUsers = retainedRaw === "" || /^n\/?a$/i.test(String(retainedRaw)) ? null : number(retainedRaw);
        let rate = rateRaw === "" || /^n\/?a$/i.test(String(rateRaw)) ? null : number(rateRaw);
        if (rate !== null && !String(rateRaw).includes("%") && rate > 0 && rate <= 1) rate *= 100;
        if (rate === null && retainedUsers !== null && users) rate = retainedUsers / users * 100;
        return { day, rate, retainedUsers, sessions: 0 };
      }).filter((period) => period.rate !== null || period.retainedUsers !== null)
    };
  });

  return { appId, from, to, source: "AppsFlyer Master API", rows };
}

export function mergeAppsFlyerRetention(reports, { from, to, errors = [] } = {}) {
  const rowMap = new Map();
  for (const report of reports) {
    for (const row of report.rows || []) {
      const key = `${row.platform}::${row.mediaSource}`;
      if (!rowMap.has(key)) {
        rowMap.set(key, {
          platform: row.platform,
          mediaSource: row.mediaSource,
          users: 0,
          periodMap: new Map()
        });
      }
      const target = rowMap.get(key);
      target.users += row.users || 0;
      for (const period of row.periods || []) {
        if (period.retainedUsers === null || period.retainedUsers === undefined) continue;
        const current = target.periodMap.get(period.day) || { day: period.day, users: 0, retainedUsers: 0, sessions: 0 };
        current.users += row.users || 0;
        current.retainedUsers += period.retainedUsers || 0;
        current.sessions += period.sessions || 0;
        target.periodMap.set(period.day, current);
      }
    }
  }

  const rows = [...rowMap.values()].map((row) => ({
    platform: row.platform,
    mediaSource: row.mediaSource,
    users: row.users,
    periods: [...row.periodMap.values()]
      .sort((a, b) => a.day - b.day)
      .map((period) => ({
        ...period,
        rate: period.users ? period.retainedUsers / period.users * 100 : null
      }))
  }));

  return {
    source: [...new Set(reports.map((report) => report.source).filter(Boolean))].join(" + ") || "AppsFlyer retention API",
    available: reports.length > 0,
    from,
    to,
    rows,
    errors
  };
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
  let costObserved = false;
  let revenueObserved = false;
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
        revenue: 0,
        costCurrency: null,
        revenueCurrency: null,
        costAvailable: false,
        revenueAvailable: false
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
        revenue: 0,
        costCurrency: null,
        revenueCurrency: null,
        costAvailable: false,
        revenueAvailable: false
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
      const rawCost = read(row, ["Cost Value", "Cost", "cost", "af_cost_value"]);
      if (!organic && rawCost !== "") costObserved = true;
      if (organic || rawCost !== "") {
        group.costAvailable = true;
        day.costAvailable = true;
      }
      const costCurrency = read(row, ["Cost Currency", "cost_currency", "af_cost_currency"]);
      group.costCurrency = mergeCurrency(group.costCurrency, costCurrency);
      day.costCurrency = mergeCurrency(day.costCurrency, costCurrency);
      const rowCost = number(rawCost);
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
      const rawRevenue = read(row, [
        "Event Revenue",
        "event_revenue"
      ]);
      if (rawRevenue !== "") revenueObserved = true;
      if (rawRevenue !== "") {
        group.revenueAvailable = true;
        day.revenueAvailable = true;
      }
      const revenueCurrency = read(row, ["Event Revenue Currency", "event_revenue_currency"]);
      group.revenueCurrency = mergeCurrency(group.revenueCurrency, revenueCurrency);
      day.revenueCurrency = mergeCurrency(day.revenueCurrency, revenueCurrency);
      const rowRevenue = number(rawRevenue);
      group.revenue += rowRevenue;
      day.revenue += rowRevenue;
    }
  };

  addInstalls(paidInstalls, false);
  addInstalls(organicInstalls, true);
  addEvents(paidEvents, false);
  addEvents(organicEvents, true);

  const rawGroups = [...groups.values()];
  const rows = rawGroups.map((row) => ({
    ...row,
    cpi: row.costAvailable && row.installs ? row.cost / row.installs : null,
    cpr: row.costAvailable && row.registrations ? row.cost / row.registrations : null,
    cvr: row.installs ? row.registrations / row.installs * 100 : 0
  }));
  const daily = [...dailyGroups.values()]
    .map((row) => ({ ...row }))
    .sort((a, b) => a.date.localeCompare(b.date));
  const totals = rows.reduce((sum, row) => ({
    cost: sum.cost + row.cost,
    installs: sum.installs + row.installs,
    registrations: sum.registrations + row.registrations,
    purchases: sum.purchases + row.purchases,
    revenue: sum.revenue + row.revenue
  }), { cost: 0, installs: 0, registrations: 0, purchases: 0, revenue: 0 });
  const costCurrencies = [...new Set(rows.filter((row) => row.costAvailable && row.platform !== "Organic").map((row) => row.costCurrency).filter(Boolean))];
  const revenueCurrencies = [...new Set(rows.filter((row) => row.revenueAvailable).map((row) => row.revenueCurrency).filter(Boolean))];
  const comparableCurrency = costCurrencies.length === 1 && revenueCurrencies.length === 1 && costCurrencies[0] === revenueCurrencies[0];

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
    availability: { cost: costObserved, revenue: revenueObserved },
    currencies: { cost: costCurrencies, revenue: revenueCurrencies },
    estimates: { cost: false, revenue: false },
    totals: {
      ...totals,
      cpi: costObserved && totals.installs ? totals.cost / totals.installs : null,
      cpr: costObserved && totals.registrations ? totals.cost / totals.registrations : null,
      roas: costObserved && revenueObserved && comparableCurrency && totals.cost ? totals.revenue / totals.cost : null
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
    target.costCurrency = mergeCurrency(target.costCurrency, row.costCurrency);
    target.revenueCurrency = mergeCurrency(target.revenueCurrency, row.revenueCurrency);
    target.costAvailable = target.costAvailable !== false && row.costAvailable !== false;
    target.revenueAvailable = target.revenueAvailable !== false && row.revenueAvailable !== false;
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
    cpi: row.costAvailable && row.installs ? row.cost / row.installs : null,
    cpr: row.costAvailable && row.registrations ? row.cost / row.registrations : null,
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
  const availability = {
    cost: summaries.length > 0 && summaries.every((summary) => summary.availability?.cost),
    revenue: summaries.length > 0 && summaries.every((summary) => summary.availability?.revenue)
  };
  const costCurrencies = [...new Set(rows.filter((row) => row.costAvailable && row.platform !== "Organic").map((row) => row.costCurrency).filter(Boolean))];
  const revenueCurrencies = [...new Set(rows.filter((row) => row.revenueAvailable).map((row) => row.revenueCurrency).filter(Boolean))];
  const comparableCurrency = costCurrencies.length === 1 && revenueCurrencies.length === 1 && costCurrencies[0] === revenueCurrencies[0];

  return {
    appId,
    appIds: appIds || (appId ? [appId] : []),
    from,
    to,
    pulledAt: new Date().toISOString(),
    rowCounts,
    availability,
    currencies: { cost: costCurrencies, revenue: revenueCurrencies },
    estimates: { cost: false, revenue: false },
    totals: {
      ...totals,
      cpi: availability.cost && totals.installs ? totals.cost / totals.installs : null,
      cpr: availability.cost && totals.registrations ? totals.cost / totals.registrations : null,
      roas: availability.cost && availability.revenue && comparableCurrency && totals.cost ? totals.revenue / totals.cost : null
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
