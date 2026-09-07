import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {eyebrow && (
        <p className="mb-2 text-sm font-bold uppercase tracking-wide text-[var(--color-gold-600)]">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-extrabold tracking-tight text-[var(--color-navy-950)] sm:text-3xl">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 text-lg text-[var(--color-muted)] ${
            align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
