// Header Component
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

const Header = ({ isAuthenticated, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={`sticky top-0 z-50 shadow-lg transition ${isDarkMode ? 'bg-primary text-white' : 'bg-white text-primary'}`}>
      <nav className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link to="/" className="hover:opacity-80 transition">
            <img 
              src={isDarkMode ? '/logos/mag-logo-light mode.png' : '/logos/mag-logo-dark mode.png'} 
              alt="MAG Captures Logo" 
              className="h-16 w-auto" 
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <Link to="/" className={`hover:text-accent transition font-medium ${isDarkMode ? 'text-white' : 'text-primary'}`}>Home</Link>
          <Link to="/portfolio" className={`hover:text-accent transition font-medium ${isDarkMode ? 'text-white' : 'text-primary'}`}>Portfolio</Link>
          <Link to="/services" className={`hover:text-accent transition font-medium ${isDarkMode ? 'text-white' : 'text-primary'}`}>Services</Link>
          <Link to="/contact" className={`hover:text-accent transition font-medium ${isDarkMode ? 'text-white' : 'text-primary'}`}>Contact</Link>
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="transition hover:opacity-70"
            title="Toggle dark/light mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          {isAuthenticated ? (
            <button onClick={onLogout} className="bg-accent text-primary px-4 py-2 rounded hover:bg-opacity-90 transition font-semibold">
              Logout
            </button>
          ) : (
            <Link to="/login" className="bg-accent text-primary px-4 py-2 rounded hover:bg-opacity-90 transition font-semibold">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={`md:hidden transition ${isDarkMode ? 'bg-primary border-t border-white/10' : 'bg-white border-t border-gray-200'}`}>
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link to="/" className={`hover:text-accent transition font-medium ${isDarkMode ? 'text-white' : 'text-primary'}`}>Home</Link>
            <Link to="/portfolio" className={`hover:text-accent transition font-medium ${isDarkMode ? 'text-white' : 'text-primary'}`}>Portfolio</Link>
            <Link to="/services" className={`hover:text-accent transition font-medium ${isDarkMode ? 'text-white' : 'text-primary'}`}>Services</Link>
            <Link to="/contact" className={`hover:text-accent transition font-medium ${isDarkMode ? 'text-white' : 'text-primary'}`}>Contact</Link>
            
            {/* Theme Toggle Mobile */}
            <button
              onClick={toggleTheme}
              className="transition hover:opacity-70 flex items-center gap-2"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            {isAuthenticated ? (
              <button
                onClick={onLogout}
                className="bg-accent text-primary px-4 py-2 rounded hover:bg-opacity-90 transition w-full"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-accent text-primary px-4 py-2 rounded hover:bg-opacity-90 transition text-center"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
