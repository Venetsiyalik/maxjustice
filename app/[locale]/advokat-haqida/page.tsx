import type { Metadata } from "next";
import Image from "next/image";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema, buildProfilePageSchema } from "@/lib/schema";
import { SERVICES } from "@/lib/services-data";
import { buildCanonicalUrl, buildPageMetadata } from "@/lib/seo";
import { HOMEPAGE_SERVICES, serviceHref } from "@/lib/services-data";
import { Link } from "@/i18n/navigation";
import { CheckIcon, PhoneIcon, MailIcon, FileCheckIcon } from "@/components/ui/icons";
import { siteConfig } from "@/lib/site-config";

const PATH = "/advokat-haqida";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "aboutPage" });

  return buildPageMetadata({
    locale,
    path: PATH,
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale;
  setRequestLocale(locale);

  const [t, nav, s, f, common] = await Promise.all([
    getTranslations({ locale, namespace: "aboutPage" }),
    getTranslations({ locale, namespace: "nav" }),
    getTranslations({ locale, namespace: "services" }),
    getTranslations({ locale, namespace: "footer" }),
    getTranslations({ locale, namespace: "common" }),
  ]);

  const breadcrumbUrls = [
    { name: nav("home"), url: buildCanonicalUrl(locale, "") },
    { name: t("title"), url: buildCanonicalUrl(locale, PATH) },
  ];

  const sections = [
    { title: t("educationTitle"), text: t("educationText") },
    { title: t("experienceTitle"), text: t("experienceText") },
    { title: t("advocacyTitle"), text: t("advocacyText") },
    { title: t("firmsTitle"), text: t("firmsText") },
    { title: t("academicTitle"), text: t("academicText") },
  ];

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(breadcrumbUrls)} />
      <JsonLd
        data={buildProfilePageSchema(locale, {
          name: t("heroName"),
          jobTitle: common("jobTitle"),
          description: t("heroSubtitle"),
          alumniName: t("alumniName"),
          knowsAbout: SERVICES.map(({ slug }) => s(`${slug}.title`)),
        })}
      />

      <div className="border-b border-[var(--color-line)] bg-[var(--color-surface-alt)] py-10">
        <Container>
          <Breadcrumbs items={[{ label: nav("home"), href: "/" }, { label: t("title") }]} />

          <div className="mt-6 flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
            <div className="relative aspect-[4/5] w-44 shrink-0 overflow-hidden rounded-2xl bg-[#7d8a98] shadow-lg ring-4 ring-white sm:w-56">
              <Image
                src={siteConfig.founder.photo.src}
                alt={t("heroName")}
                fill
                priority
                sizes="224px"
                className="object-cover object-top"
              />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-[var(--color-navy-950)] sm:text-4xl">
                {t("heroName")}
              </h1>
              <p className="mt-2 text-lg text-[var(--color-muted)]">{t("heroSubtitle")}</p>

              <div className="mt-4 flex flex-col items-center gap-1 sm:items-start">
                <span className="text-xs font-bold uppercase tracking-wide text-[var(--color-muted)]">
                  {t("directContactLabel")}
                </span>
                <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 sm:justify-start">
                  <a
                    href={siteConfig.phone.href}
                    className="flex items-center gap-1.5 font-semibold text-[var(--color-navy-800)] hover:text-[var(--color-navy-950)]"
                  >
                    <PhoneIcon className="h-4 w-4 shrink-0 text-[var(--color-gold-600)]" />
                    {siteConfig.phone.display}
                  </a>
                  <a
                    href={`mailto:${siteConfig.email.founder}`}
                    className="flex items-center gap-1.5 font-semibold text-[var(--color-navy-800)] hover:text-[var(--color-navy-950)]"
                  >
                    <MailIcon className="h-4 w-4 shrink-0 text-[var(--color-gold-600)]" />
                    {siteConfig.email.founder}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="max-w-3xl py-12">
        <div className="flex flex-col gap-10">
          {/* Litsenziya — ta'lim va tajriba bloklari yonida alohida qator */}
          <p className="flex items-start gap-2 rounded-lg border border-[var(--color-line)] bg-[var(--color-surface-alt)] px-4 py-3 text-base text-[var(--color-ink)]">
            <FileCheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-gold-600)]" />
            <span>
              <span className="font-bold">
                {f("licensePrefix")} {siteConfig.license.number}
              </span>
              <span className="text-[var(--color-muted)]"> · {f("chamberLabel")}</span>
            </span>
          </p>

          {sections.map((section, i) => (
            <div key={i}>
              <h2 className="text-xl font-extrabold text-[var(--color-navy-950)]">
                {section.title}
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-[var(--color-muted)]">
                {section.text}
              </p>
            </div>
          ))}

          <div>
            <h2 className="text-xl font-extrabold text-[var(--color-navy-950)]">
              {t("specializationsTitle")}
            </h2>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {HOMEPAGE_SERVICES.map(({ slug }) => (
                <li key={slug}>
                  <Link
                    href={serviceHref(slug)}
                    className="flex items-start gap-2 text-[var(--color-ink)] hover:text-[var(--color-navy-800)]"
                  >
                    <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-[var(--color-gold-600)]" />
                    {s(`${slug}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border-l-4 border-[var(--color-gold-500)] bg-[var(--color-surface-alt)] p-6">
            <h2 className="text-xl font-extrabold text-[var(--color-navy-950)]">
              {t("positionTitle")}
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-[var(--color-ink)]">
              {t("positionText")}
            </p>
          </div>
        </div>
      </Container>

      <div className="border-t border-[var(--color-line)] bg-[var(--color-navy-950)] py-12 text-center text-white">
        <Container className="max-w-2xl">
          <h2 className="text-2xl font-extrabold">{t("ctaTitle")}</h2>
          <p className="mt-2 text-white/70">{t("ctaSubtitle")}</p>
          <div className="mt-6 flex justify-center">
            <Button href="/bog-lanish">{nav("contact")}</Button>
          </div>
        </Container>
      </div>
    </>
  );
}
