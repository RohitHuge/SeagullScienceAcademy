import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneOutlined, WhatsAppOutlined, CloseOutlined } from '@ant-design/icons';

export default function CETCrashCoursePopup() {
    const [isExpanded, setIsExpanded] = useState(false);

    const features = [
        { icon: '📚', text: 'Complete CET Syllabus Revision' },
        { icon: '💪', text: 'Daily Practice & Drill Sessions' },
        { icon: '📝', text: 'Full-Length Mock Tests (Online + Offline)' },
        { icon: '⚡', text: 'Speed & Accuracy Training' },
        { icon: '🎯', text: 'PYQ + Expected Question Solving' },
        { icon: '👨‍🏫', text: 'Expert Faculty for PCM / PCB' },
        { icon: '🤝', text: 'Personal Doubt-Solving Assistance' },
        { icon: '👥', text: 'Limited Students for Better Focus' },
    ];

    const handleCall = (phone) => {
        window.location.href = `tel:${phone}`;
    };

    const handleWhatsApp = (phone) => {
        window.open(`https://wa.me/91${phone}?text=Hi! I'm interested in the CET Crash Course 2026`, '_blank');
    };

    const fees = [
        { course: 'PCM', price: '₹ 8,999' },
        { course: 'PCB', price: '₹ 8,999' },
        { course: 'PCMB', price: '₹ 11,999' },
    ];

    return (
        <div className="fixed top-20 right-0 scale-[0.8] md:top-6 md:right-6 z-50 origin-top-right md:scale-100 lg:top-24 lg:right-1">
            <AnimatePresence mode="wait">
                {!isExpanded ? (
                    // Collapsed State
                    <motion.div
                        key="collapsed"
                        initial={{ opacity: 0, scale: 0.8, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        onClick={() => setIsExpanded(true)}
                        className="cursor-pointer group"
                    >
                        <div className="w-64 sm:w-72 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-yellow-400/30 p-4 sm:p-5 hover:shadow-yellow-400/20 hover:shadow-2xl transition-all duration-300">
                            {/* Glow effect */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            <div className="relative z-10">
                                {/* Header */}
                                <div className="flex items-start gap-2 mb-2">
                                    <span className="text-xl sm:text-2xl">🚀</span>
                                    <div className="flex-1">
                                        <h3 className="text-grape font-bold text-base sm:text-lg leading-tight">
                                            CET CRASH COURSE
                                            <span className="block text-xs sm:text-sm font-medium text-gray-600">2025-26 Academic Year</span>
                                        </h3>
                                    </div>
                                </div>

                                {/* Courses Offered Tag */}
                                <div className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded mb-2">
                                    📍 COURSES: PCM / PCB / PCMB
                                </div>

                                {/* Urgency Banner */}
                                <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-center animate-pulse">
                                    LIMITED SEATS ONLY!
                                </div>

                                {/* Expand Hint */}
                                <div className="flex items-center justify-center gap-2 mt-3 text-grape text-xs sm:text-sm font-medium">
                                    <span>View Details & Fees</span>
                                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M4 6l3 3 3-3" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    // Expanded State
                    <motion.div
                        key="expanded"
                        initial={{ opacity: 0, scale: 0.9, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="relative"
                    >
                        <div className="w-80 sm:w-96 max-h-[85vh] overflow-y-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-yellow-400/40 p-5 sm:p-6 custom-scrollbar">
                            {/* Close Button */}
                            <button
                                onClick={() => setIsExpanded(false)}
                                className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10"
                                aria-label="Close"
                            >
                                <CloseOutlined className="text-gray-600 text-xs sm:text-sm" />
                            </button>

                            {/* Header */}
                            <div className="mb-4 pr-8">
                                <div className="flex items-start gap-2 mb-2">
                                    <span className="text-2xl sm:text-3xl">🚀</span>
                                    <h3 className="text-grape font-bold text-lg sm:text-xl leading-tight">
                                        CET CRASH COURSE
                                        <span className="block text-sm font-medium text-gray-600">Academic Year 2025-26</span>
                                    </h3>
                                </div>
                                <div className="bg-blue-50 border border-blue-100 rounded-lg p-2 text-center">
                                    <p className="text-xs sm:text-sm font-bold text-blue-800">
                                        📍 COURSES OFFERED
                                    </p>
                                    <p className="text-xs sm:text-sm font-medium text-gray-700">
                                        ✔️ PCM / PCB / PCMB
                                    </p>
                                </div>
                            </div>

                            {/* What We Provide */}
                            <div className="mb-5">
                                <h4 className="text-grape font-bold text-sm sm:text-base mb-3 flex items-center gap-2">
                                    <span className="text-gold text-lg sm:text-xl">📘</span>
                                    WHAT WE PROVIDE:
                                </h4>
                                <div className="space-y-2">
                                    <div className="bg-yellow-50/80 rounded-lg p-2.5 border border-yellow-100/50 text-xs sm:text-sm text-gray-800">
                                        <p>✔️ PRINTED NOTES & 20 MODULES</p>
                                        <p>✔️ 4 CET BOOKS & MOCK TESTS</p>
                                        <p>✔️ RECORDED VIDEO LECTURES</p>
                                        <p>✔️ COMPLETE 11th & 12th SYLLABUS</p>
                                        <p>✔️ 8 HOURS DAILY LECTURES</p>
                                    </div>

                                    {/* Detailed Features List */}
                                    <div className="space-y-1.5 mt-2">
                                        {features.map((feature, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 + 0.2, duration: 0.3 }}
                                                className="flex items-start gap-2"
                                            >
                                                <span className="text-sm">{feature.icon}</span>
                                                <span className="text-xs sm:text-sm text-gray-700">{feature.text}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Fee Structure */}
                            <div className="mb-5">
                                <h4 className="text-grape font-bold text-sm sm:text-base mb-3 border-b-2 border-yellow-200 inline-block">
                                    💰 Fee Structure
                                </h4>
                                <div className="grid grid-cols-1 gap-2">
                                    {fees.map((fee, idx) => (
                                        <div key={idx} className="flex justify-between items-center bg-gray-50 p-2 rounded border border-gray-100">
                                            <span className="font-bold text-gray-700">{fee.course}</span>
                                            <span className="font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">{fee.price}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Contact Section */}
                            <div className="border-t border-gray-200 pt-4">
                                <div className="space-y-2 mb-3">
                                    {/* WhatsApp Button */}
                                    <button
                                        onClick={() => handleWhatsApp('9096705353')}
                                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-md text-xs sm:text-sm"
                                    >
                                        <WhatsAppOutlined className="text-base sm:text-lg" />
                                        <span>WhatsApp: 9096705353</span>
                                    </button>

                                    {/* Call Button */}
                                    <button
                                        onClick={() => handleCall('9096705353')}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-md text-xs sm:text-sm"
                                    >
                                        <PhoneOutlined className="text-base sm:text-lg" />
                                        <span>Call: 9096705353</span>
                                    </button>
                                </div>

                                {/* Info Footer */}
                                <div className="text-center text-xs text-gray-600 font-medium">
                                    <p className="mb-2">📍 FOR MORE INFORMATION :</p>
                                    <p className="font-bold text-grape">9096705353 / 9284635306</p>
                                </div>

                                {/* Urgency Banner */}
                                <div className="mt-3 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-center animate-pulse shadow-lg">
                                    ⚡ ADMISSIONS OPEN — LIMITED SEATS ONLY! ⚡
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
