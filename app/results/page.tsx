import React from 'react'
import PageIntro from '../_components/PageIntro'
import Navbar from '../_components/navbar'
import WinsCard from '../_components/WinsCard'
import UpComingRaceListView from '../_components/homePageSpecificSections/upComingRaceListView'
import UpcomingRacesMobile from '../_components/UpcomingRacesMobile'

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
                <UpComingRaceListView />
            </div>
            <div className='my-6 lg:my-0 lg:hidden'>
                <UpcomingRacesMobile items={raceData} />
            </div>
        </div>
    )
}

export default page