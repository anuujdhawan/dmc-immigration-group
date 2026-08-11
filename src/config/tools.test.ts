import { describe, expect, it } from "vitest";

import { PNP_PROVINCES } from "@/features/tools/canada-pnp";
import { TOOL_PATHS, TOOL_REGISTRY, toolByPath, toolsByFamily } from "./tools";

const KNOWN_COMPONENTS = new Set([
  "eligibility-checker",
  "crs",
  "clb",
  "fsw67",
  "australia-points",
  "australia-fees",
  "australia-processing",
  "australia-occupations",
  "rcip",
]);

const PROVINCE_SLUGS = new Set(PNP_PROVINCES.map((p) => p.slug));

describe("tool registry", () => {
  it("exposes every tool exactly once with a unique path", () => {
    expect(TOOL_REGISTRY.length).toBeGreaterThan(10);
    expect(new Set(TOOL_PATHS).size).toBe(TOOL_PATHS.length);
    expect(TOOL_PATHS).toEqual(TOOL_REGISTRY.map((tool) => tool.path));
  });

  it("uses canonical slug paths (no leading slash, no tools/ prefix)", () => {
    for (const path of TOOL_PATHS) {
      expect(path, path).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*(\/[a-z0-9]+(-[a-z0-9]+)*)*$/);
      expect(path.startsWith("/"), path).toBe(false);
      expect(path.startsWith("tools/"), path).toBe(false);
    }
  });

  it("requires complete metadata on every tool", () => {
    for (const tool of TOOL_REGISTRY) {
      expect(tool.title.length, tool.path).toBeGreaterThan(3);
      expect(tool.eyebrow.length, tool.path).toBeGreaterThan(2);
      expect(tool.seoTitle.length, tool.path).toBeGreaterThan(10);
      expect(tool.seoDescription.length, tool.path).toBeGreaterThan(20);
      expect(tool.lede.length, tool.path).toBeGreaterThan(10);
      expect(tool.lastVerified, tool.path).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(tool.sources.length, tool.path).toBeGreaterThan(0);
    }
  });

  it("resolves every tool path through toolByPath", () => {
    for (const path of TOOL_PATHS) {
      expect(toolByPath(path)?.path, path).toBe(path);
    }
    expect(toolByPath("canada/does-not-exist")).toBeUndefined();
  });

  it("maps every component key to a renderable component", () => {
    for (const tool of TOOL_REGISTRY) {
      if (tool.component.startsWith("pnp:")) {
        const slug = tool.component.slice(4);
        expect(PROVINCE_SLUGS, `${tool.path} -> ${tool.component}`).toContain(slug);
      } else {
        expect(KNOWN_COMPONENTS, `${tool.path} -> ${tool.component}`).toContain(tool.component);
      }
    }
  });

  it("groups tools by family", () => {
    expect(toolsByFamily("canada").length).toBeGreaterThan(5);
    expect(toolsByFamily("australia").length).toBe(4);
    expect(toolsByFamily("general")).toHaveLength(1);
  });
});
