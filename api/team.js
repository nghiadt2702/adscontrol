import { requireAdmin, sendError, serviceRequest } from "./_lib/supabase.js";

const editableRoles = new Set(["admin", "ua_lead", "ua_buyer"]);

export default async function handler(request, response) {
  if (!["GET", "PATCH"].includes(request.method)) {
    response.setHeader("Allow", "GET, PATCH");
    return response.status(405).json({ error: "Method not allowed" });
  }

  try {
    await requireAdmin(request);
    if (request.method === "PATCH") {
      const userId = String(request.body?.userId || "").trim();
      const role = String(request.body?.role || "").trim();
      if (!userId || !editableRoles.has(role)) {
        return response.status(400).json({ error: "Thành viên hoặc vai trò không hợp lệ." });
      }

      const targets = await serviceRequest(
        `/rest/v1/profiles?user_id=eq.${encodeURIComponent(userId)}&select=user_id,email,full_name,role,status&limit=1`
      );
      const target = targets[0];
      if (!target) return response.status(404).json({ error: "Không tìm thấy thành viên." });
      if (target.role === "owner") {
        return response.status(403).json({ error: "Không thể thay đổi role của Owner." });
      }

      await serviceRequest(`/rest/v1/profiles?user_id=eq.${encodeURIComponent(userId)}`, {
        method: "PATCH",
        headers: { Prefer: "return=minimal" },
        body: JSON.stringify({ role })
      });
      response.setHeader("Cache-Control", "no-store");
      return response.status(200).json({ member: { ...target, role } });
    }

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
