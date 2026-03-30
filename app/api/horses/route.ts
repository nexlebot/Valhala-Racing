import { NextRequest, NextResponse } from 'next/server';
import { getJSON, setJSON } from '@/lib/storage';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

async function readHorses() {
    return (await getJSON('horses', 'list')) ?? [];
}

async function writeHorses(data: object) {
    await setJSON('horses', 'list', data);
}

export async function GET() {
    return NextResponse.json(await readHorses());
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    if (body.password !== ADMIN_PASSWORD) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (body._check) {
        return NextResponse.json({ ok: true }, { status: 400 });
    }
    const horses = await readHorses();
    const newHorse = { ...body, id: Date.now() };
    delete newHorse.password;
    horses.push(newHorse);
    await writeHorses(horses);
    return NextResponse.json(newHorse, { status: 201 });
}

export async function PUT(req: NextRequest) {
    const body = await req.json();
    if (body.password !== ADMIN_PASSWORD) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const horses = await readHorses();
    const index = horses.findIndex((h: { id: number }) => h.id === body.id);
    if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    const updated = { ...body };
    delete updated.password;
    horses[index] = updated;
    await writeHorses(horses);
    return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
    const body = await req.json();
    if (body.password !== ADMIN_PASSWORD) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const horses = (await readHorses()).filter((h: { id: number }) => h.id !== body.id);
    await writeHorses(horses);
    return NextResponse.json({ success: true });
}
