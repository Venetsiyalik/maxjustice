import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PhoneIcon, TelegramIcon } from "@/components/ui/icons";
import { siteConfig } from "@/lib/site-config";
import { localizeText } from "@/lib/localize-text";

export function Hero() {
  const t = useTranslations("home.hero");
  const cta = useTranslations("cta");
  const common = useTranslations("common");
  const locale = useLocale();

  return (
    <section className="border-b border-[var(--color-line)] bg-[var(--color-surface-alt)]">
      <Container className="grid items-center gap-10 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-wide text-[var(--color-gold-600)]">
            {t("eyebrow")}
          </p>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-[var(--color-navy-950)] sm:text-4xl lg:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-[var(--color-muted)]">
            {t("subtitle")}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              href={siteConfig.phone.href}
              size="lg"
              icon={<PhoneIcon className="h-5 w-5" />}
            >
              {t("callButton")}
            </Button>
            <Button
              href={siteConfig.telegram.href}
              variant="outline"
              size="lg"
              icon={<TelegramIcon className="h-5 w-5" />}
            >
              {cta("telegram")}
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          {/* Dekorativ oltin ramka — portret ortida, biroz siljigan */}
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border-2 border-[var(--color-gold-500)]/70 sm:translate-x-4 sm:translate-y-4"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#7d8a98] shadow-2xl ring-1 ring-black/5">
            <Image
              src={siteConfig.founder.photo.src}
              alt={localizeText(locale, siteConfig.founder.fullName)}
              fill
              priority
              sizes="(min-width: 1024px) 384px, 90vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--color-navy-950)]/95 via-[var(--color-navy-950)]/60 to-transparent px-5 pb-5 pt-20 text-white">
              <span className="mb-2 block h-0.5 w-10 rounded-full bg-[var(--color-gold-500)]" />
              <p className="text-lg font-bold leading-tight">
                {localizeText(
                  locale,
                  siteConfig.founder.fullName.split(" ").slice(0, 2).join(" ")
                )}
              </p>
              <p className="mt-0.5 text-sm text-white/70">{common("jobTitle")}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
