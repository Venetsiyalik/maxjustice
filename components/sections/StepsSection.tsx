import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

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

        <div className="relative mt-12 grid gap-8 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-gold-500)] text-xl font-extrabold text-[var(--color-navy-950)]">
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-bold text-[var(--color-navy-950)]">
                {step.title}
              </h3>
              <p className="mt-2 text-[var(--color-muted)]">{step.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
