/**
 * Page gallery registry.
 *
 * Every internal page (navbar dropdown item) renders a six-card image gallery
 * through `MediaGallerySection`. Cards pair a local WebP image with brand-toned
 * copy so each image justifies both the page topic and the DMC service model.
 *
 * Imagery rule: every image must represent the country/state/city the page
 * discusses — national flags, passports, globes/world maps, or famous landmark
 * locations. Generic scenery (forests, generic coastlines) is avoided because
 * it does not communicate the destination.
 *
 * Resolution order in `galleryFor`:
 *   1. an exact page override in `PAGE_GALLERY`;
 *   2. a visit-visa destination page → travel gallery built around that
 *      destination's hero image plus passport/globe/airport imagery;
 *   3. the page family set (Canada / Australia / UK / business / study /
 *      visit / services / site);
 *   4. the site-wide fallback set.
 */

import { pageMedia } from "@/config/page-media";

export type GalleryItem = {
  src: string;
  alt: string;
  label: string;
  title: string;
  body: string;
  href?: string;
  external?: boolean;
};

const IMG = "/media/pages";

// ── Family sets ───────────────────────────────────────────────────────────

const CANADA_FAMILY: GalleryItem[] = [
  {
    src: `${IMG}/canada/express-entry.webp`,
    alt: "Toronto skyline at dusk, Canada",
    label: "TORONTO",
    title: "Toronto: Canada's economic heart",
    body: "Toronto anchors Canada's skilled-migration story. DMC helps you weigh the city and province factors that shape your settlement plan.",
  },
  {
    src: `${IMG}/canada/vancouver.webp`,
    alt: "Vancouver skyline with mountains, Canada",
    label: "VANCOUVER",
    title: "The Pacific gateway",
    body: "Vancouver blends city life with mountain views. DMC reviews provincial options like British Columbia's nominee streams against your profile.",
  },
  {
    src: `${IMG}/canada/montreal.webp`,
    alt: "Montreal cityscape, Canada",
    label: "LANGUAGE & CULTURE",
    title: "Bilingual opportunity in Montreal",
    body: "English and French both matter in Canada. DMC advisors review language-test strategy against your target program and ranking factors.",
  },
  {
    src: `${IMG}/canada/niagara.webp`,
    alt: "Niagara Falls, Ontario",
    label: "FAMOUS LANDMARKS",
    title: "Landmarks of Ontario",
    body: "From Niagara Falls to the cities along the Great Lakes, Ontario leads immigration volumes — a starting point DMC maps for most profiles.",
  },
  {
    src: `${IMG}/canada/flag.webp`,
    alt: "Canadian flag against a city skyline",
    label: "PERMANENT RESIDENCE",
    title: "The maple leaf and the visa process",
    body: "The flag represents the federal programs behind every Canadian application. DMC reviews eligibility, ranking and admissibility factors.",
  },
  {
    src: `${IMG}/canada/moraine-lake.webp`,
    alt: "Moraine Lake, Banff National Park, Alberta",
    label: "PROVINCES & NATURE",
    title: "Provincial programs, regional needs",
    body: "Alberta and other provinces nominate skilled talent for regional labour needs. DMC maps your profile against the streams that best match it.",
  },
];

const AUSTRALIA_FAMILY: GalleryItem[] = [
  {
    src: `${IMG}/australia/sydney-opera.webp`,
    alt: "Sydney Opera House and harbour",
    label: "SYDNEY",
    title: "Sydney: Australia's front door",
    body: "Sydney anchors Australia's skilled-migration story. DMC helps you compare the 189, 190 and 491 streams against your occupation and points.",
  },
  {
    src: `${IMG}/australia/melbourne.webp`,
    alt: "Melbourne city skyline, Australia",
    label: "MELBOURNE",
    title: "Melbourne's liveable balance",
    body: "Consistently ranked among the world's most liveable cities, Melbourne suits professionals and families. DMC reviews state-nomination options with you.",
  },
  {
    src: `${IMG}/australia/sydney-harbour.webp`,
    alt: "Sydney Harbour Bridge",
    label: "HARBOUR LIFE",
    title: "Working by the harbour",
    body: "Australia's coastal cities support strong finance, technology and construction sectors — all assessed against the skilled occupation list DMC uses.",
  },
  {
    src: `${IMG}/australia/uluru.webp`,
    alt: "Uluru in the Australian outback",
    label: "ICONIC LANDMARKS",
    title: "Uluru and the Red Centre",
    body: "Australia's landmarks are part of its identity. DMC factors lifestyle, settlement and regional streams into every migration conversation.",
  },
  {
    src: `${IMG}/australia/kangaroo.webp`,
    alt: "Kangaroo in the Australian bush",
    label: "WILDLIFE & OUTDOORS",
    title: "Outdoor culture, settled roots",
    body: "Australia's outdoor culture is part of everyday life. For clients, it is the lifestyle side of a decision DMC helps you make on the facts.",
  },
  {
    src: `${IMG}/australia/outback-road.webp`,
    alt: "Red outback road through the Australian interior",
    label: "REGIONAL AUSTRALIA",
    title: "Regional visas, wider horizons",
    body: "Regional streams like the 491 offer extra points and settlement pathways beyond the capitals. DMC explains the obligations and the route to 191.",
  },
];

const UK_FAMILY: GalleryItem[] = [
  {
    src: `${IMG}/uk/big-ben.webp`,
    alt: "Big Ben and the Houses of Parliament, London",
    label: "LONDON",
    title: "The Houses of Parliament",
    body: "London anchors the UK's Skilled Worker landscape. DMC helps eligible professionals match roles, sponsor requirements and English-language evidence.",
  },
  {
    src: `${IMG}/uk/tower-bridge.webp`,
    alt: "Tower Bridge, London",
    label: "RIVER & BRIDGES",
    title: "Connectivity across the city",
    body: "Strong transport links and global industries make the UK an attractive base. DMC keeps your dependent-visa and family questions in focus.",
  },
  {
    src: `${IMG}/uk/red-bus.webp`,
    alt: "Red double-decker bus on a London street",
    label: "LONDON ICONS",
    title: "A city of familiar icons",
    body: "The red bus is part of everyday London. DMC translates current Home Office policy into clear, practical next steps for applicants.",
  },
  {
    src: `${IMG}/uk/london-eye.webp`,
    alt: "London Eye on the South Bank",
    label: "CITY SKYLINE",
    title: "A skyline of opportunity",
    body: "Employer sponsorship opens doors across sectors. DMC reviews certificates of sponsorship, salary thresholds and the documents behind each claim.",
  },
  {
    src: `${IMG}/uk/oxford.webp`,
    alt: "Oxford University architecture",
    label: "EDUCATION & HERITAGE",
    title: "World-class study and research",
    body: "The UK's universities attract students and researchers worldwide. DMC supports study, graduate and Skilled Worker conversations with clear guidance.",
  },
  {
    src: `${IMG}/uk/flag.webp`,
    alt: "Union Jack flag",
    label: "UNITED KINGDOM",
    title: "The Union Jack and UK visas",
    body: "Every UK application is decided under Home Office rules. DMC reviews eligibility, salary and English requirements before you apply.",
  },
];

const BUSINESS_FAMILY: GalleryItem[] = [
  {
    src: `${IMG}/business/dubai-golden.webp`,
    alt: "Dubai skyline at dusk",
    label: "DUBAI",
    title: "Golden Visa long-term residency",
    body: "The UAE Golden Visa rewards investors, entrepreneurs and talented professionals. DMC reviews eligibility categories against your profile.",
  },
  {
    src: `${IMG}/business/burj.webp`,
    alt: "Burj Khalifa and Dubai skyline",
    label: "BUSINESS HUBS",
    title: "Dubai's business skyline",
    body: "From Burj Khalifa to the business districts, Dubai shapes residency-by-investment choices. DMC compares routes across markets on facts.",
  },
  {
    src: `${IMG}/business/dubai-old.webp`,
    alt: "Dubai old town and traditional architecture",
    label: "CULTURE & TRADE",
    title: "Trading roots, global ambitions",
    body: "Dubai's trading heritage continues today. DMC explains the investment, ownership and compliance expectations behind business residency.",
  },
  {
    src: `${IMG}/business/startup.webp`,
    alt: "Startup team working together",
    label: "STARTUPS & ENTREPRENEURS",
    title: "Visa routes for founders",
    body: "Startup and entrepreneur visas exist across several countries. DMC helps founders understand genuine-enterprise and funding requirements.",
  },
  {
    src: `${IMG}/business/citizenship.webp`,
    alt: "Passport and travel documents",
    label: "SECOND PASSPORTS",
    title: "Citizenship by investment",
    body: "Some jurisdictions offer citizenship through investment. DMC outlines due-diligence, timeline and family-inclusion considerations transparently.",
  },
  {
    src: `${IMG}/common/globe.webp`,
    alt: "World map with network connections",
    label: "GLOBAL MOBILITY",
    title: "A world of options",
    body: "Business plans move across borders. DMC maps your investment, family and mobility goals onto the jurisdictions that fit.",
  },
];

const STUDY_FAMILY: GalleryItem[] = [
  {
    src: `${IMG}/study/campus.webp`,
    alt: "University campus with students walking",
    label: "CAMPUS LIFE",
    title: "Study on world-ranked campuses",
    body: "Canada, Australia, the UK and the USA host leading institutions. DMC helps you compare study paths that match your goals and budget.",
  },
  {
    src: `${IMG}/study/graduation.webp`,
    alt: "Graduation ceremony with caps thrown",
    label: "GRADUATION DAY",
    title: "A degree that travels",
    body: "Graduate outcomes shape work-permit and PR options later. DMC explains how study can connect to longer-term immigration pathways.",
  },
  {
    src: `${IMG}/study/classroom.webp`,
    alt: "Modern classroom in session",
    label: "IN-CLASS LEARNING",
    title: "Learning that fits your plan",
    body: "Classroom, hybrid and distance formats all appear in study applications. DMC reviews institution and programme choices with you.",
  },
  {
    src: `${IMG}/study/students.webp`,
    alt: "Students studying together",
    label: "PEER COMMUNITY",
    title: "Settle into student life",
    body: "A strong peer network eases the first year abroad. DMC includes pre-departure and arrival guidance in its study support.",
  },
  {
    src: `${IMG}/study/library.webp`,
    alt: "University library reading room",
    label: "RESEARCH & STUDY",
    title: "Libraries, labs and language",
    body: "Research-intensive programmes demand strong language and documentation. DMC prepares the study-permit file behind your offer letter.",
  },
  {
    src: `${IMG}/study/ielts.webp`,
    alt: "Student studying with notes",
    label: "LANGUAGE READINESS",
    title: "IELTS and CLB strategy",
    body: "Language results drive points across programmes. DMC supports IELTS preparation and explains how scores convert to CLB levels.",
  },
];

const STUDY_CANADA: GalleryItem[] = [
  {
    src: `${IMG}/study/campus.webp`,
    alt: "University campus with students walking",
    label: "CAMPUS LIFE",
    title: "Study on Canadian campuses",
    body: "Canada hosts leading institutions across Ontario, BC and beyond. DMC compares study paths that fit your goals, budget and post-study plans.",
  },
  {
    src: `${IMG}/study/graduation.webp`,
    alt: "Graduation ceremony with caps thrown",
    label: "GRADUATION DAY",
    title: "Graduate with options",
    body: "Post-graduation work permits can connect Canadian study to longer-term work and permanent-residence pathways. DMC explains the links.",
  },
  {
    src: `${IMG}/canada/flag.webp`,
    alt: "Canadian flag against a city skyline",
    label: "PERMITS UNDER IRCC",
    title: "Study permits, not visas",
    body: "A study permit is issued by IRCC and entry to Canada still needs a visa or eTA. DMC prepares the full entry file with you.",
  },
  {
    src: `${IMG}/canada/montreal.webp`,
    alt: "Montreal cityscape, Canada",
    label: "BILINGUAL CANADA",
    title: "English and French campuses",
    body: "French-language study is an option in Quebec and elsewhere. DMC reviews language requirements for your programme and province.",
  },
  {
    src: `${IMG}/study/library.webp`,
    alt: "University library reading room",
    label: "RESEARCH & STUDY",
    title: "Libraries, labs and learning",
    body: "Research-intensive programmes demand strong language and documentation. DMC prepares the study-permit file behind your offer letter.",
  },
  {
    src: `${IMG}/study/ielts.webp`,
    alt: "Student studying with notes",
    label: "LANGUAGE READINESS",
    title: "English for study and work",
    body: "Language results drive admission and later pathways. DMC supports IELTS preparation and explains how scores convert to CLB levels.",
  },
];

const STUDY_AUSTRALIA: GalleryItem[] = [
  {
    src: `${IMG}/study/campus.webp`,
    alt: "University campus with students walking",
    label: "CAMPUS LIFE",
    title: "Study in Australia",
    body: "Australian institutions rank among the world's best. DMC compares courses, campuses and student-visa requirements for your goals.",
  },
  {
    src: `${IMG}/study/graduation.webp`,
    alt: "Graduation ceremony with caps thrown",
    label: "GRADUATION DAY",
    title: "Graduate with options",
    body: "Temporary Graduate pathways can follow Australian study. DMC explains how a degree can connect to longer-term work and PR routes.",
  },
  {
    src: `${IMG}/australia/sydney-opera.webp`,
    alt: "Sydney Opera House and harbour",
    label: "SYDNEY",
    title: "Sydney's university belt",
    body: "Sydney hosts some of Australia's largest campuses. DMC reviews city, institution and lifestyle factors together.",
  },
  {
    src: `${IMG}/australia/melbourne.webp`,
    alt: "Melbourne city skyline, Australia",
    label: "MELBOURNE",
    title: "Melbourne student life",
    body: "Consistently ranked liveable, Melbourne suits long study programmes. DMC factors regional study and living costs into your plan.",
  },
  {
    src: `${IMG}/study/students.webp`,
    alt: "Students studying together",
    label: "PEER COMMUNITY",
    title: "Settle into student life",
    body: "A strong peer network eases the first year abroad. DMC includes pre-departure and arrival guidance in its study support.",
  },
  {
    src: `${IMG}/study/ielts.webp`,
    alt: "Student studying with notes",
    label: "LANGUAGE READINESS",
    title: "English for your course",
    body: "Most Australian courses require strong English results. DMC supports preparation and confirms the current benchmarks for your course.",
  },
];

const STUDY_UK_USA: GalleryItem[] = [
  {
    src: `${IMG}/uk/oxford.webp`,
    alt: "Oxford University architecture",
    label: "OXFORD & BEYOND",
    title: "Heritage campuses",
    body: "The UK's universities attract students and researchers worldwide. DMC supports study and graduate-visa conversations with clear guidance.",
  },
  {
    src: `${IMG}/uk/big-ben.webp`,
    alt: "Big Ben and the Houses of Parliament, London",
    label: "LONDON",
    title: "London's academic scene",
    body: "London is home to world-ranked institutions and global employers. DMC reviews programmes, costs and post-study routes in the UK.",
  },
  {
    src: `${IMG}/visit-visas/usa.webp`,
    alt: "New York City skyline, USA",
    label: "AMERICAN CAMPUSES",
    title: "Study in the USA",
    body: "American universities range from research giants to liberal-arts colleges. DMC explains the F-1 process and OPT context.",
  },
  {
    src: `${IMG}/study/library.webp`,
    alt: "University library reading room",
    label: "RESEARCH & STUDY",
    title: "Libraries, labs and language",
    body: "Strong language and documentation sit behind every successful student file. DMC prepares your study-visa evidence.",
  },
  {
    src: `${IMG}/study/campus.webp`,
    alt: "University campus with students walking",
    label: "CAMPUS LIFE",
    title: "Choose the right campus",
    body: "City or campus, public or private — the choice shapes cost and outcome. DMC helps you compare institutions on the facts.",
  },
  {
    src: `${IMG}/study/graduation.webp`,
    alt: "Graduation ceremony with caps thrown",
    label: "GRADUATION DAY",
    title: "A degree that travels",
    body: "Graduate outcomes shape work-permit and PR options later. DMC explains how study can connect to longer-term pathways.",
  },
];

const STUDY_UK: GalleryItem[] = [
  {
    src: `${IMG}/uk/oxford.webp`,
    alt: "Oxford University architecture",
    label: "HERITAGE CAMPUSES",
    title: "Oxford, Cambridge and beyond",
    body: "The UK's universities attract students and researchers worldwide. DMC supports study and graduate-visa conversations with clear guidance.",
  },
  {
    src: `${IMG}/uk/big-ben.webp`,
    alt: "Big Ben and the Houses of Parliament, London",
    label: "LONDON",
    title: "London's academic scene",
    body: "London is home to world-ranked institutions and global employers. DMC reviews programmes, living costs and post-study routes.",
  },
  {
    src: `${IMG}/study/library.webp`,
    alt: "University library reading room",
    label: "RESEARCH & STUDY",
    title: "Libraries, labs and language",
    body: "Research-intensive programmes demand strong language and documentation. DMC prepares the student-visa file behind your CAS.",
  },
  {
    src: `${IMG}/study/campus.webp`,
    alt: "University campus with students walking",
    label: "CAMPUS LIFE",
    title: "Choose the right campus",
    body: "City or campus, redbrick or Russell Group — the choice shapes cost and outcome. DMC helps you compare institutions on the facts.",
  },
  {
    src: `${IMG}/study/students.webp`,
    alt: "Students studying together",
    label: "PEER COMMUNITY",
    title: "Settle into student life",
    body: "A strong peer network eases the first year abroad. DMC includes pre-departure and arrival guidance in its study support.",
  },
  {
    src: `${IMG}/study/ielts.webp`,
    alt: "Student studying with notes",
    label: "LANGUAGE READINESS",
    title: "English for your course",
    body: "UK student visas require recognised English. DMC supports preparation and confirms the current benchmarks for your course.",
  },
];

const STUDY_USA: GalleryItem[] = [
  {
    src: `${IMG}/visit-visas/usa.webp`,
    alt: "New York City skyline, USA",
    label: "AMERICAN CAMPUSES",
    title: "Study in the USA",
    body: "American universities range from research giants to liberal-arts colleges. DMC explains the F-1 process and OPT context.",
  },
  {
    src: `${IMG}/study/campus.webp`,
    alt: "University campus with students walking",
    label: "CAMPUS LIFE",
    title: "Campuses across the states",
    body: "From coastal cities to college towns, the USA hosts thousands of accredited programmes. DMC helps you compare them on the facts.",
  },
  {
    src: `${IMG}/study/library.webp`,
    alt: "University library reading room",
    label: "RESEARCH & STUDY",
    title: "Research and facilities",
    body: "Strong language and documentation sit behind every successful student file. DMC prepares your F-1 visa evidence.",
  },
  {
    src: `${IMG}/study/students.webp`,
    alt: "Students studying together",
    label: "PEER COMMUNITY",
    title: "Settle into student life",
    body: "Campus life is part of the American study experience. DMC includes pre-departure and arrival guidance in its study support.",
  },
  {
    src: `${IMG}/study/graduation.webp`,
    alt: "Graduation ceremony with caps thrown",
    label: "GRADUATION DAY",
    title: "A degree that travels",
    body: "Graduate outcomes shape OPT and longer-term options. DMC explains how study can connect to career pathways in the USA.",
  },
  {
    src: `${IMG}/study/ielts.webp`,
    alt: "Student studying with notes",
    label: "LANGUAGE READINESS",
    title: "English-proficiency tests",
    body: "US programmes commonly require TOEFL or IELTS results. DMC supports preparation and confirms the current benchmarks for your course.",
  },
];

const ATLANTIC_CANADA: GalleryItem[] = [
  {
    src: `${IMG}/canada/lighthouse.webp`,
    alt: "Lighthouse on the Atlantic Canadian coast",
    label: "ATLANTIC COAST",
    title: "The Atlantic coastline",
    body: "Lighthouses mark the shores of Nova Scotia, New Brunswick, PEI and Newfoundland & Labrador. DMC reviews the designated-employer route that leads there.",
  },
  {
    src: `${IMG}/canada/small-town.webp`,
    alt: "Small Canadian town main street",
    label: "COMMUNITY LIFE",
    title: "Small towns, big welcomes",
    body: "Atlantic communities rely on skilled newcomers. DMC explains how settlement planning is part of the provincial endorsement step.",
  },
  {
    src: `${IMG}/canada/maple-leaf.webp`,
    alt: "Canadian maple leaf",
    label: "FEDERAL PROGRAM",
    title: "A federal route with provincial roots",
    body: "The AIP is a federal permanent-residence program powered by employer offers and provincial endorsement. DMC keeps both stages aligned.",
  },
  {
    src: `${IMG}/canada/flag.webp`,
    alt: "Canadian flag against a city skyline",
    label: "PERMANENT RESIDENCE",
    title: "The final decision sits with IRCC",
    body: "After endorsement, the permanent-residence application is decided by IRCC. DMC prepares the federal file to be decision-ready.",
  },
  {
    src: `${IMG}/common/passport.webp`,
    alt: "Passport with boarding pass",
    label: "DOCUMENT TRAIL",
    title: "The file behind the offer",
    body: "Identity, education, language and work records all matter. DMC coordinates the evidence across the applicant and employer file.",
  },
  {
    src: `${IMG}/common/plane-window.webp`,
    alt: "View from an aircraft window above the clouds",
    label: "THE MOVE EAST",
    title: "Plan the move, not just the visa",
    body: "Pre-landing preparation — housing, registration and settlement — is part of DMC's post-approval support.",
  },
];

const RURAL_COMMUNITY: GalleryItem[] = [
  {
    src: `${IMG}/canada/small-town.webp`,
    alt: "Small Canadian town main street",
    label: "RURAL COMMUNITIES",
    title: "Main streets across Canada",
    body: "RCIP communities are small towns and northern regions with employer-driven needs. DMC reviews which communities currently match your profile.",
  },
  {
    src: `${IMG}/canada/maple-leaf.webp`,
    alt: "Canadian maple leaf",
    label: "A CANADIAN PROGRAM",
    title: "RCIP replaced the RNIP",
    body: "The Rural Community Immigration Pilot is the current successor to the RNIP. DMC explains community criteria and intake differences.",
  },
  {
    src: `${IMG}/canada/flag.webp`,
    alt: "Canadian flag against a city skyline",
    label: "FEDERAL DECISION",
    title: "The federal stage",
    body: "Community recommendation supports, but does not replace, the IRCC permanent-residence decision. DMC prepares the federal file.",
  },
  {
    src: `${IMG}/canada/moraine-lake.webp`,
    alt: "Moraine Lake, Banff National Park, Alberta",
    label: "REGIONAL LANDSCAPES",
    title: "Beyond the big cities",
    body: "Rural and northern Canada spans provinces and territories, each with its own participating communities and occupation priorities.",
  },
  {
    src: `${IMG}/common/passport.webp`,
    alt: "Passport with boarding pass",
    label: "YOUR FILE",
    title: "Identity and work evidence",
    body: "Passports, qualifications, language results and work history support the employer offer and community recommendation.",
  },
  {
    src: `${IMG}/common/documents.webp`,
    alt: "Documents and notes on a desk",
    label: "DECISION-READY FILES",
    title: "Consistency across the file",
    body: "DMC runs a structured document review so the offer, recommendation and federal application tell one consistent story.",
  },
];

const FAMILY_THEMED: GalleryItem[] = [
  {
    src: `${IMG}/common/family-generations.webp`,
    alt: "Multi-generational family together",
    label: "FAMILY FIRST",
    title: "Planning across generations",
    body: "Sponsorship decisions affect the whole family. DMC helps sponsors understand income, undertaking and documentation requirements from day one.",
  },
  {
    src: `${IMG}/common/family-elderly.webp`,
    alt: "Older couple smiling together",
    label: "PARENTS & GRANDPARENTS",
    title: "Bringing parents and grandparents",
    body: "The PGP and Super Visa both serve parents and grandparents. DMC explains the lottery process and the extended-visit alternative.",
  },
  {
    src: `${IMG}/common/family.webp`,
    alt: "Happy family together",
    label: "TOGETHER IN CANADA",
    title: "A shared permanent-residence plan",
    body: "When a sponsor qualifies, the whole household plans for Canada. DMC coordinates the family file end to end.",
  },
  {
    src: `${IMG}/canada/flag.webp`,
    alt: "Canadian flag against a city skyline",
    label: "CANADA ROUTE",
    title: "The Canadian route",
    body: "The PGP is a permanent-residence route decided by IRCC. DMC verifies current intake rules and income benchmarks before you apply.",
  },
  {
    src: `${IMG}/common/passport.webp`,
    alt: "Passport with boarding pass",
    label: "DOCUMENT TRAIL",
    title: "Evidence behind the sponsorship",
    body: "Tax notices, relationship and identity records all matter. DMC runs a structured document review across sponsor and applicant files.",
  },
  {
    src: `${IMG}/common/plane-window.webp`,
    alt: "View from an aircraft window above the clouds",
    label: "REUNITED ABROAD",
    title: "Visits while you wait",
    body: "While PGP selection is pending, the Super Visa allows extended visits. DMC prepares the visitor evidence that supports each trip.",
  },
];

const VISIT_FAMILY: GalleryItem[] = [
  {
    src: `${IMG}/common/airport.webp`,
    alt: "Airport terminal with a plane at the gate",
    label: "TRAVEL HUB",
    title: "Global travel starts here",
    body: "Visit visas open doors to business trips, tourism and family visits. DMC reviews the visitor route that fits your travel purpose.",
  },
  {
    src: `${IMG}/common/globe.webp`,
    alt: "World map with network connections",
    label: "WORLD MAP",
    title: "Find your destination on the map",
    body: "Every visitor application is tied to one destination and purpose. DMC confirms the right route for your passport and travel plan.",
  },
  {
    src: `${IMG}/common/passport.webp`,
    alt: "Passport with boarding pass",
    label: "PASSPORT & VISAS",
    title: "Know your visa requirements",
    body: "Visa-free entry, e-visas and embassy applications vary by nationality. DMC confirms the correct route for your passport.",
  },
  {
    src: `${IMG}/common/luggage.webp`,
    alt: "Travel luggage at an airport",
    label: "PACK & GO",
    title: "Purpose-built travel evidence",
    body: "Visitor applications rely on ties, funds and purpose. DMC helps you present evidence clearly and consistently.",
  },
  {
    src: `${IMG}/common/documents.webp`,
    alt: "Documents and notes on a desk",
    label: "DOCUMENT REVIEW",
    title: "Files that answer every question",
    body: "Bank statements, invitations and employment letters all matter. DMC runs a structured document review before you submit.",
  },
  {
    src: `${IMG}/common/family.webp`,
    alt: "Happy family together",
    label: "TRAVEL TOGETHER",
    title: "Visits that bring families closer",
    body: "Family visits are among the most common visit-visa purposes. DMC supports applicants across the household in one coordinated file.",
  },
];

const SERVICES_FAMILY: GalleryItem[] = [
  {
    src: `${IMG}/services/resume.webp`,
    alt: "Resume document and pen",
    label: "RESUME BUILDING",
    title: "A resume that opens doors",
    body: "Your resume is your first impression with employers. DMC's resume marketing service shapes it around the roles you are targeting.",
  },
  {
    src: `${IMG}/common/consultation.webp`,
    alt: "Consultant advising a client",
    label: "CAREER COUNSELLING",
    title: "Guidance beyond the document",
    body: "Career counselling aligns your profile with realistic opportunities. DMC connects your resume strategy with your immigration plan.",
  },
  {
    src: `${IMG}/common/documents.webp`,
    alt: "Application documents on a desk",
    label: "APPLICATION FILES",
    title: "Consistent, decision-ready files",
    body: "Employers and visa officers read consistency. DMC keeps your resume, references and application records aligned.",
  },
  {
    src: `${IMG}/common/office-meeting.webp`,
    alt: "Business meeting in progress",
    label: "INTERVIEW READY",
    title: "Prepare for employer conversations",
    body: "Strong interviews follow strong preparation. DMC helps you present experience, skills and career direction with confidence.",
  },
  {
    src: `${IMG}/common/office-team.webp`,
    alt: "Professional team collaborating in an office",
    label: "CAREER NETWORK",
    title: "Support from a professional team",
    body: "DMC's consultants, case officers and language partners work as one team behind your job-search and visa goals.",
  },
];

const SITE_FAMILY: GalleryItem[] = [
  {
    src: `${IMG}/common/consultation.webp`,
    alt: "Consultant advising a client at a desk",
    label: "EXPERT GUIDANCE",
    title: "Advice grounded in the rules",
    body: "DMC's consultants explain current programs, eligibility and documents in plain language — never promising outcomes.",
  },
  {
    src: `${IMG}/common/office-team.webp`,
    alt: "DMC team collaborating in the office",
    label: "YOUR DMC TEAM",
    title: "One team across five markets",
    body: "DMC serves clients from Dubai, Abu Dhabi, Qatar, Kuwait and India with a shared standard of service.",
  },
  {
    src: `${IMG}/common/office-handshake.webp`,
    alt: "Professional handshake",
    label: "TRUST & TRANSPARENCY",
    title: "Clear scope, clear fees",
    body: "DMC outlines what it can and cannot do at the first consultation, so you decide with full information.",
  },
  {
    src: `${IMG}/common/documents.webp`,
    alt: "Documents and notes on a desk",
    label: "PAPERWORK CLARITY",
    title: "Documents without the guesswork",
    body: "Structured checklists and case coordination keep applications consistent and decision-ready.",
  },
  {
    src: `${IMG}/common/family.webp`,
    alt: "Happy family together",
    label: "FAMILIES FIRST",
    title: "Decisions that include everyone",
    body: "Family members are part of most applications. DMC plans for dependants, sponsorship and settlement together.",
  },
  {
    src: `${IMG}/common/globe.webp`,
    alt: "World map with network connections",
    label: "GLOBAL MOBILITY",
    title: "One destination is rarely the end",
    body: "Careers move across borders. DMC helps you plan current and future mobility with a long-term view.",
  },
];

// ── Exact page overrides ───────────────────────────────────────────────────

const PAGE_GALLERY: Record<string, GalleryItem[]> = {
  "visas/canada/express-entry": CANADA_FAMILY,
  "visas/canada/study-permits": STUDY_CANADA,
  "visas/canada/atlantic-immigration-program": ATLANTIC_CANADA,
  "visas/canada/rural-and-northern-immigration-pilot": RURAL_COMMUNITY,
  "visas/canada/family-sponsorship-parent-grandparent-program": FAMILY_THEMED,
  "study-abroad/canada-student-visas": STUDY_CANADA,
  "study-abroad/australia-student-visas": STUDY_AUSTRALIA,
  "study-abroad/uk-usa-student-visas": STUDY_UK_USA,
  "study-abroad/uk-student-visas": STUDY_UK,
  "study-abroad/usa-student-visas": STUDY_USA,
  "visit-visas/canada": [
    {
      src: `${IMG}/canada/niagara.webp`,
      alt: "Niagara Falls, Canada",
      label: "CANADA",
      title: "Why visit Canada",
      body: "From Niagara to the Rockies, Canada rewards visitors with world-class scenery. DMC prepares visitor files that clearly show travel intent and ties.",
    },
    {
      src: `${IMG}/canada/banff.webp`,
      alt: "Banff mountains, Canada",
      label: "FAMOUS LANDMARKS",
      title: "National parks and city breaks",
      body: "Banff, Jasper and the coastal cities anchor most Canada itineraries. DMC matches your planned route to the right visitor route.",
    },
    {
      src: `${IMG}/common/passport.webp`,
      alt: "Passport with boarding pass",
      label: "PASSPORT & VISAS",
      title: "TRV or eTA — know the difference",
      body: "Some visitors need a Temporary Resident Visa, others an eTA. DMC confirms the correct requirement for your passport and trip.",
    },
    {
      src: `${IMG}/canada/flag.webp`,
      alt: "Canadian flag against a city skyline",
      label: "CANADIAN FLAG",
      title: "Entry under the maple leaf",
      body: "Canada's entry rules sit with IRCC. DMC verifies current visitor requirements and documents before you apply.",
    },
    {
      src: `${IMG}/common/documents.webp`,
      alt: "Documents on a desk",
      label: "DOCUMENT REVIEW",
      title: "Evidence that answers the officer",
      body: "Employment, funds and family ties are the core of a visitor file. DMC runs a structured document review before submission.",
    },
    {
      src: `${IMG}/common/family.webp`,
      alt: "Happy family together",
      label: "FAMILY VISITS",
      title: "Visiting family in Canada",
      body: "Family reunions are a common visitor purpose. DMC supports the whole household in one coordinated application.",
    },
  ],
};

// ── Resolution ─────────────────────────────────────────────────────────────

const DESTINATION_NAMES: Record<string, string> = {
  canada: "Canada",
  usa: "the USA",
  australia: "Australia",
  uk: "the UK",
  "new-zealand": "New Zealand",
  china: "China",
  japan: "Japan",
  turkey: "Turkey",
  "south-korea": "South Korea",
  greece: "Greece",
  thailand: "Thailand",
  singapore: "Singapore",
  "saudi-arabia": "Saudi Arabia",
  uae: "the UAE",
  "south-africa": "South Africa",
  cyprus: "Cyprus",
  netherlands: "the Netherlands",
};

function travelGallery(destination: string, hero: { src: string; alt: string } | undefined): GalleryItem[] {
  const cards: GalleryItem[] = [];
  if (hero) {
    cards.push({
      src: hero.src,
      alt: hero.alt,
      label: "DESTINATION",
      title: `Why visit ${destination}`,
      body: `${destination} welcomes visitors for business, holidays and family trips. DMC reviews the visitor route that fits your travel purpose and passport.`,
    });
  }
  cards.push(
    {
      src: `${IMG}/common/passport.webp`,
      alt: "Passport with boarding pass",
      label: "PASSPORT & VISAS",
      title: "Know the entry requirement",
      body: "Visa-free entry, e-visas and embassy applications vary by nationality. DMC confirms the correct route for your passport.",
    },
    {
      src: `${IMG}/common/globe.webp`,
      alt: "World map with network connections",
      label: "WORLD MAP",
      title: "Your destination on the map",
      body: "Every visitor application is tied to one destination and purpose. DMC matches your itinerary to the right entry route.",
    },
    {
      src: `${IMG}/common/airport.webp`,
      alt: "Airport terminal with a plane at the gate",
      label: "TRAVEL HUB",
      title: "Plan the journey, not just the visa",
      body: "Strong itineraries and clear travel intent strengthen visit applications. DMC prepares the story behind your documents.",
    },
    {
      src: `${IMG}/common/documents.webp`,
      alt: "Documents and notes on a desk",
      label: "DOCUMENT REVIEW",
      title: "Files that answer every question",
      body: "Bank statements, invitations and employment letters all matter. DMC runs a structured document review before you submit.",
    },
    {
      src: `${IMG}/common/family.webp`,
      alt: "Happy family together",
      label: "TRAVEL TOGETHER",
      title: "Visits that bring families closer",
      body: "Family visits are among the most common visitor purposes. DMC supports applicants across the household in one coordinated file.",
    },
  );
  return cards.slice(0, 6);
}

const FAMILY_PREFIXES: Array<[string, GalleryItem[]]> = [
  ["visas/canada/", CANADA_FAMILY],
  ["visas/australia/", AUSTRALIA_FAMILY],
  ["visas/uk/", UK_FAMILY],
  ["business-investment/", BUSINESS_FAMILY],
  ["study-abroad/", STUDY_FAMILY],
  ["services/", SERVICES_FAMILY],
  ["visit-visas", VISIT_FAMILY],
  ["tools/canada", CANADA_FAMILY],
  ["tools/australia", AUSTRALIA_FAMILY],
  ["visas/canada", CANADA_FAMILY],
  ["visas/australia", AUSTRALIA_FAMILY],
  ["visas/uk", UK_FAMILY],
];

/** Resolve the six-card gallery for a canonical page id. */
export function galleryFor(pageId: string): GalleryItem[] {
  const exact = PAGE_GALLERY[pageId];
  if (exact) return exact;

  if (pageId.startsWith("visit-visas/")) {
    const slug = pageId.split("/").pop() ?? "";
    const destination = DESTINATION_NAMES[slug];
    if (destination) {
      const hero = pageMedia(pageId).split;
      return travelGallery(destination, hero ? { src: hero.src, alt: hero.alt } : undefined);
    }
  }

  const family = FAMILY_PREFIXES.find(([prefix]) => pageId.startsWith(prefix));
  if (family) return family[1];

  return SITE_FAMILY;
}
