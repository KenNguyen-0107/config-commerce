/**
 * This example shows how to fetch and serve an external sitemap
 * with URL transformations. This is useful when you need to proxy
 * a sitemap from a CMS or other source and adapt it to your own domain.
 * 
 * Prerequisites:
 * - Set SITEMAP_SOURCE_DOMAIN environment variable to the source domain
 *   (e.g., "https://cms.example.com")
 */
export async function GET(request: Request) {
  try {
    // Dynamically import the module at runtime
    const { fetchOriginalSitemapXml, SITEMAP_CACHE_TAG } = await import('@niteco/sitemap-nextjs');
    
    // Define the NextFetchRequestConfig type
    type NextFetchRequestConfig = {
      next?: {
        revalidate?: number | false;
        tags?: string[];
      }
    };
    
    // Get the host and protocol from the request
    const host = request.headers.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;
    
    // Get the sitemap path from query params
    const url = new URL(request.url);
    const sitemapPath = url.searchParams.get("path") || "sitemap.xml";
    const isMainSitemap = sitemapPath === "sitemap.xml";
    
    // Get source domain from environment variable
    const sourceDomain = process.env.SITEMAP_SOURCE_DOMAIN || "https://cms.example.com";
    
    // Get cache duration from environment variable or default to 1 day (86400 seconds)
    const cacheDurationSeconds = process.env.SITEMAP_CACHE_DURATION_SECONDS
      ? Number.parseInt(process.env.SITEMAP_CACHE_DURATION_SECONDS, 10)
      : 86400;
      
    // Use fetchOriginalSitemapXml with cache configuration
    return await fetchOriginalSitemapXml(
      sitemapPath,
      baseUrl,
      isMainSitemap,
      sourceDomain,
      {
        next: {
          revalidate: cacheDurationSeconds,
          tags: [SITEMAP_CACHE_TAG, `sitemap:${sitemapPath}`], // Tags for targeted revalidation
        },
      } as NextFetchRequestConfig
    );
  } catch (error) {
    console.error("Error fetching external sitemap:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : String(error) }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

/**
 * In Pages Router, you would implement this as an API route:
 */
/* 
// pages/api/external-sitemap.ts
// For Pages Router, you would use a different approach
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Import the module
    const { fetchOriginalSitemapXml } = await import('@niteco/sitemap-nextjs');
    
    // Get the host from the request headers for dynamic base URL
    const host = req.headers.host || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const baseUrl = `${protocol}://${host}`;
    
    // Get the sitemap path from the query or use a default
    const sitemapPath = req.query.path?.toString() || 'sitemap.xml';
    const isMainSitemap = sitemapPath === 'sitemap.xml';
    
    // Fetch the sitemap from the source
    const response = await fetchOriginalSitemapXml(sitemapPath, baseUrl, isMainSitemap);
    
    // Convert the Response object to NextApiResponse
    const xmlContent = await response.text();
    const headers = Object.fromEntries(response.headers.entries());
    
    // Set headers
    Object.entries(headers).forEach(([key, value]) => {
      res.setHeader(key, value);
    });
    
    // Send the response with the same status code
    res.status(response.status).send(xmlContent);
  } catch (error) {
    console.error('Error fetching external sitemap:', error);
    
    // Return a user-friendly error
    res.setHeader('Content-Type', 'text/xml');
    res.status(500).send(`
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <!-- Error fetching sitemap -->
      </urlset>
    `);
  }
}
*/ 