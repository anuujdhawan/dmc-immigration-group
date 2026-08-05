import { ArrowRight, Mail, Phone, Shield } from "lucide-react";

import type { Market } from "@/config/markets";
import { getOffice } from "@/config/offices";
import { marketSectionHref } from "@/lib/routing/routes";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { MarketSwitcher } from "@/components/layout/MarketSwitcher";
import { MegaNavigation } from "@/components/layout/MegaNavigation";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { Button } from "@/components/ui/Button";

export function SiteHeader({ market }: { market: Market }) {
  const office = getOffice(market);

  return (
    <header
      id="siteHeader"
      aria-label="Primary navigation"
      className="dmc-architectural-header fixed inset-x-0 top-0 z-110 px-4 pt-[max(10px,env(safe-area-inset-top))] pointer-events-none lg:px-4.5"
    >
      <div className="premium-utility-bar hidden h-8.5 pointer-events-auto lg:block">
        <div className="premium-utility-inner mx-auto flex h-full w-[min(1210px,calc(100%-2rem))] items-center justify-between gap-4 text-[0.66rem] text-white/70">
          <div className="flex items-center gap-5">
            <a href={`tel:${office.phoneE164}`} className="inline-flex items-center gap-1.5 hover:text-white">
              <Phone aria-hidden="true" className="size-3.5" />
              {office.phoneDisplay}
            </a>
            <a href={`mailto:${office.email}`} className="inline-flex items-center gap-1.5 hover:text-white">
              <Mail aria-hidden="true" className="size-3.5" />
              {office.email}
            </a>
          </div>
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5">
              <Shield aria-hidden="true" className="size-3.5 text-brand-400" />
              RCIC · MARA · ICCRC Regulated
            </span>
            <MarketSwitcher market={market} compact />
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-white/55">
              <span className="text-white/80">EN</span>
              <span aria-hidden="true" className="h-3 w-px bg-white/20" />
              <span>AR</span>
            </span>
          </div>
        </div>
      </div>

      <div className="header-assembly mx-auto mt-2.5 hidden w-[min(1240px,calc(100%-2rem))] items-stretch gap-2.5 rounded-pill border border-[rgba(255,255,255,.64)] bg-[rgba(250,249,245,.69)] px-2.75 py-2 shadow-[0_18px_54px_rgba(16,41,10,.085)] backdrop-blur-[21px] pointer-events-auto lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto]">
        <a
          aria-label="DMC Immigration home"
          className="header-plaque flex min-h-19 items-center justify-center rounded-[999px_18px_18px_999px] bg-white px-3.25 py-2 shadow-[0_16px_38px_rgba(23,61,13,.08)]"
          href={marketSectionHref(market, "home")}
        >
          <BrandLogo variant="header" priority className="brand-logo-header h-11.5 w-auto" />
        </a>

        <div className="header-deck flex min-w-0 items-center justify-center rounded-[18px] px-1.5">
          <MegaNavigation market={market} />
        </div>

        <div className="header-action flex min-h-19 items-center justify-end rounded-[18px_999px_999px_18px] p-1.75">
          <Button
            href={marketSectionHref(market, "contact")}
            size="md"
            variant="primary"
            className="flex min-h-12 items-center gap-2 whitespace-nowrap rounded-full px-4 py-3 text-sm font-bold shadow-[0_12px_34px_rgba(69,179,24,.28)] lg:px-[1.15rem]"
          >
            <span>Book Consultation</span>
            <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
        </div>
      </div>

      <div className="mobile-header relative mx-auto mt-2.5 flex w-[min(1200px,calc(100%-2rem))] items-center gap-2.5 rounded-3xl border border-[rgba(255,255,255,.64)] bg-[rgba(250,249,245,.69)] px-2.75 py-2 shadow-[0_18px_54px_rgba(16,41,10,.085)] backdrop-blur-[21px] pointer-events-auto lg:hidden">
        <a
          aria-label="DMC Immigration home"
          className="header-plaque flex min-h-17 items-center justify-center rounded-[22px] bg-white px-3.25 py-2 shadow-[0_16px_38px_rgba(23,61,13,.08)]"
          href={marketSectionHref(market, "home")}
        >
          <BrandLogo variant="header" priority className="brand-logo-mobile h-10.5 w-auto" />
        </a>

        <div className="flex flex-1 items-center justify-end">
          <MobileNavigation market={market} />
        </div>
      </div>
    </header>
  );
}
