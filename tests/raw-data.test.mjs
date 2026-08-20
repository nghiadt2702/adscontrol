import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  listRawImports,
  parseMultipartBody,
  previewRawFile,
  saveRawImport
} from "../api/_lib/raw-storage.js";

function buildMultipart() {
  const boundary = "raw-test-boundary";
  const chunks = [
    `--${boundary}\r\nContent-Disposition: form-data; name="platform"\r\n\r\nmeta\r\n`,
    `--${boundary}\r\nContent-Disposition: form-data; name="dateFrom"\r\n\r\n2026-08-01\r\n`,
    `--${boundary}\r\nContent-Disposition: form-data; name="dateTo"\r\n\r\n2026-08-02\r\n`,
    `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="meta-export.csv"\r\nContent-Type: text/csv\r\n\r\nDate,Campaign,Spend\n2026-08-01,Test,1000\n\r\n`,
    `--${boundary}--\r\n`
  ];
  return {
    boundary,
    body: Buffer.from(chunks.join("")),
    contentType: `multipart/form-data; boundary=${boundary}`
  };
}

test("raw storage parses multipart upload and persists a manifest record", async () => {
  const temporaryDir = await mkdtemp(path.join(os.tmpdir(), "dadtrack-raw-"));
  const previousDir = process.env.RAW_DATA_DIR;
  process.env.RAW_DATA_DIR = temporaryDir;
  try {
    const multipart = buildMultipart();
    const parsed = parseMultipartBody(multipart.body, multipart.contentType);
    assert.equal(parsed.fields.platform, "meta");
    assert.equal(parsed.file.fileName, "meta-export.csv");
    assert.match(parsed.file.data.toString("utf8"), /Test,1000/);

    const saved = await saveRawImport({
      file: parsed.file,
      fields: parsed.fields,
      uploadedBy: { id: "user-1", email: "owner@example.com" }
    });
    assert.equal(saved.record.platform, "meta");
    assert.equal(saved.record.dateFrom, "2026-08-01");
    assert.equal(saved.preview.format, "csv");
    assert.deepEqual(saved.preview.headers, ["Date", "Campaign", "Spend"]);

    const imports = await listRawImports();
    assert.equal(imports.length, 1);
    assert.equal(imports[0].sha256, saved.record.sha256);
    const manifest = JSON.parse(await readFile(path.join(temporaryDir, "manifest.json"), "utf8"));
    assert.equal(manifest[0].uploadedBy.email, "owner@example.com");
  } finally {
    if (previousDir === undefined) delete process.env.RAW_DATA_DIR;
    else process.env.RAW_DATA_DIR = previousDir;
    await rm(temporaryDir, { recursive: true, force: true });
  }
});

test("raw preview keeps binary spreadsheets stored-only", () => {
  const preview = previewRawFile(Buffer.from("not-an-xlsx"), ".xlsx");
  assert.equal(preview.parserStatus, "stored_only");
});
