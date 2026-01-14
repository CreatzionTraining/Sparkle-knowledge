import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin, Sparkles } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-[#F5F5F7] text-gray-600 font-['Inter']">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-6 h-6 text-orange-400 fill-orange-400" />
                            <span className="font-['Montserrat'] font-bold text-xl text-gray-900">Sparkle Academy</span>
                        </div>
                        <p className="text-sm leading-relaxed max-w-xs text-gray-500">
                            Trusted language training and test preparation institute in Perambur, Chennai. Helping students achieve global academic and career goals since 2018.
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-orange-400 hover:text-orange-500 hover:shadow-md transition-all">
                                <Facebook className="w-5 h-5 fill-current" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-orange-400 hover:text-orange-500 hover:shadow-md transition-all">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-orange-400 hover:text-orange-500 hover:shadow-md transition-all">
                                <Linkedin className="w-5 h-5 fill-current" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-orange-400 hover:text-orange-500 hover:shadow-md transition-all">
                                <Twitter className="w-5 h-5 fill-current" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="md:pl-16">
                        <h3 className="font-['Montserrat'] font-bold text-gray-900 text-sm uppercase tracking-wider mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors text-sm">Courses</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors text-sm">About</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors text-sm">News</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors text-sm">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-['Montserrat'] font-bold text-gray-900 text-sm uppercase tracking-wider mb-6">Contact Us</h3>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-pink-500 shrink-0 mt-0.5" />
                                <span className="text-sm text-gray-600">
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
                <div className="border-t border-gray-200 pt-8 text-center">
                    <p className="text-xs text-gray-400">
                        © {new Date().getFullYear()} Sparkle Knowledge Yard. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
