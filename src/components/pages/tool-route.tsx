import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isMarket, type Market } from "@/config/markets";
import { env } from "@/config/env/server";
import { canonicalUrl } from "@/lib/routing/routes";
import { ToolPage, type ToolPageProps } from "./ToolPage";

export function toolStaticParams() {
  return ["dubai", "abu-dhabi", "qatar", "kuwait", "india"].map((market) => ({ market }));
}

export async function toolMetadata(
  params: Promise<{ market: string }>,
  path: string,
  title: string,
  description: string,
): Promise<Metadata> {
  const { market } = await params;
  if (!isMarket(market)) return {};
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl(market as Market, path, env.SITE_URL).toString(),
    },
  };
}

export async function ToolRoute({
  params,
  page,
}: {
  params: Promise<{ market: string }>;
  page: ToolPageProps;
}) {
  const { market } = await params;
  if (!isMarket(market)) notFound();
  return <ToolPage {...page} market={market} />;
}
