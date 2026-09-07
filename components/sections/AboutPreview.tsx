import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function AboutPreview() {
  const t = useTranslations("home.aboutBlock");
  const cta = useTranslations("cta");

  return (
    <section className="py-16 lg:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-[0.7fr_1.3fr]">
        {/* TODO: advokatning professional fotosi bilan almashtirish (8.3-band) */}
        <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-navy-800)] to-[var(--color-navy-950)]">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[var(--color-gold-500)] text-2xl font-extrabold text-white">
              NT
            </span>
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
