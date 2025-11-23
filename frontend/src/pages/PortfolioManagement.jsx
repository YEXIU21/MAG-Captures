// Portfolio Management Page
import React, { useState, useContext } from 'react';
import api from '../utils/api';
import ImageUpload from '../components/ImageUpload';
import { AlertCircle, CheckCircle, Trash2 } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

const PortfolioManagement = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'portrait',
    images: [],
    featured: false
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImagesUpload = (uploadedImages) => {
    const imageObjects = uploadedImages.map(img => ({
      url: img.url,
      alt: formData.title
    }));
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...imageObjects]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      if (!formData.title || !formData.description || formData.images.length === 0) {
        setMessage({
          type: 'error',
          text: 'Please fill in all fields and upload at least one image'
        });
        setLoading(false);
        return;
      }

      await api.post('/portfolio', formData);
      setMessage({
        type: 'success',
        text: 'Portfolio item created successfully!'
      });
      
      setFormData({
        title: '',
        description: '',
        category: 'portrait',
        images: [],
        featured: false
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Error creating portfolio item'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen py-12 transition ${isDarkMode ? 'bg-gray-900' : 'bg-secondary'}`}>
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className={`text-5xl font-bold mb-12 ${isDarkMode ? 'text-white' : 'text-primary'}`}>Portfolio Management</h1>

        {message.text && (
          <div className={`mb-8 p-4 rounded-lg flex items-center gap-3 ${
            message.type === 'success'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <p>{message.text}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className={`p-8 rounded-xl shadow-lg space-y-6 transition ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {/* Title */}
          <div>
            <label className={`block text-sm font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-primary'}`}>
              Portfolio Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Summer Wedding 2024"
              required
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-accent transition ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-primary border-gray-300'}`}
            />
          </div>

          {/* Description */}
          <div>
            <label className={`block text-sm font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-primary'}`}>
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe this portfolio item..."
              rows="4"
              required
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-accent transition ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-primary border-gray-300'}`}
            />
          </div>

          {/* Category */}
          <div>
            <label className={`block text-sm font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-primary'}`}>
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-accent transition ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-primary border-gray-300'}`}
            >
              <option value="portrait">Portrait</option>
              <option value="event">Event</option>
              <option value="product">Product</option>
              <option value="commercial">Commercial</option>
              <option value="wedding">Wedding</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Featured */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="featured"
              id="featured"
              checked={formData.featured}
              onChange={handleInputChange}
              className="w-4 h-4 accent-accent"
            />
            <label htmlFor="featured" className={`ml-3 text-sm font-bold ${isDarkMode ? 'text-white' : 'text-primary'}`}>
              Mark as Featured
            </label>
          </div>

          {/* Image Upload */}
          <div>
            <label className={`block text-sm font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-primary'}`}>
              Upload Images *
            </label>
            <ImageUpload onUploadSuccess={handleImagesUpload} multiple={true} />
          </div>

          {/* Preview Uploaded Images */}
          {formData.images.length > 0 && (
            <div>
              <h3 className={`text-sm font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-primary'}`}>
                Images for this Portfolio ({formData.images.length})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image.url}
                      alt={`Portfolio ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-primary font-bold py-3 rounded-lg hover:bg-opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Portfolio Item'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PortfolioManagement;
