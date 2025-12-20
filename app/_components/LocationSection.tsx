"use client";

import React from "react";

interface LocationSectionProps {
    mapSrc?: string; // Optional, not needed for iframe
}

const LocationSection: React.FC<LocationSectionProps> = ({ mapSrc }) => {
    return (
        <section className="w-full max-w-[1000px] mx-auto bg-white lg:py-14 font-roboto mb-6 lg:mb-0">
            <div className="container mx-auto flex flex-col lg:flex-row gap-6  lg:gap-14 items-start">
                {/* Interactive Map */}
                <div className="rounded-xl overflow-hidden w-full lg:w-[600px] h-[450px]">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3384.8287645891234!2d115.93289607634213!3d-31.933456574043894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2a32bb2f5e5e5e5f%3A0x5e5e5e5e5e5e5e5e!2s10%20Aurum%20St%2C%20Ascot%20WA%206104%2C%20Australia!5e0!3m2!1sen!2s!4v1702345678901!5m2!1sen!2s"
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Vahala Horse Racing Club Location"
                        className="w-full h-full"
                    ></iframe>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3 lg:gap-7 text-gray-800">
                    {/* Location */}
                    <div>
                        <h3 className="text-2xl font-medium text-primary mb-2">Our Location</h3>
                        <p className="mt-2 font-medium text-lg">Vahala Horse Racing Club</p>
                        <p className="mt-2 font-medium text-lg">10 Aurum Street, Ascot WA. 6104</p>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-2xl font-medium text-primary">Get in Touch</h3>
                        <p className="mt-2">
                            <span className="font-medium">Phone:</span> +0438 811 130
                        </p>
                        <p>
                            <span className="font-medium block">Admin:</span> admin@vahalaracingstables.com.au
                        </p>
                        <p> 
                            <span className="font-medium block">Accounts:</span> accounts@vahalaracingstables.com.au
                        </p>
                    </div>

                    {/* Office Hours */}
                    <div>
                        <h3 className="text-2xl font-medium text-primary">Office Hours</h3>
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