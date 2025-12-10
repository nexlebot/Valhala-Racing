import React from 'react'
import Navbar from '../_components/navbar'
import PageIntro from '../_components/PageIntro'
import ContactForm from '../_components/ContactForm'
import ContactSection from '../_components/ContactSection'

const page = () => {
    return (
        <div className='mx-6 lg:mx-12'>
            <Navbar hasBackgroundImage={false} />
            <PageIntro mainHeading='Contact Us' intro='Honoring race champions who earned glory through power, speed, and unforgettable victories.' />
            <ContactForm />
            <ContactSection mapSrc='/mapImage.jpg' />
        </div>
    )
}

export default page