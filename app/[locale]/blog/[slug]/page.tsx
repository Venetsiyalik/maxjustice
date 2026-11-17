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
import { buildBreadcrumbSchema, buildBlogPostingSchema } from "@/lib/schema";
import { buildCanonicalUrl, buildPageMetadata } from "@/lib/seo";
import { buildNotFoundMetadata } from "@/lib/not-found-metadata";
import { BLOG_SLUGS, BLOG_LOCALES, isBlogLocale, getBlogArticle, type BlogSlug } from "@/content/blog";
import { BlogBody } from "@/components/blog/BlogBody";
import { serviceHref } from "@/lib/services-data";

function isBlogSlug(value: string): value is BlogSlug {
  return (BLOG_SLUGS as readonly string[]).includes(value);
}

export function generateStaticParams() {
  return BLOG_SLUGS.map((slug) => ({ slug }));
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
  const locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale;
  if (!isBlogSlug(slug)) return buildNotFoundMetadata(locale);

  const article = await getBlogArticle(locale, slug);
  const path = `/blog/${slug}`;

  return buildPageMetadata({
    locale,
    path,
    title: article.metaTitle,
    description: article.metaDescription,
    locales: BLOG_LOCALES,
    // ru/en: tarjima tayyor emas, o'zbekcha matn — indekslanmaydi
    noindex: !isBlogLocale(locale),
    article: {
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authorName: article.author,
    },
  });
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

  const [article, nav, t, s, blogPage, common] = await Promise.all([
    getBlogArticle(locale, slug),
    getTranslations({ locale, namespace: "nav" }),
    getTranslations({ locale, namespace: "blogPost" }),
    getTranslations({ locale, namespace: "services" }),
    getTranslations({ locale, namespace: "blogPage" }),
    getTranslations({ locale, namespace: "common" }),
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
        data={buildBlogPostingSchema({
          locale,
          // ru/en sahifalarda matn hozircha o'zbekcha
          contentLanguage: locale === "kr" ? "uz-Cyrl" : "uz",
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
          {!isBlogLocale(locale) && (
            <p className="mt-4 rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-2 text-sm text-[var(--color-ink)]">
              {blogPage("uzOnlyNotice")}
            </p>
          )}
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
          <p className="mt-10 border-t border-[var(--color-line)] pt-6 text-sm italic text-[var(--color-muted)]">
            {common("legalDisclaimer")}
          </p>
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
