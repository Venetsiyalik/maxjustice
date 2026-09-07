import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";

export function ContactFormSection({ source }: { source?: string }) {
  const t = useTranslations("home.formBlock");

  return (
    <section className="border-t border-[var(--color-line)] bg-[var(--color-navy-950)] py-16 lg:py-24">
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="text-white">
          <SectionHeading
            title={<span className="text-white">{t("title")}</span>}
            subtitle={<span className="text-white/70">{t("subtitle")}</span>}
          />
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-8">
          <ContactForm source={source} />
        </div>
      </Container>
    </section>
  );
}
