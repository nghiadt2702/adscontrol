import { encryptGoogleToken, exchangeGoogleCode, googleIdentity, verifyGoogleOauthState } from "./_lib/google.js";
import { serviceRequest } from "./_lib/supabase.js";

function callbackPage(payload) {
  const safePayload = JSON.stringify(payload).replaceAll("<", "\\u003c");
  return `<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Google Ads connection</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f7f7fb;color:#1e1b38;font-family:system-ui,sans-serif}.card{width:min(420px,calc(100% - 40px));padding:30px;border:1px solid #e5e3ee;border-radius:18px;background:#fff;box-shadow:0 18px 50px rgba(33,27,70,.12);text-align:center}.icon{width:54px;height:54px;margin:auto;display:grid;place-items:center;border-radius:16px;color:#fff;background:#269a6d;font-size:24px;font-weight:800}h1{font-size:22px}p{color:#77738a;line-height:1.55}</style></head><body><main class="card"><div class="icon">G</div><h1>${payload.ok ? "Đã kết nối Google Ads" : "Chưa thể kết nối"}</h1><p>${payload.ok ? "Đang quay lại Ads Control để chọn tài khoản quảng cáo…" : payload.error}</p></main><script>const result=${safePayload};if(window.opener){window.opener.postMessage({type:"google-oauth-result",...result},location.origin);setTimeout(()=>window.close(),900)}else if(result.ok){setTimeout(()=>location.replace("/app#integrations"),900)}</script></body></html>`;
}

export default async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).send("Method not allowed");
  }
  try {
    if (request.query.error) throw Object.assign(new Error(request.query.error_description || "Người dùng đã hủy cấp quyền Google."), { statusCode: 400 });
    const state = verifyGoogleOauthState(request.query.state);
    if (!request.query.code) throw Object.assign(new Error("Thiếu authorization code từ Google."), { statusCode: 400 });
    const token = await exchangeGoogleCode(request.query.code);
    if (!token.refresh_token) throw Object.assign(new Error("Google chưa cấp refresh token. Hãy thử kết nối lại và chấp thuận toàn bộ quyền."), { statusCode: 400 });
    const identity = await googleIdentity(token.access_token);
    const expiresAt = token.expires_in ? new Date(Date.now() + Number(token.expires_in) * 1000).toISOString() : null;
    await serviceRequest("/rest/v1/google_authorizations?on_conflict=user_id", {
      method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify({
        user_id: state.userId,
        external_user_id: identity.sub || identity.email,
        external_user_name: identity.name || identity.email || "Google user",
        external_user_email: identity.email || null,
        encrypted_refresh_token: encryptGoogleToken(token.refresh_token),
        encrypted_access_token: encryptGoogleToken(token.access_token),
        token_expires_at: expiresAt, status: "active", last_error: null, updated_at: new Date().toISOString()
      })
    });
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    return response.status(200).send(callbackPage({ ok: true, name: identity.name || identity.email }));
  } catch (error) {
    console.error(error);
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    return response.status(error.statusCode || 500).send(callbackPage({ ok: false, error: error.message || "Lỗi kết nối Google." }));
  }
}
