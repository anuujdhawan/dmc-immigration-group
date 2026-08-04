"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils/cn";

type SectionNavItem = {
  label: string;
  anchor: string;
};

export function SectionNav({ items }: { items: SectionNavItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.anchor ?? "");

  useEffect(() => {
    if (items.length === 0) return;

    const elements = items
      .map((item) => document.getElementById(item.anchor))
      .filter((element): element is HTMLElement => Boolean(element));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;

        visible.sort((left, right) => right.intersectionRatio - left.intersectionRatio);
        const top = visible[0];
        if (top?.target instanceof HTMLElement) {
          setActiveId(top.target.id);
        }
      },
      {
        rootMargin: "-18% 0px -68% 0px",
        threshold: [0.15, 0.3, 0.45, 0.6],
      },
    );

    for (const element of elements) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="On this page"
      className="sticky top-[var(--header-offset-mobile)] z-20 border-b border-brand-600/10 bg-[rgba(250,251,247,0.95)] backdrop-blur-lg md:top-[var(--header-offset)]"
    >
      <div className="mx-auto flex min-h-14 w-[min(1240px,calc(100%-2rem))] items-center gap-3 overflow-x-auto py-3 [scrollbar-width:none]">
        {items.map((item) => {
          const active = item.anchor === activeId;
          return (
            <a
              key={item.anchor}
              href={`#${item.anchor}`}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-sm font-bold transition-colors",
                active
                  ? "bg-brand-100 text-brand-900 shadow-[0_8px_24px_rgba(69,179,24,.12)]"
                  : "text-muted hover:bg-brand-50 hover:text-brand-800",
              )}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
