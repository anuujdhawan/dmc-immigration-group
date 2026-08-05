/**
 * Central page-media registry.
 *
 * Every internal page (navbar dropdown items) resolves its images through this
 * registry so the same imagery is never reused across unrelated destinations
 * (e.g. a Canada photo on an Australia page) and so images can be swapped in
 * one place. All paths are local, licensed, free-to-use stock images stored in
 * `public/media/pages/...`.
 *
 * `split` is the hero-adjacent image used in SplitContentSection / ProgramPage
 * split sections. `process` is the ProcessSection visual. `media` is a general
 * MediaFrame image. `cards`/`extra` are optional secondary images.
 */

export interface PageMediaSet {
  /** Primary split/hero image. */
  split?: { src: string; alt: string; label?: string };
  /** Process-section visual (dark band). */
  process?: { src: string; alt: string; label?: string };
  /** General media frame image. */
  media?: { src: string; alt: string; label?: string };
}

const IMG = "/media/pages";

export const PAGE_MEDIA: Record<string, PageMediaSet> = {
  // ── Canada ──────────────────────────────────────────────────────────────
  "visas/canada/express-entry": {
    split: { src: `${IMG}/canada/express-entry.webp`, alt: "Toronto skyline at dusk, Canada", label: "Express Entry to Canada" },
    process: { src: `${IMG}/canada/flag.webp`, alt: "Canadian flag with city skyline in the background" },
    media: { src: `${IMG}/canada/montreal.webp`, alt: "Montreal cityscape, Canada", label: "Express Entry preparation" },
  },
  "visas/canada/provincial-nominee-programs": {
    split: { src: `${IMG}/canada/moraine-lake.webp`, alt: "Moraine Lake in Banff National Park, Alberta", label: "Province-led immigration planning" },
    process: { src: `${IMG}/canada/mountain-lake.webp`, alt: "Canadian mountain lake landscape", label: "Provincial nomination process" },
  },
  "visas/canada/atlantic-immigration-program": {
    split: { src: `${IMG}/canada/lighthouse.webp`, alt: "Lighthouse on the Atlantic Canadian coast", label: "Atlantic Canada employer pathway" },
    process: { src: `${IMG}/canada/maple-leaf.webp`, alt: "Canadian maple leaf — the federal stage of the Atlantic route" },
  },
  "visas/canada/rural-and-northern-immigration-pilot": {
    split: { src: `${IMG}/canada/small-town.webp`, alt: "Small Canadian town main street", label: "Rural community settlement" },
  },
  "visas/canada/study-permits": {
    split: { src: `${IMG}/study/campus.webp`, alt: "University campus with students walking", label: "Study in Canada" },
  },
  "visas/canada/family-sponsorship-parent-grandparent-program": {
    split: { src: `${IMG}/common/family-generations.webp`, alt: "Multi-generational family together", label: "Bring family to Canada" },
  },
  "visit-visas/canada": {
    split: { src: `${IMG}/canada/niagara.webp`, alt: "Niagara Falls, Canada", label: "Canada visit visa" },
  },

  // ── Australia ───────────────────────────────────────────────────────────
  "visas/australia/skilled-independent-189": {
    split: { src: `${IMG}/australia/sydney-opera.webp`, alt: "Sydney Opera House and harbour", label: "Skilled Independent visa" },
    process: { src: `${IMG}/australia/sydney-harbour.webp`, alt: "Sydney Harbour Bridge", label: "189 visa process" },
  },
  "visas/australia/skilled-nominated-190": {
    split: { src: `${IMG}/australia/melbourne.webp`, alt: "Melbourne city skyline, Australia", label: "Skilled Nominated visa" },
    process: { src: `${IMG}/australia/sydney-harbour.webp`, alt: "Australian city harbour", label: "190 nomination process" },
  },
  "visas/australia/skilled-work-regional-491": {
    split: { src: `${IMG}/australia/outback-road.webp`, alt: "Red outback road through the Australian interior", label: "Regional Australia pathway" },
    process: { src: `${IMG}/australia/kangaroo.webp`, alt: "Kangaroo in the Australian bush", label: "491 regional living" },
  },
  "visas/australia/permanent-residence-skilled-regional-191": {
    split: { src: `${IMG}/australia/coast.webp`, alt: "Australian coastal cliffs and ocean", label: "Permanent residence" },
  },
  "visas/australia/employer-sponsored-482": {
    split: { src: `${IMG}/common/office-team.webp`, alt: "Professional team collaborating in a modern office", label: "Employer sponsorship" },
    process: { src: `${IMG}/common/office-meeting.webp`, alt: "Business meeting in progress", label: "482 sponsorship process" },
  },
  "visas/australia/employer-nomination-scheme-186": {
    split: { src: `${IMG}/common/office-handshake.webp`, alt: "Business handshake between professionals", label: "Employer nomination" },
    process: { src: `${IMG}/common/office-desk.webp`, alt: "Professional working at a desk", label: "186 nomination process" },
  },
  "visas/australia/national-innovation-visa-858": {
    split: { src: `${IMG}/common/innovation.webp`, alt: "Circuit board close-up representing innovation", label: "National innovation talent" },
  },
  "visas/australia/state-territory-nominations": {
    split: { src: `${IMG}/australia/sydney-opera.webp`, alt: "Sydney Opera House at sunset", label: "State and territory nomination" },
  },

  // ── United Kingdom ──────────────────────────────────────────────────────
  "visas/uk/skilled-worker": {
    split: { src: `${IMG}/uk/big-ben.webp`, alt: "Big Ben and the Houses of Parliament, London", label: "Skilled Worker pathway" },
    process: { src: `${IMG}/uk/thames.webp`, alt: "The Thames and London skyline", label: "Skilled Worker journey" },
  },
  "visas/uk/skilled-worker-dependent": {
    split: { src: `${IMG}/uk/tower-bridge.webp`, alt: "Tower Bridge, London", label: "Family in the UK" },
    process: { src: `${IMG}/uk/london-street.webp`, alt: "London street scene", label: "Dependent visa journey" },
  },

  // ── Visit visas ─────────────────────────────────────────────────────────
  "visit-visas": {
    split: { src: `${IMG}/common/airport.webp`, alt: "Airport terminal with a plane at the gate", label: "Global visit visas" },
  },
  "visit-visas/canada-usa-australia": {
    split: { src: `${IMG}/visit-visas/usa.webp`, alt: "New York City skyline", label: "Long-haul visit routes" },
  },
  "visit-visas/uk-new-zealand": {
    split: { src: `${IMG}/uk/westminster.webp`, alt: "London Westminster", label: "UK and New Zealand visits" },
  },
  "visit-visas/china-japan-turkey": {
    split: { src: `${IMG}/visit-visas/japan.webp`, alt: "Tokyo cityscape, Japan", label: "China, Japan and Turkey" },
  },
  "visit-visas/south-korea-greece-thailand": {
    split: { src: `${IMG}/visit-visas/greece.webp`, alt: "Santorini, Greece", label: "South Korea, Greece and Thailand" },
  },
  "visit-visas/singapore-saudi-arabia-uae": {
    split: { src: `${IMG}/visit-visas/singapore.webp`, alt: "Singapore city skyline", label: "Regional short-haul travel" },
  },
  "visit-visas/south-africa-cyprus-netherlands": {
    split: { src: `${IMG}/visit-visas/netherlands.webp`, alt: "Amsterdam canals, Netherlands", label: "South Africa, Cyprus and the Netherlands" },
  },
  "visit-visas/usa": {
    split: { src: `${IMG}/visit-visas/usa.webp`, alt: "New York City skyline, USA", label: "USA B1/B2 visitor visa" },
  },
  "visit-visas/australia": {
    split: { src: `${IMG}/australia/sydney-opera.webp`, alt: "Sydney Opera House, Australia", label: "Australia visitor visa" },
  },
  "visit-visas/uk": {
    split: { src: `${IMG}/uk/big-ben.webp`, alt: "Big Ben, London", label: "UK Standard Visitor visa" },
  },
  "visit-visas/new-zealand": {
    split: { src: `${IMG}/visit-visas/new-zealand.webp`, alt: "New Zealand mountain lake", label: "New Zealand visitor visa" },
  },
  "visit-visas/china": {
    split: { src: `${IMG}/visit-visas/china.webp`, alt: "Shanghai skyline, China", label: "China visit visa" },
  },
  "visit-visas/japan": {
    split: { src: `${IMG}/visit-visas/japan.webp`, alt: "Tokyo cityscape, Japan", label: "Japan visit visa" },
  },
  "visit-visas/turkey": {
    split: { src: `${IMG}/visit-visas/turkey.webp`, alt: "Istanbul skyline, Turkey", label: "Turkey e-visa" },
  },
  "visit-visas/south-korea": {
    split: { src: `${IMG}/visit-visas/south-korea.webp`, alt: "Seoul cityscape, South Korea", label: "South Korea visit" },
  },
  "visit-visas/greece": {
    split: { src: `${IMG}/visit-visas/greece.webp`, alt: "Santorini, Greece", label: "Greece Schengen visa" },
  },
  "visit-visas/thailand": {
    split: { src: `${IMG}/visit-visas/thailand.webp`, alt: "Bangkok, Thailand", label: "Thailand visit" },
  },
  "visit-visas/singapore": {
    split: { src: `${IMG}/visit-visas/singapore.webp`, alt: "Singapore skyline", label: "Singapore visit" },
  },
  "visit-visas/saudi-arabia": {
    split: { src: `${IMG}/visit-visas/saudi-arabia.webp`, alt: "Riyadh, Saudi Arabia", label: "Saudi Arabia e-visa" },
  },
  "visit-visas/uae": {
    split: { src: `${IMG}/visit-visas/uae.webp`, alt: "Dubai skyline, UAE", label: "UAE visit visas" },
  },
  "visit-visas/south-africa": {
    split: { src: `${IMG}/visit-visas/south-africa.webp`, alt: "Cape Town, South Africa", label: "South Africa visit" },
  },
  "visit-visas/cyprus": {
    split: { src: `${IMG}/visit-visas/cyprus.webp`, alt: "Larnaca seafront, Cyprus", label: "Cyprus eVisa" },
  },
  "visit-visas/netherlands": {
    split: { src: `${IMG}/visit-visas/netherlands.webp`, alt: "Amsterdam canals, Netherlands", label: "Netherlands Schengen visa" },
  },

  // ── Business & investment ───────────────────────────────────────────────
  "business-investment/golden-visa-uae": {
    split: { src: `${IMG}/business/dubai-golden.webp`, alt: "Dubai skyline at dusk", label: "UAE Golden Visa" },
  },
  "business-investment/residency": {
    split: { src: `${IMG}/common/skyline.webp`, alt: "City skyline at sunset", label: "Residency by investment" },
  },
  "business-investment/residency/canada": {
    split: { src: `${IMG}/canada/express-entry.webp`, alt: "Toronto skyline, Canada", label: "Canada residency routes" },
  },
  "business-investment/residency/uk": {
    split: { src: `${IMG}/uk/big-ben.webp`, alt: "Big Ben, London", label: "UK residency routes" },
  },
  "business-investment/residency/usa": {
    split: { src: `${IMG}/visit-visas/usa.webp`, alt: "New York City skyline", label: "USA residency routes" },
  },
  "business-investment/citizenship": {
    split: { src: `${IMG}/business/citizenship.webp`, alt: "Passport and travel documents", label: "Citizenship by investment" },
  },
  "business-investment/citizenship/st-kitts-and-nevis": {
    split: { src: `${IMG}/business/caribbean.webp`, alt: "Caribbean beach shoreline", label: "St Kitts & Nevis citizenship" },
  },
  "business-investment/citizenship/vanuatu": {
    split: { src: `${IMG}/business/vanuatu.webp`, alt: "South Pacific island coastline", label: "Vanuatu citizenship" },
  },
  "business-investment/startup-entrepreneur-visas": {
    split: { src: `${IMG}/business/startup.webp`, alt: "Startup team working together", label: "Startup and entrepreneur visas" },
  },

  // ── Study abroad ────────────────────────────────────────────────────────
  "study-abroad/canada-student-visas": {
    split: { src: `${IMG}/study/campus.webp`, alt: "University campus, Canada", label: "Study in Canada" },
  },
  "study-abroad/australia-student-visas": {
    split: { src: `${IMG}/australia/melbourne.webp`, alt: "Melbourne city skyline", label: "Study in Australia" },
  },
  "study-abroad/uk-usa-student-visas": {
    split: { src: `${IMG}/study/library.webp`, alt: "University library", label: "Study in the UK and USA" },
  },
  "study-abroad/uk-student-visas": {
    split: { src: `${IMG}/uk/london-street.webp`, alt: "London street", label: "Study in the UK" },
  },
  "study-abroad/usa-student-visas": {
    split: { src: `${IMG}/visit-visas/usa.webp`, alt: "New York City", label: "Study in the USA" },
  },
  "study-abroad/ielts-coaching": {
    split: { src: `${IMG}/study/ielts.webp`, alt: "Student studying with notes", label: "IELTS preparation" },
  },

  // ── More services ───────────────────────────────────────────────────────
  "services/resume-marketing": {
    split: { src: `${IMG}/services/resume.webp`, alt: "Resume document and pen", label: "Resume marketing" },
  },
  "why-dmc": {
    split: { src: `${IMG}/common/consultation.webp`, alt: "Consultant advising a client", label: "Why DMC" },
  },

  // ── Resources ───────────────────────────────────────────────────────────
  faqs: {
    split: { src: `${IMG}/common/documents.webp`, alt: "Documents and notes on a desk", label: "Frequently asked questions" },
  },
  guides: {
    split: { src: `${IMG}/common/documents.webp`, alt: "Checklist documents", label: "Guides and checklists" },
  },
  "guides/document-checklists": {
    split: { src: `${IMG}/common/documents.webp`, alt: "Document checklist", label: "Document checklists" },
  },
  "tools/canada": {
    split: { src: `${IMG}/canada/express-entry.webp`, alt: "Toronto skyline", label: "Canada tools" },
  },
  "tools/australia": {
    split: { src: `${IMG}/australia/sydney-opera.webp`, alt: "Sydney Opera House", label: "Australia tools" },
  },

  // ── Site pages ──────────────────────────────────────────────────────────
  about: {
    split: { src: `${IMG}/common/consultation.webp`, alt: "Consultant advising a client at a desk", label: "About DMC" },
  },
  contact: {
    split: { src: `${IMG}/common/office-team.webp`, alt: "DMC team collaborating in the office", label: "Contact DMC" },
  },
  credentials: {
    split: { src: `${IMG}/common/office-handshake.webp`, alt: "Professional handshake", label: "Credentials" },
  },
  "success-stories": {
    split: { src: `${IMG}/common/family.webp`, alt: "Happy family together", label: "Success stories" },
  },
  "video-success-stories": {
    split: { src: `${IMG}/common/plane-window.webp`, alt: "View from an aircraft window", label: "Video success stories" },
  },
  gallery: {
    split: { src: `${IMG}/common/luggage.webp`, alt: "Travel luggage at an airport", label: "Gallery" },
  },
  "press-media": {
    split: { src: `${IMG}/common/office-meeting.webp`, alt: "Press interview setting", label: "Press and media" },
  },
  blog: {
    split: { src: `${IMG}/common/documents.webp`, alt: "Documents and news articles", label: "Blog and news" },
  },
  tools: {
    split: { src: `${IMG}/common/skyline.webp`, alt: "City skyline representing global tools", label: "Tools and assessment" },
  },
  "tools/eligibility-checker": {
    split: { src: `${IMG}/common/documents.webp`, alt: "Eligibility assessment documents", label: "Eligibility checker" },
  },
  "visas/canada": {
    split: { src: `${IMG}/canada/express-entry.webp`, alt: "Toronto skyline, Canada", label: "Canada visas" },
  },
  "visas/australia": {
    split: { src: `${IMG}/australia/sydney-opera.webp`, alt: "Sydney Opera House", label: "Australia visas" },
  },
  "visas/uk": {
    split: { src: `${IMG}/uk/big-ben.webp`, alt: "Big Ben, London", label: "UK visas" },
  },
};

/** Resolve a page's media set, falling back to an empty set. */
export function pageMedia(pageId: string): PageMediaSet {
  return PAGE_MEDIA[pageId] ?? {};
}
