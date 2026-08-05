import type { MetadataRoute } from "next";
import { env } from "@/config/env/server";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
    ],
    sitemap: `${env.SITE_URL}/sitemap.xml`,
  };
}
