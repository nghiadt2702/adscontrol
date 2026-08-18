const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const editableRequestRoles = new Set(["admin", "ua_lead", "ua_buyer"]);

export function normalizeAccessRequest(body = {}) {
  const email = String(body.email || "").trim().toLowerCase();
  const fullName = String(body.fullName || "").trim();
  const message = String(body.message || "").trim();

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    const error = new Error("Email không hợp lệ.");
    error.statusCode = 400;
    throw error;
  }
  if (!fullName || fullName.length > 80) {
    const error = new Error("Vui lòng nhập họ và tên.");
    error.statusCode = 400;
    throw error;
  }
  if (message.length > 500) {
    const error = new Error("Nội dung yêu cầu không được dài quá 500 ký tự.");
    error.statusCode = 400;
    throw error;
  }

  return { email, fullName, message: message || null };
}

export function assertAccessRequestId(value) {
  const requestId = String(value || "").trim();
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(requestId)) {
    const error = new Error("Yêu cầu truy cập không hợp lệ.");
    error.statusCode = 400;
    throw error;
  }
  return requestId;
}
