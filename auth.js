import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const loginPanel = document.querySelector("#login-panel");
const passwordPanel = document.querySelector("#password-panel");
const demoPanel = document.querySelector("#demo-panel");
const message = document.querySelector("#form-message");
const loginForm = document.querySelector("#login-form");
const passwordForm = document.querySelector("#password-form");

function setMessage(text, tone = "") {
  message.textContent = text;
  message.dataset.tone = tone;
}

function setBusy(form, busy) {
  const button = form.querySelector("button");
  button.disabled = busy;
  button.dataset.original ||= button.textContent;
  button.textContent = busy ? "Working…" : button.dataset.original;
}

async function init() {
  const config = await fetch("/api/config").then((response) => response.json()).catch(() => ({}));
  const accessReason = new URLSearchParams(location.search).get("reason");
  if (!config.authEnabled) {
    demoPanel.hidden = false;
    loginForm.querySelector("button").disabled = true;
    setMessage("Add the Supabase environment variables to enable real sign-in.");
    return;
  }

  if (accessReason) {
    setMessage(
      accessReason === "access_denied"
        ? "This account is not authorized for the workspace."
        : "We couldn't verify your workspace access.",
      "error"
    );
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
      if (error) setMessage("This link has expired. Ask an Admin to resend the invitation.", "error");
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
    if (error) return setMessage("The email or password is incorrect.", "error");
    location.replace("/app.html");
  });

  passwordForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const values = new FormData(passwordForm);
    if (values.get("password") !== values.get("confirmPassword")) {
      return setMessage("The passwords do not match.", "error");
    }
    setBusy(passwordForm, true);
    const { error } = await supabase.auth.updateUser({ password: values.get("password") });
    setBusy(passwordForm, false);
    if (error) return setMessage("The link has expired or the password is invalid.", "error");
    setMessage("Account activated. Opening workspace…", "success");
    setTimeout(() => location.replace("/app.html"), 700);
  });
}

init();
