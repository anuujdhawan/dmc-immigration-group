import { expect, test } from "@playwright/test";

test("Express Entry content page renders hero, sections and sources", async ({ page }) => {
  await page.goto("/dubai/visas/canada/express-entry");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/Canada Express\s*Entry/);
  await expect(
    page.getByRole("heading", { name: "Federal Skilled Worker 67-point selection grid" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "CRS — how profiles are ranked" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "From profile creation to a complete application" })).toBeVisible();
  await expect(page.getByRole("link", { name: "IRCC — Express Entry" })).toHaveAttribute("href", /canada\.ca/);
  await expect(page.getByText("Last verified:")).toBeVisible();
});

test("content page FAQ accordion opens on click", async ({ page }) => {
  await page.goto("/dubai/visas/canada/express-entry");
  const firstFaq = page.getByRole("button", { name: /What is the minimum score for Express Entry/ });
  await firstFaq.click();
  await expect(firstFaq).toHaveAttribute("aria-expanded", "true");
});

test("no horizontal overflow on content pages at mobile widths", async ({ page }) => {
  for (const width of [768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/dubai/visas/canada/express-entry");
    await page.waitForLoadState("networkidle");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, `overflow at ${width}px`).toBeLessThanOrEqual(1);
  }
});

test("breadcrumbs navigate back to the market homepage", async ({ page }) => {
  await page.goto("/qatar/visas/australia/skilled-independent-189");
  const breadcrumb = page.getByRole("navigation", { name: "Breadcrumb" });
  await expect(breadcrumb.getByText("Skilled Independent Visa (189)")).toBeVisible();
  await breadcrumb.getByRole("link", { name: "Home" }).click();
  await expect(page).toHaveURL(/\/qatar$/);
});

test("content pages render for all five markets", async ({ page }) => {
  for (const market of ["dubai", "abu-dhabi", "qatar", "kuwait", "india"]) {
    const response = await page.goto(`/${market}/visas/uk/skilled-worker`);
    expect(response?.status(), market).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/UK Skilled Worker\s*Visa/);
  }
});

test("unknown content path returns 404", async ({ page }) => {
  const response = await page.goto("/dubai/visas/nonexistent-program");
  expect(response?.status()).toBe(404);
});

test("noindex pages carry a robots meta tag", async ({ page }) => {
  await page.goto("/dubai/study-abroad/ielts-coaching");
  const robots = await page.locator('meta[name="robots"]').getAttribute("content");
  expect(robots).toContain("noindex");
});
