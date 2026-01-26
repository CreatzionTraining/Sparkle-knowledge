"use client";

import React, { useEffect, useState } from 'react';

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
  ),
  megaphone: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
    </svg>
  ),
  bell: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  ),
  gift: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
    </svg>
  ),
};

interface NewsItem {
  id: number;
  badge: string;
  title: string;
  icon: string;
  link: string;
  gradient: string;
  lightGradient: string;
}

export default function NewsScrollBar() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await fetch('/api/news');
      const data = await res.json();
      if (data.success && data.news.length > 0) {
        setNews(data.news);
      } else {
        // Fallback to default news if none exist
        setNews([
          {
            id: 1,
            badge: "Welcome",
            title: "Welcome to Sparkle Knowledge - Your Gateway to Global Education",
            icon: "sparkles",
            link: "/contact",
            gradient: "from-blue-500 via-indigo-500 to-purple-600",
            lightGradient: "from-blue-400/10 to-indigo-500/10"
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      // Fallback news
      setNews([
        {
          id: 1,
          badge: "Welcome",
          title: "Welcome to Sparkle Knowledge - Your Gateway to Global Education",
          icon: "sparkles",
          link: "/contact",
          gradient: "from-blue-500 via-indigo-500 to-purple-600",
          lightGradient: "from-blue-400/10 to-indigo-500/10"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="relative w-full py-4 md:py-5 overflow-hidden">
        <div className="flex items-center justify-center">
          <div className="animate-pulse text-slate-400 text-sm">Loading news...</div>
        </div>
      </div>
    );
  }

  if (news.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full py-2 md:py-4 overflow-hidden">
      
      {/* Subtle Grid Background */}




      {/* Scrolling Container - Full Width & Clean */}
      <div className="flex-1 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20px,black_95%,transparent)]">
        <div className="flex gap-3 md:gap-4 pl-4 md:pl-0">
          {/* First Set */}
          <div className="flex animate-scroll-infinite hover:pause-scroll items-center gap-3 md:gap-4">
            {news.map((item, index) => (
              <NewsCard key={`set1-${item.id}-${index}`} item={item} />
            ))}
          </div>
          
          {/* Second Set - Duplicate for seamless loop */}
          <div className="flex animate-scroll-infinite hover:pause-scroll items-center gap-3 md:gap-4">
            {news.map((item, index) => (
              <NewsCard key={`set2-${item.id}-${index}`} item={item} />
            ))}
          </div>
        </div>
      </div>



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
          animation: scroll-infinite 15s linear infinite;
        }
        
        .pause-scroll {
          animation-play-state: paused;
        }
        
        @media (max-width: 768px) {
          .animate-scroll-infinite {
            animation-duration: 15s;
          }
        }
      `}</style>
    </div>
  );
}

// News Card Component
function NewsCard({ item }: { item: NewsItem }) {
  const IconComponent = Icons[item.icon as keyof typeof Icons] || Icons.sparkles;
  
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
        <div className="relative rounded-xl md:rounded-2xl p-3 md:p-4">
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
              <h3 className="text-slate-800 font-semibold text-xs md:text-sm leading-tight group-hover/card:text-slate-900 transition-colors">
                {item.title}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
