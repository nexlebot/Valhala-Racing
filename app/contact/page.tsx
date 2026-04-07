import React from 'react'
import Navbar from '../_components/navbar'
import PageIntro from '../_components/PageIntro'
import LocationSection from '../_components/LocationSection'

const page = () => {
    return (
        <div className='mx-6 lg:mx-12'>
            <Navbar hasBackgroundImage={false} />
            <PageIntro mainHeading='Contact Vahala Racing' intro='Your direct line to our ownership team and Ascot-based training facilities.' />
            <LocationSection mapSrc='/mapImage.jpg' />
        </div>
    )
}

export default page