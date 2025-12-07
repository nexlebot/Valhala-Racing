"use client"
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
    { label: "Home", href: "/" },
    { label: "Ownership", href: "/ownership" },
    { label: "Upcoming Races", href: "/upcoming" },
    { label: "Results", href: "/results" },
    { label: "Our Horses", href: "/our-horses" },
    { label: "Our Facilities", href: "/our-facilities" },
    { label: "Contact", href: "/contact" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    return (
        <header className="w-full absolute top-6 left-0 z-50">
            <div className="mx-auto px-12">
                <div className="flex items-center justify-between">
                    {/* Left: logo */}
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

                    {/* Center: pill navigation (hidden on small screens) */}
                    <nav
                        aria-label="Primary"
                        className="hidden lg:flex flex-1 items-center justify-center"
                    >
                        <ul
                            className="inline-flex items-center gap-9 rounded-full bg-white/10 backdrop-blur-sm px-6 py-2 ring-[0.5px]  ring-white shadow-sm"
                            role="list"
                        >
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className={`relative inline-block font-normal py-1 text-sm transition-all ${isActive ? "text-primary" : "text-white hover:text-white"
                                                }`}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Right: CTA and mobile button */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/merch"
                            className="hidden sm:inline-flex rounded-full bg-primary px-4 py-2  text-white shadow-md hover:scale-[1.02] transition-transform"
                        >
                            Merch Store
                        </Link>

                        {/* Mobile: hamburger */}
                        <button
                            type="button"
                            aria-controls="mobile-menu"
                            aria-expanded={open}
                            aria-label={open ? "Close menu" : "Open menu"}
                            onClick={() => setOpen((s) => !s)}
                            className="inline-flex items-center justify-center rounded-md p-2 lg:hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary bg-white/6"
                        >
                            {/* simple icon */}
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                                aria-hidden="true"
                            >
                                {open ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu (small screens) */}
            <div
                id="mobile-menu"
                className={`md:hidden px-4 transition-[max-height,opacity,transform] duration-200 ease-out origin-top ${open ? "max-h-[400px] opacity-100 scale-y-100" : "max-h-0 opacity-0 scale-y-95 pointer-events-none"
                    }`}
                aria-hidden={!open}
            >
                <div className="mx-auto mt-3 max-w-6xl rounded-lg bg-white/6 backdrop-blur-md p-4 shadow-lg">
                    <ul className="flex flex-col gap-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={() => setOpen(false)}
                                        className={`block rounded-md px-3 py-2 text-base font-medium transition-colors ${isActive ? "text-primary" : "text-white/90 hover:text-white"
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                        <li className="pt-2">
                            <Link
                                href="/merch"
                                onClick={() => setOpen(false)}
                                className="block w-full text-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md"
                            >
                                Merch Store
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}
