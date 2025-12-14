import Link from 'next/link';
import React from 'react';

interface Feature {
    title?: string;
    image: string;
    paragraphs: string[];
    buttonText?: string;
    buttonLink?: string
}

interface StablesFeaturesProps {
    features: Feature[];
}

export const StablesFeatures: React.FC<StablesFeaturesProps> = ({ features }) => {
    return (
        <div className="w-full space-y-6 lg:space-y-12 mt-6 lg:mt-0">
            {features.map((feature, index) => {
                const isReversed = index % 2 !== 1;

                return (
                    <div key={index} className="" style={{ borderColor: '#1ADB04' }}>
                        {/* Title */}
                        {feature.title && <h2 className="text-xl mb-2 lg:text-3xl font-semibold lg:mb-8" style={{ color: '#1ADB04' }}>
                            {feature.title}
                        </h2>}

                        {/* Content Section */}
                        <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 items-center`}>
                            {/* Image */}
                            <div className="w-full max-w-[600px] ">
                                <img
                                    src={feature.image}
                                    alt={feature.title}
                                    className=" w-full h-auto rounded-lg shadow-lg object-cover"
                                />
                            </div>

                            {/* Text Content */}
                            <div className="w-full space-y-4">
                                {feature.paragraphs.map((paragraph, pIndex) => (
                                    <p key={pIndex} className="text-gray-700 leading-relaxed text-sm lg:text-base">
                                        {paragraph.split('**').map((part, i) =>
                                            i % 2 === 1 ? (
                                                <span key={i} style={{ color: '#1ADB04' }} className="font-semibold">
                                                    {part}
                                                </span>
                                            ) : part
                                        )}
                                    </p>
                                ))}

                                {/* Button */}
                                {feature.buttonText && (
                                    feature.buttonLink ? (
                                        <Link href={feature.buttonLink}>
                                            <button
                                                className="text-xs cursor-pointer lg:text-base mt-0 lg:mt-6 px-3 py-2 lg:px-8 lg:py-3 text-white font-semibold rounded-full hover:opacity-90 transition-opacity shadow-md"
                                                style={{ backgroundColor: "#1ADB04" }}
                                            >
                                                {feature.buttonText}
                                            </button>
                                        </Link>
                                    ) : (
                                        <button
                                            className="text-xs lg:text-base mt-0 lg:mt-6 px-3 py-2 lg:px-8 lg:py-3 text-white font-semibold rounded-full hover:opacity-90 transition-opacity shadow-md"
                                            style={{ backgroundColor: "#1ADB04" }}

                                        >
                                            {feature.buttonText}
                                        </button>
                                    )
                                )}

                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};