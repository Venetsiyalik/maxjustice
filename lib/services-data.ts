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
  | "oila-va-meros"
  | "mehnat-nizolari"
  | "shartnomalar"
  | "sudda-vakillik";

type ServiceMeta = {
  slug: ServiceSlug;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** Bosh sahifadagi "yordam" blokida ko'rsatiladimi (5–8 ta, 5.1-band) */
  onHomepage: boolean;
};

export const SERVICES: ServiceMeta[] = [
  { slug: "jinoiy-ishlar", icon: ShieldIcon, onHomepage: true },
  { slug: "tergovga-qadar", icon: DocumentSearchIcon, onHomepage: true },
  { slug: "mamuriy-ishlar", icon: FileCheckIcon, onHomepage: true },
  { slug: "tadbirkor-himoyasi", icon: BriefcaseIcon, onHomepage: true },
  { slug: "iqtisodiy-jinoyatlar", icon: BuildingIcon, onHomepage: true },
  { slug: "fuqarolik-ishlari", icon: UsersIcon, onHomepage: true },
  { slug: "oila-va-meros", icon: HomeHeartIcon, onHomepage: true },
  { slug: "mehnat-nizolari", icon: HandshakeIcon, onHomepage: false },
  { slug: "shartnomalar", icon: HandshakeIcon, onHomepage: false },
  { slug: "sudda-vakillik", icon: ShieldIcon, onHomepage: true },
];

export const HOMEPAGE_SERVICES = SERVICES.filter((s) => s.onHomepage);

export function serviceHref(slug: ServiceSlug) {
  return `/xizmatlar/${slug}`;
}
