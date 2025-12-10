import Image from "next/image";
import SectionHeader from "../sectionHeader";

type RaceItem = {
    name: string;
    race: string;
    location: string;
    date: string;
};

const items: RaceItem[] = [
    { name: "Thunder Blaze", race: "Race #12", location: "Melbourne Racecourse, Australia", date: "October 15, 2025" },
    { name: "Golden Stride", race: "Race #13", location: "Sydney Park Arena, Australia", date: "October 20, 2025" },
    { name: "Midnight Charger", race: "Race #14", location: "Adelaide Downs, Australia", date: "October 28, 2025" },
    { name: "Silver Arrow", race: "Race #15", location: "Brisbane Grand Track, Australia", date: "November 2, 2025" },
    { name: "Desert Comet", race: "Race #16", location: "Perth Racecourse, Australia", date: "November 10, 2025" },
];

export default function UpComingRaceListView() {
    return (
        <section className="py-14 mx-6 lg:mx-12">
            <SectionHeader
                title="Upcoming Races"
                subtitle="Stay ahead of the action — explore the latest horse racing events happening soon across Australia."
                buttonText="View races"
                buttonVariant="secondary"
            />
            <div className="space-y-8">
                {items.map((it, idx) => (
                    <article
                        key={it.name + idx}
                        className="relative overflow-visible"
                        aria-label={`Upcoming race ${it.race} for ${it.name}`}
                    >
                        <Image
                            src="/curvedLine.png"
                            alt="Curved line"
                            fill
                            className="absolute left-0 right-0 top-1/2 pointer-events-none hidden lg:block"
                        />

                        {/* Row content - flex layout */}
                        <div className="flex items-center justify-between gap-4 py-6">
                            {/* Left: horse name */}
                            <div className="flex-[0_0_270px] pr-4">
                                <h3 className="text-lg md:text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                                    {it.name}
                                </h3>
                            </div>

                            {/* Race title with green dot */}
                            <div className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-[#1ADB04] ring-2 ring-white" />
                                <span className="font-semibold text-sm md:text-base text-gray-700 dark:text-gray-200">
                                    {it.race}
                                </span>
                            </div>

                            {/* Location with green dot */}
                            <div className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-[#1ADB04] ring-2 ring-white" />
                                <span className="text-sm text-gray-700 dark:text-gray-200">{it.location}</span>
                            </div>

                            {/* Date with green dot, right aligned */}
                            <div className="flex items-center justify-end gap-3 flex-[0_0_240px]">
                                <span className="w-2 h-2 rounded-full bg-[#1ADB04] ring-2 ring-white" />
                                <span className="text-sm text-gray-700 dark:text-gray-200">{it.date}</span>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
