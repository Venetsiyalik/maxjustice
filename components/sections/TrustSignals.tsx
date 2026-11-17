import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ShieldIcon, FileCheckIcon, DocumentSearchIcon, BriefcaseIcon } from "@/components/ui/icons";
import { siteConfig } from "@/lib/site-config";

export function TrustSignals() {
  const t = useTranslations("home.trustBlock");

  const items = [
    {
      icon: FileCheckIcon,
      label: t("license"),
      // Raqam lotin harfi bilan (L...) — kirill sahifada ham o'girilmaydi.
      value: siteConfig.license.isPlaceholder ? null : siteConfig.license.number,
    },
    {
      icon: ShieldIcon,
      label: t("chamber"),
      value: null,
    },
    {
      icon: DocumentSearchIcon,
      label: t("investigatorExperience"),
      value: `${siteConfig.experience.investigatorYears} ${t("yearsSuffix")}`,
    },
    {
      icon: BriefcaseIcon,
      label: t("advocateExperience"),
      // Haqiqiy raqam kelguncha "TODO" placeholder'ni ko'rsatmaymiz —
      // faqat belgi+yorliq (chamber elementi kabi) ko'rinadi.
      value:
        siteConfig.experience.advocateYears === "TODO"
          ? null
          : `${siteConfig.experience.advocateYears} ${t("yearsSuffix")}`,
    },
  ];

  return (
    <section className="border-y border-[var(--color-line)] bg-[var(--color-navy-950)] py-14 text-white">
      <Container>
        <SectionHeading title={t("title")} align="center" />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-6 text-center"
            >
              <item.icon className="h-7 w-7 text-[var(--color-gold-400)]" />
              {item.value && (
                <p className="text-base font-extrabold sm:text-lg">{item.value}</p>
              )}
              <p className="text-sm text-white/70">{item.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
