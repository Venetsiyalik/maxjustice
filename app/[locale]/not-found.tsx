import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { PhoneIcon, TelegramIcon, ChevronRightIcon } from "@/components/ui/icons";
import { HOMEPAGE_SERVICES, serviceHref } from "@/lib/services-data";
import { siteConfig } from "@/lib/site-config";

export default async function NotFound() {
  const [t, cta, nav, s] = await Promise.all([
    getTranslations("notFound"),
    getTranslations("cta"),
    getTranslations("nav"),
    getTranslations("services"),
  ]);

  return (
    <Container className="flex flex-col items-center gap-6 py-20 text-center">
      <span className="text-7xl font-extrabold text-[var(--color-navy-900)]/10">404</span>
      <h1 className="text-2xl font-extrabold text-[var(--color-navy-950)] sm:text-3xl">
        {t("title")}
      </h1>
      <p className="max-w-md text-[var(--color-muted)]">{t("text")}</p>

      <div className="flex flex-wrap justify-center gap-3">
        <Button href={siteConfig.phone.href} icon={<PhoneIcon className="h-5 w-5" />}>
          {cta("call")}
        </Button>
        <Button
          href={siteConfig.telegram.href}
          variant="outline"
          icon={<TelegramIcon className="h-5 w-5" />}
        >
          {cta("telegram")}
        </Button>
      </div>

      <nav
        aria-label={nav("services")}
        className="mt-6 w-full max-w-xl rounded-2xl border border-[var(--color-line)] p-6 text-left"
      >
        <h2 className="text-sm font-bold uppercase tracking-wide text-[var(--color-muted)]">
          {nav("services")}
        </h2>
        <ul className="mt-3 grid gap-1 sm:grid-cols-2">
          {HOMEPAGE_SERVICES.map(({ slug }) => (
            <li key={slug}>
              <Link
                href={serviceHref(slug)}
                className="flex min-h-[44px] items-center gap-1.5 font-semibold text-[var(--color-navy-800)] hover:text-[var(--color-navy-950)]"
              >
                <ChevronRightIcon className="h-4 w-4 shrink-0 text-[var(--color-gold-600)]" />
                {s(`${slug}.title`)}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-x-6 border-t border-[var(--color-line)] pt-3">
          <Link
            href="/"
            className="flex min-h-[44px] items-center font-semibold text-[var(--color-navy-800)] hover:text-[var(--color-navy-950)]"
          >
            {t("homeLink")}
          </Link>
          <Link
            href="/bog-lanish"
            className="flex min-h-[44px] items-center font-semibold text-[var(--color-navy-800)] hover:text-[var(--color-navy-950)]"
          >
            {nav("contact")}
          </Link>
        </div>
      </nav>
    </Container>
  );
}
