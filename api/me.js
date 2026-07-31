import {
  permissionsForRole,
  requireActiveMember,
  sendError,
  serviceRequest
} from "./_lib/supabase.js";

export default async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { user, profile } = await requireActiveMember(request);
    const status = profile.status === "invited" ? "active" : profile.status;

    await serviceRequest(`/rest/v1/profiles?user_id=eq.${encodeURIComponent(user.id)}`, {
      method: "PATCH",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({
        last_seen_at: new Date().toISOString(),
        status
      })
    });

    response.setHeader("Cache-Control", "no-store");
    response.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        fullName: profile.full_name || user.user_metadata?.full_name || user.email?.split("@")[0],
        role: profile.role,
        status
      },
      permissions: permissionsForRole(profile.role)
    });
  } catch (error) {
    sendError(response, error);
  }
}
