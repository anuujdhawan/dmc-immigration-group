import { ArrowRight } from "lucide-react";

import type { Market } from "@/config/markets";
import { MARKET_LABELS } from "@/config/markets";
import { Button } from "@/components/ui/Button";
import { marketHref } from "@/lib/routing/routes";

export interface ContactCtaContent {
  kicker: string;
  title: string;
  copy: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  /** Optional line under the buttons, e.g. "Call Now — +971 4 344 7757". */
  callLabel?: string;
  /** Link target for the call line (a `tel:` href). Rendered as a link only when set. */
  callHref?: string;
  /** Optional small note under the call line, e.g. the urgency copy. */
  urgency?: string;
}

/**
 * Shared contact/CTA band used above the footer on the homepage and the
 * campaign landing pages. The homepage content is the default so both pages
 * share one visual identity (soft brand gradient, rounded-full pill, rounded
 * buttons); callers override it through `content` when the copy differs.
 */
export function ContactCtaSection({
  market,
  content,
}: {
  market: Market;
  content?: ContactCtaContent;
}) {
  const {
    kicker = "Your next beginning",
    title = "Let your future take root",
    copy = `Begin with a private conversation about your profile, priorities and possible destinations — in ${MARKET_LABELS[market]} or online. No rushed decisions. No unrealistic guarantees.`,
    primaryLabel = "Book Consultation",
    primaryHref = marketHref(market, "/contact"),
    callLabel,
    callHref,
    urgency,
  } = content ?? {};

  return (
      <section
        id="contact"
        className="relative overflow-hidden bg-linear-to-br from-red-50 via-blue-50 to-brand-50 py-20 lg:py-24"
      >
      <div aria-hidden="true" className="absolute -top-16 -left-16 h-72 w-72 rounded-full bg-red-200/50 blur-3xl" />
      <div aria-hidden="true" className="absolute top-1/3 -right-20 h-80 w-80 rounded-full bg-blue-200/50 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-20 left-1/3 h-72 w-72 rounded-full bg-brand-200/50 blur-3xl" />
      <div className="relative mx-auto max-w-190 px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-700 shadow-sm">
          {kicker}
        </span>
        <h2 className="mt-5 font-display text-3xl font-extrabold text-ink sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 leading-relaxed text-slate-600">
          {copy}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href={primaryHref} size="lg" className="rounded-xl">
            {primaryLabel}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
          
        </div>
        {callLabel ? (
          <div className="mt-4 flex flex-col items-center gap-2">
            {callHref ? (
              <a href={callHref} className="text-xs font-semibold text-ink transition hover:text-brand-700">
                {callLabel}
              </a>
            ) : (
              <p className="text-xs font-semibold text-ink">{callLabel}</p>
            )}
            {urgency ? <p className="text-xs text-slate-600">{urgency}</p> : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
