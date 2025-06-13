// FILE PATH: src/components/sections/Hero.jsx (With Dark Mode)

import React from 'react';
import { ArrowRight, Play, Shield, BarChart3, CheckCircle, TrendingUp } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Hero = () => {
  const { isDarkMode } = useTheme();

  return (
    <section 
      id="home" 
      className={`relative min-h-screen flex items-center overflow-hidden ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900' 
          : 'bg-navy-gradient'
      }`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-red-500/10 rounded-full blur-xl animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-lg animate-pulse"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            <span className="block">CONTROL YOUR</span>
            <span className="text-red-500">ORGANIZATION</span>
            <span className="block text-2xl md:text-3xl lg:text-4xl font-normal text-gray-300 mt-2">
              with Confidence
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
            At Bruv, we're inspired by bravery and confidence — under control. 
            Whether you're a project manager, internal auditor, or head of risk and compliance, 
            our solutions handle the heavy lifting so you can focus your expertise where it matters most.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-red-500 hover:bg-red-600 text-white font-medium px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center justify-center group">
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            
            <button className={`inline-flex items-center justify-center px-8 py-4 border-2 ${
              isDarkMode 
                ? 'border-gray-600 hover:border-gray-500 hover:bg-gray-700/50' 
                : 'border-white/20 hover:border-white/40 hover:bg-white/10'
            } text-white font-medium rounded-lg transition-all duration-200 group`}>
              <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              Watch Demo
            </button>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12">
            <p className="text-gray-400 text-sm mb-4">Trusted by world's leading brands</p>
            <div className="flex items-center justify-center lg:justify-start space-x-8 opacity-60">
              <div className="text-white font-semibold">Microsoft</div>
              <div className="text-white font-semibold">Google</div>
              <div className="text-white font-semibold">Amazon</div>
              <div className="text-white font-semibold">IBM</div>
            </div>
          </div>
        </div>

        {/* Right Content - Dashboard Preview */}
        <div className="relative">
          {/* Main Dashboard */}
          <div className={`${
            isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
          } rounded-2xl shadow-2xl p-6 relative z-10`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Bruv Dashboard
              </div>
            </div>
            
            {/* Dashboard Header */}
            <div className="mb-6">
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Project Control Center
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Real-time visibility into your operations
              </p>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-4`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Active Projects
                    </p>
                    <p className="text-2xl font-bold" style={{color: '#2D1B69'}}>24</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-red-500" />
                </div>
              </div>
              <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-4`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Compliance Rate
                    </p>
                    <p className="text-2xl font-bold text-green-500">98%</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </div>
            </div>
            
            {/* Progress Bars */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Risk Assessment</span>
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-800'}>85%</span>
                </div>
                <div className={`w-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-2`}>
                  <div className="bg-red-500 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Audit Progress</span>
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-800'}>72%</span>
                </div>
                <div className={`w-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-2`}>
                  <div className="h-2 rounded-full" style={{width: '72%', backgroundColor: '#2D1B69'}}></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating Cards */}
          <div className={`absolute -top-4 -right-4 ${
            isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
          } rounded-lg shadow-lg p-4 z-20 animate-bounce`}>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <div>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Performance</p>
                <p className="text-sm font-semibold text-green-500">+12%</p>
              </div>
            </div>
          </div>
          
          <div className={`absolute -bottom-4 -left-4 ${
            isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
          } rounded-lg shadow-lg p-4 z-20 animate-pulse`}>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-red-500" />
              <div>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Security Score</p>
                <p className="text-sm font-semibold text-red-500">A+</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={`w-full h-16 ${
          isDarkMode ? 'fill-gray-900' : 'fill-white'
        }`}>
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;