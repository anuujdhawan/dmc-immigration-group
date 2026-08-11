import type { MetadataRoute } from "next";
import { DEFAULT_MARKET, MARKET_LIST } from "@/config/markets";
import { PAGE_IDS } from "@/content/pages";
import { LANDING_MARKETS, LANDING_PAGE_IDS } from "@/config/landing-pages";
import { TOOL_PATHS } from "@/config/tools";
import { MARKET_HREFLANG_LOCALE } from "@/lib/seo/market-seo";
import { env } from "@/config/env/server";

const SITE_URL = env.SITE_URL;

type SitemapAlternateLanguages = NonNullable<
  NonNullable<MetadataRoute.Sitemap[number]["alternates"]>["languages"]
>;

function hreflangFor(path: string): SitemapAlternateLanguages {
  const byLocale = new Map<string, string[]>();
  for (const market of MARKET_LIST) {
    const locale = MARKET_HREFLANG_LOCALE[market];
    const existing = byLocale.get(locale) ?? [];
    existing.push(`${SITE_URL}/${market}${path}`);
    byLocale.set(locale, existing);
  }
  const languages: Record<string, string | string[]> = {};
  for (const [locale, urls] of byLocale) {
    languages[locale] = urls.length === 1 ? urls[0] : urls;
  }
  languages["x-default"] = `${SITE_URL}/${DEFAULT_MARKET}${path}`;
  return languages as SitemapAlternateLanguages;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const entries: MetadataRoute.Sitemap = [];

  // Market homepages
  for (const market of MARKET_LIST) {
    entries.push({
      url: `${SITE_URL}/${market}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: { languages: hreflangFor("") },
    });
  }

  // All content pages across all markets
  for (const market of MARKET_LIST) {
    for (const pageId of PAGE_IDS) {
      entries.push({
        url: `${SITE_URL}/${market}/${pageId}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: { languages: hreflangFor(`/${pageId}`) },
      });
    }
  }

  // Tool pages across all markets (CRS calculator, points calculator, …)
  for (const market of MARKET_LIST) {
    for (const toolPath of TOOL_PATHS) {
      entries.push({
        url: `${SITE_URL}/${market}/tools/${toolPath}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: { languages: hreflangFor(`/tools/${toolPath}`) },
      });
    }
  }

  // Landing pages (Dubai + Abu Dhabi only)
  for (const market of LANDING_MARKETS) {
    for (const pageId of LANDING_PAGE_IDS) {
      entries.push({
        url: `${SITE_URL}/${market}/${pageId}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: { languages: hreflangFor(`/${pageId}`) },
      });
    }
  }

  return entries;
}
