import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { useToast } from './ui/Toast';

const FloatingChatLauncher = () => {
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { showError } = useToast();

  // Hide on contact page and admin routes
  if (location.pathname === '/contact' || 
      location.pathname.startsWith('/admin') || 
      location.pathname.startsWith('/dashboard') ||
      location.pathname.startsWith('/api') ||
      location.pathname.startsWith('/private') ||
      location.pathname === '/login') {
    return null;
  }

  const handleClick = async () => {
    if (isNavigating) return;

    setIsNavigating(true);
    
    try {
      await navigate('/contact');
    } catch (error) {
      console.error('Navigation failed:', error);
      // Re-enable button if navigation fails
      setIsNavigating(false);
      // Show error toast
      showError('Failed to navigate to chat. Please try again.');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-jet text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        Chat with us
        {/* Tooltip arrow */}
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-jet"></div>
      </div>

      {/* Floating Button */}
      <button
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={isNavigating}
        className="group relative w-16 h-16 bg-grape hover:bg-eminence focus:bg-eminence disabled:bg-eminence/70 rounded-full shadow-lg hover:shadow-xl focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-african_violet/70 transition-all duration-300 motion-safe:hover:scale-105 motion-safe:active:scale-95 motion-safe:animate-[fadeInUp_300ms_ease-out]"
        role="button"
        aria-label="Open chat on Contact page"
        aria-live="polite"
        tabIndex={0}
      >
        {/* Idle pulse halo */}
        <div className="absolute inset-0 rounded-full bg-grape/30 motion-safe:animate-ping"></div>
        
        {/* Content */}
        <div className="relative flex items-center justify-center w-full h-full">
          {isNavigating ? (
            // Loading spinner
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            // Chat icon
            <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />
          )}
        </div>

        {/* Ripple effect on click */}
        <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-active:scale-100 transition-transform duration-150 pointer-events-none"></div>
      </button>
    </div>
  );
};

export default FloatingChatLauncher;
