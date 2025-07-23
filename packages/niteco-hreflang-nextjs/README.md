# Niteco Hreflang for Next.js

A flexible and type-safe implementation of hreflang tags for Next.js applications. This package helps you implement proper SEO for multilingual websites by generating the correct `<link rel="alternate" hreflang="x">` tags.

## Features

- 🌍 Support for three localization strategies: URL path segments, subdomains, and domains
- 🚀 Fully compatible with Next.js 13+ (App Router and Pages Router)
- 💪 Written in TypeScript with full type safety
- 🧩 Flexible configuration to match your specific implementation
- 🔄 Support for filtering locales for specific pages
- 🛠️ Simple utility functions for URL generation and manipulation

## Installation

```bash
npm install @niteco/hreflang-nextjs
# or
yarn add @niteco/hreflang-nextjs
# or
pnpm add @niteco/hreflang-nextjs
```

## Basic Usage

### 1. Define your localization configuration

You can define your configuration directly in your code or fetch it from your backend:

```typescript
import { LocalizationConfig } from "@niteco/hreflang-nextjs";

// Example configuration structure
const localizationConfig: LocalizationConfig = {
	format: "segmentation", // or "domain" or "subdomain"
	defaultLocale: "x-default",
	locales: [
		{
			code: "en-us",
			domain: "example.com",
			subdomain: "en.example.com",
			segment: "en-us",
		},
		{
			code: "fr-fr",
			domain: "example.fr",
			subdomain: "fr.example.com",
			segment: "fr-fr",
		},
		{
			code: "x-default",
			domain: "example.com",
			subdomain: "www.example.com",
			segment: "",
		},
	],
};
```

### 2. Use in your Next.js application

#### Next.js App Router with Metadata API (Recommended)

For Next.js App Router, the recommended approach is to use the built-in metadata API:

```tsx
// app/layout.tsx or app/[locale]/layout.tsx
import { generateHreflangLinks } from "@niteco/hreflang-nextjs";

// Fetch localization config from backend
async function getLocalizationConfig() {
	// Mock API call to get config from backend
	// In a real app, you would fetch this from your API
	return {
		format: "segmentation",
		defaultLocale: "x-default",
		locales: [
			{
				code: "en-us",
				domain: "example.com",
				subdomain: "en.example.com",
				segment: "en-us",
			},
			{
				code: "fr-fr",
				domain: "example.fr",
				subdomain: "fr.example.com",
				segment: "fr-fr",
			},
			{
				code: "x-default",
				domain: "example.com",
				subdomain: "www.example.com",
				segment: "",
			},
		],
	};
}

export async function generateMetadata({ params }) {
	const { locale } = params || {};

	// Get config from backend
	const config = await getLocalizationConfig();

	// Generate hreflang links for the current path
	const urlPath = ""; // For homepage, or use a dynamic path
	const hreflangLinks = generateHreflangLinks(config, urlPath);

	// Convert to the format expected by Next.js metadata API
	const languages = {};
	hreflangLinks.forEach((link) => {
		languages[link.hreflang] = link.url;
	});

	return {
		// ... other metadata
		alternates: {
			languages,
		},
	};
}

export default function RootLayout({ children }) {
	return (
		<html>
			<body>{children}</body>
		</html>
	);
}
```

For dynamic pages:

```tsx
// app/[locale]/products/[slug]/page.tsx
import { generateHreflangLinks } from "@niteco/hreflang-nextjs";

// Fetch localization config from backend
async function getLocalizationConfig() {
	// Mock API call to get config from backend
	return {
		format: "segmentation",
		defaultLocale: "x-default",
		locales: [
			{
				code: "en-us",
				domain: "example.com",
				segment: "en-us",
			},
			{
				code: "fr-fr",
				domain: "example.com",
				segment: "fr-fr",
			},
		],
	};
}

export async function generateMetadata({ params }) {
	const { locale, slug } = params;

	// Get config from backend
	const config = await getLocalizationConfig();

	// Generate hreflang links for the product page
	const urlPath = `products/${slug}`;
	const hreflangLinks = generateHreflangLinks(config, urlPath);

	// Convert to the format expected by Next.js metadata API
	const languages = {};
	hreflangLinks.forEach((link) => {
		languages[link.hreflang] = link.url;
	});

	return {
		// ... other metadata
		alternates: {
			languages,
		},
	};
}

export default function ProductPage() {
	// Page content
}
```

#### Next.js App Router with HreflangTags Component

If you prefer using the component directly:

```tsx
// app/[locale]/layout.tsx
import { HreflangTags } from "@niteco/hreflang-nextjs";
import { useState, useEffect } from "react";

export default function Layout({ children, params }) {
	const { locale } = params || {};
	const [config, setConfig] = useState(null);

	useEffect(() => {
		// Fetch configuration from backend
		async function fetchConfig() {
			// Mock API call to get config from backend
			const data = {
				format: "segmentation",
				defaultLocale: "x-default",
				locales: [
					{
						code: "en-us",
						domain: "example.com",
						segment: "en-us",
					},
					{
						code: "fr-fr",
						domain: "example.com",
						segment: "fr-fr",
					},
				],
			};
			setConfig(data);
		}

		fetchConfig();
	}, []);

	if (!config) return null; // or loading state

	return (
		<html lang={locale}>
			<head>
				<HreflangTags urlSlug="" config={config} />
			</head>
			<body>{children}</body>
		</html>
	);
}
```

For specific pages with dynamic paths:

```tsx
// app/[locale]/products/[slug]/page.tsx
import { HreflangTags } from "@niteco/hreflang-nextjs";
import { useState, useEffect } from "react";

export default function ProductPage({ params }) {
	const { slug } = params;
	const [config, setConfig] = useState(null);

	useEffect(() => {
		// Fetch configuration from backend
		async function fetchConfig() {
			// Mock API call to backend
			const response = {
				format: "segmentation",
				defaultLocale: "x-default",
				locales: [
					{
						code: "en-us",
						domain: "example.com",
						segment: "en-us",
					},
					{
						code: "fr-fr",
						domain: "example.com",
						segment: "fr-fr",
					},
				],
			};
			setConfig(response);
		}

		fetchConfig();
	}, []);

	if (!config) return null; // or loading state

	return (
		<>
			<head>
				<HreflangTags urlSlug={`products/${slug}`} config={config} />
			</head>
			{/* Page content */}
		</>
	);
}
```

#### Next.js Pages Router

```tsx
// pages/[locale]/[[...slug]].tsx
import Head from "next/head";
import { HreflangTags } from "@niteco/hreflang-nextjs";
import { useState, useEffect } from "react";

export default function Page({ locale, slug }) {
	const urlPath = Array.isArray(slug) ? slug.join("/") : "";
	const [config, setConfig] = useState(null);

	useEffect(() => {
		// Fetch configuration from backend
		async function fetchConfig() {
			// Mock API call to backend
			const data = {
				format: "segmentation",
				defaultLocale: "x-default",
				locales: [
					{
						code: "en-us",
						domain: "example.com",
						segment: "en-us",
					},
					{
						code: "fr-fr",
						domain: "example.com",
						segment: "fr-fr",
					},
				],
			};
			setConfig(data);
		}

		fetchConfig();
	}, []);

	if (!config) return null; // or loading state

	return (
		<>
			<Head>
				<HreflangTags urlSlug={urlPath} config={config} />
			</Head>
			{/* Page content */}
		</>
	);
}
```

## Advanced Usage

### Filtering hreflang tags for specific pages

Sometimes you may want to limit which languages are shown for specific pages:

```tsx
// First fetch your config from backend
const config = await fetchConfigFromBackend();

// Then use it with filtered language codes
<HreflangTags
	urlSlug="contact-us"
	languageCodes={["en-us", "fr-fr"]} // Only include these languages
	config={config}
/>;
```

### Using the service functions directly

You can use the utility functions directly with your backend configuration:

```tsx
import {
	generateHreflangLinks,
	generateFilteredHreflangLinks,
	generateHreflangUrl,
	getLocaleByCode,
} from "@niteco/hreflang-nextjs";

// Fetch config from backend (mock example)
async function getLinks() {
	// Get config from backend
	const config = await fetchConfigFromBackend();

	// Generate links for all locales
	const allLinks = generateHreflangLinks(config, "products/featured");

	// Generate links for specific locales
	const filteredLinks = generateFilteredHreflangLinks(
		["en-us", "fr-fr"],
		"products/featured",
		config
	);

	// Generate a single URL for a specific locale
	const locale = getLocaleByCode(config, "en-us");
	if (locale) {
		const url = generateHreflangUrl(config, locale, "products/featured");
		console.log(url); // https://example.com/en-us/products/featured
	}
}
```

## Configuration Reference

### LocalizationConfig

The main configuration object for the package:

```typescript
interface LocalizationConfig {
	format: "segmentation" | "domain" | "subdomain";
	defaultLocale: string;
	locales: LocaleConfig[];
}
```

### LocaleConfig

Configuration for individual locales:

```typescript
interface LocaleConfig {
	code: string; // ISO language code (e.g., 'en-us', 'x-default')
	domain?: string; // Used with "domain" format (e.g., 'example.com')
	subdomain?: string; // Used with "subdomain" format (e.g., 'en.example.com')
	segment?: string; // Used with "segmentation" format (e.g., 'en-us')
}
```

### Localization Formats

- **segmentation**: Uses URL path segments (e.g., `example.com/en-us/products`)
- **domain**: Uses different domains for each locale (e.g., `example.com`, `example.fr`)
- **subdomain**: Uses subdomains for each locale (e.g., `en.example.com`, `fr.example.com`)

## Examples

### Path Segment Format

```typescript
// Example config (from backend or local)
const config = {
	format: "segmentation",
	defaultLocale: "en-us",
	locales: [
		{ code: "en-us", segment: "en-us", domain: "example.com" },
		{ code: "fr-fr", segment: "fr-fr", domain: "example.com" },
	],
};

// Generates:
// <link rel="alternate" href="https://example.com/en-us/products" hreflang="en-us" />
// <link rel="alternate" href="https://example.com/fr-fr/products" hreflang="fr-fr" />
```

### Domain Format

```typescript
// Example config (from backend or local)
const config = {
	format: "domain",
	defaultLocale: "en-us",
	locales: [
		{ code: "en-us", domain: "example.com" },
		{ code: "fr-fr", domain: "example.fr" },
	],
};

// Generates:
// <link rel="alternate" href="https://example.com/products" hreflang="en-us" />
// <link rel="alternate" href="https://example.fr/products" hreflang="fr-fr" />
```

### Subdomain Format

```typescript
// Example config (from backend or local)
const config = {
	format: "subdomain",
	defaultLocale: "en-us",
	locales: [
		{ code: "en-us", subdomain: "en.example.com" },
		{ code: "fr-fr", subdomain: "fr.example.com" },
	],
};

// Generates:
// <link rel="alternate" href="https://en.example.com/products" hreflang="en-us" />
// <link rel="alternate" href="https://fr.example.com/products" hreflang="fr-fr" />
```

## License

MIT
