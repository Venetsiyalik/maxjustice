import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { SERVICES, serviceHref, type ServiceSlug } from "@/lib/services-data";
import { getServiceContent } from "@/content/services";
import { ServicePageContent } from "@/components/services/ServicePageContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildFaqSchema, buildBreadcrumbSchema } from "@/lib/schema";
import { buildLanguageAlternates, buildCanonicalUrl } from "@/lib/seo";

const SLUGS = SERVICES.map((s) => s.slug);

function isServiceSlug(value: string): value is ServiceSlug {
  return (SLUGS as string[]).includes(value);
}

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = hasLocale(routing.locales, rawLocale)
    ? rawLocale
    : routing.defaultLocale;

  if (!isServiceSlug(slug)) return {};

  const content = await getServiceContent(locale, slug);
  const path = serviceHref(slug);

  return {
    title: { absolute: content.metaTitle },
    description: content.metaDescription,
    alternates: {
      canonical: buildCanonicalUrl(locale, path),
      languages: buildLanguageAlternates(path),
    },
  };
}

export default async function ServiceSlugPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;

  if (!hasLocale(routing.locales, rawLocale) || !isServiceSlug(slug)) {
    notFound();
  }
  const locale = rawLocale;

  setRequestLocale(locale);

  const [content, nav] = await Promise.all([
    getServiceContent(locale, slug),
    getTranslations({ locale, namespace: "nav" }),
  ]);

  const breadcrumbs = [
    { label: nav("home"), href: "/" },
    { label: nav("services"), href: "/xizmatlar" },
    { label: content.h1 },
  ];

  const breadcrumbUrls = [
    { name: nav("home"), url: buildCanonicalUrl(locale, "") },
    { name: nav("services"), url: buildCanonicalUrl(locale, "/xizmatlar") },
    { name: content.h1, url: buildCanonicalUrl(locale, serviceHref(slug)) },
  ];

  return (
    <>
      <JsonLd data={buildFaqSchema(content.faq)} />
      <JsonLd data={buildBreadcrumbSchema(breadcrumbUrls)} />
      <ServicePageContent content={content} breadcrumbs={breadcrumbs} />
    </>
  );
}
