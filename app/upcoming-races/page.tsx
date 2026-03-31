import React from 'react'
import HeroSection from '../_components/HeroSection'
import Navbar from '../_components/navbar'
import UpComingRaceListView, { Column } from '../_components/homePageSpecificSections/upComingRaceListView'
import UpcomingRacesMobile from '../_components/UpcomingRacesMobile'
import { IoLocationSharp } from 'react-icons/io5'
import { FaCalendarAlt } from "react-icons/fa";
import { getUpcomingRaces, getScrapedAt } from '../../lib/getTrainerRaces';

export const dynamic = 'force-dynamic'

const columns: Column[] = [
    { key: "horse_name", label: "Horse Name", width: "flex-[0_0_300px]" },
    { key: "race_number", label: "Race Number", width: "flex-[0_0_260px]" },
    { key: "race_details", label: "Race Position", width: "flex-[0_0_400px]" },
    { key: "date", label: "Date", width: "flex-[0_0_200px]", align: "left" },
];

const page = async () => {
    const [races, scrapedAt] = await Promise.all([getUpcomingRaces(), getScrapedAt()]);
    const raceData = races.map(r => ({
        horse_name: r.horse_name,
        race_number: `Race #${r.race_number}`,
        race_details: r.track,
        date: r.date,
    }));
    return (
        <div className=''>
            <Navbar />
            <HeroSection title="Ride the Excitement, Chase the Finish Line" description="Join us for upcoming races featuring elite horses, thrilling moments, and unforgettable experiences on the track." backgroundImage="/upcomingRaceHeroImage.png" overlayColor='bg-black/10' buttons={[
                {
                    text: "View Ownership Opportunities",
                    href: "/ownership",
                    icon: <FaCalendarAlt className="w-5 h-5" />,
                    variant: "primary",
                },
                {
                    text: "Results",
                    href: "/results",
                    icon: <IoLocationSharp className="w-5 h-5" />,
                    variant: "secondary",
                }
            ]} />
            <div className="mx-6 lg:mx-12 hidden lg:block ">
                <UpComingRaceListView items={raceData as Record<string, unknown>[]} header={{
                    title: "Upcoming Races",
                    subtitle: "Stay ahead of the action — explore the latest horse racing events happening soon across Australia.",
                    updatedAt: scrapedAt ?? undefined,
                }}
                    columns={columns}
                />
            </div>
            <div className='mx-6 my-6 lg:mx-12 lg:hidden'>
                <UpcomingRacesMobile items={raceData.map(r => ({ name: r.horse_name, race: r.race_number, location: r.race_details as string, date: r.date }))} />
            </div>
        </div>
    )
}

export default page