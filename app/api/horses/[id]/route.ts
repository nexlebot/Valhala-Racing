import { NextRequest, NextResponse } from 'next/server';
import { getJSON, setJSON } from '@/lib/storage';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

async function readHorses() {
    return (await getJSON('horses', 'list')) ?? [];
}

async function writeHorses(data: object) {
    await setJSON('horses', 'list', data);
}

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const horse = (await readHorses()).find((h: { id: number }) => String(h.id) === id);
    if (!horse) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(horse);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const body = await req.json();
    if (body.password !== ADMIN_PASSWORD) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const horses = await readHorses();
    const index = horses.findIndex((h: { id: number }) => String(h.id) === id);
    if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    const updated = { ...horses[index], ...body };
    delete updated.password;
    horses[index] = updated;
    await writeHorses(horses);
    return NextResponse.json(updated);
}
