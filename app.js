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
    { name: "VN · iOS · Purchase · Scale 04", market: "Vietnam", platform: "Meta", owner: "Minh Anh", spend: "$8,420", revenue:"$26,270", installs: "4,180", registrations:"1,520", ctr:"2.48%", cvr:"36.36%", cpi: "$2.01", roasD1:"1.42x", roas: "3.12x", status: "Scaling", trend: "up" },
    { name: "US · Android · tROAS · Broad", market: "United States", platform: "Google", owner: "Quang Huy", spend: "$12,180", revenue:"$30,085", installs: "3,940", registrations:"1,328", ctr:"1.64%", cvr:"33.71%", cpi: "$3.09", roasD1:"1.18x", roas: "2.47x", status: "Scaling", trend: "up" },
    { name: "TH · iOS · Creative Test 12", market: "Thailand", platform: "TikTok", owner: "Linh Chi", spend: "$4,760", revenue:"$8,949", installs: "2,210", registrations:"702", ctr:"1.92%", cvr:"31.76%", cpi: "$2.15", roasD1:".91x", roas: "1.88x", status: "Watch", trend: "down" },
    { name: "BR · Android · Retarget 07", market: "Brazil", platform: "Meta", owner: "Minh Anh", spend: "$5,940", revenue:"$8,435", installs: "1,620", registrations:"388", ctr:".88%", cvr:"23.95%", cpi: "$3.67", roasD1:".63x", roas: "1.42x", status: "At risk", trend: "down" },
    { name: "JP · iOS · Value · Core 02", market: "Japan", platform: "Google", owner: "Tú Uyên", spend: "$7,630", revenue:"$16,633", installs: "2,340", registrations:"804", ctr:"1.31%", cvr:"34.36%", cpi: "$3.26", roasD1:"1.05x", roas: "2.18x", status: "Watch", trend: "up" },
    { name: "ID · Android · UGC Batch 06", market: "Indonesia", platform: "TikTok", owner: "Linh Chi", spend: "$3,710", revenue:"$7,606", installs: "2,060", registrations:"693", ctr:"2.22%", cvr:"33.64%", cpi: "$1.80", roasD1:"1.12x", roas: "2.05x", status: "Scaling", trend: "up" }
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
      code:"V7-2606-VA", editor:"Việt Anh", os:"AND", platforms:["Meta","TikTok"], spend:314939, impressions:6440, reach:5488, ctr:1.58, installs:21, registrations:4, cpi:14997, cpa:78735, hook:30.11, hold:13.77, score:91, recommendation:"Reuse", codeStatus:"Chuẩn", accounts:2, campaigns:4,
      coverage:[
        { account:"Northstar · Meta Global", campaign:"VN · Android · Purchase · Scale", platform:"Meta", spend:178420, installs:13, cpi:13725, trend:"↑ 18%" },
        { account:"Northstar · Meta Global", campaign:"VN · Android · Broad · Test", platform:"Meta", spend:77410, installs:5, cpi:15482, trend:"↑ 7%" },
        { account:"Northstar · TikTok SEA", campaign:"TH · Android · UGC Prospecting", platform:"TikTok", spend:39109, installs:2, cpi:19555, trend:"→ 1%" },
        { account:"Northstar · TikTok SEA", campaign:"ID · Android · Creative Test", platform:"TikTok", spend:19990, installs:1, cpi:19990, trend:"↓ 4%" }
      ]
    },
    {
      code:"V29-VA", editor:"Việt Anh", os:"AND", platforms:["Meta"], spend:753022, impressions:13596, reach:10600, ctr:1.56, installs:29, registrations:9, cpi:25966, cpa:83669, hook:44.59, hold:10.72, score:84, recommendation:"Remix", codeStatus:"Legacy", accounts:2, campaigns:5,
      coverage:[
        { account:"Northstar · Meta Global", campaign:"VN · Android · Core Broad", platform:"Meta", spend:326500, installs:14, cpi:23321, trend:"↑ 8%" },
        { account:"Atlas · Meta LATAM", campaign:"BR · Android · Prospecting", platform:"Meta", spend:212000, installs:7, cpi:30286, trend:"↓ 6%" },
        { account:"Northstar · Meta Global", campaign:"VN · Android · Value", platform:"Meta", spend:129522, installs:5, cpi:25904, trend:"→ 2%" }
      ]
    },
    {
      code:"V6-2606-VA", editor:"Việt Anh", os:"AND", platforms:["Meta","Google"], spend:834846, impressions:17467, reach:15510, ctr:1.27, installs:30, registrations:6, cpi:27828, cpa:139141, hook:33.42, hold:12.49, score:82, recommendation:"Remix", codeStatus:"Chuẩn", accounts:3, campaigns:6,
      coverage:[
        { account:"Northstar · Meta Global", campaign:"VN · Android · Purchase", platform:"Meta", spend:412056, installs:18, cpi:22892, trend:"↑ 5%" },
        { account:"Northstar · Google Apps", campaign:"SEA · Android · App Campaign", platform:"Google", spend:260340, installs:8, cpi:32543, trend:"↓ 9%" },
        { account:"Atlas · Meta LATAM", campaign:"BR · Android · Broad", platform:"Meta", spend:162450, installs:4, cpi:40613, trend:"↓ 13%" }
      ]
    },
    {
      code:"V3-P1", editor:"Team P1", os:"AND", platforms:["Meta"], spend:202917, impressions:5943, reach:5104, ctr:.87, installs:16, registrations:0, cpi:12682, cpa:0, hook:28.20, hold:6.80, score:79, recommendation:"Test", codeStatus:"Legacy", accounts:1, campaigns:2,
      coverage:[{ account:"Northstar · Meta Global", campaign:"VN · Android · Low Cost Test", platform:"Meta", spend:202917, installs:16, cpi:12682, trend:"↑ 22%" }]
    },
    {
      code:"V1-2607", editor:"Chưa map", os:"AND", platforms:["Meta"], spend:561877, impressions:7374, reach:4628, ctr:5.59, installs:10, registrations:2, cpi:56188, cpa:280939, hook:70.27, hold:13.99, score:68, recommendation:"Test", codeStatus:"Thiếu editor", accounts:1, campaigns:3,
      coverage:[{ account:"Northstar · Meta Global", campaign:"VN · Android · Hook Test", platform:"Meta", spend:561877, installs:10, cpi:56188, trend:"↓ 16%" }]
    },
    {
      code:"V2-2607", editor:"Chưa map", os:"AND", platforms:["Meta"], spend:208974, impressions:2618, reach:2167, ctr:2.67, installs:5, registrations:2, cpi:41795, cpa:104487, hook:51.26, hold:9.31, score:62, recommendation:"Test", codeStatus:"Thiếu editor", accounts:1, campaigns:2,
      coverage:[{ account:"Northstar · Meta Global", campaign:"VN · Android · Creative Test", platform:"Meta", spend:208974, installs:5, cpi:41795, trend:"→ 3%" }]
    },
    {
      code:"V6-2607", editor:"Chưa map", os:"iOS", platforms:["Meta","Google"], spend:412954, impressions:11794, reach:10644, ctr:.68, installs:15, registrations:3, cpi:27530, cpa:137651, hook:28.60, hold:7.44, score:70, recommendation:"Test", codeStatus:"Thiếu editor", accounts:2, campaigns:3,
      coverage:[{ account:"Northstar · Meta Global", campaign:"VN · iOS · Purchase", platform:"Meta", spend:264282, installs:10, cpi:26428, trend:"↑ 4%" },{ account:"Northstar · Google Apps", campaign:"SEA · iOS · App Campaign", platform:"Google", spend:148672, installs:5, cpi:29734, trend:"→ 1%" }]
    },
    {
      code:"V5-P2", editor:"Team P2", os:"iOS", platforms:["Meta"], spend:104139, impressions:1915, reach:1782, ctr:.63, installs:5, registrations:0, cpi:20828, cpa:0, hook:23.86, hold:3.94, score:64, recommendation:"Test", codeStatus:"Legacy", accounts:1, campaigns:2,
      coverage:[{ account:"Northstar · Meta Global", campaign:"VN · iOS · Value Test", platform:"Meta", spend:104139, installs:5, cpi:20828, trend:"↓ 3%" }]
    },
    {
      code:"V7-2607", editor:"Chưa map", os:"iOS", platforms:["Meta"], spend:40147, impressions:1261, reach:1128, ctr:.24, installs:1, registrations:0, cpi:40147, cpa:0, hook:11.10, hold:10.71, score:38, recommendation:"Stop", codeStatus:"Thiếu editor", accounts:1, campaigns:2,
      coverage:[{ account:"Northstar · Meta Global", campaign:"VN · iOS · Creative Test", platform:"Meta", spend:40147, installs:1, cpi:40147, trend:"↓ 21%" }]
    },
    {
      code:"V7-2606-VA", editor:"Việt Anh", os:"iOS", platforms:["Meta"], spend:36875, impressions:1024, reach:1004, ctr:.39, installs:0, registrations:0, cpi:0, cpa:0, hook:13.28, hold:4.41, score:31, recommendation:"Stop", codeStatus:"Chuẩn", accounts:1, campaigns:1,
      coverage:[{ account:"Northstar · Meta Global", campaign:"VN · iOS · Broad Test", platform:"Meta", spend:36875, installs:0, cpi:0, trend:"↓ 28%" }]
    }
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
    <td><strong>${campaign.spend}</strong></td><td><strong>${campaign.revenue}</strong></td>
    ${withOwner ? `<td>${campaign.installs}</td><td>${campaign.registrations}</td><td>${campaign.ctr}</td><td>${campaign.cvr}</td><td>${campaign.cpi}</td><td>${campaign.roasD1}</td><td><strong>${campaign.roas}</strong></td>` : `<td>${campaign.registrations}</td><td>${campaign.cpi}</td><td><strong>${campaign.roas}</strong></td><td><svg class="sparkline ${campaign.trend === "down" ? "down" : ""}" viewBox="0 0 64 21"><path d="${campaign.trend === "up" ? "M1 18L13 14L24 15L36 7L48 9L63 2" : "M1 4L13 7L24 6L36 13L48 11L63 18"}"/></svg></td>`}
    <td>${statusPill(campaign.status)}</td></tr>`;
}

function renderCampaigns() {
  document.querySelector("#campaign-preview").innerHTML = data.campaigns.slice(0,4).map(c => campaignRow(c)).join("");
  document.querySelector("#campaign-table").innerHTML = data.campaigns.map(c => campaignRow(c,true)).join("");
  filterCampaigns();
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
  ["#analytics-period","#analytics-product","#analytics-platform","#analytics-market"].forEach(selector=>{
    document.querySelector(selector)?.addEventListener("change",renderAnalytics);
  });
  document.querySelector("#analytics-refresh")?.addEventListener("click",()=>{ renderAnalytics(); showToast("Đã làm mới dữ liệu Ads, AppsFlyer và Product trong demo mode."); });
  document.querySelector("#analytics-export")?.addEventListener("click",()=>showToast("Dashboard export sẽ gồm KPI, channel economics và demographics."));
  document.querySelector("#create-segment")?.addEventListener("click",()=>showToast("Segment builder sẽ mở khi database event và user properties được kết nối."));
  document.querySelector("#creative-search")?.addEventListener("input",renderCreatives);
  ["#creative-platform","#creative-os","#creative-editor","#creative-recommendation"].forEach(selector=>{
    document.querySelector(selector)?.addEventListener("change",renderCreatives);
  });
  document.querySelector("#creative-code-guide")?.addEventListener("click",()=>showToast("Mã chuẩn: V{STT}-YYMM-{EDITOR}. Ví dụ V1-2607-VA = Video 1 · 07/2026 · Việt Anh."));
  document.querySelector("#creative-sync")?.addEventListener("click",()=>showToast("Đã đưa creative sync Meta, Google và TikTok vào hàng đợi demo."));
  document.querySelector("#refresh-briefs")?.addEventListener("click",()=>{
    creativeBriefOffset = (creativeBriefOffset + 1) % 4;
    renderCreativeBriefs();
    showToast("Đã tạo lại danh sách brief từ winning signals.");
  });
  document.querySelector("#creative-export")?.addEventListener("click",()=>{
    const { rows } = getCreativeSelection();
    const exportRows = [
      ["Creative code","Editor","OS","Platforms","Accounts","Campaigns","Spend","Impressions","Reach","CTR","Installs","Registrations","CPI","CPA","Hook Rate","Hold Rate","Reuse Score","Recommendation","Code status"],
      ...rows.map(row=>[row.code,row.editor,row.os,row.platforms.join("+"),row.accounts,row.campaigns,row.spend,row.impressions,row.reach,row.ctr,row.installs,row.registrations,row.cpi,row.cpa,row.hook,row.hold,row.score,row.recommendation,row.codeStatus])
    ];
    const csv = exportRows.map(row=>row.map(value=>`"${String(value).replaceAll('"','""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([`\uFEFF${csv}`],{type:"text/csv;charset=utf-8"}));
    const link = document.createElement("a"); link.href=url; link.download="creative-performance.csv"; link.click();
    URL.revokeObjectURL(url); showToast("Đã xuất Creative performance CSV.");
  });
  ["#af-period","#af-ua","#af-platform","#af-os"].forEach(selector=>{
    document.querySelector(selector)?.addEventListener("change",renderAppsFlyer);
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
  document.querySelector("#af-sync-now")?.addEventListener("click",()=>showToast("Đã đưa AppsFlyer sync job vào hàng đợi demo."));
  document.querySelector("#pf-sync-now")?.addEventListener("click",()=>showToast("Đã đưa Meta, Google và TikTok sync job vào hàng đợi demo."));
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
  document.querySelector("#campaign-form").addEventListener("submit",event=>{
    event.preventDefault(); const values=Object.fromEntries(new FormData(event.currentTarget));
    document.querySelector("#campaign-modal").classList.remove("open"); showToast(`Đã lưu draft "${values.name}" ở trạng thái paused.`);
    event.currentTarget.reset();
  });
  document.querySelector("#export-button").addEventListener("click",()=>{
    const rows = [["Campaign","Platform","Owner","Spend","Revenue","Installs","Registrations","CTR","CVR","CPI","ROAS D1","ROAS D7","Status"], ...data.campaigns.map(c=>[c.name,c.platform,c.owner,c.spend,c.revenue,c.installs,c.registrations,c.ctr,c.cvr,c.cpi,c.roasD1,c.roas,c.status])];
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
renderAnalytics();
renderSegments();
renderAccounts();
renderCreatives();
renderAlerts();
renderAppsFlyer();
renderPlatformAnalytics();
renderIntegrations();
renderAudit();
initEvents();
switchView(location.hash.slice(1) || "overview");
