// Portfolio Page
import React, { useContext } from 'react';
import PortfolioComponent from '../components/Portfolio';
import { ThemeContext } from '../context/ThemeContext';

const PortfolioPage = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`min-h-[calc(100vh-200px)] transition ${isDarkMode ? 'bg-gray-900' : 'bg-secondary'}`}>
      <section className={`py-8 transition ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-primary border-b-4 border-accent'}`}>
        <div className="container mx-auto px-4">
          <h1 className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-primary'}`}>Our Portfolio</h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Explore our collection of professional photography work
          </p>
        </div>
      </section>
      <PortfolioComponent />
    </div>
  );
};

export default PortfolioPage;
