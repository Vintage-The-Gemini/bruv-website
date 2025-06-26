// FILE PATH: src/components/sections/Hero.jsx (Modern Design)

import React from "react";
import {
  ArrowRight,
  CheckCircle,
  Shield,
  BarChart3,
  Users,
} from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

const Hero = () => {
  const { isDarkMode } = useTheme();

  return (
    <>
      {/* Main Hero Section */}
      <section
        id="home"
        className={`relative pt-32 pb-20 overflow-hidden ${
          isDarkMode
            ? "bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
            : "bg-navy-gradient"
        }`}
      >
        {/* Geometric Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-72 h-72 bg-red-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/2 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left mb-16 lg:mb-0">
              {/* <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white text-sm font-medium mb-8">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Precision for your vision
              </div> */}

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
                Automate Your
                <br />
                <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                  Control Functions
                </span>
                <br />
                <span className="text-2xl md:text-3xl lg:text-4xl text-gray-300 font-normal">
                  with Confidence
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-12 max-w-2xl mx-auto lg:mx-0">
                Empowering project managers, internal auditors, and compliance
                heads with intelligent solutions that strengthen organizational
                controls.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-10 py-4 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 inline-flex items-center justify-center group">
                  Get Started Free
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>

                <button className="border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 font-semibold px-10 py-4 rounded-xl transition-all duration-300 backdrop-blur-sm">
                  Book a Demo
                </button>
              </div>
            </div>

            {/* Right Content - Dashboard Preview */}
            <div className="relative">
              <div
                className={`${
                  isDarkMode ? "bg-gray-800/90" : "bg-white/95"
                } backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-lg mx-auto border border-white/20`}
              >
                {/* Dashboard Header */}
                <div className="mb-8">
                  <h3
                    className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}
                  >
                    Our value proposition:
                  </h3>
                  <p
                    className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-2`}
                  >
                    Giving realtime analytics to you and your team members
                  </p>
                </div>

                {/* Simple Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div
                    className={`${isDarkMode ? "bg-gray-700/50" : "bg-gray-50"} rounded-xl p-4 text-center backdrop-blur-sm`}
                  >
                    <p
                      className="text-3xl font-bold mb-1"
                      style={{ color: "#2D1B69" }}
                    >
                      24
                    </p>
                    <p
                      className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                    >
                      Active Projects
                    </p>
                  </div>
                  <div
                    className={`${isDarkMode ? "bg-gray-700/50" : "bg-gray-50"} rounded-xl p-4 text-center backdrop-blur-sm`}
                  >
                    <p className="text-3xl font-bold text-green-500 mb-1">
                      98%
                    </p>
                    <p
                      className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                    >
                      Compliance
                    </p>
                  </div>
                </div>

                {/* Progress Bars */}
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-3">
                      <span
                        className={
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }
                      >
                        Increase team productivity to over 90%{" "}
                      </span>
                      <span
                        className={
                          isDarkMode ? "text-gray-300" : "text-gray-800"
                        }
                      >
                        94%
                      </span>
                    </div>
                    <div
                      className={`w-full ${isDarkMode ? "bg-gray-600" : "bg-gray-200"} rounded-full h-3`}
                    >
                      <div
                        className="bg-green-500 h-3 rounded-full transition-all duration-1000 shadow-lg"
                        style={{ width: "94%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-3">
                      <span
                        className={
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }
                      >
                        Work within 10% variance of the project budget{" "}
                      </span>
                      <span
                        className={
                          isDarkMode ? "text-gray-300" : "text-gray-800"
                        }
                      >
                        90%
                      </span>
                    </div>
                    <div
                      className={`w-full ${isDarkMode ? "bg-gray-600" : "bg-gray-200"} rounded-full h-3`}
                    >
                      <div
                        className="bg-green-500 h-3 rounded-full transition-all duration-1000 shadow-lg"
                        style={{ width: "90%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-3">
                      <span
                        className={
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }
                      >
                        Achieve upto 92% on-time delivery
                      </span>
                      <span
                        className={
                          isDarkMode ? "text-gray-300" : "text-gray-800"
                        }
                      >
                        92%
                      </span>
                    </div>
                    <div
                      className={`w-full ${isDarkMode ? "bg-gray-600" : "bg-gray-200"} rounded-full h-3`}
                    >
                      <div
                        className="bg-green-500 h-3 rounded-full transition-all duration-1000 shadow-lg"
                        style={{ width: "92%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating indicator */}
              <div
                className={`absolute -top-4 -right-4 ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                } rounded-xl shadow-lg p-3 border border-white/20 backdrop-blur-sm animate-pulse hidden sm:block`}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className={`w-full h-20 ${
              isDarkMode ? "fill-gray-900" : "fill-white"
            }`}
          >
            <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Trust Section */}
      <section className={`py-16 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p
              className={`text-sm font-medium mb-8 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              In partnership with:
            </p>
            <div className="flex items-center justify-center space-x-12 lg:space-x-16 flex-wrap gap-8">
              <div
                className={`text-2xl lg:text-3xl font-bold ${isDarkMode ? "text-gray-300" : "text-gray-700"} hover:text-red-500 transition-colors duration-300 cursor-pointer`}
              >
                Microsoft
              </div>
              <div
                className={`text-2xl lg:text-3xl font-bold ${isDarkMode ? "text-gray-300" : "text-gray-700"} hover:text-red-500 transition-colors duration-300 cursor-pointer`}
              >
                Google
              </div>
              <div
                className={`text-2xl lg:text-3xl font-bold ${isDarkMode ? "text-gray-300" : "text-gray-700"} hover:text-red-500 transition-colors duration-300 cursor-pointer`}
              >
                Amazon
              </div>
              <div
                className={`text-2xl lg:text-3xl font-bold ${isDarkMode ? "text-gray-300" : "text-gray-700"} hover:text-red-500 transition-colors duration-300 cursor-pointer`}
              >
                IBM
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
