import {
  getAppsFlyerConfig,
  hasIntegrationAccess,
  maskAppId,
  mergeAppsFlyerRetention,
  mergeAppsFlyerSummaries,
  pullAppsFlyerMasterRetention,
  pullAppsFlyerRetention,
  pullAppsFlyerSummary
} from "./_lib/appsflyer.js";
import { requireAdmin, serviceRequest } from "./_lib/supabase.js";

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

function dateInTimeZone(date, timezone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function splitDateRange(from, to) {
  const chunks = [];
  let cursor = new Date(`${from}T00:00:00Z`);
  const end = new Date(`${to}T00:00:00Z`);
  while (cursor <= end) {
    const chunkEnd = new Date(cursor);
    chunkEnd.setUTCDate(chunkEnd.getUTCDate() + 13);
    if (chunkEnd > end) chunkEnd.setTime(end.getTime());
    chunks.push({ from: isoDate(cursor), to: isoDate(chunkEnd) });
    cursor = new Date(chunkEnd);
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return chunks;
}

async function authorized(request) {
  if (hasIntegrationAccess(request)) return true;
  if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
    await requireAdmin(request);
    return true;
  }
  return false;
}

export default async function handler(request, response) {
  const config = getAppsFlyerConfig();
  response.setHeader("Cache-Control", "no-store");

  if (request.method === "GET") {
    return response.status(200).json({
      configured: config.configured,
      pushConfigured: config.pushConfigured,
      apps: config.appIds.map(maskAppId),
      storageConfigured: Boolean(
        process.env.SUPABASE_URL &&
        process.env.SUPABASE_SERVICE_ROLE_KEY
      )
    });
  }

  if (request.method !== "POST") {
    response.setHeader("Allow", "GET, POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  try {
    if (!await authorized(request)) {
      return response.status(401).json({ error: "Integration access required" });
    }
    if (!config.configured) {
      return response.status(503).json({
        error: "AppsFlyer API token or App ID is missing"
      });
    }

    const requestedAppId = request.body?.appId;
    if (requestedAppId && !config.appIds.includes(requestedAppId)) {
      return response.status(400).json({ error: "App ID is not allowed" });
    }
    const selectedAppIds = requestedAppId ? [requestedAppId] : config.appIds;

    const currentDate = dateInTimeZone(new Date(), config.timezone);
    const defaultTo = new Date(`${currentDate}T00:00:00Z`);
    const defaultFrom = new Date(defaultTo);
    defaultFrom.setUTCDate(defaultFrom.getUTCDate() - 1);
    const from = request.body?.from || isoDate(defaultFrom);
    const to = request.body?.to || isoDate(defaultTo);
    const days = (new Date(to) - new Date(from)) / 86400000 + 1;
    if (!Number.isFinite(days) || days < 1 || days > 30) {
      return response.status(400).json({ error: "Date range must be between 1 and 30 days" });
    }
    if (to > currentDate) {
      return response.status(400).json({ error: "Future dates are available as forecast only" });
    }

    if (request.body?.scope === "retention") {
      const retentionResults = await Promise.allSettled(selectedAppIds.map(async (appId) => {
        try {
          return await pullAppsFlyerRetention({ appId, from, to, token: config.token });
        } catch {
          return pullAppsFlyerMasterRetention({ appId, from, to, token: config.token });
        }
      }));
      const reports = retentionResults
        .filter((result) => result.status === "fulfilled")
        .map((result) => result.value);
      const errors = retentionResults
        .filter((result) => result.status === "rejected")
        .map(() => "AppsFlyer Cohort/Master API không khả dụng cho một app hoặc gói hiện tại.");
      return response.status(200).json({
        pulledAt: new Date().toISOString(),
        apiCalls: selectedAppIds.length,
        retention: mergeAppsFlyerRetention(reports, { from, to, errors })
      });
    }

    const chunks = splitDateRange(from, to);
    const summaries = [];
    for (const appId of selectedAppIds) {
      for (const chunk of chunks) {
        summaries.push(await pullAppsFlyerSummary({
          appId,
          from: chunk.from,
          to: chunk.to,
          token: config.token,
          timezone: config.timezone
        }));
      }
    }
    const summary = mergeAppsFlyerSummaries(summaries, {
      appId: selectedAppIds.length === 1 ? selectedAppIds[0] : "all",
      appIds: selectedAppIds,
      from,
      to
    });
    summary.apiCalls = chunks.length * selectedAppIds.length * 4;
    if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      await serviceRequest("/rest/v1/appsflyer_sync_snapshots?on_conflict=app_id,period_from,period_to", {
        method: "POST",
        headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
        body: JSON.stringify([{
          app_id: summary.appId,
          period_from: summary.from,
          period_to: summary.to,
          totals: summary.totals,
          breakdown: summary.rows,
          daily: summary.daily,
          row_counts: summary.rowCounts,
          pulled_at: summary.pulledAt
        }])
      });
    }
    return response.status(200).json(summary);
  } catch (error) {
    console.error("AppsFlyer sync failed", error);
    return response.status(error.statusCode || 500).json({
      error: error.statusCode && error.statusCode < 500
        ? error.message
        : "AppsFlyer sync failed",
      details: process.env.NODE_ENV === "development" ? error.details : undefined
    });
  }
}
