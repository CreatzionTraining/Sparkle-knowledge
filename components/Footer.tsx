"use client";
import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
    const handleAnchorClick = (e: React.MouseEvent, hash: string) => {
        if (typeof window === 'undefined') return;
        e.preventDefault();

        // If we're already on the homepage, smoothly scroll to the element
        if (window.location.pathname === '/') {
            const el = document.getElementById(hash);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
            }
            // fallback: set hash so browser attempts to jump
            window.location.hash = `#${hash}`;
            return;
        }

        // From other pages (blog, terms, privacy, etc.) perform a full navigation
        // to the home with the hash so the browser will land and scroll to the target.
        // Using window.location.href ensures the native browser behavior for anchors.
        window.location.href = `/#${hash}`;
    };
    return (
        <footer className="bg-[#F5F5F7] text-gray-600 [font-family:var(--font-inter)]">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="space-y-5">
                        <div className="relative w-full max-w-[160px] h-14">
                            <Image
                                src="/WhatsApp_Image_2026-01-12_at_16.32.48_520b41db-removebg-preview.png"
                                alt="Sparkle Academy"
                                fill
                                className="object-contain object-left"
                            />
                        </div>
                        <p className="text-sm leading-relaxed max-w-sm text-gray-700 font-medium">
                            Trusted language training and test preparation institute in Perambur, Chennai. Helping students achieve global academic and career goals since 2018.
                        </p>
                        <div className="flex gap-3 pt-2">
                            <a href="https://www.facebook.com/SparkleKnowledgeYard" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-[#3b5999] rounded-full flex justify-center items-center shadow-sm hover:shadow-md hover:scale-105 transition-all">
                                <Facebook className="w-5 h-5 text-white fill-current" />
                            </a>
                            <a href="https://www.instagram.com/_sparkle_academy?igsh=MTNqNnM3M3FrdHR5NA==" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-[#e4405f] rounded-full flex justify-center items-center shadow-sm hover:shadow-md hover:scale-105 transition-all">
                                <Instagram className="w-5 h-5 text-white" />
                            </a>
                            <a href="https://www.linkedin.com/company/sparkle-knowledge-yard/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-[#0077b5] rounded-full flex justify-center items-center shadow-sm hover:shadow-md hover:scale-105 transition-all">
                                <Linkedin className="w-5 h-5 text-white fill-current" />
                            </a>
                            <a href="https://www.threads.com/@_sparkle_academy" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-black rounded-full flex justify-center items-center shadow-sm hover:shadow-md hover:scale-105 transition-all">
                                <svg viewBox="0 0 192 192" fill="currentColor" className="w-5 h-5 text-white">
                                    <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="md:pl-20">
                        <h4 className="font-bold text-gray-900 text-base uppercase tracking-wider mb-6 [font-family:var(--font-outfit)]">Quick Links</h4>
                        <ul className="space-y-3.5">
                            <li>
                                <Link href="/#courses" onClick={(e) => handleAnchorClick(e, 'courses')} className="relative text-gray-700 font-bold hover:text-blue-600 transition-colors text-base group">
                                    Courses
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/#about" onClick={(e) => handleAnchorClick(e, 'about')} className="relative text-gray-700 font-bold hover:text-blue-600 transition-colors text-base group">
                                    About
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/#news" onClick={(e) => handleAnchorClick(e, 'news')} className="relative text-gray-700 font-bold hover:text-blue-600 transition-colors text-base group">
                                    News
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/#blog" onClick={(e) => handleAnchorClick(e, 'blog')} className="relative text-gray-700 font-bold hover:text-blue-600 transition-colors text-base group">
                                    Blog
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/#contact" onClick={(e) => handleAnchorClick(e, 'contact')} className="relative text-gray-700 font-bold hover:text-blue-600 transition-colors text-base group">
                                    Contact
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-bold text-gray-900 text-base uppercase tracking-wider mb-6 [font-family:var(--font-outfit)]">Contact Us</h4>
                        <ul className="space-y-5">
                            <li className="flex items-start gap-4">
                                <div className="w-6 h-6 shrink-0 mt-0.5 relative">
                                    <Image 
                                        src="/google-maps.png" 
                                        alt="Google Maps"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="text-base text-gray-900 font-bold leading-relaxed">
                                    2nd Floor, 331, Paper Mills Road,<br />
                                    Bunder Garden, Perambur, Chennai,<br />
                                    Tamil Nadu 600011
                                </span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="w-5 h-5 shrink-0 relative">
                                    <Image 
                                        src="/telephone.png" 
                                        alt="Phone"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="text-sm text-gray-900 font-bold">+91 97100 43295 , +91 97917 40664</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="w-5 h-5 shrink-0 relative">
                                    <Image 
                                        src="/gmail.png" 
                                        alt="Email"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="text-sm text-gray-900 font-bold">contact@sparkleknowledgeyard.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-3">
                        <p className="text-sm text-gray-400">
                            © {new Date().getFullYear()} Sparkle Knowledge Yard. All rights reserved.
                        </p>
                        <div className="flex items-center gap-4 text-xs">
                            <a href="/terms" className="text-gray-500 hover:text-blue-600 transition-colors">
                                Terms and Conditions
                            </a>
                            <span className="text-gray-300">|</span>
                            <a href="/privacy" className="text-gray-500 hover:text-blue-600 transition-colors">
                                Privacy Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}