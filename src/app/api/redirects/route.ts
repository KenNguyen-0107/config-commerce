import { corsHeaders } from "@/app/utils/cors";
import { type NextRequest, NextResponse } from "next/server";

// Simple in-memory cache for demonstration
// In production, you might want to use Redis or another persistent cache
const redirectCache: Record<string, string> = {};

// Update the POST function to handle the new body structure
export async function GET(request: NextRequest) {
	try {
		const body = await request.json();

		// Store the user data in the cache
		if (body.name) {
			redirectCache[body.name] = JSON.stringify(body);
		}

		// Return success response with the payload and CORS headers
		return NextResponse.json(
			{
				status: 200,
				message: "Success",
				payload: body,
			},
			{
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "POST, GET, OPTIONS",
					"Access-Control-Allow-Headers": "Content-Type",
					"X-API-Key": process.env.REDIRECT_API_KEY || "",
				},
			}
		);
	} catch (error) {
		console.error("Error storing user data:", error);
		return NextResponse.json(
			{ error: "Failed to store user data" },
			{
				status: 500,
				headers: corsHeaders,
			}
		);
	}
}
