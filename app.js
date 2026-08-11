window.__uaAppMode = window.__uaAppMode || "loading";
const isDemoMode = () => window.__uaAppMode === "demo";
const isAppLoading = () => window.__uaAppMode === "loading";

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
    { name: "VN · iOS · Purchase · Scale 04", market: "Vietnam", platform: "Meta", businessId:"1748535932598249", business:"NGOC UYEN", accountId:"act_1525709302595694", account:"FOXSCORE - FA1BM2", owner: "David", spend: "$8,420", revenue:"$26,270", installs: "4,180", registrations:"1,520", purchases:312, ctr:"2.48%", cvr:"36.36%", cpi: "$2.01", roasD1:"1.42x", roas: "3.12x", status: "Scaling", trend: "up" },
    { name: "US · Android · tROAS · Broad", market: "United States", platform: "Google", business:"", account:"Google Ads", owner: "Tommy", spend: "$12,180", revenue:"$30,085", installs: "3,940", registrations:"1,328", purchases:426, ctr:"1.64%", cvr:"33.71%", cpi: "$3.09", roasD1:"1.18x", roas: "2.47x", status: "Scaling", trend: "up" },
    { name: "TH · iOS · Creative Test 12", market: "Thailand", platform: "TikTok", business:"", account:"TikTok Ads", owner: "David", spend: "$4,760", revenue:"$8,949", installs: "2,210", registrations:"702", purchases:98, ctr:"1.92%", cvr:"31.76%", cpi: "$2.15", roasD1:".91x", roas: "1.88x", status: "Watch", trend: "down" },
    { name: "BR · Android · Retarget 07", market: "Brazil", platform: "Meta", businessId:"1748535932598249", business:"NGOC UYEN", accountId:"act_1551698326577198", account:"FOXSCORE - FA2BM2", owner: "Tommy", spend: "$5,940", revenue:"$8,435", installs: "1,620", registrations:"388", purchases:54, ctr:".88%", cvr:"23.95%", cpi: "$3.67", roasD1:".63x", roas: "1.42x", status: "At risk", trend: "down" },
    { name: "JP · iOS · Value · Core 02", market: "Japan", platform: "Google", business:"", account:"Google Ads", owner: "Tommy", spend: "$7,630", revenue:"$16,633", installs: "2,340", registrations:"804", purchases:166, ctr:"1.31%", cvr:"34.36%", cpi: "$3.26", roasD1:"1.05x", roas: "2.18x", status: "Watch", trend: "up" },
    { name: "ID · Android · UGC Batch 06", market: "Indonesia", platform: "TikTok", business:"", account:"TikTok Ads", owner: "David", spend: "$3,710", revenue:"$7,606", installs: "2,060", registrations:"693", purchases:121, ctr:"2.22%", cvr:"33.64%", cpi: "$1.80", roasD1:"1.12x", roas: "2.05x", status: "Scaling", trend: "up" }
  ],
  segments:[
    {name:"High-value payers",key:"HVP",definition:"Revenue D30 ≥ $50 · active 7D",users:12840,growth:18.4,arpu:"$84.20",roas:"4.82x",platforms:["Meta","Google"],status:"Ready",tone:"violet"},
    {name:"New installers",key:"NEW",definition:"Install trong 7 ngày · chưa purchase",users:38620,growth:12.7,arpu:"$0.00",roas:"—",platforms:["Meta","Google","TikTok"],status:"Ready",tone:"blue"},
    {name:"Engaged non-payers",key:"ENG",definition:"≥ 3 sessions/7D · chưa purchase",users:21470,growth:9.2,arpu:"$0.00",roas:"2.16x potential",platforms:["Meta","TikTok"],status:"Ready",tone:"green"},
    {name:"Churn risk",key:"RISK",definition:"Không active 7–14 ngày · từng purchase",users:8920,growth:-6.8,arpu:"$32.60",roas:"3.04x",platforms:["Meta","Google"],status:"Ready",tone:"amber"},
    {name:"Lapsed users",key:"LAP",definition:"Không active > 30 ngày",users:31780,growth:-2.1,arpu:"$8.40",roas:"1.38x",platforms:["Meta"],status:"Review",tone:"red"},
    {name:"Whales",key:"WHL",definition:"Top 1% LTV · purchase ≥ 5",users:1240,growth:4.6,arpu:"$286.40",roas:"7.92x",platforms:["Google"],status:"Small size",tone:"dark"}
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
    {
      code:"V7-2606-VA", editor:"Việt Anh", os:"AND", platforms:["Meta","TikTok"], spend:314939, impressions:6440, reach:5488, ctr:1.58, installs:21, registrations:4, cpi:14997, cpr:78735, hook:30.11, hold:13.77, codeStatus:"Chuẩn", accounts:2, campaigns:4,
      coverage:[
        { account:"Northstar · Meta Global", campaign:"VN · Android · Purchase · Scale", platform:"Meta", spend:178420, installs:13, cpi:13725, trend:"↑ 18%" },
        { account:"Northstar · Meta Global", campaign:"VN · Android · Broad · Test", platform:"Meta", spend:77410, installs:5, cpi:15482, trend:"↑ 7%" },
        { account:"Northstar · TikTok SEA", campaign:"TH · Android · UGC Prospecting", platform:"TikTok", spend:39109, installs:2, cpi:19555, trend:"→ 1%" },
        { account:"Northstar · TikTok SEA", campaign:"ID · Android · Creative Test", platform:"TikTok", spend:19990, installs:1, cpi:19990, trend:"↓ 4%" }
      ]
    },
    {
      code:"V29-VA", editor:"Việt Anh", os:"AND", platforms:["Meta"], spend:753022, impressions:13596, reach:10600, ctr:1.56, installs:29, registrations:9, cpi:25966, cpr:83669, hook:44.59, hold:10.72, codeStatus:"Legacy", accounts:2, campaigns:5,
      coverage:[
        { account:"Northstar · Meta Global", campaign:"VN · Android · Core Broad", platform:"Meta", spend:326500, installs:14, cpi:23321, trend:"↑ 8%" },
        { account:"Atlas · Meta LATAM", campaign:"BR · Android · Prospecting", platform:"Meta", spend:212000, installs:7, cpi:30286, trend:"↓ 6%" },
        { account:"Northstar · Meta Global", campaign:"VN · Android · Value", platform:"Meta", spend:129522, installs:5, cpi:25904, trend:"→ 2%" }
      ]
    },
    {
      code:"V6-2606-VA", editor:"Việt Anh", os:"AND", platforms:["Meta","Google"], spend:834846, impressions:17467, reach:15510, ctr:1.27, installs:30, registrations:6, cpi:27828, cpr:139141, hook:33.42, hold:12.49, codeStatus:"Chuẩn", accounts:3, campaigns:6,
      coverage:[
        { account:"Northstar · Meta Global", campaign:"VN · Android · Purchase", platform:"Meta", spend:412056, installs:18, cpi:22892, trend:"↑ 5%" },
        { account:"Northstar · Google Apps", campaign:"SEA · Android · App Campaign", platform:"Google", spend:260340, installs:8, cpi:32543, trend:"↓ 9%" },
        { account:"Atlas · Meta LATAM", campaign:"BR · Android · Broad", platform:"Meta", spend:162450, installs:4, cpi:40613, trend:"↓ 13%" }
      ]
    },
    {
      code:"V3-P1", editor:"Team P1", os:"AND", platforms:["Meta"], spend:202917, impressions:5943, reach:5104, ctr:.87, installs:16, registrations:0, cpi:12682, cpr:0, hook:28.20, hold:6.80, codeStatus:"Legacy", accounts:1, campaigns:2,
      coverage:[{ account:"Northstar · Meta Global", campaign:"VN · Android · Low Cost Test", platform:"Meta", spend:202917, installs:16, cpi:12682, trend:"↑ 22%" }]
    },
    {
      code:"V1-2607", editor:"Chưa map", os:"AND", platforms:["Meta"], spend:561877, impressions:7374, reach:4628, ctr:5.59, installs:10, registrations:2, cpi:56188, cpr:280939, hook:70.27, hold:13.99, codeStatus:"Thiếu editor", accounts:1, campaigns:3,
      coverage:[{ account:"Northstar · Meta Global", campaign:"VN · Android · Hook Test", platform:"Meta", spend:561877, installs:10, cpi:56188, trend:"↓ 16%" }]
    },
    {
      code:"V2-2607", editor:"Chưa map", os:"AND", platforms:["Meta"], spend:208974, impressions:2618, reach:2167, ctr:2.67, installs:5, registrations:2, cpi:41795, cpr:104487, hook:51.26, hold:9.31, codeStatus:"Thiếu editor", accounts:1, campaigns:2,
      coverage:[{ account:"Northstar · Meta Global", campaign:"VN · Android · Creative Test", platform:"Meta", spend:208974, installs:5, cpi:41795, trend:"→ 3%" }]
    },
    {
      code:"V6-2607", editor:"Chưa map", os:"iOS", platforms:["Meta","Google"], spend:412954, impressions:11794, reach:10644, ctr:.68, installs:15, registrations:3, cpi:27530, cpr:137651, hook:28.60, hold:7.44, codeStatus:"Thiếu editor", accounts:2, campaigns:3,
      coverage:[{ account:"Northstar · Meta Global", campaign:"VN · iOS · Purchase", platform:"Meta", spend:264282, installs:10, cpi:26428, trend:"↑ 4%" },{ account:"Northstar · Google Apps", campaign:"SEA · iOS · App Campaign", platform:"Google", spend:148672, installs:5, cpi:29734, trend:"→ 1%" }]
    },
    {
      code:"V5-P2", editor:"Team P2", os:"iOS", platforms:["Meta"], spend:104139, impressions:1915, reach:1782, ctr:.63, installs:5, registrations:0, cpi:20828, cpr:0, hook:23.86, hold:3.94, codeStatus:"Legacy", accounts:1, campaigns:2,
      coverage:[{ account:"Northstar · Meta Global", campaign:"VN · iOS · Value Test", platform:"Meta", spend:104139, installs:5, cpi:20828, trend:"↓ 3%" }]
    },
    {
      code:"V7-2607", editor:"Chưa map", os:"iOS", platforms:["Meta"], spend:40147, impressions:1261, reach:1128, ctr:.24, installs:1, registrations:0, cpi:40147, cpr:0, hook:11.10, hold:10.71, codeStatus:"Thiếu editor", accounts:1, campaigns:2,
      coverage:[{ account:"Northstar · Meta Global", campaign:"VN · iOS · Creative Test", platform:"Meta", spend:40147, installs:1, cpi:40147, trend:"↓ 21%" }]
    },
    {
      code:"V7-2606-VA", editor:"Việt Anh", os:"iOS", platforms:["Meta"], spend:36875, impressions:1024, reach:1004, ctr:.39, installs:0, registrations:0, cpi:0, cpr:0, hook:13.28, hold:4.41, codeStatus:"Chuẩn", accounts:1, campaigns:1,
      coverage:[{ account:"Northstar · Meta Global", campaign:"VN · iOS · Broad Test", platform:"Meta", spend:36875, installs:0, cpi:0, trend:"↓ 28%" }]
    }
  ],
  alerts: [
    { level: "critical", icon: "!", title: "CPI vượt guardrail 38%", subtitle: "BR · Android · Retarget 07", campaign:"BR · Android · Retarget 07", owner: "Tommy", metric: "93.218 ₫", target: "67.310 ₫", riskValue: 1420, status: "Cần duyệt", action: "Pause", due: "10:30", stage: "approval" },
    { level: "watch", icon: "↗", title: "Frequency tăng 0.8 trong 24h", subtitle: "TH · iOS · Creative Test 12", campaign:"TH · iOS · Creative Test 12", owner: "David", metric: "4.2", target: "< 3.5", riskValue: 760, status: "Đề xuất", action: "Rotate creative", due: "11:30", stage: "recommendation" },
    { level: "good", icon: "↗", title: "Cơ hội scale ngân sách +20%", subtitle: "VN · iOS · Purchase · Scale 04", campaign:"VN · iOS · Purchase · Scale 04", owner: "David", metric: "3.12x", target: "> 2.0x", riskValue: 0, status: "Cần duyệt", action: "Scale +20%", due: "11:00", stage: "approval" },
    { level: "watch", icon: "⌁", title: "AppsFlyer lệch install 14.8%", subtitle: "TH · TikTok · Attribution", campaign:"TH · iOS · Creative Test 12", owner: "David", metric: "14.8%", target: "< 5%", riskValue: 1060, status: "Cảnh báo", action: "Review data", due: "15:30", stage: "alert" }
  ],
  appsflyer: {
    daily: [],
    retention: [],
    comparison: [],
    breakdown: []
  },
  platformDashboard: {
    daily: [
      { date:"20/07", cost:15741172, impressions:655249, clicks:8309, installs:641 },
      { date:"21/07", cost:8782824, impressions:382442, clicks:4218, installs:373 },
      { date:"22/07", cost:11980593, impressions:440204, clicks:5443, installs:558 },
      { date:"23/07", cost:9011634, impressions:243136, clicks:3234, installs:546 },
      { date:"24/07", cost:11256994, impressions:387476, clicks:6374, installs:716 },
      { date:"25/07", cost:12404252, impressions:434104, clicks:5688, installs:685 },
      { date:"26/07", cost:13794846, impressions:555193, clicks:6994, installs:718 },
      { date:"27/07", cost:14281158, impressions:577703, clicks:6179, installs:725 },
      { date:"28/07", cost:14965290, impressions:534869, clicks:5694, installs:762 }
    ],
    platforms: [
      { platform:"Facebook", cost:49402326, impressions:1001002, clicks:13099, installs:1777, ctr:1.31, cpc:3771, cpm:49353, cpi:27801, cvr:13.57, costShare:44.02, installShare:31.04 },
      { platform:"Google", cost:54656000, impressions:2858627, clicks:36129, installs:3818, ctr:1.26, cpc:1513, cpm:19120, cpi:14315, cvr:10.57, costShare:48.70, installShare:66.70 },
      { platform:"Tiktok", cost:8160437, impressions:350747, clicks:2905, installs:129, ctr:.83, cpc:2809, cpm:23266, cpi:63259, cvr:4.44, costShare:7.27, installShare:2.25 }
    ],
    breakdown: [
      { platform:"Facebook", os:"Android", cost:40514701, impressions:793789, clicks:11509, installs:1486, ctr:1.45, cpc:3520, cpm:51040, cpi:27264, cvr:12.91, costShare:36.10, installShare:25.96 },
      { platform:"Facebook", os:"iOS", cost:8887625, impressions:207213, clicks:1590, installs:291, ctr:.77, cpc:5590, cpm:42891, cpi:30542, cvr:18.30, costShare:7.92, installShare:5.08 },
      { platform:"Google", os:"Android", cost:38253043, impressions:1615903, clicks:21572, installs:3083, ctr:1.33, cpc:1773, cpm:23673, cpi:12408, cvr:14.29, costShare:34.09, installShare:53.86 },
      { platform:"Google", os:"iOS", cost:16402957, impressions:1242724, clicks:14557, installs:735, ctr:1.17, cpc:1127, cpm:13199, cpi:22317, cvr:5.05, costShare:14.62, installShare:12.84 },
      { platform:"Tiktok", os:"Android", cost:5843055, impressions:267027, clicks:2221, installs:118, ctr:.83, cpc:2631, cpm:21882, cpi:49517, cvr:5.31, costShare:5.21, installShare:2.06 },
      { platform:"Tiktok", os:"iOS", cost:2317382, impressions:83720, clicks:684, installs:11, ctr:.82, cpc:3388, cpm:27680, cpi:210671, cvr:1.61, costShare:2.07, installShare:.19 }
    ],
    comparison: [
      { metric:"Cost", current:132639035, previous:163243128, format:"money", delta:-18.75, good:false },
      { metric:"Impressions", current:5806901, previous:7823149, format:"number", delta:-25.77, good:false },
      { metric:"Clicks", current:77974, previous:89535, format:"number", delta:-12.91, good:false },
      { metric:"Installs", current:7973, previous:12023, format:"number", delta:-33.69, good:false },
      { metric:"CTR", current:1.34, previous:1.14, format:"percent", delta:17.33, good:true },
      { metric:"CPC", current:1701, previous:1823, format:"money", delta:-6.70, good:true },
      { metric:"CPM", current:22842, previous:20867, format:"money", delta:9.46, good:false },
      { metric:"CPI", current:16636, previous:13578, format:"money", delta:22.53, good:false },
      { metric:"CVR", current:10.23, previous:13.43, format:"percent", delta:-23.85, good:false }
    ],
    explorer: {
      account: [
        { name:"Northstar · Meta Global", platform:"Facebook", owner:"Minh Anh", cost:49402326, impressions:1001002, clicks:13099, installs:1777 },
        { name:"Northstar · Google Apps", platform:"Google", owner:"Quang Huy", cost:54656000, impressions:2858627, clicks:36129, installs:3818 },
        { name:"Northstar · TikTok SEA", platform:"Tiktok", owner:"Linh Chi", cost:8160437, impressions:350747, clicks:2905, installs:129 }
      ],
      campaign: [
        { name:"VN · Android · Purchase · Scale", platform:"Facebook", owner:"Minh Anh", cost:28434000, impressions:604200, clicks:8020, installs:1084 },
        { name:"SEA · Android · App Campaign", platform:"Google", owner:"Quang Huy", cost:38253043, impressions:1615903, clicks:21572, installs:3083 },
        { name:"TH · Android · UGC Prospecting", platform:"Tiktok", owner:"Linh Chi", cost:5843055, impressions:267027, clicks:2221, installs:118 }
      ],
      adgroup: [
        { name:"Broad · Value users · AND", platform:"Facebook", owner:"Minh Anh", cost:15250000, impressions:328000, clicks:4460, installs:622 },
        { name:"Asset group · RPG core", platform:"Google", owner:"Quang Huy", cost:21740000, impressions:882400, clicks:12860, installs:1724 },
        { name:"Broad · UGC winners · AND", platform:"Tiktok", owner:"Linh Chi", cost:3950000, impressions:178600, clicks:1518, installs:86 }
      ],
      ad: [
        { name:"ugc_reward_hook_v12.mp4", platform:"Facebook", owner:"Minh Anh", cost:7240000, impressions:148700, clicks:2180, installs:314 },
        { name:"gameplay_merge_30s_v08.mp4", platform:"Google", owner:"Quang Huy", cost:11320000, impressions:426500, clicks:6480, installs:842 },
        { name:"creator_win_level20_v06.mp4", platform:"Tiktok", owner:"Linh Chi", cost:2140000, impressions:96900, clicks:874, installs:51 }
      ]
    }
  }
};

const adsManagerData = {
  campaign: [
    { id:"cmp_1048", name:"VN · iOS · Purchase · Scale 04", parent:"Northstar · Meta Global", platform:"Meta", owner:"Minh Anh", budget:600, spend:8420, revenue:26270, registrations:1520, installs:4180, cpi:2.01, roas:3.12, status:"Active", active:true, trend:"up" },
    { id:"cmp_2085", name:"US · Android · tROAS · Broad", parent:"Northstar · Google Apps", platform:"Google", owner:"Quang Huy", budget:850, spend:12180, revenue:30085, registrations:1328, installs:3940, cpi:3.09, roas:2.47, status:"Active", active:true, trend:"up" },
    { id:"cmp_3041", name:"TH · iOS · Creative Test 12", parent:"Northstar · TikTok SEA", platform:"TikTok", owner:"Linh Chi", budget:320, spend:4760, revenue:8949, registrations:702, installs:2210, cpi:2.15, roas:1.88, status:"Learning", active:true, trend:"down" },
    { id:"cmp_1142", name:"BR · Android · Retarget 07", parent:"Atlas · Meta LATAM", platform:"Meta", owner:"Minh Anh", budget:280, spend:5940, revenue:8435, registrations:388, installs:1620, cpi:3.67, roas:1.42, status:"Limited", active:true, trend:"down" },
    { id:"cmp_2199", name:"JP · iOS · Value · Core 02", parent:"Orbit · Google Japan", platform:"Google", owner:"Quang Huy", budget:470, spend:7630, revenue:16633, registrations:804, installs:2340, cpi:3.26, roas:2.18, status:"Active", active:true, trend:"up" },
    { id:"cmp_3118", name:"ID · Android · UGC Batch 06", parent:"Orbit · TikTok APAC", platform:"TikTok", owner:"Linh Chi", budget:260, spend:3710, revenue:7606, registrations:693, installs:2060, cpi:1.80, roas:2.05, status:"Paused", active:false, trend:"up" }
  ],
  adset: [
    { id:"set_4011", name:"Broad · Value users · iOS", parent:"VN · iOS · Purchase · Scale 04", platform:"Meta", owner:"Minh Anh", budget:320, spend:4210, revenue:14236, registrations:846, installs:2240, cpi:1.88, roas:3.38, status:"Active", active:true, trend:"up" },
    { id:"set_4012", name:"Lookalike · Payers 3% · iOS", parent:"VN · iOS · Purchase · Scale 04", platform:"Meta", owner:"Minh Anh", budget:280, spend:4210, revenue:12034, registrations:674, installs:1940, cpi:2.17, roas:2.86, status:"Learning", active:true, trend:"up" },
    { id:"set_5014", name:"Asset group · RPG core", parent:"US · Android · tROAS · Broad", platform:"Google", owner:"Quang Huy", budget:850, spend:12180, revenue:30085, registrations:1328, installs:3940, cpi:3.09, roas:2.47, status:"Active", active:true, trend:"up" },
    { id:"set_6019", name:"Broad · UGC winners · iOS", parent:"TH · iOS · Creative Test 12", platform:"TikTok", owner:"Linh Chi", budget:220, spend:3310, revenue:6810, registrations:536, installs:1730, cpi:1.91, roas:2.06, status:"Active", active:true, trend:"down" },
    { id:"set_6020", name:"Interest · Puzzle games · iOS", parent:"TH · iOS · Creative Test 12", platform:"TikTok", owner:"Linh Chi", budget:100, spend:1450, revenue:2139, registrations:166, installs:480, cpi:3.02, roas:1.48, status:"Limited", active:true, trend:"down" }
  ],
  ad: [
    { id:"ad_7101", name:"V7-2606-VA · Reward hook 15s", parent:"Broad · Value users · iOS", platform:"Meta", owner:"Minh Anh", budget:0, spend:2180, revenue:8240, registrations:442, installs:1180, cpi:1.85, roas:3.78, status:"Active", active:true, trend:"up" },
    { id:"ad_7102", name:"V6-2606-VA · Gameplay merge 30s", parent:"Lookalike · Payers 3% · iOS", platform:"Meta", owner:"Minh Anh", budget:0, spend:2030, revenue:3794, registrations:232, installs:760, cpi:2.67, roas:1.87, status:"Limited", active:true, trend:"down" },
    { id:"ad_8201", name:"V12-2607-LC · Store sequence", parent:"Asset group · RPG core", platform:"Google", owner:"Quang Huy", budget:0, spend:4860, revenue:13122, registrations:584, installs:1680, cpi:2.89, roas:2.70, status:"Active", active:true, trend:"up" },
    { id:"ad_9301", name:"V9-2607-VA · Creator win level 20", parent:"Broad · UGC winners · iOS", platform:"TikTok", owner:"Linh Chi", budget:0, spend:1840, revenue:4324, registrations:316, installs:980, cpi:1.88, roas:2.35, status:"Learning", active:true, trend:"up" },
    { id:"ad_9302", name:"V3-2607-P1 · Fail-to-win hook", parent:"Interest · Puzzle games · iOS", platform:"TikTok", owner:"Linh Chi", budget:0, spend:1470, revenue:2486, registrations:220, installs:750, cpi:1.96, roas:1.69, status:"Paused", active:false, trend:"down" }
  ],
  asset: [
    { id:"ast_110", name:"V7-2606-VA", parent:"4 placements · Video · 15s", platform:"Meta", owner:"Minh Anh", budget:0, spend:4180, revenue:15312, registrations:760, installs:2060, cpi:2.03, roas:3.66, status:"Winner", active:true, trend:"up" },
    { id:"ast_208", name:"V12-2607-LC", parent:"3 placements · Video · 30s", platform:"Google", owner:"Quang Huy", budget:0, spend:4860, revenue:13122, registrations:584, installs:1680, cpi:2.89, roas:2.70, status:"Scaling", active:true, trend:"up" },
    { id:"ast_314", name:"V9-2607-VA", parent:"5 placements · UGC · 22s", platform:"TikTok", owner:"Linh Chi", budget:0, spend:3310, revenue:6810, registrations:536, installs:1730, cpi:1.91, roas:2.06, status:"Testing", active:true, trend:"up" },
    { id:"ast_415", name:"V3-2607-P1", parent:"2 placements · Video · 12s", platform:"TikTok", owner:"Linh Chi", budget:0, spend:1470, revenue:2486, registrations:220, installs:750, cpi:1.96, roas:1.69, status:"Fatigue", active:false, trend:"down" }
  ]
};

const platformClass = (platform) => platform.toLowerCase();
const platformDot = (platform) => `<i class="dot ${platformClass(platform)}-bg"></i>`;
const statusPill = (status) => {
  const style = status === "Scaling" || status === "Sẵn sàng" || status === "Cơ hội" ? "green" : status === "At risk" || status === "Cần xử lý" ? "red" : "amber";
  return `<span class="pill ${style}">${status}</span>`;
};

let commandPlatform = "all";
let commandRange = "today";
let commandBusiness = "all";
let commandAccount = "all";
let commandLiveData = null;
let commandLiveAttempted = false;
let commandLiveLoading = false;
let commandScopeAccounts = [];
const commandVndRate = 25400;
let strategyOverviewMetric = "spend-roas";
let strategyDrilldownGroup = "acquisition";
let strategyDrilldownMetric = "revenue-spend";
const commandRangeConfig = {
  yesterday: { factor:.94, label:"Hôm qua", labels:["00h","04h","08h","12h","16h","20h","24h"] },
  today: { factor:1, label:"Hôm nay", labels:["00h","04h","08h","12h","16h","20h","24h"] },
  "7d": { factor:6.72, label:"7 ngày", labels:["25 Jul","26 Jul","27 Jul","28 Jul","29 Jul","30 Jul","31 Jul"] },
  "30d": { factor:27.4, label:"30 ngày", labels:["01 Jul","06 Jul","11 Jul","16 Jul","21 Jul","26 Jul","31 Jul"] }
};
const commandPlatformNames = { meta:"Meta", google:"Google", tiktok:"TikTok" };
const numeric = value => Number(String(value).replace(/[^0-9.-]/g,"")) || 0;
const commandMoney = value => {
    if (!isDemoMode() && !commandLiveAttempted && !Number(value)) return "—";
    const amount = Number(value || 0) * (isDemoMode() && !commandLiveAttempted ? commandVndRate : 1);
    const currency = isDemoMode() && !commandLiveAttempted ? "VND" : (commandLiveData?.currency || "");
    if (currency && currency !== "VND" && currency !== "MIXED") {
      return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 2 }).format(amount);
    }
    const formatted = Math.round(amount).toLocaleString(currency === "VND" ? "vi-VN" : "en-US");
    return currency === "MIXED" ? `${formatted} (mixed)` : `${formatted} ₫`;
  };
const commandNumber = value => Math.round(value).toLocaleString("vi-VN");
const purchaseCount = row => Number(row?.purchases || row?.purchase || 0);
const purchaseCpa = (spend,purchases) => purchases ? spend / purchases : 0;
const commandHasLiveSource = () => Object.values(commandLiveData?.sourceStates || {}).includes("connected");
const commandDataReady = () => isDemoMode() || (commandLiveAttempted && !commandLiveLoading && commandHasLiveSource());
// Live rows carry impressions and clicks directly. Demo rows only carry CTR, so
// the two are derived from it to keep CTR, CPC and CPM internally consistent
// instead of showing zero.
const commandClicks = row => {
  const direct = numeric(row.linkClicks) || numeric(row.clicks);
  if(direct) return direct;
  const ctr = numeric(row.ctr);
  return ctr ? Math.round(numeric(row.installs) / (ctr / 100) * 0.01) * 100 : 0;
};
const commandImpressions = row => {
  const direct = numeric(row.impressions);
  if(direct) return direct;
  const ctr = numeric(row.ctr), clicks = commandClicks(row);
  return ctr && clicks ? Math.round(clicks / (ctr / 100)) : 0;
};

function commandRangeDetails() {
  const localIso = date => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
  if(commandRange !== "custom") {
    const to = new Date();
    const from = new Date(to);
    if(commandRange === "yesterday") { from.setDate(from.getDate()-1); to.setDate(to.getDate()-1); }
    if(commandRange === "7d") from.setDate(from.getDate()-6);
    if(commandRange === "30d") from.setDate(from.getDate()-29);
    return { ...commandRangeConfig[commandRange], from:localIso(from), to:localIso(to) };
  }
  const fromValue = document.querySelector("#command-date-from")?.value;
  const toValue = document.querySelector("#command-date-to")?.value;
  const from = fromValue ? new Date(`${fromValue}T00:00:00`) : null;
  const to = toValue ? new Date(`${toValue}T00:00:00`) : null;
  if(!from || !to || Number.isNaN(from.getTime()) || Number.isNaN(to.getTime()) || from > to) {
    return { factor:1, label:"Khoảng ngày chưa hợp lệ", labels:commandRangeConfig.today.labels, from:"", to:"" };
  }
  const days = Math.floor((to - from) / 86400000) + 1;
  const labels = Array.from({length:Math.min(7,days)},(_,index)=>{
    const offset = days === 1 ? 0 : Math.round(index * (days - 1) / (Math.min(7,days) - 1));
    const date = new Date(from); date.setDate(date.getDate() + offset);
    return date.toLocaleDateString("vi-VN",{day:"2-digit",month:"2-digit"});
  });
  while(labels.length < 7) labels.push(labels.at(-1));
  return { factor:days, label:`${from.toLocaleDateString("vi-VN")} – ${to.toLocaleDateString("vi-VN")}`, labels, from:fromValue, to:toValue };
}

function refreshCommandScopeOptions() {
  const businessSelect = document.querySelector("#command-business");
  const accountSelect = document.querySelector("#command-account");
  if(!businessSelect || !accountSelect) return;
  const sourceAccounts = commandScopeAccounts.length
    ? commandScopeAccounts
    : isDemoMode() ? data.campaigns.filter(row=>row.platform==="Meta").map(row=>({id:row.accountId,name:row.account,businessId:row.businessId,businessName:row.business})) : [];
  const businesses = [...new Map(sourceAccounts.filter(row=>row.businessId).map(row=>[row.businessId,{id:row.businessId,name:row.businessName}])).values()];
  businessSelect.innerHTML = `<option value="all">Tất cả BM</option>${businesses.map(row=>`<option value="${row.id}">${row.name}</option>`).join("")}`;
  if(businesses.some(row=>row.id===commandBusiness)) businessSelect.value=commandBusiness; else commandBusiness="all";
  const accounts = sourceAccounts.filter(row=>commandBusiness==="all" || row.businessId===commandBusiness);
  accountSelect.innerHTML = `<option value="all">Tất cả tài khoản</option>${accounts.map(row=>`<option value="${row.id}">${row.name}</option>`).join("")}`;
  if(accounts.some(row=>row.id===commandAccount)) accountSelect.value=commandAccount; else commandAccount="all";
}

function getCommandSelection() {
  const platformName = commandPlatformNames[commandPlatform];
  const sourceCampaigns = commandLiveAttempted ? (commandLiveData?.campaigns || []) : isDemoMode() ? data.campaigns : [];
  const campaigns = sourceCampaigns.filter(row =>
    (!platformName || row.platform === platformName) &&
    (commandBusiness === "all" || row.businessId === commandBusiness) &&
    (commandAccount === "all" || row.accountId === commandAccount)
  );
  const factor = isDemoMode() && !commandLiveAttempted ? commandRangeDetails().factor : 1;
  const totals = campaigns.reduce((sum,row)=>({
    spend: sum.spend + numeric(row.spend),
    revenue: sum.revenue + numeric(row.revenue),
    installs: sum.installs + numeric(row.installs),
    registrations: sum.registrations + numeric(row.registrations),
    purchases: sum.purchases + purchaseCount(row),
    impressions: sum.impressions + commandImpressions(row),
    clicks: sum.clicks + commandClicks(row)
  }), {spend:0,revenue:0,installs:0,registrations:0,purchases:0,impressions:0,clicks:0});
  Object.keys(totals).forEach(key=>totals[key] *= factor);
  return { campaigns, factor, totals };
}

// Tier 0. Only Spend, ROAS and CPA, because those are the three numbers a
// business owner uses to continue or stop budget. Everything else stays in the
// operational grid below.
function renderExecutiveKpi() {
  const container = document.querySelector("#exec-kpi");
  if(!container) return;
  const { totals } = getCommandSelection();
  const dataReady = commandDataReady();
  const hasRevenue = totals.revenue > 0;
  const hasPurchases = totals.purchases > 0;

  // A ROAS of 0.00x reads as "we earned nothing", which is wrong when the real
  // situation is that no purchase event is being tracked yet. Those two cases
  // are shown differently on purpose.
  const roasValue = !totals.spend ? "—" : hasRevenue ? `${(totals.revenue/totals.spend).toFixed(2)}x` : "Chưa có";
  const roasNote = hasRevenue
    ? "ROAS D0 tạm tính · revenue / spend"
    : "Chưa nhận purchase event có giá trị";

  // CPA is stated as cost per paying user so it is never confused with CPI or CPR.
  const cpaValue = hasPurchases ? commandMoney(purchaseCpa(totals.spend,totals.purchases)) : "—";
  const cpaNote = hasPurchases
    ? `${commandNumber(totals.purchases)} purchases · spend / purchases`
    : "Chưa có purchase để tính";

  const pendingNote = isAppLoading() ? "Đang xác thực phiên làm việc" : commandLiveLoading ? "Đang đồng bộ dữ liệu nền tảng" : "Chưa đọc được dữ liệu nền tảng";
  const cards = dataReady ? [
    { label:"Spend", value:commandMoney(totals.spend), note:"Tổng chi tiêu trong kỳ", tone:"neutral", state:totals.spend ? "ok" : "empty" },
    { label:"ROAS", value:roasValue, note:roasNote, tone:hasRevenue ? "up" : "warning", state:hasRevenue ? "ok" : "empty" },
    { label:"CPA (Purchase)", value:cpaValue, note:cpaNote, tone:hasPurchases ? "up" : "warning", state:hasPurchases ? "ok" : "empty" }
  ] : ["Spend","ROAS","CPA (Purchase)"].map(label=>({label,value:"—",note:pendingNote,tone:"neutral",state:"empty"}));

  container.innerHTML = cards.map(card=>`
    <article class="exec-card" data-state="${card.state}">
      <p class="exec-label">${card.label}</p>
      <strong class="exec-value">${card.value}</strong>
      <small class="exec-note ${card.tone}">${card.note}</small>
    </article>`).join("");
}

function renderMetrics() {
  renderExecutiveKpi();
  const { totals } = getCommandSelection();
  const delta = isDemoMode() && !commandLiveAttempted ? "↑ 8.4%" : "";
  // The note names the sources that actually answered for this range.
  const connected = Object.entries(commandLiveData?.sourceStates || {}).filter(([,state])=>state==="connected").map(([source])=>source);
  const sourceNote = commandLiveAttempted
    ? (connected.length ? connected.join(" + ") : "chưa có nguồn")
    : isDemoMode() ? "dữ liệu mẫu" : isAppLoading() ? "đang xác thực" : "đang chờ đồng bộ";
  const metrics = commandDataReady() ? [
    ["Total spend",commandMoney(totals.spend),delta,sourceNote,"up","₫"],
    ["Revenue",totals.revenue ? commandMoney(totals.revenue) : "—",isDemoMode()&&!commandLiveAttempted?"↑ 12.1%":"",totals.revenue ? sourceNote : "Chưa có purchase value","up","↗"],
    // Distinguish "no revenue tracked yet" from a real ROAS of zero.
    ["ROAS",!totals.spend ? "—" : totals.revenue ? `${(totals.revenue/totals.spend).toFixed(2)}x` : "Chưa có",isDemoMode()&&!commandLiveAttempted?"↑ 0.18":"",totals.revenue ? "revenue / spend" : "chưa nhận purchase event","up","⌁"],
    ["CPA (Purchase)",totals.purchases ? commandMoney(purchaseCpa(totals.spend,totals.purchases)) : "—",totals.purchases ? `${commandNumber(totals.purchases)} payers` : "Chưa có purchase",totals.purchases ? "spend / purchases" : sourceNote,totals.purchases?"up":"neutral","◉"],
    // The app funnel is Install → Registration → Purchase, so each step keeps its
    // own cost metric to show where the drop-off happens.
    ["Installs",commandNumber(totals.installs),isDemoMode()&&!commandLiveAttempted?"↑ 6.8%":"","chỉ số funnel","up","↓"],
    ["CPI",totals.installs ? commandMoney(totals.spend/totals.installs) : "—","","spend / installs","neutral","◇"],
    ["Registrations",commandNumber(totals.registrations),isDemoMode()&&!commandLiveAttempted?"↑ 8.7%":"","chỉ số funnel","up","◎"],
    ["CPR (Register)",totals.registrations ? commandMoney(totals.spend/totals.registrations) : "—","","spend / registrations","neutral","◈"],
    // Delivery metrics every platform reports the same way, so they are safe to
    // blend across Meta, Google and TikTok.
    ["Impressions",commandNumber(totals.impressions),"","chỉ số phân phối","neutral","◪"],
    ["Clicks",commandNumber(totals.clicks),"","link click khi có","neutral","☞"],
    ["CTR",totals.impressions ? `${(totals.clicks/totals.impressions*100).toFixed(2)}%` : "—","","clicks / impressions","neutral","%"],
    ["CPC",totals.clicks ? commandMoney(totals.spend/totals.clicks) : "—","","spend / clicks","neutral","◈"],
    ["CPM",totals.impressions ? commandMoney(totals.spend/totals.impressions*1000) : "—","","spend / 1.000 impressions","neutral","▦"]
  ] : ["Total spend","Revenue","ROAS","CPA (Purchase)","Installs","CPI","Registrations","CPR (Register)","Impressions","Clicks","CTR","CPC","CPM"]
    .map((label,index)=>[label,"—","",sourceNote,"neutral",["₫","↗","⌁","◉","↓","◇","◎","◈","◪","☞","%","◈","▦"][index]]);
  document.querySelector("#metric-grid").innerHTML = metrics.map(([label,value,delta,note,tone,icon]) => `
    <article class="metric">
      <div class="metric-top"><span class="metric-label">${label}</span><span class="metric-icon">${icon}</span></div>
      <strong>${value}</strong>
      <small><span class="delta ${tone}">${delta}</span>${note}</small>
    </article>`).join("");
}

function renderChart() {
  const { totals } = getCommandSelection();
  const range = commandRangeDetails();
  let labels = range.labels;
  let revenue, spend;
  if(commandLiveAttempted) {
    const daily = commandLiveData?.daily || [];
    const buckets = Array.from({length:Math.min(7,Math.max(1,daily.length))},()=>({spend:0,revenue:0,dates:[]}));
    daily.forEach((row,index)=>{ const bucket=buckets[Math.min(buckets.length-1,Math.floor(index*buckets.length/Math.max(daily.length,1)))]; bucket.spend+=numeric(row.spend); bucket.revenue+=numeric(row.revenue); bucket.dates.push(row.date); });
    labels=buckets.map(row=>row.dates[0]?new Date(`${row.dates[0]}T00:00:00`).toLocaleDateString("vi-VN",{day:"2-digit",month:"2-digit"}):"—");
    spend=buckets.map(row=>row.spend); revenue=buckets.map(row=>row.revenue);
  } else if(isDemoMode()) {
    const revenueBase = [44,61,58,73,68,86,94], spendBase = [35,40,44,48,45,54,59];
    const platformScale = Math.max(.18, totals.spend/(42640*range.factor || 1));
    const rangeScale = commandRange === "30d" ? 1.08 : commandRange === "7d" ? 1 : commandRange === "yesterday" ? .94 : 1;
    revenue = revenueBase.map(value=>value*platformScale*rangeScale); spend = spendBase.map(value=>value*platformScale*rangeScale);
  } else {
    revenue = labels.map(()=>0);
    spend = labels.map(()=>0);
  }
  const maxValue=Math.max(...revenue,...spend,1);
  const xStep=labels.length>1?570/(labels.length-1):0;
  const points = (values) => values.map((v,i) => `${54+i*xStep},${205-v/maxValue*150}`).join(" ");
  const area = `M ${points(revenue).replaceAll(" ", " L ")} L 624,216 L 54,216 Z`;
  document.querySelector("#command-chart-title").textContent = `Spend & Revenue · ${range.label}`;
  document.querySelector("#performance-chart").innerHTML = `
    <svg viewBox="0 0 680 245" role="img" aria-label="Biểu đồ Spend và Revenue theo phạm vi đang chọn">
      <defs><linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e45d78" stop-opacity=".22"/><stop offset="1" stop-color="#e45d78" stop-opacity="0"/></linearGradient></defs>
      ${[40,90,140,190].map(y=>`<line class="grid-line" x1="42" y1="${y}" x2="640" y2="${y}"/>`).join("")}
      <path class="revenue-area" d="${area}"/>
      <polyline class="revenue-path" points="${points(revenue)}"/>
      <polyline class="spend-path" points="${points(spend)}"/>
      ${labels.map((label,i)=>`<text class="axis-text" x="${54+i*95}" y="235" text-anchor="middle">${label}</text>`).join("")}
    </svg>`;
}

function campaignRow(campaign, withOwner = false) {
  return `<tr data-search="${`${campaign.name} ${campaign.market} ${campaign.owner}`.toLowerCase()}" data-status="${campaign.status}">
    <td class="campaign-name"><strong>${campaign.name}</strong><small>${[campaign.market,campaign.account].filter(Boolean).join(" · ")}</small></td>
    <td><span class="platform-badge">${platformDot(campaign.platform)}${campaign.platform}</span></td>
    ${withOwner ? `<td>${campaign.owner}</td>` : ""}
    <td><strong>${campaign.spend}</strong></td><td><strong>${campaign.revenue}</strong></td>
    ${withOwner ? `<td>${campaign.installs}</td><td>${campaign.registrations}</td><td>${campaign.ctr}</td><td>${campaign.cvr}</td><td>${campaign.cpi}</td><td>${campaign.roasD1}</td><td><strong>${campaign.roas}</strong></td>` : `<td><strong>${campaign.roas}</strong></td><td>${campaign.cpa}</td><td>${campaign.registrations}</td><td><svg class="sparkline ${campaign.trend === "down" ? "down" : ""}" viewBox="0 0 64 21"><path d="${campaign.trend === "up" ? "M1 18L13 14L24 15L36 7L48 9L63 2" : "M1 4L13 7L24 6L36 13L48 11L63 18"}"/></svg></td>`}
    <td>${statusPill(campaign.status)}</td></tr>`;
}

function renderCampaigns() {
  const { campaigns, factor } = getCommandSelection();
  const prioritized = [...campaigns].sort((a,b)=>{
    const order = {"At risk":0,"Scaling":1,"Watch":2};
    return order[a.status]-order[b.status];
  }).slice(0,4).map(c=>({
    ...c,
    market:c.business || c.market || "Meta",
    spend:commandMoney(numeric(c.spend)*factor),
    revenue:commandMoney(numeric(c.revenue)*factor),
    cpa:purchaseCount(c) ? commandMoney(purchaseCpa(numeric(c.spend),purchaseCount(c))) : "—",
    cpi:numeric(c.cpi) ? commandMoney(numeric(c.cpi)) : "—",
    installs:commandNumber(numeric(c.installs)*factor),
    registrations:commandNumber(numeric(c.registrations)*factor),
    ctr:typeof c.ctr === "number" ? `${c.ctr.toFixed(2)}%` : c.ctr,
    cvr:typeof c.cvr === "number" ? `${c.cvr.toFixed(2)}%` : c.cvr,
    roas:typeof c.roas === "number" ? `${c.roas.toFixed(2)}x` : c.roas
  }));
  document.querySelector("#campaign-preview").innerHTML = prioritized.length
    ? prioritized.map(c => campaignRow(c)).join("")
    : `<tr><td colspan="9">Không có campaign trong phạm vi đã chọn.</td></tr>`;
}

function renderCommandPlatforms() {
  const { campaigns, factor } = getCommandSelection();
  // Always show all three platforms so gaps in coverage stay visible.
  const names = commandPlatform === "all" ? ["Meta","Google","TikTok"] : [commandPlatformNames[commandPlatform]];
  document.querySelector("#command-platform-performance").innerHTML = names.map(platform=>{
    const rows = campaigns.filter(row=>row.platform===platform);
    const totals = rows.reduce((sum,row)=>({
      spend:sum.spend+numeric(row.spend), revenue:sum.revenue+numeric(row.revenue),
      installs:sum.installs+numeric(row.installs), registrations:sum.registrations+numeric(row.registrations), purchases:sum.purchases+purchaseCount(row)
    }),{spend:0,revenue:0,installs:0,registrations:0,purchases:0});
    const spend=totals.spend*factor, revenue=totals.revenue*factor, registrations=totals.registrations*factor, purchases=totals.purchases*factor;
    return `<div class="command-platform-row">
      <div><span>${platformDot(platform)}<strong>${platform}</strong></span><small>${rows.length} campaign đang theo dõi</small></div>
      <dl><div><dt>Spend</dt><dd>${commandMoney(spend)}</dd></div><div><dt>Register</dt><dd>${commandNumber(registrations)}</dd></div><div><dt>CPA Purchase</dt><dd>${purchases?commandMoney(spend/purchases):"—"}</dd></div><div><dt>ROAS</dt><dd>${spend?`${(revenue/spend).toFixed(2)}x`:"—"}</dd></div></dl>
    </div>`;
  }).join("");
}

function renderCommandRisk() {
  const alerts = getCommandAlerts();
  const risk = alerts.reduce((sum,row)=>sum+(row.riskValue||0),0);
  const ownerCoverage = Math.round(alerts.filter(row=>row.owner).length/Math.max(alerts.length,1)*100);
  const dataReady = commandDataReady();
  document.querySelector("#command-risk-value").textContent = dataReady ? commandMoney(risk) : "—";
  document.querySelector("#command-risk-count").textContent = dataReady ? alerts.length : "—";
  document.querySelector("#command-owner-coverage").textContent = dataReady ? `${ownerCoverage}% đã có owner` : "Chưa có dữ liệu owner";
  document.querySelector("#command-risk-gauge").style.width = `${dataReady ? ownerCoverage : 0}%`;
  document.querySelector("#command-queue-count").textContent = dataReady ? `${alerts.length} việc` : "—";
  const connectedSources = Object.entries(commandLiveData?.sourceStates || {}).filter(([,state])=>state==="connected").map(([source])=>source);
  document.querySelector("#command-brief-copy").textContent = commandLiveAttempted
    ? `Số liệu ${connectedSources.length ? connectedSources.join(" + ") : "nền tảng"} · ${commandAccount === "all" ? "Tất cả tài khoản đã chọn" : "1 tài khoản quảng cáo"}.`
    : isDemoMode() ? "Dữ liệu mẫu để xem trước giao diện." : "Đang chờ dữ liệu nền tảng thật.";
}

function strategyGroupForCampaign(campaign) {
  const name=String(campaign.name||"").toLowerCase();
  if(/retarget|re-engage|remarket/.test(name)) return "retargeting";
  if(/retention|revive|reactivat|engage/.test(name)) return "retention";
  return "acquisition";
}

function getStrategyStatusData() {
  const { campaigns, factor }=getCommandSelection();
  const strategies=[
    {id:"acquisition",name:"Acquisition",note:"Prospecting & new users",color:"#6d5dfc"},
    {id:"retargeting",name:"Retargeting",note:"High-intent & re-engagement",color:"#0aae9c"},
    {id:"retention",name:"Retention",note:"Engaged & returning users",color:"#ff667f"}
  ];
  return strategies.map(strategy=>{
    const rows=campaigns.filter(row=>strategyGroupForCampaign(row)===strategy.id);
    const totals=rows.reduce((sum,row)=>({spend:sum.spend+numeric(row.spend),revenue:sum.revenue+numeric(row.revenue),installs:sum.installs+numeric(row.installs),registrations:sum.registrations+numeric(row.registrations),impressions:sum.impressions+numeric(row.impressions)}),{spend:0,revenue:0,installs:0,registrations:0,impressions:0});
    const spend=totals.spend*factor,revenue=totals.revenue*factor,installs=totals.installs*factor,registrations=totals.registrations*factor,impressions=totals.impressions*factor;
    const roas=spend?revenue/spend:0;
    const curve=strategy.id==="acquisition"?[.72,.81,.78,.93,.88,1.06,1]:strategy.id==="retargeting"?[.56,.72,.66,.85,.78,.92,1]:[.46,.51,.67,.59,.75,.82,1];
    const daily=curve.map((weight,index)=>({
      label:["T2","T3","T4","T5","T6","T7","CN"][index],
      spend:spend*weight/curve.reduce((sum,item)=>sum+item,0),
      revenue:revenue*weight/curve.reduce((sum,item)=>sum+item,0),
      roas:roas*(.9+index*.03),
      ctr:rows.length?rows.reduce((sum,row)=>sum+numeric(row.ctr),0)/rows.length*(.86+index*.035):0,
      // CPM is cost per 1,000 impressions. This previously divided by installs,
      // which is CPI, so the chart plotted a different metric than its label.
      cpm:impressions?spend/impressions*1000*(.72+index*.06):0
    }));
    return {...strategy,rows,spend,revenue,installs,registrations,impressions,roas,daily};
  });
}

function strategyLinePath(values,width=260,height=118,padding=16) {
  const max=Math.max(...values,1), min=Math.min(...values,0), range=Math.max(max-min,1);
  return values.map((value,index)=>`${index?"L":"M"}${padding+index*(width-padding*2)/Math.max(values.length-1,1)} ${height-padding-(value-min)/range*(height-padding*2)}`).join(" ");
}

function strategyChartSvg(primary,secondary,primaryColor,secondaryColor="#5b4ee5",compact=false) {
  const width=compact?278:760, height=compact?164:250, padding=compact?18:28;
  const primaryPath=strategyLinePath(primary,width,height,padding), secondaryPath=strategyLinePath(secondary,width,height,padding);
  const grid=[.2,.5,.8].map(point=>`<line x1="${padding}" x2="${width-padding}" y1="${Math.round(height*point)}" y2="${Math.round(height*point)}" class="strategy-grid-line"/>`).join("");
  return `<svg class="strategy-time-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Biểu đồ xu hướng theo ngày">${grid}<path d="${primaryPath}" class="strategy-area" style="--strategy-color:${primaryColor}"></path><path d="${primaryPath}" class="strategy-line primary" style="--strategy-color:${primaryColor}"></path><path d="${secondaryPath}" class="strategy-line secondary" style="--strategy-color:${secondaryColor}"></path></svg>`;
}

function renderStrategyOverview() {
  const container=document.querySelector("#strategy-overview-list");
  if(!container) return;
  const strategies=getStrategyStatusData();
  const isSpendRoas=strategyOverviewMetric==="spend-roas";
  container.innerHTML=`<div class="strategy-chart-controls"><span>Hiển thị</span><button class="${isSpendRoas?"active":""}" data-strategy-overview-metric="spend-roas">Amount Spent + ROAS</button><button class="${!isSpendRoas?"active":""}" data-strategy-overview-metric="revenue-roas">Revenue + ROAS</button></div><div class="strategy-funnel-grid">${strategies.map(strategy=>{
    const primary=isSpendRoas?strategy.daily.map(day=>day.spend):strategy.daily.map(day=>day.revenue);
    const secondary=strategy.daily.map(day=>day.roas);
    return `<article class="strategy-funnel-chart"><header><div><strong>${strategy.name}</strong><small>${strategy.rows.length} campaign · ${strategy.note}</small></div><span style="--strategy-color:${strategy.color}"></span></header><div class="strategy-mini-legend"><span><i style="--strategy-color:${strategy.color}"></i>${isSpendRoas?"Amount Spent":"Revenue"}</span><span><i class="roas-line"></i>ROAS</span></div>${strategyChartSvg(primary,secondary,strategy.color,"#392b83",true)}<footer><span>${strategy.daily[0]?.label||""}</span><span>${strategy.daily.at(-1)?.label||""}</span></footer></article>`;
  }).join("")}</div>`;
}

function renderStrategyDrilldown() {
  const container=document.querySelector("#strategy-drilldown-chart");
  if(!container) return;
  const strategies=getStrategyStatusData();
  const strategy=strategies.find(item=>item.id===strategyDrilldownGroup)||strategies[0];
  const isRevenueSpend=strategyDrilldownMetric==="revenue-spend";
  const primary=isRevenueSpend?strategy.daily.map(day=>day.revenue):strategy.daily.map(day=>day.ctr);
  const secondary=isRevenueSpend?strategy.daily.map(day=>day.spend):strategy.daily.map(day=>day.cpm);
  container.innerHTML=`<div class="strategy-drilldown-tabs">${strategies.map(item=>`<button class="${item.id===strategy.id?"active":""}" data-strategy-drill-group="${item.id}">${item.name}</button>`).join("")}</div><div class="strategy-drilldown-metrics"><button class="${isRevenueSpend?"active":""}" data-strategy-drill-metric="revenue-spend"><i class="revenue-line"></i>Revenue</button><button class="${isRevenueSpend?"active":""}" data-strategy-drill-metric="revenue-spend"><i class="spend-line"></i>Amount Spent</button><button class="${!isRevenueSpend?"active":""}" data-strategy-drill-metric="ctr-cpm"><i class="ctr-line"></i>CTR</button><button class="${!isRevenueSpend?"active":""}" data-strategy-drill-metric="ctr-cpm"><i class="cpm-line"></i>CPM</button></div><div class="strategy-drilldown-plot">${strategyChartSvg(primary,secondary,strategy.color,isRevenueSpend?"#0aae9c":"#ff9d42",false)}</div><div class="strategy-drilldown-axis">${strategy.daily.map(day=>`<span>${day.label}</span>`).join("")}</div><footer class="strategy-drilldown-summary"><span><b>${strategy.name}</b> · ${strategy.rows.length} campaign</span><span>Spend ${strategy.spend?commandMoney(strategy.spend):"—"}</span><span>Revenue ${strategy.revenue?commandMoney(strategy.revenue):"—"}</span><span>ROAS ${strategy.roas?`${strategy.roas.toFixed(2)}x`:"—"}</span></footer>`;
}

function getCommandAlerts() {
  if(commandLiveAttempted || !isDemoMode()) return [];
  const campaignNames = new Set(getCommandSelection().campaigns.map(row=>row.name));
  return data.alerts.filter(alert=>campaignNames.has(alert.campaign));
}

function initializeCommandDateControls() {
  const to = new Date();
  const from = new Date(to); from.setDate(from.getDate() - 6);
  const localIso = date => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
  const fromInput = document.querySelector("#command-date-from");
  const toInput = document.querySelector("#command-date-to");
  if(fromInput) fromInput.value = localIso(from);
  if(toInput) toInput.value = localIso(to);
  refreshCommandScopeOptions();
}

function renderCommandLiveStatus(message, note, tone="loading") {
  const status=document.querySelector("#command-live-status");
  if(!status) return;
  status.dataset.tone=tone;
  status.querySelector("strong").textContent=message;
  status.querySelector("small").textContent=note;
}

// Command Center keeps the shared cross-platform metrics: it reads Meta, Google
// and TikTok in parallel and blends them into one set of totals. Per-platform
// drilldown lives in the platform workspaces.
const commandSources = [
  { id:"Meta", endpoint:"/api/meta-accounts" },
  { id:"Google", endpoint:"/api/google-accounts" },
  { id:"TikTok", endpoint:"/api/tiktok-accounts" }
];

async function loadCommandMetaData() {
  if(!window.__uaSessionToken || commandLiveLoading) return;
  const range=commandRangeDetails();
  if(!range.from || !range.to) return renderCommandLiveStatus("Khoảng ngày chưa hợp lệ","Vui lòng kiểm tra ngày bắt đầu và kết thúc.","error");
  commandLiveLoading=true;
  commandLiveAttempted=true;
  commandLiveData={campaigns:[],daily:[],accounts:commandScopeAccounts,currency:"VND",sourceStates:{}};
  // A platform tab narrows the blend to that single source.
  const selected=commandPlatformNames[commandPlatform];
  const sources=commandSources.filter(source=>!selected || source.id===selected);
  renderCommandLiveStatus(`Đang đồng bộ ${sources.map(source=>source.id).join(" + ")}`,`${range.from} → ${range.to}`);
  renderCommandCenter();

  const results=await Promise.allSettled(sources.map(async source=>{
    const params=new URLSearchParams({mode:"insights",level:"campaign",from:range.from,to:range.to,business:commandBusiness,account:commandAccount});
    const response=await fetch(`${source.endpoint}?${params}`,{headers:metaAuthHeaders()});
    const payload=await response.json().catch(()=>({}));
    if(!response.ok) throw Object.assign(new Error(payload.error || `Không thể đọc ${source.id}.`),{source:source.id});
    return {source:source.id,payload};
  }));

  const fulfilled=results.filter(result=>result.status==="fulfilled").map(result=>result.value);
  const failures=results.filter(result=>result.status==="rejected").map(result=>({
    source:result.reason?.source || "Nguồn quảng cáo",
    message:result.reason?.message || "Không thể đồng bộ"
  }));

  const campaigns=fulfilled.flatMap(result=>(result.payload.campaigns||[]).map(row=>({...row,platform:row.platform||result.source})));
  const accounts=fulfilled.flatMap(result=>(result.payload.accounts||[]).map(row=>({...row,platform:result.source})));
  // Daily buckets are summed per date so the chart shows blended spend/revenue.
  const dailyMap=new Map();
  fulfilled.forEach(result=>(result.payload.daily||[]).forEach(row=>{
    const current=dailyMap.get(row.date) || {date:row.date,spend:0,revenue:0,installs:0,registrations:0};
    ["spend","revenue","installs","registrations"].forEach(metric=>{ current[metric]+=numeric(row[metric]); });
    dailyMap.set(row.date,current);
  }));
  const daily=[...dailyMap.values()].sort((a,b)=>a.date.localeCompare(b.date));
  const currencies=[...new Set(fulfilled.map(result=>result.payload.currency).filter(Boolean))];

  commandLiveData={
    campaigns, daily, accounts,
    currency:currencies.length===1?currencies[0]:"MIXED",
    partialErrors:fulfilled.flatMap(result=>result.payload.partialErrors||[]),
    syncedAt:fulfilled.map(result=>result.payload.syncedAt).filter(Boolean).sort().at(-1),
    sourceStates:Object.fromEntries([
      ...fulfilled.map(result=>[result.source,"connected"]),
      ...failures.map(result=>[result.source,"unavailable"])
    ])
  };
  commandScopeAccounts=[...new Map([...commandScopeAccounts,...accounts].map(row=>[`${row.platform||"Meta"}:${row.id}`,row])).values()];
  refreshCommandScopeOptions();

  if(fulfilled.length) {
    const syncTime=commandLiveData.syncedAt ? new Date(commandLiveData.syncedAt).toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"}) : "—";
    const note=[`${campaigns.length} campaign`,commandLiveData.currency,syncTime].filter(Boolean).join(" · ");
    const unavailable=failures.length ? ` · ${failures.map(result=>result.source).join(", ")} chưa kết nối` : "";
    renderCommandLiveStatus(`Đã đồng bộ ${fulfilled.map(result=>result.source).join(" + ")}`,`${note}${unavailable}`,failures.length||commandLiveData.partialErrors.length?"warning":"success");
    document.querySelector("#demo-banner")?.setAttribute("hidden","");
  } else {
    renderCommandLiveStatus("Chưa đọc được dữ liệu nền tảng",failures.map(result=>`${result.source}: ${result.message}`).join(" · ") || "Kiểm tra kết nối connector.","error");
  }
  commandLiveLoading=false;
  renderCommandCenter();
}

function renderCommandCenter() {
  renderMetrics();
  renderChart();
  renderQueue();
  renderCampaigns();
  renderCommandPlatforms();
  renderCommandRisk();
  renderStrategyOverview();
  renderStrategyDrilldown();
}

const adsUaNames = ["David","Tommy","Nelson"];
const adsLevelLabels = { campaign:"Campaign", adset:"Ad set", ad:"Ad", asset:"Asset" };
const inferAdsUa = name => adsUaNames.find(ua=>String(name || "").toLowerCase().includes(ua.toLowerCase())) || "Chưa nhận diện";
const adsStatusPill = status => {
  const tone = ["Active","Winner","Scaling"].includes(status) ? "green" : ["Limited","Fatigue"].includes(status) ? "red" : "amber";
  return `<span class="pill ${tone}">${status}</span>`;
};
const adsCommerceMetrics = row => {
  const linkClicks = Math.max(1,Math.round(row.installs * 4.15));
  const impressions = Math.max(linkClicks,Math.round(linkClicks / (row.trend === "up" ? .0238 : .0154)));
  const outboundClicks = Math.round(linkClicks * .74);
  const addsToCart = Math.max(0,Math.round(row.registrations * .61));
  const purchases = Math.max(0,Math.round(row.registrations * (row.roas >= 2 ? .22 : .12)));
  return {
    linkClicks,
    impressions,
    addsToCart,
    purchases,
    cpm: row.spend / impressions * 1000,
    ctr: linkClicks / impressions * 100,
    outboundCtr: outboundClicks / impressions * 100,
    costAtc: addsToCart ? row.spend / addsToCart : 0,
    costPurchase: purchases ? row.spend / purchases : 0
  };
};

// Campaign Center is split into one workspace per platform. Each workspace owns
// its own DOM prefix, filters, level, selection and live data so switching
// platforms never leaks scope or metrics across accounts.
const adsWorkspaceConfig = {
  meta: {
    platform:"Meta",
    product:"Meta Ads",
    endpoint:"/api/meta-accounts",
    view:"campaign-meta",
    scopeLabel:"BM",
    levelLabels:{ campaign:"Campaign", adset:"Ad set", ad:"Ad", asset:"Asset" },
    // Meta reports ad sets natively.
    apiLevel:level=>level,
    assetNote:"Asset chưa có API chuẩn hóa. Hãy dùng Creative workspace để xem dữ liệu creative.",
    // Tier 2 columns, hidden by default and toggled from the column panel.
    detailColumns:[
      { key:"reach", label:"Reach", format:"number" },
      { key:"frequency", label:"Frequency", format:"ratio" },
      { key:"costPer1kReached", label:"Cost / 1k reached", format:"money" },
      { key:"linkClicks", label:"Link clicks", format:"number" },
      { key:"costPerLinkClick", label:"CPC (link)", format:"money" },
      { key:"outboundClicks", label:"Outbound clicks", format:"number" },
      { key:"outboundCtr", label:"Outbound CTR", format:"percent" },
      { key:"thruPlays", label:"ThruPlay", format:"number" },
      { key:"costPerThruPlay", label:"Cost / ThruPlay", format:"money" },
      { key:"videoP25", label:"Video 25%", format:"number" },
      { key:"videoP50", label:"Video 50%", format:"number" },
      { key:"videoP75", label:"Video 75%", format:"number" },
      { key:"videoP100", label:"Video 100%", format:"number" },
      { key:"qualityRanking", label:"Quality ranking", format:"text" },
      { key:"engagementRanking", label:"Engagement ranking", format:"text" },
      { key:"conversionRanking", label:"Conversion ranking", format:"text" }
    ]
  },
  google: {
    platform:"Google",
    product:"Google Ads",
    endpoint:"/api/google-accounts",
    view:"campaign-google",
    scopeLabel:"MCC",
    levelLabels:{ campaign:"Campaign", adset:"Ad group", ad:"Ad", asset:"Asset" },
    apiLevel:level=>level==="adset" ? "adgroup" : level,
    assetNote:"Asset group cần Creative workspace để xem chi tiết.",
    detailColumns:[
      { key:"searchImpressionShare", label:"Search IS", format:"percent" },
      { key:"searchLostIsBudget", label:"Lost IS (budget)", format:"percent" },
      { key:"searchLostIsRank", label:"Lost IS (rank)", format:"percent" },
      { key:"averageCpc", label:"Avg. CPC", format:"money" },
      { key:"averageCpm", label:"Avg. CPM", format:"money" },
      { key:"averageCpv", label:"Avg. TrueView CPV", format:"money" },
      { key:"viewThroughConversions", label:"View-through conv.", format:"number" },
      { key:"interactionRate", label:"Interaction rate", format:"percent" },
      { key:"conversionRate", label:"Conversion rate", format:"percent" },
      { key:"channelType", label:"Channel type", format:"text" },
      { key:"channelSubType", label:"Campaign subtype", format:"text" },
      { key:"biddingStrategy", label:"Bidding strategy", format:"text" }
    ]
  },
  tiktok: {
    platform:"TikTok",
    product:"TikTok Ads",
    endpoint:"/api/tiktok-accounts",
    view:"campaign-tiktok",
    scopeLabel:"Business Center",
    levelLabels:{ campaign:"Campaign", adset:"Ad group", ad:"Ad", asset:"Asset" },
    // The TikTok endpoint maps adset to adgroup, matching the report data level.
    apiLevel:level=>level==="adset" ? "adgroup" : level,
    assetNote:"Creative asset cần Creative workspace để xem chi tiết.",
    // TikTok Tier 2 columns land once the connector is wired up.
    detailColumns:[]
  }
};

function createAdsWorkspace(key) {
  const config = adsWorkspaceConfig[key];
  const el = name => document.querySelector(`#${key}-${name}`);
  const state = {
    key,
    config,
    level:"campaign",
    business:"all",
    account:"all",
    liveData:null,
    liveAttempted:false,
    liveLoading:false,
    liveStatus:"idle",
    scopeAccounts:[],
    selectedIds:new Set(),
    // Tier 2 columns start hidden so the default table stays readable.
    visibleDetailColumns:new Set()
  };

  const money = (value, currency) => {
    if (!Number(value)) return "—";
    if (isDemoMode() && !state.liveAttempted) return `$${Number(value).toLocaleString("en-US")}`;
    const code = currency || state.liveData?.currency || "";
    if (code && code !== "VND" && code !== "MIXED") {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: code, maximumFractionDigits: 2 }).format(Number(value));
    }
    const formatted = Math.round(Number(value)).toLocaleString("vi-VN");
    return code === "MIXED" ? `${formatted} (mixed)` : `${formatted} ₫`;
  };
  // A null detail value means the platform does not report that metric for this
  // entity, which is different from a real zero.
  const formatDetail = (value, format, currency) => {
    if(value === null || value === undefined || value === "") return "—";
    if(format === "money") return money(value, currency);
    if(format === "percent") return `${Number(value).toFixed(2)}%`;
    if(format === "ratio") return Number(value).toFixed(2);
    if(format === "text") return String(value).replaceAll("_"," ").toLowerCase();
    return Math.round(Number(value)).toLocaleString("vi-VN");
  };
  const activeDetailColumns = () => (config.detailColumns || []).filter(column=>state.visibleDetailColumns.has(column.key));

  function renderColumnPanel() {
    const panel = el("ads-column-panel");
    const host = panel?.querySelector("[data-column-options]");
    if(!host) return;
    const columns = config.detailColumns || [];
    if(!columns.length) {
      host.innerHTML = `<small>${config.product} chưa có cột riêng.</small>`;
      return;
    }
    host.innerHTML = columns.map(column=>`
      <label class="ads-column-option">
        <input type="checkbox" data-detail-column="${column.key}" ${state.visibleDetailColumns.has(column.key)?"checked":""} />
        <span>${column.label}</span>
      </label>`).join("");
  }
  const levelLabel = level => config.levelLabels[level] || adsLevelLabels[level];

  function rangeDetails() {
    const mode = el("ads-date-range")?.value || "7";
    const iso = date => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
    if(mode !== "custom") {
      const to = new Date(), from = new Date(to);
      if(mode === "yesterday") { from.setDate(from.getDate()-1); to.setDate(to.getDate()-1); }
      else if(mode !== "today") from.setDate(from.getDate()-(Number(mode)-1));
      return { from:iso(from), to:iso(to) };
    }
    return { from:el("ads-date-from")?.value || "", to:el("ads-date-to")?.value || "" };
  }

  function initializeDateControls() {
    const to = new Date(), from = new Date(to);
    from.setDate(from.getDate()-6);
    const iso = date => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
    const fromInput = el("ads-date-from"), toInput = el("ads-date-to");
    if(fromInput) fromInput.value = iso(from);
    if(toInput) toInput.value = iso(to);
  }

  function refreshScopeOptions() {
    const businessSelect = el("ads-business-filter"), accountSelect = el("ads-account-filter");
    if(!businessSelect || !accountSelect) return;
    const accounts = state.scopeAccounts;
    const businesses = [...new Map(accounts.filter(row=>row.businessId).map(row=>[row.businessId,{id:row.businessId,name:row.businessName}])).values()];
    businessSelect.innerHTML = `<option value="all">Tất cả ${config.scopeLabel}</option>${businesses.map(row=>`<option value="${row.id}">${row.name}</option>`).join("")}`;
    if(businesses.some(row=>row.id===state.business)) businessSelect.value = state.business; else state.business = "all";
    const scoped = accounts.filter(row=>state.business==="all" || row.businessId===state.business);
    accountSelect.innerHTML = `<option value="all">Tất cả tài khoản</option>${scoped.map(row=>`<option value="${row.id}">${row.name}</option>`).join("")}`;
    if(scoped.some(row=>row.id===state.account)) accountSelect.value = state.account; else state.account = "all";
  }

  function scopeLabel() {
    const accounts = state.liveData?.accounts || state.scopeAccounts || [];
    const business = state.business === "all"
      ? [...new Set(accounts.map(row=>row.businessName).filter(Boolean))].join(", ") || `Tất cả ${config.scopeLabel}`
      : (accounts.find(row=>row.businessId===state.business)?.businessName || `${config.scopeLabel} đã chọn`);
    const account = state.account === "all"
      ? "Tất cả tài khoản"
      : (accounts.find(row=>row.id===state.account)?.name || "Tài khoản đã chọn");
    return `${config.scopeLabel}: ${business} · ${account}`;
  }

  // Demo rows keep the same shape as live rows so the table renders before any
  // connector is attached.
  function demoRows() {
    return (adsManagerData[state.level] || []).filter(row=>row.platform===config.platform);
  }

  function liveRows() {
    if(!state.liveAttempted) return isDemoMode() ? demoRows() : [];
    return (state.liveData?.campaigns || []).map(row=>{
      const name = row.entityName || row.name;
      const scope = [row.business,row.account].filter(Boolean).join(" · ");
      const parent = state.level === "ad"
        ? [row.adsetName || row.campaignName,scope].filter(Boolean).join(" · ")
        : state.level === "adset" ? [row.campaignName,scope].filter(Boolean).join(" · ") : scope;
      const entityId = row.entityId || row.campaignId;
      return {
        id:`${config.platform}:${row.accountId||""}:${entityId}`, entityId, name, parent, platform:config.platform,
        owner:inferAdsUa(row.campaignName || name), businessId:row.businessId, accountId:row.accountId,
        budget:Number(row.budget||0), spend:Number(row.spend||0), revenue:Number(row.revenue||0), currency:row.currency || state.liveData?.currency || "",
        registrations:Number(row.registrations||0), installs:Number(row.installs||0), cpi:Number(row.cpi||0),
        roas:Number(row.roas||0), impressions:Number(row.impressions||0), clicks:Number(row.clicks||0),
        // Meta returns link clicks alongside total clicks; keep them so CTR and
        // CPC in the table match the Command center.
        linkClicks:row.linkClicks == null ? null : Number(row.linkClicks),
        purchases:row.purchases == null ? null : Number(row.purchases), ctr:row.ctr, cvr:row.cvr, detail:row.detail || {},
        status:`${config.platform} live`, active:true, trend:row.trend || "up"
      };
    });
  }

  function getRows() {
    const query = (el("ads-manager-search")?.value || "").trim().toLowerCase();
    const status = el("ads-status-filter")?.value || "all";
    const owner = el("ads-ua-filter")?.value || "all";
    return liveRows().filter(row =>
      (!query || `${row.name} ${row.parent} ${row.owner} ${row.id}`.toLowerCase().includes(query)) &&
      (status === "all" || row.status === status) &&
      (owner === "all" || (owner === "unassigned" ? row.owner === "Chưa nhận diện" : row.owner === owner)) &&
      (state.business === "all" || row.businessId === state.business) &&
      (state.account === "all" || row.accountId === state.account)
    );
  }

  async function load() {
    if(!window.__uaSessionToken || state.liveLoading) return;
    const range = rangeDetails();
    if(!range.from || !range.to || range.from > range.to) return showToast(`Khoảng ngày ${config.product} chưa hợp lệ.`);
    state.liveLoading = true;
    state.liveAttempted = true;
    state.liveStatus = "loading";
    state.liveData = { campaigns:[], accounts:state.scopeAccounts, daily:[] };
    if(el("ads-source-copy")) el("ads-source-copy").textContent = `Đang đồng bộ ${config.product} theo phạm vi đã chọn…`;
    render();

    if(state.level === "asset") {
      state.liveLoading = false;
      state.liveStatus = "unsupported";
      if(el("ads-source-copy")) el("ads-source-copy").textContent = config.assetNote;
      if(el("ads-scope-count")) el("ads-scope-count").textContent = scopeLabel();
      if(el("ads-last-sync")) el("ads-last-sync").textContent = "Chưa hỗ trợ";
      return render();
    }

    try {
      const params = new URLSearchParams({
        mode:"insights", level:config.apiLevel(state.level),
        from:range.from, to:range.to, business:state.business, account:state.account
      });
      // Only Meta exposes an attribution selector; the other platforms ignore it.
      const attribution = el("ads-attribution")?.value;
      if(attribution) params.set("attribution", attribution);
      const response = await fetch(`${config.endpoint}?${params}`,{headers:metaAuthHeaders()});
      const payload = await response.json().catch(()=>({}));
      if(!response.ok) throw new Error(payload.error || `Không thể đọc ${config.product}.`);
      const accounts = (payload.accounts || []).map(account=>({...account,platform:config.platform}));
      state.liveData = { ...payload, accounts };
      state.liveStatus = "success";
      state.scopeAccounts = [...new Map([...(state.scopeAccounts||[]),...accounts].map(row=>[row.id,row])).values()];
      refreshScopeOptions();
      const notes = [`Đã đồng bộ ${config.product}`];
      // Stating the window makes a number reconcilable against Ads Manager.
      if(payload.attribution?.length) notes.push(`attribution ${payload.attribution.join(" + ")}`);
      if(payload.partialErrors?.length) notes.push(`${payload.partialErrors.length} tài khoản cần kiểm tra`);
      if(key === "google") {
        const unmappedConversions = (payload.campaigns || []).reduce((sum,row)=>sum + Number(row.uncategorisedConversions || 0),0);
        if(unmappedConversions) notes.push(`${Math.round(unmappedConversions).toLocaleString("vi-VN")} conversion chưa phân loại`);
      }
      if(el("ads-source-copy")) el("ads-source-copy").textContent = `${notes.join(" · ")} · ${scopeLabel()}.`;
      if(el("ads-scope-count")) el("ads-scope-count").textContent = `${scopeLabel()} · ${accounts.length} accounts`;
      if(el("ads-last-sync")) el("ads-last-sync").innerHTML = payload.syncedAt
        ? `<i></i>${new Date(payload.syncedAt).toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"})}`
        : "Chưa đồng bộ";
    } catch(error) {
      state.liveData = { campaigns:[], accounts:state.scopeAccounts, daily:[] };
      state.liveStatus = "error";
      if(el("ads-source-copy")) el("ads-source-copy").textContent = `${config.product}: ${error.message}`;
      if(el("ads-scope-count")) el("ads-scope-count").textContent = scopeLabel();
      if(el("ads-last-sync")) el("ads-last-sync").textContent = "Chưa đồng bộ";
    } finally {
      state.liveLoading = false;
      render();
    }
  }

  function renderSelectionSummary(rows) {
    const container = el("ads-selection-summary");
    if(!container) return;
    const selected = rows.filter(row=>state.selectedIds.has(row.id));
    const awaitingData = !isDemoMode() && ["idle","loading","error","unsupported"].includes(state.liveStatus);
    const scope = selected.length ? selected : rows;
    const totals = scope.reduce((sum,row)=>({
      spend:sum.spend+Number(row.spend||0), revenue:sum.revenue+Number(row.revenue||0),
      registrations:sum.registrations+Number(row.registrations||0), installs:sum.installs+Number(row.installs||0),
      impressions:sum.impressions+Number(row.impressions||0), clicks:sum.clicks+Number(row.clicks||0),
      purchases:sum.purchases + (state.liveAttempted
        ? Number(row.purchases ?? 0)
        : Number(row.purchases ?? adsCommerceMetrics(row).purchases ?? 0))
    }),{spend:0,revenue:0,registrations:0,installs:0,impressions:0,clicks:0,purchases:0});
    const cpi = totals.installs?totals.spend/totals.installs:0;
    const cpr = totals.registrations?totals.spend/totals.registrations:0;
    const cpa = totals.purchases?totals.spend/totals.purchases:0;
    const roas = totals.spend?totals.revenue/totals.spend:0;
    const statusNote = state.liveStatus === "loading" ? "Đang đồng bộ dữ liệu" : state.liveStatus === "error" ? "Chưa thể đọc dữ liệu" : state.liveStatus === "unsupported" ? "Cấp dữ liệu chưa được hỗ trợ" : "Đang xác thực kết nối";
    const note = awaitingData ? `${statusNote} · ${scopeLabel()}` : `${selected.length?`${selected.length} ${levelLabel(state.level).toLowerCase()} đã chọn`:`${rows.length} ${levelLabel(state.level).toLowerCase()} trong phạm vi`} · ${scopeLabel()}`;
    const metrics = awaitingData
      ? [["Spend","—"],["Revenue","—"],["ROAS","—"],["CPA (Purchase)","—"],["Purchases","—"],["Registrations","—"],["CPI","—"],["CPR (Register)","—"]]
      : [["Spend",money(totals.spend)],["Revenue",money(totals.revenue)],["ROAS",totals.spend?`${roas.toFixed(2)}x`:"—"],["CPA (Purchase)",money(cpa)],["Purchases",totals.purchases.toLocaleString("vi-VN")],["Registrations",totals.registrations.toLocaleString("vi-VN")],["CPI",money(cpi)],["CPR (Register)",money(cpr)]];
    container.innerHTML = metrics.map(([label,value])=>`<div><span>${label}</span><strong>${value}</strong><small>${note}</small></div>`).join("");
  }

  function updateSelection() {
    const body = el("ads-manager-table-body");
    if(!body) return;
    const checked = body.querySelectorAll(".ads-row-check:checked").length;
    const label = el("ads-selection-count");
    if(label) label.textContent = `${checked} đã chọn`;
    const all = el("ads-select-all");
    const available = body.querySelectorAll(".ads-row-check").length;
    if(all) {
      all.checked = available > 0 && checked === available;
      all.indeterminate = checked > 0 && checked < available;
    }
    renderSelectionSummary(getRows());
  }

  function render() {
    const rows = getRows();
    const body = el("ads-manager-table-body");
    if(!body) return;
    if(el("ads-name-heading")) el("ads-name-heading").textContent = levelLabel(state.level);
    const detailColumns = activeDetailColumns();
    // Header cells for the toggled Tier 2 columns are inserted before the row
    // menu column so the base table markup stays untouched.
    const headRow = document.querySelector(`#${config.view} thead tr`);
    if(headRow) {
      headRow.querySelectorAll("[data-detail-head]").forEach(node=>node.remove());
      const anchor = headRow.lastElementChild;
      detailColumns.forEach(column=>{
        const cell = document.createElement("th");
        cell.dataset.detailHead = column.key;
        cell.textContent = column.label;
        headRow.insertBefore(cell, anchor);
      });
    }
    body.innerHTML = rows.map(row=>{
      const commerce = state.liveAttempted ? null : adsCommerceMetrics(row);
      const impressions = state.liveAttempted
        ? Number(row.impressions ?? 0)
        : Number(row.impressions || commerce.impressions || 0);
      const clicks = state.liveAttempted
        ? Number(row.linkClicks ?? row.clicks ?? 0)
        : Number(row.linkClicks || row.clicks || commerce.linkClicks || 0);
      const purchases = state.liveAttempted
        ? Number(row.purchases ?? 0)
        : Number(row.purchases ?? commerce.purchases ?? 0);
      const ctr = Number.isFinite(Number(row.ctr)) ? Number(row.ctr) : (impressions ? clicks/impressions*100 : 0);
      const cvr = Number.isFinite(Number(row.cvr)) ? Number(row.cvr) : (clicks ? Number(row.installs||0)/clicks*100 : 0);
      const cpc = clicks ? Number(row.spend||0)/clicks : 0;
      const cpm = impressions ? Number(row.spend||0)/impressions*1000 : 0;
      const cpa = purchases ? Number(row.spend||0)/purchases : 0;
      const optimization = state.level === "adset" ? "AI bidding" : state.level === "asset" ? "Asset rule" : row.roas >= 2.5 ? "ROAS guardrail" : "";
      return `
    <tr data-ads-row="${row.id}">
      <td><input class="ads-row-check" type="checkbox" data-ads-row-check="${row.id}" ${state.selectedIds.has(row.id)?"checked":""} aria-label="Chọn ${row.name}" /></td>
      <td><button class="ads-switch ${row.active ? "on" : ""}" data-ads-switch="${row.id}" aria-label="${row.active ? "Tạm dừng" : "Bật"} ${row.name}"></button></td>
      <td class="ads-entity"><strong>${row.name}</strong><small>${row.parent} · ${row.id}</small></td>
      <td>${row.owner}</td>
      <td><div class="ads-performance ${row.trend === "down" ? "down" : ""}"><svg viewBox="0 0 75 23" aria-label="Performance ${row.trend}"><polyline points="${row.trend === "up" ? "2,19 15,14 27,16 40,8 53,10 72,3" : "2,4 15,8 27,6 40,14 53,11 72,20"}"/></svg></div></td>
      <td>${row.budget ? `${money(row.budget,row.currency)}/day` : "—"}</td>
      <td><strong>${money(row.spend,row.currency)}</strong></td>
      <td><strong>${money(row.revenue,row.currency)}</strong></td>
      <td><strong>${row.roas.toFixed(2)}x</strong></td>
      <td><strong>${money(cpa,row.currency)}</strong></td>
      <td>${purchases.toLocaleString("en-US")}</td>
      <td>${row.registrations.toLocaleString("en-US")}</td>
      <td>${row.installs.toLocaleString("en-US")}</td>
      <td>${money(row.cpi,row.currency)}</td>
      <td>${impressions.toLocaleString("en-US")}</td>
      <td>${clicks.toLocaleString("en-US")}</td>
      <td>${ctr.toFixed(2)}%</td>
      <td>${money(cpc,row.currency)}</td>
      <td>${money(cpm,row.currency)}</td>
      <td>${cvr.toFixed(2)}%</td>
      <td>${adsStatusPill(row.status)}</td>
      <td><span class="ads-optimization ${optimization ? "" : "none"}">${optimization || "None"}</span></td>
      ${detailColumns.map(column=>`<td>${formatDetail(row.detail?.[column.key], column.format, row.currency)}</td>`).join("")}
      <td><button class="ads-row-menu" data-ads-menu="${row.id}" aria-label="Mở menu ${row.name}">⋮</button></td>
    </tr>`;
    }).join("") || `<tr><td colspan="${23 + detailColumns.length}"><div class="empty-state">${state.liveLoading ? `Đang đồng bộ ${levelLabel(state.level)} từ ${config.product}…` : state.level==="asset" ? config.assetNote : `Không có dữ liệu ${config.product} phù hợp. Kiểm tra kết nối hoặc bộ lọc.`}</div></td></tr>`;

    const totals = rows.reduce((sum,row)=>({
      spend:sum.spend+row.spend, revenue:sum.revenue+row.revenue, registrations:sum.registrations+row.registrations,
      installs:sum.installs+row.installs, purchases:sum.purchases + (state.liveAttempted
        ? Number(row.purchases ?? 0)
        : Number(row.purchases ?? adsCommerceMetrics(row).purchases ?? 0))
    }),{spend:0,revenue:0,registrations:0,installs:0,purchases:0});
    const blendedCpi = totals.installs ? totals.spend / totals.installs : 0;
    const blendedRoas = totals.spend ? totals.revenue / totals.spend : 0;
    // The trailing colspan absorbs the delivery columns plus any toggled Tier 2
    // columns, so the footer keeps aligning with the header.
    const footerUnavailable = !isDemoMode() && state.liveStatus !== "success";
    if(el("ads-manager-table-foot")) el("ads-manager-table-foot").innerHTML = `<tr><td colspan="6">${footerUnavailable ? "Dữ liệu chưa sẵn sàng" : `Kết quả từ ${rows.length} ${levelLabel(state.level).toLowerCase()}`}</td><td>${footerUnavailable?"—":money(totals.spend)}</td><td>${footerUnavailable?"—":money(totals.revenue)}</td><td>${footerUnavailable||!totals.spend?"—":`${blendedRoas.toFixed(2)}x`}</td><td>${footerUnavailable?"—":money(purchaseCpa(totals.spend,totals.purchases))}</td><td>${footerUnavailable?"—":totals.purchases.toLocaleString("en-US")}</td><td>${footerUnavailable?"—":totals.registrations.toLocaleString("en-US")}</td><td>${footerUnavailable?"—":totals.installs.toLocaleString("en-US")}</td><td>${footerUnavailable?"—":money(Number(blendedCpi.toFixed(2)))}</td><td colspan="${9 + detailColumns.length}"></td></tr>`;

    document.querySelectorAll(`#${config.view} .ads-level-tabs button`).forEach(button=>{
      button.classList.toggle("active",button.dataset[`${key}Level`]===state.level);
    });
    // Only the active level is fetched, so other tabs show a placeholder rather
    // than a stale count from a previous level.
    ["campaign","adset","ad","asset"].forEach(level=>{
      const counter = el(`ads-count-${level}`);
      if(!counter) return;
      counter.textContent = level===state.level
        ? rows.length
        : (isDemoMode() && !state.liveAttempted ? (adsManagerData[level]||[]).filter(row=>row.platform===config.platform).length : "·");
    });
    const activeFilters = [el("ads-ua-filter"),el("ads-business-filter"),el("ads-account-filter"),el("ads-status-filter")]
      .map(node=>node?.value || "all").filter(value=>value!=="all").length;
    if(el("ads-filter-count")) el("ads-filter-count").textContent = activeFilters;
    updateSelection();
  }

  function renderSignals() {
    const container = el("ads-workspace-signals");
    if(!container) return;
    if(!isDemoMode()) {
      container.innerHTML = `<div class="ads-signal"><i></i><div><strong>Chưa có tín hiệu vận hành</strong><small>Tín hiệu sẽ xuất hiện sau khi dữ liệu nền tảng được đồng bộ.</small></div><b>—</b></div>`;
      return;
    }
    const signals = {
      meta:[
        ["risk","BR Retarget vượt CPI guardrail","CPI $3.67 · +38% so với target","Review"],
        ["good","V7-2606-VA đủ điều kiện scale","ROAS 3.78x · 1,180 installs","+20%"],
        ["","Lookalike Payers 3% sắp hết learning","Còn 9 conversion để ổn định","Watch"]
      ],
      google:[
        ["good","US tROAS Broad đạt target","ROAS 2.47x · 3,940 installs","+15%"],
        ["","JP Value Core 02 cần thêm asset","Asset group thiếu video dọc","Watch"],
        ["risk","Conversion tracking lệch 8%","Đối soát với AppsFlyer","Review"]
      ],
      tiktok:[
        ["good","UGC Batch 06 giữ ROAS 2.05x","Spend 3,710 · CPI $1.80","Scale"],
        ["risk","TH Creative Test 12 CPI tăng","CPI $2.15 · trend giảm","Review"],
        ["","Interest Puzzle games bị limited","CPI $3.02 vượt guardrail","Watch"]
      ]
    }[key];
    container.innerHTML = signals.map(([tone,title,note,value])=>`<div class="ads-signal ${tone}"><i></i><div><strong>${title}</strong><small>${note}</small></div><b>${value}</b></div>`).join("");
  }

  function bind() {
    el("ads-manager-search")?.addEventListener("input",render);
    document.querySelectorAll(`#${config.view} [data-${key}-level]`).forEach(button=>button.addEventListener("click",()=>{
      state.level = button.dataset[`${key}Level`];
      state.selectedIds.clear();
      load();
      render();
    }));
    ["ads-ua-filter","ads-status-filter"].forEach(name=>el(name)?.addEventListener("change",render));
    el("ads-business-filter")?.addEventListener("change",event=>{ state.business = event.target.value; refreshScopeOptions(); load(); });
    el("ads-account-filter")?.addEventListener("change",event=>{ state.account = event.target.value; load(); });
    el("ads-attribution")?.addEventListener("change",load);
    el("ads-filter-toggle")?.addEventListener("click",()=>{ const panel = el("ads-filter-panel"); if(panel) panel.hidden = !panel.hidden; });
    el("ads-clear-filter")?.addEventListener("click",()=>{
      ["ads-ua-filter","ads-status-filter"].forEach(name=>{ if(el(name)) el(name).value = "all"; });
      state.business = "all"; state.account = "all"; refreshScopeOptions(); state.selectedIds.clear();
      load(); render();
    });
    el("ads-column-button")?.addEventListener("click",()=>{
      const panel = el("ads-column-panel");
      if(!panel) return;
      renderColumnPanel();
      panel.hidden = !panel.hidden;
    });
    el("ads-column-panel")?.addEventListener("change",event=>{
      const key = event.target?.dataset?.detailColumn;
      if(!key) return;
      if(event.target.checked) state.visibleDetailColumns.add(key); else state.visibleDetailColumns.delete(key);
      render();
    });
    el("ads-select-all")?.addEventListener("change",event=>{
      getRows().forEach(row=>event.currentTarget.checked?state.selectedIds.add(row.id):state.selectedIds.delete(row.id));
      render();
    });
    el("ads-manager-table-body")?.addEventListener("change",event=>{
      if(event.target.classList.contains("ads-row-check")) {
        const id = event.target.dataset.adsRowCheck;
        event.target.checked?state.selectedIds.add(id):state.selectedIds.delete(id);
        updateSelection();
      }
    });
    el("ads-refresh")?.addEventListener("click",()=>{ load(); showToast(`Đang đồng bộ ${levelLabel(state.level)} từ ${config.product}.`); });
    el("ads-save-view")?.addEventListener("click",()=>showToast(`Đã lưu preset cột và bộ lọc ${config.product} cho user hiện tại.`));
    el("ads-view-preset")?.addEventListener("change",event=>showToast(`Đã chuyển view: ${event.target.options[event.target.selectedIndex].text}.`));
    el("ads-date-range")?.addEventListener("change",()=>{
      const custom = el("ads-date-range").value === "custom";
      el("ads-custom-range")?.toggleAttribute("hidden",!custom);
      if(!custom) load();
    });
    ["ads-date-from","ads-date-to"].forEach(name=>el(name)?.addEventListener("change",()=>{
      if(el("ads-date-range")?.value === "custom") load();
    }));
  }

  return { state, config, load, render, renderSignals, bind, initializeDateControls, refreshScopeOptions, getRows, isLoading:()=>state.liveLoading };
}

const adsWorkspaces = Object.fromEntries(Object.keys(adsWorkspaceConfig).map(key=>[key,createAdsWorkspace(key)]));
const adsWorkspaceByView = Object.fromEntries(Object.values(adsWorkspaces).map(workspace=>[workspace.config.view,workspace]));

function initializeAdsDateControls() {
  Object.values(adsWorkspaces).forEach(workspace=>workspace.initializeDateControls());
}

function refreshAdsScopeOptions() {
  Object.values(adsWorkspaces).forEach(workspace=>workspace.refreshScopeOptions());
}

function renderAdsManager() {
  Object.values(adsWorkspaces).forEach(workspace=>workspace.render());
}

function renderAdsWorkspaceSignals() {
  Object.values(adsWorkspaces).forEach(workspace=>workspace.renderSignals());
}

// Only the workspace being opened syncs, so one platform outage never blocks the others.
function loadAdsPlatformData(view) {
  const workspace = view ? adsWorkspaceByView[view] : null;
  if(workspace) return workspace.load();
  return Promise.all(Object.values(adsWorkspaces).map(workspace=>workspace.load()));
}

function bindAdsWorkspaces() {
  Object.values(adsWorkspaces).forEach(workspace=>workspace.bind());
}

function renderOptimizationCenter() {
  const metricRows = [
    ["ROAS guardrail","2,30x","Target 2,00x","blended revenue / spend","up","↗"],
    ["CPA (Purchase)","184.600 ₫","↓ 12,4%","cost / paying user","up","◉"],
    ["Open recommendations","4","2 cần duyệt hôm nay","AI queue","down","✦"],
    ["Guardrail coverage","36%","↑ 8pt trong 30 ngày","monitored scope","up","⌁"],
    ["Actions · 7D","28","12 pause · 9 scale","draft + approved","up","↗"],
    ["Budget protected","18,4M ₫","Stop Loss + Sunsetting","estimated saving","up","₫"],
    ["Approval SLA","42 phút","↓ 18 phút","median review time","up","✓"]
  ];
  document.querySelector("#optimization-metrics").innerHTML = metricRows.map(([label,value,delta,note,tone,icon])=>`
    <article class="metric"><div class="metric-top"><span class="metric-label">${label}</span><span class="metric-icon">${icon}</span></div><strong>${value}</strong><small><span class="delta ${tone}">${delta}</span>${note}</small></article>`).join("");
  renderStrategyDrilldown();

  document.querySelector("#optimization-recommendations").innerHTML = data.alerts.map(item=>`
    <div class="optimization-recommendation ${item.level === "critical" ? "risk" : item.level === "good" ? "good" : ""}">
      <span>${item.icon}</span><div><strong>${item.action} · ${item.subtitle}</strong><small>${item.title} · Owner: ${item.owner}</small></div>
      <button class="button ghost opt-review-button" data-opt-review="${item.title}">${item.status}</button>
    </div>`).join("");

  const tactics = [
    ["SURF","Campaign","Scale winners","Tăng ngân sách khi ROAS > target và volume đủ mẫu.","ROAS D7 ≥ 2,5x · spend ≥ 3× CPI target"],
    ["STOP LOSS","Ad set","Chặn lỗ theo CPI","Pause ad set có negative momentum và vượt cost guardrail.","Spend ≥ 2× CPI target · installs = 0"],
    ["SUNSETTING","Ad set","Giảm dần loser","Theo dõi nhiều ngày và giảm ngân sách theo từng bước an toàn.","CPI +30% · 3 ngày liên tiếp"],
    ["REVIVE","Ad","Bật lại sau backfill","Kích hoạt lại khi attribution muộn làm performance quay về vùng tốt.","ROAS phục hồi ≥ target · trong 48h"],
    ["SCALE","Ad set","Scale payers","Mở rộng ad set có purchase volume và ROAS đạt ngưỡng.","CPA Purchase ≤ target · ROAS ≥ target"],
    ["DOWNSCALE","Campaign","Hạ ngân sách loser","Giảm 15% thay vì pause để campaign tìm lại điểm cân bằng.","ROAS < 1,5x · volume đủ mẫu"],
    ["FATIGUE","Creative","Rotate creative","Cảnh báo hoặc thay creative khi CTR giảm và frequency tăng.","CTR -25% · frequency ≥ 3,2"]
  ];
  document.querySelector("#optimization-tactics").innerHTML = tactics.map(([code,level,title,description,condition])=>`
    <article class="tactic-card"><header><span>${code}</span><small>${level}</small></header><h3>${title}</h3><p>${description}</p><div class="tactic-condition">IF ${condition}</div><footer><small>Approval required</small><button data-opt-tactic="${code}">Dùng template →</button></footer></article>`).join("");

  const actionMix = [["Pause / stop loss",12,100],["Increase budget",9,75],["Decrease budget",4,34],["Revive / resume",3,25]];
  document.querySelector("#optimization-action-mix").innerHTML = actionMix.map(([label,value,width])=>`
    <div class="action-mix-row"><span>${label}</span><div class="action-mix-track"><i style="width:${width}%"></i></div><b>${value}</b></div>`).join("");
  const activity = [
    ["MA","Minh Anh approved budget +20%","VN · Purchase · Scale 04","09:42"],
    ["QH","Quang Huy updated CPI guardrail","Google Apps · $3.20 → $3.00","09:16"],
    ["LC","Linh Chi dismissed fatigue alert","V9-2607-VA · đủ data","08:54"],
    ["SY","System completed rule evaluation","148 assets · không ghi thay đổi","08:45"]
  ];
  document.querySelector("#optimization-activity").innerHTML = activity.map(([avatar,title,note,time])=>`
    <div class="optimization-activity-row"><span>${avatar}</span><div><strong>${title}</strong><small>${note}</small></div><time>${time}</time></div>`).join("");
}

function renderBudgetPacing() {
  const accounts = [
    {name:"Northstar · Meta Global",owner:"Minh Anh",plan:42000,spent:31840,pacing:76,forecast:43820,roas:2.84,status:"Over"},
    {name:"Northstar · Google Apps",owner:"Quang Huy",plan:36000,spent:24860,pacing:69,forecast:35120,roas:2.70,status:"On track"},
    {name:"Northstar · TikTok SEA",owner:"Linh Chi",plan:18000,spent:10940,pacing:61,forecast:16220,roas:1.68,status:"Under"},
    {name:"Atlas · Meta LATAM",owner:"Minh Anh",plan:22000,spent:17410,pacing:79,forecast:24180,roas:1.42,status:"Over"},
    {name:"Orbit · Google Japan",owner:"Tú Uyên",plan:28000,spent:19470,pacing:70,forecast:27620,roas:2.18,status:"On track"},
    {name:"Orbit · TikTok APAC",owner:"Linh Chi",plan:14000,spent:8620,pacing:62,forecast:12840,roas:2.05,status:"Under"}
  ];
  const totalPlan = accounts.reduce((sum,row)=>sum+row.plan,0);
  const totalSpent = accounts.reduce((sum,row)=>sum+row.spent,0);
  const totalForecast = accounts.reduce((sum,row)=>sum+row.forecast,0);
  document.querySelector("#budget-metrics").innerHTML = [
    ["Monthly plan",`$${(totalPlan/1000).toFixed(0)}K`,"100% approved","media budget","₫"],
    ["Actual spend",`$${(totalSpent/1000).toFixed(1)}K`,"72,2% elapsed","pacing 69,8%","↗"],
    ["Month forecast",`$${(totalForecast/1000).toFixed(1)}K`,`${totalForecast>totalPlan?"+":"−"}$${Math.abs(totalForecast-totalPlan).toLocaleString()}`,"projected EOM","⌁"],
    ["Budget at risk","$8.4K","2 accounts over","needs review","!"],
    ["Reallocation upside","+$12.6K","+0.14 ROAS est.","3 opportunities","✦"]
  ].map(([label,value,delta,note,icon])=>`<article class="metric"><div class="metric-top"><span class="metric-label">${label}</span><span class="metric-icon">${icon}</span></div><strong>${value}</strong><small><span class="delta ${label==="Budget at risk"?"down":"up"}">${delta}</span>${note}</small></article>`).join("");
  const pace = Math.round(totalSpent/totalPlan*100);
  document.querySelector("#budget-orbit").innerHTML = `<div class="budget-orbit-ring" style="--pace:${pace*3.6}deg"><div><strong>${pace}%</strong><span>budget used</span></div></div><p><strong>$${(totalSpent/1000).toFixed(1)}K</strong> / $${(totalPlan/1000).toFixed(0)}K</p><small>Ngày 30 / 31 · Expected 96,8%</small>`;
  const trend = [42,48,55,51,66,72,69,78,74,83,89,94].map((value,index)=>`<span style="height:${value}%"><i>${index%3===0?`W${Math.floor(index/3)+1}`:""}</i></span>`).join("");
  document.querySelector("#budget-trend").innerHTML = `<div class="budget-trend-head"><span>Daily run-rate</span><strong>$5.2K/ngày</strong><small>Target $5.16K</small></div><div class="budget-bars">${trend}</div><div class="budget-legend"><span><i></i>Actual spend</span><span><i></i>Target pace</span></div>`;
  const owners = [
    ["Minh Anh","MA","$49.3K","77%","2 accounts"],["Quang Huy","QH","$24.9K","69%","1 account"],["Linh Chi","LC","$19.6K","61%","2 accounts"],["Tú Uyên","TU","$19.5K","70%","1 account"]
  ];
  document.querySelector("#budget-owner-list").innerHTML = owners.map(([name,avatar,spend,pace,note])=>`<div class="budget-owner-row"><span>${avatar}</span><div><strong>${name}</strong><small>${note}</small></div><div class="budget-owner-track"><i style="width:${pace}"></i></div><b>${spend}<small>${pace}</small></b></div>`).join("");
  const opportunities = [
    ["Move $2.5K","TikTok SEA → Google Apps","ROAS 1,68x → 2,70x","+0.18 blended ROAS"],
    ["Cap overspend","Atlas Meta LATAM","Forecast +$2.18K · ROAS 1,42x","Protect $1.9K"],
    ["Scale winner","Meta Global · VN Purchase","Stable 4 ngày · ROAS 3,12x","+20% budget"]
  ];
  document.querySelector("#budget-opportunities").innerHTML = opportunities.map(([title,scope,note,value])=>`<div class="budget-opportunity"><span>↗</span><div><strong>${title}</strong><small>${scope} · ${note}</small></div><b>${value}</b><button data-budget-draft="${title}">Draft →</button></div>`).join("");
  document.querySelector("#budget-table").innerHTML = accounts.map(row=>{
    const variance=row.forecast-row.plan;
    const tone=row.status==="On track"?"green":row.status==="Over"?"red":"amber";
    return `<tr><td><strong>${row.name}</strong></td><td>${row.owner}</td><td>$${row.plan.toLocaleString()}</td><td>$${row.spent.toLocaleString()}</td><td><div class="pacing-cell"><span><i style="width:${row.pacing}%"></i></span><b>${row.pacing}%</b></div></td><td><strong>$${row.forecast.toLocaleString()}</strong></td><td class="${variance>0?"variance-over":"variance-under"}">${variance>0?"+":""}$${variance.toLocaleString()}</td><td>${row.roas.toFixed(2)}x</td><td><span class="pill ${tone}">${row.status}</span></td></tr>`;
  }).join("");
}

function renderDailyBrief() {
  document.querySelector("#brief-metrics").innerHTML = [
    ["Spend yesterday","$5,420","↑ 6,2%","vs 7D avg","₫"],["Revenue","$13,180","↑ 11,4%","blended","↗"],["ROAS","2.43x","↑ 0,16","target 2.0x","⌁"],["Registrations","2.184","↑ 8,7%","AppsFlyer","◎"]
  ].map(([label,value,delta,note,icon])=>`<article class="metric"><div class="metric-top"><span class="metric-label">${label}</span><span class="metric-icon">${icon}</span></div><strong>${value}</strong><small><span class="delta up">${delta}</span>${note}</small></article>`).join("");
  document.querySelector("#brief-decisions").innerHTML = data.alerts.map(item=>`
    <div class="brief-decision ${item.level === "critical" ? "critical" : item.level === "good" ? "scale" : item.action === "Review data" ? "data" : "warning"}">
      <span>${item.action}</span><div><strong>${item.title}</strong><small>${item.subtitle} · ${item.metric} / target ${item.target}</small><p>${item.owner} · trước ${item.due}</p></div>
      <button data-brief-review="${item.title}">Review →</button>
    </div>`).join("");
  document.querySelector("#brief-summary").innerHTML = `
    <div class="brief-narrative"><p><strong>Tăng trưởng đang tích cực:</strong> revenue tăng nhanh hơn spend nhờ Meta VN và Google US. Blended ROAS cải thiện lên 2,43x.</p><p><strong>Rủi ro chính:</strong> Atlas Meta LATAM tiếp tục vượt pacing trong khi ROAS D7 chỉ 1,42x. Nếu không xử lý, tháng này có thể overspend $2.18K.</p><p><strong>Product signal:</strong> registration CVR tăng 3,2 điểm nhưng retention D1 của TikTok giảm còn 19,4%. Không nên scale TikTok trước khi cohort mới ổn định.</p></div>
    <div class="brief-confidence"><span>Data confidence</span><div><i style="width:94%"></i></div><strong>94%</strong></div>`;
  document.querySelector("#brief-team").innerHTML = [
    ["MA","Minh Anh","2 decisions","1 overspend","red"],["LC","Linh Chi","1 data issue","TikTok D1 ↓","amber"],["QH","Quang Huy","1 opportunity","Google ROAS ↑","green"]
  ].map(([avatar,name,task,note,tone])=>`<div class="brief-team-row"><span>${avatar}</span><div><strong>${name}</strong><small>${task}</small></div><b class="${tone}">${note}</b></div>`).join("");
  document.querySelector("#brief-signals").innerHTML = [
    ["winner","V7-2606-VA","Creative winner · 3.78x ROAS"],["winner","Google US tROAS","Registrations +14% WoW"],["risk","Atlas LATAM","Pacing 79% · ROAS 1.42x"],["risk","TikTok TH","D1 retention -4.8pt"]
  ].map(([tone,title,note])=>`<div class="brief-signal ${tone}"><i></i><div><strong>${title}</strong><small>${note}</small></div></div>`).join("");
  document.querySelector("#brief-plan").innerHTML = [
    ["09:30","Review 4 decision drafts"],["11:00","Creative sync & fatigue check"],["14:00","Budget pacing stand-up"],["17:30","Publish daily performance note"]
  ].map(([time,item])=>`<div class="brief-plan-row"><time>${time}</time><span></span><strong>${item}</strong></div>`).join("");
}

function renderReports() {
  document.querySelector("#report-metrics").innerHTML = [
    ["Saved reports","8","4 scheduled","workspace","▦"],["Delivered · 30D","24","100% success","PDF + CSV","↗"],["Time saved","18h","ước tính/tháng","automation","◷"],["Next delivery","08:00","Thứ Hai","Weekly UA","⌁"]
  ].map(([label,value,delta,note,icon])=>`<article class="metric"><div class="metric-top"><span class="metric-label">${label}</span><span class="metric-icon">${icon}</span></div><strong>${value}</strong><small><span class="delta up">${delta}</span>${note}</small></article>`).join("");
  const reports = [
    ["Weekly UA Executive","Management","Meta + Google + TikTok + AF","Weekly · Mon 08:00","Scheduled","green"],
    ["Daily Performance Pulse","UA Team","Campaign · Creative · Budget","Daily · 18:00","Scheduled","green"],
    ["Creative Monthly Review","Creative Team","Creative codes · Brief signals","Monthly · Day 1","Scheduled","green"],
    ["App Growth Q3","Product & UA","Revenue · Retention · LTV","Draft","Draft","amber"]
  ];
  document.querySelector("#report-library").innerHTML = reports.map(([name,audience,scope,schedule,status,tone])=>`<div class="report-row"><span>RP</span><div><strong>${name}</strong><small>${audience} · ${scope}</small></div><time>${schedule}</time><span class="pill ${tone}">${status}</span><button data-report-open="${name}">•••</button></div>`).join("");
  document.querySelector("#report-templates").innerHTML = [
    ["Executive summary","Spend, revenue, ROAS, risks","5 phút"],["UA performance","Owner, platform, campaign, KPI","8 phút"],["Creative review","Winners, fatigue, next briefs","6 phút"],["Data health","Freshness, gaps, incidents","4 phút"]
  ].map(([title,note,time])=>`<button class="report-template" data-report-template="${title}"><span>✦</span><div><strong>${title}</strong><small>${note}</small></div><b>${time}</b></button>`).join("");
  document.querySelector("#report-schedules").innerHTML = [
    ["MON","08:00","Weekly UA Executive","Management","Email · PDF"],["DAILY","18:00","Daily Performance Pulse","UA Team","Email · Link"],["01","09:00","Creative Monthly Review","Creative Team","Email · PDF"]
  ].map(([day,time,name,audience,delivery])=>`<div class="schedule-row"><span>${day}</span><time>${time}</time><div><strong>${name}</strong><small>${audience}</small></div><b>${delivery}</b><i></i><button data-schedule-toggle="${name}">On</button></div>`).join("");
}

function renderAccountAudit() {
  document.querySelector("#audit360-metrics").innerHTML = [
    ["Critical","3","cần xử lý","red"],["Warnings","6","cần review","amber"],["Passed","33","checks","green"]
  ].map(([label,value,note,tone])=>`<article><span class="${tone}"></span><div><small>${label}</small><strong>${value}</strong><p>${note}</p></div></article>`).join("");
  const dimensions = [
    ["Tracking & attribution",92,"38 / 40 passed","green"],["Campaign structure",84,"16 / 19 passed","green"],["Budget governance",73,"11 / 15 passed","amber"],["Creative hygiene",68,"13 / 19 passed","amber"],["Naming convention",61,"8 / 14 passed","red"]
  ];
  document.querySelector("#audit-dimensions").innerHTML = dimensions.map(([name,score,note,tone])=>`<div class="audit-dimension"><div><strong>${name}</strong><small>${note}</small></div><span><i class="${tone}" style="width:${score}%"></i></span><b>${score}</b></div>`).join("");
  const fixes = [
    ["critical","Missing purchase value","Atlas · Meta LATAM","Revenue có thể thiếu 8–12%","Data owner"],
    ["critical","Campaign không có owner","TikTok SEA · 3 campaigns","Không xác định người xử lý","UA Lead"],
    ["critical","Naming không chuẩn","17 ads · thiếu creative code","Không gộp được hiệu suất","Creative Ops"],
    ["warning","Learning limited","Google US · 2 asset groups","Budget phân mảnh","Quang Huy"]
  ];
  document.querySelector("#audit-fixes").innerHTML = fixes.map(([tone,title,scope,note,owner])=>`<div class="audit-fix ${tone}"><i></i><div><strong>${title}</strong><small>${scope} · ${note}</small></div><span>${owner}</span><button data-audit-fix="${title}">Assign →</button></div>`).join("");
  const accounts = [
    ["M","Northstar · Meta Global","Minh Anh",91,"2 issues","green"],["G","Northstar · Google Apps","Quang Huy",88,"3 issues","green"],["T","Northstar · TikTok SEA","Linh Chi",76,"5 issues","amber"],["M","Atlas · Meta LATAM","Minh Anh",58,"7 issues","red"],["G","Orbit · Google Japan","Tú Uyên",82,"3 issues","green"],["T","Orbit · TikTok APAC","Linh Chi",73,"4 issues","amber"]
  ];
  document.querySelector("#audit-accounts").innerHTML = accounts.map(([logo,name,owner,score,issues,tone])=>`<div class="audit-account-row"><span>${logo}</span><div><strong>${name}</strong><small>${owner}</small></div><div class="audit-account-track"><i class="${tone}" style="width:${score}%"></i></div><b>${score}</b><small>${issues}</small><button data-account-audit="${name}">Chi tiết →</button></div>`).join("");
}

function renderTrackingHealth() {
  document.querySelector("#health-metrics").innerHTML = [
    ["Reliability","94,2%","↑ 1,8pt","7D average","✓"],["Freshness","6 phút","SLA < 15m","all sources","◷"],["Install gap","6,4%","within threshold","platform vs AF","⌁"],["Revenue coverage","97,1%","1 source delayed","purchase value","₫"],["Open incidents","2","1 warning · 1 info","today","!"]
  ].map(([label,value,delta,note,icon])=>`<article class="metric"><div class="metric-top"><span class="metric-label">${label}</span><span class="metric-icon">${icon}</span></div><strong>${value}</strong><small><span class="delta ${label==="Open incidents"?"down":"up"}">${delta}</span>${note}</small></article>`).join("");
  const connectors = [
    ["M","Meta Ads","2 phút trước","99,8% completeness","Healthy","green"],
    ["G","Google Ads","5 phút trước","99,4% completeness","Healthy","green"],
    ["T","TikTok Ads","8 phút trước","96,1% completeness","Healthy","green"],
    ["AF","AppsFlyer","21 phút trước","92,7% completeness","Delayed","amber"]
  ];
  document.querySelector("#health-connectors").innerHTML = connectors.map(([logo,name,sync,note,status,tone])=>`<div class="health-connector"><span>${logo}</span><div><strong>${name}</strong><small>Last sync · ${sync}</small></div><p>${note}</p><b class="${tone}"><i></i>${status}</b></div>`).join("");
  const gaps = [
    ["Meta","1.930","1.842","−4,6%","good"],["Google","2.713","2.581","−4,9%","good"],["TikTok","337","287","−14,8%","risk"]
  ];
  document.querySelector("#health-attribution").innerHTML = `<div class="health-gap-head"><span>Source</span><span>Platform</span><span>AppsFlyer</span><span>Gap</span></div>${gaps.map(([name,platform,af,gap,tone])=>`<div class="health-gap-row"><strong>${name}</strong><span>${platform}</span><span>${af}</span><b class="${tone}">${gap}</b></div>`).join("")}<div class="health-gap-note"><i>!</i><p><strong>TikTok TH vượt threshold 10%</strong><small>Có thể do attribution delay hoặc mapping media source.</small></p></div>`;
  const incidents = [
    ["warning","AppsFlyer sync chậm 21 phút","Acquisition endpoint · retry 2/3","Đang tự khôi phục","2 phút trước"],
    ["info","TikTok install gap vượt 10%","TH · Android · 50 installs chưa matched","Theo dõi 6 giờ","18 phút trước"],
    ["resolved","Meta revenue backfill hoàn tất","Atlas LATAM · +$842 revenue","Đã xử lý","Hôm qua"]
  ];
  document.querySelector("#health-incidents").innerHTML = incidents.map(([tone,title,note,status,time])=>`<div class="health-incident ${tone}"><span>${tone==="resolved"?"✓":"!"}</span><div><strong>${title}</strong><small>${note}</small></div><b>${status}</b><time>${time}</time><button data-health-incident="${title}">Chi tiết →</button></div>`).join("");
}

const analyticsSources = [
  { platform:"Meta", endpoint:"/api/meta-accounts" },
  { platform:"Google", endpoint:"/api/google-accounts" },
  { platform:"TikTok", endpoint:"/api/tiktok-accounts" }
];
let analyticsLiveData = {
  attempted:false, loading:false, ads:[], campaigns:[], daily:[], breakdowns:{age:[],gender:[],device:[],country:[],region:[]}, sourceStates:{},
  sourceCurrencies:{}, sourceAvailability:{}, googleDeep:null, appsflyerRetention:null, appsflyerRetentionError:null, partialErrors:[], breakdownErrors:[], syncedAt:null
};

function analyticsDateRange() {
  const period = document.querySelector("#analytics-period")?.value || "30d";
  const days = { "7d":7, "30d":30, "90d":90 }[period] || 30;
  const to = new Date(), from = new Date(to);
  from.setDate(from.getDate()-(days-1));
  const iso = date=>`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
  return { period, days, from:iso(from), to:iso(to) };
}

async function loadAppsFlyerAnalyticsRetention(range) {
  const toDate = new Date(`${range.to}T00:00:00`);
  const fromDate = new Date(toDate);
  fromDate.setDate(fromDate.getDate() - 29);
  const iso = date=>`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
  const from = range.days > 30 ? iso(fromDate) : range.from;
  const response = await fetch("/api/appsflyer-sync",{
    method:"POST",
    headers:{"Content-Type":"application/json",...metaAuthHeaders()},
    body:JSON.stringify({scope:"retention",from,to:range.to})
  });
  const payload = await response.json().catch(()=>({}));
  if(!response.ok) throw new Error(payload.error || "Không thể đọc AppsFlyer Cohort API.");
  return payload;
}

const analyticsEscape = value=>String(value ?? "").replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
const analyticsTooltip = (title,lines)=>encodeURIComponent(JSON.stringify({title,lines}));
const analyticsUnavailable = message=>`<div class="analytics-unavailable"><strong>—</strong><p>${analyticsEscape(message)}</p></div>`;
const analyticsNumber = value=>Math.round(Number(value)||0).toLocaleString("vi-VN");
const analyticsPercent = value=>`${Number(value||0).toLocaleString("vi-VN",{maximumFractionDigits:2})}%`;

function analyticsMoney(value,currency) {
  if(value === null || value === undefined || !currency || currency === "MIXED") return "—";
  if(currency === "VND") return `${Math.round(Number(value)||0).toLocaleString("vi-VN")} ₫`;
  return new Intl.NumberFormat("en-US",{style:"currency",currency,maximumFractionDigits:2}).format(Number(value)||0);
}

function aggregateAnalyticsRows(rows,keyFactory) {
  const groups = new Map();
  rows.forEach(row=>{
    const key = keyFactory(row);
    const current = groups.get(key) || {
      ...row, spend:0, revenue:0, installs:0, registrations:0, purchases:0, impressions:0, clicks:0,
      revenueAvailable:true, installsAvailable:true
    };
    ["spend","revenue","installs","registrations","purchases","impressions","clicks"].forEach(metric=>{ current[metric]+=Number(row[metric]||0); });
    current.revenueAvailable &&= row.revenueAvailable !== false;
    current.installsAvailable &&= row.installsAvailable !== false;
    groups.set(key,current);
  });
  return [...groups.values()];
}

function analyticsBreakdownLabel(row,dimension) {
  const raw=String(row.label||row.key||"Không xác định").trim();
  const upper=raw.toUpperCase().replaceAll("-","_");
  if(dimension==="age") return ({AGE_13_17:"13–17",AGE_18_24:"18–24",AGE_25_34:"25–34",AGE_35_44:"35–44",AGE_45_54:"45–54",AGE_55_64:"55–64",AGE_55_100:"55+",AGE_65_UP:"65+",UNKNOWN:"Không xác định",UNDETERMINED:"Không xác định",AGE_RANGE_UNDETERMINED:"Không xác định"}[upper]||raw.replace("-","–"));
  if(dimension==="gender") return ({MALE:"Nam",FEMALE:"Nữ",UNKNOWN:"Không xác định",UNDETERMINED:"Không xác định"}[upper]||raw);
  if(dimension==="device") return ({ANDROID:"Android",IOS:"iOS",MOBILE:"Mobile",MOBILE_APP:"Mobile app",MOBILE_WEB:"Mobile web",DESKTOP:"Desktop",TABLET:"Tablet",CONNECTED_TV:"Connected TV",OTHER:"Khác",UNKNOWN:"Không xác định"}[upper]||raw);
  if(dimension==="country" && /^[A-Z]{2}$/i.test(raw)) {
    try { return new Intl.DisplayNames(["vi"],{type:"region"}).of(raw.toUpperCase())||raw.toUpperCase(); } catch(_) { return raw.toUpperCase(); }
  }
  return raw;
}

function analyticsBreakdownGroupKey(label,dimension) {
  let normalized=String(label||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
  if(dimension==="region") normalized=normalized
    .replace(/,\s*vietnam$/i,"")
    .replace(/\s+province$/i,"")
    .replace(/^ho chi minh city$/i,"ho chi minh");
  return normalized.replace(/[^a-z0-9]/g,"")||"unknown";
}

function analyticsBreakdownDisplayLabel(label,dimension) {
  if(dimension!=="region") return label;
  return String(label).replace(/,\s*Vietnam$/i,"").replace(/\s+Province$/i,"");
}

function aggregateAnalyticsBreakdown(rows,dimension) {
  const grouped=new Map();
  rows.forEach(row=>{
    const label=analyticsBreakdownDisplayLabel(analyticsBreakdownLabel(row,dimension),dimension);
    const key=analyticsBreakdownGroupKey(label,dimension);
    const current=grouped.get(key)||{label,spend:0,impressions:0,clicks:0,currencies:new Set(),platforms:new Set()};
    current.spend+=Number(row.spend||0);
    current.impressions+=Number(row.impressions||0);
    current.clicks+=Number(row.clicks||0);
    if(row.currency) current.currencies.add(row.currency);
    if(row.platform) current.platforms.add(row.platform);
    grouped.set(key,current);
  });
  return [...grouped.values()];
}

function refreshAnalyticsCampaignOptions() {
  const select = document.querySelector("#analytics-campaign");
  if(!select) return;
  const previous = select.value;
  const campaigns = analyticsLiveData.campaigns
    .filter(row=>document.querySelector("#analytics-platform")?.value === "all" || row.platform === document.querySelector("#analytics-platform")?.value)
    .sort((a,b)=>String(a.name).localeCompare(String(b.name),"vi"));
  select.innerHTML = `<option value="all">Tất cả campaign đã đồng bộ</option>${campaigns.map(row=>`<option value="${analyticsEscape(row.key)}">${analyticsEscape(row.platform)} · ${analyticsEscape(row.name)}</option>`).join("")}`;
  select.value = campaigns.some(row=>row.key===previous) ? previous : "all";
}

function getAnalyticsSelection() {
  const platform = document.querySelector("#analytics-platform")?.value || "all";
  const campaign = document.querySelector("#analytics-campaign")?.value || "all";
  const ads = analyticsLiveData.ads.filter(row=>(platform === "all" || row.platform === platform) && (campaign === "all" || row.campaignKey === campaign));
  const campaigns = analyticsLiveData.campaigns.filter(row=>(platform === "all" || row.platform === platform) && (campaign === "all" || row.key === campaign));
  const daily = analyticsLiveData.daily.filter(row=>platform === "all" || row.platform === platform);
  const breakdowns = Object.fromEntries(Object.entries(analyticsLiveData.breakdowns||{}).map(([dimension,rows])=>[
    dimension,
    rows.filter(row=>(platform === "all" || row.platform === platform) && (campaign === "all" || row.campaignKey === campaign))
  ]));
  const currencies = [...new Set(campaigns.map(row=>row.currency).filter(Boolean))];
  const currency = currencies.length===1 ? currencies[0] : currencies.length ? "MIXED" : null;
  return { platform, campaign, ads, campaigns, daily, breakdowns, currency };
}

async function loadAnalyticsData() {
  if(analyticsLiveData.loading) return;
  if(!window.__uaSessionToken) {
    analyticsLiveData = {...analyticsLiveData,attempted:true,loading:false,sourceStates:{Meta:"unavailable",Google:"unavailable",TikTok:"unavailable"}};
    return renderAnalytics();
  }
  const range = analyticsDateRange();
  const campaignSelect = document.querySelector("#analytics-campaign");
  if(campaignSelect) campaignSelect.innerHTML = `<option value="all">Đang đồng bộ campaign…</option>`;
  analyticsLiveData = {attempted:true,loading:true,ads:[],campaigns:[],daily:[],breakdowns:{age:[],gender:[],device:[],country:[],region:[]},sourceStates:{},sourceCurrencies:{},sourceAvailability:{},googleDeep:null,appsflyerRetention:null,appsflyerRetentionError:null,partialErrors:[],breakdownErrors:[],syncedAt:null};
  renderAnalytics();
  const [results,appsflyerRetentionResult] = await Promise.all([
    Promise.allSettled(analyticsSources.map(async source=>{
    const read = async (mode,level="ad")=>{
      const params = new URLSearchParams({mode,level,from:range.from,to:range.to,business:"all",account:"all"});
      const response = await fetch(`${source.endpoint}?${params}`,{headers:metaAuthHeaders()});
      const payload = await response.json().catch(()=>({}));
      if(!response.ok) throw new Error(payload.error || `Không thể đọc ${source.platform} ${mode}.`);
      return payload;
    };
    const insightsRequest=source.platform==="Google"
      ? read("insights","ad").catch(()=>read("insights","campaign"))
      : read("insights","ad");
    const requests=[insightsRequest,read("breakdowns")];
    if(source.platform==="Google") requests.push(read("deep"));
    const [insightsResult,breakdownResult,deepResult] = await Promise.allSettled(requests);
    if(insightsResult.status==="rejected"&&breakdownResult.status==="rejected"&&(!deepResult||deepResult.status==="rejected")) throw Object.assign(insightsResult.reason,{platform:source.platform});
    return {
      source,
      payload:insightsResult.status==="fulfilled"?insightsResult.value:null,
      insightsError:insightsResult.status==="rejected"?insightsResult.reason?.message:null,
      breakdownPayload:breakdownResult.status==="fulfilled"?breakdownResult.value:null,
      breakdownError:breakdownResult.status==="rejected"?breakdownResult.reason?.message:null,
      deepPayload:deepResult?.status==="fulfilled"?deepResult.value:null,
      deepError:deepResult?.status==="rejected"?deepResult.reason?.message:null
    };
    })),
    loadAppsFlyerAnalyticsRetention(range)
      .then(payload=>({payload,error:null}))
      .catch(error=>({payload:null,error:error.message||"AppsFlyer Cohort API chưa khả dụng."}))
  ]);

  const fulfilled = results.filter(result=>result.status==="fulfilled").map(result=>result.value);
  const failures = results.filter(result=>result.status==="rejected").map(result=>({platform:result.reason?.platform || "Nguồn khác",message:result.reason?.message || "Không thể đồng bộ"}));
  const ads = fulfilled.flatMap(({source,payload})=>{
    if(!payload) return [];
    const conversionFailure = (payload.partialErrors||[]).some(error=>/conversion categor/i.test(error.message||""));
    return (payload.campaigns||[]).map(row=>{
      const campaignId = String(row.campaignId || row.entityId || "");
      const accountId = String(row.accountId || "");
      const campaignKey = `${source.platform}:${accountId}:${campaignId}`;
      return {
        ...row, platform:source.platform, sourceLevel:payload.level||"ad", currency:row.currency || payload.currency || null,
        campaignId, campaignKey, name:row.entityName || row.adName || row.name || "Ad chưa đặt tên",
        campaignName:row.campaignName || "Campaign chưa đặt tên",
        revenueAvailable:!(source.platform==="Google" && conversionFailure),
        installsAvailable:!(source.platform==="Google" && conversionFailure)
      };
    });
  });
  const campaigns = aggregateAnalyticsRows(ads,row=>row.campaignKey).map(row=>({
    ...row, key:row.campaignKey, name:row.campaignName,
    roas:row.revenueAvailable && row.spend ? row.revenue/row.spend : null,
    cpi:row.installsAvailable && row.installs ? row.spend/row.installs : null,
    cpr:row.registrations ? row.spend/row.registrations : null
  }));
  const daily = fulfilled.flatMap(({source,payload})=>{
    if(!payload) return [];
    const conversionFailure = (payload.partialErrors||[]).some(error=>/conversion categor/i.test(error.message||""));
    return (payload.daily||[]).map(row=>({
      ...row, platform:source.platform, currency:payload.currency || null,
      revenueAvailable:!(source.platform==="Google" && conversionFailure),
      installsAvailable:!(source.platform==="Google" && conversionFailure)
    }));
  });
  const emptyBreakdowns = {age:[],gender:[],device:[],country:[],region:[]};
  const breakdowns = Object.fromEntries(Object.keys(emptyBreakdowns).map(dimension=>[
    dimension,
    fulfilled.flatMap(({source,breakdownPayload})=>(breakdownPayload?.breakdowns?.[dimension]||[]).map(row=>({
      ...row, platform:source.platform, currency:row.currency || null,
      campaignKey:row.campaignId ? `${source.platform}:${String(row.accountId||"")}:${String(row.campaignId)}` : null
    })))
  ]));
  const googleResult=fulfilled.find(({source})=>source.platform==="Google");
  const googleDeep=googleResult?.deepPayload ? {
    ...googleResult.deepPayload,
    conversionActions:googleResult.payload?.conversionActions||[]
  } : null;
  const syncedTimes = fulfilled.flatMap(({payload,breakdownPayload,deepPayload})=>[payload?.syncedAt,breakdownPayload?.syncedAt,deepPayload?.syncedAt]).filter(Boolean).sort();
  analyticsLiveData = {
    attempted:true, loading:false, ads, campaigns, daily, breakdowns, googleDeep,
    appsflyerRetention:appsflyerRetentionResult.payload?.retention||null,
    appsflyerRetentionError:appsflyerRetentionResult.error,
    sourceStates:Object.fromEntries([...fulfilled.map(({source})=>[source.platform,"connected"]),...failures.map(row=>[row.platform,"unavailable"])]),
    sourceCurrencies:Object.fromEntries(fulfilled.map(({source,payload,breakdownPayload})=>{
      const currencies=[...new Set(Object.values(breakdownPayload?.breakdowns||{}).flat().map(row=>row.currency).filter(Boolean))];
      return [source.platform,payload?.currency || (currencies.length===1?currencies[0]:currencies.length?"MIXED":null)];
    })),
    sourceAvailability:Object.fromEntries(fulfilled.map(({source,payload})=>[source.platform,{revenue:Boolean(payload)&&!(source.platform==="Google" && (payload.partialErrors||[]).some(error=>/conversion categor/i.test(error.message||"")))}])),
    partialErrors:[...fulfilled.flatMap(({source,payload,insightsError,deepPayload,deepError})=>[
      ...(payload?.partialErrors||[]).map(error=>({...error,platform:source.platform})),
      ...(deepPayload?.partialErrors||[]).map(error=>({...error,platform:source.platform})),
      ...(insightsError?[{platform:source.platform,message:insightsError}]:[]),
      ...(deepError?[{platform:source.platform,message:`Google deep metrics: ${deepError}`}]:[])
    ]),...failures],
    breakdownErrors:fulfilled.flatMap(({source,breakdownPayload,breakdownError})=>[
      ...(breakdownPayload?.partialErrors||[]).map(error=>({...error,platform:source.platform})),
      ...(breakdownError?[{platform:source.platform,message:breakdownError}]:[])
    ]),
    syncedAt:syncedTimes.at(-1) || null
  };
  refreshAnalyticsCampaignOptions();
  renderAnalytics();
}

function renderGoogleDeepAnalytics(selection) {
  const section=document.querySelector("#analytics-google-deep");
  if(!section) return;
  section.hidden=!(["all","Google"].includes(selection.platform));
  if(section.hidden) return;
  const deep=analyticsLiveData.googleDeep;
  const state=document.querySelector("#analytics-google-deep-state");
  const unavailable=message=>analyticsUnavailable(message);
  if(state) {
    state.className=`pill ${deep?"green":"amber"}`;
    state.textContent=analyticsLiveData.loading?"Đang đồng bộ":deep?"Google Ads API live":"Chưa có deep data";
  }
  if(!deep) {
    ["analytics-google-network","analytics-google-assets"].forEach(id=>{
      const target=document.querySelector(`#${id}`);
      if(target) target.innerHTML=unavailable(analyticsLiveData.loading?"Đang đọc Google deep metrics…":"Google chưa trả deep metrics trong phạm vi đã chọn.");
    });
    return;
  }
  const matches=row=>selection.campaign==="all"||`Google:${String(row.accountId||"")}:${String(row.campaignId||"")}`===selection.campaign;
  const networkMetric=document.querySelector("#analytics-google-network-metric")?.value||"spend";
  const networkMap=new Map();
  (deep.network||[]).filter(matches).forEach(row=>{
    const key=row.network||"UNKNOWN", current=networkMap.get(key)||{network:key,spend:0,impressions:0,clicks:0,appInstalls:0,participatedActions:0,currency:row.currency,appInstallsAvailable:false,participatedAvailable:false};
    ["spend","impressions","clicks"].forEach(metric=>{current[metric]+=Number(row[metric]||0);});
    if(row.appInstalls!==null&&row.appInstalls!==undefined){current.appInstalls+=Number(row.appInstalls);current.appInstallsAvailable=true;}
    if(row.participatedActions!==null&&row.participatedActions!==undefined){current.participatedActions+=Number(row.participatedActions);current.participatedAvailable=true;}
    networkMap.set(key,current);
  });
  const networkRows=[...networkMap.values()].sort((a,b)=>Number(b[networkMetric]||0)-Number(a[networkMetric]||0));
  const networkAvailable=networkMetric==="appInstalls"?networkRows.some(row=>row.appInstallsAvailable):networkMetric==="participatedActions"?networkRows.some(row=>row.participatedAvailable):true;
  const networkMax=Math.max(...networkRows.map(row=>Number(row[networkMetric]||0)),1);
  const networkLabels={SEARCH:"Search",CONTENT:"Display",YOUTUBE_SEARCH:"YouTube Search",YOUTUBE_WATCH:"YouTube Watch",MIXED:"Mixed",UNKNOWN:"Không xác định",UNSPECIFIED:"Không xác định"};
  document.querySelector("#analytics-google-network").innerHTML=!networkRows.length?unavailable("Không có network breakdown cho Google App Campaign trong phạm vi này."):!networkAvailable?unavailable(`Google không trả ${networkMetric} theo network cho phạm vi này.`):networkRows.map(row=>{
    const value=Number(row[networkMetric]||0),display=networkMetric==="spend"?analyticsMoney(value,row.currency):analyticsNumber(value);
    return `<div class="google-network-row" tabindex="0" data-analytics-tooltip="${analyticsTooltip(networkLabels[row.network]||row.network,[`${networkMetric}: ${display}`,`Impressions: ${analyticsNumber(row.impressions)}`,`Clicks: ${analyticsNumber(row.clicks)}`])}"><span>${analyticsEscape(networkLabels[row.network]||row.network)}</span><div><i style="width:${value/networkMax*100}%"></i></div><strong>${display}</strong></div>`;
  }).join("");

  const assets=(deep.assets||[]).filter(matches).sort((a,b)=>Number(b.spend||0)-Number(a.spend||0)).slice(0,24);
  const safeImage=url=>/^https:\/\//i.test(String(url||""))?analyticsEscape(url):"";
  document.querySelector("#analytics-google-assets").innerHTML=assets.length?assets.map(row=>{
    const thumbnail=safeImage(row.thumbnailUrl);
    return `<article class="google-asset-item"><div class="google-asset-thumb">${thumbnail?`<img src="${thumbnail}" alt="" loading="lazy" referrerpolicy="no-referrer">`:analyticsEscape(String(row.fieldType||row.assetType||"ASSET").slice(0,3))}</div><div><strong title="${analyticsEscape(row.assetName)}">${analyticsEscape(row.assetName)}</strong><small>${analyticsEscape(row.campaignName)} · ${analyticsEscape(row.fieldType)}</small><footer><span>${analyticsMoney(row.spend,row.currency)}</span><span>${analyticsNumber(row.impressions)} imp.</span><span>${analyticsNumber(row.conversions)} conv.</span><span class="google-asset-label">${analyticsEscape(row.performanceLabel)}</span></footer></div></article>`;
  }).join(""):unavailable("Google chưa trả asset-level data cho phạm vi này.");
}

function renderAppsFlyerRetention(selection) {
  const target=document.querySelector("#analytics-retention");
  const state=document.querySelector("#analytics-retention-state");
  const legend=document.querySelector("#analytics-retention-legend");
  if(!target||!state||!legend) return;
  const retention=analyticsLiveData.appsflyerRetention;
  const platformName=value=>({Facebook:"Meta",Meta:"Meta",Google:"Google",Tiktok:"TikTok",TikTok:"TikTok",Organic:"Organic"}[value]||"Other");
  const colors={Meta:"#665de7",Google:"#25a276",TikTok:"#242333",Organic:"#e69a45",Other:"#4b94b6"};
  state.className=`pill ${analyticsLiveData.loading?"violet":retention?.available?"green":"amber"}`;
  state.textContent=analyticsLiveData.loading?"Đang đọc AppsFlyer":retention?.available?(retention.source||"AppsFlyer retention API"):"Retention API chưa khả dụng";
  legend.innerHTML="";
  if(analyticsLiveData.loading) {
    target.innerHTML=analyticsUnavailable("Đang đọc retention thật từ AppsFlyer…");
    return;
  }
  if(selection.campaign!=="all") {
    target.innerHTML=analyticsUnavailable("Retention AppsFlyer đang tổng hợp theo media source; bỏ lọc campaign để xem biểu đồ.");
    return;
  }
  if(!retention?.available) {
    target.innerHTML=analyticsUnavailable(analyticsLiveData.appsflyerRetentionError||"AppsFlyer Cohort/Master API chưa khả dụng với quyền hoặc gói hiện tại.");
    return;
  }

  const seriesMap=new Map();
  (retention.rows||[]).forEach(row=>{
    const platform=platformName(row.platform);
    if(selection.platform!=="all"&&platform!==selection.platform) return;
    if(!seriesMap.has(platform)) seriesMap.set(platform,new Map());
    const periods=seriesMap.get(platform);
    (row.periods||[]).forEach(period=>{
      if(period.rate===null||period.rate===undefined) return;
      const current=periods.get(period.day)||{day:period.day,users:0,retainedUsers:0,sessions:0};
      current.users+=Number(period.users||0);
      current.retainedUsers+=Number(period.retainedUsers||0);
      current.sessions+=Number(period.sessions||0);
      periods.set(period.day,current);
    });
  });
  const series=[...seriesMap.entries()].map(([platform,periodMap])=>({
    platform,
    points:[...periodMap.values()].sort((a,b)=>a.day-b.day).map(point=>({...point,rate:point.users?point.retainedUsers/point.users*100:null}))
  })).filter(row=>row.points.some(point=>point.rate!==null));
  if(!series.length) {
    const errorCopy=(retention.errors||[])[0];
    target.innerHTML=analyticsUnavailable(errorCopy||"AppsFlyer chưa trả cohort retention hoàn chỉnh cho phạm vi này.");
    return;
  }

  legend.innerHTML=series.map(row=>`<span><i style="background:${colors[row.platform]||colors.Other}"></i>${analyticsEscape(row.platform)}</span>`).join("");
  const allRates=series.flatMap(row=>row.points.map(point=>point.rate||0));
  const maxRate=Math.min(100,Math.max(10,Math.ceil(Math.max(...allRates,1)/10)*10));
  const left=46,right=694,top=18,bottom=218;
  const x=day=>left+(Math.max(1,Math.min(30,day))-1)/29*(right-left);
  const y=rate=>bottom-(Math.max(0,Math.min(maxRate,rate))/maxRate)*(bottom-top);
  const gridRates=[0,.25,.5,.75,1].map(ratio=>maxRate*ratio);
  const xLabels=[1,7,14,21,30];
  target.innerHTML=`<svg viewBox="0 0 720 250" role="img" aria-label="Retention D1 đến D30 theo AppsFlyer Cohort API">
    ${gridRates.map(rate=>`<line class="grid-line" x1="${left}" y1="${y(rate)}" x2="${right}" y2="${y(rate)}"/><text class="axis-text" x="${left-8}" y="${y(rate)+3}" text-anchor="end">${Math.round(rate)}%</text>`).join("")}
    ${xLabels.map(day=>`<text class="axis-text" x="${x(day)}" y="239" text-anchor="middle">D${day}</text>`).join("")}
    ${series.map(row=>{
      const color=colors[row.platform]||colors.Other;
      const points=row.points.filter(point=>point.rate!==null);
      const path=points.map(point=>`${x(point.day)},${y(point.rate)}`).join(" ");
      return `<polyline class="retention-path" style="stroke:${color}" points="${path}"/>${points.map(point=>`<circle class="retention-point" style="fill:${color}" cx="${x(point.day)}" cy="${y(point.rate)}" r="4"/><circle class="retention-hover-zone" cx="${x(point.day)}" cy="${y(point.rate)}" r="11" tabindex="0" data-analytics-tooltip="${analyticsTooltip(`${row.platform} · D${point.day}`,[`Retention: ${analyticsPercent(point.rate)}`,`${analyticsNumber(point.retainedUsers)} retained users`,`${analyticsNumber(point.users)} users trong cohort`,`${analyticsNumber(point.sessions)} sessions`])}"/>`).join("")}`;
    }).join("")}
  </svg>`;
}

function renderAnalytics() {
  const selection = getAnalyticsSelection();
  const syncState = document.querySelector("#analytics-sync-state");
  const syncLabel = document.querySelector("#analytics-sync-label");
  const syncCopy = document.querySelector("#analytics-sync-copy");
  const connected = Object.entries(analyticsLiveData.sourceStates).filter(([,state])=>state==="connected").map(([platform])=>platform);
  const unavailable = Object.entries(analyticsLiveData.sourceStates).filter(([,state])=>state==="unavailable").map(([platform])=>platform);
  if(syncState) syncState.dataset.tone = analyticsLiveData.loading ? "loading" : connected.length ? (unavailable.length||analyticsLiveData.partialErrors.length?"warning":"success") : "error";
  if(syncLabel) syncLabel.textContent = analyticsLiveData.loading ? "Đang đồng bộ" : connected.length ? `Live · ${connected.join(" + ")}` : analyticsLiveData.attempted ? "Chưa có nguồn live" : "Chưa đồng bộ";
  if(syncCopy) syncCopy.textContent = analyticsLiveData.loading ? "Đang đọc Ads API…" : connected.length ? `${selection.campaigns.length} campaign${unavailable.length ? ` · ${unavailable.join(", ")} chưa khả dụng` : ""}` : "Đăng nhập hoặc kiểm tra connector";
  const range = analyticsDateRange();
  document.querySelector("#analytics-period-label").textContent = `${range.days} ngày`;
  renderGoogleDeepAnalytics(selection);
  renderAppsFlyerRetention(selection);

  const hasRows = selection.campaigns.length > 0;
  const moneyReady = Boolean(selection.currency && selection.currency!=="MIXED");
  const spend = selection.campaigns.reduce((sum,row)=>sum+Number(row.spend||0),0);
  const revenueRows = selection.campaigns.filter(row=>row.revenueAvailable);
  const revenue = revenueRows.reduce((sum,row)=>sum+Number(row.revenue||0),0);
  const revenuePartial = revenueRows.length !== selection.campaigns.length;
  const installRows = selection.campaigns.filter(row=>row.installsAvailable);
  const installs = installRows.reduce((sum,row)=>sum+Number(row.installs||0),0);
  const installsPartial = installRows.length !== selection.campaigns.length;
  const installsUnavailable = hasRows && installRows.length === 0;
  const registrations = selection.campaigns.reduce((sum,row)=>sum+Number(row.registrations||0),0);
  const roas = moneyReady && !revenuePartial && spend ? revenue/spend : null;
  const sourceNote = connected.length ? connected.join(" + ") : "Chưa có Ads API";
  const metricRows = analyticsLiveData.loading ? [
    ["Ad spend","…","Đang đồng bộ","₫"],["Revenue","…","Đang đồng bộ","↗"],["ROAS","…","Đang đồng bộ","⌁"],
    ["Installs","…","Đang đồng bộ","↓"],["Registrations","…","Đang đồng bộ","◎"],["DAU","—","Chưa có product event API","◉"]
  ] : [
    ["Ad spend",hasRows&&moneyReady?analyticsMoney(spend,selection.currency):"—",!hasRows?"Không có campaign trong phạm vi đã chọn":moneyReady?sourceNote:"Không thể cộng nhiều currency","₫"],
    ["Revenue",hasRows&&moneyReady&&!revenuePartial?analyticsMoney(revenue,selection.currency):"—",!hasRows?"Không có campaign trong phạm vi đã chọn":revenuePartial?`Partial · ${sourceNote}`:sourceNote,"↗"],
    ["ROAS",roas===null?"—":`${roas.toLocaleString("vi-VN",{maximumFractionDigits:2})}x`,roas===null?(revenuePartial?"Revenue đang partial":"Cần spend và revenue cùng currency"):"Revenue / spend","⌁"],
    ["Installs",!hasRows||installsUnavailable?"—":analyticsNumber(installs),!hasRows?"Không có campaign trong phạm vi đã chọn":installsPartial?`Partial · ${sourceNote}`:sourceNote,"↓"],
    ["Registrations",hasRows?analyticsNumber(registrations):"—",!hasRows?"Không có campaign trong phạm vi đã chọn":installs&&!installsPartial?`${analyticsPercent(registrations/installs*100)} install → register`:sourceNote,"◎"],
    ["DAU","—","Chưa có product event API","◉"]
  ];
  document.querySelector("#analytics-metrics").innerHTML = metricRows.map(([label,value,note,icon])=>`
    <article class="metric analytics-metric"><div class="metric-top"><span class="metric-label">${label}</span><span class="metric-icon">${icon}</span></div><strong>${value}</strong><small>${analyticsEscape(note)}</small></article>`).join("");

  const dailyMap = new Map();
  selection.daily.forEach(row=>{
    if(selection.campaign!=="all") return;
    const current = dailyMap.get(row.date) || {date:row.date,spend:0,revenue:0,revenueAvailable:true};
    current.spend += Number(row.spend||0);
    current.revenue += Number(row.revenue||0);
    current.revenueAvailable &&= row.revenueAvailable !== false;
    dailyMap.set(row.date,current);
  });
  const daily = [...dailyMap.values()].sort((a,b)=>a.date.localeCompare(b.date)).map(row=>({...row,roas:row.revenueAvailable&&row.spend?row.revenue/row.spend:null}));
  const growthTarget = document.querySelector("#analytics-growth-chart");
  if(analyticsLiveData.loading) growthTarget.innerHTML = analyticsUnavailable("Đang đồng bộ dữ liệu theo ngày…");
  else if(selection.campaign!=="all") growthTarget.innerHTML = analyticsUnavailable("Ads API hiện chưa trả daily breakdown theo một campaign đã chọn. Tổng campaign vẫn hiển thị ở KPI và bảng.");
  else if(!daily.length) growthTarget.innerHTML = analyticsUnavailable("Không có daily breakdown từ các nguồn đang chọn.");
  else if(!moneyReady) growthTarget.innerHTML = analyticsUnavailable("Không thể vẽ spend/revenue khi các nguồn dùng nhiều currency khác nhau.");
  else {
    const xStart=48, xEnd=542, chartBottom=202, chartTop=36;
    const x = index=>daily.length===1?(xStart+xEnd)/2:xStart+index*(xEnd-xStart)/(daily.length-1);
    const revenueTrendAvailable=daily.every(row=>row.revenueAvailable);
    const maxMoney=Math.max(...daily.flatMap(row=>revenueTrendAvailable?[row.spend,row.revenue]:[row.spend]),1);
    const maxRoas=Math.max(...daily.map(row=>row.roas||0),1);
    const yMoney=value=>chartBottom-value/maxMoney*(chartBottom-chartTop);
    const yRoas=value=>chartBottom-(value||0)/maxRoas*(chartBottom-chartTop);
    const spendPoints=daily.map((row,index)=>`${x(index)},${yMoney(row.spend)}`).join(" ");
    const revenuePoints=revenueTrendAvailable?daily.map((row,index)=>`${x(index)},${yMoney(row.revenue)}`).join(" "):"";
    const roasPoints=revenueTrendAvailable?daily.map((row,index)=>row.roas===null?null:`${x(index)},${yRoas(row.roas)}`).filter(Boolean).join(" "):"";
    growthTarget.innerHTML = `<svg viewBox="0 0 590 240" role="img" aria-label="Spend, revenue và ROAS thật theo ngày">
      ${[36,78,120,161,202].map(y=>`<line class="grid-line" x1="38" y1="${y}" x2="552" y2="${y}"/>`).join("")}
      ${revenuePoints?`<polygon class="analytics-revenue-area" points="${x(0)},${chartBottom} ${revenuePoints} ${x(daily.length-1)},${chartBottom}"/>`:""}
      <polyline class="analytics-spend-path" points="${spendPoints}"/>${revenuePoints?`<polyline class="analytics-revenue-path" points="${revenuePoints}"/>`:""}
      ${roasPoints?`<polyline class="analytics-roas-path" points="${roasPoints}"/>`:""}
      ${daily.map((row,index)=>{ const label=new Date(`${row.date}T00:00:00`).toLocaleDateString("vi-VN",{day:"2-digit",month:"2-digit"}); const lines=[`Spend: ${analyticsMoney(row.spend,selection.currency)}`,revenueTrendAvailable?`Revenue: ${analyticsMoney(row.revenue,selection.currency)}`:"Revenue: Chưa đủ dữ liệu toàn nguồn",row.roas===null?"ROAS: —":`ROAS: ${row.roas.toLocaleString("vi-VN",{maximumFractionDigits:2})}x`]; return `<rect class="analytics-hover-zone" x="${Math.max(38,x(index)-18)}" y="${chartTop}" width="36" height="${chartBottom-chartTop}" tabindex="0" data-analytics-tooltip="${analyticsTooltip(label,lines)}"/><circle class="analytics-point spend-point" cx="${x(index)}" cy="${yMoney(row.spend)}" r="4"/>${revenueTrendAvailable?`<circle class="analytics-point revenue-point" cx="${x(index)}" cy="${yMoney(row.revenue)}" r="4"/>`:""}${row.roas===null?"":`<circle class="analytics-point roas-point" cx="${x(index)}" cy="${yRoas(row.roas)}" r="3"/>`}<text class="axis-text" x="${x(index)}" y="228" text-anchor="middle">${label}</text>`; }).join("")}
    </svg>`;
  }

  const funnel = [
    {label:"Impressions",value:selection.campaigns.reduce((sum,row)=>sum+Number(row.impressions||0),0),available:true},
    {label:"Clicks",value:selection.campaigns.reduce((sum,row)=>sum+Number(row.clicks||0),0),available:true},
    {label:"Installs",value:installs,available:!installsPartial},
    {label:"Registrations",value:registrations,available:true},
    {label:"Purchases",value:selection.campaigns.reduce((sum,row)=>sum+Number(row.purchases||0),0),available:true}
  ];
  document.querySelector("#analytics-funnel").innerHTML = analyticsLiveData.loading ? analyticsUnavailable("Đang đồng bộ funnel…") : !selection.campaigns.length ? analyticsUnavailable("Không có campaign trong phạm vi đã chọn.") : funnel.map((step,index)=>{
    const previous=funnel[index-1];
    const rate=index&&step.available&&previous.available&&previous.value ? step.value/previous.value*100 : null;
    const width=Math.max(46,100-index*11);
    const value=step.available?analyticsNumber(step.value):"—";
    const line=rate===null?(index?"Không đủ dữ liệu":"Ads API"):`${analyticsPercent(rate)} từ bước trước`;
    return `<div class="funnel-step" data-analytics-tooltip="${analyticsTooltip(step.label,[`Giá trị: ${value}`,line])}" tabindex="0"><span style="width:${width}%"><i>${index+1}</i><strong>${step.label}</strong><b>${value}</b></span><small>${line}</small></div>`;
  }).join("");

  const channels=aggregateAnalyticsRows(selection.campaigns,row=>`${row.platform}:${row.currency||"UNKNOWN"}`).map(row=>({...row,roas:row.revenueAvailable&&row.spend?row.revenue/row.spend:null,cpi:row.installsAvailable&&row.installs?row.spend/row.installs:null,cpr:row.registrations?row.spend/row.registrations:null}));

  const breakdownErrors=analyticsLiveData.breakdownErrors||[];
  const breakdownErrorCopy=dimension=>{
    const errors=breakdownErrors.filter(error=>!error.dimension||String(error.dimension).includes(dimension));
    return errors.length?`Một số nguồn không trả ${dimension}: ${[...new Set(errors.map(error=>error.platform))].join(", ")}.`:"Không có dữ liệu trong khoảng ngày và bộ lọc đã chọn.";
  };
  const ageMetric=document.querySelector("#analytics-age-metric")?.value||"impressions";
  const ageRows=aggregateAnalyticsBreakdown(selection.breakdowns.age||[],"age");
  const ageMetricAllowed=ageMetric!=="spend"||moneyReady;
  const ageOrder=["13–17","18–24","25–34","35–44","45–54","55–64","55+","65+","Không xác định"];
  ageRows.sort((a,b)=>{const ai=ageOrder.indexOf(a.label),bi=ageOrder.indexOf(b.label);return (ai<0?99:ai)-(bi<0?99:bi);});
  const ageTotal=ageRows.reduce((sum,row)=>sum+Number(row[ageMetric]||0),0);
  document.querySelector("#age-chart").innerHTML = analyticsLiveData.loading?analyticsUnavailable("Đang đọc age breakdown…"):!ageMetricAllowed?analyticsUnavailable("Không thể cộng spend theo độ tuổi khi các nguồn dùng nhiều currency."):!ageRows.length?analyticsUnavailable(breakdownErrorCopy("age")):ageRows.map(row=>{
    const value=Number(row[ageMetric]||0),share=ageTotal?value/ageTotal*100:0;
    const display=ageMetric==="spend"?analyticsMoney(value,selection.currency):analyticsNumber(value);
    return `<div class="horizontal-bar" tabindex="0" data-analytics-tooltip="${analyticsTooltip(row.label,[`${ageMetric}: ${display}`,`${analyticsPercent(share)} tổng`,[...row.platforms].join(" + ")])}"><span>${analyticsEscape(row.label)}</span><div><i style="width:${share}%"></i></div><strong>${analyticsPercent(share)}</strong></div>`;
  }).join("");

  const genderRows=aggregateAnalyticsBreakdown(selection.breakdowns.gender||[],"gender").sort((a,b)=>b.impressions-a.impressions);
  const deviceRows=aggregateAnalyticsBreakdown(selection.breakdowns.device||[],"device").sort((a,b)=>b.impressions-a.impressions);
  const genderTotal=genderRows.reduce((sum,row)=>sum+row.impressions,0),deviceTotal=deviceRows.reduce((sum,row)=>sum+row.impressions,0);
  if(analyticsLiveData.loading) document.querySelector("#gender-device-chart").innerHTML=analyticsUnavailable("Đang đọc audience breakdown…");
  else if(!genderRows.length&&!deviceRows.length) document.querySelector("#gender-device-chart").innerHTML=analyticsUnavailable(breakdownErrorCopy("gender"));
  else {
    const colors=["#397f9f","#7664e7","#c4c1cf","#ef9d55","#20a37a"];
    let stop=0;
    const stops=genderRows.map((row,index)=>{const from=stop;stop+=genderTotal?row.impressions/genderTotal*100:0;return `${colors[index%colors.length]} ${from}% ${stop}%`;}).join(",");
    document.querySelector("#gender-device-chart").innerHTML=`<div class="mix-donut" style="background:${stops?`conic-gradient(${stops})`:"#eeedf3"}" tabindex="0" data-analytics-tooltip="${analyticsTooltip("Gender",genderRows.map(row=>`${row.label}: ${analyticsNumber(row.impressions)} impressions`))}"><div><strong>${analyticsNumber(genderTotal)}</strong><small>impressions</small></div></div><div class="mix-stats">${genderRows.map((row,index)=>`<span tabindex="0" data-analytics-tooltip="${analyticsTooltip(row.label,[`${analyticsNumber(row.impressions)} impressions`,analyticsPercent(genderTotal?row.impressions/genderTotal*100:0)])}"><i style="background:${colors[index%colors.length]}"></i><small>${analyticsEscape(row.label)}</small><strong>${analyticsPercent(genderTotal?row.impressions/genderTotal*100:0)}</strong></span>`).join("")}<footer>${deviceRows.slice(0,6).map(row=>`<b tabindex="0" data-analytics-tooltip="${analyticsTooltip(row.label,[`${analyticsNumber(row.impressions)} impressions`,analyticsPercent(deviceTotal?row.impressions/deviceTotal*100:0)])}">${analyticsEscape(row.label)} ${analyticsPercent(deviceTotal?row.impressions/deviceTotal*100:0)}</b>`).join("")}</footer></div>`;
  }

  const countryRows=aggregateAnalyticsBreakdown(selection.breakdowns.country||[],"country").sort((a,b)=>b.impressions-a.impressions).slice(0,8);
  const countryMax=Math.max(...countryRows.map(row=>row.impressions),1);
  document.querySelector("#geo-chart").innerHTML=analyticsLiveData.loading?analyticsUnavailable("Đang đọc country breakdown…"):!countryRows.length?analyticsUnavailable(breakdownErrorCopy("country")):countryRows.map((row,index)=>`<div class="geo-row" tabindex="0" data-analytics-tooltip="${analyticsTooltip(row.label,[`${analyticsNumber(row.impressions)} impressions`,`${analyticsNumber(row.clicks)} clicks`,[...row.platforms].join(" + ")])}"><span>${index+1}</span><div><strong>${analyticsEscape(row.label)}</strong><small>${analyticsNumber(row.clicks)} clicks</small></div><div class="geo-track"><i style="width:${row.impressions/countryMax*100}%"></i></div><b>${analyticsNumber(row.impressions)}</b></div>`).join("");

  const maxCost=Math.max(...channels.flatMap(row=>[row.cpi||0,row.cpr||0]),1);
  document.querySelector("#analytics-cost-platform").innerHTML = channels.length ? channels.map(row=>`<div class="cost-platform-row"><span class="platform-badge">${platformDot(row.platform)}${row.platform} · ${analyticsEscape(row.currency||"—")}</span><div class="cost-bars"><span tabindex="0" data-analytics-tooltip="${analyticsTooltip(`${row.platform} · CPI`,[row.cpi===null?"Chưa đủ spend/install":analyticsMoney(row.cpi,row.currency),`${analyticsNumber(row.installs)} installs`])}"><i class="cpi-bar" style="width:${(row.cpi||0)/maxCost*100}%"></i><b>CPI ${row.cpi===null?"—":analyticsMoney(row.cpi,row.currency)}</b></span><span tabindex="0" data-analytics-tooltip="${analyticsTooltip(`${row.platform} · CPR`,[row.cpr===null?"Chưa đủ spend/registration":analyticsMoney(row.cpr,row.currency),`${analyticsNumber(row.registrations)} registrations`])}"><i class="cpr-bar" style="width:${(row.cpr||0)/maxCost*100}%"></i><b>CPR ${row.cpr===null?"—":analyticsMoney(row.cpr,row.currency)}</b></span></div></div>`).join("") : analyticsUnavailable("Không có dữ liệu cost theo platform.");

  if(!channels.length) document.querySelector("#analytics-spend-share").innerHTML=analyticsUnavailable("Không có dữ liệu spend theo platform.");
  else if(!moneyReady) document.querySelector("#analytics-spend-share").innerHTML=analyticsUnavailable("Không so sánh tỷ trọng spend giữa các currency khác nhau.");
  else {
    const total=channels.reduce((sum,row)=>sum+row.spend,0) || 1, colors={Meta:"#665de7",Google:"#25a276",TikTok:"#242333"};
    let start=0;
    const stops=channels.map(row=>{const from=start;start+=row.spend/total*100;return `${colors[row.platform]} ${from}% ${start}%`;}).join(",");
    document.querySelector("#analytics-spend-share").innerHTML=`<div class="spend-share-donut" style="background:conic-gradient(${stops})" tabindex="0" data-analytics-tooltip="${analyticsTooltip("Tổng spend",[analyticsMoney(total,selection.currency)])}"><div><strong>${analyticsMoney(total,selection.currency)}</strong><small>Tổng spend</small></div></div><div class="spend-share-legend">${channels.map(row=>{const share=row.spend/total*100;return `<span tabindex="0" data-analytics-tooltip="${analyticsTooltip(row.platform,[analyticsMoney(row.spend,row.currency),`${analyticsPercent(share)} tổng spend`])}"><i style="background:${colors[row.platform]}"></i><small>${row.platform}</small><strong>${analyticsPercent(share)}</strong></span>`;}).join("")}</div>`;
  }

  const regionRows=aggregateAnalyticsBreakdown(selection.breakdowns.region||[],"region").sort((a,b)=>b.impressions-a.impressions).slice(0,12);
  const regionMax=Math.max(...regionRows.map(row=>row.impressions),1);
  document.querySelector("#analytics-regions").innerHTML=analyticsLiveData.loading?analyticsUnavailable("Đang đọc region breakdown…"):!regionRows.length?analyticsUnavailable(breakdownErrorCopy("region")):regionRows.map((row,index)=>`<div class="region-row" tabindex="0" data-analytics-tooltip="${analyticsTooltip(row.label,[`${analyticsNumber(row.impressions)} impressions`,`${analyticsNumber(row.clicks)} clicks`,[...row.platforms].join(" + ")])}"><span>${index+1}</span><div><strong>${analyticsEscape(row.label)}</strong><small>${[...row.platforms].join(" + ")}</small><i><b style="width:${row.impressions/regionMax*100}%"></b></i></div><div><strong>${analyticsNumber(row.impressions)}</strong><small>impressions</small></div></div>`).join("");
}

function ensureAnalyticsTooltip() {
  let tooltip = document.querySelector("#analytics-tooltip");
  if(tooltip) return tooltip;
  tooltip = document.createElement("div");
  tooltip.id = "analytics-tooltip";
  tooltip.className = "analytics-tooltip";
  tooltip.setAttribute("role","tooltip");
  document.body.appendChild(tooltip);
  return tooltip;
}

function positionAnalyticsTooltip(tooltip,x,y) {
  const margin=10, offset=14;
  const bounds=tooltip.getBoundingClientRect();
  tooltip.style.left=`${Math.max(margin,Math.min(window.innerWidth-bounds.width-margin,x+offset))}px`;
  tooltip.style.top=`${Math.max(margin,Math.min(window.innerHeight-bounds.height-margin,y+offset))}px`;
}

function showAnalyticsTooltip(target,event) {
  let content;
  try { content=JSON.parse(decodeURIComponent(target.dataset.analyticsTooltip||"")); }
  catch { return; }
  const tooltip=ensureAnalyticsTooltip();
  tooltip.replaceChildren();
  const title=document.createElement("strong");
  title.textContent=content.title || "Chi tiết";
  tooltip.appendChild(title);
  (content.lines||[]).forEach(line=>{
    const item=document.createElement("span");
    item.textContent=line;
    tooltip.appendChild(item);
  });
  tooltip.classList.add("visible");
  const rect=target.getBoundingClientRect();
  positionAnalyticsTooltip(tooltip,event?.clientX || rect.left+rect.width/2,event?.clientY || rect.top+rect.height/2);
}

function hideAnalyticsTooltip() {
  document.querySelector("#analytics-tooltip")?.classList.remove("visible");
}

function bindAnalyticsTooltips() {
  document.addEventListener("pointerover",event=>{
    const target=event.target.closest?.("[data-analytics-tooltip]");
    if(target) showAnalyticsTooltip(target,event);
  });
  document.addEventListener("pointermove",event=>{
    if(!event.target.closest?.("[data-analytics-tooltip]")) return;
    const tooltip=document.querySelector("#analytics-tooltip.visible");
    if(tooltip) positionAnalyticsTooltip(tooltip,event.clientX,event.clientY);
  });
  document.addEventListener("pointerout",event=>{
    const target=event.target.closest?.("[data-analytics-tooltip]");
    if(target && !target.contains(event.relatedTarget)) hideAnalyticsTooltip();
  });
  document.addEventListener("focusin",event=>{
    const target=event.target.closest?.("[data-analytics-tooltip]");
    if(target) showAnalyticsTooltip(target);
  });
  document.addEventListener("focusout",event=>{
    if(event.target.closest?.("[data-analytics-tooltip]")) hideAnalyticsTooltip();
  });
}

function exportAnalyticsData() {
  const selection=getAnalyticsSelection();
  if(!selection.campaigns.length) return showToast("Không có campaign live để xuất trong phạm vi hiện tại.");
  const headers=["Platform","Campaign","Account ID","Currency","Spend","Revenue","Revenue status","Impressions","Clicks","Installs","Installs status","Registrations","Purchases","ROAS","CPI","CPR"];
  const rows=selection.campaigns.map(row=>[
    row.platform,row.name,row.accountId||"",row.currency||"",Number(row.spend||0),row.revenueAvailable?Number(row.revenue||0):"",row.revenueAvailable?"available":"unavailable",
    Number(row.impressions||0),Number(row.clicks||0),row.installsAvailable?Number(row.installs||0):"",row.installsAvailable?"available":"unavailable",
    Number(row.registrations||0),Number(row.purchases||0),row.roas??"",row.cpi??"",row.cpr??""
  ]);
  const csv=[headers,...rows].map(row=>row.map(value=>`"${String(value??"").replace(/"/g,'""')}"`).join(",")).join("\n");
  const url=URL.createObjectURL(new Blob([`\uFEFF${csv}`],{type:"text/csv;charset=utf-8"}));
  const link=document.createElement("a");
  link.href=url;
  link.download=`growth-analytics-${analyticsDateRange().from}-${analyticsDateRange().to}.csv`;
  link.click();
  URL.revokeObjectURL(url);
  showToast("Đã xuất Growth Analytics từ dữ liệu Ads API live.");
}

function renderSegments() {
  const totalUsers = data.segments.reduce((sum,row)=>sum+row.users,0);
  document.querySelector("#segment-summary").innerHTML = [
    ["Total segment users",totalUsers.toLocaleString("vi-VN"),"Deduplicated audience","◉"],
    ["Ready to activate","4","Meta · Google · TikTok","↗"],
    ["High-value users","14.080","HVP + Whales","✦"],
    ["Churn opportunity","40.700","Risk + Lapsed","△"]
  ].map(([label,value,note,icon])=>`<article class="metric segment-summary"><div class="metric-top"><span class="metric-label">${label}</span><span class="metric-icon">${icon}</span></div><strong>${value}</strong><small>${note}</small></article>`).join("");

  document.querySelector("#segment-grid").innerHTML = data.segments.map(row=>`
    <article class="card segment-card ${row.tone}">
      <div class="segment-card-top"><span>${row.key}</span><span class="pill ${row.status==="Ready"?"green":"amber"}">${row.status}</span></div>
      <h2>${row.name}</h2><p>${row.definition}</p>
      <div class="segment-size"><strong>${row.users.toLocaleString("vi-VN")}</strong><small>users</small><b class="${row.growth<0?"negative":""}">${row.growth>0?"↑":"↓"} ${Math.abs(row.growth).toLocaleString("vi-VN")}%</b></div>
      <div class="segment-stats"><span><small>ARPU</small><strong>${row.arpu}</strong></span><span><small>ROAS</small><strong>${row.roas}</strong></span></div>
      <footer><div>${row.platforms.map(platform=>`<i class="${platformClass(platform)}">${platform[0]}</i>`).join("")}</div><button class="segment-use-button" data-segment="${row.name}">Activate →</button></footer>
    </article>`).join("");

  document.querySelector("#segment-activation").innerHTML = data.segments.slice(0,4).map(row=>`
    <div class="activation-row"><span class="segment-key ${row.tone}">${row.key}</span><div><strong>${row.name}</strong><small>${row.users.toLocaleString("vi-VN")} matched users</small></div><div>${row.platforms.map(platform=>`<i class="${platformClass(platform)}">${platform[0]}</i>`).join("")}</div><span class="pill green">Ready</span></div>`).join("");
  const matrix = [["HVP","—","18%","31%","7%"],["NEW","18%","—","24%","3%"],["ENG","31%","24%","—","12%"],["RISK","7%","3%","12%","—"]];
  document.querySelector("#segment-overlap").innerHTML = `<div class="overlap-head"><span></span><b>HVP</b><b>NEW</b><b>ENG</b><b>RISK</b></div>${matrix.map(row=>`<div><b>${row[0]}</b>${row.slice(1).map(value=>`<span class="${parseInt(value)>25?"high":parseInt(value)>10?"medium":""}">${value}</span>`).join("")}</div>`).join("")}`;
  renderAudienceMixer();
}

function renderAudienceMixer() {
  const includedKey = document.querySelector("#mixer-included")?.value || "HVP";
  const intersectionKey = document.querySelector("#mixer-intersection")?.value || "ENG";
  const included = data.segments.find(row=>row.key===includedKey) || data.segments[0];
  const intersection = data.segments.find(row=>row.key===intersectionKey) || data.segments[2];
  const overlapMap = { "HVP-ENG":.31,"ENG-HVP":.31,"HVP-NEW":.18,"NEW-HVP":.18,"HVP-RISK":.07,"RISK-HVP":.07,"NEW-ENG":.24,"ENG-NEW":.24,"NEW-RISK":.03,"RISK-NEW":.03,"ENG-RISK":.12,"RISK-ENG":.12 };
  const overlap = includedKey===intersectionKey ? 1 : overlapMap[`${includedKey}-${intersectionKey}`] || .1;
  const potentialReach = Math.round(Math.min(included.users,intersection.users)*overlap);
  const maxReach = Math.max(included.users,intersection.users,1);
  document.querySelector("#audience-mixer-result").innerHTML = `
    <span>Potential matched reach</span><strong>${potentialReach.toLocaleString("vi-VN")} users</strong><small>${included.name} AND ${intersection.name}</small>
    <div class="mixer-result-track"><i style="width:${Math.max(4,potentialReach/maxReach*100)}%"></i></div>
    <footer><span>${Math.round(overlap*100)}% overlap</span><span>Estimate before platform match</span></footer>`;
}

function renderQueue() {
  const alerts = getCommandAlerts();
  document.querySelector("#action-queue").innerHTML = alerts.length ? alerts.map(a=>`
    <div class="queue-item"><strong>${a.subtitle}</strong><p>${a.title}</p><span class="amount">${a.riskValue ? commandMoney(a.riskValue) : "Cơ hội"}</span></div>`).join("") : `<div class="queue-item"><strong>Không có cảnh báo</strong><p>Phạm vi đang chọn chưa ghi nhận rủi ro cần xử lý.</p></div>`;
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

let selectedCreativeCode = "V7-2606-VA";
let creativeLiveRows = [];
let creativeLiveAttempted = false;
let creativeLiveLoading = false;

function creativeDateRange() {
  const days = Number(document.querySelector("#creative-period")?.value || 30);
  const to = new Date(), from = new Date(to);
  from.setDate(from.getDate() - days + 1);
  const iso = date=>`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
  return { from:iso(from), to:iso(to), days };
}

function creativeCodeFromName(...values) {
  const text = values.filter(Boolean).join(" ");
  const match = text.match(/\bV\d+(?:[-_\s]\d{4})?(?:[-_\s][A-Z][A-Z0-9]*)?\b/i);
  return match ? normalizeCreativeCode(match[0]) : "";
}

function creativeEditorFromCode(code) {
  const suffix = code.split("-").at(-1);
  return { VA:"Việt Anh", P1:"Team P1", P2:"Team P2" }[suffix] || "Chưa map";
}

function creativeOsFromName(...values) {
  const text = values.filter(Boolean).join(" ");
  if(/\bios\b/i.test(text)) return "iOS";
  if(/android|\band\b/i.test(text)) return "AND";
  return "";
}

function normalizeLiveCreative(row, platform) {
  const code = creativeCodeFromName(row.adName, row.entityName, row.campaignName);
  if(!code) return null;
  const detail = row.detail || {};
  const openingViews = Number(detail.openingViews || 0);
  const midpointViews = Number(detail.midpointViews ?? detail.videoP50 ?? 0);
  const hookRate = detail.hookRate == null ? null : Number(detail.hookRate);
  const holdRate = detail.holdRate == null ? null : Number(detail.holdRate);
  const os = creativeOsFromName(row.adName, row.adsetName, row.campaignName);
  return {
    code, editor:creativeEditorFromCode(code), os, platforms:[platform], codeStatus:/^V\d+-\d{4}-[A-Z][A-Z0-9]*$/.test(code) ? "Chuẩn" : "Legacy",
    spend:Number(row.spend || 0), impressions:Number(row.impressions || 0), clicks:Number(row.linkClicks ?? row.clicks ?? 0),
    installs:Number(row.installs || 0), registrations:Number(row.registrations || 0),
    openingViews, midpointViews, hookRate, holdRate, openingMetric:detail.openingMetric || "", thumbnailUrl:row.thumbnailUrl || "",
    coverage:[{
      platform, accountId:row.accountId, account:row.account, campaignId:row.campaignId, campaign:row.campaignName,
      adGroupId:row.adsetId, adGroupName:row.adsetName, assetGroupId:platform === "Google" ? row.adsetId : "",
      assetGroupName:platform === "Google" ? row.adsetName : "", adId:row.adId, adName:row.adName || row.entityName,
      creativeId:row.creativeId, thumbnailUrl:row.thumbnailUrl || "", spend:Number(row.spend || 0), installs:Number(row.installs || 0),
      cpi:Number(row.installs || 0) ? Number(row.spend || 0)/Number(row.installs) : 0,
      openingViews, midpointViews, hookRate, holdRate, openingMetric:detail.openingMetric || ""
    }]
  };
}

function setCreativeSourceState(label, copy, tone="amber") {
  const state = document.querySelector("#creative-source-state");
  if(state) { state.className=`pill ${tone}`; state.textContent=label; }
  const detail = document.querySelector("#creative-source-copy");
  if(detail) detail.textContent=copy;
}

async function syncCreativesLive() {
  if(!window.__uaSessionToken || creativeLiveLoading) return;
  const range = creativeDateRange();
  creativeLiveLoading = true;
  creativeLiveAttempted = true;
  setCreativeSourceState("Đang đồng bộ",`${range.from} → ${range.to} · cấp ad`,"violet");
  const sources = [
    ["Meta","/api/meta-accounts"],
    ["Google","/api/google-accounts"],
    ["TikTok","/api/tiktok-accounts"]
  ];
  try {
    creativeLiveRows = [];
    const completed = [];
    const failures = [];
    const warnings = [];
    const updateCreativeSource = ()=>{
      const thumbnails = creativeLiveRows.filter(row=>row.thumbnailUrl).length;
      if(completed.length) {
        const warningCopy = [...warnings,...failures.map(platform=>`${platform} chưa sẵn sàng`)];
        setCreativeSourceState(
          `${completed.join(" + ")} live`,
          `${creativeLiveRows.length} ad đã map mã · ${thumbnails} thumbnail${warningCopy.length ? ` · ${warningCopy.join(" · ")}` : ""}`,
          warningCopy.length ? "amber" : "green"
        );
      } else if(failures.length === sources.length) {
        setCreativeSourceState("Chưa có dữ liệu live","Kiểm tra connector hoặc quyền đọc ad-level.","red");
      }
      renderCreatives();
    };
    const results = await Promise.allSettled(sources.map(async ([platform,endpoint])=>{
      const params = new URLSearchParams({mode:"insights",level:"ad",from:range.from,to:range.to});
      const response = await fetch(`${endpoint}?${params}`,{headers:metaAuthHeaders()});
      const payload = await response.json().catch(()=>({}));
      if(!response.ok) throw Object.assign(new Error(payload.error || `Không thể đọc ${platform}.`),{platform});
      const mappedRows = (payload.campaigns || []).map(row=>normalizeLiveCreative(row,platform)).filter(Boolean);
      creativeLiveRows.push(...mappedRows);
      completed.push(platform);
      (payload.partialErrors || []).forEach(error=>warnings.push(`${platform}: ${error.message || "dữ liệu không đầy đủ"}`));
      updateCreativeSource();
      return { platform, mappedRows };
    }));
    results.forEach(result=>{
      if(result.status === "rejected") failures.push(result.reason?.platform || "Nguồn khác");
    });
    updateCreativeSource();
  } finally {
    creativeLiveLoading = false;
  }
}

function normalizeCreativeCode(value) {
  return String(value || "")
    .trim()
    .toUpperCase()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

function creativeUsageKey(item, index) {
  const identity = item.adId || item.assetId || item.adGroupId || item.assetGroupId || item.campaignId || item.campaign;
  return [item.platform, item.accountId || item.account, identity || index].join(":");
}

function uniqueCount(items, fields) {
  const values = items.map(item=>fields.map(field=>item[field]).find(Boolean)).filter(Boolean);
  return values.length ? new Set(values).size : null;
}

function aggregateCreativeRows(sourceRows) {
  const grouped = new Map();
  sourceRows.forEach(row=>{
    const code = normalizeCreativeCode(row.code);
    const current = grouped.get(code) || {
      code, sourceCodes:new Set(), editors:new Set(), operatingSystems:new Set(), platforms:new Set(), codeStatuses:new Set(),
      spend:0, impressions:0, clicks:0, installs:0, registrations:0, openingViews:0, midpointViews:0,
      hookWeighted:0, hookWeight:0, holdWeighted:0, holdWeight:0, openingMetrics:new Set(), coverage:[], thumbnailUrl:""
    };
    current.sourceCodes.add(row.code);
    if(row.editor) current.editors.add(row.editor);
    if(row.os) current.operatingSystems.add(row.os);
    (row.platforms || []).forEach(platform=>current.platforms.add(platform));
    if(row.codeStatus) current.codeStatuses.add(row.codeStatus);
    current.spend += Number(row.spend || 0);
    current.impressions += Number(row.impressions || 0);
    current.clicks += Number(row.clicks ?? (Number(row.impressions || 0) * Number(row.ctr || 0) / 100));
    current.installs += Number(row.installs || 0);
    current.registrations += Number(row.registrations || 0);
    current.openingViews += Number(row.openingViews || 0);
    current.midpointViews += Number(row.midpointViews || 0);
    const rowHook = row.hookRate ?? row.hook;
    const rowHold = row.holdRate ?? row.hold;
    if(rowHook != null && row.impressions) { current.hookWeighted += Number(rowHook)*Number(row.impressions); current.hookWeight += Number(row.impressions); }
    const holdWeight = Number(row.openingViews || row.impressions || 0);
    if(rowHold != null && holdWeight) { current.holdWeighted += Number(rowHold)*holdWeight; current.holdWeight += holdWeight; }
    if(row.openingMetric) current.openingMetrics.add(row.openingMetric);
    current.thumbnailUrl ||= row.thumbnailUrl || "";
    (row.coverage || []).forEach((item,index)=>{
      const usage = { ...item, os:row.os, editor:row.editor, thumbnailUrl:item.thumbnailUrl || row.thumbnailUrl || "" };
      current.coverage.push({ ...usage, usageKey:creativeUsageKey(usage,index) });
      if(item.platform) current.platforms.add(item.platform);
      current.thumbnailUrl ||= usage.thumbnailUrl;
    });
    grouped.set(code,current);
  });
  return [...grouped.values()].map(item=>{
    const coverage = [...new Map(item.coverage.map(usage=>[usage.usageKey,usage])).values()];
    return {
      ...item,
      coverage,
      platforms:[...item.platforms], editors:[...item.editors], operatingSystems:[...item.operatingSystems],
      codeStatus:item.codeStatuses.has("Chuẩn") && item.codeStatuses.size === 1 ? "Chuẩn" : [...item.codeStatuses].join(" · "),
      placements:coverage.length,
      accounts:uniqueCount(coverage,["accountId","account"]),
      campaigns:uniqueCount(coverage,["campaignId","campaign"]),
      adGroups:uniqueCount(coverage,["adGroupId","assetGroupId","adsetId"]),
      ads:uniqueCount(coverage,["adId","assetId"]),
      ctr:item.impressions ? item.clicks/item.impressions*100 : null,
      cpi:item.installs ? item.spend/item.installs : null,
      cpr:item.registrations ? item.spend/item.registrations : null,
      hookRate:item.openingViews && item.impressions ? item.openingViews/item.impressions*100 : item.hookWeight ? item.hookWeighted/item.hookWeight : null,
      holdRate:item.openingViews && item.midpointViews ? item.midpointViews/item.openingViews*100 : item.holdWeight ? item.holdWeighted/item.holdWeight : null,
      openingMetric:[...item.openingMetrics].join(" + ")
    };
  });
}

function safeCreativeThumbnailUrl(value) {
  try {
    const url = new URL(String(value || ""));
    return url.protocol === "https:" ? url.toString().replaceAll("&","&amp;").replaceAll('"',"&quot;") : "";
  } catch(_) {
    return "";
  }
}

function creativeThumbnail(creative, compact=false) {
  const className = compact ? "creative-thumbnail compact" : "creative-thumbnail";
  const thumbnailUrl = safeCreativeThumbnailUrl(creative.thumbnailUrl);
  if(thumbnailUrl) return `<span class="${className}"><img src="${thumbnailUrl}" alt="Thumbnail ${creative.code}" loading="lazy" referrerpolicy="no-referrer" /></span>`;
  return `<span class="${className} empty" title="Connector chưa trả thumbnail"><b>▧</b><small>Chưa có ảnh</small></span>`;
}

function creativeCount(value, suffix="") {
  return value === null ? "—" : `${value.toLocaleString("vi-VN")}${suffix}`;
}

function getCreativeSelection() {
  const query = (document.querySelector("#creative-search")?.value || "").trim().toLowerCase();
  const platform = document.querySelector("#creative-platform")?.value || "all";
  const os = document.querySelector("#creative-os")?.value || "all";
  const editor = document.querySelector("#creative-editor")?.value || "all";
  const sourceRows = creativeLiveAttempted ? creativeLiveRows : data.creatives;
  const rows = aggregateCreativeRows(sourceRows).filter(row =>
    (!query || `${row.code} ${row.editors.join(" ")} ${row.coverage.map(item=>`${item.account} ${item.campaign} ${item.adGroupName || ""} ${item.adName || ""}`).join(" ")}`.toLowerCase().includes(query)) &&
    (platform === "all" || row.platforms.includes(platform)) &&
    (os === "all" || row.operatingSystems.includes(os)) &&
    (editor === "all" || row.editors.includes(editor))
  );
  return { query, platform, os, editor, rows };
}

function renderCreatives() {
  const { rows } = getCreativeSelection();
  const spend = rows.reduce((sum,row)=>sum + row.spend,0);
  const installs = rows.reduce((sum,row)=>sum + row.installs,0);
  const invalidCodes = rows.filter(row=>row.codeStatus !== "Chuẩn").length;
  const totalPlacements = rows.reduce((sum,row)=>sum + row.placements,0);
  const accountKeys = new Set(rows.flatMap(row=>row.coverage.map(item=>`${item.platform}:${item.accountId || item.account}`)));
  const campaignKeys = new Set(rows.flatMap(row=>row.coverage.map(item=>`${item.platform}:${item.accountId || item.account}:${item.campaignId || item.campaign}`)));
  const metrics = [
    ["Creative codes", rows.length.toLocaleString("vi-VN"), `${invalidCodes} cần chuẩn hóa`, "trong bộ lọc hiện tại", invalidCodes ? "down" : "up", "⌁"],
    ["Lượt sử dụng", totalPlacements.toLocaleString("vi-VN"), `${campaignKeys.size} campaign`, "placement đã map", "neutral", "↗"],
    ["Tài khoản", accountKeys.size.toLocaleString("vi-VN"), `${campaignKeys.size} campaign`, "đa nền tảng", "neutral", "▦"],
    ["Total spend", formatVnd(spend), `${installs.toLocaleString("vi-VN")} installs`, "trong dữ liệu đang xem", "neutral", "₫"],
    ["Blended CPI", spend && installs ? formatVnd(spend/installs) : "—", `${installs.toLocaleString("vi-VN")} installs`, "spend / installs", "neutral", "↓"],
    ["Code hygiene", `${rows.length ? Math.round((rows.length-invalidCodes)/rows.length*100) : 0}%`, `${invalidCodes} mã legacy/missing`, "cần map editor & tháng", invalidCodes ? "down" : "up", "✓"]
  ];
  document.querySelector("#creative-metrics").innerHTML = metrics.map(([label,value,delta,note,tone,icon])=>`
    <article class="metric creative-metric">
      <div class="metric-top"><span class="metric-label">${label}</span><span class="metric-icon">${icon}</span></div>
      <strong>${value}</strong><small><span class="delta ${tone}">${delta}</span>${note}</small>
    </article>`).join("");

  const usageRows = [...rows].sort((a,b)=>b.placements-a.placements || b.spend-a.spend).slice(0,5);
  document.querySelector("#creative-usage-overview").innerHTML = usageRows.map((row,index)=>`
    <button class="reuse-item" data-creative-detail="${row.code}">
      <span class="reuse-rank">${index+1}</span>
      <div><strong>${row.code}</strong><small>${creativeCount(row.accounts)} account · ${creativeCount(row.campaigns)} campaign</small></div>
      <span class="reuse-score"><b>${row.placements}</b><small> lượt dùng</small></span>
      <span class="platform-mini">${row.platforms.join(" + ")}</span>
    </button>`).join("") || `<p class="empty-state">Không có creative phù hợp bộ lọc.</p>`;

  document.querySelector("#creative-platform-breakdown").innerHTML = ["Meta","TikTok","Google"].map(platform=>{
    const platformRows = rows.filter(row=>row.platforms.includes(platform));
    const placements = platformRows.reduce((sum,row)=>sum+row.coverage.filter(item=>item.platform===platform).length,0);
    const platformSpend = platformRows.reduce((sum,row)=>sum+row.coverage.filter(item=>item.platform===platform).reduce((subtotal,item)=>subtotal+Number(item.spend||0),0),0);
    const note = platform === "Google" ? "Asset / asset group" : "Ad / ad group";
    return `<div class="signal-item"><span class="${platformClass(platform)}">${platform[0]}</span><div><strong>${platform}</strong><small>${note} · ${platformRows.length} mã</small></div><b>${placements} lượt · ${formatVnd(platformSpend)}</b></div>`;
  }).join("");

  document.querySelector("#creative-count").textContent = `${rows.length} creative`;
  document.querySelector("#creative-table").innerHTML = rows.map(row=>`
    <tr>
      <td>${creativeThumbnail(row,true)}</td>
      <td><div class="creative-code-cell"><strong>${row.code}</strong><small class="${row.codeStatus === "Chuẩn" ? "valid" : "warning"}">${row.codeStatus}</small></div></td>
      <td><div class="platform-stack">${row.platforms.map(platform=>`<span class="account-logo ${platformClass(platform)}">${platform[0]}</span>`).join("")}</div></td>
      <td><strong>${row.operatingSystems.map(value=>value === "AND" ? "Android" : value).join(" + ")}</strong><small class="table-subline">${row.editors.join(" + ")}</small></td>
      <td><strong>${row.placements}</strong> lượt<small class="table-subline">${creativeCount(row.accounts)} account · ${creativeCount(row.campaigns)} campaign</small></td>
      <td><strong>${formatVnd(row.spend)}</strong></td>
      <td>${row.impressions.toLocaleString("vi-VN")}</td>
      <td>${row.ctr === null ? "—" : `${row.ctr.toLocaleString("vi-VN",{maximumFractionDigits:2})}%`}</td>
      <td title="${row.openingMetric || "Opening views / impressions"}">${row.hookRate === null ? "—" : `${row.hookRate.toLocaleString("vi-VN",{maximumFractionDigits:2})}%`}</td>
      <td title="50% video views / opening views">${row.holdRate === null ? "—" : `${row.holdRate.toLocaleString("vi-VN",{maximumFractionDigits:2})}%`}</td>
      <td>${row.installs.toLocaleString("vi-VN")}</td>
      <td>${row.registrations.toLocaleString("vi-VN")}</td>
      <td><strong>${row.cpi === null ? "—" : formatVnd(row.cpi)}</strong></td>
      <td><strong>${row.cpr === null ? "—" : formatVnd(row.cpr)}</strong></td>
      <td><button class="row-detail-button" data-creative-detail="${row.code}">Xem →</button></td>
    </tr>`).join("") || `<tr><td colspan="15"><p class="empty-state">Không tìm thấy creative phù hợp.</p></td></tr>`;
  document.querySelectorAll("#creative-table .creative-thumbnail img").forEach(image=>image.addEventListener("error",()=>{
    const thumbnail = image.closest(".creative-thumbnail");
    thumbnail.classList.add("empty");
    thumbnail.title = "URL thumbnail đã hết hạn hoặc không thể tải";
    thumbnail.innerHTML = "<b>▧</b><small>Chưa có ảnh</small>";
  },{once:true}));

  if (!rows.some(row=>row.code === selectedCreativeCode) && rows[0]) selectedCreativeCode = rows[0].code;
  renderCreativeCoverage(rows);
}

function renderCreativeCoverage(selectedRows) {
  const rows = selectedRows || getCreativeSelection().rows;
  const creative = rows.find(row=>row.code === selectedCreativeCode) || rows[0];
  if(!creative) return;
  document.querySelector("#coverage-title").textContent = creative.code;
  document.querySelector("#coverage-subtitle").textContent = `${creative.editors.join(" + ")} · ${creative.operatingSystems.map(value=>value === "AND" ? "Android" : value).join(" + ")} · ${creative.platforms.join(" + ")}`;
  const badge = document.querySelector("#coverage-badge");
  badge.className = "pill violet";
  badge.textContent = `${creative.placements} lượt sử dụng`;
  document.querySelector("#coverage-summary").innerHTML = [
    ["Account",creativeCount(creative.accounts)],["Campaign",creativeCount(creative.campaigns)],["Ad group / Asset group",creativeCount(creative.adGroups)],["Ad / Asset",creativeCount(creative.ads)],["Spend",formatVnd(creative.spend)],["CPI",creative.cpi === null ? "—" : formatVnd(creative.cpi)]
  ].map(([label,value])=>`<span><small>${label}</small><strong>${value}</strong></span>`).join("");
  document.querySelector("#coverage-list").innerHTML = creative.coverage.map(item=>`
    <div class="coverage-row">
      <span class="account-logo ${platformClass(item.platform)}">${item.platform[0]}</span>
      <div><strong>${item.adName || item.assetName || item.campaign}</strong><small>${item.account} · ${item.campaign}</small><small>${item.platform === "Google" ? (item.assetGroupName || item.adGroupName || "Chưa có dữ liệu asset group") : (item.adGroupName || item.adsetName || "Chưa có dữ liệu ad group")}</small></div>
      <span><small>Spend</small><strong>${formatVnd(item.spend)}</strong></span>
      <span><small>Installs</small><strong>${Number(item.installs || 0).toLocaleString("vi-VN")}</strong></span>
      <span><small>CPI</small><strong>${item.cpi ? formatVnd(item.cpi) : "—"}</strong></span>
    </div>`).join("") || `<p class="empty-state">Chưa có placement được map cho mã này.</p>`;
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
const formatAfMoney = (value,currency) => {
  if(!currency || currency==="MIXED") return "—";
  try { return new Intl.NumberFormat(currency==="VND"?"vi-VN":"en-US",{style:"currency",currency,maximumFractionDigits:currency==="VND"?0:2}).format(Number(value)||0); }
  catch { return "—"; }
};
const formatAfValue = (value, format) => format === "money" ? formatVnd(value) : format === "percent" ? `${value.toLocaleString("vi-VN", {maximumFractionDigits:2})}%` : Math.round(value).toLocaleString("vi-VN");
let appsflyerLive = false;
let appsflyerMeta = { availability:{ cost:false, revenue:false }, forecast:false, apiCalls:0 };

function appsFlyerDateKey(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone:"Asia/Ho_Chi_Minh", year:"numeric", month:"2-digit", day:"2-digit"
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map(part=>[part.type,part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function shiftAppsFlyerDate(dateKey, days) {
  const date = new Date(`${dateKey}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0,10);
}

function getAppsFlyerSelection() {
  const platform = document.querySelector("#af-platform")?.value || "all";
  const os = document.querySelector("#af-os")?.value || "all";
  const ua = document.querySelector("#af-ua")?.value || "all";
  const rows = data.appsflyer.breakdown.filter(row =>
    (platform === "all" || row.platform === platform) &&
    (os === "all" || row.os === os) &&
    (ua === "all" || row.ua === ua)
  );
  return { platform, os, ua, factor:1, rows };
}

function periodDates() {
  const period = document.querySelector("#af-period")?.value || "today";
  const today = appsFlyerDateKey();
  let from = today;
  let to = today;
  if (period === "yesterday") {
    from = shiftAppsFlyerDate(today,-1);
    to = from;
  } else if (period === "tomorrow") {
    from = shiftAppsFlyerDate(today,1);
    to = from;
  } else if (period === "custom") {
    const customFrom = document.querySelector("#af-date-from")?.value;
    const customTo = document.querySelector("#af-date-to")?.value;
    if (!customFrom || !customTo) throw new Error("Hãy chọn đủ ngày bắt đầu và ngày kết thúc.");
    const days = (new Date(customTo) - new Date(customFrom)) / 86400000 + 1;
    if (!Number.isFinite(days) || days < 1 || days > 30) throw new Error("Khoảng tùy chỉnh phải từ 1 đến 30 ngày.");
    if (customTo > today) throw new Error("Khoảng tùy chỉnh chỉ dùng dữ liệu đến hôm nay.");
    return { from:customFrom, to:customTo, forecast:false, period };
  } else {
    const days = { "7d":7, "14d":14, "30d":30 }[period] || 1;
    from = shiftAppsFlyerDate(today,-(days-1));
  }
  return {
    from,
    to,
    forecast: period === "tomorrow",
    period
  };
}

function initializeAppsFlyerDateControls() {
  const todayIso = appsFlyerDateKey();
  const fromIso = shiftAppsFlyerDate(todayIso,-6);
  const fromInput = document.querySelector("#af-date-from");
  const toInput = document.querySelector("#af-date-to");
  if (fromInput) {
    fromInput.value = fromInput.value || fromIso;
    fromInput.max = todayIso;
  }
  if (toInput) {
    toInput.value = toInput.value || todayIso;
    toInput.max = todayIso;
  }
  const isCustom = document.querySelector("#af-period")?.value === "custom";
  document.querySelector("#af-custom-range")?.toggleAttribute("hidden",!isCustom);
}

function applyAppsFlyerSummary(summary) {
  const totalCost = summary.rows.reduce((sum,row)=>sum+row.cost,0);
  data.appsflyer.breakdown = summary.rows.map(row=>({
    platform: row.platform,
    mediaSource: row.mediaSource || row.platform,
    os: row.os,
    ua: row.ua || "Unassigned",
    cost: row.cost,
    costCurrency: row.costCurrency || null,
    revenue: row.revenue,
    revenueCurrency: row.revenueCurrency || null,
    purchases: row.purchases,
    installs: row.installs,
    registrations: row.registrations,
    cpi: row.cpi,
    cpr: row.cpr,
    cvr: row.cvr,
    roas: row.costAvailable !== false && row.revenueAvailable !== false && row.costCurrency && row.costCurrency===row.revenueCurrency && row.cost ? row.revenue/row.cost : null,
    costAvailable: row.costAvailable !== false,
    revenueAvailable: row.revenueAvailable !== false,
    share: totalCost ? row.cost/totalCost*100 : 0,
    rating: row.cvr >= 30 ? "Tốt" : row.cvr >= 20 ? "Khá" : "Cần tối ưu"
  }));
  if (summary.daily?.length) {
    data.appsflyer.daily = summary.daily.map(row=>({
      date: new Date(`${row.date}T00:00:00Z`).toLocaleDateString("vi-VN",{day:"2-digit",month:"2-digit"}),
      rawDate: row.date,
      platform: row.platform,
      mediaSource: row.mediaSource || row.platform,
      os: row.os,
      ua: row.ua || "Unassigned",
      cost: row.cost,
      costCurrency: row.costCurrency || null,
      revenue: row.revenue,
      revenueCurrency: row.revenueCurrency || null,
      installs: row.installs,
      registrations: row.registrations,
      costAvailable: row.costAvailable !== false,
      revenueAvailable: row.revenueAvailable !== false
    }));
  }
  appsflyerMeta = {
    availability: summary.availability || { cost:false, revenue:false },
    forecast:false,
    apiCalls:summary.apiCalls || 2
  };
  appsflyerLive = true;
  document.querySelector("#af-last-sync").textContent = `Dữ liệu thật · ${new Date(summary.pulledAt).toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"})}`;
  const unavailable = [!summary.availability?.cost && "cost", !summary.availability?.revenue && "revenue"].filter(Boolean);
  const availabilityNote = unavailable.length ? ` ${unavailable.join(" và ")} chưa có trong nguồn Pull API; hệ thống không ước tính.` : "";
  document.querySelector("#af-source-message").textContent = `Đã đồng bộ ${summary.rowCounts.installs.toLocaleString("vi-VN")} installs và ${summary.rowCounts.events.toLocaleString("vi-VN")} in-app events qua ${summary.apiCalls || 2} API calls.${availabilityNote}`;
  document.querySelector("#af-connection-pill").className = "pill green";
  document.querySelector("#af-connection-pill").textContent = "Live data";
  renderAppsFlyer();
}

async function loadAppsFlyerStatus() {
  try {
    const response = await fetch("/api/appsflyer-sync");
    const status = await response.json();
    const pull = document.querySelector("#af-pull-status");
    const push = document.querySelector("#af-push-status");
    const storage = document.querySelector("#af-storage-status");
    pull.textContent = status.configured ? "Sẵn sàng" : "Thiếu API token";
    push.textContent = status.pushConfigured ? "Sẵn sàng" : "Thiếu secret";
    storage.textContent = status.storageConfigured ? "Sẵn sàng" : "Chưa kết nối";
    pull.classList.toggle("ready",status.configured);
    push.classList.toggle("ready",status.pushConfigured);
    storage.classList.toggle("ready",status.storageConfigured);
    document.querySelector("#af-app-scope").textContent = status.apps?.join(", ") || "Chưa có App ID";
    document.querySelector("#af-admin-token").textContent = status.configured ? "Đã bảo mật" : "Chưa cấu hình";
    document.querySelector("#af-admin-apps").textContent = status.apps?.length ? `${status.apps.length} app` : "Chưa cấu hình";
    const complete = status.configured && status.pushConfigured && status.storageConfigured;
    const pill = document.querySelector("#af-pipeline-pill");
    pill.className = `pill ${complete ? "green" : "amber"}`;
    pill.textContent = complete ? "Connected" : "Đang thiết lập";
    const apiReady = status.configured && status.pushConfigured;
    const connectionPill = document.querySelector("#af-connection-pill");
    connectionPill.className = `pill ${apiReady ? "green" : "amber"}`;
    connectionPill.textContent = apiReady ? "API ready" : "Đang thiết lập";
    document.querySelector("#af-last-sync").textContent = status.configured ? "Sẵn sàng đồng bộ" : "Chưa có API token";
    document.querySelector("#af-source-message").textContent = apiReady
      ? status.storageConfigured
        ? "Pull API, Push API và nơi lưu dữ liệu đã sẵn sàng."
        : "Pull API và Push API đã sẵn sàng. Chưa kết nối nơi lưu dữ liệu."
      : "Đang kiểm tra Pull API, Push API và nơi lưu dữ liệu.";
    return status;
  } catch {
    document.querySelector("#af-last-sync").textContent = "Không kiểm tra được kết nối";
    return null;
  }
}

async function syncAppsFlyerLive() {
  const button = document.querySelector("#af-sync-now");
  let range;
  try {
    range = periodDates();
  } catch (error) {
    return showToast(error.message);
  }
  if (range.forecast) return showToast("AppsFlyer chỉ hiển thị dữ liệu đã ghi nhận; không tạo dự báo giả lập.");
  const token = window.__uaSessionToken || "";
  const permissions = window.__uaPermissions || {};
  if (token && !permissions.canSync) {
    return showToast("Chỉ Owner mới có quyền đồng bộ AppsFlyer.");
  }
  let integrationKey = sessionStorage.getItem("afIntegrationKey") || "";
  if (!token && !integrationKey) {
    integrationKey = window.prompt("Nhập Integration Key do Owner cấp để chạy lần đồng bộ thử:") || "";
    if (!integrationKey) return showToast("Chưa có quyền chạy AppsFlyer sync.");
    sessionStorage.setItem("afIntegrationKey",integrationKey);
  }
  const { from, to } = range;
  button.disabled = true;
  button.textContent = "Đang đồng bộ…";
  try {
    const response = await fetch("/api/appsflyer-sync",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        ...(token ? {Authorization:`Bearer ${token}`} : {"X-Integration-Key":integrationKey})
      },
      body:JSON.stringify({from,to})
    });
    const payload = await response.json();
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new Error("Phiên đăng nhập không có quyền đồng bộ. Hãy đăng nhập bằng Owner.");
      }
      throw new Error(payload.error || "AppsFlyer sync failed");
    }
    applyAppsFlyerSummary(payload);
    showToast("Đã đồng bộ dữ liệu thật từ AppsFlyer.");
  } catch (error) {
    if (error.message.includes("access")) sessionStorage.removeItem("afIntegrationKey");
    showToast(`AppsFlyer: ${error.message}`);
  } finally {
    button.disabled = false;
    button.textContent = "↻ Đồng bộ ngay";
  }
}

function renderAppsFlyer() {
  const selection = getAppsFlyerSelection();
  const sourceRows = selection.rows;
  const cost = sourceRows.reduce((sum,row)=>sum + row.cost, 0);
  const revenue = sourceRows.reduce((sum,row)=>sum + (row.revenue || 0), 0);
  const paidInstalls = sourceRows.filter(row=>row.platform !== "Organic").reduce((sum,row)=>sum + row.installs, 0);
  const organicInstalls = sourceRows.filter(row=>row.platform === "Organic").reduce((sum,row)=>sum + row.installs, 0);
  const totalInstalls = paidInstalls + organicInstalls;
  const registrations = sourceRows.reduce((sum,row)=>sum + row.registrations, 0);
  const costCurrencies=[...new Set(sourceRows.filter(row=>row.costAvailable&&row.platform!=="Organic").map(row=>row.costCurrency).filter(Boolean))];
  const revenueCurrencies=[...new Set(sourceRows.filter(row=>row.revenueAvailable).map(row=>row.revenueCurrency).filter(Boolean))];
  const costCurrency=costCurrencies.length===1?costCurrencies[0]:costCurrencies.length?"MIXED":null;
  const revenueCurrency=revenueCurrencies.length===1?revenueCurrencies[0]:revenueCurrencies.length?"MIXED":null;
  const costAvailable = appsflyerMeta.availability?.cost === true && Boolean(costCurrency) && costCurrency!=="MIXED";
  const revenueAvailable = appsflyerMeta.availability?.revenue === true && Boolean(revenueCurrency) && revenueCurrency!=="MIXED";
  const roasAvailable = costAvailable && revenueAvailable && costCurrency===revenueCurrency;
  const costLabel = costAvailable ? `AppsFlyer · ${costCurrency}` : appsflyerMeta.availability?.cost ? "Currency chưa rõ/mixed" : "Chưa có nguồn";
  const revenueLabel = revenueAvailable ? `AppsFlyer · ${revenueCurrency}` : appsflyerMeta.availability?.revenue ? "Currency chưa rõ/mixed" : "Chưa có nguồn";
  const metrics = [
    ["Total cost", costAvailable ? formatAfMoney(cost,costCurrency) : "—", costLabel, "Pull API", "neutral", "₫"],
    ["Revenue", revenueAvailable ? formatAfMoney(revenue,revenueCurrency) : "—", revenueLabel, "in-app events", "neutral", "↗"],
    ["Paid installs", appsflyerLive ? Math.round(paidInstalls).toLocaleString("vi-VN") : "—", appsflyerLive ? "live pull" : "Chưa đồng bộ", "AppsFlyer non-organic", "neutral", "↓"],
    ["Registrations", appsflyerLive ? Math.round(registrations).toLocaleString("vi-VN") : "—", appsflyerLive ? `${totalInstalls ? (registrations/totalInstalls*100).toLocaleString("vi-VN",{maximumFractionDigits:2}) : 0}%` : "Chưa đồng bộ", "CVR install → register", "up", "◎"],
    ["CPI", costAvailable && paidInstalls ? formatAfMoney(cost/paidInstalls,costCurrency) : "—", costLabel, "cost / install", "neutral", "↘"],
    ["CPR", costAvailable && registrations ? formatAfMoney(cost/registrations,costCurrency) : "—", costLabel, "cost / register", "neutral", "⌁"],
    ["ROAS", roasAvailable && cost ? `${(revenue/cost).toLocaleString("vi-VN",{maximumFractionDigits:2})}x` : "—", roasAvailable ? "AppsFlyer" : appsflyerLive ? "Chưa cùng currency" : "Chưa đồng bộ", "revenue / cost", "neutral", "↗"],
    ["Total installs", appsflyerLive ? Math.round(totalInstalls).toLocaleString("vi-VN") : "—", appsflyerLive ? `${Math.round(organicInstalls).toLocaleString("vi-VN")} organic` : "Chưa đồng bộ", "paid + organic", "neutral", "Σ"]
  ];

  document.querySelector("#af-metrics").innerHTML = metrics.map(([label,value,delta,note,tone,icon])=>`
    <article class="metric af-metric">
      <div class="metric-top"><span class="metric-label">${label}</span><span class="metric-icon">${icon}</span></div>
      <strong>${value}</strong>
      <small><span class="delta ${tone}">${delta}</span>${note}</small>
    </article>`).join("");

  const dailyMap = new Map();
  data.appsflyer.daily
    .filter(row =>
      (selection.platform === "all" || row.platform === selection.platform) &&
      (selection.os === "all" || row.os === selection.os) &&
      (selection.ua === "all" || row.ua === selection.ua)
    )
    .forEach(row=>{
      const key = row.rawDate || row.date;
      if (!dailyMap.has(key)) dailyMap.set(key,{ date:row.date, rawDate:key, cost:0, revenue:0, installs:0, registrations:0, costCurrency:null });
      const day = dailyMap.get(key);
      day.cost += row.cost || 0;
      if(row.costCurrency) day.costCurrency=!day.costCurrency||day.costCurrency===row.costCurrency?row.costCurrency:"MIXED";
      day.revenue += row.revenue || 0;
      day.installs += row.installs || 0;
      day.registrations += row.registrations || 0;
    });
  const daily = [...dailyMap.values()].sort((a,b)=>a.rawDate.localeCompare(b.rawDate));
  const dailyCostCurrencies=[...new Set(daily.map(day=>day.costCurrency).filter(Boolean))];
  const dailyCostReady=dailyCostCurrencies.length===1&&dailyCostCurrencies[0]!=="MIXED";
  const maxCost = Math.max(1,...daily.map(day=>dailyCostReady?day.cost:0));
  const maxInstalls = Math.max(1,...daily.map(day=>day.installs));
  document.querySelector("#af-daily-chart").innerHTML = daily.map(day=>`
    <div class="af-day">
      <div class="af-day-bars" title="${day.date}: ${formatAfMoney(day.cost,day.costCurrency)} · ${Math.round(day.installs)} installs">
        ${dailyCostReady?`<span class="af-cost-bar" style="height:${Math.max(8,day.cost/maxCost*100)}%"></span>`:""}
        <span class="af-install-bar" style="height:${Math.max(8,day.installs/maxInstalls*100)}%"></span>
      </div>
      <strong>${Math.round(day.installs)}</strong>
      <small>${day.date}</small>
    </div>`).join("");

  document.querySelector("#af-retention").innerHTML = analyticsUnavailable("Chưa kết nối AppsFlyer Cohort API; không hiển thị retention giả lập.");
  document.querySelector("#af-comparison").innerHTML = analyticsUnavailable("Chưa có hai kỳ dữ liệu thật cùng định nghĩa để so sánh P và P-1.");

  const scaledRows = selection.rows;
  document.querySelector("#af-row-count").textContent = `${scaledRows.length} tổ hợp`;
  document.querySelector("#af-breakdown-table").innerHTML = scaledRows.map(row=>`
    <tr>
      <td><span class="ua-badge">${row.ua || "Unassigned"}</span></td>
      <td><span class="af-platform"><i class="${row.platform.toLowerCase()}"></i>${row.mediaSource || row.platform}</span></td>
      <td><span class="os-badge ${row.os.toLowerCase()}">${row.os}</span></td>
      <td><strong>${row.costAvailable ? formatAfMoney(row.cost,row.costCurrency) : "—"}</strong></td>
      <td><strong>${row.revenueAvailable ? formatAfMoney(row.revenue || 0,row.revenueCurrency) : "—"}</strong></td>
      <td><strong>${row.costAvailable && row.revenueAvailable && row.costCurrency && row.costCurrency===row.revenueCurrency && row.cost ? `${((row.revenue || 0)/row.cost).toLocaleString("vi-VN",{maximumFractionDigits:2})}x` : "—"}</strong></td>
      <td>${Math.round(row.installs).toLocaleString("vi-VN")}</td>
      <td>${Math.round(row.registrations).toLocaleString("vi-VN")}</td>
      <td>${row.cpi === null ? "—" : formatAfMoney(row.cpi,row.costCurrency)}</td>
      <td>${row.cpr === null ? "—" : formatAfMoney(row.cpr,row.costCurrency)}</td>
      <td><strong>${row.cvr.toLocaleString("vi-VN")}%</strong></td>
      <td><span class="quality ${row.rating === "Tốt" ? "good" : row.rating === "Khá" ? "fair" : "risk"}">${row.rating}</span></td>
    </tr>`).join("");
}

let platformMetricMode = "primary";

function getPlatformSelection() {
  const platform = document.querySelector("#pf-platform")?.value || "all";
  const os = document.querySelector("#pf-os")?.value || "all";
  const ua = document.querySelector("#pf-ua")?.value || "all";
  const period = document.querySelector("#pf-period")?.value || "9d";
  const uaFactor = { all:1, minh:.38, huy:.34, chi:.28 }[ua] || 1;
  const periodFactor = { "9d":1, "7d":.78, "30d":3.18 }[period] || 1;
  const factor = uaFactor * periodFactor;
  const rows = data.platformDashboard.breakdown.filter(row =>
    (platform === "all" || row.platform === platform) &&
    (os === "all" || row.os === os)
  );
  return { platform, os, ua, period, factor, rows };
}

function platformTotals(rows, factor = 1) {
  const totals = rows.reduce((sum,row)=>({
    cost:sum.cost + row.cost,
    impressions:sum.impressions + row.impressions,
    clicks:sum.clicks + row.clicks,
    installs:sum.installs + row.installs,
    costShare:sum.costShare + row.costShare,
    installShare:sum.installShare + row.installShare
  }), { cost:0, impressions:0, clicks:0, installs:0, costShare:0, installShare:0 });
  totals.cost *= factor;
  totals.impressions *= factor;
  totals.clicks *= factor;
  totals.installs *= factor;
  totals.ctr = totals.impressions ? totals.clicks / totals.impressions * 100 : 0;
  totals.cpc = totals.clicks ? totals.cost / totals.clicks : 0;
  totals.cpm = totals.impressions ? totals.cost / totals.impressions * 1000 : 0;
  totals.cpi = totals.installs ? totals.cost / totals.installs : 0;
  totals.cvr = totals.clicks ? totals.installs / totals.clicks * 100 : 0;
  return totals;
}

function platformLabel(platform) {
  return platform === "Facebook" ? "Meta" : platform === "Tiktok" ? "TikTok" : platform;
}

function renderPlatformAnalytics() {
  const selection = getPlatformSelection();
  const totals = platformTotals(selection.rows, selection.factor);
  const days = selection.period === "30d" ? 30 : selection.period === "7d" ? 7 : 9;
  const primaryMetrics = [
    ["Total cost", formatVnd(totals.cost), "−18,75%", "so với P‑1", "down", "₫"],
    ["Installs", Math.round(totals.installs).toLocaleString("vi-VN"), "−33,69%", "so với P‑1", "down", "↓"],
    ["CPI", formatVnd(totals.cpi), "+22,53%", "so với P‑1", "down", "◎"],
    ["CVR", `${totals.cvr.toLocaleString("vi-VN",{maximumFractionDigits:2})}%`, "Click → install", "conversion rate", "neutral", "↗"],
    ["CTR", `${totals.ctr.toLocaleString("vi-VN",{maximumFractionDigits:2})}%`, "+17,33%", "so với P‑1", "up", "⌁"],
    ["Clicks", Math.round(totals.clicks).toLocaleString("vi-VN"), `${Math.round(totals.clicks/days).toLocaleString("vi-VN")}/day`, "traffic volume", "neutral", "↘"]
  ];
  document.querySelector("#pf-primary-metrics").innerHTML = primaryMetrics.map(([label,value,delta,note,tone,icon])=>`
    <article class="metric pf-primary-metric">
      <div class="metric-top"><span class="metric-label">${label}</span><span class="metric-icon">${icon}</span></div>
      <strong>${value}</strong>
      <small><span class="delta ${tone}">${delta}</span>${note}</small>
    </article>`).join("");

  const secondaryMetrics = [
    ["Impressions", Math.round(totals.impressions).toLocaleString("vi-VN"), "Delivery volume"],
    ["CPC", formatVnd(totals.cpc), "Cost per click"],
    ["CPM", formatVnd(totals.cpm), "Cost / 1.000 impressions"],
    ["Cost share", `${totals.costShare.toLocaleString("vi-VN",{maximumFractionDigits:2})}%`, "Trong tổng ngân sách"],
    ["Install share", `${totals.installShare.toLocaleString("vi-VN",{maximumFractionDigits:2})}%`, "Trong tổng install"],
    ["Cost / day", formatVnd(totals.cost/days), `${days} ngày dữ liệu`],
    ["Installs / day", Math.round(totals.installs/days).toLocaleString("vi-VN"), "Daily average"],
    ["Data points", Math.round(totals.impressions + totals.clicks + totals.installs).toLocaleString("vi-VN"), "Normalized events"]
  ];
  document.querySelector("#pf-secondary-metrics").innerHTML = secondaryMetrics.map(([label,value,note])=>`
    <div><span>${label}</span><strong>${value}</strong><small>${note}</small></div>`).join("");

  const filteredShare = selection.rows.reduce((sum,row)=>sum + row.costShare,0) / 100;
  const daily = data.platformDashboard.daily.map(day=>({
    ...day,
    cost:day.cost * filteredShare * selection.factor,
    clicks:day.clicks * filteredShare * selection.factor,
    installs:day.installs * filteredShare * selection.factor
  }));
  const maxCost = Math.max(...daily.map(day=>day.cost),1);
  const maxClicks = Math.max(...daily.map(day=>day.clicks),1);
  const maxInstalls = Math.max(...daily.map(day=>day.installs),1);
  document.querySelector("#pf-daily-chart").innerHTML = daily.map(day=>`
    <div class="pf-day">
      <div class="pf-day-bars" title="${day.date}: ${formatVnd(day.cost)} · ${Math.round(day.clicks)} clicks · ${Math.round(day.installs)} installs">
        <span class="pf-cost-bar" style="height:${Math.max(5,day.cost/maxCost*100)}%"></span>
        <span class="pf-click-bar" style="height:${Math.max(5,day.clicks/maxClicks*100)}%"></span>
        <span class="pf-install-bar" style="height:${Math.max(5,day.installs/maxInstalls*100)}%"></span>
      </div>
      <strong>${Math.round(day.installs)}</strong><small>${day.date}</small>
    </div>`).join("");

  const platformRows = data.platformDashboard.platforms.filter(row=>selection.platform === "all" || row.platform === selection.platform);
  document.querySelector("#pf-platform-score").innerHTML = platformRows.map(row=>`
    <div class="pf-score-row">
      <span class="account-logo ${platformClass(platformLabel(row.platform))}">${platformLabel(row.platform)[0]}</span>
      <div><strong>${platformLabel(row.platform)}</strong><small>${row.costShare.toLocaleString("vi-VN")}% cost share</small></div>
      <div><span>CPI</span><strong>${formatVnd(row.cpi)}</strong></div>
      <div><span>CVR</span><strong>${row.cvr.toLocaleString("vi-VN")}%</strong></div>
      <b class="${row.cpi < 30000 ? "good" : "risk"}">${row.cpi < 30000 ? "Hiệu quả" : "Cần tối ưu"}</b>
    </div>`).join("");

  document.querySelector("#pf-comparison").innerHTML = data.platformDashboard.comparison.map(item=>`
    <div class="comparison-item">
      <span>${item.metric}</span>
      <strong>${formatAfValue(item.current,item.format)}</strong>
      <small>P‑1: ${formatAfValue(item.previous,item.format)}</small>
      <b class="${item.good ? "positive" : "negative"}">${item.delta > 0 ? "↑" : "↓"} ${Math.abs(item.delta).toLocaleString("vi-VN")}%</b>
    </div>`).join("");

  document.querySelector("#pf-breakdown-count").textContent = `${selection.rows.length} tổ hợp`;
  document.querySelector("#pf-breakdown-table").innerHTML = selection.rows.map(row=>`
    <tr>
      <td><span class="af-platform"><i class="${row.platform.toLowerCase()}"></i>${platformLabel(row.platform)}</span></td>
      <td><span class="os-badge ${row.os.toLowerCase()}">${row.os}</span></td>
      <td><strong>${formatVnd(row.cost * selection.factor)}</strong></td>
      <td>${Math.round(row.impressions * selection.factor).toLocaleString("vi-VN")}</td>
      <td>${Math.round(row.clicks * selection.factor).toLocaleString("vi-VN")}</td>
      <td><strong>${Math.round(row.installs * selection.factor).toLocaleString("vi-VN")}</strong></td>
      <td>${row.ctr.toLocaleString("vi-VN")}%</td>
      <td>${formatVnd(row.cpc)}</td>
      <td>${formatVnd(row.cpm)}</td>
      <td><strong>${formatVnd(row.cpi)}</strong></td>
      <td>${row.cvr.toLocaleString("vi-VN")}%</td>
      <td>${row.costShare.toLocaleString("vi-VN")}%</td>
      <td>${row.installShare.toLocaleString("vi-VN")}%</td>
    </tr>`).join("");
  renderPlatformExplorer();
}

function renderPlatformExplorer() {
  const selection = getPlatformSelection();
  const level = document.querySelector("#pf-level")?.value || "account";
  const labels = { account:"Ad account detail", campaign:"Campaign detail", adgroup:"Ad group detail", ad:"Ad detail" };
  const rows = data.platformDashboard.explorer[level].filter(row=>selection.platform === "all" || row.platform === selection.platform);
  const columns = {
    primary:["Name","Platform","Owner","Cost","Installs","CPI","CVR"],
    secondary:["Name","Platform","Impressions","Clicks","CTR","CPC","CPM"],
    all:["Name","Platform","Owner","Cost","Impressions","Clicks","Installs","CTR","CPC","CPM","CPI","CVR"]
  }[platformMetricMode];
  document.querySelector("#pf-explorer-title").textContent = labels[level];
  document.querySelector("#pf-explorer-head").innerHTML = `<tr>${columns.map(column=>`<th>${column}</th>`).join("")}</tr>`;
  document.querySelector("#pf-explorer-body").innerHTML = rows.map(row=>{
    const scaled = { ...row, cost:row.cost*selection.factor, impressions:row.impressions*selection.factor, clicks:row.clicks*selection.factor, installs:row.installs*selection.factor };
    const derived = {
      Name:`<strong>${row.name}</strong>`,
      Platform:`<span class="platform-badge">${platformDot(platformLabel(row.platform))}${platformLabel(row.platform)}</span>`,
      Owner:row.owner,
      Cost:formatVnd(scaled.cost),
      Impressions:Math.round(scaled.impressions).toLocaleString("vi-VN"),
      Clicks:Math.round(scaled.clicks).toLocaleString("vi-VN"),
      Installs:Math.round(scaled.installs).toLocaleString("vi-VN"),
      CTR:`${(scaled.clicks/scaled.impressions*100).toLocaleString("vi-VN",{maximumFractionDigits:2})}%`,
      CPC:formatVnd(scaled.cost/scaled.clicks),
      CPM:formatVnd(scaled.cost/scaled.impressions*1000),
      CPI:formatVnd(scaled.cost/scaled.installs),
      CVR:`${(scaled.installs/scaled.clicks*100).toLocaleString("vi-VN",{maximumFractionDigits:2})}%`
    };
    return `<tr>${columns.map(column=>`<td>${derived[column]}</td>`).join("")}</tr>`;
  }).join("");
}

const integrationDefinitions = {
  meta: { name:"Meta Ads", logo:"M", description:"Kết nối Facebook cá nhân, chọn ad account và đồng bộ qua Meta Marketing API.", scopes:["Quyền đọc tối thiểu","Chọn account theo Business","Gán từng account cho UA"] },
  google: { name:"Google Ads", logo:"G", description:"App Campaigns, asset groups, conversion và performance từ Google Ads API.", scopes:["Manager & client accounts","GAQL performance sync","Budget action qua approval"] },
  tiktok: { name:"TikTok Ads", logo:"T", description:"Advertiser, campaign, ad group, ads và reporting từ TikTok Marketing API.", scopes:["Advertiser accounts","Integrated reporting","Creative performance"] },
  appsflyer: { name:"AppsFlyer", logo:"AF", description:"Install, in-app event, organic source và cohort retention từ AppsFlyer Pull API.", scopes:["Paid + organic acquisition","D1 · D3 · D7 · D30 retention","Backfill cohort định kỳ"] }
};

async function renderIntegrations() {
  let statuses = ["meta","google","tiktok","appsflyer"].map(id=>({id,configured:false,missing:["Chưa kiểm tra"]}));
  try {
    const response = await fetch("/api/connectors", { headers: metaAuthHeaders() });
    if (response.ok) statuses = (await response.json()).connectors;
  } catch (_) {}
  const appsflyerStatus = statuses.find(status=>status.id === "appsflyer");
  const appsflyerPill = document.querySelector("#af-connection-pill");
  if (appsflyerPill && appsflyerStatus?.configured) {
    appsflyerPill.className = "pill green";
    appsflyerPill.textContent = "Đã cấu hình";
  }
  const platformStatuses = statuses.filter(status=>["meta","google","tiktok"].includes(status.id));
  const platformPill = document.querySelector("#pf-connection-pill");
  if (platformPill && platformStatuses.every(status=>status.configured)) {
    platformPill.className = "pill green";
    platformPill.textContent = "3/3 đã kết nối";
  } else if (platformPill) {
    platformPill.textContent = `${platformStatuses.filter(status=>status.configured).length}/3 đã cấu hình`;
  }
  document.querySelector("#integration-grid").innerHTML = statuses.map(s=>{
    const d = integrationDefinitions[s.id];
    return `<article class="card integration-card">
      <div class="integration-top"><span class="integration-logo ${s.id}">${d.logo}</span><span class="pill ${s.configured?"green":"amber"}" data-connector-pill="${s.id}">${s.configured?"Sẵn sàng kết nối":"Chưa cấu hình"}</span></div>
      <h2>${d.name}</h2><p>${d.description}</p>
      <ul>${d.scopes.map(x=>`<li>${x}</li>`).join("")}</ul>
      <button class="button ${s.configured?"primary":"secondary"} connect-button" data-connector="${d.name}" data-connector-id="${s.id}" data-configured="${s.configured}">${
        s.id === "appsflyer"
          ? (s.configured ? "Quản lý API token" : "Cấu hình API token")
          : s.id === "meta"
            ? (s.configured ? "Kết nối Facebook" : "Xem biến môi trường")
            : (s.configured ? "Kết nối OAuth" : "Xem biến môi trường")
      }</button>
    </article>`;
  }).join("");
  refreshMetaConnectionBadge();
}

let metaAccounts = [];

function escapeMetaText(value) {
  return String(value ?? "").replace(/[&<>"']/g,(char)=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
}

function openMetaModal() {
  const modal = document.querySelector("#meta-connect-modal");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
}

function metaAuthHeaders(json = false) {
  const token = window.__uaSessionToken || "";
  return {
    ...(json ? {"Content-Type":"application/json"} : {}),
    ...(token ? {Authorization:`Bearer ${token}`} : {})
  };
}

function setMetaStatus(message = "", tone = "") {
  const status = document.querySelector("#meta-connect-status");
  status.textContent = message;
  status.dataset.tone = tone;
}

function setMetaConnectedView(connected) {
  document.querySelector("#meta-connect-state").hidden = connected;
  document.querySelector("#meta-account-state").hidden = !connected;
  document.querySelector("#meta-identity").hidden = !connected;
  document.querySelector("#meta-save-accounts").hidden = !connected;
  document.querySelector("#meta-disconnect").hidden = !connected;
  document.querySelectorAll("#meta-connect-modal .meta-steps span").forEach((step,index)=>step.classList.toggle("active",connected || index===0));
}

function renderMetaAccounts() {
  const query = (document.querySelector("#meta-account-search")?.value || "").trim().toLowerCase();
  const visible = metaAccounts.filter(account=>`${account.name} ${account.accountId} ${account.business?.name || ""}`.toLowerCase().includes(query));
  const grouped = visible.reduce((groups,account)=>{
    const key = account.business?.id || "personal";
    if(!groups[key]) groups[key] = {business:account.business || {name:"Tài khoản cá nhân"},accounts:[]};
    groups[key].accounts.push(account);
    return groups;
  },{});
  const list = document.querySelector("#meta-account-list");
  list.innerHTML = Object.values(grouped).map(group=>`
    <section class="meta-business-group">
      <header class="meta-business-head"><span>${escapeMetaText(group.business.name)}</span><b>${group.accounts.length} account</b></header>
      ${group.accounts.map(account=>`
        <label class="meta-account-row ${account.canConnect?"":"disabled"}" data-meta-search="${escapeMetaText(`${account.name} ${account.accountId} ${group.business.name}`.toLowerCase())}">
          <input type="checkbox" data-meta-account="${escapeMetaText(account.id)}" ${account.selected?"checked":""} ${account.canConnect?"":"disabled"} />
          <span class="meta-account-name"><strong>${escapeMetaText(account.name)}</strong><small>act_${escapeMetaText(account.accountId)} · ${escapeMetaText(account.currency)} · ${escapeMetaText(account.timezone || "—")}</small></span>
          <span class="meta-account-health ${account.canConnect?"":"blocked"}">${account.canConnect?"Có thể kết nối":"Không đủ điều kiện"}</span>
          <select data-meta-ua="${escapeMetaText(account.id)}" aria-label="UA phụ trách ${escapeMetaText(account.name)}" ${account.canConnect?"":"disabled"}>
            <option value="">Chưa gán UA</option>
            ${(window.__metaUaNames || []).map(name=>`<option value="${escapeMetaText(name)}" ${account.assignedUa===name?"selected":""}>${escapeMetaText(name)}</option>`).join("")}
          </select>
        </label>`).join("")}
    </section>`).join("") || `<p class="empty-state">Không tìm thấy ad account phù hợp.</p>`;
  document.querySelector("#meta-account-summary").textContent = `${metaAccounts.filter(account=>account.selected).length} đã chọn · ${metaAccounts.filter(account=>account.canConnect).length} có thể kết nối`;
}

async function loadMetaAccounts({showModal = true, silent = false} = {}) {
  if(showModal) openMetaModal();
  if(!window.__uaSessionToken) {
    if(!silent) setMetaStatus("Hãy đăng nhập bằng tài khoản Owner để kết nối Meta.","error");
    return null;
  }
  if(!silent) setMetaStatus("Đang kiểm tra các tài khoản Meta…");
  const response = await fetch("/api/meta-accounts",{headers:metaAuthHeaders()});
  const payload = await response.json().catch(()=>({}));
  if(!response.ok) {
    if(!silent) {
      setMetaConnectedView(false);
      setMetaStatus(payload.error || "Không thể đọc kết nối Meta.","error");
    }
    return null;
  }
  if(!payload.connected) {
    if(!silent) {
      setMetaConnectedView(false);
      setMetaStatus("");
    }
    return payload;
  }
  metaAccounts = payload.accounts || [];
  window.__metaUaNames = payload.uaNames || [];
  document.querySelector("#meta-identity-name").textContent = payload.identity?.name || "Facebook user";
  setMetaConnectedView(true);
  renderMetaAccounts();
  setMetaStatus("");
  const pill = document.querySelector('[data-connector-pill="meta"]');
  const button = document.querySelector('[data-connector-id="meta"]');
  if(pill) { pill.className="pill green"; pill.textContent=`${metaAccounts.filter(account=>account.selected).length} account đã chọn`; }
  if(button) button.textContent="Quản lý ad account";
  return payload;
}

async function refreshMetaConnectionBadge() {
  const button = document.querySelector('[data-connector-id="meta"]');
  if(!button || button.dataset.configured!=="true" || !window.__uaSessionToken) return;
  await loadMetaAccounts({showModal:false,silent:true}).catch(()=>{});
}

async function startMetaOauth() {
  if(!window.__uaSessionToken) return setMetaStatus("Hãy đăng nhập bằng tài khoản Owner.","error");
  setMetaStatus("Đang chuyển sang Facebook để xác thực…");
  const response = await fetch("/api/meta-oauth-start",{method:"POST",headers:metaAuthHeaders(true),body:"{}"});
  const payload = await response.json().catch(()=>({}));
  if(!response.ok || !payload.url) {
    return setMetaStatus(payload.error || "Chưa thể bắt đầu kết nối Meta.","error");
  }
  location.href = payload.url;
}

async function saveMetaAccounts() {
  const button = document.querySelector("#meta-save-accounts");
  const accounts = [...document.querySelectorAll("[data-meta-account]:checked")].map(input=>({
    id:input.dataset.metaAccount,
    assignedUa:document.querySelector(`[data-meta-ua="${CSS.escape(input.dataset.metaAccount)}"]`)?.value || ""
  }));
  button.disabled = true;
  setMetaStatus("Đang lưu phạm vi tài khoản…");
  const response = await fetch("/api/meta-accounts",{
    method:"POST",
    headers:metaAuthHeaders(true),
    body:JSON.stringify({accounts})
  });
  const payload = await response.json().catch(()=>({}));
  button.disabled = false;
  if(!response.ok) return setMetaStatus(payload.error || "Không thể lưu ad account.","error");
  metaAccounts.forEach(account=>{
    const input=document.querySelector(`[data-meta-account="${CSS.escape(account.id)}"]`);
    account.selected=Boolean(input?.checked);
    account.assignedUa=document.querySelector(`[data-meta-ua="${CSS.escape(account.id)}"]`)?.value || "";
  });
  renderMetaAccounts();
  setMetaStatus(`Đã lưu ${payload.saved} ad account vào workspace.`,"success");
  showToast(`Đã kết nối ${payload.saved} Meta ad account.`);
  refreshMetaConnectionBadge();
}

async function disconnectMeta() {
  if(!window.confirm("Ngắt Meta sẽ xóa token và dừng đồng bộ tất cả ad account đã chọn. Anh có chắc không?")) return;
  setMetaStatus("Đang thu hồi quyền và xóa kết nối…");
  const response = await fetch("/api/meta-accounts",{method:"DELETE",headers:metaAuthHeaders()});
  const payload = await response.json().catch(()=>({}));
  if(!response.ok) return setMetaStatus(payload.error || "Không thể ngắt kết nối Meta.","error");
  metaAccounts=[];
  setMetaConnectedView(false);
  setMetaStatus("Đã ngắt kết nối Meta.","success");
  const pill=document.querySelector('[data-connector-pill="meta"]');
  const button=document.querySelector('[data-connector-id="meta"]');
  if(pill) { pill.className="pill green"; pill.textContent="Sẵn sàng kết nối"; }
  if(button) button.textContent="Kết nối Facebook";
}

let googleAccounts = [];

function openGoogleModal() { const modal=document.querySelector("#google-connect-modal"); modal.classList.add("open"); modal.setAttribute("aria-hidden","false"); }
function setGoogleStatus(message="", tone="") { const status=document.querySelector("#google-connect-status"); status.textContent=message; status.dataset.tone=tone; }
function setGoogleConnectedView(connected) {
  document.querySelector("#google-connect-state").hidden=connected;
  document.querySelector("#google-account-state").hidden=!connected;
  document.querySelector("#google-identity").hidden=!connected;
  document.querySelector("#google-save-accounts").hidden=!connected;
  document.querySelector("#google-disconnect").hidden=!connected;
  document.querySelectorAll("#google-connect-modal .meta-steps span").forEach((step,index)=>step.classList.toggle("active",connected||index===0));
}
function renderGoogleAccounts() {
  const query=(document.querySelector("#google-account-search")?.value||"").trim().toLowerCase();
  const visible=googleAccounts.filter(account=>`${account.name} ${account.accountId} ${account.business?.name||""}`.toLowerCase().includes(query));
  const groups=visible.reduce((all,account)=>{ const key=account.business?.id||"direct"; if(!all[key]) all[key]={business:account.business||{name:"Google Ads direct"},accounts:[]}; all[key].accounts.push(account); return all; },{});
  document.querySelector("#google-account-list").innerHTML=Object.values(groups).map(group=>`<section class="meta-business-group"><header class="meta-business-head"><span>${escapeMetaText(group.business.name)}</span><b>${group.accounts.length} account</b></header>${group.accounts.map(account=>`<label class="meta-account-row ${account.canConnect?"":"disabled"}"><input type="checkbox" data-google-account="${escapeMetaText(account.id)}" ${account.selected?"checked":""} ${account.canConnect?"":"disabled"}/><span class="meta-account-name"><strong>${escapeMetaText(account.name)}</strong><small>${escapeMetaText(account.accountId)} · ${escapeMetaText(account.currency||"—")} · ${escapeMetaText(account.timezone||"—")}</small></span><span class="meta-account-health ${account.canConnect?"":"blocked"}">${account.canConnect?"Có thể kết nối":"Không đủ điều kiện"}</span><select data-google-ua="${escapeMetaText(account.id)}" ${account.canConnect?"":"disabled"}><option value="">Chưa gán UA</option>${(window.__googleUaNames||[]).map(name=>`<option value="${escapeMetaText(name)}" ${account.assignedUa===name?"selected":""}>${escapeMetaText(name)}</option>`).join("")}</select></label>`).join("")}</section>`).join("")||`<p class="empty-state">Không tìm thấy Google Ads account phù hợp.</p>`;
  document.querySelector("#google-account-summary").textContent=`${googleAccounts.filter(account=>account.selected).length} đã chọn · ${googleAccounts.filter(account=>account.canConnect).length} có thể kết nối`;
}
async function loadGoogleAccounts({showModal=true,silent=false}={}) {
  if(showModal) openGoogleModal();
  if(!window.__uaSessionToken) { if(!silent) setGoogleStatus("Hãy đăng nhập bằng tài khoản Owner để kết nối Google Ads.","error"); return null; }
  if(!silent) setGoogleStatus("Đang kiểm tra các tài khoản Google Ads…");
  const response=await fetch("/api/google-accounts",{headers:metaAuthHeaders()}); const payload=await response.json().catch(()=>({}));
  if(!response.ok) { if(!silent) { setGoogleConnectedView(false); setGoogleStatus(payload.error||"Không thể đọc kết nối Google Ads.","error"); } return null; }
  if(!payload.connected) { if(!silent) { setGoogleConnectedView(false); setGoogleStatus(""); } return payload; }
  googleAccounts=payload.accounts||[]; window.__googleUaNames=payload.uaNames||[];
  document.querySelector("#google-identity-name").textContent=payload.identity?.name||payload.identity?.email||"Google user";
  setGoogleConnectedView(true); renderGoogleAccounts(); setGoogleStatus("");
  const pill=document.querySelector('[data-connector-pill="google"]'), button=document.querySelector('[data-connector-id="google"]');
  if(pill) { pill.className="pill green"; pill.textContent=`${googleAccounts.filter(account=>account.selected).length} account đã chọn`; }
  if(button) button.textContent="Quản lý Google Ads";
  return payload;
}
async function refreshGoogleConnectionBadge() {
  const button=document.querySelector('[data-connector-id="google"]');
  if(!button||button.dataset.configured!=="true"||!window.__uaSessionToken) return;
  await loadGoogleAccounts({showModal:false,silent:true}).catch(()=>{});
}
async function startGoogleOauth() {
  if(!window.__uaSessionToken) return setGoogleStatus("Hãy đăng nhập bằng tài khoản Owner.","error");
  setGoogleStatus("Đang chuyển sang Google để xác thực…");
  const response=await fetch("/api/google-oauth-start",{method:"POST",headers:metaAuthHeaders(true),body:"{}"}); const payload=await response.json().catch(()=>({}));
  if(!response.ok||!payload.url) return setGoogleStatus(payload.error||"Chưa thể bắt đầu kết nối Google.","error");
  location.href=payload.url;
}
async function saveGoogleAccounts() {
  const button=document.querySelector("#google-save-accounts");
  const accounts=[...document.querySelectorAll("[data-google-account]:checked")].map(input=>({id:input.dataset.googleAccount,assignedUa:document.querySelector(`[data-google-ua="${CSS.escape(input.dataset.googleAccount)}"]`)?.value||""}));
  button.disabled=true; setGoogleStatus("Đang lưu phạm vi tài khoản…");
  const response=await fetch("/api/google-accounts",{method:"POST",headers:metaAuthHeaders(true),body:JSON.stringify({accounts})}); const payload=await response.json().catch(()=>({})); button.disabled=false;
  if(!response.ok) return setGoogleStatus(payload.error||"Không thể lưu Google Ads account.","error");
  googleAccounts.forEach(account=>{ const input=document.querySelector(`[data-google-account="${CSS.escape(account.id)}"]`); account.selected=Boolean(input?.checked); account.assignedUa=document.querySelector(`[data-google-ua="${CSS.escape(account.id)}"]`)?.value||""; });
  renderGoogleAccounts(); setGoogleStatus(`Đã lưu ${payload.saved} Google Ads account vào workspace.`,"success"); showToast(`Đã kết nối ${payload.saved} Google Ads account.`); refreshGoogleConnectionBadge();
}
async function disconnectGoogle() {
  if(!window.confirm("Ngắt Google Ads sẽ xóa token và dừng đồng bộ tất cả account đã chọn. Anh có chắc không?")) return;
  setGoogleStatus("Đang thu hồi quyền và xóa kết nối…");
  const response=await fetch("/api/google-accounts",{method:"DELETE",headers:metaAuthHeaders()}); const payload=await response.json().catch(()=>({}));
  if(!response.ok) return setGoogleStatus(payload.error||"Không thể ngắt kết nối Google Ads.","error");
  googleAccounts=[]; setGoogleConnectedView(false); setGoogleStatus("Đã ngắt kết nối Google Ads.","success");
  const pill=document.querySelector('[data-connector-pill="google"]'), button=document.querySelector('[data-connector-id="google"]'); if(pill) { pill.className="pill green"; pill.textContent="Sẵn sàng kết nối"; } if(button) button.textContent="Kết nối OAuth";
}

let tiktokAccounts = [];

function openTiktokModal() { const modal=document.querySelector("#tiktok-connect-modal"); modal.classList.add("open"); modal.setAttribute("aria-hidden","false"); }
function setTiktokStatus(message="", tone="") { const status=document.querySelector("#tiktok-connect-status"); status.textContent=message; status.dataset.tone=tone; }
function setTiktokConnectedView(connected) {
  document.querySelector("#tiktok-connect-state").hidden=connected;
  document.querySelector("#tiktok-account-state").hidden=!connected;
  document.querySelector("#tiktok-identity").hidden=!connected;
  document.querySelector("#tiktok-save-accounts").hidden=!connected;
  document.querySelector("#tiktok-disconnect").hidden=!connected;
  document.querySelectorAll("#tiktok-connect-modal .meta-steps span").forEach((step,index)=>step.classList.toggle("active",connected||index===0));
}
function renderTiktokAccounts() {
  const query=(document.querySelector("#tiktok-account-search")?.value||"").trim().toLowerCase();
  const visible=tiktokAccounts.filter(account=>`${account.name} ${account.accountId} ${account.business?.name||""}`.toLowerCase().includes(query));
  const groups=visible.reduce((all,account)=>{ const key=account.business?.id||"direct"; if(!all[key]) all[key]={business:account.business||{name:"TikTok direct"},accounts:[]}; all[key].accounts.push(account); return all; },{});
  document.querySelector("#tiktok-account-list").innerHTML=Object.values(groups).map(group=>`<section class="meta-business-group"><header class="meta-business-head"><span>${escapeMetaText(group.business.name)}</span><b>${group.accounts.length} advertiser</b></header>${group.accounts.map(account=>`<label class="meta-account-row ${account.canConnect?"":"disabled"}"><input type="checkbox" data-tiktok-account="${escapeMetaText(account.id)}" ${account.selected?"checked":""} ${account.canConnect?"":"disabled"}/><span class="meta-account-name"><strong>${escapeMetaText(account.name)}</strong><small>${escapeMetaText(account.accountId)} · ${escapeMetaText(account.currency||"—")} · ${escapeMetaText(account.timezone||"—")}</small></span><span class="meta-account-health ${account.canConnect?"":"blocked"}">${account.canConnect?"Có thể kết nối":"Không đủ điều kiện"}</span><select data-tiktok-ua="${escapeMetaText(account.id)}" ${account.canConnect?"":"disabled"}><option value="">Chưa gán UA</option>${(window.__tiktokUaNames||[]).map(name=>`<option value="${escapeMetaText(name)}" ${account.assignedUa===name?"selected":""}>${escapeMetaText(name)}</option>`).join("")}</select></label>`).join("")}</section>`).join("")||`<p class="empty-state">Không tìm thấy TikTok advertiser phù hợp.</p>`;
  document.querySelector("#tiktok-account-summary").textContent=`${tiktokAccounts.filter(account=>account.selected).length} đã chọn · ${tiktokAccounts.filter(account=>account.canConnect).length} có thể kết nối`;
}
async function loadTiktokAccounts({showModal=true,silent=false}={}) {
  if(showModal) openTiktokModal();
  if(!window.__uaSessionToken) { if(!silent) setTiktokStatus("Hãy đăng nhập bằng tài khoản Owner để kết nối TikTok Ads.","error"); return null; }
  if(!silent) setTiktokStatus("Đang kiểm tra các advertiser TikTok…");
  const response=await fetch("/api/tiktok-accounts",{headers:metaAuthHeaders()}); const payload=await response.json().catch(()=>({}));
  if(!response.ok) { if(!silent) { setTiktokConnectedView(false); setTiktokStatus(payload.error||"Không thể đọc kết nối TikTok Ads.","error"); } return null; }
  if(!payload.connected) { if(!silent) { setTiktokConnectedView(false); setTiktokStatus(""); } return payload; }
  tiktokAccounts=payload.accounts||[]; window.__tiktokUaNames=payload.uaNames||[];
  document.querySelector("#tiktok-identity-name").textContent=payload.identity?.name||"TikTok advertiser";
  setTiktokConnectedView(true); renderTiktokAccounts(); setTiktokStatus("");
  const pill=document.querySelector('[data-connector-pill="tiktok"]'), button=document.querySelector('[data-connector-id="tiktok"]');
  if(pill) { pill.className="pill green"; pill.textContent=`${tiktokAccounts.filter(account=>account.selected).length} advertiser đã chọn`; }
  if(button) button.textContent="Quản lý TikTok Ads";
  return payload;
}
async function refreshTiktokConnectionBadge() {
  const button=document.querySelector('[data-connector-id="tiktok"]');
  if(!button||button.dataset.configured!=="true"||!window.__uaSessionToken) return;
  await loadTiktokAccounts({showModal:false,silent:true}).catch(()=>{});
}
async function startTiktokOauth() {
  if(!window.__uaSessionToken) return setTiktokStatus("Hãy đăng nhập bằng tài khoản Owner.","error");
  setTiktokStatus("Đang chuyển sang TikTok để xác thực…");
  const response=await fetch("/api/tiktok-oauth-start",{method:"POST",headers:metaAuthHeaders(true),body:"{}"}); const payload=await response.json().catch(()=>({}));
  if(!response.ok||!payload.url) return setTiktokStatus(payload.error||"Chưa thể bắt đầu kết nối TikTok.","error");
  location.href=payload.url;
}
async function saveTiktokAccounts() {
  const button=document.querySelector("#tiktok-save-accounts");
  const accounts=[...document.querySelectorAll("[data-tiktok-account]:checked")].map(input=>({id:input.dataset.tiktokAccount,assignedUa:document.querySelector(`[data-tiktok-ua="${CSS.escape(input.dataset.tiktokAccount)}"]`)?.value||""}));
  button.disabled=true; setTiktokStatus("Đang lưu phạm vi advertiser…");
  const response=await fetch("/api/tiktok-accounts",{method:"POST",headers:metaAuthHeaders(true),body:JSON.stringify({accounts})}); const payload=await response.json().catch(()=>({})); button.disabled=false;
  if(!response.ok) return setTiktokStatus(payload.error||"Không thể lưu TikTok advertiser.","error");
  tiktokAccounts.forEach(account=>{ const input=document.querySelector(`[data-tiktok-account="${CSS.escape(account.id)}"]`); account.selected=Boolean(input?.checked); account.assignedUa=document.querySelector(`[data-tiktok-ua="${CSS.escape(account.id)}"]`)?.value||""; });
  renderTiktokAccounts(); setTiktokStatus(`Đã lưu ${payload.saved} TikTok advertiser vào workspace.`,"success"); showToast(`Đã kết nối ${payload.saved} TikTok advertiser.`); refreshTiktokConnectionBadge();
}
async function disconnectTiktok() {
  if(!window.confirm("Ngắt TikTok Ads sẽ xóa token và dừng đồng bộ tất cả advertiser đã chọn. Anh có chắc không?")) return;
  setTiktokStatus("Đang xóa token và phạm vi advertiser…");
  const response=await fetch("/api/tiktok-accounts",{method:"DELETE",headers:metaAuthHeaders()}); const payload=await response.json().catch(()=>({}));
  if(!response.ok) return setTiktokStatus(payload.error||"Không thể ngắt kết nối TikTok Ads.","error");
  tiktokAccounts=[]; setTiktokConnectedView(false); setTiktokStatus("Đã ngắt kết nối TikTok Ads.","success");
  const pill=document.querySelector('[data-connector-pill="tiktok"]'), button=document.querySelector('[data-connector-id="tiktok"]'); if(pill) { pill.className="pill green"; pill.textContent="Sẵn sàng kết nối"; } if(button) button.textContent="Kết nối OAuth";
}

function renderAudit() {
  document.querySelector("#approval-list").innerHTML = data.alerts.filter(item=>item.stage==="approval").map(item=>
    `<div class="approval-item"><h3>${item.action} · ${item.subtitle}</h3><p>${item.title} · ${item.owner} đề xuất · trước ${item.due}</p><div class="approval-actions"><button class="button primary approve-button">Phê duyệt</button><button class="button secondary reject-button">Từ chối</button></div></div>`
  ).join("");
  document.querySelector("#audit-list").innerHTML = [
    ["Linh Chi acknowledged alert","TH · Creative Test 12 · 09:42"],
    ["Quang Huy updated KPI guardrail","Google Apps · CPI $3.20 → $3.00 · 09:16"],
    ["System completed data sync","24 ad accounts · 08:55"],
    ["Minh Anh approved budget change","VN · Purchase · Scale 03 · hôm qua"]
  ].map(([title,note])=>`<div class="timeline-item"><strong>${title}</strong><small>${note}</small></div>`).join("");
}

const viewRoutes = {
  // Campaign center is a hub: legacy entry points land on the Meta workspace.
  "campaign-center": { section: "campaign-meta", nav: "campaign-meta", crumb: "Campaign center · Meta" },
  "ads-manager": { section: "campaign-meta", nav: "campaign-meta", crumb: "Campaign center · Meta" },
  "campaign-meta": { section: "campaign-meta", nav: "campaign-meta", crumb: "Campaign center · Meta" },
  "campaign-google": { section: "campaign-google", nav: "campaign-google", crumb: "Campaign center · Google" },
  "campaign-tiktok": { section: "campaign-tiktok", nav: "campaign-tiktok", crumb: "Campaign center · TikTok" },
  "growth-analytics": { section: "analytics", nav: "growth-analytics", crumb: "Growth analytics" },
  "analytics": { section: "analytics", nav: "growth-analytics", crumb: "Growth analytics" },
  "optimization-center": { section: "optimization-center", nav: "optimization-center", crumb: "Optimization center" },
  "optimization-budget": { section: "budget-pacing", nav: "optimization-center", crumb: "Optimization center · Budget pacing" },
  "budget-pacing": { section: "budget-pacing", nav: "optimization-center", crumb: "Optimization center · Budget pacing" },
  "optimization-alerts": { section: "alerts", nav: "optimization-center", crumb: "Optimization center · Alerts" },
  "alerts": { section: "alerts", nav: "optimization-center", crumb: "Optimization center · Alerts" },
  "system-health": { section: "account-audit", nav: "system-health", crumb: "System health · Account health" },
  "account-audit": { section: "account-audit", nav: "system-health", crumb: "System health · Account health" },
  "system-tracking": { section: "tracking-health", nav: "system-health", crumb: "System health · Data & tracking" },
  "tracking-health": { section: "tracking-health", nav: "system-health", crumb: "System health · Data & tracking" }
};

function switchView(requestedView) {
  if (requestedView === "integrations" && window.__uaPermissions && !window.__uaPermissions.canManageIntegrations) {
    requestedView = "overview";
    if (location.hash.slice(1) === "integrations") history.replaceState(null, "", "#overview");
    showToast("Chỉ Owner mới có quyền truy cập Integrations.");
  }
  const route = viewRoutes[requestedView] || { section: requestedView, nav: requestedView };
  if (!document.getElementById(route.section)) {
    route.section = "overview";
    route.nav = "overview";
  }
  document.querySelectorAll(".view").forEach(v=>v.classList.toggle("active",v.id===route.section));
  document.querySelectorAll(".nav-item").forEach(n=>n.classList.toggle("active",n.dataset.view===route.nav));
  const active = document.querySelector(`.nav-item[data-view="${route.nav}"]`);
  const sectionTitle = document.querySelector(`#${route.section} h1`)?.textContent.trim();
  document.querySelector("#page-crumb").textContent = route.crumb || active?.textContent.trim().replace(/\d+$/,"").trim() || sectionTitle || "Command center";
  document.querySelector(".sidebar").classList.remove("open");
  // Sync only the platform workspace being opened.
  const workspace = adsWorkspaceByView[route.section];
  if(workspace && window.__uaSessionToken && !workspace.isLoading()) workspace.load();
  if(route.section==="creatives" && window.__uaSessionToken && !creativeLiveAttempted && !creativeLiveLoading) {
    syncCreativesLive().catch(error=>{
      setCreativeSourceState("Lỗi đồng bộ",error.message,"red");
      showToast(error.message);
    });
  }
  if(route.section==="analytics" && window.__uaSessionToken && !analyticsLiveData.attempted && !analyticsLiveData.loading) {
    loadAnalyticsData().catch(error=>{
      analyticsLiveData.loading=false;
      renderAnalytics();
      showToast(error.message || "Không thể đồng bộ Growth Analytics.");
    });
  }
  // Campaign center nav stays highlighted while any platform workspace is open.
  document.querySelector('.nav-item[data-view="campaign-center"]')?.classList.toggle("active-parent",Boolean(workspace));
  window.scrollTo({top:0,behavior:"smooth"});
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
    document.querySelectorAll(".platform-tab").forEach(b=>b.classList.remove("active"));
    button.classList.add("active");
    commandPlatform = button.dataset.platform;
    renderCommandCenter();
  }));
  document.querySelectorAll(".date-chip").forEach(button=>button.addEventListener("click",()=>{
    document.querySelectorAll(".date-chip").forEach(b=>b.classList.remove("active"));
    button.classList.add("active");
    commandRange = button.dataset.range;
    document.querySelector("#command-custom-range")?.toggleAttribute("hidden",commandRange!=="custom");
    if(window.__uaSessionToken) loadCommandMetaData(); else renderCommandCenter();
    showToast(`Đã cập nhật toàn bộ Command Center: ${button.textContent}`);
  }));
  document.querySelector("#command-business")?.addEventListener("change",event=>{
    commandBusiness = event.target.value;
    refreshCommandScopeOptions();
    loadCommandMetaData();
  });
  document.querySelector("#command-account")?.addEventListener("change",event=>{
    commandAccount = event.target.value;
    loadCommandMetaData();
  });
  ["#command-date-from","#command-date-to"].forEach(selector=>document.querySelector(selector)?.addEventListener("change",()=>{
    if(commandRange!=="custom") return;
    const details = commandRangeDetails();
    document.querySelector("#command-range-note").textContent = details.label;
    loadCommandMetaData();
  }));
  document.querySelector(".mobile-menu").addEventListener("click",()=>document.querySelector(".sidebar").classList.toggle("open"));
  // Each platform workspace binds its own controls.
  bindAdsWorkspaces();
  bindAnalyticsTooltips();
  document.querySelector("#analytics-period")?.addEventListener("change",()=>loadAnalyticsData().catch(error=>showToast(error.message || "Không thể đồng bộ Growth Analytics.")));
  document.querySelector("#analytics-platform")?.addEventListener("change",()=>{ refreshAnalyticsCampaignOptions(); renderAnalytics(); });
  document.querySelector("#analytics-campaign")?.addEventListener("change",renderAnalytics);
  document.querySelector("#analytics-age-metric")?.addEventListener("change",renderAnalytics);
  document.querySelector("#analytics-google-network-metric")?.addEventListener("change",renderAnalytics);
  document.querySelector("#analytics-refresh")?.addEventListener("click",()=>loadAnalyticsData().catch(error=>showToast(error.message || "Không thể đồng bộ Growth Analytics.")));
  document.querySelector("#analytics-export")?.addEventListener("click",exportAnalyticsData);
  document.querySelector("#create-segment")?.addEventListener("click",()=>showToast("Segment builder sẽ mở khi database event và user properties được kết nối."));
  ["#mixer-included","#mixer-intersection"].forEach(selector=>{
    document.querySelector(selector)?.addEventListener("change",renderAudienceMixer);
  });
  document.querySelector("#save-audience-mix")?.addEventListener("click",()=>showToast("Đã lưu Audience Mix thành draft; chưa đồng bộ lên nền tảng quảng cáo."));
  document.querySelector("#new-automation-draft")?.addEventListener("click",()=>showToast("Đã tạo automation draft. Mọi thay đổi ngân sách/trạng thái vẫn cần Manager phê duyệt."));
  document.querySelector("#budget-plan-draft")?.addEventListener("click",()=>showToast("Đã mở budget plan draft; chưa thay đổi ngân sách trên nền tảng."));
  document.querySelector("#budget-export")?.addEventListener("click",()=>showToast("Budget pacing report đang được chuẩn bị trong demo mode."));
  document.querySelector("#refresh-daily-brief")?.addEventListener("click",()=>{ renderDailyBrief(); showToast("Đã làm mới AI Daily Brief từ snapshot dữ liệu demo."); });
  document.querySelector("#brief-delivery")?.addEventListener("click",()=>showToast("Delivery settings: Email, Slack và lịch gửi sẽ khả dụng khi connector được cấu hình."));
  document.querySelector("#create-report")?.addEventListener("click",()=>showToast("Đã tạo report draft mới."));
  document.querySelector("#add-report-schedule")?.addEventListener("click",()=>showToast("Đã mở schedule draft; chưa gửi báo cáo ra bên ngoài."));
  document.querySelector("#run-account-audit")?.addEventListener("click",()=>{ renderAccountAudit(); showToast("Đã chạy lại 42 audit checks trong demo mode."); });
  document.querySelector("#run-health-check")?.addEventListener("click",()=>{ renderTrackingHealth(); showToast("Đã kiểm tra lại freshness, completeness và attribution gap."); });
  document.querySelector("#health-history")?.addEventListener("click",()=>showToast("Incident history sẽ lưu toàn bộ lần lỗi, retry và thời điểm khôi phục."));
  document.querySelector("#creative-search")?.addEventListener("input",renderCreatives);
  ["#creative-platform","#creative-os","#creative-editor"].forEach(selector=>{
    document.querySelector(selector)?.addEventListener("change",renderCreatives);
  });
  document.querySelector("#creative-code-guide")?.addEventListener("click",()=>showToast("Mã chuẩn: V{STT}-YYMM-{EDITOR}. Ví dụ V1-2607-VA = Video 1 · 07/2026 · Việt Anh."));
  document.querySelector("#creative-period")?.addEventListener("change",syncCreativesLive);
  document.querySelector("#creative-sync")?.addEventListener("click",()=>syncCreativesLive().catch(error=>{
    creativeLiveLoading=false; setCreativeSourceState("Lỗi đồng bộ",error.message,"red"); showToast(error.message);
  }));
  document.querySelector("#creative-export")?.addEventListener("click",()=>{
    const { rows } = getCreativeSelection();
    const exportRows = [
      ["Creative code","Editors","OS","Platforms","Mapped placements","Accounts","Campaigns","Ad groups or asset groups","Ads or assets","Spend","Impressions","CTR","Hook rate","Hold rate","Opening metric","Installs","Registrations","CPI","CPR","Thumbnail URL","Code status"],
      ...rows.map(row=>[row.code,row.editors.join("+"),row.operatingSystems.join("+"),row.platforms.join("+"),row.placements,row.accounts ?? "",row.campaigns ?? "",row.adGroups ?? "",row.ads ?? "",row.spend,row.impressions,row.ctr ?? "",row.hookRate ?? "",row.holdRate ?? "",row.openingMetric,row.installs,row.registrations,row.cpi ?? "",row.cpr ?? "",row.thumbnailUrl,row.codeStatus])
    ];
    const csv = exportRows.map(row=>row.map(value=>`"${String(value).replaceAll('"','""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([`\uFEFF${csv}`],{type:"text/csv;charset=utf-8"}));
    const link = document.createElement("a"); link.href=url; link.download="creative-performance.csv"; link.click();
    URL.revokeObjectURL(url); showToast("Đã xuất Creative performance CSV.");
  });
  ["#af-ua","#af-platform","#af-os"].forEach(selector=>{
    document.querySelector(selector)?.addEventListener("change",renderAppsFlyer);
  });
  document.querySelector("#af-period")?.addEventListener("change",()=>{
    initializeAppsFlyerDateControls();
    showToast(document.querySelector("#af-period").value === "tomorrow"
      ? "Ngày mai sử dụng dữ liệu dự báo và không gọi AppsFlyer API."
      : "Đã chọn khoảng ngày. Bấm Đồng bộ ngay để tải dữ liệu.");
  });
  ["#af-date-from","#af-date-to"].forEach(selector=>{
    document.querySelector(selector)?.addEventListener("change",()=>{
      try {
        periodDates();
      } catch (error) {
        showToast(error.message);
      }
    });
  });
  ["#pf-period","#pf-ua","#pf-platform","#pf-os"].forEach(selector=>{
    document.querySelector(selector)?.addEventListener("change",renderPlatformAnalytics);
  });
  document.querySelector("#pf-level")?.addEventListener("change",renderPlatformExplorer);
  document.querySelectorAll("[data-metric-mode]").forEach(button=>button.addEventListener("click",()=>{
    platformMetricMode = button.dataset.metricMode;
    document.querySelectorAll("[data-metric-mode]").forEach(item=>item.classList.toggle("active",item===button));
    renderPlatformExplorer();
  }));
  document.querySelector("#af-sync-now")?.addEventListener("click",syncAppsFlyerLive);
  document.querySelector("#af-copy-endpoint")?.addEventListener("click",async()=>{
    await navigator.clipboard.writeText(document.querySelector("#af-push-endpoint").textContent);
    showToast("Đã sao chép Push endpoint.");
  });
  document.querySelector("#pf-sync-now")?.addEventListener("click",()=>showToast("Đã đưa Meta, Google và TikTok sync job vào hàng đợi demo."));
  document.querySelector("#af-export")?.addEventListener("click",()=>{
    const { rows } = getAppsFlyerSelection();
    const exportRows = [
      ["UA","Platform","Media source","OS","Cost","Cost availability","Revenue","Revenue availability","ROAS","Installs","Registrations","CPI","CPR","CVR","Rating"],
      ...rows.map(row=>[
        row.ua,row.platform,row.mediaSource || row.platform,row.os,row.costAvailable?Math.round(row.cost):"",row.costAvailable?"available":"unavailable",row.revenueAvailable?Math.round(row.revenue||0):"",row.revenueAvailable?"available":"unavailable",row.costAvailable&&row.revenueAvailable&&row.cost?(row.revenue||0)/row.cost:"",
        Math.round(row.installs),Math.round(row.registrations),row.cpi,row.cpr,row.cvr,row.rating
      ])
    ];
    const csv = exportRows.map(row=>row.map(value=>`"${String(value).replaceAll('"','""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([`\uFEFF${csv}`],{type:"text/csv;charset=utf-8"}));
    const link = document.createElement("a"); link.href=url; link.download="appsflyer-performance.csv"; link.click();
    URL.revokeObjectURL(url); showToast("Đã xuất AppsFlyer breakdown CSV.");
  });
  document.querySelector("#pf-export")?.addEventListener("click",()=>{
    const { rows, factor } = getPlatformSelection();
    const exportRows = [
      ["Platform","OS","Cost","Impressions","Clicks","Installs","CTR","CPC","CPM","CPI","CVR","Cost share","Install share"],
      ...rows.map(row=>[
        platformLabel(row.platform),row.os,Math.round(row.cost*factor),Math.round(row.impressions*factor),Math.round(row.clicks*factor),Math.round(row.installs*factor),
        row.ctr,row.cpc,row.cpm,row.cpi,row.cvr,row.costShare,row.installShare
      ])
    ];
    const csv = exportRows.map(row=>row.map(value=>`"${String(value).replaceAll('"','""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([`\uFEFF${csv}`],{type:"text/csv;charset=utf-8"}));
    const link = document.createElement("a"); link.href=url; link.download="platform-performance.csv"; link.click();
    URL.revokeObjectURL(url); showToast("Đã xuất Platform performance CSV.");
  });
  document.querySelectorAll("[data-open-modal]").forEach(b=>b.addEventListener("click",()=>{ const modal=document.getElementById(b.dataset.openModal); modal.classList.add("open"); modal.setAttribute("aria-hidden","false"); }));
  document.querySelectorAll("[data-close-modal]").forEach(b=>b.addEventListener("click",()=>{ const modal=b.closest(".modal-backdrop"); modal.classList.remove("open"); modal.setAttribute("aria-hidden","true"); }));
  document.querySelector("#meta-start-oauth")?.addEventListener("click",startMetaOauth);
  document.querySelector("#meta-reauth")?.addEventListener("click",startMetaOauth);
  document.querySelector("#meta-save-accounts")?.addEventListener("click",saveMetaAccounts);
  document.querySelector("#meta-disconnect")?.addEventListener("click",disconnectMeta);
  document.querySelector("#google-start-oauth")?.addEventListener("click",startGoogleOauth);
  document.querySelector("#google-reauth")?.addEventListener("click",startGoogleOauth);
  document.querySelector("#google-save-accounts")?.addEventListener("click",saveGoogleAccounts);
  document.querySelector("#google-disconnect")?.addEventListener("click",disconnectGoogle);
  document.querySelector("#tiktok-start-oauth")?.addEventListener("click",startTiktokOauth);
  document.querySelector("#tiktok-reauth")?.addEventListener("click",startTiktokOauth);
  document.querySelector("#tiktok-save-accounts")?.addEventListener("click",saveTiktokAccounts);
  document.querySelector("#tiktok-disconnect")?.addEventListener("click",disconnectTiktok);
  document.querySelector("#meta-account-search")?.addEventListener("input",renderMetaAccounts);
  document.querySelector("#google-account-search")?.addEventListener("input",renderGoogleAccounts);
  document.querySelector("#tiktok-account-search")?.addEventListener("input",renderTiktokAccounts);
  document.querySelector("#meta-account-list")?.addEventListener("change",event=>{
    const accountId = event.target.dataset.metaAccount || event.target.dataset.metaUa;
    const account = metaAccounts.find(item=>item.id===accountId);
    if(account && event.target.matches("[data-meta-account]")) account.selected=event.target.checked;
    if(account && event.target.matches("[data-meta-ua]")) account.assignedUa=event.target.value;
    if(!event.target.matches("[data-meta-account]")) return;
    const selected = document.querySelectorAll("[data-meta-account]:checked").length;
    document.querySelector("#meta-account-summary").textContent = `${selected} đã chọn · ${metaAccounts.filter(account=>account.canConnect).length} có thể kết nối`;
  });
  document.querySelector("#google-account-list")?.addEventListener("change",event=>{
    const accountId=event.target.dataset.googleAccount||event.target.dataset.googleUa;
    const account=googleAccounts.find(item=>item.id===accountId);
    if(account&&event.target.matches("[data-google-account]")) account.selected=event.target.checked;
    if(account&&event.target.matches("[data-google-ua]")) account.assignedUa=event.target.value;
    if(!event.target.matches("[data-google-account]")) return;
    document.querySelector("#google-account-summary").textContent=`${document.querySelectorAll("[data-google-account]:checked").length} đã chọn · ${googleAccounts.filter(account=>account.canConnect).length} có thể kết nối`;
  });
  document.querySelector("#campaign-form").addEventListener("submit",event=>{
    event.preventDefault(); const values=Object.fromEntries(new FormData(event.currentTarget));
    document.querySelector("#campaign-modal").classList.remove("open"); showToast(`Đã lưu draft "${values.name}" ở trạng thái paused.`);
    event.currentTarget.reset();
  });
  document.querySelector("#export-button").addEventListener("click",()=>{
    const { campaigns, factor } = getCommandSelection();
    const moneyFactor=commandLiveAttempted?1:commandVndRate;
    const rows = [["Campaign","Platform","Business Manager","Ad account","Spend (VND)","Revenue (VND)","Installs","Registrations","CTR","CVR","CPI (VND)","ROAS","Status"], ...campaigns.map(c=>[c.name,c.platform,c.business||"—",c.account||"—",Math.round(numeric(c.spend)*factor*moneyFactor),Math.round(numeric(c.revenue)*factor*moneyFactor),Math.round(numeric(c.installs)*factor),Math.round(numeric(c.registrations)*factor),c.ctr,c.cvr,Math.round(numeric(c.cpi)*moneyFactor),c.roas,c.status])];
    const csv = rows.map(row=>row.map(v=>`"${String(v).replaceAll('"','""')}"`).join(",")).join("\n");
    const url=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"})); const link=document.createElement("a"); link.href=url; link.download="ua-campaign-report.csv"; link.click(); URL.revokeObjectURL(url); showToast("Đã xuất báo cáo CSV.");
  });
  document.addEventListener("click",event=>{
    const strategyOverviewControl=event.target.closest("[data-strategy-overview-metric]");
    if(strategyOverviewControl) { strategyOverviewMetric=strategyOverviewControl.dataset.strategyOverviewMetric; renderStrategyOverview(); }
    const strategyDrillGroup=event.target.closest("[data-strategy-drill-group]");
    if(strategyDrillGroup) { strategyDrilldownGroup=strategyDrillGroup.dataset.strategyDrillGroup; renderStrategyDrilldown(); }
    const strategyDrillMetric=event.target.closest("[data-strategy-drill-metric]");
    if(strategyDrillMetric) { strategyDrilldownMetric=strategyDrillMetric.dataset.strategyDrillMetric; renderStrategyDrilldown(); }
    const creativeDetail = event.target.closest("[data-creative-detail]");
    if(creativeDetail) {
      selectedCreativeCode = creativeDetail.dataset.creativeDetail;
      renderCreativeCoverage();
      document.querySelector(".creative-coverage-card")?.scrollIntoView({behavior:"smooth",block:"center"});
    }
    const segmentUse = event.target.closest(".segment-use-button");
    if(segmentUse) showToast(`Đã chuẩn bị "${segmentUse.dataset.segment}" để activate trong demo mode.`);
    const adsSwitch = event.target.closest("[data-ads-switch]");
    if(adsSwitch) showToast("Thay đổi trạng thái đã được đưa vào draft; cần Manager phê duyệt trước khi ghi lên nền tảng.");
    const adsMenu = event.target.closest("[data-ads-menu]");
    if(adsMenu) showToast("Row actions: xem chi tiết, mở trên nền tảng, tạo rule hoặc gửi approval.");
    const optimizationReview = event.target.closest("[data-opt-review]");
    if(optimizationReview) showToast("Đã mở review draft: kiểm tra dữ liệu, phạm vi tác động và người phê duyệt trước khi chạy.");
    const optimizationTactic = event.target.closest("[data-opt-tactic]");
    if(optimizationTactic) showToast(`Đã chọn tactic ${optimizationTactic.dataset.optTactic}; hệ thống chỉ tạo draft, không tự ghi lên tài khoản quảng cáo.`);
    const budgetDraft = event.target.closest("[data-budget-draft]");
    if(budgetDraft) showToast(`Đã tạo đề xuất "${budgetDraft.dataset.budgetDraft}" để Manager review.`);
    const briefReview = event.target.closest("[data-brief-review]");
    if(briefReview) showToast(`Đã mở decision context cho "${briefReview.dataset.briefReview}".`);
    const reportTemplate = event.target.closest("[data-report-template]");
    if(reportTemplate) showToast(`Đã tạo report draft từ template "${reportTemplate.dataset.reportTemplate}".`);
    const reportOpen = event.target.closest("[data-report-open]");
    if(reportOpen) showToast(`Report actions: xem, duplicate, export, schedule hoặc archive.`);
    const auditFix = event.target.closest("[data-audit-fix],[data-account-audit]");
    if(auditFix) showToast("Đã mở audit detail và assignment context.");
    const healthIncident = event.target.closest("[data-health-incident]");
    if(healthIncident) showToast("Đã mở incident timeline, affected data và retry history.");
    const connect=event.target.closest(".connect-button");
    if(connect?.dataset.connectorId==="meta") {
      if(connect.dataset.configured!=="true") showToast("Hãy cấu hình Meta App ID, App Secret, Redirect URI và encryption key trong Vercel.");
      else loadMetaAccounts().catch(()=>setMetaStatus("Không thể mở kết nối Meta.","error"));
    } else if(connect?.dataset.connectorId==="google") {
      if(connect.dataset.configured!=="true") showToast("Hãy cấu hình Google OAuth Client, Developer Token, Redirect URI và encryption key trong Vercel.");
      else loadGoogleAccounts().catch(()=>setGoogleStatus("Không thể mở kết nối Google Ads.","error"));
    } else if(connect?.dataset.connectorId==="tiktok") {
      if(connect.dataset.configured!=="true") showToast("Hãy cấu hình TikTok App ID, App Secret và Redirect URI trong Vercel.");
      else loadTiktokAccounts().catch(()=>setTiktokStatus("Không thể mở kết nối TikTok Ads.","error"));
    } else if(connect) showToast(connect.dataset.configured==="true" ? `Sẵn sàng mở OAuth ${connect.dataset.connector}.` : `Hãy cấu hình secrets ${connect.dataset.connector} trong Vercel.`);
    const approve=event.target.closest(".approve-button,.reject-button");
    if(approve){ const item=approve.closest(".approval-item"); item.style.opacity=".45"; showToast(approve.classList.contains("approve-button")?"Đã phê duyệt trong demo mode.":"Đã từ chối trong demo mode."); }
  });
}

window.addEventListener("message",event=>{
  if(event.origin!==location.origin) return;
  if(event.data?.type==="meta-oauth-result") {
    openMetaModal(); if(!event.data.ok) return setMetaStatus(event.data.error || "Kết nối Meta đã bị hủy.","error");
    setMetaStatus("Đã xác thực Facebook. Đang tải danh sách ad account…","success");
    return loadMetaAccounts({showModal:false}).catch(()=>setMetaStatus("Đã kết nối nhưng chưa thể tải ad account.","error"));
  }
  if(event.data?.type==="google-oauth-result") {
    openGoogleModal(); if(!event.data.ok) return setGoogleStatus(event.data.error || "Kết nối Google đã bị hủy.","error");
    setGoogleStatus("Đã xác thực Google. Đang tải danh sách Google Ads account…","success");
    return loadGoogleAccounts({showModal:false}).catch(()=>setGoogleStatus("Đã kết nối nhưng chưa thể tải account.","error"));
  }
  if(event.data?.type==="tiktok-oauth-result") {
    openTiktokModal(); if(!event.data.ok) return setTiktokStatus(event.data.error || "Kết nối TikTok đã bị hủy.","error");
    setTiktokStatus("Đã xác thực TikTok. Đang tải danh sách advertiser…","success");
    return loadTiktokAccounts({showModal:false}).catch(()=>setTiktokStatus("Đã kết nối nhưng chưa thể tải advertiser.","error"));
  }
});

window.addEventListener("ua-auth-ready",()=>{
  renderCommandCenter();
  renderAdsManager();
  renderAdsWorkspaceSignals();
  refreshMetaConnectionBadge();
  refreshGoogleConnectionBadge();
  refreshTiktokConnectionBadge();
  loadCommandMetaData();
  refreshAdsScopeOptions();
  // Only the workspace on screen syncs; others load when opened.
  const active = document.querySelector(".view.active")?.id;
  if(adsWorkspaceByView[active]) adsWorkspaceByView[active].load();
  if(active==="creatives" && !creativeLiveAttempted && !creativeLiveLoading) {
    syncCreativesLive().catch(error=>{
      setCreativeSourceState("Lỗi đồng bộ",error.message,"red");
      showToast(error.message);
    });
  }
  if(active==="analytics" && !analyticsLiveData.loading) {
    loadAnalyticsData().catch(error=>{
      analyticsLiveData.loading=false;
      renderAnalytics();
      showToast(error.message || "Không thể đồng bộ Growth Analytics.");
    });
  }
});

const currentHour = new Date().getHours();
document.querySelector("#welcome-greeting").textContent = currentHour < 11 ? "Chào buổi sáng" : currentHour < 18 ? "Chào buổi chiều" : "Chào buổi tối";
initializeCommandDateControls();
initializeAdsDateControls();
renderCommandCenter();
renderAdsManager();
renderAdsWorkspaceSignals();
renderOptimizationCenter();
renderBudgetPacing();
renderDailyBrief();
renderReports();
renderAccountAudit();
renderTrackingHealth();
renderAnalytics();
renderSegments();
renderAccounts();
renderCreatives();
renderAlerts();
initializeAppsFlyerDateControls();
renderAppsFlyer();
loadAppsFlyerStatus();
renderPlatformAnalytics();
window.addEventListener("ua-auth-ready", event => {
  if (event.detail?.permissions?.canManageIntegrations) renderIntegrations();
}, { once: true });
renderAudit();
initEvents();
switchView(location.hash.slice(1) || "overview");
