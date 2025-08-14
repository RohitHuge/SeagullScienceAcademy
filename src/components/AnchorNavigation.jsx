import React, { useEffect, useState } from 'react';

const AnchorNavigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(false);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'courses', 'why-seagull', 'mentors', 'achievements', 'contact'];
      const scrollPosition = window.scrollY + 200; // Offset for header

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }

      // Show navigation after scrolling down a bit
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const anchorLinks = [
    { name: 'Home', href: '#home', icon: '🏠' },
    { name: 'Courses', href: '#courses', icon: '📚' },
    { name: 'Why Seagull', href: '#why-seagull', icon: '⭐' },
    { name: 'Mentors', href: '#mentors', icon: '👨‍🏫' },
    { name: 'Achievements', href: '#achievements', icon: '🏆' },
    { name: 'Contact', href: '#contact', icon: '📞' },
  ];

  return (
    <>
      {/* Desktop Vertical Navigation */}
      <div className={`fixed right-6 top-1/2 transform -translate-y-1/2 z-40 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
      } hidden lg:block`}>
        <div className="bg-white rounded-full shadow-lg border border-gray-200 p-2">
          <ul className="flex flex-col gap-2">
            {anchorLinks.map(link => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={e => handleNavClick(e, link.href)}
                    className={`group relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                      isActive 
                        ? 'bg-grape text-white shadow-lg scale-110' 
                        : 'bg-gray-50 text-gray-600 hover:bg-african_violet hover:text-white hover:scale-105'
                    }`}
                    title={link.name}
                  >
                    <span className="text-lg">{link.icon}</span>
                    
                    {/* Tooltip */}
                    <div className="absolute right-full mr-3 px-3 py-1 bg-grape text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {link.name}
                      <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-grape border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                    </div>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute -right-1 -top-1 w-3 h-3 bg-gold rounded-full border-2 border-white"></div>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Mobile Horizontal Navigation */}
      <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } lg:hidden`}>
        <div className="bg-white rounded-full shadow-lg border border-gray-200 px-4 py-2">
          <ul className="flex gap-1">
            {anchorLinks.map(link => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={e => handleNavClick(e, link.href)}
                    className={`group relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                      isActive 
                        ? 'bg-grape text-white shadow-lg scale-110' 
                        : 'bg-gray-50 text-gray-600 hover:bg-african_violet hover:text-white hover:scale-105'
                    }`}
                    title={link.name}
                  >
                    <span className="text-sm">{link.icon}</span>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-gold rounded-full border border-white"></div>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default AnchorNavigation;
