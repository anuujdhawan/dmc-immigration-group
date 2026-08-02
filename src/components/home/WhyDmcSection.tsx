import { ArrowRight, CheckCircle2 } from "lucide-react";

import type { Market } from "@/config/markets";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/home/SectionShell";
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
];

const STATS = [
  { value: "15+", label: "Years of consulting experience" },
  { value: "20+", label: "Countries represented" },
  { value: "5", label: "Office locations" },
  { value: "3", label: "Regulated practices" },
];

export function WhyDmcSection({ market }: { market: Market }) {
  return (
    <SectionShell id="why-dmc">
      <Container>
        <SectionHeading
          eyebrow="Why DMC"
          title="One consultancy, three regulated practices"
          lede="Most consultancies specialise in one country. DMC brings RCIC-licensed Canadian counsel, MARA-registered Australian agents and a multi-country advisory network together — so your case is handled by people who actually practice in your destination, not a generalist working from a template."
        />
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <ul className="space-y-5">
            {PILLARS.map((pillar) => (
              <li key={pillar.title} className="flex gap-4">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-brand-600" />
                <div>
                  <h3 className="font-display text-lg font-bold text-charcoal">{pillar.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{pillar.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="rounded-card bg-brand-50/60 p-8 md:p-10">
            <dl className="grid grid-cols-2 gap-8">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dd className="font-display text-4xl font-bold text-brand-700">{stat.value}</dd>
                  <dt className="mt-1 text-sm text-muted">{stat.label}</dt>
                </div>
              ))}
            </dl>
            <div className="mt-10">
              <Button href={marketHref(market, "/contact")} size="lg">
                Speak With a Consultant
                <ArrowRight aria-hidden="true" className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </SectionShell>
  );
}
