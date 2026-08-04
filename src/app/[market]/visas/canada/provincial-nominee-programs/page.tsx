import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProvincialNomineeProgramsPage } from "@/components/pages/CanadaInternalProgramPages";
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
}: PageProps<"/[market]/visas/canada/provincial-nominee-programs">): Promise<Metadata> {
  const { market } = await params;
  const page = getPageContent("visas/canada/provincial-nominee-programs");
  if (!page) return {};

  return {
    title: page.seoTitle,
    description: page.seoDescription,
    alternates: {
      canonical: canonicalUrl(market as Market, "/visas/canada/provincial-nominee-programs", env.SITE_URL).toString(),
    },
  };
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
