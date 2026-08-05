import { describe, expect, it } from "vitest";

import { mergeUrlTracking, readUrlTrackingParams } from "./url-tracking";

describe("url tracking", () => {
  it("parses campaign params from a query string", () => {
    expect(
      readUrlTrackingParams("?utm_source=google&utm_medium=cpc&utm_campaign=au_pr_launch&gclid=abc123"),
    ).toEqual({
      utmSource: "google",
      utmMedium: "cpc",
      utmCampaign: "au_pr_launch",
      gclid: "abc123",
    });
  });

  it("returns empty values when params are missing", () => {
    expect(readUrlTrackingParams("?foo=bar")).toEqual({
      utmSource: "",
      utmMedium: "",
      utmCampaign: "",
      gclid: "",
    });
    expect(readUrlTrackingParams("")).toEqual({
      utmSource: "",
      utmMedium: "",
      utmCampaign: "",
      gclid: "",
    });
    // No window on the server → empty.
    expect(readUrlTrackingParams(undefined)).toEqual({
      utmSource: "",
      utmMedium: "",
      utmCampaign: "",
      gclid: "",
    });
  });

  it("merges URL params into form values without clobbering existing ones", () => {
    const merged = mergeUrlTracking({
      utmSource: "facebook",
      utmMedium: "",
      utmCampaign: "",
      gclid: "",
    });
    expect(typeof merged.utmSource).toBe("string");
    expect(merged.utmSource).toBe("facebook");
  });
});
