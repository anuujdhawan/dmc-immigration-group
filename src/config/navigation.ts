import type { Market } from "@/config/markets";

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavColumn {
  heading: string;
  links: NavLink[];
}

export interface PrimaryNavItem {
  label: string;
  href?: string;
  columns?: NavColumn[];
}

export const NAV_PRIMARY: PrimaryNavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Visas",
    columns: [
      {
        heading: "Canada",
        links: [
          { label: "Express Entry (FSW / CEC / FST)", href: "/visas/canada/express-entry" },
          { label: "Provincial Nominee Programs", href: "/visas/canada/provincial-nominee-programs" },
          { label: "Atlantic Immigration Program", href: "/visas/canada/atlantic-immigration-program" },
          { label: "Rural & Northern Pilot (RNIP)", href: "/visas/canada/rural-and-northern-immigration-pilot" },
          { label: "Study Permits (SDS / NCLEX)", href: "/visas/canada/study-permits" },
          { label: "Family Sponsorship & PGP", href: "/visas/canada/family-sponsorship-parent-grandparent-program" },
          { label: "Visit Visa / Super Visa", href: "/visit-visas/canada" },
          { label: "CRS / Points Calculator →", href: "#tools" },
        ],
      },
      {
        heading: "Australia",
        links: [
          { label: "Skilled Independent (189)", href: "/visas/australia/skilled-independent-189" },
          { label: "Skilled Nominated (190)", href: "/visas/australia/skilled-nominated-190" },
          { label: "Regional Provisional (491)", href: "/visas/australia/skilled-work-regional-491" },
          { label: "Permanent Residence (191)", href: "/visas/australia/permanent-residence-skilled-regional-191" },
          { label: "Employer Sponsored (482/TSS)", href: "/visas/australia/employer-sponsored-482" },
          { label: "Employer Nominated (186/ENS)", href: "/visas/australia/employer-nomination-scheme-186" },
          { label: "Global Talent Visa (858)", href: "/visas/australia/national-innovation-visa-858" },
          { label: "State & Territory Nominations", href: "/visas/australia/state-territory-nominations" },
          { label: "ANZSCO Occupation Finder", href: "#tools" },
          { label: "Points Calculator →", href: "#tools" },
        ],
      },
      {
        heading: "United Kingdom",
        links: [
          { label: "Skilled Worker Visa", href: "/visas/uk/skilled-worker" },
          { label: "Skilled Worker Dependent Visa", href: "/visas/uk/skilled-worker-dependent" },
        ],
      },
      {
        heading: "Visit Visas — Other Destinations",
        links: [
          { label: "Canada · USA · Australia", href: "/visit-visas/canada-usa-australia" },
          { label: "UK · New Zealand", href: "/visit-visas/uk-new-zealand" },
          { label: "China · Japan · Turkey", href: "/visit-visas/china-japan-turkey" },
          { label: "South Korea · Greece · Thailand", href: "/visit-visas/south-korea-greece-thailand" },
          { label: "Singapore · Saudi Arabia · UAE", href: "/visit-visas/singapore-saudi-arabia-uae" },
          { label: "South Africa · Cyprus · Netherlands", href: "/visit-visas/south-africa-cyprus-netherlands" },
          { label: "+ more destinations →", href: "/visit-visas" },
        ],
      },
    ],
  },
  {
    label: "Services",
    columns: [
      {
        heading: "Business & Investment",
        links: [
          { label: "Golden Visa — UAE", href: "/business-investment/golden-visa-uae" },
          { label: "Residency — Canada · UK · USA", href: "/business-investment/residency" },
          { label: "Citizenship — St. Kitts · Vanuatu", href: "/business-investment/citizenship" },
          { label: "Start-Up / Entrepreneur Visas", href: "/business-investment/startup-entrepreneur-visas" },
        ],
      },
      {
        heading: "Study Abroad",
        links: [
          { label: "Canada Student Visas", href: "/study-abroad/canada-student-visas" },
          { label: "Australia Student Visas", href: "/study-abroad/australia-student-visas" },
          { label: "UK & USA Student Visas", href: "/study-abroad/uk-usa-student-visas" },
          { label: "IELTS Coaching (in-house)", href: "/study-abroad/ielts-coaching" },
        ],
      },
      {
        heading: "More Services",
        links: [
          { label: "Resume Marketing Services", href: "/services/resume-marketing" },
          { label: "Global Visit Visas", href: "/visit-visas" },
          { label: "Why DMC", href: "#why-dmc" },
        ],
      },
    ],
  },
  {
    label: "Resources",
    columns: [
      {
        heading: "Resources",
        links: [
          { label: "Blog / Immigration News", href: "/blog" },
          { label: "FAQs", href: "/faqs" },
          { label: "Guides & Checklists", href: "/guides" },
          { label: "Success Stories / Testimonials", href: "/success-stories" },
          { label: "Video Success Stories", href: "/video-success-stories" },
          { label: "Gallery", href: "/gallery" },
          { label: "Press & Media Mentions", href: "/press-media" },
        ],
      },
    ],
  },
  {
    label: "Tools",
    columns: [
      {
        heading: "Tools & Free Assessment",
        links: [
          { label: "General Eligibility Quiz", href: "/tools/eligibility-checker" },
          { label: "Canada: CRS / FSW-67 / PNP Matcher", href: "/tools/canada" },
          { label: "Australia: Points / Visa Finder / ANZSCO", href: "/tools/australia" },
          { label: "Document Checklists & Guides", href: "/guides/document-checklists" },
          { label: "Call Me Back / Free Counselling", href: "/contact" },
        ],
      },
    ],
  },
];

export interface NavFooterColumn {
  heading: string;
  links: NavLink[];
}

export const NAV_FOOTER: NavFooterColumn[] = [
  {
    heading: "Immigration",
    links: [
      { label: "Canada Visas", href: "/visas/canada/express-entry" },
      { label: "Australia Visas", href: "/visas/australia/skilled-independent-189" },
      { label: "UK Skilled Worker", href: "/visas/uk/skilled-worker" },
      { label: "Visit Visas", href: "/visit-visas" },
      { label: "Golden Visa — UAE", href: "/business-investment/golden-visa-uae" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Study Abroad", href: "/study-abroad/canada-student-visas" },
      { label: "Business & Investment", href: "/business-investment/residency" },
      { label: "IELTS Coaching", href: "/study-abroad/ielts-coaching" },
      { label: "Resume Marketing", href: "/services/resume-marketing" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Guides & Checklists", href: "/guides" },
      { label: "FAQs", href: "/faqs" },
      { label: "Success Stories", href: "/success-stories" },
      { label: "Video Success Stories", href: "/video-success-stories" },
      { label: "Gallery", href: "/gallery" },
      { label: "Press & Media", href: "/press-media" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Why DMC", href: "/why-dmc" },
      { label: "Credentials", href: "/credentials" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const NAV_LEGAL: NavLink[] = [
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Terms of Use", href: "/legal/terms-and-conditions" },
  { label: "Refund Policy", href: "/legal/refund-and-cancellation" },
  { label: "Cookie Policy", href: "/legal/privacy-policy" },
  { label: "Anti-Fraud Notice", href: "/legal/anti-fraud" },
  { label: "Disclaimer", href: "/legal/disclaimer" },
];

export const NAV_TOOLS: NavLink[] = [
  { label: "General Eligibility Quiz", href: "/tools/eligibility-checker" },
  { label: "Canada: CRS / FSW-67 / PNP Matcher", href: "/tools/canada" },
  { label: "Australia: Points / Visa Finder / ANZSCO", href: "/tools/australia" },
  { label: "Document Checklists & Guides", href: "/guides/document-checklists" },
  { label: "Call Me Back / Free Counselling", href: "/contact" },
];

export function allNavPaths(): string[] {
  const paths = new Set<string>();
  for (const item of NAV_PRIMARY) {
    if (item.href && item.href.startsWith("/")) paths.add(item.href);
    for (const column of item.columns ?? []) {
      for (const link of column.links) paths.add(link.href);
    }
  }
  for (const column of NAV_FOOTER) {
    for (const link of column.links) paths.add(link.href);
  }
  for (const link of NAV_LEGAL) paths.add(link.href);
  for (const link of NAV_TOOLS) paths.add(link.href);
  return [...paths].filter((path) => path.startsWith("/"));
}

export function marketHrefForNav(market: Market, path: string): string {
  return path === "/" ? `/${market}` : `/${market}${path}`;
}
