import { type NextRequest, NextResponse } from "next/server"
import { corsHeaders } from "@/app/utils/cors"

/**
 * Enum for HTTP methods
 */
export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
  HEAD = "HEAD",
  OPTIONS = "OPTIONS",
}

interface FetchWithCookiesOptions {
  method?: HttpMethod
  headers?: Record<string, string>
  body?: unknown
  cache?: RequestCache
  next?: { revalidate?: number }
  forwardResponseCookies?: boolean
  forwardRequestCookies?: boolean
}

interface CookieOption {
  path?: string
  domain?: string
  maxAge?: number
  expires?: Date
  secure?: boolean
  httpOnly?: boolean
  sameSite?: "strict" | "lax" | "none"
}
/**
 * Return type for the proxyRequestWithCookies function
 */
interface ProxyRequestResult {
  data: unknown
  response: NextResponse
  externalResponse: Response
}
/**
 * Parses a cookie string and extracts the cookie options
 *
 * @param cookieString The cookie string from Set-Cookie header
 * @returns An object with the cookie name, value, and options
 */
function parseCookieString(cookieString: string) {
  const [mainPart, ...optionParts] = cookieString.split("; ")
  const [name, value] = mainPart.split("=")

  const cookieOptions: CookieOption = {}

  optionParts.forEach((option) => {
    if (option.toLowerCase().startsWith("max-age=")) {
      cookieOptions.maxAge = Number.parseInt(option.split("=")[1], 10)
    } else if (option.toLowerCase().startsWith("expires=")) {
      cookieOptions.expires = new Date(option.split("=")[1])
    } else if (option.toLowerCase().startsWith("path=")) {
      cookieOptions.path = option.split("=")[1]
    } else if (option.toLowerCase() === "secure") {
      cookieOptions.secure = true
    } else if (option.toLowerCase() === "httponly") {
      cookieOptions.httpOnly = true
    } else if (option.toLowerCase().startsWith("samesite=")) {
      const sameSite = option.split("=")[1].toLowerCase()
      if (sameSite === "strict" || sameSite === "lax" || sameSite === "none") {
        cookieOptions.sameSite = sameSite as "strict" | "lax" | "none"
      }
    }
  })

  return { name, value, options: cookieOptions }
}

/**
 * Forwards cookies from an external API response to the client response
 *
 * @param externalResponse The response from the external API
 * @param clientResponse The NextResponse to send to the client
 * @returns The updated NextResponse with cookies from the external API
 */
export function forwardCookiesToClient(externalResponse: Response, clientResponse: NextResponse): NextResponse {
  const cookies = externalResponse.headers.getSetCookie()

  cookies.forEach((cookieString) => {
    const { name, value, options } = parseCookieString(cookieString)
    clientResponse.cookies.set(name, value, options)
  })

  return clientResponse
}

/**
 * Proxies a request to an external API, forwarding cookies from the client
 *
 * @param request The incoming NextRequest from the client
 * @param url The URL of the external API to call
 * @param options Additional fetch options
 * @returns An object containing the parsed response data and the external API response
 */
export async function proxyRequestWithCookies(
  request: NextRequest,
  url: string,
  options: FetchWithCookiesOptions = {},
): Promise<ProxyRequestResult> {
  // Prepare headers for the external request
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...options.headers,
  }
  // Add cookies to headers if forwardRequestCookies is true
  if (options.forwardRequestCookies) {
    // Get all cookies from the incoming client request
    const cookieHeader = request.headers.get("cookie") || ""
    if (cookieHeader) {
      headers["Cookie"] = cookieHeader
    }
  }
  // Prepare the request body if provided
  let body: string | undefined
  if (options.body) {
    body = typeof options.body === "string" ? options.body : JSON.stringify(options.body)
  }

  // Make the request to the external API
  const response = await fetch(url, {
    method: options.method || HttpMethod.GET,
    headers,
    body,
    cache: options.cache,
    next: options.next,
  })

  if (!response.ok) {
    const errorText = await response.text()
    const nextResponseError = NextResponse.json(
      {
        error: "External API error",
        status: response.status,
        statusText: response.statusText,
        details: errorText,
      },
      {
        status: response.status,
        headers: corsHeaders,
      },
    )
    return {
      data: {},
      response: nextResponseError,
      externalResponse: response,
    }
  }

  // Parse the response based on content type
  const contentType = response.headers.get("content-type") || ""
  let data

  if (contentType.includes("application/json")) {
    data = await response.json()
  } else if (contentType.includes("text/")) {
    data = await response.text()
  } else {
    // For other content types, use the raw response
    data = response
  }

  // Create a NextResponse to return to the client
  const nextResponse = NextResponse.json(data, { headers: corsHeaders })

  // Forward cookies from the external API to the client if requested
  if (options.forwardResponseCookies) {
    forwardCookiesToClient(response, nextResponse)
  }

  return {
    data,
    response: nextResponse,
    externalResponse: response, // Include the original response in case it's needed
  }
}

/**
 * Simplified version that forwards cookies to an external API but doesn't handle response cookies
 */
export async function forwardCookiesToExternalApi(
  request: NextRequest,
  url: string,
  options: Omit<FetchWithCookiesOptions, "forwardResponseCookies"> = {},
) {
  // Get all cookies from the incoming client request
  const cookieHeader = request.headers.get("cookie") || ""

  // Prepare headers
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Cookie: cookieHeader,
    ...options.headers,
  }

  // Prepare the request body if provided
  let body: string | undefined
  if (options.body) {
    body = typeof options.body === "string" ? options.body : JSON.stringify(options.body)
  }

  // Make the request to the external API
  const response = await fetch(url, {
    method: options.method || HttpMethod.GET,
    headers,
    body,
    cache: options.cache,
    next: options.next,
  })

  return response
}

/**
 * Parses the response from the external API
 */
export async function parseResponse(response: Response) {
  const contentType = response.headers.get("content-type") || ""

  if (contentType.includes("application/json")) {
    return await response.json()
  } else if (contentType.includes("text/")) {
    return await response.text()
  } else {
    // For other content types, return the raw response
    return response
  }
}
