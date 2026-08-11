import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SkilledIndependent189Page } from "@/components/pages/AustraliaInternalProgramPages";
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
}: { params: Promise<{ market: string }> }): Promise<Metadata> {
  const { market } = await params;
  const page = getPageContent("visas/australia/skilled-independent-189");
  if (!page) return {};
  return marketSeo({
    title: page.seoTitle,
    description: page.seoDescription,
    market: market as Market,
    path: "/visas/australia/skilled-independent-189",
  });
}

export default async function SkilledIndependent189Route({
  params,
}: { params: Promise<{ market: string }> }) {
  const { market } = await params;
  if (!isMarket(market)) notFound();
  const office = getOffice(market);
  return (
    <SkilledIndependent189Page
      market={market}
      phoneHref={"tel:" + office.phoneE164}
      phoneLabel={office.phoneDisplay}
    />
  );
}
