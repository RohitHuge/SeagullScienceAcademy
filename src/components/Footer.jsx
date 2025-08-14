import React from 'react';
import { PhoneIcon, GlobeAltIcon, MapPinIcon } from '@heroicons/react/24/outline';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { name: 'About', href: '/about' },
    { name: 'Courses', href: '/courses' },
    { name: 'Mentors', href: '/mentors' },
    { name: 'Achievements', href: '/achievements' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' }
  ];

  return (
    <footer className="bg-jet text-white">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Address */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <MapPinIcon className="w-6 h-6 text-african_violet flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-display font-semibold text-lg mb-2">Address</h3>
                <p className="text-white/80 leading-relaxed">
                  2nd floor, Arham Plaza, Near PNG Jewellers, Gavhanewasti, Bhosari
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg mb-2">Contact</h3>
            <div className="space-y-3">
              <a
                href="tel:+919096705353"
                className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors duration-200 group"
                aria-label="Call +91 9096705353"
              >
                <PhoneIcon className="w-5 h-5 text-african_violet group-hover:scale-110 transition-transform duration-200" />
                <span>+91 9096705353</span>
              </a>
              <a
                href="tel:+919284635306"
                className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors duration-200 group"
                aria-label="Call +91 9284635306"
              >
                <PhoneIcon className="w-5 h-5 text-african_violet group-hover:scale-110 transition-transform duration-200" />
                <span>+91 9284635306</span>
              </a>
            </div>
          </div>

          {/* Website */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-lg mb-2">Website</h3>
            <a
              href="https://www.seagullacademy.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors duration-200 group"
              aria-label="Visit Seagull Academy website"
            >
              <GlobeAltIcon className="w-5 h-5 text-african_violet group-hover:scale-110 transition-transform duration-200" />
              <span>www.seagullacademy.in</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-white/80 text-sm">
              © {currentYear} Seagull Academy. All rights reserved.
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center md:justify-end space-x-6">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white/60 hover:text-white transition-opacity duration-200 text-sm"
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
