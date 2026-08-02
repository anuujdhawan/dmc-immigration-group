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
| `visas/canada/express-entry` | Express Entry | ProgramPage (reference impl, EE template) | pending | pending | pending | pending |
| `visas/canada/provincial-nominee-programs` | PNP hub | ProgramPage hub | pending | pending | pending | pending |
| `visas/canada/atlantic-immigration-program` | Atlantic Immigration | ProgramPage | pending | pending | pending | pending |
| `visas/canada/rural-and-northern-immigration-pilot` | RNIP (legacy status) | ProgramPage w/ status label | pending | pending | pending | pending |
| `visas/canada/study-permits` | Study permits | ProgramPage (SDS history + NCLEX context) | pending | pending | pending | pending |
| `visas/canada/family-sponsorship-parent-grandparent-program` | Parent/Grandparent | ProgramPage | pending | pending | pending | pending |
| `visit-visas/canada` | Canada visit visa | ProgramPage (Super Visa section canonical if no separate page) | pending | pending | pending | pending |
| `visas/canada/super-visa` | Super Visa | conditional — only if content warrants; else section above | pending | pending | pending | pending |
| `tools/canada/crs-calculator` | CRS calculator | ToolShell + pure CRS module | pending | pending | pending | pending |

## Australia visas

| Route ID | Label | Component/content | 5-market | Meta | Test | Legacy aliases |
|---|---|---|---|---|---|---|
| `visas/australia/skilled-independent-189` | Skilled Independent 189 | ProgramPage | pending | pending | pending | pending |
| `visas/australia/skilled-nominated-190` | Skilled Nominated 190 | ProgramPage | pending | pending | pending | pending |
| `visas/australia/skilled-work-regional-491` | Skilled Work Regional 491 | ProgramPage | pending | pending | pending | pending |
| `visas/australia/permanent-residence-skilled-regional-191` | PR Skilled Regional 191 | ProgramPage | pending | pending | pending | pending |
| `visas/australia/employer-sponsored-482` | Employer Sponsored 482 (current naming; former TSS) | ProgramPage | pending | pending | pending | pending |
| `visas/australia/employer-nomination-scheme-186` | ENS 186 | ProgramPage | pending | pending | pending | pending |
| `visas/australia/national-innovation-visa-858` | National Innovation Visa 858 (former Global Talent naming) | ProgramPage | pending | pending | pending | pending |
| `visas/australia/state-territory-nominations` | State/Territory nominations | ProgramPage hub | pending | pending | pending | pending |
| `tools/australia/occupation-eligibility-checker` | Occupation/eligibility checker | ToolShell (ANZSCO-oriented) | pending | pending | pending | pending |
| `tools/australia/points-calculator` | Points calculator | ToolShell | pending | pending | pending | pending |

## UK visas

| Route ID | Label | 5-market | Meta | Test |
|---|---|---|---|---|
| `visas/uk/skilled-worker` | Skilled Worker | pending | pending | pending |
| `visas/uk/skilled-worker-dependent` | Skilled Worker Dependent | pending | pending | pending |

## Visit visas (directory + hubs + destinations)

- `visit-visas` — "Global Visit Visas / More Destinations" directory.
- Combined hubs: `visit-visas/canada-usa-australia`, `visit-visas/uk-new-zealand`, `visit-visas/china-japan-turkey`, `visit-visas/south-korea-greece-thailand`, `visit-visas/singapore-saudi-arabia-uae`, `visit-visas/south-africa-cyprus-netherlands`.
- Individual destinations (canonical, no duplicate Canada/UK/Australia visit content elsewhere): `visit-visas/{canada, usa, australia, uk, new-zealand, china, japan, turkey, south-korea, greece, thailand, singapore, saudi-arabia, uae, south-africa, cyprus, netherlands}`.

All rows: 5-market `pending`, meta `pending`, test `pending`, legacy aliases `pending`.

## Business and investment

| Route ID | Label | 5-market | Meta | Test |
|---|---|---|---|---|
| `business-investment/golden-visa-uae` | UAE Golden Visa | pending | pending | pending |
| `business-investment/residency` | Residency hub | pending | pending | pending |
| `business-investment/residency/canada` | Canada residency | pending | pending | pending |
| `business-investment/residency/uk` | UK residency | pending | pending | pending |
| `business-investment/residency/usa` | USA residency | pending | pending | pending |
| `business-investment/citizenship` | Citizenship hub | pending | pending | pending |
| `business-investment/citizenship/st-kitts-and-nevis` | St Kitts & Nevis | pending | pending | pending |
| `business-investment/citizenship/vanuatu` | Vanuatu | pending | pending | pending |
| `business-investment/startup-entrepreneur-visas` | Startup/Entrepreneur | pending | pending | pending |

## Study abroad

| Route ID | Label | 5-market | Meta | Test |
|---|---|---|---|---|
| `study-abroad/canada-student-visas` | Canada student | pending | pending | pending |
| `study-abroad/australia-student-visas` | Australia student | pending | pending | pending |
| `study-abroad/uk-usa-student-visas` | UK+USA combined hub | pending | pending | pending |
| `study-abroad/uk-student-visas` | UK student | pending | pending | pending |
| `study-abroad/usa-student-visas` | USA student | pending | pending | pending |
| `study-abroad/ielts-coaching` | IELTS coaching | pending (blocker: client verification of in-house coaching) | pending | pending |

## More services

| Route ID | Label | 5-market | Meta | Test |
|---|---|---|---|---|
| `services/resume-marketing` | Resume marketing | pending | pending | pending |
| `visit-visas` | (see above) | — | — | — |
| `why-dmc` | Why DMC | pending | pending | pending |

## Resources

| Route ID | Label | 5-market | Meta | Test |
|---|---|---|---|---|
| `blog` | Blog index (MDX listing) | pending | pending | pending |
| `blog/[slug]` | Article (market-filtered) | pending | pending | pending |
| `faqs` | FAQs | pending | pending | pending |
| `guides` | Guides hub | pending | pending | pending |
| `guides/document-checklists` | Document checklists | pending | pending | pending |
| `success-stories` | Success stories (approved content only) | pending | pending | pending |
| `video-success-stories` | Video stories (approved content only) | pending | pending | pending |
| `gallery` | Gallery (approved content only) | pending | pending | pending |
| `press-media` | Press/media (approved content only) | pending | pending | pending |
| `credentials` | Licensed consultants & credentials | pending | pending | pending |

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
- Content routes (hubs + pages + tools): ~90 canonical rows above (pending crawl-derived aliases).
- Blog articles: to be counted from crawl (`CONTENT_MIGRATION_INVENTORY.md`).
