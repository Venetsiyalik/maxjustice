/**
 * Saytdagi barcha statik (locale'dan mustaqil) sahifa yo'llari — sitemap.xml
 * va boshqa joylarda qayta ishlatish uchun yagona manba. Yangi sahifa
 * qo'shilganda shu ro'yxatga ham qo'shiladi.
 *
 * `locales` — sahifaning haqiqiy tarjimasi bor tillar (berilmasa — barcha
 * tillar). Masalan, blog hozircha faqat uz + kr: ru/en versiyalari
 * `noindex` va sitemap'ga kirmaydi.
 */
import { SERVICES, serviceHref } from "@/lib/services-data";
import { BLOG_SLUGS, BLOG_LOCALES } from "@/content/blog";

/**
 * Blogdan tashqari sahifalar matni oxirgi marta o'zgargan sana (sitemap
 * `lastmod`). Sahifalar matni o'zgarganda shu sanani yangilang.
 */
export const CONTENT_UPDATED_AT = "2026-11-17";

export type StaticRoute = {
  path: string;
  priority: number;
  locales?: readonly string[];
};

export const STATIC_ROUTES: StaticRoute[] = [
  { path: "", priority: 1 },
  { path: "/xizmatlar", priority: 0.9 },
  ...SERVICES.map((s) => ({ path: serviceHref(s.slug), priority: 0.8 })),
  { path: "/advokat-haqida", priority: 0.7 },
  { path: "/amaliyot", priority: 0.6 },
  { path: "/narxlar", priority: 0.7 },
  { path: "/bog-lanish", priority: 0.7 },
  { path: "/savol-javob", priority: 0.6 },
  { path: "/blog", priority: 0.7, locales: BLOG_LOCALES },
  ...BLOG_SLUGS.map((slug) => ({
    path: `/blog/${slug}`,
    priority: 0.6,
    locales: BLOG_LOCALES,
  })),
  { path: "/maxfiylik-siyosati", priority: 0.3 },
  { path: "/foydalanish-shartlari", priority: 0.3 },
];
