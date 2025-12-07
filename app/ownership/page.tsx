import React from 'react'
import Navbar from '../_components/navbar'
import HorsesCard from '../_components/HorsesCard'

const page = () => {
    return (
        <div className='mx-6 lg:mx-12'>
            <div>
                <Navbar hasBackgroundImage={false} />
            </div>
            <div className='mt-28 lg:mt-44'>
                <div>
                    <h1 className='font-semibold text-4xl text-[#1ADB04]'>Ownership</h1>
                    <p className='mt-2'>At Vahala Racing, ownership is more than a title — it’s an invitation to become part of a legacy built on passion, precision, and purpose. Every experience brings you closer to the heart of the sport, from early-morning training sessions to thrilling race-day victories. With Vahala, you step into a world where dedication, teamwork, and the pursuit of excellence define every stride.</p>
                    <h3 className='font-medium text-2xl text-[#1ADB04] mt-6'>Your Path Into the Vahala Experience</h3>
                    <p className='font-medium text-lg text-[#000000B2] mt-2'>Feel the pride, excitement, and fulfillment that come with owning a racehorse.</p>
                    <p className='text-[#000000CC]'>At Vahala Racing, we believe every owner should feel deeply connected — to the horses, the team, and the journey that shapes each athlete. Our ownership opportunities offer a fully immersive experience, giving you an inside look at the training, development, and care that turn young prospects into champions.</p>
                    <p className='mt-2 text-[#000000CC]'>Through exclusive access, personalized updates, behind-the-scenes moments, and premium race-day hospitality, we ensure your ownership experience is both meaningful and unforgettable. You’ll witness the discipline, strategy, and passion that fuel our stable and strengthen the bond between horse, rider, and team.</p>
                    <p className='mt-2 text-[#000000CC]'>With Vahala Racing, you’re not just investing in a horse — you’re becoming part of a community where excellence is the standard and every victory is shared.</p>
                </div>

                <div>

                    <h3 className='font-medium text-2xl text-[#1ADB04] mt-6'>Step Into the Winner’s Circle</h3>
                    <p className='font-medium text-lg text-[#000000B2] mt-2'>Feel the pride, excitement, and fulfillment that come with owning a racehorse.</p>
                    <p className='mt-2 text-[#000000CC]'>Join us and experience a partnership built on trust, transparency, and a shared love for the sport. At Vahala Racing, every stride reflects the commitment of the people who believe in our horses — owners who stand with us on the path to greatness.</p>
                </div>
            </div>
            <HorsesCard />
        </div>
    )
}

export default page