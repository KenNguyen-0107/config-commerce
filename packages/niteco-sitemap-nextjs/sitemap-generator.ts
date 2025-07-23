import type { NextFetchRequestConfig, SitemapEntry, SitemapConfig, SitemapChunk } from "./types";
import { SitemapValidationError, SITEMAP_CACHE_TAG } from "./types";
import {
	chunkEntries,
	buildUrlTag,
	getSitemapHeader,
	getSitemapFooter,
	getSitemapIndexHeader,
	getSitemapIndexFooter,
	updateRobotsTxt,
	getCurrentDate,
	formatDate,
	transformSitemapXml,
	paginateEntries
} from "./sitemap-builder";
import { validateSitemapEntries } from "./validators";

/**
 * Default configuration values
 */
const DEFAULT_CONFIG: Partial<SitemapConfig> = {
	chunkSize: 5000,
	compress: true,
	updateRobotsTxt: true,
	robotsTxtPath: "public/robots.txt",
	pingSearchEngines: false,
};

/**
 * Generates sitemaps from a list of entries
 * @param entries The entries to generate sitemaps for
 * @param config The configuration options
 * @returns The result of the generation process
 * @throws {SitemapValidationError} If any entry is invalid
 */
export async function generateSitemapIndexXml(
	entries: SitemapEntry[],
	config: SitemapConfig
): Promise<string> {
	try {
		// Merge with default config
		const mergedConfig: SitemapConfig = { ...DEFAULT_CONFIG, ...config };

		// Chunk entries
		const chunkSize = mergedConfig.chunkSize || 5000;
		const entryChunks = chunkEntries(entries, chunkSize);

		// Generate sitemap chunks
		const chunks: SitemapChunk[] = [];
		const currentDate = getCurrentDate();

		// Process chunks in parallel for better performance
		await Promise.all(
			entryChunks.map(async (chunkEntries, i) => {
				const filename = `sitemap${i}.xml`;

				const chunk: SitemapChunk = {
					filename,
					entries: chunkEntries,
					lastModified: currentDate,
				};

				chunks.push(chunk);
			})
		);

		// Sort chunks by filename for consistency
		chunks.sort((a, b) => a.filename.localeCompare(b.filename));

		let indexContent = "";

		if (chunks.length >= 1) {
			const sitemapTags = chunks
				.map((chunk) => {
					const sitemapUrl = `${mergedConfig.baseUrl}/sitemap/${chunk.filename}`;
					return `<sitemap>
					<loc>${sitemapUrl}</loc>
					<lastmod>${formatDate(chunk.lastModified)}</lastmod>
					</sitemap>`;
								})
								.join("\n");

			indexContent = `${getSitemapIndexHeader()}\n${sitemapTags}\n${getSitemapIndexFooter()}`;
		} else {
			// No entries, create an empty sitemap
			indexContent = `${getSitemapHeader(mergedConfig.customNamespaces)}\n${getSitemapFooter()}`;
		}

		// Update robots.txt if needed
		if (mergedConfig.updateRobotsTxt && mergedConfig.robotsTxtPath) {
			const sitemapUrl = `${mergedConfig.baseUrl}/sitemap.xml`;
			await updateRobotsTxt(mergedConfig.robotsTxtPath, sitemapUrl);
		}

		// Return result
		return indexContent;
	} catch (error) {
		if (error instanceof SitemapValidationError) {
			throw error;
		} else {
			throw new Error(
				`Failed to generate sitemaps: ${error instanceof Error ? error.message : String(error)}`
			);
		}
	}
}

/**
 * Generates sitemaps from a list of entries
 * @param entries The entries to generate sitemaps for
 * @param config The configuration options
 * @returns The result of the generation process
 * @throws {SitemapValidationError} If any entry is invalid
 */
export async function generateSitemapIndividual(
	entries: SitemapEntry[],
	config: SitemapConfig,
	pageNumber: number
): Promise<string> {
	try {
		// Merge with default config
		const mergedConfig: SitemapConfig = { ...DEFAULT_CONFIG, ...config };

		// Validate entries
		validateSitemapEntries(entries);

		// Sort entries alphabetically by URL
		const sortedEntries = [...entries].sort((a, b) => a.urlSlug.localeCompare(b.urlSlug));

		// Chunk entries
		const chunkSize = mergedConfig.chunkSize || 5000;
		const entryChunks = paginateEntries(sortedEntries, pageNumber, chunkSize);

		// Generate sitemap chunks
		const urlTags = entryChunks
			.map((entry) => buildUrlTag(entry, mergedConfig.baseUrl))
			.join("\n");
		// Generate sitemap content
		const sitemapContent = `${getSitemapHeader(
			mergedConfig.customNamespaces
		)}\n${urlTags}\n${getSitemapFooter()}`;

		// Return result
		return sitemapContent
	} catch (error) {
		if (error instanceof SitemapValidationError) {
			throw error;
		} else {
			throw new Error(
				`Failed to generate sitemaps: ${error instanceof Error ? error.message : String(error)}`
			);
		}
	}
}


/**
 * Fetches sitemap XML content from the source URL with caching
 * @param path The path of the sitemap to fetch (e.g., 'sitemap.xml', 'sitemap1.xml')
 * @param baseUrl The base URL to use for replacing URLs
 * @param isMainSitemap Whether this is the main sitemap that needs URL replacement
 * @returns Response object with XML content and appropriate headers
 */
export async function fetchSitemapXml(path: string, baseUrl?: string, isMainSitemap = false) {
	try {
		// Get the source domain from environment variable
		const sourceDomain = process.env.SITEMAP_SOURCE_DOMAIN;

		// Validate that the environment variable is set
		if (!sourceDomain) {
			throw new Error("SITEMAP_SOURCE_DOMAIN environment variable is not set");
		}

		// Get cache duration from environment variable or default to 1 day (86400 seconds)
		const cacheDurationSeconds = process.env.SITEMAP_CACHE_DURATION_SECONDS
			? Number.parseInt(process.env.SITEMAP_CACHE_DURATION_SECONDS, 10)
			: 86400;

		// Construct the full URL to fetch from
		const sourceUrl = `${sourceDomain}/${path}`;

		// Fetch the sitemap from the source with configurable cache duration
		const response = await fetch(sourceUrl, {
			next: {
				revalidate: cacheDurationSeconds,
				tags: [SITEMAP_CACHE_TAG, `sitemap:${path}`], // Tags for targeted revalidation
			},
		} as NextFetchRequestConfig);

		if (!response.ok) {
			throw new Error(`Failed to fetch sitemap ${path}: ${response.status}`);
		}

		// Get the XML content
		let xmlContent = await response.text();

		// Transform the XML content if a base URL is provided
		if (baseUrl) {
			xmlContent = transformSitemapXml(xmlContent, sourceDomain, baseUrl, isMainSitemap);
		}

		// Return the XML content with the correct content type and cache headers
		return new Response(xmlContent, {
			headers: {
				"Content-Type": "application/xml",
				"Cache-Control": `public, max-age=${cacheDurationSeconds}, s-maxage=${cacheDurationSeconds}`,
			},
		});
	} catch (error: unknown) {
		console.error(`Error fetching sitemap ${path}:`, error);
		return new Response(
			`Error fetching sitemap: ${error instanceof Error ? error.message : "Unknown error"}`,
			{
				status: 500,
				headers: {
					"Content-Type": "text/plain",
					"Cache-Control": "no-store", // Don't cache errors
				},
			}
		);
	}
}
