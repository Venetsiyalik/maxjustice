import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, LOCALE_HREFLANG } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema, buildArticleSchema } from "@/lib/schema";
import { buildLanguageAlternates, buildCanonicalUrl } from "@/lib/seo";
import { BLOG_SLUGS, getBlogArticle, type BlogSlug } from "@/content/blog";
import { BlogBody } from "@/components/blog/BlogBody";
import { serviceHref } from "@/lib/services-data";

function isBlogSlug(value: string): value is BlogSlug {
  return (BLOG_SLUGS as readonly string[]).includes(value);
}

export function generateStaticParams() {
  return BLOG_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale;
  if (!isBlogSlug(slug)) return {};

  const article = await getBlogArticle(locale, slug);
  const path = `/blog/${slug}`;

  return {
    title: { absolute: article.metaTitle },
    description: article.metaDescription,
    alternates: {
      canonical: buildCanonicalUrl(locale, path),
      languages: buildLanguageAlternates(path),
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  if (!hasLocale(routing.locales, rawLocale) || !isBlogSlug(slug)) {
    notFound();
  }
  const locale = rawLocale;
  setRequestLocale(locale);

  const [article, nav, t, s] = await Promise.all([
    getBlogArticle(locale, slug),
    getTranslations({ locale, namespace: "nav" }),
    getTranslations({ locale, namespace: "blogPost" }),
    getTranslations({ locale, namespace: "services" }),
  ]);

  const path = `/blog/${slug}`;
  const dateFormatter = new Intl.DateTimeFormat(LOCALE_HREFLANG[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const breadcrumbUrls = [
    { name: nav("home"), url: buildCanonicalUrl(locale, "") },
    { name: nav("blog"), url: buildCanonicalUrl(locale, "/blog") },
    { name: article.title, url: buildCanonicalUrl(locale, path) },
  ];

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(breadcrumbUrls)} />
      <JsonLd
        data={buildArticleSchema({
          title: article.title,
          description: article.metaDescription,
          url: buildCanonicalUrl(locale, path),
          datePublished: article.publishedAt,
          dateModified: article.updatedAt,
          authorName: article.author,
        })}
      />

      <div className="border-b border-[var(--color-line)] bg-[var(--color-surface-alt)] py-8">
        <Container className="max-w-3xl">
          <Breadcrumbs
            items={[
              { label: nav("home"), href: "/" },
              { label: nav("blog"), href: "/blog" },
              { label: article.title },
            ]}
          />
          <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-[var(--color-navy-950)] sm:text-4xl">
            {article.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[var(--color-muted)]">
            <span>{article.author}</span>
            <span aria-hidden>·</span>
            <time dateTime={article.publishedAt}>
              {t("publishedLabel")}: {dateFormatter.format(new Date(article.publishedAt))}
            </time>
            {article.updatedAt && (
              <>
                <span aria-hidden>·</span>
                <time dateTime={article.updatedAt}>
                  {t("updatedLabel")}: {dateFormatter.format(new Date(article.updatedAt))}
                </time>
              </>
            )}
          </div>
        </Container>
      </div>

      <Container className="max-w-3xl py-12">
        <p className="rounded-xl border-l-4 border-[var(--color-gold-500)] bg-[var(--color-surface-alt)] p-5 text-lg leading-relaxed text-[var(--color-ink)]">
          {article.quickAnswer}
        </p>

        <div className="mt-8">
          <BlogBody blocks={article.body} />
        </div>

        {article.relatedService && (
          <div className="mt-10 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-muted)]">
              {t("relatedServiceLabel")}
            </p>
            <Link
              href={serviceHref(article.relatedService)}
              className="mt-1 block text-lg font-bold text-[var(--color-navy-800)] hover:underline"
            >
              {s(`${article.relatedService}.title`)} →
            </Link>
          </div>
        )}
      </Container>

      <div className="border-t border-[var(--color-line)] bg-[var(--color-navy-950)] py-10 text-center">
        <Container className="max-w-2xl">
          <Button href="/blog" variant="outline" className="border-white text-white hover:bg-white hover:text-[var(--color-navy-950)]">
            {t("backToBlog")}
          </Button>
        </Container>
      </div>
    </>
  );
}
