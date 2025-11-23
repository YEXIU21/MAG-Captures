// Admin Bookings Page
import React, { useState, useEffect, useContext } from 'react';
import { Trash2, Eye, Loader, CheckCircle, Clock } from 'lucide-react';
import api from '../utils/api';
import { ThemeContext } from '../context/ThemeContext';

const AdminBookings = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await api.get('/bookings');
      setBookings(response.data.data || []);
    } catch (err) {
      setError('Failed to fetch bookings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Delete booking
  const handleDelete = async (id) => {
    try {
      await api.delete(`/bookings/${id}`);
      setBookings(bookings.filter(b => b._id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      setError('Failed to delete booking');
      console.error(err);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={`min-h-screen py-12 transition ${isDarkMode ? 'bg-gray-900' : 'bg-secondary'}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-primary'}`}>
            Booking Management
          </h1>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
            Manage and track all client bookings
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <Loader className="animate-spin text-accent" size={48} />
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-12">
            <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              No bookings yet. Bookings will appear here when clients submit them.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className={`w-full rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <thead>
                <tr className="bg-primary text-white">
                  <th className="px-6 py-4 text-left">Client Name</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Service</th>
                  <th className="px-6 py-4 text-left">Date</th>
                  <th className="px-6 py-4 text-left">Price</th>
                  <th className="px-6 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr 
                    key={booking._id} 
                    className={`border-b transition ${isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}
                  >
                    <td className="px-6 py-4">
                      <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-primary'}`}>
                        {booking.clientName}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                        {booking.clientEmail}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block bg-accent bg-opacity-20 text-accent px-3 py-1 rounded-full text-sm capitalize font-semibold">
                        {booking.serviceType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                        {formatDate(booking.bookingDate)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-lg font-bold text-accent">
                        ₱{booking.price.toLocaleString()}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition"
                          title="View details"
                        >
                          <Eye size={18} />
                          <span className="text-sm">View</span>
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(booking._id)}
                          className="flex items-center gap-1 text-red-600 hover:text-red-800 transition"
                          title="Delete booking"
                        >
                          <Trash2 size={18} />
                          <span className="text-sm">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Booking Details Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className={`rounded-lg p-8 max-w-md w-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-primary'}`}>
                Booking Details
              </h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Client Name
                  </p>
                  <p className={isDarkMode ? 'text-white' : 'text-primary'}>
                    {selectedBooking.clientName}
                  </p>
                </div>
                
                <div>
                  <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Email
                  </p>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {selectedBooking.clientEmail}
                  </p>
                </div>
                
                <div>
                  <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Phone
                  </p>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {selectedBooking.clientPhone}
                  </p>
                </div>
                
                <div>
                  <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Service Type
                  </p>
                  <p className="text-accent font-semibold capitalize">
                    {selectedBooking.serviceType}
                  </p>
                </div>
                
                <div>
                  <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Booking Date
                  </p>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {formatDate(selectedBooking.bookingDate)}
                  </p>
                </div>
                
                <div>
                  <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Duration
                  </p>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {selectedBooking.duration} hour{selectedBooking.duration !== 1 ? 's' : ''}
                  </p>
                </div>
                
                <div>
                  <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Location
                  </p>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {selectedBooking.location}
                  </p>
                </div>
                
                <div>
                  <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Price
                  </p>
                  <p className="text-lg font-bold text-accent">
                    ₱{selectedBooking.price.toLocaleString()}
                  </p>
                </div>
                
                {selectedBooking.notes && (
                  <div>
                    <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Notes
                    </p>
                    <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                      {selectedBooking.notes}
                    </p>
                  </div>
                )}
              </div>
              
              <button
                onClick={() => setSelectedBooking(null)}
                className={`w-full px-4 py-2 rounded-lg font-semibold transition ${
                  isDarkMode 
                    ? 'bg-gray-700 text-white hover:bg-gray-600' 
                    : 'bg-gray-200 text-primary hover:bg-gray-300'
                }`}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className={`rounded-lg p-6 max-w-sm w-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-primary'}`}>
                Confirm Delete
              </h3>
              <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Are you sure you want to delete this booking? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className={`flex-1 px-4 py-2 border-2 rounded-lg transition font-semibold ${
                    isDarkMode 
                      ? 'border-gray-600 text-white hover:bg-gray-700' 
                      : 'border-gray-300 text-primary hover:bg-gray-50'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBookings;
