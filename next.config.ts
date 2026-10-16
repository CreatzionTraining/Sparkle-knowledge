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
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; script-src-elem 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.googleadservices.com https://www.google.com https://googleads.g.doubleclick.net; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https://res.cloudinary.com https://randomuser.me https://www.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com https://www.google.com https://*.google-analytics.com; font-src 'self' data:; connect-src 'self' https://api.cloudinary.com https://www.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com https://www.google.com https://*.google-analytics.com https://ad.doubleclick.net; frame-src 'self' https://www.google.com https://maps.google.com https://www.youtube.com https://www.openstreetmap.org https://www.googletagmanager.com;",
          }
        ],
      },
    ]
  },
};

export default nextConfig;
