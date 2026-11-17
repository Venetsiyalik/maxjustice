import { siteConfig } from "@/lib/site-config";

/**
 * NAP (nom-manzil-telefon) o'rinbosarlari. Tarjima va kontent matnlarida
 * telefon/manzil qo'lda yozilmaydi — o'rniga `{phone}` va `{address}`
 * yoziladi, bu funksiya esa ularni `site-config.ts` dagi qiymatlar bilan
 * almashtiradi. Raqam yoki manzil o'zgarsa, faqat site-config tahrirlanadi.
 *
 * Kirill (kr) uchun: avval uz qiymati qo'yiladi, keyin butun matn
 * transliteratsiya qilinadi — shuning uchun bu funksiya transliteratsiyadan
 * OLDIN chaqirilishi kerak.
 */
export function fillNap(text: string, locale: string): string {
  if (!text.includes("{")) return text;
  const lang = locale === "ru" || locale === "en" ? locale : "uz";
  return text
    .replaceAll("{phone}", siteConfig.phone.display)
    .replaceAll("{address}", siteConfig.address.short[lang]);
}

/** Obyekt/massiv ichidagi barcha matnlarga `fillNap` ni qo'llaydi. */
export function fillNapDeep<T>(value: T, locale: string): T {
  if (typeof value === "string") return fillNap(value, locale) as unknown as T;
  if (Array.isArray(value)) return value.map((v) => fillNapDeep(v, locale)) as unknown as T;
  if (value !== null && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = fillNapDeep(v, locale);
    }
    return out as T;
  }
  return value;
}
