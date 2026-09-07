import type { ServiceSlug } from "@/lib/services-data";

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

export type BlogArticle = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  quickAnswer: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  relatedService?: ServiceSlug;
  body: BlogBlock[];
};
