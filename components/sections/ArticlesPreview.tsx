import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ArticleLink } from "@/components/blog/ArticleLink";
import { isBlogLocale } from "@/content/blog";

export type ArticlePreviewItem = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
};

/**
 * Blog tayyor bo'lguncha (6-bosqich) bu blok bosh sahifada ko'rsatilmaydi —
 * app/[locale]/page.tsx da `articles.length === 0` bo'lsa render qilinmaydi.
 */
export function ArticlesPreview({ articles }: { articles: ArticlePreviewItem[] }) {
  const t = useTranslations("home.articlesBlock");
  const cta = useTranslations("cta");
  const blog = useTranslations("blogPage");
  const locale = useLocale();
  // ru/en: maqolalar hali faqat o'zbekcha — havola uz versiyaga, belgi bilan
  const uzOnly = !isBlogLocale(locale);

  if (articles.length === 0) return null;

  return (
    <section className="bg-[var(--color-surface-alt)] py-16 lg:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading title={t("title")} />
          <Button href="/blog" variant="ghost">
            {cta("allArticles")}
          </Button>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleLink
              key={article.slug}
              slug={article.slug}
              uzOnly={uzOnly}
              className="flex flex-col gap-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6 transition-shadow hover:shadow-md"
            >
              <time className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
                {article.date}
              </time>
              {uzOnly && (
                <span className="w-fit rounded bg-[var(--color-surface-alt)] px-2 py-0.5 text-xs font-semibold text-[var(--color-muted)]">
                  {blog("uzOnlyBadge")}
                </span>
              )}
              <h3 className="text-lg font-bold text-[var(--color-navy-950)]">
                {article.title}
              </h3>
              <p className="text-sm text-[var(--color-muted)]">{article.excerpt}</p>
            </ArticleLink>
          ))}
        </div>
      </Container>
    </section>
  );
}

