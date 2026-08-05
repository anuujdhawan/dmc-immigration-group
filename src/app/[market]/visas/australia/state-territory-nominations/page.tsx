import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StateTerritoryNominationsPage } from "@/components/pages/AustraliaInternalProgramPages";
import { isMarket, type Market } from "@/config/markets";
import { env } from "@/config/env/server";
import { getOffice } from "@/config/offices";
import { getPageContent } from "@/content/pages";
import { canonicalUrl } from "@/lib/routing/routes";
export function generateStaticParams() {
  return ["dubai", "abu-dhabi", "qatar", "kuwait", "india"].map((market) => ({ market }));
}
export async function generateMetadata({ params }: { params: Promise<{ market: string }> }): Promise<Metadata> {
  const { market } = await params;
  const page = getPageContent("visas/australia/state-territory-nominations");
  if (!page) return {};
  return { title: page.seoTitle, description: page.seoDescription, alternates: { canonical: canonicalUrl(market as Market, "/visas/australia/state-territory-nominations", env.SITE_URL).toString() } };
}
export default async function StateTerritoryNominationsRoute({ params }: { params: Promise<{ market: string }> }) {
  const { market } = await params;
  if (!isMarket(market)) notFound();
  const office = getOffice(market);
  return <StateTerritoryNominationsPage market={market} phoneHref={"tel:" + office.phoneE164} phoneLabel={office.phoneDisplay} />;
}
