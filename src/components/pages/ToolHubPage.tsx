import { toolsByFamily, type ToolFamily } from "@/config/tools";
import { MARKET_LABELS, type Market } from "@/config/markets";
import { marketHref } from "@/lib/routing/routes";
import { getOffice } from "@/config/offices";
import { marketAudience } from "@/lib/i18n/market-copy";

import { Hero } from "@/components/home/Hero";
import { ToolFeatureBand } from "./ToolFeatureBand";
import { toolCardImage } from "./tool-media";
import { LeadFormSection } from "@/components/pages/internal/InternalPageTemplate";

export type ToolHubPath = "tools/canada" | "tools/australia";

export const TOOL_HUB_PATHS: ToolHubPath[] = ["tools/canada", "tools/australia"];

export interface ToolHubConfig {
  family: ToolFamily;
  country: string;
  eyebrow: string;
  title: string;
  lede: string;
}

export const TOOL_HUB_CONFIG: Record<ToolHubPath, ToolHubConfig> = {
  "tools/canada": {
    family: "canada",
    country: "Canada",
    eyebrow: "Free assessment tools",
    title: "Canada Immigration Tools",
    lede: "Estimate your Express Entry CRS score, convert language results to Canadian Language Benchmark levels, check the FSW 67-point grid, match provincial nominee streams and run the RCIP checklist — all free, with official sources.",
  },
  "tools/australia": {
    family: "australia",
    country: "Australia",
    eyebrow: "Free assessment tools",
    title: "Australia Immigration Tools",
    lede: "Score your profile for the points-tested skilled visas (189 / 190 / 491), estimate visa application charges, check processing times and explore skilled occupations by ANZSCO — all free, with official sources.",
  },
};

/** Resolves a /tools/… URL path (relative to the market root) to a hub, or null. */
export function toolHubByPath(path: string): ToolHubPath | null {
  return (TOOL_HUB_PATHS as readonly string[]).includes(path) ? (path as ToolHubPath) : null;
}

/** Tools hub landing page — same botanical hero as the homepage, plus country
 *  photography and the gradient tool cards. */
export function ToolHubPage({ market, hub }: { market: Market; hub: ToolHubPath }) {
  const config = TOOL_HUB_CONFIG[hub];
  const tools = toolsByFamily(config.family);
  const office = getOffice(market);
  return (
    <main className="bg-white">
      {/* The homepage hero, applied as-is for the tools hub. */}
      <Hero
        market={market}
        sectionId={`hero-tools-${hub}`}
        eyebrow={`${config.eyebrow} · ${MARKET_LABELS[market]} market`}
        titlePrefix="Your journey towards a "
        titleAccent={config.country}
        titleSuffix=" plan begins here."
        subtitle={config.lede}
        primaryAction={{ label: "Book Consultation", href: "#free-assessment" }}
        secondaryAction={{
          label: "Free Eligibility Assessment",
          href: marketHref(market, "/tools/eligibility-checker"),
        }}
        scrollTarget="#tools-grid"
        scrollLabel="Explore the tools"
      />

      {/* Country photography anchoring the page under the hero. */}
      <ToolFeatureBand family={config.family} marketLabel={MARKET_LABELS[market]} />

      {/* Tool cards */}
      <section id="tools-grid" className="scroll-mt-24 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool, index) => (
              <li key={tool.path}>
                <a
                  href={marketHref(market, `/tools/${tool.path}`)}
                  className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-brand-600/10 bg-[linear-gradient(165deg,#f4f9f1_0%,#ffffff_55%,#eef6ea_100%)] shadow-[0_14px_40px_rgba(16,41,10,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-600/25 hover:shadow-[0_24px_56px_rgba(16,41,10,0.1)]"
                >
                  <div className="relative h-40 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={toolCardImage(config.family, index)}
                      alt={`${config.country} immigration`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                    />
                    <span className="absolute left-4 top-4 inline-flex w-fit rounded-full bg-white/90 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-brand-700 backdrop-blur">
                      {tool.eyebrow}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-6">
                    <h2 className="font-display text-lg font-bold text-charcoal transition-colors group-hover:text-brand-700">
                      {tool.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-muted">{tool.lede}</p>
                    <span className="mt-auto pt-3 text-xs font-bold uppercase tracking-wide text-brand-600">
                      Open tool →
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Free-assessment form band — anchors `#free-assessment` so the header/
          footer "Book Consultation" CTAs scroll to the form on this page. */}
      <LeadFormSection
        id="free-assessment"
        kicker={`Free assessment · ${MARKET_LABELS[market]} market`}
        title="Not sure where your profile fits?"
        copy={[
          `Speak with the ${office.city} office for a free, no-obligation assessment of your eligibility — prepared for ${marketAudience(market)}.`,
        ]}
        phone={office.phoneDisplay}
        market={market}
      />
    </main>
  );
}
