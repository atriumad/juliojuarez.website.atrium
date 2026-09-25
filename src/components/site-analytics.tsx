"use client";

import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GA_ID, initGA, loadGA, trackEvent } from "@/lib/analytics";

/**
 * Traffic + performance + engagement measurement for the whole site.
 *
 * - Vercel Analytics / Speed Insights: cookieless pageviews and real-user
 *   Core Web Vitals (enable both in the Vercel project dashboard).
 * - GA4: only when NEXT_PUBLIC_GA_ID is set; script loads after first interaction.
 * - Click tracking is declarative: any element with data-event (plus optional
 *   data-label / data-location) reports a click; no per-component wiring.
 * - `section_view` fires once per section the first time it is meaningfully
 *   in view, which is the reach signal for a single-page site.
 */
export function SiteAnalytics() {
  // gtag.js is heavy on the main thread. Queue the config now, but fetch the
  // script only on the first interaction (or after 6s), so it never competes
  // with LCP/TBT. Vercel Analytics covers total traffic, including quick exits.
  useEffect(() => {
    if (!GA_ID) return;
    initGA();
    const events = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
    const start = () => {
      events.forEach((name) => window.removeEventListener(name, start));
      window.clearTimeout(timer);
      loadGA();
    };
    const timer = window.setTimeout(start, 6000);
    events.forEach((name) =>
      window.addEventListener(name, start, { once: true, passive: true }),
    );
    return () => {
      events.forEach((name) => window.removeEventListener(name, start));
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-event]");
      if (!el?.dataset.event) return;
      trackEvent(el.dataset.event, {
        label: el.dataset.label ?? "",
        location: el.dataset.location ?? "",
      });
    };
    document.addEventListener("click", onClick);

    let observer: IntersectionObserver | undefined;
    if (typeof IntersectionObserver === "function") {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            trackEvent("section_view", { section: entry.target.id });
            observer?.unobserve(entry.target);
          }
        },
        { threshold: 0.4 },
      );
      document
        .querySelectorAll<HTMLElement>("main section[id]")
        .forEach((section) => observer?.observe(section));
    }

    return () => {
      document.removeEventListener("click", onClick);
      observer?.disconnect();
    };
  }, []);

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
