import { notFound } from "next/navigation";

import { isMarket } from "@/config/markets";
import { HomeSections } from "@/components/home/HomeSections";

export default async function MarketHomePage({
  params,
}: PageProps<"/[market]">) {
  const { market: slug } = await params;
  if (!isMarket(slug)) notFound();
  return <HomeSections market={slug} />;
}
