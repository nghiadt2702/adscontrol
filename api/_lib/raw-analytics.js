import { listRawImports, readRawImportRecords } from "./raw-storage.js";

const PLATFORMS = ["Meta", "Google", "TikTok", "AppsFlyer"];
const METRICS = ["spend", "impressions", "reach", "installs", "clicks", "engagements", "openingViews", "holdViews", "registrations"];

function canonicalPlatform(value) {
  const normalized = String(value || "").trim().toLowerCase();
  return normalized === "meta" ? "Meta" : normalized === "google" ? "Google" : normalized === "tiktok" ? "TikTok" : "AppsFlyer";
}

function hasValue(value) {
  return value !== null && value !== undefined && value !== "" && Number.isFinite(Number(value));
}

function sumMetric(rows, metric) {
  const values = rows.filter((row) => hasValue(row[metric])).map((row) => Number(row[metric]));
  return values.length ? values.reduce((sum, value) => sum + value, 0) : null;
}

function ratio(numerator, denominator) {
  return numerator !== null && denominator !== null && Number(denominator) > 0 ? Number(numerator) / Number(denominator) * 100 : null;
}

function toDateKey(value) {
  const text = String(value || "").slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(text) ? text : null;
}

function inRange(date, from, to) {
  const key = toDateKey(date);
  return Boolean(key && (!from || key >= from) && (!to || key <= to));
}

function rowKey(row) {
  return [row.date, row.platform, row.account, row.campaignId || row.campaign, row.adSetId || row.adSet, row.adId || row.ad, row.device].map((value) => String(value || "").trim()).join("|");
}

function aggregateRows(rows, keyField, fallbackPrefix = "row") {
  const grouped = new Map();
  rows.forEach((row) => {
    const key = String(row[keyField] || `${fallbackPrefix}:${row.date || "unknown"}:${row.campaign || "unknown"}`);
    const current = grouped.get(key) || [];
    current.push(row);
    grouped.set(key, current);
  });
  return [...grouped.entries()].map(([key, group]) => {
    const first = group[0] || {};
    const record = {
      key,
      campaignKey: key,
      campaignId: first.campaignId || null,
      accountId: first.account || null,
      account: first.account || null,
      businessId: first.account || null,
      business: first.account || "Raw import",
      name: first.campaign || first.campaignId || "Campaign chưa đặt tên",
      campaignName: first.campaign || first.campaignId || "Campaign chưa đặt tên",
      platform: canonicalPlatform(first.platform),
      currency: "VND",
      source: "Raw_PF_FB_DAVID",
      status: null,
      statusAvailable: false,
      revenue: null,
      revenueAvailable: false,
      purchases: null,
      purchasesAvailable: false
    };
    METRICS.forEach((metric) => { record[metric] = sumMetric(group, metric); record[`${metric}Available`] = record[metric] !== null; });
    record.ctr = ratio(record.clicks, record.impressions);
    record.cvr = ratio(record.registrations, record.impressions);
    record.hookRate = ratio(record.openingViews, record.impressions);
    record.holdRate = ratio(record.holdViews, record.openingViews);
    record.hookRateAvailable = record.hookRate !== null;
    record.holdRateAvailable = record.holdRate !== null;
    record.cpi = record.spend !== null && record.installs !== null && record.installs > 0 ? record.spend / record.installs : null;
    record.cpr = record.spend !== null && record.registrations !== null && record.registrations > 0 ? record.spend / record.registrations : null;
    record.roas = null;
    return record;
  });
}

function dailyRows(rows) {
  const keyed = rows.map((row) => ({ ...row, dayKey: row.date }));
  return aggregateRows(keyed, "dayKey", "day").map((row) => ({
    ...row,
    date: row.key,
    campaignKey: undefined,
    key: row.key,
    name: undefined,
    campaignName: undefined
  }));
}

function deviceBreakdown(rows) {
  const withDevice = rows.filter((row) => row.device);
  return aggregateRows(
    withDevice.map((row) => ({ ...row, deviceKey: `${row.platform}:${row.device}` })),
    "deviceKey",
    "device"
  ).map((row) => ({
      dimension: "device",
      value: row.key.split(":").slice(1).join(":") || row.key,
      label: row.key.split(":").slice(1).join(":") || row.key,
      platform: row.platform,
      spend: row.spend,
      impressions: row.impressions,
      clicks: row.clicks,
      installs: row.installs,
      registrations: row.registrations,
      source: "Raw_PF_FB_DAVID"
    }));
}

export async function getRawAnalytics({ from = null, to = null, platform = "all", account = "all" } = {}) {
  const manifests = (await listRawImports(500)).filter((record) => record.parserStatus === "parsed" && record.recordsStorageKey);
  const selectedPlatform = platform === "all" ? null : canonicalPlatform(platform);
  const selectedAccount = account && account !== "all" ? String(account) : null;
  const selectedManifests = manifests.filter((record) => {
    const recordPlatform = canonicalPlatform(record.platform);
    return (!selectedPlatform || recordPlatform === selectedPlatform) && (!selectedAccount || String(record.account || "") === selectedAccount);
  });

  const rawRows = [];
  for (const manifest of selectedManifests) {
    const records = await readRawImportRecords(manifest);
    records.forEach((record) => rawRows.push({ ...record, platform: canonicalPlatform(record.platform || manifest.platform), account: record.account || manifest.account || null }));
  }

  // The newest import wins across uploads, but every matching row inside that
  // import must remain. Different ads can share names after spreadsheet IDs
  // lose precision, so collapsing to one row would silently drop real spend.
  const newestImportByRow = new Map();
  const rows = rawRows.filter((row) => {
    if (!inRange(row.date, from, to)) return false;
    const key = rowKey(row);
    const sourceImportId = row.sourceImportId || "legacy";
    if (!newestImportByRow.has(key)) newestImportByRow.set(key, sourceImportId);
    return newestImportByRow.get(key) === sourceImportId;
  });
  const groupedCampaignRows = rows.map((row) => ({ ...row, campaignKey: `${row.platform}:${row.account || ""}:${row.campaignId || row.campaign || "unknown"}` }));
  const groupedCampaigns = aggregateRows(groupedCampaignRows, "campaignKey", "campaign").map((row) => ({ ...row, campaignKey: row.key, key: row.key }));
  const daily = dailyRows(rows);
  const importedPlatforms = [...new Set(rows.map((row) => row.platform))];
  const sourceStates = Object.fromEntries(PLATFORMS.map((name) => [name, importedPlatforms.includes(name) ? "connected" : "unavailable"]));
  const accounts = [...new Map(rows.filter((row) => row.account).map((row) => [`${row.platform}:${row.account}`, { id: row.account, name: row.account, accountId: row.account, platform: row.platform }])).values()];
  const latestImport = selectedManifests[0] || null;
  const sourceAvailability = Object.fromEntries(PLATFORMS.map((name) => [name, { revenue: false, raw: importedPlatforms.includes(name) }]));
  return {
    dataMode: "raw",
    source: "Raw_PF_FB_DAVID",
    currency: "VND",
    range: { from, to },
    syncedAt: latestImport?.uploadedAt || null,
    imports: selectedManifests.map((record) => ({ id: record.id, originalName: record.originalName, platform: record.platform, account: record.account, uploadedAt: record.uploadedAt, rowCount: record.rowCount })),
    sourceStates,
    sourceAvailability,
    accounts,
    campaigns: groupedCampaigns,
    ads: groupedCampaigns,
    daily,
    breakdowns: { age: [], gender: [], country: [], region: [], device: deviceBreakdown(rows) },
    strategyDaily: [],
    alerts: [],
    alertsAvailable: false,
    partialErrors: [],
    breakdownErrors: [],
    revenueAvailable: false,
    purchasesAvailable: false,
    schema: "Raw_PF_FB_DAVID"
  };
}
