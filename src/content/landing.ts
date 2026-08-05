import { MARKET_LABELS, MARKET_LIST, type Market } from "@/config/markets";
import type { LandingDestination } from "@/config/landing-pages";

/**
 * Landing-page content.
 *
 * Copy comes verbatim from the client's campaign briefs (the four
 * `dmc _ <market> - <destination> PR.docx` files). Market-specific tokens
 * (city name, office bullet, FAQ geography, phone) resolve through the market
 * registry so no destination facts are duplicated or drift between the four
 * variants.
 */

export interface LandingFaq {
  q: string;
  a: string;
}

export interface LandingCard {
  title: string;
  copy: string;
}

export interface LandingProcessStep {
  title: string;
  copy: string;
}

export interface LandingVideo {
  /** YouTube video ID of a DMC-published success-story video. */
  videoId: string;
  title: string;
  /** Short uppercase tag, e.g. "Canada PR · 6 months". */
  label: string;
  /** Local WebP poster shown before the visitor plays the video. */
  poster: string;
}

export type LandingSection =
  | { kind: "why"; kicker: string; title: string; paragraphs: string[] }
  | { kind: "checklist"; kicker: string; title: string; items: string[]; closing: string; cta: string }
  | { kind: "benefits"; kicker: string; title: string; items: LandingCard[] }
  | { kind: "pathways"; kicker: string; title: string; lead: string; items: LandingCard[]; closing?: string; cta?: string }
  | {
      kind: "express-entry";
      kicker: string;
      title: string;
      lead: string;
      howItWorks: string[];
      programs: LandingCard[];
      closing: string;
      cta: string;
    }
  | { kind: "pnp"; kicker: string; title: string; lead: string; items: string[]; closing: string; cta: string }
  | { kind: "points"; kicker: string; title: string; lead: string; items: string[]; closing: string; cta: string }
  | { kind: "occupations"; kicker: string; title: string; lead: string; items: LandingCard[]; closing: string; cta: string }
  | { kind: "process"; kicker: string; title: string; steps: LandingProcessStep[]; cta: string };

export interface LandingContent {
  id: "visas/australia/pr-services" | "visas/canada/pr-services";
  destination: LandingDestination;
  market: Market;
  seoTitle: string;
  seoDescription: string;
  hero: {
    eyebrow: string;
    titlePrefix: string;
    titleAccent: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    proofStats: { value: string; label: string }[];
    scrollLabel: string;
  };
  skyline: {
    image: string;
    alt: string;
    kicker: string;
    title: string;
    copy: string;
    cta: string;
  };
  form: {
    title: string;
    subtitle: string;
    submitLabel: string;
    reassurance: string[];
    preferredOffices: Market[];
  };
  socialProof: string[];
  sections: LandingSection[];
  whyDmc: { kicker: string; title: string; items: string[]; quote: string };
  testimonials: { kicker: string; title: string; note?: string; videos: LandingVideo[] };
  faqs: LandingFaq[];
  finalCta: {
    kicker: string;
    title: string;
    copy: string;
    primaryLabel: string;
    callLabel: string;
    callPhoneE164: string;
    urgency?: string;
  };
}

const AUSTRALIA_ID = "visas/australia/pr-services";
const CANADA_ID = "visas/canada/pr-services";

/** All five DMC offices, with the landing market listed first. */
function preferredOfficesFor(market: Market): Market[] {
  return [market, ...MARKET_LIST.filter((m) => m !== market)];
}

function cityFor(market: Market): string {
  return MARKET_LABELS[market];
}

function officeLineFor(market: Market): string {
  return market === "abu-dhabi"
    ? "Office in Abu Dhabi — meet our consultants face to face"
    : "Offices in Dubai & Abu Dhabi — meet us face to face";
}

function fromMarketPhrase(market: Market): string {
  return market === "abu-dhabi" ? "from Abu Dhabi" : "from Dubai";
}

function australiaContent(market: Market): LandingContent {
  const city = cityFor(market);
  return {
    id: AUSTRALIA_ID,
    destination: "australia",
    market,
    seoTitle: `Australia PR for Skilled Professionals ${city === "Dubai" ? "in Dubai" : "in Abu Dhabi"} | DMC Immigration`,
    seoDescription:
      "Free Australia PR eligibility assessment with MARA-registered consultants in the UAE. Check your points, occupation and pathway — no obligation, we reply within 24 hours.",
    hero: {
      eyebrow: "MARA & RCIC Registered · 10+ Years in the UAE · 2,000+ 5-Star Reviews",
      titlePrefix: "Australia PR for Skilled Professionals",
      titleAccent: city,
      subtitle:
        "Get your Australia Permanent Residency with expert guidance from MARA-registered immigration consultants. Free eligibility assessment — know exactly where you stand before you spend a dirham.",
      primaryCta: "Check My Australia PR Eligibility — Free",
      secondaryCta: "Calculate My PR Points",
      proofStats: [
        { value: "2,000+", label: "5-star reviews" },
        { value: "10+", label: "Years in the UAE" },
        { value: "24h", label: "Response time" },
      ],
      scrollLabel: "Check your eligibility — free",
    },
    skyline: {
      image: "/media/pages/australia/australia-skyline.webp",
      alt: "Perth city skyline at twilight across the Swan River, Australia",
      kicker: "A new horizon",
      title: "Your Future Skyline — Australia",
      copy: "From Perth's Swan River to Sydney Harbour and Melbourne's laneways — Australia Permanent Residency puts a new country, a new career and a new lifestyle within reach.",
      cta: "Check My Australia PR Eligibility — Free",
    },
    form: {
      title: "Free Australia PR Eligibility Check",
      subtitle: "Know your points, your pathway and your chances — before you spend a dirham.",
      submitLabel: "Get My Free Assessment",
      reassurance: ["100% free", "No obligation", "We reply within 24 hours"],
      preferredOffices: preferredOfficesFor(market),
    },
    socialProof: [
      "Trusted by 2,000+ families",
      "MARA & RCIC Registered",
      "10+ Years in the UAE",
      `Offices ${market === "abu-dhabi" ? "in Abu Dhabi & Dubai" : "in Dubai & Abu Dhabi"}`,
    ],
    sections: [
      {
        kind: "why",
        kicker: "Australia permanent residency",
        title: "A Permanent Home, Not Another Renewal",
        paragraphs: [
          "You've built a career and a life in the UAE. But it's all tied to a contract and a renewal date.",
          "Australia Permanent Residency changes that. It's the legal right to live, work, and settle in Australia indefinitely — with free schooling for your kids, world-class public healthcare, and a clear pathway to citizenship.",
          "If your skills are in demand, Australia's skilled migration program is actively looking for people like you. The only question is whether you qualify — and we'll tell you that for free.",
        ],
      },
      {
        kind: "checklist",
        kicker: "Australia PR requirements",
        title: "Check Your Eligibility in 60 Seconds",
        items: [
          "Hold a graduate degree or diploma",
          "Are between 18 and 45 years of age",
          "Have 2–3+ years of relevant work experience",
          "Are proficient in English",
          "Work in an occupation on Australia's skilled occupation list",
        ],
        closing:
          "Tick most of these? You're likely a strong candidate for Australia Permanent Residency. Confirm it — free.",
        cta: "Check My Eligibility Now",
      },
      {
        kind: "benefits",
        kicker: "Work in Australia · Jobs in Australia",
        title: "Why Skilled Professionals Choose to Live & Work in Australia",
        items: [
          {
            title: "Strong Economy, Strong Careers",
            copy: "Work in Australia's thriving job market — one of the world's most stable economies, with high demand for skilled professionals.",
          },
          {
            title: "Free World-Class Education",
            copy: "Your children study in Australia's top public schools at no cost.",
          },
          {
            title: "Universal Healthcare",
            copy: "Australia's public health system is rated among the best in the world.",
          },
          {
            title: "Your Whole Family, Covered",
            copy: "Your PR includes your spouse and children — they live, work, and study with you, indefinitely.",
          },
          {
            title: "Live Anywhere in Australia",
            copy: "Settle in any state or territory — Sydney, Melbourne, Perth, or regional Australia.",
          },
          {
            title: "Pathway to Citizenship",
            copy: "Australia PR is your base — and your route to eventually holding one of the world's strongest citizenships.",
          },
        ],
      },
      {
        kind: "pathways",
        kicker: "Australia skilled migration",
        title: "Australia Skilled Migration Pathways — Which One Fits You?",
        lead: "There's no single route to Australia PR. As MARA-registered skilled migration consultants, we match your profile to the pathway with your strongest chance:",
        items: [
          {
            title: "Skilled Independent Pathway",
            copy: "Selected purely on merit through the points system — no employer or state nomination needed.",
          },
          {
            title: "Skilled Nominated Pathway",
            copy: "Nominated by an Australian state or territory that needs your skills.",
          },
          {
            title: "Skilled Work Regional Pathway",
            copy: "Live and work in regional Australia — often less competition and bonus points.",
          },
          {
            title: "Graduate Skilled Pathway",
            copy: "For recent graduates with Australian-recognized qualifications.",
          },
          {
            title: "Partner & Family Pathways",
            copy: "For those with an eligible partner or family already settled in Australia.",
          },
        ],
        cta: "Find My Best Pathway — Free",
      },
      {
        kind: "points",
        kicker: "Australia PR points · 65-point threshold",
        title: "Australia PR Points System — You Need 65 Points to Qualify",
        lead: "Australia selects skilled applicants through a points-based system. Minimum entry: 65 points. The higher you score, the stronger your chances.",
        items: [
          "Age — Maximum points for ages 25–32",
          "English — Higher IELTS / PTE / OET scores = more points",
          "Work Experience — More relevant years, more points",
          "Education — Bachelor's, Master's, or PhD",
          "Skilled Occupation — Your role must be on the skilled occupation list",
          "Bonus Points — Partner skills, community language, regional study",
        ],
        closing:
          "Most people miscalculate their score. We calculate your exact Australia PR points for free — and show you how to increase them.",
        cta: "Calculate My PR Points — Free",
      },
      {
        kind: "occupations",
        kicker: "Skilled occupation list · IT PR Australia",
        title: "Australia Skilled Occupation List — Is Your Job in Demand?",
        lead: "Australia's skilled occupation list covers hundreds of roles. The most in-demand fields right now:",
        items: [
          {
            title: "IT & Technology",
            copy: "Software developers, systems analysts, cybersecurity, network engineers. IT PR Australia is one of the fastest-growing categories.",
          },
          {
            title: "Engineering",
            copy: "Civil, Mechanical, Electrical, Structural & Mining engineers.",
          },
          {
            title: "Healthcare & Nursing",
            copy: "Registered nurses, doctors, lab technicians, physiotherapists.",
          },
          {
            title: "Skilled Trades",
            copy: "Electricians, carpenters, welders, plumbers.",
          },
          {
            title: "Finance & Accounting",
            copy: "Accountants, auditors, financial analysts.",
          },
          {
            title: "Hospitality",
            copy: "Chefs and hospitality managers.",
          },
        ],
        closing: "Don't see your role? Hundreds of occupations qualify for Australia skilled migration. Let us check yours.",
        cta: "Check My Occupation — Free",
      },
      {
        kind: "process",
        kicker: "Australia PR process",
        title: "Australia PR Process — 5 Clear Steps",
        steps: [
          { title: "Free Eligibility Assessment", copy: "We evaluate your profile honestly, at no cost." },
          { title: "Points & Pathway Planning", copy: "We calculate your points and pick your strongest route." },
          { title: "Skills Assessment & English", copy: "We guide your documentation step by step." },
          { title: "Application & Submission", copy: "Our MARA-registered team manages everything." },
          { title: "Pre & Post-Landing Support", copy: "From your move to your first job in Australia." },
        ],
        cta: "Start My PR Process — Free Assessment",
      },
    ],
    whyDmc: {
      kicker: "Australia immigration consultants",
      title: `Trusted Australia Immigration Consultants ${market === "abu-dhabi" ? "in Abu Dhabi" : "in Dubai"}`,
      items: [
        "MARA & RCIC Registered immigration consultants",
        "10+ years of skilled migration expertise in the UAE",
        "2,000+ five-star reviews from families we've guided",
        officeLineFor(market),
        "End-to-end service — eligibility to landing, including job search assistance in Australia",
        "Honest guidance — if you don't qualify, we tell you straight",
      ],
      quote: "We don't sell dreams. We give you a registered pathway — and the truth about your chances.",
    },
    testimonials: {
      kicker: "Client stories",
      title: "2,000+ Families Trusted Us With Their Australia PR",
      videos: [
        {
          videoId: "45RJO__WJfg",
          title: "Australia PR Success Story: Mr. Nicholas and His Family",
          label: "Australia PR · Family success",
          poster: "/media/pages/common/success-video-australia-pr-nicholas.webp",
        },
        {
          videoId: "6OEwi47thXI",
          title: "Australia Permanent Residency",
          label: "Australia PR · Skilled migration",
          poster: "/media/pages/common/success-video-australia-pr.webp",
        },
        {
          videoId: "RT9O2JwzP54",
          title: "Australia PR!",
          label: "Australia PR · Client story",
          poster: "/media/pages/common/success-video-australia-pr-family.webp",
        },
      ],
    },
    faqs: [
      {
        q: "What are the requirements for Australia PR?",
        a: "A graduate qualification, an occupation on the skilled occupation list, relevant work experience, English proficiency, and a minimum of 65 points. A free assessment confirms your exact eligibility.",
      },
      {
        q: `Can I apply for Australia PR ${fromMarketPhrase(market)}?`,
        a: "Yes. Eligibility depends on your age, occupation, experience, and English — not where you live. Thousands of UAE professionals qualify for Australia skilled migration.",
      },
      {
        q: "How long does the Australia PR process take?",
        a: "It varies by pathway and profile. We give you a realistic timeline during your free assessment.",
      },
      {
        q: "Do I need a job offer for Australia PR?",
        a: "Not always. Several skilled migration pathways require no job offer or sponsorship. We'll show you which ones fit your profile.",
      },
      {
        q: "How much does Australia PR cost?",
        a: "It depends on your pathway and family size. You get a transparent, itemized breakdown in your consultation — no hidden charges.",
      },
      {
        q: "Which occupations qualify for Australia PR?",
        a: "IT, engineering, healthcare, skilled trades, finance, and hospitality lead the skilled occupation list — but hundreds of roles qualify. We check yours for free.",
      },
      {
        q: "Can my family be included in my Australia PR?",
        a: "Yes — your spouse and dependent children are covered, with options to sponsor eligible relatives later.",
      },
    ],
    finalCta: {
      kicker: "Start with a free assessment",
      title: `Start Your Australia PR Assessment ${market === "abu-dhabi" ? "in Abu Dhabi" : ""} — Free`,
      copy: "One free conversation with our MARA-registered consultants gives you your eligibility, your points score, and your clearest pathway to Australia Permanent Residency.",
      primaryLabel: "Book My Free Australia PR Assessment",
      callLabel: "Call Now",
      callPhoneE164: market === "abu-dhabi" ? "+97124914919" : "+97143447757",
      urgency:
        "Australia updates its skilled occupation lists regularly. Get assessed now so you can plan ahead of the changes.",
    },
  };
}

function canadaContent(market: Market): LandingContent {
  const city = cityFor(market);
  const isAbuDhabi = market === "abu-dhabi";

  const sections: LandingSection[] = [
    {
      kind: "why",
      kicker: "Canada permanent residency",
      title: "A Permanent Home, Not Another Renewal",
      paragraphs: [
        "You've built a career and a life in the UAE. But it's all tied to a contract and a renewal date.",
        "Canada Permanent Residency changes that. It's the legal right to live, work, and settle anywhere in Canada — with free schooling for your kids, universal public healthcare, and one of the world's clearest pathways to citizenship.",
        "Canada plans to welcome hundreds of thousands of new permanent residents every year — and skilled professionals are exactly who they're looking for. The only question is whether you qualify. We'll tell you that for free.",
      ],
    },
    {
      kind: "checklist",
      kicker: "Canada PR requirements",
      title: "Check Your Eligibility in 60 Seconds",
      items: [
        "Hold a graduate degree or diploma",
        "Are between 18 and 45 years of age",
        isAbuDhabi ? "Have 1–3+ years of skilled work experience" : "Have 2–3+ years of relevant work experience",
        isAbuDhabi
          ? "Are proficient in English (IELTS / CELPIP) — French is a bonus"
          : "Are proficient in English (IELTS / CELPIP)",
        isAbuDhabi
          ? "Work in a skilled occupation recognized under Canada's immigration system"
          : "Work in a skilled occupation",
      ],
      closing:
        "Tick most of these? You're likely a strong candidate for Canada Permanent Residency. Confirm it — free.",
      cta: "Check My Eligibility Now",
    },
    {
      kind: "benefits",
      kicker: "Work in Canada · Immigrate to Canada",
      title: "Why Skilled Professionals Choose to Immigrate to Canada",
      items: isAbuDhabi
        ? [
            {
              title: "A System Built for Skilled Migrants",
              copy: "Canada immigration actively targets qualified professionals — selection is transparent, points-based, and merit-driven.",
            },
            {
              title: "Free World-Class Education",
              copy: "Your children study free in Canada's excellent public schools, with access to globally ranked universities.",
            },
            {
              title: "Universal Healthcare",
              copy: "Public healthcare covers you and your family across every province.",
            },
            {
              title: "Fast Track to Citizenship",
              copy: "After just 3 years as a permanent resident, you can apply for Canadian citizenship — one of the fastest timelines in the world.",
            },
            {
              title: "Your Whole Family, Covered",
              copy: "Your spouse and children are included in your PR — they live, work, and study with you. You can sponsor parents later.",
            },
            {
              title: "Stability & Quality of Life",
              copy: "Consistently ranked among the world's best countries to live — safe, multicultural, and welcoming to newcomers.",
            },
          ]
        : [
            {
              title: "Strong Economy, Real Opportunity",
              copy: "Work in Canada's growing economy, where skilled professionals are in constant demand across every province.",
            },
            {
              title: "Free World-Class Education",
              copy: "Your children study in Canada's excellent public schools at no cost.",
            },
            {
              title: "Universal Healthcare",
              copy: "Canada's publicly funded healthcare covers you and your family.",
            },
            {
              title: "Your Whole Family, Covered",
              copy: "Your PR includes your spouse and children — they live, work, and study with you. You can later sponsor parents and grandparents too.",
            },
            {
              title: "Live Anywhere in Canada",
              copy: "Toronto, Vancouver, Calgary, or a quieter province — as a permanent resident, the choice is yours.",
            },
            {
              title: "Fast Track to Citizenship",
              copy: "Canada offers one of the world's shortest PR-to-citizenship timelines — eligible after just 3 years of residence.",
            },
          ],
    },
  ];

  if (isAbuDhabi) {
    sections.push(
      {
        kind: "pathways",
        kicker: "Express Entry Canada & beyond",
        title: "Express Entry Canada & Beyond — Your Pathways to Canada PR",
        lead: "There's more than one route to Canada Permanent Residency. As RCIC-registered consultants, we match your profile to the pathway with your strongest chance:",
        items: [
          {
            title: "Express Entry — Federal Skilled Worker",
            copy: "Canada's flagship system for skilled professionals abroad. Profiles are ranked by CRS score, and the highest-ranked receive invitations for permanent residency.",
          },
          {
            title: "Express Entry — Category-Based Draws",
            copy: "Targeted selections for in-demand fields like healthcare, STEM, trades, and French speakers — often with lower score cut-offs.",
          },
          {
            title: "Provincial Nominee Programs (PNP)",
            copy: "Canada's provinces — Ontario, Alberta, Saskatchewan, Manitoba, and more — nominate skilled professionals their economies need. A nomination adds 600 CRS points, virtually guaranteeing your invitation.",
          },
          {
            title: "Atlantic & Regional Pathways",
            copy: "Dedicated routes through Canada's Atlantic provinces and smaller communities, often with more accessible requirements.",
          },
          {
            title: "Family Sponsorship",
            copy: "For those with a spouse, partner, or eligible family already settled in Canada.",
          },
        ],
        cta: "Find My Best Pathway — Free",
      },
      {
        kind: "points",
        kicker: "Canada PR points · CRS calculator",
        title: "Canada PR Points — Understand Your CRS Score Before You Apply",
        lead: "Canada's Express Entry system ranks candidates using the Comprehensive Ranking System (CRS). Your score decides whether you're invited — so knowing it upfront is everything.",
        items: [
          "Age — Maximum points for ages 20–29",
          "Education — Bachelor's, Master's, or PhD",
          "English / French — Higher IELTS or CELPIP scores add major points; French adds bonus points",
          "Work Experience — Skilled experience at home and abroad",
          "Spouse Factors — Your partner's education, language, and experience",
          "Provincial Nomination — +600 points, near-guaranteed invitation",
        ],
        closing:
          "Most people don't know their real CRS score — or how much they could raise it. We calculate it for free and show you exactly how to improve it.",
        cta: "Calculate My CRS Score — Free",
      },
      {
        kind: "occupations",
        kicker: "In-demand occupations",
        title: "In-Demand Occupations for Canada Immigration",
        lead: "Canada's category-based selection actively favours professionals in:",
        items: [
          {
            title: "Healthcare & Nursing",
            copy: "Registered nurses, physicians, lab technologists, physiotherapists. Canada nurse immigration is one of the strongest routes right now.",
          },
          {
            title: "STEM & IT",
            copy: "Software developers, data specialists, engineers, cybersecurity professionals.",
          },
          {
            title: "Engineering",
            copy: "Civil, mechanical, electrical, and construction engineers.",
          },
          {
            title: "Skilled Trades",
            copy: "Electricians, welders, plumbers, technicians.",
          },
          {
            title: "Finance & Accounting",
            copy: "Accountants, auditors, financial analysts.",
          },
          {
            title: "Education & Social Services",
            copy: "Teachers and early childhood educators.",
          },
        ],
        closing:
          "Don't see your role? Hundreds of occupations qualify for Canada PR. Let us check yours against the current selection categories.",
        cta: "Check My Occupation — Free",
      },
      {
        kind: "process",
        kicker: "Canada PR process",
        title: "Canada PR Process — 5 Clear Steps",
        steps: [
          { title: "Free Eligibility Assessment", copy: "We evaluate your profile honestly, at no cost." },
          {
            title: "CRS Score & Pathway Planning",
            copy: "We calculate your points and pick your strongest route: Express Entry or PNP.",
          },
          {
            title: "Language Test & Credential Assessment",
            copy: "We guide your IELTS/CELPIP prep and education verification (ECA) step by step.",
          },
          {
            title: "Profile Submission & Invitation",
            copy: "Our RCIC-registered team builds and manages your application end to end.",
          },
          {
            title: "Pre & Post-Landing Support",
            copy: "From your move to your first job search in Canada, we're with you.",
          },
        ],
        cta: "Start My PR Process — Free Assessment",
      },
    );
  } else {
    sections.push(
      {
        kind: "express-entry",
        kicker: "Express Entry Canada — 480/mo",
        title: "Express Entry Canada — The Fastest Route to Canada PR",
        lead: "Express Entry is Canada's flagship online system for skilled immigration — and for most UAE professionals, it's the quickest path to Permanent Residency.",
        howItWorks: [
          "Your profile is scored using the Comprehensive Ranking System (CRS) — based on age, education, experience, and English.",
          "You enter the Express Entry pool alongside other candidates.",
          "Canada holds regular draws — if your CRS score meets the cut-off, you're invited to apply for PR.",
        ],
        programs: [
          {
            title: "Federal Skilled Worker Program",
            copy: "For skilled professionals with foreign work experience.",
          },
          {
            title: "Federal Skilled Trades Program",
            copy: "For qualified tradespeople.",
          },
          {
            title: "Canadian Experience Class",
            copy: "For those with Canadian work experience.",
          },
        ],
        closing:
          "Your CRS score decides everything — and most people don't know theirs. We calculate it for free and show you exactly how to raise it.",
        cta: "Calculate My Express Entry Score — Free",
      },
      {
        kind: "pnp",
        kicker: "PNPs Canada · Provincial nominee",
        title: "Provincial Nominee Programs (PNP) — Your Second Door to Canada PR",
        lead: "Not scoring high enough for a direct Express Entry draw? Canada's provinces run their own Provincial Nominee Programs — each selecting skilled professionals their local economy needs.",
        items: [
          "A provincial nomination adds 600 CRS points — virtually guaranteeing an invitation",
          "Provinces like Ontario, Alberta, Saskatchewan, Manitoba, and British Columbia actively target specific occupations",
          "Many PNP streams accept candidates that federal draws overlook",
        ],
        closing: "The right province can transform a borderline profile into a strong one. We identify which PNP streams match your occupation.",
        cta: "Find My Best PNP Option",
      },
      {
        kind: "points",
        kicker: "Canada PR points · Express Entry calculator",
        title: "Canada PR Points — How Your Score Is Calculated",
        lead: "Canada assesses skilled applicants on a points-based system. Your score comes from:",
        items: [
          "Age — Maximum points for ages 20–29",
          "Education — Bachelor's, Master's, or PhD",
          "English Ability — Higher IELTS / CELPIP scores earn significantly more points",
          "Work Experience — More skilled years, more points",
          "Adaptability Factors — Spouse's credentials, prior Canada connections",
          "Provincial Nomination — +600 CRS points, the single biggest boost",
        ],
        closing:
          "Most people either underestimate their score or miss easy points they could claim. We calculate your exact Canada PR points free — and show you how to increase them.",
        cta: "Calculate My PR Points — Free",
      },
      {
        kind: "occupations",
        kicker: "In-demand occupations",
        title: "Is Your Occupation in Demand in Canada?",
        lead: "Canada's skilled immigration streams actively target professionals across:",
        items: [
          {
            title: "IT & Technology",
            copy: "Software developers, data specialists, cybersecurity, network engineers. Tech is one of Canada's top-priority categories.",
          },
          {
            title: "Healthcare & Nursing",
            copy: "Registered nurses, doctors, lab technicians, physiotherapists.",
          },
          {
            title: "Engineering",
            copy: "Civil, Mechanical, Electrical, and Structural engineers.",
          },
          {
            title: "Skilled Trades",
            copy: "Electricians, welders, plumbers, technicians.",
          },
          {
            title: "Finance & Accounting",
            copy: "Accountants, auditors, financial analysts.",
          },
          {
            title: "Transport & Logistics",
            copy: "Supply chain professionals and licensed drivers.",
          },
        ],
        closing: "Don't see your role? Canada's category-based draws change regularly — let our experts check your occupation.",
        cta: "Check My Occupation — Free",
      },
      {
        kind: "process",
        kicker: "Canada PR process",
        title: "Canada PR Process — 5 Clear Steps",
        steps: [
          { title: "Free Eligibility Assessment", copy: "We evaluate your profile honestly, at no cost." },
          {
            title: "CRS Score & Strategy",
            copy: "We calculate your points and choose Express Entry, PNP, or both.",
          },
          {
            title: "Language & Credentials",
            copy: "We guide your IELTS prep and education assessment (ECA), step by step.",
          },
          {
            title: "Profile & Application",
            copy: "Our RCIC-registered team manages your submission end to end.",
          },
          {
            title: "Pre & Post-Landing Support",
            copy: "From your move to your first job in Canada.",
          },
        ],
        cta: "Start My PR Process — Free Assessment",
      },
    );
  }

  const whyDmcBullets = isAbuDhabi
    ? [
        "RCIC Registered immigration consultants (Regulated Canadian Immigration Consultant)",
        "10+ years of immigration expertise in the UAE",
        "2,000+ five-star reviews from families we've guided",
        "Office in Abu Dhabi — meet our consultants face to face",
        "End-to-end service — eligibility to landing, including job search assistance in Canada",
        "Honest guidance — if you don't qualify, we tell you straight",
      ]
    : [
        "RCIC Registered — the official Canadian regulatory credential — plus MARA registration",
        "10+ years of skilled migration expertise in the UAE",
        "2,000+ five-star reviews from families we've guided",
        "Offices in Dubai & Abu Dhabi — meet us face to face",
        "End-to-end service — eligibility to landing, including job search assistance in Canada",
        "Honest guidance — if you don't qualify, we tell you straight",
      ];

  const faqs: LandingFaq[] = [
    {
      q: "What are the requirements for Canada PR?",
      a: isAbuDhabi
        ? "A recognized qualification, skilled work experience, English proficiency (IELTS/CELPIP), and a competitive CRS score under Express Entry — or a provincial nomination. A free assessment confirms your exact eligibility."
        : "A graduate qualification, skilled work experience, English proficiency, and a competitive points score through Express Entry or a Provincial Nominee Program. A free assessment confirms your exact eligibility.",
    },
    {
      q: `Can I apply for Canada PR ${fromMarketPhrase(market)}?`,
      a: isAbuDhabi
        ? "Yes. Express Entry and PNP are open to applicants worldwide. Your eligibility depends on your age, education, experience, and language — not where you live."
        : "Yes. Eligibility depends on your age, education, experience, and English — not where you live. Thousands of UAE professionals qualify every year.",
    },
    {
      q: "What is Express Entry Canada?",
      a: "Canada's online system for skilled immigration. Your profile gets a CRS score, and regular draws invite the highest-ranked candidates to apply for PR.",
    },
    {
      q: "What CRS score do I need?",
      a: isAbuDhabi
        ? "Cut-offs change with every draw, and category-based draws for fields like healthcare and STEM are often lower. We tell you your current score and how to raise it."
        : "Cut-offs change with every draw and category. During your free assessment we calculate your score and show you realistic ways to raise it — including PNP options worth +600 points.",
    },
    {
      q: "How long does the Canada PR process take?",
      a: isAbuDhabi
        ? "Express Entry applications are often processed in around 6 months once invited. Your full timeline depends on your pathway — we map it out in your free assessment."
        : "It varies by pathway and profile. Express Entry is among the fastest skilled immigration systems in the world — we'll give you a realistic timeline for your case.",
    },
    {
      q: "Do I need a job offer for Canada PR?",
      a: isAbuDhabi
        ? "No. Express Entry and most PNP streams don't require a job offer — your skills, education, and language do the work."
        : "No. Most Express Entry candidates qualify without a job offer. One helps your score, but it's not a requirement.",
    },
    {
      q: "How much does Canada PR cost?",
      a: "It depends on your pathway and family size. You get a transparent, itemized breakdown in your consultation — no hidden charges.",
    },
    {
      q: "Can my family be included in my Canada PR?",
      a: "Yes — your spouse and dependent children are included, and Canada also offers sponsorship options for parents and grandparents later.",
    },
  ];

  return {
    id: CANADA_ID,
    destination: "canada",
    market,
    seoTitle: `Canada PR for Skilled Professionals ${city === "Dubai" ? "in Dubai" : "in Abu Dhabi"} | DMC Immigration`,
    seoDescription:
      "Free Canada PR eligibility assessment with RCIC-registered consultants in the UAE. Express Entry, PNP and CRS guidance — know your score before you apply, with no obligation.",
    hero: {
      eyebrow: isAbuDhabi
        ? "RCIC Registered · 10+ Years in the UAE · 2,000+ 5-Star Reviews"
        : "RCIC & MARA Registered · 10+ Years in the UAE · 2,000+ 5-Star Reviews",
      titlePrefix: "Canada PR for Skilled Professionals",
      titleAccent: city,
      subtitle: isAbuDhabi
        ? "Get your Canada Permanent Residency through Express Entry or a Provincial Nominee Program — with honest, expert guidance from RCIC-registered immigration consultants in Abu Dhabi."
        : "Get your Canada Permanent Residency with expert guidance from RCIC-registered immigration consultants. Free eligibility assessment — know exactly where you stand before you spend a dirham.",
      primaryCta: "Check My Canada PR Eligibility — Free",
      secondaryCta: "Calculate My CRS Score",
      proofStats: [
        { value: "2,000+", label: "5-star reviews" },
        { value: "10+", label: "Years in the UAE" },
        { value: "24h", label: "Response time" },
      ],
      scrollLabel: "Check your eligibility — free",
    },
    skyline: {
      image: "/media/pages/canada/canada-skyline.webp",
      alt: "Toronto skyline at dusk with the CN Tower, Canada",
      kicker: "A new horizon",
      title: "Your Future Skyline — Canada",
      copy: "Toronto's glittering skyline, Vancouver's mountains, Calgary's open plains — Canada PR opens the door to a new country, a new career and a new lifestyle.",
      cta: "Check My Canada PR Eligibility — Free",
    },
    form: {
      title: "Free Canada PR Eligibility Check",
      subtitle: "Know your CRS score, your pathway and your chances — before you spend a dirham.",
      submitLabel: "Get My Free Assessment",
      reassurance: ["100% free", "No obligation", "We reply within 24 hours"],
      preferredOffices: preferredOfficesFor(market),
    },
    socialProof: isAbuDhabi
      ? ["Trusted by 2,000+ families", "RCIC Registered", "10+ Years in the UAE", "Offices in Abu Dhabi & Dubai"]
      : ["Trusted by 2,000+ families", "RCIC & MARA Registered", "10+ Years in the UAE", "Offices in Dubai & Abu Dhabi"],
    sections,
    whyDmc: {
      kicker: "Canada immigration consultants",
      title: `Trusted Canada Immigration Consultants ${market === "abu-dhabi" ? "in Abu Dhabi" : "in Dubai"}`,
      items: whyDmcBullets,
      quote: "We don't sell dreams. We give you a registered pathway — and the truth about your chances.",
    },
    testimonials: {
      kicker: "Client stories",
      title: "2,000+ Families Trusted Us With Their Canada PR",
      note: isAbuDhabi ? "Rated 5 stars by 2,000+ clients across the UAE." : undefined,
      videos: [
        {
          videoId: "HotxB851tq8",
          title: "Secured Canada PR in Just 6 Months",
          label: "Canada PR · 6 months",
          poster: "/media/pages/common/success-video-canada-pr-6-months.webp",
        },
        {
          videoId: "pU9tj1j5FGE",
          title: "Ms. Akosua Duodua Secured Canada PR in 9 Months",
          label: "Canada PR · 9 months",
          poster: "/media/pages/common/success-video-canada-pr-akosua.webp",
        },
        {
          videoId: "o9d1fobgRNg",
          title: "DM Consultant Success Story — Canada PR",
          label: "Canada PR · Success story",
          poster: "/media/pages/common/success-video-canada-pr-story.webp",
        },
      ],
    },
    faqs,
    finalCta: {
      kicker: "Start with a free assessment",
      title: `Start Your Canada PR Assessment ${market === "abu-dhabi" ? "in Abu Dhabi" : ""} — Free`,
      copy: "One free conversation with our RCIC-registered consultants gives you your eligibility, your CRS score, and your clearest pathway to Canada Permanent Residency.",
      primaryLabel: "Book My Free Canada PR Assessment",
      callLabel: "Call Now",
      callPhoneE164: market === "abu-dhabi" ? "+97124914919" : "+97143447757",
      urgency: isAbuDhabi
        ? "Canada's Express Entry draws happen every few weeks, and category cut-offs change with each one. Get assessed now so you're ready for the next draw."
        : "Canada's draw categories and cut-off scores change throughout the year. Get assessed now so you're ready when your category is drawn.",
    },
  };
}

export function getLandingContent(destination: LandingDestination, market: Market): LandingContent {
  if (market !== "dubai" && market !== "abu-dhabi") {
    throw new Error(`Landing pages are only built for Dubai and Abu Dhabi, got "${market}".`);
  }
  return destination === "australia" ? australiaContent(market) : canadaContent(market);
}

/** The destination the form should record for a landing page. */
export function landingDestinationLabel(destination: LandingDestination): string {
  return destination === "australia"
    ? "Australia PR — Skilled Migration"
    : "Canada PR — Express Entry / PNP";
}
