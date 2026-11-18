"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { isAdminConfigured, verifyCredentials } from "@/lib/admin/password";
import { ADMIN_COOKIE, SESSION_TTL_SECONDS, createSessionToken } from "@/lib/admin/session";
import { clearLoginFailures, isLoginBlocked, registerLoginFailure } from "@/lib/admin/rate-limit";

export type LoginState = { error?: "invalid" | "blocked" | "config" };

async function clientIp(): Promise<string> {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!isAdminConfigured()) return { error: "config" };

  const ip = await clientIp();
  if (await isLoginBlocked(ip)) return { error: "blocked" };

  const loginValue = String(formData.get("login") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!loginValue || !password || !verifyCredentials(loginValue, password)) {
    await registerLoginFailure(ip);
    return { error: "invalid" };
  }

  await clearLoginFailures(ip);
  (await cookies()).set(ADMIN_COOKIE, createSessionToken(loginValue), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: SESSION_TTL_SECONDS,
  });
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete({ name: ADMIN_COOKIE, path: "/admin" });
  redirect("/admin/login");
}
