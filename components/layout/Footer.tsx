import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { PhoneIcon, TelegramIcon, MapPinIcon, MailIcon } from "@/components/ui/icons";
import { siteConfig } from "@/lib/site-config";
import { localizeText } from "@/lib/localize-text";

const SERVICE_LINKS = [
  { key: "criminal", href: "/xizmatlar/jinoiy-ishlar" },
  { key: "preInvestigation", href: "/xizmatlar/tergovga-qadar" },
  { key: "business", href: "/xizmatlar/tadbirkor-himoyasi" },
  { key: "civil", href: "/xizmatlar/fuqarolik-ishlari" },
] as const;

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-navy-950)] text-white">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-3">
          <span className="text-lg font-extrabold tracking-tight">
            MAXLEGAL <span className="text-[var(--color-gold-400)]">&</span> JUSTICE
          </span>
          <p className="text-sm leading-relaxed text-white/70">
            {localizeText(locale, siteConfig.legalName)}
          </p>
          <p className="text-xs text-white/50">{siteConfig.secondBrand}</p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-bold uppercase tracking-wide text-white/60">
            {nav("services")}
          </h3>
          <ul className="flex flex-col gap-2 text-sm text-white/80">
            {SERVICE_LINKS.map((s) => (
              <li key={s.key}>
                <Link href={s.href} className="hover:text-[var(--color-gold-400)]">
                  {t(`quickServices.${s.key}`)}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/xizmatlar" className="font-semibold text-[var(--color-gold-400)]">
                {nav("services")} →
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-bold uppercase tracking-wide text-white/60">
            {nav("contact")}
          </h3>
          <a
            href={siteConfig.phone.href}
            className="flex items-center gap-2 text-sm font-semibold text-white hover:text-[var(--color-gold-400)]"
          >
            <PhoneIcon className="h-4 w-4 shrink-0" />
            {siteConfig.phone.display}
          </a>
          <a
            href={siteConfig.telegram.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-white/80 hover:text-[var(--color-gold-400)]"
          >
            <TelegramIcon className="h-4 w-4 shrink-0" />
            @{siteConfig.telegram.handle}
          </a>
          <a
            href={`mailto:${siteConfig.email.info}`}
            className="flex items-center gap-2 text-sm text-white/80 hover:text-[var(--color-gold-400)]"
          >
            <MailIcon className="h-4 w-4 shrink-0" />
            {siteConfig.email.info}
          </a>
          <p className="flex items-start gap-2 text-sm text-white/80">
            <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{localizeText(locale, siteConfig.address.display)}</span>
          </p>
          <p className="text-xs text-white/50">{t("workingHours")}</p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-bold uppercase tracking-wide text-white/60">
            {t("licenseLabel")}
          </h3>
          <p className="text-sm text-white/80">
            {localizeText(locale, siteConfig.license.number)}
          </p>
          <p className="text-sm text-white/80">{t("chamberLabel")}</p>
          <ul className="mt-1 flex flex-col gap-1 text-sm text-white/60">
            <li>
              <Link href="/maxfiylik-siyosati" className="hover:text-white">
                {t("privacyPolicy")}
              </Link>
            </li>
            <li>
              <Link href="/foydalanish-shartlari" className="hover:text-white">
                {t("termsOfUse")}
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.legalName}. {t("rightsReserved")}
          </p>
          <p className="max-w-xl">{t("disclaimer")}</p>
        </Container>
      </div>
    </footer>
  );
}
