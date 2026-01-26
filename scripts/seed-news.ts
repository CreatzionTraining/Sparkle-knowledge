// Seed script to create initial news.json in Cloudinary
import { config } from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

// Load environment variables
config({ path: '.env.local' });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const NEWS_FILE = 'sparkle-knowledge/news.json';

const INITIAL_NEWS = [
  {
    id: 1,
    badge: "Welcome",
    title: "Welcome to Sparkle Knowledge - Your Gateway to Global Education",
    icon: "sparkles",
    link: "#",
    gradient: "from-blue-500 via-indigo-500 to-purple-600",
    lightGradient: "from-blue-400/10 to-indigo-500/10",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    badge: "New Batch",
    title: "IELTS Intensive Batch Starting Soon - Limited Seats Available",
    icon: "graduation",
    link: "#",
    gradient: "from-orange-500 via-red-500 to-pink-600",
    lightGradient: "from-orange-400/10 to-red-500/10",
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    badge: "Achievement",
    title: "Our Students Achieving 8+ Bands in IELTS Consistently",
    icon: "trophy",
    link: "#",
    gradient: "from-emerald-500 via-green-500 to-teal-600",
    lightGradient: "from-emerald-400/10 to-green-500/10",
    createdAt: new Date().toISOString()
  }
];

async function seedNews() {
  try {
    console.log('🌱 Seeding news.json to Cloudinary...');
    
    const newsData = { news: INITIAL_NEWS };
    const buffer = Buffer.from(JSON.stringify(newsData, null, 2));
    
    const result: any = await new Promise((resolve, reject) => {
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
    
    console.log('✅ Successfully seeded news.json!');
    console.log('📍 URL:', result.secure_url);
    console.log('📰 Created', INITIAL_NEWS.length, 'initial news items');
  } catch (error) {
    console.error('❌ Error seeding news:', error);
    process.exit(1);
  }
}

seedNews();
