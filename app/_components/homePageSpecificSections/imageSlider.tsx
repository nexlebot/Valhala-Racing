"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeader from '../sectionHeader';
const slides = [
  {
    id: 1,
    image: '/imageSlider1.jpg',
    title: 'Blaze King',
    age: '5 Years',
    details: 'Storm Rider x Flame Queen',
    result: '25 Start: 7-5-2'
  },
  {
    id: 2,
    image: '/imageSlider1.jpg',
    title: 'Blaze King',
    age: '3 Years',
    details: 'Sire / Dam: Storm Rider x Martha Queen',
    result: 'Latest Result: Winner - Horton Derby 2025'
  },
  {
    id: 9,
    image: '/imageSlider1.jpg',
    title: 'Thunder Storm',
    age: '4 Years',
    details: 'Sire / Dam: Lightning Bolt x Royal Lady',
    result: '2nd Place - Summer Stakes 2025'
  },
  {
    id: 3,
    image: '/imageSlider1.jpg',
    title: 'Midnight Runner',
    age: '5 Years',
    details: 'Sire / Dam: Dark Knight x Starlight',
    result: 'Winner - Classic Cup 2025'
  },
  {
    id: 4,
    image: '/imageSlider1.jpg',
    title: 'Golden Arrow',
    age: '3 Years',
    details: 'Sire / Dam: Swift Wind x Golden Rose',
    result: '3rd Place - Spring Derby 2025'
  }
];
const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);


  useEffect(() => {
    let timeoutId: number | null = null;

    const checkSize = () => {
      const w = window.innerWidth;
      setIsMobile(w <= 640);
      setIsTablet(w > 640 && w <= 1100);
      setIsDesktop(w > 1100);
    };

    const handleResize = () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      // debounce 80ms
      timeoutId = window.setTimeout(() => {
        checkSize();
        timeoutId = null;
      }, 80);
    };

    checkSize(); // initial
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);


  const goToSlide = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    // setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
    setActiveIndex((i) => (i + 1) % slides.length)
  };

  const goToNext = () => {
    const newIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
    setActiveIndex((i) => (i + 1) % slides.length)
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

    // Tunable multipliers for each breakpoint
    const settings = isMobile
      ? { x: 10, z: 40, baseScale: 0.95, scaleStep: 0.05 }
      : isTablet
        ? { x: 28, z: 55, baseScale: 0.92, scaleStep: 0.06 } // tablet tweaks
        : { x: 56, z: 70, baseScale: 0.9, scaleStep: 0.1 }; // desktop

    const translateX = `${position * settings.x}%`;
    const translateZ = `${-Math.abs(position) * settings.z}px`;
    const scale = isActive
      ? 1
      : Math.max(0, settings.baseScale - Math.abs(position) * settings.scaleStep);

    return {
      transform: `translateX(${translateX}) translateZ(${translateZ}) scale(${scale})`,
      opacity: 1,
      filter: isActive ? "brightness(1)" : "brightness(0.4)",
      zIndex: 10 - Math.abs(position),
      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      pointerEvents: isActive ? "auto" : "none",
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
    <div className="relative w-full lg:py-16 lg:px-4 overflow-hidden">
      <div className="mx-6 lg:mx-12">
        <div>
          <SectionHeader
            title="Our Horses"
            subtitle="Discover the pride of Vahala Racing — elite thoroughbreds trained for excellence, speed, and legacy."
            buttonText="See Horses"
            buttonVariant="secondary"
          />
        </div>

        <div className='mx-auto w-full mt-1 lg:mt-4'>
          <p className='mt-0 lg:mt-8 2-full md:w-[70%] text-center mx-auto text-sm lg:text-base font-normal'>Meet the champions behind <span className='text-primary'>Vahala’s</span> success. Each horse represents a story of strength, dedication, and world-class performance. Explore our racing stars through an elegant grid or carousel showcasing their key details — from bloodline to recent victories. <span className='italic font-medium'>Built for credibility, this section celebrates the talent and tradition that define </span> <span className='text-primary'> Vahala Racing.</span></p>
        </div>


        <div className="relative h-[500px] lg:h-[700px] flex items-center justify-center">
          {/* Slider Container */}
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{ perspective: '2000px' }}
          >
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className="absolute w-[250px] md:w-[396px]"
                style={getSlideStyle(index)}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-[400px] md:h-[600px] object-cover"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-b from-black/50 via-white/10 to-black/50"></div>

                  {index === activeIndex && (
                    <div className="  mb-3 inline-block absolute top-3 m-5 w-full ">
                      <div className='flex justify-between items-center w-4/5'>
                        <div className=" text-white text-xs px-3 py-0 ">
                          <span className='border border-primary rounded-full px-3 py-2' >See Our Horses</span>
                        </div>
                        <div className="relative -right-8">
                          <div className="">
                            <button
                              onClick={goToNext}
                              disabled={isAnimating}
                              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-primary hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:scale-110"
                            ><ChevronRight size={24} /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {index === activeIndex && (
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h2 className="text-3xl md:text-4xl font-semibold mb-2">{slide.title}</h2>
                      <p className="text-base font-light"><span>Age: </span>{slide.age}</p>
                      <p className="text-base font-light"><span>Sire / Dam: </span>{slide.details}</p>
                      <p className="text-base font-light"><span>Career: </span> {slide.result}</p>
                    </div>
                  )}


                  {/* Content */}

                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            disabled={isAnimating}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-primary hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={goToNext}
            disabled={isAnimating}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-primary hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === index
                ? 'bg-primary'
                : 'bg-gray-300'
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