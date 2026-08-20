import {
  listRawImports,
  parseMultipartBody,
  saveRawImport
} from "./_lib/raw-storage.js";
import { requireAdmin, sendError } from "./_lib/supabase.js";

function isRawMode() {
  return String(process.env.APP_DATA_MODE || "api").toLowerCase() === "raw";
}

export default async function handler(request, response) {
  if (!isRawMode()) {
    return response.status(404).json({ error: "Raw data backend is not enabled on this deployment." });
  }

  try {
    const { user } = await requireAdmin(request);

    if (request.method === "GET") {
      const imports = await listRawImports(request.query?.limit);
      return response.status(200).json({ dataMode: "raw", imports });
    }

    if (request.method !== "POST") {
      response.setHeader("Allow", "GET, POST");
      return response.status(405).json({ error: "Method not allowed" });
    }

    const contentType = request.body?.contentType || request.headers["content-type"] || "";
    const { fields, file } = parseMultipartBody(request.body?.multipart, contentType);
    if (!file || file.fieldName !== "file") {
      return response.status(400).json({ error: "Upload a file using the multipart field named file." });
    }

    const result = await saveRawImport({
      file,
      fields,
      uploadedBy: { id: user.id, email: user.email }
    });
    return response.status(201).json({
      dataMode: "raw",
      import: result.record,
      preview: result.preview
    });
  } catch (error) {
    return sendError(response, error);
  }
}
