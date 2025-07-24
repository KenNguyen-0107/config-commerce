// const withBundleAnalyzer = require("@next/bundle-analyzer")({
// 	enabled: process.env.ANALYZE === "true",
// 	openAnalyzer: false,
// });
//const nextConfig = withBundleAnalyzer({
const nextConfig = {
	reactStrictMode: false,
	pageExtensions: ["jsx", "js", "tsx", "ts"],
	transpilePackages: ["nextjs-components", "../core", "@niteco/sitemap-nextjs"],

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

	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	//compress: true, // Enable compression
};

export default nextConfig;
