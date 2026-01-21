import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const DB_PUBLIC_ID = 'sparkle_posts_db.json';

export async function uploadToCloudinary(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({
      folder: 'sparkle-knowledge', 
    }, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result?.secure_url || '');
    }).end(buffer);
  });
}

// --- DATABASE FUNCTIONS ---

export async function savePostsToCloud(posts: any[]): Promise<string> {
  console.log('Saving', posts.length, 'posts to Cloudinary...');
  const jsonString = JSON.stringify(posts, null, 2);
  const buffer = Buffer.from(jsonString);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'raw',
        public_id: DB_PUBLIC_ID,
        folder: 'sparkle-knowledge',
        overwrite: true,
      },
      (error, result) => {
        if (error) {
          console.error('Failed to save posts to cloud:', error);
          reject(error);
        } else {
          console.log('Successfully saved posts to cloud:', result?.secure_url);
          resolve(result?.secure_url || '');
        }
      }
    );
    
    // Create a readable stream from the buffer
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    stream.pipe(uploadStream);
  });
}

export async function getPostsFromCloud(): Promise<any[] | null> {
  try {
    // Use Admin API to get the resource details
    const resource = await cloudinary.api.resource(
      `sparkle-knowledge/${DB_PUBLIC_ID}`,
      { resource_type: 'raw' }
    );
    
    console.log('Cloudinary resource found:', resource.secure_url);
    
    // Fetch the actual JSON content
    const res = await fetch(resource.secure_url + `?t=${Date.now()}`);
    if (!res.ok) {
      console.error('Failed to fetch JSON:', res.status, res.statusText);
      return null;
    }
    
    const data = await res.json();
    console.log('Successfully loaded posts from cloud:', data.length, 'posts');
    return data;
  } catch (error: any) {
    // If resource doesn't exist (404), return null to trigger seeding
    if (error.error?.http_code === 404 || error.http_code === 404) {
      console.log('Database file not found in cloud, will seed initial data');
      return null;
    }
    console.error("Error reading from cloud:", error);
    return null;
  }
}

// Get all images from Cloudinary folder
export async function getAllImagesFromCloud(): Promise<string[]> {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'sparkle-knowledge/',
      resource_type: 'image',
      max_results: 500
    });
    
    return result.resources.map((resource: any) => resource.secure_url);
  } catch (error) {
    console.error('Error fetching images from cloud:', error);
    return [];
  }
}
