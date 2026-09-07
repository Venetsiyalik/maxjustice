import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Link } from "@/i18n/navigation";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "md" | "lg";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-[var(--color-gold-500)] text-[var(--color-navy-950)] hover:bg-[var(--color-gold-400)] shadow-sm",
  secondary:
    "bg-[var(--color-navy-900)] text-white hover:bg-[var(--color-navy-800)]",
  outline:
    "border-2 border-[var(--color-navy-900)] text-[var(--color-navy-900)] hover:bg-[var(--color-navy-900)] hover:text-white",
  ghost: "text-[var(--color-navy-900)] hover:bg-[var(--color-surface-alt)]",
};

const SIZE_CLASSES: Record<Size, string> = {
  md: "px-5 py-3 text-base",
  lg: "px-7 py-4 text-lg",
};

const BASE_CLASSES =
  "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold-500)]";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children"> & {
    href?: undefined;
  };

type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button({
  variant = "primary",
  size = "md",
  icon,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`;

  if ("href" in props && props.href) {
    const { href, ...rest } = props as ButtonAsLink;
    const isInternal = href.startsWith("/");

    if (isInternal) {
      return (
        <Link href={href} className={classes} {...rest}>
          {icon}
          {children}
        </Link>
      );
    }

    return (
      <a href={href} className={classes} {...rest}>
        {icon}
        {children}
      </a>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {icon}
      {children}
    </button>
  );
}
