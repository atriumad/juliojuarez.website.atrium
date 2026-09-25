"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "cn";

type PhotoProps = {
  src: string | null;
  alt: string;
  sizes: string;
  preload?: boolean;
  grade?: boolean;
  className?: string;
};

/**
 * Framed photo. With no `src` it renders a flat warm-dark placeholder so the
 * layout is final before real photography arrives. Real images get the shared
 * warm-monochrome grade unless `grade={false}` (used where natural color
 * matters, e.g. the plates in Dishes).
 */
export function Photo({
  src,
  alt,
  sizes,
  preload,
  grade = true,
  className,
}: PhotoProps) {
  const [settled, setSettled] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    if (!box || typeof IntersectionObserver !== "function") return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setSettled(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(box);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={boxRef}
      className={cn("frame relative bg-(--photo-tone)", className)}
      aria-hidden={src ? undefined : true}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          preload={preload}
          fetchPriority={preload ? "high" : undefined}
          className={cn(grade && "photo-grade", "object-cover", settled && "kenburns")}
        />
      ) : null}
    </div>
  );
}