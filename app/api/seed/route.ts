import { NextRequest, NextResponse } from 'next/server';
import { getJSON, setJSON } from '@/lib/storage';
import { toSlug } from '@/lib/slug';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

export async function POST(req: NextRequest) {
    const { password } = await req.json();
    if (password !== ADMIN_PASSWORD) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const [horses, syndications] = await Promise.all([
        getJSON('horses', 'list').then((d: unknown) => (d as { id: number; title: string; slug?: string }[]) ?? []),
        getJSON('syndications', 'list').then((d: unknown) => (d as { id: number; name: string; slug?: string }[]) ?? []),
    ]);

    const updatedHorses = horses.map(h => ({ ...h, slug: h.slug || toSlug(h.title) }));
    const updatedSyndications = syndications.map(s => ({ ...s, slug: s.slug || toSlug(s.name) }));

    await Promise.all([
        setJSON('horses', 'list', updatedHorses),
        setJSON('syndications', 'list', updatedSyndications),
    ]);

    return NextResponse.json({
        horses: updatedHorses.map(h => ({ id: h.id, title: h.title, slug: h.slug })),
        syndications: updatedSyndications.map(s => ({ id: s.id, name: s.name, slug: s.slug })),
    });
}
