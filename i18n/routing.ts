import { defineRouting } from "next-intl/routing";

export const LOCALES = ["uz", "kr", "ru", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "uz";

export const LOCALE_LABELS: Record<Locale, string> = {
  uz: "UZ",
  kr: "КР",
  ru: "RU",
  en: "EN",
};

// Google/Yandex uchun hreflang kodlari
export const LOCALE_HREFLANG: Record<Locale, string> = {
  uz: "uz",
  kr: "uz-Cyrl",
  ru: "ru",
  en: "en",
};

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  // uz (asosiy til) prefikssiz "/" da, qolganlari /kr, /ru, /en prefiksi bilan
  localePrefix: "as-needed",
  localeCookie: {
    name: "MAXJUSTICE_LOCALE",
  },
  // Brauzer tiliga qarab MAJBURIY yo'naltirish yo'q (3.2-band) — o'rniga
  // LanguageSuggestionBanner orqali muloyim taklif ko'rsatiladi.
  localeDetection: false,
});
