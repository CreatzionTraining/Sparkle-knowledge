'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

// Real-time Testimonial Data
const testimonials = [
    {
        id: 1,
        name: "Arun Kumar",
        role: "IELTS Academic",
        score: "Band 8.0",
        image: "/assets/people/student1.jpg", // Placeholder - you might need to update paths
        rating: 5,
        text: "Sparkle Knowledge Yard completely changed my approach to IELTS. The strategies for the Reading module were a game-changer.",
        location: "Anna Nagar"
    },
    {
        id: 2,
        name: "Deepika R.",
        role: "OET Nursing",
        score: "Grade B",
        image: "/assets/people/student2.jpg",
        rating: 5,
        text: "As a nurse, finding time to study was hard. The flexible batch timings and personalized attention helped me crack OET.",
        location: "Perambur"
    },
    {
        id: 3,
        name: "Mohammed Fazil",
        role: "PTE Academic",
        score: "Score 82",
        image: "/assets/people/student3.jpg",
        rating: 5,
        text: "The mock tests are exactly like the real exam. The feedback on my speaking gave me the confidence I needed.",
        location: "Kilpauk"
    },
    {
        id: 4,
        name: "Sarah Williams",
        role: "Study Abroad",
        score: "UK Visa",
        image: "/assets/people/student4.jpg",
        rating: 5,
        text: "From university shortlisting to visa counseling, the team stood by me. I'm now pursuing my Masters in the UK.",
        location: "Avadi"
    },
    {
        id: 5,
        name: "Karthik S.",
        role: "TOEFL iBT",
        score: "Score 108",
        image: "/assets/people/student5.jpg",
        rating: 4,
        text: "The faculty is extremely knowledgeable. They focused on my weak areas in Listening and helped me improve drastically.",
        location: "Perambur"
    }
];

export function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Fallback images if specific files don't exist
    const getAvatar = (id: number) => `https://randomuser.me/api/portraits/${id % 2 === 0 ? 'women' : 'men'}/${id * 10}.jpg`;

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
                        Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1D4ED8] via-[#E63946] to-[#1D4ED8] bg-[length:200%_auto] animate-text-wave">Success Stories</span>
                    </h2>
                    <div className="h-1.5 w-24 bg-gradient-to-r from-[#1D4ED8] to-[#E63946] rounded-full mx-auto"></div>
                </div>

                {/* 3D Carousel Stage */}
                <div
                    className="relative h-[400px] md:h-[450px] -mt-8 flex items-center justify-center perspective-1000"
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
                                className="absolute w-[90%] md:w-[600px] bg-white rounded-[32px] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col justify-between h-auto min-h-[350px]"
                            >
                                {/* Quote Icon Background */}
                                <Quote className="absolute top-8 right-8 w-20 h-20 text-gray-100/50 fill-current -z-10" />

                                {/* Top Profile */}
                                <div className="flex items-center gap-6 mb-8">
                                    <div className={`relative w-20 h-20 rounded-full p-1 ${isCenter ? 'bg-gradient-to-tr from-blue-600 to-pink-500' : 'bg-gray-200'} transition-colors duration-500`}>
                                        <div className="w-full h-full rounded-full overflow-hidden relative border-4 border-white">
                                            <Image
                                                src={item.image.startsWith('/') ? getAvatar(item.id) : item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
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
                                <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">MEMBER</p>
                                        <p className="text-sm font-semibold text-gray-700">{item.location}</p>
                                    </div>
                                    <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-bold shadow-sm">
                                        {item.score}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-6 mt-8">
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
