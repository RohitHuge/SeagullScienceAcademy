import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CountUp from '../components/ui/countup';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Courses', href: '/courses' },
  { name: 'Mentors', href: '/mentor' },
  { name: 'Achievements', href: '/achievements' },
  { name : 'Gallery' , href : '/gallery'},
  { name: 'Contact', href: '/contact' },
  { name: 'Blog' , href : '/#blog'},
];

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

function HeroBanner() {
  return (
    <section className="relative w-full h-[400px] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=1200&q=80)' }}>
      <div className="absolute inset-0 bg-grape opacity-70"></div>
      <div className="relative z-10 flex flex-col items-center text-center text-white w-full">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 drop-shadow-lg mt-12">About Seagull Science Academy</h1>
        <p className="text-lg md:text-2xl font-medium">Making Science Simple and Accessible to upcoming Engineers and Doctors</p>
      </div>
    </section>
  );
}

function Journey() {
  const milestones = [
    { year: '2015', title: 'Founded', desc: 'Seagull Academy was established with a vision to empower students in science.', img: 'https://randomuser.me/api/portraits/men/31.jpg' },
    { year: '2017', title: 'First 100+ Toppers', desc: 'Celebrated our first batch of 100+ toppers in board and entrance exams.', img: 'https://randomuser.me/api/portraits/women/45.jpg' },
    { year: '2020', title: 'Expanded Facilities', desc: 'Opened new state-of-the-art classrooms and labs.', img: 'https://randomuser.me/api/portraits/men/46.jpg' },
    { year: '2023', title: 'National Recognition', desc: 'Recognized as a leading science academy in the region.', img: 'https://randomuser.me/api/portraits/women/47.jpg' },
  ];
  return (
    <section className="py-16 bg-african_violet/10">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-eminence mb-10 text-center">Our Journey</h2>
        <div className="relative flex flex-col items-center">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gold/60 rounded-full -translate-x-1/2 hidden md:block"></div>
          <div className="flex flex-col gap-12 md:gap-0 md:grid md:grid-cols-2 md:items-center">
            {milestones.map((m, i) => (
              <div key={m.year} className={`flex flex-col md:flex-row items-center md:items-start md:justify-${i%2===0?'end':'start'} md:col-start-${i%2===0?1:2} md:col-end-${i%2===0?2:3} md:row-start-${i+1} md:row-end-${i+2} relative z-10`}> 
                <div className="flex flex-col items-center md:items-end md:pr-8 md:pl-0 w-full md:w-auto">
                  <span className="bg-gold text-jet font-bold px-4 py-1 rounded-full mb-2">{m.year}</span>
                  <img src={m.img} alt={m.title} className="w-20 h-20 rounded-full border-4 border-gold mb-2" />
                </div>
                <div className="bg-white rounded-xl shadow p-6 ml-0 md:ml-4 w-full md:w-96">
                  <h3 className="text-xl font-bold text-eminence mb-2">{m.title}</h3>
                  <p className="text-jet">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MessageFromDirector() {
  const ref = useRef();
  const inView = useInView(ref, { threshold: 0.2 });
  return (
    <section className={`py-20 bg-gradient-to-br from-african_violet/20 to-grape/20 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-eminence mb-4">Message from Vikram Sir & Prachi ma'am</h2>
          <div className="w-80 h-1 bg-gold mx-auto rounded-full"></div>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Enhanced Photo Section - Two Photos in Column */}
          <div className="relative flex-shrink-0 flex flex-col gap-6">
            {/* First Photo - Vikram Sir (Top) */}
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-gold rounded-full opacity-60"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-grape rounded-full opacity-40"></div>
              
              {/* Main photo with enhanced styling */}
              <div className="relative">
                <img 
                  src="https://randomuser.me/api/portraits/men/75.jpg" 
                  alt="Vikram Sir" 
                  className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover border-8 border-white shadow-2xl transform hover:scale-105 transition-all duration-300" 
                  style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
                />
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gold to-grape opacity-20 blur-xl transform scale-110"></div>
              </div>
              
              {/* Name label */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-4 py-2 shadow-lg border-2 border-gold">
                <span className="text-sm font-bold text-eminence">Vikram Sir</span>
              </div>
            </div>
            
            {/* Second Photo - Prachi Ma'am (Bottom) */}
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-6 h-6 bg-grape rounded-full opacity-40"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gold rounded-full opacity-60"></div>
              
              {/* Main photo with enhanced styling */}
              <div className="relative">
                <img 
                  src="https://randomuser.me/api/portraits/women/65.jpg" 
                  alt="Prachi Ma'am" 
                  className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover border-8 border-white shadow-2xl transform hover:scale-105 transition-all duration-300" 
                  style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
                />
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gold to-grape opacity-20 blur-xl transform scale-110"></div>
              </div>
              
              {/* Name label */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-4 py-2 shadow-lg border-2 border-gold">
                <span className="text-sm font-bold text-eminence">Prachi Ma'am</span>
              </div>
            </div>
          </div>
          
          {/* Enhanced Content Section */}
          <div className="flex-1 space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-xl border-l-4 border-gold relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gold/10 to-grape/10 rounded-full transform translate-x-16 -translate-y-16"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-1 bg-gold rounded-full"></div>
                  <span className="text-gold font-semibold text-lg">Our Vision</span>
                </div>
                
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  At <span className="font-bold text-eminence">Seagull Science Academy</span>, we believe every student has unique potential waiting to be unlocked. Our mission is to nurture curiosity, foster critical thinking, and provide unwavering support throughout their academic journey.
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  We focus on <span className="font-semibold text-eminence">holistic development</span>, not just academic excellence. Our dedicated faculty is committed to guiding students through every challenge, celebrating every success, and instilling a lifelong love for learning.
                </p>
                
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  We are proud of our toppers, but prouder still of the <span className="font-semibold text-eminence">values and confidence</span> our students carry forward into their future endeavors.
                </p>
                
                <div className="bg-gradient-to-r from-gold/20 to-grape/20 rounded-xl p-4 border-l-4 border-gold">
                  <p className="text-lg text-gray-800 font-medium italic">
                    "Join us and experience a community where teachers are mentors, and every student is family."
                  </p>
                </div>
                
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-8 h-1 bg-eminence rounded-full"></div>
                  <span className="text-xl font-display font-bold text-eminence">Director</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MissionVision() {
  const ref = useRef();
  const inView = useInView(ref, { threshold: 0.15 });
  return (
    <section
      ref={ref}
      className={`py-16 bg-white transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border-l-4 border-gold pl-6 bg-african_violet/10 rounded-xl shadow p-6 flex flex-col items-start">
          <span className="text-3xl mb-2">🎯</span>
          <h3 className="text-xl font-bold text-eminence mb-2">Our Mission</h3>
          <p className="text-jet">To empower students with knowledge, skills, and values to excel in science and life. We strive to create a nurturing environment that inspires curiosity and achievement.</p>
        </div>
        <div className="border-l-4 border-gold pl-6 bg-african_violet/10 rounded-xl shadow p-6 flex flex-col items-start">
          <span className="text-3xl mb-2">🌟</span>
          <h3 className="text-xl font-bold text-eminence mb-2">Our Vision</h3>
          <p className="text-jet">To be a leading science academy recognized for academic excellence, innovation, and holistic student development, shaping future leaders and thinkers.</p>
        </div>
      </div>
    </section>
  );
}

function CoreValues() {
  const ref = useRef();
  const inView = useInView(ref, { threshold: 0.15 });
  const values = [
    { icon: '🤝', title: 'Integrity', desc: 'We uphold honesty and strong moral principles in all our actions.' },
    { icon: '💡', title: 'Innovation', desc: 'We encourage creative thinking and embrace new ideas in education.' },
    { icon: '🎓', title: 'Excellence', desc: 'We strive for the highest standards in teaching and learning.' },
    { icon: '🌱', title: 'Growth', desc: 'We foster continuous improvement and personal development.' },
    { icon: '👨‍🏫', title: 'Mentorship', desc: 'We believe in the power of guidance and support.' },
    { icon: '🌏', title: 'Community', desc: 'We build a supportive and inclusive learning environment.' },
  ];
  return (
    <section
      ref={ref}
      className={`py-16 bg-african_violet/10 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-eminence mb-10 text-center">Core Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <div key={v.title} className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center border-l-4 border-gold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <span className="text-4xl mb-2">{v.icon}</span>
              <h3 className="text-lg font-bold text-eminence mb-2">{v.title}</h3>
              <p className="text-jet">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Philosophy() {
  const ref = useRef();
  const inView = useInView(ref, { threshold: 0.15 });
  const items = [
    { icon: '🔬', title: 'Scientific Temper', desc: 'We nurture curiosity and a spirit of inquiry in every student.' },
    { icon: '🧠', title: 'Critical Thinking', desc: 'We encourage analysis, reasoning, and problem-solving skills.' },
    { icon: '🤗', title: 'Empathy', desc: 'We value understanding and compassion in our academic community.' },
  ];
  return (
    <section
      ref={ref}
      className={`py-16 bg-grape transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gold mb-10 text-center">Educational Philosophy</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div key={item.title} className="bg-eminence rounded-xl shadow p-6 flex flex-col items-center text-center border-l-4 border-gold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <span className="text-4xl mb-2">{item.icon}</span>
              <h3 className="text-lg font-bold text-gold mb-2">{item.title}</h3>
              <p className="text-white">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FacilitiesGallery() {
  const images = [
    { src: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80', caption: 'Modern Classroom' },
    { src: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80', caption: 'Science Lab' },
    { src: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=600&q=80', caption: 'Library' },
    { src: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80', caption: 'Study Area' },
    // { src: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3c8b?auto=format&fit=crop&w=600&q=80', caption: 'Computer Lab' },
    // { src: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80', caption: 'Recreation Room' },
  ];
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-eminence mb-10 text-center">Facilities Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {images.map((img, i) => (
            <div key={img.caption} className="group relative rounded-xl overflow-hidden shadow hover:shadow-xl transition-all duration-300 cursor-pointer">
              <img src={img.src} alt={img.caption} className="aspect-video w-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm py-2 px-3 text-center">{img.caption}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AchievementsRecognition() {
  const ref = useRef();
  const inView = useInView(ref, { threshold: 0.1 });
  const items = [
    { icon: '🏆', title: 'Top Results', desc: 'Selection in JEE, NEET, and Board Exams.', number: 100 },
    { icon: '🎖️', title: 'Awards', desc: 'Recognized by educational bodies for excellence.', number: 10 },
    { icon: '📈', title: 'Growth', desc: 'Rapidly growing student community and alumni network.', number: 400 },
  ];
  return (
    <section className={`py-16 bg-african_violet/10 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} ref={ref}>
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-eminence mb-10 text-center">Achievements & Recognition</h2>
        <div className="flex flex-col md:flex-row gap-8 items-stretch justify-center">
          {items.map((item, i) => (
            <div key={item.title} className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center border-l-4 border-gold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer w-full md:w-1/3 flex-1 min-h-[260px]">
              <span className="text-4xl mb-2">{item.icon}</span>
              <h3 className="text-lg font-bold text-eminence mb-2">{item.title}</h3>
              <p className="text-6xl font-bold text-grape"> <CountUp
                                          from={0}
                                          to={item.number}
                                          separator=" "
                                          direction="up"
                                          duration={2}
                                          className="count-up-text"/>+</p>
              <p className="text-jet">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function About() {
  // Set page title when component mounts
  useEffect(() => {
    document.title = 'About Seagull Science Academy | Leading NEET, CET, JEE Coaching in Bhosari Pune';
  }, []);

  return (
    <div className="font-display bg-white text-jet">
      <Header />
      <HeroBanner />
      <MessageFromDirector />
      <AchievementsRecognition />
      <MissionVision />
      <CoreValues />
      <Philosophy />
      <FacilitiesGallery />
      <Footer />
    </div>
  );
}
