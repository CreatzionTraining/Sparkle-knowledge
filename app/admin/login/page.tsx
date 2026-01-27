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
  const [showPassword, setShowPassword] = useState(false);

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

            {/* Input 2: Password - Now with Toggle */}
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.2 }}
               className="relative"
            >
              <input
                type={showPassword ? 'text' : 'password'}
                required
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pb-3 border-b-2 border-slate-200 bg-transparent text-lg font-bold text-slate-900 placeholder-slate-300 focus:border-red-500 focus:outline-none transition-all duration-300 pr-10"
                placeholder="Enter Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 bottom-3 text-slate-400 hover:text-blue-600 transition-colors duration-300 outline-none"
                tabIndex={-1}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  // Eye Off Icon
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  // Eye Icon
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
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
