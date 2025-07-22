import { NextRequest, NextResponse } from "next/server"
import { API_BASE_URL, API_ENDPOINTS } from "@/app/config/api"
import { corsHeaders } from "@/app/utils/cors"
import { proxyRequestWithCookies, HttpMethod } from "@/app/api/clientApi"

export async function GET(request: NextRequest, { params }: { params: { cartId: string } }) {
	try {
		const url = `${API_BASE_URL}${API_ENDPOINTS.carts(params.cartId)}`

		const { response } = await proxyRequestWithCookies(request, url, {
			method: HttpMethod.GET,
			forwardResponseCookies: true,
			forwardRequestCookies: true,
		})

		return response
	} catch (error) {
		console.error("Proxy request error:", error)
		return NextResponse.json(
			{
				error: "Failed to fetch from external API",
				details: error instanceof Error ? error.message : "Unknown error",
			},
			{
				status: 500,
				headers: corsHeaders,
			},
		)
	}
}
