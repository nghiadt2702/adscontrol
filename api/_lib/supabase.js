const requiredServerEnv = [
  "SUPABASE_URL",
  "SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY"
];

export function getSupabaseEnv() {
  const missing = requiredServerEnv.filter((key) => !process.env[key]);
  if (missing.length) {
    const error = new Error(`Missing server configuration: ${missing.join(", ")}`);
    error.statusCode = 503;
    throw error;
  }

  return {
    url: process.env.SUPABASE_URL.replace(/\/$/, ""),
    anonKey: process.env.SUPABASE_ANON_KEY,
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY
  };
}

async function parseResponse(response) {
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(body.message || body.msg || body.error_description || "Supabase request failed");
    error.statusCode = response.status;
    error.details = body;
    throw error;
  }
  return body;
}

export async function getAuthenticatedUser(request) {
  const { url, anonKey } = getSupabaseEnv();
  const authorization = request.headers.authorization || "";

  if (!authorization.startsWith("Bearer ")) {
    const error = new Error("Bạn cần đăng nhập để tiếp tục.");
    error.statusCode = 401;
    throw error;
  }

  const response = await fetch(`${url}/auth/v1/user`, {
    headers: {
      apikey: anonKey,
      Authorization: authorization
    }
  });
  return parseResponse(response);
}

export async function serviceRequest(path, options = {}) {
  const { url, serviceKey } = getSupabaseEnv();
  const response = await fetch(`${url}${path}`, {
    ...options,
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      ...options.headers
    }
  });
  return parseResponse(response);
}

export async function getProfile(userId) {
  const rows = await serviceRequest(
    `/rest/v1/profiles?user_id=eq.${encodeURIComponent(userId)}&select=user_id,email,full_name,role,status`
  );
  return rows[0] || null;
}

export async function requireActiveMember(request) {
  const user = await getAuthenticatedUser(request);
  const profile = await getProfile(user.id);

  if (!profile || profile.status === "disabled") {
    const error = new Error("Tài khoản chưa được kích hoạt hoặc đã bị vô hiệu hóa.");
    error.statusCode = 403;
    throw error;
  }

  return { user, profile };
}

export async function requireAdmin(request) {
  const { user, profile } = await requireActiveMember(request);
  const adminEmails = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  const isAdmin =
    profile?.role === "owner" ||
    profile?.role === "admin" ||
    adminEmails.includes(user.email?.toLowerCase());

  if (!isAdmin) {
    const error = new Error("Chỉ Owner hoặc Admin mới có quyền thực hiện thao tác này.");
    error.statusCode = 403;
    throw error;
  }

  return { user, profile };
}

export function permissionsForRole(role) {
  const manager = role === "owner" || role === "admin";
  const lead = role === "ua_lead";
  return {
    canSync: manager,
    canInvite: manager,
    canManageMembers: manager,
    canViewWorkspace: manager || lead,
    scope: manager || lead ? "workspace" : "assigned"
  };
}

export function sendError(response, error) {
  console.error(error);
  // 502 means an upstream ad platform rejected the call. That message is the
  // only clue an operator has, so it is passed through instead of the generic
  // fallback, which is reserved for genuine internal faults.
  const isUpstream = error.statusCode === 502;
  const isClient = error.statusCode && error.statusCode < 500;
  response.status(error.statusCode || 500).json({
    error: isClient || isUpstream
      ? error.message
      : "Hệ thống chưa thể xử lý yêu cầu. Vui lòng thử lại.",
    ...(error.details ? { details: error.details } : {})
  });
}
