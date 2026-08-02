# QA Checklist — DMC Immigration Group

Acceptance checks mapped to MASTER §23/§26/§27. Status key: `todo` | `wip` | `pass` | `fail` (with evidence + date). Do not delete completed history.

## Baseline scripts (MASTER §26)
- [ ] `lint` (eslint 9) — todo
- [ ] `typecheck` (tsc --noEmit) — todo
- [ ] `test` (vitest: unit/integration) — todo
- [ ] `test:e2e` (playwright) — todo
- [ ] `build` (next build production) — todo

## Routes and routing
- [ ] All five valid markets render; invalid markets → 404 — todo
- [ ] Route-audit test: every navigation-registry item resolves for all 5 markets — todo
- [ ] Equivalent-path market switching preserves route — todo
- [ ] Root precedence: legacy host > explicit market > cookie > geo > dubai fallback; no redirect loops — todo
- [ ] 307 for geo/cookie; 308 for canonical/legacy hosts; query/UTM preserved — todo
- [ ] Legacy domains incl. `www` variants; known + unknown legacy paths; `dmcimmigrationgroup.com` apex → `www` — todo

## Visual / responsive (Playwright screenshots 1440/1024/768/390/320)
- [ ] Homepage fidelity vs template (desktop + mobile) — todo
- [ ] Internal page fidelity (Express Entry reference) — todo
- [ ] Mega menu desktop + mobile accordion/drawer — todo
- [ ] No horizontal overflow ≥320px — todo
- [ ] `prefers-reduced-motion` respected — todo
- [ ] Floating controls outside mobile safe areas, no overlap (chat/WhatsApp/consent) — todo

## Accessibility (WCAG 2.2 AA target)
- [ ] Keyboard-only critical journeys — todo
- [ ] Focus visibility + dialog trap/Escape/return — todo
- [ ] Landmarks, semantic headings, one H1 per page — todo
- [ ] Icon controls have accessible names; accordion/menu ARIA — todo
- [ ] Form labels/errors/live regions — todo
- [ ] Guided chat: option groups, announcements, focus, error recovery — todo
- [ ] Consent dialog: equal accept/reject access, revocable — todo
- [ ] Color contrast; no info by color only — todo
- [ ] Automated accessibility scan on representative page types — todo

## Links and content integrity
- [ ] No broken internal links (crawler) — todo
- [ ] No dead buttons/links; real links as links, actions as buttons — todo
- [ ] Footer disclaimer present and client-approved wording — todo
- [ ] Every immigration fact has official source + `lastVerified` — todo
- [ ] No guarantees/percentages/rankings/ratings without client proof — todo

## Forms / lead pipeline (mocked providers)
- [ ] Client + server validation; normalized phone/email/market — todo
- [ ] Origin/content-type checks; honeypot; disabled rate-limit/Turnstile adapters — todo
- [ ] Idempotency key prevents duplicate sends — todo
- [ ] Resend: recipient from `DMC_<MARKET>_LEAD_TO_EMAIL` only; sender identity from env; escaping; error handling — todo
- [ ] CRM adapter disabled default; dummy env config; `Promise.allSettled` delivery policy — todo
- [ ] Secrets never in client bundle or logs; no PII in logs — todo
- [ ] Generic accessible success/error with `aria-live` — todo

## Guided conversion
- [ ] Every guided-chat branch, back/restart/close, 5-office selection, validation, payload, submission states — todo
- [ ] No PII in analytics payloads/URLs/logs; no browser persistence of answers — todo
- [ ] Lazy-load failure keeps consultation form + WhatsApp usable — todo
- [ ] Eligibility checker opens only via explicit CTA; careful wording — todo
- [ ] WhatsApp: 5 markets, env-backed, no dummy `wa.me` links, safe when value missing — todo

## Offices / credentials / trust
- [ ] Current-market office first on contact; all five office cards with call/email/WhatsApp/directions; safe when optional value missing — todo
- [ ] Phone links E.164, readable display — todo
- [ ] Credential registry: unapproved/unverified records cannot render or index — todo
- [ ] Office structured data from one registry — todo
- [ ] Legal hub + anti-fraud contact + effective dates + review markers — todo

## Calculators (16)
- [ ] 4 Australia: points, fee estimator, processing times, occupation/eligibility (ANZSCO-aware) — todo
- [ ] 12 Canada: CRS, CLB, FSW 67-pt, OINP, AAIP, SINP, BC, Manitoba, Nova Scotia, New Brunswick, NL, RCIP — todo
- [ ] Pure typed modules; versioned rule data; rule/version dates + official sources shown — todo
- [ ] Unit tests: boundaries, spouse/non-spouse, invalid input, official examples — todo
- [ ] Interaction tests: validation, reset, result display, keyboard — todo
- [ ] No guarantee language; informational-estimate disclaimers — todo

## Consent / analytics
- [ ] Accept All / Reject Optional / Save Preferences / revoke — todo
- [ ] No optional scripts/cookies/events before matching opt-in — todo
- [ ] GTM+GA4 dedup; Meta only on marketing consent; no dummy trackers when disabled — todo
- [ ] Consent cookie is the only state store; policy revision support; documented in privacy — todo
- [ ] Non-PII event allowlist enforced — todo

## SEO
- [ ] generateMetadata per route/market; unique truthful titles/descriptions — todo
- [ ] Self-referencing canonicals; sitemap all indexable routes; robots.txt — todo
- [ ] BreadcrumbList, Organization, LocalBusiness, Article, FAQPage (only when visible) — todo
- [ ] OG/social local media — todo
- [ ] Hreflang strategy per MASTER §22 (en-IN, en-QA, en-KW, UAE strategy; no invented city codes) — todo

## Security / performance
- [ ] CSP + security headers matching enabled integrations only — todo
- [ ] No unsafe raw HTML/MDX; sanitized input — todo
- [ ] 404 behavior; error states — todo
- [ ] Static generation; lazy media; reserved dimensions; no autoplay; CWV/Lighthouse targets — todo

## Environment / production config
- [ ] Root `.env` only active file; gitignored; no `.env.local`/env-specific/test/per-market files exist or load — todo
- [ ] `.env.example` complete, non-secret, inactive, never loaded — todo
- [ ] Conditional env validation: Resend complete when enabled; CRM complete when enabled; build fails on placeholder-enabling — todo
- [ ] No dummy production links/credentials — todo
- [ ] README covers root-.env setup, Vercel mirroring, content authoring, image pipeline, tests, deploy, DNS, CRM enablement — todo
