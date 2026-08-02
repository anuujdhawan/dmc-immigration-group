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
