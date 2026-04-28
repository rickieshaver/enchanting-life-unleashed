import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  async redirects() {
    return [
      {
        source: '/lunar-boundary-planner',
        destination: '/sacred-boundary-system',
        permanent: true,
      },
      {
        source: '/moon-cycle-life-planner',
        destination: '/lunar-alignment-planner',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
