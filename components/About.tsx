'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export function About() {
    const [activeModal, setActiveModal] = useState<'vision' | 'mission' | 'about' | null>(null);

    const aboutFull = (
        <div className="space-y-6 text-[#333333] leading-relaxed">
            <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-blue-100/50 rounded-full flex items-center justify-center text-2xl">✨</div>
                <h3 className="text-3xl font-bold text-[#0F172A]">About Sparkle Knowledge Yard</h3>
            </div>

            <p className="text-lg text-gray-700">
                <span className="font-bold text-[#1D4ED8]">Sparkle Knowledge Yard</span> is a leading study abroad consultancy and test preparation center located in Perambur, Chennai, dedicated to empowering students to achieve their international education and career goals. We specialize in coaching for IELTS, PTE, TOEFL, and OET, along with communication skills training, helping students gain the confidence and competence required to succeed globally.
            </p>

            <div className="p-6 bg-gray-50 rounded-2xl border-l-4 border-[#1D4ED8]">
                <p className="italic text-gray-700">
                    "At Sparkle Knowledge Yard, we believe that success in international exams and overseas education is not just about scores—it’s about strategy, clarity, and confidence."
                </p>
            </div>

            <p>
                Our training approach combines practical exam techniques, personalized mentoring, and real-time feedback, ensuring that every student receives focused attention and measurable progress.
            </p>

            <div className="space-y-4">
                <h4 className="font-bold text-[#0F172A] text-lg">What Sets Us Apart?</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                        'Online & Offline Flexible Classes',
                        'Experienced Faculty',
                        'Structured Learning Plans',
                        'Regular Doubt-Clearing Sessions',
                        'Comprehensive Study Abroad Guidance',
                        'Interview Readiness & Application Support'
                    ].map((item, index) => (
                        <li key={index} className="flex gap-2 items-center text-gray-700">
                            <span className="w-2 h-2 bg-[#E63946] rounded-full"></span>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            <p>
                Beyond test preparation, we assist students at every stage—from choosing the right course and country to interview readiness and application support. Our mission is to simplify the overseas education journey and help students turn their aspirations into achievements.
            </p>

            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <span className="font-bold text-[#0F172A]">Trusted by students for:</span>
                <span className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">Expert Faculty</span>
                <span className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">Holistic Training</span>
                <span className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">Student-Centric</span>
            </div>
        </div>
    );

    const visionFull = (
        <div className="space-y-6 text-[#333333] leading-relaxed">
            <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 className="text-3xl font-bold text-[#0F172A]">Our Vision</h3>
            </div>

            <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100 italic text-blue-800 font-medium">
                "To become a trusted global education and skill-development ecosystem that empowers learners to communicate confidently, compete globally, and build meaningful careers—regardless of their background or starting point."
            </div>

            <p>
                Sparkle Knowledge Yard envisions a future where education is accessible, practical, and transformative, enabling individuals to unlock opportunities across borders through language, skills, and clarity of direction.
            </p>
        </div>
    );

    const missionFull = (
        <div className="space-y-6 text-[#333333] leading-relaxed">
            <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <h3 className="text-3xl font-bold text-[#0F172A]">Our Mission</h3>
            </div>

            <p className="text-lg font-medium">
                Our mission is to provide high-quality, result-oriented education and training that bridges the gap between academic learning and real-world expectations.
            </p>

            <div className="space-y-4">
                <p className="font-bold text-[#E63946] border-b border-gray-200 pb-2">We are committed to:</p>
                <ul className="space-y-3">
                    {[
                        'Delivering structured and practical coaching for international exams, communication skills, and career readiness',
                        'Offering ethical, transparent guidance for overseas education and career decisions',
                        'Nurturing confidence, clarity, and competence in every learner',
                        'Continuously evolving our methods using modern tools, expert insight, and learner feedback'
                    ].map((item, index) => (
                        <li key={index} className="flex gap-3">
                            <span className="text-[#E63946] font-bold mt-1">✓</span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );

    const visionSummary = "To become a trusted global education and skill-development ecosystem that empowers learners to communicate confidently, compete globally, and build meaningful careers.";
    const missionSummary = "Our mission is to provide high-quality, result-oriented education and training that bridges the gap between academic learning and real-world expectations.";

    return (
        <section id="about" className="relative py-24 bg-gradient-to-br from-blue-100 via-white to-red-100 overflow-hidden">

            {/* Background Decor - Subtle & Clean */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-50 to-transparent -z-10"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

                {/* 1. MAIN ABOUT US SECTION (Text Left, Image Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">

                    {/* Left: Content */}
                    {/* Left: Content */}
                    <div className="order-2 lg:order-1 flex flex-col justify-center">
                        <div className="mb-8">
                            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-4">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1D4ED8] via-[#E63946] to-[#1D4ED8] bg-[length:200%_auto] animate-text-wave">Who We Are</span>
                            </h2>
                            <div className="h-1.5 w-24 bg-gradient-to-r from-[#1D4ED8] to-[#E63946] rounded-full"></div>
                        </div>

                        <div className="space-y-4 text-[15px] text-gray-500 leading-relaxed font-medium mb-8 text-justify">
                            <p>
                                <span className="font-bold text-[#0F172A]">Sparkle Knowledge Yard</span> is a leading study abroad consultancy and test preparation center located in Perambur, Chennai. We specialize in coaching for IELTS, PTE, TOEFL, and OET, helping students gain the confidence required to succeed globally.
                            </p>
                            <p>
                                We believe success is about <span className="italic text-[#1D4ED8]">strategy, clarity, and confidence</span>. Our training combines practical exam techniques, personalized mentoring, and real-time feedback. With experienced faculty and structured plans, we create a supportive environment for growth.
                            </p>
                            <p>
                                Beyond test preparation, we provide comprehensive study abroad guidance—from course selection to visa readiness. We build not just high scorers, but confident individuals ready to thrive abroad.
                            </p>
                        </div>

                        <div>
                            <button
                                className="px-8 py-3 bg-gradient-to-r from-[#1D4ED8] via-[#E63946] to-[#1D4ED8] bg-[length:200%_auto] animate-text-wave text-white text-xs font-bold tracking-widest uppercase rounded-full shadow-lg shadow-blue-500/30 transition-all hover:scale-105"
                                onClick={() => setActiveModal('about')}
                            >
                                Learn More
                            </button>
                        </div>
                    </div>


                    {/* Right: Illustration/Image with Blobs */}
                    <div className="order-1 lg:order-2 relative bg-transparent">
                        {/* Organic Blob Background */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] -z-10">
                            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-[#FFD1D1]/50">
                                <path transform="translate(100 100)" d="M44.4,-76.3C58.9,-69.7,71.8,-59.1,81.3,-46.7C90.8,-34.3,96.9,-20.1,95.8,-6.2C94.7,7.7,86.5,21.3,76.5,33.8C66.5,46.3,54.7,57.7,41.9,65.8C29.1,73.9,15.3,78.7,0.9,77.1C-13.5,75.5,-28.1,67.6,-41.8,59.3C-55.5,50.9,-68.3,42.2,-76.3,30.3C-84.3,18.4,-87.5,3.3,-84.8,-10.8C-82.1,-24.9,-73.4,-38,-62.4,-48.6C-51.4,-59.2,-38,-67.3,-24.9,-74.5C-11.8,-81.7,1.1,-88,14.6,-88.2C28.1,-88.4,42.2,-82.5,44.4,-76.3Z" />
                            </svg>
                        </div>

                        <div className="relative w-full aspect-[4/3] flex items-center justify-center animate-float-delayed">
                            <Image
                                src="/assets/people/about_us_custom.png"
                                alt="Sparkle Knowledge Yard Team - Expert IELTS Trainers in Chennai"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* 2. VISION & MISSION CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

                    {/* Vision Card - Innovative Design */}
                    <div
                        className="group relative p-[2px] rounded-[2rem] bg-gradient-to-br from-[#1D4ED8] to-transparent hover:to-[#1D4ED8] transition-all duration-500 cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20"
                        onClick={() => setActiveModal('vision')}
                    >
                        <div className="relative h-full bg-white rounded-[calc(2rem-2px)] p-6 lg:p-10 overflow-hidden">
                            {/* Abstract Decorative Elements */}
                            <div className="absolute -right-10 -top-10 w-24 h-24 lg:w-40 lg:h-40 bg-blue-100/50 rounded-full blur-3xl group-hover:bg-blue-200/50 transition-colors"></div>
                            <div className="absolute -left-10 -bottom-10 w-24 h-24 lg:w-40 lg:h-40 bg-indigo-100/50 rounded-full blur-3xl group-hover:bg-indigo-200/50 transition-colors"></div>

                            {/* Watermark Text Removed */}


                            <div className="relative z-10 flex flex-col h-full">
                                <h3 className="text-2xl lg:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#1D4ED8] to-blue-600">Our Vision</h3>
                                <div className="w-12 h-1 bg-[#1D4ED8] mb-4 lg:mb-6 rounded-full group-hover:w-24 transition-all duration-300"></div>

                                <p className="text-gray-600 mb-4 lg:mb-8 leading-relaxed flex-grow text-base lg:text-lg">
                                    {visionSummary}
                                </p>

                                <div className="flex items-center text-[#1D4ED8] font-bold group-hover:gap-3 transition-all mt-auto">
                                    <span className="uppercase tracking-wider text-sm">Explore Vision</span>
                                    <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mission Card - Innovative Design */}
                    <div
                        className="group relative p-[2px] rounded-[2rem] bg-gradient-to-br from-[#E63946] to-transparent hover:to-[#E63946] transition-all duration-500 cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/20"
                        onClick={() => setActiveModal('mission')}
                    >
                        <div className="relative h-full bg-white rounded-[calc(2rem-2px)] p-6 lg:p-10 overflow-hidden">
                            {/* Abstract Decorative Elements */}
                            <div className="absolute -right-10 -top-10 w-24 h-24 lg:w-40 lg:h-40 bg-red-100/50 rounded-full blur-3xl group-hover:bg-red-200/50 transition-colors"></div>
                            <div className="absolute -left-10 -bottom-10 w-24 h-24 lg:w-40 lg:h-40 bg-orange-100/50 rounded-full blur-3xl group-hover:bg-orange-200/50 transition-colors"></div>

                            {/* Watermark Text Removed */}


                            <div className="relative z-10 flex flex-col h-full">
                                <h3 className="text-2xl lg:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#E63946] to-red-600">Our Mission</h3>
                                <div className="w-12 h-1 bg-[#E63946] mb-4 lg:mb-6 rounded-full group-hover:w-24 transition-all duration-300"></div>

                                <p className="text-gray-600 mb-4 lg:mb-8 leading-relaxed flex-grow text-base lg:text-lg">
                                    {missionSummary}
                                </p>

                                <div className="flex items-center text-[#E63946] font-bold group-hover:gap-3 transition-all mt-auto">
                                    <span className="uppercase tracking-wider text-sm">Explore Mission</span>
                                    <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* EXPANDABLE MODAL */}
            <AnimatePresence>
                {activeModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setActiveModal(null)}>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl p-8 md:p-12 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative z-10"
                            data-lenis-prevent
                        >
                            <button
                                onClick={() => setActiveModal(null)}
                                className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-500 hover:text-gray-800"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>

                            {activeModal === 'vision' ? visionFull : (activeModal === 'mission' ? missionFull : aboutFull)}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </section >
    );
}
