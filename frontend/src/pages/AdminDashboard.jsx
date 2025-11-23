// Admin Dashboard Page
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Trash2, Plus, Loader } from 'lucide-react';
import api from '../utils/api';
import { ThemeContext } from '../context/ThemeContext';

const AdminDashboard = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Fetch all portfolios
  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      const response = await api.get('/portfolio');
      setPortfolios(response.data.data || []);
    } catch (err) {
      setError('Failed to fetch portfolios');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  // Delete portfolio
  const handleDelete = async (id) => {
    try {
      await api.delete(`/portfolio/${id}`);
      setPortfolios(portfolios.filter(p => p._id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      setError('Failed to delete portfolio');
      console.error(err);
    }
  };

  return (
    <div className={`min-h-screen py-12 transition ${isDarkMode ? 'bg-gray-900' : 'bg-secondary'}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-primary'}`}>Admin Dashboard</h1>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Manage your portfolio items</p>
          </div>
          <Link
            to="/admin/portfolio"
            className="flex items-center gap-2 bg-accent text-primary px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
          >
            <Plus size={20} />
            Add New Portfolio
          </Link>
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
        ) : portfolios.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-6">No portfolios yet. Create your first one!</p>
            <Link
              to="/admin/portfolio"
              className="inline-flex items-center gap-2 bg-accent text-primary px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
            >
              <Plus size={20} />
              Add Portfolio
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className={`w-full rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <thead>
                <tr className="bg-primary text-white">
                  <th className="px-6 py-4 text-left">Title</th>
                  <th className="px-6 py-4 text-left">Category</th>
                  <th className="px-6 py-4 text-left">Images</th>
                  <th className="px-6 py-4 text-left">Featured</th>
                  <th className="px-6 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {portfolios.map((portfolio) => (
                  <tr key={portfolio._id} className={`border-b transition ${isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <td className="px-6 py-4">
                      <div>
                        <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-primary'}`}>{portfolio.title}</p>
                        <p className={`text-sm line-clamp-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{portfolio.description}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block bg-accent bg-opacity-20 text-accent px-3 py-1 rounded-full text-sm capitalize font-semibold">
                        {portfolio.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {portfolio.images?.length || 0} image{portfolio.images?.length !== 1 ? 's' : ''}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-semibold ${portfolio.featured ? 'text-green-400' : isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        {portfolio.featured ? '⭐ Featured' : 'Not Featured'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition"
                          title="Edit portfolio"
                          disabled
                        >
                          <Edit2 size={18} />
                          <span className="text-sm">Edit</span>
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(portfolio._id)}
                          className="flex items-center gap-1 text-red-600 hover:text-red-800 transition"
                          title="Delete portfolio"
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

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className={`rounded-lg p-6 max-w-sm w-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-primary'}`}>Confirm Delete</h3>
              <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Are you sure you want to delete this portfolio? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className={`flex-1 px-4 py-2 border-2 rounded-lg transition font-semibold ${isDarkMode ? 'border-gray-600 text-white hover:bg-gray-700' : 'border-gray-300 text-primary hover:bg-gray-50'}`}
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

export default AdminDashboard;
