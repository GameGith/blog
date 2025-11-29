import type { NextConfig } from "next";

const supabaseHostname = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : undefined;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      supabaseHostname
        ? {
            protocol: "https",
            hostname: supabaseHostname,
          }
        : undefined,
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ].filter(Boolean) as NonNullable<NextConfig["images"]>["remotePatterns"],
  },
  async rewrites() {
    return [
      {
        source: "/cdn/:path*",
        destination: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/:path*`,
      },
    ];
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost"],
    },
  },
};

export default nextConfig;
