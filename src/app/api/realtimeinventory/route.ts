import { HttpMethod, proxyRequestWithCookies } from "@/app/api/clientApi"
import { API_BASE_URL, API_ENDPOINTS } from "@/app/config/api"
import { corsHeaders } from "@/app/utils/cors"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json()
    const url = `${API_BASE_URL}${API_ENDPOINTS.realTimeInventory}`

    const { response } = await proxyRequestWithCookies(request, url, {
      method: HttpMethod.POST,
      forwardResponseCookies: true,
      forwardRequestCookies: true,
      body: requestBody,
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

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}
