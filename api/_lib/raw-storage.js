import { createHash, randomUUID } from "node:crypto";
import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { parseRawRecords } from "./raw-parser.js";

const allowedExtensions = new Set([".csv", ".tsv", ".json", ".xlsx", ".xls"]);
const allowedPlatforms = new Set(["meta", "google", "tiktok", "appsflyer"]);
const manifestFileName = "manifest.json";
let manifestQueue = Promise.resolve();

function rawDataDir() {
  return path.resolve(process.env.RAW_DATA_DIR || path.join(process.cwd(), "data", "raw"));
}

function assertWithinRawDataDir(filePath) {
  const base = rawDataDir();
  const resolved = path.resolve(filePath);
  if (resolved !== base && !resolved.startsWith(`${base}${path.sep}`)) {
    const error = new Error("Invalid raw storage path.");
    error.statusCode = 400;
    throw error;
  }
  return resolved;
}

function sanitizeFileName(fileName) {
  const baseName = path.basename(String(fileName || "upload"));
  const sanitized = baseName
    .normalize("NFKC")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^[-.]+|[-.]+$/g, "")
    .slice(0, 120);
  return sanitized || "upload";
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

function normalizeMetadata(fields = {}) {
  const platform = String(fields.platform || "").trim().toLowerCase();
  if (!allowedPlatforms.has(platform)) {
    const error = new Error("platform must be one of meta, google, tiktok or appsflyer.");
    error.statusCode = 400;
    throw error;
  }

  const dateFrom = validateDate(fields.dateFrom, "dateFrom");
  const dateTo = validateDate(fields.dateTo, "dateTo");
  if (dateFrom && dateTo && dateFrom > dateTo) {
    const error = new Error("dateFrom must be earlier than or equal to dateTo.");
    error.statusCode = 400;
    throw error;
  }

  return {
    platform,
    account: String(fields.account || "").trim().slice(0, 160) || null,
    dateFrom,
    dateTo,
    timezone: String(fields.timezone || "").trim().slice(0, 80) || null,
    notes: String(fields.notes || "").trim().slice(0, 500) || null
  };
}

export async function ensureRawStorage() {
  const base = rawDataDir();
  await mkdir(assertWithinRawDataDir(base), { recursive: true });
  await mkdir(assertWithinRawDataDir(path.join(base, "imports")), { recursive: true });
  const manifestPath = assertWithinRawDataDir(path.join(base, manifestFileName));
  try {
    await readFile(manifestPath, "utf8");
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    await writeFile(manifestPath, "[]\n", { flag: "wx" }).catch((writeError) => {
      if (writeError.code !== "EEXIST") throw writeError;
    });
  }
  return base;
}

async function readManifest() {
  await ensureRawStorage();
  const manifestPath = assertWithinRawDataDir(path.join(rawDataDir(), manifestFileName));
  const raw = await readFile(manifestPath, "utf8");
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    const error = new Error("Raw import manifest is invalid.");
    error.statusCode = 500;
    throw error;
  }
  if (!Array.isArray(parsed)) {
    const error = new Error("Raw import manifest must be an array.");
    error.statusCode = 500;
    throw error;
  }
  return parsed;
}

async function appendManifest(record) {
  const operation = manifestQueue.then(async () => {
    const manifest = await readManifest();
    manifest.unshift(record);
    const manifestPath = assertWithinRawDataDir(path.join(rawDataDir(), manifestFileName));
    const temporaryPath = assertWithinRawDataDir(`${manifestPath}.tmp-${randomUUID()}`);
    await writeFile(temporaryPath, `${JSON.stringify(manifest, null, 2)}\n`, { mode: 0o600 });
    await rename(temporaryPath, manifestPath);
  });
  manifestQueue = operation.catch(() => undefined);
  await operation;
}

export function parseMultipartBody(buffer, contentType) {
  if (!Buffer.isBuffer(buffer)) {
    const error = new Error("Multipart request body is missing.");
    error.statusCode = 400;
    throw error;
  }

  const boundaryMatch = /boundary=(?:"([^"]+)"|([^;]+))/i.exec(String(contentType || ""));
  const boundary = boundaryMatch?.[1] || boundaryMatch?.[2]?.trim();
  if (!boundary) {
    const error = new Error("Multipart boundary is missing.");
    error.statusCode = 400;
    throw error;
  }

  const marker = Buffer.from(`--${boundary}`);
  const separator = Buffer.from("\r\n\r\n");
  const fields = {};
  let file = null;
  let cursor = 0;

  while (cursor < buffer.length) {
    const markerStart = buffer.indexOf(marker, cursor);
    if (markerStart === -1) break;
    const contentStart = markerStart + marker.length;
    if (buffer[contentStart] === 45 && buffer[contentStart + 1] === 45) break;

    const partStart = contentStart + (buffer[contentStart] === 13 && buffer[contentStart + 1] === 10 ? 2 : 0);
    const headersEnd = buffer.indexOf(separator, partStart);
    if (headersEnd === -1) break;
    const headersText = buffer.slice(partStart, headersEnd).toString("utf8");
    const bodyStart = headersEnd + separator.length;
    const nextMarker = buffer.indexOf(marker, bodyStart);
    if (nextMarker === -1) break;
    const bodyEnd = nextMarker >= 2 && buffer[nextMarker - 2] === 13 && buffer[nextMarker - 1] === 10
      ? nextMarker - 2
      : nextMarker;
    const disposition = /content-disposition:\s*form-data;\s*([^\r\n]+)/i.exec(headersText)?.[1] || "";
    const name = /(?:^|;)\s*name="([^"]+)"/i.exec(disposition)?.[1];
    const fileName = /(?:^|;)\s*filename="([^"]*)"/i.exec(disposition)?.[1];
    if (name && fileName !== undefined) {
      const contentTypeMatch = /content-type:\s*([^\r\n]+)/i.exec(headersText);
      file = {
        fieldName: name,
        fileName,
        contentType: contentTypeMatch?.[1]?.trim() || "application/octet-stream",
        data: buffer.slice(bodyStart, bodyEnd)
      };
    } else if (name) {
      fields[name] = buffer.slice(bodyStart, bodyEnd).toString("utf8");
    }
    cursor = nextMarker;
  }

  return { fields, file };
}

function parseDelimitedPreview(buffer, delimiter) {
  const text = buffer.slice(0, 512 * 1024).toString("utf8").replace(/^\uFEFF/, "");
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;
  for (let index = 0; index < text.length && rows.length < 7; index += 1) {
    const character = text[index];
    const next = text[index + 1];
    if (character === '"') {
      if (quoted && next === '"') {
        value += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (!quoted && character === delimiter) {
      row.push(value);
      value = "";
    } else if (!quoted && (character === "\n" || character === "\r")) {
      if (character === "\r" && next === "\n") index += 1;
      row.push(value);
      value = "";
      if (row.some((cell) => cell.length > 0)) rows.push(row);
      row = [];
    } else {
      value += character;
    }
  }
  if (row.length && row.some((cell) => cell.length > 0) && rows.length < 7) {
    row.push(value);
    rows.push(row);
  }

  const headers = rows.shift() || [];
  return {
    format: delimiter === "\t" ? "tsv" : "csv",
    parserStatus: "preview_only",
    headers: headers.slice(0, 100),
    sampleRows: rows.slice(0, 5).map((cells) => cells.slice(0, 100))
  };
}

export function previewRawFile(buffer, extension) {
  const normalizedExtension = String(extension || "").toLowerCase();
  if (normalizedExtension === ".csv") return parseDelimitedPreview(buffer, ",");
  if (normalizedExtension === ".tsv") return parseDelimitedPreview(buffer, "\t");
  if (normalizedExtension === ".json") {
    try {
      const parsed = JSON.parse(buffer.slice(0, 2 * 1024 * 1024).toString("utf8").replace(/^\uFEFF/, ""));
      return {
        format: "json",
        parserStatus: "preview_only",
        rootType: Array.isArray(parsed) ? "array" : typeof parsed,
        sampleSize: Array.isArray(parsed) ? Math.min(parsed.length, 5) : null
      };
    } catch {
      return { format: "json", parserStatus: "invalid_preview" };
    }
  }
  return {
    format: normalizedExtension.slice(1) || "binary",
    parserStatus: "stored_only",
    note: "Binary spreadsheet stored; CSV/TSV/JSON is required for dashboard aggregation."
  };
}

export async function saveRawImport({ file, fields, uploadedBy }) {
  if (!file?.data?.length) {
    const error = new Error("A non-empty file is required.");
    error.statusCode = 400;
    throw error;
  }
  const extension = path.extname(file.fileName || "").toLowerCase();
  if (!allowedExtensions.has(extension)) {
    const error = new Error("Supported files are CSV, TSV, JSON, XLSX or XLS.");
    error.statusCode = 400;
    throw error;
  }

  const metadata = normalizeMetadata(fields);
  const base = await ensureRawStorage();
  const id = randomUUID();
  const now = new Date();
  const parsed = parseRawRecords(file.data, extension, {
    platform: metadata.platform,
    account: metadata.account,
    sourceImportId: id
  });
  const month = now.toISOString().slice(0, 7);
  const directory = assertWithinRawDataDir(path.join(base, "imports", metadata.platform, month));
  await mkdir(directory, { recursive: true });
  const safeName = sanitizeFileName(file.fileName);
  const storedName = `${now.getTime()}_${id}_${safeName}`;
  const filePath = assertWithinRawDataDir(path.join(directory, storedName));
  const recordsPath = parsed.parserStatus === "parsed"
    ? assertWithinRawDataDir(path.join(directory, `${now.getTime()}_${id}_records.json`))
    : null;
  await writeFile(filePath, file.data, { flag: "wx", mode: 0o600 });
  if (recordsPath) {
    try {
      await writeFile(recordsPath, `${JSON.stringify(parsed.records)}\n`, { flag: "wx", mode: 0o600 });
    } catch (error) {
      await rm(filePath, { force: true });
      throw error;
    }
  }

  const record = {
    id,
    originalName: String(file.fileName || "upload").slice(0, 255),
    storageKey: path.relative(base, filePath),
    extension,
    contentType: file.contentType,
    bytes: file.data.byteLength,
    sha256: createHash("sha256").update(file.data).digest("hex"),
    uploadedAt: now.toISOString(),
    uploadedBy: {
      id: uploadedBy?.id || null,
      email: uploadedBy?.email || null
    },
    ...metadata,
    parserStatus: parsed.parserStatus,
    schema: parsed.schema,
    rowCount: parsed.rowCount,
    recordsStorageKey: recordsPath ? path.relative(base, recordsPath) : null
  };

  try {
    await appendManifest(record);
  } catch (error) {
    await rm(filePath, { force: true });
    if (recordsPath) await rm(recordsPath, { force: true });
    throw error;
  }
  return {
    record,
    preview: {
      ...previewRawFile(file.data, extension),
      parserStatus: parsed.parserStatus,
      schema: parsed.schema,
      rowCount: parsed.rowCount
    }
  };
}

export async function listRawImports(limit = 100) {
  const manifest = await readManifest();
  const safeLimit = Math.min(Math.max(Number(limit) || 100, 1), 500);
  return manifest.slice(0, safeLimit);
}

export async function readRawImportRecords(record) {
  if (!record?.recordsStorageKey) return [];
  const filePath = assertWithinRawDataDir(path.join(rawDataDir(), record.recordsStorageKey));
  try {
    const parsed = JSON.parse(await readFile(filePath, "utf8"));
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}
