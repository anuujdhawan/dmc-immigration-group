import { SectionHeading } from "@/components/ui/SectionHeading";

import type { Market } from "@/config/markets";
import { marketAudience } from "@/lib/i18n/market-copy";

interface PathwayCard {
  flag: string;
  country: string;
  profile: string;
  pathway: string;
  duration: string;
  steps: string[];
  accent: "red" | "blue" | "rose" | "neutral" | "amber";
  summary: string;
}

const ACCENT_STYLES = {
  red: {
    outer: "hover:border-red-200",
    top: "bg-red-50 border-red-100 border-t-red-500",
    glow: "bg-red-200/40 group-hover:bg-red-300/50",
    badge: "bg-rose-600 text-white",
    title: "text-ink",
    panel: "bg-white border-red-200",
    label: "text-red-500",
    step: "bg-red-800",
  },
  blue: {
    outer: "hover:border-blue-200",
    top: "bg-blue-50 border-blue-100 border-t-blue-500",
    glow: "bg-blue-200/40 group-hover:bg-blue-300/50",
    badge: "bg-rose-600 text-white",
    title: "text-ink",
    panel: "bg-white border-blue-200",
    label: "text-blue-500",
    step: "bg-blue-800",
  },
  rose: {
    outer: "hover:border-red-300",
    top: "bg-red-100 border-red-200 border-t-red-700",
    glow: "bg-red-300/40 group-hover:bg-red-400/50",
    badge: "bg-white text-red-700",
    title: "text-ink",
    panel: "bg-white border-red-300",
    label: "text-red-600",
    step: "bg-red-900",
  },
  neutral: {
    outer: "hover:border-neutral-300",
    top: "bg-neutral-100 border-neutral-200 border-t-neutral-800",
    glow: "bg-neutral-300/40 group-hover:bg-neutral-400/50",
    badge: "bg-rose-600 text-white",
    title: "text-ink",
    panel: "bg-white border-neutral-300",
    label: "text-neutral-500",
    step: "bg-neutral-800",
  },
  amber: {
    outer: "hover:border-amber-200",
    top: "bg-amber-50 border-amber-100 border-t-amber-500",
    glow: "bg-amber-200/40 group-hover:bg-amber-300/50",
    badge: "bg-neutral-900 text-white",
    title: "text-ink",
    panel: "bg-white border-amber-200",
    label: "text-amber-600",
    step: "bg-amber-800",
  },
} as const;

const PATHWAYS: PathwayCard[] = [
  {
    flag: "🇨🇦",
    country: "Canada",
    profile: "Software Engineer · Toronto",
    pathway: "Express Entry — Federal Skilled Worker",
    duration: "~8 months typical",
    steps: [
      "CRS profile created",
      "ITA received",
      "PR application submitted",
      "Application reviewed by the authority",
    ],
    accent: "red",
    summary: "Federal Skilled Worker",
  },
  {
    flag: "🇦🇺",
    country: "Australia",
    profile: "Software Engineer · Melbourne",
    pathway: "Subclass 189 Skilled Independent",
    duration: "~11 months typical",
    steps: [
      "Skills assessment via ACS",
      "EOI submitted",
      "Invitation received",
      "Visa application lodged",
    ],
    accent: "blue",
    summary: "Skilled Independent PR",
  },
  {
    flag: "🇬🇧",
    country: "United Kingdom",
    profile: "Data Analyst · London",
    pathway: "Skilled Worker (employer-sponsored)",
    duration: "~6 months typical",
    steps: [
      "Certificate of Sponsorship issued",
      "Visa application submitted",
      "Biometrics completed",
      "Application under processing",
    ],
    accent: "rose",
    summary: "Employer-sponsored",
  },
  {
    flag: "🇺🇸",
    country: "United States",
    profile: "Dependent Visa · Houston",
    pathway: "H-4 dependent spouse visa",
    duration: "~4 months typical",
    steps: [
      "Petition & documentation reviewed",
      "Visa application submitted",
      "Consular interview attended",
      "Application under processing",
    ],
    accent: "amber",
    summary: "Spouse visa",
  },
  {
    flag: "🇳🇿",
    country: "New Zealand",
    profile: "Partner Visa · Auckland",
    pathway: "Partner resident visa (partnership-based)",
    duration: "~14 months typical",
    steps: [
      "Partnership evidence compiled",
      "Application lodged",
      "INZ assessment & requests",
      "Application under processing",
    ],
    accent: "neutral",
    summary: "Partnership-based",
  },
  {
    flag: "🇩🇪",
    country: "Germany",
    profile: "Mechanical Engineer · Berlin",
    pathway: "EU Blue Card",
    duration: "~5 months typical",
    steps: [
      "Job offer & qualification recognition",
      "Blue Card application filed",
      "Residence permit issued",
      "Relocated · 2025",
    ],
    accent: "amber",
    summary: "Employer-sponsored",
  },
];

export function CountriesSection({ market }: { market: Market }) {
  return (
    <section id="countries" className="bg-slate-50 py-20 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHeading
          align="left"
          eyebrow={`${market === "dubai" || market === "abu-dhabi" ? "UAE" : "Global"} · Where we practice`}
          title="Opportunity looks different in every country"
          lede={`Illustrative journeys — real pathways, timelines and steps for each destination we practice in, prepared for ${marketAudience(market)}.`}
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PATHWAYS.map((card) => {
            const styles = ACCENT_STYLES[card.accent];
            return (
              <article
                key={card.country}
                className={`group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${styles.outer}`}
              >
                <div className={`relative overflow-hidden border-b p-6 border-t-4 ${styles.top}`}>
                  <div
                    aria-hidden="true"
                    className={`absolute -right-8 -top-10 h-32 w-32 rounded-full blur-2xl transition-colors duration-300 ${styles.glow}`}
                  />
                  <div className="relative mb-5 flex items-center justify-between">
                    <span className={`rounded-full px-3 py-1.5 text-[11px] font-bold ${styles.badge}`}>
                      {card.pathway.includes("Express Entry")
                        ? "EE + PNP"
                        : card.pathway.includes("189")
                          ? "SC 189"
                          : card.pathway.includes("Skilled Worker")
                            ? "Skilled Worker"
                            : card.pathway.includes("Dependent")
                              ? "Dependent"
                              : card.pathway.includes("EU Blue Card")
                                ? "EU Blue Card"
                                : "Partner Visa"}
                    </span>
                    <span aria-hidden="true" className="inline-block text-2xl transition-transform duration-300 group-hover:scale-110">
                      {card.flag}
                    </span>
                  </div>
                  <h3 className={`relative font-display text-xl font-extrabold ${styles.title}`}>
                    {card.country}
                  </h3>
                  <p className="relative mt-1 mb-5 text-sm text-slate-500">{card.profile}</p>
                  <div className="relative grid grid-cols-2 gap-3">
                    <div className={`rounded-xl border px-4 py-3 ${styles.panel}`}>
                      <p className={`text-[9px] font-bold uppercase tracking-wider ${styles.label}`}>
                        Visa Pathway
                      </p>
                      <p className="mt-1 text-sm font-extrabold text-ink">{card.pathway}</p>
                      <p className="mt-0.5 text-[10px] text-slate-400">{card.summary}</p>
                    </div>
                    <div className={`rounded-xl border px-4 py-3 ${styles.panel}`}>
                      <p className={`text-[9px] font-bold uppercase tracking-wider ${styles.label}`}>
                        Duration
                      </p>
                      <p className="mt-1.5 text-lg font-extrabold leading-none text-ink">
                        {card.duration}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Migration Steps
                  </p>
                  <div className="space-y-2.5">
                    {card.steps.map((step) => (
                      <div key={step} className="flex items-center gap-2.5">
                        <span
                          aria-hidden="true"
                          className={`grid size-5 shrink-0 place-items-center rounded-full text-[8px] text-white ${styles.step}`}
                        >
                          <i className="fa-solid fa-check" />
                        </span>
                        <span className="text-sm text-slate-600">{step}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-5 border-t border-slate-100 pt-4 text-sm text-slate-500">
                    Typical journey. Government decisions still depend on each file&apos;s evidence.
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
