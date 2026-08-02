import "server-only";

import { env } from "@/config/env/server";
import { marketContactEnv, type MarketContactEnv } from "@/config/env/schema";
import {
  MARKET_LABELS,
  MARKET_OFFICE_CITIES,
  MARKET_COUNTRY_CODES,
  MARKET_LIST,
  type Market,
} from "@/config/markets";

export interface MarketOffice {
  market: Market;
  label: string;
  city: string;
  countryCode: string;
  phoneE164: string;
  phoneDisplay: string;
  email: string;
  whatsappE164: string;
  address: string;
  directionsUrl: string;
}

function buildOffice(market: Market): MarketOffice {
  const contact: MarketContactEnv = marketContactEnv(env, market);
  return {
    market,
    label: MARKET_LABELS[market],
    city: MARKET_OFFICE_CITIES[market],
    countryCode: MARKET_COUNTRY_CODES[market],
    phoneE164: contact.phoneE164,
    phoneDisplay: contact.phoneDisplay,
    email: contact.email,
    whatsappE164: contact.whatsappE164,
    address: contact.address,
    directionsUrl: contact.directionsUrl,
  };
}

export const OFFICES: Record<Market, MarketOffice> = Object.fromEntries(
  MARKET_LIST.map((market) => [market, buildOffice(market)]),
) as Record<Market, MarketOffice>;

export const OFFICE_LIST: MarketOffice[] = MARKET_LIST.map((market) => OFFICES[market]);

export function getOffice(market: Market): MarketOffice {
  return OFFICES[market];
}

export function getOfficeByMarketSlug(slug: string): MarketOffice | null {
  if (!(slug in OFFICES)) return null;
  return OFFICES[slug as Market];
}

export function getLeadToEmail(market: Market): string {
  return marketContactEnv(env, market).leadToEmail;
}
