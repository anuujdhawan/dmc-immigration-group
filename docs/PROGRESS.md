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

## Current work

- Phase 1 (Discovery and inventory): legacy-site crawl (`dm-consultant.ae`, blog, other four legacy domains) to populate route + content inventories. **Not yet crawled.**

## Next work

1. Crawl legacy sites → complete `docs/ROUTE_INVENTORY.md` and `docs/CONTENT_MIGRATION_INVENTORY.md` (blog articles, pages, sitemaps, authentic-asset sources).
2. Phase 2 (Foundation): design tokens/global styles, env validation layer, root `.env` (dummy values) + `.env.example`, market registry + route helpers, testing baseline scripts.
3. Phase 3: shared shell (header, mega-nav, mobile nav, market switcher, footer, modals, homepage sections).

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
- Logo placement mapping (DP/V1/V2/V3) — provisional, needs client visual confirmation.
- Offices: no office hours, coordinates, accessibility facilities, or branch photos — do not invent.

## Latest commands / test results

- `npm init -y && npm install sharp` (temp dir only, `/var/folders/.../T/opencode`) — OK (logo analysis tooling).
- No project test scripts run yet (baseline not configured — Phase 2).
- Project builds were produced during initial scaffold setup (`.next/` present); do not treat as verified until `npm run build` is run and recorded.

## Incomplete counts (to be filled by crawl)

- Routes: 0 of ~90 canonical routes inventoried with five-market status.
- Blog articles: 0 of unknown crawled.
- Legacy authentic assets: 0 of unknown manifested.
- Tools: 0 of 16 implemented.
