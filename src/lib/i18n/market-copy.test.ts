import { describe, expect, it } from "vitest";

import {
  interpolateMarket,
  marketAudience,
  marketContextSentence,
  marketFor,
  marketFrom,
  marketIn,
  marketName,
  marketOffice,
  paragraphsForMarket,
} from "./market-copy";

describe("market-copy phrases", () => {
  it("resolves simple market names", () => {
    expect(marketName("dubai")).toBe("Dubai");
    expect(marketName("abu-dhabi")).toBe("Abu Dhabi");
    expect(marketName("qatar")).toBe("Qatar");
  });

  it("builds natural prepositional phrases", () => {
    expect(marketIn("dubai")).toBe("in Dubai");
    expect(marketFrom("abu-dhabi")).toBe("from Abu Dhabi");
    expect(marketFor("kuwait")).toBe("for residents in Kuwait");
    expect(marketAudience("india")).toBe("clients in the India market");
    expect(marketOffice("qatar")).toBe("our Qatar office");
  });

  it("builds a complete market context sentence", () => {
    expect(marketContextSentence("dubai")).toBe(
      "Prepared for clients in the Dubai market and supported by our Dubai office.",
    );
  });
});

describe("interpolateMarket", () => {
  it("replaces every supported token", () => {
    const out = interpolateMarket(
      "{market} residents can apply {marketFrom} and prepare evidence {marketIn}, guided by {marketOffice}.",
      "qatar",
    );
    expect(out).toBe(
      "Qatar residents can apply from Qatar and prepare evidence in Qatar, guided by our Qatar office.",
    );
  });

  it("matches longest tokens first so {market} never partially clobbers longer tokens", () => {
    // If {market} were replaced first, {marketOffice} would become "DubaiOffice".
    expect(interpolateMarket("Talk to {marketOffice}.", "dubai")).toBe("Talk to our Dubai office.");
    expect(interpolateMarket("{marketIn} {marketFrom}", "dubai")).toBe("in Dubai from Dubai");
    expect(interpolateMarket("{marketAudience}", "dubai")).toBe("clients in the Dubai market");
    expect(interpolateMarket("{marketFor}", "dubai")).toBe("for residents in Dubai");
  });

  it("leaves unknown tokens and plain text untouched", () => {
    expect(interpolateMarket("A plain sentence.", "dubai")).toBe("A plain sentence.");
    expect(interpolateMarket("Keep {marketUnknown} literal.", "dubai")).toBe(
      "Keep {marketUnknown} literal.",
    );
  });

  it("is idempotent across markets", () => {
    const once = interpolateMarket("Apply {marketFrom} today.", "india");
    expect(interpolateMarket(once, "india")).toBe(once);
  });
});

describe("paragraphsForMarket", () => {
  it("interpolates tokens in every paragraph", () => {
    const out = paragraphsForMarket(
      ["First paragraph for {market}.", "Second paragraph."],
      "kuwait",
    );
    expect(out[0]).toContain("First paragraph for Kuwait.");
    expect(out[1]).toBe("Second paragraph.");
  });

  it("prepends a market context sentence to the first paragraph by default", () => {
    const out = paragraphsForMarket(["The visa rules are as follows."], "dubai");
    expect(out[0]).toBe(
      "Prepared for clients in the Dubai market and supported by our Dubai office. The visa rules are as follows.",
    );
  });

  it("skips the prepend when the copy already names the market", () => {
    const out = paragraphsForMarket(["Dubai residents already know this market well."], "dubai");
    expect(out[0]).toBe("Dubai residents already know this market well.");
  });

  it("can disable the prepend", () => {
    const out = paragraphsForMarket(["Plain first paragraph."], "dubai", { prependFirst: false });
    expect(out[0]).toBe("Plain first paragraph.");
  });

  it("handles an empty list", () => {
    expect(paragraphsForMarket([], "dubai")).toEqual([]);
  });
});
