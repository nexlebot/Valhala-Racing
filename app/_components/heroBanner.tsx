// components/HeroSection.tsx
import React from 'react';
import Image from 'next/image';
import { Trophy } from 'lucide-react';
import { MdPeopleAlt } from "react-icons/md";

interface HeroSectionProps {
    title: string;
    subtitle?: string;
    description: string;
    backgroundImage: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
    title,
    subtitle,
    description,
    backgroundImage,
}) => {
    return (
        <section className="relative min-h-[127vh] w-full overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={backgroundImage}
                    alt="Hero Background"
                    fill
                    className="object-cover object-top"
                    priority
                />
                <div className="absolute inset-0 bg-black/45" />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 w-full z-10 flex flex-col justify-center px-6 md:px-12">
                <div className="">
                    <h1 className="max-w-2xl mb-4 text-4xl font-semibold italic leading-tight text-white md:text-5xl ">
                        Own, Race, Win <span className='block'> The Vahala Racing Way </span>
                    </h1>

                    <div className='m-auto max-w-6xl my-7 border-t border-white/30'>

                    </div>

                    <div className='md:flex justify-center items-center gap-7 pb-12 lg:pb-4'>
                        <p className="mb-8 max-w-md text-sm text-white/90 md:text-base">
                            {description}
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col gap-4 lg:flex-row sm:items-center">
                            <button className="flex items-center justify-center gap-2 rounded-full bg-[#1ADB04] px-6 py-1 text-white transition-all hover:bg-green-600 md:px-8 md:py-3 cursor-pointer">
                                <Trophy className="h-5 w-5" />
                                View Upcoming Races
                            </button>

                            <button className="flex items-center justify-center gap-2 rounded-full border-2 border-white bg-white px-6 py-1 text-[#1ADB04] transition-all hover:bg-white/90 md:px-8 md:py-3 cursor-pointer">

                                <MdPeopleAlt className="h-5 w-5" />
                                Meet Our Team
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;