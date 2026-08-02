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
          { label: "Express Entry", href: "/visas/canada/express-entry", description: "Federal skilled economic immigration" },
          { label: "Provincial Nominee Programs", href: "/visas/canada/provincial-nominee-programs" },
          { label: "Atlantic Immigration Program", href: "/visas/canada/atlantic-immigration-program" },
          { label: "Study Permits (SDS / NCLEX)", href: "/visas/canada/study-permits" },
          { label: "Family Sponsorship & PGP", href: "/visas/canada/family-sponsorship-parent-grandparent-program" },
          { label: "Visit Visa / Super Visa", href: "/visit-visas/canada" },
          { label: "CRS Calculator", href: "/tools/canada/crs-calculator" },
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
          { label: "National Innovation Visa (858)", href: "/visas/australia/national-innovation-visa-858" },
          { label: "Points Calculator", href: "/tools/australia/points-calculator" },
        ],
      },
      {
        heading: "Other Destinations",
        links: [
          { label: "Skilled Worker Visa", href: "/visas/uk/skilled-worker" },
          { label: "Skilled Worker Dependent Visa", href: "/visas/uk/skilled-worker-dependent" },
          { label: "United States", href: "/visit-visas/usa" },
          { label: "New Zealand", href: "/visit-visas/new-zealand" },
          { label: "Global Visit Visas", href: "/visit-visas", description: "More destinations" },
        ],
      },
      {
        heading: "Services & Tools",
        links: [
          { label: "Free Eligibility Checker", href: "/tools/eligibility-checker" },
          { label: "All Calculators & Tools", href: "/tools" },
          { label: "Study Abroad", href: "/study-abroad/canada-student-visas" },
          { label: "Business & Investment", href: "/business-investment/golden-visa-uae" },
          { label: "IELTS Coaching", href: "/study-abroad/ielts-coaching" },
          { label: "Resume Marketing Services", href: "/services/resume-marketing" },
        ],
      },
    ],
  },
  { label: "Express Entry", href: "/express-entry" },
  { label: "Services", href: "/why-dmc" },
  {
    label: "Resources",
    columns: [
      {
        heading: "Learn",
        links: [
          { label: "Blog / Immigration News", href: "/blog" },
          { label: "Guides & Checklists", href: "/guides" },
          { label: "FAQs", href: "/faqs" },
        ],
      },
      {
        heading: "Proof of Work",
        links: [
          { label: "Success Stories", href: "/success-stories" },
          { label: "Video Success Stories", href: "/video-success-stories" },
          { label: "Gallery", href: "/gallery" },
          { label: "Press & Media Mentions", href: "/press-media" },
        ],
      },
      {
        heading: "About",
        links: [
          { label: "Why DMC", href: "/why-dmc" },
          { label: "Our Credentials", href: "/credentials" },
          { label: "Our Process", href: "/why-dmc#process" },
        ],
      },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
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
  { label: "Terms of Use", href: "/legal/terms-of-use" },
  { label: "Cookie Policy", href: "/legal/cookie-policy" },
  { label: "Anti-Fraud Notice", href: "/legal/anti-fraud" },
  { label: "Disclaimer", href: "/legal/disclaimer" },
];

export const NAV_TOOLS: NavLink[] = [
  { label: "Free Eligibility Checker", href: "/tools/eligibility-checker" },
  { label: "CRS Calculator", href: "/tools/canada/crs-calculator" },
  { label: "Australia Points Calculator", href: "/tools/australia/points-calculator" },
  { label: "Occupation Checker", href: "/tools/australia/occupation-eligibility-checker" },
];

export function allNavPaths(): string[] {
  const paths = new Set<string>();
  for (const item of NAV_PRIMARY) {
    if (item.href) paths.add(item.href);
    for (const column of item.columns ?? []) {
      for (const link of column.links) paths.add(link.href);
    }
  }
  for (const column of NAV_FOOTER) {
    for (const link of column.links) paths.add(link.href);
  }
  for (const link of NAV_LEGAL) paths.add(link.href);
  for (const link of NAV_TOOLS) paths.add(link.href);
  return [...paths];
}

export function marketHrefForNav(market: Market, path: string): string {
  return path === "/" ? `/${market}` : `/${market}${path}`;
}
