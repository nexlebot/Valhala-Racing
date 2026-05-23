import { MetadataRoute } from 'next';
import { getJSON } from '@/lib/storage';

export const dynamic = 'force-dynamic';

const BASE_URL = 'https://www.vahalaracingstables.com.au';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [horses, syndications] = await Promise.all([
        getJSON('horses', 'list').then((d: unknown) => (d as { id: number; slug?: string }[]) ?? []),
        getJSON('syndications', 'list').then((d: unknown) => (d as { id: number; slug?: string }[]) ?? []),
    ]);

    const staticPages: MetadataRoute.Sitemap = [
        { url: BASE_URL, priority: 1.0, changeFrequency: 'daily' },
        { url: `${BASE_URL}/our-horses`, priority: 0.9, changeFrequency: 'daily' },
        { url: `${BASE_URL}/ownership`, priority: 0.8, changeFrequency: 'daily' },
        { url: `${BASE_URL}/upcoming-races`, priority: 0.8, changeFrequency: 'daily' },
        { url: `${BASE_URL}/results`, priority: 0.8, changeFrequency: 'daily' },
        { url: `${BASE_URL}/gallery`, priority: 0.8, changeFrequency: 'daily' },
        { url: `${BASE_URL}/contact`, priority: 0.8, changeFrequency: 'daily' },
    ];

    const horsePages: MetadataRoute.Sitemap = horses.map((h) => ({
        url: `${BASE_URL}/our-horses/${h.slug || h.id}`,
        priority: 0.8,
        changeFrequency: 'daily',
    }));

    const ownershipPages: MetadataRoute.Sitemap = syndications.map((s) => ({
        url: `${BASE_URL}/ownership/${s.slug || s.id}`,
        priority: 0.8,
        changeFrequency: 'daily',
    }));

    return [...staticPages, ...horsePages, ...ownershipPages];
}
