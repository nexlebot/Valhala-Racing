import { NextRequest, NextResponse } from 'next/server';
import { getJSON, setJSON } from '@/lib/storage';

type Subscriber = { name: string; email: string; subscribedAt: string; };

// Admin only — read all subscribers
export async function GET(req: NextRequest) {
    const auth = req.headers.get('authorization');
    if (auth !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const subscribers = await getJSON('newsletter', 'subscribers') ?? [];
    return NextResponse.json(subscribers);
}

// Public — subscribe
export async function POST(req: NextRequest) {
    const { name, email } = await req.json();

    if (!name?.trim() || !email?.trim()) {
        return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const subscribers: Subscriber[] = await getJSON('newsletter', 'subscribers') ?? [];

    if (subscribers.some(s => s.email.toLowerCase() === email.toLowerCase())) {
        return NextResponse.json({ success: true });
    }

    subscribers.push({ name: name.trim(), email: email.trim(), subscribedAt: new Date().toISOString() });
    await setJSON('newsletter', 'subscribers', subscribers);

    return NextResponse.json({ success: true });
}
