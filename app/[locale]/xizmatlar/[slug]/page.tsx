import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { SERVICES, serviceHref, type ServiceSlug } from "@/lib/services-data";
import { getServiceContent } from "@/content/services";
import { ServicePageContent } from "@/components/services/ServicePageContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildFaqSchema, buildBreadcrumbSchema, buildServiceSchema } from "@/lib/schema";
import { buildCanonicalUrl, buildPageMetadata } from "@/lib/seo";
import { buildNotFoundMetadata } from "@/lib/not-found-metadata";

const SLUGS = SERVICES.map((s) => s.slug);

function isServiceSlug(value: string): value is ServiceSlug {
  return (SLUGS as string[]).includes(value);
}

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

// Noma'lum yo'l/slug ham shu yerga tushib, tilga mos 404 ni ko'rsatsin
// (layout'dagi dynamicParams = false faqat til segmenti uchun)
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = hasLocale(routing.locales, rawLocale)
    ? rawLocale
    : routing.defaultLocale;

  if (!isServiceSlug(slug)) return buildNotFoundMetadata(locale);

  const content = await getServiceContent(locale, slug);
  const path = serviceHref(slug);

  return buildPageMetadata({
    locale,
    path,
    title: content.metaTitle,
    description: content.metaDescription,
  });
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

  const [content, nav, servicesT] = await Promise.all([
    getServiceContent(locale, slug),
    getTranslations({ locale, namespace: "nav" }),
    getTranslations({ locale, namespace: "services" }),
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
      <JsonLd
        data={buildServiceSchema(locale, {
          name: servicesT(`${slug}.title`),
          description: content.metaDescription,
          path: serviceHref(slug),
        })}
      />
      <JsonLd data={buildFaqSchema(content.faq)} />
      <JsonLd data={buildBreadcrumbSchema(breadcrumbUrls)} />
      <ServicePageContent content={content} breadcrumbs={breadcrumbs} />
    </>
  );
}
