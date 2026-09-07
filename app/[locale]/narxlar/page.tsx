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

const PATH = "/narxlar";

type PriceRow = { service: string; price: string };

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

  const rows = t.raw("rows") as PriceRow[];

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

      <Container className="max-w-3xl py-12">
        <div className="overflow-hidden rounded-xl border border-[var(--color-line)]">
          <table className="w-full border-collapse text-left">
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className={i % 2 === 0 ? "bg-[var(--color-surface)]" : "bg-[var(--color-surface-alt)]"}
                >
                  <td className="p-4 text-[var(--color-ink)]">{row.service}</td>
                  <td className="p-4 text-right font-bold text-[var(--color-navy-950)] whitespace-nowrap">
                    {row.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-[var(--color-muted)]">{t("note")}</p>
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
