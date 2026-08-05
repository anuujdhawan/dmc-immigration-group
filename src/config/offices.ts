import "server-only";

import { env } from "@/config/env/server";
import { marketContactEnv, type MarketContactEnv } from "@/config/env/schema";
import {
  MARKET_LABELS,
  MARKET_OFFICE_CITIES,
  MARKET_COUNTRY_CODES,
  MARKET_DIALING_CODES,
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
  /** Human-readable form of `whatsappE164` (e.g. "+971 54 321 9003"). */
  whatsappDisplay: string;
  address: string;
  directionsUrl: string;
}

/**
 * Format an E.164 number into a readable local form, e.g.
 * "+971543219003" → "+971 54 321 9003". The leading country code (1–3
 * digits, matching the dialing prefix) is kept together after the +, then the
 * national digits are grouped in 3s from the right.
 */
/**
 * Group the national part of a phone number for display. 10-digit numbers
 * (common mobile format) use 3-3-4 grouping; everything else is grouped in
 * 3s from the right.
 */
function groupNational(national: string): string {
  if (national.length === 10) {
    return `${national.slice(0, 3)} ${national.slice(3, 6)} ${national.slice(6)}`;
  }
  return national.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/**
 * Format an E.164 number into a readable local form, e.g.
 * "+971543219003" with dialing code "971" → "+971 543 219 003".
 * The country code is taken from the caller-supplied dialing prefix (the
 * only unambiguous way to split E.164 — 2- vs 3-digit codes can't be
 * guessed), then the national digits are grouped for display.
 */
export function formatE164Display(e164: string, dialingCode: string): string {
  const cleaned = e164.replace(/[^+\d]/g, "");
  if (!cleaned.startsWith("+")) return e164;

  const digits = cleaned.slice(1);
  if (!digits.startsWith(dialingCode)) return e164;

  const national = digits.slice(dialingCode.length);
  if (national.length < 4) return e164;
  return `+${dialingCode} ${groupNational(national)}`;
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
    whatsappDisplay: formatE164Display(contact.whatsappE164, MARKET_DIALING_CODES[market]),
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
