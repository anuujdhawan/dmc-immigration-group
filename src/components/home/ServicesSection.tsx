import { ArrowRight } from "lucide-react";

import type { Market } from "@/config/markets";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/home/SectionShell";
import { marketHref } from "@/lib/routing/routes";

interface ServiceCard {
  title: string;
  pathway: string;
  timeline: string;
  steps: string[];
  href: string;
  cta: string;
}

const SERVICES: ServiceCard[] = [
  {
    title: "Skilled Immigration",
    pathway: "EE · 189",
    timeline: "6–14 months",
    steps: [
      "Profile & CRS / points assessment",
      "Program matching — EE / PNP / 189 / 190",
      "Document preparation & submission",
      "Invitation & decision",
    ],
    href: "/visas/canada/express-entry",
    cta: "Assess your profile",
  },
  {
    title: "Family & Spouse",
    pathway: "Spousal / Partner",
    timeline: "8–16 months",
    steps: [
      "Relationship evidence review",
      "Sponsorship application filed",
      "Dependants & medicals included",
      "Sponsorship approved",
    ],
    href: "/visas/canada/family-sponsorship-parent-grandparent-program",
    cta: "Explore service",
  },
  {
    title: "Study Abroad",
    pathway: "Study Permit + PGWP",
    timeline: "3–6 months",
    steps: [
      "Program & DLI selection",
      "Financial proof & offer letter",
      "Study permit application filed",
      "Enrolment confirmed",
    ],
    href: "/study-abroad/canada-student-visas",
    cta: "Explore service",
  },
  {
    title: "Business & Investment",
    pathway: "RBI / CBI",
    timeline: "4–18 months",
    steps: [
      "Investment structuring & strategy",
      "Due diligence & source-of-funds",
      "Application filed with authority",
      "Guidance to final decision",
    ],
    href: "/business-investment/golden-visa-uae",
    cta: "Explore service",
  },
  {
    title: "Visit & Visitor Visas",
    pathway: "Tourist / Business / Super Visa",
    timeline: "Varies by destination",
    steps: [
      "Destination & purpose mapping",
      "Evidence preparation",
      "Application & biometrics",
      "Interview preparation where required",
    ],
    href: "/visit-visas",
    cta: "Explore destinations",
  },
  {
    title: "Resume Marketing",
    pathway: "Global job search",
    timeline: "2–6 weeks",
    steps: [
      "Profile & target-market review",
      "Resume & LinkedIn alignment",
      "Employer-facing package",
      "Interview preparation support",
    ],
    href: "/services/resume-marketing",
    cta: "Explore service",
  },
];

export function ServicesSection({ market }: { market: Market }) {
  return (
    <SectionShell id="services">
      <Container>
        <SectionHeading
          eyebrow="Immigration expertise"
          title="A pathway for every ambition"
          lede="Every case starts with a different professional history, family structure and objective. Here is what the journey typically looks like for each."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((service) => (
            <article
              key={service.title}
              className="flex flex-col rounded-card border border-dmc-card-border bg-white p-7 shadow-card transition-shadow hover:shadow-brand-glow"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="min-w-0 font-display text-xl font-bold text-charcoal">{service.title}</h3>
                <span className="shrink-0 rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold tracking-mega text-brand-700">
                  {service.pathway}
                </span>
              </div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-mega text-slate-500">
                Timeline{" "}
                <span className="ml-1 font-bold text-brand-600">{service.timeline}</span>
              </p>
              <ol className="mb-6 space-y-2 border-t border-slate-100 pt-4">
                {service.steps.map((step, index) => (
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
                href={marketHref(market, service.href)}
                className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-600"
              >
                {service.cta}
                <ArrowRight aria-hidden="true" className="size-4" />
              </a>
            </article>
          ))}
        </div>
      </Container>
    </SectionShell>
  );
}
