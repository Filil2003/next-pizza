import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: "dist",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.dodostatic.net"
      }
    ]
  },
  experimental: {
    typedEnv: true
  }
};

export default nextConfig;
