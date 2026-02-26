import { NextResponse } from 'next/server';
import { initialTestimonials } from '@/lib/testimonialsData';
import { getTestimonialsFromCloud, saveTestimonialsToCloud } from '@/lib/cloudinary';

async function getTestimonialsSafe() {
    try {
        let items = await getTestimonialsFromCloud();

        if (!items || !Array.isArray(items) || items.length === 0) {
            console.log('Testimonials empty/missing. Seeding initial data...');
            items = initialTestimonials;
            try {
                await saveTestimonialsToCloud(items);
            } catch (saveError) {
                console.error('Failed to seed cloud, but continuing with local data:', saveError);
            }
        }
        return items;
    } catch (error) {
        console.error('Cloud fetch failed, using fallback data:', error);
        return initialTestimonials;
    }
}

export async function GET() {
    try {
        let items = await getTestimonialsSafe();
        return NextResponse.json({ success: true, testimonials: items });
    } catch (error) {
        return NextResponse.json({ success: true, testimonials: initialTestimonials });
    }
}

export async function POST(request: Request) {
    try {
        const newItem = await request.json();
        const items = await getTestimonialsSafe();

        items.unshift(newItem);

        await saveTestimonialsToCloud(items);

        return NextResponse.json({ success: true, testimonial: newItem });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to save' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const updatedItem = await request.json();
        let items = await getTestimonialsSafe();

        const index = items.findIndex((p: any) => String(p.id) === String(updatedItem.id));

        if (index !== -1) {
            items[index] = { ...items[index], ...updatedItem };
            await saveTestimonialsToCloud(items);
            return NextResponse.json({ success: true, testimonial: items[index] });
        } else {
            return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to update' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        const items = await getTestimonialsSafe();

        const updatedItems = items.filter((item: any) => item.id !== id);

        await saveTestimonialsToCloud(updatedItems);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to delete' }, { status: 500 });
    }
}
