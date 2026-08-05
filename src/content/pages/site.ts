import { OFFICE_LIST } from "@/config/offices";
import { TESTIMONIALS } from "@/config/testimonials";

import type { PageContent } from "@/content/pages/types";

const OFFICE_CARDS = OFFICE_LIST.map((office) => ({
  title: office.city,
  label: office.market,
  body: [`Phone: ${office.phoneDisplay}`, `Email: ${office.email}`, office.address].join("\n"),
  href: office.directionsUrl,
}));

const LEGACY_TESTIMONIAL_CARDS = TESTIMONIALS.filter((testimonial) => testimonial.quote).slice(0, 3).map((testimonial) => ({
  title: testimonial.name,
  label: `${testimonial.program} · ${testimonial.market}`,
  body: testimonial.quote,
  href: testimonial.sourceUrl,
}));

const LEGACY_BLOG_POSTS = [
  {
    title: "How to apply for a Poland work permit visa from Dubai",
    label: "March 2026",
    body: "Legacy article on employer-led work permits and document strategy.",
    href: "https://dm-consultant.ae/how-to-apply-for-a-poland-work-permit-visa-from-dubai/",
  },
  {
    title: "UK travel visa guide 2026",
    label: "March 2026",
    body: "Tourist-visa requirements, process and cost explained for UAE residents.",
    href: "https://dm-consultant.ae/uk-travel-visa-guide-2026-tourist-visa-requirements-process-and-cost-explained/",
  },
  {
    title: "USA visa appointment approval tips",
    label: "February 2026",
    body: "Practical interview and appointment-preparation advice from the old blog.",
    href: "https://dm-consultant.ae/usa-visa-appointment-approval-tips/",
  },
  {
    title: "How to improve your chances of qualifying in the Express Entry draw",
    label: "January 2026",
    body: "A legacy Express Entry strategy article focused on ranking factors.",
    href: "https://dm-consultant.ae/how-to-improve-chances-of-qualifying-in-the-express-entry-draw-to-get-canada-express-entry/",
  },
  {
    title: "Canada Express Entry 2026 CRS scores, draws and FSW",
    label: "January 2026",
    body: "The old site's 2026 Express Entry roundup and draw commentary.",
    href: "https://dm-consultant.ae/canada-express-entry-2026-crs-scores-draws-and-federal-skilled-worker-program/",
  },
  {
    title: "How to secure a Canadian work permit from Dubai",
    label: "January 2026",
    body: "Work-permit process and evidence planning for UAE applicants.",
    href: "https://dm-consultant.ae/how-to-secure-a-canadian-work-permit-from-dubai-uae/",
  },
  {
    title: "How to apply for Canada post-graduation work visa from Dubai",
    label: "January 2026",
    body: "Post-study work route guidance from the legacy blog archive.",
    href: "https://dm-consultant.ae/how-to-apply-for-canada-post-graduation-work-visa-from-dubai/",
  },
  {
    title: "H1B visa USA guide 2026",
    label: "February 2026",
    body: "Lottery changes, wage levels and the process for UAE residents.",
    href: "https://dm-consultant.ae/h1b-visa-usa-guide-2026-lottery-changes-wage-levels-and-the-process/",
  },
];

const LEGACY_GALLERY_ITEMS = [
  "DM_Success_Stories_1",
  "DM_Success_Stories_2",
  "DM_Success_Stories_3",
  "DM_Success_Stories_4",
  "DM_Success_Stories_5",
  "DM_Success_Stories_6",
  "DM_Success_Stories_7",
  "DM_Success_Stories_8",
];

const LEGAL_HELP = [
  "The legal pages stay client-owned and draft-like for now.",
  "They explain how we use your information, what our service covers, how refunds are handled and the limits of the advice provided.",
];

export const SITE_PAGES: PageContent[] = [
  {
    id: "about",
    title: "About DMC Immigration Group",
    eyebrow: "About us",
    seoTitle: "About DMC Immigration Group | UAE, Qatar, Kuwait & India",
    seoDescription:
      "About DMC Immigration Group — the practice background, multi-market setup, service mix and the way the team works across Canada, Australia, the UK and more.",
    lede:
      "DMC Immigration Group supports clients across five markets with regulated immigration guidance, careful document preparation and a plain-language process that mirrors the old site's service model in a cleaner layout.",
    sections: [
      {
        kind: "overview",
        heading: "Who we are",
        paragraphs: [
          "The legacy site presented DMC as a long-running immigration consultancy serving families, professionals and employers across Canada, Australia, the UK, the USA and other destinations.",
          "This version keeps that same multi-market scope, but presents it in a structure that is easier to scan, easier to navigate and easier to verify route by route.",
        ],
      },
      {
        kind: "cards",
        heading: "What defines the practice",
        items: [
          {
            title: "Five market presence",
            label: "Local support",
            body: "Dubai, Abu Dhabi, Qatar, Kuwait and India each have their own market page, office contact details and route context.",
          },
          {
            title: "Regulated guidance",
            label: "Professional standards",
            body: "Where Canadian and Australian credentials apply, the site keeps the regulator wording explicit and avoids unsupported claims.",
          },
          {
            title: "Structured case work",
            label: "Document-first",
            body: "Applications are built from verified evidence, route-specific checklists and a clear understanding of current rules.",
          },
        ],
      },
      {
        kind: "help",
        heading: "How the site is organised",
        paragraphs: [
          "The homepage carries the market-specific overview, the internal pages carry route-specific explanations, and the resources section gathers the supporting pages and guides that people usually need while researching a case.",
          "If you are on a market page, the hero and supporting copy explicitly identify the market so users always know which office context they are reading.",
        ],
      },
      {
        kind: "links",
        heading: "Continue exploring",
        items: [
          { title: "Why DMC", path: "/why-dmc", description: "The process, service model and practical expectations." },
          { title: "Credentials", path: "/credentials", description: "The consultant and regulator page." },
          { title: "Contact", path: "/contact", description: "Phone, email and office details for each market." },
        ],
      },
    ],
    relatedPages: ["why-dmc", "credentials", "contact"],
    lastVerified: "2026-08-04",
    officialSources: [],
  },
  {
    id: "contact",
    title: "Contact DMC Immigration Group",
    eyebrow: "Contact",
    seoTitle: "Contact DMC Immigration Group | Office details by market",
    seoDescription:
      "Find the DMC office nearest to you — phone, email, address and directions for Dubai, Abu Dhabi, Qatar, Kuwait and India.",
    lede:
      "Choose the office that matches your market, then use the phone, email or directions link to start the conversation in the right time zone and with the right local contact.",
    sections: [
      {
        kind: "overview",
        heading: "Get in touch with the right office",
        paragraphs: [
          "The old site positioned contact as a local office choice first: call or email the office nearest you and the team would route the case to the correct market context.",
          "That same structure is now shown explicitly here, with one card for each market and a clear directions link on every card. Visitors {marketIn} can start directly from the {market} office card below.",
        ],
      },
      {
        kind: "cards",
        heading: "Office directory",
        items: OFFICE_CARDS,
      },
      {
        kind: "faq",
        heading: "Contact, answered",
        items: [
          {
            question: "Which office should I contact?",
            answer: "Use the office that matches your market page. If you are in Dubai, Abu Dhabi, Qatar, Kuwait or India, the matching office card gives the local phone, email and directions.",
          },
          {
            question: "Can I start by email?",
            answer: "Yes. Email is fine for the first pass, especially if you want to share a short summary before a consultation.",
          },
          {
            question: "Do you offer office directions?",
            answer: "Yes — each office card links to the supplied directions URL so clients can navigate to the branch directly.",
          },
        ],
      },
    ],
    relatedPages: ["about", "credentials", "why-dmc"],
    lastVerified: "2026-08-04",
    officialSources: [],
  },
  {
    id: "credentials",
    title: "Credentials",
    eyebrow: "About us",
    seoTitle: "Immigration Consultant Credentials | DMC Immigration Group",
    seoDescription:
      "The credentials and regulator page for DMC Immigration Group — with current verification status and a clear note on what still needs client confirmation.",
    lede:
      "This page keeps the consultant credentials visible, but it does so honestly: some regulator and publication details still need final client verification before they are treated as public claims.",
    sections: [
      {
        kind: "status",
        label: "Verification",
        tone: "warning",
        body: "Consultant status and republication approval remain under verification. The page is published in candidate form so the structure is ready, but the supporting claims stay explicit about their status.",
      },
      {
        kind: "overview",
        heading: "What we show here",
        paragraphs: [
          "The legacy site listed the team and cited regulator registration details. This version retains that intent while separating verified office information from items that still need confirmation.",
          "When the client confirms publication approval, the cards can move from candidate status to public credential listings without changing the page structure.",
        ],
      },
      {
        kind: "cards",
        heading: "Consultant records",
        items: [
          {
            title: "Kanika Gaba",
            label: "RCIC candidate",
            body: "Legacy source: R534737. The current regulator and republication status still need confirmation before this card can be treated as a final public credential.",
            href: "https://register.college-ic.ca/Public-Register-EN/Licensee/Profile.aspx?ID=22560",
          },
          {
            title: "Riccardo James Patrick Ippoliti",
            label: "MARA candidate",
            body: "Legacy source: 1386990. The current MARA register entry and DMC affiliation still need verification before publication as a final credential.",
            href: "https://www.mara.gov.au/",
          },
        ],
      },
      {
        kind: "faq",
        heading: "Credentials, answered",
        items: [
          {
            question: "Why is the page marked as candidate?",
            answer: "Because the site still needs the client to confirm which consultant details can be published and how the regulator wording should appear on the live site.",
          },
          {
            question: "Can I use the register links to verify status?",
            answer: "Yes — the cards link to the public regulator sites so the team and clients can check the current entry directly.",
          },
        ],
      },
    ],
    relatedPages: ["about", "contact", "why-dmc"],
    lastVerified: "2026-08-04",
    officialSources: [
      { label: "College of Immigration and Citizenship Consultants", url: "https://college-ic.ca/" },
      { label: "MARA", url: "https://www.mara.gov.au/" },
    ],
  },
  {
    id: "success-stories",
    title: "Success Stories",
    eyebrow: "Resources",
    seoTitle: "Client Success Stories | DMC Immigration Group",
    seoDescription:
      "Legacy client testimonials and success story context from the old site, presented carefully until each item is approved for republication.",
    lede:
      "The old site used testimonials and success stories heavily. This page preserves the structure, keeps the names visible only where they are already in the legacy inventory, and labels the items candidly as candidate content.",
    sections: [
      {
        kind: "overview",
        heading: "Legacy testimonials",
        paragraphs: [
          "The client-testimonial page on the previous site named the people below and tied them to their immigration journeys. Those records are still treated as candidate content until the client confirms republication.",
          "Where the quote is already preserved in the crawl notes, it is shown here in full. The page remains deliberately straightforward rather than over-designed.",
        ],
      },
      {
        kind: "cards",
        heading: "Testimonials from the old site",
        items: LEGACY_TESTIMONIAL_CARDS,
      },
      {
        kind: "help",
        heading: "Publication note",
        paragraphs: [
          "These testimonials are not yet approved for broad republication. They remain in candidate status until the client confirms which stories can appear on the live site.",
          "That lets the new theme stay ready without inventing praise, outcomes or endorsements that the client has not cleared.",
        ],
      },
      {
        kind: "links",
        heading: "Related pages",
        items: [
          { title: "Gallery", path: "/gallery", description: "Legacy gallery material and image archive." },
          { title: "Contact", path: "/contact", description: "Speak to the office nearest you." },
          { title: "Credentials", path: "/credentials", description: "Who can speak for the practice publicly." },
        ],
      },
    ],
    relatedPages: ["gallery", "contact", "credentials"],
    lastVerified: "2026-08-04",
    officialSources: [],
  },
  {
    id: "video-success-stories",
    title: "Video Success Stories",
    eyebrow: "Resources",
    seoTitle: "Video Success Stories | DMC Immigration Group",
    seoDescription:
      "The video-story landing page for DMC Immigration Group — currently ready for approved client video assets, with the old-site layout preserved.",
    lede:
      "The legacy site hinted at video stories, but the crawl did not surface approved embeds. This page keeps the section available so the new layout is ready when the client approves video assets.",
    sections: [
      {
        kind: "overview",
        heading: "What is on this page for now",
        paragraphs: [
          "A handful of image-based success assets survived the crawl, but no approved standalone video embeds were found.",
          "The page therefore stays as a template-ready shell: the market-specific hero, the explanatory copy and the follow-up links are in place while the client decides which videos can be published.",
        ],
      },
      {
        kind: "cards",
        heading: "Ready for approved videos",
        items: [
          { title: "Video story slot 1", label: "Pending approval", body: "Reserved for the first client-approved story video." },
          { title: "Video story slot 2", label: "Pending approval", body: "Reserved for the second client-approved story video." },
          { title: "Video story slot 3", label: "Pending approval", body: "Reserved for the third client-approved story video." },
        ],
      },
    ],
    relatedPages: ["success-stories", "gallery", "contact"],
    lastVerified: "2026-08-04",
    officialSources: [],
  },
  {
    id: "gallery",
    title: "Gallery",
    eyebrow: "Resources",
    seoTitle: "Gallery | DMC Immigration Group",
    seoDescription:
      "The gallery page for DMC Immigration Group — built around the legacy success-story and gallery archive so the visual library has a home in the new theme.",
    lede:
      "The old site contained a large image archive. The new gallery page keeps that archive visible in a simple card layout so image migration can follow without changing the route again.",
    sections: [
      {
        kind: "cards",
        heading: "Legacy gallery archive",
        items: LEGACY_GALLERY_ITEMS.map((item) => ({
          title: item,
          label: "Legacy image",
          body: "Archive item from the original gallery and success-story library.",
          href: "https://dm-consultant.ae/dm-gallery/",
        })),
      },
    ],
    relatedPages: ["success-stories", "contact"],
    lastVerified: "2026-08-04",
    officialSources: [],
  },
  {
    id: "press-media",
    title: "Press & Media",
    eyebrow: "Resources",
    seoTitle: "Press & Media Mentions | DMC Immigration Group",
    seoDescription:
      "External press and media references connected to DMC Immigration Group, kept in a dedicated page for the new site.",
    lede:
      "The legacy site referenced third-party media and brand-connect items. This page preserves the references that were already identified in the crawl and keeps them easy to verify.",
    sections: [
      {
        kind: "cards",
        heading: "Media references",
        items: [
          {
            title: "Forbes India brand-connect article",
            label: "Press",
            body: "Navigating immigration in the 21st century with DM Immigration Consultants.",
            href: "https://www.forbesindia.com/article/brand-connect/navigating-immigration-in-the-21st-century-with-dm-immigration-consultants/69399/1",
          },
          { title: "Legacy column reference", label: "Media", body: "The crawl recorded an additional external column reference that still needs a confirmed public URL." },
        ],
      },
      {
        kind: "help",
        heading: "Why the page is short",
        paragraphs: [
          "The crawl found references, not a large public press archive. That makes this page intentionally small until the client supplies the full media list and any publication approvals.",
        ],
      },
    ],
    relatedPages: ["about", "blog"],
    lastVerified: "2026-08-04",
    officialSources: [],
  },
  {
    id: "blog",
    title: "Blog",
    eyebrow: "Resources",
    seoTitle: "Immigration Blog | DMC Immigration Group",
    seoDescription:
      "The old-site immigration blog archive, surfaced as a clean index page while the full MDX migration is prepared.",
    lede:
      "The previous site published a large SEO-driven blog archive. This page starts the migration by surfacing a selection of the legacy posts in a cleaner layout while the full article import continues.",
    sections: [
      {
        kind: "cards",
        heading: "Legacy blog archive",
        items: LEGACY_BLOG_POSTS,
      },
    ],
    relatedPages: ["guides", "faqs", "why-dmc"],
    lastVerified: "2026-08-04",
    officialSources: [],
  },
  {
    id: "tools",
    title: "Tools",
    eyebrow: "Tools",
    seoTitle: "Immigration Tools | DMC Immigration Group",
    seoDescription:
      "The DMC tools hub for eligibility checks, country-specific planning and route-linked assessments.",
    lede:
      "The dropdown now points to real tool pages instead of anchors, and this hub gives the tool family a single place to live while the calculators are phased in.",
    sections: [
      {
        kind: "cards",
        heading: "Tool hubs",
        items: [
          {
            title: "General eligibility checker",
            label: "Assessment",
            body: "A structured starting point for route fit, documents and next steps.",
            href: "/tools/eligibility-checker",
          },
          {
            title: "Canada tools",
            label: "Country hub",
            body: "CRS, FSW-67 and PNP planning routes for Canada.",
            href: "/tools/canada",
          },
          {
            title: "Australia tools",
            label: "Country hub",
            body: "Points, occupation and visa planning routes for Australia.",
            href: "/tools/australia",
          },
          {
            title: "Document checklists",
            label: "Guide",
            body: "The practical prep lists that back the tools.",
            href: "/guides/document-checklists",
          },
        ],
      },
    ],
    relatedPages: ["guides/document-checklists", "contact"],
    lastVerified: "2026-08-04",
    officialSources: [],
  },
  {
    id: "tools/eligibility-checker",
    title: "Free Eligibility Checker",
    eyebrow: "Tools",
    seoTitle: "Free Immigration Eligibility Checker | DMC Immigration Group",
    seoDescription:
      "A market-aware eligibility starting point that helps DMC frame the right questions before a consultation.",
    lede:
      "This page replaces the old anchor with a real route. It is a simple assessment hub that points people toward the right program page and the right office for their market.",
    sections: [
      {
        kind: "overview",
        heading: "What this check does",
        paragraphs: [
          "The old site treated eligibility as a first conversation, not a sales form. This page keeps that logic and moves it to a dedicated route.",
          "Use it to understand whether your profile is more likely to fit skilled migration, study, business or visit pathways before you book a consultation.",
        ],
      },
      {
        kind: "cards",
        heading: "What we look at",
        items: [
          { title: "Route fit", label: "First pass", body: "Whether the profile is aligned to skilled, study, visit or business routes." },
          { title: "Document readiness", label: "Evidence", body: "Whether the core evidence set is likely to be available and consistent." },
          { title: "Market context", label: "Local office", body: "Which market office should own the follow-up and the consultation." },
        ],
      },
      {
        kind: "links",
        heading: "Next steps",
        items: [
          { title: "Canada Express Entry", path: "/visas/canada/express-entry", description: "The federal skilled route for Canada." },
          { title: "Australia 189", path: "/visas/australia/skilled-independent-189", description: "The points-tested independent route." },
          { title: "UK Skilled Worker", path: "/visas/uk/skilled-worker", description: "The main UK work route." },
          { title: "Contact", path: "/contact", description: "Choose the market office nearest you." },
        ],
      },
    ],
    relatedPages: ["tools", "contact", "visas/canada/express-entry"],
    lastVerified: "2026-08-04",
    officialSources: [],
  },
  {
    id: "tools/canada",
    title: "Canada Tools",
    eyebrow: "Tools",
    seoTitle: "Canada Immigration Tools | DMC Immigration Group",
    seoDescription:
      "Canada-specific tool hub for CRS, FSW-67 and provincial planning, set up as a route-aware page in the new site.",
    lede:
      "The Canada tool page gathers the Canadian assessments and the route links that clients usually need before a consultation.",
    sections: [
      {
        kind: "cards",
        heading: "Canada assessments",
        items: [
          { title: "CRS calculator", label: "Coming soon", body: "The points calculator will arrive in the next tools phase." },
          { title: "FSW-67 review", label: "Coming soon", body: "A route-fit checker for Federal Skilled Worker profile planning." },
          { title: "PNP matcher", label: "Coming soon", body: "A provincial fit view tied to the current nomination programs." },
        ],
      },
      {
        kind: "links",
        heading: "Useful Canada pages",
        items: [
          { title: "Express Entry", path: "/visas/canada/express-entry", description: "Canada's federal skilled route." },
          { title: "Provincial Nominee Programs", path: "/visas/canada/provincial-nominee-programs", description: "Provincial nomination pathways." },
          { title: "Study permits", path: "/visas/canada/study-permits", description: "Study pathways and SDS history." },
        ],
      },
    ],
    relatedPages: ["tools/eligibility-checker", "visas/canada/express-entry"],
    lastVerified: "2026-08-04",
    officialSources: [],
  },
  {
    id: "tools/australia",
    title: "Australia Tools",
    eyebrow: "Tools",
    seoTitle: "Australia Immigration Tools | DMC Immigration Group",
    seoDescription:
      "Australia-specific tool hub for points, occupation and nomination planning, set up as a route-aware page in the new site.",
    lede:
      "The Australia tools page gathers the migration planning routes that sit behind the 189, 190, 491, 191 and employer-sponsored pathways.",
    sections: [
      {
        kind: "cards",
        heading: "Australia assessments",
        items: [
          { title: "Points calculator", label: "Coming soon", body: "Points-based planning for 189, 190 and 491." },
          { title: "Occupation eligibility", label: "Coming soon", body: "A route-fit view for ANZSCO and skills-assessment planning." },
          { title: "Nomination strategy", label: "Coming soon", body: "State, territory and employer nomination routing." },
        ],
      },
      {
        kind: "links",
        heading: "Useful Australia pages",
        items: [
          { title: "Skilled Independent 189", path: "/visas/australia/skilled-independent-189", description: "Independent skilled migration." },
          { title: "Skilled Nominated 190", path: "/visas/australia/skilled-nominated-190", description: "State or territory nomination." },
          { title: "Skilled Work Regional 491", path: "/visas/australia/skilled-work-regional-491", description: "Regional provisional route." },
        ],
      },
    ],
    relatedPages: ["tools/eligibility-checker", "visas/australia/skilled-independent-189"],
    lastVerified: "2026-08-04",
    officialSources: [],
  },
  {
    id: "visas/canada",
    title: "Canada Visas",
    eyebrow: "Canada skilled immigration",
    seoTitle: "Canada Visa Paths | DMC Immigration Group",
    seoDescription:
      "Canada visa hub for Express Entry, PNP, Atlantic, study permits, family sponsorship and visit routes.",
    lede: "The Canada hub groups the major Canadian routes under one market-aware page so the path is easier to compare before drilling into a single program.",
    sections: [
      {
        kind: "cards",
        heading: "Canada routes",
        items: [
          { title: "Express Entry", body: "Federal skilled route", href: "/visas/canada/express-entry" },
          { title: "Provincial Nominee Programs", body: "Provincial nomination hub", href: "/visas/canada/provincial-nominee-programs" },
          { title: "Atlantic Immigration Program", body: "Employer-led regional route", href: "/visas/canada/atlantic-immigration-program" },
          { title: "RNIP / RCIP", body: "Closed legacy route and its successor context", href: "/visas/canada/rural-and-northern-immigration-pilot" },
          { title: "Study permits", body: "Canada student routes", href: "/visas/canada/study-permits" },
          { title: "Family sponsorship", body: "Parent and grandparent sponsorship", href: "/visas/canada/family-sponsorship-parent-grandparent-program" },
        ],
      },
    ],
    relatedPages: ["visas/canada/express-entry", "visit-visas/canada"],
    lastVerified: "2026-08-04",
    officialSources: [],
  },
  {
    id: "visas/australia",
    title: "Australia Visas",
    eyebrow: "Australia skilled migration",
    seoTitle: "Australia Visa Paths | DMC Immigration Group",
    seoDescription:
      "Australia visa hub for the main skilled routes, employer-sponsored routes and state nomination pages.",
    lede:
      "A simple hub for the Australian routes so the market-specific pages can be compared before moving into a single visa stream.",
    sections: [
      {
        kind: "cards",
        heading: "Australia routes",
        items: [
          { title: "Skilled Independent 189", body: "Independent points-tested route", href: "/visas/australia/skilled-independent-189" },
          { title: "Skilled Nominated 190", body: "State or territory nomination", href: "/visas/australia/skilled-nominated-190" },
          { title: "Skilled Work Regional 491", body: "Regional provisional pathway", href: "/visas/australia/skilled-work-regional-491" },
          { title: "Permanent Residence 191", body: "Regional PR after the provisional route", href: "/visas/australia/permanent-residence-skilled-regional-191" },
          { title: "Employer Sponsored 482", body: "Former TSS, now SID", href: "/visas/australia/employer-sponsored-482" },
          { title: "National Innovation Visa 858", body: "Former Global Talent", href: "/visas/australia/national-innovation-visa-858" },
        ],
      },
    ],
    relatedPages: ["visas/australia/skilled-independent-189", "tools/australia"],
    lastVerified: "2026-08-04",
    officialSources: [],
  },
  {
    id: "visas/uk",
    title: "UK Visas",
    eyebrow: "UK work visas",
    seoTitle: "UK Visa Paths | DMC Immigration Group",
    seoDescription: "UK visa hub for the Skilled Worker and Skilled Worker dependent routes.",
    lede:
      "The UK hub keeps the current routes together and makes the work and family path easy to scan before you move to the detailed page.",
    sections: [
      {
        kind: "cards",
        heading: "UK routes",
        items: [
          { title: "Skilled Worker", body: "Main UK work route", href: "/visas/uk/skilled-worker" },
          { title: "Skilled Worker dependent", body: "Partner and children route", href: "/visas/uk/skilled-worker-dependent" },
          { title: "Student visas", body: "Study route and fee guide", href: "/study-abroad/uk-student-visas" },
        ],
      },
    ],
    relatedPages: ["visas/uk/skilled-worker", "study-abroad/uk-student-visas"],
    lastVerified: "2026-08-04",
    officialSources: [],
  },
  {
    id: "legal/privacy-policy",
    title: "Privacy Policy",
    eyebrow: "Legal",
    seoTitle: "Privacy Policy | DMC Immigration Group",
    seoDescription:
      "Privacy policy for DMC Immigration Group — what information the site collects, how it is used and where it is stored.",
    lede: "A draft-friendly privacy policy page that keeps the structure of the old site while the client reviews the legal copy.",
    sections: [
      {
        kind: "overview",
        heading: "How we use information",
        paragraphs: [
          "We collect information that you submit through the site, phone, email or consultation channels so the relevant market office can respond, assess eligibility and prepare a case file when you choose to proceed.",
          "The data is used only for legitimate client communication, case assessment, service delivery and related legal or regulatory obligations.",
          "Where a service depends on third-party providers or official government systems, only the information needed for that service is shared.",
        ],
      },
      {
        kind: "help",
        heading: "What this page covers",
        paragraphs: LEGAL_HELP,
      },
    ],
    relatedPages: ["legal/terms-and-conditions", "legal/disclaimer"],
    lastVerified: "2026-08-04",
    officialSources: [],
  },
  {
    id: "legal/terms-and-conditions",
    title: "Terms & Conditions",
    eyebrow: "Legal",
    seoTitle: "Terms & Conditions | DMC Immigration Group",
    seoDescription:
      "Terms and conditions for using the DMC Immigration Group website and services.",
    lede: "The site terms page keeps the service boundaries visible: the website is informative, and the final immigration decision always belongs to the authority.",
    sections: [
      {
        kind: "overview",
        heading: "Service boundaries",
        paragraphs: [
          "The website is provided as an information and enquiry platform. It does not replace official government rules, forms or decisions.",
          "Any consultation, document review or case management is subject to the office, market and service agreement that applies to the matter.",
          "The information on the site can change without notice because immigration rules, fees and processing times change regularly.",
        ],
      },
      {
        kind: "help",
        heading: "Why this matters",
        paragraphs: LEGAL_HELP,
      },
    ],
    relatedPages: ["legal/privacy-policy", "legal/disclaimer"],
    lastVerified: "2026-08-04",
    officialSources: [],
  },
  {
    id: "legal/refund-and-cancellation",
    title: "Refund & Cancellation",
    eyebrow: "Legal",
    seoTitle: "Refund & Cancellation Policy | DMC Immigration Group",
    seoDescription:
      "Refund and cancellation policy for DMC Immigration Group.",
    lede:
      "This policy page gives the client-owned service terms a clean home while the final commercial language is reviewed.",
    sections: [
      {
        kind: "overview",
        heading: "Refunds and cancellations",
        paragraphs: [
          "Consultation fees, document review fees and case-management arrangements depend on the market office and the service agreement in place for the matter.",
          "Cancellation and refund outcomes depend on the stage reached, the work already completed and the terms agreed before the service started.",
        ],
      },
      {
        kind: "help",
        heading: "Keep the terms clear",
        paragraphs: LEGAL_HELP,
      },
    ],
    relatedPages: ["legal/privacy-policy", "legal/terms-and-conditions"],
    lastVerified: "2026-08-04",
    officialSources: [],
  },
  {
    id: "legal/anti-fraud",
    title: "Anti-Fraud Notice",
    eyebrow: "Legal",
    seoTitle: "Anti-Fraud Notice | DMC Immigration Group",
    seoDescription:
      "Anti-fraud notice for DMC Immigration Group — how to spot scams, impostors and fake guarantees.",
    lede:
      "The legacy blog warned about scams, fake guarantees and people pretending to offer approvals. This notice keeps that warning visible on a dedicated legal page.",
    sections: [
      {
        kind: "overview",
        heading: "Common warning signs",
        paragraphs: [
          "No consultant can guarantee a visa approval, a job offer, a nomination or a refund in exchange for a payment to an unrelated person.",
          "Be careful with anyone who promises a fast-track outcome without a genuine application trail, asks for unusual payment routes or uses the DMC name without a verified office contact.",
          "Always confirm the office, the phone number and the email address from this site before you send documents or money.",
        ],
      },
      {
        kind: "help",
        heading: "Protect yourself",
        paragraphs: LEGAL_HELP,
      },
    ],
    relatedPages: ["legal/disclaimer", "contact"],
    lastVerified: "2026-08-04",
    officialSources: [],
  },
  {
    id: "legal/disclaimer",
    title: "Disclaimer",
    eyebrow: "Legal",
    seoTitle: "Disclaimer | DMC Immigration Group",
    seoDescription: "Disclaimer for DMC Immigration Group website content.",
    lede:
      "A simple disclaimer page that keeps the final decision and no-guarantee language visible on the live site.",
    sections: [
      {
        kind: "overview",
        heading: "What this site does not promise",
        paragraphs: [
          "The site explains immigration pathways, but it does not guarantee approvals, processing speeds, interview outcomes or settlement success.",
          "All government decisions remain with the relevant authority, and the site should always be read alongside the official rules for the relevant route.",
        ],
      },
      {
        kind: "help",
        heading: "Remember",
        paragraphs: LEGAL_HELP,
      },
    ],
    relatedPages: ["legal/privacy-policy", "legal/anti-fraud"],
    lastVerified: "2026-08-04",
    officialSources: [],
  },
];
