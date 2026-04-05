import { NextRequest, NextResponse } from 'next/server';
import { getJSON, setJSON } from '@/lib/storage';

function removeDuplicates<T extends Record<string, any>>(array: T[], key: string): T[] {
  const seen = new Set();
  return array.filter(item => {
    const identifier = item[key];
    if (seen.has(identifier)) {
      return false;
    }
    seen.add(identifier);
    return true;
  });
}

export async function GET() {
  const data = await getJSON('scraped_data', 'trainer_races');
  if (!data) {
    return NextResponse.json({ error: 'No data found' }, { status: 404 });
  }
  
  return NextResponse.json({
    trainer_name: data.trainer_name,
    scrape_timestamp: data.scrape_timestamp,
    upcoming_races: data.upcoming_races?.total || 0,
    major_wins: data.major_wins?.total || 0,
    previous_runners: data.previous_runners?.total || 0,
  });
}

export async function POST(req: NextRequest) {
  if (req.headers.get('authorization') !== `Bearer ${process.env.SCRAPER_TOKEN}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();

  if (!body?.upcoming_races || !body?.major_wins || !body?.previous_runners) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  // Clean duplicates from incoming data
  if (body.major_wins?.wins) {
    body.major_wins.wins = removeDuplicates(body.major_wins.wins, 'race_url');
  }
  if (body.previous_runners?.results) {
    body.previous_runners.results = removeDuplicates(body.previous_runners.results, 'race_url');
  }
  if (body.upcoming_races?.races) {
    body.upcoming_races.races = removeDuplicates(body.upcoming_races.races, 'race_url');
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

  return NextResponse.json({ 
    success: true, 
    message: `Updated with ${merged.upcoming_races?.total || 0} upcoming races, ${merged.major_wins?.total || 0} major wins, ${merged.previous_runners?.total || 0} previous runners` 
  });
}
