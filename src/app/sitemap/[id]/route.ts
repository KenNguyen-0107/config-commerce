import { NextResponse } from "next/server";

export async function GET(request, { params }) {
	const id = params.id;

	// Validate the sitemap ID format to match sitemapXX.xml where XX is any number
	if (!id.match(/^sitemap\d+\.xml$/)) {
		return new NextResponse("Sitemap not found", { status: 404 });
	}

	// Get base URL from environment variable
	const baseUrl = process.env.NEXT_PUBLIC_DEFAULT_DOMAIN;

	if (!baseUrl) {
		return new NextResponse("NEXT_PUBLIC_DEFAULT_DOMAIN environment variable is not set", {
			status: 500,
		});
	}

	// Dynamically import the module
	const { fetchOriginalSitemapXml } = await import("@packages/niteco-sitemap-nextjs");

	// Use the shared utility function to fetch and transform the sitemap
	return fetchOriginalSitemapXml(id, baseUrl, false);
}
