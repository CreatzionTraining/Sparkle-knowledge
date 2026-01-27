'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

// Real-time Testimonial Data
const testimonials = [
    {
        id: 1,
        name: "Pooja Saravanan",
        role: "IELTS Student",
        score: "Success",
        rating: 5,
        text: "I didn't have enough time for my exam so I just joined Sparkle Knowledge Yard because it's closer to my home. Shanthini ma'am guided me and helped me within this short time. She was really supportive which made the students feel at ease. The teaching here is very effective and well-structured. Highly recommended for anyone preparing for IELTS!",
        location: "Student"
    },
    {
        id: 2,
        name: "Shania Joseph",
        role: "IELTS Academic",
        score: "Band 8.0",
        rating: 5,
        text: "I recently scored an overall Band 8 in IELTS in my first attempt... she provides the right study materials, focuses on our weak areas, and shares simple tips that really make a big difference. Her teaching style makes the IELTS preparation journey less stressful and more approachable.",
        location: "Student"
    },
    {
        id: 3,
        name: "Pranesh Sam G",
        role: "IELTS Student",
        score: "Band 7.0",
        rating: 5,
        text: "One of the best IELTS coaching classes I ever experienced. Although I had a short period of time, Ma'am taught me everything in a brilliant way such that I could score the required band. Such a positive coaching. Thanks a lot ma'am.",
        location: "Student"
    },
    {
        id: 4,
        name: "Logi",
        role: "Spoken English",
        score: "Confident Speaker",
        rating: 5,
        text: "I joined Sparkle to improve my English communication skills. The classes were very engaging and interesting. The teaching methods really helped me gain confidence in speaking English. Truly appreciate the effort and guidance.",
        location: "Student"
    },
    {
        id: 5,
        name: "Vijaya Ramachandran",
        role: "Parent",
        score: "Visa Interview",
        rating: 5,
        text: "Excellent coaching by Shanthini ma'am. It has been a wonderful and memorable journey. She gave personal attention to my son and helped him with IELTS and Visa interview. Her dedication is a class apart from usual coaching centers.",
        location: "Parent"
    },
    {
        id: 6,
        name: "Daniel Darwin",
        role: "IELTS Student",
        score: "Band 7.0",
        rating: 5,
        text: "I joined Sparkle Knowledge Centre for IELTS coaching... In my first mock test, my writing band was below 5... However, with proper guidance... In my final IELTS exam, I scored an overall band 7. A special thanks to Shanti Ma'am... Her feedback on writing was very detailed and practical... I strongly recommend Sparkle Knowledge Centre to anyone who feels their English is weak or average but dreams of achieving a good IELTS band.",
        location: "Student"
    },
    {
        id: 7,
        name: "Ram Sanjay V S",
        role: "IELTS Student",
        score: "Improvement",
        rating: 5,
        text: "One of the best coaching experiences I’ve ever had. Over the past 2 months, my English-speaking fluency has improved a lot... The one-on-one sessions with flexible and comfortable timings made learning stress-free and highly effective. Shanthini ma’am is extremely experienced... I strongly recommend it to anyone who wants to improve their English and achieve a good IELTS band score.",
        location: "Student"
    },
    {
        id: 8,
        name: "Merlin Victor",
        role: "IELTS Student",
        score: "One-on-One",
        rating: 5,
        text: "Learning IELTS at Sparkle Knowledge Yard has been a wonderful experience. The coaching provided here is one-on-one. The classes are arranged as per your convenience, which I found impressive. My mentor for IELTS was Mrs. Shanthini Williams. Thank you, ma'am, for the guidance. The Sparkle Knowledge Yard Institute at Perambur, Chennai, is recommended to those looking for the best coaching centres for IELTS.",
        location: "Student"
    },
    {
        id: 9,
        name: "Tharani.N",
        role: "IELTS Student",
        score: "Success",
        rating: 5,
        text: "Sparkle IELTS coaching center, under the guidance of Shanthi Williams mam, has been an incredible learning experience for me. Her dedication and expertise have truly made a difference in my IELTS preparation. Her personalized approach, attention to detail, and effective teaching methods have helped me gain confidence in all four test sections. I highly recommend Sparkle to anyone aiming for success in their IELTS journey.",
        location: "Student"
    },
    {
        id: 10,
        name: "Jonathan Stanley Williams",
        role: "IELTS Student",
        score: "Band Score",
        rating: 5,
        text: "Best coaching center for IELTS exam in Chennai. I am extremely grateful to have Mrs. Shanthini ma’am as my trainer. She is super friendly and talented teacher anyone could imagine. I recommend SPARKLE KNOWLEDGE YARD for everyone who aspires to get a good score in their very first attempt. The training provided was excellent and up to date... The course material were excellent and very helpful.",
        location: "Student"
    }
];

export function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Fallback images if specific files don't exist


    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            handleNext();
        }, 5000); // 5 Seconds Auto-slide
        return () => clearInterval(interval);
    }, [activeIndex, isHovered]);

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const getCardStyle = (index: number) => {
        // 0 = active, 1 = next, -1 (or last) = prev
        const diff = (index - activeIndex + testimonials.length) % testimonials.length;

        // Center Card 
        if (diff === 0) return 'center';
        // Immediate Next
        if (diff === 1) return 'right';
        // Immediate Prev (or last item if at 0)
        if (diff === testimonials.length - 1) return 'left';

        return 'hidden';
    };

    const variants = {
        center: { x: '0%', scale: 1, opacity: 1, zIndex: 10, rotateY: 0 },
        left: { x: '-80%', scale: 0.85, opacity: 0.5, zIndex: 5, rotateY: 15 },
        right: { x: '80%', scale: 0.85, opacity: 0.5, zIndex: 5, rotateY: -15 },
        hidden: { x: '0%', scale: 0.5, opacity: 0, zIndex: 0 }
    };

    return (
        <section className="py-12 bg-gradient-to-br from-indigo-50/50 to-white overflow-hidden select-none">
            <div className="max-w-7xl mx-auto px-4 md:px-8">

                {/* Section Header */}
                <div className="text-center mb-0">
                    <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full shadow-sm border border-gray-100 mb-6 font-medium text-sm text-gray-600">
                        <span className="flex text-yellow-400">
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                        </span>
                        <span>4.9/5 from 85+ reviews</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-4">
                        Student <span className="text-transparent bg-clip-text animate-rainbow-text font-bold">Success Stories</span>
                    </h2>
                    <div className="h-1.5 w-24 bg-gradient-to-r from-[#1D4ED8] to-[#E63946] rounded-full mx-auto"></div>
                </div>

                {/* 3D Carousel Stage */}
                <div
                    className="relative h-[550px] md:h-[620px] -mt-8 flex items-center justify-center perspective-1000"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {testimonials.map((item, index) => {
                        const position = getCardStyle(index);
                        const isCenter = position === 'center';

                        return (
                            <motion.div
                                key={item.id}
                                variants={variants}
                                initial="hidden"
                                animate={position}
                                transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                                drag={isCenter ? "x" : false}
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.2}
                                onDragEnd={(e, { offset, velocity }) => {
                                    const swipeThreshold = 50;
                                    if (offset.x < -swipeThreshold) {
                                        handleNext();
                                    } else if (offset.x > swipeThreshold) {
                                        handlePrev();
                                    }
                                }}
                                className="absolute w-[90%] md:w-[600px] h-[500px] md:h-[550px] bg-white rounded-[32px] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col justify-between overflow-y-auto custom-scrollbar touch-pan-y"
                            >
                                {/* Quote Icon Background */}
                                <Quote className="absolute top-8 right-8 w-20 h-20 text-gray-100/50 fill-current -z-10" />

                                {/* Top Profile */}
                                <div className="flex items-center gap-6 mb-8">
                                    <div className={`relative w-20 h-20 rounded-full p-1 flex-shrink-0 ${isCenter ? 'bg-gradient-to-tr from-blue-600 to-pink-500' : 'bg-gray-200'} transition-colors duration-500`}>
                                        <div className="w-full h-full rounded-full overflow-hidden relative border-4 border-white flex items-center justify-center bg-blue-100">
                                            <span className="text-3xl font-bold text-blue-600">
                                                {item.name.charAt(0)}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 leading-tight">{item.name}</h3>
                                        <p className="text-[#1D4ED8] font-semibold text-sm">{item.role}</p>
                                        <div className="flex gap-1 mt-2">
                                            {[1, 2, 3, 4, 5].map(s => (
                                                <Star key={s} className={`w-4 h-4 ${s <= item.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Testimonial Text */}
                                <p className="text-lg md:text-xl text-gray-600 italic font-medium leading-relaxed mb-8 font-['Inter']">
                                    "{item.text}"
                                </p>

                                {/* Bottom Footer */}
                                {/* Bottom Footer */}
                                <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                            {item.location}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-6 mt-6">
                    <button
                        onClick={handlePrev}
                        className="w-12 h-12 rounded-full bg-white shadow-lg text-gray-700 flex items-center justify-center hover:bg-[#1D4ED8] hover:text-white transition-all duration-300"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <div className="flex gap-2">
                        {testimonials.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-2 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-8 bg-[#E63946]' : 'w-2 bg-gray-300'}`}
                            />
                        ))}
                    </div>
                    <button
                        onClick={handleNext}
                        className="w-12 h-12 rounded-full bg-white shadow-lg text-gray-700 flex items-center justify-center hover:bg-[#1D4ED8] hover:text-white transition-all duration-300"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

            </div>
        </section>
    );
}
