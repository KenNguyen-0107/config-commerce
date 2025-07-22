import { NextRequest, NextResponse } from "next/server"
import { API_BASE_URL, API_ENDPOINTS } from "@/app/config/api"
import { corsHeaders } from "@/app/utils/cors"
import { proxyRequestWithCookies, HttpMethod } from "@/app/api/clientApi"

/**
 * Remove a product from the cart
 *
 * @param cartLineId - The ID of the cart line to remove
 * @returns The response from the API
 */
export async function DELETE(request: NextRequest, { params }: { params: { cartLineId: string } }) {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINTS.cartLine(params?.cartLineId)}`

    // Forward cookies to the external API
    const { response } = await proxyRequestWithCookies(request, url, {
      method: HttpMethod.DELETE,
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
