"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { LOCALES, LOCALE_LABELS, type Locale } from "@/i18n/routing";

const LOCALE_STORAGE_KEY = "maxjustice_locale";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
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
            <span className="mx-1 text-[var(--color-line)]" aria-hidden>
              |
            </span>
          )}
          <button
            type="button"
            onClick={() => switchTo(code)}
            aria-current={code === locale ? "true" : undefined}
            className={`rounded px-1.5 py-1 transition-colors ${
              code === locale
                ? "text-[var(--color-navy-900)]"
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
