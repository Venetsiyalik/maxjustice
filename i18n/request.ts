import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { transliterateDeep } from "@/lib/transliterate";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  // "kr" (o'zbek kirill) uchun alohida tarjima fayli yo'q — u "uz" (lotin)
  // xabarlaridan avtomatik transliteratsiya orqali hosil qilinadi.
  if (locale === "kr") {
    const uzMessages = (await import("../messages/uz.json")).default;
    return { locale, messages: transliterateDeep(uzMessages) };
  }

  const messages = (await import(`../messages/${locale}.json`)).default;
  return { locale, messages };
});
