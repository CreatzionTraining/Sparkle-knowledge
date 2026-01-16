'use client';

import React from 'react';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full glass bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#E63946] to-[#FA8072] flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-red-500/20">
              S
            </div>
            <a href="/" className="font-extrabold text-2xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#E63946] to-[#1D4ED8]">Sparkle</a>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            {['Home', 'Courses', 'About Us', 'Blog'].map((item) => (
              <a key={item} href={item === 'Home' ? '/' : '#'} className="font-medium text-gray-600 hover:text-gray-900 transition-colors relative group">
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#E63946] to-[#1D4ED8] transition-all group-hover:w-full"></span>
              </a>
            ))}
            <button className="bg-gradient-to-r from-[#E63946] to-[#1D4ED8] hover:opacity-90 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-lg shadow-blue-500/20 hover:shadow-red-500/30 transform hover:-translate-y-0.5">
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
  );
}
