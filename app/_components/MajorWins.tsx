import React from 'react';
import { Trophy } from 'lucide-react';

const MajorWins = () => {
    const wins = [
        {
            title: "Sonic Blaze",
            date: "1-12-2025",
            race: "R-2025-E5",
            track: "Pimlico"
        },
        {
            title: "Vahala Classic",
            date: "25-11-2025",
            race: "R-2025-E4",
            track: "Rapid Venture"
        },
        {
            title: "Season Finale Cup",
            date: "1-12-2025",
            race: "R-2025-E3",
            track: "Silver Comet"
        },
        {
            title: "Bendigo Gold Cup",
            date: "1-12-2025",
            race: "R-2025-E2",
            track: "Night Commander"
        },
        {
            title: "Sonic Blaze",
            date: "1-12-2025",
            race: "R-2025-E5",
            track: "Pimlico"
        },
        {
            title: "Vahala Classic",
            date: "25-11-2025",
            race: "R-2025-E4",
            track: "Rapid Venture"
        },
        {
            title: "Season Finale Cup",
            date: "1-12-2025",
            race: "R-2025-E3",
            track: "Silver Comet"
        },
        {
            title: "Sonic Blaze",
            date: "1-12-2025",
            race: "R-2025-E5",
            track: "Pimlico"
        },
        {
            title: "Bendigo Gold Cup",
            date: "1-12-2025",
            race: "R-2025-E2",
            track: "Night Commander"
        }
    ];

    return (
        <div className="w-full max-w-7xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-8" style={{ color: '#1ADB04' }}>
                Major Wins
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wins.map((win, index) => (
                    <div
                        key={index}
                        className="relative bg-white rounded-lg border-l-4 p-6 shadow-sm hover:shadow-md transition-shadow"
                        style={{ borderLeftColor: '#1ADB04' }}
                    >
                        {/* Trophy Icon */}
                        <div
                            className="absolute -left-6 top-6 w-12 h-12 rounded-full flex items-center justify-center shadow-md"
                            style={{ backgroundColor: '#1ADB04' }}
                        >
                            <Trophy className="w-6 h-6 text-white" />
                        </div>

                        {/* Content */}
                        <div className="pl-2">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                                {win.title}
                            </h3>
                            <p className="text-sm text-gray-500 mb-4">
                                {win.date}
                            </p>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="text-gray-400">#</span>
                                    <span className="text-gray-700">{win.race}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: '#1ADB04' }}
                                    />
                                    <span className="text-gray-700">{win.track}</span>
                                </div>
                            </div>
                        </div>

                        {/* Dotted line connector (for visual connection between cards) */}
                        {index % 3 !== 2 && (
                            <div
                                className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 border-t-2 border-dotted"
                                style={{ borderColor: '#1ADB04' }}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MajorWins;