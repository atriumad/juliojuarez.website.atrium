"use client";

import { useEffect, useState } from "react";
import { cn } from "cn";
import { bookCta } from "@/content/site";
import { Button } from "@/components/ui/button";

/**
 * Phone-only booking pill. The header has no CTA on small screens, so this keeps
 * one in reach while scrolling. It stays out of the way: hidden while the hero
 * CTA is on screen, while the contact form is on screen, and while a form field
 * has focus (on-screen keyboard).
 */
export function FloatingCta() {
  const [heroCtaInView, setHeroCtaInView] = useState(true);
  const [contactInView, setContactInView] = useState(false);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver !== "function") return;
    const watch = (el: Element | null, set: (v: boolean) => void, threshold = 0) => {
      if (!el) return undefined;
      const observer = new IntersectionObserver(
        ([entry]) => set(entry.isIntersecting),
        { threshold },
      );
      observer.observe(el);
      return observer;
    };
    const observers = [
      watch(document.querySelector('[data-location="hero"]'), setHeroCtaInView),
      watch(document.getElementById("contact"), setContactInView, 0.1),
    ];
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  useEffect(() => {
    const isField = (t: EventTarget | null) =>
      t instanceof HTMLElement && t.matches("input, textarea, select");
    const onIn = (e: FocusEvent) => isField(e.target) && setTyping(true);
    const onOut = (e: FocusEvent) => isField(e.target) && setTyping(false);
    document.addEventListener("focusin", onIn);
    document.addEventListener("focusout", onOut);
    return () => {
      document.removeEventListener("focusin", onIn);
      document.removeEventListener("focusout", onOut);
    };
  }, []);

  const visible = !heroCtaInView && !contactInView && !typing;

  return (
    <div
      inert={!visible}
      className={cn(
        "fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 flex justify-center md:hidden",
        "pointer-events-none transition-[translate,opacity] duration-300 ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
      )}
    >
      <Button
        asChild
        size="lg"
        className="pointer-events-auto shadow-[0_10px_30px_rgb(0_0_0/0.25)]"
      >
        <a
          href={bookCta.href}
          data-event="cta_click"
          data-label="book_dinner"
          data-location="floating"
        >
          {bookCta.label}
        </a>
      </Button>
    </div>
  );
}
