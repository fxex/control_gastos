const isProduction = process.env.NODE_ENV === "production";

export const env = {
  goApiUrl: process.env.GO_API_INTERNAL_URL ?? "http://localhost:8080",
  sessionCookieName: process.env.SESSION_COOKIE_NAME ?? (isProduction ? "__Host-session" : "session"),
  sessionCookieSecure: isProduction || process.env.SESSION_COOKIE_SECURE === "true",
};
