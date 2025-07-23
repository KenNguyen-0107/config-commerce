# @niteco/seo-nextjs

A comprehensive SEO component library for Next.js applications, enabling proper meta tags and SEO optimization.

## Installation

```bash
npm install @niteco/seo-nextjs
# or
yarn add @niteco/seo-nextjs
```

## Features

- Default SEO configuration for your entire application
- Per-page SEO overrides
- Support for Open Graph metadata
- Support for Twitter cards
- Support for canonical URLs
- Support for language alternates
- Support for mobile alternates
- Fully typed with TypeScript

## Usage

### Default SEO Configuration

First, add the `DefaultSeo` component to your `_app.tsx` or `layout.tsx` to set default SEO values for all pages:

```jsx
// _app.tsx (for Pages Router)
import { DefaultSeo } from "@niteco/seo-nextjs";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<DefaultSeo
				title="My Website"
				titleTemplate="%s | My Website"
				description="This is my website description"
				canonical="https://www.mywebsite.com"
				openGraph={{
					type: "website",
					locale: "en_US",
					url: "https://www.mywebsite.com",
					siteName: "My Website",
					images: [
						{
							url: "https://www.mywebsite.com/images/og-image.jpg",
							width: 1200,
							height: 630,
							alt: "My Website",
						},
					],
				}}
				twitter={{
					handle: "@myhandle",
					site: "@mysite",
					cardType: "summary_large_image",
				}}
			/>
			<Component {...pageProps} />
		</>
	);
}
```

For Next.js App Router:

```jsx
// app/layout.tsx (for App Router)
import { DefaultSeo } from "@niteco/seo-nextjs";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<DefaultSeo
					title="My Website"
					titleTemplate="%s | My Website"
					description="This is my website description"
					canonical="https://www.mywebsite.com"
					openGraph={{
						type: "website",
						locale: "en_US",
						url: "https://www.mywebsite.com",
						siteName: "My Website",
						images: [
							{
								url: "https://www.mywebsite.com/images/og-image.jpg",
								width: 1200,
								height: 630,
								alt: "My Website",
							},
						],
					}}
					twitter={{
						handle: "@myhandle",
						site: "@mysite",
						cardType: "summary_large_image",
					}}
				/>
				{children}
			</body>
		</html>
	);
}
```

### Page-Specific SEO

Use the `NextSeo` component on individual pages to override or extend the default SEO settings:

```jsx
// pages/about.tsx (for Pages Router)
import { NextSeo } from "@niteco/seo-nextjs";

export default function AboutPage() {
	return (
		<>
			<NextSeo
				title="About Us"
				description="Learn more about our company"
				canonical="https://www.mywebsite.com/about"
				openGraph={{
					title: "About Us",
					description: "Learn more about our company",
					url: "https://www.mywebsite.com/about",
				}}
			/>
			<h1>About Us</h1>
			<p>This is the about page content...</p>
		</>
	);
}
```

For Next.js App Router:

```jsx
// app/about/page.tsx (for App Router)
import { NextSeo } from "@niteco/seo-nextjs";

export default function AboutPage() {
	return (
		<>
			<NextSeo
				title="About Us"
				description="Learn more about our company"
				canonical="https://www.mywebsite.com/about"
				openGraph={{
					title: "About Us",
					description: "Learn more about our company",
					url: "https://www.mywebsite.com/about",
				}}
			/>
			<h1>About Us</h1>
			<p>This is the about page content...</p>
		</>
	);
}
```

## Advanced Usage

### Language Alternates

Specify language alternates for internationalized websites:

```jsx
<NextSeo
	languageAlternates={[
		{
			hrefLang: "en",
			href: "https://www.mywebsite.com/en/page",
		},
		{
			hrefLang: "fr",
			href: "https://www.mywebsite.com/fr/page",
		},
		{
			hrefLang: "de",
			href: "https://www.mywebsite.com/de/page",
		},
	]}
/>
```

### Mobile Alternate

Specify a mobile-specific URL:

```jsx
<NextSeo
	mobileAlternate={{
		media: "only screen and (max-width: 640px)",
		href: "https://m.mywebsite.com/page",
	}}
/>
```

### Additional Meta Tags

Add custom meta tags:

```jsx
<NextSeo
	additionalMetaTags={[
		{
			name: "viewport",
			content: "width=device-width, initial-scale=1",
		},
		{
			name: "theme-color",
			content: "#ffffff",
		},
		{
			property: "dc:creator",
			content: "John Doe",
		},
	]}
/>
```

### Additional Link Tags

Add custom link tags:

```jsx
<NextSeo
	additionalLinkTags={[
		{
			rel: "icon",
			href: "/favicon.ico",
		},
		{
			rel: "apple-touch-icon",
			href: "/apple-touch-icon.png",
			sizes: "180x180",
		},
		{
			rel: "manifest",
			href: "/manifest.json",
		},
	]}
/>
```

## API Reference

### DefaultSeo Props

| Property           | Type                             | Description                                        |
| ------------------ | -------------------------------- | -------------------------------------------------- |
| title              | string                           | Default title for all pages                        |
| titleTemplate      | string                           | Template for page titles (e.g., "%s - My Website") |
| defaultTitle       | string                           | Default title to use when no title is specified    |
| description        | string                           | Default meta description                           |
| canonical          | string                           | Canonical URL                                      |
| noindex            | boolean                          | Whether to add noindex meta tag                    |
| nofollow           | boolean                          | Whether to add nofollow meta tag                   |
| themeColor         | string                           | Theme color for browser UI                         |
| openGraph          | OpenGraph                        | Open Graph metadata                                |
| twitter            | Twitter                          | Twitter card metadata                              |
| facebook           | { appId: string }                | Facebook app ID                                    |
| mobileAlternate    | MobileAlternate                  | Mobile alternate URL                               |
| languageAlternates | ReadonlyArray<LanguageAlternate> | Language alternate URLs                            |
| additionalMetaTags | ReadonlyArray<MetaTag>           | Additional meta tags                               |
| additionalLinkTags | ReadonlyArray<LinkTag>           | Additional link tags                               |

### NextSeo Props

Same as DefaultSeo props but applied only to the specific page where NextSeo is used.

## License
