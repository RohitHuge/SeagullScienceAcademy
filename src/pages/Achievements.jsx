import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Individual Student Achievements Data
const STUDENT_ACHIEVEMENTS = [
  { id: 1, name: 'Amit Shinde', exam: 'MHT-CET 2025 (PCB)', score: '98.86%tile', image: '' },
  { id: 2, name: 'Amit Shinde', exam: 'MHT-CET 2025 (PCM)', score: '97.50%tile', image: '' },
  { id: 3, name: 'Prajwal Shinde', exam: 'JEE Main 2025', score: '98.17%tile', image: '' },
  { id: 4, name: 'Prajwal Shinde', exam: 'MHT-CET 2025 (PCB)', score: '98.81%tile', image: '' },
  { id: 5, name: 'Nilesh Doiphode', exam: 'MHT-CET 2025 (PCB)', score: '98.81%tile', image: '' },
  { id: 6, name: 'Nilesh Doiphode', exam: 'MHT-CET 2025 (PCM)', score: '91.73%tile', image: '' },
  { id: 7, name: 'Gautam Vishnoi', exam: 'MHT-CET 2025 (PCB)', score: '95.96%tile', image: '' },
  { id: 8, name: 'Gautam Vishnoi', exam: 'MHT-CET 2025 (PCM)', score: '91.50%tile', image: '' },
  { id: 9, name: 'Samiksha Shivshete', exam: 'MHT-CET 2025 (PCM)', score: '93.91%tile', image: '' },
  { id: 10, name: 'Shrawani Mote', exam: 'MHT-CET 2025 (PCM)', score: '92.71%tile', image: '' },
  { id: 11, name: 'Bajarang Sounke', exam: 'MHT-CET 2025', score: '98.25%', image: '' },
  { id: 12, name: 'Bajarang Sounke', exam: 'HSC 2025', score: '91.83%', image: '' }
];


const ACHIEVEMENTS = [
  {
    id: 1,
    title: '98.86% PCB & 97.50% PCM Topper in MHT-CET 2025',
    description: 'Amit Shinde achieved an outstanding 98.86 percentile in PCB and 97.50 percentile in PCM, setting the benchmark for excellence at Seagull Academy.',
    year: '2025',
    icon: '🏆'
  },
  {
    id: 2,
    title: 'Multiple 98+ Percentile Scorers in MHT-CET 2025',
    description: 'Prajwal Shinde, Nilesh Doiphode, and Bajarang Sounke each secured over 98 percentile in CET, showcasing the academy’s ability to produce top-ranked students year after year.',
    year: '2025',
    icon: '⭐'
  },
  {
    id: 3,
    title: 'JEE Main 98.17% Top Performer',
    description: 'Prajwal Shinde scored 98.17 percentile in JEE Main, reflecting our focus on national-level competitive exam preparation alongside state exams.',
    year: '2025',
    icon: '🎯'
  },
  {
    id: 4,
    title: 'Consistent 90%+ Scores in HSC',
    description: 'Bajarang Sounke achieved 91.83% in HSC, with several other students scoring above 90%, proving our balanced preparation for board and competitive exams.',
    year: '2025',
    icon: '🎓'
  }
];


const TESTIMONIALS = [
  {
    id: 1,
    name: 'Amit Shinde',
    course: 'MHT-CET 2025 (PCB & PCM)',
    image: '',
    rating: 5,
    message: 'Scoring 98.86 percentile in PCB and 97.50 percentile in PCM was possible thanks to the rigorous preparation, daily tests, and personal mentorship at Seagull Academy. The faculty guided me at every step and helped me stay focused.',
    shortMessage: 'Daily tests and personal mentorship helped me achieve 98.86 (PCB) & 97.50 (PCM).'
  },
  {
    id: 2,
    name: 'Prajwal Shinde',
    course: 'JEE Main & MHT-CET 2025 (PCB)',
    image: '',
    rating: 5,
    message: 'With the excellent coaching at Seagull Academy, I secured 98.17 percentile in JEE Main and 98.81 percentile in PCB. The conceptual clarity and structured practice sessions were outstanding.',
    shortMessage: 'Concept clarity and structured practice led me to 98.17 (JEE) & 98.81 (PCB).'
  },
  {
    id: 3,
    name: 'Nilesh Doiphode',
    course: 'MHT-CET 2025 (PCB & PCM)',
    image: '',
    rating: 5,
    message: 'The guidance and support from Seagull Academy’s faculty were invaluable. I scored 98.81 percentile in PCB and 91.73 percentile in PCM, thanks to their strategic teaching and constant encouragement.',
    shortMessage: '98.81 (PCB) & 91.73 (PCM) thanks to strategic teaching and guidance.'
  },
  {
    id: 4,
    name: 'Gautam Vishnoi',
    course: 'MHT-CET 2025 (PCB & PCM)',
    image: '',
    rating: 5,
    message: 'Seagull Academy provided the perfect mix of study material, regular assessments, and motivation. I achieved 95.96 percentile in PCB and 91.50 percentile in PCM.',
    shortMessage: 'Regular assessments helped me secure 95.96 (PCB) & 91.50 (PCM).'
  },
  {
    id: 5,
    name: 'Samiksha Shivshete',
    course: 'MHT-CET 2025 (PCM)',
    image: '',
    rating: 5,
    message: 'The focused approach and timely doubt-solving sessions at Seagull Academy helped me achieve 93.91 percentile in PCM.',
    shortMessage: 'Focused approach and doubt sessions boosted my score to 93.91 (PCM).'
  },
  {
    id: 6,
    name: 'Shrawani Mote',
    course: 'MHT-CET 2025 (PCM)',
    image: '',
    rating: 5,
    message: 'With Seagull Academy’s consistent test series and personal feedback, I scored 92.71 percentile in PCM.',
    shortMessage: 'Consistent tests and feedback helped me score 92.71 (PCM).'
  },
  {
    id: 7,
    name: 'Bajarang Sounke',
    course: 'MHT-CET & HSC 2025',
    image: '',
    rating: 5,
    message: 'I am grateful to Seagull Academy for helping me achieve 98.25% in CET and 91.83% in HSC. Their preparation strategy covered both board and competitive exams effectively.',
    shortMessage: 'Scored 98.25% in CET & 91.83% in HSC with Seagull Academy’s guidance.'
  }
];


// Custom hook for in-view animation (play only once)
function useInViewOnce(ref, options = {}) {
  const [hasBeenInView, setHasBeenInView] = useState(false);
  useEffect(() => {
    if (hasBeenInView) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHasBeenInView(true);
      },
      options
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options, hasBeenInView]);
  return hasBeenInView;
}

function StudentAchievementCard({ student }) {
  return (
    <div
      className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center mx-2 min-w-[260px] max-w-[280px] w-[90vw] sm:w-[260px] md:w-[260px] lg:w-[300px] transition-all duration-300 border-b-4 border-gold hover:scale-105 hover:shadow-xl"
      style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
    >
      <div className="w-[112px] h-[112px] rounded-full flex items-center justify-center mb-4 bg-white border-4" style={{ borderColor: '#f2c94c' }}>
        <div className="w-[104px] h-[104px] rounded-full flex items-center justify-center bg-white border-4" style={{ borderColor: '#6600a6' }}>
          <img
            src={student.image}
            alt={student.name}
            className="w-[96px] h-[96px] rounded-full object-cover"
          />
        </div>
      </div>
      <div className="text-2xl font-bold text-grape mb-1 text-center" style={{ fontSize: 24 }}>{student.name}</div>
      <div className="text-base text-jet/70 mb-2 text-center" style={{ fontSize: 16 }}>{student.exam}</div>
      <div className="text-[18px] font-bold bg-gold text-grape px-4 py-1 rounded-full mt-1" style={{ fontSize: 18 }}>{student.score}</div>
    </div>
  );
}

function StudentAchievementsCarousel() {
  const containerRef = useRef();
  const [isPaused, setIsPaused] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [cardWidth, setCardWidth] = useState(300);
  const [visibleCards, setVisibleCards] = useState(3);
  const sectionRef = useRef();
  const inView = useInViewOnce(sectionRef, { threshold: 0.1 });

  // Responsive visible cards
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
        setCardWidth(260);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
        setCardWidth(260);
      } else {
        setVisibleCards(3);
        setCardWidth(300);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    if (!inView || isPaused) return;
    const interval = setInterval(() => {
      if (!containerRef.current) return;
      const totalWidth = cardWidth * STUDENT_ACHIEVEMENTS.length;
      let nextScroll = containerRef.current.scrollLeft + 1.5;
      if (nextScroll >= totalWidth) {
        nextScroll = 0;
      }
      containerRef.current.scrollLeft = nextScroll;
      setScrollLeft(nextScroll);
    }, 16);
    return () => clearInterval(interval);
  }, [isPaused, inView, cardWidth]);

  // Pause on hover/touch
  const pause = () => setIsPaused(true);
  const resume = () => setIsPaused(false);

  // Manual scroll
  const scrollBy = (dir) => {
    if (!containerRef.current) return;
    const amount = cardWidth * (visibleCards === 1 ? 1 : visibleCards - 1);
    containerRef.current.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  // Touch/swipe support
  useEffect(() => {
    let startX = 0;
    let scrollStart = 0;
    const el = containerRef.current;
    if (!el) return;
    const onTouchStart = (e) => {
      pause();
      startX = e.touches[0].clientX;
      scrollStart = el.scrollLeft;
    };
    const onTouchMove = (e) => {
      const dx = startX - e.touches[0].clientX;
      el.scrollLeft = scrollStart + dx;
    };
    const onTouchEnd = () => {
      resume();
    };
    el.addEventListener('touchstart', onTouchStart);
    el.addEventListener('touchmove', onTouchMove);
    el.addEventListener('touchend', onTouchEnd);
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [containerRef, cardWidth]);

  // Duplicate cards for seamless looping
  const cards = [...STUDENT_ACHIEVEMENTS, ...STUDENT_ACHIEVEMENTS];

  return (
    <section
      ref={sectionRef}
      className={`py-16 bg-african_violet/10 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-6">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-eminence mb-2">Individual Student Achievements</h2>
          <div className="text-lg md:text-xl text-jet/70 mb-4">Our toppers and their proud scores</div>
        </div>
        <div className="relative">
          {/* Left Arrow */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full border border-gray-200 hover:bg-african_violet/10 hover:text-grape transition-colors hidden sm:flex"
            onClick={() => scrollBy(-1)}
            aria-label="Scroll left"
            tabIndex={0}
          >
            <svg width="28" height="28" fill="none" stroke="#6600a6" strokeWidth="2"><path d="M18 6l-8 8 8 8" /></svg>
          </button>
          {/* Carousel */}
          <div
            ref={containerRef}
            className="flex overflow-x-auto no-scrollbar py-4"
            style={{ scrollBehavior: 'smooth' }}
            onMouseEnter={pause}
            onMouseLeave={resume}
            onTouchStart={pause}
            onTouchEnd={resume}
          >
            {cards.map((student, idx) => (
              <StudentAchievementCard key={student.id + '-' + idx} student={student} />
            ))}
          </div>
          {/* Right Arrow */}
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full border border-gray-200 hover:bg-african_violet/10 hover:text-grape transition-colors hidden sm:flex"
            onClick={() => scrollBy(1)}
            aria-label="Scroll right"
            tabIndex={0}
          >
            <svg width="28" height="28" fill="none" stroke="#6600a6" strokeWidth="2"><path d="M10 6l8 8-8 8" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}

function AchievementCard({ achievement }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-gray-100 border-b-4 border-b-gold">
      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl">{achievement.icon}</div>
        <span className="bg-african_violet/20 text-grape px-3 py-1 rounded-full text-sm font-bold">
          {achievement.year}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-eminence mb-3 font-display">{achievement.title}</h3>
      <p className="text-jet/70 leading-relaxed">{achievement.description}</p>
    </div>
  );
}

function TestimonialModal({ testimonial, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative animate-fade-in" onClick={e => e.stopPropagation()}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-grape transition-colors"
          aria-label="Close modal"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>
        
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <img 
              src={testimonial.image} 
              alt={testimonial.name} 
              className="w-20 h-20 rounded-full object-cover border-4 border-gold" 
            />
            <div>
              <h3 className="text-xl font-bold text-grape font-display">{testimonial.name}</h3>
              <p className="text-jet/70 font-medium">{testimonial.course}</p>
              <div className="flex gap-1 mt-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} width="16" height="16" fill="#f2c94c" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold text-grape mb-2">Student Testimonial:</h4>
            <p className="text-jet/70 leading-relaxed italic">"{testimonial.message}"</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TestimonialCard({ testimonial, onCardClick }) {
  // Safety check for undefined testimonial
  if (!testimonial) {
    return null;
  }

  return (
    <div 
      className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer border border-gray-100 hover:border-gold border-b-4 border-b-gold"
      onClick={onCardClick}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <img 
            src={testimonial.image} 
            alt={testimonial.name} 
            className="w-20 h-20 rounded-full object-cover border-4 border-gold flex-shrink-0" 
          />
          <div className="flex-1">
            <h3 className="text-xl font-bold text-grape font-display">{testimonial.name}</h3>
            <p className="text-jet/70 font-medium text-sm">{testimonial.course}</p>
            <div className="flex gap-1 mt-1">
              {[...Array(testimonial.rating)].map((_, i) => (
                <svg key={i} width="16" height="16" fill="#f2c94c" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <p className="text-jet/70 leading-relaxed italic">"{testimonial.shortMessage}"</p>
        </div>
        
        <div className="text-right">
          <span className="text-sm text-jet/50">Click to read full testimonial</span>
        </div>
      </div>
    </div>
  );
}

function AchievementsSection() {
  const sectionRef = useRef();
  const inView = useInViewOnce(sectionRef, { threshold: 0.1 });
  return (
    <section
      ref={sectionRef}
      className={`py-16 bg-african_violet/10 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-eminence mb-4">Our Achievements</h1>
          <p className="text-lg md:text-xl text-jet/70 mb-6">Celebrating our students' and academy's milestones</p>
          <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {ACHIEVEMENTS.map(achievement => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const sectionRef = useRef();
  const inView = useInViewOnce(sectionRef, { threshold: 0.1 });
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Calculate how many groups of 4 testimonials we have
  const testimonialsPerGroup = 4;
  const totalGroups = Math.ceil(TESTIMONIALS.length / testimonialsPerGroup);

  // Get current group of testimonials
  const getCurrentTestimonials = () => {
    const startIndex = currentGroupIndex * testimonialsPerGroup;
    return TESTIMONIALS.slice(startIndex, startIndex + testimonialsPerGroup);
  };

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    if (!inView) return;
    
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentGroupIndex((prev) => (prev + 1) % totalGroups);
        setIsTransitioning(false);
      }, 300); // Half of transition duration
    }, 5000);

    return () => clearInterval(interval);
  }, [inView, totalGroups]);

  const openModal = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTestimonial(null);
  };

  // Manual navigation functions
  const goToNextGroup = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentGroupIndex((prev) => (prev + 1) % totalGroups);
      setIsTransitioning(false);
    }, 300);
  };

  const goToPrevGroup = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentGroupIndex((prev) => (prev - 1 + totalGroups) % totalGroups);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <section
      ref={sectionRef}
      className={`py-16 bg-white transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-eminence mb-4">What Our Students Say</h2>
          <div className="w-24 h-1 bg-gold mx-auto rounded-full mb-4"></div>
          <p className="text-jet/70">Hear from our successful students</p>
        </div>
        
        {/* Navigation dots */}
        <div className="flex justify-center gap-2 mb-8">
          {Array.from({ length: totalGroups }, (_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentGroupIndex(index);
                  setIsTransitioning(false);
                }, 300);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentGroupIndex 
                  ? 'bg-grape scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial group ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation arrows */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={goToPrevGroup}
            className="bg-white shadow-lg p-3 rounded-full border border-gray-200 hover:bg-african_violet/10 hover:text-grape transition-colors"
            aria-label="Previous testimonials"
          >
            <svg width="24" height="24" fill="none" stroke="#6600a6" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          
          <div className="text-sm text-jet/50">
            {currentGroupIndex + 1} of {totalGroups}
          </div>
          
          <button
            onClick={goToNextGroup}
            className="bg-white shadow-lg p-3 rounded-full border border-gray-200 hover:bg-african_violet/10 hover:text-grape transition-colors"
            aria-label="Next testimonials"
          >
            <svg width="24" height="24" fill="none" stroke="#6600a6" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
        
        {/* Testimonials Grid */}
        <div 
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-opacity duration-600 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {getCurrentTestimonials().map(testimonial => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial} 
              onCardClick={() => openModal(testimonial)} 
            />
          ))}
        </div>
        
        <TestimonialModal 
          testimonial={selectedTestimonial} 
          isOpen={isModalOpen} 
          onClose={closeModal} 
        />
      </div>
    </section>
  );
}

export default function Achievements() {
  // Set page title when component mounts
  useEffect(() => {
    document.title = 'Achievements & Student Success | Seagull Science Academy Bhosari Pune';
  }, []);

  return (
    <div className="font-display bg-white text-jet min-h-screen">
      <Header />
      <AchievementsSection />
      <StudentAchievementsCarousel />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}

export {STUDENT_ACHIEVEMENTS}