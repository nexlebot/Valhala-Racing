import React from 'react'
import HeroSection from '../_components/HeroSection'
import Navbar from '../_components/navbar'
import UpComingRaceListView, { Column } from '../_components/homePageSpecificSections/upComingRaceListView'
import UpcomingRacesMobile from '../_components/UpcomingRacesMobile'
import { IoLocationSharp } from 'react-icons/io5'
import { FaCalendarAlt } from "react-icons/fa";

const raceData = [
    {
        "name": "Thunder Blaze",
        "race": "Race #12",
        "location": "Melbourne Racecourse, Australia",
        "date": "October 18, 2025"
    },
    {
        "name": "Golden Stride",
        "race": "Race #7",
        "location": "Sydney Park Arena, Australia",
        "date": "October 20, 2025"
    },
    {
        "name": "Midnight Charger",
        "race": "Race #3",
        "location": "Adelaide Downs, Australia",
        "date": "October 28, 2025"
    },
    {
        "name": "Silver Arrow",
        "race": "Race #9",
        "location": "Brisbane Grand Track, Australia",
        "date": "November 2, 2025"
    }
]


const columns: Column[] = [
    { key: "name", label: "Horse Name", width: "flex-[0_0_300px]" },
    { key: "race", label: "Race Number", width: "flex-[0_0_260px]" },
    { key: "location", label: "Race Position", width: "flex-[0_0_400px]" },
    { key: "date", label: "Date", width: "flex-[0_0_200px]", align: "left" },
];

const page = () => {
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
                <UpComingRaceListView items={raceData} header={{
                    title: "Upcoming Races",
                    subtitle:
                        "Stay ahead of the action — explore the latest horse racing events happening soon across Australia.",
                }}
                    columns={columns}
                />
            </div>
            <div className='mx-6 my-6 lg:mx-12 lg:hidden'>
                <UpcomingRacesMobile items={raceData} />
            </div>
        </div>
    )
}

export default page