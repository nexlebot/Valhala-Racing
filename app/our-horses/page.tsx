import React from 'react'
import Navbar from '../_components/navbar'
import PageIntro from '../_components/PageIntro'
import HorseGallery from '../_components/HorseGallery'
import { getJSON } from '@/lib/storage'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Our Horses',
    description: 'Meet the Vahala Racing stable — elite thoroughbreds trained for excellence, speed, and legacy on Australian racetracks.',
}

export const dynamic = 'force-dynamic'

const data = {
    mainHeading: "Our Horses",
    intro: "Built on passion, patience, and performance, our stable is home to a talented group of thoroughbreds with exciting futures ahead. Every horse in our care is treated as an individual, with tailored training programs, expert attention, and the highest standard of care designed to help them reach their full potential both on and off the track.",
    blocks: [
        {
            paragraphs: [
                "From early education and development through to race day preparation, we take pride in creating an environment where our horses can thrive. Guided by a dedicated team and a commitment to excellence, we aim to give each horse every opportunity to succeed at the highest level.",
                "Explore our team of equine athletes and follow their journey from the training track to race day as they continue to grow, compete, and represent our stable with pride."
            ]
        }
    ],
};

const Page = async () => {
    const horses = (await getJSON('horses', 'list')) ?? [];
    return (
        <div className='mx-6 lg:mx-12'>
            <Navbar hasBackgroundImage={false} />
            <PageIntro {...data} />
            <HorseGallery images={horses} />
        </div>
    )
}

export default Page;
