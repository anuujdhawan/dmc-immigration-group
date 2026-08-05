import { describe, expect, it } from "vitest";

import {
  LANDING_MARKETS,
  LANDING_PAGE_IDS,
  isLandingMarket,
  isLandingPageId,
  isLandingPagePath,
  landingHref,
  landingThankYouHref,
} from "./landing-pages";

describe("landing-pages registry", () => {
  it("exposes exactly the two campaign markets", () => {
    expect(LANDING_MARKETS).toEqual(["dubai", "abu-dhabi"]);
    expect(isLandingMarket("dubai")).toBe(true);
    expect(isLandingMarket("abu-dhabi")).toBe(true);
    expect(isLandingMarket("qatar")).toBe(false);
    expect(isLandingMarket("kuwait")).toBe(false);
    expect(isLandingMarket("india")).toBe(false);
    expect(isLandingMarket(undefined)).toBe(false);
  });

  it("keeps landing ids under the canonical visa route families", () => {
    expect(LANDING_PAGE_IDS).toEqual([
      "visas/australia/pr-services",
      "visas/canada/pr-services",
    ]);
    expect(isLandingPageId("visas/australia/pr-services")).toBe(true);
    expect(isLandingPageId("visas/canada/pr-services/thank-you")).toBe(false);
  });

  it("builds market-prefixed landing and thank-you hrefs", () => {
    expect(landingHref("dubai", "visas/australia/pr-services")).toBe(
      "/dubai/visas/australia/pr-services",
    );
    expect(landingThankYouHref("abu-dhabi", "visas/canada/pr-services")).toBe(
      "/abu-dhabi/visas/canada/pr-services/thank-you",
    );
  });

  it("detects landing paths only for the exact landing pages", () => {
    expect(isLandingPagePath("/dubai/visas/australia/pr-services")).toBe(true);
    expect(isLandingPagePath("/abu-dhabi/visas/canada/pr-services")).toBe(true);
    // thank-you uses the normal site chrome
    expect(isLandingPagePath("/dubai/visas/australia/pr-services/thank-you")).toBe(false);
    expect(isLandingPagePath("/qatar/visas/australia/pr-services")).toBe(false);
    expect(isLandingPagePath("/dubai/visas/australia/skilled-independent-189")).toBe(false);
    expect(isLandingPagePath("/dubai")).toBe(false);
  });
});
