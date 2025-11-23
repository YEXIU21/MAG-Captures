// Admin Header Component
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, LayoutDashboard, Plus, MessageSquare } from 'lucide-react';

const AdminHeader = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-primary text-white shadow-lg sticky top-0 z-40">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/admin" className="text-2xl font-bold text-accent hover:opacity-80 transition">
          MAG Admin
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <Link
            to="/admin"
            className={`flex items-center gap-2 transition ${
              isActive('/admin') ? 'text-accent' : 'hover:text-accent'
            }`}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <Link
            to="/admin/portfolio"
            className={`flex items-center gap-2 transition ${
              isActive('/admin/portfolio') ? 'text-accent' : 'hover:text-accent'
            }`}
          >
            <Plus size={20} />
            Add Portfolio
          </Link>
          <Link
            to="/admin/bookings"
            className={`flex items-center gap-2 transition ${
              isActive('/admin/bookings') ? 'text-accent' : 'hover:text-accent'
            }`}
          >
            <MessageSquare size={20} />
            Bookings
          </Link>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-accent text-primary px-4 py-2 rounded hover:bg-opacity-90 transition font-semibold"
          >
            <LogOut size={20} />
            Logout
          </button>
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
            <Link
              to="/admin"
              className={`flex items-center gap-2 transition ${
                isActive('/admin') ? 'text-accent' : 'hover:text-accent'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <LayoutDashboard size={20} />
              Dashboard
            </Link>
            <Link
              to="/admin/portfolio"
              className={`flex items-center gap-2 transition ${
                isActive('/admin/portfolio') ? 'text-accent' : 'hover:text-accent'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <Plus size={20} />
              Add Portfolio
            </Link>
            <Link
              to="/admin/bookings"
              className={`flex items-center gap-2 transition ${
                isActive('/admin/bookings') ? 'text-accent' : 'hover:text-accent'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <MessageSquare size={20} />
              Bookings
            </Link>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 bg-accent text-primary px-4 py-2 rounded hover:bg-opacity-90 transition font-semibold w-full justify-center"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default AdminHeader;
