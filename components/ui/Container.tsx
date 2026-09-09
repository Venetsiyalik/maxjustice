import { type ElementType, type ComponentPropsWithoutRef } from "react";

type ContainerProps<T extends ElementType> = {
  as?: T;
  className?: string;
  /** Header kabi kengroq joy kerak bo'lgan holatlar uchun (max-w-6xl o'rniga ~1360px) */
  wide?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className">;

export function Container<T extends ElementType = "div">({
  as,
  className = "",
  wide = false,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";
  const maxWidth = wide ? "max-w-[1360px]" : "max-w-6xl";
  return (
    <Component
      className={`mx-auto w-full ${maxWidth} px-5 sm:px-6 lg:px-8 ${className}`}
      {...props}
    />
  );
}
