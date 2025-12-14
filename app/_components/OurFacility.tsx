import React from 'react'
import SectionHeader from './sectionHeader'
import { StablesFeatures } from './StablesFeatures'

const featuresData = [
    {
        image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&h=600&fit=crop",
        paragraphs: [
            "Our team of expert trainers and caring handlers brings years of experience in **professional racing**, **elite behavior**, and **performance development**. Each horse receives individualized attention, tailored training plans, and proven methods and technique. Daily grooming, conditioning exercises, and close monitoring help us adjust routines for the best results. With a perfect balance of discipline and compassion, our staff creates an environment where thoroughbreds feel supported, motivated, and ready to excel. At Vahala Racing, true champions are shaped through expert guidance and consistent dedication.",
            "At Vahala Racing, true champions are shaped through expert guidance and consistent dedication."
        ],
        buttonText: "Tour our facilities",
        buttonLink: "/our-facilities"
    }

];
const OurFacility = () => {
    return (
        <div className='mx-6 lg:mx-12'>
            <SectionHeader title='Our Facilities' subtitle='World-class infrastructure built to train champions and inspire excellence.' buttonText='See facilities' buttonLink='/our-facilities' buttonVariant='secondary' />
            <StablesFeatures features={featuresData} />
        </div>
    )
}

export default OurFacility