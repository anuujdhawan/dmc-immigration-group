import type { Market } from "@/config/markets";

/**
 * Legacy-domain → new-site redirect registry.
 *
 * Built from docs/CONTENT_MIGRATION_INVENTORY.md §2 (crawl of the five legacy
 * domains). The old domains were near-duplicate clones, so one shared path map
 * is reused across hosts; the host selects the market. Exact keys win, then
 * prefix rules (trailing "/" normalized away before matching). Unknown paths
 * fall back to the market homepage (MASTER §8).
 *
 * Blog posts are intentionally NOT mapped here 1:1 — the MDX frontmatter
 * `legacyUrls` fields (Phase 11) feed precise `next.config.ts` redirects that
 * run before Proxy. The generic `/blog/` prefix rule below preserves old slugs
 * as an interim safety net.
 */

type RedirectResult = { market: Market; path: string } | null;

interface LegacyHost {
  market: Market;
  hosts: string[];
}

const SHARED_PATH_MAP: Record<string, string> = {
  "/": "/",
  "/about-us": "/about",
  "/contact-us": "/contact",
  "/blog": "/blog",
  "/success-stories": "/success-stories",
  "/dm-gallery": "/gallery",
  "/client-testimonials": "/success-stories",
  "/privacy-policy": "/legal/privacy-policy",
  "/terms-of-service": "/legal/terms-and-conditions",
  "/refund-policy": "/legal/refund-and-cancellation",
  "/anti-fraud-policy": "/legal/anti-fraud",
  "/pay-online": "/contact",
  "/tap-pay-online": "/contact",
  "/success-payment": "/contact",
  "/success-payment-2": "/contact",
  "/immigration-consultants-in-abu-dhabi": "/contact",
  "/immigration-consultants-in-sharjah": "/contact",
  "/golden-visa-uae": "/business-investment/golden-visa-uae",
  // Canada
  "/skilled-immigration": "/visas/canada",
  "/skilled-immigration/canada": "/visas/canada",
  "/skilled-immigration/canada/express-entry-program": "/visas/canada/express-entry",
  "/skilled-immigration/canada/provincial-nominee-programs": "/visas/canada/provincial-nominee-programs",
  "/skilled-immigration/canada/provincial-nominee-programs/alberta-pnp": "/visas/canada/provincial-nominee-programs",
  "/skilled-immigration/canada/provincial-nominee-programs/british-columbia-pnp": "/visas/canada/provincial-nominee-programs",
  "/skilled-immigration/canada/provincial-nominee-programs/manitoba-pnp": "/visas/canada/provincial-nominee-programs",
  "/skilled-immigration/canada/provincial-nominee-programs/new-brunswick-pnp": "/visas/canada/provincial-nominee-programs",
  "/skilled-immigration/canada/provincial-nominee-programs/nova-scotia-pnp": "/visas/canada/provincial-nominee-programs",
  "/skilled-immigration/canada/provincial-nominee-programs/ontario-pnp": "/visas/canada/provincial-nominee-programs",
  "/skilled-immigration/canada/provincial-nominee-programs/prince-edward-island-pnp": "/visas/canada/provincial-nominee-programs",
  "/skilled-immigration/canada/provincial-nominee-programs/saskatchewan-pnp": "/visas/canada/provincial-nominee-programs",
  "/skilled-immigration/canada/economic-immigration-programs": "/visas/canada",
  "/skilled-immigration/canada/economic-immigration-programs/rnip": "/visas/canada/rural-and-northern-immigration-pilot",
  "/skilled-immigration/canada/economic-immigration-programs/aipp": "/visas/canada/atlantic-immigration-program",
  "/skilled-immigration/canada/economic-immigration-programs/mcdii": "/visas/canada",
  "/skilled-immigration/canada/nurses-immigration": "/visas/canada/study-permits",
  "/skilled-immigration/canada/nclex-test": "/visas/canada/study-permits",
  "/spouse-visa": "/visas/canada/study-permits",
  "/sowp": "/visas/canada/study-permits",
  // Australia / UK
  "/skilled-immigration/australia": "/visas/australia",
  "/skilled-immigration/australia/skilled-independent-189": "/visas/australia/skilled-independent-189",
  "/skilled-immigration/australia/skilled-nominated-190": "/visas/australia/skilled-nominated-190",
  "/skilled-immigration/australia/skilled-work-regional-provisional-491": "/visas/australia/skilled-work-regional-491",
  "/skilled-immigration/australia/temporary-work-visa-482": "/visas/australia/employer-sponsored-482",
  "/skilled-immigration/australia/global-talent-visa-858": "/visas/australia/national-innovation-visa-858",
  "/skilled-immigration/australia/temporary-graduate-visa-485": "/study-abroad/australia-student-visas",
  "/skilled-immigration/australia/spouse-dependent-visa": "/visas/australia",
  "/dependent-visa": "/visas/australia",
  "/skilled-immigration/united-kingdom": "/visas/uk/skilled-worker",
  "/uk-skilled-worker-dependent-visa": "/visas/uk/skilled-worker-dependent",
  "/us-dependent-visa": "/visit-visas/usa",
  "/skilled-immigration/europe": "/visit-visas",
  "/global-job-search": "/services/resume-marketing",
  "/singapore-work-visa": "/services/resume-marketing",
  "/malaysia-work-visa": "/services/resume-marketing",
  // Visit visas
  "/visit-visa": "/visit-visas",
  "/visit-visa/usa": "/visit-visas/usa",
  "/visit-visa/uk": "/visit-visas/uk",
  "/visit-visa/canada": "/visit-visas/canada",
  "/visit-visa/australia": "/visit-visas/australia",
  "/visit-visa/new-zealand": "/visit-visas/new-zealand",
  "/visit-visa/china": "/visit-visas/china",
  "/visit-visa/japan": "/visit-visas/japan",
  "/visit-visa/turkey": "/visit-visas/turkey",
  "/visit-visa/south-korea": "/visit-visas/south-korea",
  "/visit-visa/greece": "/visit-visas/greece",
  "/visit-visa/thailand": "/visit-visas/thailand",
  "/visit-visa/singapore": "/visit-visas/singapore",
  "/visit-visa/saudi": "/visit-visas/saudi-arabia",
  "/visit-visa/uae": "/visit-visas/uae",
  "/visit-visa/south-africa": "/visit-visas/south-africa",
  "/visit-visa/cyprus": "/visit-visas/cyprus",
  "/visit-visa/netherland": "/visit-visas/netherlands",
  // Business & investment
  "/residency-by-investment": "/business-investment/residency",
  "/residency-by-investment/canada": "/business-investment/residency/canada",
  "/residency-by-investment/united-kingdom": "/business-investment/residency/uk",
  "/residency-by-investment/united-states-of-america": "/business-investment/residency/usa",
  "/residency-by-investment/spain-citizenship-by-investment-dm": "/business-investment/residency",
  "/residency-by-investment/portugal-golden-visa": "/business-investment/residency",
  "/residency-by-investment/malta": "/business-investment/residency",
  "/residency-by-investment/greece": "/business-investment/residency",
  "/citizenship-by-investment": "/business-investment/citizenship",
  "/citizenship-by-investment/saint-kitts-and-nevis": "/business-investment/citizenship/st-kitts-and-nevis",
  "/citizenship-by-investment/vanuatu": "/business-investment/citizenship/vanuatu",
  "/citizenship-by-investment/saint-lucia-citizenship": "/business-investment/citizenship",
  "/citizenship-by-investment/grenada": "/business-investment/citizenship",
  "/citizenship-by-investment/dominica": "/business-investment/citizenship",
  "/citizenship-by-investment/antigua-and-barbuda": "/business-investment/citizenship",
  "/citizenship-by-investment/turkey": "/business-investment/citizenship",
  // Study abroad
  "/canada-student-visas": "/study-abroad/canada-student-visas",
  "/australia-student-visas": "/study-abroad/australia-student-visas",
  "/uk-student-visas": "/study-abroad/uk-student-visas",
  "/usa-student-visas": "/study-abroad/usa-student-visas",
  "/europe-student-visas": "/study-abroad/uk-usa-student-visas",
  "/study-in-uzbekistan": "/study-abroad/uk-usa-student-visas",
};

const SHARED_PREFIX_MAP: Record<string, string> = {
  "/new-zealand-partner": "/visit-visas/new-zealand",
  "/work-permit": "/services/resume-marketing",
  "/blog/": "/blog/",
};

const EUROPE_VISIT_DESTINATIONS = [
  "schengen",
  "italy",
  "switzerland",
  "spain",
  "france",
  "germany",
  "sweden",
  "austria",
  "czech-republic",
  "ireland",
  "luxembourg",
  "liechtenstein",
  "belgium",
  "iceland",
  "lithuania",
  "latvia",
  "malta",
  "estonia",
  "slovakia",
  "slovenia",
  "hungary",
  "finland",
  "tanzania",
  "russia",
  "monaco",
  "vatican-cit",
  "san-marino",
  "bulgaria",
  "croatia",
  "brazil",
  "india",
  "portugal",
  "norway",
  "denmark",
  "malaysia",
  "kyrgyzstan",
  "pakistan",
  "philippines",
  "georgia",
];

for (const slug of EUROPE_VISIT_DESTINATIONS) {
  SHARED_PATH_MAP[`/visit-visa/${slug}`] = "/visit-visas";
}

export const LEGACY_HOSTS: LegacyHost[] = [
  { market: "dubai", hosts: ["dm-consultant.ae"] },
  { market: "abu-dhabi", hosts: ["dm-consultantabudhabi.com"] },
  { market: "qatar", hosts: ["dm-consultant.qa"] },
  { market: "kuwait", hosts: ["dm-consultantkuwait.com"] },
  { market: "india", hosts: ["dm-consultant.in"] },
];

const HOST_TO_MARKET = new Map<string, Market>();
for (const entry of LEGACY_HOSTS) {
  for (const host of entry.hosts) HOST_TO_MARKET.set(host, entry.market);
}

export function normalizeLegacyHost(host: string): string {
  return host.toLowerCase().replace(/^www\./, "").replace(/\.$/, "");
}

export function marketForLegacyHost(host: string): Market | null {
  return HOST_TO_MARKET.get(normalizeLegacyHost(host)) ?? null;
}

export function isLegacyHost(host: string): boolean {
  return marketForLegacyHost(host) !== null;
}

export function normalizeLegacyPath(pathname: string): string {
  if (pathname === "/") return "/";
  let p = pathname.replace(/\/+$/, "");
  if (!p.startsWith("/")) p = `/${p}`;
  return p;
}

export function resolveLegacyRedirect(host: string, pathname: string): RedirectResult {
  const market = marketForLegacyHost(host);
  if (!market) return null;
  const path = normalizeLegacyPath(pathname);
  const exact = SHARED_PATH_MAP[path];
  if (exact !== undefined) return { market, path: exact };
  for (const [prefix, target] of Object.entries(SHARED_PREFIX_MAP)) {
    if (path.startsWith(prefix)) {
      if (target === "/blog/") {
        return { market, path: path }; // preserve the legacy slug under the new blog
      }
      return { market, path: target };
    }
  }
  return { market, path: "/" };
}
