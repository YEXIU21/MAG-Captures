// Portfolio Page
import React, { useContext } from 'react';
import PortfolioComponent from '../components/Portfolio';
import { ThemeContext } from '../context/ThemeContext';

const PortfolioPage = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <>
      <section className={`text-white py-16 transition ${isDarkMode ? 'bg-gray-800' : 'bg-primary'}`}>
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Our Portfolio</h1>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-200'}`}>
            Explore our collection of professional photography work
          </p>
        </div>
      </section>
      <PortfolioComponent />
    </>
  );
};

export default PortfolioPage;
