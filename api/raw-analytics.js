import { getRawAnalytics } from "./_lib/raw-analytics.js";
import { requireAdmin, sendError } from "./_lib/supabase.js";

function isRawMode() {
  return String(process.env.APP_DATA_MODE || "api").toLowerCase() === "raw";
}

function validateDate(value, fieldName) {
  if (!value) return null;
  const normalized = String(value).trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
    const error = new Error(`${fieldName} must use YYYY-MM-DD format.`);
    error.statusCode = 400;
    throw error;
  }
  return normalized;
}

export default async function handler(request, response) {
  if (!isRawMode()) {
    return response.status(404).json({ error: "Raw analytics backend is not enabled on this deployment." });
  }

  try {
    await requireAdmin(request);
    if (request.method !== "GET") {
      response.setHeader("Allow", "GET");
      return response.status(405).json({ error: "Method not allowed" });
    }

    const from = validateDate(request.query?.from, "from");
    const to = validateDate(request.query?.to, "to");
    if (from && to && from > to) {
      return response.status(400).json({ error: "from must be earlier than or equal to to." });
    }

    const payload = await getRawAnalytics({
      from,
      to,
      platform: request.query?.platform || "all",
      account: request.query?.account || "all"
    });
    return response.status(200).json(payload);
  } catch (error) {
    return sendError(response, error);
  }
}
