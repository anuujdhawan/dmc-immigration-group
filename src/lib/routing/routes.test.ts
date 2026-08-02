import { describe, expect, it } from "vitest";

import {
  canonicalUrl,
  extractMarket,
  isMarketRoot,
  joinPath,
  marketHref,
  marketHome,
  stripMarketPrefix,
} from "./routes";

describe("route helpers", () => {
  it("builds market-prefixed paths", () => {
    expect(marketHome("dubai")).toBe("/dubai");
    expect(marketHref("qatar", "/visas/canada/express-entry")).toBe(
      "/qatar/visas/canada/express-entry",
    );
    expect(marketHref("dubai", "/")).toBe("/dubai");
    expect(marketHref("india", "express-entry")).toBe("/india/express-entry");
  });

  it("extracts and strips market prefixes", () => {
    expect(stripMarketPrefix("/dubai")).toBe("/");
    expect(stripMarketPrefix("/abu-dhabi/visas/canada")).toBe("/visas/canada");
    expect(stripMarketPrefix("/kuwait/")).toBe("/");
    expect(stripMarketPrefix("/blog")).toBe("/blog");
    expect(extractMarket("/qatar/express-entry")).toBe("qatar");
    expect(extractMarket("/dubai")).toBe("dubai");
    expect(extractMarket("/express-entry")).toBeNull();
  });

  it("recognises market roots", () => {
    expect(isMarketRoot("/dubai")).toBe(true);
    expect(isMarketRoot("/dubai/")).toBe(true);
    expect(isMarketRoot("/dubai/visas")).toBe(false);
    expect(isMarketRoot("/")).toBe(false);
  });

  it("joins path segments safely", () => {
    expect(joinPath(["visas", "canada", "express-entry"])).toBe("/visas/canada/express-entry");
    expect(joinPath(["visas", undefined, "canada"])).toBe("/visas/canada");
    expect(joinPath(["", "/x/", "y"])).toBe("/x/y");
  });

  it("builds canonical absolute URLs", () => {
    const url = canonicalUrl("dubai", "/visas/canada", "https://www.dmcimmigrationgroup.com");
    expect(url.href).toBe("https://www.dmcimmigrationgroup.com/dubai/visas/canada");
  });
});
