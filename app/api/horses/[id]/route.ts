import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;
const filePath = path.join(process.cwd(), 'data', 'horses.json');

function readHorses() {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}
function writeHorses(data: object) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const horse = readHorses().find((h: { id: number }) => String(h.id) === id);
    if (!horse) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(horse);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const body = await req.json();
    if (body.password !== ADMIN_PASSWORD) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const horses = readHorses();
    const index = horses.findIndex((h: { id: number }) => String(h.id) === id);
    if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    const updated = { ...horses[index], ...body };
    delete updated.password;
    horses[index] = updated;
    writeHorses(horses);
    return NextResponse.json(updated);
}
