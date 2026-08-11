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
  const { market: slug } = await params;
  if (!isMarket(slug)) notFound();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(officeJsonLd(slug)) }}
      />
      <HomeSections market={slug} />
    </>
  );
}
