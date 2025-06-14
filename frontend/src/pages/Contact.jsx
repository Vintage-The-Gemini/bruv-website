// FILE PATH: src/pages/Contact.jsx

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Contact = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    serviceInterest: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: '',
        serviceInterest: ''
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: ["hello@bruv.co.ke", "support@bruv.co.ke"],
      action: "Send us an email anytime"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+254 701 234 567", "+254 722 345 678"],
      action: "Available Mon-Fri, 8AM-6PM EAT"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["Jumia place, kilimani, Nairobi"],
      action: "Schedule an appointment"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Friday: 8:00 AM - 6:00 PM", "Saturday: 9:00 AM - 1:00 PM"],
      action: "East Africa Time (EAT)"
    }
  ];

  const serviceOptions = [
    "Project Management Services",
    "Information Systems Audit", 
    "Quality Assurance Services",
    "Risk & Compliance Advisory",
    "Project Management Software",
    "Internal Audit Management Software",
    "Risk & Compliance Management Software",
    "Other"
  ];

  // Single Kenyan office
  const office = {
    city: "Nairobi",
    address: "Jumuia place,Kilimani, Nairobi 00100",
    phone: "+254 701 234 567",
    email: "nairobi@bruv.co.ke",
    county: "Nairobi County",
    country: "Kenya"
  };

  if (isSubmitted) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className={`max-w-md mx-auto text-center p-8 rounded-xl ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } shadow-lg`}>
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h2 className={`text-2xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Asante Sana!
          </h2>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
            Your message has been sent successfully. We'll get back to you within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Hero Section */}
      <section className={`pt-24 pb-16 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Get in <span className="text-red-500">Touch</span>
            </h1>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Ready to transform your organization's operational control? We're here to help. 
              Contact us today to discuss your specific needs and learn how Bruv can make a difference.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div 
                key={index}
                className={`text-center p-6 rounded-xl ${
                  isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-100'
                } border hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                <div className={`w-16 h-16 mx-auto mb-4 ${
                  isDarkMode ? 'bg-red-900/20' : 'bg-red-100'
                } rounded-full flex items-center justify-center`}>
                  <info.icon className="w-8 h-8 text-red-500" />
                </div>
                <h3 className={`font-semibold mb-3 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {info.title}
                </h3>
                {info.details.map((detail, detailIndex) => (
                  <p key={detailIndex} className={`mb-1 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {detail}
                  </p>
                ))}
                <p className={`text-sm mt-2 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {info.action}
                </p>
              </div>
            ))}
          </div>

          {/* Main Contact Form and Info */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className={`rounded-xl p-8 ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
              } border shadow-lg`}>
                <h2 className={`text-2xl font-bold mb-6 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Send us a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        First Name *
                      </label>
                      <input 
                        type="text" 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg transition-colors duration-200 ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500/20' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-red-500 focus:ring-red-500/20'
                        } focus:ring-2 focus:outline-none`}
                        required
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Last Name *
                      </label>
                      <input 
                        type="text" 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg transition-colors duration-200 ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500/20' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-red-500 focus:ring-red-500/20'
                        } focus:ring-2 focus:outline-none`}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Email *
                      </label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg transition-colors duration-200 ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500/20' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-red-500 focus:ring-red-500/20'
                        } focus:ring-2 focus:outline-none`}
                        required
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Phone
                      </label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+254 7XX XXX XXX"
                        className={`w-full px-4 py-3 border rounded-lg transition-colors duration-200 ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500/20' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-red-500 focus:ring-red-500/20'
                        } focus:ring-2 focus:outline-none`}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Company
                      </label>
                      <input 
                        type="text" 
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg transition-colors duration-200 ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500/20' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-red-500 focus:ring-red-500/20'
                        } focus:ring-2 focus:outline-none`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Service Interest
                      </label>
                      <select 
                        name="serviceInterest"
                        value={formData.serviceInterest}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg transition-colors duration-200 ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-red-500 focus:ring-red-500/20' 
                            : 'bg-white border-gray-300 text-gray-900 focus:border-red-500 focus:ring-red-500/20'
                        } focus:ring-2 focus:outline-none`}
                      >
                        <option value="">Select a service...</option>
                        {serviceOptions.map((service, index) => (
                          <option key={index} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Subject *
                    </label>
                    <input 
                      type="text" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg transition-colors duration-200 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500/20' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-red-500 focus:ring-red-500/20'
                      } focus:ring-2 focus:outline-none`}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Message *
                    </label>
                    <textarea 
                      rows="6" 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg transition-colors duration-200 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500/20' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-red-500 focus:ring-red-500/20'
                      } focus:ring-2 focus:outline-none`}
                      required
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center justify-center"
                  >
                    <Send className="mr-2 w-5 h-5" />
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Office Location */}
            <div>
              <h2 className={`text-2xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Our Office
              </h2>
              
              <div className={`p-6 rounded-xl ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-100'
              } border mb-8`}>
                <h3 className={`font-semibold mb-3 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {office.city} Headquarters
                </h3>
                <div className={`space-y-2 text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <p>{office.address}</p>
                  <p>{office.county}, {office.country}</p>
                  <p>{office.phone}</p>
                  <p>{office.email}</p>
                </div>
              </div>

              {/* Quick Info Section */}
              <div className="mt-8">
                <h3 className={`text-lg font-semibold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Quick Information
                </h3>
                <div className={`p-4 rounded-lg ${
                  isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-100'
                } border`}>
                  <p className={`text-sm mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <strong>Response Time:</strong> We typically respond within 2-4 business hours.
                  </p>
                  <p className={`text-sm mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <strong>Languages:</strong> English, Kiswahili
                  </p>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <strong>Emergency Support:</strong> Call +254 701 234 567 for urgent issues.
                  </p>
                </div>
              </div>

              {/* Local Information */}
              <div className="mt-8">
                <h3 className={`text-lg font-semibold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Local Expertise
                </h3>
                <div className={`p-4 rounded-lg ${
                  isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-100'
                } border`}>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    We understand the Kenyan business environment and regulatory landscape. 
                    Our solutions are tailored to meet local compliance requirements while 
                    maintaining international standards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
