import { ArrowRight, Calculator, ListChecks, Search } from "lucide-react";

import type { Market } from "@/config/markets";
import { MARKET_LABELS } from "@/config/markets";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
    <section id="tools" className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHeading
          align="left"
          eyebrow="Free assessment"
          title="See how your profile fits, before you commit"
          lede={`No obligation, no filing fees — just a clearer sense of what to research or book next, wherever you are ${market === "dubai" || market === "abu-dhabi" ? "in the UAE" : `in ${MARKET_LABELS[market]}`}.`}
        />
        <div className="grid gap-5 sm:grid-cols-3">
          {TOOLS.map((tool, index) => {
            const palette =
              index === 0
                ? {
                    card: "bg-red-50 border-red-100 border-t-red-500 hover:border-red-300",
                    icon: "bg-red-600 text-white",
                    text: "text-red-700",
                  }
                : index === 1
                  ? {
                      card: "bg-blue-50 border-blue-100 border-t-blue-500 hover:border-blue-300",
                      icon: "bg-blue-600 text-white",
                      text: "text-blue-700",
                    }
                  : {
                      card: "bg-brand-50 border-brand-100 border-t-brand-500 hover:border-brand-300",
                      icon: "bg-brand-600 text-white",
                      text: "text-brand-700",
                    };

            return (
              <a
                key={tool.title}
                href={marketHref(market, tool.href)}
                className={`group rounded-2xl border border-slate-100 border-t-4 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${palette.card}`}
              >
                <div
                  className={`mb-4 grid size-11 place-items-center rounded-xl shadow-card transition-transform duration-300 group-hover:scale-110 ${palette.icon}`}
                >
                  <tool.icon aria-hidden="true" className="size-5" />
                </div>
                <h3 className="font-display font-bold text-ink">{tool.title}</h3>
                <p className="mt-2 leading-relaxed text-sm text-slate-500">{tool.text}</p>
                <span className={`mt-4 inline-flex items-center gap-1.5 text-xs font-bold ${palette.text}`}>
                  {tool.cta}
                  <ArrowRight aria-hidden="true" className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
