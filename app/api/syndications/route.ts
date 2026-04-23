import { NextRequest, NextResponse } from 'next/server';
import { getJSON, setJSON } from '@/lib/storage';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

async function readSyndications() {
    return (await getJSON('syndications', 'list')) ?? [];
}

async function writeSyndications(data: object) {
    await setJSON('syndications', 'list', data);
}

export async function GET() {
    return NextResponse.json(await readSyndications());
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    if (body.password !== ADMIN_PASSWORD) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (body._check) {
        return NextResponse.json({ ok: true }, { status: 400 });
    }
    const syndications = await readSyndications();
    const newItem = { ...body, id: Date.now() };
    delete newItem.password;
    if (!newItem.gallery?.length && newItem.url) {
        newItem.gallery = [{ url: newItem.url, isMain: true }];
    }
    syndications.push(newItem);
    await writeSyndications(syndications);
    return NextResponse.json(newItem, { status: 201 });
}

export async function PUT(req: NextRequest) {
    const body = await req.json();
    if (body.password !== ADMIN_PASSWORD) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const syndications = await readSyndications();
    const index = syndications.findIndex((s: { id: number }) => s.id === body.id);
    if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    const updated = { ...body };
    delete updated.password;
    syndications[index] = updated;
    await writeSyndications(syndications);
    return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
    const body = await req.json();
    if (body.password !== ADMIN_PASSWORD) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const syndications = (await readSyndications()).filter((s: { id: number }) => s.id !== body.id);
    await writeSyndications(syndications);
    return NextResponse.json({ success: true });
}
