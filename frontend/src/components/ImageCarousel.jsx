// Image Carousel Component
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageCarousel = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Default sample images if none provided
  const defaultImages = [
    'https://images.unsplash.com/photo-1606216174052-a76f0e7a2e0d?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1606216174052-a76f0e7a2e0d?w=1200&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1606216174052-a76f0e7a2e0d?w=1200&h=600&fit=crop&q=60',
  ];

  const carouselImages = images.length > 0 ? images : defaultImages;

  useEffect(() => {
    if (!autoPlay || carouselImages.length === 0) return;

    // Alternate between showing image (5s) and blank (5s)
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1;
        // If we've shown all images, reset to 0
        if (nextIndex >= carouselImages.length * 2) {
          return 0;
        }
        return nextIndex;
      });
    }, 5000); // 5 seconds for image, 5 seconds for blank

    return () => clearInterval(interval);
  }, [autoPlay, carouselImages.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? carouselImages.length - 1 : prev - 1
    );
    setAutoPlay(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    setAutoPlay(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setAutoPlay(false);
  };

  return (
    <div className="relative w-full h-96 md:h-[50rem] bg-gray-900 overflow-hidden group">
      {/* Images with alternating blank space */}
      <div className="relative w-full h-full">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        ))}
        
        {/* Blank slides between images */}
        {carouselImages.map((_, index) => (
          <div
            key={`blank-${index}`}
            className={`absolute w-full h-full bg-gray-900 transition-opacity duration-1000 ${
              carouselImages.length + index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      {/* Previous Button */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Next Button */}
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === currentIndex
                ? 'bg-accent w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
