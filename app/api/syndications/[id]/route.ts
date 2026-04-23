import { NextRequest, NextResponse } from 'next/server';
import { getJSON, setJSON } from '@/lib/storage';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

async function readSyndications() {
    return (await getJSON('syndications', 'list')) ?? [];
}

async function writeSyndications(data: object) {
    await setJSON('syndications', 'list', data);
}

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const item = (await readSyndications()).find((s: { id: number }) => String(s.id) === id);
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(item);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const body = await req.json();
    if (body.password !== ADMIN_PASSWORD) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (body.about) {
        // Unescape if double-escaped, strip outer wrapper div, replace &nbsp;
        let about = body.about;
        if (about.includes('&lt;')) {
            about = about.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');
        }
        about = about.replace(/^<div[^>]*>(.*)<\/div>$/s, '$1').replace(/&nbsp;/g, ' ');
        body.about = about;
    }
    if (body.about) {
        body.about = body.about
            .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&')
            .replace(/(<p>\s*<\/p>\s*){2,}/g, '<p></p>');
    }
    const syndications = await readSyndications();
    const index = syndications.findIndex((s: { id: number }) => String(s.id) === id);
    if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    const updated = { ...syndications[index], ...body };
    delete updated.password;
    syndications[index] = updated;
    await writeSyndications(syndications);
    return NextResponse.json(updated);
}
