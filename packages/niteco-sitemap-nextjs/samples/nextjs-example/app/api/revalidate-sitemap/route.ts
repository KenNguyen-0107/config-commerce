/**
 * Route handler for sitemap revalidation
 * 
 * This example uses dynamic imports to avoid Next.js module parsing issues.
 * This is especially useful when there are circular dependencies or when
 * the module is not compatible with the Edge Runtime.
 */

// Use dynamic import to bypass the Next.js module parsing issue
export async function POST(request: Request) {
	// Dynamically import the module at runtime
	const { createRevalidationHandler } = await import(
		"@niteco/sitemap-nextjs/next-integration"
	);

	// Call the handler function with the request
	const handler = createRevalidationHandler();
	return handler(request);
}

// Alternative: Use the built-in revalidation handler
// export const POST = createRevalidationHandler({
//   secret: process.env.REVALIDATION_TOKEN,
//   tag: SITEMAP_CACHE_TAG,
// }); 