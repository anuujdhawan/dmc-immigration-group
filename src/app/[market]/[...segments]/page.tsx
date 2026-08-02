import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MARKET_LIST, isMarket, type Market } from "@/config/markets";
import { env } from "@/config/env/server";
import { PAGE_IDS, getPageContent } from "@/content/pages";
import { canonicalUrl } from "@/lib/routing/routes";
import { ProgramPage } from "@/components/pages/ProgramPage";

export function generateStaticParams() {
  return MARKET_LIST.flatMap((market) =>
    PAGE_IDS.map((id) => ({ market, segments: id.split("/") })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[market]/[...segments]">): Promise<Metadata> {
  const { market, segments } = await params;
  const page = isMarket(market) ? getPageContent(segments.join("/")) : null;
  if (!page) return {};
  return {
    title: page.seoTitle,
    description: page.seoDescription,
    robots: page.noindex ? { index: false, follow: false } : undefined,
    alternates: {
      canonical: canonicalUrl(market as Market, `/${page.id}`, env.SITE_URL).toString(),
    },
  };
}

export default async function ContentPage({ params }: PageProps<"/[market]/[...segments]">) {
  const { market, segments } = await params;
  if (!isMarket(market)) notFound();
  const page = getPageContent(segments.join("/"));
  if (!page) notFound();
  return <ProgramPage page={page} market={market} />;
}
