import { describe, expect, it } from "vitest";

import {
  MARKET_LIST,
  MARKET_LABELS,
  MARKET_SLUGS,
  assertMarket,
  isMarket,
  marketForGeo,
} from "./markets";

describe("markets registry", () => {
  it("defines exactly the five markets in canonical order", () => {
    expect(MARKET_SLUGS).toEqual(["dubai", "abu-dhabi", "qatar", "kuwait", "india"]);
    expect(MARKET_LIST).toHaveLength(5);
  });

  it("labels every market", () => {
    for (const market of MARKET_SLUGS) {
      expect(MARKET_LABELS[market].length).toBeGreaterThan(0);
    }
    expect(MARKET_LABELS["abu-dhabi"]).toBe("Abu Dhabi");
  });

  it("validates market slugs", () => {
    expect(isMarket("dubai")).toBe(true);
    expect(isMarket("DUBAI")).toBe(false);
    expect(isMarket("london")).toBe(false);
    expect(isMarket(undefined)).toBe(false);
  });

  it("asserts valid markets and rejects invalid ones", () => {
    expect(assertMarket("qatar")).toBe("qatar");
    expect(() => assertMarket("paris")).toThrow();
  });

  it("maps Vercel geo country/region to markets", () => {
    expect(marketForGeo("IN", undefined)).toBe("india");
    expect(marketForGeo("KW", undefined)).toBe("kuwait");
    expect(marketForGeo("QA", undefined)).toBe("qatar");
    expect(marketForGeo("AE", "DU")).toBe("dubai");
    expect(marketForGeo("AE", "AZ")).toBe("abu-dhabi");
    expect(marketForGeo("AE", "SH")).toBe("dubai");
    expect(marketForGeo("US", "CA")).toBe("dubai");
    expect(marketForGeo(undefined, undefined)).toBe("dubai");
  });
});
