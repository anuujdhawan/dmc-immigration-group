import type { ReactNode } from "react";

import { getOffice } from "@/config/offices";
import { LeadFormSection } from "@/components/pages/internal/InternalPageTemplate";
import { marketHref } from "@/lib/routing/routes";
import { FloatingLeaves } from "@/components/ui/FloatingLeaves";
import { MARKET_LABELS, type Market } from "@/config/markets";
import { interpolateMarket, marketAudience } from "@/lib/i18n/market-copy";

export interface ToolPageProps {
  market: Market;
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

export function ToolPage({
  market,
  eyebrow,
  title,
  lede,
  sources,
  lastVerified,
  children,
  note,
}: ToolPageProps) {
  const office = getOffice(market);

  return (
    <main className="bg-white">
      {/* Hero band — light-green botanical band with floating leaves (the
          sitewide hero treatment; same palette as the homepage hero on mobile) */}
      <section className="relative isolate overflow-hidden bg-[linear-gradient(to_bottom,#fafaf5_0%,#eff6ec_55%,#dff3da_100%)] py-16 md:py-20">
        <FloatingLeaves />
        <div className="relative mx-auto max-w-[1280px] px-6">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-600">{interpolateMarket(eyebrow, market)}</p>
          <h1 className="max-w-3xl font-display text-3xl font-extrabold leading-tight text-charcoal md:text-5xl">
            {interpolateMarket(title, market)}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            {interpolateMarket(lede, market)}
          </p>
        </div>
      </section>

      {/* Tool */}
      <section className="bg-gradient-to-b from-white via-brand-50/30 to-white py-14 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6">{children}</div>

        {note ? (
          <div className="mx-auto mt-8 max-w-[1280px] px-6">
            <div className="rounded-3xl border border-brand-100 bg-brand-50/70 p-6">{note}</div>
          </div>
        ) : null}

        {/* Official sources */}
        <div className="mx-auto mt-10 max-w-[1280px] px-6">
          <div className="rounded-3xl border border-brand-100/70 bg-white p-6 shadow-[0_1px_3px_rgba(23,61,13,0.06),0_10px_30px_rgba(23,61,13,0.06)] md:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-lg font-bold text-ink">Official sources &amp; verification</h2>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-brand-700">
                Last verified {lastVerified}
              </span>
            </div>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-500">
              Immigration rules, fees and thresholds change regularly. Information on this page should
              always be read alongside the official government sources below.
            </p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-brand-100 bg-brand-50/50 px-4 py-2 text-sm font-semibold text-brand-700 underline-offset-4 transition hover:border-brand-300 hover:bg-brand-50 hover:underline"
                  >
                    {source.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Related tools */}
        <div className="mx-auto mt-6 max-w-[1280px] px-6">
          <div className="flex flex-wrap gap-3">
            <a
              href={marketHref(market, "/tools/canada")}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700"
            >
              Canada tools hub
            </a>
            <a
              href={marketHref(market, "/tools/australia")}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700"
            >
              Australia tools hub
            </a>
            <a
              href={marketHref(market, "/tools/eligibility-checker")}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700"
            >
              Free eligibility checker
            </a>
          </div>
        </div>
      </section>

      {/* Lead form band */}
      <LeadFormSection
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
