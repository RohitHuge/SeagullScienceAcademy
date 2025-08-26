import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FilterTabs from '../components/FilterTabs';
import MentorCard from '../components/MentorCard';
import MentorModal from '../components/MentorModal';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// Import mentors data
import mentorsData from '../data/mentors.json';

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'Physics', label: 'Physics' },
  { value: 'Chemistry', label: 'Chemistry' },
  { value: 'Biology', label: 'Biology' },
  { value: 'Mathematics', label: 'Mathematics' },
  { value: 'Bio-NEET', label: 'Bio-NEET' }
];

function useInView(ref, options = {}) {
  const [inView, setInView] = useState(false);
  
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      options
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, [ref, options]);
  
  return inView;
}

export default function Mentors() {
  const [mentors, setMentors] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  
  const sectionRef = useRef();
  const inView = useInView(sectionRef, { threshold: 0.1 });

  // Load mentors data
  useEffect(() => {
    setMentors(mentorsData);
  }, []);

  // Filter mentors based on active filter
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredMentors(mentors);
    } else {
      setFilteredMentors(mentors.filter(mentor => mentor.subject === activeFilter));
    }
    
    // Trigger animation for filtered results
    setAnimateCards(false);
    setTimeout(() => setAnimateCards(true), 100);
  }, [activeFilter, mentors]);

  // Trigger animations when section comes into view
  useEffect(() => {
    if (inView) {
      setAnimateCards(true);
    }
  }, [inView]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleViewProfile = (mentor) => {
    setSelectedMentor(mentor);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedMentor(null), 300);
  };

  // Set page title
  useEffect(() => {
    document.title = 'Our Mentors - Seagull Science Academy | Expert Faculty in Bhosari Pune';
  }, []);

  return (
    <>
    <HelmetProvider>
    <Helmet>
        {/* Basic SEO */}
        <title>Our Mentors | Seagull Science Academy</title>
        <meta
          name="description"
          content="Meet Seagull Science Academy’s expert mentors for Physics, Chemistry, Mathematics, and Biology. 6–20+ years of experience in NEET, JEE, CET, and NDA coaching."
        />
        <meta
          name="keywords"
          content="Seagull Academy mentors, NEET faculty Pune, JEE teachers Pune, best science academy teachers, Seagull Science Academy staff"
        />

        {/* Open Graph for social sharing */}
        <meta property="og:title" content="Our Mentors | Seagull Science Academy" />
        <meta
          property="og:description"
          content="Experienced mentors at Seagull Science Academy — IIT-JEE, NEET, CET, and NDA specialists with 6–20+ years of teaching excellence."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://seagullscienceacademy.pages.dev/mentors"
        />
        <meta
          property="og:image"
          content="https://seagullscienceacademy.pages.dev/images/seo/mentors-banner.jpg"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Our Mentors | Seagull Science Academy"
        />
        <meta
          name="twitter:description"
          content="Meet the expert faculty of Seagull Science Academy — guiding students to success in NEET, JEE, CET, and NDA."
        />
        <meta
          name="twitter:image"
          content="https://seagullscienceacademy.pages.dev/images/seo/mentors-banner.jpg"
        />
      </Helmet>
    <div className="font-display bg-white text-jet min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-grape via-eminence to-purple-900 relative overflow-hidden">
          {/* Background Design Elements */}
          <div className="absolute top-10 left-8 w-24 h-24 bg-african_violet/20 rounded-full blur-lg animate-pulse"></div>
          <div className="absolute top-32 right-12 w-16 h-16 bg-white/15 rounded-full blur-md animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-african_violet/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-32 right-1/4 w-28 h-28 bg-white/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6 animate-fade-in">
                Our Expert Mentors
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Meet the dedicated faculty who guide our students to success in NEET, JEE, and other competitive exams
              </p>
            </div>
          </div>
        </section>

        {/* Mentors Section */}
        <section className="py-20 bg-african_violet/10 relative overflow-hidden" ref={sectionRef}>
          {/* Background Design Elements */}
          <div className="absolute top-10 left-8 w-24 h-24 bg-african_violet/20 rounded-full blur-lg animate-pulse"></div>
          <div className="absolute top-32 right-12 w-16 h-16 bg-grape/15 rounded-full blur-md animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-eminence/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-32 right-1/4 w-28 h-28 bg-african_violet/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Filter Tabs */}
            <FilterTabs
              activeFilter={activeFilter}
              onFilterChange={handleFilterChange}
              filters={FILTERS}
            />

            {/* Mentors Grid */}
            <div 
              id="mentors-grid"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              role="tabpanel"
              aria-label={`Showing ${filteredMentors.length} mentors in ${activeFilter === 'all' ? 'all subjects' : activeFilter}`}
            >
              {filteredMentors.map((mentor, idx) => (
                <MentorCard
                  key={mentor.id}
                  mentor={mentor}
                  onViewProfile={handleViewProfile}
                  animate={animateCards}
                  delay={animateCards ? idx * 100 : 0}
                />
              ))}
            </div>

            {/* No Results Message */}
            {filteredMentors.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-jet mb-2">No mentors found</h3>
                <p className="text-jet/70">Try selecting a different filter or check back later.</p>
              </div>
            )}

            {/* Results Count */}
            <div className="text-center mt-8">
              <p className="text-jet/70">
                Showing <span className="font-semibold text-african_violet">{filteredMentors.length}</span> mentor{filteredMentors.length !== 1 ? 's' : ''}
                {activeFilter !== 'all' && ` in ${activeFilter}`}
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Mentor Modal */}
      {selectedMentor && (
        <MentorModal
          mentor={selectedMentor}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
    </HelmetProvider>
    </>
  );
}
