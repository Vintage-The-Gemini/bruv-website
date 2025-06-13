// FILE PATH: src/pages/About.jsx

import React from 'react';
import { CheckCircle, Users, Award, Globe, Zap, Target, TrendingUp, Shield } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const About = () => {
  const { isDarkMode } = useTheme();

  const values = [
    {
      icon: Shield,
      title: "Reliability",
      description: "We deliver consistent, dependable solutions that organizations can trust for their critical operations."
    },
    {
      icon: Target,
      title: "Precision",
      description: "Our solutions are designed with meticulous attention to detail, ensuring accuracy in every aspect."
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "We continuously evolve our technology and methodologies to stay ahead of industry trends."
    },
    {
      icon: Users,
      title: "Partnership",
      description: "We work closely with our clients as trusted partners in their journey toward operational excellence."
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Hero Section */}
      <section className={`pt-24 pb-16 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              About <span className="text-red-500">Bruv</span>
            </h1>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              We're inspired by bravery and confidence — under control. Our mission is to empower 
              organizations with the tools and expertise they need to maintain effective operational control.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Our Story
            </h2>
            <p className={`text-lg mb-6 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Bruv was born from the recognition that modern organizations needed more than just 
              software tools — they needed a comprehensive approach to operational control that 
              combines cutting-edge technology with deep domain expertise.
            </p>
            <p className={`text-lg ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              We are committed to empowering organizations with the tools and expertise they need 
              to maintain effective operational control, drive successful outcomes, and achieve 
              unprecedented levels of visibility in their operations.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Our Core Values
            </h2>
            <p className={`text-lg max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              These principles guide everything we do and every solution we create.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className={`text-center p-6 rounded-xl ${
                  isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'
                } border hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                <div className={`w-16 h-16 mx-auto mb-4 ${
                  isDarkMode ? 'bg-red-900/20' : 'bg-red-100'
                } rounded-full flex items-center justify-center`}>
                  <value.icon className="w-8 h-8 text-red-500" />
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {value.title}
                </h3>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            <div className={`p-8 rounded-xl ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-100'
            } border`}>
              <div className={`w-16 h-16 mb-6 ${
                isDarkMode ? 'bg-red-900/20' : 'bg-red-100'
              } rounded-full flex items-center justify-center`}>
                <Target className="w-8 h-8 text-red-500" />
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Our Mission
              </h3>
              <p className={`text-lg ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                To empower organizations with innovative solutions that enable precise control, 
                transparent operations, and confident decision-making in an increasingly complex 
                business environment.
              </p>
            </div>

            <div className={`p-8 rounded-xl ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-100'
            } border`}>
              <div className={`w-16 h-16 mb-6 ${
                isDarkMode ? 'bg-red-900/20' : 'bg-red-100'
              } rounded-full flex items-center justify-center`}>
                <TrendingUp className="w-8 h-8 text-red-500" />
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Our Vision
              </h3>
              <p className={`text-lg ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                To be the global leader in organizational control solutions, setting the standard 
                for how businesses manage risk, ensure compliance, and achieve operational excellence 
                through technology and expertise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Ready to Partner with Us?
          </h2>
          <p className={`text-lg mb-8 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Let's discuss how Bruv can help strengthen your organizational controls 
            and drive successful outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-red-500 hover:bg-red-600 text-white font-medium px-8 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
              Contact Us Today
            </button>
            <button className={`border-2 font-medium px-8 py-3 rounded-lg transition-all duration-200 ${
              isDarkMode 
                ? 'border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-700' 
                : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
            }`}>
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;