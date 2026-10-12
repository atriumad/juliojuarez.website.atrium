import { faq } from "@/content/site";
import { Reveal } from "@/components/motion/reveal";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="wrap section-y">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-(--gutter)">
        <div className="lg:col-span-4">
          <Reveal y={0}>
            <p className="eyebrow text-muted-foreground">{faq.eyebrow}</p>
          </Reveal>
          <Reveal y={20} delay={0.08}>
            <h2 id="faq-title" className="mt-6 max-w-[12ch] text-2xl">
              {faq.headline}
            </h2>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <Reveal y={0} delay={0.15}>
            <div className="border-b">
              {faq.items.map(({ q, a }) => (
                <details key={q} className="group border-t">
                  <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 py-6 text-lg [&::-webkit-details-marker]:hidden">
                    <span>{q}</span>
                    <span
                      aria-hidden="true"
                      className="font-display text-xl leading-none text-muted-foreground transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-[56ch] pb-6 text-muted-foreground">{a}</p>
                </details>
              ))}
            </div>
            <a
              href={faq.cta.href}
              data-event="cta_click"
              data-label="faq_inquiry"
              data-location="faq"
              className="eyebrow mt-10 inline-block underline underline-offset-8"
            >
              {faq.cta.label}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
