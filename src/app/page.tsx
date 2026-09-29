import { JsonLd } from "@/components/json-ld";
import { buildStructuredData } from "@/lib/structured-data";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { FloatingCta } from "@/components/floating-cta";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Gallery } from "@/components/sections/gallery";
import { Philosophy } from "@/components/sections/philosophy";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <JsonLd data={buildStructuredData()} />
      <SiteNav />
      <main>
        <Hero />
        <About />
        <Philosophy />
        <Gallery />
        <Contact />
      </main>
      <SiteFooter />
      <FloatingCta />
    </>
  );
}
