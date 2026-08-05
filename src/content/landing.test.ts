import { describe, expect, it } from "vitest";

import { LANDING_MARKETS } from "@/config/landing-pages";
import { getLandingContent, landingDestinationLabel } from "./landing";

describe("landing content", () => {
  it("throws for markets without landing pages", () => {
    expect(() => getLandingContent("australia", "qatar")).toThrow(/only built for Dubai and Abu Dhabi/);
    expect(() => getLandingContent("canada", "india")).toThrow(/only built for Dubai and Abu Dhabi/);
  });

  it("returns complete content for every destination and market", () => {
    for (const market of LANDING_MARKETS) {
      for (const destination of ["australia", "canada"] as const) {
        const content = getLandingContent(destination, market);
        expect(content.market).toBe(market);
        expect(content.destination).toBe(destination);
        expect(content.seoTitle).toContain(market === "dubai" ? "Dubai" : "Abu Dhabi");
        expect(content.seoDescription.length).toBeGreaterThan(20);
        expect(content.hero.titleAccent).toBe(market === "dubai" ? "Dubai" : "Abu Dhabi");
        expect(content.form.submitLabel).toBe("Get My Free Assessment");
        // Preferred Office lists all five DMC markets, landing market first
        expect(content.form.preferredOffices).toHaveLength(5);
        expect(content.form.preferredOffices[0]).toBe(market);
        expect(content.form.preferredOffices).toEqual(
          expect.arrayContaining(["dubai", "abu-dhabi", "qatar", "kuwait", "india"]),
        );
        expect(content.socialProof.length).toBe(4);
        expect(content.sections.length).toBeGreaterThanOrEqual(6);
        expect(content.whyDmc.items.length).toBeGreaterThanOrEqual(5);
        expect(content.faqs.length).toBeGreaterThanOrEqual(6);
        for (const faq of content.faqs) {
          expect(faq.q.length).toBeGreaterThan(5);
          expect(faq.a.length).toBeGreaterThan(10);
        }
        expect(content.finalCta.primaryLabel.length).toBeGreaterThan(5);
        expect(content.finalCta.callPhoneE164).toMatch(/^\+/);
      }
    }
  });

  it("localises the geography in FAQs", () => {
    expect(getLandingContent("australia", "dubai").faqs.some((f) => f.q.includes("from Dubai"))).toBe(true);
    expect(getLandingContent("australia", "abu-dhabi").faqs.some((f) => f.q.includes("from Abu Dhabi"))).toBe(true);
    expect(getLandingContent("canada", "dubai").faqs.some((f) => f.q.includes("from Dubai"))).toBe(true);
    expect(getLandingContent("canada", "abu-dhabi").faqs.some((f) => f.q.includes("from Abu Dhabi"))).toBe(true);
  });

  it("keeps destination-specific section structure", () => {
    const au = getLandingContent("australia", "dubai").sections;
    expect(au.some((s) => s.kind === "pathways")).toBe(true);
    expect(au.some((s) => s.kind === "points")).toBe(true);

    const ca = getLandingContent("canada", "dubai").sections;
    expect(ca.some((s) => s.kind === "express-entry")).toBe(true);
    expect(ca.some((s) => s.kind === "pnp")).toBe(true);

    const caAu = getLandingContent("canada", "abu-dhabi").sections;
    expect(caAu.some((s) => s.kind === "pathways")).toBe(true);
    expect(caAu.some((s) => s.kind === "express-entry")).toBe(false);
  });

  it("labels the destination for the lead record", () => {
    expect(landingDestinationLabel("australia")).toContain("Australia");
    expect(landingDestinationLabel("canada")).toContain("Canada");
  });
});
