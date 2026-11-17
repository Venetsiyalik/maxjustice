import NextLink from "next/link";
import { Link } from "@/i18n/navigation";

/**
 * Maqola kartochkasi havolasi. ru/en da maqola hali faqat o'zbekcha —
 * shuning uchun to'g'ridan-to'g'ri prefikssiz uz URL'ga (`/blog/...`) olib
 * boradi. (next-intl Link `locale="uz"` bilan `/uz/...` hosil qiladi va bu
 * ortiqcha 308 yo'naltirishga olib keladi.)
 */
export function ArticleLink({
  slug,
  uzOnly,
  className,
  children,
}: {
  slug: string;
  uzOnly: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const href = `/blog/${slug}`;
  return uzOnly ? (
    <NextLink href={href} hrefLang="uz" className={className}>
      {children}
    </NextLink>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
