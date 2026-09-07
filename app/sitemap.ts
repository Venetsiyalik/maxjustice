import type { MetadataRoute } from "next";
import { LOCALES } from "@/i18n/routing";
import { STATIC_ROUTES } from "@/lib/routes";
import { buildLanguageAlternates, buildCanonicalUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of STATIC_ROUTES) {
    const alternates = buildLanguageAlternates(route.path);

    for (const locale of LOCALES) {
      entries.push({
        url: buildCanonicalUrl(locale, route.path),
        lastModified: new Date(),
        changeFrequency: route.path === "" ? "weekly" : "monthly",
        priority: route.priority,
        alternates: { languages: alternates },
      });
    }
  }

  return entries;
}
