import "server-only";

import { cookies } from "next/headers";
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

import { env } from "@/config/env/server";
import { isMarket, type Market } from "@/config/markets";

export const MARKET_COOKIE_NAME = env.MARKET_COOKIE_NAME;

export function marketCookieOptions(): Partial<ResponseCookie> {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: env.NODE_ENV === "production",
    path: "/",
    maxAge: env.MARKET_COOKIE_MAX_AGE_SECONDS,
  };
}

export async function getMarketCookie(): Promise<Market | null> {
  const store = await cookies();
  const value = store.get(MARKET_COOKIE_NAME)?.value;
  return isMarket(value) ? value : null;
}

export async function setMarketCookie(market: Market): Promise<void> {
  const store = await cookies();
  store.set(MARKET_COOKIE_NAME, market, marketCookieOptions());
}

export async function clearMarketCookie(): Promise<void> {
  const store = await cookies();
  store.delete(MARKET_COOKIE_NAME);
}

export function marketFromCookieValue(value: string | undefined | null): Market | null {
  return isMarket(value) ? value : null;
}
