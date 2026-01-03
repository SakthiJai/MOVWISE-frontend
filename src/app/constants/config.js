const isLocal = process.env.NODE_ENV === "development";

export const API_BASE_URL = isLocal
  ?  "http://localhost:3000"
  : process.env.NEXT_PUBLIC_LIVE_API_URL || "https://movwise.com/";

  