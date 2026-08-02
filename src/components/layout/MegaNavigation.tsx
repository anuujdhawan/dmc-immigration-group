"use client";

import { useState } from "react";

import { NAV_PRIMARY, marketHrefForNav, type NavColumn } from "@/config/navigation";
import type { Market } from "@/config/markets";
import { cn } from "@/lib/utils/cn";

interface MegaNavigationProps {
  market: Market;
}

export function MegaNavigation({ market }: MegaNavigationProps) {
  const [openLabel, setOpenLabel] = useState<string | null>(null);

  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {NAV_PRIMARY.map((item) => {
          const hasPanel = !!item.columns;
          const isOpen = openLabel === item.label;
          const href = item.href ? marketHrefForNav(market, item.href) : undefined;
          return (
            <li key={item.label} className="relative">
              {hasPanel ? (
                <>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onMouseEnter={() => setOpenLabel(item.label)}
                    onMouseLeave={() => setOpenLabel(null)}
                    onFocus={() => setOpenLabel(item.label)}
                    onBlur={() => setOpenLabel(null)}
                    className={cn(
                      "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                      isOpen
                        ? "bg-brand-50 text-brand-700"
                        : "text-charcoal hover:bg-brand-50 hover:text-brand-700",
                    )}
                  >
                    {item.label}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 12 12"
                      className={cn("size-3 transition-transform", isOpen && "rotate-180")}
                    >
                      <path
                        d="M2.5 4.5 6 8l3.5-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                  <div
                    className={cn(
                      "absolute left-1/2 top-full z-50 w-[min(88vw,72rem)] -translate-x-1/2 pt-3 transition-opacity duration-150",
                      isOpen ? "opacity-100" : "pointer-events-none opacity-0",
                    )}
                    onMouseEnter={() => setOpenLabel(item.label)}
                    onMouseLeave={() => setOpenLabel(null)}
                  >
                    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl shadow-brand-950/10">
                      <div className="grid grid-cols-2 gap-x-8 gap-y-8 xl:grid-cols-4">
                        {(item.columns ?? []).map((column: NavColumn) => (
                          <div key={column.heading}>
                            <p className="mb-3 text-xs font-bold uppercase tracking-mega text-brand-600">
                              {column.heading}
                            </p>
                            <ul className="space-y-2.5">
                              {column.links.map((link) => (
                                <li key={link.href}>
                                  <a
                                    href={marketHrefForNav(market, link.href)}
                                    className="group block text-sm text-slate-700 transition-colors hover:text-brand-700"
                                  >
                                    <span className="font-medium text-charcoal group-hover:text-brand-700">
                                      {link.label}
                                    </span>
                                    {link.description ? (
                                      <span className="mt-0.5 block text-xs leading-snug text-slate-500">
                                        {link.description}
                                      </span>
                                    ) : null}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <a
                  href={href}
                  className="block rounded-full px-4 py-2 text-sm font-semibold text-charcoal transition-colors hover:bg-brand-50 hover:text-brand-700"
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
