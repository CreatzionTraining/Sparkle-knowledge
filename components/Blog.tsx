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
  author: {
    name: string;
    verified: boolean;
    avatar: string;
  };
  date: string;

}

export default function Blog() {
  const [blogData, setBlogData] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        if(data.success) setBlogData(data.posts);
      })
      .catch(err => console.error(err));
  }, []);

  // Show only first 3 posts on homepage
  const previewPosts = blogData.slice(0, 3);

  return (
    <section id="blog" className="relative py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-red-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-slate-900 tracking-tight">
            Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E63946] via-[#1D4ED8] to-[#E63946] animate-gradient-x bg-[length:200%_auto]">Success Stories</span>
          </h2>
          <p className="text-slate-600 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Celebrating achievements, academy updates, and expert study abroad guidance.
          </p>
        </div>

        {/* Blog List - Preview (3 posts) */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="space-y-1">
            {previewPosts.map((post, index) => (
              <div key={post.id}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block py-6 cursor-pointer transition-all duration-300 hover:bg-blue-50/50 rounded-xl px-4 -mx-4"
                >
                  <div className="flex gap-6 items-start">
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Title */}
                      <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Author Info & Date */}
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-semibold text-gray-700">
                            {post.author.name}
                          </span>
                          {post.author.verified && (
                            <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-500">{post.date}</span>
                      </div>


                    </div>

                    {/* Thumbnail Image */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-xl overflow-hidden shadow-md">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </div>
                </Link>
                
                {/* Divider - not shown after last item */}
                {index < previewPosts.length - 1 && (
                  <div className="border-b border-gray-200"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-red-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <span>View All Articles</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
