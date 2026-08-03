import { expect, test } from "@playwright/test";

const ROUTES = [
  "/dubai",
  "/dubai/visas/canada/express-entry",
  "/dubai/study-abroad/ielts-coaching",
  "/qatar/visas/uk/skilled-worker",
];

const HYDRATION_PATTERN = /hydrat|did not match|server rendered html/i;

for (const route of ROUTES) {
  test(`no hydration or console errors on ${route}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    page.on("pageerror", (err) => errors.push(String(err)));

    await page.goto(route);
    await page.waitForLoadState("networkidle");

    const hydrationErrors = errors.filter((e) => HYDRATION_PATTERN.test(e));
    expect(hydrationErrors, `hydration errors on ${route}: ${hydrationErrors.join(" | ")}`).toEqual([]);
    expect(errors, `console errors on ${route}: ${errors.join(" | ")}`).toEqual([]);
  });
}
