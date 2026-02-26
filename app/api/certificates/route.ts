import { NextResponse } from 'next/server';
import { initialCertificates } from '@/lib/certificatesData';
import { getCertificatesFromCloud, saveCertificatesToCloud } from '@/lib/cloudinary';

async function getCertificatesSafe() {
    try {
        let items = await getCertificatesFromCloud();

        if (!items || !Array.isArray(items) || items.length === 0) {
            console.log('Certificates empty/missing. Seeding initial data...');
            items = initialCertificates;
            try {
                await saveCertificatesToCloud(items);
            } catch (saveError) {
                console.error('Failed to seed cloud, but continuing with local data:', saveError);
            }
        }
        return items;
    } catch (error) {
        console.error('Cloud fetch failed, using fallback data:', error);
        return initialCertificates;
    }
}

export async function GET() {
    try {
        let items = await getCertificatesSafe();
        return NextResponse.json({ success: true, certificates: items });
    } catch (error) {
        return NextResponse.json({ success: true, certificates: initialCertificates });
    }
}

export async function POST(request: Request) {
    try {
        const newItem = await request.json();
        const items = await getCertificatesSafe();

        items.unshift(newItem);

        await saveCertificatesToCloud(items);

        return NextResponse.json({ success: true, certificate: newItem });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to save' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const updatedItem = await request.json();
        let items = await getCertificatesSafe();

        const index = items.findIndex((p: any) => String(p.id) === String(updatedItem.id));

        if (index !== -1) {
            items[index] = { ...items[index], ...updatedItem };
            await saveCertificatesToCloud(items);
            return NextResponse.json({ success: true, certificate: items[index] });
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
        const items = await getCertificatesSafe();

        const updatedItems = items.filter((item: any) => item.id !== id);

        await saveCertificatesToCloud(updatedItems);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to delete' }, { status: 500 });
    }
}
