import { bookCta, hero } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Photo } from "@/components/photo";
import { Reveal } from "@/components/motion/reveal";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="wrap h-[calc(100svh-var(--nav-h))] min-h-[30rem] pb-(--gutter)"
    >
      {/* `dark` scope inverts tokens so the CTA reads on the photo. */}
      <div className="dark frame relative flex h-full flex-col justify-end bg-background text-foreground">
        <Photo
          src={hero.image}
          alt={hero.imageAlt}
          sizes="100vw"
          preload
          className="absolute inset-0 rounded-none"
        />
        {/* Legibility scrim for text over unknown photography. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-[oklch(0.12_0.005_65/0.65)] via-transparent to-transparent"
        />

        <div className="relative p-6 md:p-12">
          <Reveal delay={0.05} y={24}>
            <h1 id="hero-title" className="max-w-[12ch] text-display">
              {hero.headline}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-3 font-display text-xl">{hero.subline}</p>
          </Reveal>
          <Reveal delay={0.35}>
            <p className="mt-6 max-w-[38ch] text-lg">{hero.body}</p>
          </Reveal>
          <Reveal delay={0.5}>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button asChild size="lg">
                <a href={bookCta.href}>{bookCta.label}</a>
              </Button>
              <a href={hero.secondaryCta.href} className="eyebrow link-rule">
                {hero.secondaryCta.label}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
