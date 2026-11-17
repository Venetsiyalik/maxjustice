import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { buildNotFoundMetadata } from "@/lib/not-found-metadata";

/**
 * Hech bir sahifaga mos kelmagan har qanday yo'l (masalan, `/yoq-sahifa`,
 * `/ru/net`) shu yerga tushadi va [locale]/not-found.tsx dagi brendli,
 * tilga mos 404 sahifani ko'rsatadi. Bu bo'lmasa Next.js'ning standart
 * inglizcha 404 sahifasi chiqadi.
 */
// Noma'lum yo'l/slug ham shu yerga tushib, tilga mos 404 ni ko'rsatsin
// (layout'dagi dynamicParams = false faqat til segmenti uchun)
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale;
  return buildNotFoundMetadata(locale);
}

export default function CatchAllNotFound() {
  notFound();
}
