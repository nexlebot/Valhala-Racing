import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
interface GalleryImage {
    id: string | number;
    slug?: string;
    url: string;
    title: string;
    age: string;
    color: string;
    sire: string;
    dam: string;
    career: string;
    stable: string;
}

interface HorseGalleryProps {
    images: GalleryImage[];
}

const HorseGallery: React.FC<HorseGalleryProps> = ({ images }) => {
    return (
        <div className="w-full mx-auto my-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                {images.map((image) => (
                    <Link href={`/our-horses/${image.slug || image.id}`} key={image.id}>
                        <div
                            key={image.id}
                            className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                        >
                            {/* Image */}
                            <div className="aspect-[3/2] overflow-hidden">
                                <img
                                    src={image.url}
                                    alt={image.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            {/* Overlay with gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

                            {/* Top Actions */}
                            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                                {/* Read More Button */}
                                <button className="flex items-center border border-[#1ADB04] gap-2 px-4 py-2 bg-transparent rounded-full text-white text-sm font-medium hover:bg-white/30 transition-colors">
                                    Read More
                                    <ArrowRight className="w-4 h-4" />
                                </button>

                                {/* Green Action Button */}
                                <button className="w-10 h-10 bg-[#1ADB04] rounded-full flex items-center justify-center transition-colors shadow-lg">
                                    <ArrowRight className="w-5 h-5 text-white" />
                                </button>
                            </div>

                            {/* Bottom Text Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                                <h3 className="font-bold text-2xl mb-2">
                                    {image.title}
                                </h3>
                                <div className="space-y-1 text-sm">
                                    <p className="text-gray-200">
                                        Age: {image.age}
                                    </p>
                                    <p className="text-gray-200">
                                        Color: {image.color}
                                    </p>
                                    <p className="text-gray-200">
                                        Sire / Dam: {image.sire} × {image.dam}
                                    </p>
                                    <p className="text-gray-200">
                                        Stable: {image.stable}
                                    </p>
                                    <p className="text-gray-200 font-bold">
                                        Career: {image.career}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};
export default HorseGallery;
