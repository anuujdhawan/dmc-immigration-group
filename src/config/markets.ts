export const MARKET_SLUGS = ["dubai", "abu-dhabi", "qatar", "kuwait", "india"] as const;

export type Market = (typeof MARKET_SLUGS)[number];

export const DEFAULT_MARKET: Market = "dubai";

export function isMarket(value: string | undefined | null): value is Market {
  return !!value && (MARKET_SLUGS as readonly string[]).includes(value);
}

export function assertMarket(value: string, context = "market"): Market {
  if (!isMarket(value)) throw new Error(`Invalid ${context}: "${value}"`);
  return value;
}

export const MARKET_LABELS: Record<Market, string> = {
  dubai: "Dubai",
  "abu-dhabi": "Abu Dhabi",
  qatar: "Qatar",
  kuwait: "Kuwait",
  india: "India",
};

export const MARKET_COUNTRY_NAMES: Record<Market, string> = {
  dubai: "United Arab Emirates",
  "abu-dhabi": "United Arab Emirates",
  qatar: "Qatar",
  kuwait: "Kuwait",
  india: "India",
};

export const MARKET_OFFICE_CITIES: Record<Market, string> = {
  dubai: "Dubai, UAE",
  "abu-dhabi": "Abu Dhabi, UAE",
  qatar: "Doha, Qatar",
  kuwait: "Kuwait City, Kuwait",
  india: "Hyderabad, India",
};

export const MARKET_COUNTRY_CODES: Record<Market, string> = {
  dubai: "AE",
  "abu-dhabi": "AE",
  qatar: "QA",
  kuwait: "KW",
  india: "IN",
};

/** ITU-T dialing prefixes for each market's country. */
export const MARKET_DIALING_CODES: Record<Market, string> = {
  dubai: "971",
  "abu-dhabi": "971",
  qatar: "974",
  kuwait: "965",
  india: "91",
};

export const MARKET_LEGACY_HOSTS: Record<Market, string> = {
  dubai: "https://dm-consultant.ae",
  "abu-dhabi": "https://dm-consultantabudhabi.com",
  qatar: "https://dm-consultant.qa",
  kuwait: "https://dm-consultantkuwait.com",
  india: "https://dm-consultant.in",
};

export const MARKET_HOSTS: Record<Market, string> = {
  dubai: "dm-consultant.ae",
  "abu-dhabi": "dm-consultantabudhabi.com",
  qatar: "dm-consultant.qa",
  kuwait: "dm-consultantkuwait.com",
  india: "dm-consultant.in",
};

export const GEO_COUNTRY_TO_MARKET: Record<string, Market> = {
  AE: "dubai",
  QA: "qatar",
  KW: "kuwait",
  IN: "india",
};

export const UAE_REGION_TO_MARKET: Record<string, Market> = {
  DU: "dubai",
  AZ: "abu-dhabi",
};

export const DEFAULT_UAE_MARKET: Market = "dubai";

export function marketForGeo(country: string | undefined, region: string | undefined): Market {
  if (country === "AE") return UAE_REGION_TO_MARKET[region ?? ""] ?? DEFAULT_UAE_MARKET;
  const market = GEO_COUNTRY_TO_MARKET[country ?? ""];
  return market ?? DEFAULT_MARKET;
}

export const MARKET_LIST: Market[] = [...MARKET_SLUGS];
