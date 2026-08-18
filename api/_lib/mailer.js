function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function getRecipients() {
  return (process.env.OWNER_NOTIFICATION_EMAIL || process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export async function notifyOwnerOfAccessRequest({ id, email, fullName, message, createdAt }) {
  const apiKey = process.env.RESEND_API_KEY || "";
  const from = process.env.RESEND_FROM_EMAIL || "";
  const recipients = getRecipients();

  if (!apiKey || !from || !recipients.length) {
    return { sent: false, reason: "mailer_not_configured" };
  }

  const appUrl = (process.env.APP_URL || "http://localhost:3000").replace(/\/$/, "");
  const html = `
    <h2>DADTrack access request</h2>
    <p>A new user has requested access to your workspace.</p>
    <dl>
      <dt><strong>Name</strong></dt><dd>${escapeHtml(fullName)}</dd>
      <dt><strong>Email</strong></dt><dd>${escapeHtml(email)}</dd>
      <dt><strong>Message</strong></dt><dd>${escapeHtml(message || "—")}</dd>
      <dt><strong>Requested at</strong></dt><dd>${escapeHtml(createdAt || "—")}</dd>
    </dl>
    <p><a href="${escapeHtml(`${appUrl}/app.html#team`)}">Open Team &amp; assignments</a> to review and assign a role.</p>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: recipients,
      subject: `DADTrack access request from ${fullName}`,
      html,
      headers: { "X-DADTrack-Access-Request": id }
    })
  });

  if (!response.ok) {
    const error = new Error("Owner notification provider rejected the request.");
    error.statusCode = 502;
    throw error;
  }

  return { sent: true };
}
