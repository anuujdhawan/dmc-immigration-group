import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RuralAndNorthernImmigrationPilotPage } from "@/components/pages/CanadaInternalProgramPages";
import { isMarket, type Market } from "@/config/markets";
import { getOffice } from "@/config/offices";
import { getPageContent } from "@/content/pages";
import { marketSeo } from "@/lib/seo/market-seo";

export function generateStaticParams() {
  return ["dubai", "abu-dhabi", "qatar", "kuwait", "india"].map((market) => ({
    market,
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[market]/visas/canada/rural-and-northern-immigration-pilot">): Promise<Metadata> {
  const { market } = await params;
  const page = getPageContent("visas/canada/rural-and-northern-immigration-pilot");
  if (!page) return {};

  return marketSeo({
    title: page.seoTitle,
    description: page.seoDescription,
    market: market as Market,
    path: "/visas/canada/rural-and-northern-immigration-pilot",
  });
}

export default async function RuralAndNorthernImmigrationPilotRoute({
  params,
}: PageProps<"/[market]/visas/canada/rural-and-northern-immigration-pilot">) {
  // ===========================================================================
  // ROUTE DISABLED — page rendering commented out per request: only the 4
  // landing pages and 4 thank-you pages are live. This route intentionally
  // returns 404 (notFound) instead of rendering.
  // ===========================================================================
  // const { market } = await params;
  // if (!isMarket(market)) notFound();
  //
  // const office = getOffice(market);
  //
  // return (
  //   <RuralAndNorthernImmigrationPilotPage
  //     market={market}
  //     phoneHref={`tel:${office.phoneE164}`}
  //     phoneLabel={office.phoneDisplay}
  //   />
  // );
  // ===========================================================================
  notFound();
}
