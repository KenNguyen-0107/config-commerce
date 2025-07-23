# @niteco/sitemap-nextjs

A TypeScript package for generating XML sitemaps for Next.js projects with support for image and video sitemaps.

## Features

- **Generate XML sitemaps from JSON input**: Convert structured JSON data into standard XML sitemaps that search engines can crawl and index.
  
- **Support for sitemap chunking**: Automatically split large sitemaps into multiple files to comply with search engine guidelines (5,000 URLs per sitemap).
  
- **Support for sitemap indexing**: Create a sitemap index (sitemap.xml) that lists all individual sitemap files.
  
- **Multilingual support**: Specify alternate language versions of the same page to help search engines understand translated content.
  
- **Image and video sitemaps**: Include metadata about rich media content for improved search visibility.
  
- **Gzip compression**: Compress sitemap files to reduce bandwidth and improve load times.
  
- **Robots.txt integration**: Automatically update your robots.txt file with references to your sitemaps.
  
- **Search engine pinging**: Notify search engines when your sitemaps are updated for faster crawling and indexing.
  
- **Next.js integration**: Compatible with both Pages Router and App Router for seamless integration.
  
- **TypeScript support**: Full TypeScript integration with type definitions for better development experience.

## Installation

```bash
# npm
npm install @niteco/sitemap-nextjs

# yarn
yarn add @niteco/sitemap-nextjs

# pnpm
pnpm add @niteco/sitemap-nextjs
```

## Quick Start

```typescript
import { generateSitemapIndexXml } from '@niteco/sitemap-nextjs';

// Create sitemap entries
const entries = [
  {
    urlSlug: 'about',
    lastModified: '2023-04-06T15:02:24.021Z',
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    urlSlug: 'contact',
    lastModified: '2023-04-06T15:02:24.021Z',
    changefreq: 'weekly',
    priority: '0.9'
  }
];

// Configure sitemap generation
const config = {
  baseUrl: 'https://example.com',
  compress: true
};

// Generate sitemap XML
generateSitemapIndexXml(entries, config)
  .then(xmlString => {
    console.log('Sitemap XML generated successfully');
    // Write to file or use the XML string directly
  })
  .catch(error => {
    console.error('Error generating sitemap:', error);
  });
```

## Usage Examples

### Basic Usage

```typescript
import { generateSitemapIndexXml, SitemapEntry } from '@niteco/sitemap-nextjs';

const entries: SitemapEntry[] = [
  {
    urlSlug: 'about',
    lastModified: '2023-04-06T15:02:24.021Z',
    changefreq: 'monthly',
    priority: '0.8',
    alternates: {
      languages: {
        'en-us': 'https://example.com/about',
        'es': 'https://example.com/es/about',
      },
    },
    images: [
      {
        loc: 'https://example.com/images/about-hero.jpg',
        caption: 'About Us Hero Image',
        title: 'Our Company'
      }
    ]
  }
];

const config = {
  baseUrl: 'https://example.com',
  compress: true,
  updateRobotsTxt: true,
};

// Generate the sitemap XML string
generateSitemapIndexXml(entries, config)
  .then((xmlString) => {
    console.log(`Generated sitemap XML with ${entries.length} entries`);
    
    // Write the XML to a file (if in a Node.js environment)
    const fs = require('fs');
    fs.writeFileSync('public/sitemap.xml', xmlString);
  })
  .catch((error) => {
    console.error('Error generating sitemap:', error);
  });
```

### Next.js API Routes (Pages Router)

```typescript
// pages/api/sitemap.ts
import { generateSitemapIndexXml, SitemapEntry } from '@niteco/sitemap-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

// Fetch entries from a database or other source
async function getEntries(): Promise<SitemapEntry[]> {
  return [
    {
      urlSlug: 'about',
      lastModified: '2023-04-06T15:02:24.021Z',
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      urlSlug: 'contact',
      lastModified: '2023-04-06T15:02:24.021Z',
      changefreq: 'weekly',
      priority: '0.9'
    }
  ];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get base URL from host header
    const host = req.headers.host || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const baseUrl = `${protocol}://${host}`;
    
    // Get entries
    const entries = await getEntries();
    
    // Generate sitemap XML
    const xmlString = await generateSitemapIndexXml(entries, {
      baseUrl,
      compress: true,
      updateRobotsTxt: true,
    });
    
    // Set appropriate headers
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate');
    
    // Send the sitemap
    res.status(200).send(xmlString);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('Error generating sitemap');
  }
}
```

For individual sitemap chunks in Pages Router:

```typescript
// pages/api/sitemap/[index].ts
import { generateSitemapIndividual, SitemapEntry } from '@niteco/sitemap-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

// Fetch entries from a database or other source
async function getEntries(): Promise<SitemapEntry[]> {
  // Your implementation to get entries
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get index from query
    const { index } = req.query;
    const sitemapIndex = parseInt(index as string, 10);
    
    if (isNaN(sitemapIndex)) {
      return res.status(404).send('Not found');
    }
    
    // Get base URL from host header
    const host = req.headers.host || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const baseUrl = `${protocol}://${host}`;
    
    // Get entries
    const entries = await getEntries();
    
    // Generate individual sitemap
    const xmlString = await generateSitemapIndividual(
      entries,
      {
        baseUrl,
        compress: true,
        chunkSize: 5000, // URLs per sitemap
      },
      sitemapIndex
    );
    
    // Set appropriate headers
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate');
    
    // Send the sitemap
    res.status(200).send(xmlString);
  } catch (error) {
    console.error('Error generating sitemap chunk:', error);
    res.status(500).send('Error generating sitemap');
  }
}
```

### Next.js App Router

```typescript
// app/sitemap/route.ts
import { getSitemapIndex, createRevalidationHandler, SitemapEntry } from '@niteco/sitemap-nextjs';
import { headers } from 'next/headers';

// Fetch entries from a database or other source
async function getEntries(): Promise<SitemapEntry[]> {
  return [
    {
      urlSlug: 'about',
      lastModified: '2023-04-06T15:02:24.021Z',
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      urlSlug: 'contact',
      lastModified: '2023-04-06T15:02:24.021Z',
      changefreq: 'weekly',
      priority: '0.9'
    }
  ];
}

export const GET = async (request: Request) => {
  const headersList = headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;
  
  const handler = getSitemapIndex(getEntries, {
    baseUrl,
    compress: true,
    updateRobotsTxt: true,
  });
  
  return handler(request);
};
```

For individual sitemap chunks, create dynamic routes:

```typescript
// app/sitemap/[index]/route.ts
import { getSitemapIndividual, SitemapEntry } from '@niteco/sitemap-nextjs';
import { headers } from 'next/headers';

async function getEntries(): Promise<SitemapEntry[]> {
  // Fetch your entries here
}

export async function GET(
  request: Request,
  { params }: { params: { index: string } }
) {

  
  const index = parseInt(params.index, 10);
  if (isNaN(index)) {
    return new Response('Not Found', { status: 404 });
  }
  // const match = id.match(/sitemap(\d+)\.xml$/);
  // const pageNumber: number = match ? parseInt(match[1], 10) : 1;
  const headersList = headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;
  
  const handler = getSitemapIndividual(getEntries, {
    baseUrl,
    compress: true,
  }, {}, index);
  
  return handler(request);
}
```

For fetching external sitemaps:

```typescript
// app/external-sitemap/route.ts
import { fetchOriginalSitemapXml } from '@niteco/sitemap-nextjs';
import { headers } from 'next/headers';

export async function GET(request: Request) {
  const headersList = headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;
  
  const url = new URL(request.url);
  const sitemapPath = url.searchParams.get('path') || 'sitemap.xml';
  const isMainSitemap = sitemapPath === 'sitemap.xml';
  
  return await fetchOriginalSitemapXml(sitemapPath, baseUrl, isMainSitemap);
}
```

For revalidation:

```typescript
// app/api/revalidate-sitemap/route.ts
import { createRevalidationHandler } from '@niteco/sitemap-nextjs';

export const POST = createRevalidationHandler();
```

### Command Line Interface

This package provides a CLI that can be used to generate sitemaps from a JSON file.

```bash
# Install globally
npm install -g @niteco/sitemap-nextjs

# Generate sitemaps from a JSON file
sitemap-nextjs generate --input entries.json --base-url https://example.com --output public

# Help
sitemap-nextjs --help
```

Example entries.json file:

```json
[
  {
    "urlSlug": "about",
    "lastModified": "2023-04-06T15:02:24.021Z",
    "changefreq": "monthly",
    "priority": "0.8",
    "alternates": {
      "languages": {
        "en-us": "https://example.com/about",
        "es": "https://example.com/es/about"
      }
    }
  },
  {
    "urlSlug": "contact",
    "lastModified": "2023-04-06T15:02:24.021Z",
    "changefreq": "weekly",
    "priority": "0.9"
  }
]
```

## Advanced Features

### Image Sitemaps

Include images in your sitemap entries:

```typescript
const entry: SitemapEntry = {
  urlSlug: 'gallery',
  lastModified: '2023-04-06T15:02:24.021Z',
  changefreq: 'weekly',
  priority: '0.8',
  images: [
    {
      loc: 'https://example.com/images/gallery/image1.jpg',
      caption: 'Beautiful landscape',
      title: 'Mountain View'
    },
    {
      loc: 'https://example.com/images/gallery/image2.jpg',
      caption: 'City skyline',
      title: 'Urban Photography'
    }
  ]
};
```

### Video Sitemaps

Include videos in your sitemap entries:

```typescript
const entry: SitemapEntry = {
  urlSlug: 'videos',
  lastModified: '2023-04-06T15:02:24.021Z',
  changefreq: 'weekly',
  priority: '0.8',
  videos: [
    {
      title: 'Product Demo',
      thumbnail_loc: 'https://example.com/videos/demo-thumbnail.jpg',
      description: 'A demonstration of our product features',
      content_loc: 'https://example.com/videos/demo.mp4',
      player_loc: 'https://example.com/video-player?id=demo',
      duration: 120,
      publication_date: '2023-03-01',
      family_friendly: true
    }
  ]
};
```

### Multilingual Sitemaps

Specify alternate language versions of a page:

```typescript
const entry: SitemapEntry = {
  urlSlug: 'products',
  lastModified: '2023-04-06T15:02:24.021Z',
  changefreq: 'weekly',
  priority: '0.8',
  alternates: {
    languages: {
      'en-us': 'https://example.com/products',
      'es': 'https://example.com/es/productos',
      'fr': 'https://example.com/fr/produits',
      'de': 'https://example.com/de/produkte'
    }
  }
};
```

### Pinging Search Engines

Notify search engines about your updated sitemaps:

```typescript
import { pingSearchEngines } from '@niteco/sitemap-nextjs';

// After generating sitemaps
pingSearchEngines('https://example.com/sitemap.xml', {
  google: true,
  bing: true,
  yandex: false
}).then(results => {
  console.log('Ping results:', results);
});
```

## Configuration Options

The sitemap generator accepts the following configuration options:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| baseUrl | string | - | Base URL of your website (required) |
| chunkSize | number | 5000 | Maximum number of URLs per sitemap |
| compress | boolean | true | Whether to compress sitemaps with gzip |
| updateRobotsTxt | boolean | true | Whether to update robots.txt with sitemap URL |
| robotsTxtPath | string | "public/robots.txt" | Path to robots.txt |
| pingSearchEngines | boolean | false | Whether to ping search engines after generation |
| customNamespaces | object | {} | Custom XML namespace declarations to add to the sitemap |

## TypeScript Types

This package provides TypeScript type definitions for all its functionality. The main types include:

```typescript
// Valid change frequency values for sitemap entries
type ChangeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

// A sitemap entry
interface SitemapEntry {
  urlSlug: string;
  lastModified: string;
  changefreq: ChangeFrequency;
  priority: string;
  alternates?: AlternateLanguages;
  images?: ImageEntry[];
  videos?: VideoEntry[];
}

// Configuration options
interface SitemapConfig {
  baseUrl: string;
  chunkSize?: number;
  compress?: boolean;
  updateRobotsTxt?: boolean;
  robotsTxtPath?: string;
  pingSearchEngines?: boolean;
  customNamespaces?: Record<string, string>;
}
```

## Cache and Revalidation

### Cache with SITEMAP_CACHE_TAG

This package provides a `SITEMAP_CACHE_TAG` constant that can be used for targeted revalidation of sitemaps in Next.js applications. This is particularly useful when your sitemap data changes and you want to revalidate it without rebuilding your entire application.

In App Router, it's recommended to use dynamic imports to avoid module parsing issues:

```typescript
// In your route handler or data fetching function
export async function GET(request: Request) {
  // Dynamically import the module
  const { SITEMAP_CACHE_TAG } = await import('@niteco/sitemap-nextjs');
  
  // Define your fetch options
  type NextFetchRequestConfig = {
    next?: {
      revalidate?: number | false;
      tags?: string[];
    }
  };
  
  const cacheDurationSeconds = process.env.SITEMAP_CACHE_DURATION_SECONDS
    ? Number.parseInt(process.env.SITEMAP_CACHE_DURATION_SECONDS, 10)
    : 86400; // Default to 24 hours

  const path = 'sitemap.xml';
  const response = await fetch("https://your-api.com/sitemap-data", {
    next: {
      revalidate: cacheDurationSeconds,
      tags: [SITEMAP_CACHE_TAG, `sitemap:${path}`], // Tags for targeted revalidation
    },
  } as NextFetchRequestConfig);
  
  return response.json();
}
```

### Revalidating Sitemaps

To revalidate sitemaps, you can use the provided revalidation handler with dynamic imports:

```typescript
// app/api/revalidate-sitemap/route.ts
export async function POST(request: Request) {
  // Dynamically import the module at runtime
  const { createRevalidationHandler } = await import('@niteco/sitemap-nextjs/next-integration');

  // Call the handler function with the request
  const handler = createRevalidationHandler();
  return handler(request);
}
```

For a custom implementation using revalidateTag:

```typescript
// app/api/revalidate-sitemap/route.ts
import { revalidateTag } from 'next/cache';

export async function POST(request: Request) {
  try {
    // Dynamically import SITEMAP_CACHE_TAG
    const { SITEMAP_CACHE_TAG } = await import('@niteco/sitemap-nextjs');
    
    // Get the path from the request URL
    const url = new URL(request.url);
    const path = url.searchParams.get('path');
    
    // Authenticate the request (example)
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ') || 
        authHeader.split(' ')[1] !== process.env.REVALIDATION_TOKEN) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    if (path) {
      // Revalidate a specific sitemap
      revalidateTag(`sitemap:${path}`);
      return new Response(JSON.stringify({ revalidated: true, path }));
    }
    
    // Revalidate all sitemaps
    revalidateTag(SITEMAP_CACHE_TAG);
    return new Response(JSON.stringify({ revalidated: true }));
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        error: 'Revalidation failed', 
        message: error instanceof Error ? error.message : String(error) 
      }),
      { status: 500 }
    );
  }
}
```

### Example: Fetching External Sitemaps with Caching

```typescript
// app/sitemap/route.ts
export async function GET(request: Request) {
  try {
    // Dynamically import the modules
    const { fetchOriginalSitemapXml, SITEMAP_CACHE_TAG } = await import('@niteco/sitemap-nextjs');
    
    // Get request details
    const host = request.headers.get('host') || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const baseUrl = `${protocol}://${host}`;
    
    const url = new URL(request.url);
    const sitemapPath = url.searchParams.get('path') || 'sitemap.xml';
    const isMainSitemap = sitemapPath === 'sitemap.xml';
    
    // Fetch with cache tags for targeted revalidation
    const cacheDurationSeconds = process.env.SITEMAP_CACHE_DURATION_SECONDS
      ? Number.parseInt(process.env.SITEMAP_CACHE_DURATION_SECONDS, 10)
      : 86400;
      
    return await fetchOriginalSitemapXml(
      sitemapPath, 
      baseUrl, 
      isMainSitemap, 
      undefined, // Source domain (optional)
      {
        next: {
          revalidate: cacheDurationSeconds,
          tags: [SITEMAP_CACHE_TAG, `sitemap:${sitemapPath}`],
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : String(error) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
```

## License

MIT
