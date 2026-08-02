import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

interface SectionShellProps {
  id: string;
  children: ReactNode;
  className?: string;
  tone?: "white" | "slate" | "aurora";
}

const tones = {
  white: "bg-white",
  slate: "bg-slate-50",
  aurora: "bg-aurora-bg text-aurora-text",
};

export function SectionShell({ id, children, className, tone = "white" }: SectionShellProps) {
  return (
    <section id={id} className={cn("anchor-offset py-16 lg:py-24", tones[tone], className)}>
      {children}
    </section>
  );
}
