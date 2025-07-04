// FILE PATH: src/components/layout/Footer.jsx (Fixed - Removed Dead Links)

import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
// Import your logo
import bruvLogo from '../../assets/images/bruv-01.png';

const Footer = () => {
  const { isDarkMode } = useTheme();

  const footerSections = [
    {
      title: "Solutions",
      links: [
        { name: "Project Management Software", to: "/solutions", hash: "project-management" },
        { name: "Audit Management Software", to: "/solutions", hash: "audit-management" },
        { name: "Risk & Compliance Software", to: "/solutions", hash: "risk-compliance" }
      ]
    },
    {
      title: "Services",
      links: [
        { name: "Project Management Services", to: "/services", hash: "project-management" },
        { name: "Information Systems Audit", to: "/services", hash: "is-audit" },
        { name: "Quality Assurance Services", to: "/services", hash: "qa-services" },
        { name: "Risk & Compliance Advisory", to: "/services", hash: "risk-advisory" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", to: "/about" },
        { name: "Contact", to: "/contact" }
      ]
    }
  ];

  const contactInfo = [
    { icon: Mail, text: "hello@bruv.co.ke", href: "mailto:hello@bruv.co.ke" },
    { icon: Phone, text: "+254 701 234 567", href: "tel:+254701234567" },
    { icon: MapPin, text: "Jumuia Place, Kilimani, Nairobi", href: "#" }
  ];

  const handleLinkClick = (to, hash) => {
    if (hash) {
      // Navigate to page first, then scroll to section after a delay
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 300);
    }
  };

  return (
    <footer 
      className={`py-16 ${
        isDarkMode ? 'bg-black' : ''
      }`} 
      style={{backgroundColor: isDarkMode ? 'black' : '#2D1B69'}}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section with Logo and Contact */}
          <div>
            {/* Logo */}
            <div className="mb-6">
              <Link to="/" className="flex items-center justify-start">
                <img 
                  src={bruvLogo} 
                  alt="Bruv Logo" 
                  className="object-contain filter brightness-0 invert transition-all duration-300 hover:scale-105"
                  style={{width: '100px', height: '100px', minWidth: '100px', minHeight: '100px'}}
                />
              </Link>
            </div>
            
            <p className={`mb-6 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-300'
            }`}>
              Precision for your vision. Empowering organizations with confidence through 
              comprehensive control solutions.
            </p>

            {/* Contact Information */}
            <div className="space-y-3 mb-6">
              {contactInfo.map((contact, index) => (
                <div key={index} className="flex items-center">
                  <contact.icon className="w-4 h-4 text-red-500 mr-3 flex-shrink-0" />
                  {contact.href === "#" ? (
                    <span className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-300'
                    }`}>
                      {contact.text}
                    </span>
                  ) : (
                    <a 
                      href={contact.href}
                      className={`text-sm transition-colors duration-200 ${
                        isDarkMode 
                          ? 'text-gray-400 hover:text-white' 
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {contact.text}
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Social Links - Only include if you have actual social media accounts */}
            <div className="flex space-x-4">
              <a 
                href="mailto:hello@bruv.co.ke" 
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
                aria-label="Email"
              >
                <Mail className="w-4 h-4 text-white" />
              </a>
              {/* Only add social media links if you actually have accounts
              <a 
                href="#" 
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-white" />
              </a>
              */}
            </div>
          </div>
          
          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.to}
                      onClick={() => handleLinkClick(link.to, link.hash)}
                      className={`transition-colors duration-200 ${
                        isDarkMode 
                          ? 'text-gray-400 hover:text-white' 
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom Section */}
        <div className={`border-t pt-8 ${
          isDarkMode ? 'border-gray-800' : 'border-white/10'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-300'
            }`}>
              © 2025 Bruv. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link 
                to="/contact"
                className={`text-sm transition-colors duration-200 ${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Privacy Policy
              </Link>
              <Link 
                to="/contact"
                className={`text-sm transition-colors duration-200 ${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;