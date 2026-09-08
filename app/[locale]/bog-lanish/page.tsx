import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { buildLanguageAlternates, buildCanonicalUrl } from "@/lib/seo";
import { ContactSection } from "@/components/sections/ContactSection";
import { ContactFormSection } from "@/components/sections/ContactFormSection";
import { MailIcon } from "@/components/ui/icons";
import { siteConfig } from "@/lib/site-config";

const PATH = "/bog-lanish";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "contactPage" });

  return {
    title: { absolute: t("metaTitle") },
    description: t("metaDescription"),
    alternates: {
      canonical: buildCanonicalUrl(locale, PATH),
      languages: buildLanguageAlternates(PATH),
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale;
  setRequestLocale(locale);

  const [t, nav] = await Promise.all([
    getTranslations({ locale, namespace: "contactPage" }),
    getTranslations({ locale, namespace: "nav" }),
  ]);

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
        </Container>
      </div>

      <ContactSection />

      <div className="border-t border-[var(--color-line)] py-12">
        <Container className="max-w-2xl">
          <h2 className="text-xl font-extrabold text-[var(--color-navy-950)]">
            {t("emailsTitle")}
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              { label: t("emailGeneral"), email: siteConfig.email.info },
              { label: t("emailLegal"), email: siteConfig.email.advokat },
              { label: t("emailFounder"), email: siteConfig.email.founder },
            ].map((item) => (
              <a
                key={item.email}
                href={`mailto:${item.email}`}
                className="flex flex-col gap-1.5 rounded-xl border border-[var(--color-line)] p-4 hover:border-[var(--color-navy-700)]"
              >
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[var(--color-muted)]">
                  <MailIcon className="h-3.5 w-3.5 shrink-0 text-[var(--color-gold-600)]" />
                  {item.label}
                </span>
                <span className="text-sm font-semibold text-[var(--color-navy-900)] break-all">
                  {item.email}
                </span>
              </a>
            ))}
          </div>
        </Container>
      </div>

      <ContactFormSection source="Bog'lanish sahifasi" />
    </>
  );
}
