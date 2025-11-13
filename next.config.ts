import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ["192.168.1.136"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "http",
        hostname: "192.168.1.136",
      },
      {
        protocol: "http",
        hostname: "frontend", // typo fixed from 'frotnend'
      },
      {
        protocol: "http",
        hostname: "0.0.0.0",
      },
    ],
  },
};

export default nextConfig;
