import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PhoneIcon, TelegramIcon, FileCheckIcon } from "@/components/ui/icons";
import { CourthouseOrnament, ScalesOrnament } from "@/components/ui/ornaments";
import { siteConfig } from "@/lib/site-config";
import { localizeText } from "@/lib/localize-text";

export function Hero() {
  const t = useTranslations("home.hero");
  const cta = useTranslations("cta");
  const common = useTranslations("common");
  const footer = useTranslations("footer");
  const locale = useLocale();

  return (
    <section className="gold-glow relative isolate overflow-hidden text-white">
      {/* Fon: sud binosi silueti va nozik to'r — faqat bezak */}
      <CourthouseOrnament
        strokeWidth={0.8}
        className="animate-ornament pointer-events-none absolute -bottom-10 -left-16 -z-10 w-[720px] max-w-none text-white/[0.06] lg:-left-10 lg:w-[880px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(rgb(255_255_255/0.6)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.6)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(70%_70%_at_30%_40%,black,transparent)]"
      />

      <Container className="grid items-center gap-12 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
        <div>
          <p className="animate-fade-up mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold-400)]">
            <span className="animate-draw h-px w-10 bg-[var(--color-gold-400)]" aria-hidden="true" />
            {t("eyebrow")}
          </p>
          <h1 className="text-4xl leading-[1.12] text-white sm:text-5xl lg:text-[3.6rem]">
            {t("title")}
          </h1>
          <p className="animate-fade-up delay-1 mt-6 max-w-xl text-lg leading-relaxed text-white/75">
            {t("subtitle")}
          </p>

          <div className="animate-fade-up delay-2 mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href={siteConfig.phone.href} size="lg" icon={<PhoneIcon className="h-5 w-5" />}>
              {t("callButton")}
            </Button>
            <Button
              href={siteConfig.telegram.href}
              variant="outlineLight"
              size="lg"
              icon={<TelegramIcon className="h-5 w-5" />}
            >
              {cta("telegram")}
            </Button>
          </div>

          {/* Rasmiy maqom: litsenziya va palata a'zoligi */}
          <div className="animate-fade-up delay-3 mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-sm text-white/70">
            <span className="flex items-center gap-2">
              <FileCheckIcon className="h-5 w-5 shrink-0 text-[var(--color-gold-400)]" />
              {footer("licensePrefix")}{" "}
              <span className="font-semibold text-white">{siteConfig.license.number}</span>
            </span>
            <span className="flex items-center gap-2">
              <ScalesOrnament className="h-5 w-5 shrink-0 text-[var(--color-gold-400)]" strokeWidth={6} />
              {footer("chamberLabel")}
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          {/* Dekorativ oltin ramka — portret ortida, biroz siljigan */}
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-[var(--color-gold-400)]/70 sm:translate-x-4 sm:translate-y-4"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#7d8a98] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)] ring-1 ring-white/10">
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
              <p className="font-display text-xl leading-tight">
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
