import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PermanentResidence191Page } from "@/components/pages/AustraliaInternalProgramPages";
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
  const page = getPageContent("visas/australia/permanent-residence-skilled-regional-191");
  if (!page) return {};
  return { title: page.seoTitle, description: page.seoDescription, alternates: { canonical: canonicalUrl(market as Market, "/visas/australia/permanent-residence-skilled-regional-191", env.SITE_URL).toString() } };
}
export default async function PermanentResidence191Route({ params }: { params: Promise<{ market: string }> }) {
  const { market } = await params;
  if (!isMarket(market)) notFound();
  const office = getOffice(market);
  return <PermanentResidence191Page market={market} phoneHref={"tel:" + office.phoneE164} phoneLabel={office.phoneDisplay} />;
}
