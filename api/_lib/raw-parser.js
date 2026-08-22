const FIELD_ALIASES = {
  date: ["ngay", "date", "day"],
  campaign: ["ten chien dich", "campaign", "campaign name", "campaign_name"],
  adSet: ["ten nhom qc", "ad set", "adset", "ad set name", "adset name"],
  ad: ["ten quang cao", "ad", "ad name", "creative"],
  campaignId: ["campaign id", "campaign_id"],
  adSetId: ["ad set id", "adset id", "ad_set_id"],
  adId: ["ad id", "ad_id"],
  device: ["thiet bi hien thi", "he dieu hanh", "nen tang", "device", "operating system", "os", "placement device"],
  objective: ["muc tieu", "objective", "campaign objective"],
  age: ["do tuoi", "age", "age range", "age group", "age_group"],
  gender: ["gioi tinh", "gender", "sex"],
  country: ["quoc gia", "country", "country code", "geo", "country region"],
  region: ["khu vuc", "region", "city", "province", "dma", "region name"],
  spend: ["chi phi vnd", "chi phi", "spend", "cost", "amount spent"],
  impressions: ["luot hien thi", "lan hien thi", "impressions", "impr"],
  reach: ["nguoi tiep can", "reach"],
  installs: ["luot cai dat ung dung", "luot cai dat", "installs", "app installs", "mobile app installs"],
  clicks: ["luot click lien ket", "luot nhap", "clicks", "link clicks", "link_clicks"],
  engagements: ["luot tuong tac", "engagements", "post engagements"],
  openingViews: ["luot phat video trong toi thieu 3 giay", "luot xem video 6 giay", "3 second video views", "3-second video views", "6 second video views", "video views 3s", "video views 6s"],
  holdViews: ["luot phat 50 thoi luong video", "luot xem 50 thoi luong video", "50 video views", "50 percent video views", "video views 50"],
  registrations: ["luot dang ky", "registrations", "in app registrations", "in-app registrations"],
  hookRate: ["hook rate", "hookrate", "hook rate tam dung"],
  holdRate: ["hold rate", "holdrate", "hold rate giu chan"]
};

const PLATFORM_SCHEMAS = {
  meta: "Raw_PF_FB_DAVID",
  tiktok: "Raw_PF_TT_DAVID",
  google: "Raw_PF_GG_DAVID"
};

const INTEGER_COUNT_FIELDS = new Set([
  "impressions", "reach", "clicks", "engagements", "openingViews", "holdViews"
]);

function addQualityIssue(quality, code, message) {
  if (!quality) return;
  const current = quality.issues.get(code) || { code, message, count: 0 };
  current.count += 1;
  quality.issues.set(code, current);
}

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

function parseMetricNumber(value, field, quality) {
  const text = String(value ?? "").trim().replace(/[₫đ\s]/gi, "");
  if (INTEGER_COUNT_FIELDS.has(field) && /^-?\d+\.\d{1,2}$/.test(text)) {
    const [whole, fraction] = text.split(".");
    addQualityIssue(quality, "collapsed_thousands", "Một số count có dấu hàng nghìn bị rút gọn; hệ thống đã chuẩn hóa theo định dạng báo cáo Việt Nam.");
    return Number(`${whole}${fraction.padEnd(3, "0")}`);
  }
  return parseFlexibleNumber(value);
}

function normalizeIdentifier(value, quality) {
  const text = String(value ?? "").trim();
  if (!text) return null;
  if (/^[+-]?(?:\d+(?:\.\d+)?|\.\d+)[eE][+-]?\d+$/.test(text)) {
    addQualityIssue(quality, "scientific_identifier", "ID dạng khoa học đã mất độ chính xác; hệ thống dùng tên entity làm khóa thay thế.");
    return null;
  }
  if (/^\d{16,}$/.test(text)) {
    addQualityIssue(quality, "long_numeric_identifier", "ID dài dạng số có rủi ro bị làm tròn; hệ thống dùng tên entity làm khóa thay thế.");
    return null;
  }
  return text;
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

function textValue(value) {
  const text = String(value ?? "").trim();
  return text || null;
}

function rawRecord(row, headers) {
  if (!Array.isArray(row)) return row && typeof row === "object" ? row : {};
  return Object.fromEntries(headers.map((header, index) => [String(header), row[index] ?? ""]));
}

function normalizeRecord(row, headers, map, context, quality) {
  const numericFields = ["spend", "impressions", "reach", "installs", "clicks", "engagements", "openingViews", "holdViews", "registrations"];
  const record = {
    date: parseDate(valueAt(row, headers, map, "date")),
    campaign: String(valueAt(row, headers, map, "campaign") || "").trim() || null,
    adSet: String(valueAt(row, headers, map, "adSet") || "").trim() || null,
    ad: String(valueAt(row, headers, map, "ad") || "").trim() || null,
    campaignId: normalizeIdentifier(valueAt(row, headers, map, "campaignId"), quality),
    adSetId: normalizeIdentifier(valueAt(row, headers, map, "adSetId"), quality),
    adId: normalizeIdentifier(valueAt(row, headers, map, "adId"), quality),
    device: textValue(valueAt(row, headers, map, "device")),
    objective: textValue(valueAt(row, headers, map, "objective")),
    age: textValue(valueAt(row, headers, map, "age")),
    gender: textValue(valueAt(row, headers, map, "gender")),
    country: textValue(valueAt(row, headers, map, "country")),
    region: textValue(valueAt(row, headers, map, "region")),
    platform: context.platform || null,
    account: context.account || null,
    sourceImportId: context.sourceImportId || null,
    rawJson: rawRecord(row, headers)
  };
  numericFields.forEach((field) => { record[field] = parseMetricNumber(valueAt(row, headers, map, field), field, quality); });
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
  const arrayRows = Array.isArray(rows[0]);
  let headerRowIndex = 0;
  if (arrayRows) {
    const candidateIndex = rows.slice(0, 10).findIndex((candidate) => {
      const candidateMap = headerMap(candidate);
      return candidateMap.date !== undefined
        && (candidateMap.campaign !== undefined || candidateMap.campaignId !== undefined)
        && candidateMap.spend !== undefined;
    });
    if (candidateIndex >= 0) headerRowIndex = candidateIndex;
  }
  const headers = arrayRows ? rows[headerRowIndex] : Object.keys(rows[0] || {});
  const map = headerMap(headers);
  if (map.date === undefined || (map.campaign === undefined && map.campaignId === undefined) || map.spend === undefined) {
    const error = new Error("Raw file must include date, campaign and spend columns. Expected schema: Raw_PF_FB_DAVID.");
    error.statusCode = 400;
    throw error;
  }
  const dataRows = arrayRows ? rows.slice(headerRowIndex + 1) : rows;
  const quality = { issues: new Map() };
  const records = dataRows.map((row) => normalizeRecord(row, headers, map, context, quality)).filter((row) => row.date || row.campaign || row.campaignId);
  if (!records.length) {
    const error = new Error("Raw file has no recognizable records.");
    error.statusCode = 400;
    throw error;
  }
  return {
    parserStatus: "parsed",
    schema: PLATFORM_SCHEMAS[String(context.platform || "").toLowerCase()]
      || (map.openingViews !== undefined || map.holdViews !== undefined ? "Raw_PF_FB_DAVID" : "generic"),
    headers,
    records,
    rowCount: records.length,
    quality: { status: quality.issues.size ? "warning" : "ready", warnings: [...quality.issues.values()] }
  };
}
