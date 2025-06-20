// FILE PATH: src/components/layout/Header.jsx (With Router Link for Logo)

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import ThemeToggle from '../ui/ThemeToggle';
import { useTheme } from '../../contexts/ThemeContext';
// Import your logo
import bruvLogo from '../../assets/images/bruv-01.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { colors, isDarkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? `${isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-lg shadow-lg` 
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo Section - Logo Only */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center justify-center">
              <img 
                src={bruvLogo} 
                alt="Bruv Logo" 
                className="object-contain transition-all duration-300 hover:scale-105"
                style={{width: '200px', height: '200px', minWidth: '100px', minHeight: '100px'}}
              />
            </Link>
          </div>

          {/* Navigation Component + Theme Toggle */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Navbar isScrolled={isScrolled} />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;