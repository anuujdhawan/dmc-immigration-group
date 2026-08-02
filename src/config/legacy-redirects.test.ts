import { describe, expect, it } from "vitest";

import {
  isLegacyHost,
  marketForLegacyHost,
  normalizeLegacyHost,
  normalizeLegacyPath,
  resolveLegacyRedirect,
} from "@/config/legacy-redirects";

describe("normalizeLegacyHost", () => {
  it("strips scheme-ish casing, www, and trailing dot", () => {
    expect(normalizeLegacyHost("Dm-Consultant.ae")).toBe("dm-consultant.ae");
    expect(normalizeLegacyHost("www.dm-consultant.ae")).toBe("dm-consultant.ae");
    expect(normalizeLegacyHost("dm-consultant.ae.")).toBe("dm-consultant.ae");
    expect(normalizeLegacyHost("WWW.DM-CONSULTANTKUWAIT.COM")).toBe("dm-consultantkuwait.com");
  });
});

describe("marketForLegacyHost / isLegacyHost", () => {
  it("maps all five legacy domains (with and without www)", () => {
    expect(marketForLegacyHost("dm-consultant.ae")).toBe("dubai");
    expect(marketForLegacyHost("www.dm-consultant.ae")).toBe("dubai");
    expect(marketForLegacyHost("dm-consultantabudhabi.com")).toBe("abu-dhabi");
    expect(marketForLegacyHost("dm-consultant.qa")).toBe("qatar");
    expect(marketForLegacyHost("dm-consultantkuwait.com")).toBe("kuwait");
    expect(marketForLegacyHost("dm-consultant.in")).toBe("india");
    expect(isLegacyHost("dm-consultant.in")).toBe(true);
    expect(isLegacyHost("www.dm-consultant.in")).toBe(true);
  });

  it("rejects unrelated hosts", () => {
    expect(marketForLegacyHost("www.dmcimmigrationgroup.com")).toBeNull();
    expect(marketForLegacyHost("example.com")).toBeNull();
    expect(isLegacyHost("example.com")).toBe(false);
  });
});

describe("normalizeLegacyPath", () => {
  it("normalizes trailing slashes and root", () => {
    expect(normalizeLegacyPath("/")).toBe("/");
    expect(normalizeLegacyPath("/")).toBe("/");
    expect(normalizeLegacyPath("/about-us/")).toBe("/about-us");
    expect(normalizeLegacyPath("about-us/")).toBe("/about-us");
    expect(normalizeLegacyPath("/blog/some-post/")).toBe("/blog/some-post");
  });
});

describe("resolveLegacyRedirect", () => {
  it("maps legacy homepages to market home", () => {
    expect(resolveLegacyRedirect("dm-consultant.ae", "/")).toEqual({ market: "dubai", path: "/" });
    expect(resolveLegacyRedirect("dm-consultant.qa", "/")).toEqual({ market: "qatar", path: "/" });
  });

  it("maps service pages 1:1", () => {
    expect(resolveLegacyRedirect("dm-consultant.ae", "/skilled-immigration/canada/express-entry-program/")).toEqual({
      market: "dubai",
      path: "/visas/canada/express-entry",
    });
    expect(resolveLegacyRedirect("dm-consultant.ae", "/skilled-immigration/australia/global-talent-visa-858/")).toEqual({
      market: "dubai",
      path: "/visas/australia/national-innovation-visa-858",
    });
    expect(resolveLegacyRedirect("dm-consultant.ae", "/skilled-immigration/united-kingdom/")).toEqual({
      market: "dubai",
      path: "/visas/uk/skilled-worker",
    });
  });

  it("maps aliases (saudi → saudi-arabia, netherland → netherlands)", () => {
    expect(resolveLegacyRedirect("dm-consultant.ae", "/visit-visa/saudi/")).toEqual({
      market: "dubai",
      path: "/visit-visas/saudi-arabia",
    });
    expect(resolveLegacyRedirect("dm-consultant.ae", "/visit-visa/netherland/")).toEqual({
      market: "dubai",
      path: "/visit-visas/netherlands",
    });
  });

  it("maps business/citizenship routes", () => {
    expect(resolveLegacyRedirect("dm-consultant.ae", "/residency-by-investment/canada/")).toEqual({
      market: "dubai",
      path: "/business-investment/residency/canada",
    });
    expect(resolveLegacyRedirect("dm-consultant.ae", "/citizenship-by-investment/saint-kitts-and-nevis/")).toEqual({
      market: "dubai",
      path: "/business-investment/citizenship/st-kitts-and-nevis",
    });
  });

  it("maps study-abroad and more-services routes", () => {
    expect(resolveLegacyRedirect("dm-consultant.ae", "/canada-student-visas/")).toEqual({
      market: "dubai",
      path: "/study-abroad/canada-student-visas",
    });
    expect(resolveLegacyRedirect("dm-consultant.ae", "/global-job-search/")).toEqual({
      market: "dubai",
      path: "/services/resume-marketing",
    });
  });

  it("maps blog paths preserving the slug under the new blog", () => {
    expect(resolveLegacyRedirect("dm-consultant.ae", "/blog/latest-express-entry-draw/")).toEqual({
      market: "dubai",
      path: "/blog/latest-express-entry-draw",
    });
  });

  it("falls back to the host's market homepage for unknown paths", () => {
    expect(resolveLegacyRedirect("dm-consultant.ae", "/totally-unknown-page/")).toEqual({
      market: "dubai",
      path: "/",
    });
    expect(resolveLegacyRedirect("dm-consultant.in", "/something-new/")).toEqual({ market: "india", path: "/" });
  });

  it("applies the shared path map across clone domains", () => {
    expect(resolveLegacyRedirect("dm-consultant.qa", "/skilled-immigration/canada/express-entry-program/")).toEqual({
      market: "qatar",
      path: "/visas/canada/express-entry",
    });
    expect(resolveLegacyRedirect("dm-consultantkuwait.com", "/about-us/")).toEqual({
      market: "kuwait",
      path: "/about",
    });
    expect(resolveLegacyRedirect("dm-consultantabudhabi.com", "/golden-visa-uae/")).toEqual({
      market: "abu-dhabi",
      path: "/business-investment/golden-visa-uae",
    });
  });
});
