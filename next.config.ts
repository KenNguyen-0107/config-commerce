// const withBundleAnalyzer = require("@next/bundle-analyzer")({
// 	enabled: process.env.ANALYZE === "true",
// 	openAnalyzer: false,
// });
//const nextConfig = withBundleAnalyzer({
const nextConfig = {
	reactStrictMode: false,
	pageExtensions: ["jsx", "js", "tsx", "ts"],
	transpilePackages: ["nextjs-components", "../core", "@niteco/sitemap-nextjs"],
	compress: true, // Enable compression by default
	// Remove X-Powered-By header
	poweredByHeader: false,
	swcMinify: true,
	experimental: {
		earlyHints: true,
		nextScriptWorkers: true,
		webpackBuildWorker: true,
		parallelServerBuildTraces: true,
		parallelServerCompiles: true,
		optimizeFunctionSerialization: true,
		optimizeCss: true, // This is experimental
		inlineCss: true,
	},
	//optimizeFonts: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "iwunis01sandboxaz.commerce.insitesandbox.com",
			},
			{
				protocol: "https",
				hostname: "**",
			},
		],
		minimumCacheTTL: 31536000, // 1 year in seconds
		deviceSizes: [
			// Lighthouse test viewport width (mobile)
			412,

			// Common real-world viewport widths
			// 640, 750, 828,
			544, 750,

			// Medium screens
			//1080, 1200,
			1200,
			// Lighthouse test viewport width (desktop)
			1350,

			// Larger screens
			// 1920, 2048, 3840,
			1920,
		],

		// Smaller sizes for UI elements
		// All values smaller than the smallest deviceSize (412)
		imageSizes: [214, 256],
		//imageSizes: [16, 32, 64, 96, 128, 256, 384],
		domains: [
			"jacksonsfencing-configcommerce-d-cl.niteco.dev",
			"iwunis01sandboxaz.commerce.insitesandbox.com",
		],
		// loader: 'custom',
		// deviceSizes: [640, 1920],
		formats: ["image/avif", "image/webp"],
		// qualities: [60, 80, 90],
		//loaderFile: "./imageLoader.ts",
	},
	async rewrites() {
		return [
			{
				source: "/sitemap-:index.xml",
				destination: "/sitemaps/sitemap-:index.xml",
			},
			{
				source: "/sitemap.xml",
				destination: "/sitemaps/sitemap.xml",
			},
		];
	},
	async headers() {
		if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") return [];
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
			{
				// Apply these headers to all routes
				source: "/:path*",
				headers: [
					{
						key: "Access-Control-Allow-Origin",
						value: "*",
					},
					{
						key: "Access-Control-Allow-Methods",
						value: "GET, OPTIONS",
					},
					{
						key: "Access-Control-Allow-Headers",
						value: "Content-Type",
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "Strict-Transport-Security",
						value: "max-age=31536000; includeSubDomains; preload",
					},
					{
						key: "X-Frame-Options",
						value: "SAMEORIGIN",
					},
					{
						key: "X-XSS-Protection",
						value: "1; mode=block",
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
					// Modern approach: Permissions-Policy (formerly Feature-Policy)
					{
						key: "Permissions-Policy",
						value:
							"accelerometer=*, camera=(), geolocation=(), gyroscope=*, magnetometer=(), microphone=(), payment=(), usb=()",
					},
					// Basic CSP - consider expanding this based on your application needs
					{
						key: "Content-Security-Policy",
						value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline';
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: blob: *;
              media-src 'self' data: blob: *;
              connect-src 'self' *;
              font-src 'self';
              frame-src *;
            `
							.replace(/\s{2,}/g, " ")
							.trim(),
					},
					{
						key: "X-DNS-Prefetch-Control",
						value: "on",
					},
				],
			},
		];
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	//compress: true, // Enable compression
};

export default nextConfig;
