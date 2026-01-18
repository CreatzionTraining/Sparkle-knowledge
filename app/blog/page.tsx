'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    verified: boolean;
    avatar: string;
  };
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts');
        const data = await res.json();
        if (data.success && Array.isArray(data.posts)) {
           setPosts(data.posts);
        }
      } catch (error) {
        console.error('Failed to fetch posts', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const featuredPost = posts[0];
  const recentPosts = posts.slice(1);

  if (!featuredPost) return (
     <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">No posts found.</p>
     </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10 py-12 md:py-20 px-4 md:px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 md:mb-16">
            <div className="inline-block mb-4">
              <span className="px-5 py-2 md:px-6 md:py-2 bg-gradient-to-r from-blue-600 to-red-600 text-white text-xs md:text-sm font-semibold rounded-full shadow-lg">
                BLOG
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 text-gradient px-4">
              Latest Insights
            </h1>
            <p className="text-gray-600 text-sm md:text-lg max-w-2xl mx-auto px-4">
              Discover stories, tips, and insights from our experts
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-8">
            {/* Featured Post - Large (2/3 width) */}
            <div className="lg:col-span-2">
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group relative bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 block"
              >
                {/* Image */}
                <div className="relative h-[220px] md:h-[400px] overflow-hidden bg-gray-200">
                  {featuredPost.image && (
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 md:top-6 md:left-6">
                    <span className="px-3 py-1.5 md:px-4 md:py-2 bg-white/90 backdrop-blur-sm text-blue-600 text-xs md:text-sm font-bold rounded-full shadow-lg">
                      {featuredPost.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 md:p-8">
                  <h2 className="text-lg md:text-3xl font-bold mb-3 md:mb-4 text-gray-900 group-hover:text-gradient transition-all duration-300 line-clamp-2 leading-snug md:leading-tight">
                    {featuredPost.title}
                  </h2>
                  <p className="text-sm md:text-base text-gray-600 mb-5 md:mb-6 line-clamp-2 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 md:gap-3 min-w-0 flex-1">
                      <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden ring-2 ring-blue-600 flex-shrink-0 bg-gray-200">
                        {featuredPost.author.avatar && (
                          <Image
                            src={featuredPost.author.avatar}
                            alt={featuredPost.author.name}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 md:gap-2">
                          <span className="text-sm md:text-base font-semibold text-gray-900 truncate">
                            {featuredPost.author.name}
                          </span>
                          {featuredPost.author.verified && (
                            <svg className="w-4 h-4 md:w-5 md:h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-gray-500 flex-wrap">
                          <span>{featuredPost.date}</span>
                          <span>•</span>
                          <span>{featuredPost.readTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* Read More Arrow */}
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-blue-600 to-red-600 flex items-center justify-center text-white transform group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Recent Posts - Sidebar (1/3 width) */}
            <div className="space-y-6 md:space-y-6">
              <h3 className="text-lg md:text-2xl font-bold text-gray-900 px-1 mb-2">Recent Posts</h3>
              {recentPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 block"
                >
                  {/* Image */}
                  <div className="relative h-36 md:h-48 overflow-hidden bg-gray-200">
                    {post.image && (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="p-4 md:p-5">
                    <h4 className="text-xs md:text-lg font-bold mb-3 text-gray-900 line-clamp-2 group-hover:text-gradient transition-all duration-300 leading-snug">
                      {post.title}
                    </h4>
                    
                    {/* Author Info */}
                    <div className="flex items-center gap-2.5 mt-3">
                      <div className="relative w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden ring-2 ring-blue-600 flex-shrink-0 bg-gray-200">
                        {post.author.avatar && (
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 flex-nowrap">
                          <span className="text-xs md:text-sm font-semibold text-gray-900 max-w-[85%] truncate">
                            {post.author.name}
                          </span>
                          {post.author.verified && (
                            <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <p className="text-[10px] md:text-xs text-gray-500 mt-1">{post.date}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}
