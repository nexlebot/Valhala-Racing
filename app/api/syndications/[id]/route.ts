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
    const syndications = await readSyndications();
    const index = syndications.findIndex((s: { id: number }) => String(s.id) === id);
    if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    const updated = { ...syndications[index], ...body };
    delete updated.password;
    syndications[index] = updated;
    await writeSyndications(syndications);
    return NextResponse.json(updated);
}
