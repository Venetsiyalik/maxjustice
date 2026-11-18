import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Link } from "@/i18n/navigation";
import { ChevronRightIcon } from "@/components/ui/icons";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { buildCanonicalUrl, buildPageMetadata } from "@/lib/seo";
import { SERVICES, serviceHref } from "@/lib/services-data";
import { GoldDivider, PageHeaderOrnament } from "@/components/ui/ornaments";

const PATH = "/xizmatlar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "servicesHub" });

  return buildPageMetadata({
    locale,
    path: PATH,
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function ServicesHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale;
  setRequestLocale(locale);

  const [t, s, nav] = await Promise.all([
    getTranslations({ locale, namespace: "servicesHub" }),
    getTranslations({ locale, namespace: "services" }),
    getTranslations({ locale, namespace: "nav" }),
  ]);

  const breadcrumbUrls = [
    { name: nav("home"), url: buildCanonicalUrl(locale, "") },
    { name: t("title"), url: buildCanonicalUrl(locale, PATH) },
  ];

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(breadcrumbUrls)} />

      <div className="paper-texture relative overflow-hidden border-b border-[var(--color-line)] bg-[var(--color-surface-alt)] py-8">
        <PageHeaderOrnament />
        <Container className="relative">
          <Breadcrumbs
            items={[{ label: nav("home"), href: "/" }, { label: t("title") }]}
          />
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--color-navy-950)] sm:text-4xl">
            {t("title")}
          </h1>
          <GoldDivider className="mt-4" align="left" />
          <p className="mt-3 max-w-2xl text-lg text-[var(--color-muted)]">
            {t("subtitle")}
          </p>
        </Container>
      </div>

      <Container className="py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ slug, icon: Icon }) => (
            <Link
              key={slug}
              href={serviceHref(slug)}
              data-reveal className="card-gold-rule group flex flex-col gap-3 rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[var(--color-gold-500)]/50 hover:shadow-[0_18px_40px_-18px_rgb(10_22_40/0.35)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--color-navy-950)] text-[var(--color-gold-400)]">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-base font-bold text-[var(--color-navy-950)]">
                {s(`${slug}.title`)}
              </span>
              <span className="text-sm text-[var(--color-muted)]">
                {s(`${slug}.cardText`)}
              </span>
              <span className="mt-auto flex items-center gap-1 text-sm font-semibold text-[var(--color-navy-700)] md:opacity-0 md:transition-opacity md:group-hover:opacity-100">
                <ChevronRightIcon className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
