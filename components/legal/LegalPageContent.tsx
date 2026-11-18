import { Container } from "@/components/ui/Container";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/seo/Breadcrumbs";
import { GoldDivider, PageHeaderOrnament } from "@/components/ui/ornaments";

type Section = { heading: string; text: string };

export function LegalPageContent({
  title,
  lastUpdated,
  sections,
  legalReviewNote,
  breadcrumbs,
}: {
  title: string;
  lastUpdated: string;
  sections: Section[];
  legalReviewNote?: string;
  breadcrumbs: BreadcrumbItem[];
}) {
  return (
    <>
      <div className="paper-texture relative overflow-hidden border-b border-[var(--color-line)] bg-[var(--color-surface-alt)] py-10">
        <PageHeaderOrnament />
        <Container className="relative">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--color-navy-950)] sm:text-4xl">
            {title}
          </h1>
          <GoldDivider className="mt-4" align="left" />
          <p className="mt-2 text-sm text-[var(--color-muted)]">{lastUpdated}</p>
        </Container>
      </div>

      <Container className="max-w-3xl py-12">
        <div className="flex flex-col gap-8">
          {sections.map((section, i) => (
            <div key={i}>
              <h2 className="text-lg font-extrabold text-[var(--color-navy-950)]">
                {section.heading}
              </h2>
              <p className="mt-2 leading-relaxed text-[var(--color-muted)]">{section.text}</p>
            </div>
          ))}
        </div>

        {legalReviewNote && (
          <p className="mt-10 rounded-lg border-l-4 border-[var(--color-gold-500)] bg-[var(--color-surface-alt)] p-4 text-sm text-[var(--color-muted)]">
            {legalReviewNote}
          </p>
        )}
      </Container>
    </>
  );
}
