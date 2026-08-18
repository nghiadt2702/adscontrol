import { assertAccessRequestId, editableRequestRoles } from "./_lib/access-requests.js";
import { requireAdmin, sendError, serviceRequest } from "./_lib/supabase.js";

const requestSelect = "id,email,full_name,message,status,requested_role,decided_role,decided_by,decided_at,created_at";

async function updateRequest(requestId, body) {
  const rows = await serviceRequest(`/rest/v1/workspace_access_requests?id=eq.${encodeURIComponent(requestId)}`, {
    method: "PATCH",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(body)
  });
  return rows[0] || null;
}

export default async function handler(request, response) {
  if (!["GET", "PATCH"].includes(request.method)) {
    response.setHeader("Allow", "GET, PATCH");
    return response.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { user: actor } = await requireAdmin(request);

    if (request.method === "GET") {
      const requests = await serviceRequest(
        `/rest/v1/workspace_access_requests?select=${requestSelect}&order=created_at.desc&limit=100`
      );
      response.setHeader("Cache-Control", "no-store");
      return response.status(200).json({ requests });
    }

    const requestId = assertAccessRequestId(request.body?.requestId);
    const decision = String(request.body?.decision || "").trim().toLowerCase();
    if (!["approve", "reject"].includes(decision)) {
      return response.status(400).json({ error: "Quyết định không hợp lệ." });
    }

    const pendingRows = await serviceRequest(
      `/rest/v1/workspace_access_requests?id=eq.${encodeURIComponent(requestId)}&status=eq.pending&select=${requestSelect}&limit=1`
    );
    const accessRequest = pendingRows[0];
    if (!accessRequest) {
      return response.status(404).json({ error: "Yêu cầu không tồn tại hoặc đã được xử lý." });
    }

    if (decision === "reject") {
      const rejected = await updateRequest(requestId, {
        status: "rejected",
        decided_by: actor.id,
        decided_at: new Date().toISOString()
      });
      return response.status(200).json({ request: rejected || { ...accessRequest, status: "rejected" } });
    }

    const role = String(request.body?.role || accessRequest.requested_role || "ua_buyer").trim();
    if (!editableRequestRoles.has(role)) {
      return response.status(400).json({ error: "Vai trò không hợp lệ." });
    }

    const profiles = await serviceRequest("/rest/v1/profiles?select=user_id,email,status");
    const activeSeats = profiles.filter((profile) => profile.status !== "disabled").length;
    if (activeSeats >= 10) {
      return response.status(409).json({ error: "Workspace đã sử dụng đủ 10/10 thành viên." });
    }
    if (profiles.some((profile) => profile.email?.toLowerCase() === accessRequest.email.toLowerCase())) {
      return response.status(409).json({ error: "Email này đã thuộc workspace hoặc đang có lời mời." });
    }

    const redirectTo = `${(process.env.APP_URL || "http://localhost:3000").replace(/\/$/, "")}/login.html`;
    let invited;
    try {
      invited = await serviceRequest(`/auth/v1/invite?redirect_to=${encodeURIComponent(redirectTo)}`, {
        method: "POST",
        body: JSON.stringify({
          email: accessRequest.email,
          data: {
            full_name: accessRequest.full_name,
            requested_role: role,
            invited_by: actor.id,
            access_request_id: requestId
          }
        })
      });

      await serviceRequest(`/rest/v1/profiles?user_id=eq.${encodeURIComponent(invited.id)}`, {
        method: "PATCH",
        headers: { Prefer: "return=minimal" },
        body: JSON.stringify({ full_name: accessRequest.full_name, role, status: "active" })
      });

      const approved = await updateRequest(requestId, {
        status: "approved",
        decided_role: role,
        decided_by: actor.id,
        decided_at: new Date().toISOString()
      });

      response.status(200).json({
        request: approved || { ...accessRequest, status: "approved", decided_role: role },
        member: {
          userId: invited.id,
          email: accessRequest.email,
          fullName: accessRequest.full_name,
          role,
          status: "active"
        },
        seats: { used: activeSeats + 1, limit: 10 }
      });
    } catch (error) {
      if (invited?.id) {
        await serviceRequest(`/auth/v1/admin/users/${encodeURIComponent(invited.id)}`, {
          method: "DELETE"
        }).catch(() => {});
      }
      throw error;
    }
  } catch (error) {
    sendError(response, error);
  }
}
