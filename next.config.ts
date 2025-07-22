const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
})

const nextConfig = withBundleAnalyzer({
  reactStrictMode: true,
  pageExtensions: ["jsx", "js", "tsx", "ts"],
  transpilePackages: ["nextjs-components", "../core"],
  compress: true, // Enable compression by default
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
    optimizeCss: true, // This is experimental
    inlineCss: true,
  },
  //optimizeFonts: true,
  images: {
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "jacksonsfencing-configcommerce-d-cl.niteco.dev",
      // },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    minimumCacheTTL: 31536000, // 1 year in seconds
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ["jacksonsfencing-configcommerce-d-cl.niteco.dev"],
    // loader: 'custom',
    // deviceSizes: [640, 1920],
    formats: ["image/avif", "image/webp"],
    // qualities: [60, 80, 90],
    loaderFile: "./imageLoader.ts",
  },
  async headers() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") return []
    return [
      {
        // Add specific cache control for Next.js Image Optimization API
        source: "/_next/image/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Separate configuration for CSS files
        source: "/:path*.css",
        headers: [
          {
            key: "Content-Type",
            value: "text/css; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          // {
          //   key: "Content-Encoding",
          //   value: "br", // Force Brotli encoding
          // },
          // {
          //   key: "Vary",
          //   value: "Accept-Encoding",
          // },
        ],
      },
      // {
      //   // Match all static files
      //   source: "/:all*(jpg|jpeg|png|svg|mp4|webm|ico|webp|avif)",
      //   headers: [
      //     {
      //       key: "X-Check-Cacheable",
      //       value: "YES",
      //     },
      //     {
      //       key: "Cache-Control",
      //       value: "public, max-age=31536000, immutable",
      //     },
      //   ],
      // },
      {
        // Match all static files
        source: "/:all*(js|woff|woff2|ttf|eot)",
        headers: [
          {
            key: "X-Check-Cacheable",
            value: "YES",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          // {
          //   key: "Content-Encoding",
          //   value: "br", // Force Brotli encoding
          // },
          // {
          //   key: "Vary",
          //   value: "Accept-Encoding",
          // },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          {
            key: "X-Check-Cacheable",
            value: "NO",
          },
        ],
      },
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  //compress: true, // Enable compression
})

export default nextConfig
