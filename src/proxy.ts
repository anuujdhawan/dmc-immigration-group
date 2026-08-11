import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { env } from "@/config/env";
import { isMarket, marketForGeo } from "@/config/markets";
import type { Market } from "@/config/markets";
import { marketForLegacyHost, resolveLegacyRedirect } from "@/config/legacy-redirects";
import { marketHref } from "@/lib/routing/routes";

const CANONICAL_HOST = "www.dmcimmigrationgroup.com";

function geoCountry(request: NextRequest): string | undefined {
  return request.headers.get("x-vercel-ip-country") ?? undefined;
}

function geoRegion(request: NextRequest): string | undefined {
  return request.headers.get("x-vercel-ip-country-region") ?? undefined;
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const host = (request.headers.get("host") ?? request.nextUrl.hostname).toLowerCase();

  // 1. Canonical apex host → www (permanent).
  if (host === "dmcimmigrationgroup.com") {
    const url = new URL(pathname + search, `https://${CANONICAL_HOST}`);
    return NextResponse.redirect(url, 308);
  }

  // 2. Legacy domains → market mapping (permanent, any path).
  const legacyMarket = marketForLegacyHost(host);
  if (legacyMarket && env.LEGACY_HOST_REDIRECTS_ENABLED) {
    const result = resolveLegacyRedirect(host, pathname);
    if (result) {
      const url = new URL(marketHref(result.market, result.path) + search, `https://${CANONICAL_HOST}`);
      return NextResponse.redirect(url, 308);
    }
  }

  // 3. Root geolocation / cookie / default routing (temporary, GET only).
  if (pathname === "/" && request.method === "GET") {
    const url = new URL(marketHref(marketTarget(request), "/") + search, request.nextUrl.origin);
    return NextResponse.redirect(url, 307);
  }

  // 3b. Market-less paths (e.g. /tools/…, /visas/…, /faqs) → the same market
  // the root would choose (cookie → geo → default). Keeps root-level
  // bookmarks and bare links working while canonical URLs stay market-prefixed.
  if (request.method === "GET") {
    const firstSegment = pathname.split("/").filter(Boolean)[0];
    if (firstSegment && !isMarket(firstSegment)) {
      const url = new URL(marketHref(marketTarget(request), pathname) + search, request.nextUrl.origin);
      return NextResponse.redirect(url, 307);
    }
  }

  // 4. Default trailing-slash behavior (replicates Next's built-in redirect,
  // which is disabled via `skipTrailingSlashRedirect` in next.config.ts).
  if (pathname !== "/" && pathname.endsWith("/") && request.method === "GET") {
    const url = new URL(pathname.replace(/\/+$/, "") + search, request.nextUrl.origin);
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

/** Market chosen for a request: cookie → geo → default. */
function marketTarget(request: NextRequest): Market {
  const cookieMarket = request.cookies.get(env.MARKET_COOKIE_NAME)?.value;
  if (isMarket(cookieMarket)) return cookieMarket;
  if (env.GEO_ROUTING_ENABLED) {
    const geo = marketForGeo(geoCountry(request), geoRegion(request));
    if (geo) return geo;
  }
  return isMarket(env.DEFAULT_MARKET) ? env.DEFAULT_MARKET : "dubai";
}

export const config = {
  matcher: [
    "/((?!api/|_next/static|_next/image|favicon\\.ico|icon\\.png|apple-icon\\.png|robots\\.txt|sitemap\\.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|avif)$).*)",
  ],
};
