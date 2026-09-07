import { Container } from "@/components/ui/Container";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/seo/Breadcrumbs";

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
      <div className="border-b border-[var(--color-line)] bg-[var(--color-surface-alt)] py-10">
        <Container>
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--color-navy-950)] sm:text-4xl">
            {title}
          </h1>
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
