import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { HelpGrid } from "@/components/sections/HelpGrid";
import { TrustSignals } from "@/components/sections/TrustSignals";
import { StepsSection } from "@/components/sections/StepsSection";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { ArticlesPreview } from "@/components/sections/ArticlesPreview";
import { ContactSection } from "@/components/sections/ContactSection";
import { ContactFormSection } from "@/components/sections/ContactFormSection";
import { getAllBlogArticles } from "@/content/blog";
import { routing, LOCALE_HREFLANG } from "@/i18n/routing";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale;
  setRequestLocale(locale);

  const allArticles = await getAllBlogArticles(locale);
  const dateFormatter = new Intl.DateTimeFormat(LOCALE_HREFLANG[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const latestArticles = allArticles.slice(0, 3).map((article) => ({
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    date: dateFormatter.format(new Date(article.publishedAt)),
  }));

  return (
    <>
      <Hero />
      <HelpGrid />
      <TrustSignals />
      <StepsSection />
      <AboutPreview />
      <ArticlesPreview articles={latestArticles} />
      <ContactSection />
      <ContactFormSection source="Bosh sahifa" />
    </>
  );
}
