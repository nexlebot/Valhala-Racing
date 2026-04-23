import { NextRequest, NextResponse } from 'next/server';
import { getBytes, deleteBytes, getJSON, setJSON } from '@/lib/storage';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

export async function GET(_: NextRequest, { params }: { params: Promise<{ filename: string }> }) {
    const { filename } = await params;
    const result = await getBytes('syndication-pedigrees', filename);
    if (!result) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return new NextResponse(result.data, {
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `inline; filename="${filename}"`,
            'Cache-Control': 'public, max-age=31536000, immutable',
        },
    });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ filename: string }> }) {
    const { filename } = await params;
    const { password, syndicationId } = await req.json();
    if (password !== ADMIN_PASSWORD) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await deleteBytes('syndication-pedigrees', filename);

    if (syndicationId) {
        const syndications = (await getJSON('syndications', 'list')) ?? [];
        const index = syndications.findIndex((s: { id: number }) => String(s.id) === String(syndicationId));
        if (index !== -1) {
            delete syndications[index].pedigreeUrl;
            await setJSON('syndications', 'list', syndications);
        }
    }

    return NextResponse.json({ success: true });
}
