import { Facebook, Instagram, Linkedin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: '#', label: 'Facebook' },
    { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram' },
    { icon: <Linkedin className="w-5 h-5" />, href: '#', label: 'LinkedIn' },
];

const navLinks = [
    { title: 'Home', href: '#' },
    { title: 'Upcoming Races', href: '#' },
    { title: 'Results', href: '#' },
    { title: 'Horses', href: '#' },
    { title: 'Facilities', href: '#' },
    { title: 'Contact', href: '#' },
];

export default function Footer() {
    return (
        <div className="w-full bg-white">
            <div className="px-4 sm:px-6 lg:px-12">
                {/* Top Section */}
                <div className="flex items-center justify-between pb-6">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src="/logo.png"
                            width={120}
                            height={64}
                            alt="logo"
                            className="w-[120px] h-auto"
                            priority
                        />
                    </Link>

                    {/* Social Icons */}
                    <div className="flex items-center gap-3">
                        {socialLinks.map((link, idx) => (
                            <a
                                key={idx}
                                href={link.href}
                                className="w-10 h-10 rounded-full bg-[#1ADB04] flex items-center justify-center text-white hover:bg-green-600 transition-colors"
                                aria-label={link.label}
                            >
                                {link.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-[#1ADB04]"></div>

                {/* Navigation and Copyright */}
                <div className="flex items-center justify-between py-7 flex-col lg:flex-row">
                    {/* Navigation Menu */}
                    <nav className="flex flex-col lg:flex-row items-center gap-3 lg:gap-6">
                        {navLinks.map((link, idx) => (
                            <a
                                key={idx}
                                href={link.href}
                                className="text-[#000000CC] text-sm lg:text-base hover:text-green-600 transition-colors"
                            >
                                {link.title}
                            </a>
                        ))}
                    </nav>

                    {/* Copyright */}
                    <div className="text-sm text-gray-600 mt-4 lg:mt-0">
                        © 2025 Vahala Racing. All Rights Reserved.
                    </div>
                </div>
            </div>
        </div>
    );
}
