import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@gallerycando/db", "@gallerycando/shared", "@gallerycando/ui"],
};

export default nextConfig;