import { ArrowRight } from "lucide-react";

import type { Market } from "@/config/markets";
import { MARKET_LABELS } from "@/config/markets";
import { Button } from "@/components/ui/Button";
import { marketHref } from "@/lib/routing/routes";

export function ContactCtaSection({ market }: { market: Market }) {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-br from-red-50 via-blue-50 to-brand-50 py-20 lg:py-24"
    >
      <div aria-hidden="true" className="absolute -top-16 -left-16 h-72 w-72 rounded-full bg-red-200/50 blur-3xl" />
      <div aria-hidden="true" className="absolute top-1/3 -right-20 h-80 w-80 rounded-full bg-blue-200/50 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-20 left-1/3 h-72 w-72 rounded-full bg-brand-200/50 blur-3xl" />
      <div className="relative mx-auto max-w-[760px] px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-700 shadow-sm">
          Your next beginning
        </span>
        <h2 className="mt-5 font-display text-3xl font-extrabold text-ink sm:text-4xl">
          Let your future take root
        </h2>
        <p className="mt-4 leading-relaxed text-slate-600">
          Begin with a private conversation about your profile, priorities and possible
          destinations — in {MARKET_LABELS[market]} or online. No rushed decisions. No unrealistic guarantees.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href={marketHref(market, "/contact")} size="lg" className="rounded-xl">
            Book Consultation
            <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
          <Button
            href={marketHref(market, "/tools/eligibility-checker")}
            size="lg"
            variant="outline"
            className="rounded-xl"
          >
            Free Eligibility Assessment
          </Button>
        </div>
      </div>
    </section>
  );
}
