import { NextRequest, NextResponse } from 'next/server';
import { getStore } from '@netlify/blobs';

export async function GET(_: NextRequest, { params }: { params: Promise<{ filename: string }> }) {
    const { filename } = await params;
    const store = getStore('horse-images');
    const { data, metadata } = await store.getWithMetadata(filename, { type: 'arrayBuffer' });
    if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return new NextResponse(data as ArrayBuffer, {
        headers: {
            'Content-Type': (metadata?.contentType as string) || 'image/jpeg',
            'Cache-Control': 'public, max-age=31536000, immutable',
        },
    });
}
