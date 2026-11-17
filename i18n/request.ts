import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { transliterateDeep } from "@/lib/transliterate";
import { fillNapDeep } from "@/lib/nap";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  // "kr" (o'zbek kirill) uchun alohida tarjima fayli yo'q — u "uz" (lotin)
  // xabarlaridan avtomatik transliteratsiya orqali hosil qilinadi.
  if (locale === "kr") {
    const uzMessages = (await import("../messages/uz.json")).default;
    // {phone}/{address} avval uz qiymati bilan to'ldiriladi, keyin kirillga
    return { locale, messages: transliterateDeep(fillNapDeep(uzMessages, "uz")) };
  }

  const messages = (await import(`../messages/${locale}.json`)).default;
  // {phone}/{address} o'rinbosarlari site-config'dan (lib/nap.ts) — next-intl
  // ularni ICU argumenti deb o'qimasligi uchun shu yerda oldindan to'ldiriladi
  return { locale, messages: fillNapDeep(messages, locale) };
});
