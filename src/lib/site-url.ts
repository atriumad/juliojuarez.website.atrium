/**
 * Canonical origin. Set NEXT_PUBLIC_SITE_URL once the client's domain is
 * decided; until then Vercel's production URL (or localhost) is used.
 */
export function getSiteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const raw = explicit || (vercel ? `https://${vercel}` : "http://localhost:3000");
  return new URL(raw);
}
