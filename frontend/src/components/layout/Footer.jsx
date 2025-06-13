// FILE PATH: src/components/layout/Footer.jsx (Logo Only - Larger Size)

import React from 'react';
import { Twitter, Linkedin, Facebook } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
// Import your logo
import bruvLogo from '../../assets/images/bruv-01.png';

const Footer = () => {
  const { isDarkMode } = useTheme();

  const footerSections = [
    {
      title: "Solutions",
      links: [
        { name: "Project Management", href: "#" },
        { name: "Audit Tracking", href: "#" },
        { name: "Risk & Compliance", href: "#" },
        { name: "Quality Assurance", href: "#" }
      ]
    },
    {
      title: "Services",
      links: [
        { name: "IS Audit", href: "#" },
        { name: "Tech Project Management", href: "#" },
        { name: "Risk Advisory", href: "#" },
        { name: "Escrow Services", href: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Contact", href: "#" }
      ]
    }
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Facebook, href: "#", label: "Facebook" }
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" }
  ];

  return (
    <footer 
      className={`py-16 ${
        isDarkMode ? 'bg-black' : ''
      }`} 
      style={{backgroundColor: isDarkMode ? 'black' : '#2D1B69'}}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section with Logo Only */}
          <div>
            {/* Logo Only - Larger Size */}
            <div className="mb-6">
              <div className="flex items-center justify-start">
                <img 
                  src={bruvLogo} 
                  alt="Bruv Logo" 
                  className="object-contain filter brightness-0 invert transition-all duration-300 hover:scale-105"
                  style={{width: '100px', height: '100px', minWidth: '100px', minHeight: '100px'}}
                />
              </div>
            </div>
            
            <p className={`mb-6 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-300'
            }`}>
              Precision for your vision. Empowering organizations with confidence through 
              comprehensive control solutions.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                    isDarkMode 
                      ? 'bg-gray-800 hover:bg-gray-700' 
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.href} 
                      className={`transition-colors duration-200 ${
                        isDarkMode 
                          ? 'text-gray-400 hover:text-white' 
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {link.name}
                    </a>
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
              {legalLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  className={`text-sm transition-colors duration-200 ${
                    isDarkMode 
                      ? 'text-gray-400 hover:text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;