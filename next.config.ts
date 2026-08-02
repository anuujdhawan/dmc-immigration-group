import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Trailing-slash handling lives in src/proxy.ts so legacy-host redirects run
  // before Next's internal slash redirects (see docs DECISIONS.md).
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
