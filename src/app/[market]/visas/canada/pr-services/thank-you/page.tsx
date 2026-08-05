import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LANDING_MARKETS, isLandingMarket } from "@/config/landing-pages";
import { getOffice } from "@/config/offices";
import { landingDestinationLabel } from "@/content/landing";
import { ThankYouPage } from "@/components/pages/ThankYouPage";

export const dynamicParams = false;

export function generateStaticParams() {
  return LANDING_MARKETS.map((market) => ({ market }));
}

export const metadata: Metadata = {
  title: "Thank You — Enquiry Received | DMC Immigration",
  robots: { index: false, follow: false },
};

export default async function CanadaPrThankYouRoute({
  params,
}: PageProps<"/[market]/visas/canada/pr-services/thank-you">) {
  const { market } = await params;
  if (!isLandingMarket(market)) notFound();
  const office = getOffice(market);
  // The listed number is the market's WhatsApp line from .env, falling back
  // to the office phone if no WhatsApp number is configured yet.
  const hasWhatsApp = office.whatsappE164.trim().length > 0;
  return (
    <ThankYouPage
      programLabel={landingDestinationLabel("canada")}
      phoneDisplay={hasWhatsApp ? office.whatsappDisplay : office.phoneDisplay}
      phoneHref={
        hasWhatsApp
          ? `https://wa.me/${office.whatsappE164.replace(/[^0-9]/g, "")}`
          : `tel:${office.phoneE164}`
      }
    />
  );
}
