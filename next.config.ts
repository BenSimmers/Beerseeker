import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Image optimization for performance and SEO
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'apps.apple.com',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
  },

  // Enable compression for all assets
  compress: true,

  // Enforce trailing slashes for SEO consistency
  trailingSlash: false,

  // Security and performance headers
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          // Security headers
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Performance headers
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
      // Specific caching for static assets
      {
        source: '/public/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Redirects for SEO (if needed in future)
  redirects: async () => {
    return [
      // Example: redirect non-www to www or vice versa
      // {
      //   source: '/:path*',
      //   destination: 'https://www.beerseeker.org/:path*',
      //   permanent: true,
      // },
    ];
  },

  // Rewrites for maintaining clean URLs
  rewrites: async () => {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [],
    };
  },

  // TypeScript configuration
  typescript: {
    tsconfigPath: './tsconfig.json',
  },

  // React strict mode for development
  reactStrictMode: true,

  // Generate ETags for cache validation
  generateEtags: true,
};

export default nextConfig;
