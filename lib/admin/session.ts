/**
 * Admin sessiyasi — imzolangan cookie (HMAC-SHA256).
 *
 * Token: base64url(JSON {sub, exp}) + "." + base64url(imzo). Kalit —
 * ADMIN_SESSION_SECRET muhit o'zgaruvchisi. Proxy (optimistik tekshiruv)
 * va har bir admin sahifa/action (asosiy tekshiruv) shu modulni ishlatadi.
 */
import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "mj_admin";
export const SESSION_TTL_SECONDS = 8 * 60 * 60;

type SessionPayload = { sub: string; exp: number };

function getSecret(): string | null {
  const secret = process.env.ADMIN_SESSION_SECRET;
  return secret && secret.length >= 32 ? secret : null;
}

function sign(data: string, secret: string): string {
  return createHmac("sha256", secret).update(data).digest("base64url");
}

export function createSessionToken(login: string): string {
  const secret = getSecret();
  if (!secret) throw new Error("ADMIN_SESSION_SECRET sozlanmagan (kamida 32 belgi)");
  const payload: SessionPayload = {
    sub: login,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${data}.${sign(data, secret)}`;
}

export function verifySessionToken(token: string | undefined | null): SessionPayload | null {
  const secret = getSecret();
  if (!secret || !token) return null;
  const [data, signature] = token.split(".");
  if (!data || !signature) return null;

  const expected = Buffer.from(sign(data, secret));
  const given = Buffer.from(signature);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;

  try {
    const payload = JSON.parse(Buffer.from(data, "base64url").toString()) as SessionPayload;
    if (typeof payload.exp !== "number" || payload.exp < Date.now() / 1000) return null;
    return payload;
  } catch {
    return null;
  }
}
