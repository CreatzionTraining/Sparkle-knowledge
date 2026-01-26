import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
// Only configure if individual credentials are provided
if (process.env.CLOUDINARY_CLOUD_NAME) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

const NEWS_FILE = 'sparkle-knowledge/news.json';

// Cache news data
let cachedNews: any[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 30000; // 30 seconds cache

interface NewsItem {
  id: number;
  badge: string;
  title: string;
  icon: string;
  link: string;
  gradient: string;
  lightGradient: string;
  createdAt: string;
}

// Helper to fetch news from Cloudinary with caching
async function fetchNews(): Promise<NewsItem[]> {
  // Return cached data if still valid
  const now = Date.now();
  if (cachedNews && (now - lastFetchTime) < CACHE_DURATION) {
    return cachedNews;
  }

  try {
    const result = await cloudinary.api.resource(NEWS_FILE, {
      resource_type: 'raw',
    });
    const response = await fetch(result.secure_url + `?t=${now}`);
    const data = await response.json();
    
    // Update cache
    cachedNews = data.news || [];
    lastFetchTime = now;
    
    return cachedNews as NewsItem[];
  } catch (error) {
    console.log('No news file found, returning cached or empty array');
    return cachedNews || [];
  }
}

// Helper to save news to Cloudinary
async function saveNews(news: NewsItem[]) {
  const buffer = Buffer.from(JSON.stringify({ news }, null, 2));
  
  // Invalidate cache
  cachedNews = null;
  lastFetchTime = 0;
  
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'raw',
        public_id: NEWS_FILE,
        overwrite: true,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
}

// GET - Fetch all news
export async function GET() {
  try {
    const news = await fetchNews();
    return NextResponse.json({ success: true, news });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ success: false, news: [] }, { status: 500 });
  }
}

// POST - Create new news item
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const news = await fetchNews();
    
    const newItem: NewsItem = {
      id: body.id || Date.now(),
      badge: body.badge,
      title: body.title,
      icon: body.icon,
      link: body.link || '#',
      gradient: body.gradient,
      lightGradient: body.lightGradient,
      createdAt: new Date().toISOString(),
    };
    
    news.unshift(newItem);
    await saveNews(news);
    
    return NextResponse.json({ success: true, news: newItem });
  } catch (error) {
    console.error('Error creating news:', error);
    return NextResponse.json({ success: false, error: 'Failed to create news' }, { status: 500 });
  }
}

// PUT - Update existing news item
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const news = await fetchNews();
    
    const index = news.findIndex(item => item.id === body.id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'News not found' }, { status: 404 });
    }
    
    news[index] = {
      ...news[index],
      badge: body.badge,
      title: body.title,
      icon: body.icon,
      link: body.link,
      gradient: body.gradient,
      lightGradient: body.lightGradient,
    };
    
    await saveNews(news);
    
    return NextResponse.json({ success: true, news: news[index] });
  } catch (error) {
    console.error('Error updating news:', error);
    return NextResponse.json({ success: false, error: 'Failed to update news' }, { status: 500 });
  }
}

// DELETE - Delete news item
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const news = await fetchNews();
    
    const filteredNews = news.filter(item => item.id !== id);
    
    if (filteredNews.length === news.length) {
      return NextResponse.json({ success: false, error: 'News not found' }, { status: 404 });
    }
    
    await saveNews(filteredNews);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting news:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete news' }, { status: 500 });
  }
}
