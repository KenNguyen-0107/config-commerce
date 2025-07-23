// Use dynamic import to bypass the Next.js module parsing issue
export async function POST(request: Request) {
	// Dynamically import the module at runtime
	const { createRevalidationHandler } = await import(
		"../../../../packages/niteco-sitemap-nextjs/next-integration"
	);

	// Call the handler function with the request
	const handler = createRevalidationHandler();
	return handler(request);
}
