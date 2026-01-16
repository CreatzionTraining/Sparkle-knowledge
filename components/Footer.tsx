import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import Image from 'next/image';

export function Footer() {
    return (
        <footer className="bg-[#F5F5F7] text-gray-600 font-['Outfit']">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* Brand Column */}
                    <div className="space-y-3">
                        <div className="relative w-full max-w-[170px] h-16">
                            <Image
                                src="/WhatsApp_Image_2026-01-12_at_16.32.48_520b41db-removebg-preview.png"
                                alt="Sparkle Academy"
                                fill
                                className="object-contain object-left"
                            />
                        </div>
                        <p className="text-xs leading-relaxed max-w-xs text-gray-500">
                            Trusted language training and test preparation institute in Perambur, Chennai. Helping students achieve global academic and career goals since 2018.
                        </p>
                        <div className="flex gap-2">
                            <a href="#" className="group relative w-10 h-10 bg-white rounded-full flex justify-center items-center overflow-hidden shadow-sm">
                                <span className="absolute w-full h-full bg-[#3b5999] top-full left-0 transition-all duration-500 group-hover:top-0 z-10"></span>
                                <Facebook className="relative z-20 w-5 h-5 text-gray-800 transition-all duration-500 group-hover:text-white group-hover:rotate-[360deg] fill-current" />
                            </a>
                            <a href="#" className="group relative w-10 h-10 bg-white rounded-full flex justify-center items-center overflow-hidden shadow-sm">
                                <span className="absolute w-full h-full bg-[#e4405f] top-full left-0 transition-all duration-500 group-hover:top-0 z-10"></span>
                                <Instagram className="relative z-20 w-5 h-5 text-gray-800 transition-all duration-500 group-hover:text-white group-hover:rotate-[360deg]" />
                            </a>
                            <a href="#" className="group relative w-10 h-10 bg-white rounded-full flex justify-center items-center overflow-hidden shadow-sm">
                                <span className="absolute w-full h-full bg-[#0077b5] top-full left-0 transition-all duration-500 group-hover:top-0 z-10"></span>
                                <Linkedin className="relative z-20 w-5 h-5 text-gray-800 transition-all duration-500 group-hover:text-white group-hover:rotate-[360deg] fill-current" />
                            </a>
                            <a href="#" className="group relative w-10 h-10 bg-white rounded-full flex justify-center items-center overflow-hidden shadow-sm">
                                <span className="absolute w-full h-full bg-[#55acee] top-full left-0 transition-all duration-500 group-hover:top-0 z-10"></span>
                                <Twitter className="relative z-20 w-5 h-5 text-gray-800 transition-all duration-500 group-hover:text-white group-hover:rotate-[360deg] fill-current" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="md:pl-16">
                        <h3 className="font-['Outfit'] font-bold text-gray-900 text-sm uppercase tracking-wider mb-4">Quick Links</h3>
                        <ul className="space-y-2.5">
                            <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors text-sm">Courses</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors text-sm">About</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors text-sm">News</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors text-sm">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-['Outfit'] font-bold text-gray-900 text-sm uppercase tracking-wider mb-4">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-pink-500 shrink-0 mt-0.5" />
                                <span className="text-sm text-gray-600">
                                    2nd Floor, 331, Paper Mills Road,<br />
                                    Bunder Garden, Perambur, Chennai,<br />
                                    Tamil Nadu 600011
                                </span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-pink-500 shrink-0" />
                                <span className="text-xs text-gray-600">097100 43295</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                                <span className="text-xs text-gray-600">info@sparkleacademy.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 pt-5 text-center">
                    <p className="text-sm text-gray-400">
                        © {new Date().getFullYear()} Sparkle Knowledge Yard. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}