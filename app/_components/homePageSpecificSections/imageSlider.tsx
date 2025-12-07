"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeader from '../sectionHeader';

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slides = [
    {
      id: 1,
      image: '/imageSlider1.jpg',
      title: 'Blaze King',
      age: '3 Years',
      details: 'Sire / Dam: Storm Rider x Martha Queen',
      result: 'Latest Result: Winner - Horton Derby 2025'
    },
    {
      id: 2,
      image: '/imageSlider1.jpg',
      title: 'Thunder Storm',
      age: '4 Years',
      details: 'Sire / Dam: Lightning Bolt x Royal Lady',
      result: 'Latest Result: 2nd Place - Summer Stakes 2025'
    },
    {
      id: 3,
      image: '/imageSlider1.jpg',
      title: 'Midnight Runner',
      age: '5 Years',
      details: 'Sire / Dam: Dark Knight x Starlight',
      result: 'Latest Result: Winner - Classic Cup 2025'
    },
    {
      id: 4,
      image: '/imageSlider1.jpg',
      title: 'Golden Arrow',
      age: '3 Years',
      details: 'Sire / Dam: Swift Wind x Golden Rose',
      result: 'Latest Result: 3rd Place - Spring Derby 2025'
    }
  ];

  const goToSlide = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  };

  const getSlidePosition = (index: number) => {
    const diff = index - currentIndex;
    const totalSlides = slides.length;

    // Normalize diff to be between -totalSlides/2 and totalSlides/2
    let normalizedDiff = diff;
    if (Math.abs(diff) > totalSlides / 2) {
      normalizedDiff = diff > 0 ? diff - totalSlides : diff + totalSlides;
    }

    return normalizedDiff;
  };

  const getSlideStyle = (index: number): React.CSSProperties => {
    const position = getSlidePosition(index);
    const isActive = position === 0;

    return {
      transform: `
        translateX(${position * 35}%) 
        translateZ(${-Math.abs(position) * 200}px) 
        scale(${isActive ? 1 : 0.8 - Math.abs(position) * 0.1})
      `,
      opacity: Math.abs(position) > 2 ? 0 : 1 - Math.abs(position) * 0.2,
      zIndex: 10 - Math.abs(position),
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      pointerEvents: isActive ? 'auto' : 'none'
    };
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  return (
    <div className="relative w-full min-h-screen  py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Our Horses"
          subtitle="Discover the pride of Vahala Racing — elite thoroughbreds trained for excellence, speed, and legacy."
          buttonText="See our Horses"
          buttonVariant="secondary"
        />
        <div className='mx-auto w-full mt-16'>
          <p className='mt-8 w-1/2 mx-auto'>Meet the champions behind Vahala’s success. Each horse represents a story of strength, dedication, and world-class performance. Explore our racing stars through an elegant grid or carousel showcasing their key details — from bloodline to recent victories. Built for credibility, this section celebrates the talent and tradition that define Vahala Racing.</p>
        </div>


        <div className="relative h-[700px] flex items-center justify-center">
          {/* Slider Container */}
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{ perspective: '2000px' }}
          >
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className="absolute w-[350px] md:w-[450px]"
                style={getSlideStyle(index)}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-[500px] md:h-[600px] object-cover"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                  <div className="  mb-3 inline-block absolute top-0 m-5 w-full ">
                    <div className='flex justify-between items-center w-4/5'>
                      <div className=" text-white text-xs px-3 py-1 ">
                        <span className='border border-primary rounded-full px-3 py-3' >See Our Horses</span>
                      </div>
                      <div className="">
                        <div className="w-12 h-12 rounded-full bg-primary border-2 border-primary"></div>
                      </div>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">

                    <h2 className="text-3xl md:text-4xl font-bold mb-2">{slide.title}</h2>
                    <p className=" text-sm mb-1">{slide.age}</p>
                    <p className="text-gray-300 text-sm mb-1">{slide.details}</p>
                    <p className="text-gray-400 text-xs italic">{slide.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            disabled={isAnimating}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-primary hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={goToNext}
            disabled={isAnimating}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-primary hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === index
                ? 'bg-primary w-8'
                : 'bg-white/50 hover:bg-white/80'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;