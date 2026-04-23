import { NextRequest, NextResponse } from 'next/server';
import { getJSON, setJSON } from '@/lib/storage';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

async function readTestimonials() {
    return (await getJSON('testimonials', 'list')) ?? [];
}

export async function GET() {
    return NextResponse.json(await readTestimonials());
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    if (body.password !== ADMIN_PASSWORD) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const list = await readTestimonials();
    const item = { ...body, id: Date.now() };
    delete item.password;
    list.push(item);
    await setJSON('testimonials', 'list', list);
    return NextResponse.json(item, { status: 201 });
}

export async function PUT(req: NextRequest) {
    const body = await req.json();
    if (body.password !== ADMIN_PASSWORD) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const list = await readTestimonials();
    const index = list.findIndex((t: { id: number }) => t.id === body.id);
    if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    const updated = { ...body };
    delete updated.password;
    list[index] = updated;
    await setJSON('testimonials', 'list', list);
    return NextResponse.json(updated);
}

export async function PATCH(req: NextRequest) {
    const body = await req.json();
    if (body.password !== ADMIN_PASSWORD) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await setJSON('testimonials', 'list', body.order);
    return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
    const body = await req.json();
    if (body.password !== ADMIN_PASSWORD) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const list = (await readTestimonials()).filter((t: { id: number }) => t.id !== body.id);
    await setJSON('testimonials', 'list', list);
    return NextResponse.json({ success: true });
}
