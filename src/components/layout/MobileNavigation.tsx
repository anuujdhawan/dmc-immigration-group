"use client";

import { useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import { NAV_LEGAL, NAV_PRIMARY, NAV_TOOLS, marketHrefForNav } from "@/config/navigation";
import type { Market } from "@/config/markets";
import { cn } from "@/lib/utils/cn";

interface MobileNavigationProps {
  market: Market;
}

const emptySubscribe = () => () => {};

export function MobileNavigation({ market }: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  return (
    <>
      <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex size-10 items-center justify-center rounded-full border border-slate-200 text-charcoal hover:bg-brand-50"
      >
        <span className="relative block h-3.5 w-4.5">
          <span
            className={cn(
              "absolute left-0 top-0 h-0.5 w-full rounded bg-current transition-all duration-200",
              open && "top-1.5 rotate-45",
            )}
          />
          <span
            className={cn(
              "absolute left-0 top-1.5 h-0.5 w-full rounded bg-current transition-opacity duration-200",
              open && "opacity-0",
            )}
          />
          <span
            className={cn(
              "absolute left-0 top-3 h-0.5 w-full rounded bg-current transition-all duration-200",
              open && "top-1.5 -rotate-45",
            )}
          />
        </span>
      </button>

      </div>
      {mounted &&
        createPortal(
          <div
            id="mobile-nav-panel"
            className={cn(
              "fixed inset-x-0 top-[var(--header-offset-mobile)] bottom-0 z-40 overflow-y-auto bg-white transition-transform duration-300 lg:hidden",
              open ? "translate-y-0" : "pointer-events-none -translate-y-4 opacity-0",
            )}
          >
            <nav aria-label="Mobile" className="px-5 pb-16 pt-4">
              <ul className="space-y-1">
                {NAV_PRIMARY.map((item) => {
                  if (!item.columns) {
                    return (
                      <li key={item.label}>
                        <a
                          href={item.href ? marketHrefForNav(market, item.href) : "#"}
                          onClick={() => setOpen(false)}
                          className="block rounded-xl px-4 py-3 font-display text-lg font-semibold text-charcoal hover:bg-brand-50"
                        >
                          {item.label}
                        </a>
                      </li>
                    );
                  }
                  const isExpanded = expanded === item.label;
                  return (
                    <li key={item.label} className="rounded-xl">
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        onClick={() => setExpanded(isExpanded ? null : item.label)}
                        className="flex w-full items-center justify-between px-4 py-3 font-display text-lg font-semibold text-charcoal hover:bg-brand-50"
                      >
                        {item.label}
                        <span
                          aria-hidden="true"
                          className={cn(
                            "text-brand-600 transition-transform duration-200",
                            isExpanded && "rotate-45",
                          )}
                        >
                          +
                        </span>
                      </button>
                      {isExpanded ? (
                        <div className="space-y-4 rounded-2xl bg-brand-50/60 p-4">
                          {item.columns.map((column) => (
                            <div key={column.heading}>
                              <p className="mb-2 text-xs font-bold uppercase tracking-mega text-brand-600">
                                {column.heading}
                              </p>
                              <ul className="space-y-1">
                                {column.links.map((link) => (
                                  <li key={link.href}>
                                    <a
                                      href={marketHrefForNav(market, link.href)}
                                      onClick={() => setOpen(false)}
                                      className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-white hover:text-brand-700"
                                    >
                                      {link.label}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8 border-t border-slate-100 pt-6">
                <p className="mb-3 text-xs font-bold uppercase tracking-mega text-brand-600">Tools</p>
                <ul className="space-y-1">
                  {NAV_TOOLS.map((link) => (
                    <li key={link.href}>
                      <a
                        href={marketHrefForNav(market, link.href)}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-4 py-2 text-sm text-slate-700 hover:bg-brand-50"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-6">
                <p className="mb-3 text-xs font-bold uppercase tracking-mega text-brand-600">Legal</p>
                <ul className="space-y-1">
                  {NAV_LEGAL.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-4 py-2 text-sm text-slate-700 hover:bg-brand-50"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>,
          document.body,
        )}
    </>
  );
}
