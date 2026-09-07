import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { buildLanguageAlternates, buildCanonicalUrl } from "@/lib/seo";

const PATH = "/amaliyot";

type CaseItem = { category: string; situation: string; approach: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "practicePage" });

  return {
    title: { absolute: t("metaTitle") },
    description: t("metaDescription"),
    alternates: {
      canonical: buildCanonicalUrl(locale, PATH),
      languages: buildLanguageAlternates(PATH),
    },
  };
}

export default async function PracticePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale;
  setRequestLocale(locale);

  const [t, nav] = await Promise.all([
    getTranslations({ locale, namespace: "practicePage" }),
    getTranslations({ locale, namespace: "nav" }),
  ]);

  const cases = t.raw("cases") as CaseItem[];

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

      <Container className="py-12">
        <p className="mb-8 rounded-lg border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-4 text-sm text-[var(--color-muted)]">
          {t("disclaimer")}
        </p>

        <div className="grid gap-6 lg:grid-cols-2">
          {cases.map((item, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6"
            >
              <span className="w-fit rounded-full bg-[var(--color-navy-950)] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[var(--color-gold-400)]">
                {item.category}
              </span>
              <p className="text-[var(--color-ink)]">
                <span className="font-bold text-[var(--color-navy-900)]">
                  {t("situationLabel")}:{" "}
                </span>
                {item.situation}
              </p>
              <p className="text-[var(--color-muted)]">
                <span className="font-bold text-[var(--color-navy-900)]">
                  {t("approachLabel")}:{" "}
                </span>
                {item.approach}
              </p>
            </div>
          ))}
        </div>
      </Container>

      <div className="border-t border-[var(--color-line)] bg-[var(--color-navy-950)] py-12 text-center text-white">
        <Container className="max-w-2xl">
          <h2 className="text-2xl font-extrabold">{t("ctaTitle")}</h2>
          <p className="mt-2 text-white/70">{t("ctaSubtitle")}</p>
          <div className="mt-6 flex justify-center">
            <Button href="/bog-lanish">{t("ctaTitle")}</Button>
          </div>
        </Container>
      </div>
    </>
  );
}
