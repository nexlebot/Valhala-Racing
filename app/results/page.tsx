import React from 'react'
import PageIntro from '../_components/PageIntro'
import Navbar from '../_components/navbar'
import WinsCard from '../_components/WinsCard'
import UpComingRaceListView, { Column } from '../_components/homePageSpecificSections/upComingRaceListView'
import UpcomingRacesMobile from '../_components/UpcomingRacesMobile'

const raceDataMobile = [
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
const raceDataDesktop = [
    {
        "horseName": "Midnight Echo",
        "position": "1st",
        "raceNumber": "Race #1",
        "location": "Cranbourne",
        "date": "Oct 19"
    },
    {
        "horseName": "Blaze Runner",
        "position": "1st",
        "raceNumber": "Race #2",
        "location": "Pakenham",
        "date": "Oct 5"
    },
    {
        "horseName": "Silver Comet",
        "position": "1st",
        "raceNumber": "Race #3",
        "location": "Mornington",
        "date": "Sep 21"
    },
    {
        "horseName": "Rapid Venture",
        "position": "1st",
        "raceNumber": "Race #4",
        "location": "Cranbourne",
        "date": "Aug 9"
    },
    {
        "horseName": "Silver Comet",
        "position": "1st",
        "raceNumber": "Race #5",
        "location": "Bendigo",
        "date": "Jul 15"
    },
    {
        "horseName": "Night Commander",
        "position": "1st",
        "raceNumber": "Race #6",
        "location": "Ballarat",
        "date": "Jun 7"
    },
    {
        "horseName": "Flashpoint",
        "position": "1st",
        "raceNumber": "Race #7",
        "location": "Sandown",
        "date": "May 18"
    }
]
const columns: Column[] = [
    { key: "horseName", label: "Horse Name", grow: 1 },
    { key: "position", label: "Position", grow: 1 },
    { key: "raceNumber", label: "Race Number", grow: 1 },
    { key: "location", label: "Race Location", grow: 1 },
    { key: "date", label: "Date", grow: 1, align: "left" },
];



const page = () => {
    return (
        <div className='mx-6 lg:mx-12'>
            <Navbar hasBackgroundImage={false} />

            <PageIntro mainHeading='Winner Result' intro='Honoring race champions who earned glory through power, speed, and unforgettable victories.' blocks={[
                {
                    heading: 'Where Legends Cross the Finish Line',
                    subHeading: 'Honoring the champions who defined victory.',
                    paragraphs: [

                        "Step into a world where greatness is not just achieved — it is earned through fearless spirit, relentless speed, and the desire to conquer the track. Witness champions who outran the odds, mastered every stride, and turned split-seconds into unforgettable history. Explore official race stats, winning times, and extraordinary performances that shaped legendary finishes. From the thunder of hooves to the roar of the crowd, every moment reflects pride, honor, and glory. Celebrate the finest racehorses, the brilliance of skilled jockeys, and the victories that will forever stand tall in the world of horse racing."
                    ]
                },
            ]} />

            <WinsCard />
            <div className='hidden lg:block'>
                <UpComingRaceListView items={raceDataDesktop} header={{
                    title: "Previous Runner Results",
                    subHeading: "Vahala Racing — Season Race Winners"
                }} columns={columns} />

            </div>
            <div className='my-6 lg:my-0 lg:hidden'>
                <UpcomingRacesMobile items={raceDataMobile} />
            </div>
        </div>
    )
}

export default page