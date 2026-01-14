'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const certificates = [
    { id: 1, name: 'Priya Sharma', score: 'IELTS Band 8.5', image: 'https://randomuser.me/api/portraits/women/63.jpg' },
    { id: 2, name: 'Rahul Verma', score: 'TOEFL 112', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 3, name: 'Anjali Gupta', score: 'GRE 328', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 4, name: 'Vikram Singh', score: 'PTE 88', image: 'https://randomuser.me/api/portraits/men/86.jpg' },
    { id: 5, name: 'Sneha Patel', score: 'OET Grade B', image: 'https://randomuser.me/api/portraits/women/65.jpg' },
    { id: 6, name: 'Arjun Kumar', score: 'GMAT 740', image: 'https://randomuser.me/api/portraits/men/15.jpg' },
];

export function Certificates() {
    return (
        <section className="py-20 bg-[#F9FAFB] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-['Montserrat'] font-bold text-gray-900 mb-4">
                    Our Success Stories
                </h2>
                <p className="text-gray-600 font-['Inter'] max-w-2xl mx-auto">
                    Join our growing list of students who have achieved remarkable results.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
                    {certificates.slice(0, 4).map((cert, idx) => (
                        <div
                            key={idx}
                            className="relative group w-64 h-64 rounded-xl shrink-0 p-[2px] bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1"
                        >
                            <div className="w-full h-full bg-white rounded-[10px] p-4 flex flex-col items-center justify-center text-center">
                                <div className="w-20 h-20 rounded-full mb-4 p-[2px] bg-gradient-to-tr from-blue-400 to-pink-400">
                                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-white relative flex items-center justify-center bg-blue-50">
                                        <span className="text-4xl">🎓</span>
                                    </div>
                                </div>
                                <h3 className="font-['Montserrat'] font-bold text-gray-900 text-lg mb-1">{cert.name}</h3>
                                <p className="font-['Inter'] text-[#E63946] font-bold text-base">{cert.score}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
