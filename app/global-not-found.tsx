import type { Metadata } from "next";
import Link from "next/link";
import { Manrope } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

/**
 * Hech bir marshrutga, hatto [locale] segmentiga ham tushmaydigan URL'lar
 * uchun (masalan, nuqtali `/eski-sahifa.php` — proxy ularni o'tkazib
 * yuboradi). Oddiy 404 lar [locale]/not-found.tsx da, tilga mos ko'rinadi;
 * bu esa faqat zaxira, shuning uchun o'zbek va rus tilida qisqa.
 */
const bodyFont = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "404 — Sahifa topilmadi | MAXLEGAL AND JUSTICE",
};

const linkClass =
  "inline-flex min-h-[44px] items-center justify-center rounded-lg px-5 font-semibold";

export default function GlobalNotFound() {
  return (
    <html lang="uz" className={bodyFont.variable}>
      <body className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center antialiased">
        <span className="text-7xl font-extrabold text-[var(--color-navy-900)]/10">404</span>
        <h1 className="text-2xl font-extrabold text-[var(--color-navy-950)]">
          Sahifa topilmadi
        </h1>
        <p className="max-w-md text-[var(--color-muted)]">
          Siz izlagan sahifa mavjud emas. · Страница не найдена.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className={`${linkClass} bg-[var(--color-gold-500)] text-[var(--color-navy-950)]`}>
            Bosh sahifa
          </Link>
          <Link
            href="/xizmatlar"
            className={`${linkClass} border-2 border-[var(--color-navy-900)] text-[var(--color-navy-900)]`}
          >
            Xizmatlar
          </Link>
          <Link
            href="/bog-lanish"
            className={`${linkClass} border-2 border-[var(--color-navy-900)] text-[var(--color-navy-900)]`}
          >
            Bogʻlanish
          </Link>
          <a href={siteConfig.phone.href} className={`${linkClass} text-[var(--color-navy-900)]`}>
            {siteConfig.phone.display}
          </a>
        </div>
      </body>
    </html>
  );
}
