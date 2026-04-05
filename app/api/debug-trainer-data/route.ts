import { NextResponse } from 'next/server';
import { getJSON } from '@/lib/storage';

export async function GET() {
  try {
    const data = await getJSON('scraped_data', 'trainer_races');
    
    if (!data) {
      return NextResponse.json({ 
        status: 'no_data',
        message: 'No trainer data found' 
      });
    }

    return NextResponse.json({
      status: 'success',
      trainer_name: data.trainer_name,
      scrape_timestamp: data.scrape_timestamp,
      data_summary: {
        upcoming_races: {
          total: data.upcoming_races?.total || 0,
          races_count: data.upcoming_races?.races?.length || 0,
          sample: data.upcoming_races?.races?.slice(0, 2) || []
        },
        major_wins: {
          total: data.major_wins?.total || 0,
          wins_count: data.major_wins?.wins?.length || 0,
          sample: data.major_wins?.wins?.slice(0, 2) || []
        },
        previous_runners: {
          total: data.previous_runners?.total || 0,
          results_count: data.previous_runners?.results?.length || 0,
          sample: data.previous_runners?.results?.slice(0, 2) || []
        }
      }
    });
  } catch (error) {
    return NextResponse.json({ 
      status: 'error',
      message: 'Failed to fetch trainer data',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}