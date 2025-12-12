import React from 'react';
import { ChevronRight } from 'lucide-react';
import PageIntro from './PageIntro';
import SectionHeader from './sectionHeader';

type RaceItem = {
    name: string;
    race: string;
    location: string;
    date: string;
};

const items: RaceItem[] = [
    { name: "Thunder Blaze", race: "Race #12", location: "Melbourne Racecourse, Australia", date: "October 15, 2025" },
    { name: "Golden Stride", race: "Race #7", location: "Sydney Park Arena, Australia", date: "October 20, 2025" },
    { name: "Midnight Charger", race: "Race #3", location: "Adelaide Downs, Australia", date: "October 28, 2025" },
    { name: "Silver Arrow", race: "Race #9", location: "Brisbane Grand Track, Australia", date: "November 2, 2025" },
];

export default function UpcomingRacesMobile() {
    return (
        <div className="bg-white">
            {/* Header Section */}
            <SectionHeader title="Upcoming Races" subtitle='Stay ahead of the action — explore the latest horse racing events happening soon across Australia.' buttonText='View races' buttonVariant='secondary' />

            {/* Race Cards */}
            <div className="space-y-4 mt-8">
                {items.map((item, idx) => (
                    <div
                        key={item.name + idx}
                        className="bg-white border-0  border-l-3 border-[#00D66F] rounded-2xl p-5 shadow-lg"
                    >

                        {/* Card Content */}
                        <div className="pr-3">
                            {/* Horse Name and Race Badge */}
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {item.name}
                                </h3>
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full">
                                    <span className="w-2 h-2 rounded-full bg-[#00D66F]" />
                                    <span className="text-sm font-medium text-gray-600">
                                        {item.race}
                                    </span>
                                </div>
                            </div>

                            {/* Race Details */}
                            <div className="space-y-2 mb-3">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <span className="text-sm font-medium">{item.race}</span>
                                    <span className="text-gray-400">•</span>
                                    <span className="text-sm">{item.date}</span>
                                </div>
                                <div className="text-sm text-gray-500">
                                    {item.location}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}