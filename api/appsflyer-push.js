import { createHash } from "node:crypto";
import { getSupabaseEnv, serviceRequest } from "./_lib/supabase.js";
import {
  isAuthorizedPush,
  sanitizePushPayload
} from "./_lib/appsflyer.js";

function eventKey(payload) {
  const basis = [
    payload.app_id,
    payload.appsflyer_id,
    payload.event_name,
    payload.event_time,
    payload.install_time,
    payload.media_source,
    payload.campaign
  ].join("|");
  return createHash("sha256").update(basis).digest("hex");
}

function canPersist() {
  try {
    getSupabaseEnv();
    return true;
  } catch {
    return false;
  }
}

export default async function handler(request, response) {
  if (!["POST", "GET"].includes(request.method)) {
    response.setHeader("Allow", "POST, GET");
    return response.status(405).json({ error: "Method not allowed" });
  }
  if (!isAuthorizedPush(request)) {
    return response.status(401).json({ error: "Invalid AppsFlyer push secret" });
  }

  const payload = sanitizePushPayload(
    request.method === "POST"
      ? (typeof request.body === "object" ? request.body : {})
      : request.query
  );
  const receivedAt = new Date().toISOString();
  let persisted = false;

  if (canPersist()) {
    try {
      await serviceRequest("/rest/v1/appsflyer_events?on_conflict=event_key", {
        method: "POST",
        headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
        body: JSON.stringify([{
          event_key: eventKey(payload),
          app_id: payload.app_id || "unknown",
          event_name: payload.event_name || "unknown",
          event_time: payload.event_time || receivedAt,
          install_time: payload.install_time || null,
          media_source: payload.media_source || null,
          campaign: payload.campaign || null,
          adset: payload.af_adset || payload.adset || null,
          ad: payload.af_ad || payload.ad || null,
          platform: payload.platform || null,
          country_code: payload.country_code || null,
          revenue: Number(payload.event_revenue || 0) || 0,
          currency: payload.event_revenue_currency || null,
          payload,
          received_at: receivedAt
        }])
      });
      persisted = true;
    } catch (error) {
      console.error("AppsFlyer push persistence failed", error);
    }
  }

  console.log("AppsFlyer push received", {
    eventKey: eventKey(payload),
    appId: payload.app_id,
    eventName: payload.event_name,
    persisted
  });

  response.setHeader("Cache-Control", "no-store");
  return response.status(200).json({
    ok: true,
    receivedAt,
    eventName: payload.event_name || "test",
    persisted
  });
}
