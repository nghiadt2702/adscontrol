import { normalizeAccessRequest } from "./_lib/access-requests.js";
import { notifyOwnerOfAccessRequest } from "./_lib/mailer.js";
import { sendError, serviceRequest } from "./_lib/supabase.js";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, fullName, message } = normalizeAccessRequest(request.body);
    const existingProfiles = await serviceRequest(
      `/rest/v1/profiles?email=eq.${encodeURIComponent(email)}&select=user_id,email,status&limit=1`
    );
    if (existingProfiles[0]) {
      return response.status(409).json({ error: "Email này đã thuộc workspace hoặc đang có lời mời." });
    }

    const pendingRequests = await serviceRequest(
      `/rest/v1/workspace_access_requests?email=eq.${encodeURIComponent(email)}&status=eq.pending&select=id&limit=1`
    );
    if (pendingRequests[0]) {
      return response.status(409).json({ error: "Email này đã có một yêu cầu đang chờ Owner duyệt." });
    }

    const rows = await serviceRequest("/rest/v1/workspace_access_requests", {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify([{ email, full_name: fullName, message }])
    });
    const accessRequest = rows[0];

    let ownerNotified = false;
    try {
      ({ sent: ownerNotified } = await notifyOwnerOfAccessRequest({
        id: accessRequest.id,
        email,
        fullName,
        message,
        createdAt: accessRequest.created_at
      }));
    } catch (notificationError) {
      console.error("Access request email notification failed:", notificationError.message);
    }

    response.setHeader("Cache-Control", "no-store");
    return response.status(201).json({
      request: {
        id: accessRequest.id,
        email,
        fullName,
        status: accessRequest.status,
        createdAt: accessRequest.created_at
      },
      ownerNotified,
      message: ownerNotified
        ? "Yêu cầu đã được gửi. Owner sẽ nhận email và xem xét yêu cầu của bạn."
        : "Yêu cầu đã được lưu. Email thông báo Owner chưa được cấu hình; Owner vẫn có thể xem yêu cầu trong Team & access."
    });
  } catch (error) {
    sendError(response, error);
  }
}
