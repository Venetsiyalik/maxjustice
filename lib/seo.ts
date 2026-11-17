import type { Metadata } from "next";
import { LOCALES, LOCALE_HREFLANG } from "@/i18n/routing";
import { siteConfig } from "@/lib/site-config";

/**
 * Berilgan til-mustaqil yo'l uchun 4 ta tildagi URL manzillari va
 * hreflang xaritasini quradi (3.3-band). `path` bo'sh yoki "/xizmatlar" kabi
 * "/" bilan boshlanadigan shaklda bo'lishi kerak.
 *
 * Next.js metadata API'siga mos: `alternates.languages` sifatida beriladi.
 */
export function buildLanguageAlternates(
  path: string = "",
  /** Faqat haqiqiy tarjimasi bor tillar (masalan, blog hozircha uz + kr) */
  locales: readonly string[] = LOCALES
) {
  const languages: Record<string, string> = {};

  for (const locale of LOCALES.filter((l) => locales.includes(l))) {
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

export const TITLE_MAX = 60;
export const DESCRIPTION_MAX = 155;

const BRAND_FULL = siteConfig.brandName; // "MAXLEGAL AND JUSTICE"
const BRAND_SHORT = "MAXLEGAL";

/**
 * Sahifa nomiga brend qo'shadi: sig'sa "| MAXLEGAL AND JUSTICE", aks holda
 * "| MAXLEGAL". Natija 60 belgidan oshsa build xato beradi — uzun title
 * jimgina Google'da kesilib qolmasligi uchun.
 */
export function brandTitle(pageTitle: string): string {
  const full = `${pageTitle} | ${BRAND_FULL}`;
  if (full.length <= TITLE_MAX) return full;
  const short = `${pageTitle} | ${BRAND_SHORT}`;
  if (short.length <= TITLE_MAX) return short;
  throw new Error(
    `[seo] Title ${TITLE_MAX} belgidan uzun (${short.length}): "${short}" — sahifa nomini qisqartiring.`
  );
}

function checkDescription(description: string): string {
  if (description.length > DESCRIPTION_MAX) {
    throw new Error(
      `[seo] Description ${DESCRIPTION_MAX} belgidan uzun (${description.length}): "${description}"`
    );
  }
  return description;
}

/** Open Graph `og:locale` formati (til_MAMLAKAT) */
const OG_LOCALE: Record<string, string> = {
  uz: "uz_UZ",
  kr: "uz_UZ",
  ru: "ru_RU",
  en: "en_US",
};

type PageMetadataInput = {
  locale: string;
  /** Til prefiksisiz yo'l: "" (bosh sahifa), "/xizmatlar", ... */
  path: string;
  /** Brendsiz sahifa nomi — brend `brandTitle()` orqali qo'shiladi */
  title: string;
  description: string;
  /** Haqiqiy tarjimasi bor tillar (hreflang uchun); berilmasa — hammasi */
  locales?: readonly string[];
  noindex?: boolean;
  article?: { publishedTime: string; modifiedTime?: string; authorName: string };
};

/**
 * Har bir sahifa uchun to'liq metadata: title (brend qoidasi bilan),
 * description, canonical, hreflang, Open Graph va Twitter card.
 *
 * Diqqat: Next.js `openGraph` ni layout bilan chuqur birlashtirmaydi — shu
 * sababli rasm va siteName ham shu yerda to'liq beriladi.
 */
export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  locales,
  noindex,
  article,
}: PageMetadataInput): Metadata {
  const fullTitle = brandTitle(title);
  const desc = checkDescription(description);
  const url = buildCanonicalUrl(locale, path);
  const ogLocale = OG_LOCALE[locale] ?? "uz_UZ";
  const alternateLocale = [...new Set(Object.values(OG_LOCALE))].filter((l) => l !== ogLocale);

  return {
    title: { absolute: fullTitle },
    description: desc,
    alternates: {
      canonical: url,
      languages: buildLanguageAlternates(path, locales),
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      siteName: BRAND_FULL,
      locale: ogLocale,
      alternateLocale,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: BRAND_FULL }],
      ...(article
        ? {
            type: "article",
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime ?? article.publishedTime,
            authors: [article.authorName],
          }
        : { type: "website" }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: ["/og-image.png"],
    },
  };
}
