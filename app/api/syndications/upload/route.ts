import { NextRequest, NextResponse } from 'next/server';
import { setBytes, getJSON, setJSON } from '@/lib/storage';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    if (formData.get('password') !== ADMIN_PASSWORD) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const file = formData.get('file') as File;
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

    const isPedigree = formData.get('type') === 'pedigree';
    const syndicationId = formData.get('syndicationId') as string | null;

    const bytes = await file.arrayBuffer();
    const ext = file.name.split('.').pop() || 'pdf';
    const filename = `${Date.now()}.${ext}`;

    if (isPedigree) {
        await setBytes('syndication-pedigrees', filename, bytes, { contentType: 'application/pdf' });
        const url = `/api/syndications/pedigree/${filename}`;

        if (syndicationId) {
            const syndications = (await getJSON('syndications', 'list')) ?? [];
            const index = syndications.findIndex((s: { id: number }) => String(s.id) === syndicationId);
            if (index !== -1) {
                syndications[index].pedigreeUrl = url;
                await setJSON('syndications', 'list', syndications);
            }
        }

        return NextResponse.json({ url });
    }

    await setBytes('horse-images', filename, bytes, { contentType: file.type });
    return NextResponse.json({ url: `/api/horses/upload/${filename}` });
}
