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

export async function GET() {
    return NextResponse.json(readHorses());
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    if (body.password !== ADMIN_PASSWORD) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    // password-check only login request
    if (body._check) {
        return NextResponse.json({ ok: true }, { status: 400 });
    }
    const horses = readHorses();
    const newHorse = { ...body, id: Date.now() };
    delete newHorse.password;
    horses.push(newHorse);
    writeHorses(horses);
    return NextResponse.json(newHorse, { status: 201 });
}

export async function PUT(req: NextRequest) {
    const body = await req.json();
    if (body.password !== ADMIN_PASSWORD) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const horses = readHorses();
    const index = horses.findIndex((h: { id: number }) => h.id === body.id);
    if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    const updated = { ...body };
    delete updated.password;
    horses[index] = updated;
    writeHorses(horses);
    return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
    const body = await req.json();
    if (body.password !== ADMIN_PASSWORD) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const horses = readHorses().filter((h: { id: number }) => h.id !== body.id);
    writeHorses(horses);
    return NextResponse.json({ success: true });
}
