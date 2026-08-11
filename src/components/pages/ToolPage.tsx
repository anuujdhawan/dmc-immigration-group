import type { ReactNode } from "react";

import { getOffice } from "@/config/offices";
import { LeadFormSection } from "@/components/pages/internal/InternalPageTemplate";
import { Hero } from "@/components/home/Hero";
import { marketHref } from "@/lib/routing/routes";
import { MARKET_LABELS, type Market } from "@/config/markets";
import type { ToolFamily } from "@/config/tools";
import { interpolateMarket, marketAudience } from "@/lib/i18n/market-copy";
import { ToolFeatureBand } from "./ToolFeatureBand";

export interface ToolPageProps {
  market: Market;
  /** Tool family — selects the country photography used across the page. */
  family: ToolFamily;
  eyebrow: string;
  title: string;
  lede: string;
  /** Official sources shown in the sources band. */
  sources: { label: string; url: string }[];
  lastVerified: string;
  children: ReactNode;
  /** Optional extra copy rendered above the sources band. */
  note?: ReactNode;
}

/** Splits a title so the final word renders as the hero's green accent. */
function splitTitle(title: string): { first: string; rest: string } {
  const words = title.trim().split(/\s+/);
  if (words.length <= 1) return { first: title, rest: "" };
  const last = words.pop() ?? "";
  return { first: `${words.join(" ")} `, rest: last };
}

export function ToolPage({
  market,
  family,
  eyebrow,
  title,
  lede,
  sources,
  lastVerified,
  children,
  note,
}: ToolPageProps) {
  const office = getOffice(market);
  const { first, rest } = splitTitle(interpolateMarket(title, market));

  return (
    <main className="bg-white">
      {/* The homepage hero, applied as-is: botanical band, orbiting destination
          network, floating leaves and the standard actions/proof row. */}
      <Hero
        market={market}
        sectionId="hero-tools"
        eyebrow={`${interpolateMarket(eyebrow, market)} · ${MARKET_LABELS[market]} market`}
        titlePrefix={first}
        titleAccent={rest}
        titleSuffix=""
        subtitle={interpolateMarket(lede, market)}
        primaryAction={{ label: "Book Consultation", href: "#free-assessment" }}
        secondaryAction={{
          label: "Free Eligibility Assessment",
          href: marketHref(market, "/tools/eligibility-checker"),
        }}
        scrollTarget="#tool"
        scrollLabel="Use the tool"
      />

      {/* Country photography that used to sit inside the old tool hero. */}
      <ToolFeatureBand family={family} marketLabel={MARKET_LABELS[market]} />

      {/* Tool */}
      <section id="tool" className="scroll-mt-24 bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="rounded-[28px] border border-brand-600/10 bg-[linear-gradient(165deg,#f4f9f1_0%,#ffffff_48%,#eef6ea_100%)] p-4 shadow-[0_20px_52px_rgba(16,41,10,0.05)] md:p-8">
            {children}
          </div>

          {note ? (
            <div className="mt-8 rounded-[24px] border border-brand-100 bg-[linear-gradient(150deg,#f4f9f1_0%,#ffffff_60%,#eaf4e5_100%)] p-6">
              {note}
            </div>
          ) : null}

          {/* Official sources */}
          <div className="mt-10 rounded-[24px] border border-brand-600/10 bg-[linear-gradient(160deg,#f4f9f1_0%,#ffffff_55%,#edf5e9_100%)] p-6 md:p-8">
            <h2 className="font-display text-lg font-bold text-ink">Official sources &amp; verification</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Immigration rules, fees and thresholds change regularly. Information on this page was last
              verified <strong className="text-slate-700">{lastVerified}</strong> and should be read alongside
              the official government sources below.
            </p>
            <ul className="mt-4 space-y-2">
              {sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-brand-700 underline-offset-4 hover:underline"
                  >
                    {source.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Related tools */}
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={marketHref(market, "/tools/canada")}
              className="rounded-full border border-brand-200/80 bg-brand-50/70 px-4 py-2 text-sm font-medium text-brand-800 transition hover:border-brand-300 hover:bg-brand-100/70 hover:text-brand-700"
            >
              Canada tools hub
            </a>
            <a
              href={marketHref(market, "/tools/australia")}
              className="rounded-full border border-brand-200/80 bg-brand-50/70 px-4 py-2 text-sm font-medium text-brand-800 transition hover:border-brand-300 hover:bg-brand-100/70 hover:text-brand-700"
            >
              Australia tools hub
            </a>
            <a
              href={marketHref(market, "/tools/eligibility-checker")}
              className="rounded-full border border-brand-200/80 bg-brand-50/70 px-4 py-2 text-sm font-medium text-brand-800 transition hover:border-brand-300 hover:bg-brand-100/70 hover:text-brand-700"
            >
              Free eligibility checker
            </a>
          </div>
        </div>
      </section>

      {/* Lead form band — anchored so in-page “Book Consultation” CTAs (header,
          footer, hero) scroll to the form on this same page. */}
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
