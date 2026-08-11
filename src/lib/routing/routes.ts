import type { Market } from "@/config/markets";

export const MARKET_SLUG_PATTERN = "/(dubai|abu-dhabi|qatar|kuwait|india)";

export function marketHome(market: Market): string {
  return `/${market}`;
}

export function marketHref(market: Market, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return marketHome(market);
  return `/${market}${normalized}`;
}

export function marketSectionHref(market: Market, section: string): string {
  const anchor = section.replace(/^#/, "").replace(/^\/+/, "");
  return `/${market}#${anchor}`;
}

/**
 * Link target for "Book Consultation" CTAs.
 *
 * On the scraped legacy markets (india/kuwait) every page renders its own
 * free-assessment form band anchored `#free-assessment` — so the CTA stays on
 * the same page and scrolls to the form there. The dynamic markets anchor to
 * their homepage's `#contact` section instead.
 */
export function consultationHref(market: Market): string {
  return market === "india" || market === "kuwait" ? "#free-assessment" : marketSectionHref(market, "contact");
}

export function stripMarketPrefix(href: string): string {
  const match = href.match(new RegExp(`^${MARKET_SLUG_PATTERN}(/|$)`));
  if (!match) return href;
  const rest = href.slice(match[0].length);
  if (rest === "") return "/";
  return rest.startsWith("/") ? rest : `/${rest}`;
}

export function extractMarket(href: string): string | null {
  const match = href.match(new RegExp(`^${MARKET_SLUG_PATTERN}(/|$)`));
  return match ? match[1] : null;
}

export function isMarketRoot(href: string): boolean {
  return /^\/(dubai|abu-dhabi|qatar|kuwait|india)\/?$/.test(href);
}

export function joinPath(segments: (string | undefined | null)[]): string {
  const parts = segments.filter(Boolean).join("/").split("/").filter(Boolean);
  return `/${parts.join("/")}`;
}

export function canonicalUrl(market: Market, path: string, baseUrl: string): URL {
  const url = new URL(baseUrl);
  url.pathname = marketHref(market, path);
  return url;
}
