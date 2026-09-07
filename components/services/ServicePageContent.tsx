import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/seo/Breadcrumbs";
import { ContactForm } from "@/components/forms/ContactForm";
import { CheckIcon, PhoneIcon, TelegramIcon } from "@/components/ui/icons";
import { siteConfig } from "@/lib/site-config";
import type { ServiceContent } from "@/content/services/types";

export function ServicePageContent({
  content,
  breadcrumbs,
}: {
  content: ServiceContent;
  breadcrumbs: BreadcrumbItem[];
}) {
  const cta = useTranslations("cta");
  const labels = useTranslations("servicePage");

  return (
    <>
      <div className="border-b border-[var(--color-line)] bg-[var(--color-surface-alt)] py-8">
        <Container>
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-[var(--color-navy-950)] sm:text-4xl">
            {content.h1}
          </h1>

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
