import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import { LawBookOrnament } from "@/components/ui/ornaments";

export function ContactFormSection({ source }: { source?: string }) {
  const t = useTranslations("home.formBlock");

  return (
    <section className="gold-glow relative isolate overflow-hidden py-16 lg:py-24">
      <LawBookOrnament
        strokeWidth={0.7}
        className="pointer-events-none absolute -left-20 bottom-[-60px] -z-10 hidden h-[420px] w-[420px] text-white/[0.05] lg:block"
      />
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="text-white">
          <SectionHeading title={t("title")} subtitle={t("subtitle")} tone="dark" />
        </div>

        <div
          data-reveal
          className="rounded-lg border-t-[3px] border-[var(--color-gold-500)] bg-white p-6 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.5)] sm:p-8"
        >
          <ContactForm source={source} />
        </div>
      </Container>
    </section>
  );
}
