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
  const [visibleCount, setVisibleCount] = useState(6);

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

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading latest news...</p>
          </div>
        </div>
      </section>
    );
  }

  if (news.length === 0) {
    return null;
  }

  const visibleNews = news.slice(0, visibleCount);
  const hasMore = visibleCount < news.length;

  return (
    <>
      <section id="news" className="py-16 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="relative group cursor-default">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-red-600 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative flex items-center gap-2 px-4 py-1.5 bg-white rounded-full border border-gray-100 shadow-sm">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  <span className="text-[11px] font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-red-600 uppercase">Latest Updates</span>
                </div>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
              Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E63946] via-[#1D4ED8] to-[#E63946] animate-gradient-x bg-[length:200%_auto]">News & Articles</span>
            </h2>
            
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium">
              Stay updated with the latest educational news, exam updates, and study abroad opportunities
            </p>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {visibleNews.map((item, index) => (
              <NewsCard key={index} item={item} onClick={() => setSelectedArticle(item)} />
            ))}
          </div>

          {/* View All Button */}
          {hasMore && (
            <div className="text-center">
              <button
                onClick={() => setVisibleCount(prev => prev + 6)}
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                <span>View All Updates</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Article Modal */}
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

function NewsCard({ item, onClick }: { item: NewsItem; onClick: () => void }) {
  const dateStr = new Date(item.pubDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // Check if news is within last 24 hours
  const isLive = (new Date().getTime() - new Date(item.pubDate).getTime()) < 24 * 60 * 60 * 1000;

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
    >
      <div className="p-5 flex gap-4">
        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Live Badge & Date */}
          <div className="flex items-center gap-2 mb-3">
            {isLive && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                Live
              </span>
            )}
            <span className="text-xs text-gray-500 font-medium">{dateStr}</span>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {item.title}
          </h3>

          {/* Description */}
          {item.description && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {item.description}
            </p>
          )}

          {/* Source */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-700">{item.source}</span>
            <svg className="w-4 h-4 text-blue-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>

        {/* Thumbnail */}
        {item.imageUrl && (
          <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
