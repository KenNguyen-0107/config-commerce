const { generateSitemapIndexXml } = require('@niteco/sitemap-nextjs');

// Sample sitemap entries
const entries = [
  {
    urlSlug: 'about',
    lastModified: new Date().toISOString(),
    changefreq: 'monthly',
    priority: '0.8',
    alternates: {
      languages: {
        'en-us': 'https://example.com/about',
        'es': 'https://example.com/es/about',
      },
    },
  },
  {
    urlSlug: 'contact',
    lastModified: new Date().toISOString(),
    changefreq: 'weekly',
    priority: '0.9',
  },
  {
    urlSlug: 'products',
    lastModified: new Date().toISOString(),
    changefreq: 'daily',
    priority: '1.0',
    images: [
      {
        loc: 'https://example.com/images/product1.jpg',
        caption: 'Product 1',
        title: 'Our flagship product'
      }
    ]
  },
  {
    urlSlug: 'blog',
    lastModified: new Date().toISOString(),
    changefreq: 'weekly',
    priority: '0.8',
  },
];

// Configure sitemap generation
const config = {
  baseUrl: 'https://example.com',
  compress: true,
  updateRobotsTxt: true,
  robotsTxtPath: './output/robots.txt',
};

// Generate the sitemaps
async function generateExampleSitemaps() {
  try {
    // Generate sitemap index XML
    const xmlString = await generateSitemapIndexXml(entries, config);
    
    // In a real implementation, you would write this to a file
    console.log('Sitemap generation completed:');
    console.log(`- XML content generated with ${entries.length} entries`);
    console.log('- You would typically write this to a file named sitemap.xml');
    
    // Sample code to save the XML to a file (uncomment to use)
    // const fs = require('fs');
    // fs.writeFileSync('./output/sitemap.xml', xmlString);
  } catch (error) {
    console.error('Error generating sitemaps:', error);
  }
}

// Run the example
generateExampleSitemaps(); 