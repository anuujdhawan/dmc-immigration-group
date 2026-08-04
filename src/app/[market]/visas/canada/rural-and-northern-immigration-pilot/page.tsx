import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RuralAndNorthernImmigrationPilotPage } from "@/components/pages/CanadaInternalProgramPages";
import { isMarket, type Market } from "@/config/markets";
import { env } from "@/config/env/server";
import { getOffice } from "@/config/offices";
import { getPageContent } from "@/content/pages";
import { canonicalUrl } from "@/lib/routing/routes";

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

  return {
    title: page.seoTitle,
    description: page.seoDescription,
    alternates: {
      canonical: canonicalUrl(market as Market, "/visas/canada/rural-and-northern-immigration-pilot", env.SITE_URL).toString(),
    },
  };
}

export default async function RuralAndNorthernImmigrationPilotRoute({
  params,
}: PageProps<"/[market]/visas/canada/rural-and-northern-immigration-pilot">) {
  const { market } = await params;
  if (!isMarket(market)) notFound();

  const office = getOffice(market);

  return (
    <RuralAndNorthernImmigrationPilotPage
      market={market}
      phoneHref={`tel:${office.phoneE164}`}
      phoneLabel={office.phoneDisplay}
    />
  );
}
