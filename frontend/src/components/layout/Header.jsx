// FILE PATH: src/components/layout/Header.jsx (Fixed Sizing)

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import ThemeToggle from "../ui/ThemeToggle";
import { useTheme } from "../../contexts/ThemeContext";
// Import your logo variations
import bruvLogo01 from "../../assets/images/bruv-01.png"; // Original white logo
import bruvLogo02 from "../../assets/images/bruv-02.png"; // Dark/colored logo
import bruvLogo03 from "../../assets/images/bruv-03.png"; // Alternative logo

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { colors, isDarkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine which logo to show based on scroll state and theme
  const getLogoSrc = () => {
    if (!isScrolled) {
      // When not scrolled (on hero section), use white logo
      return bruvLogo02;
    } else {
      // When scrolled (on other sections), use bruv-03
      return bruvLogo01;
    }
  };

  const getLogoFilter = () => {
    if (!isScrolled) {
      // On hero section, ensure visibility with white logo
      return "brightness(0) invert(1)";
    } else {
      // When scrolled, use bruv-03 without filters for its original colors
      return "none";
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? `${isDarkMode ? "bg-gray-900/95" : "bg-white/95"} backdrop-blur-lg shadow-lg border-b ${
              isDarkMode ? "border-gray-800" : "border-gray-200"
            }`
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo Section - Responsive sizing */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center justify-center group">
              <img
                src={getLogoSrc()}
                alt="Bruv Logo"
                className="object-contain transition-all duration-300 group-hover:scale-105"
                style={{
                  width: isScrolled ? "80px" : "120px",
                  height: isScrolled ? "80px" : "120px",
                  maxWidth: "120px",
                  maxHeight: "120px",
                  filter: getLogoFilter(),
                }}
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