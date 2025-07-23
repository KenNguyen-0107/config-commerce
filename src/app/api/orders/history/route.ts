import { HttpMethod, proxyRequestWithCookies } from "@/app/api/clientApi";
import { API_BASE_URL, API_ENDPOINTS } from "@/app/config/api";
import { corsHeaders } from "@/app/utils/cors";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const searchParams = request.nextUrl.searchParams;
		const params = {
			customerSequence: searchParams.get("customerSequence") || "-1",
			sort: searchParams.get("sort") || "orderDate DESC,erpOrderNumber DESC,webOrderNumber DESC",
			pageSize: searchParams.get("pageSize") || "10",
			page: searchParams.get("page") || "1",
		};

		const queryString = new URLSearchParams(params).toString();
		const url = `${API_BASE_URL}${API_ENDPOINTS.getOrderHistory}?${queryString}`;
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

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
	return NextResponse.json({}, { headers: corsHeaders });
}
