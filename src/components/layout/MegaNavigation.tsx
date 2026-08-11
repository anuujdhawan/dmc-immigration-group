"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";

import { marketHrefForNav } from "@/config/navigation";
import { getMarketNavigation } from "@/config/market-nav";
import type { Market } from "@/config/markets";
import { cn } from "@/lib/utils/cn";

interface MegaNavigationProps {
  market: Market;
}

const panelWidths: Record<string, string> = {
  // Standard markets (dubai, abu-dhabi, qatar)
  Visas: "min(820px, calc(100vw - 2rem))",
  Services: "min(680px, calc(100vw - 2rem))",
  Resources: "min(300px, calc(100vw - 2rem))",
  Tools: "min(820px, calc(100vw - 2rem))",
  // Legacy-market trees (india, kuwait)
  "Visas (legacy)": "min(1080px, calc(100vw - 2rem))",
  "Services (legacy)": "min(680px, calc(100vw - 2rem))",
  "Resources (legacy)": "min(360px, calc(100vw - 2rem))",
  "Tools (legacy)": "min(820px, calc(100vw - 2rem))",
};

const LEGACY_MARKETS: Market[] = ["india", "kuwait"];

// Grace period before a panel/flyout closes. The cursor has to cross the
// gap between the trigger and the panel, and on Windows/mouse setups that
// crossing can be slow or jittery. Keeping the menu alive for this window
// (and cancelling it on re-entry) makes the dropdown reliably reachable.
const CLOSE_DELAY_MS = 260;

function isActiveFor(label: string, pathname: string, market: Market): boolean {
  const root = `/${market}`;
  switch (label) {
    case "Home":
      return pathname === root || pathname === `${root}/`;
    case "Visas":
      return (
        pathname.includes(`${root}/visas`) ||
        pathname.includes(`${root}/visit-visas`) ||
        pathname.includes(`${root}/skilled-immigration`) ||
        pathname.includes(`${root}/visit-visa`) ||
        pathname.includes(`${root}/work-permit`) ||
        pathname.includes(`${root}/study-in-`) ||
        pathname.includes(`${root}/spouse-visa`) ||
        pathname.includes(`${root}/sowp`)
      );
    case "Services":
      return (
        pathname.includes(`${root}/services`) ||
        pathname.includes(`${root}/study-abroad`) ||
        pathname.includes(`${root}/business-investment`) ||
        pathname.includes(`${root}/residency-by-investment`) ||
        pathname.includes(`${root}/citizenship-by-investment`) ||
        pathname.includes(`${root}/global-job-search`) ||
        pathname.includes(`${root}/new-zealand-partner`) ||
        pathname.includes(`${root}/partner-of-a-new-zealander`) ||
        pathname.includes(`${root}/partner-visitor-visa`) ||
        pathname.includes(`${root}/us-dependent-visa`)
      );
    case "Resources":
      return (
        pathname.includes(`${root}/blog`) ||
        pathname.includes(`${root}/gallery`) ||
        pathname.includes(`${root}/success-stories`) ||
        pathname.includes(`${root}/client-testimonials`) ||
        pathname.includes(`${root}/dm-gallery`) ||
        pathname.includes(`${root}/press-media`)
      );
    case "Tools":
      return pathname.includes(`${root}/tools`);
    default:
      return false;
  }
}

export function MegaNavigation({ market }: MegaNavigationProps) {
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const [activeFlyout, setActiveFlyout] = useState<string | null>(null);
  const pathname = usePathname();
  const items = getMarketNavigation(market);

  const panelTimerRef = useRef<number | null>(null);
  const flyoutTimerRef = useRef<number | null>(null);

  const clearPanelTimer = useCallback(() => {
    if (panelTimerRef.current !== null) {
      window.clearTimeout(panelTimerRef.current);
      panelTimerRef.current = null;
    }
  }, []);

  const clearFlyoutTimer = useCallback(() => {
    if (flyoutTimerRef.current !== null) {
      window.clearTimeout(flyoutTimerRef.current);
      flyoutTimerRef.current = null;
    }
  }, []);

  const openPanel = useCallback(
    (label: string) => {
      clearPanelTimer();
      clearFlyoutTimer();
      setActiveFlyout(null);
      setOpenLabel(label);
    },
    [clearPanelTimer, clearFlyoutTimer],
  );

  const closePanels = useCallback(() => {
    clearPanelTimer();
    clearFlyoutTimer();
    setOpenLabel(null);
    setActiveFlyout(null);
  }, [clearPanelTimer, clearFlyoutTimer]);

  const schedulePanelClose = useCallback(() => {
    clearPanelTimer();
    panelTimerRef.current = window.setTimeout(() => {
      setOpenLabel(null);
      setActiveFlyout(null);
    }, CLOSE_DELAY_MS);
  }, [clearPanelTimer]);

  const openFlyout = useCallback(
    (key: string) => {
      clearFlyoutTimer();
      setActiveFlyout(key);
    },
    [clearFlyoutTimer],
  );

  const scheduleFlyoutClose = useCallback(() => {
    clearFlyoutTimer();
    flyoutTimerRef.current = window.setTimeout(() => {
      setActiveFlyout(null);
    }, CLOSE_DELAY_MS);
  }, [clearFlyoutTimer]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePanels();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      clearPanelTimer();
      clearFlyoutTimer();
    };
  }, [closePanels, clearPanelTimer, clearFlyoutTimer]);

  return (
    <nav aria-label="Primary" className="block">
      <ul className="desktop-nav premium-mega-nav flex items-center gap-0.5">
        {items.map((item) => {
          const columns = item.columns ?? [];
          const hasPanel = columns.length > 0;
          const isOpen = openLabel === item.label;
          const href = item.href ? marketHrefForNav(market, item.href) : undefined;

          return (
            <li
              key={item.label}
              className="nav-item relative"
              onMouseEnter={() => hasPanel && openPanel(item.label)}
              onMouseLeave={() => hasPanel && schedulePanelClose()}
            >
              {hasPanel ? (
                <>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-haspopup="menu"
                    onFocus={() => hasPanel && openPanel(item.label)}
                    onClick={() =>
                      hasPanel && (openLabel === item.label ? closePanels() : openPanel(item.label))
                    }
                    className={cn(
                      "nav-link nav-trigger inline-flex items-center gap-1 rounded-[10px] px-[0.72rem] py-[0.72rem] text-[0.68rem] font-[780] whitespace-nowrap text-[rgba(20,32,16,.62)] transition-colors",
                      (isOpen || isActiveFor(item.label, pathname, market)) && "bg-[rgba(69,179,24,.055)] text-[#173D0D]",
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={cn("size-3 opacity-60 transition-transform", isOpen && "rotate-180")}
                    />
                  </button>

                  {isOpen ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-full z-40 h-3"
                    />
                  ) : null}

                  <div
                    onMouseEnter={() => openPanel(item.label)}
                    onMouseLeave={() => schedulePanelClose()}
                    className={cn(
                      "nav-dropdown absolute left-1/2 top-[calc(100%+12px)] z-50 rounded-[28px] border border-[rgba(53,142,26,.12)] bg-[rgba(250,249,245,.97)] p-6 shadow-[0_32px_90px_rgba(16,41,10,.18)] backdrop-blur-2xl transition-[opacity,visibility,transform] duration-200 ease-out",
                      isOpen ? "visible pointer-events-auto opacity-100" : "invisible pointer-events-none opacity-0",
                    )}
                    style={{
                      width:
                        panelWidths[LEGACY_MARKETS.includes(market) ? `${item.label} (legacy)` : item.label] ??
                        panelWidths[item.label] ??
                        "min(640px, calc(100vw - 2rem))",
                      transform: isOpen ? "translate(-50%, 0) scale(1)" : "translate(-50%, 8px) scale(.98)",
                    }}
                  >
                    <div
                      className={cn(
                        "grid gap-6",
                        columns.length === 5
                          ? "grid-cols-5"
                          : columns.length === 4
                            ? "grid-cols-4"
                            : columns.length === 3
                              ? "grid-cols-3"
                              : columns.length === 2
                                ? "grid-cols-2"
                                : "grid-cols-1",
                      )}
                    >
                      {columns.map((column, columnIndex) => {
                        // Nested flyouts open toward the panel centre so they never
                        // clip off the viewport edge on the outer columns.
                        const flyoutOpensLeft = columnIndex > Math.floor((columns.length - 1) / 2);
                        return (
                          <div key={column.heading} onMouseLeave={() => scheduleFlyoutClose()}>
                            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                              {column.heading}
                            </p>
                            <ul className="space-y-0.5">
                              {column.links.map((link) => {
                                const flyoutKey = `${column.heading}:${link.label}:${link.href}`;
                                const flyoutOpen = activeFlyout === flyoutKey;
                                return (
                                  <li
                                    key={flyoutKey}
                                    className="relative"
                                    onMouseEnter={() => link.children && openFlyout(flyoutKey)}
                                    onFocus={() => link.children && openFlyout(flyoutKey)}
                                    onBlur={() => setActiveFlyout((current) => (current === flyoutKey ? null : current))}
                                  >
                                    <a
                                      href={marketHrefForNav(market, link.href)}
                                      className={cn(
                                        "flex items-center justify-between gap-1.5 rounded-lg py-1 text-sm text-slate-600 transition hover:bg-brand-50 hover:text-brand-700",
                                        link.label.includes("→") && "font-semibold text-brand-700",
                                        link.children && "pr-1",
                                      )}
                                    >
                                      <span>{link.label}</span>
                                      {link.children ? (
                                        <ChevronRight
                                          aria-hidden="true"
                                          className={cn(
                                            "size-3 shrink-0 text-slate-400 transition-transform",
                                            flyoutOpen && "rotate-90",
                                          )}
                                        />
                                      ) : null}
                                    </a>
                                    {link.children ? (
                                      <div
                                        onMouseEnter={() => openFlyout(flyoutKey)}
                                        onMouseLeave={() => scheduleFlyoutClose()}
                                        className={cn(
                                          "absolute top-0 z-20 w-64 rounded-2xl border border-[rgba(53,142,26,.14)] bg-white p-3 shadow-[0_20px_50px_rgba(16,41,10,.16)] transition-[opacity,visibility,transform] duration-200 ease-out",
                                          flyoutOpen
                                            ? "visible translate-y-0 opacity-100"
                                            : "invisible translate-y-1 opacity-0",
                                          flyoutOpensLeft ? "right-full mr-2" : "left-full ml-2",
                                        )}
                                      >
                                        <ul className="space-y-0.5">
                                          {link.children.map((child) => (
                                            <li key={child.href}>
                                              <a
                                                href={marketHrefForNav(market, child.href)}
                                                className="block rounded-lg px-3 py-1.5 text-[0.82rem] leading-snug text-slate-600 transition hover:bg-brand-50 hover:text-brand-700"
                                              >
                                                {child.label}
                                              </a>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ) : null}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : (
                <a
                  href={href}
                  className={cn(
                    "nav-link block rounded-[10px] px-[0.72rem] py-[0.72rem] text-[0.68rem] font-[780] whitespace-nowrap text-[rgba(20,32,16,.62)] transition-colors hover:bg-[rgba(69,179,24,.055)] hover:text-[#173D0D]",
                    isActiveFor(item.label, pathname, market) && "bg-[rgba(69,179,24,.055)] text-[#173D0D]",
                  )}
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
