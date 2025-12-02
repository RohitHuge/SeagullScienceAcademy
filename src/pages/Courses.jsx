import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { sendApplication } from '../data/controllers';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export const COURSES = [
  {
    id: 1,
    title: 'IIT-JEE Intigrated Course',
    classes: '11th & 12th Standard',
    subjects: ['Mathematics', 'Science', 'English', 'Social Studies'],
    fee: '₹30,000/year',
    duration: '2 year',
    description: 'Board + Competitive exam preparation for 11th & 12th students.'
  },
  {
    id: 2,
    title: 'NEET-UG Intigrated Course',
    classes: '11th & 12th Standard',
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
    fee: '₹40,000/year',
    duration: '2 year',
    description: 'Board + NEET preparation for medical aspirants.'
  },
  {
    id: 3,
    title: 'MHT-CET Intigrated Course',
    classes: '11th & 12th Standard',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    fee: '₹35,000',
    duration: '2 year',
    description: 'Board + MHT-CET preparation for engineering aspirants.'
  },
  {
    id: 4,
    title: 'MHT-CET ',
    classes: '12th Standard & Droppers',
    subjects: ['Physics', 'Chemistry', 'Biology'],
    fee: '₹35,000',
    duration: '2 year',
    description: 'MHT-CET focused preparation for 12th & droppers.'
  },
  {
    id: 5,
    title: 'Foundation for 9 & 10',
    classes: '9th & 10th Standard',
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
    fee: '₹35,000/year',
    duration: '1 year',
    description: 'Strong foundation for 9th & 10th students.'
  },
  {
    id: 6,
    title: 'MHT-CER Crash Course',
    classes: '12th Standard',
    subjects: ['Mathematics', 'Science', 'English'],
    fee: '₹20,000/year',
    duration: '2 month',
    description: 'Intensive MHT-CET crash course for quick preparation.'
  },
  // {
  //   id: 7,
  //   title: 'NDA Preparation',
  //   classes: '12th Standard & Droppers',
  //   subjects: ['Mathematics', 'General Knowledge', 'English'],
  //   fee: '₹25,000',
  //   duration: 'September to March',
  //   description: 'Comprehensive preparation for National Defence Academy entrance exam. Covers all required subjects with military aptitude training.'
  // }
];

export function ApplyModal({ course, isOpen, onClose }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [fade, setFade] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setFade(true);
      setForm({ name: '', phone: '', email: '', message: '' });
      setTouched({});
      setSubmitted(false);
    } else {
      setTimeout(() => setFade(false), 300);
    }
  }, [isOpen]);
  
  if (!isOpen && !fade) return null;
  
  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };
  
  const handleBlur = e => {
    setTouched(t => ({ ...t, [e.target.name]: true }));
  };
  
  const validate = () => {
    return {
      name: !form.name.trim(),
      phone: !form.phone.trim() || !/^\d{7,15}$/.test(form.phone.trim()),
      email: !form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()),
    };
  };
  
  const errors = validate();
  const isValid = !errors.name && !errors.phone && !errors.email;
  
  const handleSubmit = async e => {
    e.preventDefault();
    setTouched({ name: true, phone: true, email: true });
    if (!isValid) return;
    // setSubmitted(true);
    // Demo: log to console
    // console.log({ ...form, course: course?.title });
    try{
      let res = await sendApplication(form.name, course?.title, form.phone, form.email, form.message);
      if(res.success === true){
        setSubmitted(true);
      }else{
        setSubmitted(false);
      }
    }catch(err){
      console.log("Error sending application:", err);
      setSubmitted(false);
    }
  };
  
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
    >
      <div
        className={`relative bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 p-8 transition-all duration-300 font-display animate-fade-in ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        style={{ borderRadius: 16, maxWidth: 600 }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-grape transition-colors"
          aria-label="Close modal"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M6 18L18 6" /></svg>
        </button>
        
        {!submitted ? (
          <>
            <h2 className="text-2xl font-bold text-grape mb-2 font-display text-center">Apply for {course?.title}</h2>
            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-grape mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={`w-full px-4 py-3 rounded-lg border ${errors.name && touched.name ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-african_violet focus:border-transparent transition-colors`}
                  placeholder="Enter your full name"
                />
                {errors.name && touched.name && <div className="text-red-500 text-xs mt-1">Full Name is required</div>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-grape mb-1">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={`w-full px-4 py-3 rounded-lg border ${errors.phone && touched.phone ? 'border-red-400' : 'border-gray-300'} focus:ring-2 focus:ring-african_violet focus:border-transparent transition-colors`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && touched.phone && <div className="text-red-500 text-xs mt-1">Valid phone number is required</div>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-grape mb-1">Email*</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-african_violet focus:border-transparent transition-colors"
                  placeholder="Enter your email address"
                />
                {errors.email && touched.email && <div className="text-red-500 text-xs mt-1">Valid email is required</div>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-grape mb-1">Message / Query (optional)</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-african_violet focus:border-transparent transition-colors resize-none"
                  rows={4}
                  placeholder="Your message or query..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-grape text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-eminence hover:text-white transition-all duration-300 transform hover:scale-105"
                style={{ marginTop: 16 }}
              >
                Submit Application
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <svg width="64" height="64" fill="#f2c94c" viewBox="0 0 24 24" className="mb-4"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
            <div className="text-2xl font-bold text-grape mb-2 font-display text-center">Thank you!</div>
            <div className="text-lg text-gray-700 text-center">We'll get back to you soon.</div>
          </div>
        )}
      </div>
    </div>
  );
}

function useInView(ref, options = {}) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      options
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options]);
  return inView;
}

function CourseCard({ course, onApply, onCardClick, animate, delay }) {
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    if (animate) {
      const timeout = setTimeout(() => setShow(true), delay);
      return () => clearTimeout(timeout);
    } else {
      setShow(false);
    }
  }, [animate, delay]);

  return (
    <div
      className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:scale-[1.03] hover:-translate-y-2 cursor-pointer border border-african_violet/20 hover:border-african_violet/40 flex flex-col h-full overflow-hidden transition-all duration-700 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      onClick={onCardClick}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Animated top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-grape via-african_violet to-eminence transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-african_violet/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out"></div>
      
      {/* Content */}
      <div className="relative z-10 p-6 space-y-4 flex-1 flex flex-col">
        <div>
          <h3 className="text-2xl font-bold text-eminence mb-2 font-display group-hover:text-grape transition-all duration-500">{course.title}</h3>
          <p className="text-african_violet font-medium">{course.classes}</p>
        </div>
        
        <div>
          <h4 className="text-lg font-bold text-eminence mb-2">Subjects Covered:</h4>
          <div className="flex flex-wrap gap-2">
            {course.subjects.map(subject => (
              <span key={subject} className="bg-african_violet/20 text-grape px-3 py-1 rounded-full text-sm font-medium group-hover:bg-grape/20 group-hover:text-eminence transition-all duration-500">
                {subject}
              </span>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="text-lg font-bold text-eminence mb-1">Duration:</h4>
            <p className="text-jet/70">{course.duration}</p>
          </div>
        </div>
        
        <div className="flex-1" />
      </div>
      
      {/* Apply Button */}
      <div className="relative z-10 p-6 pt-0">
        <button
          onClick={e => {
            e.stopPropagation();
            onApply(course);
          }}
          className="w-full bg-gradient-to-r from-grape to-eminence hover:from-eminence hover:to-grape text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 font-display group-hover:shadow-2xl"
        >
          Apply Now
        </button>
      </div>
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-grape/5 to-eminence/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out"></div>
      
      {/* Subtle floating animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-out transform translate-y-full group-hover:translate-y-0"></div>
    </div>
  );
}

function CoursesSection() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef();
  const inView = useInView(sectionRef, { threshold: 0.1 });

  const openModal = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCourse(null), 300);
  };

  return (
    <section className="py-20 bg-african_violet/10 relative overflow-hidden" ref={sectionRef}>
      {/* Background Design Elements */}
      <div className="absolute top-10 left-8 w-24 h-24 bg-african_violet/20 rounded-full blur-lg animate-pulse"></div>
      <div className="absolute top-32 right-12 w-16 h-16 bg-grape/15 rounded-full blur-md animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-eminence/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-32 right-1/4 w-28 h-28 bg-african_violet/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute top-1/2 left-4 w-12 h-12 bg-grape/10 rounded-full blur-sm animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-display font-black text-eminence mb-6">Our Courses</h1>
          <p className="text-xl text-jet/70 max-w-2xl mx-auto leading-relaxed">
            Comprehensive preparation programs designed to help you excel in your academic journey
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COURSES.map((course, idx) => (
            <CourseCard
              key={course.id}
              course={course}
              onCardClick={() => openModal(course)}
              onApply={openModal}
              animate={inView}
              delay={inView ? idx * 150 : 0}
            />
          ))}
        </div>
        
        <ApplyModal
          course={selectedCourse}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </div>
    </section>
  );
}

export default function Courses() {
  // Set page title when component mounts
  useEffect(() => {
    document.title = 'Courses at Seagull Science Academy | NEET, CET, JEE & Foundation Coaching in Bhosari Pune';
  }, []);

  return (
    <>
    <HelmetProvider>
    <Helmet>
        {/* Basic SEO */}
        <title>Courses | Seagull Science Academy</title>
        <meta
          name="description"
          content="Explore Seagull Science Academy’s courses including NEET, IIT-JEE, MHT-CET, NDA preparation, and Foundation batches (6th–12th). Expert mentors, daily tests, and career guidance."
        />
        <meta
          name="keywords"
          content="Seagull Science Academy courses, NEET coaching Pune, JEE coaching Pune, CET coaching, NDA preparation, foundation classes 6th to 12th"
        />

        {/* Open Graph for social sharing */}
        <meta property="og:title" content="Seagull Science Academy Courses" />
        <meta
          property="og:description"
          content="Choose from NEET, JEE, CET, NDA, and Foundation batches at Seagull Science Academy. Daily coaching, expert mentors, mock tests, and career guidance."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://seagullacadmy.in/courses"
        />
        <meta
          property="og:image"
          content="https://seagullacadmy.in/logo.png"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Courses | Seagull Science Academy"
        />
        <meta
          name="twitter:description"
          content="NEET, JEE, CET, NDA, and Foundation courses at Seagull Science Academy. Learn with expert mentors and structured programs."
        />
        <meta
          name="twitter:image"
          content="https://seagullacadmy.in/logo.png"
        />
      </Helmet>
    <div className="font-display bg-white text-jet min-h-screen">
      <Header />
      <CoursesSection />
      <Footer />
    </div>
    </HelmetProvider>
    </>
  );
}
