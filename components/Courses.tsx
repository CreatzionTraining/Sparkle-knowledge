'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function Courses() {
  const testPrep = [
    {
      name: 'IELTS',
      desc: 'Academic and General Training coaching for UK, Canada, Australia.',
      features: ['Band 8+ Strategies', 'Unlimited Mock Tests'],
      modules: ['Reading Comprehension', 'Academic/General Writing', 'Listening Techniques', 'Speaking Practice'],
      duration: '2-3 months',
      type: 'image',
      image: '/courses/ielts.png',
      color: 'bg-blue-600'
    },
    {
      name: 'TOEFL',
      desc: 'TOEFL iBT coaching for US higher education.',
      features: ['Section-wise practice', 'Speaking templates'],
      modules: ['Reading Sections', 'Listening Conversations', 'Speaking Tasks', 'Integrated Writing'],
      duration: '2-3 months',
      type: 'image',
      image: '/courses/toefl.png',
      color: 'bg-[#002FA7]'
    },
    {
      name: 'PTE',
      desc: 'Fast-track PTE Academic preparation for quick results.',
      features: ['AI-Scored Mock Tests', 'Tips & Tricks'],
      modules: ['Speaking & Writing', 'Reading', 'Listening', 'AI Scoring Analysis'],
      duration: '2 months',
      type: 'image',
      image: '/courses/pte.png',
      color: 'bg-green-600'
    },
    {
      name: 'OET',
      desc: 'Occupational English Test training for healthcare professionals.',
      features: ['Nursing/Medicine focus', 'Role-play scenarios'],
      modules: ['Listening (Health)', 'Reading (Clinical)', 'Writing (Referral Letters)', 'Speaking (Role-play)'],
      duration: '2-3 months',
      type: 'image',
      image: '/courses/oet.png',
      color: 'bg-purple-600'
    },
    {
      name: 'GRE',
      desc: 'Graduate Record Examination for technical and management masters.',
      features: ['Quant & Verbal Reasoning', 'Analytical Writing'],
      modules: ['Verbal Reasoning', 'Quantitative Reasoning', 'Analytical Writing', 'Vocabulary Building'],
      duration: '3-4 months',
      type: 'image',
      image: '/courses/gre.png',
      color: 'bg-indigo-600'
    },
    {
      name: 'GMAT',
      desc: 'Graduate Management Admission Test for top business schools.',
      features: ['Integrated Reasoning', 'Computer Adaptive'],
      modules: ['Quantitative Reasoning', 'Verbal Reasoning', 'Data Insights', 'Adaptive Testing'],
      duration: '3-4 months',
      type: 'image',
      image: '/courses/gmat.png',
      color: 'bg-orange-600'
    },
  ];

  return (
    <section id="courses" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-50 to-blue-50 text-blue-900 font-medium text-sm mb-6 border border-blue-100">
            <span className="text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
            </span>
            Our Programs
          </div>
          <h2 className="text-4xl md:text-5xl font-['Montserrat'] font-bold text-[#0F172A] mb-4 tracking-tight">
            World-Class Training Programs
          </h2>
          <p className="text-gray-600 font-['Inter'] text-lg md:text-xl max-w-2xl mx-auto">
            Comprehensive courses designed to help you achieve your global education and career goals
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testPrep.map((course, idx) => (
            <CourseCard key={idx} course={course} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CourseCard({ course, index }: { course: any; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <div className="h-[320px] [perspective:1000px] group">
      <motion.div
        className="w-full h-full relative transition-all duration-500 [transform-style:preserve-3d]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Front Face */}
        <div
          className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-b from-blue-600 to-[#E63946] backface-hidden shadow-lg"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="w-full h-full bg-[#F5F5F0] rounded-[10px] p-5 flex flex-col items-start">
            {/* Logo/Icon */}
            <div className="h-10 mb-3 flex items-center justify-start w-full">
              <div className="relative w-24 h-10">
                <Image
                  src={course.image}
                  alt={`${course.name} logo`}
                  fill
                  className="object-contain object-left"
                />
              </div>
            </div>

            {/* Title & Desc */}
            <h4 className="text-2xl font-['Montserrat'] font-bold text-gray-900 mb-3">{course.name}</h4>
            <p className="text-gray-600 font-['Inter'] text-lg mb-4 leading-relaxed">
              {course.desc}
            </p>

            {/* Features Bullets */}
            <div className="mb-6 space-y-2 w-full">
              {course.features.map((feature: string, fIdx: number) => (
                <div key={fIdx} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-yellow-400 shrink-0" />
                  <span className="text-base text-gray-700 font-['Inter']">{feature}</span>
                </div>
              ))}
            </div>

            {/* Button */}
            <button
              onClick={() => setIsFlipped(true)}
              className="mt-auto self-end text-[#ff4f4f] text-sm font-['Montserrat'] font-bold uppercase tracking-wider flex items-center gap-2 hover:gap-3 transition-all duration-300"
            >
              See More <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-b from-blue-600 to-[#E63946] backface-hidden shadow-xl"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="w-full h-full bg-white rounded-[10px] p-5 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-['Montserrat'] font-bold text-gray-900">Modules</h4>
              <button
                onClick={() => setIsFlipped(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                title="Go Back"
              >
                <ArrowLeft className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <div className="space-y-2 flex-grow overflow-y-auto pr-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
              {course.modules.map((mod: string, idx: number) => (
                <div key={idx} className="flex items-start gap-2 bg-gray-50 p-2 rounded-md">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-['Inter'] text-xs font-medium">{mod}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="text-xs text-gray-500 font-medium mb-2 text-center">Duration: {course.duration}</div>
              <button className="w-full py-2 bg-[#E63946] hover:bg-[#D62839] text-white text-xs font-['Montserrat'] font-bold rounded-lg shadow-md hover:shadow-lg transition-all">
                Book Free Demo
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
