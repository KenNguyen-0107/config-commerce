/**
 * Builds a complete API URL with query parameters
 *
 * @param baseUrl - The base URL of the API
 * @param endpoint - The API endpoint
 * @param queryParams - Object containing query parameters
 * @returns Full URL with query parameters
 */
export function buildApiUrl(baseUrl: string, endpoint: string, queryParams: Record<string, string>): string {
  const url = new URL(endpoint, baseUrl)

  // Add query parameters
  Object.entries(queryParams).forEach(([key, value]) => {
    url.searchParams.append(key, value)
  })

  return url.toString()
}
