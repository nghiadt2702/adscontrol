const FIELD_ALIASES = {
  date: ["ngay", "date", "day"],
  campaign: ["ten chien dich", "campaign", "campaign name", "campaign_name"],
  adSet: ["ten nhom qc", "ad set", "adset", "ad set name", "adset name"],
  ad: ["ten quang cao", "ad", "ad name", "creative"],
  campaignId: ["campaign id", "campaign_id"],
  adSetId: ["ad set id", "adset id", "ad_set_id"],
  adId: ["ad id", "ad_id"],
  device: ["thiet bi hien thi", "device", "placement device"],
  objective: ["muc tieu", "objective", "campaign objective"],
  spend: ["chi phi vnd", "chi phi", "spend", "cost", "amount spent"],
  impressions: ["luot hien thi", "impressions", "impr"],
  reach: ["nguoi tiep can", "reach"],
  installs: ["luot cai dat ung dung", "installs", "app installs", "mobile app installs"],
  clicks: ["luot click lien ket", "clicks", "link clicks", "link_clicks"],
  engagements: ["luot tuong tac", "engagements", "post engagements"],
  openingViews: ["luot phat video trong toi thieu 3 giay", "3 second video views", "3-second video views", "video views 3s"],
  holdViews: ["luot phat 50 thoi luong video", "luot phat 50 thoi luong video", "50 video views", "50 percent video views", "video views 50"],
  registrations: ["luot dang ky", "registrations", "in app registrations", "in-app registrations"],
  hookRate: ["hook rate", "hookrate"],
  holdRate: ["hold rate", "holdrate"]
};

function normalizeHeader(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/^\uFEFF/, "")
    .replace(/[%()]/g, " ")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[đĐ]/g, "d")
    .toLowerCase();
}

function parseDelimitedRows(buffer, delimiter) {
  const text = buffer.toString("utf8").replace(/^\uFEFF/, "");
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
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
      if (row.some((cell) => String(cell).trim() !== "")) rows.push(row);
      row = [];
    } else {
      value += character;
    }
  }
  if (row.length || value) {
    row.push(value);
    if (row.some((cell) => String(cell).trim() !== "")) rows.push(row);
  }
  return rows;
}

function parseJsonRows(buffer) {
  let parsed;
  try {
    parsed = JSON.parse(buffer.toString("utf8").replace(/^\uFEFF/, ""));
  } catch {
    const error = new Error("JSON raw file is invalid.");
    error.statusCode = 400;
    throw error;
  }
  if (Array.isArray(parsed)) return parsed;
  if (Array.isArray(parsed?.rows)) return parsed.rows;
  if (Array.isArray(parsed?.data)) return parsed.data;
  const error = new Error("JSON raw file must contain an array, rows or data array.");
  error.statusCode = 400;
  throw error;
}

function headerMap(headers) {
  const normalized = headers.map(normalizeHeader);
  const map = {};
  Object.entries(FIELD_ALIASES).forEach(([field, aliases]) => {
    const aliasSet = new Set(aliases.map(normalizeHeader));
    const index = normalized.findIndex((header) => aliasSet.has(header));
    if (index >= 0) map[field] = index;
  });
  return map;
}

function parseFlexibleNumber(value) {
  if (value === null || value === undefined || String(value).trim() === "") return null;
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  let text = String(value).trim().replace(/[₫đ\s]/gi, "");
  const isPercent = text.includes("%");
  text = text.replace(/%/g, "").replace(/[^0-9,.-]/g, "");
  if (!text || !/[0-9]/.test(text)) return null;
  const comma = text.lastIndexOf(",");
  const dot = text.lastIndexOf(".");
  if (comma >= 0 && dot >= 0) {
    if (comma > dot) text = text.replace(/\./g, "").replace(",", ".");
    else text = text.replace(/,/g, "");
  } else if (comma >= 0) {
    const fraction = text.length - comma - 1;
    text = fraction <= 2 || isPercent ? text.replace(",", ".") : text.replace(/,/g, "");
  } else if (dot >= 0) {
    const fraction = text.length - dot - 1;
    if (fraction === 3 && !isPercent) text = text.replace(/\./g, "");
  }
  const number = Number(text);
  return Number.isFinite(number) ? number : null;
}

function parseDate(value) {
  if (value === null || value === undefined || String(value).trim() === "") return null;
  const text = String(value).trim();
  let match = /^(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})$/.exec(text);
  if (match) return `${match[3]}-${match[2].padStart(2, "0")}-${match[1].padStart(2, "0")}`;
  match = /^(\d{4})[\/-](\d{1,2})[\/-](\d{1,2})/.exec(text);
  if (match) return `${match[1]}-${match[2].padStart(2, "0")}-${match[3].padStart(2, "0")}`;
  const parsed = new Date(text);
  if (!Number.isNaN(parsed.getTime())) return parsed.toISOString().slice(0, 10);
  return null;
}

function valueAt(row, headers, map, field) {
  if (Array.isArray(row)) return map[field] === undefined ? null : row[map[field]];
  const key = Object.keys(row || {}).find((candidate) => normalizeHeader(candidate) === normalizeHeader(field));
  if (key) return row[key];
  const aliases = FIELD_ALIASES[field] || [];
  const aliasSet = new Set(aliases.map(normalizeHeader));
  const aliasKey = Object.keys(row || {}).find((candidate) => aliasSet.has(normalizeHeader(candidate)));
  return aliasKey ? row[aliasKey] : null;
}

function normalizeRecord(row, headers, map, context) {
  const numericFields = ["spend", "impressions", "reach", "installs", "clicks", "engagements", "openingViews", "holdViews", "registrations"];
  const record = {
    date: parseDate(valueAt(row, headers, map, "date")),
    campaign: String(valueAt(row, headers, map, "campaign") || "").trim() || null,
    adSet: String(valueAt(row, headers, map, "adSet") || "").trim() || null,
    ad: String(valueAt(row, headers, map, "ad") || "").trim() || null,
    campaignId: String(valueAt(row, headers, map, "campaignId") || "").trim() || null,
    adSetId: String(valueAt(row, headers, map, "adSetId") || "").trim() || null,
    adId: String(valueAt(row, headers, map, "adId") || "").trim() || null,
    device: String(valueAt(row, headers, map, "device") || "").trim() || null,
    objective: String(valueAt(row, headers, map, "objective") || "").trim() || null,
    platform: context.platform || null,
    account: context.account || null,
    sourceImportId: context.sourceImportId || null
  };
  numericFields.forEach((field) => { record[field] = parseFlexibleNumber(valueAt(row, headers, map, field)); });
  const suppliedHook = parseFlexibleNumber(valueAt(row, headers, map, "hookRate"));
  const suppliedHold = parseFlexibleNumber(valueAt(row, headers, map, "holdRate"));
  record.hookRate = suppliedHook ?? (record.impressions && record.openingViews !== null ? record.openingViews / record.impressions * 100 : null);
  record.holdRate = suppliedHold ?? (record.openingViews && record.holdViews !== null ? record.holdViews / record.openingViews * 100 : null);
  return record;
}

export function parseRawRecords(buffer, extension, context = {}) {
  const normalizedExtension = String(extension || "").toLowerCase();
  if ([".xlsx", ".xls"].includes(normalizedExtension)) {
    return { parserStatus: "stored_only", schema: null, headers: [], records: [], rowCount: 0 };
  }
  let rows;
  if (normalizedExtension === ".json") rows = parseJsonRows(buffer);
  else if (normalizedExtension === ".csv" || normalizedExtension === ".tsv") rows = parseDelimitedRows(buffer, normalizedExtension === ".tsv" ? "\t" : ",");
  else {
    const error = new Error("Unsupported raw parser extension.");
    error.statusCode = 400;
    throw error;
  }
  if (!rows.length) {
    const error = new Error("Raw file does not contain any data rows.");
    error.statusCode = 400;
    throw error;
  }
  const headers = Array.isArray(rows[0]) ? rows[0] : Object.keys(rows[0] || {});
  const map = headerMap(headers);
  if (map.date === undefined || (map.campaign === undefined && map.campaignId === undefined) || map.spend === undefined) {
    const error = new Error("Raw file must include date, campaign and spend columns. Expected schema: Raw_PF_FB_DAVID.");
    error.statusCode = 400;
    throw error;
  }
  const dataRows = Array.isArray(rows[0]) ? rows.slice(1) : rows;
  const records = dataRows.map((row) => normalizeRecord(row, headers, map, context)).filter((row) => row.date || row.campaign || row.campaignId);
  if (!records.length) {
    const error = new Error("Raw file has no recognizable records.");
    error.statusCode = 400;
    throw error;
  }
  return {
    parserStatus: "parsed",
    schema: map.openingViews !== undefined || map.holdViews !== undefined ? "Raw_PF_FB_DAVID" : "generic",
    headers,
    records,
    rowCount: records.length
  };
}
