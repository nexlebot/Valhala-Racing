import Navbar from '@/app/_components/navbar'
import { notFound } from 'next/navigation'
import { getJSON } from '@/lib/storage'

export const dynamic = 'force-dynamic'

interface Syndication {
    id: number;
    slug?: string;
    name: string;
    pedigreeUrl?: string;
}

async function getSyndication(slug: string) {
    const syndications = (await getJSON('syndications', 'list')) ?? [];
    return syndications.find((s: Syndication) =>
        s.slug === slug || String(s.id) === slug
    ) ?? null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const syn = await getSyndication(slug);
    if (!syn) return {};
    return {
        title: `${syn.name} Pedigree | Vahala Racing`,
        description: `View the pedigree for ${syn.name} at Vahala Racing.`,
    };
}

export default async function PedigreePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const syn: Syndication | null = await getSyndication(slug);
    if (!syn || !syn.pedigreeUrl) notFound();

    return (
        <div className='mx-6 lg:mx-12'>
            <Navbar hasBackgroundImage={false} />
            <div className='mt-28 lg:mt-36 mb-6'>
                <h1 className='font-semibold text-2xl lg:text-4xl text-[#1ADB04]'>{syn.name}</h1>
                <p className='mt-2 text-sm lg:text-base text-gray-600'>Pedigree Document</p>
            </div>
            <div className='w-full h-[80vh] rounded-2xl overflow-hidden border border-gray-200'>
                <iframe
                    src={syn.pedigreeUrl}
                    className='w-full h-full'
                    title={`${syn.name} Pedigree`}
                />
            </div>
        </div>
    )
}
