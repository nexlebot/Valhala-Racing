import React from 'react'
import HeroSection from '../_components/HeroSection'
import Navbar from '../_components/navbar'

const page = () => {
    return (
        <>
            <Navbar />
            <HeroSection title="Own, Race, Win The Vahala Racing Way" description="Join a professional stable delivering high-performance horses, expert care, and exceptional ownership opportunities in   every race." backgroundImage="/heroImage.png" />
        </>
    )
}

export default page