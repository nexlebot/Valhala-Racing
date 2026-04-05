import { NextRequest, NextResponse } from 'next/server';
import { getJSON } from '@/lib/storage';

export async function GET(req: NextRequest) {
  if (req.headers.get('authorization') !== `Bearer ${process.env.SCRAPER_TOKEN}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = await getJSON('scraped_data', 'trainer_races');

  return NextResponse.json({
    hasData: !!data,
    keys: data ? Object.keys(data) : [],
    majorWinsRaw: data?.major_wins ?? null,
    previousRunnersRaw: data?.previous_runners ?? null,
    upcomingRacesCount: data?.upcoming_races?.races?.length ?? 0,
  });
}
