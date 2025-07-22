import { CORS_CONFIG } from "@/app/config/api"

// CORS headers for responses
export const corsHeaders = {
  "Access-Control-Allow-Origin": CORS_CONFIG.allowOrigin,
  "Access-Control-Allow-Methods": CORS_CONFIG.allowMethods,
  "Access-Control-Allow-Headers": CORS_CONFIG.allowHeaders,
}
