'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CheckCircle, ChevronRight, Clock, BookOpen, ChevronLeft, Handshake, Languages as LanguagesIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export function Courses() {
  const testPrep = [
    {
      name: 'IELTS Preparation',
      desc: 'Academic and General Training coaching for UK, Canada, Australia.',
      features: ['Band-focused strategy', 'Writing & Speaking mastery', 'Real exam practice', 'Personalised feedback'],
      details: 'Our IELTS programme trains candidates to understand how the exam is evaluated and how to respond with precision. Each module focuses on exam logic, structured practice, and targeted correction to ensure consistent band improvement across all four skills.',
      modules: ['Reading Comprehension', 'Academic/General Writing', 'Listening Techniques', 'Speaking Practice'],
      duration: '6 – 8 weeks',
      type: 'image',
      image: '/courses/ielts.png',
      color: 'from-red-500 to-rose-600',
      badge: 'bg-red-50 text-red-600'
    },
    {
      name: 'TOEFL iBT',
      desc: 'TOEFL iBT coaching for US higher education with personalized plans.',
      features: ['Academic communication', 'Integrated task training', 'Structured responses', 'Rubric-based feedback'],
      details: 'Our TOEFL training builds academic readiness through listening, speaking, reading, and writing frameworks aligned with university expectations. Candidates learn to organise ideas clearly and respond confidently under timed conditions.',
      modules: ['Reading Sections', 'Listening Conversations', 'Speaking Tasks', 'Integrated Writing'],
      duration: '6 – 8 weeks',
      type: 'image',
      image: '/courses/toefl.png',
      color: 'from-blue-500 to-indigo-600',
      badge: 'bg-blue-50 text-blue-600'
    },
    {
      name: 'PTE Academic',
      desc: 'Fast-track PTE Academic preparation for quick results.',
      features: ['Algorithm-based training', 'Speed & accuracy drills', 'High-score task focus', 'Performance tracking'],
      details: 'PTE is a system-driven exam. We train candidates to optimise scoring by mastering task weightage, time management, pronunciation, and fluency. Mock tests and analytics-based feedback ensure faster, measurable results.',
      modules: ['Speaking & Writing', 'Reading', 'Listening', 'AI Scoring Analysis'],
      duration: '6 – 8 weeks',
      type: 'image',
      image: '/courses/pte.png',
      color: 'from-orange-500 to-amber-600',
      badge: 'bg-orange-50 text-orange-600'
    },
    {
      name: 'OET',
      desc: 'Occupational English Test training for healthcare professionals.',
      features: ['Healthcare-specific English', 'Role-play mastery', 'Professional writing tasks', 'Workplace communication'],
      details: 'Designed for healthcare professionals, our OET programme focuses on real clinical scenarios, profession-specific writing, and role-based speaking practice—ensuring exam success with workplace relevance.',
      modules: ['Listening (Health)', 'Reading (Clinical)', 'Writing (Referral Letters)', 'Speaking (Role-play)'],
      duration: '8 – 12 weeks',
      type: 'image',
      image: '/courses/oet.png',
      color: 'from-purple-500 to-violet-600',
      badge: 'bg-purple-50 text-purple-600'
    },
    {
      name: 'Communicative English & Interview Preparation',
      desc: 'Expert interview coaching for university admissions and job placements.',
      features: ['Confidence-first communication', 'Fluency & clarity building', 'Structured interview answers', 'Mock practice & body language'],
      details: 'This integrated programme helps learners move from understanding English to using it confidently in real-life and professional situations. Through guided speaking systems, practical conversations, and structured interview frameworks, candidates build fluency, presence, and clarity. Realistic mock interviews, body language training, and personalised feedback ensure participants communicate with confidence—both in everyday interactions and high-stakes interview environments.',
      modules: ['One-on-One Sessions', 'University Specifics', 'Body Language', 'Resume Review'],
      duration: '6 – 12 weeks',
      type: 'image',
      image: '/courses/ChatGPT Image Jan 27, 2026, 02_15_21 PM.png',
      color: 'from-emerald-500 to-teal-600',
      badge: 'bg-emerald-50 text-emerald-600'
    },
    {
      name: 'Foreign Languages',
      desc: 'Master foreign languages for global career and education opportunities.',
      features: ['Practical conversation', 'Correct pronunciation', 'Cultural context', 'Everyday usage'],
      details: 'Our foreign language courses focus on real-world communication rather than rote learning. Learners build conversational ability, accurate sentence patterns, and cultural awareness for academic and career mobility.',
      modules: ['A1-B2 Levels', 'Speaking Practice', 'Grammar Mastery', 'Listening Skills'],
      duration: '3 – 6 months',
      type: 'image',
      image: '/courses/languages_final.png',
      color: 'from-cyan-500 to-blue-600',
      badge: 'bg-cyan-50 text-cyan-600'
    },
  ];

  return (
    <section id="courses" className="py-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-gray-600 font-bold text-xs uppercase tracking-widest mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            World-Class Programs
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-['Montserrat'] font-black text-gray-900 mb-4 tracking-tight"
          >
            Expert Training for <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">Global Success</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-500 font-['Inter'] text-base max-w-2xl mx-auto leading-relaxed"
          >
            Comprehensive, result-oriented courses designed to fast-track your admission into top international universities.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testPrep.map((course, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <CourseCard course={course} index={idx} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CourseCard({ course, index }: { course: any; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="h-[300px] group perspective-1000">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: index * 0.1, rotateY: { duration: 0.15 } }}
        className="w-full h-full relative transition-all duration-300 preserve-3d cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* ================= FRONT FACE ================= */}
        <div className="absolute inset-0 backface-hidden">
          {/* Card Container - Added rounded-t-[1.3rem] to inner gradient line to fix overflow issue */}
          <div className="h-full w-full bg-white rounded-[1.5rem] border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-500 overflow-hidden flex flex-col p-5 relative">

            {/* Top Gradient Line - Fixed Overflow */}
            <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${course.color} z-10`}></div>

            {/* Header */}
            <div className="flex justify-between items-start mb-1 mt-0">
                <div className={`relative ${
                  course.name.includes('Interview')
                    ? 'w-55 h-20 -mt-3 -ml-2' 
                    : course.name.includes('Languages') 
                        ? 'w-64 h-20 -mt-4 -ml-2' 
                        : 'w-28 h-12'
                }`}>
                  <Image
                    src={course.image}
                    alt={`${course.name} Coaching Chennai - Sparkle Knowledge Yard`}
                    fill
                    className={course.name.includes('Interview') ? 'object-cover object-left' : 'object-contain object-left-top'}
                  />
                </div>
                
              <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${course.badge}`}>
                {course.duration}
              </div>
            </div>

            {/* Content */}
            <p className="text-gray-600 text-xs leading-snug mb-4 font-['Inter'] line-clamp-2 min-h-[2.5em]">
              {course.desc}
            </p>

            {/* Specs - Increased Spacing */}
            <div className="space-y-2.5 mb-2 flex-1">
              {course.features.map((feature: string, fIdx: number) => (
                <div key={fIdx} className="flex items-center gap-2.5">
                  <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${course.color} shrink-0`}></div>
                  <span className="text-[11px] font-semibold text-gray-700 leading-tight">{feature}</span>
                </div>
              ))}
            </div>

            {/* Action */}
            <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">View Curriculum</span>
              <button
                onClick={() => setIsFlipped(true)}
                className={`w-8 h-8 rounded-full bg-gray-50 hover:bg-gradient-to-r ${course.color} hover:text-white flex items-center justify-center text-gray-400 transition-all duration-300 shadow-sm group-hover:scale-110`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ================= BACK FACE ================= */}
        <div
          className="absolute inset-0 backface-hidden rounded-[1.5rem] overflow-hidden"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="h-full w-full bg-white p-6 flex flex-col relative border border-gray-100">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 relative z-10">
              <h3 className="text-gray-900 text-sm font-bold font-['Montserrat'] uppercase tracking-wide">Course Details</h3>
            </div>

            {/* Relatable Details Content */}
            <div className="space-y-3 relative z-10 flex-1">
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <p className={`${course.details.length > 300 ? 'text-[9.5px]' : 'text-[11px]'} text-gray-500 leading-relaxed`}>
                  {course.details}
                </p>
              </div>
            </div>

            {/* Bottom Action */}
            <div className="mt-auto relative z-10 flex items-center gap-3">
              <button
                onClick={(e) => e.stopPropagation()}
                className={`flex-1 py-2.5 rounded-lg bg-gradient-to-r ${course.color} text-white font-bold text-[9px] uppercase tracking-widest shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300`}
              >
                Book Free Demo
              </button>
              <button
                onClick={() => setIsFlipped(false)}
                className="w-9 h-9 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-blue-600 transition-all duration-300 shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
