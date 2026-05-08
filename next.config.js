/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode
  reactStrictMode: true,

  // Enable SWC compiler features
  swcMinify: true,

  // Image optimization settings
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Experimental features (if you want App Router / Turbopack)
  experimental: {
    appDir: false, // enable /app directory routing
    turbo: false, // enable Turbopack dev server (optional)
  },

  // Environment variables (optional)
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  // No `output` set — Vercel handles its own bundling. `output: 'standalone'`
  // is for Docker/self-hosting and was racing with `next-sitemap`'s post-build
  // write to /public, causing the live /sitemap.xml to 404 on production.

  // Redirect deleted routes to preserve external backlinks
  async redirects() {
    return [
      {
        source: '/stockists',
        destination: '/get-the-book',
        permanent: true,
      },
      {
        source: '/wholesalers',
        destination: '/get-the-book',
        permanent: true,
      },
      {
        // Pre-redesign click-through landing; functionality merged into
        // /get-the-book via the GetTheBookLinks component.
        source: '/get-the-book/get-from-amazon',
        destination: '/get-the-book',
        permanent: true,
      },
      {
        // /feedback merged into /write-a-review (single post-purchase page
        // with two CTAs: leave an Amazon review, or send Maz a note).
        // Anchor lands the visitor on the note section.
        source: '/feedback',
        destination: '/write-a-review#note',
        permanent: true,
      },
      {
        // Subroute consolidation; same-page CTAs on /write-a-review handle
        // the locale-aware Amazon review path now.
        source: '/write-a-review/review-on-amazon',
        destination: '/write-a-review',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
