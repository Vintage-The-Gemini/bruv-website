// FILE PATH: src/components/sections/About.jsx (With Dark Mode)

import React from 'react';
import { CheckCircle, Users, Award, Globe, Zap } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const About = () => {
  const { isDarkMode } = useTheme();

  const stats = [
    { icon: Users, title: "500+", subtitle: "Happy Clients" },
    { icon: Award, title: "98%", subtitle: "Success Rate" },
    { icon: Globe, title: "50+", subtitle: "Countries Served" },
    { icon: Zap, title: "24/7", subtitle: "Support Available" }
  ];

  const benefits = [
    "Comprehensive audit and compliance management",
    "Advanced project management capabilities", 
    "Risk assessment and mitigation tools",
    "Professional consulting and advisory services"
  ];

  return (
    <section id="about" className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
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
            
            <div className="space-y-4 mb-8">
              {benefits.map((item, index) => (
                <div key={index} className="flex items-center">
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
          
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`text-center p-6 border rounded-xl hover:shadow-lg transition-all duration-300 ${
                  isDarkMode 
                    ? 'border-gray-700 bg-gray-800 hover:bg-gray-750' 
                    : 'border-gray-100 bg-white hover:bg-gray-50'
                }`}
              >
                <div className={`w-12 h-12 mx-auto mb-4 ${
                  isDarkMode ? 'bg-red-900/20' : 'bg-red-100'
                } rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-red-500" />
                </div>
                <div className={`text-2xl font-bold mb-1 ${
                  isDarkMode ? 'text-white' : ''
                }`} style={{color: isDarkMode ? 'white' : '#2D1B69'}}>
                  {stat.title}
                </div>
                <div className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {stat.subtitle}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;