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
import { getRawAnalytics } from "../api/_lib/raw-analytics.js";

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

test("raw analytics aggregates Raw_PF_FB_DAVID with nullable metrics", async () => {
  const temporaryDir = await mkdtemp(path.join(os.tmpdir(), "dadtrack-raw-analytics-"));
  const previousDir = process.env.RAW_DATA_DIR;
  process.env.RAW_DATA_DIR = temporaryDir;
  try {
    const headers = [
      "Ngày",
      "Tên chiến dịch",
      "Campaign ID",
      "Chi phí (VNĐ)",
      "Lượt hiển thị",
      "Lượt click liên kết",
      "Lượt cài đặt ứng dụng",
      "Lượt đăng ký",
      "Lượt phát video trong tối thiểu 3 giây",
      "Lượt phát 50% thời lượng video"
    ];
    const rows = [
      ["15/03/2026", "Raw Camp", "campaign-1", "100.000 đ", "10.000", "500", "100", "10", "400", "100"],
      ["16/03/2026", "Raw Camp", "campaign-1", "50.000 đ", "5.000", "200", "50", "5", "200", "40"]
    ];
    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const saved = await saveRawImport({
      file: {
        fileName: "Raw_PF_FB_DAVID.csv",
        contentType: "text/csv",
        data: Buffer.from(csv)
      },
      fields: {
        platform: "meta",
        account: "FOXSCORE",
        dateFrom: "2026-03-15",
        dateTo: "2026-03-16"
      },
      uploadedBy: { id: "owner-1", email: "owner@example.com" }
    });

    assert.equal(saved.record.parserStatus, "parsed");
    assert.equal(saved.record.schema, "Raw_PF_FB_DAVID");
    const payload = await getRawAnalytics({ from: "2026-03-15", to: "2026-03-16" });
    assert.equal(payload.dataMode, "raw");
    assert.equal(payload.campaigns.length, 1);
    assert.equal(payload.daily.length, 2);
    assert.equal(payload.campaigns[0].spend, 150000);
    assert.equal(payload.campaigns[0].impressions, 15000);
    assert.equal(payload.campaigns[0].clicks, 700);
    assert.equal(payload.campaigns[0].installs, 150);
    assert.equal(payload.campaigns[0].registrations, 15);
    assert.equal(payload.campaigns[0].revenue, null);
    assert.equal(payload.campaigns[0].purchases, null);
    assert.equal(payload.campaigns[0].ctr, (700 / 15000) * 100);
    assert.equal(payload.campaigns[0].cvr, (15 / 15000) * 100);
    assert.equal(payload.campaigns[0].hookRate, (600 / 15000) * 100);
    assert.equal(payload.campaigns[0].holdRate, (140 / 600) * 100);
    assert.deepEqual(payload.breakdowns.age, []);
    assert.deepEqual(payload.breakdowns.gender, []);
    assert.equal(payload.sourceAvailability.Meta.raw, true);
    assert.equal(payload.sourceAvailability.Meta.revenue, false);

    const filtered = await getRawAnalytics({ from: "2026-03-16", to: "2026-03-16" });
    assert.equal(filtered.daily.length, 1);
    assert.equal(filtered.campaigns[0].spend, 50000);
  } finally {
    if (previousDir === undefined) delete process.env.RAW_DATA_DIR;
    else process.env.RAW_DATA_DIR = previousDir;
    await rm(temporaryDir, { recursive: true, force: true });
  }
});
