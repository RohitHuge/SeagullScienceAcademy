import React, { useState, useEffect, useRef } from 'react';
import { 
  AcademicCapIcon, 
  UserGroupIcon, 
  TrophyIcon, 
  BookOpenIcon, 
  BeakerIcon, 
  ShieldCheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  StarIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Spinner from '../components/ui/Spinner';
import { useToast } from '../components/ui/Toast';
import homeData from '../data/home.json';
import AnchorNavigation from '../components/AnchorNavigation';
import mentorsData from '../data/mentors.json';
import BlurText from '../components/ui/BlurText';
import TextType from '../components/ui/TextType';
import { sendMessage } from '../data/controllers';
import { STUDENT_ACHIEVEMENTS } from './Achievements';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { COURSES } from './Courses';
import { ApplyModal } from './Courses';
import { motion, AnimatePresence } from "framer-motion";


// Add smooth scroll CSS globally
if (typeof window !== 'undefined') {
  document.documentElement.style.scrollBehavior = 'smooth';
}

const Home = () => {
  const { showSuccess, showError } = useToast();
  const [currentMentorSlide, setCurrentMentorSlide] = useState(0);
  const [currentAchievementSlide, setCurrentAchievementSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [mentorImages, setMentorImages] = useState([]);
  const [coursesInView, setCoursesInView] = useState(false);
  const [achievementsInView, setAchievementsInView] = useState(false);
  const [contactInView, setContactInView] = useState(false);
  const [whySeagullInView, setWhySeagullInView] = useState(false);
  const [mentorsInView, setMentorsInView] = useState(false);
  const achievementsRef = useRef();
  const contactRef = useRef();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Course data with icons mapped
  const courses = COURSES.map((course, index) => {
    const icons = [AcademicCapIcon, BeakerIcon, BookOpenIcon, AcademicCapIcon, BookOpenIcon, ShieldCheckIcon];
    return {
      ...course,
      icon: icons[index % icons.length]
    };
  });

  // Mentor data
  // const mentors = [
  //   { name: 'Vikram Ghule', subject: 'Physics', experience: 'BE, ME & PhD Mechanical, 17 years experience' },
  //   { name: 'Prachi Ghule', subject: 'Mathematics', experience: 'BE, ME Instrumentation, 7 years' },
  //   { name: 'Minal Patil', subject: 'Chemistry', experience: 'BSc & MSc Chemistry, 12 years' },
  //   { name: 'Asawari Hire', subject: 'Biology', experience: 'BSc & MSc Biotechnology, 8 years' },
  //   { name: 'Ram Solanke', subject: 'Biology', experience: 'BSc & MSc Microbiology, 6 years' },
  //   { name: 'Kishor Jadhav', subject: 'Mathematics', experience: 'BE & ME Mechanical, 6 years' },
  //   { name: 'Dr. Shradha Dandnaik', subject: 'Bio‑NEET', experience: 'BDS, 4 years' }
  // ];
  const mentors = mentorsData;

  // Achievement data
  const achievements = STUDENT_ACHIEVEMENTS;

  // Why Seagull features
  const features = [
    { icon: UserGroupIcon, text: 'Expert & experienced faculties' },
    { icon: AcademicCapIcon, text: 'Daily 3–6 hour classroom coaching' },
    { icon: BookOpenIcon, text: 'Daily topic tests & doubt sessions' },
    { icon: TrophyIcon, text: 'Unlimited online mock tests' },
    { icon: BeakerIcon, text: 'Printed notes and recorded videos' },
    { icon: ShieldCheckIcon, text: 'Free career counseling & mentoring' }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMentorSlide((prev) => (prev + 1) % Math.ceil(mentors.length / 4));
    }, 4000);

    return () => clearInterval(interval);
  }, [mentors.length]);




  // Simulate loading mentor images
  useEffect(() => {
    const loadImages = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setMentorImages(mentors.map(() => `https://via.placeholder.com/200x200/be88d3/ffffff?text=Mentor`));
      } catch (error) {
        showError('Failed to load mentor images');
      }
    };
    loadImages();
  }, [showError]);

  // Intersection Observer for courses section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCoursesInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const coursesSection = document.getElementById('courses');
    if (coursesSection) {
      observer.observe(coursesSection);
    }

    return () => observer.disconnect();
  }, []);

  // Intersection Observer for Why Seagull Academy section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWhySeagullInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const whySeagullSection = document.getElementById('why-seagull');
    if (whySeagullSection) {
      observer.observe(whySeagullSection);
    }

    return () => observer.disconnect();
  }, []);

  // Intersection Observer for Mentors section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMentorsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const mentorsSection = document.getElementById('mentors');
    if (mentorsSection) {
      observer.observe(mentorsSection);
    }

    return () => observer.disconnect();
  }, []);

  // Intersection Observer for achievements section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAchievementsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const achievementsSection = document.getElementById('achievements');
    if (achievementsSection) {
      observer.observe(achievementsSection);
    }

    return () => observer.disconnect();
  }, []);

  // Intersection Observer for contact section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setContactInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const contactSection = document.getElementById('contact');
    if (contactSection) {
      observer.observe(contactSection);
    }

    return () => observer.disconnect();
  }, []);

  const handleCTAClick = async () => {
    window.location.href = '/courses';
  };

  // Contact form submission handler
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      let res = await sendMessage(formData.name, formData.subject, formData.phone, formData.email, formData.message);
      // console.log("res", res);

      if(res.success === true){
        showSuccess('Message sent successfully! We\'ll get back to you soon.');
      }else{
        showError('Failed to send message. Please try again.|| If else ladder');
      }
      setFormData({
        name: '',
        subject: '',
        email: '',
        phone: '',
        message: ''
      });
      
    } catch (error) {
      showError('Failed to send message. Please try again.|| catch');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextMentorSlide = () => {
    setCurrentMentorSlide((prev) => (prev + 1) % mentors.length);
  };

  const prevMentorSlide = () => {
    setCurrentMentorSlide((prev) => (prev - 1 + mentors.length) % mentors.length);
  };

  const handleKeyDown = (e, action) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  const openModal = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCourse(null), 300);
  };

  return (
    <>
          <Helmet>
        {/* Primary Meta Tags */}
        <title>Seagull Science Academy | NEET, JEE, CET Coaching in Bhosari, Pune</title>
        <meta
          name="description"
          content="Seagull Science Academy, Bhosari – Expert coaching for NEET, JEE, CET, NDA. Experienced mentors, daily tests, printed notes, and career guidance."
        />
        <meta
          name="keywords"
          content="Seagull Science Academy, NEET coaching Pune, JEE coaching Bhosari, CET coaching Maharashtra, NDA classes Pune, best science coaching"
        />
        <meta name="author" content="Seagull Science Academy" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.seagullscienceacademy.com/" />
        <meta property="og:title" content="Seagull Science Academy | NEET, JEE, CET Coaching" />
        <meta
          property="og:description"
          content="Join Seagull Science Academy in Bhosari, Pune for NEET, JEE, CET, and NDA coaching. Daily tests, expert faculties & personalized mentoring."
        />
        <meta property="og:image" content="https://www.seagullscienceacademy.com/images/og-banner.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.seagullscienceacademy.com/" />
        <meta name="twitter:title" content="Seagull Science Academy | NEET, JEE, CET Coaching" />
        <meta
          name="twitter:description"
          content="Trusted coaching in Bhosari, Pune for NEET, JEE, CET, and NDA with daily tests and expert mentors."
        />
        <meta name="twitter:image" content="https://www.seagullscienceacademy.com/images/og-banner.jpg" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
    <div className="min-h-screen bg-white">
      <Header />
      <AnchorNavigation />
      
      {/* Main Content */}
      <main id="main-content">
        {/* Hero Section - Full Height with Background Design */}
        <section id="home" className="relative min-h-[100vh] flex items-center justify-center bg-gradient-to-br from-grape via-eminence to-purple-900 text-white overflow-hidden">
          {/* Background Design Elements */}
          {/* Large decorative bubbles */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-african_violet/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-white/15 rounded-full blur-md animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-african_violet/25 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          
          {/* Gradient overlays for depth - only on left side */}
          <div className="absolute inset-0 bg-gradient-to-r from-grape/80 via-transparent to-transparent"></div>
          
          {/* Content */}
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh] relative">
              {/* Left Side - Content */}
              <div className="space-y-6 lg:space-y-8 order-2 lg:order-1 relative z-30 flex flex-col items-center text-center">
                <div className="flex justify-center items-center w-full">
                <img src="/logo.png" alt="Seagull Science Academy Logo" className="h-48 w-48 mb-3 drop-shadow-lg mx-auto lg:mx-0" />
                </div>
                <h1 className="font-display  font-bold text-4xl sm:text-5xl lg:text-7xl leading-tight animate-fade-in-up">
                <BlurText
                  text="Seagull Science Academy"
                  delay={150}
                  animateBy="words"
                  direction="top"
                  className="text-4xl sm:text-5xl lg:text-7xl leading-tight text-center justify-center"
                />
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-white/90 leading-relaxed text-center animate-fade-in-up">
                <TextType 
                  text={homeData.hero.subtitle.split('**')}
                  as="span"
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={false}
                  cursorCharacter="•"
                  className="text-lg sm:text-xl lg:text-2xl text-white/90 leading-relaxed text-center"
                  variableSpeed={{min : 60 , max : 120}}
                />
                </p>
                <button
                  onClick={handleCTAClick}
                  disabled={isLoading}
                  className="group bg-white text-grape hover:bg-gray-100 focus:ring-2 focus:ring-african_violet px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-all duration-200 ease-out transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed animate-fade-in-up shadow-lg hover:shadow-xl w-full sm:w-auto"
                  style={{ animationDelay: '0.4s' }}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <Spinner size="sm" />
                      <span>Loading...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <span>{homeData.hero.ctaText}</span>
                      <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  )}
                </button>
              </div>

              {/* Right Side - Modern Carousel with Student Achievements */}
              <div className="order-1 lg:order-2 flex justify-center items-center w-full">
                <HeroAchievementsCarousel />
              </div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Our Courses Section */}
        <section id="courses" className="py-20 bg-african_violet/10 relative overflow-hidden">
          {/* Background Design Elements */}
          {/* Decorative bubbles */}
          <div className="absolute top-10 left-8 w-24 h-24 bg-african_violet/20 rounded-full blur-lg animate-pulse"></div>
          <div className="absolute top-32 right-12 w-16 h-16 bg-grape/15 rounded-full blur-md animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-eminence/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-32 right-1/4 w-28 h-28 bg-african_violet/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-1/2 left-4 w-12 h-12 bg-grape/10 rounded-full blur-sm animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Enhanced Title */}
            <div className="text-center mb-20">
              <h2 className="font-display font-black text-5xl lg:text-6xl text-eminence mb-6">
                {homeData.sections[0].title}
              </h2>
              <p className="text-xl text-jet/70 max-w-2xl mx-auto leading-relaxed">
                Comprehensive preparation programs designed to help you excel in your academic journey
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <div
                  key={course.title}
                  className={`group relative bg-gradient-to-br from-white to-african_violet/5 text-jet rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 ease-out p-6 border border-african_violet/10 hover:border-african_violet/30 cursor-pointer transform hover:-translate-y-3 hover:scale-105 overflow-hidden border-l-4 border-l-grape ${
                    coursesInView 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                  }`}
                  tabIndex={0}
                  onKeyDown={(e) => handleKeyDown(e, () => window.location.href = '/courses')}
                  onClick={() => openModal(course)}
                  role="button"
                  aria-label={`View ${course.title} course details`}
                  style={{ 
                    transitionDelay: `${index * 0.1}s`,
                    transitionDuration: '800ms'
                  }}
                >
                  {/* Colored border on top */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-grape via-african_violet to-eminence transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"></div>
                  
                  {/* Background pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-african_violet/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out"></div>
                  
                  {/* Icon container with enhanced design */}
                  <div className="relative z-10 text-center space-y-5">
                    <div className="relative mx-auto">
                      {/* Outer glow ring */}
                      <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-grape to-african_violet rounded-full blur-lg opacity-0 group-hover:opacity-60 transition-all duration-700 ease-out scale-0 group-hover:scale-100"></div>
                      
                      {/* Icon background */}
                      <div className="relative w-20 h-20 bg-gradient-to-br from-african_violet/20 to-grape/20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-700 ease-out border-2 border-african_violet/30 group-hover:border-african_violet/60 transform rotate-0 group-hover:rotate-3">
                        <course.icon className="w-10 h-10 text-african_violet group-hover:text-grape transition-all duration-700 ease-out transform group-hover:scale-110" />
                      </div>
                    </div>
                    
                    {/* Course title with enhanced typography */}
                    <h3 className="font-display font-bold text-xl text-jet group-hover:text-eminence transition-all duration-500 ease-out transform group-hover:translate-y-[-2px]">
                      {course.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-jet/70 text-base leading-relaxed group-hover:text-jet/90 transition-all duration-500 ease-out">
                      {course.description}
                    </p>
                    
                    {/* Interactive CTA button */}
                    <div className="pt-3">
                      <span className="inline-flex items-center space-x-2 text-african_violet font-semibold text-base group-hover:text-grape transition-all duration-500 ease-out transform group-hover:translate-x-1">
                        <span>Apply Now</span>
                        <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-2 transition-all duration-500 ease-out" />
                      </span>
                    </div>
                  </div>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-grape/5 to-eminence/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out"></div>
                  
                  {/* Subtle floating animation */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-out transform translate-y-full group-hover:translate-y-0"></div>
                </div>
              ))}
            </div>
            
            {/* Bottom CTA */}
            <div className="text-center mt-16">
              <button
                onClick={handleCTAClick}
                className="group bg-gradient-to-r from-grape to-eminence hover:from-eminence hover:to-grape text-white px-10 py-4 rounded-xl text-lg font-semibold transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-african_violet/50"
              >
                <span className="flex items-center space-x-2">
                  <span>Explore All Courses</span>
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Why Seagull Academy Section */}
        <section id="why-seagull" className="py-20 bg-african_violet/10 relative overflow-hidden">
          {/* Background Design Elements - Same pattern as courses section */}
          <div className="absolute top-10 left-8 w-24 h-24 bg-african_violet/20 rounded-full blur-lg animate-pulse"></div>
          <div className="absolute top-32 right-12 w-16 h-16 bg-grape/15 rounded-full blur-md animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-eminence/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-32 right-1/4 w-28 h-28 bg-african_violet/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-1/2 left-4 w-12 h-12 bg-grape/10 rounded-full blur-sm animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Enhanced Title */}
            <div className="text-center mb-20">
              <h2 className="font-display font-black text-5xl lg:text-6xl text-eminence mb-6">
                {homeData.sections[1].title}
              </h2>
              <p className="text-xl text-jet/70 max-w-2xl mx-auto leading-relaxed">
                Discover what makes us the preferred choice for academic excellence
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`group relative bg-gradient-to-br from-white/90 to-african_violet/5 text-jet rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 ease-out p-8 border border-african_violet/20 hover:border-african_violet/40 cursor-pointer transform hover:-translate-y-2 hover:scale-105 overflow-hidden border-l-4 border-l-grape ${
                    whySeagullInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 0.1}s`,
                    transitionDuration: '800ms'
                  }}
                >
                  {/* Animated border on top */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-grape via-african_violet to-eminence transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"></div>
                  
                  {/* Background pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-african_violet/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out"></div>
                  
                  {/* Icon container with enhanced design */}
                  <div className="relative z-10 text-center space-y-6">
                    <div className="relative mx-auto">
                      {/* Outer glow ring */}
                      <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-grape to-african_violet rounded-full blur-lg opacity-0 group-hover:opacity-60 transition-all duration-700 ease-out scale-0 group-hover:scale-100"></div>
                      
                      {/* Icon background */}
                      <div className="relative w-20 h-20 bg-gradient-to-br from-african_violet/20 to-grape/20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-700 ease-out border-2 border-african_violet/30 group-hover:border-african_violet/60 transform rotate-0 group-hover:rotate-3">
                        <feature.icon className="w-10 h-10 text-african_violet group-hover:text-grape transition-all duration-700 ease-out transform group-hover:scale-110" />
                      </div>
                    </div>
                    
                    {/* Feature text with enhanced typography */}
                    <h3 className="font-display font-semibold text-lg text-jet group-hover:text-eminence transition-all duration-500 ease-out transform group-hover:translate-y-[-2px]">
                      {feature.text}
                    </h3>
                  </div>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-grape/5 to-eminence/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out"></div>
                  
                  {/* Subtle floating animation */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-out transform translate-y-full group-hover:translate-y-0"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mentors Section */}
        <section id="mentors" className="py-20 bg-african_violet/10 relative overflow-hidden">
          {/* Background Design Elements - Same pattern as courses section */}
          <div className="absolute top-10 left-8 w-24 h-24 bg-african_violet/20 rounded-full blur-lg animate-pulse"></div>
          <div className="absolute top-32 right-12 w-16 h-16 bg-grape/15 rounded-full blur-md animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-eminence/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-32 right-1/4 w-28 h-28 bg-african_violet/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-1/2 left-4 w-12 h-12 bg-grape/10 rounded-full blur-sm animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Enhanced Title */}
            <div className="text-center mb-20">
              <h2 className="font-display font-black text-5xl lg:text-6xl text-eminence mb-6">
                {homeData.sections[2].title}
              </h2>
              <p className="text-xl text-jet/70 max-w-2xl mx-auto leading-relaxed">
                Learn from experienced educators who are passionate about your success
              </p>
            </div>
            
            {/* Carousel Container */}
            <div className="relative my-8">
              {/* Navigation arrows */}
              <button
                onClick={prevMentorSlide}
                className="absolute -left-20 top-1/3 -translate-y-1/2 bg-white text-jet border border-gray-200 p-3 rounded-full shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-african_violet transition-all duration-200 z-20"
                aria-label="Previous mentors"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </button>
              
              <button
                onClick={nextMentorSlide}
                className="absolute -right-20 top-1/3 -translate-y-1/2 bg-white text-jet border border-gray-200 p-3 rounded-full shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-african_violet transition-all duration-200 z-20"
                aria-label="Next mentors"
              >
                <ChevronRightIcon className="w-6 h-6" />
              </button>
              
              {/* Carousel content */}
              <div className="overflow-hidden py-8">
                <div 
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentMentorSlide * 100}%)` }}
                >
                  {mentors.map((mentor, index) => (
                    <div key={mentor.name} className="w-full flex-shrink-0 px-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {mentors.slice(index, index + 4).map((mentorItem, cardIndex) => (
                          <div
                            key={mentorItem.name}
                            className={`group relative bg-gradient-to-br from-white/95 to-african_violet/5 text-jet rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 ease-out p-6 border border-african_violet/20 hover:border-african_violet/40 cursor-pointer transform hover:-translate-y-3 hover:scale-105 overflow-hidden ${
                              mentorsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                            style={{ 
                              transitionDelay: `${cardIndex * 0.1}s`,
                              transitionDuration: '800ms'
                            }}
                          >
                            {/* Animated left border */}
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-grape via-african_violet to-eminence transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-700 ease-out"></div>
                            
                            {/* Background pattern */}
                            <div className="absolute inset-0 bg-gradient-to-br from-african_violet/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out"></div>
                            
                            {/* Content */}
                            <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                              {/* Profile image container */}
                              <div className="relative">
                                {/* Outer glow ring */}
                                <div className="absolute inset-0 w-28 h-28 bg-gradient-to-r from-grape to-african_violet rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-all duration-700 ease-out scale-0 group-hover:scale-100"></div>
                                
                                {/* Profile image */}
                                <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-4 border-african_violet/30 group-hover:border-african_violet/60 transition-all duration-700 ease-out transform group-hover:scale-110">
                                  <div className="w-full h-full bg-gradient-to-br from-african_violet/20 to-grape/20 flex items-center justify-center">
                                    {/* <UserGroupIcon className="w-10 h-10 text-african_violet group-hover:text-grape transition-all duration-700 ease-out" /> */}
                                    <img src={mentorItem.photo} alt={mentorItem.name} className="w-full h-full object-cover rounded-2xl" />
                                  </div>
                                </div>
                              </div>
                              
                              {/* Mentor details */}
                              <div className="space-y-2">
                                <h3 className="font-display font-bold text-lg text-jet group-hover:text-eminence transition-all duration-500 ease-out transform group-hover:translate-y-[-2px]">
                                  {mentorItem.name}
                                </h3>
                                <p className="text-eminence font-semibold text-sm group-hover:text-grape transition-colors duration-500">
                                  {mentorItem.qualification}
                                </p>
                                <p className="text-african_violet font-semibold text-base group-hover:text-grape transition-colors duration-500">
                                  {mentorItem.subject}
                                </p>
                                <p className="text-jet/70 text-sm font-medium leading-tight">
                                  {mentorItem.experience}
                                </p>
                              </div>
                              
                              {/* Hover indicator */}
                              <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform translate-y-2 group-hover:translate-y-0">
                                <span className="inline-flex items-center space-x-2 text-african_violet font-medium text-xs group-hover:text-grape transition-colors duration-500">
                                  <span onClick={() => window.location.href = '/mentors'}>View Profile</span>
                                  <ArrowRightIcon className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                                </span>
                              </div>
                            </div>
                            
                            {/* Hover effect overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-grape/5 to-eminence/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out"></div>
                            
                            {/* Subtle floating animation */}
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-out transform translate-y-full group-hover:translate-y-0"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Dots indicator */}
              <div className="flex justify-center space-x-2 mt-8">
                {Array.from({ length: Math.ceil(mentors.length / 4) }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentMentorSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentMentorSlide ? 'bg-african_violet' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to mentor group ${index + 1}`}
                  />
                ))}
              </div>
              
              {/* Carousel info */}
              <div className="text-center mt-4 text-sm text-jet/60">
                {currentMentorSlide + 1} of {Math.ceil(mentors.length / 4)} groups
              </div>
            </div>
          </div>
        </section>

        {/* Achievements & Toppers Section */}
        <section id="achievements" className="py-20 bg-african_violet/10 relative overflow-hidden">
          {/* Background Design Elements - Same pattern as other sections */}
          <div className="absolute top-10 left-8 w-24 h-24 bg-african_violet/20 rounded-full blur-lg animate-pulse"></div>
          <div className="absolute top-32 right-12 w-16 h-16 bg-grape/15 rounded-full blur-md animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-eminence/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-32 right-1/4 w-28 h-28 bg-african_violet/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-1/2 left-4 w-12 h-12 bg-grape/10 rounded-full blur-sm animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Enhanced Title */}
            <div className="text-center mb-20">
              <h2 className="font-display font-black text-5xl lg:text-6xl text-eminence mb-6">
                {homeData.sections[3].title}
              </h2>
              <p className="text-xl text-jet/70 max-w-2xl mx-auto leading-relaxed">
                Celebrating the success of our outstanding students
              </p>
            </div>
            
            {/* Achievements Carousel */}
            <div className="relative">
              {/* Navigation arrows */}
              <button
                onClick={() => setCurrentAchievementSlide((prev) => (prev - 1 + Math.ceil(achievements.length / 4)) % Math.ceil(achievements.length / 4))}
                className="absolute -left-20 top-1/3 -translate-y-1/2 bg-white text-jet border border-gray-200 p-3 rounded-full shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-african_violet transition-all duration-200 z-20"
                aria-label="Previous achievements"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </button>
              
              <button
                onClick={() => setCurrentAchievementSlide((prev) => (prev + 1) % Math.ceil(achievements.length / 4))}
                className="absolute -right-20 top-1/3 -translate-y-1/2 bg-white text-jet border border-gray-200 p-3 rounded-full shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-african_violet transition-all duration-200 z-20"
                aria-label="Next achievements"
              >
                <ChevronRightIcon className="w-6 h-6" />
              </button>
              
              {/* Carousel content */}
              <div className="overflow-hidden py-8">
                <div 
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentAchievementSlide * 100}%)` }}
                >
                  {Array.from({ length: Math.ceil(achievements.length / 4) }, (_, slideIndex) => (
                    <div key={slideIndex} className="w-full flex-shrink-0 px-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {achievements.slice(slideIndex * 4, (slideIndex + 1) * 4).map((achievement, cardIndex) => (
                          <div
                            key={achievement.id}
                            className={`group relative bg-gradient-to-br from-white/95 to-african_violet/5 text-jet rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 ease-out p-6 border border-african_violet/20 hover:border-african_violet/40 cursor-pointer transform hover:-translate-y-3 hover:scale-105 overflow-hidden ${
                              achievementsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                            style={{ 
                              transitionDelay: `${cardIndex * 0.1}s`,
                              transitionDuration: '800ms'
                            }}
                          >
                            {/* Animated left border */}
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-grape via-african_violet to-eminence transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-700 ease-out"></div>
                            
                            {/* Background pattern */}
                            <div className="absolute inset-0 bg-gradient-to-br from-african_violet/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out"></div>
                            
                            {/* Content */}
                            <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                              {/* Student image container */}
                              <div className="relative">
                                {/* Outer glow ring */}
                                <div className="absolute inset-0 w-32 h-32 bg-gradient-to-r from-grape to-african_violet rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-all duration-700 ease-out scale-0 group-hover:scale-100"></div>
                                
                                {/* Student image */}
                                <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-4 border-african_violet/30 group-hover:border-african_violet/60 transition-all duration-700 ease-out transform group-hover:scale-110">
                                  <img 
                                    src={achievement.image} 
                                    alt={achievement.name} 
                                    className="w-full h-full object-cover rounded-2xl" 
                                  />
                                </div>
                              </div>
                              
                              {/* Achievement details */}
                              <div className="space-y-2">
                                <div className="text-3xl font-bold text-eminence group-hover:text-grape transition-all duration-500 ease-out transform group-hover:translate-y-[-2px]">
                                  {achievement.score}
                                </div>
                                <h3 className="font-display font-bold text-lg text-jet group-hover:text-eminence transition-all duration-500 ease-out transform group-hover:translate-y-[-2px]">
                                  {achievement.name}
                                </h3>
                                <p className="text-african_violet font-semibold text-sm group-hover:text-grape transition-colors duration-500">
                                  {achievement.exam}
                                </p>
                              </div>
                              
                              {/* Hover indicator */}
                              <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform translate-y-2 group-hover:translate-y-0">
                                <span className="inline-flex items-center space-x-2 text-african_violet font-medium text-xs group-hover:text-grape transition-colors duration-500">
                                  <span>View Achievement</span>
                                  <ArrowRightIcon className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                                </span>
                              </div>
                            </div>
                            
                            {/* Hover effect overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-grape/5 to-eminence/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out"></div>
                            
                            {/* Subtle floating animation */}
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-out transform translate-y-full group-hover:translate-y-0"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Dots indicator */}
              <div className="flex justify-center space-x-2 mt-8">
                {Array.from({ length: Math.ceil(achievements.length / 4) }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentAchievementSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentAchievementSlide ? 'bg-african_violet' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to achievement group ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-african_violet/10 relative overflow-hidden">
          {/* Background Design Elements - Same pattern as other sections */}
          <div className="absolute top-10 left-8 w-24 h-24 bg-african_violet/20 rounded-full blur-lg animate-pulse"></div>
          <div className="absolute top-32 right-12 w-16 h-16 bg-grape/15 rounded-full blur-md animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-eminence/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-32 right-1/4 w-28 h-28 bg-african_violet/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-1/2 left-4 w-12 h-12 bg-grape/10 rounded-full blur-sm animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Enhanced Title */}
            <div className="text-center mb-20">
              <h2 className="font-display font-black text-5xl lg:text-6xl text-eminence mb-6">
                Contact Us
              </h2>
              <p className="text-xl text-jet/70 max-w-2xl mx-auto leading-relaxed">
                Get in touch with us for admissions and inquiries
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info and Quote Container */}
              <div className={`flex flex-col space-y-6 transition-all duration-700 ${
                contactInView ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
              }`}>
                {/* Contact Info Card */}
                <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-gold">
                  <h3 className="text-2xl font-bold text-grape mb-4">Get in Touch</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-african_violet/20 rounded-full flex items-center justify-center">
                        <svg width="20" height="20" fill="currentColor" className="text-grape">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-grape">Address</p>
                        <p className="text-jet/70">{homeData.footer.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-african_violet/20 rounded-full flex items-center justify-center">
                        <svg width="20" height="20" fill="currentColor" className="text-grape">
                          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-grape">Phone</p>
                        <div className="space-y-1">
                          {homeData.footer.phones.map(phone => (
                            <p key={phone} className="text-jet/70">{phone}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-african_violet/20 rounded-full flex items-center justify-center">
                        <svg width="20" height="20" fill="currentColor" className="text-grape">
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-grape">Website</p>
                        <a href={homeData.footer.website} target="_blank" rel="noopener noreferrer" className="text-african_violet hover:text-grape transition-colors">
                          {homeData.footer.website}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Quote Card */}
                <div className="bg-gradient-to-br from-grape to-eminence rounded-xl shadow-lg p-8 text-white relative overflow-hidden flex-1">
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gold/20 rounded-full translate-y-12 -translate-x-12"></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-4xl">💬</div>
                      <div>
                        <h4 className="text-xl font-bold mb-2">Why Choose Seagull Science Academy?</h4>
                        <p className="text-white/90 leading-relaxed">
                          "Education is not preparation for life; education is life itself. At Seagull Science Academy, 
                          we believe in nurturing not just academic excellence, but also character, creativity, and 
                          the courage to dream big."
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/20">
                      <div>
                        <p className="font-semibold text-gold">Our Promise</p>
                        <p className="text-sm text-white/90">Excellence • Dedication • Success</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-white/90">Join us in your</p>
                        <p className="font-bold text-gold">Journey to Success</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className={`transition-all duration-700 ${
                contactInView ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              }`}>
                <div className="bg-white rounded-xl shadow-lg p-8 border-r-4 border-gold h-full">
                  <h3 className="text-2xl font-bold text-grape mb-6">Send us a Message</h3>
                  <form className="space-y-4" onSubmit={handleContactSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        placeholder="Full Name" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-african_violet focus:border-transparent"
                        required
                      />
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-african_violet focus:border-transparent"
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="Admission Inquiry">Admission Inquiry</option>
                        <option value="Course Information">Course Information</option>
                        <option value="Fee Structure">Fee Structure</option>
                        <option value="Batch Details">Batch Details</option>
                        <option value="General Query">General Query</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-african_violet focus:border-transparent"
                      required
                    />
                    <input 
                      type="tel" 
                      placeholder="Phone Number" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-african_violet focus:border-transparent"
                      required
                    />
                    <textarea 
                      placeholder="Your Message" 
                      rows="4"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-african_violet focus:border-transparent resize-none"
                      required
                    ></textarea>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-grape text-white font-bold py-3 px-6 rounded-lg hover:bg-eminence transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                          <Spinner size="sm" />
                          <span>Sending...</span>
                        </div>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </form>
                  
                  {/* Helpful Message */}
                  <div className="mt-6 p-4 bg-african_violet/10 rounded-lg border-l-4 border-african_violet">
                    <div className="flex items-start gap-3">
                      <div className="text-african_violet text-xl">💡</div>
                      <div>
                        <h4 className="font-semibold text-grape text-sm mb-1">What happens next?</h4>
                        <p className="text-jet/70 text-sm leading-relaxed">
                          Our team will review your message and get back to you within 24 hours. 
                          We're here to help with all your academic queries and enrollment questions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Admissions CTA Band */}
        <section className="py-16 bg-eminence text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display font-bold text-3xl lg:text-4xl mb-8">
              {homeData.sections[4].title}
            </h2>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <p className="text-xl text-white/90">Ready to start your journey?</p>
              <div className="flex space-x-4">
                {homeData.sections[4].phones.map((phone, index) => (
                  <a
                    key={phone}
                    href={`tel:${phone}`}
                    className="flex items-center space-x-2 bg-white text-eminence hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-all duration-200 ease-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-african_violet"
                    aria-label={`Call ${phone}`}
                  >
                    <PhoneIcon className="w-5 h-5" />
                    <span>{phone}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      {/* Apply Modal */}
      <ApplyModal
        course={selectedCourse}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
    </>
  );
};

// --- Achievements Carousel for Hero ---
function HeroAchievementsCarousel() {
  const students = STUDENT_ACHIEVEMENTS;
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const intv = setInterval(() => {
      setIndex((idx) => (idx + 1) % students.length);
    }, 3000);
    return () => clearInterval(intv);
  }, [students.length]);
  const student = students[index];
  return (
    <div className="flex flex-col justify-center items-center py-10 w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={student.id || index}
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -30 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="bg-white shadow-2xl rounded-3xl max-w-[530px] min-w-[430px] w-full h-[600px] flex flex-col items-center p-0 border-b-8 border-gold overflow-hidden"
        >
         <div className="flex flex-col h-full w-full">
           {/* Image section: 65% */}
           <div className="flex-1 min-h-0 flex flex-col justify-center items-center py-8" style={{flexBasis: '65%', flexGrow: 1}}>
             <div className="w-[19.2rem] h-[19.2rem] overflow-hidden border-4 border-eminence bg-gradient-to-br from-gold to-amber-300 flex items-center justify-center rounded-2xl">
               <img src={student.image} alt={student.name} className="object-cover w-full h-full rounded-2xl" />
             </div>
           </div>
           {/* Details section: 35% */}
           <div className="flex-none flex flex-col justify-center items-center gap-2 px-8 pb-6" style={{height: '35%'}}>
             <div className="font-bold text-2xl text-grape text-center">{student.name}</div>
             <div className="text-base text-eminence font-semibold text-center">{student.exam}</div>
             <div className="relative flex justify-center items-center my-1 w-full">
               <span className="inline-block text-4xl font-extrabold bg-gradient-to-r from-gold to-amber-300 text-eminence px-10 py-5 rounded-full shadow-lg border-4 border-gold -rotate-2 uppercase tracking-tight outline-white outline outline-2 drop-shadow-lg">
                 {student.score}
               </span>
               <span className="absolute right-4 -top-3 bg-gold text-eminence font-bold text-xs px-2 py-1 rounded-xl shadow-md border-2 border-white">
                 Top Score
               </span>
             </div>
           </div>
         </div>
       </motion.div>
     </AnimatePresence>
   </div>
 );
}

export default Home;
