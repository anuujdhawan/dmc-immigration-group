import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MARKET_LIST, isMarket, type Market } from "@/config/markets";
import { env } from "@/config/env/server";
import { getPageContent } from "@/content/pages";
import { canonicalUrl } from "@/lib/routing/routes";
import { ProgramPage } from "@/components/pages/ProgramPage";

export function generateStaticParams() {
  return MARKET_LIST.map((market) => ({ market }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[market]/tools">): Promise<Metadata> {
  const { market } = await params;
  const page = isMarket(market) ? getPageContent("tools") : null;
  if (!page) return {};
  return {
    title: page.seoTitle,
    description: page.seoDescription,
    alternates: {
      canonical: canonicalUrl(market as Market, "/tools", env.SITE_URL).toString(),
    },
  };
}

export default async function ToolsHubPage({ params }: PageProps<"/[market]/tools">) {
  const { market } = await params;
  if (!isMarket(market)) notFound();
  const page = getPageContent("tools");
  if (!page) notFound();
  return <ProgramPage page={page} market={market} />;
}
