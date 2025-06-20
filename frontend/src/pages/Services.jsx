// FILE PATH: src/pages/Services.jsx - Fixed with Link Import

import React from 'react';
import { Link } from 'react-router-dom'; // Added missing import
import { BarChart3, Shield, CheckCircle, Target, ArrowRight, Clock, DollarSign, Users, TrendingUp } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Services = () => {
  const { isDarkMode } = useTheme();

  const services = [
    {
      id: 'project-management',
      icon: BarChart3,
      title: "Project Management Services",
      subtitle: "Strategic Solutions. Tangible Results.",
      description: "From concept to completion, we bring structure, clarity, and control to your projects. Our project management services cover planning, execution, monitoring, and closure, ensuring every phase aligns with your strategic goals.",
      features: [
        "Agile & Waterfall methodologies",
        "Risk mitigation strategies", 
        "Stakeholder engagement",
        "Budget and timeline control",
        "Quality assurance integration",
        "Change management"
      ],
      benefits: [
        { icon: Clock, text: "Reduce project delivery time by 30%" },
        { icon: DollarSign, text: "Stay within budget with 95% accuracy" },
        { icon: Users, text: "Improve team collaboration" },
        { icon: TrendingUp, text: "Increase project success rate" }
      ]
    },
    {
      id: 'is-audit',
      icon: Shield,
      title: "Information Systems Audit",
      subtitle: "Comprehensive IT Evaluation.",
      description: "Technology drives business, but only if it's secure, efficient, and compliant. Our Information System (IS) Audit service evaluates your IT systems against industry standards and regulatory requirements.",
      features: [
        "Infrastructure security assessment",
        "Data management evaluation", 
        "Access controls review",
        "Disaster recovery testing",
        "Compliance verification",
        "Performance optimization"
      ],
      benefits: [
        { icon: Shield, text: "Identify security vulnerabilities" },
        { icon: CheckCircle, text: "Ensure regulatory compliance" },
        { icon: TrendingUp, text: "Improve system efficiency" },
        { icon: Target, text: "Reduce operational risks" }
      ]
    },
    {
      id: 'qa-services',
      icon: CheckCircle,
      title: "Quality Assurance Services",
      subtitle: "Excellence in Every Detail.",
      description: "We believe that quality isn't just a checkbox—it's the foundation of user trust and business success. Our quality assurance (QA) services ensure that your software, systems, and processes meet the highest standards.",
      features: [
        "Manual testing strategies",
        "Automated testing frameworks", 
        "Performance testing",
        "Security testing",
        "User acceptance testing",
        "Continuous integration"
      ],
      benefits: [
        { icon: CheckCircle, text: "Reduce post-release defects by 85%" },
        { icon: Clock, text: "Faster time-to-market" },
        { icon: Users, text: "Improved user satisfaction" },
        { icon: DollarSign, text: "Lower maintenance costs" }
      ]
    },
    {
      id: 'risk-advisory',
      icon: Target,
      title: "Risk & Compliance Advisory",
      subtitle: "Stay Ahead of Regulations.",
      description: "Today's regulatory landscape is complex, fast-changing, and unforgiving. Our Risk and Compliance services help you stay one step ahead by building robust frameworks that align with legal and industry standards.",
      features: [
        "Risk assessment frameworks",
        "Compliance program development", 
        "Policy creation and review",
        "Training and awareness programs",
        "Audit preparation support",
        "Regulatory change management"
      ],
      benefits: [
        { icon: Shield, text: "Avoid regulatory penalties" },
        { icon: Target, text: "Proactive risk management" },
        { icon: TrendingUp, text: "Competitive advantage" },
        { icon: CheckCircle, text: "Streamlined operations" }
      ]
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discovery & Assessment",
      description: "We begin by understanding your current processes, challenges, and objectives through comprehensive analysis."
    },
    {
      step: "02", 
      title: "Strategy Development",
      description: "Our experts develop a customized strategy tailored to your specific needs and industry requirements."
    },
    {
      step: "03",
      title: "Execution", 
      description: "We execute the strategy with precision, ensuring minimal disruption to your ongoing operations."
    },
    {
      step: "04",
      title: "Continous reporting",
      description: "Continuous monitoring and optimization ensure sustained success and continuous improvement."
    }
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
              Our <span className="text-red-500">Services</span>
            </h1>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-300'
            }`}>
              Comprehensive solutions that strengthen your organizational controls and drive successful outcomes. 
              We handle the heavy lifting so you can focus your expertise where it matters most.
            </p>
          </div>
        </div>
      </section>

      {/* Services Detail Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div 
                key={index} 
                id={service.id}
                className={`grid lg:grid-cols-2 gap-16 items-center scroll-mt-24 ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className={`w-16 h-16 ${
                    isDarkMode ? 'bg-red-900/20' : 'bg-red-100'
                  } rounded-xl flex items-center justify-center mb-6`}>
                    <service.icon className="w-8 h-8 text-red-500" />
                  </div>
                  <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${
                    isDarkMode ? 'text-white' : ''
                  }`} style={{color: isDarkMode ? 'white' : '#2D1B69'}}>
                    {service.title}
                  </h2>
                  <p className="text-red-500 font-medium text-lg mb-6">{service.subtitle}</p>
                  <p className={`text-lg mb-8 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="grid md:grid-cols-2 gap-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
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

                  <Link 
                    to="/contact"
                    className="bg-red-500 hover:bg-red-600 text-white font-medium px-8 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center"
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </div>

                {/* Benefits Card */}
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className={`rounded-xl p-8 ${
                    isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-100'
                  } border shadow-lg`}>
                    <h3 className={`text-xl font-semibold mb-6 ${
                      isDarkMode ? 'text-white' : ''
                    }`} style={{color: isDarkMode ? 'white' : '#2D1B69'}}>
                      Key Benefits
                    </h3>
                    <div className="space-y-4">
                      {service.benefits.map((benefit, benefitIndex) => (
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : ''
            }`} style={{color: isDarkMode ? 'white' : '#2D1B69'}}>
              Our Process
            </h2>
            <p className={`text-lg max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              A proven methodology that ensures successful outcomes for every engagement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto">
                    {step.step}
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className={`hidden lg:block absolute top-10 left-full w-full h-0.5 ${
                      isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                    } -translate-x-10`}></div>
                  )}
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${
                  isDarkMode ? 'text-white' : ''
                }`} style={{color: isDarkMode ? 'white' : '#2D1B69'}}>
                  {step.title}
                </h3>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : ''
          }`} style={{color: isDarkMode ? 'white' : '#2D1B69'}}>
            Ready to Get Started?
          </h2>
          <p className={`text-lg mb-8 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Contact us today to discuss how our services can help strengthen your organizational 
            controls and drive successful outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact"
              className="bg-red-500 hover:bg-red-600 text-white font-medium px-8 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Schedule Consultation
            </Link>
            <button className={`border-2 font-medium px-8 py-3 rounded-lg transition-all duration-200 ${
              isDarkMode 
                ? 'border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-700' 
                : 'border-purple-900 text-purple-900 hover:bg-purple-900 hover:text-white'
            }`}>
              View Case Studies
            </button>
          </div>
      </div>
      </section>
    </div>
  );
};

export default Services;