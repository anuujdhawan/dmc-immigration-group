import { BadgeCheck } from "lucide-react";

import { MARKET_LABELS, type Market } from "@/config/markets";

const BADGES = [
  { label: "RCIC", tone: "brand" },
  { label: "CICC", tone: "blue" },
  { label: "MARA", tone: "amber" },
  { label: "OMARA", tone: "slate" },
] as const;

const toneClasses: Record<(typeof BADGES)[number]["tone"], { border: string; icon: string }> = {
  brand: { border: "border-brand-100 hover:border-brand-300", icon: "bg-brand-100 text-brand-700" },
  blue: { border: "border-blue-100 hover:border-blue-300", icon: "bg-blue-100 text-blue-700" },
  amber: { border: "border-amber-100 hover:border-amber-300", icon: "bg-amber-100 text-amber-700" },
  slate: { border: "border-slate-200 hover:border-slate-400", icon: "bg-slate-100 text-slate-700" },
};

export function RecognitionBandSection({ market }: { market: Market }) {
  return (
    <section className="relative overflow-hidden border-y border-brand-100 bg-gradient-to-r from-brand-50 via-white to-brand-50">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-4 px-6 py-8">
        <span className="text-[11px] font-bold uppercase tracking-widest text-brand-700">
          DMC {MARKET_LABELS[market]} · Regulated &amp; Recognised By
        </span>
        <div className="flex flex-wrap items-center justify-center gap-4">
        {BADGES.map((badge) => {
          const classes = toneClasses[badge.tone];
          return (
            <span
              key={badge.label}
              className={`inline-flex items-center gap-2 rounded-full border bg-white pl-3 pr-4 py-2 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-cardHover ${classes.border}`}
            >
              <span
                className={`grid size-7 shrink-0 place-items-center rounded-full ${classes.icon}`}
              >
                <BadgeCheck aria-hidden="true" className="size-3.5" />
              </span>
              <span className="text-sm font-extrabold tracking-wide text-ink">{badge.label}</span>
            </span>
          );
        })}
        </div>
        <p className="text-center text-xs text-slate-500">
          Serving residents {market === "dubai" || market === "abu-dhabi" ? "across the UAE" : `in ${MARKET_LABELS[market]}`} — the same regulated practice, closer to home.
        </p>
      </div>
    </section>
  );
}
