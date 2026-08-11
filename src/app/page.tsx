import { notFound, redirect } from "next/navigation";

import { env } from "@/config/env";
import { isMarket } from "@/config/markets";

/**
 * Interim fallback for the root path. In production `proxy.ts` owns "/"
 * (geo/cookie/legacy-host routing) and intercepts the request before this
 * page renders. This page only guards against a misconfigured proxy matcher.
 */
export default function RootPage() {
  // ===========================================================================
  // ROUTE DISABLED — page rendering commented out per request: only the 4
  // landing pages and 4 thank-you pages are live. This route intentionally
  // returns 404 (notFound) instead of rendering.
  // ===========================================================================
  // const fallback = isMarket(env.DEFAULT_MARKET) ? env.DEFAULT_MARKET : "dubai";
  // redirect(`/${fallback}`);
  // ===========================================================================
  notFound();
}
