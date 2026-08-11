import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkilledWorkRegional491Page } from "@/components/pages/AustraliaInternalProgramPages";
import { isMarket, type Market } from "@/config/markets";
import { getOffice } from "@/config/offices";
import { getPageContent } from "@/content/pages";
import { marketSeo } from "@/lib/seo/market-seo";
export function generateStaticParams() {
  return ["dubai", "abu-dhabi", "qatar", "kuwait", "india"].map((market) => ({ market }));
}
export async function generateMetadata({ params }: { params: Promise<{ market: string }> }): Promise<Metadata> {
  const { market } = await params;
  const page = getPageContent("visas/australia/skilled-work-regional-491");
  if (!page) return {};
  return marketSeo({
    title: page.seoTitle,
    description: page.seoDescription,
    market: market as Market,
    path: "/visas/australia/skilled-work-regional-491",
  });
}
export default async function SkilledWorkRegional491Route({ params }: { params: Promise<{ market: string }> }) {
  // ===========================================================================
  // ROUTE DISABLED — page rendering commented out per request: only the 4
  // landing pages and 4 thank-you pages are live. This route intentionally
  // returns 404 (notFound) instead of rendering.
  // ===========================================================================
  // const { market } = await params;
  // if (!isMarket(market)) notFound();
  // const office = getOffice(market);
  // return <SkilledWorkRegional491Page market={market} phoneHref={"tel:" + office.phoneE164} phoneLabel={office.phoneDisplay} />;
  // ===========================================================================
  notFound();
}
