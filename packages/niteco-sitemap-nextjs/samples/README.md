# @niteco/sitemap-nextjs Examples

This directory contains example code showing how to use the `@niteco/sitemap-nextjs` package in different scenarios.

## Basic Examples

### Standard Sitemap Generation

The `basic-example/index.js` file demonstrates how to generate standard XML sitemaps with basic configuration.

```bash
# Navigate to the basic example directory
cd basic-example

# Run the example
node index.js
```

### Video Sitemap Generation

The `basic-example/video-sitemap.js` file shows how to create sitemaps with video content, which helps search engines discover and index your videos.

```bash
# Navigate to the basic example directory
cd basic-example

# Run the example
node video-sitemap.js
```

## Next.js Integration Examples

### Pages Router Example

The `nextjs-example/pages-router.ts` file demonstrates how to integrate the sitemap generator with Next.js Pages Router using API routes.

To use in your Next.js project:

1. Copy the file to your project's `pages/api/sitemap.ts` path
2. Update the `getEntries()` function to fetch your actual site content
3. Access your sitemap at `/api/sitemap`

The example also includes a function for handling individual sitemap chunks that you can implement at `pages/api/sitemap/[index].ts`.

### App Router Example

The `nextjs-example/app-router.ts` file shows how to implement sitemap generation with Next.js App Router.

To use in your Next.js project:

1. Copy the main handler to your project's `app/sitemap/route.ts` path
2. Create dynamic routes by implementing the `dynamicSitemapRoute` at `app/sitemap/[index]/route.ts`
3. Implement the revalidation endpoint at `app/api/revalidate-sitemap/route.ts`
4. Update the `getEntries()` function to fetch your actual site content
5. Access your sitemap at `/sitemap`

### External Sitemap Example

The `nextjs-example/external-sitemap.ts` file demonstrates how to fetch and transform external sitemaps from another source (like a CMS) and serve them with your own domain.

To use in your Next.js project:

1. Set the `SITEMAP_SOURCE_DOMAIN` environment variable to the source domain (e.g., "https://cms.example.com")
2. Copy the appropriate implementation to your project:
   - App Router: `app/external-sitemap/route.ts`
   - Pages Router: `pages/api/external-sitemap.ts`
3. Access your external sitemap at:
   - App Router: `/external-sitemap?path=sitemap.xml`
   - Pages Router: `/api/external-sitemap?path=sitemap.xml`

This is particularly useful when:
- Your content is managed in a headless CMS that provides its own sitemaps
- You need to proxy sitemaps from another domain but update URLs to your own domain
- You want to transform or filter externally-generated sitemaps

## Running These Examples

To run these examples in your own project:

1. Install the package:

```bash
npm install @niteco/sitemap-nextjs
```

2. Copy the relevant example files to your project
3. Update the configuration and content to match your site's structure
4. Run the example code

## API Notes

The package provides several ways to generate sitemaps:

1. **Direct generation** - `generateSitemapIndexXml` and `generateSitemapIndividual` functions for creating sitemap files directly
2. **App Router handlers** - `getSitemapIndex` and `getSitemapIndividual` functions for creating Next.js App Router handlers
3. **Revalidation** - `createRevalidationHandler` function for creating a revalidation endpoint with authentication
4. **External sitemaps** - `fetchOriginalSitemapXml` function for fetching and transforming sitemaps from external sources
5. **Search Engine Pinging** - `pingSearchEngines` function for notifying search engines about your sitemap updates

## Additional Notes

- The examples use placeholder URLs and content. Replace with your actual website data.
- For Next.js examples, set the `baseUrl` dynamically based on the request headers to ensure it works in different environments.
- Remember to configure your `robots.txt` correctly to ensure search engines can find your sitemaps.
- The App Router examples include revalidation handlers that work with Next.js' cache system.

## Caching and Revalidation with SITEMAP_CACHE_TAG

The package provides a `SITEMAP_CACHE_TAG` constant that you can use with Next.js App Router for targeted cache invalidation. With App Router, it's recommended to use dynamic imports to avoid module parsing issues.

### Caching Sitemap Data

```typescript
// In your data fetching function
async function fetchSitemapData(path: string) {
  // Dynamically import the module to get SITEMAP_CACHE_TAG
  const { SITEMAP_CACHE_TAG } = await import('@niteco/sitemap-nextjs');
  
  // Define your fetch options type
  type NextFetchRequestConfig = {
    next?: {
      revalidate?: number | false;
      tags?: string[];
    }
  };
  
  const cacheDurationSeconds = process.env.SITEMAP_CACHE_DURATION_SECONDS
    ? Number.parseInt(process.env.SITEMAP_CACHE_DURATION_SECONDS, 10)
    : 86400; // Default to 24 hours

  const response = await fetch("https://your-api.com/sitemap-data", {
    next: {
      revalidate: cacheDurationSeconds,
      tags: [SITEMAP_CACHE_TAG, `sitemap:${path}`], // Tags for targeted revalidation
    },
  } as NextFetchRequestConfig);
  
  return response.json();
}
```

### Revalidating Cached Sitemaps

For revalidation, use dynamic imports to avoid module parsing issues:

```typescript
// app/api/revalidate-sitemap/route.ts
// Method 1: Using the built-in handler with dynamic import
export async function POST(request: Request) {
  // Dynamically import the module at runtime
  const { createRevalidationHandler } = await import('@niteco/sitemap-nextjs/next-integration');

  // Call the handler function with the request
  const handler = createRevalidationHandler();
  return handler(request);
}

// Method 2: Custom implementation with dynamic import
/*
import { revalidateTag } from 'next/cache';

export async function POST(request: Request) {
  try {
    // Dynamically import SITEMAP_CACHE_TAG
    const { SITEMAP_CACHE_TAG } = await import('@niteco/sitemap-nextjs');
    
    // Authenticate the request here
    
    // Get the path parameter from the request
    const url = new URL(request.url);
    const path = url.searchParams.get('path');
    
    if (path) {
      // Revalidate a specific sitemap
      revalidateTag(`sitemap:${path}`);
      return new Response(JSON.stringify({ 
        revalidated: true,
        message: `Revalidated sitemap: ${path}`
      }));
    }
    
    // Revalidate all sitemaps
    revalidateTag(SITEMAP_CACHE_TAG);
    return new Response(JSON.stringify({ 
      revalidated: true,
      message: "Revalidated all sitemaps"
    }));
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: "Revalidation failed",
      message: error instanceof Error ? error.message : String(error)
    }), { status: 500 });
  }
}
*/
```

When your sitemap data changes, you can trigger revalidation by calling this endpoint, which will update the cached sitemaps without requiring a full application rebuild.

### Example: App Router Route Handler with Dynamic Imports

```typescript
// app/sitemap.xml/route.ts
export async function GET(request: Request) {
  try {
    // Dynamically import the required modules
    const { getSitemapIndex, SITEMAP_CACHE_TAG } = await import('@niteco/sitemap-nextjs');
    
    // Get entries for your sitemap
    const entries = await getEntries(SITEMAP_CACHE_TAG);
    
    // Get the host from the request
    const host = request.headers.get('host') || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const baseUrl = `${protocol}://${host}`;
    
    // Create and call the handler
    const handler = getSitemapIndex(() => Promise.resolve(entries), {
      baseUrl,
      compress: false,
      updateRobotsTxt: true,
    });
    
    return handler();
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : String(error) 
    }), { status: 500 });
  }
}
```

For more detailed implementations, check the example files in the `nextjs-example` directory.

For more detailed information, refer to the main [README.md](../README.md) file. 