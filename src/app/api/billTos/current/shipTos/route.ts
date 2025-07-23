import { HttpMethod, proxyRequestWithCookies } from "@/app/api/clientApi";
import { API_BASE_URL, API_ENDPOINTS } from "@/app/config/api";
import { corsHeaders } from "@/app/utils/cors";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const searchParams = request.nextUrl.searchParams;
		const urlParams = searchParams.toString();
		const baseUrl = `${API_BASE_URL}${API_ENDPOINTS.currentShipTo}`;
		const url = urlParams ? `${baseUrl}?${urlParams}` : baseUrl;

		// Forward cookies to the external API
		const { response } = await proxyRequestWithCookies(request, url, {
			method: HttpMethod.GET,
			forwardResponseCookies: true, // Automatically forward cookies
			forwardRequestCookies: true, // Forward cookies from API to client
		});

		return response;
	} catch (error) {
		console.error("Proxy request error:", error);
		return NextResponse.json(
			{
				error: "Failed to fetch from external API",
				details: error instanceof Error ? error.message : "Unknown error",
			},
			{
				status: 500,
				headers: corsHeaders,
			}
		);
	}
}
