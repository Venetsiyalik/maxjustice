import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

/**
 * 404 holatidagi sahifa uchun metadata. `notFound()` chaqiriladigan
 * sahifalarning generateMetadata'si shuni qaytaradi — aks holda layout'dagi
 * bosh sahifa title'i 404 sahifada ham chiqib qoladi.
 * (Next.js 404 javobiga `noindex` ni o'zi qo'shadi.)
 */
export async function buildNotFoundMetadata(locale: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "notFound" });
  return {
    title: { absolute: `404 — ${t("title")} | MAXLEGAL AND JUSTICE` },
    robots: { index: false, follow: true },
  };
}
