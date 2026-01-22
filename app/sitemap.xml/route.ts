import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Read blog posts from posts.json
    const postsPath = path.join(process.cwd(), 'data', 'posts.json');
    const postsData = fs.readFileSync(postsPath, 'utf-8');
    const posts = JSON.parse(postsData);

    // Base URL
    const baseUrl = 'https://sparkleknowledgeyard.com';

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">

  <!-- Homepage -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Blog Main Page -->
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Individual Blog Posts (Auto-generated from posts.json) -->
${posts
  .filter((post: any) => post.slug && post.slug !== 'sakthi-weds-navyaaa') // Filter out test posts
  .map((post: any) => {
    // Parse date or use current date
    let lastmod = new Date().toISOString().split('T')[0];
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
  .join('\n')}

  <!-- Admin Panel -->
  <url>
    <loc>${baseUrl}/admin</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>

  <!-- Privacy Policy -->
  <url>
    <loc>${baseUrl}/privacy</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.4</priority>
  </url>

  <!-- Terms and Conditions -->
  <url>
    <loc>${baseUrl}/terms</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.4</priority>
  </url>

</urlset>`;

    // Return XML response with proper headers
    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}
