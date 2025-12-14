"use client"
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Button from "./Button";

interface NavItem {
    label: string;
    href: string;
}

interface NavbarProps {
    navItems?: NavItem[];
    logoSrc?: string;
    logoWidth?: number;
    logoHeight?: number;
    logoAlt?: string;
    ctaLabel?: string;
    ctaHref?: string;
    hasBackgroundImage?: boolean;
    className?: string;
}

export default function Navbar({
    navItems = [
        { label: "Home", href: "/" },
        { label: "Ownership", href: "/ownership" },
        { label: "Upcoming Races", href: "/upcoming-races" },
        { label: "Results", href: "/results" },
        { label: "Our Horses", href: "/our-horses" },
        { label: "Our Facilities", href: "/our-facilities" },
        { label: "Contact", href: "/contact" },
    ],
    logoSrc = "/logo.png",
    logoWidth = 120,
    logoHeight = 64,
    logoAlt = "logo",
    ctaLabel = "Merch Store",
    ctaHref = "/merch",
    hasBackgroundImage = true,
    className = "",
}: NavbarProps) {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    // Dynamic color classes based on background
    const textColor = hasBackgroundImage ? "text-white" : "text-gray-900";
    const textColorHover = hasBackgroundImage ? "hover:text-white" : "hover:text-gray-700";
    const activeTextColor = hasBackgroundImage ? "text-[#1ADB04]" : "text-[#1ADB04]";
    const pillBg = hasBackgroundImage ? "bg-white/10 ring-white" : "bg-[#1ADB041A] ring-[#1ADB04]";
    const mobileBg = hasBackgroundImage ? "bg-white/6" : "bg-gray-100";
    const mobileTextColor = hasBackgroundImage ? "text-white/90" : "text-gray-700";
    const mobileTextColorHover = hasBackgroundImage ? "hover:text-white" : "hover:text-gray-900";
    const hamburgerBg = hasBackgroundImage ? "bg-white/6" : "bg-gray-100";

    return (
        <header className={`w-full absolute top-6 left-0 z-50 ${className}`}>
            <div className="mx-auto px-6 lg:px-12">
                <div className="flex items-center justify-between">
                    {/* Left: logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src={logoSrc}
                            width={logoWidth}
                            height={logoHeight}
                            alt={logoAlt}
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
                            className={`inline-flex items-center gap-9 rounded-full ${pillBg} backdrop-blur-sm px-6 py-2 ring-[0.5px] shadow-sm`}
                            role="list"
                        >
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className={`relative inline-block font-normal py-1 text-sm transition-all  ${isActive
                                                ? activeTextColor
                                                : `${textColor} ${textColorHover}`
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
                        <Button label={ctaLabel} className="hidden sm:inline-flex text-base! font-normal" />

                        {/* Mobile: hamburger */}
                        <button
                            type="button"
                            aria-controls="mobile-menu"
                            aria-expanded={open}
                            aria-label={open ? "Close menu" : "Open menu"}
                            onClick={() => setOpen((s) => !s)}
                            className={`inline-flex items-center justify-center rounded-md p-2 lg:hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${hamburgerBg} ${textColor}`}
                        >
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
                <div className={`mx-auto mt-3 max-w-6xl rounded-lg ${mobileBg} backdrop-blur-md p-4 shadow-lg`}>
                    <ul className="flex flex-col gap-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={() => setOpen(false)}
                                        className={`block rounded-md px-3 py-2 text-base font-medium transition-colors ${isActive
                                            ? activeTextColor
                                            : `${mobileTextColor} ${mobileTextColorHover}`
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                        <li className="pt-2">
                            <Link
                                href={ctaHref}
                                onClick={() => setOpen(false)}
                                className="block w-full text-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md"
                            >
                                {ctaLabel}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}