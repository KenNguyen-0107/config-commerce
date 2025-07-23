import type { SitemapEntry, ChangeFrequency, AlternateLanguages, ImageEntry, VideoEntry } from "./types";
import * as fs from "fs";
import { promisify } from "util";
import * as zlib from "zlib";
import * as path from "path";

const writeFileAsync = promisify(fs.writeFile);

/**
 * Divides an array into smaller arrays of a specified size
 * @param entries The array to divide
 * @param chunkSize The maximum size of each chunk
 * @returns An array of chunks
 */
export function chunkEntries<T>(entries: T[], chunkSize: number): T[][] {
	if (chunkSize <= 0) {
		throw new Error("Chunk size must be greater than 0");
	}

	const chunks: T[][] = [];
	for (let i = 0; i < entries.length; i += chunkSize) {
		chunks.push(entries.slice(i, i + chunkSize));
	}
	return chunks;
}

/**
 * Paginates an array of entries
 * @param entries The array to paginate
 * @param pageNumber The page number (starting from 1)
 * @param pageSize The size of each page
 * @returns The paginated entries
 */
export function paginateEntries<T>(
  entries: T[],
  pageNumber: number = 1,
  pageSize: number = 10
): T[] {
  if (pageNumber < 1) {
    throw new Error(`Page number must be ≥ 1 (got ${pageNumber})`);
  }
  if (pageSize < 1) {
    throw new Error(`Page size must be ≥ 1 (got ${pageSize})`);
  }

  const startIndex = (pageNumber - 1) * pageSize;
  return entries.slice(startIndex, startIndex + pageSize);
}

/**
 * Escapes XML special characters
 * @param unsafe The string to escape
 * @returns The escaped string
 */
export function escapeXml(unsafe: string): string {
	return unsafe
	.replace(/&amp;/g, '&') // decode &amp; to & first to avoid double encoding
	.replace(/&/g, '&amp;')
	.replace(/'/g, '&apos;')
	.replace(/"/g, '&quot;')
	.replace(/>/g, '&gt;')
	.replace(/</g, '&lt;');
}

/**
 * Formats a boolean value for XML
 * @param value The boolean value to format
 * @returns The string "yes" or "no"
 */
export function formatBoolean(value: boolean): string {
	return value ? "yes" : "no";
}

/**
 * Gets the current date in ISO format
 * @returns The current date in ISO format
 */
export function getCurrentDate(): string {
	return new Date().toISOString();
}

/**
 * Formats a date for sitemap lastmod (YYYY-MM-DD)
 * @param date The date to format
 * @returns The formatted date
 */
export function formatDate(date: string | Date): string {
	const d = typeof date === "string" ? new Date(date) : date;
	return d.toISOString().split("T")[0];
}

/**
 * Validates that a string is a valid change frequency
 * @param frequency The frequency to validate
 * @returns Whether the frequency is valid
 */
export function isValidChangeFrequency(frequency: string): frequency is ChangeFrequency {
	const validFrequencies: ChangeFrequency[] = [
		"always",
		"hourly",
		"daily",
		"weekly",
		"monthly",
		"yearly",
		"never",
	];
	return validFrequencies.includes(frequency.toLowerCase() as ChangeFrequency);
}

/**
 * Validates that a string is a valid priority
 * @param priority The priority to validate
 * @returns Whether the priority is valid
 */
export function isValidPriority(priority: string): boolean {
	const num = Number.parseFloat(priority);
	return !isNaN(num) && num >= 0 && num <= 1;
}

/**
 * Validates that a string is a valid date
 * @param date The date to validate
 * @returns Whether the date is valid
 */
export function isValidDate(date: string): boolean {
	try {
		new Date(date);
		return true;
	} catch {
		return false;
	}
}

// XML Generation Functions

/**
 * Builds XML for alternate language versions of a page
 * @param alternates The alternates object containing language mappings
 * @returns The XML for alternates as a string
 */
export function buildAlternatesXml(alternates?: AlternateLanguages): string {
	if (!alternates || !alternates.languages) {
		return "";
	}

	return Object.entries(alternates.languages)
		.map(([lang, url]) => {
			return `<xhtml:link rel="alternate" hreflang="${escapeXml(lang)}" href="${escapeXml(
				url
			)}"/>`;
		})
		.join("\n");
}

/**
 * Builds XML for images associated with a page
 * @param images Array of image objects
 * @returns The XML for images as a string
 */
export function buildImagesXml(images?: ImageEntry[]): string {
	if (!images || images.length === 0) {
		return "";
	}

	return images
		.map((image) => {
			let imageXml = `<image:image>\n<image:loc>${escapeXml(image.loc)}</image:loc>`;

			if (image.caption) {
				imageXml += `\n<image:caption>${escapeXml(image.caption)}</image:caption>`;
			}

			if (image.title) {
				imageXml += `\n<image:title>${escapeXml(image.title)}</image:title>`;
			}

			imageXml += "\n</image:image>";
			return imageXml;
		})
		.join("\n");
}

/**
 * Builds XML for videos associated with a page
 * @param videos Array of video objects
 * @returns The XML for videos as a string
 */
export function buildVideosXml(videos?: VideoEntry[]): string {
	if (!videos || videos.length === 0) {
		return "";
	}

	return videos
		.map((video) => {
			// Determine thumbnail_loc correctly based on whether it's a string or an object with href
			const thumbnailLoc = typeof video.thumbnail_loc === 'string' 
				? video.thumbnail_loc 
				: video.thumbnail_loc.href;
			
			// Handle other location properties similarly
			const contentLoc = video.content_loc && (typeof video.content_loc === 'string' 
				? video.content_loc 
				: video.content_loc.href);
			
			const playerLoc = video.player_loc && (typeof video.player_loc === 'string' 
				? video.player_loc 
				: video.player_loc.href);
			
			// Create an array of XML tags and filter out any undefined/null values
			const videoTags = [
				`<video:video>`,
				`<video:title>${escapeXml(video.title)}</video:title>`,
				`<video:thumbnail_loc>${escapeXml(thumbnailLoc)}</video:thumbnail_loc>`,
				`<video:description>${escapeXml(video.description)}</video:description>`,
				contentLoc && `<video:content_loc>${escapeXml(contentLoc)}</video:content_loc>`,
				playerLoc && `<video:player_loc>${escapeXml(playerLoc)}</video:player_loc>`,
				video.duration !== undefined && `<video:duration>${video.duration}</video:duration>`,
				video.view_count !== undefined && `<video:view_count>${video.view_count}</video:view_count>`,
				video.tag && `<video:tag>${escapeXml(video.tag)}</video:tag>`,
				video.rating !== undefined && `<video:rating>${video.rating.toFixed(1).replace(",", ".")}</video:rating>`,
				video.expiration_date && `<video:expiration_date>${formatDate(video.expiration_date)}</video:expiration_date>`,
				video.publication_date && `<video:publication_date>${formatDate(video.publication_date)}</video:publication_date>`,
				video.family_friendly !== undefined && `<video:family_friendly>${formatBoolean(video.family_friendly)}</video:family_friendly>`,
				video.requires_subscription !== undefined && `<video:requires_subscription>${formatBoolean(video.requires_subscription)}</video:requires_subscription>`,
				video.live !== undefined && `<video:live>${formatBoolean(video.live)}</video:live>`,
				video.restriction && `<video:restriction relationship="${escapeXml(video.restriction.relationship)}">${escapeXml(video.restriction.content)}</video:restriction>`,
				video.platform && `<video:platform relationship="${escapeXml(video.platform.relationship)}">${escapeXml(video.platform.content)}</video:platform>`,
				video.uploader && `<video:uploader${video.uploader.info ? ` info="${escapeXml(video.uploader.info)}"` : ""}>${escapeXml(video.uploader.name)}</video:uploader>`,
				`</video:video>`
			].filter(Boolean).join('\n');
			
			return videoTags;
		})
		.join("\n");
}

/**
 * Builds a URL tag for a sitemap entry
 * @param entry The sitemap entry
 * @param baseUrl The base URL of the website
 * @returns The URL tag as a string
 */
export function buildUrlTag(entry: SitemapEntry, baseUrl: string): string {
	const fullUrl = entry.urlSlug.startsWith("http")
		? entry.urlSlug
		: `${baseUrl}/${entry.urlSlug.replace(/^\//, "")}`;

	const alternatesXml = buildAlternatesXml(entry.alternates);
	const imagesXml = buildImagesXml(entry.images);
	const videosXml = buildVideosXml(entry.videos);

	return `  <url>
    <loc>${escapeXml(fullUrl)}</loc>
    <lastmod>${entry.lastModified}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>${alternatesXml ? "\n" + alternatesXml : ""}${
		imagesXml ? "\n" + imagesXml : ""
	}${videosXml ? "\n" + videosXml : ""}
  </url>`;
}

// XML Header and Footer Functions

/**
 * Generates the XML header for a sitemap
 * @param customNamespaces Custom XML namespace declarations
 * @returns The XML header as a string
 */
export function getSitemapHeader(customNamespaces: Record<string, string> = {}): string {
	let namespaces = `xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"`;

	// Add image and video namespaces
	namespaces += `
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"`;

	// Add custom namespaces
	for (const [prefix, uri] of Object.entries(customNamespaces)) {
		namespaces += `\n  xmlns:${prefix}="${uri}"`;
	}

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  ${namespaces}>`;
}

/**
 * Generates the XML footer for a sitemap
 * @returns The XML footer as a string
 */
export function getSitemapFooter(): string {
	return "</urlset>";
}

/**
 * Generates the XML header for a sitemap index
 * @returns The XML header as a string
 */
export function getSitemapIndexHeader(): string {
	return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
}

/**
 * Generates the XML footer for a sitemap index
 * @returns The XML footer as a string
 */
export function getSitemapIndexFooter(): string {
	return "</sitemapindex>";
}

// File System Operations

/**
 * Updates robots.txt to include sitemap reference
 * @param robotsTxtPath The path to robots.txt
 * @param sitemapUrl The URL of the sitemap
 */
export async function updateRobotsTxt(robotsTxtPath: string, sitemapUrl: string): Promise<void> {
	try {
		let content = "";

		if (fs.existsSync(robotsTxtPath)) {
			content = fs.readFileSync(robotsTxtPath, "utf-8");

			// Remove existing Sitemap entries
			content = content.replace(/^Sitemap:.*$/gm, "");
		}

		// Add new Sitemap entry
		content = `${content.trim()}\nSitemap: ${sitemapUrl}\n`;

		await writeFileAsync(robotsTxtPath, content);
	} catch (error) {
		throw new Error(
			`Failed to update robots.txt: ${error instanceof Error ? error.message : String(error)}`
		);
	}
}

/**
 * Transforms XML content by replacing URLs and removing query parameters
 * @param xmlContent The original XML content
 * @param sourceDomain The source domain to replace
 * @param targetBaseUrl The target base URL to use
 * @param isMainSitemap Whether this is the main sitemap
 * @returns The transformed XML content
 */
export function transformSitemapXml(
	xmlContent: string,
	sourceDomain: string,
	targetBaseUrl: string,
	isMainSitemap: boolean
): string {
	if (isMainSitemap) {
		// For main sitemap, replace sitemap URLs
		const sourceUrlPattern = new RegExp(`<loc>${sourceDomain}/sitemap(\\d+)\\.xml</loc>`, "g");
		return xmlContent.replace(
			sourceUrlPattern,
			`<loc>${targetBaseUrl}/sitemap/sitemap$1.xml</loc>`
		);
	} else {
		// For individual sitemaps, replace all URLs and remove query parameters

		// 1. Replace URLs in <loc> tags
		xmlContent = xmlContent.replace(
			new RegExp(`<loc>${sourceDomain}/([^<]*?)</loc>`, "g"),
			`<loc>${targetBaseUrl}/$1</loc>`
		);

		// 2. Replace URLs in href attributes with SetContextLanguageCode parameter
		// Extract the language code and include it in the path
		xmlContent = xmlContent.replace(
			new RegExp(`href="${sourceDomain}/([^"?]+)\\?SetContextLanguageCode=([^"&]+)"`, "g"),
			(match, path, langCode) => {
				return `href="${targetBaseUrl}/${langCode}/${path}"`;
			}
		);

		// 3. Replace remaining URLs in href attributes without query parameters
		xmlContent = xmlContent.replace(
			new RegExp(`href="${sourceDomain}/([^"]+)"`, "g"),
			`href="${targetBaseUrl}/$1"`
		);
		return xmlContent;
	}
}
