"use client";

import Image from "next/image";

import { MARKET_LABELS, type Market } from "@/config/markets";

interface WhatsAppLauncherProps {
  market: Market;
  /** The current market's WhatsApp number (E.164, from env) — empty hides the bubble. */
  number: string;
  prefilledMessage: string;
}

/**
 * Floating WhatsApp bubble (bottom-right). Clicking it opens a chat directly
 * with the WhatsApp number of the market whose page the visitor is on — there
 * is no office picker. If the market has no configured number the bubble is not
 * rendered at all.
 */
export function WhatsAppLauncher({ market, number, prefilledMessage }: WhatsAppLauncherProps) {
  if (!number) return null;

  function openWhatsApp() {
    const cleaned = number.replace(/[^0-9]/g, "");
    const encoded = encodeURIComponent(prefilledMessage);
    window.open(`https://wa.me/${cleaned}?text=${encoded}`, "_blank", "noopener,noreferrer");
  }

  return (
    <button
      onClick={openWhatsApp}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:bg-[#20BD5A] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 max-sm:bottom-4 max-sm:right-4"
      aria-label={`Chat with ${MARKET_LABELS[market]} on WhatsApp`}
      title={`Chat with ${MARKET_LABELS[market]} on WhatsApp`}
    >
      <Image
        src="/media/brand/whatsapp.webp"
        alt=""
        width={200}
        height={200}
        className="h-12 w-12"
        aria-hidden
      />
    </button>
  );
}
