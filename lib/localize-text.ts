import { toKirill } from "@/lib/transliterate";

/**
 * `site-config.ts` dagi lotin matnlarni (manzil, litsenziya raqami va h.k.)
 * joriy locale "kr" bo'lsa kirillga o'giradi. Bu qiymatlar next-intl
 * xabarlari (messages/*.json) ichida emas, shuning uchun avtomatik
 * transliteratsiya (i18n/request.ts) ularga tegmaydi — shu funksiya orqali
 * chaqirilgan joyda qo'lda qo'llaniladi.
 */
export function localizeText(locale: string, text: string): string {
  return locale === "kr" ? toKirill(text) : text;
}
