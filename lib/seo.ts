import { LOCALES, LOCALE_HREFLANG } from "@/i18n/routing";
import { siteConfig } from "@/lib/site-config";

/**
 * Berilgan til-mustaqil yo'l uchun 4 ta tildagi URL manzillari va
 * hreflang xaritasini quradi (3.3-band). `path` bo'sh yoki "/xizmatlar" kabi
 * "/" bilan boshlanadigan shaklda bo'lishi kerak.
 *
 * Next.js metadata API'siga mos: `alternates.languages` sifatida beriladi.
 */
export function buildLanguageAlternates(path: string = "") {
  const languages: Record<string, string> = {};

  for (const locale of LOCALES) {
    const prefix = locale === "uz" ? "" : `/${locale}`;
    languages[LOCALE_HREFLANG[locale]] = `${siteConfig.url}${prefix}${path}`;
  }

  languages["x-default"] = `${siteConfig.url}${path}`;

  return languages;
}

/** Berilgan locale va yo'l uchun to'liq (canonical) URL. */
export function buildCanonicalUrl(locale: string, path: string = "") {
  const prefix = locale === "uz" ? "" : `/${locale}`;
  return `${siteConfig.url}${prefix}${path}`;
}
