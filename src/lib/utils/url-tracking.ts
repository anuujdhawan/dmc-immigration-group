/**
 * Campaign tracking parameters captured from the landing URL and sent with the
 * lead so every ad click is attributable. Reading them from the URL at submit
 * time means the values survive the submission (the form lives on the same
 * page that carried the query string).
 */

export interface UrlTrackingParams {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  gclid: string;
}

const EMPTY_TRACKING: UrlTrackingParams = {
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  gclid: "",
};

/**
 * Parse campaign params from a query string (e.g. `?utm_source=google&gclid=…`).
 * `search` is injectable for tests; it defaults to the current page's query
 * string in the browser and to nothing on the server.
 */
export function readUrlTrackingParams(search?: string): UrlTrackingParams {
  const query = search ?? (typeof window !== "undefined" ? window.location.search : "");
  if (!query) return EMPTY_TRACKING;
  const params = new URLSearchParams(query.startsWith("?") ? query.slice(1) : query);
  return {
    utmSource: params.get("utm_source") ?? "",
    utmMedium: params.get("utm_medium") ?? "",
    utmCampaign: params.get("utm_campaign") ?? "",
    gclid: params.get("gclid") ?? "",
  };
}

/**
 * Merge any URL tracking into the already-collected form values, preferring
 * existing form values over the URL (forms may pre-fill from a previous visit).
 */
export function mergeUrlTracking<T extends Partial<UrlTrackingParams>>(formValues: T): T {
  const url = readUrlTrackingParams();
  return {
    ...formValues,
    utmSource: formValues.utmSource || url.utmSource,
    utmMedium: formValues.utmMedium || url.utmMedium,
    utmCampaign: formValues.utmCampaign || url.utmCampaign,
    gclid: formValues.gclid || url.gclid,
  };
}
