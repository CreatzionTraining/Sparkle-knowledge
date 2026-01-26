import { NextResponse } from 'next/server';
import { getAllImagesFromCloud } from '@/lib/cloudinary';

export async function GET() {
  try {
    const images = await getAllImagesFromCloud();
    return NextResponse.json({ success: true, images });
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json({ success: false, images: [] }, { status: 500 });
  }
}
