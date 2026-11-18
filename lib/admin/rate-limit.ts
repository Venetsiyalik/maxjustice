/**
 * Login urinishlarini cheklash: bitta IP dan 15 daqiqada 5 ta xato urinish.
 * Redis ulangan bo'lsa unda, aks holda server xotirasida (taxminiy) saqlanadi.
 */
import { isRedisConfigured, redis, redisPipeline } from "@/lib/redis";

const MAX_FAILURES = 5;
const WINDOW_SECONDS = 15 * 60;

const memory = new Map<string, { count: number; resetAt: number }>();

function key(ip: string) {
  return `admin:login-fail:${ip}`;
}

export async function isLoginBlocked(ip: string): Promise<boolean> {
  if (isRedisConfigured()) {
    try {
      const count = Number((await redis("GET", key(ip))) ?? 0);
      return count >= MAX_FAILURES;
    } catch {
      // Redis ishlamasa xotiradagi hisobga o'tamiz
    }
  }
  const entry = memory.get(ip);
  return Boolean(entry && entry.resetAt > Date.now() && entry.count >= MAX_FAILURES);
}

export async function registerLoginFailure(ip: string): Promise<void> {
  if (isRedisConfigured()) {
    try {
      await redisPipeline([
        ["INCR", key(ip)],
        ["EXPIRE", key(ip), WINDOW_SECONDS],
      ]);
      return;
    } catch {
      // pastda xotiraga yoziladi
    }
  }
  const now = Date.now();
  const entry = memory.get(ip);
  if (!entry || entry.resetAt < now) {
    memory.set(ip, { count: 1, resetAt: now + WINDOW_SECONDS * 1000 });
  } else {
    entry.count += 1;
  }
}

export async function clearLoginFailures(ip: string): Promise<void> {
  memory.delete(ip);
  if (isRedisConfigured()) {
    try {
      await redis("DEL", key(ip));
    } catch {
      // ahamiyatsiz
    }
  }
}
