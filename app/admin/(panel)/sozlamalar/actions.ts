"use server";

import { requireAdmin } from "@/lib/admin/auth";
import { saveRepoFile } from "@/lib/admin/github";
import {
  normalizePhone,
  validateSettings,
  WEEK_DAYS,
  type SiteSettings,
} from "@/lib/settings-schema";

export type SettingsState = {
  status: "idle" | "saved" | "error";
  errors?: string[];
  mode?: "github" | "local";
  /** Yuborilgan qiymatlar — forma xatodan keyin ham ularni ko'rsatsin */
  values?: SiteSettings;
};

const SETTINGS_PATH = "content/settings.json";

function field(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

export async function saveSettings(_prev: SettingsState, formData: FormData): Promise<SettingsState> {
  const session = await requireAdmin();

  const hoursEnabled = formData.get("hoursEnabled") === "on";
  const settings: SiteSettings = {
    phone: normalizePhone(field(formData, "phone")) ?? field(formData, "phone"),
    telegramHandle: field(formData, "telegramHandle").replace(/^@/, ""),
    email: {
      info: field(formData, "email.info"),
      founder: field(formData, "email.founder"),
      advokat: field(formData, "email.advokat"),
    },
    address: {
      display: field(formData, "address.display"),
      short: {
        uz: field(formData, "address.short.uz"),
        ru: field(formData, "address.short.ru"),
        en: field(formData, "address.short.en"),
      },
      street: field(formData, "address.street"),
      locality: field(formData, "address.locality"),
      region: field(formData, "address.region"),
      postalCode: field(formData, "address.postalCode"),
      latitude: field(formData, "address.latitude"),
      longitude: field(formData, "address.longitude"),
    },
    openingHours: hoursEnabled
      ? {
          days: WEEK_DAYS.map((d) => d.value).filter((d) => formData.get(`day.${d}`) === "on"),
          opens: field(formData, "opens"),
          closes: field(formData, "closes"),
        }
      : null,
    sameAs: field(formData, "sameAs")
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean),
    rating: {
      value: field(formData, "rating.value"),
      reviewCount: field(formData, "rating.reviewCount"),
    },
  };

  const errors = validateSettings(settings);
  if (errors.length) return { status: "error", errors, values: settings };

  try {
    const { mode } = await saveRepoFile(
      SETTINGS_PATH,
      `${JSON.stringify(settings, null, 2)}\n`,
      `Admin: sozlamalar yangilandi (${session.sub})`
    );
    return { status: "saved", mode, values: settings };
  } catch (err) {
    console.error("[admin] Sozlamalarni saqlashda xatolik:", err);
    return {
      status: "error",
      errors: ["Saqlab boʻlmadi. GitHub token va ulanishni tekshiring."],
      values: settings,
    };
  }
}
