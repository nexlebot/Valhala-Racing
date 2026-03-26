import HorseProfile from '@/app/_components/HorseProfile'
import Slider from '../../_components/Slider'
import CareerStats from '@/app/_components/CareerStats'
import Navbar from '@/app/_components/navbar'
import PageIntro from '@/app/_components/PageIntro'
import VideoPlayer from '@/app/_components/VideoPlayer'
import { notFound } from 'next/navigation'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

function getHorse(id: string) {
    const horses = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'horses.json'), 'utf-8'));
    return horses.find((h: { id: number }) => String(h.id) === id) ?? null;
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const horse = getHorse(id);
    if (!horse) notFound();

    const galleryImages = (horse.gallery || []).map((g: { url: string }) => ({ url: g.url, alt: horse.title }));

    return (
        <div className='mx-6 lg:mx-12'>
            <Navbar hasBackgroundImage={false} />
            <PageIntro mainHeading="Our Horses" intro='Champions bred with passion, trained for excellence.' />
            {galleryImages.length > 0 && <Slider images={galleryImages} />}
            <HorseProfile />

            <div className=''>
                <div className='my-14'>
                    <h1 className='text-primary text-3xl font-semibold py-6'>
                        About {horse.title}
                    </h1>
                    {horse.about
                        ? <div className='prose max-w-none' dangerouslySetInnerHTML={{ __html: horse.about }} />
                        : <p className='text-gray-500 italic'>No description added yet.</p>
                    }
                </div>

                {horse.videoUrl && (
                    <div className='mt-6 text-primary'>
                        <h1 className='font-semibold text-3xl mb-2'>Highlight Video</h1>
                        <p className='mb-4'>{horse.title} – Highlights</p>
                        <VideoPlayer url={horse.videoUrl} />
                    </div>
                )}
            </div>
            <CareerStats />
        </div>
    )
}
