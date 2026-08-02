import type { PageContent, PageSection } from "@/content/pages/types";

const NATIONALITY_NOTE =
  "Entry requirements depend on your nationality, current residence and travel history, and they change frequently. Confirm your personal position on the official government source before travelling.";

function destinationSections(overview: string[], panelRows: { label: string; value: string }[], requirements: { title: string; body: string }[]): PageSection[] {
  return [
    {
      kind: "overview",
      heading: "Visiting overview",
      paragraphs: overview,
    },
    {
      kind: "panel",
      heading: "Key facts",
      rows: panelRows,
      note: NATIONALITY_NOTE,
    },
    {
      kind: "requirements",
      heading: "What a complete application usually needs",
      items: requirements,
    },
  ];
}

const VISIT_DISCLAIMER_FAQ = [
  {
    question: "Does my nationality determine what I need?",
    answer:
      "Yes. Visa-free entry, visa-on-arrival arrangements and visa requirements all depend on your passport and, for some countries, your residence status. Always verify your position on the official source for your nationality.",
  },
  {
    question: "How far ahead should I apply?",
    answer:
      "Most visa applications can be submitted months ahead, and processing varies from days to several weeks by country and season. Check the official processing times for your country of residence before booking travel.",
  },
  {
    question: "Can DMC help with visit visas?",
    answer:
      "Yes. DMC prepares and reviews visitor-visa applications from its offices in Dubai, Abu Dhabi, Qatar, Kuwait and India — document checking, funds and ties evidence, application forms and interview preparation. No consultant can guarantee an approval.",
  },
];

export const VISIT_VISA_PAGES: PageContent[] = [
  {
    id: "visit-visas",
    title: "Global Visit Visas",
    eyebrow: "Visit visas",
    seoTitle: "Global Visit Visas — More Destinations | DMC Immigration Group",
    seoDescription:
      "Visit-visa guidance for Canada, USA, Australia, UK, New Zealand, China, Japan, Turkey, South Korea, Greece, Thailand, Singapore, Saudi Arabia, UAE, South Africa, Cyprus and the Netherlands.",
    lede: "One team, seventeen destinations of visit-visa expertise — practical guidance for tourism, family visits and business trips from our offices in Dubai, Abu Dhabi, Qatar, Kuwait and India.",
    sections: [
      {
        kind: "overview",
        heading: "Visit visas, handled seriously",
        paragraphs: [
          "A visitor visa application is judged on purpose, funds, ties and compliance. The same rigour that builds strong migration files applies to short-stay visits — evidence of your reason to travel, your means, and your intention to return.",
          "Below you will find a directory of individual destination guides and combined hubs for the most common travel combinations.",
        ],
      },
      {
        kind: "links",
        heading: "Combined destination hubs",
        items: [
          { title: "Canada, USA & Australia", path: "/visit-visas/canada-usa-australia", description: "The three most-requested long-haul visit routes." },
          { title: "UK & New Zealand", path: "/visit-visas/uk-new-zealand", description: "Commonwealth routes for work, study and family visits." },
          { title: "China, Japan & Turkey", path: "/visit-visas/china-japan-turkey", description: "Popular Asian and Eurasian business and leisure routes." },
          { title: "South Korea, Greece & Thailand", path: "/visit-visas/south-korea-greece-thailand", description: "K-ETA, Schengen and visa-free entry covered." },
          { title: "Singapore, Saudi Arabia & UAE", path: "/visit-visas/singapore-saudi-arabia-uae", description: "Short-haul regional travel for GCC-based families." },
          { title: "South Africa, Cyprus & Netherlands", path: "/visit-visas/south-africa-cyprus-netherlands", description: "African, Mediterranean and European short-stay routes." },
        ],
      },
      {
        kind: "links",
        heading: "Individual destination guides",
        items: [
          { title: "Canada Visit Visa", path: "/visit-visas/canada" },
          { title: "USA", path: "/visit-visas/usa" },
          { title: "Australia", path: "/visit-visas/australia" },
          { title: "United Kingdom", path: "/visit-visas/uk" },
          { title: "New Zealand", path: "/visit-visas/new-zealand" },
          { title: "China", path: "/visit-visas/china" },
          { title: "Japan", path: "/visit-visas/japan" },
          { title: "Turkey", path: "/visit-visas/turkey" },
          { title: "South Korea", path: "/visit-visas/south-korea" },
          { title: "Greece", path: "/visit-visas/greece" },
          { title: "Thailand", path: "/visit-visas/thailand" },
          { title: "Singapore", path: "/visit-visas/singapore" },
          { title: "Saudi Arabia", path: "/visit-visas/saudi-arabia" },
          { title: "UAE", path: "/visit-visas/uae" },
          { title: "South Africa", path: "/visit-visas/south-africa" },
          { title: "Cyprus", path: "/visit-visas/cyprus" },
          { title: "Netherlands", path: "/visit-visas/netherlands" },
        ],
      },
      {
        kind: "faq",
        heading: "Visit visas, answered",
        items: VISIT_DISCLAIMER_FAQ,
      },
    ],
    relatedPages: ["visas/canada/express-entry", "visit-visas/canada-usa-australia"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "Destination guides — see each individual page for its official source", url: "https://www.dmcimmigrationgroup.com" },
    ],
  },
  {
    id: "visit-visas/canada-usa-australia",
    title: "Canada, USA & Australia Visit Visas",
    eyebrow: "Visit visas",
    seoTitle: "Canada, USA & Australia Visit Visas | DMC Immigration Group",
    seoDescription:
      "Combined visit-visa hub for the three most-requested long-haul routes — Canada TRV, USA B1/B2 and Australia Visitor visa 600.",
    lede: "The three most-requested long-haul visitor routes from the Gulf and India, compared in one place.",
    sections: [
      { kind: "overview", heading: "Three routes, one preparation discipline", paragraphs: ["Canada, the USA and Australia each assess visitors on purpose, funds and ties — but each has its own application system, fees and interview culture. These guides cover each route separately.", NATIONALITY_NOTE] },
      {
        kind: "links",
        heading: "Destination guides",
        items: [
          { title: "Canada Visit Visa", path: "/visit-visas/canada", description: "TRV and eTA entry; up to 6 months per visit; strong evidence culture." },
          { title: "USA (B1/B2)", path: "/visit-visas/usa", description: "DS-160, interview and the $185 fee; multi-year validity for many nationalities." },
          { title: "Australia (Visitor 600)", path: "/visit-visas/australia", description: "Online application; stays typically 3–12 months; no work permitted." },
        ],
      },
      { kind: "faq", heading: "Long-haul visits, answered", items: VISIT_DISCLAIMER_FAQ },
    ],
    relatedPages: ["visit-visas", "visit-visas/uk-new-zealand"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "See each destination guide for official sources", url: "https://www.dmcimmigrationgroup.com" },
    ],
  },
  {
    id: "visit-visas/uk-new-zealand",
    title: "UK & New Zealand Visit Visas",
    eyebrow: "Visit visas",
    seoTitle: "UK & New Zealand Visit Visas | DMC Immigration Group",
    seoDescription:
      "Combined visit-visa hub for the UK Standard Visitor visa and the New Zealand Visitor visa — requirements, fees and evidence.",
    lede: "Two Commonwealth destinations with structured visitor routes — the UK Standard Visitor visa and the New Zealand Visitor visa.",
    sections: [
      { kind: "overview", heading: "Two structured routes", paragraphs: ["The UK and New Zealand both run fully online visitor applications with clear evidence requirements. Neither permits work, and both weigh ties to your home country heavily.", NATIONALITY_NOTE] },
      {
        kind: "links",
        heading: "Destination guides",
        items: [
          { title: "United Kingdom", path: "/visit-visas/uk", description: "Standard Visitor visa; 6-month to 10-year options; online application." },
          { title: "New Zealand", path: "/visit-visas/new-zealand", description: "Visitor visa with e-visa processing; NZD fees plus the International Visitor Levy." },
        ],
      },
      { kind: "faq", heading: "UK and New Zealand visits, answered", items: VISIT_DISCLAIMER_FAQ },
    ],
    relatedPages: ["visit-visas", "visit-visas/canada-usa-australia"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "See each destination guide for official sources", url: "https://www.dmcimmigrationgroup.com" },
    ],
  },
  {
    id: "visit-visas/china-japan-turkey",
    title: "China, Japan & Turkey Visit Visas",
    eyebrow: "Visit visas",
    seoTitle: "China, Japan & Turkey Visit Visas | DMC Immigration Group",
    seoDescription:
      "Combined visit-visa hub for China (visa-free entry and L visa), Japan (visa-free or embassy visa) and Turkey (e-visa).",
    lede: "Three Asian and Eurasian routes that mix visa-free entry, e-visas and embassy applications — know which applies to you.",
    sections: [
      { kind: "overview", heading: "Entry rules that vary by nationality", paragraphs: ["China, Japan and Turkey each operate nationality-based entry rules that change periodically — from full visa-free access for some passports to strict embassy visas for others. The official tools below are the reliable starting point.", NATIONALITY_NOTE] },
      {
        kind: "links",
        heading: "Destination guides",
        items: [
          { title: "China", path: "/visit-visas/china", description: "Visa-free entry for many nationalities (policy reviewed); L visa otherwise." },
          { title: "Japan", path: "/visit-visas/japan", description: "Visa-free for many nationalities; embassy visa for others." },
          { title: "Turkey", path: "/visit-visas/turkey", description: "Official e-visa portal for eligible nationalities; visa-free for several." },
        ],
      },
      { kind: "faq", heading: "Asian routes, answered", items: VISIT_DISCLAIMER_FAQ },
    ],
    relatedPages: ["visit-visas", "visit-visas/south-korea-greece-thailand"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "See each destination guide for official sources", url: "https://www.dmcimmigrationgroup.com" },
    ],
  },
  {
    id: "visit-visas/south-korea-greece-thailand",
    title: "South Korea, Greece & Thailand Visit Visas",
    eyebrow: "Visit visas",
    seoTitle: "South Korea, Greece & Thailand Visit Visas | DMC Immigration Group",
    seoDescription:
      "Combined visit-visa hub for South Korea (K-ETA), Greece (Schengen) and Thailand (visa-free entry or e-visa).",
    lede: "K-ETA for South Korea, Schengen for Greece and flexible entry for Thailand — three very different application cultures.",
    sections: [
      { kind: "overview", heading: "Three application cultures", paragraphs: ["South Korea's K-ETA is a quick electronic step for visa-free nationalities; Greece requires a full Schengen file with biometrics; Thailand offers visa-free entry for many passports and e-visas for the rest.", NATIONALITY_NOTE] },
      {
        kind: "links",
        heading: "Destination guides",
        items: [
          { title: "South Korea", path: "/visit-visas/south-korea", description: "K-ETA electronic authorisation; embassy visa otherwise." },
          { title: "Greece", path: "/visit-visas/greece", description: "Schengen short-stay visa; 90 days in any 180-day period." },
          { title: "Thailand", path: "/visit-visas/thailand", description: "Visa-free entry for many nationalities; Visa on Arrival and e-visa options." },
        ],
      },
      { kind: "faq", heading: "South Korea, Greece and Thailand, answered", items: VISIT_DISCLAIMER_FAQ },
    ],
    relatedPages: ["visit-visas", "visit-visas/china-japan-turkey"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "See each destination guide for official sources", url: "https://www.dmcimmigrationgroup.com" },
    ],
  },
  {
    id: "visit-visas/singapore-saudi-arabia-uae",
    title: "Singapore, Saudi Arabia & UAE Visit Visas",
    eyebrow: "Visit visas",
    seoTitle: "Singapore, Saudi Arabia & UAE Visit Visas | DMC Immigration Group",
    seoDescription:
      "Combined visit-visa hub for Singapore, Saudi Arabia and the UAE — regional short-haul travel for GCC and India residents.",
    lede: "Short-haul regional travel for families across the Gulf and India — Singapore's visa-free entry, Saudi Arabia's e-visa and UAE entry arrangements.",
    sections: [
      { kind: "overview", heading: "Regional travel, regional rules", paragraphs: ["Singapore, Saudi Arabia and the UAE have nationality-based entry systems — some passports enter visa-free, others need e-visas or on-arrival stamps. DMC's offices in Dubai, Abu Dhabi, Doha, Kuwait and Hyderabad give local teams a practical view of how these rules are applied.", NATIONALITY_NOTE] },
      {
        kind: "links",
        heading: "Destination guides",
        items: [
          { title: "Singapore", path: "/visit-visas/singapore", description: "Visa-free for many nationalities; SG Arrival Card for everyone." },
          { title: "Saudi Arabia", path: "/visit-visas/saudi-arabia", description: "E-visa for eligible nationalities and GCC residents in qualifying professions." },
          { title: "UAE", path: "/visit-visas/uae", description: "GCC nationals visa-free; many nationalities visa-on-arrival or pre-arranged." },
        ],
      },
      { kind: "faq", heading: "Regional visits, answered", items: VISIT_DISCLAIMER_FAQ },
    ],
    relatedPages: ["visit-visas", "visit-visas/south-africa-cyprus-netherlands"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "See each destination guide for official sources", url: "https://www.dmcimmigrationgroup.com" },
    ],
  },
  {
    id: "visit-visas/south-africa-cyprus-netherlands",
    title: "South Africa, Cyprus & Netherlands Visit Visas",
    eyebrow: "Visit visas",
    seoTitle: "South Africa, Cyprus & Netherlands Visit Visas | DMC Immigration Group",
    seoDescription:
      "Combined visit-visa hub for South Africa, Cyprus and the Netherlands — e-visas, eVisa portals and Schengen processing.",
    lede: "An African, a Mediterranean and a European route — e-visa, eVisa portal and Schengen processing respectively.",
    sections: [
      { kind: "overview", heading: "Three routes with modern entry systems", paragraphs: ["South Africa has expanded its e-visa pilot; Cyprus launched an eVisa portal; the Netherlands processes full Schengen files through visa-application centres. Each guide covers the current application path.", NATIONALITY_NOTE] },
      {
        kind: "links",
        heading: "Destination guides",
        items: [
          { title: "South Africa", path: "/visit-visas/south-africa", description: "E-visa for eligible nationalities; visa-free entry for several passports." },
          { title: "Cyprus", path: "/visit-visas/cyprus", description: "eVisa portal; visa on arrival for UAE nationals." },
          { title: "Netherlands", path: "/visit-visas/netherlands", description: "Schengen short-stay visa via visa-application centres." },
        ],
      },
      { kind: "faq", heading: "South Africa, Cyprus and the Netherlands, answered", items: VISIT_DISCLAIMER_FAQ },
    ],
    relatedPages: ["visit-visas", "visit-visas/singapore-saudi-arabia-uae"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "See each destination guide for official sources", url: "https://www.dmcimmigrationgroup.com" },
    ],
  },
  {
    id: "visit-visas/usa",
    title: "USA Visit Visa (B1/B2)",
    eyebrow: "Visit visas",
    seoTitle: "USA B1/B2 Visitor Visa Guide | DMC Immigration Group",
    seoDescription:
      "The US B1/B2 visitor visa — DS-160, the $185 fee, interviews, validity and the evidence that matters for Gulf and India applicants.",
    lede: "The USA's B1/B2 visitor visa for business, tourism and family visits — a structured application with an in-person interview at the heart of it.",
    sections: destinationSections(
      [
        "The B1/B2 visa covers business visitors (B1) and tourists/visitors (B2). Most applicants file the DS-160 form online, pay the MRV fee and attend a visa interview at a US embassy or consulate.",
        "Many nationalities receive multi-year, multiple-entry visas (often up to 10 years), but every interview is decided on the individual file: purpose, ties, funds and compliance history.",
      ],
      [
        { label: "Application form", value: "DS-160 (online)" },
        { label: "Fee (MRV)", value: "USD 185 for most visitor categories" },
        { label: "Interview", value: "Generally required; interview-waiver for many eligible renewals" },
        { label: "Typical validity", value: "Up to 10 years multiple-entry for many nationalities (passport-dependent)" },
        { label: "Typical stay", value: "Up to 6 months per entry, at the border officer's discretion" },
      ],
      [
        { title: "Purpose and itinerary", body: "Clear business or personal plans for the trip, with invitations or bookings where relevant." },
        { title: "Ties to your home country", body: "Employment, property, business and family evidence showing you will return." },
        { title: "Financial capacity", body: "Bank statements and income evidence covering the trip." },
        { title: "Travel and identity documents", body: "Valid passport, previous visas, photographs and any US-specific records." },
      ],
    ),
    relatedPages: ["visit-visas", "visit-visas/canada-usa-australia"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "US Department of State — Visitor visas", url: "https://travel.state.gov/content/travel/en/us-visas/visit.html" },
    ],
  },
  {
    id: "visit-visas/australia",
    title: "Australia Visit Visa (600)",
    eyebrow: "Visit visas",
    seoTitle: "Australia Visitor Visa 600 Guide | DMC Immigration Group",
    seoDescription:
      "The Australia Visitor visa (subclass 600) — online application, funds and ties evidence, typical stays of 3 to 12 months.",
    lede: "Tourism, family visits and short business trips to Australia on the Visitor visa (subclass 600) — a fully online application.",
    sections: destinationSections(
      [
        "The Visitor visa (subclass 600) is Australia's short-stay visa for tourism, family visits and brief business activities. Applications are lodged online with supporting evidence of funds, ties and genuine intent.",
        "Typical grants allow stays of three, six or twelve months depending on the applicant's situation and the evidence provided. Work is not permitted, and most applicants receive multiple-entry visas.",
      ],
      [
        { label: "Application", value: "Online (ImmiAccount)" },
        { label: "Fee", value: "Approximately A$200 for most applicants; indexed annually" },
        { label: "Typical stay", value: "3, 6 or 12 months per entry" },
        { label: "Work", value: "Not permitted" },
        { label: "Processing", value: "Varies by country of residence; check the official global processing times" },
      ],
      [
        { title: "Genuine visitor intent", body: "A clear reason to visit and evidence you will comply with visa conditions." },
        { title: "Financial capacity", body: "Funds for the full stay — often shown for the applicant's circumstances (e.g. around A$1,000 per month plus travel)." },
        { title: "Ties to home country", body: "Employment, family, property or business commitments supporting return." },
        { title: "Health and character", body: "Some applicants need medical examinations or police clearances." },
      ],
    ),
    relatedPages: ["visit-visas", "visit-visas/canada-usa-australia"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "Home Affairs — Visitor visa (subclass 600)", url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/visitor-600" },
    ],
  },
  {
    id: "visit-visas/uk",
    title: "UK Standard Visitor Visa",
    eyebrow: "Visit visas",
    seoTitle: "UK Standard Visitor Visa Guide | DMC Immigration Group",
    seoDescription:
      "The UK Standard Visitor visa — 6-month, 2-year, 5-year and 10-year options, the application fee and the evidence UK Visas and Immigration weighs.",
    lede: "Tourism, family visits and business trips to the United Kingdom on the Standard Visitor visa — one application, multiple durations.",
    sections: destinationSections(
      [
        "The Standard Visitor visa covers tourism, family and friend visits, business activities and short study. Applications are made online, with biometrics at a visa-application centre.",
        "Applicants can request six-month, two-year, five-year or ten-year multiple-entry visas. The officer decides the duration from the application and evidence — the higher the fee paid, the longer the potential validity, but eligibility is never guaranteed by the fee.",
      ],
      [
        { label: "Application", value: "Online + biometrics at a visa-application centre" },
        { label: "Fee", value: "Around £115–£130 for 6 months; £432–£480 for 2 years (reviewed periodically)" },
        { label: "Typical stay", value: "Up to 6 months per visit (longer for some permitted activities)" },
        { label: "Work", value: "Not permitted (limited permitted business activities only)" },
        { label: "Processing", value: "Typically 3 weeks for standard applications; priority services available" },
      ],
      [
        { title: "Genuine visit", body: "Purpose, itinerary and evidence the visit will be temporary and compliant." },
        { title: "Funds", body: "Bank statements and income covering the stay without needing to work." },
        { title: "Ties to home country", body: "Employment, family, property or business ties demonstrating return." },
        { title: "Identity and travel history", body: "Valid passport, previous visas and travel records." },
      ],
    ),
    relatedPages: ["visit-visas", "visit-visas/uk-new-zealand", "visas/uk/skilled-worker"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "GOV.UK — Standard Visitor visa", url: "https://www.gov.uk/standard-visitor" },
    ],
  },
  {
    id: "visit-visas/new-zealand",
    title: "New Zealand Visit Visa",
    eyebrow: "Visit visas",
    seoTitle: "New Zealand Visitor Visa Guide | DMC Immigration Group",
    seoDescription:
      "The New Zealand Visitor visa — online e-visa application, NZD fees, the International Visitor Levy and funds requirements.",
    lede: "A visitor visa for New Zealand's tourism, family and business visits — a clean online process with clear funds rules.",
    sections: destinationSections(
      [
        "Most visitors to New Zealand apply online for a Visitor visa, receiving an electronic visa on approval. Citizens of many countries can also enter visa-free for up to six months — check the visa-waiver list for your passport.",
        "The International Visitor Conservation and Tourism Levy (around NZ$100) applies to most tourists, alongside the application fee. Evidence must show genuine intent and sufficient funds (typically about NZ$1,000 per month of stay).",
      ],
      [
        { label: "Application", value: "Online e-visa" },
        { label: "Fee", value: "Approximately NZ$340 plus the International Visitor Levy (around NZ$100)" },
        { label: "Typical stay", value: "Up to 3 months per entry on a visitor visa (9 months in 18 for some); visa-waiver entries vary" },
        { label: "Work", value: "Not permitted" },
        { label: "Processing", value: "Most straightforward applications decided within weeks; check current times" },
      ],
      [
        { title: "Genuine visitor intent", body: "Clear plans and evidence of a temporary, compliant visit." },
        { title: "Funds", body: "Approximately NZ$1,000 per person per month of stay, evidenced by bank statements." },
        { title: "Ties to home country", body: "Employment, family, property or business ties supporting return." },
        { title: "Health and character", body: "Medical and police evidence where the application requires it." },
      ],
    ),
    relatedPages: ["visit-visas", "visit-visas/uk-new-zealand"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "Immigration New Zealand — Visitor visa", url: "https://www.immigration.govt.nz/new-zealand-visas/visas/visa/visitor-visa" },
    ],
  },
  {
    id: "visit-visas/china",
    title: "China Visit Visa",
    eyebrow: "Visit visas",
    seoTitle: "China Visit Visa & Visa-Free Entry Guide | DMC Immigration Group",
    seoDescription:
      "China's entry rules for visitors — visa-free entry for citizens of many countries, and the L (tourism) visa for everyone else.",
    lede: "China's entry rules have moved quickly — visa-free entry for many nationalities, and a clear L-visa path for the rest.",
    sections: destinationSections(
      [
        "China currently grants visa-free entry for up to 30 days to citizens of many countries under a policy that is reviewed and extended periodically. The visa-free list changes, so the first step is always the official check for your nationality.",
        "Visitors who are not visa-free apply for the L (tourism) visa through an authorised visa-application centre, usually with an invitation, itinerary, accommodation and return-ticket evidence.",
      ],
      [
        { label: "Visa-free entry", value: "Up to 30 days for citizens of many countries (policy reviewed)" },
        { label: "Tourism visa (L)", value: "Via embassy-authorised visa centres; itinerary, accommodation and tickets usually required" },
        { label: "Typical stay", value: "30–90 days depending on the grant and nationality" },
        { label: "Application", value: "Paper application at a visa centre (plus biometrics where applied)" },
      ],
      [
        { title: "Passport validity", body: "Generally 6 months beyond the intended stay, with blank pages." },
        { title: "Itinerary evidence", body: "Return flights, hotel bookings and a day-by-day travel plan." },
        { title: "Accommodation and registration", body: "Hotels register foreign guests; private stays require police registration on arrival." },
        { title: "Financial evidence", body: "Funds to cover the visit, where the visa centre requests it." },
      ],
    ),
    relatedPages: ["visit-visas", "visit-visas/china-japan-turkey"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "Ministry of Foreign Affairs — China visa information", url: "https://www.mfa.gov.cn/eng/" },
    ],
  },
  {
    id: "visit-visas/japan",
    title: "Japan Visit Visa",
    eyebrow: "Visit visas",
    seoTitle: "Japan Visit Visa & Visa-Free Entry Guide | DMC Immigration Group",
    seoDescription:
      "Japan's visitor rules — visa-free entry for many nationalities and the short-stay visa application for everyone else.",
    lede: "Japan's entry rules for visitors — visa-free for many passports, and a structured short-stay visa for the rest.",
    sections: destinationSections(
      [
        "Citizens of many countries — including the UAE and several Gulf and European states — can enter Japan visa-free for short stays (typically up to 90 days) for tourism, business and family visits.",
        "Nationalities that need a visa apply for a short-stay (temporary visitor) visa at a Japanese embassy or consulate through authorised visa agencies, usually with proof of funds, an itinerary and, where relevant, a guarantor or invitation.",
      ],
      [
        { label: "Visa-free entry", value: "Up to 90 days for citizens of many countries" },
        { label: "Short-stay visa", value: "Via Japanese embassies/consulates or authorised agencies" },
        { label: "Typical stay", value: "15, 30 or 90 days depending on the grant" },
        { label: "Work", value: "Not permitted on visitor status" },
        { label: "Processing", value: "Usually 5 working days or less after submission for complete files" },
      ],
      [
        { title: "Passport and forms", body: "Valid passport and the application form with photograph." },
        { title: "Funds and ties", body: "Bank statements and evidence of employment or property supporting return." },
        { title: "Itinerary", body: "Flights, accommodation and planned activities where requested." },
        { title: "Guarantor or invitation", body: "Required for some applicant profiles, provided by a resident in Japan." },
      ],
    ),
    relatedPages: ["visit-visas", "visit-visas/china-japan-turkey"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "Ministry of Foreign Affairs — Japan visa information", url: "https://www.mofa.go.jp/j_info/visit/visa/" },
    ],
  },
  {
    id: "visit-visas/turkey",
    title: "Turkey Visit Visa",
    eyebrow: "Visit visas",
    seoTitle: "Turkey E-Visa & Visit Guide | DMC Immigration Group",
    seoDescription:
      "Turkey's e-visa for eligible nationalities, visa-free entry for several countries, fees and entry rules for Gulf and India residents.",
    lede: "Turkey's e-visa system makes many visits straightforward — check eligibility, apply online, and avoid unofficial websites.",
    sections: destinationSections(
      [
        "Turkey operates an official e-visa portal for citizens of eligible nationalities, with online payment and a fast decision. Several nationalities — including UAE citizens — enter visa-free for up to 90 days in any 180-day period.",
        "Citizens of some countries must apply through Turkish embassies or consulates instead. Whatever your passport, use only the official e-visa site or an embassy — unofficial 'visa' websites overcharge.",
      ],
      [
        { label: "E-visa", value: "Official portal (evisa.gov.tr); fee from around USD 50 for eligible nationalities" },
        { label: "Visa-free entry", value: "Up to 90 days in 180 days for several nationalities (e.g. UAE citizens)" },
        { label: "Validity", value: "Generally 180 days, single or multiple entry depending on nationality" },
        { label: "Typical stay", value: "Up to 30–90 days per entry depending on the grant" },
        { label: "Application", value: "Online; passport and travel details required" },
      ],
      [
        { title: "Eligibility check", body: "Confirm your nationality's arrangement on the official e-visa eligibility list." },
        { title: "Passport validity", body: "Usually 6 months beyond the intended stay." },
        { title: "Accommodation and itinerary", body: "Hotel bookings are often requested at entry." },
        { title: "Official channels only", body: "Use evisa.gov.tr or the embassy; never third-party 'visa' sites." },
      ],
    ),
    relatedPages: ["visit-visas", "visit-visas/china-japan-turkey"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "Republic of Türkiye — Official e-visa website", url: "https://www.evisa.gov.tr/" },
    ],
  },
  {
    id: "visit-visas/south-korea",
    title: "South Korea Visit Visa",
    eyebrow: "Visit visas",
    seoTitle: "South Korea Visit Visa & K-ETA Guide | DMC Immigration Group",
    seoDescription:
      "South Korea's K-ETA electronic authorisation for visa-free nationalities and the short-stay C-3 visa application path.",
    lede: "South Korea's entry system — K-ETA for visa-free nationalities and the C-3 short-stay visa for everyone else.",
    sections: destinationSections(
      [
        "Citizens of visa-free countries must complete K-ETA — an electronic travel authorisation — before flying to South Korea. It is valid for multiple entries over two years for most approved nationalities.",
        "Nationalities that need a visa apply for the C-3 short-stay visa at a Korean embassy or consulate, with an itinerary, funds evidence and, for some profiles, an invitation.",
      ],
      [
        { label: "K-ETA", value: "Required for many visa-free nationalities; around USD 10, valid ~2 years" },
        { label: "C-3 short-stay visa", value: "For nationalities without visa-free access; embassy application" },
        { label: "Typical stay", value: "Up to 90 days per entry" },
        { label: "Work", value: "Not permitted on visitor status" },
        { label: "Processing", value: "E-visa and C-3 applications typically complete within days to a few weeks" },
      ],
      [
        { title: "K-ETA approval", body: "Apply before booking — approval is required in advance for visa-free travel." },
        { title: "Itinerary and funds", body: "Flights, accommodation and bank statements for visa applications." },
        { title: "Invitation evidence", body: "Invitations from residents for certain applicant profiles." },
        { title: "Passport validity", body: "At least 6 months at entry." },
      ],
    ),
    relatedPages: ["visit-visas", "visit-visas/south-korea-greece-thailand"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "K-ETA — Official electronic travel authorisation", url: "https://www.k-eta.go.kr/" },
    ],
  },
  {
    id: "visit-visas/greece",
    title: "Greece Visit Visa (Schengen)",
    eyebrow: "Visit visas",
    seoTitle: "Greece Schengen Visit Visa Guide | DMC Immigration Group",
    seoDescription:
      "The Schengen short-stay visa through Greece — the €90 fee, 90/180-day rule, biometrics and documents for Gulf and India applicants.",
    lede: "Greece is a Schengen entry point — one short-stay visa opens 29 European countries for up to 90 days in any 180.",
    sections: destinationSections(
      [
        "Greece issues Schengen short-stay (Type C) visas for tourism, business and family visits. A Schengen visa grants access across the Schengen area — up to 90 days in any 180-day period — and must be applied for in the country of your main destination.",
        "The application is filed at an authorised visa-application centre with biometrics, travel insurance covering at least €30,000, and strong ties and funds evidence. UAE citizens are visa-free in Schengen and do not need this visa.",
      ],
      [
        { label: "Visa type", value: "Schengen short-stay (Type C)" },
        { label: "Fee", value: "€90 for adults (reduced for children; exempt for some nationalities)" },
        { label: "Stay", value: "Up to 90 days in any 180-day period across the Schengen area" },
        { label: "Biometrics", value: "Fingerprints collected every 5 years" },
        { label: "Insurance", value: "Medical travel insurance, minimum €30,000 cover" },
      ],
      [
        { title: "Application forms and photos", body: "Completed form and biometric photographs." },
        { title: "Itinerary and accommodation", body: "Flights, hotel bookings and, if visiting family, an invitation or sponsorship declaration." },
        { title: "Funds and employment", body: "Bank statements and employment or business evidence." },
        { title: "Travel insurance", body: "Schengen-compliant medical insurance for the entire trip." },
      ],
    ),
    relatedPages: ["visit-visas", "visit-visas/south-korea-greece-thailand"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "Greek Ministry of Foreign Affairs — Visas", url: "https://www.mfa.gr/en/visas/" },
    ],
  },
  {
    id: "visit-visas/thailand",
    title: "Thailand Visit Visa",
    eyebrow: "Visit visas",
    seoTitle: "Thailand Visit — Visa-Free Entry, VoA & E-Visa Guide | DMC Immigration Group",
    seoDescription:
      "Thailand's visitor rules — visa-free entry for citizens of many countries, the 2,000-baht Visa on Arrival and the e-visa path.",
    lede: "Thailand's entry system is one of the friendliest in the region — visa-free entry for many passports, Visa on Arrival for others, and e-visas for the rest.",
    sections: destinationSections(
      [
        "Citizens of many countries — including India and most GCC states — enter Thailand visa-free for up to 60 days for tourism, and several more can use Visa on Arrival or the online e-visa system.",
        "Visa-free entry still requires a return ticket, accommodation evidence and enough funds, and immigration officers retain discretion at entry.",
      ],
      [
        { label: "Visa-free entry", value: "Up to 60 days for citizens of many countries" },
        { label: "Visa on Arrival", value: "Available for several nationalities; THB 2,000" },
        { label: "E-visa", value: "Online through the official portal for eligible nationalities" },
        { label: "Typical stay", value: "15–60 days depending on the arrangement" },
        { label: "Work", value: "Not permitted on visitor status" },
      ],
      [
        { title: "Passport validity", body: "At least 6 months, with blank pages for entry stamps." },
        { title: "Return tickets", body: "Confirmed onward travel is routinely requested at entry." },
        { title: "Accommodation evidence", body: "Hotel bookings or proof of where you will stay." },
        { title: "Funds", body: "Sufficient cash or statements for the stay (commonly around THB 20,000 per person)." },
      ],
    ),
    relatedPages: ["visit-visas", "visit-visas/south-korea-greece-thailand"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "Royal Thai Embassy — Visa information", url: "https://www.thaiembassy.com/" },
    ],
  },
  {
    id: "visit-visas/singapore",
    title: "Singapore Visit Visa",
    eyebrow: "Visit visas",
    seoTitle: "Singapore Visit — Visa-Free Entry & SG Arrival Card Guide | DMC Immigration Group",
    seoDescription:
      "Singapore's visitor rules — visa-free entry for many nationalities, the SG Arrival Card for everyone and the visa path via local contacts.",
    lede: "Singapore's efficient entry system — visa-free for many nationalities, with the digital SG Arrival Card required before every arrival.",
    sections: destinationSections(
      [
        "Citizens of many countries — including the UAE and other Gulf states — enter Singapore visa-free for up to 30 days. Everyone, visa-free or not, must submit the digital SG Arrival Card within three days before arrival.",
        "Nationalities that need a visa apply through a local contact (a Singaporean citizen, permanent resident or approved entity) at the Immigration & Checkpoints Authority, usually within days.",
      ],
      [
        { label: "Visa-free entry", value: "Up to 30 days for citizens of many countries" },
        { label: "SG Arrival Card", value: "Mandatory digital declaration for all arrivals (free, within 3 days of travel)" },
        { label: "Visa", value: "Via a local contact in Singapore for nationalities that require one" },
        { label: "Typical stay", value: "Up to 30–90 days depending on nationality and grant" },
        { label: "Work", value: "Not permitted on visitor status" },
      ],
      [
        { title: "SG Arrival Card", body: "Submit online up to 3 days before arrival — this is required for everyone." },
        { title: "Return tickets", body: "Confirmed onward travel is routinely requested." },
        { title: "Accommodation", body: "Hotel booking evidence for the stay." },
        { title: "Funds", body: "Sufficient funds for the visit, where immigration requests evidence." },
      ],
    ),
    relatedPages: ["visit-visas", "visit-visas/singapore-saudi-arabia-uae"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "Immigration & Checkpoints Authority (ICA) — Entry requirements", url: "https://www.ica.gov.sg/enter-transit-depart/entering-singapore/visa_requirements" },
    ],
  },
  {
    id: "visit-visas/saudi-arabia",
    title: "Saudi Arabia Visit Visa",
    eyebrow: "Visit visas",
    seoTitle: "Saudi Arabia E-Visa & Visit Guide | DMC Immigration Group",
    seoDescription:
      "Saudi Arabia's e-visa for eligible nationalities, GCC-resident and visa-holder options, and entry rules for visitors.",
    lede: "Saudi Arabia's e-visa system has opened tourism and family visits — one online application, multiple nationalities covered.",
    sections: destinationSections(
      [
        "Saudi Arabia offers an online e-visa for citizens of eligible countries and for residents of the GCC in qualifying professions. Citizens of the US, UK, EU and several other countries, and residents of the US, UK or Schengen with qualifying visa status, are also eligible for the e-visa.",
        "UAE nationals and other GCC citizens enter visa-free. All visitors should use the official e-visa portal and confirm eligibility before paying.",
      ],
      [
        { label: "E-visa", value: "Official portal (visa.mofa.gov.sa); multiple entry, typically 1 year" },
        { label: "Eligibility", value: "Eligible nationalities; GCC residents in qualifying professions; US/UK/Schengen visa holders" },
        { label: "GCC nationals", value: "Visa-free entry" },
        { label: "Typical stay", value: "Up to 90 days per visit" },
        { label: "Fee", value: "E-visa fee plus insurance; set on the official portal" },
      ],
      [
        { title: "Eligibility check", body: "Confirm your nationality or residence qualifies on the official portal." },
        { title: "Travel insurance", body: "Saudi-compliant medical insurance is included with the e-visa fee." },
        { title: "Accommodation", body: "Hotel bookings for the stay." },
        { title: "Official channels only", body: "Use visa.mofa.gov.sa — unofficial intermediaries overcharge and may fail." },
      ],
    ),
    relatedPages: ["visit-visas", "visit-visas/singapore-saudi-arabia-uae"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "Ministry of Foreign Affairs — Saudi e-visa portal", url: "https://visa.mofa.gov.sa/" },
    ],
  },
  {
    id: "visit-visas/uae",
    title: "UAE Visit Visas",
    eyebrow: "Visit visas",
    seoTitle: "UAE Visit Visas Guide | DMC Immigration Group",
    seoDescription:
      "UAE entry arrangements — GCC nationals visa-free, visa-on-arrival for many nationalities, and pre-arranged visit visas for the rest.",
    lede: "Entry to the UAE — GCC nationals enter visa-free, many nationalities receive a visa on arrival, and the rest need a pre-arranged visit visa.",
    sections: destinationSections(
      [
        "The UAE's entry system covers GCC nationals (visa-free), nationalities eligible for visa on arrival, and nationalities that need a visit visa arranged in advance through sponsors or travel agencies.",
        "The rules and fees differ between Dubai, Abu Dhabi and the other emirates only in administration — federal rules set the visit-visa durations, typically 30 or 60 days, sometimes extendable once.",
      ],
      [
        { label: "GCC nationals", value: "Visa-free entry" },
        { label: "Visa on arrival", value: "Available for citizens of many countries (30 days, sometimes extendable)" },
        { label: "Pre-arranged visit visa", value: "For nationalities that need one; arranged by sponsors, hotels or agencies" },
        { label: "Typical stay", value: "30 or 60 days per grant" },
        { label: "Extension", value: "One renewal is often possible; overstaying carries daily fines" },
      ],
      [
        { title: "Passport validity", body: "6 months for most nationalities." },
        { title: "Exit ticket", body: "Confirmed onward travel is routinely requested at immigration." },
        { title: "Accommodation", body: "Hotel booking or host address evidence." },
        { title: "Funds", body: "Evidence of funds where immigration requests it." },
      ],
    ),
    relatedPages: ["visit-visas", "visit-visas/singapore-saudi-arabia-uae", "business-investment/golden-visa-uae"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "UAE Government — Visit visas", url: "https://u.ae/en/information-and-services/visa-and-emirates-id/visit-visas" },
    ],
  },
  {
    id: "visit-visas/south-africa",
    title: "South Africa Visit Visa",
    eyebrow: "Visit visas",
    seoTitle: "South Africa Visit Visa & E-Visa Guide | DMC Immigration Group",
    seoDescription:
      "South Africa's visitor routes — e-visa for eligible nationalities, visa-free entry for several passports, and the standard visitor application.",
    lede: "South Africa's visitor routes — an expanding e-visa pilot, visa-free entry for several nationalities, and the standard visitor visa.",
    sections: destinationSections(
      [
        "South Africa operates an e-visa system for citizens of an expanding list of countries, and visa-free entry for several nationalities (including UAE citizens, who may visit for up to 90 days).",
        "Nationalities outside these arrangements apply for a visitor's visa at the embassy with funds, ties and itinerary evidence; applications are often processed through VFS Global centres.",
      ],
      [
        { label: "E-visa", value: "For citizens of eligible nationalities via the official portal" },
        { label: "Visa-free entry", value: "Up to 90 days for several nationalities (e.g. UAE citizens)" },
        { label: "Standard visitor visa", value: "Embassy application, often through VFS centres" },
        { label: "Typical stay", value: "Up to 90 days per visit" },
        { label: "Work", value: "Not permitted on visitor status" },
      ],
      [
        { title: "Eligibility check", body: "Confirm whether your nationality is visa-free, e-visa-eligible or visa-required." },
        { title: "Funds and ties", body: "Bank statements and employment evidence supporting return." },
        { title: "Itinerary", body: "Flights, accommodation and travel plans." },
        { title: "Health and character", body: "Medical evidence for longer visits and police certificates where required." },
      ],
    ),
    relatedPages: ["visit-visas", "visit-visas/south-africa-cyprus-netherlands"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "Department of Home Affairs — South African e-visa", url: "https://ehomeaffairs.gov.za/e-services/eVisa" },
    ],
  },
  {
    id: "visit-visas/cyprus",
    title: "Cyprus Visit Visa",
    eyebrow: "Visit visas",
    seoTitle: "Cyprus Visit Visa & eVisa Guide | DMC Immigration Group",
    seoDescription:
      "Cyprus visit visas — the eVisa portal, visa on arrival for UAE nationals, and the Schengen-compatible short-stay application.",
    lede: "Cyprus has modernised its entry system — an eVisa portal for visitors, and visa on arrival for UAE nationals.",
    sections: destinationSections(
      [
        "Cyprus launched an eVisa portal covering many nationalities, and UAE citizens can receive a visa on arrival. EU/EEA citizens enter freely.",
        "Visitors from nationalities outside these arrangements apply through the eVisa portal or at an embassy, with itinerary, funds and ties evidence. Cyprus is not yet part of the Schengen area, so its visa is separate from Schengen visas.",
      ],
      [
        { label: "eVisa portal", value: "Launched 2024; covers citizens of many nationalities" },
        { label: "UAE nationals", value: "Visa on arrival" },
        { label: "EU/EEA citizens", value: "Visa-free entry" },
        { label: "Typical stay", value: "Up to 90 days per visit" },
        { label: "Work", value: "Not permitted on visitor status" },
      ],
      [
        { title: "Eligibility check", body: "Confirm your nationality's arrangement on the official Cyprus eVisa portal." },
        { title: "Itinerary", body: "Flights and accommodation for the visit." },
        { title: "Funds and ties", body: "Bank statements and employment evidence supporting return." },
        { title: "Travel insurance", body: "Medical cover for the trip where requested." },
      ],
    ),
    relatedPages: ["visit-visas", "visit-visas/south-africa-cyprus-netherlands"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "Republic of Cyprus — eVisa portal", url: "https://www.mfa.gov.cy/" },
    ],
  },
  {
    id: "visit-visas/netherlands",
    title: "Netherlands Visit Visa (Schengen)",
    eyebrow: "Visit visas",
    seoTitle: "Netherlands Schengen Visit Visa Guide | DMC Immigration Group",
    seoDescription:
      "The Netherlands Schengen short-stay visa — the €90 fee, 90/180-day rule, documents and visa-application centres for Gulf and India applicants.",
    lede: "A Schengen short-stay visa for the Netherlands — Europe's gateway for tourism, family visits and business travel from the Gulf and India.",
    sections: destinationSections(
      [
        "The Netherlands issues Schengen short-stay visas for tourism, family visits and business travel, giving access across the Schengen area for up to 90 days in any 180-day period.",
        "Applications go through visa-application centres (VFS Global/TLS) with biometrics, itinerary, funds and ties evidence. UAE citizens travel visa-free in Schengen and do not need this visa.",
      ],
      [
        { label: "Visa type", value: "Schengen short-stay (Type C)" },
        { label: "Fee", value: "€90 for adults (reduced for children)" },
        { label: "Stay", value: "Up to 90 days in any 180-day period across the Schengen area" },
        { label: "Application", value: "Via visa-application centres with biometrics" },
        { label: "Processing", value: "Usually 15 calendar days; longer in peak seasons" },
      ],
      [
        { title: "Application form and photos", body: "Completed form and biometric photographs." },
        { title: "Itinerary and accommodation", body: "Flights, hotel bookings and, for family visits, an invitation." },
        { title: "Funds and employment", body: "Bank statements and employment or business evidence." },
        { title: "Travel insurance", body: "Schengen-compliant medical insurance, minimum €30,000 cover." },
      ],
    ),
    relatedPages: ["visit-visas", "visit-visas/south-africa-cyprus-netherlands"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "Netherlands Worldwide — Schengen visa", url: "https://www.netherlandsworldwide.nl/visa/schengen-visa" },
    ],
  },
];
