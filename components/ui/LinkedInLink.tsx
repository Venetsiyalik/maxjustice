import { useTranslations } from "next-intl";
import { LinkedInIcon } from "@/components/ui/icons";
import { siteConfig } from "@/lib/site-config";

/**
 * Advokatning LinkedIn profiliga havola. Manzil faqat siteConfig.linkedin dan
 * (content/settings.json, admin → Sozlamalar); bo'sh bo'lsa hech narsa chiqmaydi.
 *
 * rel="me" — Google va boshqa tizimlarga profil shu shaxsniki ekanini bildiradi.
 */
export function LinkedInLink({
  variant,
  className = "",
}: {
  /** icon — faqat belgi; button — chegarali tugma; row — belgi + matn qatori */
  variant: "icon" | "button" | "row";
  className?: string;
}) {
  const t = useTranslations("common");
  const href = siteConfig.linkedin;
  if (!href) return null;

  const shared = {
    href,
    target: "_blank",
    rel: "noopener me",
    "aria-label": t("linkedinAria"),
  } as const;

  if (variant === "icon") {
    return (
      <a
        {...shared}
        className={`flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-white/80 transition-colors hover:border-[var(--color-gold-400)] hover:text-[var(--color-gold-400)] ${className}`}
      >
        <LinkedInIcon className="h-4 w-4" />
      </a>
    );
  }

  if (variant === "button") {
    return (
      <a
        {...shared}
        className={`inline-flex min-h-[44px] items-center gap-2 rounded-md border border-[var(--color-line)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-navy-900)] transition-colors hover:border-[var(--color-gold-500)] hover:text-[var(--color-gold-600)] ${className}`}
      >
        <LinkedInIcon className="h-4 w-4 shrink-0 text-[#0a66c2]" />
        {t("linkedinProfile")}
      </a>
    );
  }

  return (
    <a
      {...shared}
      className={`flex min-h-[44px] w-fit items-center gap-3 text-lg text-[var(--color-navy-900)] hover:text-[var(--color-gold-600)] ${className}`}
    >
      <LinkedInIcon className="h-5 w-5 shrink-0 text-[var(--color-gold-600)]" />
      {t("linkedinProfile")}
    </a>
  );
}
