import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin, Sparkles } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-[#F5F5F7] text-gray-600 font-['Inter']">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-orange-400 fill-orange-400" />
                            <span className="font-['Montserrat'] font-extrabold text-xl text-[#0F172A] tracking-tight">
                                Sparkle <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1D4ED8] via-[#E63946] to-[#1D4ED8] bg-[length:200%_auto] animate-text-wave">Knowledge Yard</span>
                            </span>
                        </div>
                        <p className="text-xs leading-relaxed max-w-xs text-gray-500">
                            Trusted language training and test preparation institute in Perambur, Chennai. Helping students achieve global academic and career goals since 2018.
                        </p>
                        <div className="flex gap-2">
                            <a href="#" className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-orange-400 hover:text-orange-500 hover:shadow-md transition-all">
                                <Facebook className="w-4 h-4 fill-current" />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-orange-400 hover:text-orange-500 hover:shadow-md transition-all">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-orange-400 hover:text-orange-500 hover:shadow-md transition-all">
                                <Linkedin className="w-4 h-4 fill-current" />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-orange-400 hover:text-orange-500 hover:shadow-md transition-all">
                                <Twitter className="w-4 h-4 fill-current" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="md:pl-16">
                        <h3 className="font-['Montserrat'] font-extrabold text-[#0F172A] text-xs uppercase tracking-wider mb-1">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors text-xs">Courses</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors text-xs">About</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors text-xs">News</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors text-xs">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-['Montserrat'] font-extrabold text-[#0F172A] text-xs uppercase tracking-wider mb-1">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
                                <span className="text-xs text-gray-600">
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
                <div className="border-t border-gray-200 pt-4 text-center">
                    <p className="text-[10px] text-gray-400">
                        © {new Date().getFullYear()} Sparkle Knowledge Yard. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
