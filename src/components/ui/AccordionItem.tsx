"use client";

import { useState, type ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

interface AccordionItemProps {
  question: string;
  answer: ReactNode;
  defaultOpen?: boolean;
}

export function AccordionItem({ question, answer, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-2xl border border-brand-600/10 bg-white shadow-sm">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-7 md:py-5"
      >
        <span className="font-display text-base font-semibold text-charcoal md:text-lg">
          {question}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-full border border-brand-600/30 text-brand-700 transition-transform duration-200",
            open && "rotate-45",
          )}
        >
          +
        </span>
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 text-sm leading-relaxed text-muted md:px-7 md:pb-6 md:text-base">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}
