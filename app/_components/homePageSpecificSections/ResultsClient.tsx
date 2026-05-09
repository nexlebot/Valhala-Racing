'use client';
import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import UpComingRaceListView, { Column } from './upComingRaceListView';
import UpcomingRacesMobile from '../UpcomingRacesMobile';

type Runner = { horse_name: string; position: string; meeting: string; event_name: string; date: string; distance?: string; track_condition?: string; };

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const columns: Column[] = [
    { key: 'horse_name', label: 'Horse Name', grow: 1 },
    { key: 'position', label: 'Position', grow: 1 },
    { key: 'meeting', label: 'Race Meeting', grow: 1 },
    { key: 'event_name', label: 'Event', grow: 1 },
    { key: 'date', label: 'Date', grow: 1, align: 'left' },
];

export default function ResultsClient({ runners, scrapedAt }: { runners: Runner[]; scrapedAt: string | null }) {
    const [search, setSearch] = useState('');
    const [letter, setLetter] = useState('');

    const filtered = useMemo(() => {
        return runners.filter(r => {
            const name = r.horse_name.toUpperCase();
            const matchSearch = search === '' || name.includes(search.toUpperCase());
            const matchLetter = letter === '' || name.startsWith(letter);
            return matchSearch && matchLetter;
        });
    }, [runners, search, letter]);

    const updatedAtLabel = scrapedAt
        ? `Updated ${new Date(scrapedAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}`
        : '';

    return (
        <>
            {/* Search + Alphabet bar */}
            <div className='pt-4 pb-2 space-y-4'>
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
                        const has = runners.some(r => r.horse_name.toUpperCase().startsWith(l));
                        return (
                            <button
                                key={l}
                                onClick={() => { setLetter(l); setSearch(''); }}
                                disabled={!has}
                                className={`w-7 h-7 rounded-md text-xs font-medium transition-all ${letter === l ? 'bg-primary text-white' : has ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-gray-50 text-gray-300 cursor-not-allowed'}`}
                            >
                                {l}
                            </button>
                        );
                    })}
                </div>

                <p className='text-xs text-gray-400'>
                    {filtered.length} result{filtered.length !== 1 ? 's' : ''} found
                    {(search || letter) && <button onClick={() => { setSearch(''); setLetter(''); }} className='ml-2 text-primary hover:underline'>Clear filter</button>}
                </p>
            </div>

            {/* Desktop table */}
            <div className='hidden lg:block'>
                <UpComingRaceListView
                    items={filtered as Record<string, unknown>[]}
                    header={{
                        title: 'Previous Runner Results',
                        subHeading: 'Vahala Racing — Season Race Winners',
                        updatedAt: scrapedAt ?? undefined,
                    }}
                    columns={columns}
                />
            </div>

            {/* Mobile cards */}
            <div className='my-6 lg:hidden'>
                <UpcomingRacesMobile
                    title='Previous Runner Results'
                    subtitle={`Vahala Racing — Season Race Winners${updatedAtLabel ? ` · ${updatedAtLabel}` : ''}`}
                    items={filtered.map(r => ({
                        name: r.horse_name,
                        race: r.meeting,
                        location: r.event_name,
                        date: r.date,
                    }))}
                />
            </div>
        </>
    );
}
