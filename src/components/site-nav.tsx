"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { Menu } from "lucide-react";
import { cn } from "cn";
import { bookCta, navLinks, site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { scrollToHash, setScrollLocked } from "@/components/smooth-scroll";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Freeze page smoothing while the sheet is open, and keep the header in
  // view so it never slides beneath the open sheet.
  const headerHidden = hidden && !menuOpen;
  useEffect(() => {
    setScrollLocked(menuOpen);
    return () => setScrollLocked(false);
  }, [menuOpen]);

  // Close the sheet first, then glide once the scroll lock is released.
  const goTo = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    window.setTimeout(() => scrollToHash(href), 300);
  };

  // Hide on scroll down, reveal on scroll up. Skipped entirely for
  // reduced-motion users (checked once at mount).
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      setScrolled(y > 8);
      // Sub-pixel and momentum-tail movements (|delta| < 4) must never flip
      // state: otherwise the header pops back the instant scrolling stops.
      if (reduceMotion || Math.abs(delta) < 4) return;
      setHidden(delta > 0 && y > 128);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 h-(--nav-h) border-b bg-background pt-[env(safe-area-inset-top)]",
        "transition-[translate,background-color,border-color] duration-300",
        headerHidden ? "-translate-y-full" : "translate-y-0",
        scrolled ? "border-border" : "border-transparent",
      )}
    >
      <div className="wrap flex h-full items-center justify-between gap-6">
        <a href="#top" className="eyebrow shrink-0" aria-label={`${site.name} — ${site.descriptor}`}>
          <span className="sm:hidden">{site.markShort}</span>
          <span className="hidden sm:inline">{site.mark}</span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="eyebrow text-muted-foreground transition-colors duration-200 hover:text-sepia"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden md:inline-flex">
            <a href={bookCta.href}>{bookCta.label}</a>
          </Button>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="data-[side=right]:w-full data-[side=right]:sm:max-w-none"
            >
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Jump to a section of the page.
              </SheetDescription>
              <nav
                aria-label="Mobile"
                className="flex flex-1 flex-col justify-center px-(--gutter)"
              >
                <ul className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={(e) => goTo(e, link.href)}
                        className="block py-2 font-display text-2xl transition-colors duration-200 hover:text-sepia"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-10">
                  <Button asChild size="lg">
                    <a
                      href={bookCta.href}
                      onClick={(e) => goTo(e, bookCta.href)}
                    >
                      {bookCta.label}
                    </a>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
