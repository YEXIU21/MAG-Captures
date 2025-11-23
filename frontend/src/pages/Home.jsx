// Home Page
import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Award, Users, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div>
      {/* Hero Section with Gradient */}
      <section className="bg-gradient-to-br from-primary via-gray-900 to-primary text-white py-32 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent opacity-5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="mb-6 inline-block">
            <span className="bg-accent text-primary px-4 py-2 rounded-full text-sm font-semibold">
              Professional Photography
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Capture Your <span className="text-accent">Moments</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-2xl mx-auto">
            Professional photography services for every occasion. Let us create timeless memories for you.
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
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 text-primary">Why Choose Us</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We deliver exceptional photography services with professionalism and creativity
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 duration-300 text-center border-t-4 border-accent">
              <div className="bg-accent bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera className="text-accent" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-primary">Professional Quality</h3>
              <p className="text-gray-600 leading-relaxed">
                High-quality photography with professional equipment and expertise
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 duration-300 text-center border-t-4 border-accent">
              <div className="bg-accent bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="text-accent" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-primary">Award Winning</h3>
              <p className="text-gray-600 leading-relaxed">
                Recognized for excellence in photography and customer service
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 duration-300 text-center border-t-4 border-accent">
              <div className="bg-accent bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-accent" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-primary">Trusted by Many</h3>
              <p className="text-gray-600 leading-relaxed">
                Thousands of satisfied clients and memorable moments captured
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-gray-900 text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent opacity-5 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl font-bold mb-6">Ready to Book?</h2>
          <p className="text-xl mb-12 text-gray-300 max-w-2xl mx-auto">
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
