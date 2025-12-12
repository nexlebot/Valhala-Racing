"use client"
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ImageSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const images = [
        {
            url: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&h=600&fit=crop',
            alt: 'Horse 1'
        },
        {
            url: 'https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?w=800&h=600&fit=crop',
            alt: 'Horse 2'
        },
        {
            url: 'https://images.unsplash.com/photo-1598632640487-6ea4a4e8b963?w=800&h=600&fit=crop',
            alt: 'Horse 3'
        },
        {
            url: 'https://images.unsplash.com/photo-1588439297398-b4ea8e7bbf87?w=800&h=600&fit=crop',
            alt: 'Horse 4'
        }
    ];

    const changeSlide = (newIndex: number) => {
        if (isTransitioning) return;

        setIsTransitioning(true);
        setCurrentIndex(newIndex);

        setTimeout(() => {
            setIsTransitioning(false);
        }, 500);
    };

    const goToPrevious = () => {
        const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
        changeSlide(newIndex);
    };

    const goToNext = () => {
        const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
        changeSlide(newIndex);
    };

    const goToSlide = (index: number) => {
        if (index !== currentIndex) {
            changeSlide(index);
        }
    };

    return (
        <div className="flex justify-center mt-4">
            <div className="flex items-center justify-center gap-4 lg:gap-24 w-full">
                {/* Left Button - Outside */}
                <button
                    onClick={goToPrevious}
                    disabled={isTransitioning}
                    className="shrink-0 w-8 h-8 lg:w-12 lg:h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: '#1ADB04' }}
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-4 h-4 text-white" strokeWidth={3} />
                </button>

                {/* Slider Container */}
                <div className="relative flex-1 w-full max-w-2xl">
                    {/* Image with transition */}
                    <div className="relative overflow-hidden rounded-lg shadow-lg bg-white aspect-video">
                        <img
                            src={images[currentIndex].url}
                            alt={images[currentIndex].alt}
                            className="w-full h-full object-cover transition-opacity duration-500"
                            style={{ opacity: isTransitioning ? 0.5 : 1 }}
                        />
                    </div>

                    {/* Dot Indicators - Inside at bottom */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                disabled={isTransitioning}
                                className="w-2.5 h-2.5 rounded-full transition-all disabled:cursor-not-allowed"
                                style={{
                                    backgroundColor: currentIndex === index ? '#1ADB04' : '#ffffff',
                                    opacity: currentIndex === index ? 1 : 0.6
                                }}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Right Button - Outside */}
                <button
                    onClick={goToNext}
                    disabled={isTransitioning}
                    className="shrink-0 w-8 h-8 lg:w-12 lg:h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: '#1ADB04' }}
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-4 h-4 text-white" strokeWidth={3} />
                </button>
            </div>
        </div>
    );
}
