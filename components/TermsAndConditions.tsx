'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function TermsAndConditions() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('introduction');

  // Handle scroll spy to highlight active section in sidebar
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['introduction', 'user-agreements', 'privacy-policy', 'intellectual-property', 'limitation-liability', 'contact'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Adjust for sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  const sections = [
    { id: 'introduction', title: '1. Introduction' },
    { id: 'user-agreements', title: '2. User Agreements' },
    { id: 'privacy-policy', title: '3. Privacy Policy' },
    { id: 'intellectual-property', title: '4. Intellectual Property' },
    { id: 'limitation-liability', title: '5. Limitation of Liability' },
    { id: 'contact', title: '6. Contact Us' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Hero Header - Split Screen Design */}
      <div className="bg-white border-b border-gray-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 items-center min-h-[500px]">
            
            {/* Left Side - Content */}
            <div className="px-6 sm:px-12 lg:px-16 py-16 sm:py-20 text-left order-2 lg:order-1 flex flex-col justify-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                Terms & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600">Conditions</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-xl leading-relaxed">
                Please read these terms carefully before using our services. By accessing Sparkle Academy, you agree to be bound by these terms.
              </p>
              <div className="text-sm font-medium text-slate-400">
                Last Updated: <span className="text-slate-900 font-semibold">January 14, 2026</span>
              </div>
            </div>

            {/* Right Side - Image (Fully Visible) */}
            <div className="relative h-full min-h-[400px] lg:min-h-[500px] order-1 lg:order-2 overflow-hidden bg-gray-100">
              <Image 
                src="/terms-hero-girl.png" 
                alt="Professional female student in educational setting with books" 
                fill 
                className="object-cover object-top"
                priority
                quality={100}
              />
            </div>

          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          
          {/* Sidebar Navigation (Sticky) */}
          <div className="hidden lg:block lg:col-span-3">
            <nav className="sticky top-24 space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative overflow-hidden ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-red-50 to-blue-50 text-blue-700 border-l-4 border-l-[#E63946] shadow-sm'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-l-4 border-transparent'
                  }`}
                >
                  <span className={`${activeSection === section.id ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#E63946] to-[#1D4ED8] font-bold' : ''}`}>
                    {section.title}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Legal Content */}
          <div className="lg:col-span-9">

            {/* Mobile Table of Contents */}
            <div className="lg:hidden mb-6 border-b border-gray-200">
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-6 px-4 min-w-max">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`pb-3 text-sm font-medium transition-all relative whitespace-nowrap ${
                        activeSection === section.id
                          ? 'text-slate-900 font-semibold'
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      {section.title.replace(/^\d+\.\s*/, '')}
                      {activeSection === section.id && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#E63946] to-[#1D4ED8] rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-12 space-y-16">
              
              {/* Section 1: Introduction */}
              <section id="introduction" className="space-y-4 scroll-mt-24">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#E63946] to-[#1D4ED8] text-white text-sm font-bold shadow-md shadow-blue-500/20">01</span>
                  Introduction
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                  <p>
                    Welcome to Sparkle Academy ("we," "our," or "us"). These Terms and Conditions govern your use of our website and educational services. By accessing or using our platform, you agree to comply with and be bound by these terms. If you disagree with any part of these terms, you may not access the service.
                  </p>
                  <p className="mt-4 p-4 bg-gradient-to-r from-red-50 to-blue-50 border-l-4 border-[#E63946] rounded-r-lg text-sm italic">
                    <strong>Note:</strong> We reserve the right to modify these terms at any time. Your continued use of the service following any changes indicates your acceptance of the new terms.
                  </p>
                </div>
              </section>

              {/* Section 2: User Agreements */}
              <section id="user-agreements" className="space-y-4 scroll-mt-24">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#E63946] to-[#1D4ED8] text-white text-sm font-bold shadow-md shadow-blue-500/20">02</span>
                  User Agreements
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                  <p>
                    When using our services, you agree to provide accurate, current, and complete information during the registration process. You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 mt-4 marker:text-[#E63946]">
                    <li>You must be at least 18 years old to use this service.</li>
                    <li>You may not use the service for any illegal or unauthorized purpose.</li>
                    <li>You must not transmit any worms or viruses or any code of a destructive nature.</li>
                  </ul>
                </div>
              </section>

              {/* Section 3: Privacy Policy */}
              <section id="privacy-policy" className="space-y-4 scroll-mt-24">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#E63946] to-[#1D4ED8] text-white text-sm font-bold shadow-md shadow-blue-500/20">03</span>
                  Privacy Policy
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                  <p>
                    Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using our services, you agree to the collection and use of information in accordance with this policy.
                  </p>
                  <p>
                    We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.
                  </p>
                </div>
              </section>

              {/* Section 4: Intellectual Property */}
              <section id="intellectual-property" className="space-y-4 scroll-mt-24">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#E63946] to-[#1D4ED8] text-white text-sm font-bold shadow-md shadow-blue-500/20">04</span>
                  Intellectual Property
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                  <p>
                    The service and its original content, features, and functionality are and will remain the exclusive property of Sparkle Academy and its licensors. The service is protected by copyright, trademark, and other laws of both the country and foreign countries.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                      <h4 className="font-bold text-slate-900 mb-2">Permitted Use</h4>
                      <p className="text-sm">Personal, non-commercial use of our educational materials for your own learning.</p>
                    </div>
                    <div className="p-4 border border-red-100 rounded-xl bg-red-50">
                      <h4 className="font-bold text-red-900 mb-2">Prohibited Use</h4>
                      <p className="text-sm text-red-800">Reproduction, distribution, or resale of our course materials without explicit permission.</p>
                    </div>
                  </div>
                </div>
              </section>

               {/* Section 5: Limitation of Liability */}
               <section id="limitation-liability" className="space-y-4 scroll-mt-24">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#E63946] to-[#1D4ED8] text-white text-sm font-bold shadow-md shadow-blue-500/20">05</span>
                  Limitation of Liability
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                  <p>
                   In no event shall Sparkle Academy, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
                  </p>
                </div>
              </section>

              {/* Section 6: Contact Us */}
              <section id="contact" className="space-y-4 scroll-mt-24 pt-8 border-t border-gray-100">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#E63946] to-[#1D4ED8] text-white text-sm font-bold shadow-md shadow-blue-500/20">06</span>
                  Have Questions?
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                  <p>
                    If you have any questions about these Terms, please contact us at:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <a href="mailto:contact@sparkleknowledgeyard.com" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-[#E63946] to-[#1D4ED8] hover:opacity-90 transition-all shadow-lg shadow-blue-500/20 hover:shadow-red-500/30">
                      contact@sparkleknowledgeyard.com
                    </a>
                    <button onClick={() => router.push('/#contact')} className="inline-flex items-center justify-center px-6 py-3 border border-gray-200 text-base font-medium rounded-lg text-slate-700 bg-white hover:bg-gray-50 transition-colors cursor-pointer">
                      Visit Contact Page
                    </button>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

