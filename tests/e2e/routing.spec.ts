import { expect, test, type APIRequestContext } from "@playwright/test";

/**
 * Phase 4 — root geolocation/cookie routing, legacy-domain redirects, and
 * canonical-host rules (MASTER §7, §8). These tests drive `src/proxy.ts`.
 */

const BASE = "http://127.0.0.1:3000";

async function probe(
  request: APIRequestContext,
  path: string,
  headers: Record<string, string> = {},
): Promise<{ status: number; location: string | null }> {
  const res = await request.get(BASE + path, { maxRedirects: 0, headers });
  return { status: res.status(), location: res.headers()["location"] ?? null };
}

test.describe("root geolocation precedence", () => {
  test("defaults to the env DEFAULT_MARKET without cookie or geo", async ({ request }) => {
    const r = await probe(request, "/");
    expect(r.status).toBe(307);
    expect(r.location).toBe("/dubai");
  });

  test("cookie overrides geo headers", async ({ request }) => {
    const r = await probe(request, "/", { cookie: "dmc_market=india", "x-vercel-ip-country": "QA" });
    expect(r.status).toBe(307);
    expect(r.location).toBe("/india");
  });

  test("geo country mapping (IN/KW/QA)", async ({ request }) => {
    expect((await probe(request, "/", { "x-vercel-ip-country": "IN" })).location).toBe("/india");
    expect((await probe(request, "/", { "x-vercel-ip-country": "KW" })).location).toBe("/kuwait");
    expect((await probe(request, "/", { "x-vercel-ip-country": "QA" })).location).toBe("/qatar");
  });

  test("UAE region split (DU → dubai, AZ → abu-dhabi, unknown → dubai)", async ({ request }) => {
    expect(
      (await probe(request, "/", { "x-vercel-ip-country": "AE", "x-vercel-ip-country-region": "DU" })).location,
    ).toBe("/dubai");
    expect(
      (await probe(request, "/", { "x-vercel-ip-country": "AE", "x-vercel-ip-country-region": "AZ" })).location,
    ).toBe("/abu-dhabi");
    expect(
      (await probe(request, "/", { "x-vercel-ip-country": "AE", "x-vercel-ip-country-region": "ZZ" })).location,
    ).toBe("/dubai");
  });

  test("other countries fall back to dubai", async ({ request }) => {
    expect((await probe(request, "/", { "x-vercel-ip-country": "US" })).location).toBe("/dubai");
  });

  test("preserves the query string (UTM)", async ({ request }) => {
    const r = await probe(request, "/?utm_source=x&a=b", { "x-vercel-ip-country": "IN" });
    expect(r.status).toBe(307);
    expect(r.location).toBe("/india?utm_source=x&a=b");
  });

  test("explicit market routes are never redirected", async ({ request }) => {
    for (const market of ["dubai", "abu-dhabi", "qatar", "kuwait", "india"]) {
      const r = await probe(request, `/${market}`);
      expect(r.status).toBe(200);
      expect(r.location).toBeNull();
    }
  });

  test("invalid market returns 404", async ({ request }) => {
    expect((await probe(request, "/paris")).status).toBe(404);
  });
});

test.describe("canonical host and legacy domains", () => {
  test("apex dmcimmigrationgroup.com permanently redirects to www", async ({ request }) => {
    const r = await probe(request, "/dubai/visas?utm=a", { host: "dmcimmigrationgroup.com" });
    expect(r.status).toBe(308);
    expect(r.location).toBe("https://www.dmcimmigrationgroup.com/dubai/visas?utm=a");
  });

  test("all five legacy homepages map to their market home", async ({ request }) => {
    const cases: [string, string][] = [
      ["dm-consultant.ae", "/dubai"],
      ["dm-consultantabudhabi.com", "/abu-dhabi"],
      ["dm-consultant.qa", "/qatar"],
      ["dm-consultantkuwait.com", "/kuwait"],
      ["dm-consultant.in", "/india"],
    ];
    for (const [host, expected] of cases) {
      const r = await probe(request, "/", { host });
      expect(r.status, host).toBe(308);
      expect(r.location, host).toBe(`https://www.dmcimmigrationgroup.com${expected}`);
    }
  });

  test("www variants behave identically", async ({ request }) => {
    const r = await probe(request, "/", { host: "www.dm-consultant.ae" });
    expect(r.location).toBe("https://www.dmcimmigrationgroup.com/dubai");
  });

  test("known legacy service path maps 1:1 under its market", async ({ request }) => {
    const r = await probe(request, "/skilled-immigration/canada/express-entry-program/", {
      host: "www.dm-consultant.ae",
    });
    expect(r.status).toBe(308);
    expect(r.location).toBe("https://www.dmcimmigrationgroup.com/dubai/visas/canada/express-entry");
  });

  test("blog paths preserve the legacy slug", async ({ request }) => {
    const r = await probe(request, "/blog/latest-express-entry-draw/", { host: "dm-consultant.qa" });
    expect(r.location).toBe("https://www.dmcimmigrationgroup.com/qatar/blog/latest-express-entry-draw");
  });

  test("alias slugs normalize (netherland → netherlands)", async ({ request }) => {
    const r = await probe(request, "/visit-visa/netherland/", { host: "dm-consultantkuwait.com" });
    expect(r.location).toBe("https://www.dmcimmigrationgroup.com/kuwait/visit-visas/netherlands");
  });

  test("unknown legacy paths redirect to the market homepage", async ({ request }) => {
    const r = await probe(request, "/some-unknown-page/", { host: "dm-consultant.in" });
    expect(r.location).toBe("https://www.dmcimmigrationgroup.com/india");
  });

  test("legacy redirects preserve query parameters", async ({ request }) => {
    const r = await probe(request, "/golden-visa-uae/?lang=ar&utm=x", { host: "dm-consultantabudhabi.com" });
    expect(r.location).toBe(
      "https://www.dmcimmigrationgroup.com/abu-dhabi/business-investment/golden-visa-uae?lang=ar&utm=x",
    );
  });

  test("new-site trailing slashes still redirect (308) like Next default", async ({ request }) => {
    const r = await probe(request, "/dubai/");
    expect(r.status).toBe(308);
    expect(r.location).toBe("/dubai");
  });

  test("static assets bypass the proxy (no redirect)", async ({ request }) => {
    for (const asset of ["/favicon.ico", "/icon.png", "/robots.txt", "/sitemap.xml"]) {
      const r = await request.get(BASE + asset, { maxRedirects: 0 });
      expect(r.headers()["location"] ?? null, asset).toBeNull();
    }
    expect((await request.get(BASE + "/favicon.ico", { maxRedirects: 0 })).status()).toBe(200);
  });
});
