const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5;

type Entry = {
  hits: number;
  expiresAt: number;
};

const requests = new Map<string, Entry>();

function cleanupExpired(now: number) {
  for (const [key, entry] of requests) {
    if (entry.expiresAt <= now) {
      requests.delete(key);
    }
  }
}

export function isRateLimited(identifier: string, limit = MAX_REQUESTS, windowMs = WINDOW_MS) {
  const now = Date.now();
  cleanupExpired(now);
  const existing = requests.get(identifier);
  if (!existing || existing.expiresAt <= now) {
    requests.set(identifier, { hits: 1, expiresAt: now + windowMs });
    return false;
  }
  if (existing.hits >= limit) {
    return true;
  }
  existing.hits += 1;
  return false;
}

