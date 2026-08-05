import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { env } from "@/config/env/server";
import { canonicalUrl } from "@/lib/routing/routes";
import { LANDING_MARKETS, isLandingMarket } from "@/config/landing-pages";
import { getLandingContent } from "@/content/landing";
import { LandingPage } from "@/components/pages/LandingPage";

export const dynamicParams = false;

export function generateStaticParams() {
  return LANDING_MARKETS.map((market) => ({ market }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[market]/visas/australia/pr-services">): Promise<Metadata> {
  const { market } = await params;
  if (!isLandingMarket(market)) return {};
  const content = getLandingContent("australia", market);
  return {
    title: content.seoTitle,
    description: content.seoDescription,
    alternates: {
      canonical: canonicalUrl(market, "/visas/australia/pr-services", env.SITE_URL).toString(),
    },
  };
}

export default async function AustraliaPrLandingRoute({
  params,
}: PageProps<"/[market]/visas/australia/pr-services">) {
  const { market } = await params;
  if (!isLandingMarket(market)) notFound();
  const content = getLandingContent("australia", market);
  return <LandingPage content={content} market={market} />;
}
