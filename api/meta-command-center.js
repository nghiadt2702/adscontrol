import { decryptToken, graphRequest } from "./_lib/meta.js";
import { requireAdmin, sendError, serviceRequest } from "./_lib/supabase.js";

const INSTALL_TYPES = ["mobile_app_install", "omni_app_install"];
const REGISTRATION_TYPES = [
  "mobile_app_complete_registration",
  "app_custom_event.fb_mobile_complete_registration",
  "omni_complete_registration",
  "complete_registration",
  "offsite_conversion.fb_pixel_complete_registration"
];
const PURCHASE_TYPES = ["omni_purchase", "mobile_app_purchase", "purchase", "offsite_conversion.fb_pixel_purchase"];

function validDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value || ""));
}

function pickAction(items, preferredTypes) {
  const values = new Map((items || []).map((item) => [item.action_type, Number(item.value || 0)]));
  for (const type of preferredTypes) if (values.has(type)) return values.get(type) || 0;
  return 0;
}

async function getAuthorization(userId) {
  const rows = await serviceRequest(`/rest/v1/meta_authorizations?user_id=eq.${encodeURIComponent(userId)}&status=eq.active&select=id,encrypted_access_token`);
  return rows[0] || null;
}

async function fetchInsightRows(accountId, accessToken, from, to) {
  const fields = "account_id,account_name,campaign_id,campaign_name,date_start,date_stop,spend,impressions,clicks,actions,action_values";
  let page = await graphRequest(`${accountId}/insights`, accessToken, {
    level: "campaign",
    fields,
    time_range: JSON.stringify({ since: from, until: to }),
    time_increment: 1,
    limit: 500
  });
  const rows = [];
  while (page) {
    rows.push(...(page.data || []));
    const after = page.paging?.next && page.paging?.cursors?.after;
    page = after ? await graphRequest(`${accountId}/insights`, accessToken, {
      level: "campaign",
      fields,
      time_range: JSON.stringify({ since: from, until: to }),
      time_increment: 1,
      limit: 500,
      after
    }) : null;
  }
  return rows;
}

function normalizedRow(row, account) {
  const spend = Number(row.spend || 0);
  const installs = pickAction(row.actions, INSTALL_TYPES);
  const registrations = pickAction(row.actions, REGISTRATION_TYPES);
  const purchases = pickAction(row.actions, PURCHASE_TYPES);
  const revenue = pickAction(row.action_values, PURCHASE_TYPES);
  return {
    date: row.date_start,
    campaignId: row.campaign_id,
    name: row.campaign_name || row.campaign_id,
    platform: "Meta",
    businessId: account.business_id,
    business: account.business_name,
    accountId: account.account_id,
    account: account.account_name,
    currency: account.currency,
    spend,
    revenue,
    installs,
    registrations,
    purchases,
    impressions: Number(row.impressions || 0),
    clicks: Number(row.clicks || 0)
  };
}

function aggregateCampaigns(rows) {
  const grouped = new Map();
  for (const row of rows) {
    const key = `${row.accountId}:${row.campaignId}`;
    const current = grouped.get(key) || { ...row, spend: 0, revenue: 0, installs: 0, registrations: 0, purchases: 0, impressions: 0, clicks: 0 };
    for (const metric of ["spend", "revenue", "installs", "registrations", "purchases", "impressions", "clicks"]) current[metric] += row[metric];
    grouped.set(key, current);
  }
  return [...grouped.values()].map((row) => ({
    ...row,
    cpi: row.installs ? row.spend / row.installs : 0,
    roas: row.spend ? row.revenue / row.spend : 0,
    ctr: row.impressions ? row.clicks / row.impressions * 100 : 0,
    cvr: row.clicks ? row.installs / row.clicks * 100 : 0,
    status: "Meta live",
    trend: "up",
    market: row.account
  })).sort((a, b) => b.spend - a.spend);
}

function aggregateDaily(rows) {
  const grouped = new Map();
  for (const row of rows) {
    const current = grouped.get(row.date) || { date: row.date, spend: 0, revenue: 0, installs: 0, registrations: 0 };
    for (const metric of ["spend", "revenue", "installs", "registrations"]) current[metric] += row[metric];
    grouped.set(row.date, current);
  }
  return [...grouped.values()].sort((a, b) => a.date.localeCompare(b.date));
}

export default async function handler(request, response) {
  try {
    if (request.method !== "GET") {
      response.setHeader("Allow", "GET");
      return response.status(405).json({ error: "Method not allowed" });
    }
    const { user } = await requireAdmin(request);
    const from = request.query.from;
    const to = request.query.to;
    if (!validDate(from) || !validDate(to) || from > to) {
      throw Object.assign(new Error("Khoảng ngày Meta không hợp lệ."), { statusCode: 400 });
    }
    const dayCount = Math.floor((new Date(`${to}T00:00:00Z`) - new Date(`${from}T00:00:00Z`)) / 86400000) + 1;
    if (dayCount > 90) throw Object.assign(new Error("Mỗi lần đồng bộ Meta tối đa 90 ngày."), { statusCode: 400 });
    const authorization = await getAuthorization(user.id);
    if (!authorization) throw Object.assign(new Error("Chưa kết nối Meta hoặc phiên Meta cần xác thực lại."), { statusCode: 409 });
    let accounts = await serviceRequest(`/rest/v1/meta_ad_accounts?authorization_id=eq.${encodeURIComponent(authorization.id)}&selected=eq.true&select=account_id,account_name,business_id,business_name,currency,timezone_name`);
    if (request.query.business && request.query.business !== "all") accounts = accounts.filter((account) => account.business_id === request.query.business);
    if (request.query.account && request.query.account !== "all") accounts = accounts.filter((account) => account.account_id === request.query.account);
    if (!accounts.length) throw Object.assign(new Error("Không có tài khoản Meta trong phạm vi đã chọn."), { statusCode: 404 });

    const accessToken = decryptToken(authorization.encrypted_access_token);
    const results = await Promise.allSettled(accounts.map(async (account) => {
      const rows = await fetchInsightRows(account.account_id, accessToken, from, to);
      return rows.map((row) => normalizedRow(row, account));
    }));
    const rows = results.flatMap((result) => result.status === "fulfilled" ? result.value : []);
    const errors = results.flatMap((result, index) => result.status === "rejected" ? [{ account: accounts[index].account_name, message: result.reason?.message || "Meta API error" }] : []);
    if (!rows.length && errors.length === accounts.length) throw Object.assign(new Error(errors[0].message), { statusCode: 502 });

    const currencies = [...new Set(accounts.map((account) => account.currency))];
    response.setHeader("Cache-Control", "no-store");
    return response.status(200).json({
      source: "meta",
      from,
      to,
      currency: currencies.length === 1 ? currencies[0] : "MIXED",
      accounts: accounts.map((account) => ({ id: account.account_id, name: account.account_name, businessId: account.business_id, businessName: account.business_name, currency: account.currency, timezone: account.timezone_name })),
      campaigns: aggregateCampaigns(rows),
      daily: aggregateDaily(rows),
      partialErrors: errors,
      syncedAt: new Date().toISOString()
    });
  } catch (error) {
    sendError(response, error);
  }
}
