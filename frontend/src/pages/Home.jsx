// Home Page
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Award, Users, ArrowRight } from 'lucide-react';
import ImageCarousel from '../components/ImageCarousel';
import api from '../utils/api';
import { ThemeContext } from '../context/ThemeContext';

const Home = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [carouselImages, setCarouselImages] = useState([
    '/images carousell/1.jpg',
    '/images carousell/2.jpg',
  ]);

  // Load carousel images from portfolio
  useEffect(() => {
    const loadCarouselImages = async () => {
      try {
        // Fetch all portfolio items
        const response = await api.get('/portfolio');
        if (response.data.data && response.data.data.length > 0) {
          // Extract all images from all portfolio items
          const allImages = [];
          response.data.data.forEach(portfolio => {
            if (portfolio.images && portfolio.images.length > 0) {
              portfolio.images.forEach(image => {
                allImages.push(image.url);
              });
            }
          });

          // Shuffle images randomly
          const shuffled = allImages.sort(() => Math.random() - 0.5);
          
          if (shuffled.length > 0) {
            setCarouselImages(shuffled);
            return;
          }
        }
      } catch (error) {
        console.log('Error fetching portfolio images:', error);
      }

      // Fallback: use default images if portfolio is empty
      const fallbackImages = [
        '/images carousell/1.jpg',
        '/images carousell/2.jpg',
      ];
      setCarouselImages(fallbackImages);
    };

    loadCarouselImages();
  }, []);

  return (
    <div>
      {/* Image Carousel Hero Section with Overlay */}
      <section className="relative">
        <ImageCarousel images={carouselImages} />
        
        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center text-white z-20 -mt-16">
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="mb-6 inline-block">
              <span className="bg-accent text-primary px-4 py-2 rounded-full text-sm font-semibold">
                NEW YEAR, NEW BEGINNINGS
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Capture Your <span className="text-accent">Moments</span>
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-gray-200 max-w-2xl mx-auto italic">
              "Every moment is a chance to create a memory worth keeping."
            </p>
            <p className="text-lg md:text-xl mb-12 text-gray-200 max-w-2xl mx-auto">
              Let us create timeless memories for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-accent text-primary px-8 py-4 rounded-lg font-bold hover:bg-opacity-90 transition transform hover:scale-105"
              >
                Get Started <ArrowRight size={20} />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center gap-2 border-2 border-accent text-accent px-8 py-4 rounded-lg font-bold hover:bg-accent hover:text-primary transition"
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll Down Arrow */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 z-30">
          <div className={`arrow-bounce ${isDarkMode ? 'text-white' : 'text-accent'}`} style={{filter: isDarkMode ? 'none' : 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))'}}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features-section" className={`py-20 transition ${isDarkMode ? 'bg-gray-900' : 'bg-secondary'}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-primary'}`}>Why Choose Us</h2>
            <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              We deliver exceptional photography services with professionalism and creativity
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 duration-300 text-center border-t-4 border-accent ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="bg-accent bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera className="text-accent" size={32} />
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-primary'}`}>Professional Quality</h3>
              <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                High-quality photography with professional equipment and expertise
              </p>
            </div>
            <div className={`p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 duration-300 text-center border-t-4 border-accent ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="bg-accent bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="text-accent" size={32} />
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-primary'}`}>Award Winning</h3>
              <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Recognized for excellence in photography and customer service
              </p>
            </div>
            <div className={`p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 duration-300 text-center border-t-4 border-accent ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="bg-accent bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-accent" size={32} />
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-primary'}`}>Trusted by Many</h3>
              <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Thousands of satisfied clients and memorable moments captured
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-16 transition ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-secondary text-primary'}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className={`p-8 rounded-xl transition ${isDarkMode ? 'bg-gray-700' : 'bg-white shadow-lg'}`}>
              <p className="text-5xl font-bold mb-2 text-accent">500+</p>
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Events Completed</p>
            </div>
            <div className={`p-8 rounded-xl transition ${isDarkMode ? 'bg-gray-700' : 'bg-white shadow-lg'}`}>
              <p className="text-5xl font-bold mb-2 text-accent">98%</p>
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Client Satisfaction</p>
            </div>
            <div className={`p-8 rounded-xl transition ${isDarkMode ? 'bg-gray-700' : 'bg-white shadow-lg'}`}>
              <p className="text-5xl font-bold mb-2 text-accent">6+</p>
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-24 relative overflow-hidden transition ${isDarkMode ? 'bg-gradient-to-r from-gray-900 to-black text-white' : 'bg-white text-primary border-t-4 border-accent'}`}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent opacity-5 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className={`text-5xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-primary'}`}>Ready to Book?</h2>
          <p className={`text-xl mb-12 max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Let's create beautiful memories together. Contact us today to schedule your session.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 bg-accent text-primary px-10 py-4 rounded-lg font-bold hover:bg-opacity-90 transition transform hover:scale-105"
          >
            Book Now <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
