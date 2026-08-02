import { ArrowRight, Calculator, ListChecks, Search } from "lucide-react";

import type { Market } from "@/config/markets";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/home/SectionShell";
import { marketHref } from "@/lib/routing/routes";

const TOOLS = [
  {
    icon: Calculator,
    title: "CRS & PNP Calculator",
    text: "Estimate your Express Entry score and match against active PNP streams.",
    href: "/tools/canada/crs-calculator",
    cta: "Start calculator",
  },
  {
    icon: Search,
    title: "Points Calculator & Visa Finder",
    text: "A visa finder plus ANZSCO occupation and skills-assessment lookup.",
    href: "/tools/australia/points-calculator",
    cta: "Find my visa",
  },
  {
    icon: ListChecks,
    title: "Document Checklists & Guides",
    text: "Country and program-specific checklists to prepare before your consultation.",
    href: "/guides/document-checklists",
    cta: "Browse guides",
  },
];

export function ToolsSection({ market }: { market: Market }) {
  return (
    <SectionShell id="tools">
      <Container>
        <SectionHeading
          eyebrow="Free assessment"
          title="See how your profile fits, before you commit"
          lede="No obligation, no filing fees — just a clearer sense of what to research or book next."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {TOOLS.map((tool) => (
            <a
              key={tool.title}
              href={marketHref(market, tool.href)}
              className="group flex flex-col rounded-card border border-dmc-card-border bg-white p-7 shadow-card transition-shadow hover:shadow-brand-glow"
            >
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-brand-50">
                <tool.icon aria-hidden="true" className="size-6 text-brand-600" />
              </div>
              <h3 className="font-display text-lg font-bold text-charcoal">{tool.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{tool.text}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 group-hover:text-brand-600">
                {tool.cta}
                <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>
          ))}
        </div>
      </Container>
    </SectionShell>
  );
}
