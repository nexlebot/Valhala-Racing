import Navbar from '@/app/_components/navbar'
import PageIntro from '@/app/_components/PageIntro'
import Slider from '@/app/_components/Slider'
import VideoPlayer from '@/app/_components/VideoPlayer'
import { notFound } from 'next/navigation'
import { getJSON } from '@/lib/storage'

export const dynamic = 'force-dynamic'

interface GalleryImage { url: string; isMain: boolean; }
interface Syndication {
    id: number;
    name: string;
    age: string;
    breed: string;
    sharePrice: string;
    description: string;
    about?: string;
    videoUrl?: string;
    videoTitle?: string;
    gallery?: GalleryImage[];
    pedigreeUrl?: string;
}

export default async function OwnershipDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const syndications = (await getJSON('syndications', 'list')) ?? [];
    const syn: Syndication | undefined = syndications.find((s: Syndication) => String(s.id) === id);
    if (!syn) notFound();

    const sliderImages = (syn.gallery ?? []).map(g => ({ url: g.url }));

    return (
        <div className='mx-6 lg:mx-12'>
            <Navbar hasBackgroundImage={false} />

            <PageIntro
                mainHeading="Ownership"
                intro="At Vahala Racing, ownership is more than a title — it's an invitation to become part of a legacy built on passion, precision, and purpose. Every experience brings you closer to the heart of the sport, from early-morning training sessions to thrilling race-day victories. With Vahala, you step into a world where dedication, teamwork, and the pursuit of excellence define every stride."
            />

            {/* Carousel */}
            {sliderImages.length > 0 && <Slider images={sliderImages} />}

            {syn.pedigreeUrl && (
                <div className='flex justify-center mt-4'>
                    <a
                        href={syn.pedigreeUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='px-8 py-3 rounded-full text-white font-medium text-base'
                        style={{ backgroundColor: '#1ADB04' }}
                    >
                        View Pedigree
                    </a>
                </div>
            )}

            <div className='py-6 lg:py-14 bg-white'>
                {/* Horse header info */}
                <div className='mb-6'>
                    <h2 className='text-2xl lg:text-3xl font-semibold mb-2' style={{ color: '#1ADB04' }}>{syn.name}</h2>
                    <div className='text-gray-700 space-y-1'>
                        <p><span className='font-semibold'>Age:</span> {syn.age}</p>
                        <p><span className='font-semibold'>Breed:</span> {syn.breed}</p>
                        <p className='font-medium text-base lg:text-lg mt-2' style={{ color: '#1ADB04' }}>
                            Share Price: {syn.sharePrice}
                        </p>
                    </div>
                </div>

                {/* Rich text content */}
                {syn.about && (
                    <div
                        className='rich-content text-gray-700 mb-6 break-words overflow-hidden'
                        dangerouslySetInnerHTML={{ __html: (() => {
                            let html = syn.about.includes('&lt;') ? syn.about.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&') : syn.about;
                            html = html.replace(/&nbsp;/g, ' ');
                            const match = html.match(/^\s*<div[^>]*class="[^"]*prose[^"]*"[^>]*>([\s\S]*)<\/div>\s*$/);
                            return match ? match[1].trim() : html;
                        })() }}
                    />
                )}
            </div>

            {/* Video */}
            {syn.videoUrl && (
                <div className='mt-6 pb-14 text-primary'>
                    <h2 className='font-semibold text-2xl lg:text-3xl mb-2'>Highlight Video</h2>
                    {syn.videoTitle && <p className='mb-6 text-sm lg:text-base'>{syn.videoTitle}</p>}
                    <div className='w-full'>
                        <VideoPlayer url={syn.videoUrl} />
                    </div>
                </div>
            )}

        </div>
    )
}
