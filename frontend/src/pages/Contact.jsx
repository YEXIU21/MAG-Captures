// Contact Page
import React, { useContext } from 'react';
import BookingForm from '../components/BookingForm';
import { Mail, Phone, MapPin } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

const Contact = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div>
      <BookingForm />

      {/* Contact Info Section */}
      <section className={`py-16 transition ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-primary border-t-4 border-accent'}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-4xl font-bold text-center mb-12 ${isDarkMode ? 'text-white' : 'text-primary'}`}>Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Mail className="mx-auto mb-4 text-accent" size={48} />
              <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-primary'}`}>Email</h3>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>info@magphotographs.com</p>
            </div>
            <div className="text-center">
              <Phone className="mx-auto mb-4 text-accent" size={48} />
              <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-primary'}`}>Phone</h3>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>+1 (555) 123-4567</p>
            </div>
            <div className="text-center">
              <MapPin className="mx-auto mb-4 text-accent" size={48} />
              <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-primary'}`}>Location</h3>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>123 Photography St, City, State 12345</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
