import {
  MARKET_APPLICANT_TERMS,
  MARKET_CURRENCIES,
  MARKET_LABELS,
  MARKET_OFFICE_CITIES,
  type Market,
} from "@/config/markets";

/**
 * Market-aware copy helpers.
 *
 * Every phrase resolves the current market (picked up from the URL route) so
 * that page content visibly addresses the audience it serves — e.g. the
 * "Dubai" market or "Abu Dhabi" market — without duplicating destination
 * facts across the five market variants.
 */

export function marketName(market: Market): string {
  return MARKET_LABELS[market];
}

/** "in Dubai", "in Abu Dhabi", "in Qatar" … */
export function marketIn(market: Market): string {
  return `in ${MARKET_LABELS[market]}`;
}

/** "from Dubai", "from Abu Dhabi", "from Qatar" … */
export function marketFrom(market: Market): string {
  return `from ${MARKET_LABELS[market]}`;
}

/** "for residents in Dubai", "for residents in Abu Dhabi" … */
export function marketFor(market: Market): string {
  return `for residents in ${MARKET_LABELS[market]}`;
}

/** "clients in the Dubai market", "clients in the Abu Dhabi market" … */
export function marketAudience(market: Market): string {
  return `clients in the ${MARKET_LABELS[market]} market`;
}

/** "our Dubai office", "our Abu Dhabi office" … */
export function marketOffice(market: Market): string {
  return `our ${MARKET_LABELS[market]} office`;
}

/** "UAE residents", "Indian applicants", "Kuwait residents" … */
export function applicantTerm(market: Market): string {
  return MARKET_APPLICANT_TERMS[market];
}

/** "AED", "INR", "KWD" … — the ISO code quoted for local fees. */
export function marketCurrency(market: Market): string {
  return MARKET_CURRENCIES[market].code;
}

const TOKENS: Array<{ token: string; resolve: (market: Market) => string }> = [
  { token: "{marketOffice}", resolve: marketOffice },
  { token: "{marketAudience}", resolve: marketAudience },
  { token: "{applicantTerm}", resolve: applicantTerm },
  { token: "{marketFor}", resolve: marketFor },
  { token: "{marketIn}", resolve: marketIn },
  { token: "{marketFrom}", resolve: marketFrom },
  { token: "{currency}", resolve: marketCurrency },
  { token: "{market}", resolve: marketName },
];

/**
 * Replace market tokens inside a content string:
 * `{market}` → "Dubai", `{marketIn}` → "in Dubai", `{marketFrom}` → "from Dubai",
 * `{marketFor}` → "for residents in Dubai", `{marketAudience}` → "clients in the
 * Dubai market", `{marketOffice}` → "our Dubai office".
 *
 * Tokens are matched longest-first so `{marketIn}` never partially matches
 * before `{market}`. Strings without tokens are returned unchanged.
 */
export function interpolateMarket(text: string, market: Market): string {
  let out = text;
  for (const { token, resolve } of TOKENS) {
    if (out.includes(token)) {
      out = out.split(token).join(resolve(market));
    }
  }
  return out;
}

/**
 * Market context block woven into content-page copy. Every page visibly states
 * which DMC market audience it serves, names the local office, and carries the
 * "consultants in <market>" keyword phrase — so each market variant reads as
 * its own piece of content rather than a copy.
 */
export function marketContextSentence(market: Market): string {
  return `Prepared for ${marketAudience(market)} and supported by ${marketOffice(market)}. Our ${MARKET_LABELS[market]} consultants work with ${MARKET_APPLICANT_TERMS[market]} and offer free, no-obligation eligibility assessments for Canada, Australia and UK routes.`;
}

/**
 * Per-market local-context sentence shown on every content page: names the
 * applicant audience, the local office and the currency used for local fees —
 * three concrete, market-specific facts that differ per URL.
 */
export function marketLocalNote(market: Market): string {
  const currency = MARKET_CURRENCIES[market];
  return `DMC ${MARKET_LABELS[market]} — immigration consultants serving ${MARKET_APPLICANT_TERMS[market]} from ${MARKET_OFFICE_CITIES[market]}, with consultations and service fees quoted in ${currency.code}.`;
}

/**
 * Resolve market tokens through a list of paragraphs and, unless the copy
 * already names the market, prepend a market context sentence to the first
 * paragraph. Used by bespoke internal-page renderers so every destination
 * page visibly states the market it serves.
 */
export function paragraphsForMarket(
  paragraphs: string[],
  market: Market,
  { prependFirst = true }: { prependFirst?: boolean } = {},
): string[] {
  const resolved = paragraphs.map((paragraph) => interpolateMarket(paragraph, market));
  if (!prependFirst || resolved.length === 0) return resolved;
  const first = resolved[0];
  if (first.includes(MARKET_LABELS[market])) return resolved;
  resolved[0] = `${marketContextSentence(market)} ${first}`;
  return resolved;
}
