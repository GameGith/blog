import type { MetadataRoute } from "next";

// Use a safe, absolute base URL; fallback to production domain.
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://idcode.my.id"
).replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Keep disallow simple path patterns to avoid parsing issues.
        disallow: ["/admin", "/dashboard", "/api/auth", "/auth/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "Bingbot",
        allow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
