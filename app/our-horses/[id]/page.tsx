import HorseProfile from '@/app/_components/HorseProfile'
import Slider from '../../_components/Slider'
import CareerStats from '@/app/_components/CareerStats'
import Navbar from '@/app/_components/navbar'
import PageIntro from '@/app/_components/PageIntro'
import VideoPlayer from '@/app/_components/VideoPlayer'
import { notFound } from 'next/navigation'
import { getJSON } from '@/lib/storage'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const horse = await getHorse(id);
    if (!horse) return {};
    return {
        title: `${horse.title} | Vahala Racing`,
        description: horse.about
            ? horse.about.replace(/<[^>]+>/g, '').slice(0, 155)
            : `${horse.title} – Age: ${horse.age}, Color: ${horse.color}, Sire: ${horse.sire}, Dam: ${horse.dam}. Career: ${horse.career}.`,
        openGraph: {
            title: `${horse.title} | Vahala Racing`,
            images: [horse.url],
        },
    };
}

async function getHorse(id: string) {
    const horses = (await getJSON('horses', 'list')) ?? [];
    return horses.find((h: { id: number }) => String(h.id) === id) ?? null;
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const horse = await getHorse(id);
    if (!horse) notFound();

    const galleryImages = (horse.gallery || []).map((g: { url: string }) => ({ url: g.url, alt: horse.title }));

    const scrapedData = await getJSON('scraped_data', 'horse_profiles');
    const profile = scrapedData?.profiles?.[horse.title] ?? null;
    const updatedAt = scrapedData?.updatedAt ?? null;

    return (
        <div className='mx-6 lg:mx-12'>
            <Navbar hasBackgroundImage={false} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'Animal',
                    name: horse.title,
                    description: horse.about?.replace(/<[^>]+>/g, '').slice(0, 200) || `${horse.title} – Age: ${horse.age}, Color: ${horse.color}`,
                    image: horse.url?.startsWith('http') ? horse.url : `https://www.valhallaracing.com.au${horse.url}`,
                    url: `https://www.valhallaracing.com.au/our-horses/${horse.id}`,
                }) }}
            />
            <PageIntro mainHeading="Our Horses" intro='Champions bred with passion, trained for excellence.' />
            {galleryImages.length > 0 && <Slider images={galleryImages} />}
            <HorseProfile profile={profile} updatedAt={updatedAt} />

            <div className=''>
                <div className='my-14'>
                    <h1 className='text-primary text-3xl font-semibold py-6'>
                        About {horse.title}
                    </h1>
                    {horse.about
                        ? <div className='rich-content break-words overflow-hidden' dangerouslySetInnerHTML={{ __html: horse.about.replace(/&nbsp;/g, ' ') }} />
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
            <CareerStats sections={profile?.stats ?? null} updatedAt={updatedAt} />
        </div>
    )
}
