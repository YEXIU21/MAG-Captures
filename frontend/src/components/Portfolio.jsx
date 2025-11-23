// Portfolio Component
import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Loader, Camera } from 'lucide-react';

const Portfolio = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      const url = selectedCategory === 'all'
        ? '/portfolio'
        : `/portfolio?category=${selectedCategory}`;
      const response = await api.get(url);
      setPortfolios(response.data.data);
    } catch (error) {
      console.error('Error fetching portfolios:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  const categories = ['all', 'portrait', 'event', 'product', 'commercial', 'wedding'];

  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary">Our Portfolio</h2>

        {/* Category Filter */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-lg capitalize transition ${
                selectedCategory === cat
                  ? 'bg-accent text-primary'
                  : 'bg-white text-primary border border-accent hover:bg-accent hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <Loader className="animate-spin text-accent" size={48} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolios.map((portfolio) => (
              <div
                key={portfolio._id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 duration-300 group"
              >
                <div className="relative overflow-hidden h-64 bg-gray-200">
                  {portfolio.images && portfolio.images.length > 0 ? (
                    <img
                      src={portfolio.images[0].url}
                      alt={portfolio.images[0].alt || portfolio.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-300">
                      <Camera className="text-gray-400" size={48} />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-primary">{portfolio.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{portfolio.description}</p>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <span className="inline-block bg-accent bg-opacity-20 text-accent px-3 py-1 rounded-full text-sm capitalize font-semibold">
                      {portfolio.category}
                    </span>
                    {portfolio.featured && (
                      <span className="text-accent font-bold text-sm">Featured</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && portfolios.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No portfolios found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
