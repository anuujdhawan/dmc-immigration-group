import { ArrowRight, Globe2 } from "lucide-react";

import type { Market } from "@/config/markets";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/home/SectionShell";
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
    <SectionShell id="refusals" tone="slate">
      <Container>
        <SectionHeading
          eyebrow="Global Visit Visas"
          title="One team, five countries of visit-visa expertise"
          lede="Tourist, business-visitor and Super Visa applications — handled by specialists in each destination's own requirements, not a generic template."
        />
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {VISIT_COUNTRIES.map((country) => (
            <li
              key={country.name}
              className="flex flex-col rounded-card border border-dmc-card-border bg-white p-6 shadow-sm transition-shadow hover:shadow-brand-glow"
            >
              <span aria-hidden="true" className="mb-3 text-3xl">
                {country.flag}
              </span>
              <h3 className="font-display text-lg font-bold text-charcoal">{country.name}</h3>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{country.detail}</p>
              <a
                href={marketHref(market, country.href)}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-600"
              >
                Learn more
                <ArrowRight aria-hidden="true" className="size-4" />
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-col items-center gap-4 text-center">
          <a
            href={marketHref(market, "/visit-visas")}
            className="inline-flex items-center gap-2 rounded-full bg-brand-950 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-900"
          >
            <Globe2 aria-hidden="true" className="size-4" />
            Explore all 20 destinations
            <ArrowRight aria-hidden="true" className="size-4" />
          </a>
          <p className="text-xs text-slate-500">
            China · Japan · Turkey · South Korea · Singapore · Saudi Arabia · UAE · Greece ·
            Thailand · South Africa · Cyprus · Netherlands · St. Kitts &amp; Nevis · Vanuatu
          </p>
        </div>
      </Container>
    </SectionShell>
  );
}
