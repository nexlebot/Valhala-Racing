import { NextRequest, NextResponse } from 'next/server';
import { getJSON, setJSON } from '@/lib/storage';

export async function POST(req: NextRequest) {
  if (req.headers.get('authorization') !== `Bearer ${process.env.SCRAPER_TOKEN}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();

  if (!body?.upcoming_races || !body?.major_wins || !body?.previous_runners) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  // Merge: only overwrite sections that have actual data
  const existing = await getJSON('scraped_data', 'trainer_races') ?? {};
  const merged = {
    ...existing,
    ...body,
    major_wins: body.major_wins?.wins?.length ? body.major_wins : (existing.major_wins ?? body.major_wins),
    previous_runners: body.previous_runners?.results?.length ? body.previous_runners : (existing.previous_runners ?? body.previous_runners),
  };

  await setJSON('scraped_data', 'trainer_races', merged);

  return NextResponse.json({ success: true });
}
