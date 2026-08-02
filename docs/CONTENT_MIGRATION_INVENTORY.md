# Content Migration Inventory — DMC Immigration Group

Crawl date: 2026-08-02. Sources: sitemaps + homepage/nav of `dm-consultant.ae`; media pages (`success-stories`, `dm-gallery`, `contact-us`, `about-us`, `client-testimonials`); sitemaps/homepages of the four other legacy domains. Status key: `candidate` | `migrated` | `duplicate` | `rejected` | `needs-redaction` | `inaccessible` | `n/a`. All content migration is pending (Phase 11/12) unless marked.

## 1. Legacy domains overview

| Domain | Market mapping | Pages | Blog posts | Status |
|---|---|---|---|---|
| `dm-consultant.ae` | dubai | 135 | 91 | crawled |
| `dm-consultant.qa` | qatar | 75 | 23 | crawled (summary) |
| `dm-consultantkuwait.com` | kuwait | 55 | 8 | crawled (summary) |
| `dm-consultant.in` | india | 112 | 19 | crawled (summary) |
| `dm-consultantabudhabi.com` | abu-dhabi | 30 | 4 | crawled (summary) |

All five run the same WordPress/Elementor theme. Blog content overlaps heavily across domains (duplicate groups to dedupe, not store five copies — MASTER §12). Qatar/Kuwait sites reference stale `/new_en/` and `/staging/` image paths (broken media — treat as unavailable, source replacement imagery).

## 2. dm-consultant.ae page inventory (135 URLs) → new canonical mapping

### 2.1 Site-level / legal (map 1:1)
| Legacy URL | New canonical | Status |
|---|---|---|
| `/` | `/{market}` homepage | candidate |
| `/about-us/` | `/{market}/about` | candidate |
| `/contact-us/` | `/{market}/contact` | candidate |
| `/blog/` | `/{market}/blog` | candidate |
| `/success-stories/` | `/{market}/success-stories` | candidate |
| `/dm-gallery/` | `/{market}/gallery` | candidate |
| `/client-testimonials/` | `/{market}/success-stories` (section) | candidate |
| `/privacy-policy/` | `/{market}/legal/privacy-policy` | candidate (draft only) |
| `/terms-of-service/` | `/{market}/legal/terms-and-conditions` | candidate (draft only) |
| `/refund-policy/` | `/{market}/legal/refund-and-cancellation` | candidate (draft only) |
| `/anti-fraud-policy/` | `/{market}/legal/anti-fraud` | candidate (draft only) |
| `/pay-online/`, `/tap-pay-online/`, `/success-payment/`, `/success-payment-2/` | no equivalent (payments excluded v1) → redirect `/{market}/contact` | n/a |
| `/immigration-consultants-in-abu-dhabi/`, `/immigration-consultants-in-sharjah/` | `/{market}/contact` office sections (Abu Dhabi office exists; Sharjah not in v1 5-market scope — document) | candidate |
| `/golden-visa-uae/` | `/{market}/business-investment/golden-visa-uae` | candidate |

### 2.2 Canada skilled pages
| Legacy URL | New canonical | Status |
|---|---|---|
| `/skilled-immigration/` | `/{market}/visas/canada` hub (nav: Canada) | candidate |
| `/skilled-immigration/canada/` | `/{market}/visas/canada` | candidate |
| `/skilled-immigration/canada/express-entry-program/` | `/{market}/visas/canada/express-entry` | candidate |
| `/skilled-immigration/canada/provincial-nominee-programs/` | `/{market}/visas/canada/provincial-nominee-programs` | candidate |
| `/skilled-immigration/canada/provincial-nominee-programs/{alberta,british-columbia,manitoba,new-brunswick,nova-scotia,ontario,prince-edward-island,saskatchewan}-pnp/` | PNP hub sections (new site has no per-province PNP pages; calculators cover AAIP/SINP/OINP/BC/MB/NS/NB/NL) — redirect to hub | candidate |
| `/skilled-immigration/canada/economic-immigration-programs/` | `/{market}/visas/canada` (hub section) | candidate |
| `/skilled-immigration/canada/economic-immigration-programs/rnip/` | `/{market}/visas/canada/rural-and-northern-immigration-pilot` (legacy status labelled; successor RCIP link) | candidate |
| `/skilled-immigration/canada/economic-immigration-programs/aipp/` | `/{market}/visas/canada/atlantic-immigration-program` | candidate |
| `/skilled-immigration/canada/economic-immigration-programs/mcdii/` | no direct v1 page — verify status (MCDII = Mobility Cooperation? review) → document decision | candidate |
| `/skilled-immigration/canada/nurses-immigration/`, `.../nclex-test/` | `/{market}/visas/canada/study-permits` (NCLEX nursing context) or documented section | candidate |
| `/spouse-visa/`, `/sowp/` | `/{market}/visas/canada/...` family section — no v1 canonical; document (family sponsorship page exists: parent-grandparent only) → likely section in study-permits or PNP hub; decision needed | candidate |

### 2.3 Australia skilled pages
| Legacy URL | New canonical | Status |
|---|---|---|
| `/skilled-immigration/australia/` | `/{market}/visas/australia` hub | candidate |
| `/skilled-immigration/australia/skilled-independent-189/` | `/{market}/visas/australia/skilled-independent-189` | candidate |
| `/skilled-immigration/australia/skilled-nominated-190/` | `/{market}/visas/australia/skilled-nominated-190` | candidate |
| `/skilled-immigration/australia/skilled-work-regional-provisional-491/` | `/{market}/visas/australia/skilled-work-regional-491` | candidate |
| `/skilled-immigration/australia/temporary-work-visa-482/` | `/{market}/visas/australia/employer-sponsored-482` (current naming; former TSS) | candidate |
| `/skilled-immigration/australia/global-talent-visa-858/` | `/{market}/visas/australia/national-innovation-visa-858` (former Global Talent naming) | candidate |
| `/skilled-immigration/australia/temporary-graduate-visa-485/` | no v1 page — verify status; possibly section on 189/190 or study-abroad; decision needed | candidate |
| `/skilled-immigration/australia/spouse-dependent-visa/` | no v1 canonical; document | candidate |
| `/dependent-visa/` | no v1 canonical; document | candidate |
| `/skilled-immigration/united-kingdom/` | `/{market}/visas/uk/skilled-worker` | candidate |
| `/uk-skilled-worker-dependent-visa/` | `/{market}/visas/uk/skilled-worker-dependent` | candidate |
| `/us-dependent-visa/` | no v1 page (US dependent); redirect `/{market}/visit-visas/usa` or document | candidate |
| `/skilled-immigration/europe/` | no v1 page; document (EU not in v1 scope) | candidate |
| New Zealand partner visas (`/new-zealand-partner-*`, 4 URLs) | no v1 canonical; redirect `/{market}/visit-visas/new-zealand` + document | candidate |
| `/global-job-search/`, `/singapore-work-visa/`, `/malaysia-work-visa/` | no v1 page; `/{market}/services/resume-marketing` is closest (global job search) — map Singapore/Malaysia work visa → resume-marketing or visit hubs; decision needed | candidate |

### 2.4 Visit visas (directory + destinations)
- `/visit-visa/` → `/{market}/visit-visas` directory. Status: candidate.
- Direct canonical matches (v1 destinations): `usa`, `uk`, `canada`, `australia`, `new-zealand`, `china`, `japan`, `turkey`, `south-korea`, `greece`, `thailand`, `singapore`, `saudi`, `uae`, `south-africa`, `cyprus`, `netherland` → `/{market}/visit-visas/{slug}` (note legacy `saudi` → canonical `saudi-arabia`, `netherland` → `netherlands` — alias redirects). Status: candidate.
- No direct v1 destination page (redirect to `/{market}/visit-visas` hub or nearest hub, documented): `schengen`, `italy`, `switzerland`, `spain`, `france`, `germany`, `sweden`, `austria`, `czech-republic`, `ireland`, `luxembourg`, `liechtenstein`, `belgium`, `iceland`, `lithuania`, `latvia`, `malta`, `estonia`, `slovakia`, `slovenia`, `hungary`, `finland`, `tanzania`, `russia`, `monaco`, `vatican-cit`, `san-marino`, `bulgaria`, `croatia`, `brazil`, `india`, `portugal`, `norway`, `denmark`, `malaysia`, `kyrgyzstan`, `pakistan`, `philippines`, `georgia`. Status: candidate (redirect mapping).

### 2.5 Business & investment
| Legacy URL | New canonical | Status |
|---|---|---|
| `/residency-by-investment/` | `/{market}/business-investment/residency` | candidate |
| `/residency-by-investment/canada/` | `/{market}/business-investment/residency/canada` | candidate |
| `/residency-by-investment/united-kingdom/` | `/{market}/business-investment/residency/uk` | candidate |
| `/residency-by-investment/united-states-of-america/` | `/{market}/business-investment/residency/usa` | candidate |
| `/residency-by-investment/{spain-citizenship-by-investment-dm,portugal-golden-visa,malta,greece}/` | no v1 pages; redirect residency hub + document | candidate |
| `/citizenship-by-investment/` | `/{market}/business-investment/citizenship` | candidate |
| `/citizenship-by-investment/saint-kitts-and-nevis/` | `/{market}/business-investment/citizenship/st-kitts-and-nevis` | candidate |
| `/citizenship-by-investment/vanuatu/` | `/{market}/business-investment/citizenship/vanuatu` | candidate |
| `/citizenship-by-investment/{saint-lucia-citizenship,grenada,dominica,antigua-and-barbuda,turkey}/` | no v1 pages; redirect citizenship hub + document | candidate |

### 2.6 Study abroad / work permits (outside v1 canonical set — document each)
| Legacy URL | Disposition |
|---|---|
| `/canada-student-visas/` | → `/{market}/study-abroad/canada-student-visas` |
| `/australia-student-visas/` | → `/{market}/study-abroad/australia-student-visas` |
| `/uk-student-visas/` | → `/{market}/study-abroad/uk-student-visas` |
| `/usa-student-visas/` | → `/{market}/study-abroad/usa-student-visas` |
| `/europe-student-visas/`, `/study-in-uzbekistan/` | no v1 page; redirect `/{market}/study-abroad/uk-usa-student-visas` hub + document |
| `/work-permit/` + `/work-permit/{canada,poland,czech-republic,b2b-immigration-services-for-europe,eu-blue-card-germany}/` | no v1 work-permit section (v1 = resume-marketing only); Canada work permit content folds into study-permits/express-entry pages; others → document decision (redirect to services hub) |

All above: `candidate` — dispositions finalised when `src/config/legacy-redirects.ts` is written (Phase 4).

## 3. Blog articles — migration candidates

### 3.1 dm-consultant.ae — 91 posts (slug | lastmod | featured image)
All status `candidate`; featured image path pattern `https://dm-consultant.ae/wp-content/uploads/{y}/{m}/{file}`. Titles to be captured from article pages at migration time (Phase 11).

- permanent-residency-in-2019-check-out-the-top-5-developed-countries-to-secure-a-pr-easily | 2023-12 | Top-5-Developed-countries.jpg
- latest-express-entry-draw-occurs-8-days-after-the-last-draw-another-3600-candidates-invited-even-as-the-score-drops-to-its-minimum | 2023-12 | Express-Entry-Draw-Occurs.jpg
- immigration-a-key-to-unlocking-canadas-future-economic-success | 2023-12 | Canadas-Future-Economic-1.jpg
- express-entry-crs-point-requirement-decreases-yet-again-in-march-1-draw | 2023-12 | canada_img.jpg
- latest-federal-express-entry-draw-in-canada-crs-score-drops-as-another-3600-invitations-was-issued | 2023-12 | Latest-Federal-Express-Entry.jpg
- which-express-entry-program-is-right-for-you | 2023-12 | Express-Entry-Program-1024x754-1.jpg
- canadas-population-growth-surges-highest-in-30-years | 2023-12 | Canada-Population-Growth-1024x751-1.jpg
- shocking-federal-express-entry-draw-in-canada-takes-a-diversion-500-candidates-with-scores-as-low-as-357-receives-an-invitation-to-apply | 2023-12 | Express-Entry-Draw-in-Canada.jpg
- permanent-residency-in-canada-fresh-3600-invitations-issued-in-the-latest-express-entry-draw-the-4th-of-september-2019 | 2023-12 | Invitations-issued-in-the-latest.jpg
- 11th-december-express-entry-draw-total-number-of-itas-rise-to-82000-as-crs-score-remains-still | 2023-12 | Canada-Express-Entry-Draw.jpg
- 6-most-common-visa-rejection-reasons-for-australia | 2023-12 | Most-Common-Visa-Rejection.jpg
- a-brief-overview-of-the-canadian-environment | 2023-12 | Canadian-Environment.jpg
- admission-targets-to-rise-in-canada-through-economic-immigration-programs-from-2024-2026 | 2023-12 | Canada_Admission_1.jpg
- alberta-issues-nois-to-471-federal-express-entry-fee-candidates-with-crs-scores-as-low-as-303-to-apply-for-a-provincial-nomination | 2023-12 | Federal-Express-Entry-1.jpg
- australian-immigration-management-system-reinstates-normalisation-procedures | 2023-12 | Australian-Immigration-Management.jpg
- biggest-draw-recorded-in-the-last-six-months-as-ircc-invites-3900-express-entry-candidates-in-the-latest-draw-to-apply-for-permanent-residency-in-canada | 2023-12 | Express-Entry-Candidates.jpg
- 3600-candidates-receives-an-ita-in-the-latest-express-entry-draw-on-monday-12th-if-august | 2023-12 | ITA-express-entry-canada.jpg
- ontario-plans-to-open-oinp-streams-intermittently-throughout-2017 | 2024-01 | ITA-canada.jpeg
- canada-conducts-first-express-entry-draw-since-october-2023 | 2024-01 | Canada_india_3.jpeg
- an-ultimate-guide-to-planning-your-trip-to-europe | 2024-01 | Ultimate-Guide-To-Planning-1024x701-1.jpg
- a-comparison-of-the-cost-of-living-in-dubai-and-canada-canada-vs-dubai | 2024-01 | Cost-of-Living-in-Dubai-and-Canada-1024x700-1.jpg
- a-comparison-of-the-cost-of-living-in-dubai-and-australia-australia-vs-dubai | 2024-01 | Australia-for-UAE-Students-1.jpg
- how-to-prepare-for-your-uk-visit-visa-interview-in-dubai | 2024-01 | Prepare-for-Your-UK-Visit-Visa.jpg
- pnp-latest-draw-150-candidates-receives-invitation-from-saskatchewan-under-occupation-in-demand-stream-and-express-entry | 2024-01 | Candidates-Receives-Invitation.jpg
- ontario-latest-draw-invites-express-entry-candidates-from-these-10-major-occupations | 2024-01 | Ontario-1.jpg
- canadian-immigration-to-incrеasе-in-2024-subjеct-to-cеrtain-chеcks (Cyrillic chars in slug) | 2024-01 | Canadian_immigratio-incrеasе_cеrtain_chеcks.jpg
- canadian-immigration-to-see-more-progress-in-2024 | 2024-01 | Invitations-issued-in-the-latest.jpg
- canada-opens-2024-season-to-international-youth | 2024-01 | Canada_opens_International_youth_1.jpg
- latest-canadian-immigration-update-canada-conducts-first-express-entry-draw-since-october-2023 | 2024-01 | Canada_Conducts_First_Express_Entry.jpg
- latest-visa-requirements-for-usa-tourism-trip-with-family | 2024-01 | USA-tourism-trip-with-family_2.jpg
- australia-awards-over-22000-citizenships | 2024-01 | Australia_awards_over_citizenships-.jpg
- ready-your-documentation-as-ircc-ramps-up-express-entry-draws | 2024-02 | Canada_Conducts_First_Express_Entry.jpg
- france-likely-to-maintain-most-visited-country-status-in-olympic-year | 2024-02 | Francе_likеly_5.jpg
- uk-opens-thousands-of-visa-slots-for-young-indians-through-ballot-system | 2024-02 | UK_opens_thousands_of_visa_slots.jpg
- alberta-to-accept-applications-under-the-new-stream-of-tourism-and-hospitality-from-march-1 | 2024-03 | tourism-and-hospitality_2.jpg
- ontario-prioritises-public-post-secondary-programs-in-international-study-permits-allocation | 2024-04 | Ontario_prioritises.jpg
- latest-reasons-behind-ircc-refusals-for-canada-visit-visa-applications | 2024-04 | behind_IRCC_refusals.jpg
- visa-and-immigration-scams-in-uae-exposed-4-vital-tricks-to-watch-out-for-in-these-fraudulent-practices | 2024-04 | Immigration-Scams-in-UAE.jpg
- how-intention-matters-for-canada-pnp-applicants | 2024-04 | Intention_matters.jpg
- does-express-entry-profile-expire-find-out-here | 2024-04 | Express_Entry_Profile.jpg
- does-the-new-saskatchewan-immigration-services-act-impact-on-immigration | 2024-07 | New_Saskatchewan_Immigration_1.jpg
- brief-insight-to-history-of-australian-immigration | 2024-09 | History_ustralian_Immigration.jpg
- top-7-reasons-to-immigrate-to-australia | 2024-09 | Top-7-Reasons-Australia_2.jpg
- steer-clear-of-these-common-7-mistakes-when-moving-to-canada | 2024-10 | Common_7_Mistakes_When_Moving_Canada.jpg
- a-valuable-guide-for-traversing-the-immigration-system | 2024-10 | Valuable_Guide_the_Immigration_System.jpg
- everything-you-need-to-know-about-temporary-vs-permanent-visa | 2024-10 | Temporary-vs-Permanent-Visa.jpg
- a-valuable-guide-to-help-you-navigate-your-australian-visa-interview | 2024-10 | Navigate-Your-Australian-Visa_2.jpg
- a-guide-to-working-in-australia | 2024-11 | Guide_to_Working_Australia.jpg
- top-5-work-permit-jobs-canada | 2024-11 | Top_5_Work_Permit_Jobs_Canada.jpg
- top-7-travel-destinations-to-visit-in-2025 | 2024-12 | Travel_Destinations_to_Visit.jpg
- checklist-of-important-things-to-do-before-applying-for-a-visit-visa | 2025-01 | Applying_for_Visit_Visa.jpg
- top-europe-destinations-to-visit-in-2025 | 2025-01 | Top_Europe_Destinations.jpg
- simplify-your-immigration-journey-5-advantages-of-working-with-experts | 2025-02 | Simplify_Your_Immigration.jpg
- top-10-best-immigration-consultants-in-dubai-uae | 2025-03 | best_immigration_consultants.jpg
- a-comprehensive-guide-to-high-demand-careers-in-australia | 2025-04 | High-Demand-Careers-Australia-1-1.jpg
- 5-best-immigration-options-for-the-uae-residents | 2025-05 | 5_Best_Immigration_Options.jpg
- immigrate-to-canada-as-a-teacher-all-about-the-new-express-entry-draw | 2025-06 | Immigrate_to_Canada_as_A_Teacher.jpg
- new-manitoba-work-permits-for-pnp-candidates-everything-you-need-to-know | 2025-07 | New_Manitoba_Work_Permits.jpg
- 6-best-golden-visas-for-uae-residents | 2025-07 | Best-Golden-Visas-for-UAE.jpg
- top-10-european-countries-to-visit-this-december | 2025-09 | Top_10_European_Countries.jpg
- refugee-claim-trends-in-canada-insights-advice-for-uae-residents-considering-relocation | 2025-12 | Refugee-Claim-Trends-Canada-1.jpg
- canada-immigration-plan-2026-2028-permanent-and-temporary-resident-targets-explained | 2025-12 | Canada-Immigration-Plan-2026-2028-UAE.jpg
- job-seeker-visa-vs-work-permit-in-germany-a-guide-for-uae-residents | 2026-01 | Germany_A_Guide_for_UAE_Residents.jpg
- how-to-improve-chances-of-qualifying-in-the-express-entry-draw-to-get-canada-express-entry | 2026-01 | Qualifying_in_the_Express_Entry_Draw.jpg
- how-to-secure-a-canadian-work-permit-from-dubai-uae | 2026-01 | Secure_a_Canadian_Work_Permit.jpg
- how-to-apply-for-canada-post-graduation-work-visa-from-dubai | 2026-01 | Secure_a_Canadian_Work_Permit-1.jpg
- canada-express-entry-2026-crs-scores-draws-and-federal-skilled-worker-program | 2026-01 | Canada_Express_Entry_2026.jpg
- how-to-apply-for-a-poland-work-permit-visa-from-dubai | 2026-01 | A_Poland_Work_Permit.jpg
- france-work-permit-visa-requirements-processing-time-eu-blue-card-explained | 2026-01 | France_Work_Permit_Visa_1.jpg
- uk-work-visa-work-permit-guide-2026-eligibility-immigration-process | 2026-01 | UK_Work_Visa_Work_Permit.jpg
- uk-travel-visa-guide-2026-tourist-visa-requirements-process-and-cost-explained | 2026-01 | UK_Travel_Visa_Guide_2026_Tourist-Visa_1.jpg
- uk-student-visa-a-complete-breakdown-of-visa-application-fees-process-and-everything-else | 2026-01 | UK_Student_Visa_A_Complete_Breakdown-2.jpg
- navigating-the-canada-express-entry-system-in-2026-a-comprehensive-guide-for-indian-applicants | 2026-02 | Navigating_Canada_Express_Entry.jpg
- h1b-visa-usa-guide-2026-lottery-changes-wage-levels-and-the-process | 2026-02 | H1B_Visa_USA_Guide_2026.jpg
- 2026-roadmap-us-skilled-worker-green-cards-eb2-eb3-guid | 2026-02 | Roadmap_US_Skilled_Worker.jpg
- how-to-qualify-for-skilled-immigration-immigration | 2026-02 | Qualify_Skilled_Immigration.jpg
- usa-visa-appointment-approval-tips | 2026-02 | USA_Visa_Appointment_Approval.jpg
- visitor-visa-common-mistakes-to-avoid-rejections | 2026-02 | Common_Mistakes_Avoid_Rejections.jpg
- usa-visa-appointment-approval-tips-2 | 2026-02 | USA_Visa_Appointment_1.jpg — **duplicate** of usa-visa-appointment-approval-tips (alias redirect)
- best-free-visa-countries-for-uae-residents-in-2026 | 2026-02 | Best_Free_Visa_Countries.jpg
- how-to-improve-your-chances-of-schengen-travel-visa-approval | 2026-02 | Schengen_Travel_Visa_Approval.jpg
- visit-vs-tourist-visa-key-differences-explained-for-travel-visa-seekers | 2026-02 | Visit_Tourist_Visa_Key_Differences.jpg
- czech-republic-visa-for-uae-residents-work-visa-requirements-and-everything-else | 2026-02 | Czech_Republic_Visa_UAE_Residents.jpg
- usa-visa-from-for-skilled-professionals | 2026-03 | USA_Visa_from_UAE.jpg
- canada-visit-visa-from-uae | 2026-03 | Visit-Visa-Canada-from-UAE.jpg
- australia-skilled-immigration-from-uae | 2026-03 | Australia-Skilled-Immigration-Explained.jpg
- usa-work-visa-rejections | 2026-03 | USA-Work-Visa-Rejections.jpg
- usa-h1b-visa-requirements-updated-rules | 2026-03 | Eligibility_Process_for_UAE_Residents-1.jpg
- uk-visa-interview-questions | 2026-03 | UK_Visa_Interview_Questions.jpg
- uk-visit-visa-processing-time-from-uae | 2026-03 | UK_Visit_Visa_Processing_Time.jpg
- guide-to-applying-work-permit-visa | 2026-03 | Complete_Guide_when_applying.jpg

### 3.2 Other domains (blog posts; dedupe against .ae set at migration)
- `dm-consultant.qa` — 23 posts (Qatar-specific topics incl. "authorized ICCRC consultants in Qatar", Poland/Australia work permits from Qatar, Canada work visa 2026 for Qatar residents). Candidate.
- `dm-consultantkuwait.com` — 8 posts (Kuwait-specific: "10 best immigration consultants in Kuwait", "migrate to Canada from Kuwait", "skilled worker visa from Kuwait"). Candidate.
- `dm-consultant.in` — 19 posts (India-focused: scams in India, work permits from Dubai→Canada/Europe/Australia, UAE visa for Indians, 189/190/491 for Indians). Candidate.
- `dm-consultantabudhabi.com` — 4 posts (Abu Dhabi-specific: "5 best immigration consultants in Abu Dhabi", Australia income threshold 2025, Canada 2026-2028 plan ×2). Candidate.

## 4. Credential seeds (verify before ANY publication — MASTER §16.3/§17.2)

| Person | Regulator | Number | Legacy source | Verification URL (legacy) | Status |
|---|---|---|---|---|---|
| Kanika Gaba | RCIC/CICC (legacy says ICCRC — use current regulator terminology) | R534737 | `dm-consultant.ae/about-us/` | `https://register.college-ic.ca/Public-Register-EN/Licensee/Profile.aspx?ID=22560` | candidate — verify current status, DMC affiliation, portrait/licence republication approval |
| Riccardo James Patrick Ippoliti | MARA-registered migration agent | 1386990 | `dm-consultant.ae/about-us/` | (verify in current MARA register) | candidate — verify current status, DMC affiliation, approval |

Legacy claims NOT to carry forward without client proof: "98.9%/98.8% approval rate", "4.8/5 Google rating", "best/most trusted in UAE", "MARA-certified", "ICCRC-approved" wording, "10,000 visas", "20+ offices" (legacy sites inconsistently claim 6/10/20 years and office counts).

## 5. Testimonials — candidate records (need client confirmation to remain public)

Legacy source: `dm-consultant.ae/client-testimonials/`. No portraits on legacy page (only placeholder icons); do NOT invent portraits. Name | program | staff thanked (context, not claim):
- Mir Ali (Canada skilled) — thanks Ismile & Sherin
- Nandita Prakash (Australia visit visa) — thanks Yash
- Aditya Kain (Canada skilled / Express Entry)
- Raheel Bajwa (Poland work visa)
- Mashal Rana (visa)
- Vijay Rajput (Canada work visa)
- Tania Singh (visa application)
- Meena Kapoor (immigration process)
- Mehta Jain (immigration)
- Ankita Batra (visa)

Staff names appearing (candidate only, do not publish as team without confirmation): Ismile, Sherin, Yash, Shradha.

## 6. Authentic media assets (candidate — PII review + approval REQUIRED before migration)

| Asset class | Legacy source | Count/pattern | Notes |
|---|---|---|---|
| Success stories | `dm-consultant.ae/success-stories/` | 144 unique images (`Success-Video-*.jpg/png` ~110, `Success-Story-*.jpg`, `Study-Success-*.jpg`, `DM_Success_Stories_1..8.jpg`, `New-Project-12..18.png`) | All captions are INSIDE images; likely visa/PR approval screenshots — inspect for passports/visa numbers/DOB/signatures/QR; redact or omit; same set reused on .qa/.in/abudhabi |
| Gallery | `dm-consultant.ae/dm-gallery/` | 16 images (DM_Success_Stories_1-8, New-Project-12-18, DM_rebranding-middleeast_1.png) | Office/event photos; verify subjects/context before use |
| Videos | search results | none found in crawl (Success-Video-* filenames are images, not videos) | — |

## 7. Offices / contact data (legacy-confirmed values; cross-check with client-supplied)

| Market | Phone | Email | Address | WhatsApp candidate (legacy) | Status |
|---|---|---|---|---|---|
| Dubai | +971 4 344 7757 | info@dm-consultant.com | Office 3701, Latifa Tower East Wing, Sheikh Zayed Rd, Dubai | +971 54 321 9003 | contact confirmed; WhatsApp TODO(client) |
| Abu Dhabi | +971 2 491 4919 | info.auh@dm-consultant.com | Al Salam St, Salam HQ Bldg, Office 1802, Abu Dhabi | +971 54 441 0905 (alt +971 50 953 1456) | contact confirmed; WhatsApp TODO(client) |
| Qatar | +974 4436 7929 | info@dm-consultant.qa | Office 301, Abdul Jaleel Abdul Ghani Bldg, Al Matar St, Doha | none found | contact confirmed |
| Kuwait | +965 5515 4110 | info@dm-consultantkuwait.com | Orient Complex, Salmiya, Kuwait | none found | contact confirmed |
| India | +91 99720 11342 | info.bglr@dm-consultant.com (bglr vs Hyderabad — TODO(client)) | UMA Plaza, Nagarjuna Hills, Hyderabad | +91 90365 54740 | contact confirmed; WhatsApp + email TODO(client) |
| Sharjah | +971 6 550 8707 | (not in v1 market scope) | — | — | not in v1 |

Other legacy branch references (NOT v1 offices; do not publish as offices without confirmation): Muscat, Riyadh, Jeddah, Toronto, Pune, Bangalore, Mumbai, Chennai, Poland. India legal entity on .in domain: "Didactic Migration Consultants Pvt Ltd, rep. Chetan Kumbhar, Pune" — verify relationship with client.

## 8. Press / social (candidate)
- Forbes India brand-connect article: `https://www.forbesindia.com/article/brand-connect/navigating-immigration-in-the-21st-century-with-dm-immigration-consultants/69399/1` — verify still live + approval before use.
- s3.amazonaws.com column: "how-to-deal-with-a-foreign-workforce-post-pandemic" — verify.
- Social: Instagram `dm_consultantsgcc`, Facebook `DMImmigrationConsultantsDubai`, YouTube `c/DMImmigrationConsultants` — candidate for footer links (env-config).

## 9. Not to carry forward
Claims requiring client proof before publication: success percentages, approval counts, rankings, Google ratings, "ICCRC-approved" wording (regulator now CICC/College of Immigration and Citizenship Consultants), guarantees, "certified" generic claims, "British Council partner / in-house IELTS centre" (verify — IELTS coaching page blocker), old testimonial wording implying outcomes.

## 10. Outstanding decisions (feed DECISIONS.md)
- MCDII program page disposition (verify current program status).
- Spouse/dependent/NZ-partner/US-dependent visa legacy pages → redirect targets.
- 485 Temporary Graduate, Singapore/Malaysia work visa, Europe skilled pages → redirect targets.
- Schengen + non-v1 visit destinations → hub redirects.
- Spain/Portugal/Malta/Greece residency + extra citizenship pages → hub redirects.
- Sharjah office data → exclude from v1 (5-market scope).
