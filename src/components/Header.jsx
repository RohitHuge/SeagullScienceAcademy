import React, { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Courses', href: '/courses' },
    { name: 'Mentors', href: '/mentors' },
    { name: 'Achievements', href: '/achievements' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <>
      {/* Skip to content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-grape text-white px-4 py-2 rounded-md z-50 focus:ring-2 focus:ring-african_violet"
      >
        Skip to content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ease-out ${
          isScrolled ? 'bg-grape/95 backdrop-blur-sm shadow-lg' : 'bg-grape'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a
                href="/"
                className="text-white font-display font-bold text-xl hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-african_violet rounded"
              >
                Seagull Science Academy
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <div className="ml-6 flex items-baseline space-x-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-white/90 hover:text-white px-2 py-2 text-base font-semibold relative group transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-african_violet rounded"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-200 ease-out group-hover:w-full"></span>
                  </a>
                ))}
              </div>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <a
                href="/courses"
                className="bg-white text-grape hover:bg-gray-100 focus:ring-2 focus:ring-african_violet px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-out transform hover:scale-105 active:scale-95"
              >
                Apply Now
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:bg-white/10 p-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-african_violet"
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-out overflow-hidden ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-eminence">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-african_violet"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4">
              <a
                href="/courses"
                className="bg-white text-grape hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-african_violet"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Browse Courses
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-16"></div>
    </>
  );
};

export default Header;
