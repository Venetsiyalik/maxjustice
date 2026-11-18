import type { CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Link } from "@/i18n/navigation";
import { ChevronRightIcon } from "@/components/ui/icons";
import { HOMEPAGE_SERVICES, serviceHref } from "@/lib/services-data";

export function HelpGrid() {
  const t = useTranslations("home.helpBlock");
  const s = useTranslations("services");

  return (
    <section className="paper-texture py-16 lg:py-24">
      <Container>
        <SectionHeading
          title={t("title")}
          subtitle={t("subtitle")}
          align="center"
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {HOMEPAGE_SERVICES.map(({ slug, icon: Icon }, i) => (
            <Link
              key={slug}
              href={serviceHref(slug)}
              data-reveal
              style={{ "--reveal-delay": `${(i % 3) * 0.08}s` } as CSSProperties}
              className="card-gold-rule group flex flex-col gap-3 rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-6 shadow-[0_1px_2px_rgb(10_22_40/0.04)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[var(--color-gold-500)]/50 hover:shadow-[0_18px_40px_-18px_rgb(10_22_40/0.35)]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-md bg-[var(--color-navy-950)] text-[var(--color-gold-400)] ring-1 ring-[var(--color-gold-500)]/40 ring-offset-2 transition-transform duration-300 group-hover:scale-105">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-base font-bold text-[var(--color-navy-950)]">
                {s(`${slug}.title`)}
              </span>
              <span className="text-sm text-[var(--color-muted)]">
                {s(`${slug}.cardText`)}
              </span>
              <span className="mt-auto flex items-center gap-1 text-sm font-semibold text-[var(--color-gold-600)] transition-transform duration-300 group-hover:translate-x-1">
                <ChevronRightIcon className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
