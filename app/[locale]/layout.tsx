import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing, LOCALE_HREFLANG } from "@/i18n/routing";
import { brandTitle } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyCallButton } from "@/components/layout/StickyCallButton";
import { LanguageSuggestionBanner } from "@/components/layout/LanguageSuggestionBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { Analytics } from "@/components/seo/Analytics";
import { buildSiteGraph } from "@/lib/schema";
import { SERVICES } from "@/lib/services-data";
import "../globals.css";

const bodyFont = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  display: "swap",
});

/** Client komponentlar (`"use client"`) useTranslations bilan o'qiydigan bo'limlar */
const CLIENT_NAMESPACES = ["nav", "cta", "common", "langSwitcher", "form"] as const;

// Faqat 4 ta til: boshqa birinchi segment (masalan, `/eski.php`) [locale]
// ga tushmaydi — marshrut darajasida 404 bo'lib, app/global-not-found.tsx
// ko'rsatiladi. Ichki sahifalar (slug, [...rest]) dynamicParams = true ni
// o'zi qaytaradi, shuning uchun ular tilga mos 404 ni ko'rsatadi.
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = hasLocale(routing.locales, rawLocale)
    ? rawLocale
    : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "meta" });

  // Sahifaga xos title/description/canonical/OG har sahifada
  // buildPageMetadata() orqali beriladi. Bu yerda faqat umumiy zaxira
  // qiymatlar — canonical ataylab yo'q (aks holda 404 sahifalar "/" ga
  // canonical bo'lib qolardi).
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: brandTitle(t("homeTitle")), template: `%s | ${siteConfig.brandName}` },
    description: t("defaultDescription"),
    openGraph: {
      siteName: siteConfig.brandName,
      type: "website",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: siteConfig.brandName }],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/og-image.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;

  if (!hasLocale(routing.locales, rawLocale)) {
    notFound();
  }
  const locale = rawLocale;

  setRequestLocale(locale);

  // Client komponentlarga faqat ular ishlatadigan tarjimalar uzatiladi
  // (Header, til almashtirgich, mobil panel, forma). Aks holda HAR sahifa
  // HTML'iga barcha sahifalarning matnlari qo'shilib ketadi.
  const allMessages = await getMessages();

  // schema.org: byuro + sayt + advokat — sahifa tilida (lib/schema.ts)
  const [footerT, aboutT, commonT, servicesT] = await Promise.all([
    getTranslations({ locale, namespace: "footer" }),
    getTranslations({ locale, namespace: "aboutPage" }),
    getTranslations({ locale, namespace: "common" }),
    getTranslations({ locale, namespace: "services" }),
  ]);
  const siteGraph = buildSiteGraph(locale, {
    firmName: footerT("firmName"),
    personName: aboutT("heroName"),
    jobTitle: commonT("jobTitle"),
    serviceNames: SERVICES.map(({ slug }) => servicesT(`${slug}.title`)),
  });
  const clientMessages = Object.fromEntries(
    CLIENT_NAMESPACES.filter((ns) => ns in allMessages).map((ns) => [ns, allMessages[ns]])
  );

  return (
    <html lang={LOCALE_HREFLANG[locale]} className={bodyFont.variable}>
      <body className="flex min-h-screen flex-col antialiased">
        <Analytics />
        <JsonLd data={siteGraph} />
        <NextIntlClientProvider messages={clientMessages}>
          <LanguageSuggestionBanner />
          <Header />
          <main className="flex-1 pb-14 lg:pb-0">{children}</main>
          <Footer />
          <StickyCallButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
