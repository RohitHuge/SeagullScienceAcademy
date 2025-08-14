import React, { useEffect, useRef } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const MentorModal = ({ mentor, isOpen, onClose }) => {
  const modalRef = useRef();
  const previousFocusRef = useRef();

  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element
      previousFocusRef.current = document.activeElement;
      
      // Focus the modal
      if (modalRef.current) {
        modalRef.current.focus();
      }
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      // Add escape key listener
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
        
        // Restore focus to the previous element
        if (previousFocusRef.current) {
          previousFocusRef.current.focus();
        }
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="mentor-modal-title"
      aria-describedby="mentor-modal-description"
    >
      <div
        ref={modalRef}
        className="relative bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        tabIndex="-1"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-gray-600 hover:text-grape transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-african_violet"
          aria-label="Close modal"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        {/* Header with Photo */}
        <div className="relative">
          <div className="w-full h-48 bg-gradient-to-br from-grape to-eminence rounded-t-xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-african_violet/20 to-transparent"></div>
            <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full blur-sm"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/10 rounded-full blur-sm"></div>
            
            {/* Photo */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/3">
              <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
                <img
                  src={mentor.photo}
                  alt={`${mentor.name} - ${mentor.subject} Mentor`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback if image fails */}
                <div className="w-full h-full bg-gradient-to-br from-african_violet/20 to-grape/20 flex items-center justify-center text-white text-2xl font-bold" style={{ display: 'none' }}>
                  {mentor.name.charAt(0)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 pt-8">
          {/* Name and Subject */}
          <div className="text-center mb-6">
            <h2 
              id="mentor-modal-title"
              className="text-2xl font-bold text-jet mb-2"
            >
              {mentor.name}
            </h2>
            <p className="text-african_violet font-semibold text-lg mb-1">
              {mentor.subject}
            </p>
            <p className="text-jet/70 text-sm">
              {mentor.qualification}
            </p>
          </div>

          {/* Bio */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-jet mb-3">About</h3>
            <p 
              id="mentor-modal-description"
              className="text-jet/80 leading-relaxed"
            >
              {mentor.bio}
            </p>
          </div>

          {/* Achievements */}
          <div>
            <h3 className="text-lg font-semibold text-jet mb-3">Key Achievements</h3>
            <ul className="space-y-2">
              {mentor.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-african_violet rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-jet/80 text-sm leading-relaxed">
                    {achievement}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full bg-grape hover:bg-eminence text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-african_violet focus:ring-offset-2"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorModal;
