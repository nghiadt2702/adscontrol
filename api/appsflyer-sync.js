import {
  getAppsFlyerConfig,
  hasIntegrationAccess,
  maskAppId,
  pullAppsFlyerSummary
} from "./_lib/appsflyer.js";
import { getAuthenticatedUser, serviceRequest } from "./_lib/supabase.js";

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

async function authorized(request) {
  if (hasIntegrationAccess(request)) return true;
  if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
    await getAuthenticatedUser(request);
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

    const requestedAppId = request.body?.appId || config.appIds[0];
    if (!config.appIds.includes(requestedAppId)) {
      return response.status(400).json({ error: "App ID is not allowed" });
    }

    const defaultTo = new Date();
    const defaultFrom = new Date(defaultTo);
    defaultFrom.setUTCDate(defaultFrom.getUTCDate() - 1);
    const from = request.body?.from || isoDate(defaultFrom);
    const to = request.body?.to || isoDate(defaultTo);
    const days = (new Date(to) - new Date(from)) / 86400000;
    if (!Number.isFinite(days) || days < 0 || days > 31) {
      return response.status(400).json({ error: "Date range must be between 0 and 31 days" });
    }

    const summary = await pullAppsFlyerSummary({
      appId: requestedAppId,
      from,
      to,
      token: config.token
    });
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
