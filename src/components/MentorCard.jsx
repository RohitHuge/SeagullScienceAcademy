import React, { useState, useEffect } from 'react';

const MentorCard = ({ mentor, onViewProfile, animate, delay }) => {
  const [show, setShow] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (animate) {
      const timeout = setTimeout(() => setShow(true), delay);
      return () => clearTimeout(timeout);
    } else {
      setShow(false);
    }
  }, [animate, delay]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    // Fallback to a placeholder if image fails to load
    setImageLoaded(true);
  };

  return (
    <div
      className={`
        group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ease-out 
        transform hover:scale-105 hover:-translate-y-1 cursor-pointer overflow-hidden
        ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      style={{ transitionDelay: `${delay}ms` }}
      onClick={() => onViewProfile(mentor)}
    >
      {/* Animated top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-grape via-african_violet to-eminence transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
      
      {/* Background pattern on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-african_violet/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out"></div>
      
      <div className="relative z-10 p-6">
        {/* Photo Section */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-african_violet/30 group-hover:ring-african_violet/50 transition-all duration-300">
              {!imageLoaded && (
                <div className="w-full h-full bg-gradient-to-br from-african_violet/20 to-grape/20 animate-pulse flex items-center justify-center">
                  <div className="text-african_violet text-2xl font-bold">
                    {mentor.name.charAt(0)}
                  </div>
                </div>
              )}
              <img
                src={mentor.photo}
                alt={`${mentor.name} - ${mentor.subject} Mentor`}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            </div>
            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-grape/20 to-eminence/20 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl scale-110"></div>
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-jet mb-2 group-hover:text-grape transition-colors duration-300">
            {mentor.name}
          </h3>
          <p className="text-african_violet font-semibold mb-2 group-hover:text-eminence transition-colors duration-300">
            {mentor.subject}
          </p>
                          <p className="text-jet/70 text-sm mb-4 overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                  {mentor.qualification}
                </p>
        </div>

        {/* View Profile Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewProfile(mentor);
          }}
          className="w-full bg-grape hover:bg-eminence text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-102 active:scale-98 focus:outline-none focus:ring-2 focus:ring-african_violet focus:ring-offset-2 group-hover:shadow-lg"
        >
          View Profile
        </button>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-grape/5 to-eminence/5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out"></div>
      
      {/* Subtle floating animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out transform translate-y-full group-hover:translate-y-0"></div>
    </div>
  );
};

export default MentorCard;
