'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const hideTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if at top (for transparency/logo visibility)
      if (currentScrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Clear any existing auto-hide timer when scrolling occurs
      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
      }

      // Visibility Logic (Desktop Only)
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling DOWN
        setIsVisible(false);
      } else {
        // Scrolling UP
        setIsVisible(true);
        
        // Auto-Hide after 2.5 seconds of inactivity
        hideTimer.current = setTimeout(() => {
          setIsVisible(false);
        }, 2500);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', link: '/' },
    { name: 'Courses', link: '/#courses' },
    { name: 'Blog', link: '/blog' },
    { name: 'About', link: '/#about' },
    { name: 'Contact', link: '/#contact' }
  ];

  return (
    <>
      <nav 
        className={`w-full z-50 transition-all duration-500 transform
          absolute top-0 lg:fixed
          ${isVisible ? 'lg:translate-y-0' : 'lg:-translate-y-full'} 
          lg:bg-transparent bg-transparent
          h-28 pointer-events-none`}
      >
        <div className="max-w-[95%] lg:max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 h-full">
          <div className="flex justify-between items-center h-full">

            {/* Logo Section */}
            <div 
              className={`flex-shrink-0 flex items-center -ml-5 lg:ml-0 lg:mt-4 pointer-events-auto transition-all duration-300 ${
                isScrolled 
                  ? 'lg:opacity-0 lg:-translate-y-4 lg:pointer-events-none' 
                  : 'lg:opacity-100 lg:translate-y-0 lg:pointer-events-auto'
              }`}
            >
              <Link href="/" className="relative h-24 w-[70vw] sm:h-24 sm:w-72 lg:h-40 lg:w-[240px] block transition-transform duration-300">
                <Image
                  src="/sparkle_logo.png"
                  alt="Sparkle Knowledge Yard"
                  fill
                  className="object-contain object-left scale-[1.75] origin-left"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation - Glass Pill */}
            <div className="hidden lg:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
              <div className="flex items-center gap-2 px-3 py-2 bg-white/70 border border-white/40 rounded-full backdrop-blur-xl shadow-xl transition-all duration-300 hover:bg-white/80 hover:shadow-2xl hover:scale-[1.01]">
                {navLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.link}
                    className="relative px-5 py-2.5 rounded-full text-[15px] font-semibold transition-all duration-300 group overflow-hidden text-slate-600 hover:text-white hover:shadow-lg hover:shadow-blue-500/30"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1D4ED8] via-[#8B44AC] to-[#E63946] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10" suppressHydrationWarning>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Side - Actions */}
            <div className="flex items-center gap-4 pointer-events-auto relative z-50">
              
              {/* Enquiry Button - Desktop (Hides on Scroll) */}
              <div 
                className={`hidden lg:flex items-center transition-all duration-300 ${
                  isScrolled 
                    ? 'opacity-0 -translate-y-4 pointer-events-none' 
                    : 'opacity-100 translate-y-0 pointer-events-auto'
                }`}
              >
                <Link href="/#contact" className="group relative px-6 py-2.5 bg-gradient-to-r from-[#1D4ED8] via-[#E63946] to-[#1D4ED8] bg-[length:200%_auto] animate-text-wave rounded-full text-white font-bold text-sm shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 skew-x-12"></div>
                  <span className="relative flex items-center gap-2">
                    Enquire Now
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </span>
                </Link>
              </div>

              {/* Mobile Menu Button - Hamburger */}
              <div className="lg:hidden">
                <button 
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2 text-gray-800 transition-colors rounded-full -mt-2"
                  aria-label="Open Menu"
                >
                  <Menu className="w-7 h-7" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </nav>

      {/* Professional Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Professional Mobile Menu Sidebar */}
      <div 
        className={`fixed top-0 right-0 z-[70] w-[85%] max-w-[400px] h-full bg-white shadow-2xl transition-transform duration-500 ease-out lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full bg-white">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
             <span className="text-xl font-bold bg-gradient-to-r from-[#E63946] to-[#1D4ED8] bg-clip-text text-transparent">
               Sparkle Academy
             </span>
             <button 
               onClick={() => setIsMobileMenuOpen(false)}
               className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
             >
               <X className="w-6 h-6" />
             </button>
          </div>

          {/* Links */}
          <div className="flex-1 overflow-y-auto py-8 px-6">
            <div className="flex flex-col gap-1">
              {navLinks.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group flex items-center justify-between py-4 px-2 text-lg font-semibold text-slate-700 hover:text-[#1D4ED8] border-b border-gray-50 transition-all"
                  style={{
                     animation: isMobileMenuOpen ? `fadeInRight 0.5s ease-out forwards ${index * 0.05 + 0.2}s` : 'none',
                     opacity: 0,
                     transform: 'translateX(20px)'
                  }}
                >
                  <span className="group-hover:translate-x-2 transition-transform duration-300">
                    {item.name}
                  </span>
                  <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#1D4ED8]" />
                </Link>
              ))}
            </div>
          </div>

          {/* Footer CTA */}
          <div className="p-6 border-t border-gray-100 bg-gray-50/50">
            <Link 
              href="/#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-[#1D4ED8] via-[#E63946] to-[#1D4ED8] bg-[length:200%_auto] animate-gradient-x text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
            >
              <span>Enquiry Now</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </Link>
            
            <div className="mt-6 text-center">
               <p className="text-xs text-gray-400 font-medium tracking-wide">
                 © 2026 Sparkle Knowledge Yard
               </p>
            </div>
          </div>
        </div>
        
        <style jsx global>{`
          @keyframes fadeInRight {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
          }
        `}</style>
      </div>
    </>
  );
}

