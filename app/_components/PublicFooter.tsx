'use client';
import { usePathname } from 'next/navigation';
import Footer from './footer';
import NewsLetter from './newsLetter';

export default function PublicFooter() {
    const pathname = usePathname();
    if (pathname.startsWith('/admin')) return null;
    return (
        <>
            <NewsLetter />
            <Footer />
        </>
    );
}
