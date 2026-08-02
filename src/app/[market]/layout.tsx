import { notFound } from "next/navigation";

import { MARKET_LIST, isMarket } from "@/config/markets";

export function generateStaticParams() {
  return MARKET_LIST.map((market) => ({ market }));
}

export default async function MarketLayout({
  children,
  params,
}: LayoutProps<"/[market]">) {
  const { market } = await params;
  if (!isMarket(market)) notFound();
  return <>{children}</>;
}
