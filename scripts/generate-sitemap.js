const fs = require('fs');
const path = require('path');

// Read posts from posts.json
const postsPath = path.join(__dirname, '../data/posts.json');
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));

// Base URL
const baseUrl = 'https://sparkleknowledgeyard.com';
const currentDate = new Date().toISOString().split('T')[0];

// Generate blog post URLs
const blogPostUrls = posts
  .filter((post) => post.slug && post.slug !== 'sakthi-weds-navyaaa')
  .map((post) => {
    let lastmod = currentDate;
    if (post.date) {
      try {
        const dateObj = new Date(post.date);
        if (!isNaN(dateObj.getTime())) {
          lastmod = dateObj.toISOString().split('T')[0];
        }
      } catch (e) {
        // Use current date if parsing fails
      }
    }

    return `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  })
  .join('\n');

// Generate sitemap XML
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- Homepage -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Blog Main Page -->
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Individual Blog Posts -->
${blogPostUrls}

  <!-- Privacy Policy -->
  <url>
    <loc>${baseUrl}/privacy</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.4</priority>
  </url>

  <!-- Terms and Conditions -->
  <url>
    <loc>${baseUrl}/terms</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.4</priority>
  </url>

</urlset>`;

// Write to public/sitemap.xml
const outputPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, sitemap, 'utf-8');

console.log('✅ Sitemap generated successfully at /public/sitemap.xml');
console.log(`📊 Total URLs: ${posts.filter(p => p.slug && p.slug !== 'sakthi-weds-navyaaa').length + 4}`);
