import type { CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { ScalesOrnament } from "@/components/ui/ornaments";
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
    <section className="gold-glow relative isolate overflow-hidden py-16 text-white lg:py-20">
      {/* Fonda adolat tarozisi — juda xira */}
      <ScalesOrnament
        strokeWidth={0.6}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 text-white/[0.035]"
      />
      <Container>
        <SectionHeading title={t("title")} align="center" tone="dark" />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <div
              key={i}
              data-reveal
              style={{ "--reveal-delay": `${i * 0.1}s` } as CSSProperties}
              className="relative flex flex-col items-center gap-3 rounded-md border border-[var(--color-gold-500)]/35 bg-white/[0.03] p-7 text-center outline outline-1 outline-offset-[-7px] outline-white/10 transition-colors duration-300 hover:border-[var(--color-gold-400)]/70"
            >
              <item.icon className="h-8 w-8 text-[var(--color-gold-400)]" />
              {item.value && (
                <p className="font-display text-xl tracking-wide sm:text-2xl">{item.value}</p>
              )}
              <p className="text-sm text-white/70">{item.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
