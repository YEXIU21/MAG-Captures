// BookingForm Component
import React, { useState, useContext } from 'react';
import api from '../utils/api';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

const BookingForm = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    serviceType: 'portrait',
    bookingDate: '',
    duration: 1,
    location: '',
    notes: '',
    price: 0
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duration' || name === 'price' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await api.post('/bookings', formData);
      setMessage({
        type: 'success',
        text: 'Booking created successfully! We will contact you soon.'
      });
      setFormData({
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        serviceType: 'portrait',
        bookingDate: '',
        duration: 1,
        location: '',
        notes: '',
        price: 0
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Error creating booking. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`py-16 transition ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className={`text-4xl font-bold text-center mb-12 ${isDarkMode ? 'text-white' : 'text-primary'}`}>Schedule Your Session</h2>

        {message.text && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
            message.type === 'success'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <p>{message.text}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="clientName"
              placeholder="Your Name"
              value={formData.clientName}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-accent transition ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-primary border-gray-300'}`}
            />
            <input
              type="email"
              name="clientEmail"
              placeholder="Your Email"
              value={formData.clientEmail}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-accent transition ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-primary border-gray-300'}`}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="tel"
              name="clientPhone"
              placeholder="Your Phone"
              value={formData.clientPhone}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-accent transition ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-primary border-gray-300'}`}
            />
            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-accent transition ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-primary border-gray-300'}`}
            >
              <option value="portrait">Portrait</option>
              <option value="event">Event</option>
              <option value="product">Product</option>
              <option value="commercial">Commercial</option>
              <option value="wedding">Wedding</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="date"
              name="bookingDate"
              value={formData.bookingDate}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-accent transition ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-primary border-gray-300'}`}
            />
            <input
              type="number"
              name="duration"
              placeholder="Duration (hours)"
              value={formData.duration}
              onChange={handleChange}
              min="1"
              required
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-accent transition ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-primary border-gray-300'}`}
            />
          </div>

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-accent transition ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-primary border-gray-300'}`}
          />

          <textarea
            name="notes"
            placeholder="Additional Notes"
            value={formData.notes}
            onChange={handleChange}
            rows="4"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-accent transition ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-primary border-gray-300'}`}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            required
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-accent transition ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-primary border-gray-300'}`}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-primary font-bold py-3 rounded-lg hover:bg-opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Booking...' : 'Book Now'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default BookingForm;
