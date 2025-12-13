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

type UpcomingRacesMobileProps = {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    buttonVariant?: 'primary' | 'secondary';
    items?: RaceItem[];
    borderColor?: string;
    dotColor?: string;
};

export default function UpcomingRacesMobile({
    title = "Upcoming Races",
    subtitle = "Stay ahead of the action — explore the latest horse racing events happening soon across Australia.",
    buttonText = "View races",
    buttonVariant = "secondary",
    items = [],
    borderColor = "#00D66F",
    dotColor = "#00D66F"
}: UpcomingRacesMobileProps) {
    return (
        <div className="bg-white">
            {/* Header Section */}
            <SectionHeader
                title={title}
                subtitle={subtitle}
                buttonText={buttonText}
                buttonVariant={buttonVariant}
            />

            {/* Race Cards */}
            <div className="space-y-4 mt-8">
                {items.map((item, idx) => (
                    <div
                        key={item.name + idx}
                        className="bg-white border-0 border-l-3 rounded-2xl p-5 shadow-lg"
                        style={{ borderLeftColor: borderColor }}
                    >
                        {/* Card Content */}
                        <div className="pr-3">
                            {/* Horse Name and Race Badge */}
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {item.name}
                                </h3>
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full">
                                    <span
                                        className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: dotColor }}
                                    />
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