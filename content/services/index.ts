import type { ServiceSlug } from "@/lib/services-data";
import type { ServiceContent } from "./types";
import { transliterateDeep } from "@/lib/transliterate";

type Loader = () => Promise<{ default: ServiceContent }>;

const uzLoaders: Record<ServiceSlug, Loader> = {
  "jinoiy-ishlar": () => import("./uz/jinoiy-ishlar"),
  "tergovga-qadar": () => import("./uz/tergovga-qadar"),
  "mamuriy-ishlar": () => import("./uz/mamuriy-ishlar"),
  "tadbirkor-himoyasi": () => import("./uz/tadbirkor-himoyasi"),
  "iqtisodiy-jinoyatlar": () => import("./uz/iqtisodiy-jinoyatlar"),
  "fuqarolik-ishlari": () => import("./uz/fuqarolik-ishlari"),
  "oila-va-meros": () => import("./uz/oila-va-meros"),
  "mehnat-nizolari": () => import("./uz/mehnat-nizolari"),
  shartnomalar: () => import("./uz/shartnomalar"),
  "sudda-vakillik": () => import("./uz/sudda-vakillik"),
};

// ru/en: haqiqiy tarjima tayyor bo'lmagan xizmatlar vaqtincha uz kontentini
// qayta eksport qiladi (content/services/ru|en/*.ts dagi TODO izohiga qarang)
const ruLoaders: Record<ServiceSlug, Loader> = {
  "jinoiy-ishlar": () => import("./ru/jinoiy-ishlar"),
  "tergovga-qadar": () => import("./ru/tergovga-qadar"),
  "mamuriy-ishlar": () => import("./ru/mamuriy-ishlar"),
  "tadbirkor-himoyasi": () => import("./ru/tadbirkor-himoyasi"),
  "iqtisodiy-jinoyatlar": () => import("./ru/iqtisodiy-jinoyatlar"),
  "fuqarolik-ishlari": () => import("./ru/fuqarolik-ishlari"),
  "oila-va-meros": () => import("./ru/oila-va-meros"),
  "mehnat-nizolari": () => import("./ru/mehnat-nizolari"),
  shartnomalar: () => import("./ru/shartnomalar"),
  "sudda-vakillik": () => import("./ru/sudda-vakillik"),
};

const enLoaders: Record<ServiceSlug, Loader> = {
  "jinoiy-ishlar": () => import("./en/jinoiy-ishlar"),
  "tergovga-qadar": () => import("./en/tergovga-qadar"),
  "mamuriy-ishlar": () => import("./en/mamuriy-ishlar"),
  "tadbirkor-himoyasi": () => import("./en/tadbirkor-himoyasi"),
  "iqtisodiy-jinoyatlar": () => import("./en/iqtisodiy-jinoyatlar"),
  "fuqarolik-ishlari": () => import("./en/fuqarolik-ishlari"),
  "oila-va-meros": () => import("./en/oila-va-meros"),
  "mehnat-nizolari": () => import("./en/mehnat-nizolari"),
  shartnomalar: () => import("./en/shartnomalar"),
  "sudda-vakillik": () => import("./en/sudda-vakillik"),
};

/**
 * Berilgan locale va slug uchun xizmat sahifasi kontentini yuklaydi.
 * "kr" uchun alohida fayl yo'q — uz kontentidan avtomatik transliteratsiya
 * qilinadi (3.2-band).
 */
export async function getServiceContent(
  locale: string,
  slug: ServiceSlug
): Promise<ServiceContent> {
  if (locale === "kr") {
    const uz = (await uzLoaders[slug]()).default;
    return transliterateDeep(uz);
  }

  if (locale === "ru") {
    return (await ruLoaders[slug]()).default;
  }

  if (locale === "en") {
    return (await enLoaders[slug]()).default;
  }

  return (await uzLoaders[slug]()).default;
}
