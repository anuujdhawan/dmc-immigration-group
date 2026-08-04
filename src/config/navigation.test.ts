import { describe, expect, it } from "vitest";

import { NAV_FOOTER, NAV_PRIMARY, allNavPaths, marketHrefForNav } from "./navigation";

describe("navigation registry", () => {
  it("matches the homepage template top-level items", () => {
    expect(NAV_PRIMARY.map((item) => item.label)).toEqual([
      "Home",
      "Visas",
      "Services",
      "Resources",
      "Tools",
    ]);
  });

  it("matches the Visas mega menu copy and order", () => {
    const visas = NAV_PRIMARY.find((item) => item.label === "Visas");

    expect(visas?.columns?.map((column) => column.heading)).toEqual([
      "Canada",
      "Australia",
      "United Kingdom",
      "Visit Visas — Other Destinations",
    ]);
    expect(visas?.columns?.[0].links.map((link) => link.label)).toEqual([
      "Express Entry (FSW / CEC / FST)",
      "Provincial Nominee Programs",
      "Atlantic Immigration Program",
      "Rural & Northern Pilot (RNIP)",
      "Study Permits (SDS / NCLEX)",
      "Family Sponsorship & PGP",
      "Visit Visa / Super Visa",
      "CRS / Points Calculator →",
    ]);
    expect(visas?.columns?.[1].links.map((link) => link.label)).toEqual([
      "Skilled Independent (189)",
      "Skilled Nominated (190)",
      "Regional Provisional (491)",
      "Permanent Residence (191)",
      "Employer Sponsored (482/TSS)",
      "Employer Nominated (186/ENS)",
      "Global Talent Visa (858)",
      "State & Territory Nominations",
      "ANZSCO Occupation Finder",
      "Points Calculator →",
    ]);
  });

  it("builds market-prefixed hrefs", () => {
    expect(marketHrefForNav("qatar", "/contact")).toBe("/qatar/contact");
    expect(marketHrefForNav("dubai", "/")).toBe("/dubai");
  });

  it("collects all canonical paths without duplicates", () => {
    const paths = allNavPaths();
    expect(new Set(paths).size).toBe(paths.length);
    expect(paths).toContain("/visas/canada/express-entry");
    expect(paths).toContain("/visas/australia/national-innovation-visa-858");
    expect(paths).toContain("/legal/privacy-policy");
    expect(paths).toContain("/blog");
    expect(paths).toContain("/success-stories");
    expect(paths).toContain("/gallery");
    expect(paths).toContain("/press-media");
    expect(paths).toContain("/tools/eligibility-checker");
    expect(paths).toContain("/tools/canada");
    expect(paths).toContain("/tools/australia");
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
