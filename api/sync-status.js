import { getAuthenticatedUser, sendError, serviceRequest } from "./_lib/supabase.js";

export default async function handler(request, response) {
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
    response.status(200).json({ connectors });
  } catch (error) {
    sendError(response, error);
  }
}
