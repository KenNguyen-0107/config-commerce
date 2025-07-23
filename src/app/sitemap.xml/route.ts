// Use dynamic import to bypass the Next.js module parsing issue
export async function GET() {
	// Get base URL from environment variable
	const baseUrl = process.env.NEXT_PUBLIC_DEFAULT_DOMAIN;

	if (!baseUrl) {
		throw new Error("NEXT_PUBLIC_DEFAULT_DOMAIN environment variable is not set");
	}

	// Dynamically import the module
	const { fetchOriginalSitemapXml } = await import("@packages/niteco-sitemap-nextjs");

	// Fetch and transform the main sitemap
	return fetchOriginalSitemapXml("sitemapindex.xml", baseUrl, true);
}
