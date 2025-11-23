// Register Page
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, AlertCircle, Eye, EyeOff } from 'lucide-react';
import api from '../utils/api';
import { ThemeContext } from '../context/ThemeContext';

const Register = ({ onRegisterSuccess }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate inputs
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }

      // Register API call
      const response = await api.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        // Save token to localStorage
        localStorage.setItem('token', response.data.token);
        
        // Call parent callback
        if (onRegisterSuccess) {
          onRegisterSuccess();
        }

        // Redirect to admin dashboard
        navigate('/admin');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-12 transition ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-secondary via-white to-secondary'}`}>
      <div className="w-full max-w-md my-auto">
        {/* Card */}
        <div className={`rounded-xl shadow-2xl p-8 transition ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent bg-opacity-20 rounded-full mb-4">
              <UserPlus className="text-accent" size={32} />
            </div>
            <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-primary'}`}>Create Account</h1>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Register to manage your portfolio</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
              <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-primary'}`}>
                Full Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:border-accent focus:outline-none transition ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-primary border-gray-200'}`}
                disabled={loading}
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-primary'}`}>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@example.com"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:border-accent focus:outline-none transition ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-primary border-gray-200'}`}
                disabled={loading}
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-primary'}`}>
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:border-accent focus:outline-none transition pr-12 ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-primary border-gray-200'}`}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 transition ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-primary'}`}
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-primary'}`}>
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:border-accent focus:outline-none transition pr-12 ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-primary border-gray-200'}`}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 transition ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-primary'}`}
                  disabled={loading}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-primary font-bold py-3 rounded-lg hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  Creating account...
                </>
              ) : (
                <>
                  <UserPlus size={20} />
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className={`text-center text-sm mt-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Already have an account?{' '}
            <Link to="/login" className="text-accent font-semibold hover:underline">
              Sign in here
            </Link>
          </p>
          
          {/* Back to Home */}
          <p className={`text-center text-sm mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <Link to="/" className="text-accent font-semibold hover:underline">
              ← Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
