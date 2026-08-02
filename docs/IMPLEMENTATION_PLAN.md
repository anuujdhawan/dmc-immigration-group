# Implementation Plan — DMC Immigration Group

Source of truth: `DMC_MASTER_PROMPT.md` (Section 25 defines these phases; Section 27 the definition of done). Visual sources of truth: the two supplied HTML templates. Order below may be adjusted only if the repository dictates it; record any change in `DECISIONS.md`.

## Phase 1 — Discovery and inventory
- [x] Inspect both supplied HTML templates (homepage + Express Entry internal page).
- [x] Audit existing repository: Next.js 16.2.12, React 19.2.4, Tailwind 4, TS strict, npm + committed lockfile, eslint 9, eslint-config-next. Clean git on `main`.
- [x] Locate and analyze the 4 rebranding logo variations (DP, V1, V2, V3) — JPEG 4500×4500, white background, green brand colors. Provisional placement mapping recorded in `DECISIONS.md` (visual confirmation of the logos still required — coding model cannot view images).
- [ ] Crawl legacy sites (`dm-consultant.ae`, its blog/sitemap, and the other four legacy domains) → build `docs/ROUTE_INVENTORY.md` + `docs/CONTENT_MIGRATION_INVENTORY.md`.
- [ ] Inventory legacy authentic assets (About, testimonials, success stories, gallery, contact) per MASTER §16.3.

**Gate:** inventories exist and are reasonably complete before Phase 6 page generation.

## Phase 2 — Foundation
- [ ] Design tokens + global styles from template CSS layers (brand + editorial palettes, Manrope/DM Sans via `next/font`).
- [ ] Environment validation layer (`src/config/env/*`, Zod, `server-only` for secrets); root `.env` + committed `.env.example`; env audit test.
- [ ] Market registry (`MARKET_SLUGS`, typed `Market`), route builders, market cookie helpers.
- [ ] Testing baseline: `lint`, `typecheck`, `test`, `test:e2e`, `build` scripts with maintained tooling.

**Gate:** scripts pass; `.env` is the only active env file.

## Phase 3 — Shared template shell
- [ ] `SiteHeader`, `UtilityBar` (market-aware), `MegaNavigation` + `MobileNavigation` from one registry, `MarketSwitcher`, `SiteFooter`, modal/dialog primitives, homepage sections + responsive fidelity at 1440/1024/768/390/320.

**Gate:** screenshots compare against templates; keyboard-nav works; no horizontal overflow.

## Phase 4 — Market routing and redirects
- [ ] `[market]` whitelist + 404, `generateStaticParams`; root geolocation/cookie precedence (legacy host → explicit market → cookie → Vercel geo → dubai); `proxy.ts` per current Next.js convention.
- [ ] Canonical host (apex → www 308), `src/config/legacy-redirects.ts` for all five legacy domains; redirect tests.

**Gate:** precedence tests pass, no redirect loops.

## Phase 5 — Internal page renderer
- [ ] Typed `ProgramPage` content model + composable section components; `ProgramPageRenderer`.
- [ ] Express Entry page as first high-fidelity reference implementation (breadcrumbs, anchor nav, FSW/FST/CEC/PNP, 67-point, CRS grid, documents, dark process, guidance, evidence, roadmap, FAQ, blog, stories, disclaimer, CTA).

**Gate:** EE page matches template at all widths.

## Phase 6 — Navbar pages
- [ ] Every navigation-registry item → real page or hub (Canada, Australia, UK, visit-visas 6 hubs + 17 destinations, business-investment, study-abroad, more-services, resources, tools, about/contact/why-dmc, legal 5 pages). Fact-check all program status against official sources with `lastVerified`.

**Gate:** route-audit test passes for all 5 markets; no placeholder links.

## Phase 7 — Lead pipeline
- [ ] Shared `LeadForm` (React Hook Form + Zod), one server-only route handler; Resend delivery (market `DMC_<MARKET>_LEAD_TO_EMAIL` recipients, sender identity from env); disabled CRM adapter (`LeadDestination`, `CRM_ENABLED=false`); honeypot + disabled rate-limit/Turnstile adapters; idempotency; unit/integration tests.

**Gate:** mocked-provider tests pass; secrets never in client bundle.

## Phase 8 — Guided conversion tools
- [ ] `DmcGuidedChat` wrapper around React ChatBotify v2 (verify compatibility first; fallback custom state machine if it fails — record in DECISIONS) + typed `guided-chat.flow.ts`.
- [ ] Eligibility checker (manual-open only); WhatsApp 5-market launcher (env-backed, no dummy links); shared lead pipeline integration; graceful failure paths.

**Gate:** all chat branches/offices tested; lazy-load failure keeps forms + WhatsApp usable.

## Phase 9 — Trust, offices, measurement
- [ ] Office directory (5 offices, tel/mailto/WhatsApp/directions env-backed, structured data from one registry); credentials page + registry (verify Kanika Gaba R534737, Riccardo Ippoliti 1386990 with regulators + client approval before publishing); legal/anti-fraud hub; `ConsentManager` (CookieConsent v3) + consent-gated GA4/GTM/Meta adapters.

**Gate:** unapproved credentials cannot render; consent tests prove no scripts before opt-in.

## Phase 10 — Calculators
- [ ] 4 Australia + 12 Canada tools in `ToolShell`; pure typed calculation modules; versioned rule data; official sources + `lastVerified`; boundary/spouse/invalid-input unit tests; interaction tests.

**Gate:** all 16 tested; disclaimers + rule dates displayed.

## Phase 11 — Blog migration
- [ ] MDX + frontmatter (Zod) + safe renderer; `sharp` image pipeline; complete article migration from old crawl; `legacyUrls` redirects; market filtering; metadata/JSON-LD.

**Gate:** inventory proves every unique old article migrated or documented duplicate/redirect.

## Phase 12 — Authentic resources
- [ ] Crawl old trust/media sources; manifest every testimonial/story/gallery/team/office/video/credential asset with verification/consent/PII states; publish only `approved`; truthful placeholders otherwise.

**Gate:** manifest validation tests pass; production excludes non-approved records.

## Phase 13 — SEO and hardening
- [ ] Metadata/canonicals, sitemap, robots, structured data, security headers (CSP etc.), 404, performance passes.

**Gate:** Lighthouse/CWV targets; no broken links.

## Phase 14 — Full QA
- [ ] Route crawler, broken links, responsive screenshots (Playwright), accessibility scan + keyboard journeys, all test suites, production build, env + consent audits, README + final handoff report per MASTER §28.

**Gate:** every item in `docs/QA_CHECKLIST.md` verified; `lint`/`typecheck`/`test`/`test:e2e`/`build` pass with results recorded.
