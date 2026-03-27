'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MajorWin } from '../../lib/getTrainerRaces';

const PAGE_SIZE = 4;

const MajorWins: React.FC<{ wins: MajorWin[] }> = ({ wins }) => {
    const [page, setPage] = useState(0);
    const totalPages = Math.ceil(wins.length / PAGE_SIZE);
    const visible = wins.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

    return (
        <div className="w-full mt-6 lg:mt-0">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl font-semibold" style={{ color: '#1ADB04CC' }}>
                    Major Wins
                </h1>
                {totalPages > 1 && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setPage(p => p - 1)}
                            disabled={page === 0}
                            className="p-1.5 rounded-full border transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100"
                            style={{ borderColor: '#1ADB04CC' }}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-sm text-gray-500">{page + 1} / {totalPages}</span>
                        <button
                            onClick={() => setPage(p => p + 1)}
                            disabled={page === totalPages - 1}
                            className="p-1.5 rounded-full border transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100"
                            style={{ borderColor: '#1ADB04CC' }}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {visible.map((win, index) => (
                    <div
                        key={page * PAGE_SIZE + index}
                        className="relative rounded-2xl p-5 border transition-all duration-300 hover:shadow-lg"
                        style={{
                            backgroundColor: index === 0 ? '#1ADB04CC' : '#FFFFFF',
                            borderColor: '#1ADB04CC'
                        }}
                    >
                        <div className='flex justify-between items-center'>
                            <h3 className={`text-base font-medium leading-tight ${index === 0 ? 'text-white' : 'text-gray-900'}`}>
                                {win.event_name}
                            </h3>
                            <div className="inline-flex items-center justify-center">
                                <span
                                    className="text-xs font-semibold px-3 py-1 rounded-full"
                                    style={{
                                        backgroundColor: index === 0 ? 'white' : '#1ADB04CC',
                                        color: index === 0 ? '#1ADB04CC' : 'white'
                                    }}
                                >
                                    {win.position}
                                </span>
                            </div>
                        </div>
                        <p className={`text-sm mt-1 mb-2 ${index === 0 ? 'text-white/90' : 'text-gray-600'}`}>
                            {win.date} - {win.meeting}
                        </p>
                        <p className={`text-sm ${index === 0 ? 'text-white/90' : 'text-gray-600'}`}>
                            {win.race_info}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MajorWins;
