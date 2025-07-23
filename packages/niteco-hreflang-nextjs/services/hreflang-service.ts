import type { LocalizationConfig, LocaleConfig } from "../config/localization";
import type { HreflangLink } from "../types/hreflang";

/**
 * Manages the generation of hreflang URLs and links for SEO optimization
 */

/**
 * Normalizes a URL slug by removing leading and trailing slashes
 *
 * @param urlSlug - The URL slug to normalize
 * @returns Normalized URL slug
 */
function normalizeUrlSlug(urlSlug: string): string {
	return urlSlug.replace(/^\/+|\/+$/g, "");
}

/**
 * Creates a complete URL with proper path handling
 *
 * @param domain - The domain or subdomain
 * @param pathSegments - Array of path segments to include
 * @returns Complete URL with properly joined path segments
 */
function buildUrl(domain: string, pathSegments: string[]): string {
	// Filter out empty segments
	const filteredSegments = pathSegments.filter((segment) => segment.length > 0);

	// Build the path with proper slashes
	const path = filteredSegments.length > 0 ? `/${filteredSegments.join("/")}` : "";

	return `https://${domain}${path}`;
}

/**
 * Generates a hreflang URL based on the localization format and locale config
 *
 * @param config - The localization configuration
 * @param locale - The locale configuration to generate the URL for
 * @param urlSlug - The URL slug/path (without leading or trailing slashes)
 * @returns The complete URL for the specified locale
 */
export function generateHreflangUrl(
	config: LocalizationConfig,
	locale: LocaleConfig,
	urlSlug: string
): string {
	// Ensure the URL slug doesn't have leading/trailing slashes
	const cleanSlug = normalizeUrlSlug(urlSlug);

	switch (config.format) {
		case "segmentation": {
			const baseUrl = locale.domain || "example.com";
			// Add segment to path if it exists
			return buildUrl(baseUrl, [locale.segment || "", cleanSlug]);
		}

		case "domain": {
			const baseDomain = locale.domain || "example.com";
			return buildUrl(baseDomain, [cleanSlug]);
		}

		case "subdomain": {
			const baseSubDomain = locale.subdomain || "example.com";
			return buildUrl(baseSubDomain, [cleanSlug]);
		}

		default:
			return buildUrl("example.com", [cleanSlug]);
	}
}

/**
 * Generates hreflang links for all locales in the config
 *
 * @param config - Localization configuration
 * @param urlSlug - The URL path/slug
 * @returns Array of HreflangLink objects
 */
export function generateHreflangLinks(config: LocalizationConfig, urlSlug: string): HreflangLink[] {
	return config.locales.map((locale) => ({
		url: generateHreflangUrl(config, locale, urlSlug),
		hreflang: locale.code,
	}));
}

/**
 * Generates hreflang links for specified language codes and URL slug
 *
 * @param languageCodes - Array of language codes to generate links for
 * @param urlSlug - The URL slug/path to use (without leading slash)
 * @param config - Localization configuration
 * @returns Array of HreflangLink objects
 */
export function generateFilteredHreflangLinks(
	languageCodes: string[],
	urlSlug: string,
	config: LocalizationConfig
): HreflangLink[] {
	// Filter locales by the provided language codes
	const filteredLocales = config.locales.filter((locale) => languageCodes.includes(locale.code));

	// Generate HreflangLink objects for each filtered locale
	return filteredLocales.map((locale) => ({
		url: generateHreflangUrl(config, locale, urlSlug),
		hreflang: locale.code,
	}));
}

/**
 * Gets a specific locale configuration by its code
 *
 * @param config - The localization configuration
 * @param localeCode - The locale code to find
 * @returns The locale configuration or undefined if not found
 */
export function getLocaleByCode(
	config: LocalizationConfig,
	localeCode: string
): LocaleConfig | undefined {
	return config.locales.find((locale) => locale.code === localeCode);
}

/**
 * Converts HreflangLink objects to HTML link elements attributes
 *
 * @param links - Array of HreflangLink objects
 * @returns Array of attributes ready to use in link elements
 */
export function getHreflangLinkAttributes(
	links: HreflangLink[]
): Array<{ href: string; hreflang: string; rel: "alternate" }> {
	return links.map((link) => ({
		href: link.url,
		hreflang: link.hreflang,
		rel: "alternate",
	}));
}
