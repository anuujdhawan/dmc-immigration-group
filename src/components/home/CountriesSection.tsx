import { ArrowRight } from "lucide-react";

import type { Market } from "@/config/markets";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/home/SectionShell";
import { marketHref } from "@/lib/routing/routes";

interface PathwayCard {
  flag: string;
  country: string;
  profile: string;
  pathway: string;
  duration: string;
  steps: string[];
  href: string;
}

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
      "Application under processing",
    ],
    href: "/visas/canada/express-entry",
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
    href: "/visas/australia/skilled-independent-189",
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
    href: "/visas/uk/skilled-worker",
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
    href: "/visit-visas/usa",
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
    href: "/visit-visas/new-zealand",
  },
];

export function CountriesSection({ market }: { market: Market }) {
  return (
    <SectionShell id="countries" tone="slate">
      <Container>
        <SectionHeading
          eyebrow="Where we practice"
          title="Opportunity looks different in every country"
          lede="Illustrative journeys — real pathways, timelines and steps for each destination we practice in. Outcomes are decided by each country's government authority and vary by case."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {PATHWAYS.map((card) => (
            <article
              key={card.country}
              className="flex flex-col rounded-card border border-dmc-card-border bg-white p-7 shadow-card transition-shadow hover:shadow-brand-glow"
            >
              <div className="mb-4 flex items-center gap-3">
                <span aria-hidden="true" className="text-3xl">
                  {card.flag}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-charcoal">{card.country}</h3>
                  <p className="text-sm text-slate-500">{card.profile}</p>
                </div>
              </div>
              <p className="mb-1 text-xs font-bold uppercase tracking-mega text-brand-600">
                Visa pathway
              </p>
              <p className="mb-3 font-medium text-charcoal">{card.pathway}</p>
              <p className="mb-4 text-xs font-semibold uppercase tracking-mega text-slate-500">
                Duration{" "}
                <span className="ml-1 font-bold text-brand-600">{card.duration}</span>
              </p>
              <ol className="mb-6 space-y-2 border-t border-slate-100 pt-4">
                {card.steps.map((step, index) => (
                  <li key={step} className="flex gap-2.5 text-sm text-slate-700">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[10px] font-bold text-brand-700"
                    >
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
              <a
                href={marketHref(market, card.href)}
                className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-600"
              >
                Explore the journey
                <ArrowRight aria-hidden="true" className="size-4" />
              </a>
            </article>
          ))}

          <article className="flex flex-col items-start justify-center rounded-card bg-brand-950 p-8 text-white">
            <p className="mb-2 text-xs font-bold uppercase tracking-mega text-leaf-soft">
              Live destination network
            </p>
            <h3 className="mb-3 font-display text-2xl font-bold">
              Canada · Australia · UK · USA · NZ + 15 more
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-aurora-muted">
              20 countries, 50+ pathways, one strategy — profile assessment, strategy mapped,
              consultant reviewed, case preparation, end-to-end.
            </p>
            <a
              href={marketHref(market, "/visit-visas")}
              className="inline-flex items-center gap-1.5 rounded-full bg-leaf px-5 py-2.5 text-sm font-semibold text-brand-950 transition-colors hover:bg-leaf-soft"
            >
              Explore the journey
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
          </article>
        </div>
      </Container>
    </SectionShell>
  );
}
