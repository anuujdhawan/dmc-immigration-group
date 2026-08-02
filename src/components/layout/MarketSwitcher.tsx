"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { setMarketCookieAction } from "@/app/actions/market";
import { MARKET_LABELS, MARKET_LIST, type Market } from "@/config/markets";
import { cn } from "@/lib/utils/cn";
import { extractMarket, stripMarketPrefix } from "@/lib/routing/routes";

interface MarketSwitcherProps {
  market: Market;
  compact?: boolean;
}

export const FLAG_BY_MARKET: Record<Market, string> = {
  dubai: "🇦🇪",
  "abu-dhabi": "🇦🇪",
  qatar: "🇶🇦",
  kuwait: "🇰🇼",
  india: "🇮🇳",
};

export function MarketSwitcher({ market, compact = false }: MarketSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const switchMarket = async (slug: Market) => {
    if (slug === market) {
      setOpen(false);
      return;
    }
    setBusy(slug);
    const result = await setMarketCookieAction(slug);
    if (result.ok) {
      const rest = stripMarketPrefix(pathname);
      router.push(rest === "/" ? `/${slug}` : `/${slug}${rest}`);
      router.refresh();
    }
    setBusy(null);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-2 rounded-full border border-slate-200 bg-white text-sm font-semibold text-charcoal transition-colors hover:border-brand-600/40 hover:bg-brand-50",
          compact ? "px-3 py-1.5" : "px-4 py-2",
        )}
      >
        <span aria-hidden="true" className="text-base leading-none">
          {FLAG_BY_MARKET[market]}
        </span>
        <span>{MARKET_LABELS[market]}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 12 12"
          className={cn("size-3 text-slate-500 transition-transform", open && "rotate-180")}
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

      {open ? (
        <ul
          role="listbox"
          aria-label="Select your office"
          className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-2xl border border-slate-100 bg-white py-2 shadow-2xl shadow-brand-950/10"
        >
          {MARKET_LIST.map((slug) => {
            const selected = slug === market;
            return (
              <li key={slug} role="option" aria-selected={selected}>
                <button
                  type="button"
                  disabled={busy !== null}
                  onClick={() => switchMarket(slug)}
                  className={cn(
                    "flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors",
                    selected
                      ? "bg-brand-50 font-semibold text-brand-700"
                      : "text-slate-700 hover:bg-slate-50",
                  )}
                >
                  <span aria-hidden="true">{FLAG_BY_MARKET[slug]}</span>
                  <span className="flex-1 text-left">{MARKET_LABELS[slug]}</span>
                  <span aria-hidden="true" className="text-xs text-slate-400">
                    {extractMarket(pathname) === slug ? "✓" : ""}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
