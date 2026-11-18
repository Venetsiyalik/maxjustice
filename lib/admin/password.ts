/**
 * Admin login va parolini tekshirish.
 *
 * Parol kodda yoki ochiq holda saqlanmaydi: ADMIN_PASSWORD_HASH muhit
 * o'zgaruvchisida `scrypt:<salt base64>:<hash base64>` ko'rinishida turadi.
 * Hash `npm run admin:hash` bilan yaratiladi (scripts/admin-hash.mjs).
 */
import { scryptSync, timingSafeEqual } from "node:crypto";

const KEY_LENGTH = 64;

function safeEqual(a: Buffer, b: Buffer): boolean {
  return a.length === b.length && timingSafeEqual(a, b);
}

export function isAdminConfigured(): boolean {
  return Boolean(
    process.env.ADMIN_LOGIN &&
      process.env.ADMIN_PASSWORD_HASH &&
      (process.env.ADMIN_SESSION_SECRET?.length ?? 0) >= 32
  );
}

export function verifyCredentials(login: string, password: string): boolean {
  const expectedLogin = process.env.ADMIN_LOGIN;
  const stored = process.env.ADMIN_PASSWORD_HASH;
  if (!expectedLogin || !stored) return false;

  const [scheme, saltB64, hashB64] = stored.split(":");
  if (scheme !== "scrypt" || !saltB64 || !hashB64) return false;

  // Login noto'g'ri bo'lsa ham scrypt hisoblanadi — javob vaqti bir xil bo'lsin
  const actual = scryptSync(password, Buffer.from(saltB64, "base64"), KEY_LENGTH);
  const passwordOk = safeEqual(actual, Buffer.from(hashB64, "base64"));
  const loginOk = safeEqual(Buffer.from(login), Buffer.from(expectedLogin));
  return passwordOk && loginOk;
}
