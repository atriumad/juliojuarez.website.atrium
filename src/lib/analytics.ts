import { track } from "@vercel/analytics";

/** GA4 measurement ID (G-XXXXXXXXXX). GA4 stays off until it is set. */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID?.trim() || undefined;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

// gtag.js only understands `arguments` objects in the queue, not arrays.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function gtag(..._args: unknown[]) {
  window.dataLayer ??= [];
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

let initialised = false;

/**
 * Queue the GA4 config immediately (cheap) so events fired before gtag.js
 * arrives are kept and replayed in order once it loads.
 */
export function initGA() {
  if (!GA_ID || initialised || typeof window === "undefined") return;
  initialised = true;
  gtag("js", new Date());
  gtag("config", GA_ID);
}

/** Inject gtag.js. Call after the page is interactive; it is the heavy part. */
export function loadGA() {
  if (!GA_ID || document.getElementById("gtag-js")) return;
  const script = document.createElement("script");
  script.id = "gtag-js";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
  document.head.appendChild(script);
}

type EventParams = Record<string, string | number>;

/**
 * Single entry point for custom events. Sends to GA4 (when configured) and to
 * Vercel Analytics (custom events need a paid Vercel plan; harmless otherwise).
 * Never throws: measurement must not break the page.
 */
export function trackEvent(name: string, params: EventParams = {}) {
  try {
    if (GA_ID) gtag("event", name, params);
    track(name, params);
  } catch {
    // Blocked by an ad blocker or not yet loaded: ignore.
  }
}
