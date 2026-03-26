"use client"
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SliderImage { url: string; alt?: string; }

export default function ImageSlider({ images }: { images: SliderImage[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    if (!images?.length) return null;

    const changeSlide = (newIndex: number) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex(newIndex);
        setTimeout(() => setIsTransitioning(false), 500);
    };

    return (
        <div className="flex justify-center mt-4">
            <div className="flex items-center justify-center gap-4 lg:gap-24 w-full">
                <button
                    onClick={() => changeSlide(currentIndex === 0 ? images.length - 1 : currentIndex - 1)}
                    disabled={isTransitioning}
                    className="shrink-0 w-8 h-8 lg:w-12 lg:h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg disabled:opacity-50"
                    style={{ backgroundColor: '#1ADB04' }}
                >
                    <ChevronLeft className="w-4 h-4 text-white" strokeWidth={3} />
                </button>

                <div className="relative flex-1 w-full max-w-2xl">
                    <div className="relative overflow-hidden rounded-lg shadow-lg bg-white aspect-video">
                        <img
                            src={images[currentIndex].url}
                            alt={images[currentIndex].alt || ''}
                            className="w-full h-full object-cover transition-opacity duration-500"
                            style={{ opacity: isTransitioning ? 0.5 : 1 }}
                        />
                    </div>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => index !== currentIndex && changeSlide(index)}
                                className="w-2.5 h-2.5 rounded-full transition-all"
                                style={{ backgroundColor: currentIndex === index ? '#1ADB04' : '#ffffff', opacity: currentIndex === index ? 1 : 0.6 }}
                            />
                        ))}
                    </div>
                </div>

                <button
                    onClick={() => changeSlide(currentIndex === images.length - 1 ? 0 : currentIndex + 1)}
                    disabled={isTransitioning}
                    className="shrink-0 w-8 h-8 lg:w-12 lg:h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg disabled:opacity-50"
                    style={{ backgroundColor: '#1ADB04' }}
                >
                    <ChevronRight className="w-4 h-4 text-white" strokeWidth={3} />
                </button>
            </div>
        </div>
    );
}
