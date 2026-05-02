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

  // Output settings
  output: 'standalone', // for Docker / Vercel standalone builds

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
    ]
  },
}

module.exports = nextConfig
