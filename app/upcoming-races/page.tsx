import React from 'react'
import HeroSection from '../_components/HeroSection'
import Navbar from '../_components/navbar'
import MajorWins from '../_components/MajorWins'
import UpComingRaceListView from '../_components/homePageSpecificSections/upComingRaceListView'

const page = () => {
    return (
        <>
            <Navbar />
            <HeroSection title="Ride the Excitement, Chase the Finish Line" description="Join us for upcoming races featuring elite horses, thrilling moments, and unforgettable experiences on the track." backgroundImage="/upcomingRaceHeroImage.png" overlayColor='bg-black/10' />
            <UpComingRaceListView />
        </>
    )
}

export default page