import { describe, expect, it } from "vitest";

import { NAV_FOOTER, NAV_PRIMARY, allNavPaths, marketHrefForNav } from "./navigation";

describe("navigation registry", () => {
  it("exposes all five top-level items", () => {
    expect(NAV_PRIMARY.map((item) => item.label)).toEqual([
      "Home",
      "Visas",
      "Express Entry",
      "Services",
      "Resources",
      "About",
      "Contact",
    ]);
  });

  it("contains the Express Entry entry point in the Visas mega menu", () => {
    const visas = NAV_PRIMARY[1];
    const links = (visas.columns ?? []).flatMap((column) => column.links);
    expect(links.some((link) => link.href === "/visas/canada/express-entry")).toBe(true);
    expect(links.some((link) => link.href === "/tools/canada/crs-calculator")).toBe(true);
  });

  it("builds market-prefixed hrefs", () => {
    expect(marketHrefForNav("qatar", "/contact")).toBe("/qatar/contact");
    expect(marketHrefForNav("dubai", "/")).toBe("/dubai");
  });

  it("collects all canonical paths without duplicates", () => {
    const paths = allNavPaths();
    expect(new Set(paths).size).toBe(paths.length);
    expect(paths).toContain("/visas/canada/express-entry");
    expect(paths).toContain("/legal/privacy-policy");
    expect(paths).toContain("/tools/eligibility-checker");
    for (const path of paths) {
      expect(path.startsWith("/")).toBe(true);
      expect(path.startsWith("/dubai")).toBe(false);
    }
  });

  it("keeps footer columns populated", () => {
    expect(NAV_FOOTER).toHaveLength(4);
    for (const column of NAV_FOOTER) {
      expect(column.links.length).toBeGreaterThanOrEqual(3);
    }
  });
});
