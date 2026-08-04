import { expect, test } from "@playwright/test";

const SECTION_IDS = [
  "home",
  "services",
  "countries",
  "why-dmc",
  "credentials",
  "refusals",
  "tools",
  "process",
  "stories",
  "video-stories",
  "resources",
  "faq",
  "contact",
];

test("root redirects to default market", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/dubai$/);
});

test("market homepage renders all sections", async ({ page }) => {
  await page.goto("/dubai");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Your journey towards a better future",
  );
  for (const id of SECTION_IDS) {
    await expect(page.locator(`#${id}`)).toBeVisible();
  }
});

test("no horizontal overflow at desktop and mobile widths", async ({ page }) => {
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/dubai");
    await page.waitForLoadState("networkidle");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, `overflow at ${width}px`).toBeLessThanOrEqual(1);
  }
});

test("desktop header shows primary navigation and utility strip", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/dubai");
  await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
  await expect(page.getByText("RCIC · MARA · ICCRC Regulated")).toBeVisible();
  await expect(page.getByRole("link", { name: "Book Consultation" }).first()).toBeVisible();
});

test("mega menu opens on hover and links are market-prefixed", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/dubai");
  const visas = page.getByRole("button", { name: /^Visas/ });
  await visas.hover();
  await expect(page.getByRole("link", { name: "Express Entry (FSW / CEC / FST)" }).first()).toBeVisible();
  const href = await page
    .getByRole("link", { name: "Express Entry (FSW / CEC / FST)" })
    .first()
    .getAttribute("href");
  expect(href).toBe("/dubai/visas/canada/express-entry");
});

test("mobile menu opens and navigates", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/dubai");
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  const mobileNav = page.getByRole("navigation", { name: "Mobile" });
  await expect(mobileNav).toBeVisible();
  await mobileNav.getByRole("link", { name: "Express Entry (FSW / CEC / FST)" }).click();
  await expect(page).toHaveURL(/\/dubai\/visas\/canada\/express-entry$/);
});

test("footer shows current-market office details", async ({ page }) => {
  await page.goto("/qatar");
  const footer = page.locator("footer");
  await expect(footer.getByText("Doha, Qatar Office")).toBeVisible();
  await expect(footer.getByText("+974 4436 7929")).toBeVisible();
  await expect(footer.getByRole("link", { name: "Privacy Policy" })).toBeVisible();
});

test("unknown market slug returns 404", async ({ page }) => {
  const response = await page.goto("/london");
  expect(response?.status()).toBe(404);
});
