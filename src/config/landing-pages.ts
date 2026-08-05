import type { Market } from "@/config/markets";

/**
 * Landing-page registry.
 *
 * Landing pages are conversion-focused standalone pages (typically the target of
 * paid campaigns). They are intentionally kept out of the navigation registry:
 * the landing chrome has no outbound links so the visitor stays on the page and
 * completes the lead form. Each landing page lives under its market and the
 * process it handles (`/visas/<destination>/pr-services`), in harmony with the
 * canonical content route families. A `thank-you` child route confirms the
 * submission and uses the normal site chrome.
 */

export const LANDING_DESTINATIONS = ["australia", "canada"] as const;
export type LandingDestination = (typeof LANDING_DESTINATIONS)[number];

/** Landing pages exist only for the Dubai and Abu Dhabi markets. */
export const LANDING_MARKETS: Market[] = ["dubai", "abu-dhabi"];

/** Canonical landing page ids beneath the market segment. */
export const LANDING_PAGE_IDS = [
  "visas/australia/pr-services",
  "visas/canada/pr-services",
] as const;

export type LandingPageId = (typeof LANDING_PAGE_IDS)[number];

export function isLandingMarket(market: string | null | undefined): market is Market {
  return !!market && (LANDING_MARKETS as string[]).includes(market);
}

export function isLandingPageId(value: string): value is LandingPageId {
  return (LANDING_PAGE_IDS as readonly string[]).includes(value);
}

/** e.g. `/{market}/visas/australia/pr-services` */
export function landingHref(market: Market, id: LandingPageId): string {
  return `/${market}/${id}`;
}

/** e.g. `/{market}/visas/australia/pr-services/thank-you` */
export function landingThankYouHref(market: Market, id: LandingPageId): string {
  return `/${market}/${id}/thank-you`;
}

/**
 * True when the given pathname is one of the landing pages (exactly — the
 * `thank-you` child routes resolve to the normal site chrome).
 */
export function isLandingPagePath(pathname: string): boolean {
  const segments = pathname.split("/").filter(Boolean);
  const [market, ...rest] = segments;
  if (!isLandingMarket(market)) return false;
  return isLandingPageId(rest.join("/"));
}
