/**
 * Tool registry — the single source of truth for every tool route, its hub
 * grouping, metadata and rendered component. Used by the dedicated tool routes
 * and by the /tools/canada and /tools/australia hub pages.
 */

import { PNP_PROVINCES, RCIP_FACTS } from "@/features/tools/canada-pnp";
import {
  AUSTRALIA_FEES_LAST_VERIFIED,
  AUSTRALIA_FEE_SCHEDULE_URL,
  AUSTRALIA_OCCUPATION_LAST_VERIFIED,
  AUSTRALIA_OCCUPATION_LIST_URL,
  AUSTRALIA_PROCESSING_LAST_VERIFIED,
  AUSTRALIA_PROCESSING_PAGE_URL,
} from "@/features/tools/australia-data";

export type ToolFamily = "canada" | "australia" | "general";

export interface ToolDefinition {
  /** Route path relative to /tools (e.g. "canada/crs-calculator"). */
  path: string;
  family: ToolFamily;
  title: string;
  eyebrow: string;
  lede: string;
  seoTitle: string;
  seoDescription: string;
  sources: { label: string; url: string }[];
  lastVerified: string;
  /** Component key resolved by the route pages. */
  component: string;
}

const CANADA_SOURCES = [
  { label: "Immigration, Refugees and Citizenship Canada", url: "https://www.canada.ca/en/immigration-refugees-citizenship.html" },
  { label: "Express Entry", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html" },
];

const AUSTRALIA_SOURCES = [
  { label: "Department of Home Affairs", url: "https://immi.homeaffairs.gov.au/" },
];

export const TOOL_REGISTRY: ToolDefinition[] = [
  {
    path: "eligibility-checker",
    family: "general",
    title: "Free Eligibility Checker",
    eyebrow: "Free assessment",
    lede: "Answer four quick questions and get a directional read on which immigration route fits your profile — plus the next step to take with a DMC consultant.",
    seoTitle: "Free Immigration Eligibility Checker | DMC Immigration Group",
    seoDescription: "A free four-step eligibility check that points your profile toward the right immigration route — Canada, Australia, UK, study, visit or business.",
    sources: [
      { label: "Immigration, Refugees and Citizenship Canada", url: "https://www.canada.ca/en/immigration-refugees-citizenship.html" },
      { label: "Department of Home Affairs", url: "https://immi.homeaffairs.gov.au/" },
    ],
    lastVerified: "2026-08-05",
    component: "eligibility-checker",
  },
  {
    path: "canada/crs-calculator",
    family: "canada",
    title: "CRS Calculator",
    eyebrow: "Canada tool",
    lede: "Estimate your Comprehensive Ranking System (CRS) score for Express Entry — core factors, spouse factors, skill transferability and additional points.",
    seoTitle: "CRS Calculator — Express Entry Score | DMC Immigration Group",
    seoDescription: "Estimate your Express Entry CRS score with DMC's free calculator — age, education, language, Canadian experience and spouse factors.",
    sources: CANADA_SOURCES,
    lastVerified: "2026-08-05",
    component: "crs",
  },
  {
    path: "canada/clb-calculator",
    family: "canada",
    title: "CLB Calculator",
    eyebrow: "Canada tool",
    lede: "Convert your IELTS, CELPIP or TEF scores into Canadian Language Benchmark (CLB) levels across all four abilities.",
    seoTitle: "CLB Calculator — IELTS / CELPIP / TEF | DMC Immigration Group",
    seoDescription: "Convert IELTS, CELPIP and TEF test scores to Canadian Language Benchmark (CLB) levels with DMC's free CLB calculator.",
    sources: CANADA_SOURCES,
    lastVerified: "2026-08-05",
    component: "clb",
  },
  {
    path: "canada/fsw-67-calculator",
    family: "canada",
    title: "FSW 67-Point Calculator",
    eyebrow: "Canada tool",
    lede: "Check whether you meet the Federal Skilled Worker selection-factor grid — a separate eligibility test from the CRS ranking score.",
    seoTitle: "FSW 67-Point Calculator | DMC Immigration Group",
    seoDescription: "Calculate your Federal Skilled Worker 67-point selection-factor score — age, education, experience, language, arranged employment and adaptability.",
    sources: CANADA_SOURCES,
    lastVerified: "2026-08-05",
    component: "fsw67",
  },
  ...PNP_PROVINCES.map((province) => {
    const path = `canada/${province.slug}-pnp-matcher`;
    const label = province.abbreviation;
    return {
      path,
      family: "canada" as const,
      title: `${label} PNP Stream Matcher`,
      eyebrow: `${province.name} tool`,
      lede: `Answer three questions to see which ${province.name} nomination streams could fit your profile — and which ones need a job offer or an Express Entry profile.`,
      seoTitle: `${label} PNP Stream Matcher | DMC Immigration Group`,
      seoDescription: `Match your profile to active ${province.name} provincial nominee program streams — job-offer, Express Entry and in-province requirements explained.`,
      sources: [
        { label: `${province.abbreviation} official program page`, url: province.officialUrl },
        ...CANADA_SOURCES,
      ],
      lastVerified: province.lastVerified,
      component: `pnp:${province.slug}`,
    } satisfies ToolDefinition;
  }),
  {
    path: "canada/rcip-eligibility",
    family: "canada",
    title: "RCIP Eligibility Checklist",
    eyebrow: "Canada tool",
    lede: `Work through the core Rural Community Immigration Pilot (RCIP) checks — the successor to the closed RNIP — and see how close your profile is.`,
    seoTitle: "RCIP Eligibility Checklist | DMC Immigration Group",
    seoDescription: "Self-assess against the Rural Community Immigration Pilot (RCIP) core checks — community recommendation, job offer, language, education and funds.",
    sources: [
      { label: "RCIP official page", url: RCIP_FACTS.officialUrl },
      ...CANADA_SOURCES,
    ],
    lastVerified: RCIP_FACTS.lastVerified,
    component: "rcip",
  },
  {
    path: "australia/points-calculator",
    family: "australia",
    title: "Australia Points Calculator",
    eyebrow: "Australia tool",
    lede: "Score your profile for the points-tested skilled visas — 189, 190 and 491 — against the 65-point minimum threshold.",
    seoTitle: "Australia Points Calculator — 189 / 190 / 491 | DMC Immigration Group",
    seoDescription: "Calculate your Australia skilled-migration points for visas 189, 190 and 491 — age, English, employment, education and nomination.",
    sources: AUSTRALIA_SOURCES,
    lastVerified: "2026-08-05",
    component: "australia-points",
  },
  {
    path: "australia/visa-fee-estimator",
    family: "australia",
    title: "Australia Visa Fee Estimator",
    eyebrow: "Australia tool",
    lede: "Estimate the base visa application charge for the main Australian skilled and employer-sponsored visas, with an indicative AED conversion.",
    seoTitle: "Australia Visa Fee Estimator | DMC Immigration Group",
    seoDescription: `Estimate base Australian visa application charges (VAC) for subclasses 189, 190, 491, 191, 482, 186 and 858. Last verified ${AUSTRALIA_FEES_LAST_VERIFIED}.`,
    sources: [
      { label: "Official visa pricing schedule", url: AUSTRALIA_FEE_SCHEDULE_URL },
      ...AUSTRALIA_SOURCES,
    ],
    lastVerified: AUSTRALIA_FEES_LAST_VERIFIED,
    component: "australia-fees",
  },
  {
    path: "australia/processing-times",
    family: "australia",
    title: "Australia Processing Times",
    eyebrow: "Australia tool",
    lede: "Look up the indicative global processing-time bands Home Affairs publishes for each skilled visa subclass.",
    seoTitle: "Australia Visa Processing Times | DMC Immigration Group",
    seoDescription: `Indicative Australia visa processing times for subclasses 189, 190, 491, 191, 482, 186 and 858. Last verified ${AUSTRALIA_PROCESSING_LAST_VERIFIED}.`,
    sources: [
      { label: "Official processing-time page", url: AUSTRALIA_PROCESSING_PAGE_URL },
      ...AUSTRALIA_SOURCES,
    ],
    lastVerified: AUSTRALIA_PROCESSING_LAST_VERIFIED,
    component: "australia-processing",
  },
  {
    path: "australia/occupation-eligibility-checker",
    family: "australia",
    title: "Occupation & Eligibility Discovery",
    eyebrow: "Australia tool",
    lede: "Search a sample of common skilled occupations to see the ANZSCO group, skill level and typical skills-assessment authority for your role.",
    seoTitle: "Australia Occupation & Eligibility Checker | DMC Immigration Group",
    seoDescription: `Search common skilled occupations by ANZSCO group, skill level and assessing authority. Last verified ${AUSTRALIA_OCCUPATION_LAST_VERIFIED}.`,
    sources: [
      { label: "Official skilled occupation list", url: AUSTRALIA_OCCUPATION_LIST_URL },
      ...AUSTRALIA_SOURCES,
    ],
    lastVerified: AUSTRALIA_OCCUPATION_LAST_VERIFIED,
    component: "australia-occupations",
  },
];

export function toolByPath(path: string): ToolDefinition | undefined {
  return TOOL_REGISTRY.find((tool) => tool.path === path);
}

export function toolsByFamily(family: ToolFamily): ToolDefinition[] {
  return TOOL_REGISTRY.filter((tool) => tool.family === family);
}

export const TOOL_PATHS = TOOL_REGISTRY.map((tool) => tool.path);
