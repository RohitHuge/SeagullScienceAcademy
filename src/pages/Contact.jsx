import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { sendMessage } from '../data/controllers';
import ChatbotWidget from '../components/ui/ChatbotWidget';
import { Helmet, HelmetProvider } from 'react-helmet-async';
// import Header from '../components/Header';

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

function HeroSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-grape via-eminence to-purple-900 flex flex-col items-center justify-center text-center relative overflow-hidden">
      {/* Background Design Elements */}
      <div className="absolute top-10 left-8 w-24 h-24 bg-african_violet/20 rounded-full blur-lg animate-pulse"></div>
      <div className="absolute top-32 right-12 w-16 h-16 bg-white/15 rounded-full blur-md animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-african_violet/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-32 right-1/4 w-28 h-28 bg-white/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      
      <div className="relative z-10">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 animate-fade-in">Get in Touch with Us</h1>
        <p className="text-lg md:text-xl text-white/90 font-medium animate-fade-in" style={{ animationDelay: '0.2s' }}>We'd love to hear from you and answer any questions you may have</p>
      </div>
    </section>
  );
}

function ContactDetails() {
  const ref = useRef();
  const inView = useInViewOnce(ref, { threshold: 0.1 });
  
  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl shadow-lg p-8 border border-gray-100 border-b-4 border-b-gold transition-all duration-700 hover:shadow-xl transform hover:scale-[1.02] ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
    >
      <h2 className="text-2xl font-bold text-grape mb-6 font-display">Contact Information</h2>
      
      <div className="space-y-6">
        {/* Address */}
        <div className="flex items-start gap-4 group">
          <div className="w-12 h-12 bg-african_violet/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-african_violet/30 transition-all duration-300 transform group-hover:scale-110">
            <svg width="24" height="24" fill="#6600a6" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-grape mb-2 group-hover:text-eminence transition-colors duration-300">Address</h3>
            <p className="text-jet/70 leading-relaxed group-hover:text-jet/90 transition-colors duration-300">
              2nd floor, Arham Plaza, Near PNG Jewellers,<br />
              Gavhanewasti, Bhosari, Pune, Maharashtra
            </p>
          </div>
        </div>

        {/* Phone Numbers */}
        <div className="flex items-start gap-4 group">
          <div className="w-12 h-12 bg-african_violet/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-african_violet/30 transition-all duration-300 transform group-hover:scale-110">
            <svg width="24" height="24" fill="#6600a6" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-grape mb-2 group-hover:text-eminence transition-colors duration-300">Phone Numbers</h3>
            <div className="space-y-2">
              <a href="tel:+919096705353" className="block text-jet/70 hover:text-grape transition-colors duration-300 group-hover:text-grape">
                +91 90967 05353
              </a>
              <a href="tel:+919284635306" className="block text-jet/70 hover:text-grape transition-colors duration-300 group-hover:text-grape">
                +91 92846 35306
              </a>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-4 group">
          <div className="w-12 h-12 bg-african_violet/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-african_violet/30 transition-all duration-300 transform group-hover:scale-110">
            <svg width="24" height="24" fill="#6600a6" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-grape mb-2 group-hover:text-eminence transition-colors duration-300">Email</h3>
            <a href="mailto:info@seagullacademy.in" className="text-jet/70 hover:text-grape transition-colors duration-300 group-hover:text-grape">
              info@seagullacademy.in
            </a>
          </div>
        </div>

        {/* Business Hours */}
        <div className="flex items-start gap-4 group">
          <div className="w-12 h-12 bg-african_violet/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-african_violet/30 transition-all duration-300 transform group-hover:scale-110">
            <svg width="24" height="24" fill="#6600a6" viewBox="0 0 24 24">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-grape mb-2 group-hover:text-eminence transition-colors duration-300">Business Hours</h3>
            <p className="text-jet/70 group-hover:text-jet/90 transition-colors duration-300">
              Monday - Saturday: 8:00 AM - 8:00 PM<br />
              Sunday: 9:00 AM - 6:00 PM
            </p>
          </div>
        </div>

        {/* Website */}
        <div className="flex items-start gap-4 group">
          <div className="w-12 h-12 bg-african_violet/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-african_violet/30 transition-all duration-300 transform group-hover:scale-110">
            <svg width="24" height="24" fill="#6600a6" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1.08-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-grape mb-2 group-hover:text-eminence transition-colors duration-300">Website</h3>
            <a href="https://www.seagullacademy.in" target="_blank" rel="noopener noreferrer" className="text-jet/70 hover:text-grape transition-colors duration-300 group-hover:text-grape">
              www.seagullacademy.in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactForm() {
  const ref = useRef();
  const inView = useInViewOnce(ref, { threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      let res = await sendMessage(formData.name, formData.subject, formData.phone, formData.email, formData.message);

      if(res.success === true){
        setSubmitStatus('success');
      }else{
        setSubmitStatus('error');
      }
     
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
       
      
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl shadow-lg p-8 border border-gray-100 border-b-4 border-b-gold transition-all duration-700 hover:shadow-xl transform hover:scale-[1.02] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    >
      <h2 className="text-2xl font-bold text-grape mb-6 font-display">Send us a Message</h2>
      
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2 text-green-800">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span className="font-medium">Message sent successfully! We'll get back to you soon.</span>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2 text-red-800">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span className="font-medium">Failed to send message. Please try again.</span>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-jet/80 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-african_violet focus:border-transparent transition-all duration-300 hover:border-african_violet/50"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-jet/80 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-african_violet focus:border-transparent transition-all duration-300 hover:border-african_violet/50"
            placeholder="Enter your email address"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-jet/80 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-african_violet focus:border-transparent transition-all duration-300 hover:border-african_violet/50"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-jet/80 mb-2">
            Subject *
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-african_violet focus:border-transparent transition-all duration-300 hover:border-african_violet/50"
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

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-jet/80 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-african_violet focus:border-transparent transition-all duration-300 hover:border-african_violet/50 resize-none"
            placeholder="Tell us how we can help you..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-grape to-eminence hover:from-eminence hover:to-grape text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border-b-4 border-b-gold"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Sending Message...</span>
            </div>
          ) : (
            'Send Message'
          )}
        </button>
      </form>
    </div>
  );
}

function GoogleMap() {
  const ref = useRef();
  const inView = useInViewOnce(ref, { threshold: 0.1 });
  
  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 border-b-4 border-b-gold transition-all duration-700 hover:shadow-xl transform hover:scale-[1.02] h-full ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
    >
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-grape font-display">Our Location</h2>
        <p className="text-jet/60 mt-2">Find us at Arham Plaza, Gavhanewasti, Bhosari</p>
      </div>
      <div className="h-80 md:h-96">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.9997998736562!2d73.84744007595818!3d18.619078766156292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c77930000001%3A0x54be441ad154a886!2sSeagull%20Academy!5e0!3m2!1sen!2sin!4v1755173861818!5m2!1sen!2sin" 
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Seagull Science Academy Location"
        ></iframe>
      </div>
    </div>
  );
}

function ContactSection() {
  return (
    <section className="py-16 bg-african_violet/10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Desktop Layout - Grid of 4 cards: 2 upper, 2 lower */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0">
          {/* Upper Row - 2 cards side by side with equal heights */}
          <div className="h-fit">
            <ContactDetails />
          </div>
          <div className="h-fit">
            <GoogleMap />
          </div>
          
          {/* Lower Row - Contact Form and Chatbot side by side */}
          <div className="lg:col-span-1 h-fit">
            <ContactForm />
          </div>
          <div className="lg:col-span-1 h-fit">
            <ChatbotWidget />
          </div>
        </div>

        {/* Mobile Layout - Stacked */}
        <div className="lg:hidden space-y-8">
          <ContactDetails />
          <GoogleMap />
          <ContactForm />
          <ChatbotWidget />
        </div>
      </div>
    </section>
  );
}

export default function Contact() {
  // Set page title when component mounts
  useEffect(() => {
    document.title = 'Contact Us | Seagull Science Academy Bhosari Pune - NEET, CET, JEE Coaching';
  }, []);

  return (
    <>
    <HelmetProvider>
    <Helmet>
        {/* Basic SEO */}
        <title>Contact Us | Seagull Science Academy</title>
        <meta
          name="description"
          content="Get in touch with Seagull Science Academy. Visit us at Arham Plaza, Bhosari, Maharashtra or call +91 9096705353 / +91 9284635306. Email: seagullscienceacademy@gmail.com."
        />
        <meta
          name="keywords"
          content="Seagull Science Academy contact, Seagull Science Academy address, coaching classes Bhosari contact, NEET JEE coaching contact"
        />

        {/* Open Graph for social sharing */}
        <meta property="og:title" content="Contact Us | Seagull Science Academy" />
        <meta
          property="og:description"
          content="Reach out to Seagull Science Academy for admissions, courses, and enquiries. Located at Arham Plaza, Near PNG Jewellers, Bhosari, Maharashtra."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://seagullacadmy.in/contact"
        />
        <meta
          property="og:image"
          content="https://seagullacadmy.in/logo.png"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us | Seagull Science Academy" />
        <meta
          name="twitter:description"
          content="Have questions? Contact Seagull Science Academy via phone, email, or visit us at Arham Plaza, Bhosari, Maharashtra."
        />
        <meta
          name="twitter:image"
          content="https://seagullacadmy.in/logo.png"
        />

        {/* Local Business / Contact info for SEO */}
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Bhosari, Maharashtra" />
        <meta name="geo.position" content="18.6279;73.8531" />
        <meta name="ICBM" content="18.6279, 73.8531" />
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Seagull Science Academy",
            "url": "https://seagullacadmy.in",
            "logo": "https://seagullacadmy.in/logo.png",
            "image": "https://seagullacadmy.in/logo.png",
            "description": "Seagull Science Academy provides expert coaching for NEET, JEE, MHT-CET, NDA, and 6th-12th Science (PCMB). Located in Bhosari, Maharashtra.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "2nd floor, Arham Plaza, Near PNG Jewellers, Gavhanewasti",
              "addressLocality": "Bhosari",
              "addressRegion": "Maharashtra",
              "postalCode": "411039",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 18.6279,
              "longitude": 73.8531
            },
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "telephone": "+91-9096705353",
                "contactType": "customer service",
                "areaServed": "IN",
                "availableLanguage": "English, Hindi, Marathi"
              },
              {
                "@type": "ContactPoint",
                "telephone": "+91-9284635306",
                "contactType": "admissions",
                "areaServed": "IN",
                "availableLanguage": "English, Hindi, Marathi"
              }
            ],
            "email": "seagullscienceacademy@gmail.com",
            "sameAs": [
              "https://www.facebook.com/seagullscienceacademy",
              "https://www.instagram.com/seagullscienceacademy"
            ],
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "08:00",
                "closes": "20:00"
              },
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Sunday",
                "opens": "09:00",
                "closes": "18:00"
              }
            ]
          }
          `}
        </script>
      </Helmet>
    <div className="font-display bg-white text-jet min-h-screen">
      <Header />
      <HeroSection />
      <ContactSection />
      <Footer />
    </div>
    </HelmetProvider>
    </>
  );
}
