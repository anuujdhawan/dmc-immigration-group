import { describe, expect, it } from "vitest";

import { PAGE_IDS, PAGE_REGISTRY, breadcrumbsFor, getPageContent } from "./index";

describe("content page registry", () => {
  it("exposes every page exactly once", () => {
    expect(PAGE_IDS.length).toBeGreaterThan(50);
    expect(new Set(PAGE_IDS).size).toBe(PAGE_IDS.length);
    expect(Object.keys(PAGE_REGISTRY).length).toBe(PAGE_IDS.length);
  });

  it("uses valid canonical ids", () => {
    for (const id of PAGE_IDS) {
      expect(id, id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*(\/[a-z0-9]+(-[a-z0-9]+)*)*$/);
      expect(id.startsWith("/"), id).toBe(false);
    }
  });

  it("requires complete metadata on every page", () => {
    for (const id of PAGE_IDS) {
      const page = getPageContent(id);
      expect(page, id).not.toBeNull();
      expect(page!.title.length, id).toBeGreaterThan(3);
      expect(page!.eyebrow.length, id).toBeGreaterThan(2);
      expect(page!.seoTitle.length, id).toBeGreaterThan(10);
      expect(page!.seoDescription.length, id).toBeGreaterThan(20);
      expect(page!.lede.length, id).toBeGreaterThan(10);
      expect(page!.lastVerified, id).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(page!.sections.length, id).toBeGreaterThan(0);
    }
  });

  it("resolves every relatedPages reference to a registered page", () => {
    for (const id of PAGE_IDS) {
      for (const related of getPageContent(id)!.relatedPages ?? []) {
        expect(PAGE_IDS, `${id} -> ${related}`).toContain(related);
      }
    }
  });

  it("resolves every links-section path to a registered page", () => {
    for (const id of PAGE_IDS) {
      for (const section of getPageContent(id)!.sections) {
        if (section.kind !== "links") continue;
        for (const item of section.items) {
          const path = item.path.replace(/^\/+/, "");
          expect(PAGE_IDS, `${id} -> ${path}`).toContain(path);
        }
      }
    }
  });

  it("keeps relatedTools references in tool shape", () => {
    for (const id of PAGE_IDS) {
      for (const tool of getPageContent(id)!.relatedTools ?? []) {
        expect(tool, `${id} -> ${tool}`).toMatch(/^tools\//);
      }
    }
  });

  it("marks content requiring client verification noindex", () => {
    expect(getPageContent("study-abroad/ielts-coaching")?.noindex).toBe(true);
  });

  it("never leaks {market} tokens through non-interpolated render paths", () => {
    // Sections with kinds that are rendered without market interpolation (in
    // both the ProgramPage renderer and the bespoke Canada/Australia/UK
    // internal-page renderers) must not contain raw {market…} tokens, or they
    // would appear literally on the page.
    const interpolatedKinds = new Set(["overview", "lead", "faq"]);
    for (const id of PAGE_IDS) {
      for (const section of getPageContent(id)!.sections) {
        if (interpolatedKinds.has(section.kind)) continue;
        const json = JSON.stringify(section);
        expect(json.includes("{market"), `${id} · section kind "${section.kind}"`).toBe(false);
      }
    }
  });

  it("returns null for unknown ids and builds safe breadcrumbs", () => {
    expect(getPageContent("visas/nonexistent")).toBeNull();
    for (const id of PAGE_IDS) {
      for (const crumb of breadcrumbsFor(id)) {
        expect(crumb.path.startsWith("/"), `${id} ${crumb.path}`).toBe(true);
        expect(crumb.label.length, `${id} ${crumb.path}`).toBeGreaterThan(0);
      }
    }
  });
});
