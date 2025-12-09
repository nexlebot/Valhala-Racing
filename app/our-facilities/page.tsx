import React from 'react'
import Navbar from '../_components/navbar'
import PageIntro from '../_components/PageIntro'
import LeftRightBlog from '../_components/leftRightBlog'
import { StablesFeatures } from '../_components/StablesFeatures'
import ContactForm from '../_components/ContactForm'

const featuresData = [
    {
        title: "Modern Stables Built for Comfort & Safety",
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
        <>
            <Navbar hasBackgroundImage={false} />
            <PageIntro mainHeading="Our Facilities" intro="At Vahala Racing, we pride ourselves on our state-of-the-art facilities that provide the best environment for our horses to thrive. Our commitment to excellence is reflected in every aspect of our operations, from training to care."
                blocks={[
                    {
                        heading: "Cutting-Edge Training Facilities",
                        paragraphs: [
                            "Our training facilities are equipped with the latest technology and amenities to ensure our horses receive top-notch care and training. From advanced treadmills to spacious paddocks, we provide an environment that promotes health and performance."
                        ]
                    },
                    {
                        heading: "Expert Care and Management",
                        paragraphs: [
                            "Our team of experienced professionals is dedicated to the well-being of our horses. From nutritionists to veterinarians, we have a comprehensive support system in place to ensure each horse receives personalized care tailored to their needs."
                        ]
                    },
                    {
                        heading: "A Commitment to Excellence",
                        paragraphs: [
                            "At Vahala Racing, our facilities are more than just buildings; they are a testament to our dedication to the sport of horse racing. We continuously invest in our infrastructure to provide the best possible environment for our horses and team."
                        ]
                    }
                ]} />

            <StablesFeatures features={featuresData} />

            <ContactForm />
        </>
    )
}

export default page