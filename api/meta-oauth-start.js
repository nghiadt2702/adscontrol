import { buildMetaLoginUrl } from "./_lib/meta.js";
import { requireAdmin, sendError } from "./_lib/supabase.js";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }
  try {
    const { user } = await requireAdmin(request);
    response.setHeader("Cache-Control", "no-store");
    response.status(200).json({ url: buildMetaLoginUrl(user.id) });
  } catch (error) {
    sendError(response, error);
  }
}
