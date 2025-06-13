// FILE PATH: src/pages/About.jsx - Enhanced Design

import React from 'react';
import { CheckCircle, Users, Award, Globe, Zap, Target, TrendingUp, Shield, Heart, Lightbulb, Star, ArrowRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const About = () => {
  const { isDarkMode } = useTheme();

  const stats = [
    { icon: Users, number: "500+", label: "Happy Clients", color: "text-blue-500" },
    { icon: Award, number: "98%", label: "Success Rate", color: "text-green-500" },
    { icon: Globe, number: "50+", label: "Countries Served", color: "text-purple-500" },
    { icon: Zap, number: "24/7", label: "Support Available", color: "text-red-500" }
  ];

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
      color: "bg-green-500"
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "We continuously evolve our technology and methodologies to stay ahead of industry trends.",
      color: "bg-purple-500"
    },
    {
      icon: Heart,
      title: "Partnership",
      description: "We work closely with our clients as trusted partners in their journey toward operational excellence.",
      color: "bg-red-500"
    }
  ];

  const timeline = [
    {
      year: "2019",
      title: "Company Founded",
      description: "Bruv was established with a vision to revolutionize organizational control systems."
    },
    {
      year: "2020",
      title: "First Major Client",
      description: "Secured our first enterprise client and delivered our inaugural project management solution."
    },
    {
      year: "2021",
      title: "Product Suite Launch",
      description: "Launched our comprehensive suite of audit, risk, and compliance management tools."
    },
    {
      year: "2022",
      title: "International Expansion",
      description: "Expanded operations across multiple countries, serving clients across different continents."
    },
    {
      year: "2023",
      title: "Technology Innovation",
      description: "Introduced AI-powered analytics and advanced automation features to our platform."
    },
    {
      year: "2024",
      title: "Market Leadership",
      description: "Recognized as a leading provider of organizational control solutions globally."
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Chief Executive Officer",
      description: "15+ years in enterprise software and organizational management.",
      avatar: "👩‍💼"
    },
    {
      name: "Michael Chen",
      role: "Chief Technology Officer", 
      description: "Expert in scalable systems architecture and security frameworks.",
      avatar: "👨‍💻"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Product",
      description: "Specialized in user experience and product strategy for enterprise solutions.",
      avatar: "👩‍🎨"
    },
    {
      name: "David Thompson",
      role: "Head of Operations",
      description: "Operational excellence expert with deep audit and compliance background.",
      avatar: "👨‍📊"
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Hero Section */}
      <section className={`pt-24 pb-16 relative overflow-hidden ${
        isDarkMode ? 'bg-gray-800' : ''
      }`} style={{backgroundColor: isDarkMode ? '' : '#2D1B69'}}>
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-red-500/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-xl animate-bounce"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-500/10 rounded-full blur-lg animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-red-500/10 rounded-full mb-6">
              <Star className="w-5 h-5 text-red-500 mr-2" />
              <span className={`text-sm font-medium ${isDarkMode ? 'text-red-400' : 'text-red-300'}`}>
                About Bruv
              </span>
            </div>
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-white'
            }`}>
              Precision for Your <span className="text-red-500">Vision</span>
            </h1>
            <p className={`text-xl max-w-4xl mx-auto leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-300'
            }`}>
              We're inspired by bravery and confidence — under control. Our mission is to empower 
              organizations with innovative solutions that enable precise control, transparent operations, 
              and confident decision-making in an increasingly complex business environment.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`text-center p-8 rounded-2xl ${
                  isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-100'
                } border hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group`}
              >
                <div className={`w-16 h-16 mx-auto mb-4 ${
                  isDarkMode ? 'bg-gray-700' : 'bg-white'
                } rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className={`text-3xl font-bold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {stat.number}
                </div>
                <div className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 rounded-full mb-6">
                <Lightbulb className="w-5 h-5 text-blue-500 mr-2" />
                <span className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-300'}`}>
                  Our Story
                </span>
              </div>
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : ''
              }`} style={{color: isDarkMode ? 'white' : '#2D1B69'}}>
                Born from Vision, Driven by <span className="text-red-500">Purpose</span>
              </h2>
              <p className={`text-lg mb-6 leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Bruv was born from the recognition that modern organizations needed more than just 
                software tools — they needed a comprehensive approach to operational control that 
                combines cutting-edge technology with deep domain expertise.
              </p>
              <p className={`text-lg mb-8 leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                We are committed to empowering organizations with the tools and expertise they need 
                to maintain effective operational control, drive successful outcomes, and achieve 
                unprecedented levels of visibility in their operations.
              </p>
              <button className="bg-red-500 hover:bg-red-600 text-white font-medium px-8 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center group">
                Learn More About Us
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>

            {/* Timeline */}
            <div className={`p-8 rounded-2xl ${
              isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'
            } border shadow-xl`}>
              <h3 className={`text-xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Our Journey
              </h3>
              <div className="space-y-6">
                {timeline.slice(0, 4).map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0">
                      {item.year.slice(-2)}
                    </div>
                    <div>
                      <h4 className={`font-semibold mb-1 ${
                        isDarkMode ? 'text-white' : ''
                      }`} style={{color: isDarkMode ? 'white' : '#2D1B69'}}>
                        {item.title}
                      </h4>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-purple-500/10 rounded-full mb-6">
              <Heart className="w-5 h-5 text-purple-500 mr-2" />
              <span className={`text-sm font-medium ${isDarkMode ? 'text-purple-400' : 'text-purple-300'}`}>
                Our Values
              </span>
            </div>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : ''
            }`} style={{color: isDarkMode ? 'white' : '#2D1B69'}}>
              What Drives Us <span className="text-red-500">Forward</span>
            </h2>
              What Drives Us <span className="text-red-500">Forward</span>
            </h2>
            <p className={`text-lg max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              These core principles guide everything we do and every solution we create.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className={`text-center p-8 rounded-2xl ${
                  isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-100'
                } border hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group`}
              >
                <div className={`w-16 h-16 mx-auto mb-6 ${value.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${
                  isDarkMode ? 'text-white' : ''
                }`} style={{color: isDarkMode ? 'white' : '#2D1B69'}}>
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

      {/* Mission & Vision Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className={`p-10 rounded-2xl ${
              isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'
            } border shadow-xl hover:shadow-2xl transition-all duration-300`}>
              <div className="w-16 h-16 mb-6 bg-red-500 rounded-2xl flex items-center justify-center">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : ''
              }`} style={{color: isDarkMode ? 'white' : '#2D1B69'}}>
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

            <div className={`p-10 rounded-2xl ${
              isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'
            } border shadow-xl hover:shadow-2xl transition-all duration-300`}>
              <div className="w-16 h-16 mb-6 bg-purple-500 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : ''
              }`} style={{color: isDarkMode ? 'white' : '#2D1B69'}}>
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

      {/* Team Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-green-500/10 rounded-full mb-6">
              <Users className="w-5 h-5 text-green-500 mr-2" />
              <span className={`text-sm font-medium ${isDarkMode ? 'text-green-400' : 'text-green-300'}`}>
                Our Team
              </span>
            </div>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : ''
            }`} style={{color: isDarkMode ? 'white' : '#2D1B69'}}>
              Meet the <span className="text-red-500">Experts</span>
            </h2>
            <p className={`text-lg max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Our diverse team of experts brings together decades of experience in technology, 
              business operations, and organizational management.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div 
                key={index}
                className={`text-center p-8 rounded-2xl ${
                  isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-100'
                } border hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group`}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {member.avatar}
                </div>
                <h3 className={`text-lg font-bold mb-1 ${
                  isDarkMode ? 'text-white' : ''
                }`} style={{color: isDarkMode ? 'white' : '#2D1B69'}}>
                  {member.name}
                </h3>
                <p className="text-red-500 font-medium text-sm mb-3">{member.role}</p>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : ''
          }`} style={{color: isDarkMode ? 'white' : '#2D1B69'}}>
            Ready to Partner with <span className="text-red-500">Us?</span>
          </h2>
          <p className={`text-lg mb-8 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Let's discuss how Bruv can help strengthen your organizational controls 
            and drive successful outcomes for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-red-500 hover:bg-red-600 text-white font-medium px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center group">
              Contact Us Today
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button className={`border-2 font-medium px-8 py-4 rounded-lg transition-all duration-200 ${
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