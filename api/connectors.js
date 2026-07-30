const definitions = [
  {
    id: "meta",
    name: "Meta Ads",
    required: ["META_APP_ID", "META_APP_SECRET", "META_REDIRECT_URI"]
  },
  {
    id: "google",
    name: "Google Ads",
    required: [
      "GOOGLE_ADS_CLIENT_ID",
      "GOOGLE_ADS_CLIENT_SECRET",
      "GOOGLE_ADS_DEVELOPER_TOKEN",
      "GOOGLE_ADS_REDIRECT_URI"
    ]
  },
  {
    id: "tiktok",
    name: "TikTok Ads",
    required: ["TIKTOK_APP_ID", "TIKTOK_APP_SECRET", "TIKTOK_REDIRECT_URI"]
  },
  {
    id: "appsflyer",
    name: "AppsFlyer",
    required: ["APPSFLYER_API_TOKEN", "APPSFLYER_APP_IDS"]
  }
];

export default function handler(_request, response) {
  const connectors = definitions.map((definition) => {
    const missing = definition.required.filter((key) => !process.env[key]);
    return {
      id: definition.id,
      name: definition.name,
      configured: missing.length === 0,
      missing
    };
  });

  response.setHeader("Cache-Control", "no-store");
  response.status(200).json({ connectors });
}
