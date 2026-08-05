/**
 * Canada PNP tools — pure data module.
 *
 * Lists the currently active main streams for the eight provinces DMC serves.
 * Stream status changes; each province record carries the official program URL
 * and a last-verified date. The matcher uses only the stable public criteria
 * (Express Entry alignment / job-offer requirement / in-province connection).
 */

export interface PnpStream {
  name: string;
  /** Short plain-language description of the stream. */
  description: string;
  /** Does the stream run through (or align with) the federal Express Entry pool? */
  expressEntry: boolean;
  /** Is a qualifying job offer from that province required? */
  jobOfferRequired: boolean;
  /** Does the stream accept candidates without an in-province connection? */
  openToOutside: boolean;
}

export interface PnpProvince {
  slug: string;
  name: string;
  abbreviation: string;
  officialUrl: string;
  lastVerified: string;
  streams: PnpStream[];
}

export const PNP_PROVINCES: PnpProvince[] = [
  {
    slug: "ontario",
    name: "Ontario",
    abbreviation: "OINP",
    officialUrl: "https://www.ontario.ca/page/ontario-immigrant-nominee-program-oinp",
    lastVerified: "2026-08-05",
    streams: [
      {
        name: "Ontario Workforce Priority Stream",
        description:
          "For skilled foreign workers with a qualifying job offer and work experience, or self-employed physicians. Runs through the OINP Expression of Interest system.",
        expressEntry: false,
        jobOfferRequired: true,
        openToOutside: true,
      },
      {
        name: "Employer Job Offer Streams",
        description:
          "Employer-offer pathways for foreign workers, international students and in-demand occupations — each requires a qualifying job offer from an Ontario employer.",
        expressEntry: false,
        jobOfferRequired: true,
        openToOutside: true,
      },
      {
        name: "Human Capital Priorities (Express Entry)",
        description:
          "Draws candidates from the federal Express Entry pool who meet Ontario's targeted occupations. Requires an active Express Entry profile.",
        expressEntry: true,
        jobOfferRequired: false,
        openToOutside: true,
      },
    ],
  },
  {
    slug: "alberta",
    name: "Alberta",
    abbreviation: "AAIP",
    officialUrl: "https://www.alberta.ca/alberta-advantage-immigration-program",
    lastVerified: "2026-08-05",
    streams: [
      {
        name: "Alberta Opportunity Stream",
        description:
          "For qualified candidates living and working in Alberta with a valid full-time job offer from an Alberta employer.",
        expressEntry: false,
        jobOfferRequired: true,
        openToOutside: false,
      },
      {
        name: "Alberta Express Entry Stream",
        description:
          "Selects candidates from the federal Express Entry pool, including dedicated pathways for tech, health-care and priority occupations.",
        expressEntry: true,
        jobOfferRequired: false,
        openToOutside: true,
      },
      {
        name: "Tourism and Hospitality Stream",
        description:
          "For temporary foreign workers already working full-time in Alberta's tourism and hospitality sector.",
        expressEntry: false,
        jobOfferRequired: true,
        openToOutside: false,
      },
      {
        name: "Rural Renewal Stream",
        description:
          "For candidates recruited by a designated rural Alberta community to address local labour shortages.",
        expressEntry: false,
        jobOfferRequired: true,
        openToOutside: false,
      },
    ],
  },
  {
    slug: "saskatchewan",
    name: "Saskatchewan",
    abbreviation: "SINP",
    officialUrl: "https://www.saskatchewan.ca/residents/moving-to-saskatchewan/live-in-saskatchewan/by-immigrating/saskatchewan-immigrant-nominee-program",
    lastVerified: "2026-08-05",
    streams: [
      {
        name: "International Skilled Worker — Saskatchewan Express Entry",
        description:
          "For skilled professionals already in the federal Express Entry pool who meet SINP points and in-demand requirements.",
        expressEntry: true,
        jobOfferRequired: false,
        openToOutside: true,
      },
      {
        name: "International Skilled Worker — Occupations In-Demand",
        description:
          "For skilled workers with experience in high-demand occupations. A job offer is not required to enter the EOI pool.",
        expressEntry: false,
        jobOfferRequired: false,
        openToOutside: true,
      },
      {
        name: "International Skilled Worker — Employment Offer",
        description:
          "For skilled workers with a permanent, full-time job offer from a Saskatchewan employer.",
        expressEntry: false,
        jobOfferRequired: true,
        openToOutside: true,
      },
    ],
  },
  {
    slug: "british-columbia",
    name: "British Columbia",
    abbreviation: "BC PNP",
    officialUrl: "https://www.welcomebc.ca/immigrate-to-b-c/about-the-bc-provincial-nominee-program",
    lastVerified: "2026-08-05",
    streams: [
      {
        name: "Skilled Worker Stream",
        description:
          "For international workers with professional, management, technical or trade experience and a qualifying B.C. job offer.",
        expressEntry: false,
        jobOfferRequired: true,
        openToOutside: true,
      },
      {
        name: "Express Entry BC — Skilled Worker",
        description:
          "The Express Entry-aligned version of the Skilled Worker stream. Requires Express Entry eligibility plus a B.C. job offer.",
        expressEntry: true,
        jobOfferRequired: true,
        openToOutside: true,
      },
      {
        name: "Health Authority Stream",
        description:
          "For health professionals with experience or offers in eligible health-authority occupations, such as nurses, physicians and allied health staff.",
        expressEntry: false,
        jobOfferRequired: true,
        openToOutside: true,
      },
      {
        name: "International Graduate Stream",
        description:
          "For recent graduates of eligible Canadian post-secondary institutions who hold a qualifying B.C. job offer.",
        expressEntry: false,
        jobOfferRequired: true,
        openToOutside: false,
      },
    ],
  },
  {
    slug: "manitoba",
    name: "Manitoba",
    abbreviation: "MPNP",
    officialUrl: "https://immigratemanitoba.com/",
    lastVerified: "2026-08-05",
    streams: [
      {
        name: "Skilled Worker in Manitoba",
        description:
          "For temporary foreign workers and international graduates currently working in Manitoba with a permanent job offer from a Manitoba employer.",
        expressEntry: false,
        jobOfferRequired: true,
        openToOutside: false,
      },
      {
        name: "Skilled Worker Overseas",
        description:
          "For internationally trained workers with a connection to Manitoba — family, past education or employment, or a targeted provincial invitation.",
        expressEntry: false,
        jobOfferRequired: false,
        openToOutside: true,
      },
      {
        name: "International Education Stream",
        description:
          "For graduates of Manitoba post-secondary institutions, including the Career Employment Pathway.",
        expressEntry: false,
        jobOfferRequired: true,
        openToOutside: false,
      },
    ],
  },
  {
    slug: "nova-scotia",
    name: "Nova Scotia",
    abbreviation: "NSNP",
    officialUrl: "https://novascotiaimmigration.com/",
    lastVerified: "2026-08-05",
    streams: [
      {
        name: "Nova Scotia Nominee Program — Express Entry",
        description:
          "Draws candidates from the federal Express Entry pool based on targeted provincial labour-market needs.",
        expressEntry: true,
        jobOfferRequired: false,
        openToOutside: true,
      },
      {
        name: "Skilled Worker Stream",
        description:
          "For individuals with a permanent, full-time job offer from a Nova Scotia employer.",
        expressEntry: false,
        jobOfferRequired: true,
        openToOutside: true,
      },
      {
        name: "International Graduates in Demand",
        description:
          "For recent graduates of eligible Nova Scotia institutions working in specific in-demand occupations.",
        expressEntry: false,
        jobOfferRequired: true,
        openToOutside: false,
      },
    ],
  },
  {
    slug: "new-brunswick",
    name: "New Brunswick",
    abbreviation: "NBPNP",
    officialUrl: "https://www2.gnb.ca/content/gnb/en/corporate/promo/immigration/immigrating-to-nb/nb-immigration-program-streams.html",
    lastVerified: "2026-08-05",
    streams: [
      {
        name: "New Brunswick Express Entry Stream",
        description:
          "For skilled workers in the federal Express Entry pool with a demonstrated connection to New Brunswick, such as employment or regional alignment.",
        expressEntry: true,
        jobOfferRequired: false,
        openToOutside: true,
      },
      {
        name: "New Brunswick Skilled Worker Stream",
        description:
          "For foreign nationals with a valid job offer from a New Brunswick employer.",
        expressEntry: false,
        jobOfferRequired: true,
        openToOutside: true,
      },
    ],
  },
  {
    slug: "newfoundland-labrador",
    name: "Newfoundland and Labrador",
    abbreviation: "NLPNP",
    officialUrl: "https://www.gov.nl.ca/immigration/immigrating-to-newfoundland-and-labrador/provincial-nominee-program/overview/",
    lastVerified: "2026-08-05",
    streams: [
      {
        name: "NLPNP Skilled Worker Category",
        description:
          "For international workers with a full-time job offer or work contract from a Newfoundland and Labrador employer.",
        expressEntry: false,
        jobOfferRequired: true,
        openToOutside: true,
      },
      {
        name: "NLPNP Express Entry Skilled Worker",
        description:
          "For skilled workers accepted into the federal Express Entry pool who hold a valid job offer in the province.",
        expressEntry: true,
        jobOfferRequired: true,
        openToOutside: true,
      },
      {
        name: "NLPNP International Graduate Category",
        description:
          "For recent graduates of Memorial University or the College of the North Atlantic with a related job offer or qualifying post-graduation employment.",
        expressEntry: false,
        jobOfferRequired: true,
        openToOutside: false,
      },
    ],
  },
];

/** RCIP — Rural Community Immigration Pilot eligibility essentials. */
export const RCIP_FACTS = {
  successorTo: "RNIP",
  lastVerified: "2026-08-05",
  officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/rural-community-immigration-pilot.html",
  keyChecks: [
    {
      label: "Community recommendation",
      description:
        "You must be recommended by an economic development organisation in a participating rural community.",
    },
    {
      label: "Work experience",
      description:
        "Qualifying work experience of at least one year in the last three years, or a completed post-secondary credential from a recognized institution.",
    },
    {
      label: "Job offer",
      description:
        "A genuine, full-time, non-seasonal job offer from an employer in the participating community.",
    },
    {
      label: "Language",
      description:
        "Minimum official-language level of CLB 4 or higher depending on your NOC skill level.",
    },
    {
      label: "Education",
      description:
        "A Canadian high-school credential or equivalent foreign credential (ECA) if educated outside Canada.",
    },
    {
      label: "Settlement funds",
      description:
        "Proof of funds to support your settlement, unless you are already working in Canada with a valid work permit.",
    },
    {
      label: "Intent to reside",
      description:
        "A genuine intention to live in the community that recommends you.",
    },
  ],
} as const;

export interface PnpMatchResult {
  stream: PnpStream;
  /** Why this stream fits the given profile. */
  fit: string;
}

/**
 * Pure matcher — returns the streams that fit a given profile.
 * `inProvince` = currently living/working/studying in the province.
 * `jobOffer` = has a qualifying job offer in the province.
 * `expressEntry` = has an active federal Express Entry profile.
 */
export function matchPnpStreams(
  province: PnpProvince,
  profile: { inProvince: boolean; jobOffer: boolean; expressEntry: boolean },
): PnpMatchResult[] {
  const reasons: PnpMatchResult[] = [];
  for (const stream of province.streams) {
    if (stream.jobOfferRequired && !profile.jobOffer) continue;
    if (stream.expressEntry && !profile.expressEntry) continue;
    if (!stream.openToOutside && !profile.inProvince) continue;
    const fit = [
      stream.jobOfferRequired ? "requires a qualifying job offer (you have one)" : "no job offer needed",
      stream.expressEntry ? "Express Entry–aligned (you have a profile)" : "runs through the provincial system",
      stream.openToOutside || profile.inProvince ? "open to your profile" : "needs an in-province connection",
    ].join(" · ");
    reasons.push({ stream, fit });
  }
  return reasons;
}
