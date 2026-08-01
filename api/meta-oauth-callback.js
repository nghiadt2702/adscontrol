import { encryptToken, exchangeCode, graphRequest, verifyOauthState } from "./_lib/meta.js";
import { serviceRequest } from "./_lib/supabase.js";

function callbackPage(payload) {
  const safePayload = JSON.stringify(payload).replaceAll("<", "\\u003c");
  return `<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Meta connection</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f7f7fb;color:#1e1b38;font-family:system-ui,sans-serif}.card{width:min(420px,calc(100% - 40px));padding:30px;border:1px solid #e5e3ee;border-radius:18px;background:#fff;box-shadow:0 18px 50px rgba(33,27,70,.12);text-align:center}.icon{width:54px;height:54px;margin:auto;display:grid;place-items:center;border-radius:16px;color:#fff;background:#635bff;font-size:24px;font-weight:800}h1{font-size:22px}p{color:#77738a;line-height:1.55}</style></head><body><main class="card"><div class="icon">M</div><h1>${payload.ok ? "Đã kết nối Meta" : "Chưa thể kết nối"}</h1><p>${payload.ok ? "Anh có thể quay lại Ads Control để chọn tài khoản quảng cáo." : payload.error}</p></main><script>const result=${safePayload};if(window.opener){window.opener.postMessage({type:"meta-oauth-result",...result},location.origin);setTimeout(()=>window.close(),900)}</script></body></html>`;
}

export default async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).send("Method not allowed");
  }
  try {
    if (request.query.error) throw Object.assign(new Error(request.query.error_description || "Người dùng đã hủy cấp quyền Meta."), { statusCode: 400 });
    const state = verifyOauthState(request.query.state);
    if (!request.query.code) throw Object.assign(new Error("Thiếu authorization code từ Meta."), { statusCode: 400 });
    const token = await exchangeCode(request.query.code);
    const identity = await graphRequest("me", token.access_token, { fields: "id,name" });
    const expiresAt = token.expires_in
      ? new Date(Date.now() + Number(token.expires_in) * 1000).toISOString()
      : null;
    await serviceRequest("/rest/v1/meta_authorizations?on_conflict=user_id", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify({
        user_id: state.userId,
        external_user_id: identity.id,
        external_user_name: identity.name,
        encrypted_access_token: encryptToken(token.access_token),
        token_expires_at: expiresAt,
        status: "active",
        last_error: null,
        updated_at: new Date().toISOString()
      })
    });
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.status(200).send(callbackPage({ ok: true, name: identity.name }));
  } catch (error) {
    console.error(error);
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.status(error.statusCode || 500).send(callbackPage({ ok: false, error: error.message || "Lỗi kết nối Meta." }));
  }
}
