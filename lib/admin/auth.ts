import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, verifySessionToken } from "./session";

/** Joriy admin sessiyasi (cookie imzosi tekshiriladi) yoki null. */
export async function getAdminSession() {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  return verifySessionToken(token);
}

/**
 * Har bir admin sahifa va server action boshida chaqiriladi — proxy'dagi
 * tekshiruvga tayanib qolmaslik uchun (Data Access Layer tamoyili).
 */
export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return session;
}
