import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://www.valhallaracing.com.au';

export default function sitemap(): MetadataRoute.Sitemap {
    const horses = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'horses.json'), 'utf-8'));

    const staticPages = [
        { url: BASE_URL, priority: 1.0, changeFrequency: 'weekly' as const },
        { url: `${BASE_URL}/our-horses`, priority: 0.9, changeFrequency: 'weekly' as const },
        { url: `${BASE_URL}/ownership`, priority: 0.8, changeFrequency: 'weekly' as const },
        { url: `${BASE_URL}/upcoming-races`, priority: 0.8, changeFrequency: 'daily' as const },
        { url: `${BASE_URL}/results`, priority: 0.7, changeFrequency: 'weekly' as const },
        // { url: `${BASE_URL}/our-facilities`, priority: 0.6, changeFrequency: 'monthly' as const },
        { url: `${BASE_URL}/gallery`, priority: 0.6, changeFrequency: 'monthly' as const },
        { url: `${BASE_URL}/contact`, priority: 0.5, changeFrequency: 'monthly' as const },
    ];

    const horsePages = horses.map((h: { id: number }) => ({
        url: `${BASE_URL}/our-horses/${h.id}`,
        priority: 0.8,
        changeFrequency: 'weekly' as const,
    }));

    return [...staticPages, ...horsePages];
}
