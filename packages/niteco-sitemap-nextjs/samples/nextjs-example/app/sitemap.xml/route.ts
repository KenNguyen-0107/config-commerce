/**
 * Route handler for generating the sitemap index.
 * 
 * This example uses dynamic imports to avoid Next.js module parsing issues.
 */

export async function GET(request: Request) {
	console.log("GET handler called", request.url);
	try {
		// Dynamically import the module at runtime
		const { getSitemapIndex, SITEMAP_CACHE_TAG } = await import(
			"@niteco/sitemap-nextjs"
		);
		
		// Also import NextFetchRequestConfig type from next/server
		// This is only needed for TypeScript type annotations
		type NextFetchRequestConfig = {
			next?: {
				revalidate?: number | false;
				tags?: string[];
			}
		};

		// Get entries
		const entries = await getEntries(SITEMAP_CACHE_TAG);
		console.log("Entries fetched successfully");

		// Get the host from the request
		const host = request.headers.get("host") || "localhost:3000";
		const protocol = host.includes("localhost") ? "http" : "https";
		const baseUrl = `${protocol}://${host}`;

		// Use the getSitemapIndex function
		const handler = getSitemapIndex(() => Promise.resolve(entries), {
			baseUrl,
			compress: false,
			updateRobotsTxt: true,
		});

		console.log("Handler created successfully");

		// Call the handler
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
async function getEntries(SITEMAP_CACHE_TAG: string) {
	// Define type for entries
	type SitemapEntry = {
		urlSlug: string;
		lastModified: string;
		changefreq: ChangeFrequency;
		priority: string;
		alternates?: {
			languages: Record<string, string>;
		}
	};
	
	// Define ChangeFrequency type
	type ChangeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

	// You can fetch entries from a database or other source
	// Get cache duration from environment variable or default to 1 day (86400 seconds)
	const cacheDurationSeconds = process.env.SITEMAP_CACHE_DURATION_SECONDS
		? Number.parseInt(process.env.SITEMAP_CACHE_DURATION_SECONDS, 10)
		: 86400;
	
	// Example of using SITEMAP_CACHE_TAG for main sitemap
	const path = 'sitemap.xml';
	
	// This is where you would fetch your actual data
	// const response = await fetch("https://your-api.com/sitemap-data", {
	// 	next: {
	// 		revalidate: cacheDurationSeconds,
	// 		tags: [SITEMAP_CACHE_TAG, `sitemap:${path}`], // Tags for targeted revalidation
	// 	},
	// });
	
	// Process the response if needed
	// const data = await response.json();

	// Mock data for the example
	console.log("getEntries function called");
	// Generate mock entries
	const entries: SitemapEntry[] = [];

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

	// Generate a smaller set of entries for the example (instead of 15000)
	const categories = ["products", "services", "blog", "news", "resources"];
	const changefreqs: ChangeFrequency[] = ["daily", "weekly", "monthly", "yearly"];
	const priorities = ["0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7"];

	// Generate only 20 sample entries for the example
	for (let i = 1; i <= 20; i++) {
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
