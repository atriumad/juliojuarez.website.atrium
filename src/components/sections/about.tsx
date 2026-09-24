import { about } from "@/content/site";
import { Photo } from "@/components/photo";
import { Reveal } from "@/components/motion/reveal";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="wrap section-y">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-(--gutter)">
        <div className="lg:col-span-5">
          <Photo
            src={about.image}
            alt={about.imageAlt}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="aspect-[4/5]"
          />
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-24">
          <Reveal y={20}>
            <h2 id="about-title" className="max-w-[16ch] text-2xl">
              {about.headline}
            </h2>
          </Reveal>
          <div className="mt-10 flex max-w-[60ch] flex-col gap-5 text-muted-foreground">
            {about.paragraphs.map((p, i) => (
              <Reveal key={p} delay={0.08 + i * 0.12}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>

          {/* y={0}: fade-only so the table rows never translate. */}
          <Reveal y={0} delay={0.15}>
            <table className="mt-14 w-full text-sm">
              <caption className="sr-only">{about.timelineCaption}</caption>
              <thead className="sr-only">
                <tr>
                  <th scope="col">Years</th>
                  <th scope="col">Role</th>
                  <th scope="col">Place</th>
                </tr>
              </thead>
              <tbody>
                {about.timeline.map((row) => (
                  <tr key={row.years} className="border-t align-baseline">
                    <th
                      scope="row"
                      className="whitespace-nowrap py-4 pr-4 text-left font-normal tabular-nums text-muted-foreground"
                    >
                      {row.years}
                    </th>
                    <td className="hidden py-4 pr-4 sm:table-cell">{row.role}</td>
                    <td className="py-4 text-right">{row.place}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-6 border-t pt-4 text-sm text-muted-foreground">
              <span className="eyebrow mr-3">Education</span>
              {about.education}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
