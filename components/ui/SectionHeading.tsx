import type { ReactNode } from "react";
import { GoldDivider } from "@/components/ui/ornaments";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "light",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  /** dark — to'q fon ustida (oq matn) */
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div data-reveal className={align === "center" ? "text-center" : "text-left"}>
      {eyebrow && (
        <p
          className={`mb-3 text-xs font-bold uppercase tracking-[0.18em] ${
            dark ? "text-[var(--color-gold-400)]" : "text-[var(--color-gold-600)]"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-3xl leading-tight sm:text-4xl ${
          dark ? "text-white" : "text-[var(--color-navy-950)]"
        }`}
      >
        {title}
      </h2>
      <GoldDivider className="mt-4" align={align} />
      {subtitle && (
        <p
          className={`mt-4 text-lg ${dark ? "text-white/70" : "text-[var(--color-muted)]"} ${
            align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
