import React from 'react';
import Image from 'next/image';
import { Certificates } from './Certificates';
import { Courses } from './Courses';
import { Footer } from './Footer';

export default function HomeContent() {
  return (
    <div className="min-h-screen text-[#0F172A] font-sans selection:bg-[#E63946] selection:text-white overflow-x-hidden relative">


      {/* Navbar - Fixed z-50 */}
      <nav className="fixed top-0 z-50 w-full glass border-b border-white/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#E63946] to-[#FA8072] flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-red-500/20">
                S
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-[#1D4ED8]">Sparkle</span>
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              {['Home', 'Courses', 'About Us', 'Blog'].map((item) => (
                <a key={item} href="#" className="font-medium text-gray-600 hover:text-[#1D4ED8] transition-colors relative group">
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1D4ED8] transition-all group-hover:w-full"></span>
                </a>
              ))}
              <button className="bg-[#E63946] hover:bg-[#D62839] text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-lg shadow-red-500/30 hover:shadow-red-500/40 transform hover:-translate-y-0.5">
                Enquiry Now
              </button>
            </div>
            <div className="md:hidden flex items-center">
              <button className="text-gray-700 hover:text-[#1D4ED8]">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 lg:pt-32 lg:pb-48 overflow-hidden">
        {/* Dynamic Background - Absolute inside Hero */}
        <div className="absolute inset-0 -z-20">
          <Image
            src="/assets/backgrounds/new.png"
            alt="Geometric Background"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/10 to-[#F8FAFC]/50"></div>
        </div>

        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#1D4ED8]/10 to-[#2563EB]/5 blur-3xl animate-float -z-10"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#E63946]/10 to-[#FA8072]/5 blur-3xl animate-float-delayed -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Hero Text */}
            <div className="text-center lg:text-left z-10">
              <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full glass mb-8 border border-blue-100 shadow-sm animate-fade-in-up">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E63946]"></span>
                </span>
                <span className="text-[#1D4ED8] font-semibold text-sm tracking-wide uppercase">#1 Rated Study Abroad Platform</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-[#0F172A] mb-8 leading-[1.1]">
                Master Global <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E63946] via-[#D62839] to-[#1D4ED8]">
                  Exams & Languages
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
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

              <div className="mt-10 flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <button className="px-8 py-4 bg-gradient-to-r from-[#E63946] to-[#D62839] hover:from-[#D62839] hover:to-[#C52233] text-white rounded-xl font-bold text-lg transition-all shadow-xl shadow-red-500/25 hover:shadow-red-500/40 hover:-translate-y-1 flex items-center justify-center gap-3">
                  Book Free Demo
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </button>
                <button className="px-8 py-4 bg-[#00D757] hover:bg-[#00c44e] text-white rounded-xl font-bold text-lg transition-all shadow-xl shadow-green-500/25 hover:shadow-green-500/40 hover:-translate-y-1 flex items-center justify-center gap-3">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
                  WhatsApp Us
                </button>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-8 border-t border-gray-200 pt-8">
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
            <div className="relative z-10 hidden lg:block perspective-1000">
              <div className="relative w-full aspect-square max-w-[600px] mx-auto animate-float">
                {/* Main Glass Card */}
                <div className="absolute inset-4 glass rounded-3xl z-10 overflow-hidden transform rotate-2 hover:rotate-0 transition-all duration-700 shadow-2xl">
                  <div className="relative w-full h-full">
                    <Image
                      src="/assets/3d/test-prep.png"
                      alt="Test Preparation 3D"
                      fill
                      className="object-contain p-8 hover:scale-105 transition-transform duration-700"
                      priority
                    />
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-0 right-0 glass-dark p-4 rounded-2xl z-20 animate-float-delayed shadow-xl backdrop-blur-md">
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-300 mb-1">Average Score</span>
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#E63946] to-pink-500">8.5/9</span>
                    <span className="text-xs font-medium text-white/80">IELTS Band</span>
                  </div>
                </div>

                <div className="absolute -bottom-6 left-10 glass-dark p-4 rounded-2xl z-20 animate-float shadow-xl backdrop-blur-md flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-blue-400 to-blue-600`}></div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">2,500+</p>
                    <p className="text-[10px] text-gray-300 leading-tight">Study Abroad Success</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">Explore Our Courses</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive tailored curriculums designed to help you smash your target scores.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'IELTS Academic', color: 'bg-orange-50', iconColor: 'text-orange-600', desc: 'Expert guidance for reading, writing, listening, and speaking modules.' },
              { title: 'TOEFL iBT', color: 'bg-blue-50', iconColor: 'text-blue-600', desc: 'Master the internet-based test with our specialized strategies.' },
              { title: 'PTE', color: 'bg-green-50', iconColor: 'text-green-600', desc: 'Fast-track your english proficiency for study and migration.' },
              { title: 'GRE', color: 'bg-purple-50', iconColor: 'text-purple-600', desc: 'Ace the verbal and quantitative sections for grad school admission.' },
              { title: 'GMAT', color: 'bg-indigo-50', iconColor: 'text-indigo-600', desc: 'Top-tier preparation for business school aspirants.' },
              { title: 'Spoken English', color: 'bg-rose-50', iconColor: 'text-rose-600', desc: 'Build confidence and fluency for personal and professional growth.' },
            ].map((course, idx) => (
              <div key={idx} className="group p-8 rounded-2xl border border-gray-100 hover:border-[#1D4ED8]/20 bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-24 h-24 ${course.color} rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110`}></div>
                <h3 className="text-2xl font-bold text-[#0F172A] mb-3 relative z-10">{course.title}</h3>
                <p className="text-gray-600 mb-6 relative z-10">{course.desc}</p>
                <a href="#" className={`font-semibold ${course.iconColor} flex items-center gap-1 group-hover:translate-x-1 transition-transform`}>
                  Learn more <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#0F172A] text-white relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-800/50">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-[#FF6B35] mb-2">10k+</div>
              <div className="text-gray-400">Students Trained</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-[#2563EB] mb-2">98%</div>
              <div className="text-gray-400">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-[#E63946] mb-2">50+</div>
              <div className="text-gray-400">Expert Trainers</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-emerald-500 mb-2">4.9</div>
              <div className="text-gray-400">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#1D4ED8] to-[#1e40af] rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">Ready to start your journey?</h2>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto relative z-10">
              Join thousands of students who have already achieved their dream scores with Sparkle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <button className="px-8 py-3 bg-white text-[#1D4ED8] font-bold rounded-full hover:bg-gray-50 transition-colors shadow-lg">
                Book Free Consultation
              </button>
              <button className="px-8 py-3 bg-[#E63946] text-white font-bold rounded-full hover:bg-[#d62839] transition-colors shadow-lg">
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Visual Experience Section */}
      <section className="py-24 relative z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* 3D Card 1 */}
            <div className="group relative h-[400px] rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-red-500/20 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-[#E63946] to-[#FF9E00]"></div>
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
                <h3 className="text-5xl font-extrabold text-white mb-2 drop-shadow-md">A+</h3>
                <div className="w-24 h-1 bg-white/50 rounded-full mb-8"></div>
              </div>

              <div className="absolute bottom-0 left-0 w-full glass p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="text-xl font-bold text-[#0F172A]">Test Prep</h4>
                <p className="text-sm text-gray-600">IELTS, OET, PTE, TOEFL</p>
              </div>
            </div>

            {/* 3D Card 2 */}
            <div className="group relative h-[400px] rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-blue-500/20 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gray-100"></div>
              <div className="absolute inset-0 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-700">
                <div className="relative w-64 h-64">
                  <Image
                    src="/assets/3d/languages.png"
                    alt="Global Languages"
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full glass p-6">
                <h4 className="text-xl font-bold text-[#0F172A]">Foreign Languages</h4>
                <p className="text-sm text-gray-600">German, French, Spanish, Japanese</p>
              </div>
            </div>

            {/* 3D Card 3 */}
            <div className="group relative h-[400px] rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-purple-500/20 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-100 to-white"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Placeholder for 3rd 3D asset if we had one, recreating simple shapes */}
                <div className="w-40 h-40 glass rounded-full flex items-center justify-center shadow-inner relative overflow-hidden group-hover:scale-110 transition-all">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent"></div>
                  <Image
                    src="/assets/3d/test-prep.png"
                    alt="Test Prep"
                    width={100}
                    height={100}
                    className="object-contain opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                  />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full glass p-6">
                <h4 className="text-xl font-bold text-[#0F172A]">Global Careers</h4>
                <p className="text-sm text-gray-600">Study & Work Abroad Consultation</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer Placeholder */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200 pt-16 pb-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#E63946] to-[#FA8072] flex items-center justify-center text-white font-bold text-xs">S</div>
              <span className="font-bold text-xl text-gray-900">Sparkle</span>
            </div>
            <div className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Sparkle Education. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
        <button className="w-14 h-14 bg-[#1D4ED8] text-white rounded-full shadow-lg shadow-blue-500/30 flex items-center justify-center hover:scale-110 transition-transform">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
        </button>
        <button className="w-14 h-14 bg-[#00D757] text-white rounded-full shadow-lg shadow-green-500/30 flex items-center justify-center hover:scale-110 transition-transform animate-bounce">
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
        </button>
      </div>
 {/* Courses Grid */}
      <Courses />

      {/* Certificates Section */}
      <Certificates />

      {/* Footer */}
      <Footer />
    </div>
  );
}