"use client";

import { useTranslations } from "next-intl";
import { PhoneIcon, TelegramIcon } from "@/components/ui/icons";
import { siteConfig } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";

/**
 * Mobil versiyada ekran pastiga yopishtirilgan doimiy qo'ng'iroq tugmasi
 * (5.1-band, "Doimiy element"; 10-band jadvali).
 */
export function StickyCallButton() {
  const cta = useTranslations("cta");

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-px border-t border-[var(--color-line)] bg-white shadow-[0_-4px_16px_rgba(10,22,40,0.08)] lg:hidden">
      <a
        href={siteConfig.telegram.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("telegram_click")}
        className="flex min-h-[56px] flex-1 items-center justify-center gap-2 bg-[var(--color-navy-900)] text-sm font-bold text-white"
      >
        <TelegramIcon className="h-5 w-5" />
        {cta("telegram")}
      </a>
      <a
        href={siteConfig.phone.href}
        onClick={() => trackEvent("phone_click")}
        className="flex min-h-[56px] flex-[1.4] items-center justify-center gap-2 bg-[var(--color-gold-500)] text-sm font-bold text-[var(--color-navy-950)]"
      >
        <PhoneIcon className="h-5 w-5" />
        {cta("callNow")}
      </a>
    </div>
  );
}
