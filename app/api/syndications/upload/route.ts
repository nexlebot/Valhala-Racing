import { NextRequest, NextResponse } from 'next/server';
import { setBytes } from '@/lib/storage';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    if (formData.get('password') !== ADMIN_PASSWORD) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const file = formData.get('file') as File;
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const ext = file.name.split('.').pop() || 'jpg';
    const filename = `${Date.now()}.${ext}`;

    await setBytes('horse-images', filename, bytes, { contentType: file.type });
    return NextResponse.json({ url: `/api/horses/upload/${filename}` });
}
