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

        {/* TODO: advokatning studiya sifatidagi professional fotosi bilan almashtirish (8.3-band) */}
        <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-navy-900)] to-[var(--color-navy-950)] shadow-xl">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white">
            <span className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-[var(--color-gold-500)] text-3xl font-extrabold">
              NT
            </span>
            <div className="text-center">
              <p className="text-lg font-bold">
                {localizeText(
                  locale,
                  siteConfig.founder.fullName.split(" ").slice(0, 2).join(" ")
                )}
              </p>
              <p className="text-sm text-white/60">{common("jobTitle")}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
