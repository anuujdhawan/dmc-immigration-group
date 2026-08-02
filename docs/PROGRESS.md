# Progress — DMC Immigration Group

Living checklist. Update after every meaningful batch. Never delete completed history.

Last updated: 2026-08-02

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

- Phase 3 (Shared shell + homepage): SiteHeader (utility bar + sticky header + logo V1), MegaNavigation (desktop, from `navigation.ts` registry), MobileNavigation (hamburger + accordion), MarketSwitcher (5-office switcher + cookie), SiteFooter (V2 logo, office directory, consent links), modals (office info), homepage sections per template (hero, marquee/ticker, services, countries/cards, tools, stories, video stories, resources, FAQ, process, why-dmc, refusals) at 1440/1024/768/390/320 fidelity.

## Next work

1. Phase 3: shared shell + homepage (above) — first fully responsive page milestone.
2. Phase 4: root routing — `proxy.ts` (geo headers `x-vercel-ip-country` + `x-vercel-ip-country-region`, market cookie, legacy-host redirects registry, apex→www), then remove the interim root redirect.
3. Phase 5: content pages — Express Entry reference implementation (ProgramPage from EE template), then remaining program pages.
4. Phase 6: blog MDX migration from crawl inventory (91 posts), blog index + `[slug]` market filtering.
5. Phase 7: lead forms (`react-hook-form` + zod), Resend route handler (env-gated), CRM adapter (env-gated), honeypot/rate-limit.
6. Phase 8: React ChatBotify v2 `DmcGuidedChat` + eligibility checker.
7. Phase 9: consent + analytics (vanilla-cookieconsent, consent-gated GTM/GA4/Meta from env).
8. Phase 10: calculators/tools (16 tools from inventory, pure modules + unit tests).
9. Phase 11: WhatsApp launcher (env numbers, per-market) + office directory + credentials page.
10. Phase 12: legal/anti-fraud hub + copy review; Phase 13: SEO (metadata, sitemap, robots, OG, structured data); Phase 14: QA sweep + e2e suite + readiness checklist.

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

- `npm test` — 21 passed (4 files: env schema, markets, routes, navigation) ✓
- `npm run lint` — 0 errors, 0 warnings ✓
- `npm run typecheck` — clean ✓
- `npm run build` — ✓ 11 routes (/, /_not-found, /dubai + 4 markets, /icon.png, /apple-icon.png, /favicon.ico); Turbopack; TypeScript pass ✓
- `npm audit --omit=dev` — 3 high, all `sharp <0.35.0` via Next 16.2.12 optionalDep (postcss fixed via override) — accepted debt, revisit on Next update
- Logo pipeline (temp): `logo-process.mjs` — flood-fill white→transparent + trim + WebP/PNG variants → `public/media/brand/` + app icons

## Incomplete counts

- Routes: ~90 canonical routes inventoried; 5 of 90 built as market homepages (placeholder content).
- Blog articles: 91 (`.ae`) + 23 + 8 + 19 + 4 crawled into inventory; 0 migrated.
- Legacy authentic assets: 144 success-story + 16 gallery + video/press items inventoried as sources; 0 approved/manifested.
- Tools: 0 of 16 implemented.
