/**
 * Admin paneldan tahrirlanadigan sozlamalar (content/settings.json) turi va
 * tekshiruvi. siteConfig shu fayldan o'qiydi — NAP uchun yagona manba.
 */
export type OpeningHours = { days: string[]; opens: string; closes: string };

export type SiteSettings = {
  phone: string;
  telegramHandle: string;
  /** Advokatning LinkedIn profili (bo'sh bo'lsa saytda ko'rsatilmaydi) */
  linkedin: string;
  email: { info: string; founder: string; advokat: string };
  address: {
    display: string;
    short: { uz: string; ru: string; en: string };
    street: string;
    locality: string;
    region: string;
    postalCode: string;
    latitude: string;
    longitude: string;
  };
  openingHours: OpeningHours | null;
  sameAs: string[];
  rating: { value: string; reviewCount: string };
};

export const WEEK_DAYS = [
  { value: "Monday", label: "Du" },
  { value: "Tuesday", label: "Se" },
  { value: "Wednesday", label: "Chor" },
  { value: "Thursday", label: "Pay" },
  { value: "Friday", label: "Ju" },
  { value: "Saturday", label: "Sha" },
  { value: "Sunday", label: "Yak" },
] as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;

/** Telefonni "+998 XX XXX XX XX" ko'rinishiga keltiradi; noto'g'ri bo'lsa null. */
export function normalizePhone(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  const full = digits.length === 9 ? `998${digits}` : digits;
  if (!/^998\d{9}$/.test(full)) return null;
  const d = full.slice(3);
  return `+998 ${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5, 7)} ${d.slice(7, 9)}`;
}

export function phoneHref(display: string): string {
  return `tel:+${display.replace(/\D/g, "")}`;
}

/** Xatolar ro'yxatini qaytaradi (bo'sh — hammasi to'g'ri). */
export function validateSettings(s: SiteSettings): string[] {
  const errors: string[] = [];
  if (!normalizePhone(s.phone)) errors.push("Telefon raqami +998 XX XXX XX XX koʻrinishida boʻlsin");
  if (!/^[A-Za-z0-9_]{5,32}$/.test(s.telegramHandle)) errors.push("Telegram nomi notoʻgʻri (@ siz, 5–32 belgi)");
  if (s.linkedin && !/^https:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/.test(s.linkedin)) {
    errors.push("LinkedIn havolasi https://www.linkedin.com/in/... koʻrinishida boʻlsin");
  }
  for (const [key, value] of Object.entries(s.email)) {
    if (!EMAIL.test(value)) errors.push(`Email notoʻgʻri: ${key}`);
  }
  const a = s.address;
  for (const [key, value] of Object.entries({
    display: a.display,
    "short.uz": a.short.uz,
    "short.ru": a.short.ru,
    "short.en": a.short.en,
    street: a.street,
    locality: a.locality,
    region: a.region,
  })) {
    if (!value.trim()) errors.push(`Manzil maydoni boʻsh: ${key}`);
  }
  if (!/^\d{6}$/.test(a.postalCode)) errors.push("Pochta indeksi 6 ta raqam boʻlsin");
  const lat = Number(a.latitude);
  const lon = Number(a.longitude);
  if (!(lat >= 37 && lat <= 46) || !(lon >= 55 && lon <= 74)) {
    errors.push("Koordinatalar Oʻzbekiston hududida emas");
  }
  if (s.openingHours) {
    if (!s.openingHours.days.length) errors.push("Ish kunlaridan kamida bittasini tanlang");
    if (!TIME.test(s.openingHours.opens) || !TIME.test(s.openingHours.closes)) {
      errors.push("Ish vaqti SS:DD koʻrinishida boʻlsin (masalan 09:00)");
    }
  }
  for (const url of s.sameAs) {
    if (!/^https:\/\/\S+$/.test(url)) errors.push(`Havola https:// bilan boshlansin: ${url}`);
  }
  if (!/^[1-5](\.\d)?$/.test(s.rating.value)) errors.push("Reyting 1–5 oraligʻida (masalan 5.0)");
  if (!/^\d+$/.test(s.rating.reviewCount)) errors.push("Sharhlar soni butun son boʻlsin");
  return errors;
}
