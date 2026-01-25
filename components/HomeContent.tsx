'use client';
import React from 'react';
import { Navbar } from './Navbar';
import Image from 'next/image';
import { Certificates } from './Certificates';
import { Courses } from './Courses';
import { About } from './About';
import { Footer } from './Footer';
import { Contact } from './Contact';
import { Testimonials } from './Testimonials';
import Blog from '@/components/Blog';
import NewsScrollBar from '@/components/NewsScrollBar';
import { useState, useEffect } from 'react';
import NewsTicker from './NewsTicker';


export default function HomeContent() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Typewriter State
  const [textIndex, setTextIndex] = useState(0);

  const textContent = [
    { text: "Master Global", highlight: "Exams & Languages" },
    { text: "Unlock Your", highlight: "Global Potential" },
    { text: "Achieve Your", highlight: "Study Abroad Dreams" },
  ];

  // Image Carousel Effect
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % 5);
    }, 6000); // Image changes every 6 seconds

    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % textContent.length);
    }, 5000); // Text changes every 5 seconds

    return () => {
      clearInterval(imageInterval);
      clearInterval(textInterval);
    };
  }, []);



  return (
    <div className="min-h-screen text-[#0F172A] font-sans selection:bg-[#E63946] selection:text-white overflow-x-hidden relative">




      {/* Navbar - Transparent & Seamless */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-8 lg:pt-36 lg:pb-12 overflow-hidden">
        {/* Background Image scoped to Hero Section */}
        {/* <div className="absolute inset-0 -z-20">
          <Image
             // src="/assets/backgrounds/new2.png" // This line is the previous background
            // src="/assets/backgrounds/education_bg.png"
            // src="/assets/backgrounds/education_3d_bg.png"
            alt="Study Abroad and Test Prep Background - Sparkle Knowledge Yard"
            fill
           // className="object-cover opacity-100"
            priority
          />
        </div> */}

        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#1D4ED8]/10 to-[#2563EB]/5 blur-3xl animate-float -z-10"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#E63946]/10 to-[#FA8072]/5 blur-3xl animate-float-delayed -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Hero Text */}
            <div className="text-center lg:text-left z-10 lg:pl-4">


              <div className="relative h-[160px] md:h-[200px] mb-6 md:mb-8">
                {textContent.map((item, index) => {
                  const Tag = index === 0 ? 'h1' : 'div';
                  return (
                    <Tag
                      key={index}
                      className={`absolute top-0 left-0 w-full text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-[#0F172A] leading-[1.1] transition-all duration-[3000ms] transform ${textIndex === index
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4 pointer-events-none'
                        }`}
                    >
                      {item.text} <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1D4ED8] via-[#E63946] to-[#1D4ED8] bg-[length:200%_auto] animate-text-wave">
                        {item.highlight}
                      </span>
                    </Tag>
                  );
                })}
              </div>

              <p className="text-base md:text-xl text-gray-800 mb-8 md:mb-10 mt-12 md:mt-20 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium px-4 lg:px-0">
                Expert coaching for IELTS, TOEFL, GRE, GMAT & language training.
                Your gateway to study abroad success and global career opportunities.
              </p>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <div className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-sm font-semibold text-[#1D4ED8]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                  Test Prep
                </div>
                <div className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-sm font-semibold text-[#E63946]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                  Study Abroad
                </div>
                <div className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-sm font-semibold text-purple-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-8a2 2 0 012-2h14a2 2 0 012 2v8M3 21h18M3 21l8-8m10 8l-8-8"></path></svg>
                  Languages
                </div>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-5 justify-center lg:justify-start hidden-btn">
                <button className="px-8 py-4 bg-gradient-to-r from-[#1D4ED8] via-[#E63946] to-[#1D4ED8] bg-[length:200%_auto] animate-text-wave hover:from-[#E63946] hover:to-[#D62839] text-white rounded-xl font-bold text-lg transition-all shadow-xl shadow-blue-500/25 hover:shadow-red-500/40 hover:-translate-y-1 flex items-center justify-center gap-3">
                  Book Free Demo
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </button>
                <a
                  href="https://wa.me/919710043295"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-[#00D757] hover:bg-[#00c44e] text-white rounded-xl font-bold text-lg transition-all shadow-xl shadow-green-500/25 hover:shadow-green-500/40 hover:-translate-y-1 flex items-center justify-center gap-3"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
                  WhatsApp Us
                </a>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-8 pt-4">
                <div className="text-center lg:text-left">
                  <p className="font-bold text-3xl text-[#E63946] mb-1">50K+</p>
                  <p className="text-sm font-medium text-gray-500">Students Trained</p>
                </div>
                <div className="text-center lg:text-left">
                  <p className="font-bold text-3xl text-[#1D4ED8] mb-1">95%</p>
                  <p className="text-sm font-medium text-gray-500">Success Rate</p>
                </div>
                <div className="text-center lg:text-left">
                  <p className="font-bold text-3xl text-purple-600 mb-1">15+</p>
                  <p className="text-sm font-medium text-gray-500">Years Experience</p>
                </div>
              </div>

            </div>

            {/* Hero Visual */}
            <div className="relative z-10 hidden lg:block perspective-1000 -mt-12">
              <div className="relative w-full aspect-square max-w-[600px] mx-auto animate-float">
                {/* Main Glass Card with Red/Blue Gradient Border */}
                <div className="absolute inset-4 z-10 p-[0.5px] rounded-3xl bg-gradient-to-r from-[#E63946] to-[#1D4ED8] shadow-2xl overflow-hidden transform rotate-2 hover:rotate-0 transition-all duration-700">
                  <div className="relative w-full h-full bg-white/10 backdrop-blur-sm rounded-[20px] overflow-hidden">
                    {[
                      '/assets/people/students.png',
                      '/assets/people/graduate.png',
                      '/assets/people/study_abroad.png',
                      '/assets/people/tutor.png',
                      '/assets/people/learner.png'
                    ].map((img, index) => (
                      <div
                        key={img}
                        className={`absolute inset-0 transition-opacity duration-[3000ms] ease-in-out ${currentImageIndex === index ? 'opacity-100' : 'opacity-0'}`}
                      >
                        <Image
                          src={img}
                          alt={`Student Success Story - Sparkle Knowledge Yard Chennai ${index + 1}`}
                          fill
                          className="object-contain p-2 hover:scale-105 transition-transform duration-[3000ms] rounded-2xl"
                          priority={index === 0}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating Elements */}



              </div>
            </div>

          </div>
        </div>
      </section >












      {/* Floating Action Buttons */}
      < div className="fixed bottom-6 right-8 flex flex-col gap-3 z-50" >
        <a href="tel:+919710043295" className="w-14 h-14 bg-[#1D4ED8] text-white rounded-full shadow-lg shadow-blue-500/30 flex items-center justify-center hover:scale-110 transition-transform mb-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
        </a>
        <a href="https://wa.me/919710043295" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-[#00D757] text-white rounded-full shadow-lg shadow-green-500/30 flex items-center justify-center hover:scale-110 transition-transform animate-bounce">
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
        </a>
      </div >
      {/* Courses Grid */}
      <div>
        <NewsScrollBar />
      </div>
      <div>
        < Courses />
      </div>

      {/* About Section */}
      <div>
        < About />
      </div>

      {/* Certificates Section */}
      <div>
        < Certificates />
      </div>

      {/* Testimonials Section */}
      <div>
        <Testimonials />
      </div>
      <div id="blog">
        <Blog />
      </div>
      {/* Contact Section */}
      <div>
        < Contact />
      </div>
      <div>
        < NewsTicker />
      </div>

      {/* Footer */}
      <div>
        < Footer />
      </div>
    </div >
  );
}