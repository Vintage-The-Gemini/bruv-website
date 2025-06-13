// FILE PATH: src/pages/Home.jsx
// Enhanced Home Page with Parallax and Polymorphism

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import Products from '../components/sections/Products';
import About from '../components/sections/About';
import Contact from '../components/sections/Contact';
import { 
  ChevronDown, 
  Sparkles, 
  Zap, 
  Star, 
  Circle,
  Triangle,
  Square,
  ArrowRight
} from 'lucide-react';

// Parallax Background Component
const ParallaxBackground = ({ children, speed = 0.5, className = "" }) => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div 
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${scrollY * speed}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-blue-900/10 to-indigo-900/10 dark:from-purple-400/5 dark:via-blue-400/5 dark:to-indigo-400/5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
        
        {/* Floating Geometric Shapes */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-30"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${20 + (i * 8)}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          >
            {i % 4 === 0 && <Circle className="w-6 h-6 text-red-300" />}
            {i % 4 === 1 && <Triangle className="w-6 h-6 text-purple-300" />}
            {i % 4 === 2 && <Square className="w-6 h-6 text-blue-300" />}
            {i % 4 === 3 && <Star className="w-6 h-6 text-indigo-300" />}
          </div>
        ))}
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// Polymorphic Section Wrapper
const PolymorphicSection = ({ 
  children, 
  variant = 'default', 
  parallaxSpeed = 0.3,
  className = "",
  animationTrigger = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const variants = {
    default: "bg-white dark:bg-gray-900",
    gradient: "bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20",
    glass: "bg-white/40 dark:bg-gray-900/40 backdrop-blur-lg",
    floating: "bg-gradient-to-r from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900",
    neon: "bg-gray-900 relative overflow-hidden"
  };

  const animations = {
    default: isVisible ? "animate-fadeInUp" : "opacity-0 translate-y-10",
    gradient: isVisible ? "animate-slideInLeft" : "opacity-0 -translate-x-10", 
    glass: isVisible ? "animate-zoomIn" : "opacity-0 scale-95",
    floating: isVisible ? "animate-bounceIn" : "opacity-0 scale-90",
    neon: isVisible ? "animate-slideInRight" : "opacity-0 translate-x-10"
  };

  return (
    <ParallaxBackground speed={parallaxSpeed}>
      <section 
        ref={sectionRef}
        className={`
          ${variants[variant]} 
          ${animations[variant]}
          transition-all duration-1000 ease-out
          ${className}
        `}
      >
        {variant === 'neon' && (
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-purple-500/10 to-blue-500/10 animate-gradientShift"></div>
        )}
        
        {/* Content with morphing container */}
        <div className={`
          relative z-10
          ${variant === 'floating' ? 'transform hover:scale-105 transition-transform duration-500' : ''}
          ${variant === 'glass' ? 'border border-white/20 dark:border-gray-700/50' : ''}
        `}>
          {children}
        </div>

        {/* Decorative Elements */}
        {variant === 'gradient' && (
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-red-500/5 to-transparent"></div>
        )}
        
        {variant === 'neon' && (
          <>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500"></div>
          </>
        )}
      </section>
    </ParallaxBackground>
  );
};

// Interactive Navigation Dots
const NavigationDots = () => {
  const [activeSection, setActiveSection] = useState(0);
  const sections = ['hero', 'services', 'products', 'about', 'contact'];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      sections.forEach((section, index) => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 space-y-4">
      {sections.map((section, index) => (
        <button
          key={section}
          onClick={() => scrollToSection(section)}
          className={`
            w-3 h-3 rounded-full transition-all duration-300 hover:scale-150
            ${activeSection === index 
              ? 'bg-red-500 shadow-lg shadow-red-500/50' 
              : 'bg-gray-400 dark:bg-gray-600 hover:bg-red-300'
            }
          `}
          aria-label={`Navigate to ${section}`}
        />
      ))}
    </div>
  );
};

// Morphing Hero Enhancement
const EnhancedHero = () => {
  return (
    <div id="hero" className="relative">
      <Hero />
      
      {/* Floating Action Button */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button 
          onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          className="w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

// Interactive Stats Counter
const StatsCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime = null;
    const startCount = 0;
    
    const updateCount = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * (end - startCount) + startCount));
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };
    
    requestAnimationFrame(updateCount);
  }, [isVisible, end, duration]);

  return (
    <span ref={countRef} className="text-4xl font-bold text-red-500">
      {count}{suffix}
    </span>
  );
};

// Main Home Component
const Home = () => {
  const { isDarkMode } = useTheme();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="Home relative">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation Dots */}
      <NavigationDots />

      {/* Enhanced Hero Section */}
      <PolymorphicSection variant="gradient" parallaxSpeed={0.2}>
        <EnhancedHero />
      </PolymorphicSection>

      {/* Services with Glass Effect */}
      <PolymorphicSection variant="glass" parallaxSpeed={0.4} className="py-8">
        <div id="services">
          <Services />
        </div>
        
        {/* Stats Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 500, suffix: "+", label: "Happy Clients" },
              { value: 98, suffix: "%", label: "Success Rate" },
              { value: 50, suffix: "+", label: "Countries" },
              { value: 24, suffix: "/7", label: "Support" }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="transform group-hover:scale-110 transition-transform duration-300">
                  <StatsCounter end={stat.value} suffix={stat.suffix} />
                  <p className="text-gray-600 dark:text-gray-400 mt-2">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PolymorphicSection>

      {/* Products with Floating Effect */}
      <PolymorphicSection variant="floating" parallaxSpeed={0.3} className="py-8">
        <div id="products">
          <Products />
        </div>
      </PolymorphicSection>

      {/* About with Neon Effect */}
      <PolymorphicSection variant="neon" parallaxSpeed={0.5} className="py-8">
        <div id="about">
          <About />
        </div>
      </PolymorphicSection>

      {/* Contact with Default Enhanced */}
      <PolymorphicSection variant="default" parallaxSpeed={0.2} className="py-8">
        <div id="contact">
          <Contact />
        </div>
      </PolymorphicSection>

      {/* Floating Action Elements */}
      <div className="fixed bottom-8 right-8 space-y-4 z-40">
        <button className="w-12 h-12 bg-gradient-to-r from-red-500 to-purple-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 animate-pulse">
          <Sparkles className="w-6 h-6" />
        </button>
        <button className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300">
          <Zap className="w-6 h-6" />
        </button>
      </div>

      {/* Background Pattern Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ef4444' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
    </div>
  );
};

export default Home;