import { chromium } from "@playwright/test";

const BASE = "http://localhost:3100";
const urls = [
  "/dubai",
  "/dubai/visas/canada/express-entry",
  "/dubai/tools/canada/crs-calculator",
  "/dubai/visas/australia/pr-services",
];

const browser = await chromium.launch();
for (const url of urls) {
  const page = await browser.newPage();
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(`PAGEERROR: ${err.message}`));

  await page.goto(BASE + url, { waitUntil: "networkidle" });

  // Let enter animations settle.
  await page.waitForTimeout(2500);

  const stats = await page.evaluate(() => {
    let mutations = 0;
    let charChanges = 0;
    const kinds = new Map();
    const observer = new MutationObserver((records) => {
      for (const r of records) {
        mutations++;
        kinds.set(r.type, (kinds.get(r.type) ?? 0) + 1);
        if (r.type === "characterData") charChanges++;
      }
    });
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      characterData: true,
    });
    return new Promise((resolve) => {
      setTimeout(() => {
        observer.disconnect();
        resolve({ mutations, charChanges, kinds: Object.fromEntries(kinds) });
      }, 4000);
    });
  });

  const reHeartbeats = await page.evaluate(() => {
    let count = 0;
    const targets = Array.from(
      document.querySelectorAll(
        ".rcb-toggle-button, .rcb-chat-window, .global-orbit-stage, .aurora-core-card, .botanical-hero-copy, .count-up, [data-rerender-probe]",
      ),
    );
    // Snapshot innerHTML of a "sentinel" subtitle node if present.
    const sentinel = document.querySelector(".botanical-hero-subtitle, .ee-lead, p");
    const before = sentinel ? sentinel.textContent : null;
    // Monitor commits of the hero country label changes.
    const flag = document.getElementById("auroraActiveFlag");
    return new Promise((resolve) => {
      const times = [];
      const iv = setInterval(() => {
        count++;
        if (flag) times.push(flag.textContent);
        if (count >= 8) {
          clearInterval(iv);
          resolve({ targetCount: targets.length, flagChanges: new Set(times).size, times });
        }
      }, 500);
    });
  });

  console.log(`\n=== ${url} ===`);
  console.log("Mutations over 4s (idle):", JSON.stringify(stats));
  console.log("Heartbeat:", JSON.stringify(reHeartbeats));
  console.log("Console/page errors:", errors.length ? errors.slice(0, 10) : "none");
  await page.close();
}

await browser.close();