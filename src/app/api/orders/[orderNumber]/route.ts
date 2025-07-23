import { HttpMethod, proxyRequestWithCookies } from "@/app/api/clientApi";
import { API_BASE_URL, API_ENDPOINTS } from "@/app/config/api";
import { corsHeaders } from "@/app/utils/cors";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: { params: { orderNumber: string } }) {
	try {
		const params = await Promise.resolve(context.params);
		const orderNumber = params.orderNumber;
		const url = `${API_BASE_URL}${API_ENDPOINTS.getOrderHistory}/${orderNumber}?expand=orderLines%2Cshipments`;
		// Forward cookies to the external API
		const { response } = await proxyRequestWithCookies(request, url, {
			method: HttpMethod.GET,
			forwardResponseCookies: true,
			forwardRequestCookies: true,
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

export async function PATCH(request: NextRequest, context: { params: { orderNumber: string } }) {
	try {
		const params = await Promise.resolve(context.params);
		const orderNumber = params.orderNumber;
		const requestBody = await request.json();
		const url = `${API_BASE_URL}${API_ENDPOINTS.getOrderHistory}/${orderNumber}`;
		// Forward cookies to the external API
		const { response } = await proxyRequestWithCookies(request, url, {
			method: HttpMethod.PATCH,
			forwardResponseCookies: true,
			forwardRequestCookies: true,
			body: requestBody,
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
// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
	return NextResponse.json({}, { headers: corsHeaders });
}
