import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/site-config";
import { SERVICES, serviceHref } from "@/lib/services-data";
import { buildCanonicalUrl } from "@/lib/seo";

/**
 * /llms.txt — AI-yordamchilar (ChatGPT, Gemini, Perplexity) uchun saytning
 * qisqa tavsifi (https://llmstxt.org). Avval public/ da qo'lda yozilgan
 * statik fayl edi va undagi Telegram eskirib qolgan — endi barcha aloqa
 * ma'lumotlari site-config.ts dan, xizmatlar ro'yxati esa services-data'dan
 * olinadi. To'liq uz + ru matni 6-bosqichda kengaytiriladi.
 */
export const dynamic = "force-static";

export async function GET() {
  const t = await getTranslations({ locale: "uz", namespace: "services" });
  const nav = await getTranslations({ locale: "uz", namespace: "nav" });

  const services = SERVICES.map(
    ({ slug }) => `- [${t(`${slug}.title`)}](${buildCanonicalUrl("uz", serviceHref(slug))})`
  ).join("\n");

  const page = (key: string, path: string) => `- [${nav(key)}](${buildCanonicalUrl("uz", path)})`;

  const body = `# ${siteConfig.brandName}

> ${siteConfig.legalName} — Farg'ona shahridagi advokatlik byurosi. Advokat ${siteConfig.founder.fullName} — sobiq IIB tergovchisi, O'zbekiston Respublikasi Advokatlar palatasi a'zosi (litsenziya ${siteConfig.license.number}).

## Aloqa

- Telefon: ${siteConfig.phone.display}
- Telegram: @${siteConfig.telegram.handle} (${siteConfig.telegram.href})
${siteConfig.linkedin ? `- LinkedIn (advokat): ${siteConfig.linkedin}
` : ""}- Email: ${siteConfig.email.info}
- Manzil: ${siteConfig.address.display}
- Sayt: ${siteConfig.url}

## Xizmatlar

${services}

## Asosiy sahifalar

${page("about", "/advokat-haqida")}
${page("services", "/xizmatlar")}
${page("prices", "/narxlar")}
${page("faq", "/savol-javob")}
${page("blog", "/blog")}
${page("contact", "/bog-lanish")}

## Tillar

O'zbek (lotin) — ${buildCanonicalUrl("uz")}, o'zbek (kirill) — ${buildCanonicalUrl("kr")}, rus — ${buildCanonicalUrl("ru")}, ingliz — ${buildCanonicalUrl("en")}.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
