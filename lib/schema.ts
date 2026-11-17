import { siteConfig } from "@/lib/site-config";
import { LOCALE_HREFLANG } from "@/i18n/routing";
import { buildCanonicalUrl } from "@/lib/seo";
import { localizeText } from "@/lib/localize-text";

/**
 * schema.org JSON-LD (3-bosqich). Byuro, sayt va advokat — har sahifada
 * bitta bog'langan `@graph` ichida, doimiy `@id` lar bilan. Sahifaga xos
 * schema'lar (Service, BlogPosting, ProfilePage, FAQPage) shu `@id`
 * larga havola qiladi — Google ularni bitta obyekt sifatida taniydi.
 *
 * Barcha qiymatlar site-config.ts dan (NAP qoidasi).
 */

export const ORG_ID = `${siteConfig.url}/#organization`;
export const WEBSITE_ID = `${siteConfig.url}/#website`;
export const PERSON_ID = `${siteConfig.url}/#person`;

const LOGO_URL = `${siteConfig.url}/brand/icon-mark.png`;
const OG_IMAGE_URL = `${siteConfig.url}/og-image.png`;

type Lang = "uz" | "ru" | "en";
function lang(locale: string): Lang {
  return locale === "ru" || locale === "en" ? locale : "uz";
}

/** Sahifa tilidagi joy nomi (kr — uz dan transliteratsiya) */
function areaName(locale: string, names: Record<Lang, string>) {
  return localizeText(locale, names[lang(locale)]);
}

function buildAreaServed(locale: string) {
  return [
    { "@type": "City", name: areaName(locale, siteConfig.serviceArea.city) },
    { "@type": "AdministrativeArea", name: areaName(locale, siteConfig.serviceArea.region) },
  ];
}

function buildCredential() {
  return {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "Advokatlik litsenziyasi",
    identifier: siteConfig.license.number,
    recognizedBy: {
      "@type": "Organization",
      name: "O'zbekiston Respublikasi Advokatlar palatasi",
    },
  };
}

function buildPostalAddress() {
  return {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.locality,
    addressRegion: siteConfig.address.region,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.country,
  };
}

const phoneE164 = siteConfig.phone.href.replace("tel:", "");

export type SiteGraphText = {
  /** Byuroning to'liq nomi sahifa tilida (footer.firmName) */
  firmName: string;
  /** Advokatning to'liq ismi sahifa tilida (aboutPage.heroName) */
  personName: string;
  /** "Advokat" / "Адвокат" / "Attorney" (common.jobTitle) */
  jobTitle: string;
  /** Xizmat yo'nalishlari nomlari (services.*.title) */
  serviceNames: string[];
};

/**
 * Har sahifada (layout'dan) chiqadigan asosiy graf: LegalService + WebSite +
 * Person (qisqa). Advokatning to'liq ma'lumoti «Advokat haqida» sahifasida
 * (`buildProfilePageSchema`) — xuddi shu PERSON_ID bilan.
 */
export function buildSiteGraph(locale: string, text: SiteGraphText) {
  const { openingHours, sameAs } = siteConfig;

  const legalService = {
    "@type": "LegalService",
    "@id": ORG_ID,
    name: siteConfig.brandName,
    legalName: text.firmName,
    url: siteConfig.url,
    logo: { "@type": "ImageObject", url: LOGO_URL, width: 512, height: 512 },
    // TODO: ofis yoki advokat fotosi tayyor bo'lgach qo'shish (8.3-band)
    image: OG_IMAGE_URL,
    telephone: phoneE164,
    email: siteConfig.email.info,
    taxID: siteConfig.taxId,
    hasCredential: buildCredential(),
    address: buildPostalAddress(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.address.latitude,
      longitude: siteConfig.address.longitude,
    },
    areaServed: buildAreaServed(locale),
    knowsAbout: text.serviceNames,
    founder: { "@id": PERSON_ID },
    priceRange: "$$",
    ...(openingHours
      ? {
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: openingHours.days,
            opens: openingHours.opens,
            closes: openingHours.closes,
          },
        }
      : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  const website = {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteConfig.url,
    name: siteConfig.brandName,
    inLanguage: LOCALE_HREFLANG[locale as keyof typeof LOCALE_HREFLANG] ?? "uz",
    publisher: { "@id": ORG_ID },
  };

  const person = {
    "@type": "Person",
    "@id": PERSON_ID,
    name: text.personName,
    jobTitle: text.jobTitle,
    url: buildCanonicalUrl(locale, "/advokat-haqida"),
    worksFor: { "@id": ORG_ID },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [legalService, website, person],
  };
}

/**
 * «Advokat haqida» sahifasi: ProfilePage + to'liq Person (PERSON_ID).
 * Google shaxs profili sahifalari uchun ProfilePage'ni tavsiya qiladi.
 */
export function buildProfilePageSchema(
  locale: string,
  person: {
    name: string;
    jobTitle: string;
    description: string;
    alumniName: string;
    knowsAbout: string[];
  }
) {
  const url = buildCanonicalUrl(locale, "/advokat-haqida");
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${url}#profilepage`,
    url,
    inLanguage: LOCALE_HREFLANG[locale as keyof typeof LOCALE_HREFLANG] ?? "uz",
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: person.name,
      jobTitle: person.jobTitle,
      description: person.description,
      url,
      // TODO: professional foto tayyor bo'lgach `image` qo'shish (8.3-band)
      telephone: phoneE164,
      email: siteConfig.email.founder,
      worksFor: { "@id": ORG_ID },
      alumniOf: { "@type": "EducationalOrganization", name: person.alumniName },
      knowsAbout: person.knowsAbout,
      hasCredential: buildCredential(),
      address: buildPostalAddress(),
      ...(siteConfig.sameAs.length > 0 ? { sameAs: siteConfig.sameAs } : {}),
    },
  };
}

/** Xizmat sahifasi: Service, byuroga (provider) bog'langan */
export function buildServiceSchema(
  locale: string,
  service: { name: string; description: string; path: string }
) {
  const url = buildCanonicalUrl(locale, service.path);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: service.name,
    serviceType: service.name,
    description: service.description,
    url,
    inLanguage: LOCALE_HREFLANG[locale as keyof typeof LOCALE_HREFLANG] ?? "uz",
    provider: { "@id": ORG_ID },
    areaServed: buildAreaServed(locale),
  };
}

/** FAQPage schema.org (6.3-band) — savol-javob bloklari uchun */
export function buildFaqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  } as const;
}

/** BreadcrumbList schema.org (6.3-band) — barcha ichki sahifalarda */
export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  } as const;
}

/**
 * Blog maqolasi: BlogPosting. Muallif — advokatning Person tuguni
 * (PERSON_ID), nashriyotchi — byuro (ORG_ID).
 */
export function buildBlogPostingSchema(article: {
  locale: string;
  /** Maqola matni haqiqatda qaysi tilda (ru/en sahifalar hozircha uz matn) */
  contentLanguage: string;
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${article.url}#article`,
    headline: article.title.slice(0, 110),
    description: article.description,
    url: article.url,
    mainEntityOfPage: { "@type": "WebPage", "@id": article.url },
    inLanguage: article.contentLanguage,
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    image: OG_IMAGE_URL,
    author: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: article.authorName,
      url: buildCanonicalUrl(article.locale, "/advokat-haqida"),
    },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": WEBSITE_ID },
  };
}
