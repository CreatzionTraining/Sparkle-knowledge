'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="absolute top-0 z-50 w-full bg-transparent">
      <div className="max-w-[95%] lg:max-w-[1400px] mx-auto px-8 lg:px-12">
        <div className="flex justify-between items-center h-28">

          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center -ml-4 lg:-ml-12 mt-4">
            <Link href="/" className="relative h-60 w-[550px] block">
              <Image
                src="/sparkle_logo.png"
                alt="Sparkle Knowledge Yard - Best IELTS & Language Training Institute in Chennai"
                fill
                className="object-contain object-left"
                priority
              />
            </Link>
          </div>

          {/* Centered Pill Navigation */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center gap-8 px-12 py-3 bg-white/40 border border-[#B9D9EB] rounded-full backdrop-blur-[2px]">
              {[
                { name: 'Home', link: '/' },
                { name: 'Services', link: '/#courses' },
                { name: 'Work', link: '/#certificates' },
                { name: 'About', link: '/#about' },
                { name: 'Contact', link: '/#contact' }
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.link}
                  className="font-medium text-[#333333] hover:text-[#1D4ED8] text-[15px] transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side - Enquiry Now CTA */}
          <div className="hidden lg:flex items-center">
            <Link href="/#contact" className="group relative px-6 py-2.5 bg-gradient-to-r from-[#1D4ED8] via-[#E63946] to-[#1D4ED8] bg-[length:200%_auto] animate-text-wave rounded-full text-white font-bold text-sm shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 skew-x-12"></div>
              <span className="relative flex items-center gap-2">
                Enquiry Now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button - Right aligned */}
          <div className="lg:hidden flex items-center">
            <button className="text-gray-700 hover:text-[#1D4ED8]">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}
