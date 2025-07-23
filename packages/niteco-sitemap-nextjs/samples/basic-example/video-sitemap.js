const { generateSitemapIndexXml } = require('@niteco/sitemap-nextjs');

// Sample sitemap entries with video content
const entries = [
  {
    urlSlug: 'videos/product-demo',
    lastModified: new Date().toISOString(),
    changefreq: 'monthly',
    priority: '0.8',
    videos: [
      {
        title: 'Product Demo Video',
        thumbnail_loc: 'https://example.com/videos/product-demo-thumbnail.jpg',
        description: 'A comprehensive demonstration of our flagship product features',
        content_loc: 'https://example.com/videos/product-demo.mp4',
        player_loc: 'https://example.com/video-player?id=product-demo',
        duration: 180, // 3 minutes
        publication_date: '2023-01-15',
        view_count: 15000,
        rating: 4.8,
        family_friendly: true,
        tag: 'product demo'
      }
    ]
  },
  {
    urlSlug: 'videos/tutorial',
    lastModified: new Date().toISOString(),
    changefreq: 'monthly',
    priority: '0.7',
    videos: [
      {
        title: 'How to Use Our Product',
        thumbnail_loc: 'https://example.com/videos/tutorial-thumbnail.jpg',
        description: 'Step-by-step tutorial on getting started with our product',
        content_loc: 'https://example.com/videos/tutorial.mp4',
        player_loc: 'https://example.com/video-player?id=tutorial',
        duration: 360, // 6 minutes
        publication_date: '2023-02-20',
        view_count: 8500,
        rating: 4.5,
        family_friendly: true,
        tag: 'tutorial'
      }
    ]
  },
  {
    urlSlug: 'videos/customer-reviews',
    lastModified: new Date().toISOString(),
    changefreq: 'weekly',
    priority: '0.6',
    videos: [
      {
        title: 'Customer Review #1',
        thumbnail_loc: 'https://example.com/videos/review1-thumbnail.jpg',
        description: 'Hear what our customers have to say about our product',
        player_loc: 'https://example.com/video-player?id=review1',
        duration: 120, // 2 minutes
        publication_date: '2023-03-10',
        view_count: 3200,
        rating: 4.9,
        family_friendly: true,
        tag: 'review',
        uploader: {
          name: 'John Doe',
          info: 'https://example.com/users/johndoe'
        }
      },
      {
        title: 'Customer Review #2',
        thumbnail_loc: 'https://example.com/videos/review2-thumbnail.jpg',
        description: 'Another satisfied customer sharing their experience',
        player_loc: 'https://example.com/video-player?id=review2',
        duration: 150, // 2.5 minutes
        publication_date: '2023-03-15',
        view_count: 2800,
        rating: 4.7,
        family_friendly: true,
        tag: 'review',
        uploader: {
          name: 'Jane Smith',
          info: 'https://example.com/users/janesmith'
        }
      }
    ]
  }
];

// Configure sitemap generation
const config = {
  baseUrl: 'https://example.com',
  compress: true,
  updateRobotsTxt: true,
  robotsTxtPath: './output/robots.txt',
};

// Generate the video sitemaps
async function generateVideoSitemaps() {
  try {
    console.log('Generating video sitemaps...');
    
    // Generate sitemap XML with video content
    const xmlString = await generateSitemapIndexXml(entries, config);
    
    // In a real implementation, you would write this to a file
    console.log('Video sitemap generation completed:');
    console.log(`- XML content generated with ${entries.length} entries containing video data`);
    console.log('- You would typically write this to a file named video-sitemap.xml');
    
    // Sample code to save the XML to a file (uncomment to use)
    // const fs = require('fs');
    // fs.writeFileSync('./output/video-sitemap.xml', xmlString);
    
    console.log('Video sitemaps help search engines discover and index your video content,');
    console.log('improving visibility in video search results.');
  } catch (error) {
    console.error('Error generating video sitemaps:', error);
  }
}

// Run the example
generateVideoSitemaps(); 