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
    { name: "VN · iOS · Purchase · Scale 04", market: "Vietnam", platform: "Meta", businessId:"1748535932598249", business:"NGOC UYEN", accountId:"act_1525709302595694", account:"FOXSCORE - FA1BM2", owner: "David", spend: "$8,420", revenue:"$26,270", installs: "4,180", registrations:"1,520", ctr:"2.48%", cvr:"36.36%", cpi: "$2.01", roasD1:"1.42x", roas: "3.12x", status: "Scaling", trend: "up" },
    { name: "US · Android · tROAS · Broad", market: "United States", platform: "Google", business:"", account:"Google Ads", owner: "Tommy", spend: "$12,180", revenue:"$30,085", installs: "3,940", registrations:"1,328", ctr:"1.64%", cvr:"33.71%", cpi: "$3.09", roasD1:"1.18x", roas: "2.47x", status: "Scaling", trend: "up" },
    { name: "TH · iOS · Creative Test 12", market: "Thailand", platform: "TikTok", business:"", account:"TikTok Ads", owner: "David", spend: "$4,760", revenue:"$8,949", installs: "2,210", registrations:"702", ctr:"1.92%", cvr:"31.76%", cpi: "$2.15", roasD1:".91x", roas: "1.88x", status: "Watch", trend: "down" },
    { name: "BR · Android · Retarget 07", market: "Brazil", platform: "Meta", businessId:"1748535932598249", business:"NGOC UYEN", accountId:"act_1551698326577198", account:"FOXSCORE - FA2BM2", owner: "Tommy", spend: "$5,940", revenue:"$8,435", installs: "1,620", registrations:"388", ctr:".88%", cvr:"23.95%", cpi: "$3.67", roasD1:".63x", roas: "1.42x", status: "At risk", trend: "down" },
    { name: "JP · iOS · Value · Core 02", market: "Japan", platform: "Google", business:"", account:"Google Ads", owner: "Tommy", spend: "$7,630", revenue:"$16,633", installs: "2,340", registrations:"804", ctr:"1.31%", cvr:"34.36%", cpi: "$3.26", roasD1:"1.05x", roas: "2.18x", status: "Watch", trend: "up" },
    { name: "ID · Android · UGC Batch 06", market: "Indonesia", platform: "TikTok", business:"", account:"TikTok Ads", owner: "David", spend: "$3,710", revenue:"$7,606", installs: "2,060", registrations:"693", ctr:"2.22%", cvr:"33.64%", cpi: "$1.80", roasD1:"1.12x", roas: "2.05x", status: "Scaling", trend: "up" }
  ],
  analytics: {
    daily:[
      {label:"01 Jul",spend:31,revenue:64,dau:118,payers:24},{label:"06 Jul",spend:36,revenue:71,dau:126,payers:27},{label:"11 Jul",spend:34,revenue:78,dau:139,payers:31},
      {label:"16 Jul",spend:42,revenue:86,dau:151,payers:34},{label:"21 Jul",spend:39,revenue:92,dau:164,payers:38},{label:"26 Jul",spend:47,revenue:108,dau:179,payers:43},{label:"30 Jul",spend:51,revenue:121,dau:194,payers:49}
    ],
    funnel:[
      {label:"Impressions",value:4210376,rate:100},{label:"Clicks",value:52133,rate:1.24},{label:"Installs",value:5724,rate:10.98},{label:"Registrations",value:1751,rate:30.59},{label:"Payers",value:438,rate:25.01}
    ],
    channels:[
      {platform:"Meta",spend:49402326,revenue:118565582,registrations:612,roas:2.40,ltv:185400},
      {platform:"Google",spend:54656000,revenue:147571200,registrations:1003,roas:2.70,ltv:201300},
      {platform:"TikTok",spend:8160437,revenue:13709534,registrations:136,roas:1.68,ltv:112800}
    ],
    age:[{label:"18–24",value:22},{label:"25–34",value:41},{label:"35–44",value:24},{label:"45–54",value:9},{label:"55+",value:4}],
    geography:[
      {country:"Vietnam",flag:"VN",users:"42.8K",roas:"2.84x",share:34},{country:"United States",flag:"US",users:"18.4K",roas:"2.41x",share:21},{country:"Thailand",flag:"TH",users:"13.7K",roas:"2.08x",share:16},{country:"Indonesia",flag:"ID",users:"11.9K",roas:"1.96x",share:14},{country:"Brazil",flag:"BR",users:"8.2K",roas:"1.42x",share:9}
    ]
  },
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
      code:"V7-2606-VA", editor:"Việt Anh", os:"AND", platforms:["Meta","TikTok"], spend:314939, impressions:6440, reach:5488, ctr:1.58, installs:21, registrations:4, cpi:14997, cpr:78735, hook:30.11, hold:13.77, score:91, recommendation:"Reuse", codeStatus:"Chuẩn", accounts:2, campaigns:4,
      coverage:[
        { account:"Northstar · Meta Global", campaign:"VN · Android · Purchase · Scale", platform:"Meta", spend:178420, installs:13, cpi:13725, trend:"↑ 18%" },
        { account:"Northstar · Meta Global", campaign:"VN · Android · Broad · Test", platform:"Meta", spend:77410, installs:5, cpi:15482, trend:"↑ 7%" },
        { account:"Northstar · TikTok SEA", campaign:"TH · Android · UGC Prospecting", platform:"TikTok", spend:39109, installs:2, cpi:19555, trend:"→ 1%" },
        { account:"Northstar · TikTok SEA", campaign:"ID · Android · Creative Test", platform:"TikTok", spend:19990, installs:1, cpi:19990, trend:"↓ 4%" }
      ]
    },
    {
      code:"V29-VA", editor:"Việt Anh", os:"AND", platforms:["Meta"], spend:753022, impressions:13596, reach:10600, ctr:1.56, installs:29, registrations:9, cpi:25966, cpr:83669, hook:44.59, hold:10.72, score:84, recommendation:"Remix", codeStatus:"Legacy", accounts:2, campaigns:5,
      coverage:[
        { account:"Northstar · Meta Global", campaign:"VN · Android · Core Broad", platform:"Meta", spend:326500, installs:14, cpi:23321, trend:"↑ 8%" },
        { account:"Atlas · Meta LATAM", campaign:"BR · Android · Prospecting", platform:"Meta", spend:212000, installs:7, cpi:30286, trend:"↓ 6%" },
        { account:"Northstar · Meta Global", campaign:"VN · Android · Value", platform:"Meta", spend:129522, installs:5, cpi:25904, trend:"→ 2%" }
      ]
    },
    {
      code:"V6-2606-VA", editor:"Việt Anh", os:"AND", platforms:["Meta","Google"], spend:834846, impressions:17467, reach:15510, ctr:1.27, installs:30, registrations:6, cpi:27828, cpr:139141, hook:33.42, hold:12.49, score:82, recommendation:"Remix", codeStatus:"Chuẩn", accounts:3, campaigns:6,
      coverage:[
        { account:"Northstar · Meta Global", campaign:"VN · Android · Purchase", platform:"Meta", spend:412056, installs:18, cpi:22892, trend:"↑ 5%" },
        { account:"Northstar · Google Apps", campaign:"SEA · Android · App Campaign", platform:"Google", spend:260340, installs:8, cpi:32543, trend:"↓ 9%" },
        { account:"Atlas · Meta LATAM", campaign:"BR · Android · Broad", platform:"Meta", spend:162450, installs:4, cpi:40613, trend:"↓ 13%" }
      ]
    },
    {
      code:"V3-P1", editor:"Team P1", os:"AND", platforms:["Meta"], spend:202917, impressions:5943, reach:5104, ctr:.87, installs:16, registrations:0, cpi:12682, cpr:0, hook:28.20, hold:6.80, score:79, recommendation:"Test", codeStatus:"Legacy", accounts:1, campaigns:2,
      coverage:[{ account:"Northstar · Meta Global", campaign:"VN · Android · Low Cost Test", platform:"Meta", spend:202917, installs:16, cpi:12682, trend:"↑ 22%" }]
    },
    {
      code:"V1-2607", editor:"Chưa map", os:"AND", platforms:["Meta"], spend:561877, impressions:7374, reach:4628, ctr:5.59, installs:10, registrations:2, cpi:56188, cpr:280939, hook:70.27, hold:13.99, score:68, recommendation:"Test", codeStatus:"Thiếu editor", accounts:1, campaigns:3,
      coverage:[{ account:"Northstar · Meta Global", campaign:"VN · Android · Hook Test", platform:"Meta", spend:561877, installs:10, cpi:56188, trend:"↓ 16%" }]
    },
    {
      code:"V2-2607", editor:"Chưa map", os:"AND", platforms:["Meta"], spend:208974, impressions:2618, reach:2167, ctr:2.67, installs:5, registrations:2, cpi:41795, cpr:104487, hook:51.26, hold:9.31, score:62, recommendation:"Test", codeStatus:"Thiếu editor", accounts:1, campaigns:2,
      coverage:[{ account:"Northstar · Meta Global", campaign:"VN · Android · Creative Test", platform:"Meta", spend:208974, installs:5, cpi:41795, trend:"→ 3%" }]
    },
    {
      code:"V6-2607", editor:"Chưa map", os:"iOS", platforms:["Meta","Google"], spend:412954, impressions:11794, reach:10644, ctr:.68, installs:15, registrations:3, cpi:27530, cpr:137651, hook:28.60, hold:7.44, score:70, recommendation:"Test", codeStatus:"Thiếu editor", accounts:2, campaigns:3,
      coverage:[{ account:"Northstar · Meta Global", campaign:"VN · iOS · Purchase", platform:"Meta", spend:264282, installs:10, cpi:26428, trend:"↑ 4%" },{ account:"Northstar · Google Apps", campaign:"SEA · iOS · App Campaign", platform:"Google", spend:148672, installs:5, cpi:29734, trend:"→ 1%" }]
    },
    {
      code:"V5-P2", editor:"Team P2", os:"iOS", platforms:["Meta"], spend:104139, impressions:1915, reach:1782, ctr:.63, installs:5, registrations:0, cpi:20828, cpr:0, hook:23.86, hold:3.94, score:64, recommendation:"Test", codeStatus:"Legacy", accounts:1, campaigns:2,
      coverage:[{ account:"Northstar · Meta Global", campaign:"VN · iOS · Value Test", platform:"Meta", spend:104139, installs:5, cpi:20828, trend:"↓ 3%" }]
    },
    {
      code:"V7-2607", editor:"Chưa map", os:"iOS", platforms:["Meta"], spend:40147, impressions:1261, reach:1128, ctr:.24, installs:1, registrations:0, cpi:40147, cpr:0, hook:11.10, hold:10.71, score:38, recommendation:"Stop", codeStatus:"Thiếu editor", accounts:1, campaigns:2,
      coverage:[{ account:"Northstar · Meta Global", campaign:"VN · iOS · Creative Test", platform:"Meta", spend:40147, installs:1, cpi:40147, trend:"↓ 21%" }]
    },
    {
      code:"V7-2606-VA", editor:"Việt Anh", os:"iOS", platforms:["Meta"], spend:36875, impressions:1024, reach:1004, ctr:.39, installs:0, registrations:0, cpi:0, cpr:0, hook:13.28, hold:4.41, score:31, recommendation:"Stop", codeStatus:"Chuẩn", accounts:1, campaigns:1,
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
      { metric:"CPR", current:65025, previous:51873, format:"money", delta:25.36 },
      { metric:"CVR", current:28.37, previous:32.40, format:"percent", delta:-12.41 },
      { metric:"Organic installs", current:847, previous:1811, format:"number", delta:-53.23 }
    ],
    breakdown: [
      { ua:"David", platform:"Facebook", os:"Android", cost:40514701, revenue:43800000, installs:1634, registrations:546, cpi:24795, cpr:74203, cvr:33.41, share:36.10, rating:"Tốt" },
      { ua:"Tommy", platform:"Facebook", os:"iOS", cost:8887625, revenue:10400000, installs:296, registrations:126, cpi:30026, cpr:70537, cvr:42.57, share:7.92, rating:"Tốt" },
      { ua:"Nelson", platform:"Google", os:"Android", cost:38253043, revenue:42150000, installs:2338, registrations:581, cpi:16361, cpr:65840, cvr:24.85, share:34.09, rating:"Khá" },
      { ua:"David", platform:"Google", os:"iOS", cost:16402957, revenue:17400000, installs:375, registrations:157, cpi:43741, cpr:104477, cvr:41.87, share:14.62, rating:"Tốt" },
      { ua:"Tommy", platform:"Tiktok", os:"Android", cost:5843055, revenue:4760000, installs:270, registrations:53, cpi:21641, cpr:110246, cvr:19.63, share:5.21, rating:"Cần tối ưu" },
      { ua:"Nelson", platform:"Tiktok", os:"iOS", cost:2317300, revenue:2520000, installs:67, registrations:18, cpi:34587, cpr:128739, cvr:26.87, share:2.06, rating:"Khá" }
    ]
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
const commandRangeConfig = {
  yesterday: { factor:.94, label:"Hôm qua", labels:["00h","04h","08h","12h","16h","20h","24h"] },
  today: { factor:1, label:"Hôm nay", labels:["00h","04h","08h","12h","16h","20h","24h"] },
  "7d": { factor:6.72, label:"7 ngày", labels:["25 Jul","26 Jul","27 Jul","28 Jul","29 Jul","30 Jul","31 Jul"] },
  "30d": { factor:27.4, label:"30 ngày", labels:["01 Jul","06 Jul","11 Jul","16 Jul","21 Jul","26 Jul","31 Jul"] }
};
const commandPlatformNames = { meta:"Meta", google:"Google", tiktok:"TikTok" };
const numeric = value => Number(String(value).replace(/[^0-9.-]/g,"")) || 0;
const commandMoney = value => `${Math.round(value * (commandLiveAttempted ? 1 : commandVndRate)).toLocaleString("vi-VN")} ₫`;
const commandNumber = value => Math.round(value).toLocaleString("vi-VN");

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
  const sourceAccounts = commandScopeAccounts.length ? commandScopeAccounts : data.campaigns.filter(row=>row.platform==="Meta").map(row=>({id:row.accountId,name:row.account,businessId:row.businessId,businessName:row.business}));
  const businesses = [...new Map(sourceAccounts.filter(row=>row.businessId).map(row=>[row.businessId,{id:row.businessId,name:row.businessName}])).values()];
  businessSelect.innerHTML = `<option value="all">Tất cả BM</option>${businesses.map(row=>`<option value="${row.id}">${row.name}</option>`).join("")}`;
  if(businesses.some(row=>row.id===commandBusiness)) businessSelect.value=commandBusiness; else commandBusiness="all";
  const accounts = sourceAccounts.filter(row=>commandBusiness==="all" || row.businessId===commandBusiness);
  accountSelect.innerHTML = `<option value="all">Tất cả tài khoản</option>${accounts.map(row=>`<option value="${row.id}">${row.name}</option>`).join("")}`;
  if(accounts.some(row=>row.id===commandAccount)) accountSelect.value=commandAccount; else commandAccount="all";
}

function getCommandSelection() {
  const platformName = commandPlatformNames[commandPlatform];
  const sourceCampaigns = commandLiveAttempted ? (commandLiveData?.campaigns || []) : data.campaigns;
  const campaigns = sourceCampaigns.filter(row =>
    (!platformName || row.platform === platformName) &&
    (commandBusiness === "all" || row.businessId === commandBusiness) &&
    (commandAccount === "all" || row.accountId === commandAccount)
  );
  const factor = commandLiveAttempted ? 1 : commandRangeDetails().factor;
  const totals = campaigns.reduce((sum,row)=>({
    spend: sum.spend + numeric(row.spend),
    revenue: sum.revenue + numeric(row.revenue),
    installs: sum.installs + numeric(row.installs),
    registrations: sum.registrations + numeric(row.registrations)
  }), {spend:0,revenue:0,installs:0,registrations:0});
  Object.keys(totals).forEach(key=>totals[key] *= factor);
  return { campaigns, factor, totals };
}

function renderMetrics() {
  const { totals } = getCommandSelection();
  const delta = commandLiveAttempted ? "" : "↑ 8.4%";
  const sourceNote = commandLiveAttempted ? "Meta Insights" : "dữ liệu mẫu";
  const metrics = [
    ["Total spend",commandMoney(totals.spend),delta,sourceNote,"up","₫"],
    ["Revenue",commandMoney(totals.revenue),commandLiveAttempted?"":"↑ 12.1%",sourceNote,"up","↗"],
    ["Registrations",commandNumber(totals.registrations),commandLiveAttempted?"":"↑ 8.7%",sourceNote,"up","◎"],
    ["Installs",commandNumber(totals.installs),commandLiveAttempted?"":"↑ 6.8%",sourceNote,"up","↓"],
    ["Blended CPI",totals.installs ? commandMoney(totals.spend/totals.installs) : "—",commandLiveAttempted?"":"↓ 4.2%",sourceNote,"up","◎"],
    ["ROAS",totals.spend ? `${(totals.revenue/totals.spend).toFixed(2)}x` : "—",commandLiveAttempted?"":"↑ 0.18",sourceNote,"up","⌁"]
  ];
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
  } else {
    const revenueBase = [44,61,58,73,68,86,94], spendBase = [35,40,44,48,45,54,59];
    const platformScale = Math.max(.18, totals.spend/(42640*range.factor || 1));
    const rangeScale = commandRange === "30d" ? 1.08 : commandRange === "7d" ? 1 : commandRange === "yesterday" ? .94 : 1;
    revenue = revenueBase.map(value=>value*platformScale*rangeScale); spend = spendBase.map(value=>value*platformScale*rangeScale);
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
    ${withOwner ? `<td>${campaign.installs}</td><td>${campaign.registrations}</td><td>${campaign.ctr}</td><td>${campaign.cvr}</td><td>${campaign.cpi}</td><td>${campaign.roasD1}</td><td><strong>${campaign.roas}</strong></td>` : `<td>${campaign.registrations}</td><td>${campaign.cpi}</td><td><strong>${campaign.roas}</strong></td><td><svg class="sparkline ${campaign.trend === "down" ? "down" : ""}" viewBox="0 0 64 21"><path d="${campaign.trend === "up" ? "M1 18L13 14L24 15L36 7L48 9L63 2" : "M1 4L13 7L24 6L36 13L48 11L63 18"}"/></svg></td>`}
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
  const names = commandPlatform === "all" ? (commandLiveAttempted ? ["Meta"] : ["Meta","Google","TikTok"]) : [commandPlatformNames[commandPlatform]];
  document.querySelector("#command-platform-performance").innerHTML = names.map(platform=>{
    const rows = campaigns.filter(row=>row.platform===platform);
    const totals = rows.reduce((sum,row)=>({
      spend:sum.spend+numeric(row.spend), revenue:sum.revenue+numeric(row.revenue),
      installs:sum.installs+numeric(row.installs), registrations:sum.registrations+numeric(row.registrations)
    }),{spend:0,revenue:0,installs:0,registrations:0});
    const spend=totals.spend*factor, revenue=totals.revenue*factor, installs=totals.installs*factor, registrations=totals.registrations*factor;
    return `<div class="command-platform-row">
      <div><span>${platformDot(platform)}<strong>${platform}</strong></span><small>${rows.length} campaign đang theo dõi</small></div>
      <dl><div><dt>Spend</dt><dd>${commandMoney(spend)}</dd></div><div><dt>Register</dt><dd>${commandNumber(registrations)}</dd></div><div><dt>CPI</dt><dd>${installs?commandMoney(spend/installs):"—"}</dd></div><div><dt>ROAS</dt><dd>${spend?`${(revenue/spend).toFixed(2)}x`:"—"}</dd></div></dl>
    </div>`;
  }).join("");
}

function renderCommandRisk() {
  const alerts = getCommandAlerts();
  const risk = alerts.reduce((sum,row)=>sum+(row.riskValue||0),0);
  const ownerCoverage = Math.round(alerts.filter(row=>row.owner).length/Math.max(alerts.length,1)*100);
  document.querySelector("#command-risk-value").textContent = commandMoney(risk);
  document.querySelector("#command-risk-count").textContent = alerts.length;
  document.querySelector("#command-owner-coverage").textContent = `${ownerCoverage}% đã có owner`;
  document.querySelector("#command-risk-gauge").style.width = `${ownerCoverage}%`;
  document.querySelector("#command-queue-count").textContent = `${alerts.length} việc`;
  document.querySelector("#command-brief-copy").textContent = commandLiveAttempted ? `Số liệu Meta thật · ${commandAccount === "all" ? "Tất cả tài khoản đã chọn" : "1 tài khoản quảng cáo"}.` : "Đang chờ dữ liệu Meta thật.";
}

function getCommandAlerts() {
  if(commandLiveAttempted) return [];
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

async function loadCommandMetaData() {
  if(!window.__uaSessionToken || commandLiveLoading) return;
  const range=commandRangeDetails();
  if(!range.from || !range.to) return renderCommandLiveStatus("Khoảng ngày chưa hợp lệ","Vui lòng kiểm tra ngày bắt đầu và kết thúc.","error");
  commandLiveLoading=true;
  commandLiveAttempted=true;
  commandLiveData={campaigns:[],daily:[],accounts:commandScopeAccounts,currency:"VND"};
  renderCommandLiveStatus("Đang đồng bộ Meta",`${range.from} → ${range.to}`);
  renderCommandCenter();
  try {
    const params=new URLSearchParams({from:range.from,to:range.to,business:commandBusiness,account:commandAccount});
    params.set("mode","insights");
    const response=await fetch(`/api/meta-accounts?${params}`,{headers:metaAuthHeaders()});
    const payload=await response.json().catch(()=>({}));
    commandLiveAttempted=true;
    if(!response.ok) throw new Error(payload.error || "Không thể đọc Meta Insights.");
    commandLiveData=payload;
    commandScopeAccounts=[...new Map([...commandScopeAccounts,...(payload.accounts||[])].map(row=>[row.id,row])).values()];
    refreshCommandScopeOptions();
    const syncTime=new Date(payload.syncedAt).toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"});
    renderCommandLiveStatus("Meta Insights đã đồng bộ",`${payload.campaigns.length} campaign · ${payload.currency} · ${syncTime}`,payload.partialErrors?.length?"warning":"success");
    document.querySelector("#demo-banner")?.setAttribute("hidden","");
  } catch(error) {
    commandLiveData={campaigns:[],daily:[],accounts:commandScopeAccounts,currency:"VND"};
    commandLiveAttempted=true;
    renderCommandLiveStatus("Chưa đọc được Meta Insights",error.message,"error");
  } finally {
    commandLiveLoading=false;
    renderCommandCenter();
  }
}

function renderCommandCenter() {
  renderMetrics();
  renderChart();
  renderQueue();
  renderCampaigns();
  renderCommandPlatforms();
  renderCommandRisk();
}

let currentAdsLevel = "campaign";
const adsUaNames = ["David","Tommy","Nelson"];
let adsLiveData = null;
let adsLiveAttempted = false;
let adsLiveLoading = false;
let adsScopeAccounts = [];
let adsBusiness = "all";
let adsAccount = "all";
const adsSelectedIds = new Set();
const adsMoney = value => Number(value) ? (adsLiveAttempted ? `${Math.round(Number(value)).toLocaleString("vi-VN")} ₫` : `$${Number(value).toLocaleString("en-US")}`) : "—";
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

function adsRangeDetails() {
  const mode=document.querySelector("#ads-date-range")?.value || "7", iso=date=>`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
  if(mode!=="custom") { const to=new Date(), from=new Date(to); if(mode==="yesterday") { from.setDate(from.getDate()-1); to.setDate(to.getDate()-1); } else if(mode!=="today") from.setDate(from.getDate()-(Number(mode)-1)); return {from:iso(from),to:iso(to)}; }
  return {from:document.querySelector("#ads-date-from")?.value || "",to:document.querySelector("#ads-date-to")?.value || ""};
}

function initializeAdsDateControls() {
  const to=new Date(),from=new Date(to); from.setDate(from.getDate()-6);
  const iso=date=>`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
  const fromInput=document.querySelector("#ads-date-from"),toInput=document.querySelector("#ads-date-to");
  if(fromInput) fromInput.value=iso(from); if(toInput) toInput.value=iso(to);
}

function refreshAdsScopeOptions() {
  const businessSelect=document.querySelector("#ads-business-filter"),accountSelect=document.querySelector("#ads-account-filter"); if(!businessSelect||!accountSelect) return;
  const accounts=adsScopeAccounts.length?adsScopeAccounts:commandScopeAccounts, businesses=[...new Map(accounts.filter(row=>row.businessId).map(row=>[row.businessId,{id:row.businessId,name:row.businessName}])).values()];
  businessSelect.innerHTML=`<option value="all">Tất cả BM</option>${businesses.map(row=>`<option value="${row.id}">${row.name}</option>`).join("")}`;
  if(businesses.some(row=>row.id===adsBusiness)) businessSelect.value=adsBusiness; else adsBusiness="all";
  const scoped=accounts.filter(row=>adsBusiness==="all"||row.businessId===adsBusiness);
  accountSelect.innerHTML=`<option value="all">Tất cả tài khoản</option>${scoped.map(row=>`<option value="${row.id}">${row.name}</option>`).join("")}`;
  if(scoped.some(row=>row.id===adsAccount)) accountSelect.value=adsAccount; else adsAccount="all";
}

function adsLiveRows() {
  if(!adsLiveAttempted) return adsManagerData[currentAdsLevel]||[];
  if(currentAdsLevel!=="campaign") return [];
  return (adsLiveData?.campaigns||[]).map(row=>({id:row.campaignId,name:row.name,parent:[row.business,row.account].filter(Boolean).join(" · "),platform:"Meta",owner:inferAdsUa(row.name),businessId:row.businessId,accountId:row.accountId,budget:0,spend:row.spend,revenue:row.revenue,registrations:row.registrations,installs:row.installs,cpi:row.cpi,roas:row.roas,impressions:row.impressions,clicks:row.clicks,purchases:row.purchases,ctr:row.ctr,cvr:row.cvr,status:"Meta live",active:true,trend:"up"}));
}

async function loadAdsMetaData() {
  if(!window.__uaSessionToken||adsLiveLoading) return;
  const range=adsRangeDetails(); if(!range.from||!range.to||range.from>range.to) return showToast("Khoảng ngày Campaign Center chưa hợp lệ.");
  adsLiveLoading=true; document.querySelector("#ads-source-copy").textContent="Đang đồng bộ Meta Insights theo phạm vi đã chọn…";
  try {
    const params=new URLSearchParams({mode:"insights",from:range.from,to:range.to,business:adsBusiness,account:adsAccount});
    const response=await fetch(`/api/meta-accounts?${params}`,{headers:metaAuthHeaders()}),payload=await response.json().catch(()=>({}));
    if(!response.ok) throw new Error(payload.error||"Không thể đọc Meta Insights.");
    adsLiveData=payload; adsLiveAttempted=true; adsScopeAccounts=[...new Map([...(adsScopeAccounts||[]),...(payload.accounts||[])].map(row=>[row.id,row])).values()]; refreshAdsScopeOptions();
    document.querySelector("#ads-source-copy").textContent="Meta Insights trực tiếp · UA được nhận diện theo tên campaign.";
    document.querySelector("#ads-scope-count").textContent=`${payload.accounts.length} ad accounts`;
    document.querySelector("#ads-last-sync").innerHTML=`<i></i>${new Date(payload.syncedAt).toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"})}`;
  } catch(error) {
    adsLiveAttempted=false; adsLiveData=null; document.querySelector("#ads-source-copy").textContent=`Chưa đọc được Meta Insights: ${error.message}`; document.querySelector("#ads-scope-count").textContent="Demo fallback"; document.querySelector("#ads-last-sync").textContent="Chưa đồng bộ";
  } finally { adsLiveLoading=false; renderAdsManager(); }
}

function getAdsManagerRows() {
  const query = (document.querySelector("#ads-manager-search")?.value || "").trim().toLowerCase();
  const platform = document.querySelector("#ads-platform-filter")?.value || "all";
  const status = document.querySelector("#ads-status-filter")?.value || "all";
  const owner = document.querySelector("#ads-ua-filter")?.value || "all";
  return adsLiveRows().filter(row =>
    (!query || `${row.name} ${row.parent} ${row.owner} ${row.id}`.toLowerCase().includes(query)) &&
    (platform === "all" || row.platform === platform) &&
    (status === "all" || row.status === status) &&
    (owner === "all" || (owner === "unassigned" ? row.owner === "Chưa nhận diện" : row.owner === owner)) &&
    (adsBusiness === "all" || row.businessId === adsBusiness) &&
    (adsAccount === "all" || row.accountId === adsAccount)
  );
}

function renderAdsSelectionSummary(rows) {
  const container=document.querySelector("#ads-selection-summary"); if(!container) return;
  const selected=rows.filter(row=>adsSelectedIds.has(row.id)), scope=selected.length?selected:rows;
  const totals=scope.reduce((sum,row)=>({spend:sum.spend+Number(row.spend||0),revenue:sum.revenue+Number(row.revenue||0),registrations:sum.registrations+Number(row.registrations||0),installs:sum.installs+Number(row.installs||0),impressions:sum.impressions+Number(row.impressions||0),clicks:sum.clicks+Number(row.clicks||0),purchases:sum.purchases+Number(row.purchases||0)}),{spend:0,revenue:0,registrations:0,installs:0,impressions:0,clicks:0,purchases:0});
  const cpi=totals.installs?totals.spend/totals.installs:0,cpr=totals.registrations?totals.spend/totals.registrations:0,roas=totals.spend?totals.revenue/totals.spend:0,ctr=totals.impressions?totals.clicks/totals.impressions*100:0;
  const note=selected.length?`${selected.length} campaign đã chọn`:`${rows.length} campaign trong phạm vi`;
  const metrics=[["Spend",adsMoney(totals.spend)],["Revenue",adsMoney(totals.revenue)],["Registrations",totals.registrations.toLocaleString("vi-VN")],["Installs",totals.installs.toLocaleString("vi-VN")],["CPI",adsMoney(cpi)],["CPR",adsMoney(cpr)],["ROAS",`${roas.toFixed(2)}x`],["CTR",`${ctr.toFixed(2)}%`]];
  container.innerHTML=metrics.map(([label,value])=>`<div><span>${label}</span><strong>${value}</strong><small>${note}</small></div>`).join("");
}

function updateAdsSelection() {
  const checked = document.querySelectorAll("#ads-manager-table-body .ads-row-check:checked").length;
  const label = document.querySelector("#ads-selection-count");
  if (label) label.textContent = `${checked} đã chọn`;
  const all = document.querySelector("#ads-select-all");
  const available = document.querySelectorAll("#ads-manager-table-body .ads-row-check").length;
  if (all) {
    all.checked = available > 0 && checked === available;
    all.indeterminate = checked > 0 && checked < available;
  }
  renderAdsSelectionSummary(getAdsManagerRows());
}

function renderAdsManager() {
  const rows = getAdsManagerRows();
  const body = document.querySelector("#ads-manager-table-body");
  if (!body) return;
  document.querySelector("#ads-name-heading").textContent = adsLevelLabels[currentAdsLevel];
  body.innerHTML = rows.map(row => {
    const commerce = adsCommerceMetrics(row);
    const impressions=Number(row.impressions || commerce.impressions || 0), clicks=Number(row.clicks || commerce.linkClicks || 0), purchases=Number(row.purchases ?? commerce.purchases ?? 0);
    const ctr=Number.isFinite(Number(row.ctr)) ? Number(row.ctr) : (impressions ? clicks/impressions*100 : 0);
    const cvr=Number.isFinite(Number(row.cvr)) ? Number(row.cvr) : (clicks ? Number(row.installs||0)/clicks*100 : 0);
    const cpc=clicks ? Number(row.spend||0)/clicks : 0, cpm=impressions ? Number(row.spend||0)/impressions*1000 : 0, cpr=Number(row.registrations||0) ? Number(row.spend||0)/Number(row.registrations) : 0;
    const optimization = currentAdsLevel === "adset" ? "AI bidding" : currentAdsLevel === "asset" ? "Asset rule" : row.roas >= 2.5 ? "ROAS guardrail" : "";
    return `
    <tr data-ads-row="${row.id}">
      <td><input class="ads-row-check" type="checkbox" data-ads-row-check="${row.id}" ${adsSelectedIds.has(row.id)?"checked":""} aria-label="Chọn ${row.name}" /></td>
      <td><button class="ads-switch ${row.active ? "on" : ""}" data-ads-switch="${row.id}" aria-label="${row.active ? "Tạm dừng" : "Bật"} ${row.name}"></button></td>
      <td class="ads-entity"><strong>${row.name}</strong><small>${row.parent} · ${row.id}</small></td>
      <td><span class="platform-badge">${platformDot(row.platform)}${row.platform}</span></td>
      <td>${row.owner}</td>
      <td><div class="ads-performance ${row.trend === "down" ? "down" : ""}"><svg viewBox="0 0 75 23" aria-label="Performance ${row.trend}"><polyline points="${row.trend === "up" ? "2,19 15,14 27,16 40,8 53,10 72,3" : "2,4 15,8 27,6 40,14 53,11 72,20"}"/></svg></div></td>
      <td>${row.budget ? `${adsMoney(row.budget)}/day` : "—"}</td>
      <td><strong>${adsMoney(row.spend)}</strong></td>
      <td><strong>${adsMoney(row.revenue)}</strong></td>
      <td>${row.registrations.toLocaleString("en-US")}</td>
      <td>${row.installs.toLocaleString("en-US")}</td>
      <td>${adsMoney(row.cpi)}</td>
      <td>${adsMoney(cpr)}</td>
      <td><strong>${row.roas.toFixed(2)}x</strong></td>
      <td>${impressions.toLocaleString("en-US")}</td>
      <td>${clicks.toLocaleString("en-US")}</td>
      <td>${ctr.toFixed(2)}%</td>
      <td>${adsMoney(cpc)}</td>
      <td>${adsMoney(cpm)}</td>
      <td>${cvr.toFixed(2)}%</td>
      <td>${purchases.toLocaleString("en-US")}</td>
      <td>${adsStatusPill(row.status)}</td>
      <td><span class="ads-optimization ${optimization ? "" : "none"}">${optimization || "None"}</span></td>
      <td><button class="ads-row-menu" data-ads-menu="${row.id}" aria-label="Mở menu ${row.name}">⋮</button></td>
    </tr>`;
  }).join("") || `<tr><td colspan="24"><div class="empty-state">${adsLiveAttempted && currentAdsLevel!=="campaign" ? "Meta live hiện đang đồng bộ cấp Campaign. Ad set và Ad sẽ được bổ sung ở bước connector tiếp theo." : "Không có dữ liệu phù hợp với bộ lọc."}</div></td></tr>`;
  const totals = rows.reduce((sum,row)=>({
    spend:sum.spend+row.spend,revenue:sum.revenue+row.revenue,registrations:sum.registrations+row.registrations,installs:sum.installs+row.installs
  }),{spend:0,revenue:0,registrations:0,installs:0});
  const blendedCpi = totals.installs ? totals.spend / totals.installs : 0;
  const blendedRoas = totals.spend ? totals.revenue / totals.spend : 0;
  document.querySelector("#ads-manager-table-foot").innerHTML = `<tr><td colspan="7">Kết quả từ ${rows.length} ${adsLevelLabels[currentAdsLevel].toLowerCase()}</td><td>${adsMoney(totals.spend)}</td><td>${adsMoney(totals.revenue)}</td><td>${totals.registrations.toLocaleString("en-US")}</td><td>${totals.installs.toLocaleString("en-US")}</td><td>${adsMoney(Number(blendedCpi.toFixed(2)))}</td><td>${adsMoney(totals.registrations?totals.spend/totals.registrations:0)}</td><td>${blendedRoas.toFixed(2)}x</td><td colspan="10"></td></tr>`;
  document.querySelectorAll(".ads-level-tabs button").forEach(button=>button.classList.toggle("active",button.dataset.adsLevel===currentAdsLevel));
  const activeFilters = ["#ads-platform-filter","#ads-ua-filter","#ads-business-filter","#ads-account-filter","#ads-status-filter"]
    .map(selector=>document.querySelector(selector)?.value || "all")
    .filter(value=>value!=="all").length;
  document.querySelector("#ads-filter-count").textContent = activeFilters;
  updateAdsSelection();
}

function renderAdsWorkspaceSignals() {
  const container = document.querySelector("#ads-workspace-signals");
  if (!container) return;
  container.innerHTML = [
    ["risk","BR Retarget vượt CPI guardrail","CPI $3.67 · +38% so với target","Review"],
    ["good","V7-2606-VA đủ điều kiện scale","ROAS 3.78x · 1,180 installs","+20%"],
    ["","TH Creative Test sắp hết learning","Còn 9 conversion để ổn định","Watch"]
  ].map(([tone,title,note,value])=>`<div class="ads-signal ${tone}"><i></i><div><strong>${title}</strong><small>${note}</small></div><b>${value}</b></div>`).join("");
}

function renderOptimizationCenter() {
  const metricRows = [
    ["Open recommendations","4","2 cần duyệt hôm nay","AI queue","down","✦"],
    ["Guardrail coverage","36%","↑ 8pt trong 30 ngày","monitored scope","up","⌁"],
    ["Actions · 7D","28","12 pause · 9 scale","draft + approved","up","↗"],
    ["Budget protected","18,4M ₫","Stop Loss + Sunsetting","estimated saving","up","₫"],
    ["Approval SLA","42 phút","↓ 18 phút","median review time","up","✓"]
  ];
  document.querySelector("#optimization-metrics").innerHTML = metricRows.map(([label,value,delta,note,tone,icon])=>`
    <article class="metric"><div class="metric-top"><span class="metric-label">${label}</span><span class="metric-icon">${icon}</span></div><strong>${value}</strong><small><span class="delta ${tone}">${delta}</span>${note}</small></article>`).join("");

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
    ["SCALE","Ad set","Scale registration","Mở rộng ad set có registration CVR và D7 quality tốt.","CPR ≤ target · D7 retention ≥ 12%"],
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

function getAnalyticsSelection() {
  const period = document.querySelector("#analytics-period")?.value || "30d";
  const product = document.querySelector("#analytics-product")?.value || "all";
  const platform = document.querySelector("#analytics-platform")?.value || "all";
  const market = document.querySelector("#analytics-market")?.value || "all";
  const periodFactor = { "7d":.25, "30d":1, "90d":2.84 }[period] || 1;
  const productFactor = { all:1, northstar:.68, orbit:.32 }[product] || 1;
  const marketFactor = { all:1, SEA:.56, US:.21, LATAM:.12 }[market] || 1;
  const channels = data.analytics.channels.filter(row=>platform === "all" || row.platform === platform);
  return { period, product, platform, market, factor:periodFactor*productFactor*marketFactor, channels };
}

function renderAnalytics() {
  const selection = getAnalyticsSelection();
  const baseSpend = selection.channels.reduce((sum,row)=>sum+row.spend,0);
  const baseRevenue = selection.channels.reduce((sum,row)=>sum+row.revenue,0);
  const channelShare = baseSpend / data.analytics.channels.reduce((sum,row)=>sum+row.spend,0);
  const spend = baseSpend * selection.factor;
  const revenue = baseRevenue * selection.factor;
  const installs = 5724 * channelShare * selection.factor;
  const registrations = 1751 * channelShare * selection.factor;
  const roas = spend ? revenue/spend : 0;
  const dau = 194200 * channelShare * Math.min(1.25,.86 + selection.factor*.14);
  const metrics = [
    ["Ad spend",formatVnd(spend),"↑ 8,4%","media investment","up","₫"],
    ["Revenue",formatVnd(revenue),"↑ 12,1%","blended revenue","up","↗"],
    ["ROAS",`${roas.toLocaleString("vi-VN",{maximumFractionDigits:2})}x`,"↑ 0,18","revenue / spend","up","⌁"],
    ["Installs",Math.round(installs).toLocaleString("vi-VN"),"↑ 6,8%","paid acquisition","up","↓"],
    ["Registrations",Math.round(registrations).toLocaleString("vi-VN"),`${installs ? (registrations/installs*100).toLocaleString("vi-VN",{maximumFractionDigits:1}) : 0}%`,"install → register","neutral","◎"],
    ["DAU",Math.round(dau).toLocaleString("vi-VN"),"↑ 15,2%","product activity","up","◉"]
  ];
  document.querySelector("#analytics-metrics").innerHTML = metrics.map(([label,value,delta,note,tone,icon])=>`
    <article class="metric analytics-metric"><div class="metric-top"><span class="metric-label">${label}</span><span class="metric-icon">${icon}</span></div><strong>${value}</strong><small><span class="delta ${tone}">${delta}</span>${note}</small></article>`).join("");

  const daily = data.analytics.daily.map(row=>({...row,spend:row.spend*channelShare*selection.factor,revenue:row.revenue*channelShare*selection.factor}));
  const xStep = 82, xStart = 45, chartBottom = 205;
  const maxValue = Math.max(...daily.flatMap(row=>[row.spend,row.revenue]),1);
  const points = key => daily.map((row,index)=>`${xStart+index*xStep},${chartBottom-row[key]/maxValue*155}`).join(" ");
  document.querySelector("#analytics-growth-chart").innerHTML = `
    <svg viewBox="0 0 590 240" role="img" aria-label="Biểu đồ spend và revenue">
      ${[50,100,150,200].map(y=>`<line class="grid-line" x1="34" y1="${y}" x2="555" y2="${y}"/>`).join("")}
      <polyline class="analytics-spend-path" points="${points("spend")}"/>
      <polyline class="analytics-revenue-path" points="${points("revenue")}"/>
      ${daily.map((row,index)=>`<text class="axis-text" x="${xStart+index*xStep}" y="229" text-anchor="middle">${row.label}</text>`).join("")}
    </svg>`;

  document.querySelector("#analytics-funnel").innerHTML = data.analytics.funnel.map((step,index)=>{
    const scaled = step.value * channelShare * selection.factor;
    return `<div class="funnel-step"><span style="width:${100-index*11}%"><i>${index+1}</i><strong>${step.label}</strong><b>${Math.round(scaled).toLocaleString("vi-VN")}</b></span><small>${index ? `${step.rate.toLocaleString("vi-VN")}% từ bước trước` : "100% reach"}</small></div>`;
  }).join("");

  const maxDau = Math.max(...data.analytics.daily.map(row=>row.dau));
  document.querySelector("#product-growth-chart").innerHTML = data.analytics.daily.map(row=>`
    <div class="product-day"><div><span class="dau-bar" style="height:${row.dau/maxDau*100}%"></span><span class="payer-bar" style="height:${row.payers/55*100}%"></span></div><small>${row.label.replace(" Jul","")}</small></div>`).join("");
  document.querySelector("#product-kpis").innerHTML = [
    ["MAU","486K","↑ 11,8%"],["D1 retention","31,4%","↑ 2,1pt"],["D7 retention","12,8%","↑ 1,4pt"],["Payer rate","3,62%","↑ 0,32pt"],["ARPDAU","$0.41","↑ 8,7%"]
  ].map(([label,value,trend])=>`<span><small>${label}</small><strong>${value}</strong><b>${trend}</b></span>`).join("");

  document.querySelector("#channel-economics").innerHTML = selection.channels.map(row=>`
    <tr><td><span class="platform-badge">${platformDot(row.platform)}${row.platform}</span></td><td>${formatVnd(row.spend*selection.factor)}</td><td><strong>${formatVnd(row.revenue*selection.factor)}</strong></td><td>${Math.round(row.registrations*selection.factor).toLocaleString("vi-VN")}</td><td><strong>${row.roas.toLocaleString("vi-VN")}x</strong></td><td>${formatVnd(row.ltv)}</td></tr>`).join("");

  document.querySelector("#age-chart").innerHTML = data.analytics.age.map(row=>`
    <div class="horizontal-bar"><span>${row.label}</span><div><i style="width:${row.value/45*100}%"></i></div><strong>${row.value}%</strong></div>`).join("");
  document.querySelector("#gender-device-chart").innerHTML = `
    <div class="mix-donut"><div><strong>58%</strong><small>Android</small></div></div>
    <div class="mix-stats"><span><i class="male"></i><small>Nam</small><strong>54%</strong></span><span><i class="female"></i><small>Nữ</small><strong>44%</strong></span><span><i class="unknown"></i><small>Khác</small><strong>2%</strong></span><footer><b>Android 58%</b><b>iOS 42%</b></footer></div>`;
  document.querySelector("#geo-chart").innerHTML = data.analytics.geography.map(row=>`
    <div class="geo-row"><span>${row.flag}</span><div><strong>${row.country}</strong><small>${row.users} users</small></div><div class="geo-track"><i style="width:${row.share/36*100}%"></i></div><b>${row.roas}</b></div>`).join("");
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
let creativeBriefOffset = 0;

function creativeRecommendationPill(recommendation) {
  const labels = { Reuse:"Dùng lại", Remix:"Remix", Test:"Thêm data", Stop:"Dừng" };
  const tones = { Reuse:"green", Remix:"violet", Test:"amber", Stop:"red" };
  return `<span class="pill ${tones[recommendation]}">${labels[recommendation]}</span>`;
}

function getCreativeSelection() {
  const query = (document.querySelector("#creative-search")?.value || "").trim().toLowerCase();
  const platform = document.querySelector("#creative-platform")?.value || "all";
  const os = document.querySelector("#creative-os")?.value || "all";
  const editor = document.querySelector("#creative-editor")?.value || "all";
  const recommendation = document.querySelector("#creative-recommendation")?.value || "all";
  const rows = data.creatives.filter(row =>
    (!query || `${row.code} ${row.editor} ${row.coverage.map(item=>item.campaign).join(" ")}`.toLowerCase().includes(query)) &&
    (platform === "all" || row.platforms.includes(platform)) &&
    (os === "all" || row.os === os) &&
    (editor === "all" || row.editor === editor) &&
    (recommendation === "all" || row.recommendation === recommendation)
  );
  return { query, platform, os, editor, recommendation, rows };
}

function renderCreatives() {
  const { rows } = getCreativeSelection();
  const spend = rows.reduce((sum,row)=>sum + row.spend,0);
  const installs = rows.reduce((sum,row)=>sum + row.installs,0);
  const winners = rows.filter(row=>row.recommendation === "Reuse").length;
  const reusePool = rows.filter(row=>["Reuse","Remix"].includes(row.recommendation)).length;
  const invalidCodes = rows.filter(row=>row.codeStatus !== "Chuẩn").length;
  const totalCampaigns = rows.reduce((sum,row)=>sum + row.campaigns,0);
  const metrics = [
    ["Creative codes", rows.length.toLocaleString("vi-VN"), `${invalidCodes} cần chuẩn hóa`, "trong bộ lọc hiện tại", invalidCodes ? "down" : "up", "⌁"],
    ["Total spend", formatVnd(spend), `${totalCampaigns} campaign placements`, "đã được gộp mã", "neutral", "₫"],
    ["Installs", installs.toLocaleString("vi-VN"), spend && installs ? formatVnd(spend/installs) : "—", "blended CPI", "neutral", "↓"],
    ["Winner", winners.toLocaleString("vi-VN"), "Reuse score ≥ 85", "sẵn sàng scale", "up", "✦"],
    ["Reuse pool", reusePool.toLocaleString("vi-VN"), "reuse + remix", "ưu tiên vòng tiếp theo", "up", "↻"],
    ["Code hygiene", `${rows.length ? Math.round((rows.length-invalidCodes)/rows.length*100) : 0}%`, `${invalidCodes} mã legacy/missing`, "cần map editor & tháng", invalidCodes ? "down" : "up", "✓"]
  ];
  document.querySelector("#creative-metrics").innerHTML = metrics.map(([label,value,delta,note,tone,icon])=>`
    <article class="metric creative-metric">
      <div class="metric-top"><span class="metric-label">${label}</span><span class="metric-icon">${icon}</span></div>
      <strong>${value}</strong><small><span class="delta ${tone}">${delta}</span>${note}</small>
    </article>`).join("");

  const reuseRows = [...rows].filter(row=>row.recommendation !== "Stop").sort((a,b)=>b.score-a.score).slice(0,4);
  document.querySelector("#creative-reuse-list").innerHTML = reuseRows.map((row,index)=>`
    <button class="reuse-item" data-creative-detail="${row.code}">
      <span class="reuse-rank">${index+1}</span>
      <div><strong>${row.code}</strong><small>${row.editor} · ${row.accounts} account · ${row.campaigns} campaign</small></div>
      <span class="reuse-score"><b>${row.score}</b><small>/100</small></span>
      ${creativeRecommendationPill(row.recommendation)}
    </button>`).join("") || `<p class="empty-state">Không có creative phù hợp bộ lọc.</p>`;

  const strongHook = rows.filter(row=>row.hook >= 40).length;
  const efficient = rows.filter(row=>row.cpi && row.cpi < 28000).length;
  const crossPlatform = rows.filter(row=>row.platforms.length > 1).length;
  document.querySelector("#creative-signals").innerHTML = [
    ["Hook mở đầu",`${strongHook} creative`,`Hook Rate ≥ 40% · ưu tiên mở thẳng payoff/gameplay`,"hook"],
    ["Acquisition",`${efficient} creative`,`CPI dưới 28.000 ₫ · giữ nguyên core angle`,"cost"],
    ["Portability",`${crossPlatform} creative`,`Đã chạy nhiều platform · phù hợp tạo biến thể`,"scale"]
  ].map(([title,value,note,icon])=>`<div class="signal-item"><span class="${icon}">${icon==="hook"?"▶":icon==="cost"?"₫":"↗"}</span><div><strong>${title}</strong><small>${note}</small></div><b>${value}</b></div>`).join("");
  renderCreativeIntelligence(rows);

  document.querySelector("#creative-count").textContent = `${rows.length} creative`;
  document.querySelector("#creative-table").innerHTML = rows.map(row=>`
    <tr>
      <td><div class="creative-code-cell"><strong>${row.code}</strong><small class="${row.codeStatus === "Chuẩn" ? "valid" : "warning"}">${row.codeStatus}</small></div></td>
      <td>${row.editor}</td>
      <td><span class="os-badge ${row.os === "AND" ? "android" : "ios"}">${row.os === "AND" ? "Android" : "iOS"}</span></td>
      <td><strong>${row.accounts}</strong> account · <strong>${row.campaigns}</strong> campaign</td>
      <td><strong>${formatVnd(row.spend)}</strong></td>
      <td>${row.ctr.toLocaleString("vi-VN")}%</td>
      <td>${row.installs.toLocaleString("vi-VN")}</td>
      <td><strong>${row.cpi ? formatVnd(row.cpi) : "—"}</strong></td>
      <td>${row.hook.toLocaleString("vi-VN")}%</td>
      <td>${row.hold.toLocaleString("vi-VN")}%</td>
      <td><span class="creative-score ${row.score >= 80 ? "high" : row.score < 50 ? "low" : ""}">${row.score}</span></td>
      <td>${creativeRecommendationPill(row.recommendation)}</td>
      <td><button class="row-detail-button" data-creative-detail="${row.code}">Xem →</button></td>
    </tr>`).join("") || `<tr><td colspan="13"><p class="empty-state">Không tìm thấy creative phù hợp.</p></td></tr>`;

  if (!rows.some(row=>row.code === selectedCreativeCode) && rows[0]) selectedCreativeCode = rows[0].code;
  renderCreativeCoverage();
  renderCreativeBriefs();
}

function renderCreativeIntelligence(rows) {
  const totalSpend = rows.reduce((sum,row)=>sum+row.spend,0) || 1;
  const formats = [
    ["SV","Short video",rows.filter((_,index)=>index%4===0),2.84],
    ["MV","Medium video",rows.filter((_,index)=>index%4===1),2.31],
    ["IMG","Static image",rows.filter((_,index)=>index%4===2),1.92],
    ["UGC","UGC / creator",rows.filter((_,index)=>index%4===3),2.58]
  ].map(([code,label,items,roas])=>({code,label,count:items.length,spend:items.reduce((sum,row)=>sum+row.spend,0),roas}));
  document.querySelector("#creative-format-matrix").innerHTML = `<div class="creative-format-list">${formats.map(format=>`
    <div class="creative-format-row"><span>${format.code}</span><div><strong>${format.label}</strong><small>${format.count} creative · ${format.spend ? formatVnd(format.spend) : "chưa có spend"}</small></div><div class="format-track"><i style="width:${format.spend/totalSpend*100}%"></i></div><b>${format.roas.toLocaleString("vi-VN")}x</b></div>`).join("")}</div>`;
  document.querySelector("#creative-copy-insights").innerHTML = `
    <div class="copy-insight-body">
      <div class="copy-length-grid"><div><span>Short copy</span><strong>2,76x</strong><small>Best ROAS proxy</small></div><div><span>Medium copy</span><strong>2,18x</strong><small>Stable CVR</small></div><div><span>Long copy</span><strong>1,64x</strong><small>Needs test</small></div></div>
      <div class="copy-tags"><span>Winning AI tags</span><div><b>reward reveal</b><b>fail → win</b><b>gameplay proof</b><b>social reaction</b><b>level-up</b></div></div>
      <div class="copy-signal-list"><div class="copy-signal"><span>CTA “Play now”</span><strong>+18% CVR</strong></div><div class="copy-signal"><span>Copy có emoji</span><strong>+7% CTR</strong></div><div class="copy-signal"><span>Hook ≤ 42 ký tự</span><strong>2,4x ROAS</strong></div></div>
    </div>`;
  renderCreativeLifecycle();
}

function renderCreativeLifecycle() {
  const columns = [
    ["Brief","3",[
      ["Puzzle fail → win","P1","Việt Anh","31 Jul","brief"],["Reward reveal batch","P2","Team P1","01 Aug","brief"]
    ]],
    ["Producing","2",[
      ["V12-2608-VA","VA","Việt Anh","02 Aug","production"],["V4-2608-P2","P2","Team P2","03 Aug","production"]
    ]],
    ["Ready to test","3",[
      ["V10-2607-VA","VA","Việt Anh","3 variants","ready"],["V8-2607-P1","P1","Team P1","2 variants","ready"]
    ]],
    ["Testing","4",[
      ["V9-2607-VA","VA","Meta + TikTok","$1.8K spend","testing"],["V6-2607-P2","P2","Google","Learning","testing"]
    ]],
    ["Winner","2",[
      ["V7-2606-VA","VA","3.78x ROAS","Reuse 91","winner"],["V29-VA","VA","2.84x ROAS","Remix 84","winner"]
    ]],
    ["Fatigue","2",[
      ["V7-2607","—","CTR −28%","Stop","fatigue"],["V3-2607-P1","P1","Freq 4.1","Rotate","fatigue"]
    ]]
  ];
  document.querySelector("#creative-board").innerHTML = columns.map(([title,count,cards])=>`
    <section class="creative-board-column"><header><strong>${title}</strong><span>${count}</span></header><div>${cards.map(([name,tag,owner,note,tone])=>`
      <button class="creative-board-item ${tone}" data-creative-stage="${name}"><span>${tag}</span><strong>${name}</strong><small>${owner}</small><b>${note}</b></button>`).join("")}</div><button class="creative-board-add" data-add-stage="${title}">＋ Add item</button></section>`).join("");
}

function renderCreativeCoverage() {
  const creative = data.creatives.find(row=>row.code === selectedCreativeCode) || data.creatives[0];
  document.querySelector("#coverage-title").textContent = creative.code;
  document.querySelector("#coverage-subtitle").textContent = `${creative.editor} · ${creative.os === "AND" ? "Android" : "iOS"} · ${creative.platforms.join(" + ")}`;
  const badge = document.querySelector("#coverage-badge");
  badge.className = `pill ${{Reuse:"green",Remix:"violet",Test:"amber",Stop:"red"}[creative.recommendation]}`;
  badge.textContent = {Reuse:"Dùng lại",Remix:"Nên remix",Test:"Cần thêm data",Stop:"Nên dừng"}[creative.recommendation];
  document.querySelector("#coverage-summary").innerHTML = [
    ["Spend",formatVnd(creative.spend)],["Install",creative.installs],["CPI",creative.cpi ? formatVnd(creative.cpi) : "—"],["Reuse score",`${creative.score}/100`]
  ].map(([label,value])=>`<span><small>${label}</small><strong>${value}</strong></span>`).join("");
  document.querySelector("#coverage-list").innerHTML = creative.coverage.map(item=>`
    <div class="coverage-row">
      <span class="account-logo ${platformClass(item.platform)}">${item.platform[0]}</span>
      <div><strong>${item.campaign}</strong><small>${item.account} · ${item.platform}</small></div>
      <span><small>Spend</small><strong>${formatVnd(item.spend)}</strong></span>
      <span><small>CPI</small><strong>${item.cpi ? formatVnd(item.cpi) : "—"}</strong></span>
      <b class="${item.trend.startsWith("↑") ? "up" : item.trend.startsWith("↓") ? "down" : ""}">${item.trend}</b>
    </div>`).join("");
}

function renderCreativeBriefs() {
  const briefs = [
    { title:"Payoff-first remix", source:"Từ V7-2606-VA", hook:"Mở bằng phần thưởng lớn trong 0–2s", body:"Giữ core gameplay, đổi bối cảnh và tăng nhịp cut ở giây 3–8.", variants:"3 hook × 2 CTA", confidence:88 },
    { title:"70% hook, lower CPI", source:"Từ V1-2607", hook:"Giữ opening có Hook Rate 70,27%", body:"Rút ngắn đoạn giữa, đưa gameplay proof sớm để cải thiện CPI.", variants:"2 duration × 3 endings", confidence:81 },
    { title:"Cross-platform winner", source:"Từ V6-2606-VA", hook:"Dùng visual payoff không phụ thuộc text", body:"Tạo bản Meta 20s, TikTok 15s và Google 30s từ cùng một master.", variants:"3 platform cuts", confidence:79 },
    { title:"CPI winner validation", source:"Từ V3-P1", hook:"Giữ cost angle đang cho CPI 12.682 ₫", body:"Bổ sung registration payoff và test lại với ngân sách đủ mẫu.", variants:"2 openings × 2 payoffs", confidence:74 }
  ];
  const ordered = briefs.map((_,index)=>briefs[(index+creativeBriefOffset)%briefs.length]).slice(0,3);
  document.querySelector("#creative-briefs").innerHTML = ordered.map((brief,index)=>`
    <article class="brief-item">
      <span class="brief-number">0${index+1}</span>
      <div><p>${brief.source}</p><h3>${brief.title}</h3><strong>${brief.hook}</strong><small>${brief.body}</small><footer><span>${brief.variants}</span><b>${brief.confidence}% confidence</b></footer></div>
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
let appsflyerLive = false;
let appsflyerMeta = { estimates:{ cost:true, revenue:true }, forecast:false, apiCalls:0 };

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
    revenue: row.revenue,
    purchases: row.purchases,
    installs: row.installs,
    registrations: row.registrations,
    cpi: row.cpi,
    cpr: row.cpr,
    cvr: row.cvr,
    roas: row.cost ? row.revenue/row.cost : 0,
    estimatedCost: row.estimatedCost,
    estimatedRevenue: row.estimatedRevenue,
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
      revenue: row.revenue,
      installs: row.installs,
      registrations: row.registrations
    }));
  }
  appsflyerMeta = {
    estimates: summary.estimates || { cost:false, revenue:false },
    forecast:false,
    apiCalls:summary.apiCalls || 2
  };
  appsflyerLive = true;
  document.querySelector("#af-last-sync").textContent = `Dữ liệu thật · ${new Date(summary.pulledAt).toLocaleTimeString("vi-VN",{hour:"2-digit",minute:"2-digit"})}`;
  const estimateNote = summary.estimates?.cost || summary.estimates?.revenue ? " Cost và revenue đang dùng mô hình ước tính." : "";
  document.querySelector("#af-source-message").textContent = `Đã đồng bộ ${summary.rowCounts.installs.toLocaleString("vi-VN")} installs và ${summary.rowCounts.events.toLocaleString("vi-VN")} in-app events qua ${summary.apiCalls || 2} API calls.${estimateNote}`;
  document.querySelector("#af-connection-pill").className = "pill green";
  document.querySelector("#af-connection-pill").textContent = "Live data";
  renderAppsFlyer();
}

function applyAppsFlyerForecast() {
  const uniqueDays = new Set(data.appsflyer.daily.map(row=>row.rawDate || row.date)).size || 1;
  const tomorrow = new Date();
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  const rawDate = tomorrow.toISOString().slice(0,10);
  data.appsflyer.breakdown = data.appsflyer.breakdown.map(row=>{
    const installs = Math.round(row.installs / uniqueDays * 1.04);
    const registrations = Math.round(row.registrations / uniqueDays * 1.02);
    const cost = Math.round(row.cost / uniqueDays * 1.05);
    const revenue = Math.round((row.revenue || 0) / uniqueDays * 1.06);
    return {
      ...row, installs, registrations, cost, revenue,
      cpi:installs ? cost/installs : 0,
      cpr:registrations ? cost/registrations : 0,
      cvr:installs ? registrations/installs*100 : 0,
      roas:cost ? revenue/cost : 0,
      estimatedCost:true,
      estimatedRevenue:true
    };
  });
  data.appsflyer.daily = data.appsflyer.breakdown.map(row=>({
    date:new Date(`${rawDate}T00:00:00Z`).toLocaleDateString("vi-VN",{day:"2-digit",month:"2-digit"}),
    rawDate, platform:row.platform, os:row.os, ua:row.ua,
    cost:row.cost, revenue:row.revenue, installs:row.installs, registrations:row.registrations
  }));
  appsflyerMeta = { estimates:{cost:true,revenue:true}, forecast:true, apiCalls:0 };
  appsflyerLive = true;
  document.querySelector("#af-last-sync").textContent = "Dự báo ngày mai";
  document.querySelector("#af-source-message").textContent = "Dự báo từ xu hướng AppsFlyer gần nhất; không gọi API cho ngày tương lai.";
  document.querySelector("#af-connection-pill").className = "pill violet";
  document.querySelector("#af-connection-pill").textContent = "Forecast";
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
  if (range.forecast) {
    applyAppsFlyerForecast();
    return showToast("Đã tạo dự báo AppsFlyer cho ngày mai.");
  }
  const token = window.__uaSessionToken || "";
  const permissions = window.__uaPermissions || {};
  if (token && !permissions.canSync) {
    return showToast("Chỉ Owner hoặc Admin mới có quyền đồng bộ AppsFlyer.");
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
        throw new Error("Phiên đăng nhập không có quyền đồng bộ. Hãy đăng nhập bằng Owner hoặc Admin.");
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
  const estimateCostLabel = appsflyerMeta.estimates.cost ? "Ước tính" : "AppsFlyer";
  const estimateRevenueLabel = appsflyerMeta.estimates.revenue ? "Ước tính" : "AppsFlyer";
  const metrics = [
    ["Total cost", formatVnd(cost), estimateCostLabel, "spend model", "neutral", "₫"],
    ["Revenue", formatVnd(revenue), estimateRevenueLabel, "revenue model", "neutral", "↗"],
    ["Paid installs", Math.round(paidInstalls).toLocaleString("vi-VN"), appsflyerLive ? "live pull" : "4.980 all source", "AppsFlyer non-organic", "neutral", "↓"],
    ["Registrations", Math.round(registrations).toLocaleString("vi-VN"), `${totalInstalls ? (registrations/totalInstalls*100).toLocaleString("vi-VN",{maximumFractionDigits:2}) : 0}%`, "CVR install → register", "up", "◎"],
    ["CPI", formatVnd(paidInstalls ? cost/paidInstalls : 0), estimateCostLabel, "cost / install", "neutral", "↘"],
    ["CPR", formatVnd(registrations ? cost/registrations : 0), estimateCostLabel, "cost / register", "neutral", "⌁"],
    ["ROAS", `${cost ? (revenue/cost).toLocaleString("vi-VN",{maximumFractionDigits:2}) : 0}x`, estimateRevenueLabel, "revenue / cost", "neutral", "↗"],
    ["Total installs", Math.round(totalInstalls).toLocaleString("vi-VN"), `${Math.round(organicInstalls).toLocaleString("vi-VN")} organic`, "paid + organic", "neutral", "Σ"]
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
      if (!dailyMap.has(key)) dailyMap.set(key,{ date:row.date, rawDate:key, cost:0, revenue:0, installs:0, registrations:0 });
      const day = dailyMap.get(key);
      day.cost += row.cost || 0;
      day.revenue += row.revenue || 0;
      day.installs += row.installs || 0;
      day.registrations += row.registrations || 0;
    });
  const daily = [...dailyMap.values()].sort((a,b)=>a.rawDate.localeCompare(b.rawDate));
  const maxCost = Math.max(1,...daily.map(day=>day.cost));
  const maxInstalls = Math.max(1,...daily.map(day=>day.installs));
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

  const scaledRows = selection.rows;
  document.querySelector("#af-row-count").textContent = `${scaledRows.length} tổ hợp`;
  document.querySelector("#af-breakdown-table").innerHTML = scaledRows.map(row=>`
    <tr>
      <td><span class="ua-badge">${row.ua || "Unassigned"}</span></td>
      <td><span class="af-platform"><i class="${row.platform.toLowerCase()}"></i>${row.mediaSource || row.platform}</span></td>
      <td><span class="os-badge ${row.os.toLowerCase()}">${row.os}</span></td>
      <td><strong>${formatVnd(row.cost)}</strong></td>
      <td><strong>${formatVnd(row.revenue || 0)}</strong></td>
      <td><strong>${row.cost ? ((row.revenue || 0)/row.cost).toLocaleString("vi-VN",{maximumFractionDigits:2}) : 0}x</strong></td>
      <td>${Math.round(row.installs).toLocaleString("vi-VN")}</td>
      <td>${Math.round(row.registrations).toLocaleString("vi-VN")}</td>
      <td>${formatVnd(row.cpi)}</td>
      <td>${formatVnd(row.cpr)}</td>
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
    const response = await fetch("/api/connectors");
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
    if(!silent) setMetaStatus("Hãy đăng nhập bằng tài khoản Owner hoặc Admin để kết nối Meta.","error");
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
  if(!window.__uaSessionToken) return setMetaStatus("Hãy đăng nhập bằng tài khoản Owner hoặc Admin.","error");
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
  "campaign-center": { section: "ads-manager", nav: "campaign-center", crumb: "Campaign center" },
  "ads-manager": { section: "ads-manager", nav: "campaign-center", crumb: "Campaign center" },
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
  if(route.section==="ads-manager" && window.__uaSessionToken && !adsLiveLoading) loadAdsMetaData();
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
  document.querySelector("#ads-manager-search")?.addEventListener("input",renderAdsManager);
  document.querySelectorAll("[data-ads-level]").forEach(button=>button.addEventListener("click",()=>{
    currentAdsLevel = button.dataset.adsLevel;
    renderAdsManager();
  }));
  ["#ads-platform-filter","#ads-ua-filter","#ads-status-filter"].forEach(selector=>{
    document.querySelector(selector)?.addEventListener("change",renderAdsManager);
  });
  document.querySelector("#ads-business-filter")?.addEventListener("change",event=>{ adsBusiness=event.target.value; refreshAdsScopeOptions(); loadAdsMetaData(); });
  document.querySelector("#ads-account-filter")?.addEventListener("change",event=>{ adsAccount=event.target.value; loadAdsMetaData(); });
  document.querySelector("#ads-filter-toggle")?.addEventListener("click",()=>{
    const panel = document.querySelector("#ads-filter-panel");
    panel.hidden = !panel.hidden;
  });
  document.querySelector("#ads-clear-filter")?.addEventListener("click",()=>{
    ["#ads-platform-filter","#ads-ua-filter","#ads-status-filter"].forEach(selector=>{ document.querySelector(selector).value="all"; });
    adsBusiness="all"; adsAccount="all"; refreshAdsScopeOptions(); adsSelectedIds.clear();
    renderAdsManager();
  });
  document.querySelector("#ads-column-button")?.addEventListener("click",()=>{
    const panel = document.querySelector("#ads-column-panel");
    panel.hidden = !panel.hidden;
  });
  document.querySelector("#ads-select-all")?.addEventListener("change",event=>{
    getAdsManagerRows().forEach(row=>event.currentTarget.checked?adsSelectedIds.add(row.id):adsSelectedIds.delete(row.id));
    renderAdsManager();
  });
  document.querySelector("#ads-manager-table-body")?.addEventListener("change",event=>{
    if (event.target.classList.contains("ads-row-check")) { const id=event.target.dataset.adsRowCheck; event.target.checked?adsSelectedIds.add(id):adsSelectedIds.delete(id); updateAdsSelection(); }
  });
  document.querySelector("#ads-refresh")?.addEventListener("click",()=>showToast("Đã đưa job đồng bộ Ads vào hàng đợi demo. Dữ liệu thật cần Meta OAuth và worker phía server."));
  document.querySelector("#ads-save-view")?.addEventListener("click",()=>showToast("Đã lưu preset cột và bộ lọc cho user hiện tại trong demo mode."));
  document.querySelector("#ads-view-preset")?.addEventListener("change",event=>showToast(`Đã chuyển view: ${event.target.options[event.target.selectedIndex].text}.`));
  document.querySelector("#ads-date-range")?.addEventListener("change",()=>{ const custom=document.querySelector("#ads-date-range").value==="custom"; document.querySelector("#ads-custom-range")?.toggleAttribute("hidden",!custom); if(!custom) loadAdsMetaData(); });
  ["#ads-date-from","#ads-date-to"].forEach(selector=>document.querySelector(selector)?.addEventListener("change",()=>{ if(document.querySelector("#ads-date-range").value==="custom") loadAdsMetaData(); }));
  ["#analytics-period","#analytics-product","#analytics-platform","#analytics-market"].forEach(selector=>{
    document.querySelector(selector)?.addEventListener("change",renderAnalytics);
  });
  document.querySelector("#analytics-refresh")?.addEventListener("click",()=>{ renderAnalytics(); showToast("Đã làm mới dữ liệu Ads, AppsFlyer và Product trong demo mode."); });
  document.querySelector("#analytics-export")?.addEventListener("click",()=>showToast("Dashboard export sẽ gồm KPI, channel economics và demographics."));
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
  ["#creative-platform","#creative-os","#creative-editor","#creative-recommendation"].forEach(selector=>{
    document.querySelector(selector)?.addEventListener("change",renderCreatives);
  });
  document.querySelector("#creative-code-guide")?.addEventListener("click",()=>showToast("Mã chuẩn: V{STT}-YYMM-{EDITOR}. Ví dụ V1-2607-VA = Video 1 · 07/2026 · Việt Anh."));
  document.querySelector("#creative-sync")?.addEventListener("click",()=>showToast("Đã đưa creative sync Meta, Google và TikTok vào hàng đợi demo."));
  document.querySelector("#new-creative-brief")?.addEventListener("click",()=>showToast("Đã tạo creative brief draft và đưa vào cột Brief."));
  document.querySelector("#refresh-briefs")?.addEventListener("click",()=>{
    creativeBriefOffset = (creativeBriefOffset + 1) % 4;
    renderCreativeBriefs();
    showToast("Đã tạo lại danh sách brief từ winning signals.");
  });
  document.querySelector("#creative-export")?.addEventListener("click",()=>{
    const { rows } = getCreativeSelection();
    const exportRows = [
      ["Creative code","Editor","OS","Platforms","Accounts","Campaigns","Spend","Impressions","Reach","CTR","Installs","Registrations","CPI","CPR","Hook Rate","Hold Rate","Reuse Score","Recommendation","Code status"],
      ...rows.map(row=>[row.code,row.editor,row.os,row.platforms.join("+"),row.accounts,row.campaigns,row.spend,row.impressions,row.reach,row.ctr,row.installs,row.registrations,row.cpi,row.cpr,row.hook,row.hold,row.score,row.recommendation,row.codeStatus])
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
      ["UA","Platform","Media source","OS","Estimated cost","Estimated revenue","Estimated ROAS","Installs","Registrations","CPI","CPR","CVR","Rating"],
      ...rows.map(row=>[
        row.ua,row.platform,row.mediaSource || row.platform,row.os,Math.round(row.cost),Math.round(row.revenue || 0),row.cost ? (row.revenue || 0)/row.cost : 0,
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
  document.querySelector("#meta-account-search")?.addEventListener("input",renderMetaAccounts);
  document.querySelector("#meta-account-list")?.addEventListener("change",event=>{
    const accountId = event.target.dataset.metaAccount || event.target.dataset.metaUa;
    const account = metaAccounts.find(item=>item.id===accountId);
    if(account && event.target.matches("[data-meta-account]")) account.selected=event.target.checked;
    if(account && event.target.matches("[data-meta-ua]")) account.assignedUa=event.target.value;
    if(!event.target.matches("[data-meta-account]")) return;
    const selected = document.querySelectorAll("[data-meta-account]:checked").length;
    document.querySelector("#meta-account-summary").textContent = `${selected} đã chọn · ${metaAccounts.filter(account=>account.canConnect).length} có thể kết nối`;
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
    const creativeStage = event.target.closest("[data-creative-stage],[data-add-stage]");
    if(creativeStage) showToast("Creative lifecycle detail đang ở demo mode; dữ liệu thật sẽ lưu trong database.");
    const connect=event.target.closest(".connect-button");
    if(connect?.dataset.connectorId==="meta") {
      if(connect.dataset.configured!=="true") showToast("Hãy cấu hình Meta App ID, App Secret, Redirect URI và encryption key trong Vercel.");
      else loadMetaAccounts().catch(()=>setMetaStatus("Không thể mở kết nối Meta.","error"));
    } else if(connect) showToast(connect.dataset.configured==="true" ? `Sẵn sàng mở OAuth ${connect.dataset.connector}.` : `Hãy cấu hình secrets ${connect.dataset.connector} trong Vercel.`);
    const approve=event.target.closest(".approve-button,.reject-button");
    if(approve){ const item=approve.closest(".approval-item"); item.style.opacity=".45"; showToast(approve.classList.contains("approve-button")?"Đã phê duyệt trong demo mode.":"Đã từ chối trong demo mode."); }
  });
}

window.addEventListener("message",event=>{
  if(event.origin!==location.origin || event.data?.type!=="meta-oauth-result") return;
  openMetaModal();
  if(!event.data.ok) return setMetaStatus(event.data.error || "Kết nối Meta đã bị hủy.","error");
  setMetaStatus("Đã xác thực Facebook. Đang tải danh sách ad account…","success");
  loadMetaAccounts({showModal:false}).catch(()=>setMetaStatus("Đã kết nối nhưng chưa thể tải ad account.","error"));
});

window.addEventListener("ua-auth-ready",()=>{
  refreshMetaConnectionBadge();
  loadCommandMetaData();
  refreshAdsScopeOptions();
  loadAdsMetaData();
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
renderIntegrations();
renderAudit();
initEvents();
switchView(location.hash.slice(1) || "overview");
