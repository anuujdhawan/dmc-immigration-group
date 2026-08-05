import { MARKET_LABELS, type Market } from "@/config/markets";

const STATS = [
  { value: "15+", label: "Years of consulting experience" },
  { value: "20+", label: "Countries represented" },
  { value: "50+", label: "Pathways and programs" },
  { value: "3", label: "Regulated practices" },
];

export function StatsBandSection({ market }: { market: Market }) {
  const marketLabel = market === "dubai" || market === "abu-dhabi" ? "the UAE" : MARKET_LABELS[market];
  return (
    <section
      aria-label="DMC Immigration at a glance"
      className="stats-band relative overflow-hidden border-y border-slate-100 bg-slate-50 py-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none"
      >
        <span className="whitespace-nowrap text-[9rem] leading-none tracking-tight text-brand-100 font-display font-extrabold">
          DMC · DMC
        </span>
      </div>
      <div className="relative mx-auto grid max-w-[1280px] grid-cols-2 gap-8 px-6 text-center lg:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="fade-up">
            <p className="font-display text-4xl font-extrabold text-brand-700">{stat.value}</p>
            <p className="mt-2 text-xs text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>
      <p className="relative mx-auto mt-8 max-w-[1280px] px-6 text-center text-xs text-slate-500">
        The same regulated practice, serving clients {marketLabel === "the UAE" ? "across the UAE" : `in ${marketLabel}`} — from our {MARKET_LABELS[market]} office.
      </p>
    </section>
  );
}
