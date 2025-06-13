// FILE PATH: src/components/layout/Navbar.jsx (With React Router Links)

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Navbar = ({ isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { colors, isDarkMode } = useTheme();
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { 
      name: 'Solutions', 
      path: '/solutions',
      dropdown: [
        { name: 'Project Management Software', path: '/solutions#project-management' },
        { name: 'Audit Management Software', path: '/solutions#audit-management' },
        { name: 'Risk & Compliance Software', path: '/solutions#risk-compliance' }
      ]
    },
    { 
      name: 'Services', 
      path: '/services',
      dropdown: [
        { name: 'Project Management Services', path: '/services#project-management' },
        { name: 'Information Systems Audit', path: '/services#is-audit' },
        { name: 'Quality Assurance Services', path: '/services#qa-services' },
        { name: 'Risk & Compliance Advisory', path: '/services#risk-advisory' }
      ]
    },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActiveLink = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname === path;
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center space-x-8">
        {navItems.map((item) => (
          <div key={item.name} className="relative group">
            <Link
              to={item.path}
              className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                isActiveLink(item.path)
                  ? 'text-red-500'
                  : isScrolled 
                    ? (isDarkMode ? 'text-gray-300 hover:text-red-400' : 'text-gray-700 hover:text-red-500')
                    : 'text-white hover:text-red-300'
              }`}
            >
              <span>{item.name}</span>
              {item.dropdown && <ChevronDown className="w-4 h-4" />}
            </Link>
            
            {/* Dropdown Menu */}
            {item.dropdown && (
              <div className={`absolute top-full left-0 w-64 ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } border rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0`}>
                <div className="py-2">
                  {item.dropdown.map((dropItem) => (
                    <Link
                      key={dropItem.name}
                      to={dropItem.path}
                      className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                        isDarkMode 
                          ? 'text-gray-300 hover:bg-gray-700 hover:text-red-400' 
                          : 'text-gray-700 hover:bg-gray-50 hover:text-red-500'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {dropItem.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        
        {/* CTA Button */}
        <Link 
          to="/contact"
          className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Get Started
        </Link>
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`p-2 rounded-lg transition-colors duration-200 ${
            isScrolled 
              ? (isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100')
              : 'text-white hover:bg-white/10'
          }`}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className={`lg:hidden absolute top-full left-0 w-full ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border shadow-xl rounded-b-lg`}>
          <div className="py-4 space-y-2">
            {navItems.map((item) => (
              <div key={item.name}>
                <Link
                  to={item.path}
                  className={`block px-4 py-2 transition-colors duration-200 ${
                    isActiveLink(item.path)
                      ? 'text-red-500 font-medium'
                      : isDarkMode 
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-red-400' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-red-500'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {item.dropdown && (
                  <div className="pl-6 space-y-1">
                    {item.dropdown.map((dropItem) => (
                      <Link
                        key={dropItem.name}
                        to={dropItem.path}
                        className={`block px-4 py-1 text-sm transition-colors duration-200 ${
                          isDarkMode 
                            ? 'text-gray-400 hover:text-red-400' 
                            : 'text-gray-600 hover:text-red-500'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {dropItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="px-4 pt-4">
              <Link 
                to="/contact"
                className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-3 rounded-lg w-full transition-all duration-200 block text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;