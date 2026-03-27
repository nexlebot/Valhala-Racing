import fs from 'fs';
import path from 'path';

export type UpcomingRace = {
    horse_name: string;
    race_number: string;
    race_details: string;
    track: string;
    date: string;
};

export type MajorWin = {
    position: string;
    date: string;
    meeting: string;
    event_name: string;
    race_info: string;
};

export type PreviousRunner = {
    position: string;
    horse_name: string;
    meeting: string;
    event_name: string;
    date: string;
    distance: string;
    track_condition: string;
};

async function fetchData() {
    const url = process.env.TRAINER_RACES_JSON_URL;
    if (url) {
        const res = await fetch(url, { next: { revalidate: 3600 } });
        return res.json();
    }
    const filePath = path.join(process.cwd(), '.local-storage', 'scraped_data', 'trainer_races.json');
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

export async function getUpcomingRaces(): Promise<UpcomingRace[]> {
    const data = await fetchData();
    return data.upcoming_races.races;
}

export async function getMajorWins(): Promise<MajorWin[]> {
    const data = await fetchData();
    return data.major_wins.wins;
}

export async function getPreviousRunners(): Promise<PreviousRunner[]> {
    const data = await fetchData();
    const results: PreviousRunner[] = data.previous_runners.results;
    return results.sort((a, b) => {
        const dateDiff = new Date(b.date).getTime() - new Date(a.date).getTime();
        if (dateDiff !== 0) return dateDiff;
        return parseInt(a.position) - parseInt(b.position);
    });
}
