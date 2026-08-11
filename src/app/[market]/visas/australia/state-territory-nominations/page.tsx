import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StateTerritoryNominationsPage } from "@/components/pages/AustraliaInternalProgramPages";
import { isMarket, type Market } from "@/config/markets";
import { getOffice } from "@/config/offices";
import { getPageContent } from "@/content/pages";
import { marketSeo } from "@/lib/seo/market-seo";
export function generateStaticParams() {
  return ["dubai", "abu-dhabi", "qatar", "kuwait", "india"].map((market) => ({ market }));
}
export async function generateMetadata({ params }: { params: Promise<{ market: string }> }): Promise<Metadata> {
  const { market } = await params;
  const page = getPageContent("visas/australia/state-territory-nominations");
  if (!page) return {};
  return marketSeo({
    title: page.seoTitle,
    description: page.seoDescription,
    market: market as Market,
    path: "/visas/australia/state-territory-nominations",
  });
}
export default async function StateTerritoryNominationsRoute({ params }: { params: Promise<{ market: string }> }) {
  const { market } = await params;
  if (!isMarket(market)) notFound();
  const office = getOffice(market);
  return <StateTerritoryNominationsPage market={market} phoneHref={"tel:" + office.phoneE164} phoneLabel={office.phoneDisplay} />;
}
