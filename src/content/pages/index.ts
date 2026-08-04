import type { Market } from "@/config/markets";
import type { PageContent } from "@/content/pages/types";

import { CANADA_PAGES } from "@/content/pages/canada";
import { AUSTRALIA_PAGES } from "@/content/pages/australia";
import { UK_PAGES } from "@/content/pages/uk";
import { VISIT_VISA_PAGES } from "@/content/pages/visit-visas";
import { BUSINESS_INVESTMENT_PAGES } from "@/content/pages/business-investment";
import { STUDY_ABROAD_PAGES } from "@/content/pages/study-abroad";
import { SERVICE_PAGES } from "@/content/pages/services";
import { RESOURCE_PAGES } from "@/content/pages/resources";
import { SITE_PAGES } from "@/content/pages/site";

const ALL_PAGES: PageContent[] = [
  ...CANADA_PAGES,
  ...AUSTRALIA_PAGES,
  ...UK_PAGES,
  ...VISIT_VISA_PAGES,
  ...BUSINESS_INVESTMENT_PAGES,
  ...STUDY_ABROAD_PAGES,
  ...SERVICE_PAGES,
  ...RESOURCE_PAGES,
  ...SITE_PAGES,
];

export const PAGE_REGISTRY: Record<string, PageContent> = Object.fromEntries(
  ALL_PAGES.map((page) => [page.id, page]),
);

export const PAGE_IDS: string[] = ALL_PAGES.map((page) => page.id);

export function getPageContent(id: string): PageContent | null {
  return PAGE_REGISTRY[id] ?? null;
}

const SEGMENT_LABELS: Record<string, string> = {
  visas: "Visas",
  canada: "Canada",
  australia: "Australia",
  uk: "United Kingdom",
  "express-entry": "Express Entry",
  "provincial-nominee-programs": "Provincial Nominee Programs",
  "atlantic-immigration-program": "Atlantic Immigration Program",
  "rural-and-northern-immigration-pilot": "Rural & Northern Immigration Pilot",
  "study-permits": "Study Permits",
  "family-sponsorship-parent-grandparent-program": "Parent & Grandparent Sponsorship",
  "visit-visas": "Visit Visas",
  "visit-visa": "Visit Visas",
  "skilled-independent-189": "Skilled Independent Visa (189)",
  "skilled-nominated-190": "Skilled Nominated Visa (190)",
  "skilled-work-regional-491": "Skilled Work Regional (491)",
  "permanent-residence-skilled-regional-191": "PR Skilled Regional (191)",
  "employer-sponsored-482": "Employer Sponsored (482)",
  "employer-nomination-scheme-186": "Employer Nomination Scheme (186)",
  "national-innovation-visa-858": "National Innovation Visa (858)",
  "state-territory-nominations": "State & Territory Nominations",
  "skilled-worker": "Skilled Worker",
  "skilled-worker-dependent": "Skilled Worker Dependent",
  "business-investment": "Business & Investment",
  "golden-visa-uae": "UAE Golden Visa",
  residency: "Residency by Investment",
  citizenship: "Citizenship by Investment",
  "st-kitts-and-nevis": "St Kitts & Nevis",
  vanuatu: "Vanuatu",
  "startup-entrepreneur-visas": "Startup & Entrepreneur Visas",
  "study-abroad": "Study Abroad",
  "canada-student-visas": "Canada Student Visas",
  "australia-student-visas": "Australia Student Visas",
  "uk-usa-student-visas": "UK & USA Student Visas",
  "uk-student-visas": "UK Student Visas",
  "usa-student-visas": "USA Student Visas",
  "ielts-coaching": "IELTS Coaching",
  services: "Services",
  "resume-marketing": "Resume Marketing",
  "why-dmc": "Why DMC",
  tools: "Tools",
  "eligibility-checker": "Eligibility Checker",
  guides: "Guides",
  "document-checklists": "Document Checklists",
  faqs: "FAQs",
  blog: "Blog",
  "success-stories": "Success Stories",
  "video-success-stories": "Video Success Stories",
  gallery: "Gallery",
  "press-media": "Press & Media",
  credentials: "Credentials",
  about: "About DMC",
  contact: "Contact",
};

export interface Breadcrumb {
  label: string;
  path: string;
}

/** Breadcrumbs for a content route id, e.g. "visas/canada/express-entry". */
export function breadcrumbsFor(id: string): Breadcrumb[] {
  const segments = id.split("/");
  const crumbs: Breadcrumb[] = [];
  let acc = "";
  for (const segment of segments.slice(0, -1)) {
    acc = acc ? `${acc}/${segment}` : `/${segment}`;
    crumbs.push({ label: SEGMENT_LABELS[segment] ?? segment.replace(/-/g, " "), path: acc });
  }
  return crumbs;
}

export function pageTitleForMarket(page: PageContent, market: Market): string {
  return `${page.title} | DMC Immigration Group ${marketLabelForSeo(market)}`;
}

export function marketLabelForSeo(market: Market): string {
  const map: Record<Market, string> = {
    dubai: "Dubai",
    "abu-dhabi": "Abu Dhabi",
    qatar: "Qatar",
    kuwait: "Kuwait",
    india: "India",
  };
  return map[market];
}
