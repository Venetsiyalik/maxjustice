import type { BlogArticle, BlogBlock } from "./types";
import { toKirill } from "@/lib/transliterate";

export const BLOG_SLUGS = [
  "hibsga-olinsa-qanday-harakat-qilish-kerak",
  "tergovga-chaqirilsa-nima-qilish-kerak",
  "tintuv-paytida-huquqlar",
  "gumon-qilinuvchining-huquqlari",
  "advokat-qachon-kerak-boladi",
  "tadbirkorga-nisbatan-jinoiy-ish-qozgatilsa",
  "soliq-tekshiruvi-natijasi-ustidan-shikoyat",
  "sud-hukmi-ustidan-shikoyat-qilish-tartibi",
] as const;

export type BlogSlug = (typeof BLOG_SLUGS)[number];

type Loader = () => Promise<{ default: BlogArticle }>;

const uzLoaders: Record<BlogSlug, Loader> = {
  "hibsga-olinsa-qanday-harakat-qilish-kerak": () =>
    import("./uz/hibsga-olinsa-qanday-harakat-qilish-kerak"),
  "tergovga-chaqirilsa-nima-qilish-kerak": () =>
    import("./uz/tergovga-chaqirilsa-nima-qilish-kerak"),
  "tintuv-paytida-huquqlar": () => import("./uz/tintuv-paytida-huquqlar"),
  "gumon-qilinuvchining-huquqlari": () =>
    import("./uz/gumon-qilinuvchining-huquqlari"),
  "advokat-qachon-kerak-boladi": () => import("./uz/advokat-qachon-kerak-boladi"),
  "tadbirkorga-nisbatan-jinoiy-ish-qozgatilsa": () =>
    import("./uz/tadbirkorga-nisbatan-jinoiy-ish-qozgatilsa"),
  "soliq-tekshiruvi-natijasi-ustidan-shikoyat": () =>
    import("./uz/soliq-tekshiruvi-natijasi-ustidan-shikoyat"),
  "sud-hukmi-ustidan-shikoyat-qilish-tartibi": () =>
    import("./uz/sud-hukmi-ustidan-shikoyat-qilish-tartibi"),
};

/**
 * Faqat ko'rinadigan matn maydonlarini kirillga o'giradi — `slug`,
 * `relatedService`, `publishedAt`/`updatedAt` kabi identifikator/sana
 * qiymatlari o'zgarishsiz qoladi (ular kalit sifatida ishlatiladi).
 */
function transliterateBlocks(blocks: BlogBlock[]): BlogBlock[] {
  return blocks.map((block) =>
    block.type === "list"
      ? { type: "list", items: block.items.map(toKirill) }
      : { type: block.type, text: toKirill(block.text) }
  );
}

function toKirillArticle(article: BlogArticle): BlogArticle {
  return {
    ...article,
    title: toKirill(article.title),
    metaTitle: toKirill(article.metaTitle),
    metaDescription: toKirill(article.metaDescription),
    excerpt: toKirill(article.excerpt),
    quickAnswer: toKirill(article.quickAnswer),
    author: toKirill(article.author),
    body: transliterateBlocks(article.body),
  };
}

/**
 * Berilgan locale va slug uchun maqola kontentini yuklaydi.
 * Hozircha maqolalar faqat uz tilida yozilgan; "kr" avtomatik
 * transliteratsiya orqali, "ru"/"en" esa tarjima tayyor bo'lguncha
 * vaqtincha uz kontentidan foydalanadi.
 */
export async function getBlogArticle(
  locale: string,
  slug: BlogSlug
): Promise<BlogArticle> {
  const uz = (await uzLoaders[slug]()).default;
  return locale === "kr" ? toKirillArticle(uz) : uz;
}

export async function getAllBlogArticles(locale: string): Promise<BlogArticle[]> {
  const articles = await Promise.all(
    BLOG_SLUGS.map((slug) => getBlogArticle(locale, slug))
  );
  return articles.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}
