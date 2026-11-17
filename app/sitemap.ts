import type { MetadataRoute } from "next";
import { LOCALES } from "@/i18n/routing";
import { STATIC_ROUTES, CONTENT_UPDATED_AT } from "@/lib/routes";
import { buildLanguageAlternates, buildCanonicalUrl } from "@/lib/seo";
import { BLOG_SLUGS, getBlogArticle } from "@/content/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // lastmod — haqiqiy o'zgarish sanasi: blog uchun maqoladagi
  // updatedAt/publishedAt, qolganlari uchun lib/routes.ts dagi sana.
  // (Avval har build vaqti qo'yilardi — qidiruv tizimlari bunga ishonmaydi.)
  const blogDates = new Map<string, string>();
  for (const slug of BLOG_SLUGS) {
    const article = await getBlogArticle("uz", slug);
    blogDates.set(`/blog/${slug}`, article.updatedAt ?? article.publishedAt);
  }
  const latestBlogDate = [...blogDates.values()].sort().at(-1) ?? CONTENT_UPDATED_AT;
  blogDates.set("/blog", latestBlogDate);

  const entries: MetadataRoute.Sitemap = [];

  for (const route of STATIC_ROUTES) {
    const locales = route.locales ?? LOCALES;
    const alternates = buildLanguageAlternates(route.path, locales);
    const lastModified = new Date(blogDates.get(route.path) ?? CONTENT_UPDATED_AT);

    for (const locale of LOCALES.filter((l) => locales.includes(l))) {
      entries.push({
        url: buildCanonicalUrl(locale, route.path),
        lastModified,
        changeFrequency: route.path === "" ? "weekly" : "monthly",
        priority: route.priority,
        alternates: { languages: alternates },
      });
    }
  }

  return entries;
}
