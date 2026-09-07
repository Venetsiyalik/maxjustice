"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    ym?: (...args: unknown[]) => void;
  }
}

const YANDEX_METRIKA_ID = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;

export type AnalyticsGoal = "phone_click" | "telegram_click" | "form_submit";

/**
 * GA4 va Yandex Metrika uchun maqsad (goal) hodisasini yuboradi (11-band).
 * Analitika ulanmagan bo'lsa (dev muhitida yoki ID sozlanmagan bo'lsa)
 * xavfsiz tarzda hech narsa qilmaydi.
 */
export function trackEvent(goal: AnalyticsGoal) {
  if (typeof window === "undefined") return;

  window.gtag?.("event", goal);

  if (YANDEX_METRIKA_ID) {
    window.ym?.(Number(YANDEX_METRIKA_ID), "reachGoal", goal);
  }
}
