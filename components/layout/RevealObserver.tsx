"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * `data-reveal` atributli elementlar ekranga kirganda `is-visible` klassini
 * oladi (CSS: app/globals.css). Har sahifa almashganda qayta kuzatadi.
 * `--reveal-delay` bilan ketma-ket chiqish beriladi (style orqali).
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)")
    );
    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

/** <html> ga `js-reveal` qo'yadigan inline skript — birinchi chizishdan oldin ishlaydi */
export const REVEAL_BOOTSTRAP = `document.documentElement.classList.add("js-reveal")`;
