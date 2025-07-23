/**
 * Represents a hreflang link for SEO optimization
 * @property url - The full URL for the alternate language version
 * @property hreflang - The language code in ISO format (e.g., 'en-US', 'fr-FR', 'x-default')
 */
export interface HreflangLink {
	url: string;
	hreflang: string;
}

/**
 * Represents a HTML link element attributes for hreflang
 * @property href - The URL for the alternate language version
 * @property hreflang - The language code in ISO format
 * @property rel - The relationship type, always 'alternate' for hreflang
 */
export interface HreflangLinkAttributes {
	href: string;
	hreflang: string;
	rel: "alternate";
}
