import HorseProfile from '@/app/_components/HorseProfile'
import Slider from '../../_components/Slider'
import CareerStats from '@/app/_components/CareerStats'
import Navbar from '@/app/_components/navbar'
import PageIntro from '@/app/_components/PageIntro'
import VideoPlayer from '@/app/_components/VideoPlayer'


const page = () => {
    return (
        <div className='mx-6 lg:mx-12'>
            <Navbar hasBackgroundImage={false} />
            <PageIntro mainHeading="Our Horses" intro='Champions bred with passion, trained for excellence.' />
            <Slider />
            <HorseProfile />

            <div className=''>
                <div className='my-14'>

                    <h1 className='text-[#1ADB04] text-3xl font-semibold py-6'>
                        About Blaze King
                    </h1>
                    <p className='mb-1'>Blaze King is one of the most promising middle-distance runners of the current racing circuit. Known for his fiery acceleration and exceptional race intelligence, he consistently demonstrates strong stamina and the ability to dominate the final stretch. Trainers praise his willingness to learn and his controlled, powerful stride that sets him apart from other horses of his class.</p>
                    <p>Over the years, Blaze King has built a reputation for delivering his best in high-pressure competitions. His recent victory at the Horizon Derby 2025 showcased not only his physical capability but also his calm temperament despite challenging race conditions. With an excellent training team and natural athleticism, he is expected to continue rising in top-tier events throughout the season.</p>
                </div>
                <div className='mt-6 text-[#1ADB04]'>
                    <h1 className=' font-semibold text-3xl mb-2'>Highlight Video</h1>
                    <p className='mb-4'>Blaze King – Horizon Derby 2025 Highlights</p>
                    <VideoPlayer url="https://www.youtube.com/embed/dQw4w9WgXcQ" />
                </div>
            </div>
            <CareerStats />
        </div>
    )
}

export default page