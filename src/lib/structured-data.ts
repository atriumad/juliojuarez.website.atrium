import { hero, about, contact, footer, site } from "@/content/site";
import { getSiteUrl } from "@/lib/site-url";

/**
 * schema.org graph. Only facts confirmed in the client brief. Contact fields
 * (telephone, email, sameAs) are emitted only once they are set in
 * content/site.ts, so nothing unconfirmed ever ships.
 */
export function buildStructuredData() {
  const origin = getSiteUrl().origin;
  const chefId = `${origin}/#chef`;
  const { email, phone } = contact.details;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
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
        ...(email && { email }),
        ...(phone && { telephone: phone }),
        ...(footer.instagram && { sameAs: [footer.instagram] }),
      },
      {
        "@type": "Service",
        "@id": `${origin}/#private-dining`,
        name: site.descriptor,
        serviceType: "Private chef dining",
        description: hero.body,
        provider: { "@id": chefId },
        areaServed: { "@type": "City", name: site.city },
      },
    ],
  };
}
