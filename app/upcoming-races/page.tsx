import React from 'react'
import HeroSection from '../_components/HeroSection'
import Navbar from '../_components/navbar'
import RacesClient from '../_components/homePageSpecificSections/RacesClient'
import { IoLocationSharp } from 'react-icons/io5'
import { FaCalendarAlt } from "react-icons/fa";
import { getUpcomingRaces, getScrapedAt } from '../../lib/getTrainerRaces';
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Upcoming Races',
    description: 'Stay ahead of the action — explore upcoming horse racing events featuring Vahala Racing thoroughbreds across Australia.',
}

export const dynamic = 'force-dynamic'

const page = async () => {
    const [races, scrapedAt] = await Promise.all([getUpcomingRaces(), getScrapedAt()]);
    
    // Handle empty data
    if (!races || races.length === 0) {
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
                <div className="mx-6 lg:mx-12 py-12 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">No Upcoming Races</h2>
                    <p className="text-gray-600">Check back soon for the latest race schedules and updates.</p>
                    {scrapedAt && (
                        <p className="text-sm text-gray-500 mt-2">Last updated: {new Date(scrapedAt).toLocaleString()}</p>
                    )}
                </div>
            </div>
        )
    }
    
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
            <RacesClient races={raceData} scrapedAt={scrapedAt} />
        </div>
    )
}

export default page