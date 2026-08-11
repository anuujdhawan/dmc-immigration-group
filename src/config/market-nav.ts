import type { Market } from "@/config/markets";
import { toolsByFamily } from "@/config/tools";

import {
  NAV_FOOTER,
  NAV_LEGAL,
  NAV_PRIMARY,
  type NavFooterColumn,
  type NavLink,
  type PrimaryNavItem,
} from "./navigation";

/**
 * Per-market navigation.
 *
 * This project serves every market (dubai, abu-dhabi, qatar, kuwait, india)
 * from the same shared content registry via the `[market]` dynamic routes, so
 * all markets share the standard `NAV_PRIMARY` / `NAV_FOOTER` / `NAV_LEGAL`
 * trees — including the Tools dropdown built from the tool registry.
 *
 * The legacy per-market trees (india/kuwait scraped-site structure with
 * sub-menu flyouts and work-permit/economic-program pages) were removed
 * because those pages do not exist in this project.
 */

/**
 * Tools dropdown — built from the shared tool registry (hubs + every
 * individual calculator), so it appears automatically for every market and
 * every dropdown item resolves to a live tool page under /{market}/tools/….
 */
function toolsColumns(): PrimaryNavItem["columns"] {
  const canadaTools = toolsByFamily("canada").map((tool) => ({
    label: tool.title,
    href: `/tools/${tool.path}`,
  }));
  const australiaTools = toolsByFamily("australia").map((tool) => ({
    label: tool.title,
    href: `/tools/${tool.path}`,
  }));
  return [
    {
      heading: "Free Assessment",
      links: [
        { label: "General Eligibility Quiz", href: "/tools/eligibility-checker" },
        { label: "Free Counselling / Call Me Back", href: "/contact" },
      ],
    },
    {
      heading: "Canada Tools",
      links: [{ label: "Canada Tools Hub →", href: "/tools/canada", children: canadaTools }],
    },
    {
      heading: "Australia Tools",
      links: [{ label: "Australia Tools Hub →", href: "/tools/australia", children: australiaTools }],
    },
  ];
}

/** Primary navigation tree for a market. */
export function getMarketNavigation(_market: Market): PrimaryNavItem[] {
  return NAV_PRIMARY.map((item) =>
    item.label === "Tools" ? { ...item, columns: toolsColumns() } : item,
  );
}

/** Footer columns for a market. */
export function getMarketFooter(_market: Market): NavFooterColumn[] {
  return NAV_FOOTER;
}

/** Legal links for a market. */
export function getMarketLegal(_market: Market): NavLink[] {
  return NAV_LEGAL;
}

/** Every market-relative href in a market's nav tree (used by tests/sitemap). */
export function marketNavPaths(_market: Market): string[] {
  const paths = new Set<string>();
  const collectLinks = (links: NavLink[]) => {
    for (const link of links) {
      if (link.href.startsWith("/")) paths.add(link.href);
      if (link.children) collectLinks(link.children);
    }
  };
  for (const item of NAV_PRIMARY) {
    if (item.href && item.href.startsWith("/")) paths.add(item.href);
    for (const column of item.columns ?? []) collectLinks(column.links);
  }
  for (const column of NAV_FOOTER) collectLinks(column.links);
  return [...paths];
}
