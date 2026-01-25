'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({ id: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setTimeout(() => {
            router.push('/admin');
            router.refresh();
        }, 800);
      } else {
        setError(data.message || 'Invalid credentials');
        setIsLoading(false);
      }
    } catch (err) {
      setError('Connection failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-sans overflow-hidden">
      
      {/* --- LEFT PANEL: Clearer Image, Minimal Overlay --- */}
      <div className="hidden lg:flex lg:w-[55%] relative items-center justify-center overflow-hidden bg-white">
         
         {/* Background Image - Clean & Authentic */}
         <div className="absolute inset-0 z-0">
            <Image 
              src="/terms-hero-girl.png" 
              alt="Sparkle Knowledge Student" 
              fill 
              className="object-cover"
              priority
            />
            {/* 
                MINIMAL SHADE: 
                - Just enough gradient to make text readable at the bottom left 
                - The girl (subject) will remain bright and clear 
            */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/20 to-transparent opacity-90"></div>
         </div>
         
         {/* Content - Simple & Clean */}
         <motion.div 
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, delay: 0.2 }}
           className="relative z-10 p-16 w-full h-full flex flex-col justify-end text-left"
         >
             <div className="mb-2">
                <span className="text-blue-100 font-bold tracking-widest uppercase text-xs">Sparkle Knowledge Yard</span>
             </div>

             <h1 className="text-5xl font-extrabold text-white mb-4 drop-shadow-lg tracking-tight">
               Admin Console
             </h1>
             
             <p className="text-lg text-white/90 font-medium max-w-lg drop-shadow-md">
               Access your centralized dashboard to manage student enquiries, update website content, and oversee daily operations.
             </p>

         </motion.div>
      </div>

      {/* --- RIGHT PANEL: Secure Login Form --- */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-6 sm:p-12 xl:p-24 bg-white relative">
        <div className="w-full max-w-[420px] space-y-8">
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-1"
          >
            <h2 className="text-3xl font-bold text-slate-900">Secure Sign In</h2>
            <p className="text-slate-500 text-sm">Please verify your credentials to access the master panel.</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-8 mt-10">
            
            {/* Input 1: ID */}
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.1 }}
               className="relative"
            >
              <label 
                className={`absolute left-0 -top-5 text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${focusedField === 'id' ? 'text-blue-600' : 'text-slate-400'}`}
              >
                Owner / Admin ID
              </label>
              <input
                type="text"
                required
                onFocus={() => setFocusedField('id')}
                onBlur={() => setFocusedField(null)}
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                className="w-full pb-3 border-b-2 border-slate-200 bg-transparent text-lg font-bold text-slate-900 placeholder-slate-300 focus:border-blue-600 focus:outline-none transition-all duration-300"
                placeholder="Enter ID"
              />
            </motion.div>

            {/* Input 2: Password */}
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.2 }}
               className="relative"
            >
              <input
                type="password"
                required
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pb-3 border-b-2 border-slate-200 bg-transparent text-lg font-bold text-slate-900 placeholder-slate-300 focus:border-red-500 focus:outline-none transition-all duration-300"
                placeholder="Enter Password"
              />
            </motion.div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-red-500 text-xs font-semibold flex items-center gap-2 bg-red-50 p-2.5 rounded-md"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                {error}
              </motion.div>
            )}

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              type="submit"
              disabled={isLoading}
              className="w-full h-14 relative overflow-hidden rounded-xl bg-slate-900 group-hover/button:shadow-xl transition-all duration-500"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="absolute inset-0 flex items-center justify-center gap-3 text-white font-bold text-base tracking-wide z-10 pointer-events-none">
                 {isLoading ? (
                    <span className="animate-pulse">Verifying Access...</span>
                 ) : (
                    <>
                      <span>Access Dashboard</span>
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </>
                 )}
              </div>
            </motion.button>

          </form>

        </div>
      </div>
    </div>
  );
}
