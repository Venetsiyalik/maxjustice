import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";

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
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="flex flex-col gap-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6 transition-shadow hover:shadow-md"
            >
              <time className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
                {article.date}
              </time>
              <h3 className="text-lg font-bold text-[var(--color-navy-950)]">
                {article.title}
              </h3>
              <p className="text-sm text-[var(--color-muted)]">{article.excerpt}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
