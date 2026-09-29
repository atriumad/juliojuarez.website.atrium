/**
 * Best-effort limiter: a sliding window per key, kept in memory. On serverless
 * each instance has its own counter, so this only blunts one client hammering
 * the form. It is not a hard guarantee; pair it with a Vercel Firewall rate
 * limit rule on POST / for that.
 */
const hits = new Map<string, number[]>();
const MAX_KEYS = 5000;

export function allow(key: string, max: number, windowMs: number, now = Date.now()) {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= max) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);

  if (hits.size > MAX_KEYS) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= windowMs)) hits.delete(k);
    }
  }
  return true;
}
