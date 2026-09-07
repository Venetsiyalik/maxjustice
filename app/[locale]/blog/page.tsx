import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, LOCALE_HREFLANG } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Link } from "@/i18n/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { buildLanguageAlternates, buildCanonicalUrl } from "@/lib/seo";
import { getAllBlogArticles } from "@/content/blog";

const PATH = "/blog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "blogPage" });

  return {
    title: { absolute: t("metaTitle") },
    description: t("metaDescription"),
    alternates: {
      canonical: buildCanonicalUrl(locale, PATH),
      languages: buildLanguageAlternates(PATH),
    },
  };
}

export default async function BlogHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale;
  setRequestLocale(locale);

  const [t, nav, articles] = await Promise.all([
    getTranslations({ locale, namespace: "blogPage" }),
    getTranslations({ locale, namespace: "nav" }),
    getAllBlogArticles(locale),
  ]);

  const dateFormatter = new Intl.DateTimeFormat(LOCALE_HREFLANG[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
          <p className="mt-3 max-w-2xl text-lg text-[var(--color-muted)]">{t("intro")}</p>
        </Container>
      </div>

      <Container className="py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="flex flex-col gap-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6 transition-shadow hover:shadow-md"
            >
              <time
                dateTime={article.publishedAt}
                className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]"
              >
                {dateFormatter.format(new Date(article.publishedAt))}
              </time>
              <h2 className="text-lg font-bold text-[var(--color-navy-950)]">
                {article.title}
              </h2>
              <p className="text-sm text-[var(--color-muted)]">{article.excerpt}</p>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
