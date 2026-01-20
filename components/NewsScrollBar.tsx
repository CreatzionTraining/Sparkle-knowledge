"use client";

import React from 'react';

// ----------------------------------------------------------------------
// 📝 EDIT YOUR ACADEMY NEWS HERE
// ----------------------------------------------------------------------
const ACADEMY_UPDATES = [
  {
    id: 1,
    badge: "New Batch",
    title: "IELTS Intensive Batch Starting Jan 25th",
    icon: "graduation",
    link: "/contact",
    gradient: "from-orange-500 via-red-500 to-pink-600",
    lightGradient: "from-orange-400/10 to-red-500/10"
  },
  {
    id: 2,
    badge: "Achievement",
    title: "Priya Scored 8.5 Bands in IELTS",
    icon: "trophy",
    link: "/success-stories",
    gradient: "from-emerald-500 via-green-500 to-teal-600",
    lightGradient: "from-emerald-400/10 to-green-500/10"
  },
  {
    id: 3,
    badge: "Admissions Open",
    title: "UK September 2026 Intake - Apply Now",
    icon: "plane",
    link: "/study-abroad",
    gradient: "from-blue-500 via-indigo-500 to-purple-600",
    lightGradient: "from-blue-400/10 to-indigo-500/10"
  },
  {
    id: 4,
    badge: "Free Webinar",
    title: "Study Abroad Seminar This Saturday",
    icon: "calendar",
    link: "/events",
    gradient: "from-purple-500 via-pink-500 to-rose-600",
    lightGradient: "from-purple-400/10 to-pink-500/10"
  },
  {
    id: 5,
    badge: "Limited Offer",
    title: "20% OFF on GRE + TOEFL Combo",
    icon: "sparkles",
    link: "/courses",
    gradient: "from-cyan-500 via-blue-500 to-indigo-600",
    lightGradient: "from-cyan-400/10 to-blue-500/10"
  },
  {
    id: 6,
    badge: "Success Story",
    title: "Rahul Admitted to Oxford University",
    icon: "star",
    link: "/success-stories",
    gradient: "from-amber-500 via-orange-500 to-red-600",
    lightGradient: "from-amber-400/10 to-orange-500/10"
  }
];

// Icon Components
const Icons = {
  graduation: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  ),
  trophy: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),
  plane: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  ),
  calendar: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  sparkles: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  star: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  )
};

export default function NewsScrollBar() {
  return (
    <div className="relative w-full bg-white py-4 md:py-5 overflow-hidden border-y border-slate-200/80 shadow-sm">
      
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
        backgroundSize: '32px 32px'
      }}></div>

      {/* LIVE Badge - Compact & Professional */}
      <div className="absolute left-0 top-0 bottom-0 z-30 flex items-center pl-4 md:pl-8 pr-6 bg-gradient-to-r from-white via-white/95 to-transparent">
        <div className="relative group/badge">
          {/* Subtle Glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl blur opacity-20 group-hover/badge:opacity-30 transition-opacity"></div>
          
          {/* Badge */}
          <div className="relative flex items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl px-3 md:px-4 py-1.5 md:py-2 shadow-lg">
            <div className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-full w-full bg-red-500"></span>
            </div>
            <span className="text-[10px] md:text-xs font-bold tracking-widest text-white uppercase">
              Sparkle News
            </span>
          </div>
        </div>
      </div>

      {/* Scrolling Container - True Infinite Loop */}
      <div className="flex gap-3 md:gap-4 pl-24 md:pl-40">
        {/* First Set */}
        <div className="flex animate-scroll-infinite hover:pause-scroll items-center gap-3 md:gap-4">
          {ACADEMY_UPDATES.map((item, index) => (
            <NewsCard key={`set1-${item.id}-${index}`} item={item} />
          ))}
        </div>
        
        {/* Second Set - Duplicate for seamless loop */}
        <div className="flex animate-scroll-infinite hover:pause-scroll items-center gap-3 md:gap-4">
          {ACADEMY_UPDATES.map((item, index) => (
            <NewsCard key={`set2-${item.id}-${index}`} item={item} />
          ))}
        </div>
      </div>

      {/* Fade Gradients */}
      <div className="absolute top-0 bottom-0 left-0 w-32 md:w-48 bg-gradient-to-r from-white via-white to-transparent z-20 pointer-events-none"></div>
      <div className="absolute top-0 bottom-0 right-0 w-24 md:w-32 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none"></div>

      {/* Animation */}
      <style jsx>{`
        @keyframes scroll-infinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        .animate-scroll-infinite {
          animation: scroll-infinite 60s linear infinite;
        }
        
        .pause-scroll {
          animation-play-state: paused;
        }
        
        @media (max-width: 768px) {
          .animate-scroll-infinite {
            animation-duration: 40s;
          }
        }
      `}</style>
    </div>
  );
}

// News Card Component
function NewsCard({ item }: { item: typeof ACADEMY_UPDATES[0] }) {
  const IconComponent = Icons[item.icon as keyof typeof Icons];
  
  return (
    <div className="group/card flex-shrink-0 relative w-[280px] md:w-[340px] cursor-default">
      {/* Card */}
      <div className={`
        relative bg-gradient-to-br ${item.lightGradient}
        backdrop-blur-sm
        rounded-xl md:rounded-2xl
        border border-slate-200/60
        shadow-md shadow-black/5
        hover:shadow-xl hover:shadow-black/10
        transition-all duration-500
        hover:scale-105
        overflow-hidden
      `}>
        {/* Gradient Border Glow on Hover */}
        <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover/card:opacity-5 transition-opacity duration-500 rounded-xl md:rounded-2xl`}></div>
        
        {/* Card Content */}
        <div className="relative bg-white/80 backdrop-blur-md rounded-xl md:rounded-2xl p-3 md:p-4">
          <div className="flex items-center gap-3">
            
            {/* Icon */}
            <div className={`
              flex-shrink-0 w-9 h-9 md:w-10 md:h-10
              rounded-lg md:rounded-xl
              bg-gradient-to-br ${item.gradient}
              flex items-center justify-center
              text-white
              shadow-lg shadow-black/10
              group-hover/card:scale-105 group-hover/card:rotate-3
              transition-transform duration-500
            `}>
              {IconComponent && <IconComponent />}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Badge */}
              <div className={`
                inline-flex items-center gap-1 px-2 py-0.5 rounded-md mb-1
                bg-gradient-to-r ${item.gradient}
                text-white text-[9px] md:text-[10px] font-bold uppercase tracking-wider
                shadow-sm
              `}>
                <span className="w-1 h-1 rounded-full bg-white/80"></span>
                {item.badge}
              </div>

              {/* Title */}
              <h3 className="text-slate-800 font-semibold text-xs md:text-sm leading-tight line-clamp-2 group-hover/card:text-slate-900 transition-colors">
                {item.title}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
