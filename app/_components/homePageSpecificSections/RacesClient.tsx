'use client';
import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import UpComingRaceListView, { Column } from './upComingRaceListView';
import UpcomingRacesMobile from '../UpcomingRacesMobile';

type RaceRow = { horse_name: string; race_number: string; race_details: string; date: string };

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const columns: Column[] = [
    { key: 'horse_name', label: 'Horse Name', width: 'flex-[0_0_300px]' },
    { key: 'race_number', label: 'Race Number', width: 'flex-[0_0_260px]' },
    { key: 'race_details', label: 'Race Position', width: 'flex-[0_0_400px]' },
    { key: 'date', label: 'Date', width: 'flex-[0_0_200px]', align: 'left' },
];

export default function RacesClient({ races, scrapedAt }: { races: RaceRow[]; scrapedAt: string | null }) {
    const [search, setSearch] = useState('');
    const [letter, setLetter] = useState('');

    const filtered = useMemo(() => {
        return races.filter(r => {
            const name = r.horse_name.toUpperCase();
            const matchSearch = search === '' || name.includes(search.toUpperCase());
            const matchLetter = letter === '' || name.startsWith(letter);
            return matchSearch && matchLetter;
        });
    }, [races, search, letter]);

    const mobileItems = filtered.map(r => ({
        name: r.horse_name,
        race: r.race_number,
        location: r.race_details,
        date: r.date,
    }));

    return (
        <div className='mx-6 lg:mx-12'>
            {/* Search + Alphabet bar */}
            <div className='pt-8 pb-2 space-y-4'>
                <div className='relative max-w-md'>
                    <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
                    <input
                        type='text'
                        value={search}
                        onChange={e => { setSearch(e.target.value); setLetter(''); }}
                        placeholder='Search horse name...'
                        className='w-full pl-9 pr-9 py-2.5 rounded-full border border-gray-200 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all'
                    />
                    {search && (
                        <button onClick={() => setSearch('')} className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'>
                            <X className='w-4 h-4' />
                        </button>
                    )}
                </div>

                <div className='flex flex-wrap gap-1'>
                    <button
                        onClick={() => { setLetter(''); setSearch(''); }}
                        className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${letter === '' && search === '' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        All
                    </button>
                    {ALPHABET.map(l => {
                        const hasRaces = races.some(r => r.horse_name.toUpperCase().startsWith(l));
                        return (
                            <button
                                key={l}
                                onClick={() => { setLetter(l); setSearch(''); }}
                                disabled={!hasRaces}
                                className={`w-7 h-7 rounded-md text-xs font-medium transition-all ${letter === l ? 'bg-primary text-white' : hasRaces ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-gray-50 text-gray-300 cursor-not-allowed'}`}
                            >
                                {l}
                            </button>
                        );
                    })}
                </div>

                <p className='text-xs text-gray-400'>
                    {filtered.length} race{filtered.length !== 1 ? 's' : ''} found
                    {(search || letter) && <button onClick={() => { setSearch(''); setLetter(''); }} className='ml-2 text-primary hover:underline'>Clear filter</button>}
                </p>
            </div>

            {/* Desktop table */}
            <div className='hidden lg:block'>
                <UpComingRaceListView
                    items={filtered as Record<string, unknown>[]}
                    header={{
                        title: 'Upcoming Races',
                        subtitle: 'Stay ahead of the action — explore the latest horse racing events happening soon across Australia.',
                        updatedAt: scrapedAt ?? undefined,
                    }}
                    columns={columns}
                />
            </div>

            {/* Mobile cards */}
            <div className='lg:hidden mt-2'>
                <UpcomingRacesMobile
                    title='Upcoming Races'
                    subtitle='Stay ahead of the action — explore the latest horse racing events happening soon across Australia.'
                    buttonText='View races'
                    buttonLink='/upcoming-races'
                    updatedAt={scrapedAt ?? undefined}
                    items={mobileItems}
                />
            </div>
        </div>
    );
}
