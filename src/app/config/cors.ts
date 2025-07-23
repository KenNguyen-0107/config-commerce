// Helper function to parse comma-separated string to array
const parseAllowedOrigins = (origins = "") =>
	origins.split(",").filter((origin) => origin.trim().length > 0);

export const corsConfig = {
	// Get allowed origins from environment variable, fallback to development URL if not set
	allowedOrigins: parseAllowedOrigins(process.env.ALLOWED_ORIGINS) || [
		process.env.NODE_ENV === "development"
			? "http://localhost:3000"
			: "http://localhost:3000,https://jacksonsfencing-configcommerce-d-cl.niteco.dev,https://iwunis01sandboxaz.commerce.insitesandbox.com,https://niteco-saas-commerce.vercel.app",
	],
	options: {
		"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, PATCH",
		"Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With, Cookie",
		"Access-Control-Allow-Credentials": "true",
		"Access-Control-Max-Age": "86400", // 24 hours in seconds
	},
};
