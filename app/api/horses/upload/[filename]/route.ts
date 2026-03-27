import { NextRequest, NextResponse } from 'next/server';
import { getBytes } from '@/lib/storage';

export async function GET(_: NextRequest, { params }: { params: Promise<{ filename: string }> }) {
    const { filename } = await params;
    const result = await getBytes('horse-images', filename);
    if (!result) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return new NextResponse(result.data, {
        headers: {
            'Content-Type': result.meta?.contentType || 'image/jpeg',
            'Cache-Control': 'public, max-age=31536000, immutable',
        },
    });
}
