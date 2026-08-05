import { Phone } from "lucide-react";

import type { Market } from "@/config/markets";
import { getOffice } from "@/config/offices";
import { BrandLogo } from "@/components/layout/BrandLogo";

/**
 * Distraction-free header for landing pages.
 *
 * By design there are NO navigation links here: no home link, no menu, nothing
 * that can take the visitor away from the page. The only interactive element is
 * the CTA that scrolls to the in-page assessment form.
 */
export function LandingHeader({ market }: { market: Market }) {
  const office = getOffice(market);
  return (
    <header
      aria-label="DMC landing"
      className="fixed inset-x-0 top-0 z-110 px-3 pt-[max(10px,env(safe-area-inset-top))] sm:px-4"
    >
      <div className="mx-auto flex w-[min(1210px,calc(100%-2rem))] flex-wrap items-center justify-between gap-x-4 gap-y-2.5 rounded-2xl border border-brand-600/10 bg-white/95 px-4 py-2.5 shadow-[0_18px_54px_rgba(16,41,10,.085)] backdrop-blur-[21px]">
        <div className="flex shrink-0 items-center" aria-label="DMC Immigration Group">
          <BrandLogo variant="header" />
        </div>

        <div className="hidden min-w-0 items-center justify-center gap-3 lg:flex">
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-brand-600/10 bg-brand-50/80 px-3 py-1.5 text-[0.66rem] font-bold uppercase tracking-[0.14em] text-brand-800">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-600" />
            RCIC · MARA Registered
          </span>
          <span className="hidden items-center gap-1.5 whitespace-nowrap rounded-full border border-brand-600/10 bg-brand-50/80 px-3 py-1.5 text-[0.66rem] font-bold uppercase tracking-[0.14em] text-brand-800 xl:inline-flex">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-600" />
            10+ Years in the UAE
          </span>
          <span className="hidden items-center gap-1.5 whitespace-nowrap rounded-full border border-brand-600/10 bg-brand-50/80 px-3 py-1.5 text-[0.66rem] font-bold uppercase tracking-[0.14em] text-brand-800 xl:inline-flex">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-600" />
            2,000+ 5-Star Reviews
          </span>
        </div>

        <div className="landing-header-actions flex min-w-0 items-center justify-between gap-3 sm:justify-end">
          <span className="hidden items-center gap-1.5 text-sm font-semibold text-charcoal md:inline-flex">
            <Phone aria-hidden="true" className="size-3.5 text-brand-600" />
            {office.phoneDisplay}
          </span>
          <a
            href="#lead-form"
            className="landing-header-cta inline-flex items-center justify-center rounded-xl bg-brand-600 px-4 py-3 text-sm font-bold text-white shadow-md transition hover:bg-brand-700"
          >
            Check My Eligibility — Free
          </a>
        </div>
      </div>
    </header>
  );
}
