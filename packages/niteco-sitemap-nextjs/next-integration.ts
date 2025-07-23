import type { SitemapEntry, SitemapConfig, SearchEnginePingOptions } from "./types";
import { SitemapValidationError, SITEMAP_CACHE_TAG } from "./types";
import { generateSitemapIndexXml, generateSitemapIndividual,fetchSitemapXml } from "./sitemap-generator";
import { withXMLResponse } from "./response";

/**
 * Generate sitemap index for Next.js App Router
 * @param entries Sitemap entries or a function that returns sitemap entries
 * @param config Configuration options for the sitemap
 * @param headers Custom request headers
 * @returns A handler function for the App Router
 */
export function getSitemapIndex(
	entries: SitemapEntry[] | (() => Promise<SitemapEntry[]>),
	config: SitemapConfig, 
	headers = {}
) {
	return async function GET() {
		try {
			// Get entries
			const sitemapEntries = typeof entries === "function" ? await entries() : entries;

			// Generate index sitemap xml content
			const indexContents = await generateSitemapIndexXml(sitemapEntries, config);

			// Return response
			return withXMLResponse(indexContents, headers);
		} catch (error: unknown) {
			console.error("Error handling sitemap request:", error);

			if (error instanceof SitemapValidationError) {
				return new Response(JSON.stringify({ error: error.message }), {
					status: 400,
					headers: {
						"Content-Type": "application/json",
					},
				});
			} else {
				return new Response(JSON.stringify({ error: "Internal server error" }), {
					status: 500,
					headers: {
						"Content-Type": "application/json",
					},
				});
			}
		}
	};
}

/**
 * Generate individual sitemap for Next.js App Router
 * @param entries Sitemap entries or a function that returns sitemap entries
 * @param config Configuration options for the sitemap
 * @param headers Custom request headers
 * @param pageNumber The page number for pagination
 * @returns A handler function for the App Router
 */
export function getSitemapIndividual(
	entries: SitemapEntry[] | (() => Promise<SitemapEntry[]>),
	config: SitemapConfig, 
	headers = {}, 
	pageNumber: number
) {
	return async function GET() {
		try {
			// Get entries
			const sitemapEntries = typeof entries === "function" ? await entries() : entries;

			// Generate individual sitemap xml content
			const sitemapContent = await generateSitemapIndividual(sitemapEntries, config, pageNumber);

			// Return response
			return withXMLResponse(sitemapContent, headers);
		} catch (error: unknown) {
			console.error("Error handling sitemap request:", error);

			if (error instanceof SitemapValidationError) {
				return new Response(JSON.stringify({ error: error.message }), {
					status: 400,
					headers: {
						"Content-Type": "application/json",
					},
				});
			} else {
				return new Response(JSON.stringify({ error: "Internal server error" }), {
					status: 500,
					headers: {
						"Content-Type": "application/json",
					},
				});
			}
		}
	};
}


/**
 * Fetches sitemap XML content from the source URL with caching
 * @param path The path of the sitemap to fetch (e.g., 'sitemap.xml', 'sitemap1.xml')
 * @param baseUrl The base URL to use for replacing URLs
 * @param isMainSitemap Whether this is the main sitemap that needs URL replacement
 * @returns Response object with XML content and appropriate headers
 */
export async function fetchOriginalSitemapXml(path: string, baseUrl?: string, isMainSitemap = false) {
	// Call the implementation from sitemap-generator.ts
	return fetchSitemapXml(path, baseUrl, isMainSitemap);
}


/**
 * Creates a revalidation handler for Next.js App Router
 * This handler validates the revalidation token and revalidates sitemap routes
 * @returns A handler function for the App Router
 */
export function createRevalidationHandler() {
	return async function POST(request: Request) {
		try {
			// Get the secret token from the request
			const { searchParams } = new URL(request.url);
			const secret = searchParams.get("secret");

			// Get revalidation token from environment variables
			const revalidationToken = process.env.REVALIDATION_SECRET;

			// Check if the secret is valid
			if (!revalidationToken || secret !== revalidationToken) {
				return new Response(JSON.stringify({ message: "Invalid revalidation token" }), {
					status: 401,
					headers: { "Content-Type": "application/json" },
				});
			}

			// For Next.js App Router, we need to try to import revalidatePath dynamically
			let revalidateTag;
			try {
				// This import will intentionally fail in non-Next.js environments or when building the package
				// The linter error is expected and can be ignored, as this code only runs in a Next.js App Router environment
				// @ts-ignore - next/cache is only available in Next.js App Router
				const nextCache = await import("next/cache");
				revalidateTag = nextCache.revalidateTag;
			} catch (error: unknown) {
				const errorMessage = error instanceof Error ? error.message : String(error);
				console.warn("next/cache is not available. Revalidation may not work as expected:", errorMessage);
				// Return a success response but log a warning
				return new Response(
					JSON.stringify({
						revalidated: false,
						message: "Revalidation not supported in this environment",
					}),
					{
						status: 200,
						headers: { "Content-Type": "application/json" },
					}
				);
			}

			// Get the sitemap path from the request body
			const body = await request.json().catch(() => ({ path: null }));
			const path = body.path;

			if (path && path !== "all") {
				// Split on commas, trim whitespace and drop empties
				const tags = path
					.split(",")
					.map((t: string) => t.trim())
					.filter(Boolean);

				if (tags.length > 0) {
					// Revalidate each sitemap tag
					tags.forEach((tag: string) => {
						revalidateTag(`sitemap:${tag}`);
					});

					return new Response(
						JSON.stringify({
							revalidated: true,
							message: `Revalidated sitemap(s): ${tags.join(",")}`,
						}),
						{
							status: 200,
							headers: { "Content-Type": "application/json" },
						}
					);
				} else {
					// No valid tags found
					return new Response(
						JSON.stringify({
							revalidated: false,
							message: `Invalid sitemap path: ${path}`,
						}),
						{
							status: 400,
							headers: { "Content-Type": "application/json" },
						}
					);
				}
			} else {
				// Revalidate all sitemaps
				revalidateTag(SITEMAP_CACHE_TAG);
				return new Response(
					JSON.stringify({
						revalidated: true,
						message: "Revalidated all sitemaps",
					}),
					{
						status: 200,
						headers: { "Content-Type": "application/json" },
					}
				);
			}
		} catch (error: unknown) {
			console.error("Sitemap revalidation error:", error);

			return new Response(
				JSON.stringify({
					revalidated: false,
					message: "Error revalidating sitemaps",
					error: error instanceof Error ? error.message : String(error),
				}),
				{
					status: 500,
					headers: { "Content-Type": "application/json" },
				}
			);
		}
	};
}

/**
 * Pings search engines to notify them about sitemap updates
 * @param sitemapUrl The URL of the sitemap
 * @param options Options for which search engines to ping
 * @returns A record of which search engines were successfully pinged
 */
export async function pingSearchEngines(
	sitemapUrl: string,
	options: SearchEnginePingOptions = { google: true, bing: true, yandex: false }
): Promise<Record<string, boolean>> {
	const results: Record<string, boolean> = {};

	try {
		const pingPromises: Promise<void>[] = [];

		if (options.google) {
			pingPromises.push(
				fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`)
					.then((response) => {
						results.google = response.ok;
					})
					.catch((error: unknown) => {
						console.error(`Error pinging Google:`, error instanceof Error ? error.message : String(error));
						results.google = false;
					})
			);
		}

		if (options.bing) {
			pingPromises.push(
				fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`)
					.then((response) => {
						results.bing = response.ok;
					})
					.catch((error: unknown) => {
						console.error(`Error pinging Bing:`, error instanceof Error ? error.message : String(error));
						results.bing = false;
					})
			);
		}

		if (options.yandex) {
			pingPromises.push(
				fetch(`https://webmaster.yandex.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`)
					.then((response) => {
						results.yandex = response.ok;
					})
					.catch((error: unknown) => {
						console.error(`Error pinging Yandex:`, error instanceof Error ? error.message : String(error));
						results.yandex = false;
					})
			);
		}

		// Wait for all pings to complete
		await Promise.all(pingPromises);

		return results;
	} catch (error: unknown) {
		console.error("Error pinging search engines:", error instanceof Error ? error.message : String(error));
		return {};
	}
}
