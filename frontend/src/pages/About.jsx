// FILE PATH: src/pages/About.jsx (Beautiful Redesign)

import React, { useRef, useEffect } from 'react';
import { CheckCircle, Users, Award, Globe, Zap, Target, TrendingUp, Shield, Heart, Star, ArrowRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const About = () => {
  const { isDarkMode } = useTheme();

  const values = [
    {
      icon: Shield,
      title: "Reliability",
      description: "We deliver consistent, dependable solutions that organizations can trust for their critical operations.",
      color: "bg-blue-500"
    },
    {
      icon: Target,
      title: "Precision",
      description: "Our solutions are designed with meticulous attention to detail, ensuring accuracy in every aspect.",
      color: "bg-red-500"
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "We continuously evolve our technology and methodologies to stay ahead of industry trends.",
      color: "bg-purple-500"
    },
    {
      icon: Users,
      title: "Partnership",
      description: "We work closely with our clients as trusted partners in their journey toward operational excellence.",
      color: "bg-green-500"
    }
  ];

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "👩‍💼",
      description: "15+ years in organizational consulting and risk management."
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "👨‍💻",
      description: "Former lead architect at top fintech companies."
    },
    {
      name: "Elena Rodriguez",
      role: "Head of Operations",
      image: "👩‍🔬",
      description: "Expert in compliance frameworks and quality assurance."
    }
  ];

  const achievements = [
    { icon: Users, number: "50+", label: "Active Projects" },
    { icon: Star, number: "98%", label: "Client Satisfaction" },
    { icon: Globe, number: "10+", label: "Industries Served" },
    { icon: Award, number: "5+", label: "Years Experience" }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Hero Section */}
      <section className={`pt-32 pb-20 relative overflow-hidden ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-20 right-20 w-72 h-72 ${
            isDarkMode ? 'bg-red-500/5' : 'bg-red-500/10'
          } rounded-full blur-3xl`}></div>
          <div className={`absolute bottom-20 left-20 w-96 h-96 ${
            isDarkMode ? 'bg-blue-500/5' : 'bg-blue-500/10'
          } rounded-full blur-3xl`}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className={`inline-flex items-center px-4 py-2 ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'
              } border rounded-full text-sm font-medium mb-8`}>
                <Heart className="w-4 h-4 text-red-500 mr-2" />
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Our Story
                </span>
              </div>

              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                About <span className="text-red-500 relative">
                  Bruv
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-red-500 rounded-full opacity-50"></div>
                </span>
              </h1>
              
              <p className={`text-xl leading-relaxed mb-8 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                We're inspired by bravery and confidence — under control. Our mission is to empower 
                organizations with the tools and expertise they need to maintain effective operational control.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-red-500/25 inline-flex items-center justify-center group">
                  Contact Us Today
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
                <button className={`border-2 font-semibold px-8 py-4 rounded-xl transition-all duration-300 ${
                  isDarkMode 
                    ? 'border-gray-700 text-gray-300 hover:bg-gray-800' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}>
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Content - Achievement Cards */}
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className={`p-6 rounded-2xl ${
                  isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center`}>
                  <div className={`w-12 h-12 ${
                    isDarkMode ? 'bg-red-900/20' : 'bg-red-100'
                  } rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <achievement.icon className="w-6 h-6 text-red-500" />
                  </div>
                  <div className={`text-3xl font-bold mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {achievement.number}
                  </div>
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {achievement.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-3xl md:text-4xl font-bold mb-8 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Our Journey
          </h2>
          <div className="space-y-6">
            <p className={`text-lg leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Bruv was born from the recognition that modern organizations needed more than just 
              software tools — they needed a comprehensive approach to operational control that 
              combines cutting-edge technology with deep domain expertise.
            </p>
            <p className={`text-lg leading-relaxed ${
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
      <section className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
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
                className={`text-center p-8 rounded-2xl ${
                  isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                } border hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group`}
              >
                <div className={`w-16 h-16 mx-auto mb-6 ${value.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-xl font-bold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {value.title}
                </h3>
                <p className={`text-sm leading-relaxed ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    

      {/* Mission & Vision */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            <div className={`p-8 rounded-2xl ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-100'
            } border relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl"></div>
              <div className={`w-16 h-16 mb-6 bg-red-500 rounded-2xl flex items-center justify-center relative z-10`}>
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Our Mission
              </h3>
              <p className={`text-lg leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                To empower organizations with innovative solutions that enable precise control, 
                transparent operations, and confident decision-making in an increasingly complex 
                business environment.
              </p>
            </div>

            <div className={`p-8 rounded-2xl ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-100'
            } border relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
              <div className={`w-16 h-16 mb-6 bg-blue-500 rounded-2xl flex items-center justify-center relative z-10`}>
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Our Vision
              </h3>
              <p className={`text-lg leading-relaxed ${
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
      <section className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
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
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-red-500/25 inline-flex items-center justify-center group">
              Contact Us Today
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button className={`border-2 font-semibold px-8 py-4 rounded-xl transition-all duration-300 ${
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