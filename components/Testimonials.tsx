'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { initialTestimonials } from '@/lib/testimonialsData';

export function Testimonials() {
    const [testimonials, setTestimonials] = useState<any[]>(initialTestimonials);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const res = await fetch('/api/testimonials');
                const data = await res.json();
                if (data.success && data.testimonials.length > 0) {
                    setTestimonials(data.testimonials);
                }
            } catch (e) {
                console.error("Failed to fetch testimonials:", e);
            }
        };
        fetchTestimonials();
    }, []);

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
                                className="absolute w-[90%] md:w-[600px] h-[500px] md:h-[550px] bg-white rounded-[32px] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col justify-between overflow-y-auto scrollbar-hide touch-pan-y"
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
