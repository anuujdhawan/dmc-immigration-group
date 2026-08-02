import type { PageContent } from "@/content/pages/types";

export const BUSINESS_INVESTMENT_PAGES: PageContent[] = [
  {
    id: "business-investment/golden-visa-uae",
    title: "UAE Golden Visa",
    eyebrow: "Business & investment",
    seoTitle: "UAE Golden Visa — 10-Year Residency | DMC Immigration Group",
    seoDescription:
      "The UAE Golden Visa — 10-year renewable residency for investors, entrepreneurs and talented professionals, with the current AED thresholds for each category.",
    lede: "Long-term residency in the UAE for investors, entrepreneurs and exceptional professionals — a 10-year renewable Golden Visa with clear, published thresholds.",
    sections: [
      {
        kind: "overview",
        heading: "What the Golden Visa is",
        paragraphs: [
          "The UAE Golden Visa grants long-term residency — usually 10 years, renewable — to investors, entrepreneurs, exceptional talents, scientists, doctors, engineers and outstanding students, with no sponsor requirement.",
          "Golden Visa holders can stay outside the UAE beyond the usual 180-day limit, sponsor family members (including domestic staff in some categories) and work or own businesses in the UAE.",
          "Applications run through the Federal Authority for Identity, Citizenship, Customs and Port Security (ICP) — and in Dubai through the General Directorate of Residency and Foreigners Affairs (GDRFA) with the support of departments such as Dubai Land Department.",
        ],
      },
      {
        kind: "programs",
        heading: "Main Golden Visa categories",
        items: [
          { code: "Invest", title: "Investors", body: "A property or business investment of at least AED 2 million. For property, a mortgaged asset qualifies when the total purchase price is at least AED 2 million — not just the equity paid." },
          { code: "Entrep", title: "Entrepreneurs", body: "Founders of a venture valued at or above AED 500,000, or with incubator approval — assessed on the venture's viability and the applicant's commitment." },
          { code: "Prof", title: "Professionals and exceptional talents", body: "Professionals with a bachelor's degree or higher and a monthly salary of at least AED 50,000, plus specialists in science, medicine, technology and the arts." },
          { code: "Study", title: "Outstanding students and graduates", body: "Top-performing graduates of UAE and select international universities may qualify for a family-inclusive Golden Visa." },
        ],
      },
      {
        kind: "panel",
        heading: "Current thresholds at a glance",
        rows: [
          { label: "Investor — property or business", value: "AED 2,000,000+ (mortgaged property counts on total value)" },
          { label: "Professional salary", value: "AED 50,000+ per month, with a bachelor's degree or higher" },
          { label: "Entrepreneur capital", value: "AED 500,000+ venture value or incubator approval" },
          { label: "Validity", value: "10 years, renewable; family members included" },
        ],
        note: "Thresholds and conditions are set by the UAE government and change periodically. Confirm the current requirements on the official UAE government pages before applying.",
      },
      {
        kind: "process",
        heading: "The Golden Visa journey",
        steps: [
          { title: "Confirm your category", body: "Map your profile — investor, entrepreneur, professional or graduate — against the current thresholds." },
          { title: "Prepare evidence", body: "Title deeds, trade licences, salary certificates, degree attestation and other category documents." },
          { title: "Apply", body: "Submit through the ICP or, in Dubai, GDRFA with the supporting department's approval where required." },
          { title: "Medical and biometrics", body: "Complete the Emirates ID medical check and biometrics." },
          { title: "Receive your residency", body: "Collect the Golden Visa and Emirates ID, then sponsor eligible family members." },
        ],
      },
      {
        kind: "faq",
        heading: "Golden Visa, answered",
        items: [
          {
            question: "Can I get a Golden Visa with a mortgaged property?",
            answer: "Yes. Property bought with a mortgage qualifies when the total purchase price is at least AED 2 million — the full price counts, not only the equity paid.",
          },
          {
            question: "Can my family be included?",
            answer: "Yes — spouses and children are generally included, and some categories can also sponsor parents.",
          },
          {
            question: "Is the Golden Visa guaranteed?",
            answer: "No — applications are assessed by the authorities and each file must meet the current requirements. DMC helps prepare complete, accurate applications but cannot guarantee approval.",
          },
        ],
      },
    ],
    relatedPages: ["business-investment/startup-entrepreneur-visas", "business-investment/residency"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "UAE Government — Long-term residence visas (Golden Visa)", url: "https://u.ae/en/information-and-services/visa-and-emirates-id/residence-visas/long-term-residence-visas" },
      { label: "Federal Authority for Identity, Citizenship, Customs & Port Security (ICP)", url: "https://icp.gov.ae/" },
    ],
  },
  {
    id: "business-investment/residency",
    title: "Residency by Investment",
    eyebrow: "Business & investment",
    seoTitle: "Residency by Investment Options | DMC Immigration Group",
    seoDescription:
      "Residency by investment and premium work routes — Canada, the UK and the USA compared for UAE and GCC residents planning a move.",
    lede: "Residency options in Canada, the UK and the USA for professionals and investors — honest comparisons, current rules and no inflated promises.",
    sections: [
      {
        kind: "overview",
        heading: "What 'residency by investment' really means in 2026",
        paragraphs: [
          "Classic investor-visa programs have narrowed across the major destinations. Canada has no direct investment-for-residency program, the UK closed its investor route in 2022, and the USA's EB-5 has long queues. The practical routes are now founder and premium-work visas, plus employer and study pathways that lead to permanent residence.",
          "The guides below set out what genuinely exists today, with current requirements and honest timelines.",
        ],
      },
      {
        kind: "links",
        heading: "Residency guides",
        items: [
          { title: "Canada residency routes", path: "/business-investment/residency/canada", description: "Start-up Visa and work/study pathways to permanent residence — no investment-for-residency program exists." },
          { title: "UK residency routes", path: "/business-investment/residency/uk", description: "Innovator Founder visa with endorsement; investor route closed." },
          { title: "USA residency routes", path: "/business-investment/residency/usa", description: "EB-5 immigrant investor visa and EB-1/EB-2 alternatives." },
        ],
      },
      {
        kind: "faq",
        heading: "Residency routes, answered",
        items: [
          {
            question: "Can I buy my way to residency anywhere?",
            answer: "Very few credible programs remain. Canada has no investment-for-residency route, the UK's investor visa closed in 2022, and the US EB-5 requires a genuine job-creating investment with long queues. Founder and work routes are the realistic alternatives.",
          },
          {
            question: "What is the fastest realistic route?",
            answer: "There is no universally fastest route — it depends on your profile, funds and goals. The right answer comes from a proper assessment, not a headline.",
          },
          {
            question: "Does residency guarantee citizenship?",
            answer: "No. Residency is a step toward settlement in most countries, and citizenship requires separate residence, language and other requirements — never assume one follows the other automatically.",
          },
        ],
      },
    ],
    relatedPages: ["business-investment/citizenship", "business-investment/golden-visa-uae"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "See each residency guide for official sources", url: "https://www.dmcimmigrationgroup.com" },
    ],
  },
  {
    id: "business-investment/residency/canada",
    title: "Canada Residency Routes",
    eyebrow: "Residency by investment",
    seoTitle: "Canada Residency by Investment & Business Routes | DMC Immigration Group",
    seoDescription:
      "Canada's business and residency routes in 2026 — the Start-up Visa, entrepreneur streams and work/study pathways. There is no investment-for-residency program in Canada.",
    lede: "Canada does not sell residency to investors — but its start-up, work and study routes are the realistic pathways to permanent residence.",
    sections: [
      {
        kind: "overview",
        heading: "The honest picture",
        paragraphs: [
          "Canada has no direct investment-for-residency program. The federal Immigrant Investor Program has been closed since 2014, the Quebec Immigrant Investor Program is not accepting new applications, and provincial entrepreneur streams are limited and frequently paused.",
          "The genuine business route is the Start-up Visa (SUV) — a permanent-residence program for founders backed by a designated angel investor, venture capital fund or incubator. Work and study pathways, followed by Express Entry or provincial nomination, remain the mainstream routes for professionals.",
        ],
      },
      {
        kind: "eligibility",
        heading: "Start-up Visa essentials",
        items: [
          { title: "Designated support", body: "A letter of support from a designated organisation (angel investor, VC fund or incubator)." },
          { title: "Business plan", body: "A viable, innovative business owned and actively managed by the applicant." },
          { title: "Language", body: "Approved English or French test meeting Canadian Language Benchmark 5." },
          { title: "Settlement funds", body: "Proof of funds for the family, separate from the business investment." },
          { title: "Admissibility", body: "Standard medical, security and criminal-history checks." },
        ],
      },
      {
        kind: "panel",
        heading: "Route comparison",
        rows: [
          { label: "Start-up Visa", value: "Permanent residence for founders with designated support" },
          { label: "Express Entry (FSW/CEC)", value: "Points-tested PR for skilled professionals" },
          { label: "Provincial nomination", value: "Province-specific PR routes, often employment-linked" },
          { label: "Study → PGWP → PR", value: "Multi-year route via Canadian education" },
          { label: "Investor programs", value: "Federal program closed since 2014; Quebec program paused" },
        ],
      },
      {
        kind: "faq",
        heading: "Canada residency, answered",
        items: [
          {
            question: "Is there a Canadian 'golden visa'?",
            answer: "No. Canada has no investment-for-residency program today. The Start-up Visa is the closest business route and requires genuine venture support.",
          },
          {
            question: "How long do Canadian routes take?",
            answer: "Timelines vary widely — Express Entry can take about a year end-to-end, while the Start-up Visa is currently a multi-year wait. A realistic assessment depends on your profile.",
          },
        ],
      },
    ],
    relatedPages: ["business-investment/residency", "visas/canada/express-entry", "visas/canada/provincial-nominee-programs"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "IRCC — Start-up Visa", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/start-visa.html" },
    ],
  },
  {
    id: "business-investment/residency/uk",
    title: "UK Residency Routes",
    eyebrow: "Residency by investment",
    seoTitle: "UK Residency by Investment & Founder Routes | DMC Immigration Group",
    seoDescription:
      "The UK's founder and premium routes in 2026 — the Innovator Founder visa with endorsement, and the closed investor route.",
    lede: "The UK closed its investor route in 2022 — today the Innovator Founder visa is the main route for founders seeking UK settlement.",
    sections: [
      {
        kind: "overview",
        heading: "The honest picture",
        paragraphs: [
          "The UK's Tier 1 (Investor) route closed to new applications in February 2022. There is no replacement 'golden visa' — buying property or bonds no longer confers a UK route.",
          "The current founder route is the Innovator Founder visa: an endorsement by an approved body, a viable business plan, and maintenance funds. Endorsed founders can qualify for settlement after three years on the route.",
        ],
      },
      {
        kind: "eligibility",
        heading: "Innovator Founder essentials",
        items: [
          { title: "Endorsement", body: "A current endorsement letter from an approved endorsing body for a viable, innovative and scalable business." },
          { title: "Funding", body: "No minimum investment amount is required (the £50,000 requirement was removed in April 2023) — funding depends on the business plan." },
          { title: "English and funds", body: "English at B2 level and at least £1,270 in maintenance funds, plus the visa fee and Immigration Health Surcharge." },
          { title: "Genuine business activity", body: "You must establish or join the endorsed business in the UK within the permitted window and progress it." },
        ],
      },
      {
        kind: "panel",
        heading: "Route comparison",
        rows: [
          { label: "Innovator Founder", value: "Endorsed founder route; settlement after 3 years" },
          { label: "Skilled Worker", value: "Employer-sponsored route; settlement after 5 years" },
          { label: "Global Talent", value: "For leaders in science, arts, tech and academia; no sponsor needed" },
          { label: "Investor (Tier 1)", value: "Closed to new applications since February 2022" },
        ],
      },
      {
        kind: "faq",
        heading: "UK residency, answered",
        items: [
          {
            question: "Can I invest my way to UK residency?",
            answer: "No. The Tier 1 Investor route closed in 2022. The Innovator Founder visa requires an endorsement and a genuine business, not passive investment.",
          },
          {
            question: "How quickly can I settle?",
            answer: "Innovator Founder holders can qualify for Indefinite Leave to Remain after three years of qualifying residence with endorsement in force.",
          },
        ],
      },
    ],
    relatedPages: ["business-investment/residency", "visas/uk/skilled-worker"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "GOV.UK — Innovator Founder visa", url: "https://www.gov.uk/innovator-founder-visa" },
    ],
  },
  {
    id: "business-investment/residency/usa",
    title: "USA Residency Routes",
    eyebrow: "Residency by investment",
    seoTitle: "USA EB-5 Investor & Residency Routes | DMC Immigration Group",
    seoDescription:
      "The US EB-5 immigrant investor visa — current investment minimums, job creation, queues, and EB-1/EB-2 alternatives for exceptional professionals.",
    lede: "The EB-5 investor visa remains the flagship US investment route — with significant queues and volatile policy, alternatives matter.",
    sections: [
      {
        kind: "overview",
        heading: "The honest picture",
        paragraphs: [
          "The EB-5 immigrant investor visa grants permanent residence for a qualifying investment that creates at least ten full-time US jobs. The standard minimum is USD 1.05 million, reduced to USD 800,000 for investments in targeted employment areas (rural or high-unemployment).",
          "EB-5 demand far exceeds annual visa numbers, so applicants from India, China and Vietnam face years-long queues before a visa becomes available — the 'investment point' is not the same as a green card.",
          "For exceptional professionals, the EB-1A (extraordinary ability) and EB-2 NIW (national interest waiver) routes avoid employers entirely and are realistic alternatives to consider.",
        ],
      },
      {
        kind: "panel",
        heading: "EB-5 at a glance",
        rows: [
          { label: "Standard minimum investment", value: "USD 1,050,000" },
          { label: "Targeted Employment Area minimum", value: "USD 800,000" },
          { label: "Jobs requirement", value: "10 full-time jobs per investor" },
          { label: "Path", value: "I-526E petition → conditional green card → I-829 removal of conditions" },
          { label: "Reality check", value: "Multi-year queues for India and China; policy and fee changes are contested in courts" },
        ],
        note: "EB-5 amounts and procedures have been the subject of litigation and proposed rule changes — always verify the current position with a qualified professional before investing.",
      },
      {
        kind: "process",
        heading: "The EB-5 journey",
        steps: [
          { title: "Assess alternatives first", body: "Compare EB-1A/EB-2 NIW against EB-5 for your profile — queues and risk differ." },
          { title: "Structure the investment", body: "Choose direct or regional-centre investment that meets the current minimums and job-creation rules." },
          { title: "File I-526E", body: "Submit the petition with source-of-funds documentation — the most scrutinised part of EB-5." },
          { title: "Consular or adjustment stage", body: "When a visa number becomes available, complete the green-card step." },
          { title: "Remove conditions", body: "File I-829 after two years proving the investment and jobs were maintained." },
        ],
      },
      {
        kind: "faq",
        heading: "USA residency, answered",
        items: [
          {
            question: "Is my money returned?",
            answer: "EB-5 requires a genuine 'at-risk' investment — capital must be placed at risk in the commercial enterprise. Guaranteed returns can invalidate the petition, so treat every marketing promise with care.",
          },
          {
            question: "How long is the wait?",
            answer: "Petitions are processed in years, and visa availability adds further years for oversubscribed nationalities. EB-5 is a long-horizon plan, not a quick route.",
          },
        ],
      },
    ],
    relatedPages: ["business-investment/residency", "business-investment/startup-entrepreneur-visas"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "USCIS — EB-5 Immigrant Investor Program", url: "https://www.uscis.gov/working-in-the-united-states/permanent-workers/employment-based-immigration-fifth-preference-eb-5" },
    ],
  },
  {
    id: "business-investment/citizenship",
    title: "Citizenship by Investment",
    eyebrow: "Business & investment",
    seoTitle: "Citizenship by Investment — Honest Guide | DMC Immigration Group",
    seoDescription:
      "Citizenship by investment programs — how they work, due diligence, costs and timelines, with realistic guidance for St Kitts & Nevis and Vanuatu.",
    lede: "Citizenship by investment is a serious financial and legal decision — understand due diligence, costs and timelines before committing.",
    sections: [
      {
        kind: "overview",
        heading: "What citizenship by investment involves",
        paragraphs: [
          "A few countries grant citizenship in exchange for a qualifying donation or investment, subject to thorough due diligence on every applicant — source of funds, police records and background checks.",
          "These programs are regulated by the issuing government and are appropriate for a narrow set of goals: genuine second-citizenship planning for families, business owners and investors. They are not a shortcut around immigration rules, and due diligence failures can be costly.",
          "DMC works with clients considering the St Kitts & Nevis and Vanuatu programs — two of the longest-established citizenship programs — with realistic expectations about costs and timelines.",
        ],
      },
      {
        kind: "links",
        heading: "Citizenship programs",
        items: [
          { title: "St Kitts & Nevis", path: "/business-investment/citizenship/st-kitts-and-nevis", description: "Since 1984 — donation from USD 250,000 or real-estate investment from USD 400,000." },
          { title: "Vanuatu", path: "/business-investment/citizenship/vanuatu", description: "Donation-based; among the fastest programs, processing in about a month." },
        ],
      },
      {
        kind: "faq",
        heading: "Citizenship by investment, answered",
        items: [
          {
            question: "Is citizenship by investment legal?",
            answer: "Yes, where the program is established by the country's government and the funds are genuinely invested or donated. What is not legal is misrepresenting funds, bypassing due diligence or using a revoked passport.",
          },
          {
            question: "Can I keep my current citizenship?",
            answer: "Both programs covered here permit dual citizenship, but your home country's rules decide — check your own nationality law before applying.",
          },
          {
            question: "Does citizenship guarantee visa-free travel?",
            answer: "Passport access depends on the issuing country's visa agreements and can change. Review the current visa-free network for the specific passport, not promotional claims.",
          },
        ],
      },
    ],
    relatedPages: ["business-investment/residency", "business-investment/golden-visa-uae"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "See each program page for official sources", url: "https://www.dmcimmigrationgroup.com" },
    ],
  },
  {
    id: "business-investment/citizenship/st-kitts-and-nevis",
    title: "St Kitts & Nevis Citizenship",
    eyebrow: "Citizenship by investment",
    seoTitle: "St Kitts & Nevis Citizenship by Investment | DMC Immigration Group",
    seoDescription:
      "The St Kitts & Nevis Citizenship by Investment program — Sustainable Growth Fund donation from USD 250,000, real estate from USD 400,000, due diligence and processing.",
    lede: "The longest-established citizenship-by-investment program — a USD 250,000 donation or a qualifying property investment, subject to rigorous due diligence.",
    sections: [
      {
        kind: "overview",
        heading: "How the program works",
        paragraphs: [
          "St Kitts & Nevis has operated citizenship by investment since 1984. Applicants can contribute to the Sustainable Growth Fund (SGF) — the minimum donation for a main applicant is currently USD 250,000 — or invest in government-approved real estate of at least USD 400,000.",
          "Every application passes thorough due diligence: source of funds, criminal background and reputation checks across multiple databases. Processing typically takes several months, and citizenship includes eligible dependants.",
          "Dual citizenship is permitted, and the passport provides visa-free or visa-on-arrival access to a wide network of destinations.",
        ],
      },
      {
        kind: "panel",
        heading: "Current program parameters",
        rows: [
          { label: "SGF donation (main applicant)", value: "USD 250,000+" },
          { label: "Real estate investment", value: "USD 400,000+ in approved projects" },
          { label: "Due diligence", value: "Mandatory for all applicants and dependants 16+" },
          { label: "Processing", value: "Typically several months from submission" },
          { label: "Dual citizenship", value: "Permitted" },
        ],
        note: "Fees and thresholds are set by the St Kitts & Nevis Citizenship by Investment Unit (CIU) and have changed several times in recent years — confirm the current schedule before committing.",
      },
      {
        kind: "process",
        heading: "The application journey",
        steps: [
          { title: "Confirm eligibility", body: "Check your background will pass due diligence and that dependants can be included." },
          { title: "Choose the route", body: "Select the donation or approved real-estate option and reserve your place in the program." },
          { title: "Submit the file", body: "Lodge the application with identity, background and source-of-funds evidence." },
          { title: "Due diligence and approval", body: "The CIU runs background checks and approves qualifying applicants." },
          { title: "Certificate and passport", body: "Pay the balance, receive the certificate of registration and apply for the passport." },
        ],
      },
      {
        kind: "faq",
        heading: "St Kitts & Nevis, answered",
        items: [
          {
            question: "What does the program cost in total?",
            answer: "Beyond the donation or investment, there are due-diligence, government, processing and passport fees per applicant. The CIU publishes the full fee schedule — get a written, itemised estimate before starting.",
          },
          {
            question: "Can my family be included?",
            answer: "Yes — spouses, children and, under current rules, parents and grandparents can be included under defined conditions, each subject to due diligence.",
          },
          {
            question: "Is the passport useful for travel?",
            answer: "The passport offers a substantial visa-free network, but access changes over time — review the current status before deciding.",
          },
        ],
      },
    ],
    relatedPages: ["business-investment/citizenship", "business-investment/citizenship/vanuatu"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "St Kitts & Nevis Citizenship by Investment Unit", url: "https://www.ciu.gov.kn/" },
    ],
  },
  {
    id: "business-investment/citizenship/vanuatu",
    title: "Vanuatu Citizenship",
    eyebrow: "Citizenship by investment",
    seoTitle: "Vanuatu Citizenship by Investment (CSP) | DMC Immigration Group",
    seoDescription:
      "The Vanuatu Citizenship Support Programme (CSP) — donation from approximately USD 130,000, about a month of processing, dual citizenship and the visa-free network.",
    lede: "One of the world's fastest citizenship programs — a donation-based route to Vanuatu citizenship with approval typically in about a month.",
    sections: [
      {
        kind: "overview",
        heading: "How the CSP works",
        paragraphs: [
          "Vanuatu's Citizenship Support Programme (CSP) grants citizenship in exchange for a donation to the government's support fund, with a straightforward application and fast processing — typically around a month for complete files.",
          "Citizenship includes eligible family members, permits dual citizenship, and carries a passport with visa-free or visa-on-arrival access to a broad set of destinations, including several significant business and leisure markets.",
        ],
      },
      {
        kind: "panel",
        heading: "Current program parameters",
        rows: [
          { label: "Donation (single applicant)", value: "From approximately USD 130,000" },
          { label: "Family pricing", value: "Set per dependant category in the official schedule" },
          { label: "Processing", value: "About one month for complete files" },
          { label: "Due diligence", value: "Background checks on all applicants" },
          { label: "Dual citizenship", value: "Permitted" },
        ],
        note: "Fees and conditions are set by the Vanuatu Citizenship Commission and have been revised in recent years — confirm the current schedule with the Commission before starting.",
      },
      {
        kind: "process",
        heading: "The application journey",
        steps: [
          { title: "Confirm eligibility", body: "Ensure your background will pass due diligence and plan the family members to include." },
          { title: "Lodge the application", body: "Submit identity, background and source-of-funds documents with the application fee." },
          { title: "Due diligence", body: "The Commission runs background checks on all applicants." },
          { title: "Payment and approval", body: "Complete the donation and receive the certificate of citizenship." },
          { title: "Passport", body: "Apply for the Vanuatu passport and register overseas." },
        ],
      },
      {
        kind: "faq",
        heading: "Vanuatu, answered",
        items: [
          {
            question: "How fast is the program really?",
            answer: "Complete files are routinely approved in about a month — among the fastest citizenship programs, but genuine due diligence still applies.",
          },
          {
            question: "Do I need to visit Vanuatu?",
            answer: "Generally no — applications are processed remotely through licensed agents. Confirm the current requirement with the Commission.",
          },
          {
            question: "Which agent should I use?",
            answer: "Only licensed agents can file applications. DMC can recommend verifiable, licensed arrangements and prepare your documentation — the final filing is made through the licensed channel.",
          },
        ],
      },
    ],
    relatedPages: ["business-investment/citizenship", "business-investment/citizenship/st-kitts-and-nevis"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "Vanuatu Citizenship Commission — CSP", url: "https://csp.gov.vu/" },
    ],
  },
  {
    id: "business-investment/startup-entrepreneur-visas",
    title: "Startup & Entrepreneur Visas",
    eyebrow: "Business & investment",
    seoTitle: "Startup & Entrepreneur Visas — Canada, UK, UAE | DMC Immigration Group",
    seoDescription:
      "Startup and entrepreneur visa routes for founders — Canada's Start-up Visa, the UK's Innovator Founder, the UAE Golden Visa for entrepreneurs and Australia's changing landscape.",
    lede: "Founder-friendly routes across Canada, the UK, the UAE and Australia — each with endorsement, funding and residency requirements that matter.",
    sections: [
      {
        kind: "programs",
        heading: "Founder routes compared",
        items: [
          { code: "CA", title: "Canada — Start-up Visa", body: "Permanent residence for founders backed by a designated angel investor, venture fund or incubator. No Canadian experience required, but the program has a long processing queue." },
          { code: "UK", title: "UK — Innovator Founder", body: "Endorsement-based visa for founders of innovative businesses; no minimum funding requirement since April 2023; settlement after three years." },
          { code: "UAE", title: "UAE — Golden Visa (entrepreneurs)", body: "Ten-year residency for founders with a venture valued at AED 500,000+ or incubator approval." },
          { code: "AU", title: "Australia — changed landscape", body: "The old business-investment visas (188/888) closed to new applications in July 2024; the National Innovation Visa now targets exceptional founders and investors." },
        ],
      },
      {
        kind: "eligibility",
        heading: "What every founder route weighs",
        items: [
          { title: "Business viability", body: "A credible, innovative plan with evidence of traction or scalable potential." },
          { title: "Endorsement or support", body: "Designated organisations, endorsing bodies or incubators vouch for the venture." },
          { title: "Personal funds", body: "Settlement or maintenance funds for you and your family while the business establishes." },
          { title: "Language and background", body: "English or French requirements and standard health, security and due-diligence checks." },
        ],
      },
      {
        kind: "process",
        heading: "A typical founder journey",
        steps: [
          { title: "Map your venture", body: "Position your business against the route's innovation and viability criteria." },
          { title: "Secure support", body: "Obtain the designation, endorsement or incubator backing the route requires." },
          { title: "Prepare the file", body: "Assemble the business plan, financial evidence, funds and identity documents." },
          { title: "Apply", body: "Submit the visa application and complete biometrics and interviews." },
          { title: "Found and grow", body: "Relocate, launch the venture and track the conditions toward settlement or renewal." },
        ],
      },
      {
        kind: "faq",
        heading: "Founder visas, answered",
        items: [
          {
            question: "Do I need my own money to invest?",
            answer: "Requirements differ: Canada's SUV needs settlement funds and designated support; the UK removed its £50,000 minimum; the UAE requires a valued venture. What all routes need is a genuine business you actively manage.",
          },
          {
            question: "Can I found a company remotely?",
            answer: "Most founder routes expect you to live in and actively manage the business in the destination country — remote-only arrangements can jeopardise the visa.",
          },
          {
            question: "Which route is fastest?",
            answer: "Processing varies enormously — the UAE Golden Visa is typically quick, the UK Innovator Founder weeks to months, and Canada's Start-up Visa remains a multi-year queue. Honest timing depends on your profile and the program's current workload.",
          },
        ],
      },
    ],
    relatedPages: ["business-investment/golden-visa-uae", "business-investment/residency/canada", "business-investment/residency/uk"],
    lastVerified: "2026-08-03",
    officialSources: [
      { label: "IRCC — Start-up Visa", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/start-visa.html" },
      { label: "GOV.UK — Innovator Founder visa", url: "https://www.gov.uk/innovator-founder-visa" },
    ],
  },
];
