import React from 'react'
import Navbar from '../_components/navbar'
import PageIntro from '../_components/PageIntro'
import HorseGallery from '../_components/HorseGallery'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

const data = {
    mainHeading: "Our Horse",
    intro: "A loyal and strong companion who stays with us on every journey.",
    blocks: [
        {
            heading: "Horse Care & Training",
            subHeading: "Basic Guide for a Healthy and Well-Trained Horse",
            paragraphs: [
                "Taking proper care of a horse is essential to maintain its health, strength, and trust. Providing clean water and nutritious feed daily is the first and most important step.",
                "Regular grooming keeps the horse's coat and skin healthy while also strengthening your bond with it.",
                "During training, the horse should be taught with patience and consistency—starting with basic commands like walking, stopping, and turning, and gradually moving toward advanced skills.",
                "Proper exercise, routine health checkups, and a clean, safe resting space are also crucial. With good care and training, a horse not only stays fit but also becomes a dependable and loyal companion."
            ]
        }
    ],
};

const Page = () => {
    const horses = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'horses.json'), 'utf-8'));
    return (
        <div className='mx-6 lg:mx-12'>
            <Navbar hasBackgroundImage={false} />
            <PageIntro {...data} />
            <HorseGallery images={horses} />
        </div>
    )
}

export default Page;
