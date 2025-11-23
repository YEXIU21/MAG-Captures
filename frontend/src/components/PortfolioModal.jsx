// Portfolio Modal Component
import React, { useState, useContext } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

const PortfolioModal = ({ portfolio, isOpen, onClose }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !portfolio) return null;

  const images = portfolio.images || [];
  const currentImage = images[currentImageIndex];

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className={`rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        {/* Header */}
        <div className="sticky top-0 bg-primary text-white p-6 flex justify-between items-center">
          <h2 className="text-3xl font-bold">{portfolio.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Image Gallery */}
          {images.length > 0 && (
            <div className="mb-8">
              <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-4 h-96">
                <img
                  src={currentImage.url}
                  alt={currentImage.alt || `Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Navigation Buttons */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={goToPrevious}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={goToNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </div>

              {/* Thumbnail Strip */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition ${
                        index === currentImageIndex
                          ? 'ring-2 ring-accent'
                          : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h3 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-primary'}`}>Description</h3>
              <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{portfolio.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Category</p>
                <p className={`text-lg font-semibold capitalize ${isDarkMode ? 'text-white' : 'text-primary'}`}>{portfolio.category}</p>
              </div>
              {portfolio.featured && (
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Status</p>
                  <p className="text-lg font-semibold text-accent">Featured</p>
                </div>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-opacity-90 transition mt-8"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioModal;
