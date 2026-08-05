import { ArrowRight, CheckCircle2 } from "lucide-react";

import type { Market } from "@/config/markets";
import { MARKET_LABELS } from "@/config/markets";
import { marketOffice } from "@/lib/i18n/market-copy";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { marketHref } from "@/lib/routing/routes";

const PILLARS = [
  {
    title: "Licensed at every step",
    text: "RCIC-licensed Canadian counsel, MARA-registered Australian agents — verifiable on the official register.",
  },
  {
    title: "Transparent case planning",
    text: "Documents, dependencies and milestones organised around one clear plan.",
  },
  {
    title: "Five-country reach",
    text: "Canada, Australia, UK, New Zealand and USA — under one roof.",
  },
  {
    title: "Clear, considered communication",
    text: "Practical language, no unrealistic promises or pressure.",
  },
  {
    title: "Local, market-aware teams",
    text: "Dedicated Dubai, Abu Dhabi, Qatar, Kuwait and India offices serving their own residents.",
  },
];

const STATS = [
  { value: "15+", label: "Years of consulting experience" },
  { value: "20+", label: "Countries represented" },
  { value: "50+", label: "Pathways supported" },
  { value: "3", label: "Regulated practices" },
];

export function WhyDmcSection({ market }: { market: Market }) {
  return (
    <section id="why-dmc" className="bg-white py-20 lg:py-24">
      <div className="mx-auto grid max-w-[1280px] gap-14 px-6 lg:grid-cols-2 lg:items-center">
        <div className="fade-up">
          <SectionHeading
            align="left"
            eyebrow="Why DMC"
            title="One consultancy, three regulated practices"
            lede={`Most consultancies specialise in one country. DMC brings regulated Canadian counsel, Australian migration expertise and a multi-country advisory network together — so your case is handled by people who actually practice in your destination, not a generalist working from a template. For clients in the ${MARKET_LABELS[market]} market, ${marketOffice(market)} is your first point of contact.`}
          />
          <div className="space-y-4">
            {PILLARS.map((pillar) => (
              <div key={pillar.title} className="flex items-start gap-3">
                <div className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700">
                  <CheckCircle2 aria-hidden="true" className="size-3.5" />
                </div>
                <p className="text-sm leading-relaxed text-slate-600">
                  <span className="font-semibold text-ink">{pillar.title}</span> — {pillar.text}
                </p>
              </div>
            ))}
          </div>
          <Button href={marketHref(market, "/contact")} size="lg" className="mt-8 rounded-xl">
            Speak With a Consultant
            <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
        </div>

        <div className="fade-up grid grid-cols-2 gap-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
              <p className="font-display text-3xl font-extrabold text-brand-700">{stat.value}</p>
              <p className="mt-1 text-xs text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
