import type { BlogBlock } from "@/content/blog/types";
import { CheckIcon } from "@/components/ui/icons";

export function BlogBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((block, i) => {
        if (block.type === "heading") {
          return (
            <h2
              key={i}
              className="mt-4 text-xl font-extrabold text-[var(--color-navy-950)]"
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "list") {
          return (
            <ul key={i} className="flex flex-col gap-2">
              {block.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2.5 text-lg text-[var(--color-ink)]">
                  <CheckIcon className="mt-1.5 h-4 w-4 shrink-0 text-[var(--color-gold-600)]" />
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="text-lg leading-relaxed text-[var(--color-muted)]">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
