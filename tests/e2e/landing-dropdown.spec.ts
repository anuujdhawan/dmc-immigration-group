import { expect, test } from "@playwright/test";

const LANDING_URL = "/dubai/visas/australia/pr-services";

test("landing header CTA stays inside the bar and clears the hero at all widths", async ({ page }) => {
  for (const width of [320, 360, 390, 640, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(LANDING_URL);
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => document.fonts.ready);
    const probe = await page.evaluate(() => {
      const header = document.querySelector('header[aria-label="DMC landing"]');
      const bar = header?.querySelector(":scope > div");
      const btn = [...(header?.querySelectorAll("a") ?? [])].find((a) =>
        a.textContent?.includes("Eligibility"),
      );
      const pill = document.querySelector(".botanical-license-pill");
      if (!header || !bar || !btn) return { ok: false };
      const hr = header.getBoundingClientRect();
      const br = bar.getBoundingClientRect();
      const bt = btn.getBoundingClientRect();
      const pr = pill?.getBoundingClientRect();
      const hero = document.getElementById("landing-hero")?.getBoundingClientRect();
      return {
        ok:
          bt.right <= br.right + 1 &&
          bt.left >= br.left - 1 &&
          bt.right <= innerWidth + 1 &&
          bt.left >= -1 &&
          (pr ? pr.top >= hr.bottom : true) &&
          // Hero must start at the top of the page, and its content must sit
          // close under the header (no excessive top padding, no overlap).
          hero !== undefined &&
          hero.top <= 1 &&
          (pr ? pr.top - hr.bottom <= 80 : true),
      };
    });
    expect(probe.ok, `landing header CTA layout broken at ${width}px`).toBe(true);
  }
});

test("landing hero proof stats never overlap at tablet and desktop widths", async ({ page }) => {
  // The recovered template's inline baseline row collapses inside the hero's narrow
  // copy column (~768–1280px) — the numbers overlap the labels. The landing hero must
  // keep the stacked 3-column grid at every width.
  for (const width of [768, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(LANDING_URL);
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => document.fonts.ready);
    const probe = await page.evaluate(() => {
      const row = document.querySelector("#landing-hero .botanical-proof-row");
      if (!row) return { ok: false };
      const spans = [...row.querySelectorAll(":scope > span")];
      let overlap = 0;
      let horizontal = 0;
      for (const s of spans) {
        const strong = s.querySelector("strong")?.getBoundingClientRect();
        const small = s.querySelector("small")?.getBoundingClientRect();
        if (strong && small && small.top < strong.bottom) overlap += strong.bottom - small.top;
      }
      for (let i = 1; i < spans.length; i++) {
        const a = spans[i - 1].getBoundingClientRect();
        const b = spans[i].getBoundingClientRect();
        if (b.left < a.right) horizontal += a.right - b.left;
      }
      return { ok: overlap === 0 && horizontal === 0, overlap, horizontal };
    });
    expect(probe.ok, `proof stats overlap at ${width}px`).toBe(true);
  }
});

test("landing benefits cards match template style and never overflow", async ({ page }) => {
  // The benefits grid uses the template's ee-feature-item card language: horizontal
  // icon-left cards with organic asymmetric corners, plus a section header. Verify the
  // header renders, all six cards fit the viewport, and the icon tile is left-aligned.
  for (const width of [375, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(LANDING_URL);
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => document.fonts.ready);
    const probe = await page.evaluate(() => {
      const section = document.getElementById("benefits");
      if (!section) return { ok: false, reason: "missing section" };
      const heading = section.querySelector("h2");
      if (!heading) return { ok: false, reason: "missing header" };
      const cards = [...section.querySelectorAll("article")];
      if (cards.length !== 6) return { ok: false, reason: `cards=${cards.length}` };
      const viewport = document.documentElement.clientWidth;
      const overflowing = cards.filter((c) => {
        const r = c.getBoundingClientRect();
        return r.left < -1 || r.right > viewport + 1;
      }).length;
      if (overflowing > 0) return { ok: false, reason: `${overflowing} overflow` };
      // Icon tile sits to the LEFT of the heading (template horizontal layout).
      const first = cards[0]!;
      const icon = first.querySelector("span")?.getBoundingClientRect();
      const title = first.querySelector("h3")?.getBoundingClientRect();
      if (!icon || !title || icon.right > title.left) {
        return { ok: false, reason: "icon not left of title" };
      }
      // Template signature: organic asymmetric corners, flipped on even cards.
      const radiusOdd = getComputedStyle(cards[0]!).borderRadius;
      const radiusEven = getComputedStyle(cards[1]!).borderRadius;
      if (!radiusOdd.includes("48px") || !radiusEven.includes("48px")) {
        return { ok: false, reason: `radius odd=${radiusOdd} even=${radiusEven}` };
      }
      return { ok: true };
    });
    expect(probe.ok, `benefits cards broken at ${width}px: ${probe.reason}`).toBe(true);
  }
});

test("eligibility CTAs land on the lead form at every width", async ({ page }) => {
  // The eligibility buttons used to anchor to the top of the assessment section,
  // which on mobile (where the intro stacks above the form) left the actual form
  // below the fold. Every CTA must now land on the form card itself (#lead-form),
  // sitting just under the sticky header.
  for (const width of [390, 768, 1280]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto(LANDING_URL);
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => document.fonts.ready);

    // Lock in the full retarget: every eligibility CTA points at the form card
    // (#lead-form), and none at the old section top (#free-assessment).
    const leadFormLinks = await page.locator('a[href="#lead-form"]').count();
    const staleLinks = await page.locator('a[href="#free-assessment"]').count();
    expect(leadFormLinks, `only ${leadFormLinks} CTAs target #lead-form at ${width}px`).toBeGreaterThanOrEqual(4);
    expect(staleLinks, `stale #free-assessment links at ${width}px`).toBe(0);

    // The form must start below the top band, so its arrival is attributable to
    // the click (guards against a false pass on initial load).
    const startedBelow = await page.evaluate(() => {
      const form = document.getElementById("lead-form");
      return form ? form.getBoundingClientRect().top > 300 : false;
    });
    expect(startedBelow, `form already in band before click at ${width}px`).toBe(true);

    const cta = page.getByRole("link", { name: /Eligibility/ }).first();
    await cta.click();
    // The form must actually arrive in the top band (smooth scroll under the
    // sticky header via scroll-mt) — not stall at the page top.
    await page.waitForFunction(
      () => {
        const form = document.getElementById("lead-form");
        return form ? form.getBoundingClientRect().top <= 300 : false;
      },
      undefined,
      { timeout: 6000 },
    );
    const probe = await page.evaluate(() => {
      const form = document.getElementById("lead-form");
      if (!form) return { ok: false, reason: "missing form" };
      const fr = form.getBoundingClientRect();
      const header = document.querySelector('header[aria-label="DMC landing"]');
      const hb = header?.getBoundingClientRect();
      return {
        ok: fr.top >= (hb?.bottom ?? 0) - 4 && fr.top <= 300,
        formTop: Math.round(fr.top),
        headerBottom: hb ? Math.round(hb.bottom) : null,
      };
    });
    expect(probe.ok, `lead form not reached at ${width}px: ${JSON.stringify(probe)}`).toBe(true);
  }
});

test("landing testimonial sections show destination-appropriate video cards", async ({ page }) => {
  // The testimonial section must render three DMC success-story video cards
  // (poster + play button) that match the landing page's destination: Australia
  // PR videos on the Australia pages, Canada PR videos on the Canada pages.
  const cases = [
    { url: "/dubai/visas/australia/pr-services", expectVideoId: "45RJO__WJfg" },
    { url: "/dubai/visas/canada/pr-services", expectVideoId: "HotxB851tq8" },
  ];
  for (const { url, expectVideoId } of cases) {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(url);
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => document.fonts.ready);

    const section = page.locator("section", { hasText: "Families Trusted Us With Their" });
    const cards = section.locator("li");
    await expect(cards).toHaveCount(3);

    // Every card starts as a local poster + play button (no iframe yet).
    const posters = section.locator('img[alt*="video testimonial"]');
    await expect(posters).toHaveCount(3);
    const playButtons = section.getByRole("button", { name: /Play video:/ });
    await expect(playButtons).toHaveCount(3);

    // Clicking play swaps the poster for the YouTube embed of the right video.
    await playButtons.first().click();
    const iframe = section.locator("iframe");
    await expect(iframe).toBeVisible();
    await expect(iframe).toHaveAttribute("src", new RegExp(expectVideoId));
    // The remaining cards stay as posters (no eager embeds).
    await expect(section.locator("iframe")).toHaveCount(1);
  }
});

for (const viewport of [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
]) {
  test(`landing form dropdowns open under their field at ${viewport.name} width`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto(LANDING_URL);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // The custom listbox must render directly beneath the trigger field it belongs to,
    // not as an OS picker (which is what native <select> does on mobile/tablet).
    const trigger = page.getByRole("button", { name: "Highest Qualification" });
    await trigger.click();

    const listbox = page.getByRole("listbox", { name: "Highest Qualification" });
    await expect(listbox).toBeVisible();

    const position = await page.evaluate(() => {
      const triggerEl = document.querySelector('button[id="education"]');
      const listEl = document.querySelector('[role="listbox"]');
      if (!triggerEl || !listEl) return null;
      const t = triggerEl.getBoundingClientRect();
      const l = listEl.getBoundingClientRect();
      return { gap: l.top - t.bottom, leftDelta: Math.abs(l.left - t.left) };
    });

    expect(position).not.toBeNull();
    expect(position!.gap).toBeGreaterThanOrEqual(0);
    expect(position!.gap).toBeLessThanOrEqual(24);
    expect(position!.leftDelta).toBeLessThanOrEqual(2);

    // Picking an option closes the listbox and updates the trigger label.
    await listbox.getByRole("option", { name: "Master's" }).click();
    await expect(trigger).toHaveText("Master's");
    await expect(listbox).not.toBeVisible();

    // The office dropdown lists all five markets and opens beneath its field too.
    await page.getByRole("button", { name: "Preferred Office" }).click();
    const officeList = page.getByRole("listbox", { name: "Preferred Office" });
    await expect(officeList).toBeVisible();
    for (const office of ["Dubai", "Abu Dhabi", "Qatar", "Kuwait", "India"]) {
      await expect(officeList.getByText(office, { exact: true })).toBeVisible();
    }
  });
}
