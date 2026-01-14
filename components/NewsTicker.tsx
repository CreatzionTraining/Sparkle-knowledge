"use client";

import React, { useEffect, useState } from 'react';

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  description?: string;
  imageUrl?: string | null;
}

export default function NewsTicker() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch('/api/news');
        const data = await res.json();
        console.log('News data:', data);
        setNews(data.news || []);
      } catch (err) {
        console.error("Failed to load news", err);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  if (loading || news.length === 0) {
    return null;
  }

  return (
    <>
      <div className="w-full bg-linear-to-r from-gray-900 via-slate-900 to-gray-900 text-white border-b border-white/10 relative h-12 flex items-center shadow-lg z-50">
        
        {/* Label with Premium Design */}
        <div className="absolute left-0 top-0 bottom-0 z-20 flex items-center bg-blue-600 px-6 shadow-[4px_0_24px_rgba(37,99,235,0.5)] skew-x-12 -ml-4">
           <div className="flex items-center gap-2 -skew-x-12 pl-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
              <span className="font-bold text-sm tracking-wide uppercase">Latest News</span>
           </div>
        </div>

        {/* Scrolling Container */}
        <div className="flex w-full overflow-hidden whitespace-nowrap mask-gradient pl-36">
          <div className="animate-ticker flex items-center gap-8">
            {news.map((item, i) => (
               <NewsItem key={`orig-${i}`} item={item} onClick={() => setSelectedArticle(item)} />
            ))}
            {/* Duplicate for seamless loop */}
            {news.map((item, i) => (
               <NewsItem key={`copy-${i}`} item={item} onClick={() => setSelectedArticle(item)} />
            ))}
          </div>
        </div>

        <style jsx>{`
          .animate-ticker {
            animation: ticker 120s linear infinite;
          }
          .animate-ticker:hover {
            animation-play-state: paused;
          }
          .mask-gradient {
            mask-image: linear-gradient(to right, transparent 0%, black 140px, black calc(100% - 100px), transparent 100%);
          }
          @keyframes ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @media (max-width: 768px) {
             .animate-ticker {
                animation-duration: 90s;
             }
          }
        `}</style>
      </div>

      {/* Article Content Modal */}
      {selectedArticle && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setSelectedArticle(null)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-2xl z-10">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold leading-tight mb-2">{selectedArticle.title}</h2>
                  <p className="text-sm text-white/90">
                    {new Date(selectedArticle.pubDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })} • <span className="font-semibold">{selectedArticle.source}</span>
                  </p>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="text-white/80 hover:text-white text-3xl leading-none flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Article Image */}
            {selectedArticle.imageUrl && (
              <div className="w-full h-64 overflow-hidden bg-gray-100">
                <img 
                  src={selectedArticle.imageUrl} 
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            )}

            {/* Article Content */}
            <div className="p-8">
              <div className="prose prose-lg max-w-none">
                {selectedArticle.description && (
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line mb-6">
                    {selectedArticle.description}
                  </div>
                )}

                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
                  <p className="text-sm text-gray-700 mb-4">
                    📰 This is a preview from <span className="font-bold">{selectedArticle.source}</span>
                  </p>
                  <a
                    href={selectedArticle.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-md hover:shadow-lg"
                  >
                    Read Full Article on {selectedArticle.source} →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function NewsItem({ item, onClick }: { item: NewsItem; onClick: () => void }) {
  const dateStr = new Date(item.pubDate).toLocaleDateString('en-US', {
    month: 'short', 
    day: 'numeric'
  });

  return (
    <button
      onClick={onClick}
      className="inline-flex items-center group transition-all hover:scale-105 cursor-pointer"
    >
      <span className="text-blue-400 mr-2 opacity-70 group-hover:opacity-100">•</span>
      <span className="font-medium text-sm text-gray-200 group-hover:text-white group-hover:underline decoration-blue-400 underline-offset-4 transition-colors">
        {item.title}
      </span>
      <span className="ml-3 text-[10px] font-bold text-gray-400 bg-white/10 px-2 py-0.5 rounded-full border border-white/5">
        {dateStr}
      </span>
    </button>
  );
}
