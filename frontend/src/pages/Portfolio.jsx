// Portfolio Page
import React from 'react';
import PortfolioComponent from '../components/Portfolio';

const PortfolioPage = () => {
  return (
    <div>
      <section className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold">Our Portfolio</h1>
          <p className="text-xl text-gray-300 mt-2">
            Explore our collection of professional photography work
          </p>
        </div>
      </section>
      <PortfolioComponent />
    </div>
  );
};

export default PortfolioPage;
