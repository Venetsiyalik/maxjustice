"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { CloseIcon } from "@/components/ui/icons";
import type { Locale } from "@/i18n/routing";

const DISMISSED_KEY = "maxjustice_lang_suggestion_dismissed";
const CHOSEN_KEY = "maxjustice_locale_chosen";

const SUGGESTIONS: Record<string, { locale: Locale; label: string }> = {
  ru: { locale: "ru", label: "Просмотреть сайт на русском языке?" },
  en: { locale: "en", label: "View this site in English?" },
};

/**
 * Birinchi tashritda brauzer tiliga qarab MULOYIM taklif (3.2-band) —
 * majburiy redirect emas, foydalanuvchi rad etishi yoki qabul qilishi mumkin.
 */
export function LanguageSuggestionBanner() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [suggestion, setSuggestion] = useState<{ locale: Locale; label: string } | null>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem(DISMISSED_KEY) || localStorage.getItem(CHOSEN_KEY)) {
        return;
      }
    } catch {
      return;
    }

    const browserLang = navigator.language?.slice(0, 2).toLowerCase();
    const candidate = SUGGESTIONS[browserLang];
    if (candidate && candidate.locale !== locale) {
      // Faqat mount'da, brauzer tiliga qarab bir martalik tekshiruv —
      // localStorage/navigator SSR'da mavjud emas, shu sabab effect ichida.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSuggestion(candidate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!suggestion) return null;

  function dismiss() {
    try {
      localStorage.setItem(DISMISSED_KEY, "1");
    } catch {
      // ignore
    }
    setSuggestion(null);
  }

  function accept() {
    if (!suggestion) return;
    try {
      localStorage.setItem(CHOSEN_KEY, "1");
    } catch {
      // ignore
    }
    router.replace(pathname, { locale: suggestion.locale });
  }

  return (
    <div className="flex items-center justify-center gap-4 bg-[var(--color-navy-800)] px-4 py-2.5 text-sm text-white">
      <span>{suggestion.label}</span>
      <button
        type="button"
        onClick={accept}
        className="rounded bg-[var(--color-gold-500)] px-3 py-1 font-semibold text-[var(--color-navy-950)]"
      >
        {suggestion.locale === "ru" ? "Да" : "Yes"}
      </button>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Close"
        className="text-white/60 hover:text-white"
      >
        <CloseIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
