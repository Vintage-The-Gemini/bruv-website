// FILE PATH: src/pages/Solutions.jsx - Consistent Color Palette

import React from 'react';
import { CheckCircle, Download, Play, ArrowRight, BarChart3, Users, Shield, Zap } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Solutions = () => {
  const { isDarkMode } = useTheme();

  const products = [
    {
      id: 'project-management',
      title: "Project Management Software",
      subtitle: "Plan. Track. Succeed.",
      description: "Our project management software is built to simplify the complex and empower your teams to work smarter, not harder. With powerful features like task assignment, timeline tracking, Gantt charts, and real-time collaboration, you can monitor every aspect of your projects in one central dashboard.",
      icon: "📊",
      features: [
        "Advanced task management and assignment",
        "Interactive Gantt charts and timelines", 
        "Real-time team collaboration tools",
        "Progress tracking and reporting",
        "Budget and resource management",
        "Custom workflows and automation",
        "Integration with popular tools",
        "Mobile apps for iOS and Android"
      ],
      benefits: [
        { icon: BarChart3, text: "Increase project success rate by 40%" },
        { icon: Users, text: "Improve team collaboration" },
        { icon: Zap, text: "Reduce project delivery time by 30%" },
        { icon: Shield, text: "Enhanced project visibility" }
      ],
      screenshot: "🖥️"
    },
    {
      id: 'audit-management', 
      title: "Internal Audit Management Software",
      subtitle: "Audit Smarter, Not Harder.",
      description: "Take control of your audit processes with our powerful Internal Audit Management Software. Designed for speed, structure, and security, it enables audit teams to plan, execute, and report with efficiency and consistency. Use built-in templates, automated scheduling, and real-time dashboards to gain full visibility.",
      icon: "🛡",
      features: [
        "Comprehensive audit planning tools",
        "Automated finding tracking system", 
        "Professional report generation",
        "Real-time compliance monitoring",
        "Risk-based audit scheduling",
        "Collaborative review workflows",
        "Advanced analytics and insights",
        "Regulatory compliance templates"
      ],
      benefits: [
        { icon: Shield, text: "Ensure 100% audit compliance" },
        { icon: BarChart3, text: "Reduce audit cycle time by 50%" },
        { icon: Users, text: "Streamline team coordination" },
        { icon: Zap, text: "Automated report generation" }
      ],
      screenshot: "📋"
    },
    {
      id: 'risk-compliance',
      title: "Risk & Compliance Management Software", 
      subtitle: "Stay Ahead of Risk. Stay Ahead of the Game.",
      description: "In an environment where regulations evolve constantly and risks emerge daily, you need more than spreadsheets to stay compliant—you need intelligence. Our Risk & Compliance Management Software helps you proactively identify, assess, and respond to risk across the enterprise.",
      icon: "⚙",
      features: [
        "Proactive risk assessment tools",
        "Automated compliance controls", 
        "Dynamic dashboards and reports",
        "Real-time regulatory updates",
        "Risk heat maps and visualization",
        "Incident management system",
        "Policy management framework",
        "Third-party risk monitoring"
      ],
      benefits: [
        { icon: Shield, text: "Reduce compliance risks by 85%" },
        { icon: BarChart3, text: "Real-time risk visibility" },
        { icon: Zap, text: "Automated compliance tracking" },
        { icon: Users, text: "Enterprise-wide risk alignment" }
      ],
      screenshot: "⚡"
    }
  ];

  const comparisonFeatures = [
    "Task Management",
    "Real-time Collaboration", 
    "Custom Reporting",
    "Mobile Access",
    "API Integration",
    "Advanced Analytics",
    "Compliance Tracking",
    "24/7 Support"
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Hero Section */}
      <section className={`pt-24 pb-16 ${
        isDarkMode ? 'bg-gray-800' : ''
      }`} style={{backgroundColor: isDarkMode ? '' : '#2D1B69'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-white'
            }`}>
              Smart Tools for <span className="text-red-500">Smarter Teams</span>
            </h1>
            <p className={`text-xl max-w-3xl mx-auto mb-8 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-300'
            }`}>
              Our software solutions are built to simplify the complex and empower your teams 
              to work smarter, not harder. Choose the right solution for your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-red-500 hover:bg-red-600 text-white font-medium px-8 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </button>
              <button className={`border-2 font-medium px-8 py-3 rounded-lg transition-all duration-200 inline-flex items-center ${
                isDarkMode 
                  ? 'border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-700' 
                  : 'border-white/20 hover:border-white/40 hover:bg-white/10 text-white'
              }`}>
                <Download className="mr-2 w-5 h-5" />
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Detail Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {products.map((product, index) => (
              <div 
                key={product.id} 
                id={product.id}
                className={`grid lg:grid-cols-2 gap-16 items-center scroll-mt-24 ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="text-6xl mb-6">{product.icon}</div>
                  <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${
                    isDarkMode ? 'text-white' : ''
                  }`} style={{color: isDarkMode ? 'white' : '#2D1B69'}}>
                    {product.title}
                  </h2>
                  <p className="text-red-500 font-medium text-lg mb-6">{product.subtitle}</p>
                  <p className={`text-lg mb-8 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="grid md:grid-cols-2 gap-3 mb-8">
                    {product.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className={`text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-red-500 hover:bg-red-600 text-white font-medium px-8 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center">
                      Start Free Trial
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                    <button className={`border-2 font-medium px-8 py-3 rounded-lg transition-all duration-200 ${
                      isDarkMode 
                        ? 'border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-700' 
                        : 'border-purple-900 text-purple-900 hover:bg-purple-900 hover:text-white'
                    }`}>
                      Request Demo
                    </button>
                  </div>
                </div>

                {/* Benefits & Screenshot */}
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className={`rounded-xl p-8 mb-8 ${
                    isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-100'
                  } border shadow-lg`}>
                    <h3 className={`text-xl font-semibold mb-6 ${
                      isDarkMode ? 'text-white' : ''
                    }`} style={{color: isDarkMode ? 'white' : '#2D1B69'}}>
                      Key Benefits
                    </h3>
                    <div className="space-y-4">
                      {product.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center">
                          <div className={`w-10 h-10 ${
                            isDarkMode ? 'bg-gray-700' : 'bg-white'
                          } rounded-lg flex items-center justify-center mr-4`}>
                            <benefit.icon className="w-5 h-5 text-red-500" />
                          </div>
                          <span className={`font-medium ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            {benefit.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Screenshot Placeholder */}
                  <div className={`rounded-xl p-16 text-center ${
                    isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'
                  } border-2 border-dashed`}>
                    <div className="text-6xl mb-4">{product.screenshot}</div>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Product Screenshot
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : ''
            }`} style={{color: isDarkMode ? 'white' : '#2D1B69'}}>
              Compare Our Solutions
            </h2>
            <p className={`text-lg max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Choose the right solution for your organization's needs.
            </p>
          </div>

          <div className={`rounded-xl overflow-hidden ${
            isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
          } border shadow-lg`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}>
                  <tr>
                    <th className={`px-6 py-4 text-left font-semibold ${
                      isDarkMode ? 'text-white' : ''
                    }`} style={{color: isDarkMode ? 'white' : '#2D1B69'}}>
                      Features
                    </th>
                    {products.map(product => (
                      <th key={product.id} className={`px-6 py-4 text-center font-semibold ${
                        isDarkMode ? 'text-white' : ''
                      }`} style={{color: isDarkMode ? 'white' : '#2D1B69'}}>
                        {product.title.split(' ')[0]} {product.title.split(' ')[1]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, index) => (
                    <tr key={feature} className={index % 2 === 0 ? (isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50/50') : ''}>
                      <td className={`px-6 py-4 font-medium ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {feature}
                      </td>
                      {products.map(product => (
                        <td key={product.id} className="px-6 py-4 text-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : ''
          }`} style={{color: isDarkMode ? 'white' : '#2D1B69'}}>
            Ready to Transform Your Operations?
          </h2>
          <p className={`text-lg mb-8 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Start your free trial today and see how our solutions can help your organization 
            achieve unprecedented levels of operational control.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-red-500 hover:bg-red-600 text-white font-medium px-8 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
              Start Free Trial
            </button>
            <button className={`border-2 font-medium px-8 py-3 rounded-lg transition-all duration-200 ${
              isDarkMode 
                ? 'border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-700' 
                : 'border-purple-900 text-purple-900 hover:bg-purple-900 hover:text-white'
            }`}>
              Schedule Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Solutions;