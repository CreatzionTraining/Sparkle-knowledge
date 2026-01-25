import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import Image from 'next/image';

export function Footer() {
    return (
        <footer className="bg-[#F5F5F7] text-gray-600 font-['Outfit']">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="space-y-5">
                        <div className="relative w-full max-w-[220px] h-20">
                            <Image
                                src="/WhatsApp_Image_2026-01-12_at_16.32.48_520b41db-removebg-preview.png"
                                alt="Sparkle Academy"
                                fill
                                className="object-contain object-left"
                            />
                        </div>
                        <p className="text-sm leading-relaxed max-w-sm text-gray-500">
                            Trusted language training and test preparation institute in Perambur, Chennai. Helping students achieve global academic and career goals since 2018.
                        </p>
                        <div className="flex gap-3 pt-2">
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="group relative w-12 h-12 bg-white rounded-full flex justify-center items-center overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <span className="absolute w-full h-full bg-[#3b5999] top-full left-0 transition-all duration-500 group-hover:top-0 z-10"></span>
                                <Facebook className="relative z-20 w-5 h-5 text-gray-800 transition-all duration-500 group-hover:text-white group-hover:rotate-[360deg] fill-current" />
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="group relative w-12 h-12 bg-white rounded-full flex justify-center items-center overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <span className="absolute w-full h-full bg-[#e4405f] top-full left-0 transition-all duration-500 group-hover:top-0 z-10"></span>
                                <Instagram className="relative z-20 w-5 h-5 text-gray-800 transition-all duration-500 group-hover:text-white group-hover:rotate-[360deg]" />
                            </a>
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="group relative w-12 h-12 bg-white rounded-full flex justify-center items-center overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <span className="absolute w-full h-full bg-[#0077b5] top-full left-0 transition-all duration-500 group-hover:top-0 z-10"></span>
                                <Linkedin className="relative z-20 w-5 h-5 text-gray-800 transition-all duration-500 group-hover:text-white group-hover:rotate-[360deg] fill-current" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="group relative w-12 h-12 bg-white rounded-full flex justify-center items-center overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <span className="absolute w-full h-full bg-[#000000] top-full left-0 transition-all duration-500 group-hover:top-0 z-10"></span>
                                <svg viewBox="0 0 24 24" fill="currentColor" className="relative z-20 w-5 h-5 text-gray-800 transition-all duration-500 group-hover:text-white group-hover:rotate-[360deg]">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="md:pl-20">
                        <h3 className="font-['Outfit'] font-bold text-gray-900 text-base uppercase tracking-wider mb-6">Quick Links</h3>
                        <ul className="space-y-3.5">
                            <li>
                                <a href="#courses" className="relative text-gray-600 hover:text-blue-600 transition-colors text-base group">
                                    Courses
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            </li>
                            <li>
                                <a href="#about" className="relative text-gray-600 hover:text-blue-600 transition-colors text-base group">
                                    About
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            </li>
                            <li>
                                <a href="#news" className="relative text-gray-600 hover:text-blue-600 transition-colors text-base group">
                                    News
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            </li>
                            <li>
                                <a href="#blog" className="relative text-gray-600 hover:text-blue-600 transition-colors text-base group">
                                    Blog
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className="relative text-gray-600 hover:text-blue-600 transition-colors text-base group">
                                    Contact
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-['Outfit'] font-bold text-gray-900 text-base uppercase tracking-wider mb-6">Contact Us</h3>
                        <ul className="space-y-5">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-6 h-6 text-pink-500 shrink-0 mt-0.5" />
                                <span className="text-base text-gray-600 leading-relaxed">
                                    2nd Floor, 331, Paper Mills Road,<br />
                                    Bunder Garden, Perambur, Chennai,<br />
                                    Tamil Nadu 600011
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-pink-500 shrink-0" />
                                <span className="text-sm text-gray-600">097100 43295</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                                <span className="text-sm text-gray-600">info@sparkleacademy.com</span>
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