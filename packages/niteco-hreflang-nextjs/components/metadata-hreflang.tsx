import React from "react";
import { localizationConfig, type LocalizationConfig } from "../config/localization";
import { generateHreflangLinks, generateFilteredHreflangLinks } from "../services/hreflang-service";
import type { HreflangLink } from "../types/hreflang";

/**
 * Props for the HreflangTags component
 *
 * @property languageCodes - Optional array of language codes to filter by
 * @property urlSlug - URL path/slug for the current page (without leading/trailing slashes)
 * @property config - Optional localization config (uses default if not provided)
 */
export interface HreflangTagsProps {
	languageCodes?: string[];
	urlSlug: string;
	config?: LocalizationConfig;
}

/**
 * React component that renders hreflang link tags for SEO
 * These tags help search engines understand the language versions of your pages
 *
 * @example
 * // Basic usage
 * <HreflangTags urlSlug="products/featured" config={myConfig} />
 *
 * @example
 * // With filtered languages
 * <HreflangTags
 *   urlSlug="about-us"
 *   languageCodes={["en-us", "fr-fr"]}
 *   config={myConfig}
 * />
 *
 * @param props - Component props
 * @returns JSX element with hreflang link tags
 */
export default function HreflangTags({
	languageCodes,
	urlSlug,
	config = localizationConfig,
}: HreflangTagsProps): React.JSX.Element {
	// Generate hreflang links based on whether languageCodes are provided
	const hreflangLinks: HreflangLink[] = languageCodes?.length
		? generateFilteredHreflangLinks(languageCodes, urlSlug, config)
		: generateHreflangLinks(config, urlSlug);

	// Only render if we have links
	if (hreflangLinks.length === 0) {
		return <></>;
	}

	return (
		<>
			{hreflangLinks.map((link) => (
				<link key={link.hreflang} rel="alternate" href={link.url} hrefLang={link.hreflang} />
			))}
		</>
	);
}
