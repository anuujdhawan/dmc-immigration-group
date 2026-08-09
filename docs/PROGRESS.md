# Progress — DMC Immigration Group

Living checklist. Update after every meaningful batch. Never delete completed history.

Last updated: 2026-08-09

## 2026-08-09 — Lead form email fixed: Resend sandbox only delivers to dmcimmigrationgroup@gmail.com

- Reported: submitting the landing-page lead form shows "Failed to send enquiry email. Please try again or contact us directly." on every page.
- Root cause: the Resend API key is valid but the account is in **sandbox mode** — Resend only delivers to the account owner's verified inbox `dmcimmigrationgroup@gmail.com`. The lead forms were sending to `dmcimmigrationglobal@gmail.com` (all five `DMC_<MARKET>_LEAD_TO_EMAIL` + `RESEND_REPLY_TO_EMAIL`), which is unverified → Resend returns HTTP 403 `validation_error` → `sendViaResend` returns false → the form surfaces the generic failure message. Confirmed directly against the Resend API: send to `dmcimmigrationglobal@gmail.com` → 403; send to `dmcimmigrationgroup@gmail.com` → 200 (`id` returned).
- Fix (env only, no code change): pointed `RESEND_REPLY_TO_EMAIL` and all five `DMC_<MARKET>_LEAD_TO_EMAIL` at `dmcimmigrationgroup@gmail.com` in the active root `.env`; mirrored the confirmed recipient + sandbox-mode note into the committed `.env.example` (the "Lead-recipient emails NOT confirmed" TODO comment is now resolved). `DMC_CHATBOT_LEAD_TO_EMAIL` already targeted `dmcimmigrationgroup@gmail.com`. `from` stays `DMC Website <onboarding@resend.dev>` (sandbox requires it).
- Validation: `npm run typecheck` ✓; `npm test` ✓ 73/73. Live Playwright probe on `/dubai/visas/australia/pr-services` (real `submitLead` fired against the dev server): filled name/phone/email + dropdowns + consent → navigated to the thank-you page, zero console errors. Once a sending domain is verified in Resend, recipients can be widened by editing `.env` only.

## 2026-08-09 — Landing forms: skilled-migration eligibility gate (45+ / 12th)

- Reported: on all landing-page forms, whoever selects age `45+` OR education `12th` in the dropdowns must NOT be allowed to submit — show the message “To qualify for Australia Skilled Migration, you need a minimum of a diploma or bachelor's degree and must be under 45 years of age.” below the form.
- Implementation (single place — every landing page shares `LandingLeadForm`): added `ELIGIBILITY_GATE_MESSAGE` + `failsEligibilityGate()`; `onSubmit` now returns early (no `submitLead` call, no thank-you navigation) when `ageRange === "45+"` or `education === "12th"`, setting the existing `status === "error"` alert slot below the fields to that message. Covers all 4 landing routes (`/dubai|abu-dhabi/visas/{australia,canada}/pr-services`); the shared site `LeadForm` is untouched (its age options are 18-24…55+, not `45+`).
- Validation: `npm run typecheck` ✓; `npm run lint` ✓; `npm test` ✓ 73/73. Playwright probe on the Australia + Canada Dubai landing pages: selecting `45+` (or `12th`) and submitting shows the exact message and never navigates; zero console errors. (Only blocked paths probed — the valid path would fire `submitLead`.)

## 2026-08-09 — Guided chat enabled on the landing pages

- Reported: add live chat to the DMC landing page as well — not just the thank-you page.
- The landing chrome in `src/app/[market]/layout.tsx` previously rendered `<MarketFloatingWidgets market={market} showChat={false} />` (WhatsApp bubble only, guided chat deliberately excluded so the visitor completed the lead form). Removed the `showChat={false}` so all 4 landing pages (`/dubai|abu-dhabi/visas/{australia,canada}/pr-services`) now render the guided-chat bubble (bottom-left) alongside the WhatsApp bubble (bottom-right), matching the thank-you routes. `MarketFloatingWidgets` keeps its `showChat` toggle (default `true`) and `GUIDED_CHAT_ENABLED` still gates chat globally; prop doc comment updated.
- Validation: `npm run typecheck` ✓; `npm run lint` ✓; `npm test` ✓; Playwright probe on `/dubai/visas/canada/pr-services` at 390px + 1440px: `.rcb-toggle-button` (guided chat) and the WhatsApp bubble both present, zero console errors.

## 2026-08-09 — Sitewide: light-green hero + leaves treatment applied to every page

- Reported: apply the homepage hero's mobile/tablet treatment — plain light-green background with ONLY the floating leaves animation — to the hero section of every page of the website.
- Implementation: the `alternative-hero` class moved into the base `Hero` component (`src/components/home/Hero.tsx`), so every page using `Hero` (homepage, landing pages, ProgramPage, ExpressEntryPage, all Canada/Australia/UK internal program pages) now shows the light-green band + leaves on `<=1023px` and keeps the full botanical gradient + orbit animation on desktop — no component changes needed on those pages.
- Cleanup of the A/B scaffolding: `HomeSections.tsx` reverted from `AlternativeHero` to `Hero`; `LandingPage.tsx` switched from `AlternativeHero1` to `Hero`; deleted `src/components/home/AlternativeHero.tsx` and `AlternativeHero1.tsx`; removed the dead `.alternative-hero-1` dark-green mobile block from `globals.css`; `.alternative-hero` CSS comments updated (no longer TEMPORARY — now the standard sitewide mobile/tablet treatment).
- Tool pages: `ToolPage.tsx` hero band converted from the dark `bg-aurora-bg` band to the same light-green botanical gradient with floating leaves (`#fafaf5 → #eff6ec → #dff3da`, `overflow-hidden`, `isolate`), text colors flipped to the light palette (brand-600 eyebrow, charcoal title, muted lede).
- Extracted the leaf field into a shared `src/components/ui/FloatingLeaves.tsx` (used by `Hero` and `ToolPage`) so the `.leaf-1…7` markup + LEAF_SVG live in one place.
- Validation: `npm run typecheck` ✓; `npm test` ✓ 73/73; `npm run lint` ✓ 0 errors (12 pre-existing warnings, none in touched files). Playwright probe at 390/768/1440px across home, express-entry, program (PNP), landing, and tool URLs: mobile/tablet all show the light-green band (`#dff3da`, 74/150px split), 7 leaves animating, orbit stage + sun-rays `display:none`; desktop keeps the full botanical radial gradient with stage and rays visible. Zero console errors on every probed page.

## 2026-08-08 — websiteData: extracted all 132 UAE legacy page datasets from dm-consultant.ae

- Created `websiteData/` with one markdown file per page (133 files incl. `README.md` index), covering exactly the **132 legacy URLs** listed in the UAE sheet's "Old Full URL" column of `DMC_Legacy_URL_to_New_Menu_Mapping_WebsiteWise.xlsx`.
- Each file follows the sample brief structure (HERO → SECTIONS → FAQ → FORMS → CTA), starts with a **Source page URL** line, and includes the sheet's mapping metadata (old nav path, new top-nav menu, new submenu, notes) plus meta description and breadcrumbs when present.
- Data extracted verbatim from the live site (fetch with cache + retry; Elementor DOM parsed with Python stdlib; FAQ from JSON-LD; CF7 form fields captured). Sitewide chrome (header, popups, footer nav, news/blog widgets, testimonial strips) filtered out; duplicate Elementor panes and duplicate CF7 forms deduped.
- Crawler lives outside the repo (`/tmp/extract_dmc.py`); only the output folder was committed to the project.
- Validation: 132/132 URLs extracted, 0 failures; all files contain the source-URL header; the four student-visa pages are genuinely thin on the live site (only an H1 exists there).

## 2026-08-08 — websiteData: extraction extended to ABU DHABI, KUWAIT, QATAR, INDIA markets

- Extended the per-market extraction (same tag-annotated format as UAE) to the other four sheets of `DMC_Legacy_URL_to_New_Menu_Mapping_WebsiteWise.xlsx`, writing into `websiteData/<MARKET>/` folders the user created: ABU DHABI (42 URLs, dm-consultantabudhabi.com), KUWAIT (61, dm-consultantkuwait.com), QATAR (61, dm-consultant.qa), INDIA (75, dm-consultant.in).
- Each market folder mirrors the UAE layout: `README.md` (URL→file index), `index.md` (homepage), `pages/…` (one file per URL, path mirrors URL), all with **Source page URL** at top, sheet mapping metadata, and HTML-tag annotations (`<h2>`, `<p>`, `<li>`, `<a href>`, `<input>`, `<select>`, FAQ `<h4>`/`<p>`).
- Per-market `URLS-NOT-IN-SITEMAP_<MARKET>.md` built from each site's own sitemap: ABU DHABI 11, KUWAIT 2, QATAR 9, INDIA 3 URLs not in their sitemaps.
- QATAR: `residency-by-investment/` and `citizenship-by-investment/` return HTTP 404 on the live site — stub files created in the QATAR folder clearly marking them as not-extractable (page missing on qatar site); noted in the not-in-sitemap file.
- Validation: all markets extracted with 0 fetch failures except the two QATAR 404s (stubbed); sample files from each market verified (source URL, sheet meta, tag annotations present).

## 2026-08-06 — AlternativeHero1: white glow around green hero text removed

- Reported: in AlternativeHero1's mobile dark hero the green text ("better future" accent) has a white border/glow around it that looks bad.
- Root cause: mobile-only base rules put a WHITE text-shadow on the hero copy — `.botanical-hero-title { text-shadow: 0 1px 0 rgba(255,255,255,.94), 0 0 20px rgba(250,249,245,.76) }` and the same white glow on `.botanical-hero-subtitle` / `.botanical-proof-row` / `.botanical-disclaimer` (globals.css ~11131 / ~10948). Invisible on the original light band, but on the dark green background it rendered as a white halo around the green text.
- Fix: added `text-shadow: none !important` for `.alternative-hero-1 .botanical-hero-title`, `.botanical-hero-subtitle`, `.botanical-proof-row`, `.botanical-disclaimer` inside the existing dark-theme mobile block.
- Validation: `npm run typecheck` ✓; `npm test` ✓ 73/73. Playwright probe (AlternativeHero1 temporarily wired, then reverted): computed text-shadow = none on all five elements, zero console errors. Pixel analysis of the fresh screenshot: the green accent band (y 572–640) has 0 white pixels nearby (was 14.3% in the user's screenshot). `globals.css` re-synced to the main project folder (`diff` verified identical). Temp files removed.

## 2026-08-06 — AlternativeHero1: checker texture removed

- Reported: remove the checker (checkerboard) texture from the mobile view of AlternativeHero1.
- Removed the `.alternative-hero-1-checker` div from `src/components/home/AlternativeHero1.tsx` and all three checker CSS blocks from `src/app/globals.css` (the base `display:none` rule, the mobile show block with the `repeating-conic-gradient`, and the dark-theme white-grid restyle). Comments updated. The dark-green mobile theme itself is untouched.
- Validation: `npm run typecheck` ✓; `npm test` ✓ 73/73; dev-server compile clean; `grep -c checker` = 0 in globals.css (the only remaining match in the component is the unrelated eligibility-checker tool link). `globals.css` + `AlternativeHero1.tsx` re-synced to the main project folder (`diff` verified identical).

## 2026-08-06 — AlternativeHero1: dark-green hero theme on mobile only

- Reported: apply a dark-green hero section (like the 'dark hero' reference image) to AlternativeHero1 in mobile view only; desktop stays as-is.
- Implementation (all in a scoped `@media (max-width: 1023px)` block appended to `src/app/globals.css`, targeting `.alternative-hero-1` only):
  - Section background becomes a dark forest-green gradient (`#142f0b → #1b4011 → #2a571b`) + subtle radial highlight, with `!important` so it beats the earlier `.alternative-hero` light-band rule (both are single-class + `!important`, later in file wins).
  - Text flips to white/light: license pill, overline (`#9fd98a`), title (`#fbfef9`), accent span (`#7ed957`), subtitle, proof stats, disclaimer (`rgba(243,250,240,.62)`), scroll cue.
  - Buttons: primary becomes bright green (`#7ed957 → #45b318`) with dark text; secondary becomes a light outline chip (no backdrop blur).
  - The default translucent-WHITE text card (`.botanical-hero-copy::before`) was washing the dark background out (verified by pixel sampling — hero rendered mid-light green) — replaced with a dark translucent panel.
  - The light-warm 125px bottom fade (`.botanical-hero::after`) is hidden on the dark theme.
  - The checker overlay becomes a barely-there white grid texture.
- Desktop (>1023px) and Hero/AlternativeHero are completely untouched (scoped to `.alternative-hero-1` only, which is still NOT wired anywhere — applied manually).
- Validation: `npm run typecheck` ✓; `npm test` ✓ 73/73. Playwright probe at 390×844 (AlternativeHero1 temporarily wired in, then reverted): computed styles all dark/white, `::after` display none, checker block, stage hidden, zero console errors; pixel point-samples of the screenshot show deep greens `rgb(24-37,49-62,15-30)` with white title text; desktop 1440×900 shows the original light botanical gradient unchanged. `globals.css` + `AlternativeHero1.tsx` re-synced to the main project folder (`diff` verified identical). Temp probe files removed.

## 2026-08-06 — Chat bubble vs WhatsApp bubble: base alignment on mobile

- Reported: on mobile the chat bubble (bottom-left) and the WhatsApp bubble (bottom-right) sit at different heights; they should share the same base position.
- Root cause: `WhatsAppLauncher` uses Tailwind `max-sm:bottom-4` (16px below 640px, 24px above), while the chat toggle `.rcb-toggle-button` was pinned at `bottom: 24px` at every width. Measured in the client screenshot: chat visible bottom 55px from screen bottom, WhatsApp 40px — a 15px gap.
- Fix in `src/components/chat/DmcGuidedChat.tsx`: new `@media (max-width: 639.98px)` rule sets `.rcb-toggle-button { bottom: 16px !important }` (639.98px to match Tailwind's `max-sm` exactly, so the 640px edge case can't desync). Desktop unchanged (both bubbles at 24px, already aligned).
- Validation: `npm run typecheck` ✓; `npm test` ✓ 73/73. Playwright probe at 390×844 / 600×900 / 1440×900 after the entrance animation settles: both buttons 56×56, bottoms identical at every width (828/884/876) — `aligned: true`, zero console errors. Pixel-sampled the phone screenshot: chat green bottom 1650 vs WhatsApp 1654 device px (≈same baseline). `DmcGuidedChat.tsx` re-synced to the main project folder (`diff` verified identical). Temp probe files removed.

## 2026-08-06 — Mobile chat: send button pushed off-screen by browser chrome

- Reported: on a client's mobile phone browser the chat bot window's send button "goes outside" (the input row is not visible — it sits behind the browser's bottom toolbar; same root cause hides it behind the on-screen keyboard).
- Root cause: the chat window is `position: fixed` full-screen, but `height: 100%` resolves against the layout viewport, which on mobile browsers is the full screen INCLUDING the area behind the browser chrome. The window's bottom (input row + send button) therefore extends behind the toolbar/keyboard.
- Fix in `src/components/chat/DmcGuidedChat.tsx` (mobile `@media (max-width: 480px)` block): the window is now anchored `top: 0 !important` and uses `height: 100dvh !important` (after the `height: 100% !important` fallback), so it tracks the dynamic viewport — the visible area as the toolbar collapses/expands and as the keyboard opens. Also added `min-width: 0 !important` + `box-sizing: border-box !important` to `.rcb-chat-input-textarea` so the flex textarea can shrink and can never push the send button out of the window's right edge on narrow screens.
- Validation: `npm run typecheck` ✓; `npm test` ✓ 73/73. Playwright probe at 390×844 / 360×640 / 390×600: window = viewport (0..height), input row + send button fully inside and on-screen, `CSS.supports('height','100dvh')` true, zero console errors from the app. Pixel-sampled the screenshot: green send button rendered at its expected rect (336–374 × 791–829 CSS px at 390×844). `DmcGuidedChat.tsx` re-synced to the main project folder (`diff` verified identical). Note: headless can't emulate the toolbar/keyboard, so a real-device check of the keyboard-open case is recommended (dvh shrinks with the keyboard on modern Chrome/Safari). Temp probe files removed.

## 2026-08-06 — AlternativeHero/AlternativeHero1: orbit animation removed on mobile

- Reported: the hero section animation should not show on mobile screens in either AlternativeHero or AlternativeHero1.
- Since both sections carry the `.alternative-hero` class, a single scoped rule inside the existing `@media (max-width: 1023px)` block in `src/app/globals.css` hides `.alternative-hero .botanical-network-stage` (`display: none !important`) on phones and tablets; desktop keeps the full orbit animation. No component changes needed.
- Validation: `npm run typecheck` ✓; `npm test` ✓ 73/73. Playwright probe: stage `display:none` at 390×844 and 820×1180, `display:block` at 1440×900, zero console errors. Screenshot reviewed. `globals.css` re-synced to the main project folder (`diff` verified identical). Temp probe files removed.

## 2026-08-06 — AlternativeHero1 checkbox-pattern variant (manual apply only)

- Added `src/components/home/AlternativeHero1.tsx` — a copy of `AlternativeHero.tsx` (renamed component/props, extra `alternative-hero-1` class, plus a `<div className="alternative-hero-1-checker" />` overlay). On mobile it inherits the plain light-green band AND adds a checkerboard (checkbox) pattern over that background color.
- Scoped CSS at the end of `globals.css`: on `max-width: 1023px`, the checker overlay spans from `--alt-hero-split` (74px phones / 150px tablets, matching the band) to the section bottom, `z-index: 0`, `pointer-events: none`, `repeating-conic-gradient` 26px cells (`--alt-hero-checker-color`/`--alt-hero-checker-size` vars for tuning); hidden on desktop. Decorative hero layers stay hidden on mobile per the existing `.alternative-hero` rules.
- NOT wired anywhere — user applies manually. File comment warns it shares DOM ids with Hero/AlternativeHero and must swap, not stack (duplicate `getElementById`/SVG def ids would break the second hero).
- Validation: `npm run typecheck` ✓; `npm test` ✓ 73/73. Temporarily swapped into `HomeSections` for a Playwright probe (390×844): checker `display:block`, geometry 74→1000 matching the band, `repeating-conic-gradient` computed, zero console errors; 1440×900: checker `display:none`, original gradient preserved. Probe wiring reverted afterwards. Screenshot reviewed in preview.

## 2026-08-06 — AlternativeHero mobile plain-green variant (A/B check)

- Added `src/components/home/AlternativeHero.tsx` — an exact copy of `Hero.tsx` (renamed component, `AlternativeHeroProps`, extra `alternative-hero` class on the `<section>` for CSS scoping). Desktop rendering is byte-for-byte identical to `Hero` (verified: same 3-layer gradient background, same relative orbit stage, same animations).
- On mobile (`max-width: 1023px`), scoped CSS in `src/app/globals.css` gives the hero a plain light-green background (`#dff3da`, matching the botanical palette) starting at the top edge of the animation stage (`--alt-hero-split: 74px`, measured at 390px where the orbit stage begins under the text card) down to the section bottom; the busy decorative layers (`.botanical-hero-bg`, `.botanical-sun-rays`, `.botanical-map-grid`, `.botanical-hero::before`) are hidden on mobile so the band reads as plain.
- `HomeSections.tsx` temporarily renders `AlternativeHero` instead of `Hero` so the change can be checked. Revert the import/usages and delete the component + CSS block once approved.
- Validation: `npm run typecheck` ✓ clean; `npm test` ✓ 73/73. Playwright probe at 390×844: computed `background-image` = linear-gradient split at 74px, decorative layers `display:none`, zero console errors; 1440×900 probe: original gradient preserved, zero console errors. Screenshots reviewed in preview. Temp probe files removed.

## 2026-08-06 — Mobile hamburger menu open jank fix

- Reported: the mobile hamburger menu lagged when opening.
- Root cause: the `.dmc-mobile-menu` panel carried `backdrop-filter: blur(22px)` (+ `-webkit-backdrop-filter`); toggling the full-width panel from `display:none` forces a large-area backdrop-blur recomposite on open, the classic mobile-jank trigger. The panel background is ~98% opaque (`rgba(250,249,245,.98)` final override), so the blur was visually negligible.
- Removed both `backdrop-filter` declarations from the `.dmc-mobile-menu` base rule in `src/app/globals.css` and added a cheap GPU-composited entrance animation (`dmc-menu-in`, 0.16s ease-out, opacity + translateY) so the open feels deliberate without blocking. The `prefers-reduced-motion` global override already neutralises it for reduced-motion users; no `!important` override blocks re-add a blur or animation.
- Validation: `npm test` ✓ 73/73 (typecheck carries 22 pre-existing `PageProps`/`LayoutProps` errors from the base commit — unrelated to this CSS-only change). Playwright probe at 390×844: menu `display:none` → `block`, computed `backdrop-filter: none`, entrance animation applied, 52 links rendered, zero console errors. Temp probe script removed; no stray dev-server processes left on :3100.

## 2026-08-06 — Thank-you card spacing + cube chat bubble

- Reported: the thank-you main card touched the navbar (measured 0px gap at 390px, -6px at 1440px — the card was tucked under the fixed header), and the guided-chat bubble should be cube-shaped with the icon not cropped.
- `ThankYouPage.tsx` section padding changed from `py-24 md:py-36` to `pb-24 pt-40 md:pb-36 md:pt-48` — the card now sits 64px (mobile) / 94px (tablet) / 42px (desktop) below the fixed header bottom (was 0 / 46 / -6).
- `DmcGuidedChat.tsx` chat button: `border-radius: 12px` (cube instead of the library's `border-radius: 50%` circle) on both `.rcb-toggle-button` and `.rcb-toggle-icon`, and the icon now uses `background-size: contain` + `no-repeat` + `center` (the library default was `cover`, which cropped the speech-bubble icon inside the 56px button).
- New regression assertions in `tests/e2e/chat-options-probe.spec.ts`: bubble width/height 56px, `border-radius 12px`, icon `background-size contain` + `no-repeat`, and the thank-you card clearing the header by >16px.
- Validation: `npm run typecheck` ✓, `npm run lint` ✓ (0 errors, 12 pre-existing warnings), chat e2e 4/4 ✓.

## 2026-08-06 — Thank-you pages use the market WhatsApp number from .env

- Reported: the thank-you page contact number must be that market's WhatsApp line from `.env`, not the office landline. Both thank-you routes (`/[market]/visas/australia/pr-services/thank-you` and `/[market]/visas/canada/pr-services/thank-you`) now render `office.whatsappDisplay` with a `https://wa.me/<digits>` link when `DMC_<MARKET>_WHATSAPP_E164` is configured, falling back to the office phone (`tel:`) when empty (Kuwait currently has a `TODO(client)` empty value).
- Added `MARKET_DIALING_CODES` to `src/config/markets.ts` (971/971/974/965/91) and made `formatE164Display` in `src/config/offices.ts` country-code aware — it keeps the known dialing prefix together instead of guessing splits (10-digit nationals use 3-3-4 grouping, others group in 3s from the right). `whatsappDisplay` on each `MarketOffice` is now built from the env E.164 + the market's dialing code.
- New `src/config/offices.test.ts` (7 tests): UAE mobile, 3-3-4 grouping, Qatar/Kuwait splits, already-spaced input, dialing-less fallback, empty and non-E.164 passthrough.
- Verified live on all four real routes (landing pages are Dubai/Abu Dhabi only; Qatar/Kuwait/India thank-you routes correctly 404): Canada + Australia thank-you pages render `wa.me/971543219003` (Dubai) and `wa.me/971544410905` (Abu Dhabi) with formatted displays `+971 543 219 003` / `+971 544 410 905`.
- Validation: `npm run typecheck` ✓, `npm run lint` ✓ (0 errors, 12 pre-existing warnings), `npm test` ✓ 73/73, `npm run build` ✓ 421/421 static pages.

## 2026-08-06 — Guided chat: client bubble icon + tooltip hover-only + input hidden until contact questions

- The guided-chat floating bubble now uses the client-approved icon (`public/media/brand/chat-bubble-icon.webp` — two green speech bubbles, transparent background, converted from the supplied PNG via sharp at 256px). `GuidedChatApp.tsx` sets `chatButton.icon` and strips the library's default green gradient (`chatButtonStyle`/`chatButtonHoveredStyle` transparent) so the icon renders cleanly at 56px; the existing CSS keeps sizing and hover shadow.

## 2026-08-06 — Guided chat: tooltip hover-only + input hidden until contact questions

- The "Need help? Chat with us! 💬" tooltip near the chat bubble is now hidden by default and appears only while hovering the bubble (`tooltip.mode` switched CLOSE→NEVER in `GuidedChatApp.tsx`; `DmcGuidedChat.tsx` adds `opacity/visibility/pointer-events` defaults + a `.rcb-chatbot-global:has(.rcb-toggle-button:hover) .rcb-chat-tooltip` reveal rule with a 0.25s fade). Verified by probe (default 0 → hover 1 → leave 0) and locked in with e2e assertions in `chat-options-probe.spec.ts`.

## 2026-08-06 — Guided chat: manual input hidden until contact questions

- The chat now hides the manual answer field for every option-button question and reveals it only when the name/email/phone steps arrive. `src/components/chat/GuidedChatApp.tsx` (new) wraps react-chatbotify's `ChatBot` in `ChatBotProvider` with an `InputRowGate` sibling that uses the library's `usePaths`/`useMessages`/`useSettings` hooks: it sets `general.showInputRow=true` only when the current flow block is `ask_name`/`ask_email`/`ask_phone` AND that block's question message has actually been delivered (fragment match against the bot message), so there is no input flash during the typing transition after the final option click. The gate is driven by `CONTACT_QUESTION_FRAGMENTS` exported from `src/config/guided-chat.flow.ts` so copy lives in one place.
- `DmcGuidedChat.tsx` now dynamically loads the app wrapper (still `ssr:false`, keeping the heavy library client-only) and keeps all global CSS overrides; the toggle button is explicitly sized to 56px (library default was 75px) and the tooltip nudged to hug it.
- `tests/e2e/chat-options-probe.spec.ts` walks the full Canada PR flow on desktop + 390px: no textarea during every option step, textarea appears for name/email/phone, and disappears after the end message; test waits for each question text before typing to avoid racing the bot's 1s typing delay (the old rapid fills dropped sends). 4/4 chat e2e pass; full suite green (66 unit, 25 console/homepage/content, 36 routing, 14 landing).

## Completed

## 2026-08-05 — Market-aware copy across the whole site (market name from the URL)

- New `src/lib/i18n/market-copy.ts`: natural market phrases (`marketIn`, `marketFrom`, `marketFor`, `marketAudience`, `marketOffice`) plus `interpolateMarket()` (replaces `{market}` / `{marketIn}` / `{marketFrom}` / `{marketFor}` / `{marketAudience}` / `{marketOffice}` tokens) and `marketContextSentence()` / `paragraphsForMarket()` (weave a market line into page copy).
- Homepage now visibly serves the market from the URL: hero reads exactly "Your journey towards a better future from Dubai begins here." (new `titleSuffix`/`titlePrefix` via `HomeSections`), and every home section takes `market` — Recognition band ("DMC Dubai · Regulated & Recognised By" + serving line), Services, Countries, Why DMC (new local-teams pillar), Credentials, Visit Visas, Tools, Process, Stats band (market caption), Stories, Video Stories, Resources, FAQ (new "Can I meet the team in Dubai?" question), Contact CTA, and the footer ("serving clients in the Dubai market and beyond").
- Content pages (`ProgramPage` renderer) deep-interpolate every content string and prepend "Prepared for clients in the {market} market and supported by our {market} office." to the first overview/lead paragraph; hero already states "This page is written for the {market} market." and breadcrumbs already show the market.
- Bespoke Canada/Australia/UK internal pages: overview sections now run through `paragraphsForMarket`, and `LeadFormSection`, `FinalCta`, `ConsultationBand`, `FaqSection`, and `MediaGallerySection` interpolate market tokens (market prop threaded at ~20 call sites).
- Content registries: tokenised flagship copy — Canada Express Entry FAQ questions/answers ("Can residents apply for Canada PR from Qatar?"), Australia 189 FAQ ("Can I apply for the 189 from Kuwait?"), UK Skilled Worker FAQ, and the Contact page overview. `ToolPage` hero/lede/lead-form copy is market-aware.
- Verified live on `/dubai`, `/kuwait/visas/australia/skilled-independent-189`, `/india/visit-visas/canada-usa-australia`, `/abu-dhabi/visas/canada/provincial-nominee-programs` (13/11/9/11 market mentions per page respectively).
- Hardening from review: the market context sentence is woven exactly once per content page (first overview-or-lead section only), `ProgramPage` reuses the shared `paragraphsForMarket` helper (no duplicated logic), and new tests cover the token engine — `src/lib/i18n/market-copy.test.ts` (longest-token-first matching, unknown tokens preserved, prepend/skip branches) plus a content-registry guard asserting no `{market}` token can leak through non-interpolated render paths.
- Validation: typecheck ✓, lint ✓ (0 errors, 12 known `<img>` warnings), unit **66/66** ✓, e2e **68/68** ✓ (homepage, content-pages, landing-dropdown, routing), `npm run build` ✓ (421 static pages).

## 2026-08-05 — Hero top-offset fix on content pages

- ProgramPage wrapped every content page in `pt-[calc(var(--header-offset)+1rem)]` (134px desktop / 104px mobile), pushing the entire hero section down on every content-driven page while the homepage and bespoke Canada/Australia/UK pages started at `top: 0`. Since the hero's own padding-top (158px desktop / 91px mobile) already clears the fixed header, the wrapper padding was redundant — removed it so content pages now match the homepage exactly.
- Measured with a Playwright probe across 12 representative URLs (homepage, ProgramPage content/hub pages, bespoke EE/Canada/Australia pages, landing pages, tool hubs, contact, about) at 1440px and 390px: every page now starts its hero at `top: 0` with the h1 at 252px (desktop) / 181px (mobile) — consistent across the whole site. Screenshot-verified the India visit-visas hub on mobile: pill + heading + intro sit directly under the fixed header, no white gap.
- `npm run typecheck` ✓, e2e homepage + content-pages ✓ (18/18). Note: `[market]/tools/<tool>` routes still 404 — the tool-route files were left uncreated when the 16-tool batch was interrupted (registry + components + resolver exist in `src/config/tools.ts` / `src/components/pages/tool-resolver.tsx`); the homepage Tools cards link to two of them today.

## 2026-08-05 — Campaign landing pages (Dubai + Abu Dhabi PR)

- Built 4 conversion landing pages from the client's docx briefs (`dmc _ <market> - <destination> PR.docx`):
  - `/dubai/visas/australia/pr-services` and `/dubai/visas/canada/pr-services`
  - `/abu-dhabi/visas/australia/pr-services` and `/abu-dhabi/visas/canada/pr-services`
  - plus a `/thank-you` child route under each. URLs stay in harmony with the canonical route families (`/[market]/visas/<destination>/pr-services`).
- Registry `src/config/landing-pages.ts` (ids, `LANDING_MARKETS` = dubai/abu-dhabi, path helpers); content `src/content/landing.ts` (typed per-destination/per-market copy from the briefs; localises city, office bullets, FAQ geography, phone, and the Dubai-Canada Express Entry + PNP sections vs Abu Dhabi-Canada combined Pathways section).
- Distraction-free chrome: `LandingHeader` (logo + trust chips + in-page CTA + phone — zero outbound links) and `LandingFooter` (logo, tagline, disclaimer, non-link legal labels). `ChromeSwitcher` (client, `usePathname`) in `[market]/layout.tsx` renders landing chrome ONLY on the exact landing paths; the thank-you routes use the normal `SiteHeader`/`SiteFooter`/floating widgets.
- Landing page uses the shared `Hero` component (new optional `titleSuffix` prop, default unchanged) + `LandingPage` renderer (form band, social proof strip, why/eligibility/benefits/pathways/points/occupations/process/why-DMC/testimonials/FAQ/final-CTA sections). Testimonials stay as the site's truthful "being verified" placeholders.
- `LandingLeadForm` implements the brief's exact fields (name/phone/email, age 18–45/45+, qualification 12th→PhD, work experience 0–2/3–5/5+ yrs, preferred office) and redirects to the thank-you page on success. `workExperience` added to `leadSchema` + Resend email + CRM payload.
- Fixed a latent lead-form bug: react-hook-form v7 stores checkbox values as booleans, so `consent` arrived as `true`/`false` and failed `z.string()` (`"on"`) validation on every site form. Added `value="on"` + a normalization guard in both `LeadForm` and `LandingLeadForm`.
- Thank-you pages are noindex, render the normal site chrome, and have no hero. Landing pages are indexed and added to `sitemap.ts`.
- Follow-up: the landing form's Preferred Office dropdown now lists all five DMC markets (Dubai, Abu Dhabi, Qatar, Kuwait, India) instead of only the two UAE offices — landing market listed first via `preferredOfficesFor()` in `landing.ts`; unit test updated to assert 5 options.
- Verification: `npm run typecheck` ✓, `npm run lint` ✓ (0 errors, 13 pre-existing warnings), `npm test` ✓ 51/51, `npm run build` ✓ 421/421 static pages. Live dev-server checks: landing chrome on landing pages, normal chrome on thank-you; form submit → thank-you redirect works (Resend/CRM disabled return success); zero console errors; only in-page `#free-assessment`/`#points` anchors + one `tel:` link on the landing page.

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

- Reusable internal-page rollout expanded beyond Express Entry:
  - Added `src/components/pages/internal/InternalPageTemplate.tsx` as the shared internal-page system and moved the Express Entry route onto that extracted component layer instead of keeping the entire template inline on one page.
  - Added `src/components/pages/CanadaInternalProgramPages.tsx` to hold the next Canada template pages built from the same internal building blocks, including shared breadcrumbs, facts bar, anchor nav, split hero-content section, lead form band, FAQ block, source cards, and closing CTA.
  - Added dedicated market routes for:
    - `src/app/[market]/visas/canada/provincial-nominee-programs/page.tsx`
    - `src/app/[market]/visas/canada/atlantic-immigration-program/page.tsx`
  - Both new pages now use the same internal-page component family as Express Entry while keeping market-aware phone/CTA context from the office registry.
  - Express Entry follow-up fixes included market-aware FAQ JSON-LD, market-aware consultation copy, and the adjusted breadcrumb/facts/anchor/content stack spacing under the shared fixed header.
  - Development-mode responsive verification completed against the live dev server at `http://localhost:3001` for:
    - `/dubai/visas/canada/express-entry`
    - `/dubai/visas/canada/provincial-nominee-programs`
    - `/dubai/visas/canada/atlantic-immigration-program`
  - Widths checked: `768x1024` (tablet) and `390x844` (mobile).
  - Results: no horizontal overflow on any checked page; breadcrumb/facts/anchor stack renders below the fixed header at both widths; visual spot-check screenshots looked consistent with the template-derived layout.
  - Known follow-up still pending: the centralized template media inside `src/components/pages/internal/InternalPageTemplate.tsx` still uses `<img>` tags and continues to emit the expected `@next/next/no-img-element` lint warnings until the image pass migrates them to `next/image` or approved optimized local assets.

- Homepage credentials section density pass completed:
  - `src/components/home/CredentialsSection.tsx` now uses a fuller dark-left panel with an added proof card, a verification-trail panel, and smaller trust chips at the bottom so the section feels intentional instead of empty.
  - `src/app/globals.css` now widens the proof stack/assurance blocks and turns the proof stack into a two-column desktop layout so the dark green section reads as a complete band on desktop and mobile.
  - Follow-up tweak: the verification mini-cards and trust chips now use darker text on lighter green-white cards, and the trust-chip row sits before the reassurance copy as requested.
  - Follow-up fix: the verification-trail and trust-chip text now has explicit scoped contrast overrides so it does not inherit the dark-band white text rules.
  - Latest spacing pass: the proof cards, verification-trail cards, and trust-chip cards now have more even internal padding, consistent minimum heights, and slightly larger gaps so the dark band feels more elegant and symmetrical.
  - Verification: `npm run typecheck` ✓, `npm run lint` ✓ with the same pre-existing `<img>` warnings in `src/components/pages/ExpressEntryPage.tsx`.

- Homepage resources section parity completed:
  - `src/components/home/ResourcesSection.tsx` now mirrors the approved template structure more closely with a template-style heading block, per-card CTAs, and a non-clickable article/card pattern instead of the earlier fully clickable tiles.
  - `src/app/globals.css` now adds a scoped `#resources.template-resources` override so the homepage resources grid stays in the site’s soft green gradient language and picks up the same hover lift/shimmer feel as the other homepage cards.
  - Verification: `npm run typecheck` ✓, `npm run lint` ✓ (7 pre-existing `<img>` warnings in `src/components/pages/ExpressEntryPage.tsx`; no new errors from this batch).

- **Express Entry template parity batch completed**: exact CSS + HTML replication from the approved `DMC_Express_Entry_Mobile Responsive(2).html` template:
  - Extracted all three EE-specific CSS layers (`ee-page-styles`, `dmc-express-editorial-responsive-v5`, `dmc-express-image-stability-v1` — ~64KB total) into `src/app/globals.css`, scoped under `.ee-page` / `#express-entry-content` selectors.
  - Created `src/components/pages/ExpressEntryPage.tsx` — a client component that renders the template's exact HTML structure (breadcrumb, facts bar, sticky anchor nav, benefits split, lead form, programs grid, overview split, eligibility + score card, CRS calculator, documents grid, process dark, consultation band, guidance panel, evidence grid, roadmap, FAQ accordion, blog grid, story carousel, disclaimer, CTA). Interactive FAQ accordion and story carousel use React state.
  - Created dedicated route at `src/app/[market]/visas/canada/express-entry/page.tsx` — takes precedence over the catch-all `[...segments]` route for this path. Generates static params for all 5 markets. Uses `ExpressEntryPage` component directly.
  - Verification: `npm run typecheck` ✓, `npm run lint` ✓ (0 errors, 7 `<img>` warnings for external template images), `npm run build` ✓ (411 static pages / both catch-all and specific EE routes generated).
  - The catch-all route still exists for all other content pages; the specific EE route shadows it for `/visas/canada/express-entry` only.

- Shared hero component batch completed:
  - `src/components/home/Hero.tsx` is now the reusable botanical hero shell for the homepage and the content pages.
  - `src/components/pages/ProgramPage.tsx` now passes page-specific eyebrow, title, lede, CTA labels, and a scroll cue that points to the first content section, so the existing pages all share the same hero structure instead of the older plain content-page header.

- Internal page expansion batch completed:
  - `src/content/pages/site.ts` now carries the market-aware content for the dropdown/menu pages and uses Tailwind-heavy card and link layouts while preserving the existing shared CSS stack.
  - `vitest.config.ts` now aliases `server-only` for tests and loads placeholder env values from `.env.example`, which keeps the server boundary intact while allowing the registry tests to import office data.

- Internal page template batch completed:
  - `src/components/pages/ProgramPage.tsx` now supports the Express Entry reference layout with shared facts, split-media, lead-band, cards, FAQ, disclaimer, and a stronger closing CTA, while keeping the old-site media/content adapted to the new market-aware shell.
  - The Express Entry page now follows the template cadence much more closely: programs, overview, eligibility, CRS, roadmap, documents, FAQ, news, success stories, disclaimer, then the closing CTA.

- Express Entry template parity follow-up completed:
  - `src/components/pages/ProgramPage.tsx` now renders stronger template-style section treatments for the Express Entry page, including numbered program cards, template-like split sections, a dark CRS/selection-factor panel, and a roadmap grid instead of the earlier plain list.
  - `src/components/pages/SectionNav.tsx` now provides sticky scrollspy-style anchor pills so the in-page nav behaves like the approved internal-page sample.
  - `src/components/layout/MegaNavigation.tsx` now highlights `Visas` on the Express Entry route so the top shell matches the template state.
  - Verification: `npm run typecheck` ✓, `npm run lint` ✓, `npm run build` ✓ (escalated; Turbopack sandbox port/process limitation reproduced without escalation).

- Internal-page hero offset fix:
  - `src/components/pages/ProgramPage.tsx` now wraps the full internal-page content in a top-padded container so the Express Entry page begins under the fixed header instead of at the very top edge of the viewport.
  - Verification: `npm run typecheck` ✓, `npm run lint` ✓ (warnings only from existing `<img>` usage in `src/components/pages/ExpressEntryPage.tsx`).

- Navbar/header parity batch completed:
  - `src/config/navigation.ts` now mirrors the template menu labels and group structure more closely, including the exact dropdown section naming and legal route normalization.
  - `src/components/layout/SiteHeader.tsx` now carries the template-derived header CSS directly in the component via `style jsx global`, so the floating header, plaque/deck/action styling, dropdown treatment, and mobile menu chrome stay self-contained.
- `src/components/layout/MegaNavigation.tsx` and `src/components/layout/MobileNavigation.tsx` already match the template interaction model and were kept aligned with the updated nav registry.
- Verification: `npm run lint -- src/config/navigation.ts src/components/layout/SiteHeader.tsx src/components/layout/MegaNavigation.tsx src/components/layout/MobileNavigation.tsx` ✓, `npm run typecheck` ✓, `npm run build` ✓ (escalated; sandbox Turbopack process-spawn restriction reproduced without escalation).

- Header duplication fixed after the first parity pass: `SiteHeader` now renders separate desktop/mobile shells, `MobileNavigation` no longer carries the shell class, `MegaNavigation` starts at `lg`, and the final `globals.css` override is breakpoint-gated so the desktop header can’t leak into tablet/mobile widths.
- Verification for the follow-up fix: `npm run typecheck` ✓, `npm run build` ✓ (escalated once for the sandbox port/process limitation).
- Navbar follow-up fix: removed the desktop nav's `hidden lg:block` dependency because the recovered stylesheet stack left it visually collapsed at desktop widths, and anchored the mobile dropdown to the full mobile header shell so it opens as a full-width panel instead of a narrow strip beside the hamburger button.
- Verification for the latest navbar fix: live browser reload at `1600x900` shows desktop links visible in the center deck; live browser reload at `390x844` shows the mobile menu opening at full shell width; `npm run typecheck` ✓.
- Shared-layout cleanup: `SiteFooter` legal links no longer use bare `href` keys, which removes the duplicate-key React console warning caused by the `Privacy Policy` and `Cookie Policy` entries sharing the same target route.
- Desktop dropdown alignment fix: removed the extra Tailwind X-translation from `MegaNavigation` and moved dropdown width/transform to a single inline source so the recovered template CSS no longer double-shifts the panel left.
- Verification for dropdown alignment: live browser measurement on `http://localhost:3000/dubai#home` now reports `delta: 0` for Visas, Services, Resources, and Tools, meaning each dropdown center matches its trigger center exactly; `npm run typecheck` ✓.
- Workspace warning cleanup: canonicalized the flagged Tailwind classes in `SiteHeader` and `MobileNavigation`, removed the ignored `vertical-align` declaration from the shared media reset in `globals.css`, and added `.vscode/settings.json` so the editor stops misreporting Tailwind v4 `@theme` as an unknown at-rule.
- Verification for warning cleanup: `npm run typecheck` ✓.
- Hero orbit flag cleanup: removed the dark square outline around the animated flag chips by resetting the parent orbit node button appearance instead of changing the flag span styling.
- Verification for the flag cleanup: live browser inspection now reports `.botanical-network-stage .country-orbit-node` with `appearance: none` and `box-shadow: none`; `npm run typecheck` ✓.
- Mobile/tablet menu alignment cleanup: removed the duplicate JSX `+` from each accordion row in `MobileNavigation`, leaving the existing CSS disclosure marker as the single right-aligned icon.

- **Phase 5 COMPLETE (uncommitted → commit this batch)**: content pages — 60 content pages across 8 group files, ProgramPage renderer, catch-all route, tests:
  - Content registry (`src/content/pages/`): `types.ts` (added `ProgramItem`, `LinkItem`, `programs`/`links` kinds, `anchor` on sections), 8 group files — `canada.ts` (7), `australia.ts` (8), `uk.ts` (2), `visit-visas.ts` (23: directory + 6 hubs + 16 destinations), `business-investment.ts` (9), `study-abroad.ts` (6), `services.ts` (2), `resources.ts` (3). `index.ts` exports `PAGE_REGISTRY`, `PAGE_IDS`, `getPageContent`, `breadcrumbsFor`, `pageTitleForMarket`.
  - Renderer `src/components/pages/ProgramPage.tsx` mapped from the EE template: botanical hero (title split into brand-tinted last word), disclaimer, status banners (e.g. RNIP closed, IELTS pending client), breadcrumbs (crumb prefixes like `/visas` render as plain text — they are not registered pages), sticky anchor nav, alternating white/slate sections, dark aurora process + sources sections, FAQ accordions, related pages/tools cards, CTA band. Official sources + `lastVerified` on every page.
  - Catch-all `src/app/[market]/[...segments]/page.tsx`: `generateStaticParams` from `MARKET_LIST × PAGE_IDS`, `generateMetadata` (seoTitle/seoDescription, canonical from `SITE_URL`, `noindex` when `page.noindex`), `notFound()` for unknown ids.
  - Nav fix: primary "Express Entry" item href `/express-entry` → `/visas/canada/express-entry` (was a dead route).
  - Facts verified via web search this batch: UK Student maintenance £1,529/£1,171 per month (rates from 11 Nov 2025; previous £1,334/£1,023 cited by stale sources), student visa fee £558 (Apr 2026), IHS £776/yr students; Australia 500: GS requirement (replaced GTE Mar 2024), 48h/fortnight term work (unlimited breaks, research uncapped), ~AUD 29,710 funds benchmark; Canada: SDS ended 8 Nov 2024, PAL, 24h/week off-campus, CAD 20,635 (2024–25).
- `study-abroad/ielts-coaching` published **noindex** with honest status banner pending client confirmation of in-house coaching.
- Tests: `src/content/pages/content-registry.test.ts` (8 tests — unique ids, metadata completeness, relatedPages/links-path resolution, relatedTools shape, noindex flag); `tests/e2e/content-pages.spec.ts` (7 tests — hero/sections/sources, FAQ accordion, overflow at 768/390/320, breadcrumbs, all 5 markets, unknown path 404, robots noindex).

## 2026-08-04 — Site pages expansion

- Expanded the shared content registry with the menu-driven internal pages the user called out: `about`, `contact`, `credentials`, `success-stories`, `video-success-stories`, `gallery`, `press-media`, `blog`, `tools`, `tools/eligibility-checker`, `tools/canada`, `tools/australia`, `visas/canada`, `visas/australia`, `visas/uk`, and the legal set under `/legal/*`.
- Kept the shared CSS layers intact while building the new pages with Tailwind-first card/grid layouts in `src/content/pages/site.ts`, and kept every market page explicitly market-aware in the hero copy.
- Added a Vitest env bootstrap that loads placeholders from `.env.example` so server-only content modules can be tested without introducing a second active env file.
- Verification: `npm test` ✓, `npm run lint` ✓, `npm run build` ✓ (escalated for Turbopack's sandbox port-binding restriction).

- **Phase 4 (routing + redirects) complete** — see earlier entry below.
- **Phase 3 COMPLETE**: shared shell + homepage sections built and verified end-to-end:
  - Layout primitives: `Container`, `Button` (primary/dark/outline/white/ghost + sm/md/lg), `SectionHeading`, `AccordionItem` (grid-rows collapse), `Dialog`, `SocialIcon` (hand-drawn SVG paths — lucide-react has no Instagram/Facebook/YouTube exports).
  - Header: `BrandLogo` (header/footer/mark/emblem variants from processed brand assets), `SiteHeader` (utility bar w/ office phone+email, RCIC·MARA·CICC line, socials; sticky bar with logo V1, `MegaNavigation`, `MarketSwitcher`, CTA `max-sm:hidden`), `MobileNavigation` (hamburger→accordion drawer: primary groups, tools, legal; **drawer portaled to `document.body`** — the header bar's `backdrop-blur` creates a containing block for `fixed` descendants, which collapsed the drawer to zero height (`top:88px`+`bottom:0` resolved against the 88px bar); portal + `z-40` fixes it), `MarketSwitcher` (flag icons, market-prefixed nav, cookie via server action `setMarketCookieAction`).
  - Footer: V2 logo, 4-column nav + legal links, per-market office card (`{office.city} Office`, phone `tel:`, email `mailto:`), brand-950 bg.
  - Config: `src/config/credentials.ts` (5 credentials + 2 consultants — all `status: "candidate"` with honest "subject to final confirmation" label until client verifies), `src/config/testimonials.ts` (10 named candidates w/ `sourceUrl`; `approvedTestimonials()` renders ONLY `status === "approved"` quotes; homepage shows truthful placeholders "Client story — being verified").
  - Homepage: `HomeSections` + 13 sections — Hero (stats, aurora bg, CTA), marquee/ticker (5 countries, `@keyframes marquee` + `[mask-image]` fade edges), Services (6 cards), Countries (5 illustrative journeys + network card), WhyDmc, Credentials (dark aurora), VisitVisas (5 featured + "15 more"), Tools (3), Process (5), Stories + VideoStories (truthful placeholders), Resources (8), FAQ (5, accordion), ContactCta. `[market]/layout.tsx` wraps header/main/footer.
- Phase 3 e2e debugging (all three failures resolved):
  1. **Overflow 29px @320** — Services card title row: badge (`shrink-0`, `tracking-mega`) + heading without `min-w-0` → heading couldn't shrink → card overflowed viewport. Fixed with `min-w-0` on the heading.
  2. **Mobile menu "Express Entry"** — test ambiguity: TWO matches (drawer accordion link + Tools card whose accessible name contains "Express Entry" → `.last()` hit `/dubai/tools/canada/crs-calculator`) → scoped to mobile nav; plus drawer visibility bug (above) fixed via portal.
  3. **Footer phone strict-mode violation** — `getByText('+974 4436 7929')` matched utility bar + footer → scoped to `footer`; footer label now `{office.city} Office` (matches "Doha, Qatar Office").

## 2026-08-05 — Lead pipeline + WhatsApp + calculators + SEO batch

- **Phase 7 COMPLETE — Lead pipeline**:
  - Installed `react-hook-form`, `@hookform/resolvers`, `resend`.
  - Created `src/features/leads/schema.ts` — Zod validation schema with honeypot, consent, market-aware fields.
  - Created `src/features/leads/actions.ts` — Server action: honeypot check, server-side validation, Resend email delivery (env-gated, per-market recipient), disabled CRM adapter.
  - Created `src/features/leads/crm.ts` — CRM adapter interface, disabled by default (`CRM_ENABLED=false`), sends normalized payload to configured endpoint.
  - Created `src/components/forms/LeadForm.tsx` — Reusable form component: name, email, phone, destination dropdown (13 options), age range, education, preferred market, message, consent checkbox, honeypot, success/error states, accessible error messages with `aria-live`, loading spinner.
  - All env-backed: `RESEND_ENABLED`, `RESEND_API_KEY`, `DMC_<MARKET>_LEAD_TO_EMAIL`, `CRM_ENABLED`, `CRM_BASE_URL`, etc.

- **Phase 8 PARTIAL — WhatsApp launcher**:
  - Created `src/components/ui/WhatsAppLauncher.tsx` — Floating green button (lower-right), opens 5-market selector panel, env-backed `wa.me` links, prefilled message, hides markets with no number.
  - Created `src/components/layout/MarketFloatingWidgets.tsx` — Server component providing env WhatsApp data to client launcher.
  - Integrated into `src/app/[market]/layout.tsx` — WhatsApp floats on every market page.

- **Phase 9 PARTIAL — Consent manager**:
  - Installed `vanilla-cookieconsent`.
  - Created `src/components/ui/ConsentManager.tsx` — CookieConsent v3 wrapper: necessary/analytics/marketing categories, accept all, save preferences, close, revision support, `dmc-consent-change` custom event.
  - Created `src/components/ui/ConsentProvider.tsx` — Client wrapper.
  - Integrated into `src/app/layout.tsx` — Consent banner loads on every page (disabled by default via `CONSENT_BANNER_ENABLED=false`).

- **Phase 10 PARTIAL — Calculators**:
  - Created `src/components/calculators/CLBCalculator.tsx` — CLB converter for IELTS/CELPIP/TEF scores → CLB levels, 4 abilities, per-ability and overall results.
  - Created `src/components/calculators/FSW67Calculator.tsx` — Federal Skilled Worker 67-point selection factor calculator: age, education, work experience, first/second language, arranged employment, adaptability.
  - Created `src/components/calculators/AustraliaPointsCalculator.tsx` — Australia skilled migration points calculator: age, English, second language, overseas/Australian employment, education, nomination (65-point threshold).
  - All calculators include informational-estimate disclaimers, official source links, and `lastVerified` dates.

- **Phase 13 PARTIAL — SEO**:
  - Created `src/app/sitemap.ts` — XML sitemap: 5 market homepages + all content pages across 5 markets.
  - Created `src/app/robots.ts` — Robots.txt: allow all, disallow `/api/` and `/admin/`, sitemap link.
  - Updated `next.config.ts` — Security headers: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy.

- Dependencies added: `react-hook-form`, `@hookform/resolvers`, `resend`, `vanilla-cookieconsent`.
- Verification: `npm run typecheck` ✓, `npm run lint` ✓ (0 errors, 13 warnings — pre-existing `<img>` + 2 minor unused vars now fixed), `npm run build` ✓ (sitemap.xml + robots.txt now generated), `npm test` ✓ 41/41.

## 2026-08-05 — Destination-appropriate image pass for every internal page

- Every internal page in the navbar dropdown now serves destination-appropriate, locally-hosted images instead of the old reused Canada photos (`canada_image_07.jpg` / `canada_image_7.jpg` / `PR_in_Canada_2.jpg` from `dm-consultant.ae` were being shown on Australia and UK pages too).
- Downloaded **55 licensed free-to-use stock images** (Unsplash, verified HTTP 200 + valid JPEG via `file`) into `public/media/pages/{canada,australia,uk,visit-visas,business,study,services,common}/` — Toronto skyline, Moraine Lake, Niagara, Sydney Opera House/Harbour/Melbourne/outback/kangaroo, Big Ben/Tower Bridge/London, destination cityscapes for every visit-visa page, family/office/study/airport support imagery.
- Added `src/config/page-media.ts` — a central typed registry (`PAGE_MEDIA`, `pageMedia()`) mapping every content-page id to its `split` (hero-adjacent), `process`, `media`, and `extra` images.
- Wired the bespoke internal pages to the registry:
  - `ExpressEntryPage.tsx` (Toronto split, Montreal media, flag process)
  - `CanadaInternalProgramPages.tsx` (PNP: Moraine Lake; AIP: Niagara; RNIP: rural; Study Permits: campus; Family Sponsorship: family)
  - `AustraliaInternalProgramPages.tsx` (189/190/491/191/482/186/858/state nominations — each with country-appropriate imagery)
  - `UKInternalProgramPages.tsx` (Big Ben/Tower Bridge/London street/Thames)
- Updated `canada.ts` content split media to local paths, and wired `ProgramPage` to render a lead-image band from `pageMedia(page.id)` for every content-driven page (visit-visas, business-investment, study-abroad, services, resources, site pages) that lacks an inline split image.
- Verified in the live dev server (`localhost:3000`): no `dm-consultant.ae/wp-content/uploads/2023/12` images remain on any checked page; each page serves its own local image; `npm run typecheck` ✓, `npm run lint` ✓ (0 errors), `npm run build` ✓ (413 static pages), `npm test` ✓ 41/41.

## 2026-08-05 — WebP conversion + reusable gallery system + country-representative imagery

- Converted ALL website raster media to WebP with the `sharp` pipeline — `scripts/convert-images.mjs` + `npm run images:convert` (q80, max 1600px, alpha preserved, originals removed). `public/media/pages` now holds only `.webp` files (78 total); zero `.jpg`/`.png` remain in the page media tree, ~45–55% average size reduction.
- Added reusable image-card components `MediaCard` + `MediaCardGrid` (`src/components/ui/MediaCard.tsx`) matching the template design language: rounded 26px cards, image top with overlaid mono uppercase label pill, brand-tinted title/body copy, hover lift + image zoom, optional link.
- Added `src/config/page-gallery.ts` (`galleryFor(pageId)`) — every internal page resolves a six-card DMC-branded gallery: family sets (Canada/Australia/UK/business/study/visit/services/site), destination-specific travel galleries for visit-visa pages, and exact overrides (Express Entry, Study Permits, Family Sponsorship, Canada visit visa). Every card pairs a local WebP image with copy that justifies both the page topic and the DMC service model.
- Added `MediaGallerySection` to the internal template layer and wired it into Express Entry, all 5 Canada pages, all 8 Australia pages, both UK pages, and `ProgramPage` (every content-driven page) — every navbar dropdown page now displays six themed image cards plus its existing hero/split/process imagery (8+ images per page).
- Corrected country mismatches flagged by the user: AIP split Niagara→Atlantic lighthouse, AIP process→maple leaf; RNIP forest→Canadian small-town main street; Cyprus (was a Greece photo)→Larnaca seafront; Vanuatu (was a New Zealand photo)→South Pacific island; St Kitts (generic)→Caribbean beach. Imagery rule now enforced across the registry: flags, passports, globes/world maps, and famous landmark locations per destination — no generic scenery.
- Verification: `npm run typecheck` ✓, `npm run lint` ✓ (0 errors, 13 known `<img>` warnings in the shared template), `npm test` ✓ 41/41, `npm run build` ✓ 413/413 static pages; live preview spot-checked the AIP lighthouse split and the Australia 189 six-card gallery (SYDNEY / MELBOURNE / HARBOUR LIFE / ICONIC LANDMARKS / WILDLIFE & OUTDOORS / REGIONAL AUSTRALIA), no console errors, all images served 200.

## 2026-08-05 — Resend enabled + UTM/gclid campaign tracking

- `RESEND_ENABLED=true` in the active `.env` with placeholder values (dummy API key `re_replace_with_real_key`, sending domain `example.invalid`, all five `DMC_*_LEAD_TO_EMAIL` recipients set to the dummy `leads@example.com`). The Resend library (`resend`) and per-market recipient resolution were already wired in `submitLead`; this enables the pipeline. Until real values replace the placeholders, form submissions attempt the send and fail with an honest error (verified live: server log shows `[Resend API Error]` from the placeholder key).
- Added `gclid` to `leadSchema` and to the Resend email builder (HTML + text) and CRM payload, alongside the existing `utmSource`/`utmMedium`/`utmCampaign`.
- New `src/lib/utils/url-tracking.ts`: `readUrlTrackingParams()` parses `utm_source`, `utm_medium`, `utm_campaign`, `gclid` from the URL query string; `mergeUrlTracking()` merges them into the submitted lead. Wired into both `LandingLeadForm` and the shared `LeadForm` at submit time (form values win over URL). Unit-tested (3 new tests).
- Verification: `npm run typecheck` ✓, `npm run lint` ✓ (0 errors, 13 pre-existing warnings), `npm test` ✓ 53/53, `npm run build` ✓ 421/421 static pages; browser submit with `?utm_source=google&utm_medium=cpc&utm_campaign=au_pr_launch&gclid=…` in the URL passed validation and reached the live Resend send (rejected on the placeholder key, error surfaced correctly).

## 2026-08-05 — Custom form dropdowns (mobile/tablet open under field)

- Native `<select>` popups are rendered by the OS on mobile/tablet (iOS wheel, Android dialog), which never opens beneath the field. Added a reusable `src/components/ui/FormSelect.tsx` — a custom dropdown (react-hook-form `useController`) that renders an `absolute left-0 right-0 top-full` listbox directly under its trigger on every viewport: chevron state, outside-pointerdown + Escape dismiss, arrow/Home/End + Enter keyboard nav, hover highlight, max-h scroll, error ring, optional clearable placeholder row, `aria-haspopup`/`expanded`/`controls` + `role=listbox/option`.
- Swapped all selects in both forms: `LandingLeadForm` (age range, highest qualification, work experience, preferred office) and shared `LeadForm` (destination, age range, education, preferred office). `required`/`aria-required` deliberately dropped (invalid on a button; the `*` labels convey requiredness).
- New e2e regression spec `tests/e2e/landing-dropdown.spec.ts` — at 390px and 768px viewports, asserts the listbox renders 0–24px below its trigger with aligned left edges, that picking an option updates the trigger and closes the list, and that the office dropdown lists all five markets.
- Review hardening: wrapper closes on `focusout` when focus leaves the component (no stray listboxes on Tab/keyboard-open), options `preventDefault()` on `pointerdown` so focus never leaves the trigger before the click selects (touch-safe), and the keyboard highlight scrolls into view inside the `max-h-60` listbox.
- Verification: `npm run typecheck` ✓, `npm run lint` ✓ (0 errors, 13 pre-existing warnings), `npm test` ✓ 53/53, `npm run test:e2e` ✓ 62/62 (incl. 4 new dropdown tests across desktop-chromium + mobile-390). Live preview screenshot confirms both listboxes render beneath their fields.

## 2026-08-05 — Country skyline bands on landing pages

- Client-supplied skylines converted to optimized WebP via sharp (q80, original dims kept — both under 1600px cap): `public/media/pages/australia/australia-skyline.webp` (Perth skyline at twilight across the Swan River, EXIF-verified) and `public/media/pages/canada/canada-skyline.webp` (Toronto skyline at dusk with CN Tower, EXIF-verified). ~50% smaller than the source JPEGs.
- Added a `skyline` block to `LandingContent` (`landing.ts`) with per-destination image/alt/kicker/title/copy/CTA, and a full-width `DestinationSkylineSection` in `LandingPage.tsx` rendered right after the lead-capture form (form stays above the fold): `next/image` `fill` + `object-cover`, dark gradient overlay, and a CTA that anchors back to `#free-assessment` — the no-outbound-links rule is preserved (verified: only in-page anchors + `tel:` on all 4 pages).
- Australia pages (Dubai + Abu Dhabi) serve the Perth skyline; Canada pages serve the Toronto skyline (verified per-route).
- Verification: `npm run typecheck` ✓, `npm run lint` ✓ (0 errors, 13 pre-existing warnings — no new ones; `next/image` used), `npm test` ✓ 53/53, dropdown e2e spec ✓ 4/4, live DOM checks confirm the band (heading/kicker/CTA/alt) and image load on both destinations.

## 2026-08-05 — Hero proof-stats overlap fix (landing + homepage)

- Reported: the hero proof stats ("2,000+ · 5-star reviews" etc.) overlapped on the landing pages. Root cause: the recovered template CSS switches the proof row to an inline baseline flex layout at ≥768px, and inside the hero's narrow copy column (~768–1280px) each stat slot is only ~49px wide while "2,000+" needs ~62px — text overflows its slot and collides with the label.
- Fixed in `src/app/globals.css` with a scoped override: `#landing-hero .botanical-proof-row` (and `#home .botanical-proof-row`, which had the identical latent bug — 61px overlap at 1024/1280) now always use the stacked 3-column grid: value over label, centered, divider lines, soft panel background, `strong` at `clamp(1.05rem, 4vw, 1.35rem)` bold with `white-space: nowrap` so the number never wraps or shrinks, `small` wraps gracefully below.
- Verified with a Playwright probe at widths 320/390/414/768/1024/1280/1440 on both the landing page and homepage: zero horizontal and zero vertical overlap, spans `flex-direction: column` at every width (pre-fix: 60–63px vertical overlap at 768–1280px).
- Added a permanent e2e regression test in `tests/e2e/landing-dropdown.spec.ts` ("landing hero proof stats never overlap at tablet and desktop widths") that asserts zero overlap at 768/1024/1280/1440.
- Verification: `npm run typecheck` ✓, `npm run lint` ✓ (0 errors, 13 pre-existing warnings), `npm test` ✓ 53/53, `npm run test:e2e` ✓ 64/64.

## 2026-08-05 — Landing header responsive fix

- Reported: the "Check My Eligibility — Free" CTA in the landing header overflowed its bar (and the viewport) at ≤360px — measured button right edge 343px vs bar right edge 288px at 320px viewport. The full label cannot fit beside the logo on one row below ~358px.
- Fixed `src/components/layout/LandingHeader.tsx`: the bar now wraps (`flex-wrap`), and below `sm` the CTA becomes a full-width second row under the logo (big, clean tap target) instead of overflowing; from `sm` (640px) up it returns to the inline pill beside the logo. Trust chips/phone unchanged. `LandingPage.tsx` offset raised to `pt-32` at <sm and the lead-capture section's `scroll-mt` bumped to `scroll-mt-32` so the taller two-row header never covers the hero or the anchor target (section anchors already use `--header-offset` = 118px ≈ the 122px two-row header).
- Discovered a Tailwind v4/Turbopack landmine during the fix: in the compiled CSS the base utilities layer can order base rules (`.w-full`) AFTER responsive variant rules (`.sm\:w-auto`), so `w-full sm:w-auto` silently resolves to full-width at all sizes (verified: button computed 1176px at 1440px; `.w-full` at byte 110738 comes after `.sm\:w-auto` at 101058). Width for the landing CTA is therefore driven from an unlayered `!important` block in `globals.css` (`.landing-header-actions` / `.landing-header-cta`: 100% below 640px, auto from 640px), which beats the layered utilities regardless of order. See DECISIONS.
- Added a permanent e2e regression test (landing-dropdown.spec.ts) asserting the CTA stays inside the bar and viewport and the hero content clears the header at 320/360/390/640/1024/1440.
- Verification: probe at 9 widths — mobile two-row header (bottom 122px) vs single-row at sm+ (76px), zero overflow at all widths, hero pill clears header everywhere; `npm run typecheck` ✓, `npm run lint` ✓ (0 errors, 13 pre-existing warnings), `npm test` ✓ 53/53, `npm run test:e2e` ✓ 65/65 (run with `--workers=1` for the landing spec — the dev server times out `page.goto` under full parallel load during recompiles).

## 2026-08-05 — Landing hero top-space fix

- Reported: the landing hero had too much top margin/padding. Cause was double top spacing: the wrapper's `pt-32 sm:pt-20 md:pt-24` (added for the two-row mobile header) stacked on top of the template hero's own `padding-top` (155px desktop / 104px mobile — sized for the taller site header). Measured gap from header bottom to hero license pill: 116px at mobile, 178px at desktop.
- Fixed: removed the wrapper top padding entirely (hero aurora background now starts at the very top of the page, flowing under the fixed landing header) and scoped a slim `#landing-hero` `padding-top` in `globals.css` — `calc(124px + env(safe-area-inset-top, 0px))` below `sm` (clears the two-row header incl. notched phones) and `100px` from `sm` up.
- Result (measured at 7 widths): hero section top = 0 at every width; gap from header bottom to license pill is now 21px (mobile) / 24px (desktop) / 43–56px (tablet) — previously 116–178px. Content always clears the header.
- The landing-header e2e regression test now also asserts the hero starts at the top of the page and the pill sits within 80px of the header bottom.
- Verification: `npm run typecheck` ✓, `npm run lint` ✓ (0 errors, 13 pre-existing warnings), `npm test` ✓ 53/53, `npm run test:e2e` ✓ 65/65.

## 2026-08-05 — Landing benefits cards redesigned to template card language

- Reported: the landing-page benefits grid ("Why Skilled Professionals Choose to Live & Work in Australia/Canada" — Strong Economy, Free Education, Healthcare, Family, Live Anywhere, Citizenship) should use the card design from the approved templates. Matched the Express Entry template's `ee-feature-item` card anatomy exactly: horizontal icon-left cards (44px icon column + text), organic asymmetric corner radii (`20px 48px 20px 20px`, flipped `48px 20px 20px 20px` on even cards), gradient icon tile (white→brand-100) with inset ring + soft drop shadow (`inset 0 0 0 1px rgba(53,142,26,.12), 0 10px 24px rgba(16,41,10,.08)`), 1px brand border, `rgba(255,255,255,.85)` surface, and the template's hover lift (`translateY(-6px)`, deeper `0 30px 72px` shadow, border darkens).
- Restored the benefits section header (kicker + title), which was previously not rendered at all — only the bare card grid appeared (verified in the DOM pre-fix). Grid is `gap-5 sm:grid-cols-2` (horizontal cards stay wide enough to read; single column on mobile).
- New `BenefitsGrid` component in `src/components/pages/LandingPage.tsx` renders the header + cards; the generic `CardGrid` is untouched for the occupations grid. Uses the existing `BENEFIT_ICONS` (briefcase/graduation/health/family/location/flag).
- New permanent e2e regression test in `tests/e2e/landing-dropdown.spec.ts` ("landing benefits cards match template style and never overflow") asserting at 375/768/1280px: header renders, exactly 6 cards, no horizontal overflow, icon tile sits left of the title.
- Verification: `npm run typecheck` ✓, `npm run lint` ✓ (0 errors, 13 pre-existing warnings), `npm test` ✓ 53/53, `npm run test:e2e` ✓ 65/65 (full suite at `--workers=2` after a timeout at default parallelism — dev-server compile load; see prior note). Live preview: header + 6 horizontal icon-left cards with alternating organic corners on both the Australia and Canada pages.

## 2026-08-05 — Unified reusable image cards (template organic-corner theme)

- `src/components/ui/MediaCard.tsx` is now the **single reusable image-card component** for every image surface on the site, upgraded to the template card language used by the benefits cards: organic asymmetric corners (`25px 72px 25px 25px`, mirrored `68px 25px 25px 25px` on alternating cards via index), soft brand border (`rgba(53,142,26,.1)`), surface `rgba(255,255,255,.85)`, deep green lift shadow (`0 20px 52px` → hover `0 30px 72px rgba(16,41,10,.11)`), `translateY(-6px)` hover, and slow image zoom (`scale(1.035)`) — matching the template's shared `.ee-*-card` hover rule.
- Three variants, driven by a `variant` prop (index-based corner flip handled inside `MediaCardGrid`):
  - `gallery` (default) — image-top (`aspect 1.36/1`) with overlaid label pill + title/body, whole card links when `href` set (used by `MediaGallerySection` on every internal page)
  - `blog` — image-top link, uppercase brand meta line, title/body + "Read article →" (used by `BlogGrid` on the Express Entry page; external links open `_blank`)
  - `story` — portrait `410/440` `object-contain` image on white with a bottom "Client success · 01/08" caption bar (used by `StoryCarousel`)
- Refactored the only other image-card surfaces onto the component: `BlogGrid` now maps `BlogPostItem[]` → `MediaCardGrid variant="blog"`, and `StoryCarousel` renders each track card via `MediaCard variant="story"` (carousel scroll/controls unchanged). The old inline `ee-blog-card`/`ee-story-card` markup is gone; the recovered `ee-*` CSS rules are now unused for those cards. Homepage `ResourcesSection` (icon tiles) and `Stories`/`VideoStories` (media-pending placeholders, no real images) are intentionally untouched — they adopt this component when real media lands.
- New e2e regression test in `tests/e2e/content-pages.spec.ts`: on the Express Entry page asserts 3 blog cards + 8 story cards + 6 gallery cards, organic corners (`72px` on first / `68px` on second card), blog meta lines + external links, story captions `01/08`…`08/08` + portrait aspect, and gallery label pills.
- Review hardening: story track changed from `<div>` to `<ul>` (MediaCard returns `<li>`, so the old div produced invalid HTML; grid layout unchanged) with the ref type bumped to `HTMLUListElement`; the story image wrapper's background is now conditional (`bg-white` for story, `bg-slate-100` otherwise) instead of emitting both conflicting utilities (the compiled-CSS ordering landmine).
- Verification: `npm run typecheck` ✓, `npm run lint` ✓ (0 errors, **11** warnings — down from 13 because the two inline `<img>` surfaces moved into the disable-annotated component), `npm test` ✓ 53/53, `npm run test:e2e` ✓ **70/70** (full suite at `--workers=2`; content-pages spec re-verified green after the review fixes). Live DOM/computed-style checks on `/dubai/visas/canada/express-entry` confirm organic radii, template shadow (`0 20px 52px rgba(16,41,10,.055)`), border/bg, story aspect `410 / 440` + `object-fit: contain`, valid `ul > li` story track, and gallery pills across all three surfaces.

## 2026-08-05 — Landing eligibility CTAs anchor to the lead form

- Reported: on mobile, every "Check My Eligibility" button scrolled to the top of the assessment section (`#free-assessment`) — which on mobile (intro column stacks above the form) left the actual form fields below the fold. Desktop was fine because intro and form sit side by side.
- Fix: the form card in `LeadCaptureSection` (`src/components/pages/LandingPage.tsx`) is now its own anchor target — `id="lead-form"` with `scroll-mt-32 sm:scroll-mt-24` — and ALL six eligibility CTAs now point at `#lead-form` instead of the section top: `CtaLink` (used by checklist/points/occupations/process/pathways sections), the skyline CTA, the final CTA, the hero `primaryAction`, the hero `scrollTarget`, and the landing-header "Check My Eligibility — Free" CTA (`LandingHeader.tsx`). The section keeps its `free-assessment` id (harmless, unused by links now).
- Verified with a Playwright probe + new permanent e2e regression test in `landing-dropdown.spec.ts` ("eligibility CTAs land on the lead form at every width"): clicking the header CTA at 390/768/1280px lands the form card in the top band — form top ≈ 232px vs header bottom 122px on mobile (just under the sticky header, never at the section top). The 232px = the global `scroll-padding-top: 104px` (recovered template CSS on the document) + the form's `scroll-mt-32` (128px); confirmed via computed styles, so the landing spot is deterministic, not drift.
- Review hardening: dropped the ineffective `sm:scroll-mt-24` on the form (under the documented compiled-CSS landmine the base `scroll-mt-32` wins at every width anyway); the e2e test now also asserts ≥4 `a[href="#lead-form"]` links and zero `a[href="#free-assessment"]` links per width, plus a pre-click check that the form starts below the top band so the arrival is attributable to the click.
- Verification: `npm run typecheck` ✓, `npm run lint` ✓ (0 errors, 11 pre-existing warnings), `npm test` ✓ 53/53, landing e2e spec ✓ 12/12 (incl. the new test across both projects; intermittent `page.goto` timeouts from the known dev-server recompile stall, clean on re-run).

## 2026-08-05 — Real success-story videos in landing testimonial sections

- Fetched the client's own success-story videos from `dm-consultant.ae/success-stories/` (a 260-item grid whose Elementor lightbox links base64-encode YouTube embed URLs — decoded all 115 unique video IDs and pulled titles via YouTube oEmbed). All chosen videos are authored by "DM Immigration Consultants" (their YouTube channel).
- Destination-appropriate selection, 3 per destination (matching the skyline pattern): Australia PR pages show `45RJO__WJfg` (Mr. Nicholas & family PR story), `6OEwi47thXI` (Australia Permanent Residency), `RT9O2JwzP54` (Australia PR!); Canada PR pages show `HotxB851tq8` (Canada PR in 6 months), `pU9tj1j5FGE` (Ms. Akosua Duodua, 9 months), `o9d1fobgRNg` (Canada PR success story).
- Downloaded the client's own 980×980 poster thumbnails and converted them to WebP (sharp q80) into `public/media/pages/common/` (`success-video-{canada|australia}-pr-*.webp`, 39–96KB each) — local posters, zero remote image requests.
- New reusable client component `src/components/ui/VideoEmbedCard.tsx`: poster-first click-to-play card in the template card language (organic corners 25px/72px mirrored by index, brand border, hover lift), square poster + gradient play button; clicking mounts the privacy-enhanced `youtube-nocookie.com/embed/<id>?autoplay=1&rel=0&modestbranding=1` iframe only then (no external requests/cookies until user intent).
- `landing.ts`: new `LandingVideo` type + `testimonials.videos` (per-destination) on `LandingContent`; `TestimonialsSection` in `LandingPage.tsx` now renders the video grid (3-col) instead of the placeholder "being verified" cards (their `Star`/`MARKET_LABELS` deps removed). Kept the honest footer note that videos play only on press.
- Review hardening: the iframe `allow` list dropped the unrecognized `web-share` feature (Chromium console warning on every landing page — now gone); the card swaps focus into the iframe after play so keyboard/screen-reader users aren't dropped to `document.body` when the play button unmounts; and the organic-corner card shell is now a single shared `cardShellClass(index, { fill })` exported from `MediaCard.tsx` and reused by `VideoEmbedCard` (no more duplicated shell classes to drift).
- New permanent e2e test (landing-dropdown.spec.ts): asserts 3 cards with posters + play buttons on the Australia and Canada pages, correct per-destination video id in the iframe after click, and only one iframe mounted (no eager embeds).
- Verification: `npm run typecheck` ✓, `npm run lint` ✓ (0 errors, 11 pre-existing warnings), `npm test` ✓ 53/53, landing e2e spec ✓ 14/14, `npm run build` ✓ (all 4 landing routes + thank-you pages prerendered static). Live preview: posters load, play swaps to the correct embed on the Australia page; Canada page shows its 3 videos; console clean of the `web-share` warning.

## 2026-08-05 — Guided chat now delivers leads via Resend

- Before this change the chat collected name/email/phone but only showed a thank-you — nothing was emailed anywhere. Now completing the chat emails the lead to a dedicated recipient.
- New env var `DMC_CHATBOT_LEAD_TO_EMAIL` (with an inline comment in `.env`/`.env.example` stating this Resend email ID is for the chatbot lead) — change it in `.env` to redirect chat leads. Resolution order: `DMC_CHATBOT_LEAD_TO_EMAIL` → market `DMC_<MARKET>_LEAD_TO_EMAIL` → `RESEND_REPLY_TO_EMAIL`. No email needs changing when `RESEND_ENABLED=false` (graceful no-op, same as forms).
- New server action `submitChatLead` in `src/features/leads/actions.ts`: builds an HTML + text email from the flow id/label, all recorded answers (friendly labels), name/email/phone, preferred market, and source page; sends via Resend only (no CRM push — chat answers don't map cleanly to `LeadFormData`).
- `buildFlow(market)` now takes the market and records every answer (`record()` helper on each block) plus the chosen `flowId`/`flowLabel` in `route`; the `ask_phone` block calls `submitChatLead` (fire-and-forget, try/catch, thank-you still shows on any send failure). `DmcGuidedChat` receives `market` from `MarketFloatingWidgets` and builds the flow per market.
- Verification: `npm run typecheck` ✓, `npm run lint` ✓ (0 errors, 11 pre-existing warnings), `npm test` ✓ 53/53 (schema.test still green with the new defaulted var), `npm run build` ✓.

## 2026-08-05 — Landing skyline copy readability

- Reported: the skyline band copy ("From Perth's Swan River to Sydney Harbour…" / "Toronto's glittering skyline…") was hard to read — it used `--color-aurora-muted` (#9aab96, muted sage-gray) over the skyline photograph.
- Fixed in the shared `DestinationSkylineSection` (`LandingPage.tsx`, covers all 4 landing pages): copy is now near-white `text-aurora-text` (#f5fff2) at `font-medium` (500) with `md:text-lg`, plus a subtle dark text shadow; the dark gradient overlay behind it was strengthened (`from-brand-950/95 via-brand-950/60 to-brand-950/25`, was 90/40/20) so the text zone over the bright skyline (Perth/Toronto at dusk) stays legible at every width.
- Verified live on the Canada and Australia Dubai pages (computed color `rgb(245,255,242)`, weight 500, shadow applied) and visually in the preview; the section now reads as bright white text on the darkened skyline. typecheck ✓, lint 0 errors ✓, landing e2e ✓ 14/14.

## 2026-08-05 — Market WhatsApp numbers (env) + WhatsApp bubble on landing pages

- Client provided WhatsApp numbers — Dubai `+971543219003`, Abu Dhabi `+971544410905`, Qatar `+97431113692`, India `+919036554740` (all four match the legacy-site numbers previously noted as `TODO(client)` in `.env`). Set `DMC_<MARKET>_WHATSAPP_E164` for each in `.env` + `.env.example` (documentation only). Kuwait left empty — set `DMC_KUWAIT_WHATSAPP_E164` when the client supplies it; a market with no number simply hides the WhatsApp bubble.
- The WhatsApp bubble now redirects DIRECTLY to the market's number — no office picker. `WhatsAppLauncher` takes just `{ market, number, prefilledMessage }` and, on click, opens `wa.me/<number>?text=<prefilled>` for the market in the URL (`[market]` segment); if the market has no configured number the bubble is not rendered at all. `MarketFloatingWidgets` passes the current market's number from the env map.
- Landing pages get the floating WhatsApp bubble: `MarketFloatingWidgets` gained a `showChat` prop (default `true`); the landing chrome in `[market]/layout.tsx` renders `<MarketFloatingWidgets market={market} showChat={false} />` so the 4 landing pages (`/dubai|abu-dhabi/visas/{australia,canada}/pr-services`) show the WhatsApp bubble only (no guided chat). The 4 `/thank-you` routes already used the standard chrome and therefore already render both bubbles (WhatsApp bottom-right + guided chat bottom-left).
- Fixed pre-existing WIP type error that was blocking `typecheck`/`build`: `tool-route.tsx` spread `{...page}` after `market`, overwriting the validated route market — reordered to `<ToolPage {...page} market={market} />`.
- Also fixed the footer/wide brand logo: `public/media/brand/dmc-logo-wide.webp` + `dmc-logo-wide-640.webp` had a baked-in white rounded box (visible against the dark footer). Removed it via a flood-fill from the transparent corners (only the background box → alpha 0; pixel-compare confirmed 0 logo-art pixels damaged; white wordmark/emblem intact).
- Verification: `npm run typecheck` ✓, `npm run lint` ✓ (0 errors, 12 pre-existing warnings), `npm test` ✓ 53/53, `npm run build` ✓ 421/421 (all 4 landing + 4 thank-you routes prerendered). Live dev-server probes: single click on the bubble opens `wa.me` for the right number per market (Dubai `971543219003`, Abu Dhabi `971544410905`, Qatar `97431113692`, India `919036554740`; Kuwait — bubble absent); landing pages show WhatsApp only, thank-you pages show both bubbles.

## Next work

1. Continue applying the extracted internal-page component system to the remaining Canada, Australia, and UK internal pages.
2. Replace the centralized template `<img>` tags with `next/image` or approved optimized local assets.
3. Phase 6: blog MDX migration from crawl inventory (91 posts).
4. Phase 8: guided chat wired to Resend lead delivery (chatbot done; eligibility checker still pending).
5. Phase 9: Consent-gated GTM/GA4/Meta adapters (analytics IDs still needed from client).
6. Phase 10: Remaining 13 calculators/tools (CRS is built into EE page; CLB, FSW-67, and Australia points now built).
7. Phase 11: Authentic resource migration + credentials verification.
8. Phase 12: Legal/anti-fraud hub copy finalization.
9. Phase 14: QA sweep + e2e suite + readiness checklist.

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

- `node -e "postcss.parse(...)"` on `src/app/globals.css` — valid CSS ✓
- `npm run typecheck` — clean ✓
- `npm run typecheck` — clean ✓ after adding the reusable internal Canada route pages (`provincial-nominee-programs`, `atlantic-immigration-program`)
- `npm run test:e2e` — **68/68 passed** (desktop-chromium + mobile-390; homepage 9, routing 22, content pages 7 — Phase 5 suite incl. hero/sections/sources, FAQ accordion, content overflow 768/390/320, breadcrumbs, 5-market render, unknown-path 404, robots noindex) ✓
- `npm run test:e2e -- tests/e2e/content-pages.spec.ts` — sandbox webserver start failed with Turbopack port-binding error; escalated rerun stalled and was cancelled, so browser verification of this batch is still pending in this environment.
- `npm test` — 41 passed (6 files: env schema, markets, routes, navigation, legacy-redirects, content registry) ✓
- `npm run lint` — 0 errors, 0 warnings ✓
- `npm run lint` — 0 errors, 7 warnings ✓ after the internal-page extraction; warnings are limited to the centralized template `<img>` elements in `src/components/pages/internal/InternalPageTemplate.tsx`
- Development-mode responsive check on the host dev server (`localhost:3001`) via Playwright at `768x1024` and `390x844`:
  - Express Entry: no horizontal overflow; breadcrumb/facts/anchor/content stack sits below the fixed header.
  - Provincial Nominee Programs: no horizontal overflow; template stack spacing and first content band render cleanly at both widths.
  - Atlantic Immigration Program: no horizontal overflow; template stack spacing and first content band render cleanly at both widths.
- `npm run build` — ✓ **411 static pages / 311 routes** after the internal-page template alignment pass; Turbopack; TypeScript pass ✓
- `npm run build` — ✓ **411 static pages / 311 routes** after the Express Entry template parity follow-up; Turbopack; TypeScript pass ✓
- NOTE: kill stale dev/start servers on :3000 before `test:e2e` — `reuseExistingServer: true` will silently reuse an outdated build (caused 15 phantom failures this session; root cause: pre-Phase-5 `next dev` still listening).
- `npm audit --omit=dev` — 3 high, all `sharp <0.35.0` via Next 16.2.12 optionalDep (postcss fixed via override) — accepted debt, revisit on Next update
- Logo pipeline (temp): `logo-process.mjs` — flood-fill white→transparent + trim + WebP/PNG variants → `public/media/brand/` + app icons

## Incomplete counts

- Routes: ~90 canonical routes inventoried; 60 of ~90 built as content pages (all 5 markets live via catch-all); shared-registry internal pages now cover about/contact/credentials/resources/legal/tools; sitemap + robots now generated.
- Blog articles: 91 (`.ae`) + 23 + 8 + 19 + 4 crawled into inventory; 0 migrated (Phase 6).
- Legacy authentic assets: 144 success-story + 16 gallery + video/press items inventoried as sources; 0 approved/manifested.
- Tools: 3 of 16 implemented (CRS built into EE page, CLB, FSW-67, Australia points calculator).

## 2026-08-04 — Global stylesheet recovery

- Repaired `src/app/globals.css` after a broken recovery paste. The invalid 1,781-line transcription contained CSS syntax errors and prevented parsing.
- Superseding the initial minimal recovery, the stylesheet now contains all 14 CSS layers recovered verbatim from `DMC_Homepage_Mobile_Responsive_Final(1).html`, including its generated utility layers (6,505 lines, 673,473 bytes). `globals.css` remains PostCSS-valid.
- The user-provided damaged source is preserved untouched at `src/app/globals.css.broken-backup-20260804.txt` (SHA-256 `7058e07cab2d584d1ade164d6eaf9dc3b853a965e7a200f78ed69e433b92b840`).
- The current React homepage uses different markup from the source template, so exact visual parity requires a subsequent JSX/component port in addition to this CSS recovery.

## 2026-08-04 — Root hydration warning suppression

- Browser-extension attributes (`webcrx`, `__processed_*`, and `bis_register`) were injected into the root `<html>`/`<body>` before React hydration, producing a development-only mismatch warning despite a successful page response.
- Added `suppressHydrationWarning` only to the root `<html>` and `<body>` in `src/app/layout.tsx`; nested component hydration mismatches remain visible. `npm run typecheck` passes.

## 2026-08-04 — Homepage template port batch

- Ported the remaining homepage sections from the approved HTML template into the Next.js app while leaving the navbar and hero untouched:
  - added the regulatory recognition band and stats band,
  - restyled `ServicesSection`, `CountriesSection`, `WhyDmcSection`, `CredentialsSection`, `VisitVisasSection`, `ToolsSection`, `ProcessSection`, `StoriesSection`, `VideoStoriesSection`, `ResourcesSection`, `FaqSection`, and `ContactCtaSection`,
  - updated `SiteFooter` to the template-like split layout with social links and bottom legal row,
  - kept the honest placeholders and safe wording where the template contained unverified testimonials or success claims.
- Updated `HomeSections` ordering so the page now flows like the template: hero, recognition band, services, destinations, why DMC, credentials, visit visas, tools, process, stats band, stories, video stories, resources, FAQ, and final CTA.
- Verification: `npm run typecheck` ✓, `npm run lint` ✓, `npm run build` ✓ (escalated; Turbopack sandbox port-binding limitation reproduced without escalation).

## 2026-08-04 — Homepage contrast/logo correction

- Reworked the credentials band to use the template's exact proof-stack hooks (`credential-proof-stack`, `credential-proof-card`, `credential-proof-icon`, `credential-assurance`, `credential-assurance-mark`) so the recovered CSS controls the dark-panel contrast correctly and the text remains readable.
- Replaced the generic `BrandLogo` image in the resources grid with the template's `brand-logo resource-brand-mark` span so the resource cards use the approved logo plaque treatment instead of a standalone image component.
- Simplified the hero core plaque to a single `brand-logo brand-logo-aurora` span so the animation no longer stacks two logos on top of each other.
- Verification: `npm run typecheck` ✓, `npm run lint` ✓, `npm run build` ✓ (escalated; Turbopack sandbox port-binding limitation reproduced without escalation).

## 2026-08-04 — Countries grid completion

- Added the missing Germany pathway card to the countries section so the desktop grid now matches the approved six-card template layout instead of stopping at five cards.
- Updated the badge logic so the Germany tile correctly renders `EU Blue Card` instead of falling back to the generic partner-visa label.
- Verification: `npm run typecheck` ✓, `npm run lint` ✓, `npm run build` ✓ (escalated; Turbopack sandbox port-binding limitation reproduced without escalation).
