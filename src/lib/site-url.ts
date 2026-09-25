const PRODUCTION_URL = "https://juliojuarez.vercel.app";

/**
 * Canonical origin. NEXT_PUBLIC_SITE_URL wins (set it when the client's own
 * domain is live); otherwise Vercel's production URL, then the known
 * production URL for builds, and localhost only in development.
 */
export function getSiteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const fallback =
    process.env.NODE_ENV === "production" ? PRODUCTION_URL : "http://localhost:3000";
  const raw = explicit || (vercel ? `https://${vercel}` : fallback);
  return new URL(raw);
}
