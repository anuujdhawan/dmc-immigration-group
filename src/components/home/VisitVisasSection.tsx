import { ArrowRight, Globe2 } from "lucide-react";

import type { Market } from "@/config/markets";
import { MARKET_LABELS } from "@/config/markets";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { marketHref } from "@/lib/routing/routes";

const VISIT_COUNTRIES = [
  {
    flag: "🇨🇦",
    name: "Canada",
    detail: "Visitor visa & Super Visa for parents and grandparents.",
    href: "/visit-visas/canada",
  },
  {
    flag: "🇦🇺",
    name: "Australia",
    detail: "Subclass 600 tourist and business-visitor applications.",
    href: "/visit-visas/australia",
  },
  {
    flag: "🇬🇧",
    name: "United Kingdom",
    detail: "Standard visitor visa for tourism, family and business.",
    href: "/visit-visas/uk",
  },
  {
    flag: "🇳🇿",
    name: "New Zealand",
    detail: "Visitor visa applications for tourism and family visits.",
    href: "/visit-visas/new-zealand",
  },
  {
    flag: "🇺🇸",
    name: "United States",
    detail: "B1/B2 visitor visa guidance and interview preparation.",
    href: "/visit-visas/usa",
  },
];

export function VisitVisasSection({ market }: { market: Market }) {
  return (
    <section id="refusals" className="bg-slate-50 py-20 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHeading
          align="left"
          eyebrow="Global Visit Visas"
          title="One team, five countries of visit-visa expertise"
          lede={`Tourist, business-visitor and Super Visa applications — handled by specialists in each destination's own requirements, with a dedicated team for ${MARKET_LABELS[market]} residents.`}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {VISIT_COUNTRIES.map((country) => {
            const topClasses =
              country.name === "Canada"
                ? "from-red-500 to-red-700"
                : country.name === "Australia"
                  ? "from-sky-500 to-blue-700"
                  : country.name === "United Kingdom"
                    ? "from-red-600 to-red-900"
                    : country.name === "New Zealand"
                      ? "from-neutral-600 to-neutral-900"
                      : "from-blue-600 to-blue-950";
            return (
              <article
                key={country.name}
                className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card"
              >
                <div
                  className={`relative h-28 overflow-hidden bg-gradient-to-b ${topClasses}`}
                >
                  <span className="absolute inset-0 flex items-center justify-center text-4xl opacity-95">
                    {country.flag}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 h-10 bg-black/5 backdrop-blur-[1px]" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold text-ink">{country.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{country.detail}</p>
                </div>
              </article>
            );
          })}
        </div>
        <div className="fade-up mt-8">
          <a
            href={marketHref(market, "/contact")}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-card transition hover:bg-brand-700"
          >
            <Globe2 aria-hidden="true" className="size-4" />
            Talk to a visit-visa specialist
            <ArrowRight aria-hidden="true" className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
