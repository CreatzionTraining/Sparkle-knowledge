import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https://res.cloudinary.com https://randomuser.me; font-src 'self' data:; connect-src 'self' https://api.cloudinary.com; frame-src 'self' https://www.google.com https://www.youtube.com;",
          }
        ],
      },
    ]
  },
};

export default nextConfig;
