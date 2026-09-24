import { JsonLd } from "@/components/json-ld";
import { buildStructuredData } from "@/lib/structured-data";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Dishes } from "@/components/sections/dishes";
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
        <Dishes />
        <Philosophy />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
