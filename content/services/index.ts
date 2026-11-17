import type { ServiceSlug } from "@/lib/services-data";
import type { ServiceContent } from "./types";
import { transliterateDeep } from "@/lib/transliterate";
import { fillNapDeep } from "@/lib/nap";

type Loader = () => Promise<{ default: ServiceContent }>;

const uzLoaders: Record<ServiceSlug, Loader> = {
  "jinoiy-ishlar": () => import("./uz/jinoiy-ishlar"),
  "tergovga-qadar": () => import("./uz/tergovga-qadar"),
  "mamuriy-ishlar": () => import("./uz/mamuriy-ishlar"),
  "tadbirkor-himoyasi": () => import("./uz/tadbirkor-himoyasi"),
  "iqtisodiy-jinoyatlar": () => import("./uz/iqtisodiy-jinoyatlar"),
  "fuqarolik-ishlari": () => import("./uz/fuqarolik-ishlari"),
  "oilaviy-nizolar": () => import("./uz/oilaviy-nizolar"),
  "meros-ishlari": () => import("./uz/meros-ishlari"),
  "mehnat-nizolari": () => import("./uz/mehnat-nizolari"),
  shartnomalar: () => import("./uz/shartnomalar"),
  "sudda-vakillik": () => import("./uz/sudda-vakillik"),
};

// ru/en: haqiqiy tarjima tayyor bo'lmagan xizmatlar vaqtincha uz kontentini
// qayta eksport qiladi (content/services/ru|en/*.ts dagi TODO izohiga qarang)
// Partial: yangi xizmat avval faqat uz (+ ru) da yozilishi mumkin — yo'q
// tarjima o'rniga uz matni ko'rsatiladi (sahifa noindex, services-data `locales`)
const ruLoaders: Partial<Record<ServiceSlug, Loader>> = {
  "jinoiy-ishlar": () => import("./ru/jinoiy-ishlar"),
  "tergovga-qadar": () => import("./ru/tergovga-qadar"),
  "mamuriy-ishlar": () => import("./ru/mamuriy-ishlar"),
  "tadbirkor-himoyasi": () => import("./ru/tadbirkor-himoyasi"),
  "iqtisodiy-jinoyatlar": () => import("./ru/iqtisodiy-jinoyatlar"),
  "fuqarolik-ishlari": () => import("./ru/fuqarolik-ishlari"),
  "oilaviy-nizolar": () => import("./ru/oilaviy-nizolar"),
  "meros-ishlari": () => import("./ru/meros-ishlari"),
  "mehnat-nizolari": () => import("./ru/mehnat-nizolari"),
  shartnomalar: () => import("./ru/shartnomalar"),
  "sudda-vakillik": () => import("./ru/sudda-vakillik"),
};

const enLoaders: Partial<Record<ServiceSlug, Loader>> = {
  "jinoiy-ishlar": () => import("./en/jinoiy-ishlar"),
  "tergovga-qadar": () => import("./en/tergovga-qadar"),
  "mamuriy-ishlar": () => import("./en/mamuriy-ishlar"),
  "tadbirkor-himoyasi": () => import("./en/tadbirkor-himoyasi"),
  "iqtisodiy-jinoyatlar": () => import("./en/iqtisodiy-jinoyatlar"),
  "fuqarolik-ishlari": () => import("./en/fuqarolik-ishlari"),
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
  // {phone}/{address} o'rinbosarlari site-config'dan (lib/nap.ts) —
  // kr uchun transliteratsiyadan OLDIN to'ldiriladi
  if (locale === "kr") {
    const uz = (await uzLoaders[slug]()).default;
    return transliterateDeep(fillNapDeep(uz, "uz"));
  }

  const translated = locale === "ru" ? ruLoaders[slug] : locale === "en" ? enLoaders[slug] : undefined;
  if (translated) return fillNapDeep((await translated()).default, locale);
  // uz, yoki tarjimasi hali yo'q xizmat — uz matni
  return fillNapDeep((await uzLoaders[slug]()).default, "uz");
}
