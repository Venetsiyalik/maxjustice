import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { CheckIcon } from "@/components/ui/icons";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { buildLanguageAlternates, buildCanonicalUrl } from "@/lib/seo";
import { ContactFormSection } from "@/components/sections/ContactFormSection";

const PATH = "/narxlar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "pricesPage" });

  return {
    title: { absolute: t("metaTitle") },
    description: t("metaDescription"),
    alternates: {
      canonical: buildCanonicalUrl(locale, PATH),
      languages: buildLanguageAlternates(PATH),
    },
  };
}

export default async function PricesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale;
  setRequestLocale(locale);

  const [t, nav] = await Promise.all([
    getTranslations({ locale, namespace: "pricesPage" }),
    getTranslations({ locale, namespace: "nav" }),
  ]);

  const reasons = t.raw("reasons") as string[];

  const breadcrumbUrls = [
    { name: nav("home"), url: buildCanonicalUrl(locale, "") },
    { name: t("title"), url: buildCanonicalUrl(locale, PATH) },
  ];

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(breadcrumbUrls)} />

      <div className="border-b border-[var(--color-line)] bg-[var(--color-surface-alt)] py-10">
        <Container>
          <Breadcrumbs items={[{ label: nav("home"), href: "/" }, { label: t("title") }]} />
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--color-navy-950)] sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--color-muted)]">{t("intro")}</p>
        </Container>
      </div>

      <Container className="max-w-2xl py-12">
        <div className="flex items-center justify-between rounded-xl border-2 border-[var(--color-gold-500)] bg-[var(--color-surface-alt)] p-6">
          <span className="text-lg font-bold text-[var(--color-navy-950)]">
            {t("freeConsultationLabel")}
          </span>
          <span className="text-xl font-extrabold text-[var(--color-gold-600)]">
            {t("freeConsultationValue")}
          </span>
        </div>

        <h2 className="mt-10 text-xl font-extrabold text-[var(--color-navy-950)]">
          {t("reasonsTitle")}
        </h2>
        <ul className="mt-4 flex flex-col gap-2.5">
          {reasons.map((reason, i) => (
            <li key={i} className="flex items-start gap-2.5 text-lg text-[var(--color-ink)]">
              <CheckIcon className="mt-1.5 h-4 w-4 shrink-0 text-[var(--color-gold-600)]" />
              {reason}
            </li>
          ))}
        </ul>
      </Container>

      <ContactFormSection source="Narxlar sahifasi" />
    </>
  );
}
