import { getAuthenticatedUser, sendError, serviceRequest } from "./_lib/supabase.js";

function health(response) {
  return response.status(200).json({
    ok: true,
    service: "ua-control-room",
    timestamp: new Date().toISOString()
  });
}

function config(response) {
  response.setHeader("Cache-Control", "no-store");
  return response.status(200).json({
    supabaseUrl: process.env.SUPABASE_URL || "",
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY || "",
    authEnabled: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY),
    appName: "AKUDO Growth OS",
    seatLimit: 10
  });
}

async function syncStatus(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed" });
  }
  try {
    await getAuthenticatedUser(request);
    const connectors = await serviceRequest(
      "/rest/v1/platform_connections?select=id,platform,status,last_synced_at,last_error&order=platform.asc"
    );
    response.setHeader("Cache-Control", "no-store");
    return response.status(200).json({ connectors });
  } catch (error) {
    return sendError(response, error);
  }
}

export default async function handler(request, response) {
  const route = request.query?.route;
  if (route === "health") return health(response);
  if (route === "config") return config(response);
  if (route === "sync-status") return syncStatus(request, response);
  return response.status(404).json({ error: "Unknown status endpoint" });
}
