import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const loginPanel = document.querySelector("#login-panel");
const passwordPanel = document.querySelector("#password-panel");
const demoPanel = document.querySelector("#demo-panel");
const message = document.querySelector("#form-message");
const loginForm = document.querySelector("#login-form");
const magicForm = document.querySelector("#magic-form");
const passwordForm = document.querySelector("#password-form");

function setMessage(text, tone = "") {
  message.textContent = text;
  message.dataset.tone = tone;
}

function setBusy(form, busy) {
  const button = form.querySelector("button");
  button.disabled = busy;
  button.dataset.original ||= button.textContent;
  button.textContent = busy ? "Đang xử lý…" : button.dataset.original;
}

async function init() {
  const config = await fetch("/api/config").then((response) => response.json()).catch(() => ({}));
  if (!config.authEnabled) {
    demoPanel.hidden = false;
    loginForm.querySelector("button").disabled = true;
    magicForm.querySelector("button").disabled = true;
    setMessage("Cần thêm biến môi trường Supabase trên Vercel để mở đăng nhập thật.");
    return;
  }

  const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey, {
    auth: { detectSessionInUrl: true, persistSession: true, autoRefreshToken: true }
  });

  const activationFlow =
    location.hash.includes("type=invite") ||
    location.hash.includes("type=recovery") ||
    new URLSearchParams(location.search).has("code");

  if (activationFlow) {
    const code = new URLSearchParams(location.search).get("code");
    if (code) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) setMessage("Link đã hết hạn. Hãy yêu cầu Admin gửi lại lời mời.", "error");
    }
    loginPanel.hidden = true;
    passwordPanel.hidden = false;
  } else {
    const { data } = await supabase.auth.getSession();
    if (data.session) location.replace("/app.html");
  }

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    setBusy(loginForm, true);
    setMessage("");
    const values = new FormData(loginForm);
    const { error } = await supabase.auth.signInWithPassword({
      email: values.get("email"),
      password: values.get("password")
    });
    setBusy(loginForm, false);
    if (error) return setMessage("Email hoặc mật khẩu chưa đúng.", "error");
    location.replace("/app.html");
  });

  magicForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    setBusy(magicForm, true);
    const values = new FormData(magicForm);
    const { error } = await supabase.auth.signInWithOtp({
      email: values.get("email"),
      options: { emailRedirectTo: `${location.origin}/login.html` }
    });
    setBusy(magicForm, false);
    setMessage(
      error ? "Chưa thể gửi magic link. Vui lòng thử lại." : "Magic link đã được gửi. Hãy kiểm tra email.",
      error ? "error" : "success"
    );
  });

  passwordForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const values = new FormData(passwordForm);
    if (values.get("password") !== values.get("confirmPassword")) {
      return setMessage("Hai mật khẩu chưa trùng nhau.", "error");
    }
    setBusy(passwordForm, true);
    const { error } = await supabase.auth.updateUser({ password: values.get("password") });
    setBusy(passwordForm, false);
    if (error) return setMessage("Link đã hết hạn hoặc mật khẩu chưa hợp lệ.", "error");
    setMessage("Tài khoản đã được kích hoạt. Đang mở workspace…", "success");
    setTimeout(() => location.replace("/app.html"), 700);
  });
}

init();
