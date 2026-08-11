const definitions = [
  {
    id: "meta",
    name: "Meta Ads",
    required: ["META_APP_ID", "META_APP_SECRET", "META_REDIRECT_URI", "META_TOKEN_ENCRYPTION_KEY"]
  },
  {
    id: "google",
    name: "Google Ads",
    required: [
      "GOOGLE_ADS_CLIENT_ID",
      "GOOGLE_ADS_CLIENT_SECRET",
      "GOOGLE_ADS_DEVELOPER_TOKEN",
      "GOOGLE_ADS_REDIRECT_URI",
      "GOOGLE_TOKEN_ENCRYPTION_KEY"
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

export default async function handler(request, response) {
  try {
    if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
      await requireOwner(request);
    }
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
  } catch (error) {
    sendError(response, error);
  }
}
import { requireOwner, sendError } from "./_lib/supabase.js";
