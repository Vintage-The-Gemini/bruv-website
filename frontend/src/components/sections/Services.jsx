// FILE PATH: src/components/sections/Services.jsx (With Dark Mode - Complete)

import React from 'react';
import { BarChart3, Shield, CheckCircle, Target, ArrowRight } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Services = () => {
  const { isDarkMode } = useTheme();

  const services = [
    {
      icon: BarChart3,
      title: "Project Management",
      description: "From concept to completion, we bring structure, clarity, and control to your projects with tailored methodologies.",
      features: ["Agile & Waterfall methodologies", "Risk mitigation", "Stakeholder engagement", "Budget control"]
    },
    {
      icon: Shield,
      title: "Information System Audit",
      description: "Comprehensive evaluation of your IT systems against industry standards to uncover vulnerabilities and inefficiencies.",
      features: ["Security assessments", "Compliance reviews", "Infrastructure audits", "Disaster recovery"]
    },
    {
      icon: CheckCircle,
      title: "Quality Assurance",
      description: "Comprehensive testing strategies including manual, automated, regression, and performance testing.",
      features: ["Manual & automated testing", "Performance testing", "Security testing", "User acceptance testing"]
    },
    {
      icon: Target,
      title: "Risk & Compliance",
      description: "Build robust frameworks that align with legal and industry standards while managing operational risks.",
      features: ["Risk assessment", "Compliance frameworks", "Policy development", "Training programs"]
    }
  ];

  return (
    <section id="services" className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : ''
          }`} style={{color: isDarkMode ? 'white' : '#2D1B69'}}>
            Professional Services <span className="text-red-500">Tangible Results.</span>
          </h2>
          <p className={`text-lg max-w-3xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            From project management to risk assessment, we provide comprehensive services 
            that strengthen your organizational controls and drive successful outcomes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
                  : 'bg-white border-gray-100 hover:bg-gray-50'
              } border rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
            >
              <div className={`w-12 h-12 ${
                isDarkMode ? 'bg-red-900/20' : 'bg-red-100'
              } rounded-lg flex items-center justify-center mb-4`}>
                <service.icon className="w-6 h-6 text-red-500" />
              </div>
              <h3 className={`text-xl font-semibold mb-3 ${
                isDarkMode ? 'text-white' : ''
              }`} style={{color: isDarkMode ? 'white' : '#2D1B69'}}>
                {service.title}
              </h3>
              <p className={`text-sm leading-relaxed mb-4 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {service.description}
              </p>
              
              {/* Service Features */}
              <ul className="space-y-2 mb-4">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className={`flex items-center text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="mt-4">
                <a href="#" className="text-red-500 font-medium text-sm hover:text-red-600 transition-colors duration-200 inline-flex items-center">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;