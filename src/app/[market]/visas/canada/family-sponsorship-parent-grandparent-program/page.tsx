import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FamilySponsorshipPage } from "@/components/pages/CanadaInternalProgramPages";
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
}: PageProps<"/[market]/visas/canada/family-sponsorship-parent-grandparent-program">): Promise<Metadata> {
  const { market } = await params;
  const page = getPageContent("visas/canada/family-sponsorship-parent-grandparent-program");
  if (!page) return {};

  return {
    title: page.seoTitle,
    description: page.seoDescription,
    alternates: {
      canonical: canonicalUrl(market as Market, "/visas/canada/family-sponsorship-parent-grandparent-program", env.SITE_URL).toString(),
    },
  };
}

export default async function FamilySponsorshipRoute({
  params,
}: PageProps<"/[market]/visas/canada/family-sponsorship-parent-grandparent-program">) {
  const { market } = await params;
  if (!isMarket(market)) notFound();

  const office = getOffice(market);

  return (
    <FamilySponsorshipPage
      market={market}
      phoneHref={`tel:${office.phoneE164}`}
      phoneLabel={office.phoneDisplay}
    />
  );
}
