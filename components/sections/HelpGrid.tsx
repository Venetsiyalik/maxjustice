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
    <section className="py-16 lg:py-24">
      <Container>
        <SectionHeading
          title={t("title")}
          subtitle={t("subtitle")}
          align="center"
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HOMEPAGE_SERVICES.map(({ slug, icon: Icon }) => (
            <Link
              key={slug}
              href={serviceHref(slug)}
              className="group flex flex-col gap-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6 transition-all hover:-translate-y-0.5 hover:border-[var(--color-navy-700)] hover:shadow-md"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--color-navy-950)] text-[var(--color-gold-400)]">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-base font-bold text-[var(--color-navy-950)]">
                {s(`${slug}.title`)}
              </span>
              <span className="text-sm text-[var(--color-muted)]">
                {s(`${slug}.cardText`)}
              </span>
              <span className="mt-auto flex items-center gap-1 text-sm font-semibold text-[var(--color-navy-700)] opacity-0 transition-opacity group-hover:opacity-100">
                <ChevronRightIcon className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
