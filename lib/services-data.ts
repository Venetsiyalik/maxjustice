import type { ComponentType, SVGProps } from "react";
import {
  ShieldIcon,
  DocumentSearchIcon,
  BuildingIcon,
  BriefcaseIcon,
  UsersIcon,
  HomeHeartIcon,
  HandshakeIcon,
  FileCheckIcon,
} from "@/components/ui/icons";

export type ServiceSlug =
  | "jinoiy-ishlar"
  | "tergovga-qadar"
  | "mamuriy-ishlar"
  | "tadbirkor-himoyasi"
  | "iqtisodiy-jinoyatlar"
  | "fuqarolik-ishlari"
  | "oilaviy-nizolar"
  | "meros-ishlari"
  | "mehnat-nizolari"
  | "shartnomalar"
  | "sudda-vakillik"
  | "huquqiy-konsultatsiya"
  | "iqtisodiy-nizolar";

type ServiceMeta = {
  slug: ServiceSlug;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** Bosh sahifadagi "yordam" blokida ko'rsatiladimi (5–8 ta, 5.1-band) */
  onHomepage: boolean;
  /**
   * «Tergovchilik tajribasi afzalligi» bloki chiqadimi — faqat IIB
   * tergovchisi tajribasi haqiqatan foyda beradigan yo'nalishlarda.
   */
  investigatorAdvantage?: boolean;
  /** «Bog'liq xizmatlar» blokidagi ichki havolalar (2–3 ta) */
  related: ServiceSlug[];
  /**
   * Matni haqiqatan yozilgan tillar. Berilmasa — barcha tillar. Ro'yxatda
   * yo'q til sahifasi uz matnini ko'rsatadi, `noindex` va sitemap/hreflang
   * dan tashqarida bo'ladi (blogdagi kabi).
   */
  locales?: readonly string[];
};

export const SERVICES: ServiceMeta[] = [
  {
    slug: "jinoiy-ishlar",
    icon: ShieldIcon,
    onHomepage: true,
    investigatorAdvantage: true,
    related: ["tergovga-qadar", "sudda-vakillik", "iqtisodiy-jinoyatlar"],
  },
  {
    slug: "tergovga-qadar",
    icon: DocumentSearchIcon,
    onHomepage: true,
    investigatorAdvantage: true,
    related: ["jinoiy-ishlar", "mamuriy-ishlar", "tadbirkor-himoyasi"],
  },
  {
    slug: "mamuriy-ishlar",
    icon: FileCheckIcon,
    onHomepage: true,
    investigatorAdvantage: true,
    related: ["tergovga-qadar", "sudda-vakillik", "jinoiy-ishlar"],
  },
  {
    slug: "tadbirkor-himoyasi",
    icon: BriefcaseIcon,
    onHomepage: true,
    investigatorAdvantage: true,
    related: ["iqtisodiy-jinoyatlar", "iqtisodiy-nizolar", "tergovga-qadar"],
  },
  {
    slug: "iqtisodiy-jinoyatlar",
    icon: BuildingIcon,
    onHomepage: true,
    investigatorAdvantage: true,
    related: ["tadbirkor-himoyasi", "jinoiy-ishlar", "tergovga-qadar"],
  },
  {
    slug: "fuqarolik-ishlari",
    icon: UsersIcon,
    onHomepage: true,
    related: ["shartnomalar", "iqtisodiy-nizolar", "sudda-vakillik"],
  },
  {
    slug: "oilaviy-nizolar",
    icon: HomeHeartIcon,
    onHomepage: true,
    related: ["meros-ishlari", "fuqarolik-ishlari", "sudda-vakillik"],
    // en matni hali yozilmagan — en sahifa noindex
    locales: ["uz", "kr", "ru"],
  },
  {
    slug: "meros-ishlari",
    icon: FileCheckIcon,
    onHomepage: true,
    related: ["oilaviy-nizolar", "fuqarolik-ishlari", "sudda-vakillik"],
    locales: ["uz", "kr", "ru"],
  },
  {
    slug: "mehnat-nizolari",
    icon: HandshakeIcon,
    onHomepage: false,
    related: ["fuqarolik-ishlari", "sudda-vakillik", "huquqiy-konsultatsiya"],
  },
  {
    slug: "shartnomalar",
    icon: HandshakeIcon,
    onHomepage: false,
    related: ["iqtisodiy-nizolar", "tadbirkor-himoyasi", "fuqarolik-ishlari"],
  },
  {
    slug: "iqtisodiy-nizolar",
    icon: BuildingIcon,
    onHomepage: false,
    related: ["shartnomalar", "tadbirkor-himoyasi", "fuqarolik-ishlari"],
    // en matni hali yozilmagan — en sahifa noindex
    locales: ["uz", "kr", "ru"],
  },
  {
    slug: "huquqiy-konsultatsiya",
    icon: DocumentSearchIcon,
    onHomepage: false,
    related: ["jinoiy-ishlar", "fuqarolik-ishlari", "oilaviy-nizolar"],
    locales: ["uz", "kr", "ru"],
  },
  {
    slug: "sudda-vakillik",
    icon: ShieldIcon,
    onHomepage: true,
    related: ["jinoiy-ishlar", "fuqarolik-ishlari", "mamuriy-ishlar"],
  },
];

export const HOMEPAGE_SERVICES = SERVICES.filter((s) => s.onHomepage);

export function serviceHref(slug: ServiceSlug) {
  return `/xizmatlar/${slug}`;
}

export function getServiceMeta(slug: ServiceSlug): ServiceMeta {
  const meta = SERVICES.find((s) => s.slug === slug);
  if (!meta) throw new Error(`Noma'lum xizmat: ${slug}`);
  return meta;
}

/** Xizmat matni shu tilda haqiqatan yozilganmi (aks holda noindex) */
export function isServiceTranslated(slug: ServiceSlug, locale: string): boolean {
  const { locales } = getServiceMeta(slug);
  return !locales || locales.includes(locale);
}
