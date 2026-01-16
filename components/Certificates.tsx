'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote, Award } from 'lucide-react';

const certificates = [
    { id: 1, name: 'Priya Sharma', score: 'IELTS Band 8.5', image: 'https://randomuser.me/api/portraits/women/63.jpg' },
    { id: 2, name: 'Rahul Verma', score: 'TOEFL 112', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 3, name: 'Anjali Gupta', score: 'GRE 328', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 4, name: 'Vikram Singh', score: 'PTE 88', image: 'https://randomuser.me/api/portraits/men/86.jpg' },
    { id: 5, name: 'Sneha Patel', score: 'OET Grade B', image: 'https://randomuser.me/api/portraits/women/65.jpg' },
    { id: 6, name: 'Arjun Kumar', score: 'GMAT 740', image: 'https://randomuser.me/api/portraits/men/15.jpg' },
    { id: 7, name: 'Kavya Reddy', score: 'IELTS Band 8.0', image: 'https://randomuser.me/api/portraits/women/33.jpg' },
    { id: 8, name: 'Rohan Mehta', score: 'SAT 1500', image: 'https://randomuser.me/api/portraits/men/42.jpg' },
];

export function Certificates() {
    const [width, setWidth] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // We want to show 4 items at a time on large screens
    const itemsToShow = 4;
    const itemsCount = certificates.length;
    // Calculate total sets or just simple index sliding

    // Infinite Scroll Logic:
    // We duplicate the array to allow seamless scrolling
    // Actually, distinct pages is cleaner for "cards with arrow button".
    // Let's implement a sliding window.

    const scrollTo = (index: number) => {
        // Ensure index is within 0 to (itemsCount - itemsToShow)
        // If we want infinite-like behavior (wrap around), we handle it here.
        let newIndex = index;

        if (newIndex < 0) {
            newIndex = itemsCount - itemsToShow;
        } else if (newIndex > itemsCount - itemsToShow) {
            newIndex = 0;
        }

        setCurrentIndex(newIndex);
    };

    const nextSlide = () => scrollTo(currentIndex + 1);
    const prevSlide = () => scrollTo(currentIndex - 1);

    return (
        <section className="py-24 bg-gradient-to-b from-white to-gray-50/50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-['Montserrat'] font-bold text-gray-900 mb-6 tracking-tight">
                    Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Global Achievers</span>
                </h2>
                <div className="w-20 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full mb-8"></div>
                <p className="text-gray-600 font-['Inter'] text-lg max-w-2xl mx-auto leading-relaxed">
                    Celebrating the exceptional scores and verified milestones of our Sparkle Scholars in IELTS, TOEFL, GRE, and beyond.
                </p>
            </div>

            {/* Carousel Container */}
            <div className="relative max-w-[1400px] mx-auto px-12 flex flex-col items-center justify-center">

                {/* Arrow Buttons Container */}
                <div className="flex items-center justify-between w-full absolute top-1/2 -translate-y-1/2 z-20 pointer-events-none px-2">
                    <button
                        onClick={prevSlide}
                        className="pointer-events-auto w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl border border-gray-100 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:scale-110 active:scale-95 transition-all duration-300 group backdrop-blur-sm bg-opacity-90"
                        aria-label="Previous"
                    >
                        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" strokeWidth={2} />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="pointer-events-auto w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl border border-gray-100 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:scale-110 active:scale-95 transition-all duration-300 group backdrop-blur-sm bg-opacity-90"
                        aria-label="Next"
                    >
                        <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" strokeWidth={2} />
                    </button>
                </div>

                {/* Viewport Mask - Strictly 4 items wide (approx 1250px) */}
                <div className="w-full overflow-hidden py-10" ref={carouselRef}>
                    <motion.div
                        className="flex gap-8"
                        initial={false}
                        animate={{ x: -(currentIndex * 312) }} // card (280) + gap (32) = 312
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        {certificates.map((cert) => (
                            <motion.div
                                key={cert.id}
                                className="flex-shrink-0"
                            >
                                <CertificateCard cert={cert} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Dots Navigation for Mobile/Extra Control */}
                <div className="flex justify-center gap-2 mt-8">
                    {Array.from({ length: certificates.length - (itemsToShow - 1) }).map((_, idx) => (
                        // Only show dots for valid start positions if we want, or just verify logic
                        // Simplified: just show a few dots or none. Let's show active indicator.
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-6 bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'}`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
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
    const modules = getModules(cert.score);

    return (
        <div
            className="relative w-[280px] h-[340px] cursor-pointer"
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
                    className="absolute w-full h-full rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 bg-white flex flex-col"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    {/* Top Area with Gradient Background */}
                    <div className="relative w-full h-[60%] bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-200/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

                        {/* Centered Name Highlight */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4 opacity-80"></div>
                            <h3 className="text-2xl md:text-3xl font-black font-['Outfit'] text-gray-900 leading-tight">
                                {cert.name}
                            </h3>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mt-2">Sparkle Scholar</p>
                        </div>
                    </div>

                    {/* Score Badge */}
                    <div className="absolute top-4 right-4 z-20">
                        <div className="px-3 py-1.5 bg-white/80 backdrop-blur-md rounded-xl shadow-sm border border-white/50 flex flex-col items-center">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Score</span>
                            <span className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                {cert.score.replace(/[^0-9.]/g, '')}
                            </span>
                        </div>
                    </div>

                    {/* ID Badge */}
                    <div className="absolute top-4 left-4 z-20">
                        <div className="px-2.5 py-1 bg-white/80 backdrop-blur-md rounded-full border border-gray-100">
                            <span className="text-[9px] font-mono font-bold text-gray-400">#{7231 + cert.id}</span>
                        </div>
                    </div>

                    {/* Bottom Info Area */}
                    <div className="relative h-[40%] bg-white z-10 flex flex-col justify-center px-6 border-t border-gray-50">
                        <div className="flex flex-col items-center">
                            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-2">
                                Certified
                            </span>
                            <p className="text-lg font-bold text-gray-700">
                                {cert.score}
                            </p>
                            <p className="text-xs text-gray-400 mt-2">Click to see details</p>
                        </div>
                    </div>
                </div>

                {/* BACK SIDE */}
                <div
                    className="absolute w-full h-full rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 bg-gradient-to-br from-blue-600 to-indigo-600 flex flex-col p-6"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}
                >
                    {/* Header */}
                    <div className="text-center mb-6">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-3">
                            <Award className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1">{cert.name}</h3>
                        <p className="text-xs text-white/70 uppercase tracking-wider">Score Breakdown</p>
                    </div>

                    {/* Module Scores */}
                    <div className="flex-1 flex flex-col justify-center space-y-3">
                        {modules.map((mod, i) => (
                            <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 flex items-center justify-between border border-white/20">
                                <span className="text-sm font-semibold text-white">{mod.label}</span>
                                <span className="text-lg font-black text-white">{mod.score}</span>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="mt-6 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                            <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                            <span className="text-sm font-bold text-white">{cert.score}</span>
                        </div>
                        <p className="text-xs text-white/60 mt-3">Click to flip back</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
