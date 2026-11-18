import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";
import { localizeText } from "@/lib/localize-text";

export function AboutPreview() {
  const locale = useLocale();
  const t = useTranslations("home.aboutBlock");
  const cta = useTranslations("cta");

  return (
    <section className="py-16 lg:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="relative mx-auto w-full max-w-xs">
          <div
            aria-hidden="true"
            className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-[var(--color-gold-500)]/25 to-transparent"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#7d8a98] shadow-lg ring-1 ring-black/5">
            <Image
              src={siteConfig.founder.photo.src}
              alt={localizeText(locale, siteConfig.founder.fullName)}
              fill
              sizes="320px"
              className="object-cover object-top"
            />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-[var(--color-navy-950)] sm:text-3xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--color-muted)]">
            {t("text")}
          </p>
          <div className="mt-6">
            <Button href="/advokat-haqida" variant="outline">
              {cta("readMore")}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
