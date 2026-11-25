import crypto from "node:crypto";

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  retryAfterSeconds: number;
  mode: "upstash-redis" | "in-memory-fallback";
}

interface MemoryBucket {
  count: number;
  resetAt: number;
}

const memoryBuckets = new Map<string, MemoryBucket>();
const duplicateFingerprints = new Map<string, number>();

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;
const DUPLICATE_TTL_MS = 120_000;

export function extractTrustedClientIp(headers: Headers): string {
  // Only inspect standard reverse-proxy headers injected by verified edge gateways.
  // In self-hosted single-hop setups behind nginx/Cloudflare/Vercel, configure trusted proxy stripping.
  const vercelIp = headers.get("x-vercel-forwarded-for");
  if (vercelIp) return vercelIp.split(",")[0].trim();

  const cfIp = headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();

  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    // Use rightmost entry if multiple hops aren't stripped, or first if standard CDN; keep explicit fallback key.
    const parts = forwarded
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (parts.length > 0) return parts[0];
  }

  return "unknown-client";
}

function hashIdentifier(raw: string): string {
  return crypto.createHash("sha256").update(raw).digest("hex").slice(0, 24);
}

export async function checkRateLimit(clientIp: string): Promise<RateLimitResult> {
  const key = `tiu:contact:rl:${hashIdentifier(clientIp)}`;
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (upstashUrl && upstashToken) {
    try {
      const response = await fetch(`${upstashUrl.replace(/\/$/, "")}/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${upstashToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ["INCR", key],
          ["EXPIRE", key, Math.ceil(WINDOW_MS / 1000), "NX"],
          ["TTL", key],
        ]),
        signal: AbortSignal.timeout(3000),
      });

      if (response.ok) {
        const data = (await response.json()) as Array<{ result?: number }>;
        const count = Number(data?.[0]?.result ?? 1);
        const ttl = Math.max(1, Number(data?.[2]?.result ?? Math.ceil(WINDOW_MS / 1000)));
        return {
          allowed: count <= MAX_REQUESTS_PER_WINDOW,
          limit: MAX_REQUESTS_PER_WINDOW,
          remaining: Math.max(0, MAX_REQUESTS_PER_WINDOW - count),
          retryAfterSeconds: ttl,
          mode: "upstash-redis",
        };
      }
    } catch {
      // Fall through cleanly to process-local limiter when Upstash is temporarily unreachable
    }
  }

  const now = Date.now();
  // Prune expired entries occasionally
  if (memoryBuckets.size > 500) {
    memoryBuckets.forEach((v, k) => {
      if (v.resetAt <= now) memoryBuckets.delete(k);
    });
  }

  const existing = memoryBuckets.get(key);
  if (!existing || existing.resetAt <= now) {
    memoryBuckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return {
      allowed: true,
      limit: MAX_REQUESTS_PER_WINDOW,
      remaining: MAX_REQUESTS_PER_WINDOW - 1,
      retryAfterSeconds: Math.ceil(WINDOW_MS / 1000),
      mode: "in-memory-fallback",
    };
  }

  existing.count += 1;
  const retryAfterSeconds = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
  return {
    allowed: existing.count <= MAX_REQUESTS_PER_WINDOW,
    limit: MAX_REQUESTS_PER_WINDOW,
    remaining: Math.max(0, MAX_REQUESTS_PER_WINDOW - existing.count),
    retryAfterSeconds,
    mode: "in-memory-fallback",
  };
}

export async function checkDuplicateSubmission(email: string, enquiryType: string, message: string): Promise<boolean> {
  const fingerprint = hashIdentifier(`${email.toLowerCase()}|${enquiryType}|${message.trim()}`);
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (upstashUrl && upstashToken) {
    try {
      const res = await fetch(`${upstashUrl.replace(/\/$/, "")}/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${upstashToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([["SET", `tiu:dup:${fingerprint}`, "1", "NX", "EX", Math.ceil(DUPLICATE_TTL_MS / 1000)]]),
        signal: AbortSignal.timeout(3000),
      });
      if (res.ok) {
        const data = (await res.json()) as Array<{ result?: string | null }>;
        return data?.[0]?.result !== "OK";
      }
    } catch {
      // Fall through cleanly
    }
  }

  const now = Date.now();
  if (duplicateFingerprints.size > 500) {
    duplicateFingerprints.forEach((exp, k) => {
      if (exp <= now) duplicateFingerprints.delete(k);
    });
  }

  const existingExp = duplicateFingerprints.get(fingerprint);
  if (existingExp && existingExp > now) {
    return true;
  }
  duplicateFingerprints.set(fingerprint, now + DUPLICATE_TTL_MS);
  return false;
}

export function resetInMemoryRateLimitsForTests(): void {
  memoryBuckets.clear();
  duplicateFingerprints.clear();
}
