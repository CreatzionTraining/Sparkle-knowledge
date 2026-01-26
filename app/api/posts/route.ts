import { NextResponse } from 'next/server';
import { blogPosts } from '@/lib/blogData';
import { getPostsFromCloud, savePostsToCloud } from '@/lib/cloudinary';

// Helper to get posts with fallback
async function getPostsSafe() {
  try {
    let posts = await getPostsFromCloud();
    
    // Seed if empty or null
    if (!posts || !Array.isArray(posts) || posts.length === 0) {
      console.log('Database empty/missing. Seeding initial data...');
      posts = blogPosts;
      // Try to save, but don't fail if it doesn't work
      try {
        await savePostsToCloud(posts);
      } catch (saveError) {
        console.error('Failed to seed cloud, but continuing with local data:', saveError);
      }
    }
    return posts;
  } catch (error) {
    console.error('Cloud fetch failed, using fallback data:', error);
    return blogPosts;
  }
}

export async function GET() {
  try {
    let posts = await getPostsSafe();
    
    return NextResponse.json({ success: true, posts });
  } catch (error) {
    console.error('Error in GET posts:', error);
    // Fallback if cloud fails drastically
    return NextResponse.json({ success: true, posts: blogPosts });
  }
}

export async function POST(request: Request) {
  try {
    const newPost = await request.json();
    const posts = await getPostsSafe();
    
    posts.unshift(newPost); // Add to top
    
    await savePostsToCloud(posts);
    
    return NextResponse.json({ success: true, post: newPost });
  } catch (error) {
    console.error('Error saving post:', error);
    return NextResponse.json({ success: false, error: 'Failed to save post' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedPost = await request.json();
    let posts = await getPostsSafe();

    // Find index, converting IDs to strings for comparison to be safe
    const index = posts.findIndex((p: any) => String(p.id) === String(updatedPost.id));
    
    if (index !== -1) {
      // Merge updates instead of full replace to keep any other fields safe
      posts[index] = { ...posts[index], ...updatedPost };
      await savePostsToCloud(posts);
      return NextResponse.json({ success: true, post: posts[index] });
    } else {
      // If ID not found, treat it as a new post (UPSERT) or error? 
      // User said "update means update", but typically if it's missing, maybe we shouldn't create.
      // However, if the ID exists but type mismatch caused fail, the String cast above fixes it.
      return NextResponse.json({ success: false, error: 'Post not found to update' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ success: false, error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const posts = await getPostsSafe();
    
    const updatedPosts = posts.filter((post: any) => post.id !== id);
    
    await savePostsToCloud(updatedPosts);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete post' }, { status: 500 });
  }
}
