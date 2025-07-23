import { getSitemapIndividual } from "@niteco/sitemap-nextjs";
import { NextResponse } from "next/server";

import { SitemapEntry, NextFetchRequestConfig, SITEMAP_CACHE_TAG } from "@niteco/sitemap-nextjs";

/**
 * Next.js fetch options extending the standard RequestInit
 */

export async function GET(request, { params }) {
	console.log("GET handler called", request.url);
	try {
		// Use dynamic import to avoid module parsing issues
		const id = params.id;

		// Validate the sitemap ID format to match sitemapXX.xml where XX is any number
		if (!id.match(/^sitemap\d+\.xml$/)) {
			return new NextResponse("Sitemap not found", { status: 404 });
		}



		const match = id.match(/sitemap(\d+)\.xml$/);
		const pageNumber: number = match ? parseInt(match[1], 10) : 1;
		// Get entries
		const entries = await getEntries(id);
		console.log("Entries fetched successfully");

		// Get the host from the request
		const host = request.headers.get("host") || "localhost:3000";
		const protocol = host.includes("localhost") ? "http" : "https";
		const baseUrl = `${protocol}://${host}`;

		// Use the createSitemapHandler function, but capture its return value
		const handler = getSitemapIndividual(
			entries,
			{
				baseUrl,
				compress: false,
				updateRobotsTxt: true,
			},
			{},
			pageNumber
		);

		console.log("Handler created successfully");

		// Call the handler with the request
		return handler();
	} catch (error) {
		console.error("Error in sitemap route:", error);
		return new Response(
			JSON.stringify({ error: error instanceof Error ? error.message : String(error) }),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			}
		);
	}
}

// This function would typically fetch data from a CMS, database, or other source
async function getEntries(path: string): Promise<SitemapEntry[]> {
	// You can fetch entries from a database or other source

	// Fetch the sitemap from the source with configurable cache duration
	// Get cache duration from environment variable or default to 1 day (86400 seconds)
	const cacheDurationSeconds = process.env.SITEMAP_CACHE_DURATION_SECONDS
		? Number.parseInt(process.env.SITEMAP_CACHE_DURATION_SECONDS, 10)
		: 86400;
	const response = await fetch("sourceUrl", {
		next: {
			revalidate: cacheDurationSeconds,
			tags: [SITEMAP_CACHE_TAG, `sitemap:${path}`], // Tags for targeted revalidation
		},
	} as NextFetchRequestConfig);

	// Mock data for the example
	console.log("getEntries function called");
	// Generate mock entries
	const entries = [];

	// Define type locally
	type ChangeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

	// Add the main pages first
	entries.push(
		{
			urlSlug: "/",
			lastModified: new Date().toISOString(),
			changefreq: "weekly" as ChangeFrequency,
			priority: "1.0",
			alternates: {
				languages: {
					"en-us": "https://example.com/",
					es: "https://example.com/es/",
				},
			},
		},
		{
			urlSlug: "about",
			lastModified: new Date().toISOString(),
			changefreq: "monthly" as ChangeFrequency,
			priority: "0.8",
			alternates: {
				languages: {
					"en-us": "https://example.com/about",
					es: "https://example.com/es/about",
				},
			},
		},
		{
			urlSlug: "blog",
			lastModified: new Date().toISOString(),
			changefreq: "daily" as ChangeFrequency,
			priority: "0.9",
			alternates: {
				languages: {
					"en-us": "https://example.com/blog",
					es: "https://example.com/es/blog",
				},
			},
		}
	);

	// Generate the rest of the entries
	const categories = ["products", "services", "blog", "news", "resources"];
	const changefreqs: ChangeFrequency[] = ["daily", "weekly", "monthly", "yearly"];
	const priorities = ["0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7"];

	for (let i = 1; i <= 15000; i++) {
		const category = categories[Math.floor(Math.random() * categories.length)];
		const changefreq = changefreqs[Math.floor(Math.random() * changefreqs.length)];
		const priority = priorities[Math.floor(Math.random() * priorities.length)];
		const urlSlug = `${category}/${i}`;

		entries.push({
			urlSlug,
			lastModified: new Date().toISOString(),
			changefreq,
			priority,
			alternates: {
				languages: {
					"en-us": `https://example.com/${urlSlug}`,
					es: `https://example.com/es/${urlSlug}`,
				},
			},
		});
	}

	console.log(`Returning ${entries.length} entries`);
	return entries;
}
