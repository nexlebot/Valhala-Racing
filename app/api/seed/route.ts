import { NextRequest, NextResponse } from 'next/server';
import { getJSON, setJSON } from '@/lib/storage';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

// Hit this once after deploy: /api/seed?password=yourpassword
export async function GET(req: NextRequest) {
    const pw = req.nextUrl.searchParams.get('password');
    if (pw !== ADMIN_PASSWORD) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const existing = await getJSON('horses', 'list');
    if (existing) {
        return NextResponse.json({ message: 'Already seeded', count: existing.length });
    }

    const initialData = [
        {
            "id": 1,
            "url": "https://images.pexels.com/photos/1996333/pexels-photo-1996333.jpeg?auto=compress&cs=tinysrgb&w=800",
            "title": "Blaze King",
            "age": "5 Years",
            "color": "Bay",
            "sire": "Storm Rider",
            "dam": "Flame Queen",
            "career": "25 Starts, 7-8-2"
        },
        {
            "id": 2,
            "url": "https://images.pexels.com/photos/635499/pexels-photo-635499.jpeg?auto=compress&cs=tinysrgb&w=800",
            "title": "Midnight Thunder",
            "age": "4 Years",
            "color": "Black",
            "sire": "Dark Storm",
            "dam": "Night Sky",
            "career": "18 Starts, 5-6-3"
        },
        {
            "id": 3,
            "url": "https://images.pexels.com/photos/850359/pexels-photo-850359.jpeg?auto=compress&cs=tinysrgb&w=800",
            "title": "Golden Spirit",
            "age": "6 Years",
            "color": "Chestnut",
            "sire": "Sunset Glory",
            "dam": "Dawn Breaker",
            "career": "32 Starts, 9-7-4"
        }
    ];

    await setJSON('horses', 'list', initialData);
    return NextResponse.json({ message: 'Seeded successfully', count: initialData.length });
}
