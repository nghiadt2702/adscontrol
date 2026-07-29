import { requireAdmin, sendError, serviceRequest } from "./_lib/supabase.js";

export default async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed" });
  }

  try {
    await requireAdmin(request);
    const members = await serviceRequest(
      "/rest/v1/profiles?select=user_id,email,full_name,role,status,created_at,last_seen_at&order=created_at.asc"
    );

    response.setHeader("Cache-Control", "no-store");
    response.status(200).json({
      members,
      seats: {
        used: members.filter((member) => member.status !== "disabled").length,
        limit: 10
      }
    });
  } catch (error) {
    sendError(response, error);
  }
}
