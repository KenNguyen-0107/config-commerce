# @niteco/jsonld-nextjs

This package provides JSON-LD components for Next.js applications, enabling structured data for SEO optimization.

Google has excellent content on JSON-LD -> [HERE](https://developers.google.com/search/docs/data-types/article)

## Installation

```bash
npm install @niteco/jsonld-nextjs
# or
yarn add @niteco/jsonld-nextjs
```

## Usage

Import the desired JSON-LD component and use it in your Next.js pages:

### Product

```jsx
import { ProductJsonLd } from "@niteco/jsonld-nextjs";

const Page = () => (
	<>
		<h1>Product JSON-LD</h1>
		<ProductJsonLd
			productName="Executive Anvil"
			images={[
				"https://example.com/photos/1x1/photo.jpg",
				"https://example.com/photos/4x3/photo.jpg",
				"https://example.com/photos/16x9/photo.jpg",
			]}
			description="Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height."
			brand="ACME"
			color="blue"
			manufacturerName="Gary Meehan"
			manufacturerLogo="https://www.example.com/photos/logo.jpg"
			material="steel"
			slogan="For the business traveller looking for something to drop from a height."
			disambiguatingDescription="Executive Anvil, perfect for the business traveller."
			releaseDate="2014-02-05T08:00:00+08:00"
			productionDate="2015-02-05T08:00:00+08:00"
			purchaseDate="2015-02-06T08:00:00+08:00"
			award="Best Executive Anvil Award."
			reviews={[
				{
					author: "Jim",
					datePublished: "2017-01-06T03:37:40Z",
					reviewBody:
						"This is my favorite product yet! Thanks Nate for the example products and reviews.",
					name: "So awesome!!!",
					reviewRating: {
						bestRating: "5",
						ratingValue: "5",
						worstRating: "1",
					},
					publisher: {
						type: "Organization",
						name: "TwoVit",
					},
				},
			]}
			aggregateRating={{
				ratingValue: "4.4",
				reviewCount: "89",
			}}
			offers={[
				{
					price: "119.99",
					priceCurrency: "USD",
					priceValidUntil: "2020-11-05",
					itemCondition: "https://schema.org/UsedCondition",
					availability: "https://schema.org/InStock",
					url: "https://www.example.com/executive-anvil",
					seller: {
						name: "Executive Objects",
					},
				},
				{
					price: "139.99",
					priceCurrency: "CAD",
					priceValidUntil: "2020-09-05",
					itemCondition: "https://schema.org/UsedCondition",
					availability: "https://schema.org/InStock",
					url: "https://www.example.ca/executive-anvil",
					seller: {
						name: "Executive Objects",
					},
				},
			]}
			mpn="925872"
		/>
	</>
);

export default Page;
```

## Component Flexibility

The JSON-LD components in this package are designed to be flexible in how structured data can be provided:

1. You can pass any schema.org properties directly as props to the component without requiring explicit prop definitions for each possible property. The `[key: string]: any;` index signature enables this feature by allowing any valid schema.org properties to be passed.

2. For more complex scenarios, you can use the `dataArray` prop to pass pre-formatted structured data arrays.

This dual approach allows for simple use cases with individual props while supporting complex structured data when needed.

### Example: Using Direct Props

```jsx
import { JsonLd } from "@niteco/jsonld-nextjs";

const Page = () => (
	<>
		<JsonLd
			type="Product"
			name="Executive Anvil"
			description="Sleeker than ACME's Classic Anvil"
			image="https://example.com/photos/1x1/photo.jpg"
			// Passing schema.org properties directly as props
			brand={{
				"@type": "Brand",
				name: "ACME",
			}}
			// Even properties not explicitly defined in the component
			offers={{
				"@type": "Offer",
				price: "119.99",
				priceCurrency: "USD",
			}}
		/>
	</>
);
```

### Example: Arbitrary Schema.org Properties with Index Signature

```jsx
import { JsonLd } from "@niteco/jsonld-nextjs";

const Page = () => (
	<>
		{/* The [key: string]: any; index signature allows passing any valid schema.org properties */}
		<JsonLd
			type="Product"
			name="Executive Anvil"
			// Standard properties you'd expect
			description="Sleeker than ACME's Classic Anvil"
			image="https://example.com/photos/1x1/photo.jpg"
			// These properties below are not explicitly defined in the component's interface
			// but are accepted thanks to the [key: string]: any; index signature
			countryOfOrigin="USA"
			height="12 inches"
			weight="5 kg"
			color="Silver"
			material="Steel"
			award="Best Executive Anvil Award"
			manufacturer={{
				"@type": "Organization",
				name: "ACME Inc.",
				foundingDate: "1950",
			}}
			productionDate="2023-04-15"
			purchaseDate="2023-05-20"
			releaseDate="2023-04-01"
			category="Office Equipment"
			additionalProperty={[
				{
					"@type": "PropertyValue",
					name: "Surface Finish",
					value: "Polished",
				},
				{
					"@type": "PropertyValue",
					name: "Warranty Period",
					value: "2 years",
				},
			]}
		/>
	</>
);
```

### Example: Using dataArray for Complex Structures

```jsx
import { JsonLd } from "@niteco/jsonld-nextjs";

// Example for product variants based on Google's documentation
const productVariantsData = [
	{
		"@context": "https://schema.org/",
		"@type": "Product",
		name: "Executive Anvil",
		image: "https://example.com/anvil_executive.jpg",
		description: "Sleeker than ACME's Classic Anvil",
		sku: "0446310786",
		mpn: "925872",
		brand: {
			"@type": "Brand",
			name: "ACME",
		},
		offers: {
			"@type": "Offer",
			url: "https://example.com/anvil_executive",
			priceCurrency: "USD",
			price: "119.99",
			itemCondition: "https://schema.org/NewCondition",
			availability: "https://schema.org/InStock",
		},
		aggregateRating: {
			"@type": "AggregateRating",
			ratingValue: "4.4",
			reviewCount: "89",
		},
	},
];

const Page = () => (
	<>
		<JsonLd type="Product" dataArray={productVariantsData} />
	</>
);
```

## Available Components

The package provides a variety of JSON-LD components for different schemas:

- ArticleJsonLd
- BrandJsonLd
- BreadcrumbJsonLd
- CampgroundJsonLd
- CarouselJsonLd
- CollectionPageJsonLd
- CorporateContactJsonLd
- CourseJsonLd
- DatasetJsonLd
- EventJsonLd
- FAQPageJsonLd
- HowToJsonLd
- ImageJsonLd
- JobPostingJsonLd
- LocalBusinessJsonLd
- LogoJsonLd
- NewsArticleJsonLd
- OrganizationJsonLd
- ParkJsonLd
- ProductJsonLd
- ProfilePageJsonLd
- QAPageJsonLd
- RecipeJsonLd
- SiteLinksSearchBoxJsonLd
- SocialProfileJsonLd
- SoftwareAppJsonLd
- VideoGameJsonLd
- VideoJsonLd
- WebPageJsonLd

## Development

### Code Organization

- `src/jsonld/`: Contains all the JSON-LD component implementations
- `src/utils/`: Contains utility functions and schema helper functions
- `src/types.ts`: TypeScript types for all components
- `src/index.tsx`: Main export file

### Coding Conventions

1. Use relative imports for all files
2. Follow TypeScript best practices with proper typing
3. Use function components for all React components
4. Keep components simple and focused on their specific schema

**Note on app directory**

This note is only relevant if using the `app` directory.

For JSON-LD then, the only change needed is to add `useAppDir={true}` to the JSON-LD component in use. You should use this component in your `page.js` and NOT your `head.js`.

```jsx
<ArticleJsonLd
	useAppDir={true}
	url="https://example.com/article"
	title="Article headline" {/* <- required for app directory */}
/>
```

## License

Niteco

## Contributing & Publishing

### Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Run tests: `npm test`
4. Build the package: `npm run build`

### Testing

The package uses Jest for testing. Run tests with:

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage
```

### Publishing to npm

To publish a new version to npm:

1. Make sure all your changes are committed
2. Run the publish script: `npm run publish:npm`
3. Follow the prompts to select version type (patch, minor, or major)
4. Confirm publishing

The script will:

- Run tests
- Build the package
- Bump the version
- Create a git tag
- Publish to npm
- Optionally push tags to the remote repository
