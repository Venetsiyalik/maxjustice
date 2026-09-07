import { Link } from "@/i18n/navigation";
import { ChevronRightIcon } from "@/components/ui/icons";

export type BreadcrumbItem = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-[var(--color-muted)]">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {item.href ? (
              <Link href={item.href} className="hover:text-[var(--color-navy-800)]">
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-[var(--color-ink)]">{item.label}</span>
            )}
            {i < items.length - 1 && (
              <ChevronRightIcon className="h-3.5 w-3.5 shrink-0" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
