"use client"
import { useEffect, useState } from "react"
import { API_BASE_INTERNAL_URL, API_ENDPOINTS } from "@/app/config/api"

/**
 * Custom hook that initializes cookies by fetching session data from the API
 * This hook should be called at the layout level to ensure
 * cookies are properly set before rendering the page
 */
export function useInitializeCookies() {
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    // Only run once when the component mounts
    if (!initialized) {
      const fetchSessionData = async () => {
        try {
          const url = `${API_BASE_INTERNAL_URL}${API_ENDPOINTS.currentSession}`
          // Fetch session data from the API
          const response = await fetch(url, {
            cache: "no-store", // Don't cache this request
          })

          if (response.ok) {
            // Extract and use the session data
            const sessionData = await response.json()
            console.log("Session initialized with data:", sessionData)
            // The API call itself sets cookies via HTTP headers
            // No need to manually set cookies here as they're handled by the browser
          } else {
            console.warn("Failed to initialize session:", response.status)
          }

          // Set initialized to true regardless of response status
          setInitialized(true)
        } catch (error) {
          console.error("Error initializing cookies from API:", error)
          setInitialized(true) // Still mark as initialized even if there's an error
        }
      }

      // Execute the async function
      fetchSessionData()
    }
  }, [initialized])

  return initialized
}
