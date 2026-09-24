import { hero, about, site } from "@/content/site";
import { getSiteUrl } from "@/lib/site-url";

/** schema.org graph. Only facts confirmed in the client brief; no contact data. */
export function buildStructuredData() {
  const origin = getSiteUrl().toString();
  const chefId = `${origin}#chef`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${origin}#website`,
        url: origin,
        name: `${site.name} — ${site.descriptor}`,
        inLanguage: "en-US",
      },
      {
        "@type": "Person",
        "@id": chefId,
        name: site.name,
        jobTitle: "Executive Chef",
        url: origin,
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Universidad Autónoma Benito Juárez de Oaxaca",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: site.city,
          addressRegion: "MO",
          addressCountry: "US",
        },
        description: about.paragraphs[0],
      },
      {
        "@type": "Service",
        "@id": `${origin}#private-dining`,
        name: site.descriptor,
        serviceType: "Private chef dining",
        description: hero.body,
        provider: { "@id": chefId },
        areaServed: { "@type": "City", name: site.city },
      },
    ],
  };
}
