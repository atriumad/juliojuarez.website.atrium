/** Real people take longer than this to fill in a form; scripts do not. */
export const MIN_FILL_MS = 2000;

/**
 * `elapsed` is the browser's own fill-in time in ms (stamped on submit), so
 * clock differences with the server do not matter. A missing or unreadable value
 * is NOT treated as a bot: no false positives for unusual clients.
 */
export function filledTooFast(raw: string): boolean {
  if (raw.trim() === "") return false;
  const elapsed = Number(raw);
  return Number.isFinite(elapsed) && elapsed < MIN_FILL_MS;
}
