"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { PhoneIcon, TelegramIcon, MenuIcon, CloseIcon } from "@/components/ui/icons";
import { siteConfig } from "@/lib/site-config";
import { localizeText } from "@/lib/localize-text";
import { trackEvent } from "@/lib/analytics";

const NAV_ITEMS: { key: string; href: string }[] = [
  { key: "about", href: "/advokat-haqida" },
  { key: "services", href: "/xizmatlar" },
  { key: "practice", href: "/amaliyot" },
  { key: "prices", href: "/narxlar" },
  { key: "blog", href: "/blog" },
  { key: "faq", href: "/savol-javob" },
  { key: "contact", href: "/bog-lanish" },
];

export function Header() {
  const t = useTranslations("nav");
  const cta = useTranslations("cta");
  const common = useTranslations("common");
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-line)] bg-[var(--color-surface)]/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link
          href="/"
          className="flex flex-col leading-tight"
          onClick={() => setOpen(false)}
        >
          <span className="text-base font-extrabold tracking-tight text-[var(--color-navy-950)] lg:text-lg">
            MAXLEGAL <span className="text-[var(--color-gold-500)]">&</span> JUSTICE
          </span>
          <span className="text-[11px] font-medium text-[var(--color-muted)]">
            {common("jobTitle")} {localizeText(locale, siteConfig.founder.fullName)}
          </span>
        </Link>

        <nav
          aria-label={t("home")}
          className="hidden items-center gap-6 xl:flex"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-sm font-semibold text-[var(--color-ink)] transition-colors hover:text-[var(--color-navy-700)]"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <a
            href={siteConfig.telegram.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={cta("telegram")}
            onClick={() => trackEvent("telegram_click")}
            className="flex h-11 w-11 items-center justify-center rounded-lg border-2 border-[var(--color-navy-900)] text-[var(--color-navy-900)] transition-colors hover:bg-[var(--color-navy-900)] hover:text-white"
          >
            <TelegramIcon className="h-5 w-5" />
          </a>
          <a
            href={siteConfig.phone.href}
            onClick={() => trackEvent("phone_click")}
            className="flex min-h-[44px] items-center gap-2 rounded-lg bg-[var(--color-gold-500)] px-4 py-2.5 text-sm font-bold text-[var(--color-navy-950)] transition-colors hover:bg-[var(--color-gold-400)]"
          >
            <PhoneIcon className="h-4 w-4" />
            {siteConfig.phone.display}
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={siteConfig.phone.href}
            aria-label={cta("call")}
            onClick={() => trackEvent("phone_click")}
            className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--color-gold-500)] text-[var(--color-navy-950)]"
          >
            <PhoneIcon className="h-5 w-5" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? t("menuClose") : t("menuOpen")}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--color-line)] text-[var(--color-navy-900)]"
          >
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      {open && (
        <div className="border-t border-[var(--color-line)] bg-[var(--color-surface)] lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-semibold text-[var(--color-ink)] hover:bg-[var(--color-surface-alt)]"
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="mt-2 flex items-center justify-between border-t border-[var(--color-line)] px-3 pt-4">
              <LanguageSwitcher />
              <a
                href={siteConfig.telegram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-semibold text-[var(--color-navy-900)]"
              >
                <TelegramIcon className="h-5 w-5" />
                {cta("telegram")}
              </a>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
