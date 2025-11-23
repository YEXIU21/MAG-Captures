// Services Page
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Briefcase, Package, Zap } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

const Services = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const services = [
    {
      icon: Heart,
      title: 'Portrait Photography',
      description: 'Professional portrait sessions for individuals, families, and couples',
      price: '$299'
    },
    {
      icon: Briefcase,
      title: 'Event Photography',
      description: 'Coverage for weddings, birthdays, corporate events, and celebrations',
      price: '$599'
    },
    {
      icon: Package,
      title: 'Product Photography',
      description: 'High-quality product shots for e-commerce and marketing',
      price: '$399'
    },
    {
      icon: Zap,
      title: 'Commercial Photography',
      description: 'Professional photography for business, real estate, and advertising',
      price: '$799'
    }
  ];

  return (
    <div>
      <section className={`py-8 transition ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-primary border-b-4 border-accent'}`}>
        <div className="container mx-auto px-4">
          <h1 className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-primary'}`}>Our Services</h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Professional photography services tailored to your needs
          </p>
        </div>
      </section>

      <section className={`py-20 transition ${isDarkMode ? 'bg-gray-900' : 'bg-secondary'}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className={`p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 duration-300 border-l-4 border-accent ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className="bg-accent bg-opacity-10 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="text-accent" size={32} />
                  </div>
                  <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-primary'}`}>{service.title}</h3>
                  <p className={`mb-8 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{service.description}</p>
                  <div className={`flex justify-between items-center pt-6 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <span className="text-3xl font-bold text-accent">{service.price}</span>
                    <Link
                      to="/contact"
                      className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition transform hover:scale-105"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={`py-16 transition ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-primary border-t-4 border-accent'}`}>
        <div className="container mx-auto px-4 text-center">
          <h2 className={`text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-primary'}`}>Custom Packages Available</h2>
          <p className={`text-xl mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Need something special? We offer custom photography packages tailored to your needs.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-accent text-primary px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
          >
            Get Custom Quote
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
