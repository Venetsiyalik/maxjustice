/**
 * Sud va huquq mavzusidagi chiziqli bezaklar (SVG, `currentColor`).
 * Faqat dekorativ — ekran o'qigichlardan yashirilgan (aria-hidden).
 * Davlat ramzlari (gerb, bayroq) ataylab ishlatilmaydi: advokatura davlat
 * organi emas.
 */
type OrnamentProps = { className?: string; strokeWidth?: number };

const common = (strokeWidth = 1.5) => ({
  fill: "none",
  stroke: "currentColor",
  strokeWidth,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
});

/** Sud binosi fasadi: frontón, ustunlar, zinapoya */
export function CourthouseOrnament({ className, strokeWidth }: OrnamentProps) {
  const columns = [38, 70, 102, 134, 166, 198];
  return (
    <svg viewBox="0 0 240 160" className={className} {...common(strokeWidth)}>
      <path d="M14 50 L120 12 L226 50 Z" />
      <path d="M40 44 L120 20 L200 44" opacity="0.5" />
      <circle cx="120" cy="36" r="5" />
      <rect x="10" y="50" width="220" height="10" />
      <path d="M10 64 H230" opacity="0.6" />
      {columns.map((x) => (
        <g key={x}>
          <rect x={x - 3} y="64" width="14" height="4" />
          <path d={`M${x} 68 V128 M${x + 8} 68 V128`} />
          <path d={`M${x + 4} 70 V126`} opacity="0.35" />
          <rect x={x - 3} y="128" width="14" height="4" />
        </g>
      ))}
      <rect x="6" y="132" width="228" height="8" />
      <rect x="0" y="140" width="240" height="8" />
      <path d="M-6 152 H246" opacity="0.5" />
    </svg>
  );
}

/** Adolat tarozisi */
export function ScalesOrnament({ className, strokeWidth }: OrnamentProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} {...common(strokeWidth)}>
      <circle cx="60" cy="13" r="4" />
      <path d="M60 17 V100" />
      <path d="M20 30 H100" />
      <path d="M52 30 L60 22 L68 30" />
      <path d="M20 30 L8 64 M20 30 L32 64" />
      <path d="M100 30 L88 64 M100 30 L112 64" />
      <path d="M5 64 H35 C33 74 26 78 20 78 C14 78 7 74 5 64 Z" />
      <path d="M85 64 H115 C113 74 106 78 100 78 C94 78 87 74 85 64 Z" />
      <path d="M48 100 H72 M40 106 H80 M36 110 H84" />
    </svg>
  );
}

/** Sud bolg'achasi (gavel) va taglik */
export function GavelOrnament({ className, strokeWidth }: OrnamentProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} {...common(strokeWidth)}>
      <g transform="rotate(-40 52 46)">
        <rect x="26" y="34" width="52" height="24" rx="4" />
        <path d="M36 34 V58 M68 34 V58" />
        <rect x="49" y="58" width="6" height="50" rx="3" />
      </g>
      <rect x="62" y="96" width="46" height="10" rx="3" />
      <path d="M66 106 H104 V110 H66 Z" />
    </svg>
  );
}

/** Ochiq qonun kitobi */
export function LawBookOrnament({ className, strokeWidth }: OrnamentProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} {...common(strokeWidth)}>
      <path d="M60 32 C46 24 28 23 12 27 V93 C28 89 46 90 60 98 C74 90 92 89 108 93 V27 C92 23 74 24 60 32 Z" />
      <path d="M60 32 V98" />
      <path d="M22 42 C32 40 42 41 50 44 M22 54 C32 52 42 53 50 56 M22 66 C32 64 42 65 50 68" opacity="0.6" />
      <path d="M70 44 C78 41 88 40 98 42 M70 56 C78 53 88 52 98 54 M70 68 C78 65 88 64 98 66" opacity="0.6" />
    </svg>
  );
}

/** Sarlavha ostidagi oltin ajratgich: chiziq — romb — chiziq */
export function GoldDivider({ className = "", align = "center" }: { className?: string; align?: "left" | "center" }) {
  return (
    <span
      aria-hidden="true"
      className={`gold-divider flex items-center gap-2 text-[var(--color-gold-500)] ${
        align === "center" ? "justify-center" : "justify-start"
      } ${className}`}
    >
      <span className="gold-divider-line h-px w-10 bg-current" />
      <span className="h-1.5 w-1.5 rotate-45 bg-current" />
      <span className="gold-divider-line h-px w-10 bg-current" />
    </span>
  );
}

/**
 * Ichki sahifalar sarlavha blokining fon bezagi: o'ng tomonda xira sud
 * binosi silueti. Ota element `relative overflow-hidden` bo'lishi kerak.
 */
export function PageHeaderOrnament() {
  return (
    <CourthouseOrnament
      strokeWidth={1}
      className="animate-ornament pointer-events-none absolute -bottom-8 -right-10 hidden w-[420px] text-[var(--color-navy-900)]/[0.07] md:block lg:right-6"
    />
  );
}
