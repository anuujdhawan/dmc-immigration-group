export const envClient = {
  turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "",
};

export type EnvClient = typeof envClient;
