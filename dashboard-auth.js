import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const roleLabels = {
  owner: "Owner",
  admin: "Admin",
  ua_lead: "Workspace Editor",
  ua_buyer: "UA Buyer"
};

const demoMembers = [
  { full_name: "Minh Anh", email: "minh@northstar.games", role: "owner", status: "active", last_seen_at: new Date().toISOString() },
  { full_name: "Quang Huy", email: "huy@northstar.games", role: "ua_lead", status: "active", last_seen_at: new Date(Date.now() - 18e5).toISOString() },
  { full_name: "Linh Chi", email: "chi@northstar.games", role: "ua_buyer", status: "active", last_seen_at: new Date(Date.now() - 72e5).toISOString() },
  { full_name: "Tú Uyên", email: "uyen@northstar.games", role: "ua_buyer", status: "invited", last_seen_at: null }
];

function initials(name = "UA") {
  return name.split(/\s+/).slice(-2).map((part) => part[0]).join("").toUpperCase();
}

function relativeTime(value) {
  if (!value) return "Chưa đăng nhập";
  const minutes = Math.max(1, Math.round((Date.now() - new Date(value).getTime()) / 60000));
  if (minutes < 60) return `${minutes} phút trước`;
  if (minutes < 1440) return `${Math.round(minutes / 60)} giờ trước`;
  return `${Math.round(minutes / 1440)} ngày trước`;
}

function renderTeam(members, seats) {
  const tbody = document.querySelector("#team-table");
  const usage = document.querySelector("#seat-usage");
  const bar = document.querySelector("#seat-progress");
  if (!tbody) return;

  usage.textContent = `${seats.used}/${seats.limit} thành viên`;
  bar.style.width = `${Math.min(100, (seats.used / seats.limit) * 100)}%`;
  tbody.innerHTML = members.map((member) => `
    <tr>
      <td><div class="member-cell"><span>${initials(member.full_name)}</span><div><strong>${member.full_name || "Chưa đặt tên"}</strong><small>${member.email}</small></div></div></td>
      <td><span class="role-badge">${roleLabels[member.role] || member.role}</span></td>
      <td><span class="member-status ${member.status}"><i></i>${member.status === "active" ? "Đang hoạt động" : member.status === "invited" ? "Đã mời" : "Đã tắt"}</span></td>
      <td>${relativeTime(member.last_seen_at)}</td>
    </tr>
  `).join("");
}

async function loadTeam(session, demoMode) {
  if (demoMode) return renderTeam(demoMembers, { used: demoMembers.length, limit: 10 });
  const response = await fetch("/api/team", {
    headers: { Authorization: `Bearer ${session.access_token}` }
  });
  const payload = await response.json();
  if (!response.ok) {
    document.querySelector("#team-permission").hidden = false;
    document.querySelector("#team-admin-content").hidden = true;
    return;
  }
  renderTeam(payload.members, payload.seats);
}

async function init() {
  const config = await fetch("/api/config").then((response) => response.json()).catch(() => ({}));
  const demoMode = !config.authEnabled;
  window.__uaAppMode = demoMode ? "demo" : "production";
  let supabase;
  let session;
  let currentUser = { email: "demo@northstar.games", user_metadata: { full_name: "Minh Anh" } };

  if (!demoMode) {
    supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);
    const result = await supabase.auth.getSession();
    session = result.data.session;
    if (!session) return location.replace("/login.html");
    currentUser = session.user;
  }
  window.__uaSessionToken = session?.access_token || "";

  let profile = null;
  let permissions = {
    canSync: demoMode,
    canManageIntegrations: demoMode,
    canEditWorkspace: true,
    canInvite: demoMode,
    canManageMembers: demoMode,
    canViewWorkspace: true,
    scope: "workspace"
  };
  if (!demoMode) {
    const meResponse = await fetch("/api/me", {
      headers: { Authorization: `Bearer ${session.access_token}` }
    });
    const mePayload = await meResponse.json().catch(() => ({}));
    if (!meResponse.ok) {
      await supabase.auth.signOut();
      location.replace(`/login.html?reason=${encodeURIComponent(mePayload.error || "access_denied")}`);
      return;
    }
    profile = mePayload.user;
    permissions = mePayload.permissions;
    currentUser = {
      ...currentUser,
      email: profile.email,
      user_metadata: { ...currentUser.user_metadata, full_name: profile.fullName }
    };
  }
  window.__uaProfile = profile;
  window.__uaPermissions = permissions;
  window.dispatchEvent(new CustomEvent("ua-auth-ready", { detail: { profile, permissions } }));

  const displayName = currentUser.user_metadata?.full_name || currentUser.email?.split("@")[0] || "UA User";
  const avatar = document.querySelector(".user-avatar");
  avatar.textContent = initials(displayName);
  avatar.title = currentUser.email;
  document.querySelector("#welcome-name").textContent = displayName.split(/\s+/).slice(-1)[0];
  document.querySelector("#session-name").textContent = displayName;
  document.querySelector("#session-email").textContent = currentUser.email;
  document.querySelector("#session-avatar").textContent = initials(displayName);
  document.querySelector("#environment-label").textContent = demoMode ? "Demo workspace" : "Production workspace";
  document.querySelector("#environment-note").textContent = demoMode
    ? "Dữ liệu mẫu · chưa kết nối API"
    : `${roleLabels[profile?.role] || "Member"} · ${permissions.scope === "workspace" ? "Toàn workspace" : "Phạm vi được giao"}`;
  document.querySelector("#demo-banner").hidden = !demoMode;
  document.querySelectorAll("[data-admin-only]").forEach((element) => {
    element.hidden = !permissions.canManageMembers && !demoMode;
  });
  document.querySelectorAll('[data-view="integrations"], [data-view-link="integrations"]').forEach((element) => {
    element.hidden = !permissions.canManageIntegrations && !demoMode;
  });
  if (!permissions.canManageIntegrations && location.hash.slice(1) === "integrations") {
    location.hash = "overview";
  }

  avatar.addEventListener("click", () => document.querySelector("#user-menu").classList.toggle("open"));
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".user-menu-wrap")) document.querySelector("#user-menu").classList.remove("open");
  });

  document.querySelector("#sign-out").addEventListener("click", async () => {
    if (supabase) await supabase.auth.signOut();
    location.replace("/login.html");
  });

  await loadTeam(session, demoMode);

  const inviteForm = document.querySelector("#invite-form");
  inviteForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const status = document.querySelector("#invite-status");
    const button = inviteForm.querySelector("button");
    if (demoMode) {
      status.textContent = "Demo mode: form hoạt động, nhưng chưa gửi email thật.";
      status.dataset.tone = "success";
      return;
    }
    button.disabled = true;
    status.textContent = "Đang gửi lời mời…";
    const values = new FormData(inviteForm);
    const response = await fetch("/api/invite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`
      },
      body: JSON.stringify({
        fullName: values.get("fullName"),
        email: values.get("email"),
        role: values.get("role")
      })
    });
    const payload = await response.json();
    button.disabled = false;
    status.textContent = response.ok ? `Đã gửi lời mời đến ${values.get("email")}.` : payload.error;
    status.dataset.tone = response.ok ? "success" : "error";
    if (response.ok) {
      inviteForm.reset();
      await loadTeam(session, false);
    }
  });
}

init();
