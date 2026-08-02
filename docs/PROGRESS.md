# Progress — DMC Immigration Group

Living checklist. Update after every meaningful batch. Never delete completed history.

Last updated: 2026-08-03

## Completed

- Read the full `DMC_MASTER_PROMPT.md` (1374 lines) — permanent project specification.
- Inspected both supplied HTML templates:
  - `DMC_Homepage_Mobile_Responsive_Final(1).html` (homepage visual/interaction source of truth)
  - `DMC_Express_Entry_Mobile Responsive(2).html` (internal content-page system source of truth)
- Repository audit: fresh `create-next-app` scaffold — Next.js **16.2.12**, React **19.2.4**, React DOM 19.2.4, Tailwind **4** (`@tailwindcss/postcss`), TypeScript strict (tsconfig from CNA, `strict: true`), ESLint 9 + `eslint-config-next` 16.2.12, npm with committed `package-lock.json`. Git: single initial commit on `main`, clean tree.
- Logo assets located and analyzed programmatically (coding model cannot view images; see DECISIONS):
  - 4 variations, all JPEG 4500×4500 on white background, green brand colors (`#309010` deep, `#50B010` bright — matches template palette #358E1A/#45B318).
  - `DM_rebranding DP` — large 69%×70% emblem/monogram, 32% ink coverage.
  - `DM_rebranding V1` — horizontal lockup ~42%×16%.
  - `DM_rebranding V2` — horizontal lockup ~48%×18% (widest).
  - `DM_rebranding V3` — compact square emblem ~25%×25% (favicon/icon candidate).
  - Source: `prompts/DMC/Dm_Rebranding_All Ver/` (each also has `.pdf` + `.ai` masters).
- `.gitignore` fixed: `.env*` now has `!.env.example` exception so the committed env template is tracked.
- Continuity docs created: this file, `IMPLEMENTATION_PLAN.md`, `DECISIONS.md`, `ROUTE_INVENTORY.md`, `CONTENT_MIGRATION_INVENTORY.md`, `QA_CHECKLIST.md`; `AGENTS.md` handoff section added.
- **Phase 1 (Discovery + inventory) COMPLETE** — legacy crawl finished across all five legacy domains (Yoast sitemaps + media pages + direct probes):
  - `dm-consultant.ae`: 135 pages, 91 blog posts; `dm-consultant.qa`: 75 pages/23 posts; `dm-consultantkuwait.com`: 55/8; `dm-consultant.in`: 112/19; `dm-consultantabudhabi.com`: 30/4. Heavy cross-domain duplication; `.qa`/`.kw` contain stale `/new_en/` `/staging/` image paths.
  - Contacts, credential seeds (Kanika Gaba RCIC R534737; Riccardo J. P. Ippoliti MARN 1386990), 10 named testimonials, 144 success-story images (PII risk — text inside images), 16 gallery images, press/social refs — all recorded in `CONTENT_MIGRATION_INVENTORY.md` (§8–11).
  - Redirect dispositions for every no-v1 legacy page recorded in `ROUTE_INVENTORY.md` §10.
- **Phase 2 (Foundation) COMPLETE** — committed env files, config layer, tokens, test baseline:
  - Root `.env` (gitignored, active) + `.env.example` (committed, documentation only) with all §18 keys; placeholders for WhatsApp/lead-recipient/Resend/CRM/analytics.
  - Env validation: `src/config/env/` — zod v4 schema with typed per-market contact extraction (`marketContactEnv`), server-only secrets module, public/client subsets (client module reads only `NEXT_PUBLIC_*` inline — must never import full env).
  - Registries: `src/config/markets.ts` (typed `Market`, labels, geo mapping incl. UAE city split `DU`/`AZ`), `src/config/offices.ts` (server-only office directory from env), `src/config/navigation.ts` (primary mega-nav mirroring template sections #countries/#services/#tools/#resources + footer + legal + tools, single `allNavPaths()` source for route-audit tests).
  - Routing: `src/lib/routing/routes.ts` (market-prefix helpers), `src/lib/routing/market-cookie.ts` (server-only cookie helpers, httpOnly/lax/secure).
  - Design tokens in `globals.css` via Tailwind 4 `@theme` from template CSS (brand-50→950 scale, botanical/aurora dark palette, charcoal/ink/muted, tracking-mega series, card radii/shadows, header-offset); base layer (fonts, focus-visible, selection, reduced-motion); fonts `Manrope` (display) + `DM Sans` (body) via `next/font/google`.
  - App shell: root layout (metadataBase SITE_URL, title template), root `page.tsx` redirects to `/${DEFAULT_MARKET}`, `[market]/layout.tsx` (params Promise + `notFound()` guard + `generateStaticParams`), placeholder market homepage.
  - Tooling: vitest 4 (21 tests passing: env schema, markets, routes, navigation), @playwright/test config (desktop + Pixel 7 projects, build-and-start webServer), scripts `lint`/`typecheck`/`test`/`test:e2e`/`build`.
  - Brand asset pipeline (temp `sharp` script, flood-fill white→transparent so interior white text survives): `public/media/brand/` — `dmc-logo-emblem(-1024).webp` (DP), `dmc-logo-horizontal.webp` (V1), `dmc-logo-wide(-640).webp` (V2), `dmc-logo-mark.webp` (V3), `dmc-logo-mark-200.png` (WhatsApp avatar); app icons `src/app/icon.png` (512), `apple-icon.png` (180), `favicon.ico` (32).
  - Dependencies added: `zod`, `lucide-react` (runtime); `vitest`, `@playwright/test` (dev). `postcss` 8.5.25 override applied (Next's nested 8.4.31 had high-severity advisories; flat override verified by build).
  - Known dep debt: `sharp` 0.34.5 (Next 16.2.12 optionalDep pin) has libvips CVEs (GHSA-f88m-g3jw-g9cj) — fixed upstream in sharp 0.35; accept until Next stable bumps its range; do NOT force-override (build-time only exposure, next/image).
  - Verified: `npm run build` ✓ (11 routes: /, /_not-found, 5 markets, /icon.png, /apple-icon.png, /favicon.ico), `typecheck` ✓, `lint` ✓ 0 problems, `test` ✓ 21/21.

## Current work

- **Phase 5 COMPLETE (uncommitted → commit this batch)**: content pages — 60 content pages across 8 group files, ProgramPage renderer, catch-all route, tests:
  - Content registry (`src/content/pages/`): `types.ts` (added `ProgramItem`, `LinkItem`, `programs`/`links` kinds, `anchor` on sections), 8 group files — `canada.ts` (7), `australia.ts` (8), `uk.ts` (2), `visit-visas.ts` (23: directory + 6 hubs + 16 destinations), `business-investment.ts` (9), `study-abroad.ts` (6), `services.ts` (2), `resources.ts` (3). `index.ts` exports `PAGE_REGISTRY`, `PAGE_IDS`, `getPageContent`, `breadcrumbsFor`, `pageTitleForMarket`.
  - Renderer `src/components/pages/ProgramPage.tsx` mapped from the EE template: botanical hero (title split into brand-tinted last word), disclaimer, status banners (e.g. RNIP closed, IELTS pending client), breadcrumbs (crumb prefixes like `/visas` render as plain text — they are not registered pages), sticky anchor nav, alternating white/slate sections, dark aurora process + sources sections, FAQ accordions, related pages/tools cards, CTA band. Official sources + `lastVerified` on every page.
  - Catch-all `src/app/[market]/[...segments]/page.tsx`: `generateStaticParams` from `MARKET_LIST × PAGE_IDS`, `generateMetadata` (seoTitle/seoDescription, canonical from `SITE_URL`, `noindex` when `page.noindex`), `notFound()` for unknown ids.
  - Nav fix: primary "Express Entry" item href `/express-entry` → `/visas/canada/express-entry` (was a dead route).
  - Facts verified via web search this batch: UK Student maintenance £1,529/£1,171 per month (rates from 11 Nov 2025; previous £1,334/£1,023 cited by stale sources), student visa fee £558 (Apr 2026), IHS £776/yr students; Australia 500: GS requirement (replaced GTE Mar 2024), 48h/fortnight term work (unlimited breaks, research uncapped), ~AUD 29,710 funds benchmark; Canada: SDS ended 8 Nov 2024, PAL, 24h/week off-campus, CAD 20,635 (2024–25).
  - `study-abroad/ielts-coaching` published **noindex** with honest status banner pending client confirmation of in-house coaching.
  - Tests: `src/content/pages/content-registry.test.ts` (8 tests — unique ids, metadata completeness, relatedPages/links-path resolution, relatedTools shape, noindex flag); `tests/e2e/content-pages.spec.ts` (7 tests — hero/sections/sources, FAQ accordion, overflow at 768/390/320, breadcrumbs, all 5 markets, unknown path 404, robots noindex).
- **Phase 4 (routing + redirects) complete** — see earlier entry below.
- **Phase 3 COMPLETE**: shared shell + homepage sections built and verified end-to-end:
  - Layout primitives: `Container`, `Button` (primary/dark/outline/white/ghost + sm/md/lg), `SectionHeading`, `AccordionItem` (grid-rows collapse), `Dialog`, `SocialIcon` (hand-drawn SVG paths — lucide-react has no Instagram/Facebook/YouTube exports).
  - Header: `BrandLogo` (header/footer/mark/emblem variants from processed brand assets), `SiteHeader` (utility bar w/ office phone+email, RCIC·MARA·CICC line, socials; sticky bar with logo V1, `MegaNavigation`, `MarketSwitcher`, CTA `max-sm:hidden`), `MobileNavigation` (hamburger→accordion drawer: primary groups, tools, legal; **drawer portaled to `document.body`** — the header bar's `backdrop-blur` creates a containing block for `fixed` descendants, which collapsed the drawer to zero height (`top:88px`+`bottom:0` resolved against the 88px bar); portal + `z-40` fixes it), `MarketSwitcher` (flag icons, market-prefixed nav, cookie via server action `setMarketCookieAction`).
  - Footer: V2 logo, 4-column nav + legal links, per-market office card (`{office.city} Office`, phone `tel:`, email `mailto:`), brand-950 bg.
  - Config: `src/config/credentials.ts` (5 credentials + 2 consultants — all `status: "candidate"` with honest "subject to final confirmation" label until client verifies), `src/config/testimonials.ts` (10 named candidates w/ `sourceUrl`; `approvedTestimonials()` renders ONLY `status === "approved"` quotes; homepage shows truthful placeholders "Client story — being verified").
  - Homepage: `HomeSections` + 13 sections — Hero (stats, aurora bg, CTA), marquee/ticker (5 countries, `@keyframes marquee` + `[mask-image]` fade edges), Services (6 cards), Countries (5 illustrative journeys + network card), WhyDmc, Credentials (dark aurora), VisitVisas (5 featured + "15 more"), Tools (3), Process (5), Stories + VideoStories (truthful placeholders), Resources (8), FAQ (5, accordion), ContactCta. `[market]/layout.tsx` wraps header/main/footer.
- Phase 3 e2e debugging (all three failures resolved):
  1. **Overflow 29px @320** — Services card title row: badge (`shrink-0`, `tracking-mega`) + heading without `min-w-0` → heading couldn't shrink → card overflowed viewport. Fixed with `min-w-0` on the heading.
  2. **Mobile menu "Express Entry"** — test ambiguity: TWO matches (drawer accordion link + Tools card whose accessible name contains "Express Entry" → `.last()` hit `/dubai/tools/canada/crs-calculator`) → scoped to mobile nav; plus drawer visibility bug (above) fixed via portal.
  3. **Footer phone strict-mode violation** — `getByText('+974 4436 7929')` matched utility bar + footer → scoped to `footer`; footer label now `{office.city} Office` (matches "Doha, Qatar Office").

## Next work

1. Commit Phase 5 (verified below).
2. Phase 6: blog MDX migration from crawl inventory (91 posts), blog index + `[slug]` market filtering.
3. Phase 7: lead forms (`react-hook-form` + zod), Resend route handler (env-gated), CRM adapter (env-gated), honeypot/rate-limit.
4. Phase 8: React ChatBotify v2 `DmcGuidedChat` + eligibility checker.
5. Phase 9: consent + analytics (vanilla-cookieconsent, consent-gated GTM/GA4/Meta from env).
6. Phase 10: calculators/tools (16 tools from inventory, pure modules + unit tests).
7. Phase 11: WhatsApp launcher (env numbers, per-market) + office directory + credentials page.
8. Phase 12: legal/anti-fraud hub + copy review; Phase 13: SEO (metadata, sitemap, robots, OG, structured data); Phase 14: QA sweep + e2e suite + readiness checklist.

## Blockers / TODO(client)

- WhatsApp numbers per market — not confirmed; env placeholders only.
- Lead-recipient emails (`DMC_<MARKET>_LEAD_TO_EMAIL`) — placeholders.
- Resend API key + verified sending domain + sender identity — not supplied.
- CRM endpoint/credentials — dummy config only.
- Analytics/GTM/GA4/Meta IDs — not supplied; integrations stay disabled.
- Directions URLs per office — not supplied.
- **India office email** (`info.bglr@dm-consultant.com` contains `bglr` but address is Hyderabad) — verify.
- Kanika Gaba (RCIC/CICC R534737) and Riccardo James Patrick Ippoliti (MARN 1386990) — verify current regulator status + DMC affiliation + republication approval before publishing as consultants.
- Authentic media (testimonials/stories/gallery/team/office/video/press) — approval + PII review pending; truthful placeholders until then.
- In-house IELTS coaching existence — unverified; publish restrained placeholder or keep draft/noindex until client confirms.
- Legal/anti-fraud copy — for client/legal review; never claim legal-reviewed status.
- Logo placement mapping (DP/V1/V2/V3) — provisional, needs client visual confirmation. Note: V2 ("wide") processed at 91% opaque after white-removal — likely sits on its own green plaque; will render fine on white but not transparent-capable. DP/V1/V3 cleaned cleanly (61%/38%/24% opaque).
- Offices: no office hours, coordinates, accessibility facilities, or branch photos — do not invent.

## Latest commands / test results

- `npm run test:e2e` — **68/68 passed** (desktop-chromium + mobile-390; homepage 9, routing 22, content pages 7 — Phase 5 suite incl. hero/sections/sources, FAQ accordion, content overflow 768/390/320, breadcrumbs, 5-market render, unknown-path 404, robots noindex) ✓
- `npm test` — 41 passed (6 files: env schema, markets, routes, navigation, legacy-redirects, content registry) ✓
- `npm run lint` — 0 errors, 0 warnings ✓
- `npm run typecheck` — clean ✓
- `npm run build` — ✓ **311 routes** (11 infra + 5 markets × 60 content pages); Turbopack; TypeScript pass ✓
- NOTE: kill stale dev/start servers on :3000 before `test:e2e` — `reuseExistingServer: true` will silently reuse an outdated build (caused 15 phantom failures this session; root cause: pre-Phase-5 `next dev` still listening).
- `npm audit --omit=dev` — 3 high, all `sharp <0.35.0` via Next 16.2.12 optionalDep (postcss fixed via override) — accepted debt, revisit on Next update
- Logo pipeline (temp): `logo-process.mjs` — flood-fill white→transparent + trim + WebP/PNG variants → `public/media/brand/` + app icons

## Incomplete counts

- Routes: ~90 canonical routes inventoried; 60 of ~90 built as content pages (all 5 markets live via catch-all); blog/legal/credentials/about/contact/tools remain (later phases).
- Blog articles: 91 (`.ae`) + 23 + 8 + 19 + 4 crawled into inventory; 0 migrated (Phase 6).
- Legacy authentic assets: 144 success-story + 16 gallery + video/press items inventoried as sources; 0 approved/manifested.
- Tools: 0 of 16 implemented (Phase 10).
