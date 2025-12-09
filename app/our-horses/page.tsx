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
    }
];

const Page = () => {
    return (
        <>
            <Navbar hasBackgroundImage={false} />
            <PageIntro mainHeading="Our Horses" />
            <HorseGallery images={sampleHorses} />
        </>
    )
}

export default Page;
