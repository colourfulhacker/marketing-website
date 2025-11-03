import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Replit-specific configuration
  experimental: {
    allowedDevOrigins: process.env.REPLIT_DOMAINS 
      ? process.env.REPLIT_DOMAINS.split(',')
      : []
  },
  
  // Production optimizations
  reactStrictMode: true,
  
  // Performance optimizations
  compress: true,
  
  // Security headers (also configured in vercel.json for deployment)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          }
        ],
      },
    ];
  },
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  }
};

export default nextConfig;
