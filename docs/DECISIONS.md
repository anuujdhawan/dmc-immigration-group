# Decisions — DMC Immigration Group

Record architectural and content decisions, deviations from templates, renamed/closed programs, canonical URL choices, dependency choices, and unresolved client verification items. Append, never rewrite history.

## 2026-08-09 — Resend lead recipient = dmcimmigrationgroup@gmail.com (sandbox owner)
- The Resend account is in sandbox mode, which only delivers to the account owner `dmcimmigrationgroup@gmail.com`. All form lead emails (`RESEND_REPLY_TO_EMAIL` + every `DMC_<MARKET>_LEAD_TO_EMAIL`) now target that inbox; the previous `dmcimmigrationglobal@gmail.com` was unverified and every send was rejected with Resend 403. `from` must remain `onboarding@resend.dev` until a sending domain is verified. Widening recipients is a `.env`-only change after domain verification.

## 2026-08-09 — Landing forms: skilled-migration eligibility gate (age 45+ / education 12th)
- Client decision: every landing-page form (all four landing routes; one shared `LandingLeadForm` component) blocks submission when the applicant selects age `45+` OR education `12th`, showing “To qualify for Australia Skilled Migration, you need a minimum of a diploma or bachelor's degree and must be under 45 years of age.” below the fields. Client-supplied message kept verbatim; note it references Australia even on the Canada landing variants — revisit if a Canada-specific message is wanted.

## 2026-08-02 — Initial session

### Stack
- **Next.js 16.2.12 / React 19.2.4 / TypeScript strict / Tailwind 4 / ESLint 9 / npm** — retained the fresh `create-next-app` scaffold (single commit `99da7df`). Matches MASTER §4 item 4 (honor existing repo). One lockfile: `package-lock.json`.
- IMPORTANT: this Next.js version has breaking changes vs training data — read `node_modules/next/dist/docs/` before writing code (see AGENTS.md). Next 16 conventions: App Router, `proxy.ts` guidance for root middleware/geolocation; verify `next.config.ts` (not `.js`) and current file conventions at implementation time.

### Brand logos (client: "all logos are variations of the same brand — use where each fits by height/width and looks best")
- All four are the same brand mark; no market-specific logos exist, so use one approved master logo across all five markets per MASTER §16.2.
- Coding model cannot view images (deepseek-v4-flash has no image input). Placement mapping below is derived from programmatic geometry/ink/color analysis (sharp) of the 4500×4500 JPEGs and matches the client's "height/width fits" instruction; **client should visually confirm**.
  - `DM_rebranding V3` (compact 25×25% square emblem, 2% ink) → favicon, app/OG square, WhatsApp launcher avatar, small inline marks.
  - `DM_rebranding V1` (wide horizontal lockup 42×16%) → `SiteHeader`/utility-bar site logo (wide, short height).
  - `DM_rebranding V2` (widest lockup 48×18%) → `SiteFooter`, credentials section, large horizontal spaces.
  - `DM_rebranding DP` (large 69×70% emblem, 32% ink — the "DP" display piece) → hero/About/office cards/large display spots and print-style uses.
- All variants are JPEG on white: keep them inside white rounded plaques on dark surfaces (template already uses a logo-plaque pattern), or process white→transparent with `sharp` only where clearly safe. Do not place white-background JPEGs directly on dark backgrounds.
- Derivative assets: copy masters into `public/media/brand/` as WebP (favicon 64/128/180, header 320w, footer 480w, DP display 1024w) via the sharp pipeline; record in `content/image-sources.json`. Keep `.ai`/`.pdf` masters outside `public/` (source control only).

### Environment files
- Exactly one active local env file: root `.env` (gitignored). `.env.example` committed as non-secret documentation only (MASTER §18). `.gitignore` updated with `!.env.example` exception.

### Unresolved / TODO(client) (mirrors PROGRESS.md blockers)
- WhatsApp numbers, lead-recipient emails, Resend API key/domain/sender, CRM endpoint/credentials, analytics IDs, directions URLs, fraud-report email — env placeholders only.
- India office email `info.bglr@dm-consultant.com` vs Hyderabad address — use supplied value, verify.
- Kanika Gaba (RCIC/CICC R534737) and Riccardo James Patrick Ippoliti (MARN 1386990) — verify status in official registers + DMC affiliation + approval before publishing (MASTER §16.3/§17.2).
- IELTS coaching page status pending client verification of in-house coaching.
- Legal pages: old policies reused as client-owned drafts, marked for client/legal review, never claimed legally reviewed.

### Removed/no-longer-current items requiring special review (MASTER §4.2)
- RNIP, SDS, TSS/482 naming, Global Talent 858 naming, ICCRC terminology, fees/quotas/thresholds/processing times — verify against official sources at content time; keep legacy-information routes where a program closed/replaced, labelled with current status.

## 2026-08-02 — Phase 1+2 session (foundation built)

### Env layer architecture
- `src/config/env/schema.ts`: zod v4 schema with typed per-market contact extraction. Boolean toggles are `boolTrue`/`boolFalse` helpers (`z.enum(["true","false"]).default(...).transform(...)` — default must sit on the enum, before the transform).
- `src/config/env/index.ts` parses once; `server.ts` re-exports with `import "server-only"`; `public.ts` derives a secret-free `envPublic` subset (used by server components, safe to serialize into client props); `client.ts` reads ONLY `NEXT_PUBLIC_*` inline (`process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY`) — client bundles must never import the full env module (would crash: `process.env` is not an object in the browser).
- zod v4 TS quirk: spreading computed-key objects into `z.object()` loses key inference unless the helper is generic over the suffix and its return type is a mapped type (`as unknown as { [K in MarketKey<S>]: z.ZodTypeAny }`). `marketContactEnv` reads via a typed `read(field)` helper with explicit casts (schema tests guarantee runtime shape).

### Registries & routing
- `markets.ts` is the single source for `Market` slugs, labels, geo mapping (`x-vercel-ip-country` → AE/QA/KW/IN; `x-vercel-ip-country-region` → DU=dubai, AZ=abu-dhabi, others→dubai), legacy hosts per market (for proxy redirects).
- `navigation.ts` registry drives desktop mega-nav + mobile accordion + footer + legal links + tools; `allNavPaths()` feeds the route-audit test and Phase 13 sitemap. Nav labels mirror template anchors (#countries/#services/#tools/#resources); program names use CURRENT terminology (Global Talent→National Innovation Visa 858; 482/TSS→Employer Sponsored).
- All canonical links are market-prefixed (`/${market}/...`); helpers in `src/lib/routing/routes.ts`; market cookie `dmc_market` httpOnly+Lax+1yr (secure in prod).

### Design tokens (extracted from template CSS)
- Brand scale `brand-50…#f4f9f1 → brand-950…#071d04` (exact template values), leaf greens, botanical + aurora dark palettes, `--header-offset: 118px` (mobile 88px) used for anchor scroll offsets, tracking-mega series (0.12–0.2em), card radius 1.25rem.
- Fonts: Manrope (display) + DM Sans (body) via `next/font/google`, wired through Tailwind 4 `@theme inline`.

### Logo pipeline (temp script, not in repo)
- White→transparent via **border-connected flood fill** (not global threshold): removes only border-connected background whites, preserving interior white text/glyphs; soft alpha ramp 225–255; `trim({threshold:0})`; WebP q90.
- Outputs: `public/media/brand/dmc-logo-{emblem(-1024),horizontal,wide(-640),mark}.webp`, `dmc-logo-mark-200.png`; `src/app/{icon.png 512, apple-icon.png 180, favicon.ico 32}` (favicon.ico contains PNG bytes — modern browsers accept; standard ICO conversion deferred).
- Opaque-after-trim: DP 61%, V1 38%, V3 24% (clean). **V2 "wide" 91% opaque — likely on its own green plaque; keep on white surfaces, treat as non-transparent-capable** (client visual confirmation pending).
- Model cannot view images: all visual judgments (logo glyphs, V2 plaque) remain provisional until client confirms.

### Dependency decisions
- `zod@4`, `lucide-react` added (runtime); `vitest@4`, `@playwright/test` added (dev). `react-hook-form`, `resend`, `react-chatbotify` v2, `vanilla-cookieconsent`, MDX/remark — installed in their phases (isolates version issues).
- `overrides: { "postcss": "8.5.25" }` (flat) — Next 16.2.12 nests postcss 8.4.31 (high-severity advisories GHSA-qx2v-qp2m-jg93, GHSA-6g55-p6wh-862q); flat override verified by successful build. `sharp` 0.34.5 stays (Next optionalDep pin; libvips CVEs GHSA-f88m-g3jw-g9cj fixed only in sharp 0.35) — accepted build-time-only debt; revisit on next Next patch.
- No explicit `sharp` dependency in package.json (Next bundles it); repo scripts never call sharp — image pipeline stays in the temp tooling dir.

### Interim root behavior
- `/` currently redirects (307) to `/${DEFAULT_MARKET}` for dev; replaced by full `proxy.ts` geo+cookie+legacy-host routing in Phase 4. `proxy.ts` must read geo from request headers (`x-vercel-ip-country`, `x-vercel-ip-country-region`) — not present in Next's proxy docs; verified pattern is Vercel platform headers.

## 2026-08-03 — Phase 3 (shared shell + homepage) complete

### Layout & component decisions
- `cn` joins conflicting Tailwind display utilities (e.g. `hidden sm:inline-flex` emits BOTH classes → always hidden). Rule going forward: use exclusive variants (`max-sm:hidden`) when a component's className is composed via `cn`.
- `Button` maps explicit variant/size props to class strings (no cn-conflict); CTA in header uses `max-sm:hidden`.
- `SocialIcon`: hand-drawn SVG paths for Instagram/Facebook/YouTube — lucide-react ships NO brand icons (Instagram/Facebook/YouTube exports were removed); `SocialIcon` renders from a small internal path registry, honoring `aria-hidden` + parent aria-label.
- `AccordionItem` collapses via CSS grid `grid-template-rows: 0fr→1fr` transition (no JS height measurement, RTL-safe, no reflow).
- Drawer/menu panels must not be `fixed` descendants of any element with `backdrop-filter`/`filter`/`transform` — those create a containing block, so `top`/`bottom` resolve against the panel's own height (drawer collapsed to zero height: `top:88px` + `bottom:0` against the 88px header bar). `MobileNavigation` drawer is `createPortal`ed to `document.body`.
- Test pattern: scope queries to the region under test (`mobileNav.getByRole(...)`, `footer.getByText(...)`) — un-scoped queries hit duplicates (utility bar phone vs footer phone; mobile accordion link vs Tools card whose copy mentions the program).

### Homepage content (from template + MASTER constraints)
- Hero: stats chosen conservative + verifiable from Phase 1 crawl (15+ years, 20 countries represented, 50+ pathways, 3 regulated practices) — no fabricated approval/satisfaction percentages; template's "98% client satisfaction" style claims EXCLUDED until client provides evidence.
- Services (6), countries (5 journeys + network card), tools (3 featured), resources (8), FAQ (5) — copy derived from template with facts verified in Phase 1 crawl; nothing fabricated.
- Testimonials: `approvedTestimonials()` renders ONLY `status: "approved"`; all 10 candidates remain unapproved → homepage shows the truthful placeholder ("Client story — being verified with the client before publication") in story/video cards. Same for video stories (3 placeholder tiles).
- Credentials section: dark aurora band with ICORP/ICCRC/MARA/CICC/OPC badges + two consultants shown with `status: "candidate"` and an honest "subject to final client confirmation before launch" caption — satisfies §16.3 without publishing unverified claims.
- Footer: per-market office card labeled `{office.city} Office` (e.g. "Doha, Qatar Office"); phone/email render from env registry with `tel:`/`mailto:`.

## 2026-08-03 — Phase 4 (routing + redirects) complete

### Proxy location and trailing slashes
- With `src/app/`, the Next 16 proxy file MUST live at `src/proxy.ts` (root `proxy.ts` is silently ignored — verified empirically).
- Next's built-in trailing-slash redirect runs BEFORE the proxy function body, so legacy-host paths with trailing slashes (WordPress URLs) were redirected by Next instead of mapped. Fix: `skipTrailingSlashRedirect: true` in `next.config.ts` + explicit trailing-slash 308 in the proxy (new-site behavior unchanged).
- Proxy reads the request `Host` header (with `nextUrl.hostname` fallback) for host-based decisions — `nextUrl.hostname` reflects the URL, not the Host header.
- Root redirects (307, geo/cookie/default) preserve `request.nextUrl.origin` so local dev and Vercel previews stay same-origin; legacy/apex redirects (308) target `https://www.dmcimmigrationgroup.com`.

### Legacy redirect registry
- `src/config/legacy-redirects.ts` built from the Phase 1 crawl inventory: one shared path map across the five clone domains (host selects market), exact-match then prefix rules (`/new-zealand-partner*`, `/work-permit*`, `/blog/*` slug preservation), unknown → market homepage. Blog 1:1 redirects come later from MDX `legacyUrls` via `next.config.ts` redirects (which run before proxy).
- Apex `dmcimmigrationgroup.com` → `www` (308) handled in proxy.

### Verified behavior (e2e `tests/e2e/routing.spec.ts`, 22 assertions)
- 307 default/cookie/geo/query-preservation precedence; UAE region split DU/AZ/unknown; explicit markets never redirected; invalid market 404; five legacy homepages; www variants; known path 1:1; blog slug preservation; alias normalization; unknown → market home; query preservation; apex→www; new-site trailing slash 308; assets bypass proxy.

## 2026-08-03 — Phase 5 (content pages) complete

### Content architecture
- 60 `PageContent` objects across 8 group files under `src/content/pages/`; `index.ts` is the single registry (`PAGE_REGISTRY`/`PAGE_IDS`/`getPageContent`/`breadcrumbsFor`). Section kinds extended with `programs` (code/label cards) and `links` (cross-link cards); every section accepts optional `anchor` (used by `/why-dmc#process`).
- Catch-all `src/app/[market]/[...segments]/page.tsx` renders any registered id under all 5 markets (`generateStaticParams` = 300 pages + infra = 311 routes). Unknown ids → `notFound()`. Metadata: seoTitle/seoDescription, canonical via `canonicalUrl(market, id, env.SITE_URL)`, `robots.noindex` when `page.noindex`.
- Content invariants enforced by `src/content/pages/content-registry.test.ts`: unique ids, full metadata, every `relatedPages`/`links`-path target must be a registered page, `relatedTools` must be `tools/*`, `lastVerified` ISO date. **Rule: cross-page links in content must only point at registered pages** (this caught a `/contact` link in `faqs` — replaced with `/visit-visas`).

### Renderer decisions (ProgramPage, mapped from EE template)
- Hero = light botanical gradient (not aurora dark); title's last word rendered as brand-tinted span (template style) — note this makes heading text nodes concatenate without a space (e2e uses `/regex\s*/`).
- Breadcrumb prefixes that are not registered pages (e.g. `/visas`, `/visas/canada`) render as plain text, never links — avoids 404 crumbs.
- Section tone map: alternate white/slate; `process` sections always dark aurora (template's dark process band); `faq` sections render accordions without a SectionHeading header; `status` sections render as full-width banners above the breadcrumb bar; sources + `lastVerified` in a dark aurora band; hero/CTA link to `/#contact` (homepage ContactCta anchor — `/contact` route is Phase 11).
- `officialSources` may be empty (service/resource pages) — renderer hides the band. No fabricated sources ever.

### Content decisions (verified web facts)
- Approximate-threshold wording is deliberate: Australia CSIT "~AUD 79,400" (2026-07 indexation; sources split 79,499 vs 79,400) and SSIT "~AUD 146,600" — keep hedged "approximately" until official gazette figures; 191 has NO income requirement (removed Jun 2023; ATO NOAs 3 of 5 years).
- UK Student maintenance: current published rates are **£1,529/month London, £1,171/month outside** (effective 11 Nov 2025) — many 2026 guides still cite the stale £1,334/£1,023; content uses the new rates with "revised periodically" note. Student visa fee £558 (Apr 2026), student IHS £776/yr.
- Australia 500: GS requirement (replaced GTE Mar 2024), 48h/fortnight term-time work, unlimited scheduled breaks, research uncapped, ~AUD 29,710 living-cost benchmark — all hedged "current published".
- Closed/renamed programs recorded as status banners: RNIP closed 31 Aug 2024 (RCIP is its replacement), SDS terminated 8 Nov 2024, TSS→SID 482 (7 Dec 2024), Global Talent→NIV 858.
- `study-abroad/ielts-coaching` is **noindex** with an honest status banner until client confirms in-house coaching (existing blocker). Remove noindex + banner after confirmation.
- Homepage stats reused honestly in `why-dmc` (15+ years, 20 countries, 50+ pathways); credentials claim limited to "RCIC and MARA registered practitioners where those credentials apply" — regulators still being verified (existing blocker).

### Nav fix
- Primary nav "Express Entry" href was `/express-entry` (dead route) → `/visas/canada/express-entry`. The old e2e assertion `/dubai/express-entry` encoded the bug; updated to the canonical path. Remaining nav paths (`/tools/*`, `/blog`, `/credentials`, `/contact`, `/legal/*`, `/about`, stories/gallery/press) are intentionally later-phase routes and will 404 until built.

## 2026-08-03 — post-Phase-5 hydration bugfix

- **Hydration bug (Phase 3 latent)**: `MobileNavigation` rendered its portal as `typeof document !== "undefined" && createPortal(..., document.body)` — server rendered nothing, client rendered the panel → hydration mismatch on every page (React regenerated the tree; surfaced as a browser console error in dev; invisible to e2e since Playwright ignores console noise).
- **Fix pattern (rule going forward)**: SSR portals must be mount-gated with `useSyncExternalStore(() => () => {}, () => true, () => false)` — the server snapshot returns `false` so hydration matches, and the client flips to `true` post-hydration. Do NOT use `useEffect(() => setMounted(true))` — ESLint react-hooks v6 errors on setState-in-effect. Do NOT use `typeof document` conditionals in render.
- **Guard added**: `tests/e2e/console-errors.spec.ts` asserts zero console/page errors (filtered for hydration messages) on `/dubai`, an Express Entry content page, a noindex page, and a second-market page — runs against the production build in both projects. This catches the whole class of "works but React is angry" regressions.

## 2026-08-04 — Global stylesheet recovery

- The supplied homepage HTML remains the visual source of truth. `src/app/globals.css` now recovers all 14 of its style blocks verbatim (including `dmc-static-utilities` and `dmc-imported-utility-fallbacks`, as well as the named DMC theme, polish, layout, aurora, botanical, editorial, contrast, and responsive layers).
- The app-specific Tailwind theme bridge remains at the top of `globals.css` so the existing React classes continue to compile. The user-provided damaged source remains untouched in `src/app/globals.css.broken-backup-20260804.txt`.
- CSS recovery alone cannot create template-identical output while the React components have a different DOM/class structure. Port the template structure into the homepage components as a separate, intentional implementation task.

## 2026-08-04 — Browser-extension hydration noise

- `suppressHydrationWarning` is applied solely to the root `<html>` and `<body>` in `src/app/layout.tsx`. This addresses third-party extension attributes injected before hydration (`webcrx`, `__processed_*`, `bis_register`) without concealing application-level component hydration defects.

## 2026-08-04 — Shared hero shell

- `src/components/home/Hero.tsx` is the canonical botanical hero shell for both the homepage and the content pages. The homepage keeps its default brand copy and stat row, while `ProgramPage` passes page-specific eyebrow/title/lede/CTA props and points the scroll cue at the first content section.
- Content pages should continue using that shared hero shell instead of the older plain content-page header so the site reads as one component family across the built routes.

## 2026-08-04 — Internal page expansion

- Internal pages added through the shared registry should prefer Tailwind-first card and grid layouts where practical, but must not strip or rewrite the recovered CSS layers that already power the homepage and shell components.
- `src/content/pages/site.ts` is the registry entry point for the new menu-driven internal pages, and the hero copy on every market page should explicitly state the market context so users never land on an ambiguous page.
- Vitest needs a small local env bootstrap for this repo because the server-only office config parses placeholder environment values at import time; loading `.env.example` inside the test harness keeps that behavior deterministic without creating a second active env file.

## 2026-08-04 — Navbar/header parity batch

- `src/config/navigation.ts` was aligned more closely with the homepage template's dropdown structure and menu labels so the visible navbar reads like the source HTML while still resolving to real app routes where the production site already has them.
- `src/components/layout/SiteHeader.tsx` now contains the template-derived header CSS in-component via `style jsx global`, keeping the floating plaque/deck/action shell and desktop/mobile menu chrome self-contained.
- `MegaNavigation` and `MobileNavigation` remain the interaction layer for that header and continue to use the shared nav registry as the single source of truth.

## 2026-08-04 — Header breakpoint correction

- The template-aligned header must remain a single desktop shell plus a single mobile shell. A nested `mobile-header` class inside `MobileNavigation` caused the shell styles to apply twice, so the mobile shell now lives only in `SiteHeader`.
- Desktop nav visibility now begins at `lg` rather than `xl`, matching the template breakpoint and preventing a blank middle state on tablet widths.
- The final header CSS override in `globals.css` is now breakpoint-gated instead of unconditional, so later theme layers cannot force the desktop assembly visible on mobile widths.

## 2026-08-04 — Navbar follow-up stabilization

- The desktop header shell already owns responsive visibility, so `MegaNavigation` should render as `block`; keeping `hidden lg:block` at the nav level allowed the recovered stylesheet stack to collapse the desktop menu deck.
- The mobile dropdown must anchor to the single `SiteHeader` mobile shell, not to the narrow hamburger wrapper. `SiteHeader` owns the relative positioning context and `MobileNavigation` stretches `#mobileMenu` from `left: 0` to `right: 0` so the open panel matches the template's full-width mobile sheet.
- Shared-layout React keys should not rely on `href` alone when two legal items intentionally resolve to the same route. `SiteFooter` now keys legal links by `label + href`, removing the duplicate-key console warning without changing URLs.
- Desktop mega-menu alignment must use one transform source. The recovered template CSS already positions `.nav-dropdown` with `left: 50%` and `translate(-50%, ...)`; adding Tailwind `-translate-x-1/2` on top of that double-shifted the panel left. `MegaNavigation` now sets width and translate state directly, keeping each dropdown centered under its own trigger.

## 2026-08-04 — Workspace warning cleanup

- The built-in CSS language service does not understand Tailwind v4's `@theme` directive, so workspace-level CSS `unknownAtRules` linting is disabled via `.vscode/settings.json` rather than rewriting valid Tailwind syntax.
- Header and mobile-nav class strings now prefer canonical Tailwind utilities where they exist (`rounded-card`, `rounded-xl`, `rounded-pill`, spacing/z-index aliases, and brand color tokens) to keep Tailwind IntelliSense warnings out of the navbar implementation.
- The shared media reset no longer sets `vertical-align` on elements forced to `display: block`, removing the editor's ignored-property warning without affecting layout.

## 2026-08-04 — Hero orbit flag border source

- The dark square around the hero orbit flags was not coming from `.country-orbit-flag`; it came from the parent `.country-orbit-node` being rendered as a native `<button>` and picking up a default button appearance/box-shadow from the browser.
- The fix is scoped to `.botanical-network-stage .country-orbit-node` in `src/app/globals.css`: reset `appearance`, `-webkit-appearance`, `box-shadow`, and `outline` there so the intended light flag card styling remains visible without the browser-drawn square.

## 2026-08-04 — Mobile menu icon alignment

- The tablet/mobile accordion rows should use a single disclosure icon source. `MobileNavigation` had both a rendered `+` span and the existing CSS `summary::after` marker, which created two plus symbols per row and pushed one toward the center.
- The JSX-owned plus span was removed so the mobile menu now relies only on the right-aligned CSS marker already defined for `.mobile-group summary::after`.

## 2026-08-04 — Homepage template port

- The approved homepage HTML remains the visual source of truth, but the React port must still honor project safety rules. Where the template used unverified testimonials, success percentages or approval-style claims, the homepage keeps the existing truthful placeholders and cautious wording instead of inventing support for those claims.
- The remaining homepage was ported as template-like sections rather than a single monolith: recognition band, services, destinations, why DMC, credentials, visit visas, tools, process, stats band, stories, video stories, resources, FAQ, final CTA, and a footer refresh.
- The homepage buttons now link into existing routes or anchors instead of introducing new modal/form infrastructure in this batch. That keeps the page visually aligned with the template while avoiding premature lead-form behavior before the later forms phase.

## 2026-08-04 — Homepage contrast/logo correction

- The credentials band must use the recovered template hooks verbatim (`credential-proof-stack`, `credential-proof-card`, `credential-proof-icon`, `credential-assurance`, `credential-assurance-mark`) so the existing CSS can provide the intended readability on the dark green panel without inventing a second styling system.
- The resources grid should render the logo as a bare `brand-logo resource-brand-mark` span, not an image component, because the template CSS applies the plaque treatment and hover motion directly to that class name.
- The hero core plaque should contain only one brand mark element. The previous image-plus-span combination stacked two logos visually; the approved template only uses the span inside the logo plaque.

## 2026-08-04 — Countries grid completion

- The countries section must include the Germany pathway card so the homepage matches the approved six-card template grid instead of rendering the abbreviated five-card version.
- The Germany badge should read `EU Blue Card`, not a generic category label, because the template distinguishes that tile explicitly from the other destination cards.

## 2026-08-04 — Credentials density pass

- The dark credentials band should feel complete on its own, not like a sparse sidebar. The left panel now carries an additional proof card, a verification-trail callout, and a short trust-chip row so the section reads as a finished trust block instead of a single stacked list.
- The proof stack and assurance copy are widened in CSS and the proof cards become a two-column desktop grid so the dark panel holds visual weight without changing the site’s green theme language.

## 2026-08-04 — Express Entry template pass

- `src/components/pages/ProgramPage.tsx` now treats the Express Entry internal page as the reference structure for the remaining dropdown pages, with reusable support for `facts`, `split`, `lead`, `cards`, and `disclaimer` sections layered onto the shared hero/breadcrumb/CTA shell.
- The lead-band form shell is intentionally static server-rendered markup without React submit handlers so it can be reused on all content pages without introducing client-side interaction before the forms phase.
- Anchor navigation only includes real content sections; facts, lead, and disclaimer bands stay in the flow but do not get fragment anchors, which keeps the page outline consistent with the source template.

## 2026-08-04 — Express Entry template alignment

- The Express Entry page now follows the template cadence more closely: benefits, lead capture, programs, overview, eligibility, FSW grid, CRS grid, roadmap, guidance, documents, document evidence, FAQ, news, success stories, disclaimer, and a stronger closing CTA.
- Section kickers are now explicit on the major content bands so the page reads like a serious service landing page instead of a generic long-form article.
- The closing CTA now mirrors the source template more closely by pairing a consultation button with a direct call action, while keeping the rest of the page server-rendered and reusable.

## 2026-08-04 — Express Entry parity follow-up

- `SectionNav` is now a reusable sticky scrollspy pill bar for internal pages, and the Express Entry page uses explicit anchors to keep the active tab state aligned with the source template.
- The template-style program, CRS and roadmap sections now use stronger visual hierarchy: numbered program cards, a dark score panel, and a grid-based roadmap layout that can be reused for other content pages with different copy.
- `MegaNavigation` highlights the `Visas` top-level item on the Express Entry route so the desktop header state matches the approved sample instead of defaulting to `Home`.

## 2026-08-04 — Internal hero offset

- The shared hero shell should add extra top padding only on non-home pages so internal landing pages clear the fixed header/utility stack before the copy and image block begin.
- The homepage hero keeps its existing spacing, but market content pages now get the offset through the shared hero component rather than ad hoc page-specific wrappers.

## 2026-08-04 — Homepage resources parity

- The homepage resources block should follow the approved template's lighter 8-card grid rather than the older editorial card treatment.
- `ResourcesSection` now renders a template-style heading block plus per-card CTAs, and `#resources.template-resources` in `globals.css` scopes the background/radius/card overrides so this section keeps the site's soft green gradient language and hover feel without changing the rest of the site.

## 2026-08-05 — Local destination images for all internal pages

- All internal pages now use locally-hosted, licensed stock imagery (`public/media/pages/...`) instead of remote `dm-consultant.ae` photos that were reused across unrelated destinations.
- `src/config/page-media.ts` is the single registry for page imagery (split/process/media/extra); bespoke template pages and `ProgramPage` both resolve through it.
- No fake/copied imagery: every image is a free-to-use stock photo from Unsplash, and legacy client media (success stories, partner logos) stays untouched pending the authentic-asset approval pass.

## 2026-08-04 — Internal page top spacing

- The internal market content pages should start below the fixed header as a whole, not only offset the hero copy. `ProgramPage` now wraps the full content stack in a top-padded container so the page begins in the correct vertical position.

## 2026-08-04 — Reusable internal-page system after Express Entry

- The approved Canada Express Entry internal page is now the reference implementation for the remaining serious immigration content pages. Instead of cloning one giant page file per route, the shared structure now lives in `src/components/pages/internal/InternalPageTemplate.tsx`.
- That internal template layer owns the repeated content-page building blocks: breadcrumbs, facts bar, anchor nav, split media/content band, lead-form section, program/criteria/process/FAQ/source sections, and the closing CTA.
- Canada follow-up pages should be assembled from those extracted components first, then customized with route-specific content. This keeps the approved template rhythm consistent while avoiding drift between internal pages.
- `src/components/pages/CanadaInternalProgramPages.tsx` is the first route-family wrapper built on top of that template layer and now powers:
  - `/{market}/visas/canada/provincial-nominee-programs`
  - `/{market}/visas/canada/atlantic-immigration-program`
- Market context remains mandatory even on reused template pages. Phone labels, consultation copy, breadcrumbs, and route-level metadata should continue to resolve through the market/office registries rather than hardcoded Dubai-only copy.
- The internal-page stack under the shared fixed header now follows this sequence intentionally: breadcrumb bar, facts bar, anchor nav, then the first content section. Spacing tweaks should preserve that order rather than pushing the whole page downward with arbitrary top margin.
- The extracted template layer still uses centralized remote `<img>` tags for parity speed. This is accepted temporary debt while the reusable system is stabilizing; a later image pass should migrate them to `next/image` or approved optimized local assets once the required CSS selectors and sizing behavior are preserved.

## 2026-08-05 — Resend enabled + UTM/gclid campaign tracking

- Client asked to configure Resend with the lead form using a dummy email for now. `RESEND_ENABLED=true` and all five `DMC_*_LEAD_TO_EMAIL` recipients set to `leads@example.com` (RFC 2606 reserved, guaranteed dummy) in the active `.env`. Accepted temporary state: with the placeholder API key and `example.invalid` sending domain, live sends fail and the form surfaces the error rather than pretending success — the intended behaviour until the client supplies real values. Values still needed from client: `RESEND_API_KEY`, verified `RESEND_SENDING_DOMAIN`, and the real per-market recipient inboxes.
- Campaign attribution: `submitLead` now carries `utm_source`/`utm_medium`/`utm_campaign`/`gclid` (added `gclid` to the schema + email + CRM). The forms read them from the URL query string at submit time (`src/lib/utils/url-tracking.ts`), preferring any pre-filled form values over the URL. Hash-anchor CTAs on the landing page never change `location.search`, so the params survive scrolling between the hero, mid-page CTAs and the form.

## 2026-08-05 — Campaign landing pages (Dubai + Abu Dhabi PR)

- Landing pages live under their market and process (`/[market]/visas/<destination>/pr-services`) so campaign URLs stay in harmony with the canonical route inventory; only `dubai` and `abu-dhabi` get them (`dynamicParams = false`, other markets 404). The `thank-you` route nests under the landing (`.../pr-services/thank-you`), mirroring the reference `cwmigrationgroup.ae/australia-pr-services/thank-you`.
- Landing chrome is a separate no-link header/footer (`LandingHeader`/`LandingFooter`) with legal labels as plain text — the reference campaign page renders them as non-links too. The standard site chrome stays on the thank-you route. Implementation: `ChromeSwitcher` (client `usePathname`) in the market layout receives both pre-rendered chrome trees as props — the server layout keeps `generateStaticParams`, no page files were moved.
- Landing content is client copy from the four docx briefs (kept verbatim, including the client's "2,000+ reviews / 10+ years / MARA & RCIC" claims), but review/testimonial cards remain the site's truthful "being verified with the client" placeholder rather than invented quotes; facts (65 points, CRS +600 PNP, Express Entry programs) reuse values already verified in the content registry.
- The shared `Hero` gained an optional `titleSuffix` prop (default `" begins here."`) so the landing headline ends on the city name instead of the editorial suffix.
- react-hook-form 7.84 checkbox behavior: registered checkboxes without a `value` attribute store a **boolean**, so `consent` (schema expects string `"on"`) failed validation on every site form. Fix applied to both `LeadForm` and `LandingLeadForm`: `value="on"` on the input plus a normalization guard in `onSubmit`. Do not revert `value="on"` when restyling the consent checkbox.

## 2026-08-05 — Tailwind v4 responsive-variant ordering landmine

- The compiled CSS (Turbopack dev) can place base utility rules (`w-full`, `.hidden`) AFTER responsive variant rules (`sm\:w-auto`, `lg\:flex`) inside the utilities layer. Equal specificity then resolves to the LATER rule, so `w-full sm:w-auto` renders full-width at every size (measured: button 1176px at 1440px; `.w-full` emitted after `.sm\:w-auto` in the chunk). `hidden lg:flex` still works because the app's header uses site CSS layers that outrank the ordering issue — but do not rely on base-then-variant width toggles in Tailwind utilities for new components. Fix pattern: drive such widths from an unlayered `!important` rule in `globals.css` (e.g. `.landing-header-cta`), which beats layered utilities regardless of generation order.

## 2026-08-05 — Custom form dropdowns

- Form selects are custom listboxes (`src/components/ui/FormSelect.tsx`) rather than native `<select>` elements because native pickers are OS-controlled on mobile/tablet and never open under the field. The dropdown is absolutely positioned under the trigger on every viewport, closes on outside tap/Escape, and supports arrow-key navigation. This applies to both the landing lead form and the shared site-wide `LeadForm`.

## 2026-08-05 — WebP + gallery system + country-representative imagery

- All page media converted to WebP via `scripts/convert-images.mjs` (sharp, q80, max 1600px, alpha preserved; `npm run images:convert`; originals removed). No raster `.jpg`/`.png` remains under `public/media/pages`; `next/image` migration of the shared template `<img>` tags is now straightforward since every source is local WebP.
- `MediaCard` / `MediaCardGrid` (`src/components/ui/MediaCard.tsx`) are the reusable image-card components: template-matching rounded 26px cards with an overlaid uppercase label pill, brand-tinted title/body copy, and hover lift/zoom interactions.
- `src/config/page-gallery.ts` is the single gallery registry (`galleryFor(pageId)`): family sets + travel galleries + exact overrides; every card carries page- and brand-justifying copy.
- `MediaGallerySection` (internal template layer) renders the gallery on every internal page — Express Entry, Canada/Australia/UK route families, and all content-driven pages via `ProgramPage`.
- Imagery rule going forward: destination-representative only — flags, passports, globes/world maps, and famous landmarks; generic scenery is banned because it does not communicate the destination. Fixed this batch: AIP (Atlantic lighthouse/maple leaf), RNIP (Canadian small town), Cyprus (Larnaca seafront, was Greece), Vanuatu (South Pacific island, was New Zealand), St Kitts & Nevis (Caribbean beach).
- `MediaCard` and the shared template `<img>` tags still emit `@next/next/no-img-element` lint warnings — accepted debt (0 errors); all sources are now local WebP so the cleanup is mechanical.

## 2026-08-05 — Guided chat lead delivery + `DMC_CHATBOT_LEAD_TO_EMAIL`

- Completing the guided chat now emails the lead via the existing Resend pipeline (`submitChatLead` in `src/features/leads/actions.ts`). Recipient resolution order: `DMC_CHATBOT_LEAD_TO_EMAIL` → `DMC_<MARKET>_LEAD_TO_EMAIL` → `RESEND_REPLY_TO_EMAIL`. The dedicated chat var (documented in `.env` with a comment that this Resend email ID is for the chatbot lead) is the single editable knob for redirecting chat leads; no code change needed to repoint them.
- Chat leads are Resend-only (no CRM push) — the collected answers don't map to `LeadFormData`, and the CRM path was intentionally left out of scope for the chat. Revisit if the client wants chat leads in the CRM.
- `buildFlow(market)` is now parameterized (market threaded from `MarketFloatingWidgets` → `DmcGuidedChat` → flow closure), records every answer via a `record()` helper, and fires `submitChatLead` in the `ask_phone` block — fire-and-forget with try/catch so the thank-you always renders even if the send fails. When `RESEND_ENABLED=false` the action is a silent no-op, matching the form behaviour.

## 2026-08-05 — Market name woven through all page content (picked up from the URL)

- The market name now resolves dynamically from the URL route and appears throughout every page's content, per client request: homepage hero "Your journey towards a better future from Dubai begins here.", every homepage section, content-page heroes/breadcrumbs/overview/lead/FAQ/gallery/form/CTA, bespoke Canada/Australia/UK internal pages, tool pages, and the footer.
- Implementation is one shared mechanism: `src/lib/i18n/market-copy.ts` (`interpolateMarket` tokens `{market}`/`{marketIn}`/`{marketFrom}`/`{marketFor}`/`{marketAudience}`/`{marketOffice}` + `marketContextSentence`/`paragraphsForMarket`). `ProgramPage` deep-interpolates every content string; bespoke internal-page renderers pass market to `FaqSection`, `MediaGallerySection`, `LeadFormSection`, `FinalCta`, and `ConsultationBand`; registries hold natural `{market…}` tokens in flagship copy.
- Deliberate restraint (avoids doorway-page duplication): destination facts stay shared; the market is woven in via context sentences, tokens, and local office/FAQ references rather than naive find-and-replace of whole pages. Landing pages were already market-personalised (Dubai/Abu Dhabi) and are unchanged.

## 2026-08-05 — Market WhatsApp numbers in `.env` + widget placement split

- Per-market WhatsApp numbers live in `.env` as `DMC_<MARKET>_WHATSAPP_E164` (all five markets; the schema already defined these as `phoneE164OrEmpty`). Client confirmed Dubai `+971543219003`, Abu Dhabi `+971544410905`, Qatar `+97431113692`, India `+919036554740`; Kuwait empty until provided — updating any number is purely a `.env` edit.
- The WhatsApp bubble opens the market's number DIRECTLY on click (`wa.me/<market number>?text=<prefilled>`), resolved from the `[market]` URL segment — there is deliberately no office picker, so a lead always lands on the WhatsApp of the office they are visiting. Markets with no configured number do not render the bubble at all (currently Kuwait).
- The WhatsApp bubble and the guided-chat bubble are separately toggled: `MarketFloatingWidgets` takes `showChat` (default `true`). Landing pages show the guided chat alongside the WhatsApp bubble (both bubbles, matching the thank-you routes) — client decision 2026-08-09; `showChat={false}` remains available in `MarketFloatingWidgets` should chat ever need to be suppressed on a given chrome again.
- Footer/wide logo: the baked-in white box in `dmc-logo-wide.webp`/`-640.webp` was removed via flood-fill from the transparent gutter (background white → alpha 0, stopping at the coloured art) rather than a global white-key so the logo's white wordmark is preserved.
