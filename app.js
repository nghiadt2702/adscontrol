const data = {
  metrics: {
    all: [
      ["Total spend", "$42,640", "↑ 8.4%", "so với hôm qua", "up", "$"],
      ["Revenue", "$96,280", "↑ 12.1%", "so với hôm qua", "up", "↗"],
      ["Installs", "18,420", "↑ 6.8%", "so với hôm qua", "up", "↓"],
      ["Blended CPI", "$2.31", "↓ 4.2%", "hiệu quả hơn", "up", "◎"],
      ["ROAS D7", "2.26x", "↑ 0.18", "trên target 2.0x", "up", "⌁"]
    ],
    meta: [
      ["Meta spend", "$21,746", "↑ 7.1%", "so với hôm qua", "up", "$"],
      ["Revenue", "$51,940", "↑ 13.5%", "so với hôm qua", "up", "↗"],
      ["Installs", "9,810", "↑ 8.1%", "so với hôm qua", "up", "↓"],
      ["CPI", "$2.22", "↓ 5.4%", "hiệu quả hơn", "up", "◎"],
      ["ROAS D7", "2.39x", "↑ 0.21", "trên target", "up", "⌁"]
    ],
    google: [
      ["Google spend", "$13,218", "↑ 4.3%", "so với hôm qua", "up", "$"],
      ["Revenue", "$30,810", "↑ 8.2%", "so với hôm qua", "up", "↗"],
      ["Installs", "5,490", "↑ 3.7%", "so với hôm qua", "up", "↓"],
      ["CPI", "$2.41", "↑ 1.8%", "cần theo dõi", "down", "◎"],
      ["ROAS D7", "2.33x", "↑ 0.09", "trên target", "up", "⌁"]
    ],
    tiktok: [
      ["TikTok spend", "$7,676", "↑ 15.2%", "so với hôm qua", "up", "$"],
      ["Revenue", "$13,530", "↑ 10.7%", "so với hôm qua", "up", "↗"],
      ["Installs", "3,120", "↑ 9.9%", "so với hôm qua", "up", "↓"],
      ["CPI", "$2.46", "↑ 4.6%", "cần tối ưu", "down", "◎"],
      ["ROAS D7", "1.76x", "↓ 0.12", "dưới target", "down", "⌁"]
    ]
  },
  campaigns: [
    { name: "VN · iOS · Purchase · Scale 04", market: "Vietnam", platform: "Meta", owner: "Minh Anh", spend: "$8,420", installs: "4,180", cpi: "$2.01", roas: "3.12x", status: "Scaling", trend: "up" },
    { name: "US · Android · tROAS · Broad", market: "United States", platform: "Google", owner: "Quang Huy", spend: "$12,180", installs: "3,940", cpi: "$3.09", roas: "2.47x", status: "Scaling", trend: "up" },
    { name: "TH · iOS · Creative Test 12", market: "Thailand", platform: "TikTok", owner: "Linh Chi", spend: "$4,760", installs: "2,210", cpi: "$2.15", roas: "1.88x", status: "Watch", trend: "down" },
    { name: "BR · Android · Retarget 07", market: "Brazil", platform: "Meta", owner: "Minh Anh", spend: "$5,940", installs: "1,620", cpi: "$3.67", roas: "1.42x", status: "At risk", trend: "down" },
    { name: "JP · iOS · Value · Core 02", market: "Japan", platform: "Google", owner: "Tú Uyên", spend: "$7,630", installs: "2,340", cpi: "$3.26", roas: "2.18x", status: "Watch", trend: "up" },
    { name: "ID · Android · UGC Batch 06", market: "Indonesia", platform: "TikTok", owner: "Linh Chi", spend: "$3,710", installs: "2,060", cpi: "$1.80", roas: "2.05x", status: "Scaling", trend: "up" }
  ],
  accounts: [
    { name: "Northstar · Meta Global", id: "act_7392…0184", platform: "Meta", currency: "USD", owner: "Minh Anh", sync: "2 phút trước", status: "Sẵn sàng" },
    { name: "Northstar · Google Apps", id: "cid_284-150-5227", platform: "Google", currency: "USD", owner: "Quang Huy", sync: "5 phút trước", status: "Sẵn sàng" },
    { name: "Northstar · TikTok SEA", id: "adv_9015…6602", platform: "TikTok", currency: "USD", owner: "Linh Chi", sync: "8 phút trước", status: "Sẵn sàng" },
    { name: "Atlas · Meta LATAM", id: "act_5528…1934", platform: "Meta", currency: "BRL", owner: "Minh Anh", sync: "36 phút trước", status: "Cần xử lý" },
    { name: "Orbit · Google Japan", id: "cid_660-285-1004", platform: "Google", currency: "JPY", owner: "Tú Uyên", sync: "12 phút trước", status: "Đang đồng bộ" },
    { name: "Orbit · TikTok APAC", id: "adv_7461…0029", platform: "TikTok", currency: "THB", owner: "Linh Chi", sync: "11 phút trước", status: "Sẵn sàng" }
  ],
  creatives: [
    { title: "ugc_hook_reward_v12.mp4", label: "META · VIDEO · 9:16", copy: "Build your city. Own the map.", score: 92, hook: 96, ctr: 91, fatigue: 18, health: "Winner" },
    { title: "gameplay_merge_v08.mp4", label: "TIKTOK · VIDEO · 9:16", copy: "Can you beat level 20?", score: 84, hook: 89, ctr: 82, fatigue: 41, health: "Healthy" },
    { title: "store_event_pack_07.jpg", label: "GOOGLE · IMAGE · 1:1", copy: "A limited summer pack.", score: 67, hook: 73, ctr: 64, fatigue: 78, health: "Fatigue" }
  ],
  alerts: [
    { level: "critical", icon: "!", title: "CPI vượt guardrail 38%", subtitle: "BR · Android · Retarget 07", owner: "Minh Anh", metric: "$3.67", target: "$2.65", risk: "$1,420", status: "Cần xử lý" },
    { level: "watch", icon: "↗", title: "Frequency tăng 0.8 trong 24h", subtitle: "TH · iOS · Creative Test 12", owner: "Linh Chi", metric: "4.2", target: "< 3.5", risk: "$760", status: "Theo dõi" },
    { level: "good", icon: "↗", title: "Cơ hội scale ngân sách +20%", subtitle: "VN · iOS · Purchase · Scale 04", owner: "Minh Anh", metric: "3.12x", target: "> 2.0x", risk: "+$2.1K", status: "Cơ hội" }
  ],
  appsflyer: {
    daily: [
      { date:"20/07", cost:15741172, installs:580, registrations:156 },
      { date:"21/07", cost:8782824, installs:314, registrations:73 },
      { date:"22/07", cost:11980593, installs:463, registrations:116 },
      { date:"23/07", cost:9011634, installs:468, registrations:139 },
      { date:"24/07", cost:11256971, installs:644, registrations:210 },
      { date:"25/07", cost:12404252, installs:558, registrations:182 },
      { date:"26/07", cost:13794846, installs:623, registrations:191 },
      { date:"27/07", cost:14281158, installs:633, registrations:197 },
      { date:"28/07", cost:14965231, installs:697, registrations:217 }
    ],
    retention: [
      { day:"D1", paid:27.21, organic:16.58 },
      { day:"D3", paid:9.94, organic:6.68 },
      { day:"D7", paid:1.20, organic:2.67 },
      { day:"D30", paid:0, organic:0 }
    ],
    comparison: [
      { metric:"Cost", current:82972292, previous:132639035, format:"money", delta:-37.45 },
      { metric:"Total installs", current:4497, previous:7893, format:"number", delta:-43.03 },
      { metric:"Registrations", current:1276, previous:2557, format:"number", delta:-50.10 },
      { metric:"CPI", current:18451, previous:16805, format:"money", delta:9.79 },
      { metric:"CPA", current:65025, previous:51873, format:"money", delta:25.36 },
      { metric:"CVR", current:28.37, previous:32.40, format:"percent", delta:-12.41 },
      { metric:"Organic installs", current:847, previous:1811, format:"number", delta:-53.23 }
    ],
    breakdown: [
      { platform:"Facebook", os:"Android", cost:40514701, installs:1634, registrations:546, cpi:24795, cpa:74203, cvr:33.41, share:36.10, rating:"Tốt" },
      { platform:"Facebook", os:"iOS", cost:8887625, installs:296, registrations:126, cpi:30026, cpa:70537, cvr:42.57, share:7.92, rating:"Tốt" },
      { platform:"Google", os:"Android", cost:38253043, installs:2338, registrations:581, cpi:16361, cpa:65840, cvr:24.85, share:34.09, rating:"Khá" },
      { platform:"Google", os:"iOS", cost:16402957, installs:375, registrations:157, cpi:43741, cpa:104477, cvr:41.87, share:14.62, rating:"Tốt" },
      { platform:"Tiktok", os:"Android", cost:5843055, installs:270, registrations:53, cpi:21641, cpa:110246, cvr:19.63, share:5.21, rating:"Cần tối ưu" },
      { platform:"Tiktok", os:"iOS", cost:2317300, installs:67, registrations:18, cpi:34587, cpa:128739, cvr:26.87, share:2.06, rating:"Khá" }
    ]
  }
};

const platformClass = (platform) => platform.toLowerCase();
const platformDot = (platform) => `<i class="dot ${platformClass(platform)}-bg"></i>`;
const statusPill = (status) => {
  const style = status === "Scaling" || status === "Sẵn sàng" || status === "Cơ hội" ? "green" : status === "At risk" || status === "Cần xử lý" ? "red" : "amber";
  return `<span class="pill ${style}">${status}</span>`;
};

function renderMetrics(platform = "all") {
  document.querySelector("#metric-grid").innerHTML = data.metrics[platform].map(([label,value,delta,note,tone,icon]) => `
    <article class="metric">
      <div class="metric-top"><span class="metric-label">${label}</span><span class="metric-icon">${icon}</span></div>
      <strong>${value}</strong>
      <small><span class="delta ${tone}">${delta}</span>${note}</small>
    </article>`).join("");
}

function renderChart() {
  const labels = ["22 Jul","23 Jul","24 Jul","25 Jul","26 Jul","27 Jul","28 Jul"];
  const revenue = [44,61,58,73,68,86,94], spend = [35,40,44,48,45,54,59];
  const points = (values) => values.map((v,i) => `${54+i*95},${205-v*1.65}`).join(" ");
  const area = `M ${points(revenue).replaceAll(" ", " L ")} L 624,216 L 54,216 Z`;
  document.querySelector("#performance-chart").innerHTML = `
    <svg viewBox="0 0 680 245" role="img" aria-label="Biểu đồ Spend và Revenue 7 ngày">
      <defs><linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7668f3" stop-opacity=".22"/><stop offset="1" stop-color="#7668f3" stop-opacity="0"/></linearGradient></defs>
      ${[40,90,140,190].map(y=>`<line class="grid-line" x1="42" y1="${y}" x2="640" y2="${y}"/>`).join("")}
      <path class="revenue-area" d="${area}"/>
      <polyline class="revenue-path" points="${points(revenue)}"/>
      <polyline class="spend-path" points="${points(spend)}"/>
      ${labels.map((label,i)=>`<text class="axis-text" x="${54+i*95}" y="235" text-anchor="middle">${label}</text>`).join("")}
    </svg>`;
}

function campaignRow(campaign, withOwner = false) {
  return `<tr data-search="${`${campaign.name} ${campaign.market} ${campaign.owner}`.toLowerCase()}" data-status="${campaign.status}">
    <td class="campaign-name"><strong>${campaign.name}</strong><small>${campaign.market}</small></td>
    <td><span class="platform-badge">${platformDot(campaign.platform)}${campaign.platform}</span></td>
    ${withOwner ? `<td>${campaign.owner}</td>` : ""}
    <td><strong>${campaign.spend}</strong></td><td>${campaign.installs}</td><td>${campaign.cpi}</td><td><strong>${campaign.roas}</strong></td>
    ${withOwner ? "" : `<td><svg class="sparkline ${campaign.trend === "down" ? "down" : ""}" viewBox="0 0 64 21"><path d="${campaign.trend === "up" ? "M1 18L13 14L24 15L36 7L48 9L63 2" : "M1 4L13 7L24 6L36 13L48 11L63 18"}"/></svg></td>`}
    <td>${statusPill(campaign.status)}</td></tr>`;
}

function renderCampaigns() {
  document.querySelector("#campaign-preview").innerHTML = data.campaigns.slice(0,4).map(c => campaignRow(c)).join("");
  document.querySelector("#campaign-table").innerHTML = data.campaigns.map(c => campaignRow(c,true)).join("");
  filterCampaigns();
}

function renderQueue() {
  document.querySelector("#action-queue").innerHTML = data.alerts.map(a=>`
    <div class="queue-item"><strong>${a.subtitle}</strong><p>${a.title}</p><span class="amount">${a.risk}</span></div>`).join("");
}

function renderAccounts() {
  const metrics = [["Tổng account","24","▦"],["Đang sync","22","↻"],["Cần xử lý","2","△"],["Business","4","⌂"]];
  document.querySelector("#account-metrics").innerHTML = metrics.map(([l,v,i])=>`<article class="metric"><div class="metric-top"><span class="metric-label">${l}</span><span class="metric-icon">${i}</span></div><strong>${v}</strong><small>trong workspace hiện tại</small></article>`).join("");
  document.querySelector("#account-grid").innerHTML = data.accounts.map(a=>`
    <article class="card account-card">
      <div class="account-head"><span class="account-logo ${platformClass(a.platform)}">${a.platform[0]}</span>${statusPill(a.status)}</div>
      <h3>${a.name}</h3><p>${a.id}</p>
      <div class="account-meta"><div><small>Platform</small><strong>${a.platform}</strong></div><div><small>Currency</small><strong>${a.currency}</strong></div><div><small>Owner</small><strong>${a.owner}</strong></div><div><small>Last sync</small><strong>${a.sync}</strong></div></div>
    </article>`).join("");
}

function renderCreatives() {
  document.querySelector("#creative-grid").innerHTML = data.creatives.map(c=>`
    <article class="card creative-card">
      <div class="creative-preview"><strong>${c.copy}</strong></div>
      <div class="creative-body">
        <div class="creative-title"><div><h3>${c.title}</h3><p>${c.label}</p></div><span class="score">${c.score}</span></div>
        <div class="progress-row"><span>Hook 3 giây</span><div class="progress"><i style="width:${c.hook}%"></i></div><b>${c.hook}</b></div>
        <div class="progress-row"><span>CTR benchmark</span><div class="progress"><i style="width:${c.ctr}%"></i></div><b>${c.ctr}</b></div>
        <div class="progress-row"><span>Fatigue</span><div class="progress"><i style="width:${c.fatigue}%;background:${c.fatigue>60?"#d4555d":"#d39a39"}"></i></div><b>${c.fatigue}</b></div>
      </div>
    </article>`).join("");
}

function renderAlerts() {
  document.querySelector("#alert-list").innerHTML = data.alerts.map(a=>`
    <article class="card alert-card">
      <span class="alert-severity ${a.level}">${a.icon}</span>
      <div><h3>${a.title}</h3><p>${a.subtitle}</p></div>
      <div class="alert-stat"><small>Owner</small><strong>${a.owner}</strong></div>
      <div class="alert-stat"><small>Hiện tại / target</small><strong>${a.metric} / ${a.target}</strong></div>
      <div class="alert-stat"><small>Impact</small><strong>${a.risk}</strong></div>
      ${statusPill(a.status)}
    </article>`).join("");
}

const formatVnd = (value) => `${Math.round(value).toLocaleString("vi-VN")} ₫`;
const formatAfValue = (value, format) => format === "money" ? formatVnd(value) : format === "percent" ? `${value.toLocaleString("vi-VN", {maximumFractionDigits:2})}%` : Math.round(value).toLocaleString("vi-VN");

function getAppsFlyerSelection() {
  const platform = document.querySelector("#af-platform")?.value || "all";
  const os = document.querySelector("#af-os")?.value || "all";
  const ua = document.querySelector("#af-ua")?.value || "all";
  const factor = { all:1, minh:.38, huy:.34, chi:.28 }[ua] || 1;
  const rows = data.appsflyer.breakdown.filter(row =>
    (platform === "all" || row.platform === platform) &&
    (os === "all" || row.os === os)
  );
  return { platform, os, ua, factor, rows };
}

function renderAppsFlyer() {
  const selection = getAppsFlyerSelection();
  const sourceRows = selection.rows.length ? selection.rows : data.appsflyer.breakdown;
  const cost = sourceRows.reduce((sum,row)=>sum + row.cost, 0) * selection.factor;
  const basePaidInstalls = sourceRows.reduce((sum,row)=>sum + row.installs, 0);
  const paidInstalls = basePaidInstalls * selection.factor;
  const registrations = sourceRows.reduce((sum,row)=>sum + row.registrations, 0) * selection.factor;
  const isAll = selection.platform === "all" && selection.os === "all";
  const organicInstalls = (isAll ? 1122 : basePaidInstalls * .22) * selection.factor;
  const totalInstalls = paidInstalls + organicInstalls;
  const metrics = [
    ["Total cost", formatVnd(cost), "−37,45%", "so với P‑1", "down", "₫"],
    ["Paid installs", Math.round(paidInstalls).toLocaleString("vi-VN"), "4.980 all source", "AppsFlyer non-organic", "neutral", "↓"],
    ["Registrations", Math.round(registrations).toLocaleString("vi-VN"), `${paidInstalls ? (registrations/paidInstalls*100).toLocaleString("vi-VN",{maximumFractionDigits:2}) : 0}%`, "CVR install → register", "up", "◎"],
    ["CPI", formatVnd(paidInstalls ? cost/paidInstalls : 0), "+9,79%", "so với P‑1", "down", "↘"],
    ["CPA", formatVnd(registrations ? cost/registrations : 0), "+25,36%", "so với P‑1", "down", "⌁"],
    ["Total installs", Math.round(totalInstalls).toLocaleString("vi-VN"), `${Math.round(organicInstalls).toLocaleString("vi-VN")} organic`, "paid + organic", "neutral", "Σ"]
  ];

  document.querySelector("#af-metrics").innerHTML = metrics.map(([label,value,delta,note,tone,icon])=>`
    <article class="metric af-metric">
      <div class="metric-top"><span class="metric-label">${label}</span><span class="metric-icon">${icon}</span></div>
      <strong>${value}</strong>
      <small><span class="delta ${tone}">${delta}</span>${note}</small>
    </article>`).join("");

  const daily = data.appsflyer.daily.map(day=>({
    ...day,
    cost: day.cost * selection.factor,
    installs: day.installs * selection.factor
  }));
  const maxCost = Math.max(...daily.map(day=>day.cost));
  const maxInstalls = Math.max(...daily.map(day=>day.installs));
  document.querySelector("#af-daily-chart").innerHTML = daily.map(day=>`
    <div class="af-day">
      <div class="af-day-bars" title="${day.date}: ${formatVnd(day.cost)} · ${Math.round(day.installs)} installs">
        <span class="af-cost-bar" style="height:${Math.max(8,day.cost/maxCost*100)}%"></span>
        <span class="af-install-bar" style="height:${Math.max(8,day.installs/maxInstalls*100)}%"></span>
      </div>
      <strong>${Math.round(day.installs)}</strong>
      <small>${day.date}</small>
    </div>`).join("");

  document.querySelector("#af-retention").innerHTML = data.appsflyer.retention.map(item=>`
    <div class="retention-row">
      <strong>${item.day}</strong>
      <div class="retention-track">
        <span class="retention-paid" style="width:${Math.min(100,item.paid*2.6)}%"></span>
        <span class="retention-organic" style="width:${Math.min(100,item.organic*2.6)}%"></span>
      </div>
      <div><b>${item.paid.toLocaleString("vi-VN")}%</b><small>${item.organic.toLocaleString("vi-VN")}%</small></div>
    </div>`).join("");

  document.querySelector("#af-comparison").innerHTML = data.appsflyer.comparison.map(item=>`
    <div class="comparison-item">
      <span>${item.metric}</span>
      <strong>${formatAfValue(item.current,item.format)}</strong>
      <small>P‑1: ${formatAfValue(item.previous,item.format)}</small>
      <b class="${item.delta > 0 ? "negative" : "positive"}">${item.delta > 0 ? "↑" : "↓"} ${Math.abs(item.delta).toLocaleString("vi-VN")}%</b>
    </div>`).join("");

  const scaledRows = selection.rows.map(row=>({
    ...row,
    cost: row.cost * selection.factor,
    installs: row.installs * selection.factor,
    registrations: row.registrations * selection.factor
  }));
  document.querySelector("#af-row-count").textContent = `${scaledRows.length} tổ hợp`;
  document.querySelector("#af-breakdown-table").innerHTML = scaledRows.map(row=>`
    <tr>
      <td><span class="af-platform"><i class="${row.platform.toLowerCase()}"></i>${row.platform}</span></td>
      <td><span class="os-badge ${row.os.toLowerCase()}">${row.os}</span></td>
      <td><strong>${formatVnd(row.cost)}</strong></td>
      <td>${Math.round(row.installs).toLocaleString("vi-VN")}</td>
      <td>${Math.round(row.registrations).toLocaleString("vi-VN")}</td>
      <td>${formatVnd(row.cpi)}</td>
      <td>${formatVnd(row.cpa)}</td>
      <td><strong>${row.cvr.toLocaleString("vi-VN")}%</strong></td>
      <td>${row.share.toLocaleString("vi-VN")}%</td>
      <td><span class="quality ${row.rating === "Tốt" ? "good" : row.rating === "Khá" ? "fair" : "risk"}">${row.rating}</span></td>
    </tr>`).join("");
}

const integrationDefinitions = {
  meta: { name:"Meta Ads", logo:"M", description:"Campaign, ad set, ads, insights và creative từ Meta Marketing API.", scopes:["Đọc account & campaign","Đồng bộ insights hằng giờ","Write action qua approval"] },
  google: { name:"Google Ads", logo:"G", description:"App Campaigns, asset groups, conversion và performance từ Google Ads API.", scopes:["Manager & client accounts","GAQL performance sync","Budget action qua approval"] },
  tiktok: { name:"TikTok Ads", logo:"T", description:"Advertiser, campaign, ad group, ads và reporting từ TikTok Marketing API.", scopes:["Advertiser accounts","Integrated reporting","Creative performance"] },
  appsflyer: { name:"AppsFlyer", logo:"AF", description:"Install, in-app event, organic source và cohort retention từ AppsFlyer Pull API.", scopes:["Paid + organic acquisition","D1 · D3 · D7 · D30 retention","Backfill cohort định kỳ"] }
};

async function renderIntegrations() {
  let statuses = ["meta","google","tiktok","appsflyer"].map(id=>({id,configured:false,missing:["Chưa kiểm tra"]}));
  try {
    const response = await fetch("/api/connectors");
    if (response.ok) statuses = (await response.json()).connectors;
  } catch (_) {}
  const appsflyerStatus = statuses.find(status=>status.id === "appsflyer");
  const appsflyerPill = document.querySelector("#af-connection-pill");
  if (appsflyerPill && appsflyerStatus?.configured) {
    appsflyerPill.className = "pill green";
    appsflyerPill.textContent = "Đã cấu hình";
  }
  document.querySelector("#integration-grid").innerHTML = statuses.map(s=>{
    const d = integrationDefinitions[s.id];
    return `<article class="card integration-card">
      <div class="integration-top"><span class="integration-logo ${s.id}">${d.logo}</span><span class="pill ${s.configured?"green":"amber"}">${s.configured?"Đã cấu hình":"Chưa cấu hình"}</span></div>
      <h2>${d.name}</h2><p>${d.description}</p>
      <ul>${d.scopes.map(x=>`<li>${x}</li>`).join("")}</ul>
      <button class="button ${s.configured?"primary":"secondary"} connect-button" data-connector="${d.name}" data-configured="${s.configured}">${
        s.id === "appsflyer"
          ? (s.configured ? "Quản lý API token" : "Cấu hình API token")
          : (s.configured ? "Kết nối OAuth" : "Xem biến môi trường")
      }</button>
    </article>`;
  }).join("");
}

function renderAudit() {
  document.querySelector("#approval-list").innerHTML = [
    ["Tăng budget +20%","VN · iOS · Purchase · Scale 04","Từ $500 lên $600/ngày · Minh Anh đề xuất"],
    ["Pause campaign","BR · Android · Retarget 07","CPI vượt guardrail 38% · Quang Huy đề xuất"]
  ].map(([title,campaign,note])=>`<div class="approval-item"><h3>${title} · ${campaign}</h3><p>${note}</p><div class="approval-actions"><button class="button primary approve-button">Phê duyệt</button><button class="button secondary reject-button">Từ chối</button></div></div>`).join("");
  document.querySelector("#audit-list").innerHTML = [
    ["Linh Chi acknowledged alert","TH · Creative Test 12 · 09:42"],
    ["Quang Huy updated KPI guardrail","Google Apps · CPI $3.20 → $3.00 · 09:16"],
    ["System completed data sync","24 ad accounts · 08:55"],
    ["Minh Anh approved budget change","VN · Purchase · Scale 03 · hôm qua"]
  ].map(([title,note])=>`<div class="timeline-item"><strong>${title}</strong><small>${note}</small></div>`).join("");
}

function switchView(viewId) {
  if (!document.getElementById(viewId)) viewId = "overview";
  document.querySelectorAll(".view").forEach(v=>v.classList.toggle("active",v.id===viewId));
  document.querySelectorAll(".nav-item").forEach(n=>n.classList.toggle("active",n.dataset.view===viewId));
  const active = document.querySelector(`.nav-item[data-view="${viewId}"]`);
  document.querySelector("#page-crumb").textContent = active?.textContent.trim().replace(/\d+$/,"").trim() || "Command center";
  document.querySelector(".sidebar").classList.remove("open");
  window.scrollTo({top:0,behavior:"smooth"});
}

function filterCampaigns() {
  const query = (document.querySelector("#campaign-search")?.value || "").toLowerCase();
  const status = document.querySelector("#campaign-status")?.value || "all";
  let visible = 0;
  document.querySelectorAll("#campaign-table tr").forEach(row=>{
    const show = row.dataset.search.includes(query) && (status==="all" || row.dataset.status===status);
    row.hidden = !show; if (show) visible++;
  });
  const count = document.querySelector("#campaign-count");
  if (count) count.textContent = `${visible} campaign`;
}

let toastTimer;
function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message; toast.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(()=>toast.classList.remove("show"),2600);
}

function initEvents() {
  window.addEventListener("hashchange",()=>switchView(location.hash.slice(1)));
  document.querySelectorAll("[data-view-link]").forEach(button=>button.addEventListener("click",()=>{ location.hash=button.dataset.viewLink; }));
  document.querySelectorAll(".platform-tab").forEach(button=>button.addEventListener("click",()=>{
    document.querySelectorAll(".platform-tab").forEach(b=>b.classList.remove("active")); button.classList.add("active"); renderMetrics(button.dataset.platform);
  }));
  document.querySelectorAll(".date-chip").forEach(button=>button.addEventListener("click",()=>{
    document.querySelectorAll(".date-chip").forEach(b=>b.classList.remove("active")); button.classList.add("active"); showToast(`Đã chuyển khoảng thời gian: ${button.textContent}`);
  }));
  document.querySelector(".mobile-menu").addEventListener("click",()=>document.querySelector(".sidebar").classList.toggle("open"));
  document.querySelector("#campaign-search").addEventListener("input",filterCampaigns);
  document.querySelector("#campaign-status").addEventListener("change",filterCampaigns);
  ["#af-period","#af-ua","#af-platform","#af-os"].forEach(selector=>{
    document.querySelector(selector)?.addEventListener("change",renderAppsFlyer);
  });
  document.querySelector("#af-sync-now")?.addEventListener("click",()=>showToast("Đã đưa AppsFlyer sync job vào hàng đợi demo."));
  document.querySelector("#af-export")?.addEventListener("click",()=>{
    const { rows, factor } = getAppsFlyerSelection();
    const exportRows = [
      ["Platform","OS","Cost","Paid installs","Registrations","CPI","CPA","CVR","Cost share","Rating"],
      ...rows.map(row=>[
        row.platform,row.os,Math.round(row.cost*factor),Math.round(row.installs*factor),Math.round(row.registrations*factor),
        row.cpi,row.cpa,row.cvr,row.share,row.rating
      ])
    ];
    const csv = exportRows.map(row=>row.map(value=>`"${String(value).replaceAll('"','""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([`\uFEFF${csv}`],{type:"text/csv;charset=utf-8"}));
    const link = document.createElement("a"); link.href=url; link.download="appsflyer-performance.csv"; link.click();
    URL.revokeObjectURL(url); showToast("Đã xuất AppsFlyer breakdown CSV.");
  });
  document.querySelectorAll("[data-open-modal]").forEach(b=>b.addEventListener("click",()=>{ const modal=document.getElementById(b.dataset.openModal); modal.classList.add("open"); modal.setAttribute("aria-hidden","false"); }));
  document.querySelectorAll("[data-close-modal]").forEach(b=>b.addEventListener("click",()=>{ const modal=b.closest(".modal-backdrop"); modal.classList.remove("open"); modal.setAttribute("aria-hidden","true"); }));
  document.querySelector("#campaign-form").addEventListener("submit",event=>{
    event.preventDefault(); const values=Object.fromEntries(new FormData(event.currentTarget));
    document.querySelector("#campaign-modal").classList.remove("open"); showToast(`Đã lưu draft "${values.name}" ở trạng thái paused.`);
    event.currentTarget.reset();
  });
  document.querySelector("#export-button").addEventListener("click",()=>{
    const rows = [["Campaign","Platform","Owner","Spend","Installs","CPI","ROAS D7","Status"], ...data.campaigns.map(c=>[c.name,c.platform,c.owner,c.spend,c.installs,c.cpi,c.roas,c.status])];
    const csv = rows.map(row=>row.map(v=>`"${String(v).replaceAll('"','""')}"`).join(",")).join("\n");
    const url=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"})); const link=document.createElement("a"); link.href=url; link.download="ua-campaign-report.csv"; link.click(); URL.revokeObjectURL(url); showToast("Đã xuất báo cáo CSV.");
  });
  document.addEventListener("click",event=>{
    const connect=event.target.closest(".connect-button");
    if(connect) showToast(connect.dataset.configured==="true" ? `Sẵn sàng mở OAuth ${connect.dataset.connector}.` : `Hãy cấu hình secrets ${connect.dataset.connector} trong Vercel.`);
    const approve=event.target.closest(".approve-button,.reject-button");
    if(approve){ const item=approve.closest(".approval-item"); item.style.opacity=".45"; showToast(approve.classList.contains("approve-button")?"Đã phê duyệt trong demo mode.":"Đã từ chối trong demo mode."); }
  });
}

renderMetrics();
renderChart();
renderQueue();
renderCampaigns();
renderAccounts();
renderCreatives();
renderAlerts();
renderAppsFlyer();
renderIntegrations();
renderAudit();
initEvents();
switchView(location.hash.slice(1) || "overview");
