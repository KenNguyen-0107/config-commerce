// pages/api/sitemap.ts
import { generateSitemapIndexXml, generateSitemapIndividual, SitemapEntry } from '@niteco/sitemap-nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

// This function would typically fetch data from a CMS, database, or other source
async function getEntries(): Promise<SitemapEntry[]> {
  // Mock data for the example
// You can fetch entries from a database or other source
	console.log("getEntries function called");
	// Generate mock entries
	const entries = [];

	// Define type locally
	type ChangeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

	// Add the main pages first
	entries.push(
		{
			urlSlug: "/",
			lastModified: new Date().toISOString(),
			changefreq: "weekly" as ChangeFrequency,
			priority: "1.0",
			alternates: {
				languages: {
					"en-us": "https://example.com/",
					es: "https://example.com/es/",
				},
			},
		},
		{
			urlSlug: "about",
			lastModified: new Date().toISOString(),
			changefreq: "monthly" as ChangeFrequency,
			priority: "0.8",
			alternates: {
				languages: {
					"en-us": "https://example.com/about",
					es: "https://example.com/es/about",
				},
			},
		},
		{
			urlSlug: "blog",
			lastModified: new Date().toISOString(),
			changefreq: "daily" as ChangeFrequency,
			priority: "0.9",
			alternates: {
				languages: {
					"en-us": "https://example.com/blog",
					es: "https://example.com/es/blog",
				},
			},
		}
	);

	// Generate the rest of the entries
	const categories = ["products", "services", "blog", "news", "resources"];
	const changefreqs: ChangeFrequency[] = ["daily", "weekly", "monthly", "yearly"];
	const priorities = ["0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7"];

	for (let i = 1; i <= 15000; i++) {
		const category = categories[Math.floor(Math.random() * categories.length)];
		const changefreq = changefreqs[Math.floor(Math.random() * changefreqs.length)];
		const priority = priorities[Math.floor(Math.random() * priorities.length)];
		const urlSlug = `${category}/${i}`;

		entries.push({
			urlSlug,
			lastModified: new Date().toISOString(),
			changefreq,
			priority,
			alternates: {
				languages: {
					"en-us": `https://example.com/${urlSlug}`,
					es: `https://example.com/es/${urlSlug}`,
				},
			},
		});
	}

	console.log(`Returning ${entries.length} entries`);
	return entries;
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get the host from the request headers for dynamic base URL
    const host = req.headers.host || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const baseUrl = `${protocol}://${host}`;
    
    // Get sitemap entries
    const entries = await getEntries();
    
    // Generate the sitemap XML
    const sitemapXml = await generateSitemapIndexXml(entries, {
      baseUrl,
      compress: true,
      updateRobotsTxt: true,
      robotsTxtPath: 'public/robots.txt',
    });
    
    // Set the appropriate headers
    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', `public, max-age=${process.env.SITEMAP_CACHE_MAX_AGE || "3600"}`);
    
    // Send the XML response
    res.status(200).send(sitemapXml);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).json({ error: 'Failed to generate sitemap' });
  }
}

/**
 * Example of how to implement a specific sitemap chunk route in Pages Router
 * 
 * Usage: Add this to pages/api/sitemap/[index].ts
 */
// pages/api/sitemap/[index].ts
export async function handleSitemapChunk(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Get the index from the query parameters
    const index = parseInt(req.query.index as string, 10);
    
    // If index is NaN, return 404
    if (isNaN(index)) {
      return res.status(404).send('Not Found');
    }
    
    // Get the host from the request headers for dynamic base URL
    const host = req.headers.host || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const baseUrl = `${protocol}://${host}`;
    
    // Get sitemap entries
    const entries = await getEntries();
    
    // Generate the sitemap XML for this specific chunk
    const sitemapXml = await generateSitemapIndividual(entries, {
      baseUrl,
      compress: true,
      updateRobotsTxt: false,
    }, index);
    
    // Set the appropriate headers
    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', `public, max-age=${process.env.SITEMAP_CACHE_MAX_AGE || "3600"}`);
    
    // Send the XML response
    res.status(200).send(sitemapXml);
  } catch (error) {
    console.error('Error generating sitemap chunk:', error);
    res.status(500).json({ error: 'Failed to generate sitemap chunk' });
  }
} 