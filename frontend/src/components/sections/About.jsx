// FILE PATH: src/components/sections/About.jsx (With Dark Mode - Stats Removed)

import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const About = () => {
  const { isDarkMode } = useTheme();

  const benefits = [
    "Comprehensive audit and compliance management",
    "Advanced project management capabilities", 
    "Risk assessment and mitigation tools",
    "Professional consulting and advisory services"
  ];

  return (
    <section id="about" className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : ''
          }`} style={{color: isDarkMode ? 'white' : '#2D1B69'}}>
            When your needs grow, <span className="text-red-500">so do we</span>
          </h2>
          <p className={`text-lg mb-8 leading-relaxed ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Bruv empowers you to maintain effective control of your operations through comprehensive 
            technology solutions and professional services. We handle the heavy lifting so you can 
            focus your expertise where it matters most.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto">
            {benefits.map((item, index) => (
              <div key={index} className="flex items-center justify-center md:justify-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                  {item}
                </span>
              </div>
            ))}
          </div>
          
          <button className="bg-red-500 hover:bg-red-600 text-white font-medium px-8 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
            Learn About Our Story
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;