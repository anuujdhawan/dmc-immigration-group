"use client";

import { useState, useRef, useEffect } from "react";
import { MARKET_LABELS, type Market } from "@/config/markets";

const MARKETS: Market[] = ["dubai", "abu-dhabi", "qatar", "kuwait", "india"];

interface WhatsAppLauncherProps {
  market: Market;
  prefilledMessage: string;
  numbers: Record<Market, string>;
}

export function WhatsAppLauncher({ market, prefilledMessage, numbers }: WhatsAppLauncherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node) && buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  function openWhatsApp(m: Market) {
    const num = numbers[m];
    if (!num) return;
    const cleaned = num.replace(/[^0-9]/g, "");
    const encoded = encodeURIComponent(prefilledMessage);
    window.open(`https://wa.me/${cleaned}?text=${encoded}`, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  }

  const availableMarkets = MARKETS.filter((m) => numbers[m]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 max-sm:bottom-4 max-sm:right-4">
      {isOpen && (
        <div
          ref={panelRef}
          className="w-72 rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden"
          role="dialog"
          aria-label="Contact us on WhatsApp"
        >
          <div className="bg-[#25D366] px-5 py-4 text-white">
            <p className="font-display text-sm font-bold">Chat with us on WhatsApp</p>
            <p className="mt-0.5 text-xs text-white/80">Choose your preferred office</p>
          </div>
          <div className="divide-y divide-slate-100">
            {availableMarkets.map((m) => (
              <button
                key={m}
                onClick={() => openWhatsApp(m)}
                className={`flex w-full items-center gap-3 px-5 py-3 text-left text-sm transition hover:bg-brand-50 ${
                  m === market ? "bg-brand-50 font-medium" : ""
                }`}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366] text-xs font-bold text-white">
                  {m === "abu-dhabi" ? "AUH" : m === "dubai" ? "DXB" : m === "qatar" ? "QA" : m === "kuwait" ? "KW" : "IN"}
                </span>
                <div>
                  <span className="block font-medium text-ink">{MARKET_LABELS[m]}</span>
                  <span className="text-xs text-slate-500">{numbers[m]}</span>
                </div>
                {m === market && (
                  <span className="ml-auto rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-semibold text-brand-700">
                    Current
                  </span>
                )}
              </button>
            ))}
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-full px-5 py-2.5 text-xs text-slate-500 hover:bg-slate-50 transition"
          >
            Close
          </button>
        </div>
      )}

      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:bg-[#20BD5A] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
        aria-label="Contact us on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </button>
    </div>
  );
}
