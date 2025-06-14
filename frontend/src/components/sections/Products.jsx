// FILE PATH: src/components/sections/Products.jsx (With Dark Mode)

import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Products = () => {
  const { isDarkMode } = useTheme();

  const products = [
    {
      title: "Project Management Software",
      subtitle: "Plan. Track. Succeed.",
      description: "Powerful features like task assignment, timeline tracking, Gantt charts, and real-time collaboration in one central dashboard.",
      icon: "📊",
      features: ["Task Management", "Gantt Charts", "Team Collaboration", "Progress Tracking"]
    },
    {
      title: "Internal Audit Management",
      subtitle: "Audit Smarter, Not Harder.",
      description: "Streamline audit processes with built-in templates, automated scheduling, and real-time dashboards for full visibility.",
      icon: "🛡",
      features: ["Audit Planning", "Finding Tracking", "Report Generation", "Compliance Monitoring"]
    },
    {
      title: "Risk & Compliance Management",
      subtitle: "Stay Ahead of Risk.",
      description: "Proactively identify, assess, and respond to risk across the enterprise with intelligent automation.",
      icon: "⚙",
      features: ["Risk Assessment", "Compliance Controls", "Dynamic Dashboards", "Regulatory Updates"]
    }
  ];

  return (
    <section 
      id="solutions" 
      className={`py-20 ${
        isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : ''
          }`} style={{color: isDarkMode ? 'white' : '#2D1B69'}}>
            Smart Tools for <span className="text-red-500">Smarter Teams</span>
          </h2>
          <p className={`text-lg max-w-3xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Our software solutions are built to simplify the complex and empower your teams 
            to work smarter, not harder.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div 
              key={index} 
              className={`${
                isDarkMode ? 'bg-gray-900 hover:bg-gray-850' : 'bg-white hover:bg-gray-50'
              } rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}
            >
              <div className="text-4xl mb-4">{product.icon}</div>
              <h3 className={`text-xl font-bold mb-2 ${
                isDarkMode ? 'text-white' : ''
              }`} style={{color: isDarkMode ? 'white' : '#2D1B69'}}>
                {product.title}
              </h3>
              <p className="text-red-500 font-medium text-sm mb-4">{product.subtitle}</p>
              <p className={`mb-6 leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {product.description}
              </p>
              
              <div className="space-y-2 mb-6">
                {product.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className={`text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
              
              <button className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-lg transition-all duration-200">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;