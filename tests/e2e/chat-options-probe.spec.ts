import { test, expect } from "@playwright/test";

test.describe("guided chat options-only behavior", () => {
  async function removeOverlay(page: import("@playwright/test").Page) {
    await page.evaluate(() => {
      document.querySelectorAll("nextjs-portal").forEach((el) => el.remove());
    });
  }

  test("bubble size matches 56px and input hidden except contact steps", async ({ page }) => {
    page.on("console", (msg) => {
      if (msg.text().includes("ChatInputModeSync")) console.log(msg.text());
    });
    await page.goto("/dubai/visas/australia/pr-services/thank-you");    await page.waitForSelector(".rcb-toggle-button", { timeout: 15000 });
    await removeOverlay(page);

    const toggle = page.locator(".rcb-toggle-button");
    await expect(toggle).toHaveCSS("width", "56px");
    await expect(toggle).toHaveCSS("height", "56px");

    // Cube-shaped bubble: square button (12px radius), icon not cropped.
    await expect(toggle).toHaveCSS("border-radius", "12px");
    await expect(page.locator(".rcb-toggle-icon")).toHaveCSS("background-size", "contain");
    await expect(page.locator(".rcb-toggle-icon")).toHaveCSS("background-repeat", "no-repeat");

    // Thank-you card clears the fixed header (no navbar overlap).
    const card = page.locator("section.bg-slate-50 .max-w-2xl");
    const cardBox = await card.boundingBox();
    const headerBox = await page.locator("header").first().boundingBox();
    expect(cardBox && headerBox ? cardBox.y - (headerBox.y + headerBox.height) : -1).toBeGreaterThan(16);

    // The "Need help?" tooltip is hidden by default, shown on bubble hover only.
    const tooltip = page.locator(".rcb-chat-tooltip");
    await expect(tooltip).toHaveCSS("opacity", "0");
    await toggle.hover();
    await expect(tooltip).toHaveCSS("opacity", "1");
    await page.mouse.move(400, 400);
    await expect(tooltip).toHaveCSS("opacity", "0");

    await toggle.click();
    await page.waitForSelector(".rcb-chat-window", { timeout: 15000 });

    // Start step: options present, no input row.
    await expect(page.locator(".rcb-options").first()).toBeVisible();
    await expect(page.locator(".rcb-chat-input-textarea")).toHaveCount(0);

    // Walk the Canada PR branch.
    await page.locator(".rcb-options", { hasText: "Canada PR" }).last().click();
    await page.locator(".rcb-options", { hasText: "Bachelor's" }).last().click();
    await page.locator(".rcb-options", { hasText: "26-35" }).last().click();
    await page.locator(".rcb-options", { hasText: "Have a score" }).last().click();
    await page.locator(".rcb-options", { hasText: "2-4" }).last().click();
    await page.locator(".rcb-options", { hasText: "UAE" }).last().click();

    // Every option step so far: no textarea.
    await expect(page.locator(".rcb-chat-input-textarea")).toHaveCount(0);

    // ask_name: textarea visible, type + send.
    await expect(page.locator(".rcb-chat-input-textarea")).toBeVisible();
    await page.locator(".rcb-chat-input-textarea").fill("John Doe");
    await page.locator(".rcb-send-button").click();

    // Wait for the next question to render before typing again, otherwise
    // the fill races the bot's typing delay and the send is dropped.
    await expect(page.getByText("What is your email address?")).toBeVisible();
    await expect(page.locator(".rcb-chat-input-textarea")).toBeVisible();
    await page.locator(".rcb-chat-input-textarea").fill("john@example.com");
    await page.locator(".rcb-send-button").click();

    // ask_phone: textarea visible.
    await expect(page.getByText(/Last one/)).toBeVisible();
    await expect(page.locator(".rcb-chat-input-textarea")).toBeVisible();
    await page.locator(".rcb-chat-input-textarea").fill("+971500000000");
    await page.locator(".rcb-send-button").click();

    // End step: chat bubble thanks the visitor, input hidden again.
    await expect(page.locator(".rcb-bot-message").getByText(/Thank you/)).toBeVisible();
    await expect(page.locator(".rcb-chat-input-textarea")).toHaveCount(0);
  });

  test("free-text blocks were converted to options (aus + resume)", async ({ page }) => {
    await page.goto("/dubai/visas/australia/pr-services/thank-you");
    await page.waitForSelector(".rcb-toggle-button", { timeout: 15000 });
    await removeOverlay(page);
    await page.locator(".rcb-toggle-button").click();
    await page.waitForSelector(".rcb-chat-window", { timeout: 15000 });

    // Australia PR → education → occupation step must show options, not a textarea.
    await page.locator(".rcb-options", { hasText: "Australia PR" }).last().click();
    await page.locator(".rcb-options", { hasText: "Bachelor's" }).last().click();
    await expect(page.locator(".rcb-options", { hasText: "Engineering" }).last()).toBeVisible();
    await expect(page.locator(".rcb-chat-input-textarea")).toHaveCount(0);

    // Reload for a fresh chat and verify the resume flow too.
    await page.reload();
    await page.waitForSelector(".rcb-toggle-button", { timeout: 15000 });
    await removeOverlay(page);
    await page.locator(".rcb-toggle-button").click();
    await page.waitForSelector(".rcb-chat-window", { timeout: 15000 });

    await page.locator(".rcb-options", { hasText: "Resume Marketing" }).last().click();
    await expect(page.locator(".rcb-options", { hasText: "IT / Software" }).last()).toBeVisible();
    await expect(page.locator(".rcb-chat-input-textarea")).toHaveCount(0);
  });
});
