"use client";

import React from "react";
import Image from "next/image";

interface LocationSectionProps {
    mapSrc: string; // Static map image or dynamic map URL
}

const LocationSection: React.FC<LocationSectionProps> = ({ mapSrc }) => {
    return (
        <section className="w-full max-w-[1000px] mx-auto bg-white lg:py-14 font-roboto mb-6 lg:mb-0">
            <div className="container mx-auto flex flex-col lg:flex-row gap-6  lg:gap-14 items-start">
                {/* Map Image */}
                <div className=" rounded-xl overflow-hidden">
                    <Image
                        src={mapSrc}
                        alt="Location Map"
                        width={600}
                        height={450}
                        className="w-full h-full object-cover"
                        priority
                    />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3 lg:gap-7 text-gray-800">
                    {/* Location */}
                    <div>
                        <h3 className="text-2xl font-medium text-[#1ADB04] mb-2">Our Location</h3>
                        <p className="mt-2 font-medium text-lg">Vahala Horse Racing Club</p>
                        <p className="mt-2 font-medium text-lg">10 Aurum Street, Ascot WA. 6104</p>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-2xl font-medium text-[#1ADB04]">Get in Touch</h3>
                        <p className="mt-2">
                            <span className="font-medium">Phone:</span> +0438 811 130
                        </p>
                        <p>
                            <span className="font-medium">Admin:</span> admin@vahalaracingstables.com.au
                        </p>
                        <p>
                            <span className="font-medium">Accounts:</span> accounts@vahalaracingstables.com.au
                        </p>
                    </div>

                    {/* Office Hours */}
                    <div>
                        <h3 className="text-2xl font-medium text-[#1ADB04]">Office Hours</h3>
                        <p className="mt-2">
                            <span className="font-medium">Monday – Friday:</span> 9:00 AM – 6:00 PM
                        </p>
                        <p>
                            <span className="font-medium">Saturday – Sunday:</span> Race Days & Special Events
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LocationSection;
