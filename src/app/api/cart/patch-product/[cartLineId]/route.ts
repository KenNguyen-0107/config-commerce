import { NextRequest, NextResponse } from "next/server"
import { API_BASE_URL, API_ENDPOINTS } from "@/app/config/api"
import { corsHeaders } from "@/app/utils/cors"
import { proxyRequestWithCookies, HttpMethod } from "@/app/api/clientApi"

interface PatchProductRequest {
  qtyOrdered: string;
}


export async function PATCH(request: NextRequest, { params }: { params: { cartLineId: string } }) {
  try {
    const requestBody: PatchProductRequest = await request.json()
    const url = `${API_BASE_URL}${API_ENDPOINTS.cartLine(params?.cartLineId)}`

    const { response } = await proxyRequestWithCookies(request, url, {
      method: HttpMethod.PATCH,
      forwardResponseCookies: true,
      forwardRequestCookies: true,
      body: requestBody
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
