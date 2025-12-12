import React from 'react'
import HeroSection from '../_components/HeroSection'
import Navbar from '../_components/navbar'
import MajorWins from '../_components/MajorWins'
import UpComingRaceListView from '../_components/homePageSpecificSections/upComingRaceListView'
import UpcomingRacesMobile from '../_components/UpcomingRacesMobile'

const page = () => {
    return (
        <div className=''>
            <Navbar />
            <HeroSection title="Ride the Excitement, Chase the Finish Line" description="Join us for upcoming races featuring elite horses, thrilling moments, and unforgettable experiences on the track." backgroundImage="/upcomingRaceHeroImage.png" overlayColor='bg-black/10' />
            <div className="mx-6 lg:mx-12 hidden lg:block ">
                <UpComingRaceListView />
            </div>
            <div className='mx-6 my-6 lg:mx-12 lg:hidden'>
                <UpcomingRacesMobile />
            </div>
        </div>
    )
}

export default page