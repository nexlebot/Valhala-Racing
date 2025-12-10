import React from 'react'
import Navbar from '../_components/navbar'
import PageIntro from '../_components/PageIntro'
import HorseGallery from '../_components/HorseGallery'

interface GalleryImage {
    id: string | number;
    url: string;
    title: string;
    age: string;
    color: string;
    sire: string;
    dam: string;
    career: string;
}

const sampleHorses: GalleryImage[] = [
    {
        id: 1,
        url: 'https://images.pexels.com/photos/1996333/pexels-photo-1996333.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Blaze King',
        age: '5 Years',
        color: 'Bay',
        sire: 'Storm Rider',
        dam: 'Flame Queen',
        career: '25 Starts, 7-8-2'
    },
    {
        id: 2,
        url: 'https://images.pexels.com/photos/635499/pexels-photo-635499.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Midnight Thunder',
        age: '4 Years',
        color: 'Black',
        sire: 'Dark Storm',
        dam: 'Night Sky',
        career: '18 Starts, 5-6-3'
    },
    {
        id: 3,
        url: 'https://images.pexels.com/photos/850359/pexels-photo-850359.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Golden Spirit',
        age: '6 Years',
        color: 'Chestnut',
        sire: 'Sunset Glory',
        dam: 'Dawn Breaker',
        career: '32 Starts, 9-7-4'
    }, {
        id: 1,
        url: 'https://images.pexels.com/photos/1996333/pexels-photo-1996333.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Blaze King',
        age: '5 Years',
        color: 'Bay',
        sire: 'Storm Rider',
        dam: 'Flame Queen',
        career: '25 Starts, 7-8-2'
    },
    {
        id: 2,
        url: 'https://images.pexels.com/photos/635499/pexels-photo-635499.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Midnight Thunder',
        age: '4 Years',
        color: 'Black',
        sire: 'Dark Storm',
        dam: 'Night Sky',
        career: '18 Starts, 5-6-3'
    },
    {
        id: 3,
        url: 'https://images.pexels.com/photos/850359/pexels-photo-850359.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Golden Spirit',
        age: '6 Years',
        color: 'Chestnut',
        sire: 'Sunset Glory',
        dam: 'Dawn Breaker',
        career: '32 Starts, 9-7-4'
    }, {
        id: 1,
        url: 'https://images.pexels.com/photos/1996333/pexels-photo-1996333.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Blaze King',
        age: '5 Years',
        color: 'Bay',
        sire: 'Storm Rider',
        dam: 'Flame Queen',
        career: '25 Starts, 7-8-2'
    },
    {
        id: 2,
        url: 'https://images.pexels.com/photos/635499/pexels-photo-635499.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Midnight Thunder',
        age: '4 Years',
        color: 'Black',
        sire: 'Dark Storm',
        dam: 'Night Sky',
        career: '18 Starts, 5-6-3'
    },
    {
        id: 3,
        url: 'https://images.pexels.com/photos/850359/pexels-photo-850359.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Golden Spirit',
        age: '6 Years',
        color: 'Chestnut',
        sire: 'Sunset Glory',
        dam: 'Dawn Breaker',
        career: '32 Starts, 9-7-4'
    }, {
        id: 1,
        url: 'https://images.pexels.com/photos/1996333/pexels-photo-1996333.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Blaze King',
        age: '5 Years',
        color: 'Bay',
        sire: 'Storm Rider',
        dam: 'Flame Queen',
        career: '25 Starts, 7-8-2'
    },
    {
        id: 2,
        url: 'https://images.pexels.com/photos/635499/pexels-photo-635499.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Midnight Thunder',
        age: '4 Years',
        color: 'Black',
        sire: 'Dark Storm',
        dam: 'Night Sky',
        career: '18 Starts, 5-6-3'
    },
    {
        id: 3,
        url: 'https://images.pexels.com/photos/850359/pexels-photo-850359.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Golden Spirit',
        age: '6 Years',
        color: 'Chestnut',
        sire: 'Sunset Glory',
        dam: 'Dawn Breaker',
        career: '32 Starts, 9-7-4'
    }
];
const data = {
    mainHeading: "Our Horse",
    intro: "A loyal and strong companion who stays with us on every journey.",
    blocks: [
        {
            heading: "Horse Care & Training",
            subHeading: "Basic Guide for a Healthy and Well-Trained Horse",
            paragraphs: [
                "Taking proper care of a horse is essential to maintain its health, strength, and trust. Providing clean water and nutritious feed daily is the first and most important step.",
                "Regular grooming keeps the horse’s coat and skin healthy while also strengthening your bond with it.",
                "During training, the horse should be taught with patience and consistency—starting with basic commands like walking, stopping, and turning, and gradually moving toward advanced skills.",
                "Proper exercise, routine health checkups, and a clean, safe resting space are also crucial. With good care and training, a horse not only stays fit but also becomes a dependable and loyal companion."
            ]
        }
    ],
};

const Page = () => {
    return (
        <div className='mx-6 lg:mx-12'>
            <Navbar hasBackgroundImage={false} />
            <PageIntro {...data} />
            <HorseGallery images={sampleHorses} />
        </div>
    )
}

export default Page;
