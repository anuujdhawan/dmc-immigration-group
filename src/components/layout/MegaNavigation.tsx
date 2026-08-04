"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

import { NAV_PRIMARY, marketHrefForNav } from "@/config/navigation";
import type { Market } from "@/config/markets";
import { cn } from "@/lib/utils/cn";

interface MegaNavigationProps {
  market: Market;
}

const panelWidths: Record<string, string> = {
  Visas: "min(820px, calc(100vw - 2rem))",
  Services: "min(680px, calc(100vw - 2rem))",
  Resources: "min(300px, calc(100vw - 2rem))",
  Tools: "min(320px, calc(100vw - 2rem))",
};

export function MegaNavigation({ market }: MegaNavigationProps) {
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const pathname = usePathname();

  const isActiveItem = (label: string) => {
    if (label === "Home") {
      return pathname === `/${market}` || pathname === `/${market}/`;
    }
    if (label === "Visas") {
      return pathname.includes(`/${market}/visas`);
    }
    if (label === "Services") {
      return pathname.includes(`/${market}/services`) || pathname.includes(`/${market}/study-abroad`) || pathname.includes(`/${market}/business-investment`);
    }
    if (label === "Resources") {
      return pathname.includes(`/${market}/blog`) || pathname.includes(`/${market}/gallery`) || pathname.includes(`/${market}/success-stories`) || pathname.includes(`/${market}/press-media`);
    }
    if (label === "Tools") {
      return pathname.includes(`/${market}/tools`);
    }
    return false;
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenLabel(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <nav aria-label="Primary" className="block">
      <ul className="desktop-nav premium-mega-nav flex items-center gap-0.5">
        {NAV_PRIMARY.map((item) => {
          const hasPanel = Boolean(item.columns?.length);
          const isOpen = openLabel === item.label;
          const href = item.href ? marketHrefForNav(market, item.href) : undefined;

          return (
            <li
              key={item.label}
              className="nav-item relative"
              onMouseEnter={() => hasPanel && setOpenLabel(item.label)}
              onMouseLeave={() => hasPanel && setOpenLabel(null)}
            >
              {hasPanel ? (
                <>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-haspopup="menu"
                    onFocus={() => setOpenLabel(item.label)}
                    onClick={() => setOpenLabel((current) => (current === item.label ? null : item.label))}
                  className={cn(
                    "nav-link nav-trigger inline-flex items-center gap-1 rounded-[10px] px-[0.72rem] py-[0.72rem] text-[0.68rem] font-[780] whitespace-nowrap text-[rgba(20,32,16,.62)] transition-colors",
                      (isOpen || isActiveItem(item.label)) && "bg-[rgba(69,179,24,.055)] text-[#173D0D]",
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={cn("size-3 opacity-60 transition-transform", isOpen && "rotate-180")}
                    />
                  </button>

                  <div
                    className={cn(
                      "nav-dropdown absolute left-1/2 top-[calc(100%+20px)] z-50 rounded-[28px] border border-[rgba(53,142,26,.12)] bg-[rgba(250,249,245,.97)] p-6 shadow-[0_32px_90px_rgba(16,41,10,.18)] backdrop-blur-2xl transition-[opacity,visibility,transform] duration-150",
                      isOpen ? "visible pointer-events-auto opacity-100" : "invisible pointer-events-none opacity-0",
                    )}
                    style={{
                      width: panelWidths[item.label] ?? "min(640px, calc(100vw - 2rem))",
                      transform: isOpen ? "translate(-50%, 0)" : "translate(-50%, 6px)",
                    }}
                  >
                    <div
                      className={cn(
                        "grid gap-6",
                        item.columns?.length === 4
                          ? "grid-cols-4"
                          : item.columns?.length === 3
                            ? "grid-cols-3"
                            : item.columns?.length === 2
                              ? "grid-cols-2"
                              : "grid-cols-1",
                      )}
                    >
                      {(item.columns ?? []).map((column) => (
                        <div key={column.heading}>
                          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                            {column.heading}
                          </p>
                          <ul className="space-y-0.5">
                            {column.links.map((link) => (
                              <li key={`${column.heading}:${link.label}:${link.href}`}>
                                <a
                                  href={marketHrefForNav(market, link.href)}
                                  className={cn(
                                    "block py-1 text-sm text-slate-600 transition hover:text-brand-700",
                                    link.label.includes("→") && "font-semibold text-brand-700",
                                  )}
                                >
                                  {link.label}
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
                </>
              ) : (
                <a
                  href={href}
                  className={cn(
                    "nav-link block rounded-[10px] px-[0.72rem] py-[0.72rem] text-[0.68rem] font-[780] whitespace-nowrap text-[rgba(20,32,16,.62)] transition-colors hover:bg-[rgba(69,179,24,.055)] hover:text-[#173D0D]",
                    isActiveItem(item.label) && "bg-[rgba(69,179,24,.055)] text-[#173D0D]",
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
