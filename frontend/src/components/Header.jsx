// Header Component
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = ({ isAuthenticated, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-primary text-white shadow-lg">
      <nav className="container mx-auto px-4 py-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-2xl font-bold text-accent">
            MAG Captures
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <Link to="/" className="hover:text-accent transition">Home</Link>
          <Link to="/portfolio" className="hover:text-accent transition">Portfolio</Link>
          <Link to="/services" className="hover:text-accent transition">Services</Link>
          <Link to="/contact" className="hover:text-accent transition">Contact</Link>
          {isAuthenticated ? (
            <button
              onClick={onLogout}
              className="bg-accent text-primary px-4 py-2 rounded hover:bg-opacity-90 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-accent text-primary px-4 py-2 rounded hover:bg-opacity-90 transition"
            >
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
        <div className="md:hidden bg-primary border-t border-accent">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link to="/" className="hover:text-accent transition">Home</Link>
            <Link to="/portfolio" className="hover:text-accent transition">Portfolio</Link>
            <Link to="/services" className="hover:text-accent transition">Services</Link>
            <Link to="/contact" className="hover:text-accent transition">Contact</Link>
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
