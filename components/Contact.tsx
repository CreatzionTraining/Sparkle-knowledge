'use client';

import React, { useState } from 'react';

// Icon components (inline SVG)
// Icon components (inline SVG)
const MapPin = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 2C7.589 2 4 5.589 4 10C4 16 12 22 12 22C12 22 20 16 20 10C20 5.589 16.411 2 12 2ZM12 12.5C10.619 12.5 9.5 11.381 9.5 10C9.5 8.619 10.619 7.5 12 7.5C13.381 7.5 14.5 8.619 14.5 10C14.5 11.381 13.381 12.5 12 12.5Z" />
  </svg>
);

const Phone = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M16.57 22C14.2885 21.9961 12.0674 21.3789 10.09 20.2C8.17937 19.0558 6.50567 17.4871 5.23 15.63C3.65089 13.2372 2.89938 10.4285 3.06 7.57C3.09 6.27 4.15 5.24 5.45 5.24H8.22C9.07 5.24 9.8 5.86 9.94 6.7L10.23 8.65C10.37 9.57 9.92 10.46 9.15 10.96L8.03 11.69C9.01 13.62 10.63 15.24 12.57 16.22L13.29 15.11C13.79 14.34 14.67 13.88 15.6 14.03L17.55 14.32C18.39 14.45 19.01 15.19 19.01 16.03V18.82C19.01 20.21 17.86 21.3 16.57 22Z" />
  </svg>
);

const Mail = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M20 4H4C2.897 4 2 4.897 2 6V18C2 19.103 2.897 20 4 20H20C21.103 20 22 19.103 22 18V6C22 4.897 21.103 4 20 4ZM20 6V6.511L12 13.065L4 6.511V6H20ZM4 18V9.044L11.386 15.098C11.5611 15.2413 11.7773 15.3187 12 15.3187C12.2227 15.3187 12.4389 15.2413 12.614 15.098L20 9.044L20.002 18H4Z" />
  </svg>
);

const Clock = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" />
    <path d="M13 7H11V13H17V11H13V7Z" />
  </svg>
);

const Send = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

export function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    course: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Start loading animation
    setIsSubmitting(true);
    
    // Simulate API call (replace with your actual API call)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    
    // Stop loading and show success modal
    setIsSubmitting(false);
    setShowSuccessModal(true);
    
    // Reset form
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      course: '',
      message: ''
    });
    
    // Auto-close modal after 5 seconds
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center bg-white rounded-full px-4 py-2 shadow-sm mb-4">
            <MapPin className="w-4 h-4 text-[#1D4ED8] mr-2" />
            <span className="text-xs sm:text-sm font-semibold text-gray-700">Get In Touch</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
            Visit Our Center
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Come visit us for a free consultation and see why we&apos;re the #1 choice for test prep
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 order-2 lg:order-1">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    suppressHydrationWarning
                    className="w-full px-4 py-3 sm:py-3.5 border-2 border-gray-200 rounded-lg focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/20 outline-none transition-all text-base text-gray-900 placeholder:text-gray-500"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (234) 567-890"
                    required
                    suppressHydrationWarning
                    className="w-full px-4 py-3 sm:py-3.5 border-2 border-gray-200 rounded-lg focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/20 outline-none transition-all text-base text-gray-900 placeholder:text-gray-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  suppressHydrationWarning
                  className="w-full px-4 py-3 sm:py-3.5 border-2 border-gray-200 rounded-lg focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/20 outline-none transition-all text-base text-gray-900 placeholder:text-gray-500"
                />
              </div>
              <div>
                <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-2">
                  Interested In
                </label>
                <div className="relative group">
                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    required
                    suppressHydrationWarning
                    className="w-full px-4 py-3 sm:py-3.5 pr-12 border-2 border-gray-200 rounded-lg focus:border-transparent focus:ring-2 focus:ring-[#1D4ED8] outline-none transition-all duration-300 text-base bg-white text-gray-900 appearance-none cursor-pointer hover:border-gray-300 hover:shadow-md font-medium"
                  >
                    <option value="" disabled className="text-gray-400">Select a course</option>
                    <option value="ielts" className="text-gray-900 py-2">IELTS</option>
                    <option value="toefl" className="text-gray-900 py-2">TOEFL</option>
                    <option value="pte" className="text-gray-900 py-2">PTE</option>
                    <option value="gre" className="text-gray-900 py-2">GRE</option>
                    <option value="gmat" className="text-gray-900 py-2">GMAT</option>
                    <option value="study-abroad" className="text-gray-900 py-2">Study Abroad Counseling</option>
                    <option value="language" className="text-gray-900 py-2">Language Training</option>
                  </select>
                  {/* Custom Dropdown Arrow */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-300 group-focus-within:rotate-180">
                    <svg 
                      className="w-5 h-5 text-gray-600 group-hover:text-[#1D4ED8] transition-colors" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                  {/* Gradient Border Effect on Focus */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#E63946] to-[#1D4ED8] opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about your goals..."
                  required
                  suppressHydrationWarning
                  className="w-full px-4 py-3 sm:py-3.5 border-2 border-gray-200 rounded-lg focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/20 outline-none transition-all resize-none text-base text-gray-900 placeholder:text-gray-500"
                ></textarea>
              </div>
              {/* Terms Checkbox */}
              <div className="flex items-start gap-3 mb-6 group">
                <div className="relative flex items-center h-6">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="w-5 h-5 border-2 border-gray-300 rounded focus:ring-blue-500 text-blue-600 transition-all cursor-pointer peer checked:border-blue-600"
                  />
                  <svg 
                    className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth="3"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer select-none">
                  I agree to the <a href="/terms" className="text-blue-600 hover:text-blue-700 hover:underline font-medium">Terms & Conditions</a> and <a href="/privacy" className="text-blue-600 hover:text-blue-700 hover:underline font-medium">Privacy Policy</a>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !acceptedTerms}
                className="w-full relative overflow-hidden rounded-xl font-bold text-lg text-white shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed group"
              >
                {/* Smooth Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#E63946] via-[#1D4ED8] to-[#E63946] bg-[length:200%_auto] animate-gradient-smooth"></div>
                
                {/* Soft Shine Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:!translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>

                {/* Button Content */}
                <div className="relative z-10 py-4 px-8 flex items-center justify-center gap-3">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Start Your Journey Here</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </div>
              </button>
            </form>
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
            {/* Contact Info Cards - Compact 2x2 Grid */}
            <div className="grid grid-cols-2 gap-3">
              {/* Visit Us */}
              <a 
                href="https://www.google.com/maps/search/Sparkle+Knowledge+Yard,+Perambur,+Chennai/@13.1146754,80.2329381,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-gradient-to-br from-blue-50 via-white to-blue-50/30 backdrop-blur-sm p-3.5 rounded-2xl border border-blue-200/60 hover:border-blue-400 hover:scale-[1.02] shadow-sm hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative flex flex-col h-full">
                  {/* Icon with glow effect */}
                  <div className="relative w-8 h-8 mb-2.5 flex-shrink-0">
                    <div className="absolute inset-0 bg-blue-500/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 mb-1">
                      <h4 className="font-bold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">Visit Us</h4>
                      <svg className="w-3 h-3 text-blue-500 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                    <p className="text-gray-700 text-xs leading-snug font-medium">
                      2nd Floor, 331, Paper Mills Road, Bunder Garden, Perambur, Chennai 600011
                    </p>
                  </div>
                </div>
              </a>

              {/* Call Us */}
              <div className="group relative bg-gradient-to-br from-red-50 via-white to-red-50/30 backdrop-blur-sm p-3.5 rounded-2xl border border-red-200/60 hover:border-red-400 hover:scale-[1.02] shadow-sm hover:shadow-xl hover:shadow-red-500/25 transition-all duration-300 overflow-hidden flex flex-col">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative flex flex-col h-full">
                  {/* Icon with glow effect */}
                  <div className="relative w-8 h-8 mb-2.5 flex-shrink-0">
                    <div className="absolute inset-0 bg-red-500/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative w-full h-full bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-red-600 transition-colors">Call Us</h4>
                    <a 
                      href="tel:+919710043295" 
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = 'tel:+919710043295';
                      }}
                      className="text-gray-900 text-[15px] font-bold hover:text-red-600 hover:underline transition-all block mb-1 cursor-pointer"
                    >
                      +91 97100 43295
                    </a>
                    <p className="text-gray-600 text-xs font-medium leading-snug">Monday to Saturday<br />9:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Email Us */}
              <div className="group relative bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30 backdrop-blur-sm p-3.5 rounded-2xl border border-emerald-200/60 hover:border-emerald-400 hover:scale-[1.02] shadow-sm hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 overflow-hidden flex flex-col">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative flex flex-col h-full">
                  {/* Icon with glow effect */}
                  <div className="relative w-8 h-8 mb-2.5 flex-shrink-0">
                    <div className="absolute inset-0 bg-emerald-500/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative w-full h-full bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-emerald-600 transition-colors">Email Us</h4>
                    <a 
                      href="mailto:info@sparkleacademy.com"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = 'mailto:info@sparkleacademy.com';
                      }}
                      className="text-gray-700 text-xs hover:text-emerald-600 hover:underline transition-all block truncate mb-0.5 font-medium cursor-pointer"
                    >
                      info@sparkleacademy.com
                    </a>
                    <a 
                      href="mailto:support@sparkleacademy.com"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = 'mailto:support@sparkleacademy.com';
                      }}
                      className="text-gray-700 text-xs hover:text-emerald-600 hover:underline transition-all block truncate font-medium cursor-pointer"
                    >
                      support@sparkleacademy.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="group relative bg-gradient-to-br from-purple-50 via-white to-purple-50/30 backdrop-blur-sm p-3.5 rounded-2xl border border-purple-200/60 hover:border-purple-400 hover:scale-[1.02] shadow-sm hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 overflow-hidden flex flex-col">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative flex flex-col h-full">
                  {/* Icon with glow effect */}
                  <div className="relative w-8 h-8 mb-2.5 flex-shrink-0">
                    <div className="absolute inset-0 bg-purple-500/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative w-full h-full bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-sm mb-1.5 group-hover:text-purple-600 transition-colors">Working Hours</h4>
                    <div className="space-y-1.5">
                      <div>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                          <span className="text-gray-700 text-xs font-medium">Monday to Friday</span>
                        </div>
                        <p className="text-gray-900 text-xs font-bold pl-3">9:00 AM - 8:00 PM</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                          <span className="text-gray-700 text-xs font-medium">Saturday to Sunday</span>
                        </div>
                        <p className="text-gray-900 text-xs font-bold pl-3">10:00 AM - 6:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map - Clickable to Open */}
            <a 
              href="https://www.google.com/maps/search/Sparkle+Knowledge+Yard,+Perambur,+Chennai/@13.1146754,80.2329381,17z"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block bg-white rounded-2xl shadow-lg overflow-hidden h-56 sm:h-64 lg:h-72 cursor-pointer transform hover:-translate-y-1 transition-all duration-300"
            >
              <iframe
                src="https://maps.google.com/maps?q=Sparkle%20Knowledge%20Yard,%20331,%20Paper%20Mills%20Road,%20Bunder%20Garden,%20Perambur,%20Chennai&t=&z=17&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                className="pointer-events-none" 
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sparkle Knowledge Yard Location"
              ></iframe>
              
              {/* Map Overlay Badge */}
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-300 z-10 flex items-center justify-center">
                <div className="bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full shadow-xl shadow-blue-500/20 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2.5 border border-white/50">
                  <MapPin className="w-4 h-4 text-[#1D4ED8]" />
                  <span className="text-sm font-bold text-gray-900">Open Location</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* SUPER PROFESSIONAL Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Premium Backdrop */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-900/70 to-black/80 backdrop-blur-xl"
            onClick={() => setShowSuccessModal(false)}
            style={{ animation: 'fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
          ></div>
          
          {/* Modal Container */}
          <div 
            className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
            style={{ animation: 'modalSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            {/* Close X Button - Modern & Minimal */}
            <button 
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all z-20"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Content Container */}
            <div className="p-8 sm:p-12 text-center relative overflow-hidden">
              {/* Soft decorative background blobs */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-red-100 rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2"></div>
              
              {/* Success Icon - Central & Animated */}
              <div className="relative flex justify-center mb-6 z-10">
                <div className="relative">
                  {/* Outer Ring */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#1D4ED8] to-[#E63946] rounded-full opacity-10 animate-ping"></div>
                  
                  {/* Icon Circle */}
                  <div 
                    className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-tr from-[#1D4ED8] to-[#E63946] rounded-full flex items-center justify-center shadow-xl shadow-blue-500/20"
                    style={{ animation: 'scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s both' }}
                  >
                    <svg 
                      className="w-10 h-10 sm:w-12 sm:h-12 text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      style={{ animation: 'checkDraw 0.8s cubic-bezier(0.65, 0, 0.35, 1) 0.3s both' }}
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="3" 
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Title & Description */}
              <div className="relative z-10 space-y-3">
                <h3 
                  className="text-2xl sm:text-3xl font-bold text-gray-900"
                  style={{ animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both' }}
                >
                  Message Sent!
                </h3>
                
                <p 
                  className="text-gray-500 font-medium"
                  style={{ animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both' }}
                >
                  We've received your inquiry
                </p>

                <div 
                  className="pt-4"
                  style={{ animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both' }}
                >
                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-sm mx-auto">
                    Thank you for reaching out. Our team will review your message and respond within <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1D4ED8] to-[#E63946]">24 hours</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Premium Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes checkDraw {
          from {
            stroke-dasharray: 100;
            stroke-dashoffset: 100;
          }
          to {
            stroke-dasharray: 100;
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fly {
          0% {
            transform: translateX(0) translateY(0) scale(1);
            opacity: 1;
          }
          20% {
            transform: translateX(-10px) translateY(10px) scale(0.9);
          }
          100% {
            transform: translateX(100px) translateY(-100px) scale(0.5);
            opacity: 0;
          }
        }

        @keyframes gradient-smooth {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .animate-fly {
          animation: fly 0.6s ease-in-out forwards;
        }

        .animate-gradient-smooth {
          animation: gradient-smooth 3s ease infinite;
        }
      `}</style>
    </section>
  );
}
