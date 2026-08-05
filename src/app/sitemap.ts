import type { MetadataRoute } from "next";
import { MARKET_LIST } from "@/config/markets";
import { PAGE_IDS } from "@/content/pages";
import { LANDING_MARKETS, LANDING_PAGE_IDS } from "@/config/landing-pages";
import { env } from "@/config/env/server";

const SITE_URL = env.SITE_URL;

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
      });
    }
  }

  return entries;
}
