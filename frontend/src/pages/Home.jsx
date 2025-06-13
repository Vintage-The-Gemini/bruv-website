// FILE PATH: src/pages/Home.jsx - Simplified and Clean

import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import Products from '../components/sections/Products';
import About from '../components/sections/About';

const Home = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="Home">
      {/* Hero Section */}
      <section id="hero">
        <Hero />
      </section>

      {/* Services Section */}
      <section id="services">
        <Services />
      </section>

      {/* Products Section */}
      <section id="products">
        <Products />
      </section>

      {/* About Section */}
      <section id="about">
        <About />
      </section>
    </div>
  );
};

export default Home;