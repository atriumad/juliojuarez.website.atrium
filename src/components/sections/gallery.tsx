"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { gallery } from "@/content/site";

type Photo = { readonly src: string; readonly alt: string };

const heights = [
  "h-[300px] md:h-[440px]",
  "h-[220px] md:h-[320px]",
  "h-[260px] md:h-[380px]",
];
const drops = ["mt-0", "mt-10 md:mt-16", "mt-4 md:mt-6"];

const allPhotos: readonly Photo[] = [...gallery.rows[0], ...gallery.rows[1]];

function Frame({
  photo,
  index,
  className,
  onOpen,
  copy,
}: {
  photo: Photo;
  index: number;
  className: string;
  onOpen: (index: number) => void;
  /** Filler copy so wide screens never run out of photos: hidden from assistive tech. */
  copy?: boolean;
}) {
  const ref = useRef<HTMLLIElement>(null);
  // The print nearest the middle of the screen turns to color. Works on touch,
  // where there is no hover.
  const centered = useInView(ref, { margin: "0px -38% 0px -38%" });
  return (
    <li
      ref={ref}
      aria-hidden={copy ? true : undefined}
      className={`group relative aspect-[4/5] flex-none overflow-hidden rounded-[2px] bg-(--photo-tone) ${className}`}
    >
      <button
        type="button"
        onClick={() => onOpen(index)}
        aria-haspopup="dialog"
        tabIndex={copy ? -1 : undefined}
        data-event="gallery_open"
        data-label={String(index + 1)}
        data-location="gallery"
        className="absolute inset-0 cursor-zoom-in"
      >
        <Image
          src={photo.src}
          alt={copy ? "" : photo.alt}
          fill
          sizes="(min-width: 768px) 360px, 220px"
          className={`object-cover transition-[filter] duration-1000 group-hover:[filter:none] ${
            centered ? "" : "photo-grade"
          }`}
        />
      </button>
    </li>
  );
}

function Row({
  photos,
  offset,
  progress,
  from,
  to,
  still,
  onOpen,
}: {
  photos: readonly Photo[];
  offset: number;
  progress: MotionValue<number>;
  from: string;
  to: string;
  still: boolean;
  onOpen: (index: number) => void;
}) {
  const x = useTransform(progress, [0, 1], still ? ["0%", "0%"] : [from, to]);
  return (
    <motion.ul style={{ x }} className="flex w-max items-start gap-5 md:gap-8">
      {/* Two passes of the row: at 2560px+ one pass ends before the screen does. */}
      {[0, 1].flatMap((pass) =>
        photos.map((p, i) => {
          const n = pass * photos.length + i;
          return (
            <Frame
              key={`${pass}-${p.src}`}
              photo={p}
              index={offset + i}
              copy={pass === 1}
              className={`${heights[n % 3]} ${drops[(n + 1) % 3]}`}
              onOpen={onOpen}
            />
          );
        }),
      )}
    </motion.ul>
  );
}

/** Full-screen viewer. Native <dialog> gives focus trapping and Escape for free. */
function Lightbox({
  index,
  onChange,
  onClose,
}: {
  index: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const open = index !== null;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = previous;
    };
  }, [open]);

  const step = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onChange((index + dir + allPhotos.length) % allPhotos.length);
    },
    [index, onChange],
  );

  const photo = index === null ? null : allPhotos[index];

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) ref.current?.close();
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }}
      aria-label="Photo viewer"
      data-lenis-prevent
      className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none items-center justify-center bg-transparent p-0 text-white backdrop:bg-black/90 open:flex"
    >
      {photo ? (
        <>
          <div className="relative aspect-[4/5] h-[82svh] max-w-[92vw]">
            <Image
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 768px) 70svh, 92vw"
              className="rounded-[2px] object-contain"
            />
          </div>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            aria-label="Close"
            className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 md:right-8 md:top-8"
          >
            <X aria-hidden className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous photo"
            className="absolute left-2 flex size-11 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 md:left-8"
          >
            <ChevronLeft aria-hidden className="size-6" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next photo"
            className="absolute right-2 flex size-11 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 md:right-8"
          >
            <ChevronRight aria-hidden className="size-6" />
          </button>
        </>
      ) : null}
    </dialog>
  );
}

/**
 * No autoplay: rows of mixed-size prints slide sideways as you scroll, in opposite
 * directions, like laying prints out on a table. Prints are toned B/W; the one at
 * the center of the screen (or under the cursor) shows its color. Tap opens a
 * viewer. With reduced motion the rows stay put and become a swipeable strip.
 */
export function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const still = useReducedMotion() ?? false;
  const [open, setOpen] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const close = useCallback(() => setOpen(null), []);
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
        <Row
          photos={gallery.rows[0]}
          offset={0}
          progress={scrollYProgress}
          from="0%"
          to="-17%"
          still={still}
          onOpen={setOpen}
        />
        <Row
          photos={gallery.rows[1]}
          offset={gallery.rows[0].length}
          progress={scrollYProgress}
          from="-16%"
          to="0%"
          still={still}
          onOpen={setOpen}
        />
      </div>
      <Lightbox index={open} onChange={setOpen} onClose={close} />
    </section>
  );
}
