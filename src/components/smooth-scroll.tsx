"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Single Lenis instance for the page. Lenis honors prefers-reduced-motion by
// default (smoothing off, programmatic scrolls instant).
let lenis: Lenis | null = null;

/** Glide to an in-page anchor, landing just below the sticky header. */
export function scrollToHash(hash: string) {
  const target = document.getElementById(hash.slice(1));
  if (!target) return;
  const offset = -(document.querySelector("header")?.offsetHeight ?? 0);

  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.6 });
  } else {
    target.scrollIntoView();
  }
  history.replaceState(null, "", hash);
}

/** Freeze/unfreeze smooth scrolling (e.g. while the mobile menu is open). */
export function setScrollLocked(locked: boolean) {
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
}

export function SmoothScroll() {
  useEffect(() => {
    const instance = new Lenis({ autoRaf: true, lerp: 0.09 });
    lenis = instance;

    // Every in-page anchor (nav, hero, footer...) glides instead of jumping.
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const anchor = (event.target as Element).closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      const href = anchor?.getAttribute("href");
      if (!href || href.length < 2) return;
      event.preventDefault();
      scrollToHash(href);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      instance.destroy();
      lenis = null;
    };
  }, []);

  return null;
}
