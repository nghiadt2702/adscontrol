import { requireAdmin, sendError, serviceRequest } from "./_lib/supabase.js";

const allowedRoles = new Set(["admin", "ua_lead", "ua_buyer"]);

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { user: invitedBy } = await requireAdmin(request);
    const email = String(request.body?.email || "").trim().toLowerCase();
    const fullName = String(request.body?.fullName || "").trim();
    const role = String(request.body?.role || "ua_buyer");

    if (!email || !email.includes("@")) {
      return response.status(400).json({ error: "Email không hợp lệ." });
    }
    if (!fullName || fullName.length > 80) {
      return response.status(400).json({ error: "Vui lòng nhập tên thành viên." });
    }
    if (!allowedRoles.has(role)) {
      return response.status(400).json({ error: "Vai trò không hợp lệ." });
    }

    const profiles = await serviceRequest(
      "/rest/v1/profiles?select=user_id,email,status"
    );
    const activeSeats = profiles.filter((profile) => profile.status !== "disabled").length;
    if (activeSeats >= 10) {
      return response.status(409).json({ error: "Workspace đã sử dụng đủ 10/10 thành viên." });
    }
    if (profiles.some((profile) => profile.email?.toLowerCase() === email)) {
      return response.status(409).json({ error: "Email này đã thuộc workspace." });
    }

    const redirectTo = `${(process.env.APP_URL || "http://localhost:3000").replace(/\/$/, "")}/login.html`;
    const invited = await serviceRequest(`/auth/v1/invite?redirect_to=${encodeURIComponent(redirectTo)}`, {
      method: "POST",
      body: JSON.stringify({
        email,
        data: {
          full_name: fullName,
          requested_role: role,
          invited_by: invitedBy.id
        }
      })
    });

    await serviceRequest(`/rest/v1/profiles?user_id=eq.${encodeURIComponent(invited.id)}`, {
      method: "PATCH",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({ full_name: fullName, role, status: "invited" })
    });

    response.status(201).json({
      member: {
        userId: invited.id,
        email,
        fullName,
        role,
        status: "invited"
      },
      seats: { used: activeSeats + 1, limit: 10 }
    });
  } catch (error) {
    sendError(response, error);
  }
}
