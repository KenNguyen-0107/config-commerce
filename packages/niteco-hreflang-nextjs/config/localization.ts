/**
 * Defines the format strategy used for hreflang URLs
 * @value "segmentation" - Uses path segments for localization (e.g., example.com/en-us/page)
 * @value "domain" - Uses different domains for localization (e.g., example.co.uk, example.fr)
 * @value "subdomain" - Uses subdomains for localization (e.g., en.example.com, fr.example.com)
 */
export type LocalizationFormat = "segmentation" | "domain" | "subdomain";

/**
 * Configuration for a specific locale
 * @property code - The ISO language code (e.g., 'en-US', 'fr-FR')
 * @property domain - The domain to use for this locale when using domain-based localization
 * @property subdomain - The subdomain to use for this locale when using subdomain-based localization
 * @property segment - The path segment to use for this locale when using segmentation-based localization
 */
export interface LocaleConfig {
	code: string;
	domain?: string;
	subdomain?: string;
	segment?: string;
}

/**
 * Complete localization configuration
 * @property format - The localization format strategy to use
 * @property defaultLocale - The default locale code, typically 'x-default'
 * @property locales - Array of locale configurations
 */
export interface LocalizationConfig {
	format: LocalizationFormat;
	defaultLocale: string;
	locales: LocaleConfig[];
}

/**
 * Example localization configuration
 * This can be overridden by providing your own configuration
 */
export const localizationConfig: LocalizationConfig = {
	// Change this to switch between formats
	format: "segmentation",
	defaultLocale: "x-default",
	locales: [
		{
			code: "en-th",
			domain: "example.com",
			subdomain: "en.example.com",
			segment: "en-th",
		},
		{
			code: "th-th",
			domain: "example.co.th",
			subdomain: "th.example.com",
			segment: "th-th",
		},
		{
			code: "x-default",
			domain: "example.com",
			subdomain: "www.example.com",
			segment: "",
		},
	],
};
