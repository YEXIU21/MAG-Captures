// Login Page
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, AlertCircle, Eye, EyeOff } from 'lucide-react';
import api from '../utils/api';
import { ThemeContext } from '../context/ThemeContext';

const Login = ({ onLoginSuccess }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate inputs
      if (!email || !password) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      // Mock login - accept any email/password combination
      // In production, this would call the backend API
      const mockToken = 'mock_token_' + Date.now();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Save token to localStorage
      localStorage.setItem('token', mockToken);
      
      // Call parent callback
      if (onLoginSuccess) {
        onLoginSuccess();
      }

      // Redirect to admin dashboard
      navigate('/admin');
    } catch (err) {
      setError('Login failed. Please try again.');
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
              <LogIn className="text-accent" size={32} />
            </div>
            <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-primary'}`}>Admin Login</h1>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Sign in to manage your portfolio</p>
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
            {/* Email Field */}
            <div>
              <label htmlFor="email" className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-primary'}`}>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:border-accent focus:outline-none transition pr-12 ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-primary border-gray-200'}`}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
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
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className={`text-center text-sm mt-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Don't have an account?{' '}
            <Link to="/register" className="text-accent font-semibold hover:underline">
              Register here
            </Link>
          </p>
          
          {/* Back to Home */}
          <p className={`text-center text-sm mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <Link to="/" className="text-accent font-semibold hover:underline">
              ← Back to Home
            </Link>
          </p>
        </div>

        {/* Mock Login Info */}
        <div className="mt-6 p-4 bg-white/10 rounded-lg text-white text-sm">
          <p className="font-semibold mb-2">Demo Login (Mock):</p>
          <p>Email: <span className="text-accent">any email</span></p>
          <p>Password: <span className="text-accent">any password</span></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
