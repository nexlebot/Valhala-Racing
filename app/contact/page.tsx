import React from 'react'
import Navbar from '../_components/navbar'
import PageIntro from '../_components/PageIntro'
import ContactForm from '../_components/ContactForm'
import LocationSection from '../_components/LocationSection'

const page = () => {
    return (
        <div className='mx-6 lg:mx-12'>
            <Navbar hasBackgroundImage={false} />
            <PageIntro mainHeading='Contact Us' intro='Honoring race champions who earned glory through power, speed, and unforgettable victories.' />
            <div className='py-6 lg:py-0'>
                <ContactForm />
            </div>


            <LocationSection mapSrc='/mapImage.jpg' />
        </div>
    )
}

export default page