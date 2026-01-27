'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function PrivacyPolicy() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('introduction');

  // Handle scroll spy to highlight active section in sidebar
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['introduction', 'information-collection', 'data-usage', 'data-protection', 'cookies', 'third-party', 'user-rights', 'contact'];
      
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
    { id: 'information-collection', title: '2. Information Collection' },
    { id: 'data-usage', title: '3. Data Usage' },
    { id: 'data-protection', title: '4. Data Protection' },
    { id: 'cookies', title: '5. Cookies' },
    { id: 'third-party', title: '6. Third-Party Services' },
    { id: 'user-rights', title: '7. Your Rights' },
    { id: 'contact', title: '8. Contact Us' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Hero Header - Split Screen Design */}
      <div className="bg-white border-b border-gray-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 items-start lg:items-center">
            
            {/* Left Side - Content */}
            <div className="px-6 sm:px-12 lg:px-16 py-8 sm:py-20 text-left order-2 lg:order-1 flex flex-col justify-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600">Policy</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-xl leading-relaxed">
                Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
              </p>
              <div className="text-sm font-medium text-slate-400">
                Last Updated: <span className="text-slate-900 font-semibold">January 15, 2026</span>
              </div>
            </div>

            {/* Right Side - Image (Fully Visible) */}
            <div className="relative h-[300px] sm:h-[400px] lg:h-full lg:min-h-[500px] order-1 lg:order-2 overflow-hidden bg-gray-100">
              <Image 
                src="/privacy-hero.png" 
                alt="Professional woman representing data privacy and security" 
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
                    At Sparkle Academy, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our educational services.
                  </p>
                  <p className="mt-4 p-4 bg-gradient-to-r from-red-50 to-blue-50 border-l-4 border-[#E63946] rounded-r-lg text-sm italic">
                    <strong>Note:</strong> By using our services, you consent to the data practices described in this policy. Please read this policy carefully to understand our views and practices regarding your personal data.
                  </p>
                </div>
              </section>

              {/* Section 2: Information Collection */}
              <section id="information-collection" className="space-y-4 scroll-mt-24">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#E63946] to-[#1D4ED8] text-white text-sm font-bold shadow-md shadow-blue-500/20">02</span>
                  Information We Collect
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                  <p>
                    We collect information that you provide directly to us, including:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 mt-4 marker:text-[#E63946]">
                    <li><strong>Personal Information:</strong> Name, email address, phone number, and mailing address</li>
                    <li><strong>Account Information:</strong> Username, password, and profile information</li>
                    <li><strong>Educational Information:</strong> Course enrollments, progress, test scores, and certifications</li>
                    <li><strong>Payment Information:</strong> Billing details and transaction history</li>
                    <li><strong>Communication Data:</strong> Messages, feedback, and support inquiries</li>
                  </ul>
                  <p className="mt-4">
                    We also automatically collect certain information when you use our services, including IP address, browser type, device information, and usage patterns.
                  </p>
                </div>
              </section>

              {/* Section 3: Data Usage */}
              <section id="data-usage" className="space-y-4 scroll-mt-24">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#E63946] to-[#1D4ED8] text-white text-sm font-bold shadow-md shadow-blue-500/20">03</span>
                  How We Use Your Information
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                  <p>
                    We use the information we collect for various purposes, including:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                      <h4 className="font-bold text-slate-900 mb-2">Service Delivery</h4>
                      <p className="text-sm">Providing, maintaining, and improving our educational services and course content.</p>
                    </div>
                    <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                      <h4 className="font-bold text-slate-900 mb-2">Communication</h4>
                      <p className="text-sm">Sending course updates, newsletters, and important notifications about your account.</p>
                    </div>
                    <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                      <h4 className="font-bold text-slate-900 mb-2">Personalization</h4>
                      <p className="text-sm">Customizing your learning experience and recommending relevant courses.</p>
                    </div>
                    <div className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                      <h4 className="font-bold text-slate-900 mb-2">Analytics</h4>
                      <p className="text-sm">Analyzing usage patterns to improve our platform and educational offerings.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 4: Data Protection */}
              <section id="data-protection" className="space-y-4 scroll-mt-24">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#E63946] to-[#1D4ED8] text-white text-sm font-bold shadow-md shadow-blue-500/20">04</span>
                  Data Protection & Security
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                  <p>
                    We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. Our security practices include:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 mt-4 marker:text-[#E63946]">
                    <li>Encryption of data in transit and at rest using SSL/TLS protocols</li>
                    <li>Regular security audits and vulnerability assessments</li>
                    <li>Strict access controls and authentication mechanisms</li>
                    <li>Employee training on data protection and privacy best practices</li>
                    <li>Secure backup and disaster recovery procedures</li>
                  </ul>
                </div>
              </section>

              {/* Section 5: Cookies */}
              <section id="cookies" className="space-y-4 scroll-mt-24">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#E63946] to-[#1D4ED8] text-white text-sm font-bold shadow-md shadow-blue-500/20">05</span>
                  Cookies & Tracking Technologies
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                  <p>
                    We use cookies and similar tracking technologies to enhance your experience on our platform. Cookies are small data files stored on your device that help us:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 mt-4 marker:text-[#E63946]">
                    <li>Remember your preferences and settings</li>
                    <li>Keep you logged in to your account</li>
                    <li>Analyze site traffic and usage patterns</li>
                    <li>Deliver personalized content and advertisements</li>
                  </ul>
                  <p className="mt-4">
                    You can control cookie settings through your browser preferences. However, disabling cookies may limit certain features of our platform.
                  </p>
                </div>
              </section>

              {/* Section 6: Third-Party Services */}
              <section id="third-party" className="space-y-4 scroll-mt-24">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#E63946] to-[#1D4ED8] text-white text-sm font-bold shadow-md shadow-blue-500/20">06</span>
                  Third-Party Services
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                  <p>
                    We may share your information with trusted third-party service providers who assist us in operating our platform, conducting our business, or servicing you. These parties include:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 mt-4 marker:text-[#E63946]">
                    <li>Payment processors for secure transaction handling</li>
                    <li>Email service providers for communication delivery</li>
                    <li>Analytics providers to understand platform usage</li>
                    <li>Cloud hosting services for data storage</li>
                  </ul>
                  <p className="mt-4">
                    All third-party service providers are contractually obligated to keep your information confidential and use it only for the purposes we specify.
                  </p>
                </div>
              </section>

              {/* Section 7: Your Rights */}
              <section id="user-rights" className="space-y-4 scroll-mt-24">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#E63946] to-[#1D4ED8] text-white text-sm font-bold shadow-md shadow-blue-500/20">07</span>
                  Your Privacy Rights
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                  <p>
                    You have the following rights regarding your personal information:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    <div className="p-4 border border-blue-100 rounded-xl bg-blue-50">
                      <h4 className="font-bold text-blue-900 mb-2">Access & Portability</h4>
                      <p className="text-sm text-blue-800">Request a copy of your personal data in a portable format.</p>
                    </div>
                    <div className="p-4 border border-blue-100 rounded-xl bg-blue-50">
                      <h4 className="font-bold text-blue-900 mb-2">Correction</h4>
                      <p className="text-sm text-blue-800">Update or correct inaccurate personal information.</p>
                    </div>
                    <div className="p-4 border border-blue-100 rounded-xl bg-blue-50">
                      <h4 className="font-bold text-blue-900 mb-2">Deletion</h4>
                      <p className="text-sm text-blue-800">Request deletion of your personal data, subject to legal obligations.</p>
                    </div>
                    <div className="p-4 border border-blue-100 rounded-xl bg-blue-50">
                      <h4 className="font-bold text-blue-900 mb-2">Opt-Out</h4>
                      <p className="text-sm text-blue-800">Unsubscribe from marketing communications at any time.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 8: Contact Us */}
              <section id="contact" className="space-y-4 scroll-mt-24 pt-8 border-t border-gray-100">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#E63946] to-[#1D4ED8] text-white text-sm font-bold shadow-md shadow-blue-500/20">08</span>
                  Contact Us About Privacy
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                  <p>
                    If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 mt-6 min-w-0">
                    <a href="mailto:contact@sparkleknowledgeyard.com" className="inline-flex w-full sm:w-auto break-all items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-[#E63946] to-[#1D4ED8] hover:opacity-90 transition-all shadow-lg shadow-blue-500/20 hover:shadow-red-500/30">
                       contact@sparkleknowledgeyard.com
                    </a>
                    <button onClick={() => router.push('/#contact')} className="inline-flex w-full sm:w-auto items-center justify-center px-4 py-3 border border-gray-200 text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-gray-50 transition-colors cursor-pointer">
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
