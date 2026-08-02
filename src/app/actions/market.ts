"use server";

import { isMarket } from "@/config/markets";
import { setMarketCookie } from "@/lib/routing/market-cookie";

export async function setMarketCookieAction(slug: string): Promise<{ ok: boolean }> {
  if (!isMarket(slug)) return { ok: false };
  await setMarketCookie(slug);
  return { ok: true };
}
