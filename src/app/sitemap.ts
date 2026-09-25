import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

// No lastModified: it would change on every build without any content change,
// which teaches crawlers to ignore it. Add a real date when content is dated.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: getSiteUrl().origin }];
}
