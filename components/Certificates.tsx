'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const certificates = [
    {
        id: 1,
        name: 'SAIGURU SEKARAN',
        role: 'IELTS Academic',
        score: 'IELTS Band 8.0',
        image: '',
        breakdown: [
            { label: 'Listening', score: '9.0' },
            { label: 'Reading', score: '9.0' },
            { label: 'Speaking', score: '7.0' },
            { label: 'Writing', score: '7.0' }
        ]
    },
    {
        id: 2,
        name: 'SHANIA JOSEPH',
        role: 'IELTS Academic',
        score: 'IELTS Band 8.0',
        image: '',
        breakdown: [
            { label: 'Listening', score: '8.5' },
            { label: 'Reading', score: '8.0' },
            { label: 'Speaking', score: '8.0' },
            { label: 'Writing', score: '7.0' }
        ]
    },
    {
        id: 3,
        name: 'Shantanu Accha',
        role: 'IELTS Academic',
        score: 'IELTS Band 7.5',
        image: '',
        breakdown: [
            { label: 'Listening', score: '8.0' },
            { label: 'Reading', score: '8.0' },
            { label: 'Speaking', score: '7.5' },
            { label: 'Writing', score: '7.0' }
        ]
    },
    {
        id: 4,
        name: 'Aakaash M',
        role: 'IELTS Academic',
        score: 'IELTS Band 7.5',
        image: '',
        breakdown: [
            { label: 'Listening', score: '8.5' },
            { label: 'Reading', score: '8.5' },
            { label: 'Speaking', score: '6.5' },
            { label: 'Writing', score: '7.0' }
        ]
    },
    {
        id: 5,
        name: 'Evangeline Libertus',
        role: 'IELTS Academic',
        score: 'IELTS Band 7.5',
        image: '',
        breakdown: [
            { label: 'Listening', score: '8.5' },
            { label: 'Reading', score: '7.0' },
            { label: 'Speaking', score: '7.5' },
            { label: 'Writing', score: '6.5' }
        ]
    },
    {
        id: 6,
        name: 'Jeeva S',
        role: 'IELTS General',
        score: 'IELTS Band 7.5',
        image: '',
        breakdown: [
            { label: 'Listening', score: '8.5' },
            { label: 'Reading', score: '6.5' },
            { label: 'Speaking', score: '7.5' },
            { label: 'Writing', score: '6.5' }
        ]
    },
];

export function Certificates() {
    const [currentIndex, setCurrentIndex] = useState(certificates.length); // Start at first real set
    const containerRef = useRef<HTMLDivElement>(null);
    const [cardWidth, setCardWidth] = useState(280);
    const gap = 24; // Gap between cards (6 * 4 = 24px)

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                // On mobile/tablet (<768px), make card full width of container
                if (window.innerWidth < 768) {
                    setCardWidth(containerRef.current.offsetWidth);
                } else {
                    setCardWidth(280);
                }
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Create infinite loop by triplicating the array
    const infiniteCards = [...certificates, ...certificates, ...certificates];

    const handleNext = () => {
        setCurrentIndex(prev => prev + 1);
    };

    const handlePrev = () => {
        setCurrentIndex(prev => prev - 1);
    };

    // Reset position when reaching clone boundaries (seamless loop)
    const handleTransitionEnd = () => {
        if (currentIndex >= certificates.length * 2) {
            setCurrentIndex(certificates.length);
        } else if (currentIndex < certificates.length) {
            setCurrentIndex(certificates.length * 2 - 1);
        }
    };

    // Calculate exact pixel offset
    const offset = currentIndex * (cardWidth + gap);

    // Determine how many cards are visible for drag constraints
    const visibleCards = cardWidth === 280 ? 4 : 1;

    return (
        <section className="py-20 bg-gradient-to-b from-white to-blue-50/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-5xl font-black mb-4 text-gray-900 tracking-tight"
                    >
                        Our{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-red-500 to-red-600">Global Achievers</span>
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        whileInView={{ opacity: 1, scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-24 h-1 bg-gradient-to-r from-blue-500 via-red-400 to-red-600 mx-auto mb-6"
                    />
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-gray-600 font-['Inter'] text-lg max-w-2xl mx-auto leading-relaxed"
                    >
                        Celebrating the exceptional scores and verified milestones of our Sparkle Scholars in IELTS, TOEFL, PTE, and beyond.
                    </motion.p>
                </div>

                {/* Cards Container with Navigation */}
                {/* Cards Container with Navigation */}
                <div className="relative max-w-[1216px] mx-auto mb-6 md:mb-0">
                    {/* Left Arrow - Desktop Only */}
                    <button
                        onClick={handlePrev}
                        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-20 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl border border-gray-200 items-center justify-center text-gray-600 hover:text-blue-600 hover:scale-110 active:scale-95 transition-all duration-300 group"
                        aria-label="Previous card"
                    >
                        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" strokeWidth={2.5} />
                    </button>

                    {/* Right Arrow - Desktop Only */}
                    <button
                        onClick={handleNext}
                        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-20 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl border border-gray-200 items-center justify-center text-gray-600 hover:text-blue-600 hover:scale-110 active:scale-95 transition-all duration-300 group"
                        aria-label="Next card"
                    >
                        <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
                    </button>

                    {/* Carousel Container */}
                    <div className="overflow-hidden" ref={containerRef}>
                        <motion.div
                            className="flex gap-6"
                            drag="x"
                            dragConstraints={{ left: -(infiniteCards.length - visibleCards) * (cardWidth + gap), right: 0 }}
                            dragElastic={0.1}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = offset.x * velocity.x;
                                const threshold = 50; // Minimum drag distance to trigger navigation

                                // If dragged more than threshold to the left, go next
                                if (offset.x < -threshold) {
                                    handleNext();
                                }
                                // If dragged more than threshold to the right, go prev
                                else if (offset.x > threshold) {
                                    handlePrev();
                                }
                                // Otherwise, snap back to current position (handled by animate prop)
                            }}
                            animate={{ x: -offset }}
                            onAnimationComplete={handleTransitionEnd}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        >
                            {infiniteCards.map((cert, index) => (
                                <div key={`${cert.id}-${index}`} className="flex-shrink-0" style={{ width: `${cardWidth}px` }}>
                                    <CertificateCard cert={cert} />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Navigation Controls (Mobile: Inline with Dots, Desktop: Dots Only) */}
                <div className="flex items-center justify-center gap-4 mt-2 md:mt-8">
                    {/* Mobile Left Arrow */}
                    <button
                        onClick={handlePrev}
                        className="md:hidden w-10 h-10 bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center text-gray-600 active:scale-95 transition-all"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    {/* Dots */}
                    <div className="flex justify-center gap-2">
                        {certificates.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(certificates.length + idx)}
                                className={`transition-all duration-300 rounded-full ${idx === currentIndex % certificates.length
                                    ? 'w-8 h-2 bg-gradient-to-r from-blue-600 to-red-500'
                                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                                    }`}
                                aria-label={`Go to position ${idx + 1}`}
                            />
                        ))}
                    </div>

                    {/* Mobile Right Arrow */}
                    <button
                        onClick={handleNext}
                        className="md:hidden w-10 h-10 bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center text-gray-600 active:scale-95 transition-all"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div >
        </section >
    );
}

function CertificateCard({ cert }: { cert: any }) {
    const [isFlipped, setIsFlipped] = useState(false);

    // Dynamic modules based on score type
    const getModules = (scoreText: string) => {
        if (scoreText.includes('IELTS') || scoreText.includes('PTE') || scoreText.includes('TOEFL') || scoreText.includes('OET')) return [
            { label: 'Listening', score: '8.5' },
            { label: 'Reading', score: '9.0' },
            { label: 'Writing', score: '7.5' },
            { label: 'Speaking', score: '8.0' }
        ];
        return [
            { label: 'Quant', score: '170' },
            { label: 'Verbal', score: '165' },
            { label: 'AWA', score: '5.0' },
            { label: 'IR', score: '8' }
        ];
    };
    const modules = cert.breakdown || getModules(cert.score);

    return (
        <div
            className="relative w-full h-[373px] cursor-pointer"
            style={{ perspective: '1000px' }}
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <motion.div
                className="relative w-full h-full"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateX: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
            >
                {/* FRONT SIDE */}
                <div
                    className="absolute w-full h-full rounded-2xl overflow-hidden shadow-lg bg-white flex flex-col"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    {/* Top Gradient Bar */}
                    <div className="h-1.5 bg-gradient-to-r from-blue-600 to-red-500" />

                    {/* Content Area */}
                    <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
                        {/* Score Badge */}
                        <div className="absolute top-4 right-4">
                            <div className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-red-500 rounded-xl shadow-md flex flex-col items-center">
                                <span className="text-[9px] font-bold uppercase tracking-wider text-white/80">Score</span>
                                <span className="text-sm font-black text-white">
                                    {cert.score.replace(/[^0-9.]/g, '')}
                                </span>
                            </div>
                        </div>

                        {/* Name Section */}
                        <div className="text-center mt-8">
                            <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-red-500 rounded-full mx-auto mb-4" />
                            <h3 className="text-xl font-['Outfit'] font-bold text-gray-900 mb-2 uppercase">
                                {cert.name}
                            </h3>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{cert.role || 'Sparkle Scholar'}</p>
                        </div>

                        {/* Score Display */}
                        <div className="mt-6">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">
                                Certified
                            </span>
                            <p className="text-lg font-bold text-gray-700 mt-3 text-center">
                                {cert.score}
                            </p>
                        </div>

                        {/* Click hint */}
                        <p className="text-xs text-gray-400 mt-4 absolute bottom-4">Click to Flip</p>
                    </div>
                </div>

                {/* BACK SIDE */}
                <div
                    className="absolute w-full h-full rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-100 flex flex-col p-6"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}
                >
                    {/* Top Gradient Bar */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-red-400 to-red-600" />

                    {/* Header */}
                    <div className="text-center mb-4 mt-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Award className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1 uppercase">{cert.name}</h3>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Score Breakdown</p>
                    </div>

                    {/* Module Scores */}
                    <div className="flex-1 flex flex-col justify-center space-y-2.5">
                        {modules.map((mod: { label: string; score: string }, i: number) => (
                            <div key={i} className="bg-gradient-to-r from-blue-50 to-red-50 rounded-lg p-2.5 flex items-center justify-between border border-blue-100">
                                <span className="text-xs font-semibold text-gray-700">{mod.label}</span>
                                <span className="text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600">{mod.score}</span>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="mt-4 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-red-600 rounded-full">
                            <Star className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
                            <span className="text-xs font-bold text-white">{cert.score}</span>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-2">Click to flip back</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
