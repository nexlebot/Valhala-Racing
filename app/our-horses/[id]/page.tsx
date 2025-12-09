import React from 'react'
import Slider from '../../_components/Slider'
import CareerStats from '@/app/_components/CareerStats'
import Navbar from '@/app/_components/navbar'
import PageIntro from '@/app/_components/PageIntro'

const page = () => {
    return (
        <div className='mx-12'>
            <Navbar hasBackgroundImage={false} />
            <PageIntro mainHeading="Our Horses" intro='Champions bred with passion, trained for excellence.' />
            <Slider />
            <CareerStats />
        </div>
    )
}

export default page