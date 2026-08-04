# Progress — DMC Immigration Group

Living checklist. Update after every meaningful batch. Never delete completed history.

Last updated: 2026-08-04

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

- Homepage credentials section density pass completed:
  - `src/components/home/CredentialsSection.tsx` now uses a fuller dark-left panel with an added proof card, a verification-trail panel, and smaller trust chips at the bottom so the section feels intentional instead of empty.
  - `src/app/globals.css` now widens the proof stack/assurance blocks and turns the proof stack into a two-column desktop layout so the dark green section reads as a complete band on desktop and mobile.
  - Follow-up tweak: the verification mini-cards and trust chips now use darker text on lighter green-white cards, and the trust-chip row sits before the reassurance copy as requested.
  - Follow-up fix: the verification-trail and trust-chip text now has explicit scoped contrast overrides so it does not inherit the dark-band white text rules.
  - Latest spacing pass: the proof cards, verification-trail cards, and trust-chip cards now have more even internal padding, consistent minimum heights, and slightly larger gaps so the dark band feels more elegant and symmetrical.
  - Verification: `npm run typecheck` ✓, `npm run lint` ✓ with the same pre-existing `<img>` warnings in `src/components/pages/ExpressEntryPage.tsx`.

- Homepage resources section parity completed:
  - `src/components/home/ResourcesSection.tsx` now mirrors the approved template structure more closely with a template-style heading block, per-card CTAs, and a non-clickable article/card pattern instead of the earlier fully clickable tiles.
  - `src/app/globals.css` now adds a scoped `#resources.template-resources` override so the homepage resources grid stays in the site’s soft green gradient language and picks up the same hover lift/shimmer feel as the other homepage cards.
  - Verification: `npm run typecheck` ✓, `npm run lint` ✓ (7 pre-existing `<img>` warnings in `src/components/pages/ExpressEntryPage.tsx`; no new errors from this batch).

- **Express Entry template parity batch completed**: exact CSS + HTML replication from the approved `DMC_Express_Entry_Mobile Responsive(2).html` template:
  - Extracted all three EE-specific CSS layers (`ee-page-styles`, `dmc-express-editorial-responsive-v5`, `dmc-express-image-stability-v1` — ~64KB total) into `src/app/globals.css`, scoped under `.ee-page` / `#express-entry-content` selectors.
  - Created `src/components/pages/ExpressEntryPage.tsx` — a client component that renders the template's exact HTML structure (breadcrumb, facts bar, sticky anchor nav, benefits split, lead form, programs grid, overview split, eligibility + score card, CRS calculator, documents grid, process dark, consultation band, guidance panel, evidence grid, roadmap, FAQ accordion, blog grid, story carousel, disclaimer, CTA). Interactive FAQ accordion and story carousel use React state.
  - Created dedicated route at `src/app/[market]/visas/canada/express-entry/page.tsx` — takes precedence over the catch-all `[...segments]` route for this path. Generates static params for all 5 markets. Uses `ExpressEntryPage` component directly.
  - Verification: `npm run typecheck` ✓, `npm run lint` ✓ (0 errors, 7 `<img>` warnings for external template images), `npm run build` ✓ (411 static pages / both catch-all and specific EE routes generated).
  - The catch-all route still exists for all other content pages; the specific EE route shadows it for `/visas/canada/express-entry` only.

- Shared hero component batch completed:
  - `src/components/home/Hero.tsx` is now the reusable botanical hero shell for the homepage and the content pages.
  - `src/components/pages/ProgramPage.tsx` now passes page-specific eyebrow, title, lede, CTA labels, and a scroll cue that points to the first content section, so the existing pages all share the same hero structure instead of the older plain content-page header.

- Internal page expansion batch completed:
  - `src/content/pages/site.ts` now carries the market-aware content for the dropdown/menu pages and uses Tailwind-heavy card and link layouts while preserving the existing shared CSS stack.
  - `vitest.config.ts` now aliases `server-only` for tests and loads placeholder env values from `.env.example`, which keeps the server boundary intact while allowing the registry tests to import office data.

- Internal page template batch completed:
  - `src/components/pages/ProgramPage.tsx` now supports the Express Entry reference layout with shared facts, split-media, lead-band, cards, FAQ, disclaimer, and a stronger closing CTA, while keeping the old-site media/content adapted to the new market-aware shell.
  - The Express Entry page now follows the template cadence much more closely: programs, overview, eligibility, CRS, roadmap, documents, FAQ, news, success stories, disclaimer, then the closing CTA.

- Express Entry template parity follow-up completed:
  - `src/components/pages/ProgramPage.tsx` now renders stronger template-style section treatments for the Express Entry page, including numbered program cards, template-like split sections, a dark CRS/selection-factor panel, and a roadmap grid instead of the earlier plain list.
  - `src/components/pages/SectionNav.tsx` now provides sticky scrollspy-style anchor pills so the in-page nav behaves like the approved internal-page sample.
  - `src/components/layout/MegaNavigation.tsx` now highlights `Visas` on the Express Entry route so the top shell matches the template state.
  - Verification: `npm run typecheck` ✓, `npm run lint` ✓, `npm run build` ✓ (escalated; Turbopack sandbox port/process limitation reproduced without escalation).

- Internal-page hero offset fix:
  - `src/components/pages/ProgramPage.tsx` now wraps the full internal-page content in a top-padded container so the Express Entry page begins under the fixed header instead of at the very top edge of the viewport.
  - Verification: `npm run typecheck` ✓, `npm run lint` ✓ (warnings only from existing `<img>` usage in `src/components/pages/ExpressEntryPage.tsx`).

- Navbar/header parity batch completed:
  - `src/config/navigation.ts` now mirrors the template menu labels and group structure more closely, including the exact dropdown section naming and legal route normalization.
  - `src/components/layout/SiteHeader.tsx` now carries the template-derived header CSS directly in the component via `style jsx global`, so the floating header, plaque/deck/action styling, dropdown treatment, and mobile menu chrome stay self-contained.
- `src/components/layout/MegaNavigation.tsx` and `src/components/layout/MobileNavigation.tsx` already match the template interaction model and were kept aligned with the updated nav registry.
- Verification: `npm run lint -- src/config/navigation.ts src/components/layout/SiteHeader.tsx src/components/layout/MegaNavigation.tsx src/components/layout/MobileNavigation.tsx` ✓, `npm run typecheck` ✓, `npm run build` ✓ (escalated; sandbox Turbopack process-spawn restriction reproduced without escalation).

- Header duplication fixed after the first parity pass: `SiteHeader` now renders separate desktop/mobile shells, `MobileNavigation` no longer carries the shell class, `MegaNavigation` starts at `lg`, and the final `globals.css` override is breakpoint-gated so the desktop header can’t leak into tablet/mobile widths.
- Verification for the follow-up fix: `npm run typecheck` ✓, `npm run build` ✓ (escalated once for the sandbox port/process limitation).
- Navbar follow-up fix: removed the desktop nav's `hidden lg:block` dependency because the recovered stylesheet stack left it visually collapsed at desktop widths, and anchored the mobile dropdown to the full mobile header shell so it opens as a full-width panel instead of a narrow strip beside the hamburger button.
- Verification for the latest navbar fix: live browser reload at `1600x900` shows desktop links visible in the center deck; live browser reload at `390x844` shows the mobile menu opening at full shell width; `npm run typecheck` ✓.
- Shared-layout cleanup: `SiteFooter` legal links no longer use bare `href` keys, which removes the duplicate-key React console warning caused by the `Privacy Policy` and `Cookie Policy` entries sharing the same target route.
- Desktop dropdown alignment fix: removed the extra Tailwind X-translation from `MegaNavigation` and moved dropdown width/transform to a single inline source so the recovered template CSS no longer double-shifts the panel left.
- Verification for dropdown alignment: live browser measurement on `http://localhost:3000/dubai#home` now reports `delta: 0` for Visas, Services, Resources, and Tools, meaning each dropdown center matches its trigger center exactly; `npm run typecheck` ✓.
- Workspace warning cleanup: canonicalized the flagged Tailwind classes in `SiteHeader` and `MobileNavigation`, removed the ignored `vertical-align` declaration from the shared media reset in `globals.css`, and added `.vscode/settings.json` so the editor stops misreporting Tailwind v4 `@theme` as an unknown at-rule.
- Verification for warning cleanup: `npm run typecheck` ✓.
- Hero orbit flag cleanup: removed the dark square outline around the animated flag chips by resetting the parent orbit node button appearance instead of changing the flag span styling.
- Verification for the flag cleanup: live browser inspection now reports `.botanical-network-stage .country-orbit-node` with `appearance: none` and `box-shadow: none`; `npm run typecheck` ✓.
- Mobile/tablet menu alignment cleanup: removed the duplicate JSX `+` from each accordion row in `MobileNavigation`, leaving the existing CSS disclosure marker as the single right-aligned icon.

- **Phase 5 COMPLETE (uncommitted → commit this batch)**: content pages — 60 content pages across 8 group files, ProgramPage renderer, catch-all route, tests:
  - Content registry (`src/content/pages/`): `types.ts` (added `ProgramItem`, `LinkItem`, `programs`/`links` kinds, `anchor` on sections), 8 group files — `canada.ts` (7), `australia.ts` (8), `uk.ts` (2), `visit-visas.ts` (23: directory + 6 hubs + 16 destinations), `business-investment.ts` (9), `study-abroad.ts` (6), `services.ts` (2), `resources.ts` (3). `index.ts` exports `PAGE_REGISTRY`, `PAGE_IDS`, `getPageContent`, `breadcrumbsFor`, `pageTitleForMarket`.
  - Renderer `src/components/pages/ProgramPage.tsx` mapped from the EE template: botanical hero (title split into brand-tinted last word), disclaimer, status banners (e.g. RNIP closed, IELTS pending client), breadcrumbs (crumb prefixes like `/visas` render as plain text — they are not registered pages), sticky anchor nav, alternating white/slate sections, dark aurora process + sources sections, FAQ accordions, related pages/tools cards, CTA band. Official sources + `lastVerified` on every page.
  - Catch-all `src/app/[market]/[...segments]/page.tsx`: `generateStaticParams` from `MARKET_LIST × PAGE_IDS`, `generateMetadata` (seoTitle/seoDescription, canonical from `SITE_URL`, `noindex` when `page.noindex`), `notFound()` for unknown ids.
  - Nav fix: primary "Express Entry" item href `/express-entry` → `/visas/canada/express-entry` (was a dead route).
  - Facts verified via web search this batch: UK Student maintenance £1,529/£1,171 per month (rates from 11 Nov 2025; previous £1,334/£1,023 cited by stale sources), student visa fee £558 (Apr 2026), IHS £776/yr students; Australia 500: GS requirement (replaced GTE Mar 2024), 48h/fortnight term work (unlimited breaks, research uncapped), ~AUD 29,710 funds benchmark; Canada: SDS ended 8 Nov 2024, PAL, 24h/week off-campus, CAD 20,635 (2024–25).
- `study-abroad/ielts-coaching` published **noindex** with honest status banner pending client confirmation of in-house coaching.
- Tests: `src/content/pages/content-registry.test.ts` (8 tests — unique ids, metadata completeness, relatedPages/links-path resolution, relatedTools shape, noindex flag); `tests/e2e/content-pages.spec.ts` (7 tests — hero/sections/sources, FAQ accordion, overflow at 768/390/320, breadcrumbs, all 5 markets, unknown path 404, robots noindex).

## 2026-08-04 — Site pages expansion

- Expanded the shared content registry with the menu-driven internal pages the user called out: `about`, `contact`, `credentials`, `success-stories`, `video-success-stories`, `gallery`, `press-media`, `blog`, `tools`, `tools/eligibility-checker`, `tools/canada`, `tools/australia`, `visas/canada`, `visas/australia`, `visas/uk`, and the legal set under `/legal/*`.
- Kept the shared CSS layers intact while building the new pages with Tailwind-first card/grid layouts in `src/content/pages/site.ts`, and kept every market page explicitly market-aware in the hero copy.
- Added a Vitest env bootstrap that loads placeholders from `.env.example` so server-only content modules can be tested without introducing a second active env file.
- Verification: `npm test` ✓, `npm run lint` ✓, `npm run build` ✓ (escalated for Turbopack's sandbox port-binding restriction).

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

- `node -e "postcss.parse(...)"` on `src/app/globals.css` — valid CSS ✓
- `npm run typecheck` — clean ✓
- `npm run test:e2e` — **68/68 passed** (desktop-chromium + mobile-390; homepage 9, routing 22, content pages 7 — Phase 5 suite incl. hero/sections/sources, FAQ accordion, content overflow 768/390/320, breadcrumbs, 5-market render, unknown-path 404, robots noindex) ✓
- `npm run test:e2e -- tests/e2e/content-pages.spec.ts` — sandbox webserver start failed with Turbopack port-binding error; escalated rerun stalled and was cancelled, so browser verification of this batch is still pending in this environment.
- `npm test` — 41 passed (6 files: env schema, markets, routes, navigation, legacy-redirects, content registry) ✓
- `npm run lint` — 0 errors, 0 warnings ✓
- `npm run build` — ✓ **411 static pages / 311 routes** after the internal-page template alignment pass; Turbopack; TypeScript pass ✓
- `npm run build` — ✓ **411 static pages / 311 routes** after the Express Entry template parity follow-up; Turbopack; TypeScript pass ✓
- NOTE: kill stale dev/start servers on :3000 before `test:e2e` — `reuseExistingServer: true` will silently reuse an outdated build (caused 15 phantom failures this session; root cause: pre-Phase-5 `next dev` still listening).
- `npm audit --omit=dev` — 3 high, all `sharp <0.35.0` via Next 16.2.12 optionalDep (postcss fixed via override) — accepted debt, revisit on Next update
- Logo pipeline (temp): `logo-process.mjs` — flood-fill white→transparent + trim + WebP/PNG variants → `public/media/brand/` + app icons

## Incomplete counts

- Routes: ~90 canonical routes inventoried; 60 of ~90 built as content pages (all 5 markets live via catch-all); shared-registry internal pages now cover about/contact/credentials/resources/legal/tools, while blog MDX and calculator/tool implementations remain later phases.
- Blog articles: 91 (`.ae`) + 23 + 8 + 19 + 4 crawled into inventory; 0 migrated (Phase 6).
- Legacy authentic assets: 144 success-story + 16 gallery + video/press items inventoried as sources; 0 approved/manifested.
- Tools: 0 of 16 implemented (Phase 10).

## 2026-08-04 — Global stylesheet recovery

- Repaired `src/app/globals.css` after a broken recovery paste. The invalid 1,781-line transcription contained CSS syntax errors and prevented parsing.
- Superseding the initial minimal recovery, the stylesheet now contains all 14 CSS layers recovered verbatim from `DMC_Homepage_Mobile_Responsive_Final(1).html`, including its generated utility layers (6,505 lines, 673,473 bytes). `globals.css` remains PostCSS-valid.
- The user-provided damaged source is preserved untouched at `src/app/globals.css.broken-backup-20260804.txt` (SHA-256 `7058e07cab2d584d1ade164d6eaf9dc3b853a965e7a200f78ed69e433b92b840`).
- The current React homepage uses different markup from the source template, so exact visual parity requires a subsequent JSX/component port in addition to this CSS recovery.

## 2026-08-04 — Root hydration warning suppression

- Browser-extension attributes (`webcrx`, `__processed_*`, and `bis_register`) were injected into the root `<html>`/`<body>` before React hydration, producing a development-only mismatch warning despite a successful page response.
- Added `suppressHydrationWarning` only to the root `<html>` and `<body>` in `src/app/layout.tsx`; nested component hydration mismatches remain visible. `npm run typecheck` passes.

## 2026-08-04 — Homepage template port batch

- Ported the remaining homepage sections from the approved HTML template into the Next.js app while leaving the navbar and hero untouched:
  - added the regulatory recognition band and stats band,
  - restyled `ServicesSection`, `CountriesSection`, `WhyDmcSection`, `CredentialsSection`, `VisitVisasSection`, `ToolsSection`, `ProcessSection`, `StoriesSection`, `VideoStoriesSection`, `ResourcesSection`, `FaqSection`, and `ContactCtaSection`,
  - updated `SiteFooter` to the template-like split layout with social links and bottom legal row,
  - kept the honest placeholders and safe wording where the template contained unverified testimonials or success claims.
- Updated `HomeSections` ordering so the page now flows like the template: hero, recognition band, services, destinations, why DMC, credentials, visit visas, tools, process, stats band, stories, video stories, resources, FAQ, and final CTA.
- Verification: `npm run typecheck` ✓, `npm run lint` ✓, `npm run build` ✓ (escalated; Turbopack sandbox port-binding limitation reproduced without escalation).

## 2026-08-04 — Homepage contrast/logo correction

- Reworked the credentials band to use the template's exact proof-stack hooks (`credential-proof-stack`, `credential-proof-card`, `credential-proof-icon`, `credential-assurance`, `credential-assurance-mark`) so the recovered CSS controls the dark-panel contrast correctly and the text remains readable.
- Replaced the generic `BrandLogo` image in the resources grid with the template's `brand-logo resource-brand-mark` span so the resource cards use the approved logo plaque treatment instead of a standalone image component.
- Simplified the hero core plaque to a single `brand-logo brand-logo-aurora` span so the animation no longer stacks two logos on top of each other.
- Verification: `npm run typecheck` ✓, `npm run lint` ✓, `npm run build` ✓ (escalated; Turbopack sandbox port-binding limitation reproduced without escalation).

## 2026-08-04 — Countries grid completion

- Added the missing Germany pathway card to the countries section so the desktop grid now matches the approved six-card template layout instead of stopping at five cards.
- Updated the badge logic so the Germany tile correctly renders `EU Blue Card` instead of falling back to the generic partner-visa label.
- Verification: `npm run typecheck` ✓, `npm run lint` ✓, `npm run build` ✓ (escalated; Turbopack sandbox port-binding limitation reproduced without escalation).
