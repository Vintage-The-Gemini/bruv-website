// FILE PATH: src/pages/About.jsx (Complete Redesign)

import React from 'react';
import { CheckCircle, Users, Award, Globe, Zap, Target, TrendingUp, Shield, Heart, Star, ArrowRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const About = () => {
  const { isDarkMode } = useTheme();

  const values = [
    {
      icon: Shield,
      title: "Reliability",
      description: "We deliver consistent, dependable solutions that organizations can trust for their critical operations.",
      color: "blue"
    },
    {
      icon: Target,
      title: "Precision",
      description: "Our solutions are designed with meticulous attention to detail, ensuring accuracy in every aspect.",
      color: "red"
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "We continuously evolve our technology and methodologies to stay ahead of industry trends.",
      color: "green"
    },
    {
      icon: Heart,
      title: "Partnership",
      description: "We work closely with our clients as trusted partners in their journey toward operational excellence.",
      color: "purple"
    }
  ];

  const timeline = [
    {
      year: "2020",
      title: "The Vision",
      description: "Bruv was founded with a simple belief: organizations needed more than just software tools—they needed a comprehensive approach to operational control."
    },
    {
      year: "2021",
      title: "First Solutions",
      description: "Launched our first project management and audit tracking solutions, helping early adopters transform their operations."
    },
    {
      year: "2022",
      title: "Rapid Growth",
      description: "Expanded our team and capabilities, adding risk & compliance management to our suite of solutions."
    },
    {
      year: "2023",
      title: "Enterprise Ready",
      description: "Achieved enterprise-grade security and scalability, serving organizations across multiple industries."
    },
    {
      year: "2024",
      title: "Global Impact",
      description: "Today, we empower organizations worldwide with cutting-edge technology and deep domain expertise."
    }
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      description: "Former McKinsey consultant with 15+ years in organizational transformation.",
      image: "👩‍💼"
    },
    {
      name: "Michael Rodriguez",
      role: "CTO & Co-Founder", 
      description: "Ex-Google engineer passionate about building scalable enterprise solutions.",
      image: "👨‍💻"
    },
    {
      name: "Dr. Emily Watson",
      role: "Head of Risk & Compliance",
      description: "Former Big Four audit partner specializing in regulatory compliance.",
      image: "👩‍🔬"
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      
      {/* Hero Section */}
      <section className={`relative pt-32 pb-20 overflow-hidden ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900' 
          : 'bg-navy-gradient'
      }`}>
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-72 h-72 bg-red-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white text-sm font-medium mb-8">
            <Star className="w-4 h-4 mr-2 text-yellow-400" />
            Inspired by bravery and confidence
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8">
            About
            <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent"> Bruv</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto mb-12">
            We're on a mission to empower organizations with the tools and expertise they need 
            to maintain effective operational control and achieve unprecedented success.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 inline-flex items-center justify-center">
              Our Story
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 font-semibold px-8 py-4 rounded-xl transition-all duration-300 backdrop-blur-sm">
              Meet the Team
            </button>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className={`w-full h-20 ${
            isDarkMode ? 'fill-gray-900' : 'fill-white'
          }`}>
            <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Our Story Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className={`text-4xl md:text-5xl font-bold mb-8 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Our <span className="text-red-500">Story</span>
              </h2>
              <div className="space-y-6 text-lg">
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Bruv was born from the recognition that modern organizations needed more than just 
                  software tools — they needed a comprehensive approach to operational control that 
                  combines cutting-edge technology with deep domain expertise.
                </p>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  We are committed to empowering organizations with the tools and expertise they need 
                  to maintain effective operational control, drive successful outcomes, and achieve 
                  unprecedented levels of visibility in their operations.
                </p>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Today, we're proud to serve organizations worldwide, helping them transform their 
                  approach to project management, risk assessment, and compliance monitoring.
                </p>
              </div>
            </div>

            {/* Story Visual */}
            <div className="relative">
              <div className={`${
                isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
              } rounded-3xl p-8 shadow-2xl`}>
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-2xl p-6 shadow-lg`}>
                    <div className="text-4xl font-bold text-red-500 mb-2">4+</div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Years of Innovation</p>
                  </div>
                  <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-2xl p-6 shadow-lg`}>
                    <div className="text-4xl font-bold text-green-500 mb-2">100+</div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Organizations Served</p>
                  </div>
                  <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-2xl p-6 shadow-lg`}>
                    <div className="text-4xl font-bold text-blue-500 mb-2">50+</div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Team Members</p>
                  </div>
                  <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-2xl p-6 shadow-lg`}>
                    <div className="text-4xl font-bold text-purple-500 mb-2">3</div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Core Solutions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Our Core <span className="text-red-500">Values</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              These principles guide everything we do and every solution we create.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className={`group text-center p-8 rounded-2xl ${
                  isDarkMode ? 'bg-gray-900 border-gray-700 hover:bg-gray-800' : 'bg-white border-gray-100 hover:bg-gray-50'
                } border hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}
              >
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                  value.color === 'blue' ? 'bg-blue-100 group-hover:bg-blue-200' :
                  value.color === 'red' ? 'bg-red-100 group-hover:bg-red-200' :
                  value.color === 'green' ? 'bg-green-100 group-hover:bg-green-200' :
                  'bg-purple-100 group-hover:bg-purple-200'
                }`}>
                  <value.icon className={`w-8 h-8 ${
                    value.color === 'blue' ? 'text-blue-600' :
                    value.color === 'red' ? 'text-red-600' :
                    value.color === 'green' ? 'text-green-600' :
                    'text-purple-600'
                  }`} />
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

      {/* Timeline Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Our <span className="text-red-500">Journey</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              The milestones that shaped Bruv into what we are today
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className={`${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
            } border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group text-center`}>
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-8 h-8 text-red-600" />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                The Vision
              </h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                Bruv was founded with a simple belief: organizations needed more than just software tools—they needed a comprehensive approach to operational control.
              </p>
            </div>
            
            <div className={`${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
            } border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group text-center`}>
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Innovation Focus
              </h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                We continuously evolve our technology and methodologies, combining cutting-edge solutions with deep domain expertise.
              </p>
            </div>

            <div className={`${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
            } border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group text-center md:col-span-2 lg:col-span-1`}>
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className={`text-xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Global Impact
              </h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                Today, we empower organizations worldwide with tools and expertise to achieve unprecedented levels of operational excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Ready to Partner with <span className="text-red-500">Us?</span>
          </h2>
          <p className={`text-xl mb-12 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Let's discuss how Bruv can help strengthen your organizational controls 
            and drive successful outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-10 py-4 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 inline-flex items-center justify-center group">
              Contact Us Today
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button className={`border-2 font-semibold px-10 py-4 rounded-xl transition-all duration-300 ${
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