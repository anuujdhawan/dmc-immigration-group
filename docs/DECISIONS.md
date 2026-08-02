# Decisions — DMC Immigration Group

Record architectural and content decisions, deviations from templates, renamed/closed programs, canonical URL choices, dependency choices, and unresolved client verification items. Append, never rewrite history.

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
