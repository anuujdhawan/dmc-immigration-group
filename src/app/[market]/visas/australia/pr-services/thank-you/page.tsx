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

export default async function AustraliaPrThankYouRoute({
  params,
}: PageProps<"/[market]/visas/australia/pr-services/thank-you">) {
  const { market } = await params;
  if (!isLandingMarket(market)) notFound();
  const office = getOffice(market);
  return (
    <ThankYouPage
      programLabel={landingDestinationLabel("australia")}
      phoneDisplay={office.phoneDisplay}
      phoneHref={`tel:${office.phoneE164}`}
    />
  );
}
