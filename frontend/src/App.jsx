// Main App Component
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import AdminHeader from './components/AdminHeader';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import PortfolioManagement from './pages/PortfolioManagement';
import AdminDashboard from './pages/AdminDashboard';
import AdminBookings from './pages/AdminBookings';
import { ThemeProvider } from './context/ThemeContext.jsx';
import './index.css';

function AppContent({ isAuthenticated, setIsAuthenticated, handleLogout }) {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && (
        isAuthenticated && isAdminPage ? (
          <AdminHeader onLogout={handleLogout} />
        ) : (
          <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        )
      )}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login onLoginSuccess={() => setIsAuthenticated(true)} />} />
          <Route path="/register" element={<Register onRegisterSuccess={() => setIsAuthenticated(true)} />} />
          <Route path="/admin" element={isAuthenticated ? <AdminDashboard /> : <Home />} />
          <Route path="/admin/portfolio" element={isAuthenticated ? <PortfolioManagement /> : <Home />} />
          <Route path="/admin/bookings" element={isAuthenticated ? <AdminBookings /> : <Home />} />
        </Routes>
      </main>
      {!isAuthPage && (
        <footer className="bg-primary text-white py-8 mt-2">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center gap-3">
              {/* Social Links */}
              <div className="flex gap-6">
                <a
                  href="https://www.facebook.com/MAGPhotographs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-accent transition transform hover:scale-110"
                  title="Follow us on Facebook"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
              
              {/* Copyright */}
              <p className="text-center text-base">&copy; 2025 MAG Captures. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <ThemeProvider>
      <Router>
        <AppContent isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} handleLogout={handleLogout} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
