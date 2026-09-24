import { dishes } from "@/content/site";
import { Photo } from "@/components/photo";
import { Reveal } from "@/components/motion/reveal";

// Staggered vertical offsets keep the trio editorial, not a card grid.
const offsets = ["", "md:mt-24", "md:mt-12"];

export function Dishes() {
  return (
    <section id="dishes" aria-labelledby="dishes-title" className="wrap section-y pt-0!">
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-x-(--gutter)">
        <Reveal className="lg:col-span-6">
          <h2 id="dishes-title" className="text-2xl">
            {dishes.headline}
          </h2>
        </Reveal>
        <Reveal
          delay={0.15}
          className="max-w-[44ch] text-muted-foreground lg:col-span-4 lg:col-start-9 lg:self-end"
        >
          <p>{dishes.subhead}</p>
        </Reveal>
      </div>

      <ul className="mt-16 grid gap-14 md:grid-cols-3 md:gap-x-(--gutter)">
        {dishes.items.map((dish, i) => (
          <li key={dish.name} className={offsets[i]}>
            <Reveal delay={i * 0.12}>
              <Photo
                src={dish.image}
                alt={dish.name}
                sizes="(min-width: 768px) 30vw, 100vw"
                className="aspect-[4/5]"
                grade={false}
              />
              <h3 className="mt-6 text-xl">{dish.name}</h3>
              <p className="mt-2 max-w-[34ch] text-muted-foreground">
                {dish.description}
              </p>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal y={0} delay={0.1}>
        <p className="mt-16 text-sm text-muted-foreground">{dishes.footnote}</p>
      </Reveal>
    </section>
  );
}
