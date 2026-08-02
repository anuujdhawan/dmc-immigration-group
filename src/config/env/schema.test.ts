import { describe, expect, it } from "vitest";

import { marketContactEnv, parseEnv } from "./schema";

const baseEnv = {
  SITE_URL: "https://www.dmcimmigrationgroup.com",
  SITE_NAME: "DMC Immigration Group",
  DMC_DUBAI_PHONE_E164: "+97143447757",
  DMC_DUBAI_PHONE_DISPLAY: "+971 4 344 7757",
  DMC_DUBAI_EMAIL: "info@dm-consultant.com",
  DMC_DUBAI_LEAD_TO_EMAIL: "leads.dubai@example.invalid",
  DMC_DUBAI_ADDRESS: "Latifa Tower, Dubai",
  DMC_ABU_DHABI_PHONE_E164: "+97124914919",
  DMC_ABU_DHABI_PHONE_DISPLAY: "+971 2 491 4919",
  DMC_ABU_DHABI_EMAIL: "info.auh@dm-consultant.com",
  DMC_ABU_DHABI_LEAD_TO_EMAIL: "leads.auh@example.invalid",
  DMC_ABU_DHABI_ADDRESS: "Salam HQ, Abu Dhabi",
  DMC_QATAR_PHONE_E164: "+97444367929",
  DMC_QATAR_PHONE_DISPLAY: "+974 4436 7929",
  DMC_QATAR_EMAIL: "info@dm-consultant.qa",
  DMC_QATAR_LEAD_TO_EMAIL: "leads.qa@example.invalid",
  DMC_QATAR_ADDRESS: "Al Matar Street, Doha",
  DMC_KUWAIT_PHONE_E164: "+96555154110",
  DMC_KUWAIT_PHONE_DISPLAY: "+965 5515 4110",
  DMC_KUWAIT_EMAIL: "info@dm-consultantkuwait.com",
  DMC_KUWAIT_LEAD_TO_EMAIL: "leads.kw@example.invalid",
  DMC_KUWAIT_ADDRESS: "Orient Complex, Salmiya",
  DMC_INDIA_PHONE_E164: "+919972011342",
  DMC_INDIA_PHONE_DISPLAY: "+91 99720 11342",
  DMC_INDIA_EMAIL: "info.bglr@dm-consultant.com",
  DMC_INDIA_LEAD_TO_EMAIL: "leads.in@example.invalid",
  DMC_INDIA_ADDRESS: "UMA Plaza, Hyderabad",
};

describe("env schema", () => {
  it("parses a full fixture with defaults applied", () => {
    const env = parseEnv(baseEnv);
    expect(env.DEFAULT_MARKET).toBe("dubai");
    expect(env.GEO_ROUTING_ENABLED).toBe(true);
    expect(env.MARKET_COOKIE_NAME).toBe("dmc_market");
    expect(env.MARKET_COOKIE_MAX_AGE_SECONDS).toBe(31536000);
    expect(env.RESEND_ENABLED).toBe(false);
    expect(env.NODE_ENV).toBe("development");
  });

  it("extracts per-market contact sections", () => {
    const env = parseEnv(baseEnv);
    const dubai = marketContactEnv(env, "dubai");
    expect(dubai.phoneE164).toBe("+97143447757");
    expect(dubai.phoneDisplay).toBe("+971 4 344 7757");
    expect(dubai.email).toBe("info@dm-consultant.com");
    expect(dubai.leadToEmail).toBe("leads.dubai@example.invalid");
    expect(dubai.whatsappE164).toBe("");
    expect(dubai.directionsUrl).toBe("");
  });

  it("rejects invalid phone E164 values", () => {
    expect(() =>
      parseEnv({ ...baseEnv, DMC_DUBAI_PHONE_E164: "971-4-3447757" }),
    ).toThrow();
  });

  it("rejects missing required market contact", () => {
    expect(() => parseEnv({ ...baseEnv, DMC_DUBAI_EMAIL: undefined })).toThrow();
  });

  it("rejects an unknown default market", () => {
    expect(() => parseEnv({ ...baseEnv, DEFAULT_MARKET: "london" })).toThrow();
  });

  it("honours toggles set explicitly", () => {
    const env = parseEnv({
      ...baseEnv,
      RESEND_ENABLED: "true",
      GEO_ROUTING_ENABLED: "false",
    });
    expect(env.RESEND_ENABLED).toBe(true);
    expect(env.GEO_ROUTING_ENABLED).toBe(false);
  });
});
