import { notFound } from "next/navigation";

import { MARKET_LIST, isMarket } from "@/config/markets";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { MarketFloatingWidgets } from "@/components/layout/MarketFloatingWidgets";
import { LandingFooter } from "@/components/layout/LandingFooter";
import { LandingHeader } from "@/components/layout/LandingHeader";
import { ChromeSwitcher } from "@/components/layout/ChromeSwitcher";

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
      <ChromeSwitcher
        standard={
          <>
            <SiteHeader market={market} />
            <main className="flex grow flex-col">{children}</main>
            <SiteFooter market={market} />
            <MarketFloatingWidgets market={market} />
          </>
        }
        landing={
          <>
            <LandingHeader market={market} />
            <main className="flex grow flex-col">{children}</main>
            <LandingFooter market={market} />
            <MarketFloatingWidgets market={market} showChat={false} />
          </>
        }
      />
    </div>
  );
}
