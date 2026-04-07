import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },
  headers: async () => [
    {
      source: '/api/:path*',
      headers: [{ key: 'Cache-Control', value: 'no-store' }],
    },
    {
      source: '/(results|upcoming-races)',
      headers: [{ key: 'Cache-Control', value: 'no-store' }],
    },
  ],
};

export default nextConfig;
