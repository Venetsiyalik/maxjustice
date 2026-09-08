import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MapPinIcon, PhoneIcon, MailIcon } from "@/components/ui/icons";
import { siteConfig } from "@/lib/site-config";
import { localizeText } from "@/lib/localize-text";

export function ContactSection() {
  const t = useTranslations("home.contactBlock");
  const footer = useTranslations("footer");
  const locale = useLocale();

  return (
    <section id="manzil" className="py-16 lg:py-24">
      <Container className="grid gap-10 lg:grid-cols-2">
        <div>
          <SectionHeading title={t("title")} />

          <address className="mt-6 flex items-start gap-3 not-italic">
            <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-gold-600)]" />
            <span className="text-lg text-[var(--color-ink)]">
              {localizeText(locale, siteConfig.address.display)}
            </span>
          </address>

          <a
            href={siteConfig.phone.href}
            className="mt-3 flex items-center gap-3 text-lg font-bold text-[var(--color-navy-900)]"
          >
            <PhoneIcon className="h-5 w-5 shrink-0 text-[var(--color-gold-600)]" />
            {siteConfig.phone.display}
          </a>

          <a
            href={`mailto:${siteConfig.email.info}`}
            className="mt-3 flex items-center gap-3 text-lg text-[var(--color-navy-900)]"
          >
            <MailIcon className="h-5 w-5 shrink-0 text-[var(--color-gold-600)]" />
            {siteConfig.email.info}
          </a>

          <p className="mt-3 text-sm text-[var(--color-muted)]">
            {footer("workingHours")}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={siteConfig.maps.google}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-[var(--color-line)] px-4 py-2.5 text-sm font-semibold text-[var(--color-navy-900)] hover:border-[var(--color-navy-700)]"
            >
              {t("googleMaps")}
            </a>
            <a
              href={siteConfig.maps.yandex}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-[var(--color-line)] px-4 py-2.5 text-sm font-semibold text-[var(--color-navy-900)] hover:border-[var(--color-navy-700)]"
            >
              {t("yandexMaps")}
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[var(--color-line)]">
          <iframe
            src={siteConfig.maps.googleEmbed}
            width="100%"
            height="360"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={t("title")}
            className="h-[360px] w-full"
          />
        </div>
      </Container>
    </section>
  );
}
