"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

import { marketSectionHref } from "@/lib/routing/routes";
import { NAV_PRIMARY, marketHrefForNav } from "@/config/navigation";
import type { Market } from "@/config/markets";
import { MarketSwitcher } from "@/components/layout/MarketSwitcher";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

interface MobileNavigationProps {
  market: Market;
}

export function MobileNavigation({ market }: MobileNavigationProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-auto min-w-0 items-center pointer-events-auto">
      <div className="flex justify-start">
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobileMenu"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded-[14px] bg-brand-700 text-white shadow-lg transition hover:bg-brand-600"
          id="menuToggle"
        >
          {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
        </button>
      </div>

      <div
        id="mobileMenu"
        className={cn(
          "dmc-mobile-menu absolute left-0 right-0 top-[calc(100%+10px)] z-50 max-h-[calc(100dvh-102px)] overflow-y-auto rounded-card border border-[rgba(53,142,26,.12)] bg-[rgba(250,249,245,.98)] p-3 shadow-[0_25px_70px_rgba(0,0,0,.5)]",
          open ? "block" : "hidden",
        )}
      >
        <nav aria-label="Mobile" className="space-y-1">
          <a
            href={marketSectionHref(market, "home")}
            onClick={() => setOpen(false)}
            className="mobile-simple-link flex items-center justify-between rounded-xl px-[0.85rem] py-[0.86rem] text-[0.8rem] font-extrabold text-charcoal hover:bg-dmc-soft-green hover:text-brand-700"
          >
            Home <span className="text-[0.66rem] font-bold tracking-[0.13em] text-brand-600">01</span>
          </a>

          {NAV_PRIMARY.filter((item) => item.columns?.length).map((item) => (
            <details key={item.label} className="mobile-group rounded-xl">
              <summary className="flex cursor-pointer items-center justify-between gap-4 rounded-xl px-[0.85rem] py-[0.86rem] text-[0.8rem] font-extrabold text-charcoal hover:bg-dmc-soft-green hover:text-brand-700">
                <span>{item.label}</span>
              </summary>
              <div className="mobile-group-links grid gap-[0.36rem] px-[1.15rem] pb-[0.8rem] pt-[0.2rem]">
                {(item.columns ?? []).map((column) => (
                  <div key={column.heading}>
                    <strong className="mt-[0.55rem] block text-[0.61rem] uppercase tracking-[0.13em] text-brand-700">
                      {column.heading}
                    </strong>
                    <div className="mt-1 grid gap-1">
                      {column.links.map((link) => (
                        <a
                          key={`${column.heading}:${link.label}:${link.href}`}
                          href={marketHrefForNav(market, link.href)}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "block rounded-[10px] px-3 py-2 text-[0.73rem] leading-[1.4] text-[#687064] hover:bg-white hover:text-brand-700",
                            link.label.includes("→") && "font-semibold text-brand-700",
                          )}
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </details>
          ))}

          <div className="mt-3 border-t border-slate-200 pt-3">
            <p className="mb-2 px-[0.85rem] text-[0.61rem] uppercase tracking-[0.13em] text-slate-400">
              Select Office
            </p>
            <MarketSwitcher market={market} />
          </div>

          <Button
            href={marketSectionHref(market, "contact")}
            onClick={() => setOpen(false)}
            variant="primary"
            size="md"
            className="mt-3 w-full shadow-[0_12px_34px_rgba(69,179,24,.28)]"
          >
            Book Free Consultation
          </Button>
        </nav>
      </div>
    </div>
  );
}
