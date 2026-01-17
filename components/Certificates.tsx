'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Star, ChevronLeft, ChevronRight } from 'lucide-react';

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
    const [currentIndex, setCurrentIndex] = useState(0);
    const cardWidth = 280; // Fixed card width
    const gap = 24; // Gap between cards (6 * 4 = 24px)

    const handleNext = () => {
        if (currentIndex < certificates.length - 4) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setCurrentIndex(0);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        } else {
            setCurrentIndex(certificates.length - 4);
        }
    };

    // Calculate exact pixel offset
    const offset = currentIndex * (cardWidth + gap);

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
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-600">Global Achievers</span>
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        whileInView={{ opacity: 1, scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-24 h-1 bg-gradient-to-r from-purple-500 via-blue-600 to-blue-700 mx-auto mb-6"
                    />
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-gray-600 font-['Inter'] text-lg max-w-2xl mx-auto leading-relaxed"
                    >
                        Celebrating the exceptional scores and verified milestones of our Sparkle Scholars in IELTS, TOEFL, GRE, and beyond.
                    </motion.p>
                </div>

                {/* Cards Container with Navigation */}
                <div className="relative max-w-[1216px] mx-auto">
                    {/* Left Arrow */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:scale-110 active:scale-95 transition-all duration-300 group"
                        aria-label="Previous card"
                    >
                        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" strokeWidth={2.5} />
                    </button>

                    {/* Right Arrow */}
                    <button
                        onClick={handleNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:scale-110 active:scale-95 transition-all duration-300 group"
                        aria-label="Next card"
                    >
                        <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
                    </button>

                    {/* Carousel Container */}
                    <div className="overflow-hidden">
                        <motion.div
                            className="flex gap-6"
                            animate={{ x: -offset }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        >
                            {certificates.map((cert) => (
                                <div key={cert.id} className="flex-shrink-0" style={{ width: `${cardWidth}px` }}>
                                    <CertificateCard cert={cert} />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-8">
                    {Array.from({ length: 5 }).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`transition-all duration-300 rounded-full ${idx === currentIndex
                                ? 'w-8 h-2 bg-gradient-to-r from-blue-600 to-pink-500'
                                : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                                }`}
                            aria-label={`Go to position ${idx + 1}`}
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
                    <div className="h-1.5 bg-gradient-to-r from-blue-600 to-pink-500" />

                    {/* Content Area */}
                    <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
                        {/* ID Badge */}
                        <div className="absolute top-4 left-4">
                            <div className="px-3 py-1 bg-blue-50 rounded-full border border-blue-100">
                                <span className="text-[10px] font-mono font-bold text-blue-600">#{7231 + cert.id}</span>
                            </div>
                        </div>

                        {/* Score Badge */}
                        <div className="absolute top-4 right-4">
                            <div className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-pink-500 rounded-xl shadow-md flex flex-col items-center">
                                <span className="text-[9px] font-bold uppercase tracking-wider text-white/80">Score</span>
                                <span className="text-sm font-black text-white">
                                    {cert.score.replace(/[^0-9.]/g, '')}
                                </span>
                            </div>
                        </div>

                        {/* Name Section */}
                        <div className="text-center mt-8">
                            <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-pink-500 rounded-full mx-auto mb-4" />
                            <h3 className="text-xl font-['Outfit'] font-bold text-gray-900 mb-2">
                                {cert.name}
                            </h3>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sparkle Scholar</p>
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
                        <p className="text-xs text-gray-400 mt-4 absolute bottom-4">Click to see details</p>
                    </div>
                </div>

                {/* BACK SIDE */}
                <div
                    className="absolute w-full h-full rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-100 flex flex-col p-6"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}
                >
                    {/* Top Gradient Bar */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-blue-600 to-blue-700" />

                    {/* Header */}
                    <div className="text-center mb-4 mt-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Award className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{cert.name}</h3>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Score Breakdown</p>
                    </div>

                    {/* Module Scores */}
                    <div className="flex-1 flex flex-col justify-center space-y-2.5">
                        {modules.map((mod, i) => (
                            <div key={i} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-2.5 flex items-center justify-between border border-blue-100">
                                <span className="text-xs font-semibold text-gray-700">{mod.label}</span>
                                <span className="text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{mod.score}</span>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="mt-4 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
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
