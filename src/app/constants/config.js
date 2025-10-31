const isLocal = process.env.NODE_ENV === "development";

export const API_BASE_URL = isLocal
  ? process.env.NEXT_PUBLIC_LOCAL_API_URL || "http://localhost:3000"
  : process.env.NEXT_PUBLIC_LIVE_API_URL || "https://movwise.digitalcloudies.in/";

  