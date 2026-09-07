/**
 * Saytdagi barcha statik (locale'dan mustaqil) sahifa yo'llari — sitemap.xml
 * va boshqa joylarda qayta ishlatish uchun yagona manba. Yangi sahifa
 * qo'shilganda shu ro'yxatga ham qo'shiladi.
 */
import { SERVICES, serviceHref } from "@/lib/services-data";

export const STATIC_ROUTES: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/xizmatlar", priority: 0.9 },
  ...SERVICES.map((s) => ({ path: serviceHref(s.slug), priority: 0.8 })),
  { path: "/advokat-haqida", priority: 0.7 },
  { path: "/amaliyot", priority: 0.6 },
  { path: "/narxlar", priority: 0.7 },
  { path: "/bog-lanish", priority: 0.7 },
  { path: "/savol-javob", priority: 0.6 },
  { path: "/maxfiylik-siyosati", priority: 0.3 },
  { path: "/foydalanish-shartlari", priority: 0.3 },
];
