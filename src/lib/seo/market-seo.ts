import type { Metadata } from "next";

import { env } from "@/config/env";
import {
  DEFAULT_MARKET,
  MARKET_CURRENCIES,
  MARKET_LABELS,
  MARKET_LIST,
  MARKET_OFFICE_CITIES,
  type Market,
} from "@/config/markets";
import { marketHref } from "@/lib/routing/routes";
import { interpolateMarket } from "@/lib/i18n/market-copy";

/**
 * Market-level SEO helpers.
 *
 * Every page is served once per market (`/dubai/...`, `/qatar/...`, …) from a
 * shared content registry. To keep those variants distinct in the eyes of
 * search engines we:
 *
 *  1. generate a unique title per market (`… in Dubai | DMC Immigration Group`);
 *  2. append a market sentence to the description;
 *  3. emit hreflang alternates across all market variants (en-AE covers both
 *     UAE markets; x-default points at the default market);
 *  4. set the canonical to the current market's own URL;
 *  5. add per-page Open Graph + Twitter cards.
 *
 * The root layout's title template appends the site name, so titles returned
 * here intentionally exclude the trailing brand suffix.
 */

export const SITE_NAME = env.SITE_NAME;

/** hreflang locale per market. Both UAE markets share en-AE. */
export const MARKET_HREFLANG_LOCALE: Record<Market, string> = {
  dubai: "en-AE",
  "abu-dhabi": "en-AE",
  qatar: "en-QA",
  kuwait: "en-KW",
  india: "en-IN",
};

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Remove a trailing " | DMC Immigration Group" brand suffix if present. */
export function stripBrandSuffix(title: string): string {
  return title.replace(new RegExp(`\\s*\\|\\s*${escapeRegExp(SITE_NAME)}\\s*$`), "").trim();
}

/** Absolute URL of a market page. */
export function marketUrl(market: Market, path: string, siteUrl: string = env.SITE_URL): string {
  return new URL(marketHref(market, path), siteUrl).toString();
}

/**
 * Unique per-market title. The market is inserted after the primary phrase and
 * before any secondary pipe-delimited label, e.g.
 * "Canada Express Entry Visa Guide in Dubai | Official guide".
 */
export function marketTitle(baseTitle: string, market: Market): string {
  const clean = stripBrandSuffix(baseTitle);
  const parts = clean.split(" | ");
  if (parts.length > 1) {
    return `${parts[0]} in ${MARKET_LABELS[market]} | ${parts.slice(1).join(" | ")}`;
  }
  return `${clean} in ${MARKET_LABELS[market]}`;
}

/** Unique per-market description. */
export function marketDescription(baseDescription: string, market: Market): string {
  return `${baseDescription} Serving clients in ${MARKET_OFFICE_CITIES[market]}.`;
}

export interface MarketAlternatesOptions {
  /** Markets to emit hreflang variants for (defaults to all markets). */
  markets?: readonly Market[];
  siteUrl?: string;
}

/** Canonical + hreflang alternates for a market page. */
export function marketAlternates(
  market: Market,
  path: string,
  { markets = MARKET_LIST, siteUrl = env.SITE_URL }: MarketAlternatesOptions = {},
): NonNullable<Metadata["alternates"]> {
  const byLocale = new Map<string, string[]>();
  for (const candidate of markets) {
    const locale = MARKET_HREFLANG_LOCALE[candidate];
    const url = marketUrl(candidate, path, siteUrl);
    const existing = byLocale.get(locale) ?? [];
    existing.push(url);
    byLocale.set(locale, existing);
  }
  // Next expects multi-URL locales as `AlternateLinkDescriptor[]` ({ url })
  // — plain string arrays crash metadata resolution with a null `.pathname`.
  const languages: Record<string, string | { url: string }[]> = {};
  for (const [locale, urls] of byLocale) {
    languages[locale] = urls.length === 1 ? urls[0] : urls.map((url) => ({ url }));
  }
  languages["x-default"] = marketUrl(DEFAULT_MARKET, path, siteUrl);
  return {
    canonical: marketUrl(market, path, siteUrl),
    languages: languages as NonNullable<Metadata["alternates"]>["languages"],
  };
}

export interface MarketSeoInput {
  /** Base title (a trailing " | SITE_NAME" is stripped and rebuilt per market). */
  title: string;
  /** Base description (a market sentence is appended). */
  description: string;
  market: Market;
  /** Market-relative path, e.g. "/visas/canada/express-entry". */
  path: string;
  siteUrl?: string;
  noindex?: boolean;
  /** Markets to emit hreflang variants for (landing pages exist on a subset). */
  markets?: readonly Market[];
}

/** Full per-market Metadata: title, description, robots, canonical, hreflang, OG, Twitter. */
export function marketSeo({
  title,
  description,
  market,
  path,
  siteUrl,
  noindex,
  markets,
}: MarketSeoInput): Metadata {
  const t = marketTitle(title, market);
  const d = marketDescription(description, market);
  const alternates = marketAlternates(market, path, { markets, siteUrl });
  const canonical = marketUrl(market, path, siteUrl);
  return {
    title: t,
    description: d,
    robots: noindex ? { index: false, follow: false } : undefined,
    alternates,
    openGraph: {
      title: t,
      description: d,
      url: canonical,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary",
      title: t,
      description: d,
    },
  };
}

/** Homepage metadata targeting "immigration consultant in <market>" queries. */
export function homeSeo(market: Market, siteUrl: string = env.SITE_URL): Metadata {
  const city = MARKET_OFFICE_CITIES[market];
  const title = `Immigration Consultant in ${MARKET_LABELS[market]}`;
  const description = `DMC Immigration Group — trusted, regulated immigration consultants in ${city}. Canada PR (Express Entry, PNP), Australia, UK, study, visit and business visas. Book a free eligibility assessment.`;
  const canonical = marketUrl(market, "/", siteUrl);
  const alternates = marketAlternates(market, "/", { siteUrl });
  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

/** LocalBusiness-style JSON-LD object for a market office (homepage hero). */
export function officeJsonLd(market: Market, siteUrl: string = env.SITE_URL): Record<string, unknown> {
  const city = MARKET_OFFICE_CITIES[market];
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": marketUrl(market, "/", siteUrl),
    name: `DMC Immigration Group ${MARKET_LABELS[market]}`,
    url: marketUrl(market, "/", siteUrl),
    description: `Immigration consultants in ${city} — Canada, Australia, UK, study, visit and business visas.`,
    areaServed: [city, MARKET_LABELS[market]],
    address: {
      "@type": "PostalAddress",
      addressLocality: city,
    },
    currenciesAccepted: MARKET_CURRENCIES[market].code,
  };
}

/** FAQPage JSON-LD from FAQ items (answers interpolated with market tokens). */
export function faqJsonLd(
  items: { question: string; answer: string }[],
  market: Market,
  siteUrl: string = env.SITE_URL,
  path: string = "/",
): Record<string, unknown> | null {
  if (items.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: interpolateMarket(item.question, market),
      acceptedAnswer: {
        "@type": "Answer",
        text: interpolateMarket(item.answer, market),
      },
    })),
    url: marketUrl(market, path, siteUrl),
  };
}

/** BreadcrumbList JSON-LD for a page route. */
export function breadcrumbJsonLd(
  crumbs: { label: string; path: string }[],
  market: Market,
  siteUrl: string = env.SITE_URL,
  path: string = "/",
  current?: string,
): Record<string, unknown> {
  const items = [
    { "@type": "ListItem", position: 1, name: "Home", item: marketUrl(market, "/", siteUrl) },
    ...crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 2,
      name: crumb.label,
      item: marketUrl(market, crumb.path, siteUrl),
    })),
    {
      "@type": "ListItem",
      position: crumbs.length + 2,
      name: current ? `${current} (${MARKET_LABELS[market]})` : MARKET_LABELS[market],
      item: marketUrl(market, path, siteUrl),
    },
  ];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

/** WebApplication JSON-LD for the interactive tool pages. */
export function toolJsonLd(
  name: string,
  market: Market,
  siteUrl: string = env.SITE_URL,
  path: string = "/",
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${name} for ${MARKET_LABELS[market]}`,
    url: marketUrl(market, path, siteUrl),
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: MARKET_CURRENCIES[market].code,
    },
    provider: {
      "@type": "ProfessionalService",
      name: "DMC Immigration Group",
      url: env.SITE_URL,
    },
  };
}

