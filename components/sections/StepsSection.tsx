import type { CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GavelOrnament, LawBookOrnament, ScalesOrnament } from "@/components/ui/ornaments";

const STEP_ICONS = [LawBookOrnament, ScalesOrnament, GavelOrnament];
const ROMAN = ["I", "II", "III"];

export function StepsSection() {
  const t = useTranslations("home.stepsBlock");

  const steps = [
    { title: t("step1Title"), text: t("step1Text") },
    { title: t("step2Title"), text: t("step2Text") },
    { title: t("step3Title"), text: t("step3Text") },
  ];

  return (
    <section className="py-16 lg:py-24">
      <Container>
        <SectionHeading title={t("title")} align="center" />

        <ol className="relative mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {/* Bosqichlarni bog'lovchi oltin chiziq (sm+) */}
          <span
            aria-hidden="true"
            className="absolute left-[16.7%] right-[16.7%] top-10 hidden h-px bg-gradient-to-r from-[var(--color-gold-500)]/0 via-[var(--color-gold-500)]/60 to-[var(--color-gold-500)]/0 sm:block"
          />
          {steps.map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <li
                key={i}
                data-reveal
                style={{ "--reveal-delay": `${i * 0.15}s` } as CSSProperties}
                className="relative flex flex-col items-center text-center"
              >
                <span className="relative flex h-20 w-20 items-center justify-center rounded-full border border-[var(--color-gold-500)]/60 bg-[var(--color-surface)] shadow-[0_10px_30px_-12px_rgb(10_22_40/0.35)]">
                  <span className="absolute inset-1.5 rounded-full bg-[var(--color-navy-950)]" />
                  <Icon className="relative h-9 w-9 text-[var(--color-gold-400)]" strokeWidth={3} />
                </span>
                <span className="font-display mt-4 text-sm tracking-[0.3em] text-[var(--color-gold-600)]">
                  {ROMAN[i]}
                </span>
                <h3 className="mt-1 text-lg font-bold text-[var(--color-navy-950)]">{step.title}</h3>
                <p className="mt-2 max-w-xs text-[var(--color-muted)]">{step.text}</p>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
