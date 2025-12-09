"use client"
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ImageSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);

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

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="relative w-full max-w-2xl mx-auto px-4">
                {/* Slider Container */}
                <div className="relative">
                    {/* Image */}
                    <div className="relative overflow-hidden rounded-lg shadow-lg bg-white aspect-[4/3]">
                        <img
                            src={images[currentIndex].url}
                            alt={images[currentIndex].alt}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={goToPrevious}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg"
                        style={{ backgroundColor: '#1ADB04' }}
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-6 h-6 text-white" strokeWidth={3} />
                    </button>

                    <button
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg"
                        style={{ backgroundColor: '#1ADB04' }}
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-6 h-6 text-white" strokeWidth={3} />
                    </button>

                    {/* Dot Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className="w-2.5 h-2.5 rounded-full transition-all"
                                style={{
                                    backgroundColor: currentIndex === index ? '#1ADB04' : '#ffffff',
                                    opacity: currentIndex === index ? 1 : 0.6
                                }}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}