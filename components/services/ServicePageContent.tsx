import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/seo/Breadcrumbs";
import { ContactForm } from "@/components/forms/ContactForm";
import {
  CheckIcon,
  PhoneIcon,
  TelegramIcon,
  ChevronRightIcon,
  DocumentSearchIcon,
} from "@/components/ui/icons";
import { Link } from "@/i18n/navigation";
import { ArticleLink } from "@/components/blog/ArticleLink";
import { siteConfig } from "@/lib/site-config";
import type { ServiceContent } from "@/content/services/types";
import { GoldDivider, PageHeaderOrnament } from "@/components/ui/ornaments";

export type RelatedLink = { href: string; title: string };
export type RelatedArticle = { slug: string; title: string };

export function ServicePageContent({
  content,
  breadcrumbs,
  showInvestigator,
  relatedServices,
  relatedArticles,
  articlesUzOnly,
}: {
  content: ServiceContent;
  breadcrumbs: BreadcrumbItem[];
  /** services-data.ts → investigatorAdvantage */
  showInvestigator: boolean;
  relatedServices: RelatedLink[];
  relatedArticles: RelatedArticle[];
  /** ru/en: maqolalar hali faqat o'zbekcha */
  articlesUzOnly: boolean;
}) {
  const cta = useTranslations("cta");
  const labels = useTranslations("servicePage");
  const common = useTranslations("common");
  const blog = useTranslations("blogPage");

  return (
    <>
      <div className="paper-texture relative overflow-hidden border-b border-[var(--color-line)] bg-[var(--color-surface-alt)] py-8">
        <PageHeaderOrnament />
        <Container className="relative">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-[var(--color-navy-950)] sm:text-4xl">
            {content.h1}
          </h1>
          <GoldDivider className="mt-4" align="left" />

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href={siteConfig.phone.href} icon={<PhoneIcon className="h-5 w-5" />}>
              {siteConfig.phone.display}
            </Button>
            <Button
              href={siteConfig.telegram.href}
              variant="outline"
              icon={<TelegramIcon className="h-5 w-5" />}
            >
              {cta("telegram")}
            </Button>
          </div>
        </Container>
      </div>

      <Container className="max-w-3xl py-12">
        <p className="rounded-xl border-l-4 border-[var(--color-gold-500)] bg-[var(--color-surface-alt)] p-5 text-lg leading-relaxed text-[var(--color-ink)]">
          {content.quickAnswer}
        </p>

        <div className="mt-8 flex flex-col gap-4">
          {content.problemParagraphs.map((p, i) => (
            <p key={i} className="text-lg leading-relaxed text-[var(--color-muted)]">
              {p}
            </p>
          ))}
        </div>
      </Container>

      <div className="bg-[var(--color-surface-alt)] py-12">
        <Container className="max-w-3xl">
          <h2 className="text-2xl font-extrabold text-[var(--color-navy-950)]">
            {labels("tipsTitle")}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {content.practicalTips.map((tip, i) => (
              <div
                key={i}
                className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-5"
              >
                <p className="font-bold text-[var(--color-navy-950)]">{tip.title}</p>
                <p className="mt-1.5 text-sm text-[var(--color-muted)]">{tip.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      <Container className="max-w-3xl py-12">
        <h2 className="text-2xl font-extrabold text-[var(--color-navy-950)]">
          {labels("howIHelpTitle")}
        </h2>
        <ul className="mt-6 flex flex-col gap-3">
          {content.howIHelp.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy-950)] text-[var(--color-gold-400)]">
                <CheckIcon className="h-3.5 w-3.5" />
              </span>
              <span className="text-lg text-[var(--color-ink)]">{item}</span>
            </li>
          ))}
        </ul>

        {showInvestigator && (
          <div className="mt-10 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface-alt)] p-6">
            <h2 className="flex items-center gap-2.5 text-xl font-extrabold text-[var(--color-navy-950)]">
              <DocumentSearchIcon className="h-6 w-6 shrink-0 text-[var(--color-gold-600)]" />
              {labels("investigatorTitle")}
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-[var(--color-ink)]">
              {content.investigatorNote ?? labels("investigatorText")}
            </p>
          </div>
        )}

        {content.documents && content.documents.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-extrabold text-[var(--color-navy-950)]">
              {labels("documentsTitle")}
            </h2>
            <ul className="mt-5 flex flex-col gap-2.5">
              {content.documents.map((doc, i) => (
                <li key={i} className="flex items-start gap-2.5 text-lg text-[var(--color-ink)]">
                  <CheckIcon className="mt-1.5 h-4 w-4 shrink-0 text-[var(--color-gold-600)]" />
                  {doc}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>

      <div className="bg-[var(--color-navy-950)] py-12 text-white">
        <Container className="max-w-3xl">
          <h2 className="text-2xl font-extrabold">{labels("processTitle")}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {content.processSteps.map((step, i) => (
              <div key={i} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-gold-500)] font-extrabold text-[var(--color-navy-950)]">
                  {i + 1}
                </span>
                <div>
                  <p className="font-bold">{step.title}</p>
                  <p className="mt-1 text-sm text-white/70">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      <Container className="max-w-3xl py-12">
        <h2 className="text-2xl font-extrabold text-[var(--color-navy-950)]">
          {labels("faqTitle")}
        </h2>
        <div className="mt-6 flex flex-col gap-3">
          {content.faq.map((item, i) => (
            <details
              key={i}
              className="group rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-5 open:shadow-sm"
            >
              <summary className="cursor-pointer list-none font-bold text-[var(--color-navy-950)] marker:content-none">
                <span className="flex items-center justify-between gap-4">
                  {item.question}
                  <span className="shrink-0 text-[var(--color-gold-600)] transition-transform group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-[var(--color-muted)]">{item.answer}</p>
            </details>
          ))}
        </div>

        {(relatedServices.length > 0 || relatedArticles.length > 0) && (
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {relatedServices.length > 0 && (
              <nav aria-label={labels("relatedServicesTitle")}>
                <h2 className="text-lg font-extrabold text-[var(--color-navy-950)]">
                  {labels("relatedServicesTitle")}
                </h2>
                <ul className="mt-3 flex flex-col">
                  {relatedServices.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="flex min-h-[44px] items-center gap-1.5 font-semibold text-[var(--color-navy-800)] hover:text-[var(--color-navy-950)]"
                      >
                        <ChevronRightIcon className="h-4 w-4 shrink-0 text-[var(--color-gold-600)]" />
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
            {relatedArticles.length > 0 && (
              <nav aria-label={labels("relatedArticlesTitle")}>
                <h2 className="text-lg font-extrabold text-[var(--color-navy-950)]">
                  {labels("relatedArticlesTitle")}
                </h2>
                <ul className="mt-3 flex flex-col">
                  {relatedArticles.map((article) => (
                    <li key={article.slug}>
                      <ArticleLink
                        slug={article.slug}
                        uzOnly={articlesUzOnly}
                        className="flex min-h-[44px] items-center gap-1.5 font-semibold text-[var(--color-navy-800)] hover:text-[var(--color-navy-950)]"
                      >
                        <ChevronRightIcon className="h-4 w-4 shrink-0 text-[var(--color-gold-600)]" />
                        <span>
                          {article.title}
                          {articlesUzOnly && (
                            <span className="ml-2 text-xs font-medium text-[var(--color-muted)]">
                              ({blog("uzOnlyBadge")})
                            </span>
                          )}
                        </span>
                      </ArticleLink>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        )}

        <p className="mt-12 border-t border-[var(--color-line)] pt-6 text-sm italic text-[var(--color-muted)]">
          {common("legalDisclaimer")}
        </p>
      </Container>

      <div className="border-t border-[var(--color-line)] bg-[var(--color-surface-alt)] py-12">
        <Container className="grid max-w-5xl gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-extrabold text-[var(--color-navy-950)]">
              {labels("ctaTitle")}
            </h2>
            <p className="mt-2 text-[var(--color-muted)]">{labels("ctaSubtitle")}</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-md sm:p-8">
            <ContactForm source={content.h1} />
          </div>
        </Container>
      </div>
    </>
  );
}
