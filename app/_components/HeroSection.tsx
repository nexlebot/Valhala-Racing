// components/HeroSection.tsx
import React, { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HeroButton {
    text: string;
    href: string;
    icon?: ReactNode;
    variant?: "primary" | "secondary"; // Optional: allows different button styles
}

interface HeroSectionProps {
    title: string;
    subtitle?: string;
    description: string;
    backgroundImage: string;
    overlayColor?: string;
    buttons?: HeroButton[]; // Accept multiple buttons
}

const HeroSection: React.FC<HeroSectionProps> = ({
    title,
    subtitle,
    description,
    backgroundImage,
    overlayColor = "bg-black/45",
    buttons = [],
}) => {
    return (
        <section className="relative min-h-[75vh] lg:min-h-[127vh] 2xl:min-h-screen w-full overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={backgroundImage}
                    alt="Hero Background"
                    fill
                    className="object-cover object-top"
                    priority
                />
                <div className={`absolute inset-0 ${overlayColor}`} />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 w-full z-10 flex flex-col justify-center px-6 md:px-12">
                <div>
                    <h1 className="max-w-2xl mb-4 text-4xl font-semibold italic leading-tight text-white md:text-5xl">
                        {title}
                    </h1>

                    {subtitle && (
                        <h2 className="mb-4 text-xl font-medium text-white/90">{subtitle}</h2>
                    )}

                    <div className='m-auto max-w-6xl my-7 border-t border-white/30' />

                    <div className='md:flex justify-center items-center gap-7 pb-12 lg:pb-4'>
                        <p className="mb-8 max-w-md text-sm text-white/90 md:text-base">
                            {description}
                        </p>

                        {/* Buttons */}
                        {buttons.length > 0 && (
                            <div className="flex flex-col gap-4 lg:flex-row sm:items-center">
                                {buttons.map((btn, index) => {
                                    const baseClasses = "flex items-center justify-center gap-2 rounded-full px-6 py-1 transition-all md:px-8 md:py-3 cursor-pointer";
                                    const variantClasses =
                                        btn.variant === "secondary"
                                            ? "border-2 border-white bg-white text-primary hover:bg-white/90"
                                            : "bg-primary text-white hover:bg-green-600";

                                    return (
                                        <Link key={index} href={btn.href}>
                                            <button className={`flex items-center ${baseClasses} ${variantClasses}`}>
                                                {btn.icon && <span>{btn.icon}</span>}
                                                {btn.text}
                                            </button>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
