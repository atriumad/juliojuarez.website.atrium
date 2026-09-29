"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { gallery } from "@/content/site";

const heights = [
  "h-[300px] md:h-[440px]",
  "h-[220px] md:h-[320px]",
  "h-[260px] md:h-[380px]",
];
const drops = ["mt-0", "mt-10 md:mt-16", "mt-4 md:mt-6"];

function Row({
  photos,
  progress,
  from,
  to,
  still,
}: {
  photos: readonly { src: string; alt: string }[];
  progress: MotionValue<number>;
  from: string;
  to: string;
  still: boolean;
}) {
  const x = useTransform(progress, [0, 1], still ? ["0%", "0%"] : [from, to]);
  return (
    <motion.ul style={{ x }} className="flex w-max items-start gap-5 md:gap-8">
      {photos.map((p, i) => (
        <li
          key={p.src}
          className={`group relative aspect-[4/5] flex-none overflow-hidden rounded-[2px] ${heights[i % 3]} ${drops[(i + 1) % 3]}`}
        >
          <Image
            src={p.src}
            alt={p.alt}
            fill
            sizes="(min-width: 768px) 360px, 220px"
            className="photo-grade object-cover transition-[filter] duration-700 group-hover:[filter:none]"
          />
        </li>
      ))}
    </motion.ul>
  );
}

/**
 * No autoplay: rows of mixed-size prints slide sideways as you scroll, in opposite
 * directions, like laying prints out on a table. Color returns on hover. With
 * reduced motion the rows stay put and become a swipeable strip.
 */
export function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const still = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  return (
    <section
      ref={ref}
      id="gallery"
      aria-labelledby="gallery-title"
      className="section-y pb-0! overflow-hidden motion-reduce:overflow-x-auto"
    >
      <h2 id="gallery-title" className="sr-only">
        {gallery.headline}
      </h2>
      <div className="flex flex-col gap-6 md:gap-10">
        <Row photos={gallery.rows[0]} progress={scrollYProgress} from="4%" to="-32%" still={still} />
        <Row photos={gallery.rows[1]} progress={scrollYProgress} from="-30%" to="0%" still={still} />
      </div>
    </section>
  );
}
