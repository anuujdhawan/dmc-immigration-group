import {
  ArrowRight,
  Briefcase,
  ClipboardCheck,
  FileCheck2,
  Gauge,
  Languages,
  Leaf,
  MapPinned,
  Timer,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import type { Market } from "@/config/markets";
import { MARKET_LABELS } from "@/config/markets";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { marketHref } from "@/lib/routing/routes";

interface ToolLink {
  icon: LucideIcon;
  title: string;
  text: string;
  href: string;
  cta: string;
}

const GENERAL_TOOLS: ToolLink[] = [
  {
    icon: ClipboardCheck,
    title: "Free Eligibility Checker",
    text: "Four quick questions that point your profile toward the right immigration route.",
    href: "/tools/eligibility-checker",
    cta: "Take the 30-second check",
  },
];

const CANADA_TOOLS: ToolLink[] = [
  {
    icon: Gauge,
    title: "CRS Calculator",
    text: "Estimate your Express Entry ranking score — core, spouse and transferability factors.",
    href: "/tools/canada/crs-calculator",
    cta: "Estimate my score",
  },
  {
    icon: Languages,
    title: "CLB Calculator",
    text: "Convert IELTS, CELPIP and TEF results into Canadian Language Benchmarks.",
    href: "/tools/canada/clb-calculator",
    cta: "Convert my scores",
  },
  {
    icon: FileCheck2,
    title: "FSW 67-Point Calculator",
    text: "Check the Federal Skilled Worker selection-factor grid — the 67-point threshold.",
    href: "/tools/canada/fsw-67-calculator",
    cta: "Check my eligibility",
  },
  {
    icon: Leaf,
    title: "RCIP Eligibility Checklist",
    text: "Self-assess against the Rural Community Immigration Pilot core checks.",
    href: "/tools/canada/rcip-eligibility",
    cta: "Run the checklist",
  },
  {
    icon: MapPinned,
    title: "PNP Stream Matchers",
    text: "Match your profile to active provincial nominee streams across Canada.",
    href: "/tools/canada",
    cta: "Browse all provinces",
  },
];

const AUSTRALIA_TOOLS: ToolLink[] = [
  {
    icon: Gauge,
    title: "Points Calculator",
    text: "Score your profile for visas 189, 190 and 491 against the 65-point minimum.",
    href: "/tools/australia/points-calculator",
    cta: "Calculate my points",
  },
  {
    icon: Wallet,
    title: "Visa Fee Estimator",
    text: "Estimate the base application charge with an indicative AED conversion.",
    href: "/tools/australia/visa-fee-estimator",
    cta: "Estimate the fees",
  },
  {
    icon: Timer,
    title: "Processing Times",
    text: "Look up Home Affairs' indicative processing bands for each skilled subclass.",
    href: "/tools/australia/processing-times",
    cta: "Check the timeline",
  },
  {
    icon: Briefcase,
    title: "Occupation Discovery",
    text: "Search ANZSCO groups, skill levels and skills-assessment authorities.",
    href: "/tools/australia/occupation-eligibility-checker",
    cta: "Find my occupation",
  },
];

function ToolCard({ tool, index, market }: { tool: ToolLink; index: number; market: Market }) {
  const accent =
    index === 0
      ? {
          tile: "bg-gradient-to-br from-brand-500 to-brand-700",
          ring: "ring-brand-500/20",
          text: "text-brand-700",
        }
      : {
          tile: "bg-gradient-to-br from-brand-400 to-brand-600",
          ring: "ring-brand-500/15",
          text: "text-brand-700",
        };

  return (
    <a
      href={marketHref(market, tool.href)}
      className={`group relative overflow-hidden rounded-3xl border border-brand-100/80 bg-white p-6 shadow-[0_1px_3px_rgba(23,61,13,0.06),0_10px_30px_rgba(23,61,13,0.07)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_2px_6px_rgba(23,61,13,0.08),0_20px_44px_rgba(23,61,13,0.14)]`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 size-36 rounded-full bg-gradient-to-br from-brand-100/70 to-transparent opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative">
        <span
          className={`mb-4 grid size-11 place-items-center rounded-2xl text-white shadow-md shadow-brand-600/25 transition-transform duration-300 group-hover:scale-110 ${accent.tile}`}
        >
          <tool.icon aria-hidden="true" className="size-5" />
        </span>
        <h3 className="font-display font-bold tracking-tight text-ink">{tool.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">{tool.text}</p>
        <span className={`mt-4 inline-flex items-center gap-1.5 text-xs font-bold ${accent.text}`}>
          {tool.cta}
          <ArrowRight
            aria-hidden="true"
            className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>
    </a>
  );
}

function ToolGroup({
  eyebrow,
  title,
  tools,
  market,
}: {
  eyebrow: string;
  title: string;
  tools: ToolLink[];
  market: Market;
}) {
  return (
    <div className="mt-12">
      <div className="mb-5 flex items-center gap-4">
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-600">
          {eyebrow}
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-brand-200 to-transparent" />
      </div>
      <h3 className="font-display text-xl font-extrabold tracking-tight text-ink">{title}</h3>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool, index) => (
          <ToolCard key={tool.href} tool={tool} index={index} market={market} />
        ))}
      </div>
    </div>
  );
}

export function ToolsSection({ market }: { market: Market }) {
  return (
    <section id="tools" className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHeading
          align="left"
          eyebrow="Free assessment tools"
          title="See how your profile fits, before you commit"
          lede={`No obligation, no filing fees — score yourself against the real criteria with a free tool, then book a consultation whenever you're ready${market === "dubai" || market === "abu-dhabi" ? " in the UAE" : ` in ${MARKET_LABELS[market]}`}.`}
        />

        <ToolGroup eyebrow="Start here" title="Every journey begins with a fit check" tools={GENERAL_TOOLS} market={market} />
        <ToolGroup eyebrow="Canada" title="Express Entry, CLB, FSW & provincial tools" tools={CANADA_TOOLS} market={market} />
        <ToolGroup eyebrow="Australia" title="Points, fees, timelines & occupations" tools={AUSTRALIA_TOOLS} market={market} />
      </div>
    </section>
  );
}
