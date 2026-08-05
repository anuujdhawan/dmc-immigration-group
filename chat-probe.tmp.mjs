import { chromium } from "@playwright/test";

const page = await chromium.launch({ headless: true }).then((b) => b.newPage());
await page.goto("http://localhost:3000/dubai/visas/australia/pr-services/thank-you");
await page.waitForSelector(".rcb-toggle-button", { timeout: 15000 });
await page.evaluate(() => document.querySelectorAll("nextjs-portal").forEach((el) => el.remove()));
await page.locator(".rcb-toggle-button").click();
await page.waitForSelector(".rcb-chat-window", { timeout: 15000 });

const click = async (text) => {
  await page.locator(".rcb-options", { hasText: text }).last().click();
  await page.waitForTimeout(400);
};
const count = async () =>
  page.locator(".rcb-chat-input-textarea").count().then((n) => ({ n, visible: n > 0 }));

console.log("start:", await count());
await click("Canada PR");
console.log("edu:", await count());
await click("Bachelor's");
console.log("age:", await count());
await click("26-35");
console.log("english:", await count());
await click("Have a score");
console.log("work:", await count());
await click("2-4");
console.log("location:", await count());
await click("UAE");
await page.waitForTimeout(800);
console.log("ask_name (after wait):", await count());
await page.locator(".rcb-chat-input-textarea").fill("John Doe");
await page.locator(".rcb-send-button").click();
await page.waitForTimeout(800);
console.log("ask_email:", await count());
await page.locator(".rcb-chat-input-textarea").fill("john@example.com");
await page.locator(".rcb-send-button").click();
await page.waitForTimeout(800);
console.log("ask_phone:", await count());
await page.locator(".rcb-chat-input-textarea").fill("+971500000000");
await page.locator(".rcb-send-button").click();
await page.waitForTimeout(2000);
console.log("end text visible:", await page.getByText(/Thank you/).count());
console.log("end textarea count:", await count());
console.log("end path data:", await page.evaluate(() => {
  const input = document.querySelector(".rcb-chat-input");
  return { inputPresent: !!input };
}));
await page.close();
