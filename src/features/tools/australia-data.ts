/**
 * Australia tools — pure data module.
 *
 * Figures are the base Visa Application Charge (VAC) for the main applicant and
 * indicative processing-time bands published by the Department of Home Affairs.
 * Fees were updated on 1 July 2026. Always verify before applying — the
 * official fee schedule is linked per visa.
 */

export interface AustraliaVisaFee {
  code: string;
  name: string;
  /** Base VAC for the main applicant, AUD. */
  baseFeeAud: number;
  /** Second-instalment / training levy note when applicable. */
  notes?: string;
  /** Official fee-schedule or program page. */
  sourceUrl: string;
}

export const AUSTRALIA_VISA_FEES: AustraliaVisaFee[] = [
  {
    code: "189",
    name: "Skilled Independent",
    baseFeeAud: 6135,
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-independent-189",
  },
  {
    code: "190",
    name: "Skilled Nominated",
    baseFeeAud: 6140,
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-nominated-190",
  },
  {
    code: "491",
    name: "Skilled Work Regional (Provisional)",
    baseFeeAud: 6140,
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-work-regional-provisional-491",
  },
  {
    code: "191",
    name: "Permanent Residence (Skilled Regional)",
    baseFeeAud: 630,
    notes: "Base fee for the regional-provisional stream. The Hong Kong stream is priced with the standard skilled permanent visas.",
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/permanent-residence-skilled-regional-191",
  },
  {
    code: "482",
    name: "Skills in Demand (formerly TSS 482)",
    baseFeeAud: 4015,
    notes: "Base fee for the core skills stream. Health-insurance and levy charges may also apply.",
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/temporary-skill-shortage-482",
  },
  {
    code: "186",
    name: "Employer Nomination Scheme",
    baseFeeAud: 6140,
    notes: "Base fee for the direct-entry stream. A nomination and training-levy charge may also apply.",
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/employer-nomination-scheme-186",
  },
  {
    code: "858",
    name: "National Innovation Visa",
    baseFeeAud: 6235,
    notes: "Base fee. Formerly the Global Talent visa.",
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/national-innovation-visa-858",
  },
];

export const AUSTRALIA_FEES_LAST_VERIFIED = "2026-08-05";
export const AUSTRALIA_FEE_SCHEDULE_URL =
  "https://immi.homeaffairs.gov.au/help-support/departmental-forms/online-forms/visa-pricing";

export interface ProcessingBand {
  label: string;
  range: string;
}

export interface AustraliaVisaProcessing {
  code: string;
  name: string;
  bands: ProcessingBand[];
  sourceUrl: string;
}

/**
 * Indicative global processing-time bands. Home Affairs publishes these as
 * "50% of applications" and "90% of applications" completed within the range,
 * updated regularly. Always check the official processing-time page before
 * relying on them.
 */
export const AUSTRALIA_PROCESSING_TIMES: AustraliaVisaProcessing[] = [
  {
    code: "189",
    name: "Skilled Independent",
    bands: [
      { label: "50% of applications", range: "3–4 months" },
      { label: "90% of applications", range: "12–14 months" },
    ],
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-processing-times",
  },
  {
    code: "190",
    name: "Skilled Nominated",
    bands: [
      { label: "50% of applications", range: "3–4 months" },
      { label: "90% of applications", range: "12–14 months" },
    ],
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-processing-times",
  },
  {
    code: "491",
    name: "Skilled Work Regional (Provisional)",
    bands: [
      { label: "50% of applications", range: "3–5 months" },
      { label: "90% of applications", range: "13–17 months" },
    ],
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-processing-times",
  },
  {
    code: "191",
    name: "Permanent Residence (Skilled Regional)",
    bands: [
      { label: "50% of applications", range: "3–4 months" },
      { label: "90% of applications", range: "12–14 months" },
    ],
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-processing-times",
  },
  {
    code: "482",
    name: "Skills in Demand (formerly TSS)",
    bands: [
      { label: "50% of applications", range: "18–40 days" },
      { label: "90% of applications", range: "2–5 months" },
    ],
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-processing-times",
  },
  {
    code: "186",
    name: "Employer Nomination Scheme",
    bands: [
      { label: "50% of applications", range: "5–7 months" },
      { label: "90% of applications", range: "10–18 months" },
    ],
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-processing-times",
  },
  {
    code: "858",
    name: "National Innovation Visa",
    bands: [
      { label: "50% of applications", range: "8–11 months" },
      { label: "90% of applications", range: "18–22 months" },
    ],
    sourceUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-processing-times",
  },
];

export const AUSTRALIA_PROCESSING_LAST_VERIFIED = "2026-08-05";
export const AUSTRALIA_PROCESSING_PAGE_URL =
  "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-processing-times";

/** Curated sample of common skilled occupations for orientation/discovery. */
export interface SampleOccupation {
  title: string;
  anzscoGroup: string;
  skillLevel: 1 | 2 | 3;
  /** Typical skills-assessment authority (orientation only). */
  assessingAuthority: string;
}

export const SAMPLE_SKILLED_OCCUPATIONS: SampleOccupation[] = [
  { title: "Software Engineer", anzscoGroup: "2613", skillLevel: 1, assessingAuthority: "ACS" },
  { title: "ICT Business Analyst", anzscoGroup: "2611", skillLevel: 1, assessingAuthority: "ACS" },
  { title: "Systems Analyst", anzscoGroup: "2611", skillLevel: 1, assessingAuthority: "ACS" },
  { title: "Project Manager (ICT)", anzscoGroup: "2611", skillLevel: 1, assessingAuthority: "ACS" },
  { title: "Civil Engineer", anzscoGroup: "2332", skillLevel: 1, assessingAuthority: "Engineers Australia" },
  { title: "Electrical Engineer", anzscoGroup: "2333", skillLevel: 1, assessingAuthority: "Engineers Australia" },
  { title: "Mechanical Engineer", anzscoGroup: "2335", skillLevel: 1, assessingAuthority: "Engineers Australia" },
  { title: "Registered Nurse (Aged Care)", anzscoGroup: "2544", skillLevel: 1, assessingAuthority: "ANMAC" },
  { title: "Registered Nurse (Medical)", anzscoGroup: "2544", skillLevel: 1, assessingAuthority: "ANMAC" },
  { title: "Registered Nurse (Critical Care)", anzscoGroup: "2544", skillLevel: 1, assessingAuthority: "ANMAC" },
  { title: "General Practitioner", anzscoGroup: "2531", skillLevel: 1, assessingAuthority: "AMC" },
  { title: "Accountant (General)", anzscoGroup: "2211", skillLevel: 1, assessingAuthority: "CPAA/IPA/CAANZ" },
  { title: "Management Accountant", anzscoGroup: "2211", skillLevel: 1, assessingAuthority: "CPAA/IPA/CAANZ" },
  { title: "External Auditor", anzscoGroup: "2212", skillLevel: 1, assessingAuthority: "CPAA/IPA/CAANZ" },
  { title: "Chef", anzscoGroup: "3513", skillLevel: 2, assessingAuthority: "VETASSESS" },
  { title: "Cooks", anzscoGroup: "3514", skillLevel: 3, assessingAuthority: "VETASSESS" },
  { title: "Early Childhood (Pre-primary School) Teacher", anzscoGroup: "2411", skillLevel: 1, assessingAuthority: "AITSL" },
  { title: "Secondary School Teacher", anzscoGroup: "2414", skillLevel: 1, assessingAuthority: "AITSL" },
  { title: "Carpenter and Joiner", anzscoGroup: "3312", skillLevel: 3, assessingAuthority: "TRA" },
  { title: "Electrician (General)", anzscoGroup: "3411", skillLevel: 3, assessingAuthority: "TRA" },
  { title: "Plumber (General)", anzscoGroup: "3341", skillLevel: 3, assessingAuthority: "TRA" },
  { title: "Motor Mechanic (General)", anzscoGroup: "3212", skillLevel: 3, assessingAuthority: "TRA" },
  { title: "Welder (First Class)", anzscoGroup: "3223", skillLevel: 3, assessingAuthority: "TRA" },
  { title: "Construction Project Manager", anzscoGroup: "1331", skillLevel: 1, assessingAuthority: "VETASSESS" },
  { title: "Marketing Specialist", anzscoGroup: "2251", skillLevel: 1, assessingAuthority: "VETASSESS" },
  { title: "Human Resource Adviser", anzscoGroup: "2231", skillLevel: 1, assessingAuthority: "VETASSESS" },
  { title: "Financial Investment Adviser", anzscoGroup: "2223", skillLevel: 1, assessingAuthority: "VETASSESS" },
  { title: "Graphic Designer", anzscoGroup: "2324", skillLevel: 1, assessingAuthority: "VETASSESS" },
  { title: "Web Developer", anzscoGroup: "2612", skillLevel: 1, assessingAuthority: "ACS" },
  { title: "Quantity Surveyor", anzscoGroup: "2332", skillLevel: 1, assessingAuthority: "AIQS" },
];

export const AUSTRALIA_OCCUPATION_LAST_VERIFIED = "2026-08-05";
export const AUSTRALIA_OCCUPATION_LIST_URL =
  "https://immi.homeaffairs.gov.au/visas/working-in-australia/skill-occupation-list";
