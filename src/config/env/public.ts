import { env } from "./index";

export const envPublic = {
  siteUrl: env.SITE_URL,
  siteName: env.SITE_NAME,
  defaultMarket: env.DEFAULT_MARKET,
  geoRoutingEnabled: env.GEO_ROUTING_ENABLED,
  legacyHostRedirectsEnabled: env.LEGACY_HOST_REDIRECTS_ENABLED,
  marketCookieName: env.MARKET_COOKIE_NAME,
  guidedChatEnabled: env.GUIDED_CHAT_ENABLED,
  eligibilityCheckerEnabled: env.ELIGIBILITY_CHECKER_ENABLED,
  consentBannerEnabled: env.CONSENT_BANNER_ENABLED,
  consentCookieName: env.CONSENT_COOKIE_NAME,
  consentPolicyRevision: env.CONSENT_POLICY_REVISION,
  analyticsEnabled: env.ANALYTICS_ENABLED,
  marketingTrackingEnabled: env.MARKETING_TRACKING_ENABLED,
  socials: {
    instagram: env.SOCIAL_INSTAGRAM_URL,
    facebook: env.SOCIAL_FACEBOOK_URL,
    youtube: env.SOCIAL_YOUTUBE_URL,
  },
  fraudReportEmail: env.FRAUD_REPORT_EMAIL,
  whatsappPrefilledMessage: env.WHATSAPP_PREFILLED_MESSAGE,
};

export type EnvPublic = typeof envPublic;
