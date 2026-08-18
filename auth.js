import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SKIP_INTRO_AFTER_FIRST_VIEW = true;
const APPROACH_DURATION = 900;
const CONTACT_DURATION = 420;
const REVEAL_DELAY = 500;
const LOGIN_REVEAL_DURATION = 680;

const authPanel = document.querySelector("#auth-panel");
const loginPanel = document.querySelector("#login-panel");
const passwordPanel = document.querySelector("#password-panel");
const demoPanel = document.querySelector("#demo-panel");
const message = document.querySelector("#form-message");
const loginForm = document.querySelector("#login-form");
const passwordForm = document.querySelector("#password-form");
const signupRequestForm = document.querySelector("#signup-request-form");
const signupRequestStatus = document.querySelector("#signup-request-status");
const requestedMode = new URLSearchParams(location.search).get("mode");

function getSafeNextPath() {
  const requestedPath = new URLSearchParams(location.search).get("next");
  if (!requestedPath || !requestedPath.startsWith("/") || requestedPath.startsWith("//") || requestedPath.includes("\\")) {
    return "/app.html";
  }
  return requestedPath;
}

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

function isActivationFlow() {
  return (
    location.hash.includes("type=invite") ||
    location.hash.includes("type=recovery") ||
    new URLSearchParams(location.search).has("code")
  );
}

function markIntroSeen() {
  if (!SKIP_INTRO_AFTER_FIRST_VIEW) return;
  sessionStorage.setItem("dadtrack-login-intro-seen", "1");
}

function initLoginIntro() {
  const intro = document.querySelector("#login-intro");
  const startButton = document.querySelector("#login-intro-start");
  const skipButton = document.querySelector("#login-intro-skip");
  if (!intro || !startButton || !skipButton) return;

  if (requestedMode === "signup") document.body.classList.add("auth-signup-requested");

  if (isActivationFlow()) {
    intro.hidden = true;
    intro.setAttribute("aria-hidden", "true");
    authPanel.hidden = false;
    loginPanel.hidden = true;
    passwordPanel.hidden = false;
    document.body.classList.add("login-activation-flow", "login-intro-ready");
    return;
  }

  let state = "idle";
  let parallaxFrame = 0;
  let pointerX = 0;
  let pointerY = 0;
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const hasSeenIntro = SKIP_INTRO_AFTER_FIRST_VIEW && sessionStorage.getItem("dadtrack-login-intro-seen") === "1";

  const focusLogin = () => {
    if (requestedMode === "signup") {
      document.querySelector("#signup-request-form input")?.focus({ preventScroll: true });
      return;
    }
    const firstInput = document.querySelector("#login-panel:not([hidden]) input, #password-panel:not([hidden]) input");
    firstInput?.focus({ preventScroll: true });
  };

  const revealLogin = (animate = true) => {
    if (state === "login") return;
    state = "login";
    intro.classList.remove("is-connecting", "is-connected");
    intro.classList.add("is-open");
    intro.setAttribute("aria-hidden", "true");
    document.body.classList.add("login-intro-ready");
    authPanel.hidden = false;
    markIntroSeen();
    window.setTimeout(focusLogin, animate ? LOGIN_REVEAL_DURATION : 0);
  };

  const connect = () => {
    if (state !== "idle") return;
    if (reducedMotion) {
      revealLogin(false);
      return;
    }

    state = "connecting";
    startButton.disabled = true;
    intro.classList.add("is-connecting");

    window.setTimeout(() => {
      state = "connected";
      intro.classList.remove("is-connecting");
      intro.classList.add("is-connected");
      window.setTimeout(() => revealLogin(true), CONTACT_DURATION + REVEAL_DELAY);
    }, APPROACH_DURATION);
  };

  const updateParallax = () => {
    parallaxFrame = 0;
    if (state !== "idle" || reducedMotion) return;
    intro.style.setProperty("--parallax-x", `${pointerX * 4}px`);
    intro.style.setProperty("--parallax-y", `${pointerY * 4}px`);
  };

  intro.addEventListener("pointermove", (event) => {
    if (state !== "idle" || reducedMotion) return;
    pointerX = event.clientX / window.innerWidth * 2 - 1;
    pointerY = event.clientY / window.innerHeight * 2 - 1;
    if (!parallaxFrame) parallaxFrame = window.requestAnimationFrame(updateParallax);
  }, { passive: true });

  intro.setAttribute("aria-hidden", "false");
  startButton.addEventListener("click", connect);
  skipButton.addEventListener("click", () => revealLogin(false));
  document.addEventListener("keydown", (event) => {
    if (state !== "idle") return;
    if (event.key === "Escape") {
      event.preventDefault();
      revealLogin(false);
    } else if (event.key === "Enter") {
      event.preventDefault();
      connect();
    }
  });

  if (hasSeenIntro || reducedMotion) {
    window.requestAnimationFrame(() => revealLogin(false));
  }
}

async function init() {
  const config = await fetch("/api/config").then((response) => response.json()).catch(() => ({}));
  const accessReason = new URLSearchParams(location.search).get("reason");
  if (!config.authEnabled) {
    demoPanel.hidden = false;
    loginForm.querySelector("button").disabled = true;
    signupRequestForm.querySelector("button").disabled = true;
    signupRequestStatus.textContent = "Access requests are unavailable until Supabase is configured.";
    signupRequestStatus.dataset.tone = "error";
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

  if (isActivationFlow()) {
    const code = new URLSearchParams(location.search).get("code");
    if (code) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) setMessage("This link has expired. Ask an Admin to resend the invitation.", "error");
    }
    loginPanel.hidden = true;
    passwordPanel.hidden = false;
  } else {
    const { data } = await supabase.auth.getSession();
    if (data.session) location.replace(getSafeNextPath());
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
    location.replace(getSafeNextPath());
  });

  signupRequestForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = signupRequestForm.querySelector("button");
    const values = new FormData(signupRequestForm);
    button.disabled = true;
    signupRequestStatus.textContent = "Sending request…";
    signupRequestStatus.dataset.tone = "";

    const response = await fetch("/api/signup-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: values.get("fullName"),
        email: values.get("email"),
        message: values.get("message")
      })
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      button.disabled = false;
      signupRequestStatus.textContent = payload.error || "We couldn't send your request.";
      signupRequestStatus.dataset.tone = "error";
      return;
    }

    signupRequestForm.reset();
    signupRequestStatus.textContent = payload.message || "Request sent. The workspace Owner will review it.";
    signupRequestStatus.dataset.tone = "success";
    button.disabled = false;
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
    setTimeout(() => location.replace(getSafeNextPath()), 700);
  });
}

initLoginIntro();
init();
