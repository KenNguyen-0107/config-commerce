// Export components
export { default as HreflangTags } from "./components/metadata-hreflang";

// Export services
export {
	generateHreflangUrl,
	generateHreflangLinks,
	generateFilteredHreflangLinks,
} from "./services/hreflang-service";

// Export types
export type { HreflangLink } from "./types/hreflang";
export type { LocalizationFormat, LocaleConfig, LocalizationConfig } from "./config/localization";

// Export default config
export { localizationConfig } from "./config/localization";
