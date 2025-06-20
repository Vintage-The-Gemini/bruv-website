// FILE PATH: src/components/sections/Hero.jsx (Redesigned with Better Layout)

import React from 'react';
import { ArrowRight, Play, CheckCircle, Users, TrendingUp, Shield, Zap } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Hero = () => {
  const { isDarkMode } = useTheme();

  const stats = [
    { number: "500+", label: "Projects Completed" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "50+", label: "Organizations Served" },
    { number: "24/7", label: "Support Available" }
  ];

  const features = [
    { icon: Shield, text: "Enterprise Security" },
    { icon: TrendingUp, text: "Proven Results" },
    { icon: Users, text: "Expert Team" },
    { icon: Zap, text: "Fast Implementation" }
  ];

  return (
    <section 
      className={`relative min-h-screen flex items-center pt-20 overflow-hidden ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900' 
          : 'bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900'
      }`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-xl animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-lg animate-pulse animation-delay-300"></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-red-500/15 rounded-full blur-lg animate-float animation-delay-500"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"></div>
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center py-12">
        {/* Left Content */}
        <div className="text-center lg:text-left space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/20">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            Trusted by 500+ Organizations
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              <span className="block">Precision for Your</span>
              <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                Vision
              </span>
            </h1>
            <div className="text-xl md:text-2xl text-gray-300 font-light">
              Control Your Organization with Confidence
            </div>
          </div>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
            At Bruv, we're inspired by bravery and confidence — under control. Our comprehensive 
            solutions handle the heavy lifting so you can focus your expertise where it matters most.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="group bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-red-500/25 inline-flex items-center justify-center transform hover:scale-105">
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            
            <button className="group inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 hover:border-white/50 text-white font-semibold rounded-xl transition-all duration-300 hover:bg-white/10 backdrop-blur-sm">
              <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              Watch Demo
            </button>
          </div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4 pt-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 text-gray-300">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <feature.icon className="w-4 h-4 text-red-400" />
                </div>
                <span className="text-sm font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content - Interactive Dashboard Preview */}
        <div className="relative">
          {/* Main Dashboard Card */}
          <div className={`${
            isDarkMode ? 'bg-gray-800/90 border border-gray-700' : 'bg-white/90 border border-white/20'
          } backdrop-blur-xl rounded-2xl shadow-2xl p-8 relative z-10 transform hover:scale-105 transition-transform duration-300`}>
            
            {/* Dashboard Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Bruv Control Center
              </div>
            </div>
            
            {/* Dashboard Title */}
            <div className="mb-6">
              <h3 className={`text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Organizational Control Dashboard
              </h3>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Real-time visibility into your operations
              </p>
            </div>
            
            {/* KPI Cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className={`${
                isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
              } rounded-xl p-4 border border-gray-200/10`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-xs ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Active Projects
                    </p>
                    <p className="text-2xl font-bold text-blue-500">24</p>
                    <p className="text-xs text-green-500">↗ +12%</p>
                  </div>
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                  </div>
                </div>
              </div>
              
              <div className={`${
                isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
              } rounded-xl p-4 border border-gray-200/10`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-xs ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Compliance Rate
                    </p>
                    <p className="text-2xl font-bold text-green-500">98%</p>
                    <p className="text-xs text-green-500">↗ +2%</p>
                  </div>
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Progress Indicators */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                    Risk Assessment
                  </span>
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-800'}>
                    85%
                  </span>
                </div>
                <div className={`w-full ${
                  isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                } rounded-full h-2`}>
                  <div className="bg-gradient-to-r from-red-400 to-red-600 h-2 rounded-full transition-all duration-1000" 
                       style={{width: '85%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                    Project Completion
                  </span>
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-800'}>
                    92%
                  </span>
                </div>
                <div className={`w-full ${
                  isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                } rounded-full h-2`}>
                  <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all duration-1000 animation-delay-200" 
                       style={{width: '92%'}}></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating Notification Cards */}
          <div className={`absolute -top-4 -right-4 ${
            isDarkMode ? 'bg-gray-800/90 border border-gray-700' : 'bg-white/90 border border-white/20'
          } backdrop-blur-xl rounded-xl shadow-lg p-4 z-20 animate-bounce animation-delay-300`}>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <p className={`text-xs font-medium ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  Audit Complete
                </p>
                <p className={`text-xs ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Q4 Financial Review
                </p>
              </div>
            </div>
          </div>
          
          <div className={`absolute -bottom-4 -left-4 ${
            isDarkMode ? 'bg-gray-800/90 border border-gray-700' : 'bg-white/90 border border-white/20'
          } backdrop-blur-xl rounded-xl shadow-lg p-4 z-20 animate-pulse animation-delay-500`}>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <p className={`text-xs font-medium ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  Performance Up
                </p>
                <p className={`text-xs ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  +15% This Quarter
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="absolute bottom-0 left-0 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom Wave Separator */}
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className={`w-full h-16 ${
            isDarkMode ? 'fill-gray-900' : 'fill-white'
          }`}
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
                opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
                opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;