import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isMarket } from "@/config/markets";
import { homeSeo, officeJsonLd } from "@/lib/seo/market-seo";
import { HomeSections } from "@/components/home/HomeSections";

export async function generateMetadata({
  params,
}: PageProps<"/[market]">): Promise<Metadata> {
  const { market } = await params;
  if (!isMarket(market)) return {};
  return homeSeo(market);
}

export default async function MarketHomePage({
  params,
}: PageProps<"/[market]">) {
  // ===========================================================================
  // ROUTE DISABLED — page rendering commented out per request: only the 4
  // landing pages and 4 thank-you pages are live. This route intentionally
  // returns 404 (notFound) instead of rendering.
  // ===========================================================================
  // const { market: slug } = await params;
  // if (!isMarket(slug)) notFound();
  // return (
  //   <>
  //     <script
  //       type="application/ld+json"
  //       dangerouslySetInnerHTML={{ __html: JSON.stringify(officeJsonLd(slug)) }}
  //     />
  //     <HomeSections market={slug} />
  //   </>
  // );
  // ===========================================================================
  notFound();
}
