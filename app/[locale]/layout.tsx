import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, LOCALE_HREFLANG } from "@/i18n/routing";
import { buildLanguageAlternates } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyCallButton } from "@/components/layout/StickyCallButton";
import { LanguageSuggestionBanner } from "@/components/layout/LanguageSuggestionBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { Analytics } from "@/components/seo/Analytics";
import { buildLegalServiceSchema } from "@/lib/schema";
import "../globals.css";

const bodyFont = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  display: "swap",
});

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

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t("defaultTitle"),
      template: `%s | ${t("siteName")}`,
    },
    description: t("defaultDescription"),
    alternates: {
      canonical: locale === "uz" ? "/" : `/${locale}`,
      languages: buildLanguageAlternates(""),
    },
    openGraph: {
      siteName: t("siteName"),
      locale: LOCALE_HREFLANG[locale],
      type: "website",
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

  return (
    <html lang={LOCALE_HREFLANG[locale]} className={bodyFont.variable}>
      <body className="flex min-h-screen flex-col antialiased">
        <Analytics />
        <JsonLd data={buildLegalServiceSchema()} />
        <NextIntlClientProvider>
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
