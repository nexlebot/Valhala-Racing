import React from 'react'
import Navbar from '../_components/navbar'
import PageIntro from '../_components/PageIntro'
import LeftRightBlog from '../_components/leftRightBlog'
import { StablesFeatures } from '../_components/StablesFeatures'
import ContactForm from '../_components/ContactForm'

const featuresData = [
    {
        title: "Precision Training for Peak Performance",
        image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&h=600&fit=crop",
        paragraphs: [
            "Our team of expert trainers and caring handlers brings years of experience in **professional racing**, **elite behavior**, and **performance development**. Each horse receives individualized attention, tailored training plans, and proven methods and technique. Daily grooming, conditioning exercises, and close monitoring help us adjust routines for the best results. With a perfect balance of discipline and compassion, our staff creates an environment where thoroughbreds feel supported, motivated, and ready to excel. At Vahala Racing, true champions are shaped through expert guidance and consistent dedication.",
            "At Vahala Racing, true champions are shaped through expert guidance and consistent dedication."
        ],
        buttonText: "Meet Our Team"
    },
    {
        title: "Complete Care for Long-Term Strength",
        image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&h=600&fit=crop",
        paragraphs: [
            "Our wellness programs focus on recovery, flexibility, and injury prevention to keep every horse performing at its best. With hydrotherapy, stretching routines, and musculoskeletal treatments, each horse receives customized care that supports long-term health. Expert veterinarians regularly assess progress, ensuring treatment plans adapt to individual needs. Balanced nutrition, hydration monitoring, and a calm recovery environment promote physical and mental relaxation. At Vahala Racing, wellness is not just support — it is a commitment to building stronger, healthier, more resilient athletes.",
            "At Vahala Racing, wellness is not just support — it is a commitment to building stronger, healthier, more resilient athletes."
        ],
        buttonText: "Explore Wellness Programs"
    }
];

const page = () => {
    return (
        <div className='mx-6 lg:mx-12'>
            <Navbar hasBackgroundImage={false} />
            <PageIntro mainHeading="Our Facilities" intro="At Vahala Racing, we pride ourselves on our state-of-the-art facilities that provide the best environment for our horses to thrive. Our commitment to excellence is reflected in every aspect of our operations, from training to care."
                blocks={[
                    {
                        heading: "Unmatched Care Beyond the Track",
                        paragraphs: [
                            "At Valhalla Racing, our dedication extends far beyond performance. Every horse receives comprehensive care through advanced wellness programs, balanced nutrition, and constant monitoring tailored to its unique needs. From daily grooming routines to therapeutic treatments, our team ensures optimal physical and mental well-being. With unwavering attention and compassion, we create an environment where horses can recover, grow, and perform at their very best today and for every race ahead."
                        ]
                    },

                ]} />

            <StablesFeatures features={featuresData} />
            <div className='py-14'>
                <ContactForm />
            </div>
        </div>
    )
}

export default page