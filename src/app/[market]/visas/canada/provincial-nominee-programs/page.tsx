import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProvincialNomineeProgramsPage } from "@/components/pages/CanadaInternalProgramPages";
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
}: PageProps<"/[market]/visas/canada/provincial-nominee-programs">): Promise<Metadata> {
  const { market } = await params;
  const page = getPageContent("visas/canada/provincial-nominee-programs");
  if (!page) return {};

  return marketSeo({
    title: page.seoTitle,
    description: page.seoDescription,
    market: market as Market,
    path: "/visas/canada/provincial-nominee-programs",
  });
}

export default async function ProvincialNomineeProgramsRoute({
  params,
}: PageProps<"/[market]/visas/canada/provincial-nominee-programs">) {
  const { market } = await params;
  if (!isMarket(market)) notFound();

  const office = getOffice(market);

  return (
    <ProvincialNomineeProgramsPage
      market={market}
      phoneHref={`tel:${office.phoneE164}`}
      phoneLabel={office.phoneDisplay}
    />
  );
}
