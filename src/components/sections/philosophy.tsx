import { philosophy } from "@/content/site";
import { Reveal } from "@/components/motion/reveal";

export function Philosophy() {
  return (
    <section
      id="philosophy"
      aria-label="Philosophy"
      className="dark section-y bg-background text-foreground"
    >
      <div className="wrap flex flex-col items-center text-center">
        <Reveal y={0}>
          <p className="eyebrow text-muted-foreground">Philosophy</p>
        </Reveal>
        <figure className="mt-10">
          <Reveal delay={0.1}>
            <blockquote className="max-w-[30ch] font-display text-4xl leading-tight">
              &ldquo;{philosophy.quote}&rdquo;
            </blockquote>
          </Reveal>
          <Reveal delay={0.25}>
            <figcaption className="eyebrow mt-10 text-muted-foreground">
              {philosophy.attribution}
            </figcaption>
          </Reveal>
        </figure>
      </div>
    </section>
  );
}