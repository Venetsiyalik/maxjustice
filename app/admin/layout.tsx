import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "../globals.css";

const bodyFont = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Admin — MAXLEGAL AND JUSTICE",
  robots: { index: false, follow: false },
};

/** Admin panel — saytdan alohida root layout (til, header, analitika yo'q). */
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" className={bodyFont.variable}>
      <body className="min-h-screen bg-[var(--color-surface-alt)] antialiased">{children}</body>
    </html>
  );
}
