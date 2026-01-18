'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getBlogPostBySlug, blogPosts } from '@/lib/blogData';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const post = getBlogPostBySlug(slug);
  
  // Get other posts for sidebar (exclude current post)
  const otherPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 4);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-red-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <Link 
            href="/#blog"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10 py-6 md:py-8 px-4 md:px-4">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <div className="mb-5 md:mb-6">
            <Link
              href="/#blog"
              className="group inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-300 font-semibold text-sm md:text-base"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to all articles</span>
            </Link>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-8">
            {/* Main Article - Left Side (2/3) */}
            <div className="lg:col-span-2">
              <article className="bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                {/* Featured Image */}
                <div className="relative h-[220px] md:h-[400px] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 md:top-6 md:left-6">
                    <span className="px-3 py-1.5 md:px-5 md:py-2.5 bg-gradient-to-r from-blue-600 to-red-600 text-white text-xs md:text-sm font-bold rounded-full shadow-lg">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6 md:p-8 lg:p-12">
                  {/* Title */}
                  <h1 className="text-xl md:text-4xl lg:text-5xl font-bold mb-5 md:mb-6 text-gradient leading-tight md:leading-tight">
                    {post.title}
                  </h1>

                  {/* Meta Info */}
                  <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 pb-6 md:pb-8 border-b border-gray-200">
                    <div className="relative w-11 h-11 md:w-14 md:h-14 rounded-full overflow-hidden ring-2 md:ring-4 ring-blue-600 flex-shrink-0">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 md:gap-2 mb-1">
                        <span className="text-sm md:text-lg font-bold text-gray-900 truncate">
                          {post.author.name}
                        </span>
                        {post.author.verified && (
                          <svg className="w-4 h-4 md:w-5 md:h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-gray-500 flex-wrap">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                        <span>•</span>
                        <span>{post.views}</span>
                      </div>
                    </div>
                  </div>

                  {/* Article Body */}
                  <div 
                    className="prose prose-sm md:prose-lg max-w-none
                      prose-headings:text-gradient prose-headings:font-bold prose-headings:leading-tight
                      prose-h2:text-lg md:prose-h2:text-3xl prose-h2:mt-8 md:prose-h2:mt-10 prose-h2:mb-4 md:prose-h2:mb-5
                      prose-h3:text-base md:prose-h3:text-2xl prose-h3:mt-6 md:prose-h3:mt-8 prose-h3:mb-3 md:prose-h3:mb-4
                      prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-5 md:prose-p:mb-5 prose-p:text-sm md:prose-p:text-lg
                      prose-ul:my-5 md:prose-ul:my-6 prose-ul:space-y-2 prose-li:text-gray-700 prose-li:text-sm md:prose-li:text-lg prose-li:leading-relaxed
                      prose-strong:text-gray-900 prose-strong:font-bold
                      prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />

                  {/* Share Section */}
                  <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <span className="text-gray-700 font-semibold text-sm md:text-base">Share this article:</span>
                      <div className="flex gap-2.5 md:gap-3">
                        {[
                          { name: 'facebook', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
                          { name: 'twitter', icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
                          { name: 'linkedin', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z' },
                          { name: 'whatsapp', icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' }
                        ].map((platform) => (
                          <button
                            key={platform.name}
                            className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-r from-blue-600 to-red-600 text-white flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg"
                            aria-label={`Share on ${platform.name}`}
                          >
                            <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" stroke="currentColor" strokeWidth="0" viewBox="0 0 24 24">
                              <path d={platform.icon} />
                            </svg>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>

            {/* Sidebar - Right Side (1/3) */}
            <div className="space-y-6 md:space-y-6">
              <h3 className="text-lg md:text-2xl font-bold text-gray-900 px-1 mb-2">Recent Posts</h3>
              {otherPosts.map((otherPost) => (
                <Link
                  key={otherPost.id}
                  href={`/blog/${otherPost.slug}`}
                  className="group bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 block"
                >
                  {/* Image */}
                  <div className="relative h-36 md:h-48 overflow-hidden">
                    <Image
                      src={otherPost.image}
                      alt={otherPost.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="p-4 md:p-5">
                    <h4 className="text-xs md:text-lg font-bold mb-3 text-gray-900 line-clamp-2 group-hover:text-gradient transition-all duration-300 leading-snug">
                      {otherPost.title}
                    </h4>
                    
                    {/* Author Info */}
                    <div className="flex items-center gap-2.5 mt-3">
                      <div className="relative w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden ring-2 ring-blue-600 flex-shrink-0">
                        <Image
                          src={otherPost.author.avatar}
                          alt={otherPost.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 flex-nowrap">
                          <span className="text-xs md:text-sm font-semibold text-gray-900 max-w-[85%] truncate">
                            {otherPost.author.name}
                          </span>
                          {otherPost.author.verified && (
                            <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <p className="text-[10px] md:text-xs text-gray-500 mt-1">{otherPost.date}</p>
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
