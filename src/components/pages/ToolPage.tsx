import type { ReactNode } from "react";

import { getOffice } from "@/config/offices";
import { LeadFormSection } from "@/components/pages/internal/InternalPageTemplate";
import { marketHref } from "@/lib/routing/routes";
import { FloatingLeaves } from "@/components/ui/FloatingLeaves";
import { AccordionItem } from "@/components/ui/AccordionItem";
import { MARKET_LABELS, type Market } from "@/config/markets";
import { faqJsonLd } from "@/lib/seo/market-seo";
import { interpolateMarket, marketAudience, marketIn } from "@/lib/i18n/market-copy";

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
  /** Market-relative path of this tool page, used in structured data. */
  path?: string;
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
  path = "/tools",
}: ToolPageProps) {
  const office = getOffice(market);
  const marketLabel = MARKET_LABELS[market];
  const faqItems = [
    {
      question: `How accurate is this ${title.toLowerCase()}?`,
      answer: `The tool estimates based on the rules published by the official authorities and verified on ${lastVerified}. It gives a directional read, not a guarantee — a DMC consultant in ${marketLabel} can review your exact profile, documents and circumstances before any application.`,
    },
    {
      question: "Is this tool free to use?",
      answer: "Yes — every DMC tool is free, with no sign-up and no obligation. You only enter the details needed to calculate your result.",
    },
    {
      question: `What happens after I get my result ${marketIn(market)}?`,
      answer: `Share your result with the ${office.city} office for a free, no-obligation eligibility assessment. A DMC consultant confirms the route fit, the evidence you will need and the realistic next steps for your profile.`,
    },
  ];
  const schema = faqJsonLd(faqItems, market, undefined, path);

  return (
    <main className="bg-white">
      {schema ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /> : null}
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
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 md:p-6">{children}</div>

          {note ? (
            <div className="mt-8 rounded-2xl border border-brand-100 bg-brand-50 p-6">{note}</div>
          ) : null}

          {/* Official sources */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
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

          {/* Common questions — keeps every tool page useful for organic visitors */}
          <div className="mt-12">
            <h2 className="font-display text-2xl font-bold text-ink">Common questions</h2>
            <div className="mt-4 space-y-3">
              {faqItems.map((item) => (
                <AccordionItem key={item.question} question={item.question} answer={item.answer} />
              ))}
            </div>
          </div>

          {/* Related tools */}
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={marketHref(market, "/tools/canada")}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-brand-300 hover:text-brand-700"
            >
              Canada tools hub
            </a>
            <a
              href={marketHref(market, "/tools/australia")}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-brand-300 hover:text-brand-700"
            >
              Australia tools hub
            </a>
            <a
              href={marketHref(market, "/tools/eligibility-checker")}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-brand-300 hover:text-brand-700"
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
