import { NextRequest, NextResponse } from "next/server"
import { API_BASE_URL, API_ENDPOINTS } from "@/app/config/api"
import { corsHeaders } from "@/app/utils/cors"
import { proxyRequestWithCookies, HttpMethod } from "@/app/api/clientApi"
/**
 * Validate the cart after adding a product
 *
 * @returns The response from the API
 */

export async function GET(request: NextRequest) {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINTS.getOrderStatusMapping}`

    // Forward cookies to the external API
    const { response } = await proxyRequestWithCookies(request, url, {
      method: HttpMethod.GET,
      forwardResponseCookies: true, // Automatically forward cookies
      forwardRequestCookies: true, // Forward cookies from API to client
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

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}
