import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { PhoneIcon, TelegramIcon, MapPinIcon, MailIcon } from "@/components/ui/icons";
import { siteConfig } from "@/lib/site-config";
import { localizeText } from "@/lib/localize-text";
import { CourthouseOrnament, ScalesOrnament } from "@/components/ui/ornaments";
import { LinkedInLink } from "@/components/ui/LinkedInLink";

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
    <footer className="relative overflow-hidden border-t-[3px] border-[var(--color-gold-500)] bg-[var(--color-navy-950)] text-white">
      {/* Sud binosi silueti — fonda, juda xira */}
      <CourthouseOrnament
        strokeWidth={1}
        className="pointer-events-none absolute -bottom-6 right-[-60px] hidden w-[520px] text-white/[0.05] lg:block"
      />
      <Container className="relative grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-3">
          <ScalesOrnament className="h-10 w-10 text-[var(--color-gold-400)]" />
          <span className="font-display text-xl tracking-wide">
            MAXLEGAL <span className="text-[var(--color-gold-400)]">&</span> JUSTICE
          </span>
          <p className="text-sm leading-relaxed text-white/70">
            {localizeText(locale, siteConfig.legalName)}
          </p>
          <p className="text-xs text-white/50">{siteConfig.secondBrand}</p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="border-b border-white/10 pb-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-gold-400)]">
            {nav("services")}
          </h3>
          <ul className="flex flex-col text-sm text-white/80">
            {SERVICE_LINKS.map((s) => (
              <li key={s.key}>
                <Link href={s.href} className="inline-flex min-h-[32px] items-center hover:text-[var(--color-gold-400)]">
                  {t(`quickServices.${s.key}`)}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/xizmatlar" className="inline-flex min-h-[32px] items-center font-semibold text-[var(--color-gold-400)]">
                {nav("services")} →
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="border-b border-white/10 pb-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-gold-400)]">
            {nav("contact")}
          </h3>
          <a
            href={siteConfig.phone.href}
            className="flex min-h-[32px] w-fit items-center gap-2 text-sm font-semibold text-white hover:text-[var(--color-gold-400)]"
          >
            <PhoneIcon className="h-4 w-4 shrink-0" />
            {siteConfig.phone.display}
          </a>
          <div className="flex items-center gap-3">
            <a
              href={siteConfig.telegram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[32px] w-fit items-center gap-2 text-sm text-white/80 hover:text-[var(--color-gold-400)]"
            >
              <TelegramIcon className="h-4 w-4 shrink-0" />
              @{siteConfig.telegram.handle}
            </a>
            <LinkedInLink variant="icon" />
          </div>
          <a
            href={`mailto:${siteConfig.email.info}`}
            className="flex min-h-[32px] w-fit items-center gap-2 text-sm text-white/80 hover:text-[var(--color-gold-400)]"
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
          <div className="flex flex-col gap-1 rounded-md border border-[var(--color-gold-500)]/30 bg-white/[0.03] p-4 text-sm text-white/80">
            <p className="font-bold text-white">{t("firmName")}</p>
            <p>
              {t("licensePrefix")} {siteConfig.license.number}
            </p>
            <p>{t("chamberLabel")}</p>
            <p>
              {t("taxIdPrefix")} {siteConfig.taxId}
            </p>
          </div>
          <ul className="mt-1 flex flex-col text-sm text-white/70">
            <li>
              <Link href="/maxfiylik-siyosati" className="inline-flex min-h-[32px] items-center hover:text-white">
                {t("privacyPolicy")}
              </Link>
            </li>
            <li>
              <Link href="/foydalanish-shartlari" className="inline-flex min-h-[32px] items-center hover:text-white">
                {t("termsOfUse")}
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <div className="relative border-t border-white/10">
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
