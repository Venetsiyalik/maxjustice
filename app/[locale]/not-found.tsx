import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  const cta = await getTranslations("cta");

  return (
    <Container className="flex flex-col items-center gap-6 py-24 text-center">
      <span className="text-7xl font-extrabold text-[var(--color-navy-900)]/10">
        404
      </span>
      <h1 className="text-2xl font-extrabold text-[var(--color-navy-950)] sm:text-3xl">
        {t("title")}
      </h1>
      <p className="max-w-md text-[var(--color-muted)]">{t("text")}</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button href="/">{t("homeLink")}</Button>
        <Button href={siteConfig.phone.href} variant="outline">
          {cta("call")}
        </Button>
      </div>
    </Container>
  );
}
