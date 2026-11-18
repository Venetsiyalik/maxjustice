"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/i18n/routing";

const LOCALE_STORAGE_KEY = "maxjustice_locale";

export function LanguageSwitcher({
  className = "",
  tone = "light",
}: {
  className?: string;
  /** dark — to'q fon (header ustidagi satr) uchun */
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("langSwitcher");

  function switchTo(next: Locale) {
    if (next === locale) return;
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
      window.localStorage.setItem("maxjustice_locale_chosen", "1");
    } catch {
      // localStorage mavjud bo'lmasa (masalan, maxfiylik rejimi) — jim o'tkazamiz
    }
    router.replace(pathname, { locale: next });
  }

  return (
    <nav
      aria-label={t("label")}
      className={`flex items-center gap-1 text-sm font-semibold ${className}`}
    >
      {LOCALES.map((code, index) => (
        <span key={code} className="flex items-center">
          {index > 0 && (
            <span className={`mx-1 ${dark ? "text-white/20" : "text-[var(--color-line)]"}`} aria-hidden>
              |
            </span>
          )}
          <button
            type="button"
            onClick={() => switchTo(code)}
            aria-current={code === locale ? "true" : undefined}
            className={`flex items-center justify-center rounded px-1.5 transition-colors ${
              dark ? "min-h-8 min-w-8 text-xs tracking-wider" : "min-h-11 min-w-11"
            } ${
              code === locale
                ? dark
                  ? "text-[var(--color-gold-400)]"
                  : "text-[var(--color-navy-900)]"
                : dark
                  ? "text-white/60 hover:text-white"
                  : "text-[var(--color-muted)] hover:text-[var(--color-navy-900)]"
            }`}
          >
            {LOCALE_LABELS[code]}
          </button>
        </span>
      ))}
    </nav>
  );
}
