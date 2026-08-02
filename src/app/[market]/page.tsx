import { notFound } from "next/navigation";

import { MARKET_LABELS, isMarket } from "@/config/markets";

export default async function MarketHomePage({
  params,
}: PageProps<"/[market]">) {
  const { market: slug } = await params;
  if (!isMarket(slug)) notFound();
  const market = slug;
  return (
    <main className="flex grow flex-col items-center justify-center gap-4 px-6 py-24">
      <h1 className="text-3xl font-bold">
        {MARKET_LABELS[market]} — DMC Immigration Group
      </h1>
      <p className="text-muted">Homepage sections land in Phase 3.</p>
    </main>
  );
}
