import { notFound } from "next/navigation";

import { MARKET_LIST, isMarket } from "@/config/markets";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export function generateStaticParams() {
  return MARKET_LIST.map((market) => ({ market }));
}

export default async function MarketLayout({
  children,
  params,
}: LayoutProps<"/[market]">) {
  const { market } = await params;
  if (!isMarket(market)) notFound();
  return (
    <div className="flex grow flex-col">
      <SiteHeader market={market} />
      <main className="flex grow flex-col">{children}</main>
      <SiteFooter market={market} />
    </div>
  );
}
