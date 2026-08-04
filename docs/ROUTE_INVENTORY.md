# Route Inventory — DMC Immigration Group

All routes are under `/[market]/` for the five markets: `dubai`, `abu-dhabi`, `qatar`, `kuwait`, `india` (typed `Market` in code, never `Country`). Status key: `pending` | `draft` | `done`. Legacy aliases fill from the crawl of the five legacy domains.

## Root / infrastructure

| Route | Label | Source | 5-market | Meta | Test | Legacy aliases |
|---|---|---|---|---|---|---|
| `/` | Geolocation root | `proxy.ts` + registry | n/a | n/a | pending | apex `dmcimmigrationgroup.com` → `www` (308); all 5 legacy hosts → market home |
| `/[market]` | Market homepage | homepage template sections | pending | pending | pending | each legacy host homepage |
| `not-found` | 404 | shared | n/a | n/a | pending | unknown legacy paths → market home (308) |
| `robots.ts` / `sitemap.ts` | — | SEO phase | n/a | n/a | pending | — |

## Canada visas

| Route ID | Label | Component/content | 5-market | Meta | Test | Legacy aliases |
|---|---|---|---|---|---|---|
| `visas/canada/express-entry` | Express Entry | ProgramPage (reference impl, EE template) | done | done | done | pending |
| `visas/canada/provincial-nominee-programs` | PNP hub | InternalPageTemplate via `CanadaInternalProgramPages` | done | done | done | pending |
| `visas/canada/atlantic-immigration-program` | Atlantic Immigration | InternalPageTemplate via `CanadaInternalProgramPages` | done | done | done | pending |
| `visas/canada/rural-and-northern-immigration-pilot` | RNIP (legacy status) | ProgramPage w/ status banner (closed 31 Aug 2024 → RCIP) | done | done | done | pending |
| `visas/canada/study-permits` | Study permits | ProgramPage (SDS history + NCLEX context) | done | done | done | pending |
| `visas/canada/family-sponsorship-parent-grandparent-program` | Parent/Grandparent | ProgramPage | done | done | done | pending |
| `visit-visas/canada` | Canada visit visa | ProgramPage (Super Visa section canonical; no separate page — see decision) | done | done | done | pending |
| `visas/canada/super-visa` | Super Visa | conditional — DECISION: content lives as a panel/section on `visit-visas/canada`; no separate page in v1 | — | — | — | pending |
| `tools/canada/crs-calculator` | CRS calculator | ToolShell + pure CRS module (Phase 10) | pending | pending | pending | pending |

## Australia visas

| Route ID | Label | Component/content | 5-market | Meta | Test | Legacy aliases |
|---|---|---|---|---|---|---|
| `visas/australia/skilled-independent-189` | Skilled Independent 189 | ProgramPage | done | done | done | pending |
| `visas/australia/skilled-nominated-190` | Skilled Nominated 190 | ProgramPage | done | done | done | pending |
| `visas/australia/skilled-work-regional-491` | Skilled Work Regional 491 | ProgramPage | done | done | done | pending |
| `visas/australia/permanent-residence-skilled-regional-191` | PR Skilled Regional 191 | ProgramPage (no income requirement since Jun 2023) | done | done | done | pending |
| `visas/australia/employer-sponsored-482` | Employer Sponsored 482 (SID; former TSS) | ProgramPage | done | done | done | pending |
| `visas/australia/employer-nomination-scheme-186` | ENS 186 | ProgramPage | done | done | done | pending |
| `visas/australia/national-innovation-visa-858` | National Innovation Visa 858 (former Global Talent) | ProgramPage | done | done | done | pending |
| `visas/australia/state-territory-nominations` | State/Territory nominations | ProgramPage hub | done | done | done | pending |
| `tools/australia/occupation-eligibility-checker` | Occupation/eligibility checker | ToolShell (ANZSCO-oriented, Phase 10) | pending | pending | pending | pending |
| `tools/australia/points-calculator` | Points calculator | ToolShell (Phase 10) | pending | pending | pending | pending |

## UK visas

| Route ID | Label | 5-market | Meta | Test |
|---|---|---|---|---|
| `visas/uk/skilled-worker` | Skilled Worker | done | done | done |
| `visas/uk/skilled-worker-dependent` | Skilled Worker Dependent | done | done | done |

## Visit visas (directory + hubs + destinations)

- `visit-visas` — "Global Visit Visas / More Destinations" directory — **done**.
- Combined hubs: `visit-visas/canada-usa-australia`, `visit-visas/uk-new-zealand`, `visit-visas/china-japan-turkey`, `visit-visas/south-korea-greece-thailand`, `visit-visas/singapore-saudi-arabia-uae`, `visit-visas/south-africa-cyprus-netherlands` — **done** (all 6).
- Individual destinations (canonical, no duplicate Canada/UK/Australia visit content elsewhere): `visit-visas/{canada, usa, australia, uk, new-zealand, china, japan, turkey, south-korea, greece, thailand, singapore, saudi-arabia, uae, south-africa, cyprus, netherlands}` — **done** (all 17; canada lives in `canada.ts`).

All rows: 5-market `done`, meta `done`, test `done`, legacy aliases `pending`.

## Business and investment

| Route ID | Label | 5-market | Meta | Test |
|---|---|---|---|---|
| `business-investment/golden-visa-uae` | UAE Golden Visa | done | done | done |
| `business-investment/residency` | Residency hub | done | done | done |
| `business-investment/residency/canada` | Canada residency | done | done | done |
| `business-investment/residency/uk` | UK residency | done | done | done |
| `business-investment/residency/usa` | USA residency | done | done | done |
| `business-investment/citizenship` | Citizenship hub | done | done | done |
| `business-investment/citizenship/st-kitts-and-nevis` | St Kitts & Nevis | done | done | done |
| `business-investment/citizenship/vanuatu` | Vanuatu | done | done | done |
| `business-investment/startup-entrepreneur-visas` | Startup/Entrepreneur | done | done | done |

## Study abroad

| Route ID | Label | 5-market | Meta | Test |
|---|---|---|---|---|
| `study-abroad/canada-student-visas` | Canada student | done | done | done |
| `study-abroad/australia-student-visas` | Australia student | done | done | done |
| `study-abroad/uk-usa-student-visas` | UK+USA combined hub | done | done | done |
| `study-abroad/uk-student-visas` | UK student | done | done | done |
| `study-abroad/usa-student-visas` | USA student | done | done | done |
| `study-abroad/ielts-coaching` | IELTS coaching | done (noindex + status banner pending client verification of in-house coaching) | done | done |

## More services

| Route ID | Label | 5-market | Meta | Test |
|---|---|---|---|---|
| `services/resume-marketing` | Resume marketing | done | done | done |
| `visit-visas` | (see above) | — | — | — |
| `why-dmc` | Why DMC | done (process section anchored `#process` for nav link) | done | done |

## Resources

| Route ID | Label | 5-market | Meta | Test |
|---|---|---|---|---|
| `blog` | Blog index (MDX listing) | pending (Phase 6) | pending | pending |
| `blog/[slug]` | Article (market-filtered) | pending (Phase 6) | pending | pending |
| `faqs` | FAQs | done | done | done |
| `guides` | Guides hub | done | done | done |
| `guides/document-checklists` | Document checklists | done | done | done |
| `success-stories` | Success stories (approved content only) | pending (approval + Phase 11) | pending | pending |
| `video-success-stories` | Video stories (approved content only) | pending (approval + Phase 11) | pending | pending |
| `gallery` | Gallery (approved content only) | pending (approval + Phase 11) | pending | pending |
| `press-media` | Press/media (approved content only) | pending (approval + Phase 11) | pending | pending |
| `credentials` | Licensed consultants & credentials | pending (regulator verification + Phase 11) | pending | pending |

## Tools and enquiry

| Route ID | Label | 5-market | Meta | Test |
|---|---|---|---|---|
| `tools` | Tools hub | pending | pending | pending |
| `tools/eligibility-checker` | Free eligibility checker | pending | pending | pending |
| `tools/canada` | Canada tools hub | pending | pending | pending |
| `tools/australia` | Australia tools hub | pending | pending | pending |
| `contact` | Contact (5-office directory) | pending | pending | pending |
| `about` | About | pending | pending | pending |

### Remaining tool routes (canonical slugs to finalize in Phase 10; MASTER §13)

Canada (12 total; `crs-calculator` above): `clb-calculator`, `fsw-67-point-calculator`, `oinp-calculator`, `aaip-calculator`, `sinp-calculator`, `bc-pnp-calculator`, `manitoba-pnp-calculator`, `nova-scotia-pnp-calculator`, `new-brunswick-pnp-calculator`, `newfoundland-labrador-pnp-calculator`, `rcip-eligibility-tool` — all under `tools/canada/`, status pending.
Australia (4 total; `points-calculator` and `occupation-eligibility-checker` above): `visa-fee-estimator`, `processing-times-tool` — under `tools/australia/`, status pending.

## Legal

| Route ID | Label | 5-market | Meta | Test |
|---|---|---|---|---|
| `legal` | Legal hub (market-aware) | pending | pending | pending |
| `legal/privacy-policy` | Privacy Policy | pending | pending | pending |
| `legal/terms-and-conditions` | Terms & Conditions | pending | pending | pending |
| `legal/refund-and-cancellation` | Refund & Cancellation | pending | pending | pending |
| `legal/anti-fraud` | Anti-Fraud | pending | pending | pending |
| `legal/disclaimer` | Disclaimer | pending | pending | pending |

All legal copy: old-site policies reused as client-owned drafts, marked for client/legal review.

## Site-wide totals

- Markets: 5. Homepages: 5.
- Content routes (hubs + pages + tools): ~90 canonical rows above; **60 content pages done** (all 5 markets via `/[market]/[...segments]` catch-all; 311 static routes at build). Remaining: tools (16), blog (Phase 6), legal/about/contact/credentials (Phase 11–12).
- Blog articles: to be counted from crawl (`CONTENT_MIGRATION_INVENTORY.md`).
