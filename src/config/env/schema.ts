import { z } from "zod";

const boolTrue = z
  .enum(["true", "false"])
  .default("true")
  .transform((v) => v === "true");

const boolFalse = z
  .enum(["true", "false"])
  .default("false")
  .transform((v) => v === "true");
const urlOrEmpty = z.url().or(z.literal(""));
const emailOrEmpty = z.email().or(z.literal(""));
const phoneE164 = z.string().regex(/^\+[1-9]\d{6,14}$/);
const phoneE164OrEmpty = phoneE164.or(z.literal(""));

export const MARKET_ENV_SUFFIXES = [
  "DUBAI",
  "ABU_DHABI",
  "QATAR",
  "KUWAIT",
  "INDIA",
] as const;

type MarketSuffix = (typeof MARKET_ENV_SUFFIXES)[number];
type MarketField =
  | "PHONE_E164"
  | "PHONE_DISPLAY"
  | "EMAIL"
  | "LEAD_TO_EMAIL"
  | "WHATSAPP_E164"
  | "ADDRESS"
  | "DIRECTIONS_URL";
type MarketKey<S extends MarketSuffix> = `DMC_${S}_${MarketField}`;

const marketContact = <S extends MarketSuffix>(
  suffix: S,
): { [K in MarketKey<S>]: z.ZodTypeAny } =>
  ({
    [`DMC_${suffix}_PHONE_E164`]: phoneE164,
    [`DMC_${suffix}_PHONE_DISPLAY`]: z.string().min(1),
    [`DMC_${suffix}_EMAIL`]: z.email(),
    [`DMC_${suffix}_LEAD_TO_EMAIL`]: z.email(),
    [`DMC_${suffix}_WHATSAPP_E164`]: phoneE164OrEmpty.default(""),
    [`DMC_${suffix}_ADDRESS`]: z.string().min(1),
    [`DMC_${suffix}_DIRECTIONS_URL`]: urlOrEmpty.default(""),
  }) as unknown as { [K in MarketKey<S>]: z.ZodTypeAny };

export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

  SITE_URL: z.url(),
  SITE_NAME: z.string().min(1),
  DEFAULT_MARKET: z.enum(["dubai", "abu-dhabi", "qatar", "kuwait", "india"]).default("dubai"),
  GEO_ROUTING_ENABLED: boolTrue,
  LEGACY_HOST_REDIRECTS_ENABLED: boolTrue,
  MARKET_COOKIE_NAME: z.string().min(1).default("dmc_market"),
  MARKET_COOKIE_MAX_AGE_SECONDS: z.coerce.number().int().positive().default(31536000),

  RESEND_ENABLED: boolFalse,
  RESEND_API_KEY: z.string().default(""),
  RESEND_SENDING_DOMAIN: z.string().default("example.invalid"),
  RESEND_FROM_LOCAL_PART: z.string().default("website"),
  RESEND_FROM_NAME: z.string().default("DMC Website"),
  RESEND_REPLY_TO_EMAIL: emailOrEmpty.default(""),
  RESEND_CENTRAL_BCC_EMAIL: emailOrEmpty.default(""),

  CRM_ENABLED: boolFalse,
  CRM_BASE_URL: urlOrEmpty.default(""),
  CRM_LEADS_ENDPOINT: z.string().default("/api/leads"),
  CRM_API_KEY: z.string().default(""),
  CRM_AUTH_HEADER: z.string().default("Authorization"),
  CRM_AUTH_SCHEME: z.string().default("Bearer"),
  CRM_TIMEOUT_MS: z.coerce.number().int().positive().default(8000),

  TURNSTILE_ENABLED: boolFalse,
  TURNSTILE_SECRET_KEY: z.string().default(""),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().default(""),
  RATE_LIMIT_ENABLED: boolFalse,
  RATE_LIMIT_PROVIDER: z.string().default("none"),
  UPSTASH_REDIS_REST_URL: z.string().default(""),
  UPSTASH_REDIS_REST_TOKEN: z.string().default(""),

  GUIDED_CHAT_ENABLED: boolTrue,
  // Recipient for guided-chat leads (DmcGuidedChat). Falls back to the
  // market's DMC_<MARKET>_LEAD_TO_EMAIL, then RESEND_REPLY_TO_EMAIL.
  DMC_CHATBOT_LEAD_TO_EMAIL: emailOrEmpty.default(""),
  ELIGIBILITY_CHECKER_ENABLED: boolTrue,

  CONSENT_BANNER_ENABLED: boolFalse,
  CONSENT_COOKIE_NAME: z.string().min(1).default("dmc_consent"),
  CONSENT_POLICY_REVISION: z.coerce.number().int().nonnegative().default(1),
  ANALYTICS_ENABLED: boolFalse,
  GTM_CONTAINER_ID: z.string().default(""),
  GA4_MEASUREMENT_ID: z.string().default(""),
  MARKETING_TRACKING_ENABLED: boolFalse,
  META_PIXEL_ID: z.string().default(""),

  SOCIAL_INSTAGRAM_URL: urlOrEmpty.default(""),
  SOCIAL_FACEBOOK_URL: urlOrEmpty.default(""),
  SOCIAL_YOUTUBE_URL: urlOrEmpty.default(""),

  FRAUD_REPORT_EMAIL: emailOrEmpty.default(""),

  ...marketContact("DUBAI"),
  ...marketContact("ABU_DHABI"),
  ...marketContact("QATAR"),
  ...marketContact("KUWAIT"),
  ...marketContact("INDIA"),

  WHATSAPP_PREFILLED_MESSAGE: z.string().default("Hello DMC, I would like to discuss an immigration enquiry."),
});

export type Env = z.infer<typeof envSchema>;

export interface MarketContactEnv {
  phoneE164: string;
  phoneDisplay: string;
  email: string;
  leadToEmail: string;
  whatsappE164: string;
  address: string;
  directionsUrl: string;
}

export type MarketEnvPrefix =
  | "DMC_DUBAI"
  | "DMC_ABU_DHABI"
  | "DMC_QATAR"
  | "DMC_KUWAIT"
  | "DMC_INDIA";

export const MARKET_ENV_KEY_PREFIX: Record<string, MarketEnvPrefix> = {
  dubai: "DMC_DUBAI",
  "abu-dhabi": "DMC_ABU_DHABI",
  qatar: "DMC_QATAR",
  kuwait: "DMC_KUWAIT",
  india: "DMC_INDIA",
};

export function parseEnv(source: Record<string, string | undefined> = process.env): Env {
  return envSchema.parse(source);
}

export function marketContactEnv(env: Env, market: string): MarketContactEnv {
  const prefix = MARKET_ENV_KEY_PREFIX[market];
  if (!prefix) throw new Error(`Unknown market "${market}"`);
  const read = (field: MarketField): string => env[`${prefix}_${field}` as keyof Env] as string;
  return {
    phoneE164: read("PHONE_E164"),
    phoneDisplay: read("PHONE_DISPLAY"),
    email: read("EMAIL"),
    leadToEmail: read("LEAD_TO_EMAIL"),
    whatsappE164: read("WHATSAPP_E164"),
    address: read("ADDRESS"),
    directionsUrl: read("DIRECTIONS_URL"),
  };
}
