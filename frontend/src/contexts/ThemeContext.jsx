// FILE PATH: src/contexts/ThemeContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for saved theme preference or default to light mode
  useEffect(() => {
    const savedTheme = localStorage.getItem('bruv-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      setIsDarkMode(prefersDark);
    }
  }, []);

  // Update localStorage and body class when theme changes
  useEffect(() => {
    localStorage.setItem('bruv-theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: {
      // Background colors
      primary: isDarkMode ? 'bg-gray-900' : 'bg-white',
      secondary: isDarkMode ? 'bg-gray-800' : 'bg-gray-50',
      tertiary: isDarkMode ? 'bg-gray-700' : 'bg-gray-100',
      
      // Text colors
      textPrimary: isDarkMode ? 'text-white' : 'text-gray-900',
      textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
      textTertiary: isDarkMode ? 'text-gray-400' : 'text-gray-500',
      
      // Border colors
      border: isDarkMode ? 'border-gray-700' : 'border-gray-200',
      borderLight: isDarkMode ? 'border-gray-600' : 'border-gray-100',
      
      // Card backgrounds
      card: isDarkMode ? 'bg-gray-800' : 'bg-white',
      cardHover: isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50',
      
      // Input styles
      input: isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500',
      inputFocus: isDarkMode ? 'focus:border-red-500 focus:ring-red-500' : 'focus:border-red-500 focus:ring-red-500',
      
      // Button styles - keeping brand colors consistent
      buttonPrimary: 'bg-red-500 hover:bg-red-600 text-white',
      buttonSecondary: isDarkMode ? 'bg-purple-900 hover:bg-purple-800 text-white' : 'bg-purple-900 hover:bg-purple-800 text-white',
      buttonOutline: isDarkMode ? 'border-white text-white hover:bg-white hover:text-gray-900' : 'border-purple-900 text-purple-900 hover:bg-purple-900 hover:text-white',
      
      // Nav specific colors
      navText: isDarkMode ? 'text-gray-300 hover:text-red-400' : 'text-gray-700 hover:text-red-500',
      navTextScrolled: isDarkMode ? 'text-gray-300 hover:text-red-400' : 'text-gray-700 hover:text-red-500',
      navTextTransparent: isDarkMode ? 'text-gray-200 hover:text-red-300' : 'text-white hover:text-red-300',
      
      // Dropdown colors
      dropdown: isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
      dropdownHover: isDarkMode ? 'hover:bg-gray-700 hover:text-red-400' : 'hover:bg-gray-50 hover:text-red-500',
      
      // Hero gradient - keeping brand gradient but with dark mode support
      heroGradient: isDarkMode ? 'from-gray-900 via-purple-900 to-gray-900' : '',
      
      // Footer colors
      footer: isDarkMode ? 'bg-gray-900' : '', // Keep the navy for brand consistency
      footerText: isDarkMode ? 'text-gray-300' : 'text-gray-300',
      
      // Shadow colors
      shadow: isDarkMode ? 'shadow-2xl shadow-black/50' : 'shadow-lg shadow-gray-200',
      shadowHover: isDarkMode ? 'hover:shadow-2xl hover:shadow-black/70' : 'hover:shadow-xl hover:shadow-gray-300'
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};