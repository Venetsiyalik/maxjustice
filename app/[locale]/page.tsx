import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { HelpGrid } from "@/components/sections/HelpGrid";
import { TrustSignals } from "@/components/sections/TrustSignals";
import { StepsSection } from "@/components/sections/StepsSection";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { ArticlesPreview } from "@/components/sections/ArticlesPreview";
import { ContactSection } from "@/components/sections/ContactSection";
import { ContactFormSection } from "@/components/sections/ContactFormSection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <HelpGrid />
      <TrustSignals />
      <StepsSection />
      <AboutPreview />
      {/* Blog tayyor bo'lgach (6-bosqich) haqiqiy maqolalar bilan to'ldiriladi */}
      <ArticlesPreview articles={[]} />
      <ContactSection />
      <ContactFormSection source="Bosh sahifa" />
    </>
  );
}
