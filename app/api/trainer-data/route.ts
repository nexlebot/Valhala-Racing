import { NextRequest, NextResponse } from 'next/server';
import { setJSON } from '@/lib/storage';

export async function POST(req: NextRequest) {
  if (req.headers.get('authorization') !== `Bearer ${process.env.SCRAPER_TOKEN}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();

  if (!body?.upcoming_races || !body?.major_wins || !body?.previous_runners) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  await setJSON('scraped_data', 'trainer_races', body);

  return NextResponse.json({ success: true });
}
