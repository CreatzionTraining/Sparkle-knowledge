'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Ensure content is included here
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

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [post, setPost] = useState<BlogPost | undefined>(undefined);
  const [otherPosts, setOtherPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/posts', {
          next: { revalidate: 60 } // Cache for 60 seconds
        });
        const data = await res.json();
        
        if (data.success && Array.isArray(data.posts)) {
           const allPosts = data.posts as BlogPost[];
           const foundPost = allPosts.find(p => p.slug === slug);
           setPost(foundPost);
           setOtherPosts(allPosts.filter(p => p.slug !== slug).slice(0, 4));
        }
      } catch (e) {
        console.error("Error fetching post", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  // Helper function to get first letter of name (skip titles)
  const getInitial = (name: string) => {
    if (!name) return 'A';
    const words = name.trim().split(' ');
    const titles = ['Dr.', 'Mr.', 'Mrs.', 'Ms.', 'Prof.'];
    const firstWord = words.find(word => !titles.includes(word)) || words[0];
    return firstWord.charAt(0).toUpperCase();
  };

  // Generate color based on letter
  const getAvatarColor = (letter: string) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600',
      'from-pink-500 to-pink-600',
      'from-red-500 to-red-600',
      'from-orange-500 to-orange-600',
      'from-yellow-500 to-yellow-600',
      'from-green-500 to-green-600',
      'from-teal-500 to-teal-600',
      'from-cyan-500 to-cyan-600',
    ];
    const index = Math.floor((letter.charCodeAt(0) - 65) / 3) % colors.length;
    return colors[index];
  };

  // Set document title dynamically
  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Sparkle Knowledge`;
    } else {
      document.title = 'Sparkle Knowledge';
    }
  }, [post]);

  if (loading) {
     return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-red-50 relative overflow-hidden">
          {/* Animated Background Blobs */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>

          {/* Loading Content */}
          <div className="relative z-10 text-center">
            {/* Sparkle Logo/Icon */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                {/* Outer rotating ring */}
                <div className="w-24 h-24 rounded-full border-4 border-transparent border-t-blue-600 border-r-red-600 animate-spin"></div>
                {/* Inner pulsing circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-red-600 animate-pulse flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Loading Text */}
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gradient">
              Loading Article
            </h2>
            <p className="text-gray-600 text-sm md:text-base mb-6">
              Preparing your content...
            </p>

            {/* Animated Dots */}
            <div className="flex justify-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-600 animate-bounce"></div>
              <div className="w-3 h-3 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 rounded-full bg-red-600 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
     );
  }

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

      <div className="relative z-10 py-12 md:py-20 px-4 md:px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
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
                </div>


                {/* Article Content */}
                <div className="p-6 md:p-8 lg:p-12">
                  {/* Title */}
                  <h1 className="text-xl md:text-4xl lg:text-5xl font-bold mb-5 md:mb-6 text-gradient leading-tight md:leading-tight">
                    {post.title}
                  </h1>

                  {/* Meta Info */}
                  <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 pb-6 md:pb-8 border-b border-gray-200">
                    {/* Avatar - Letter */}
                    <div className="relative w-11 h-11 md:w-14 md:h-14 rounded-full ring-2 md:ring-4 ring-blue-200 flex-shrink-0 overflow-hidden">
                      {post.author.avatar && post.author.avatar.trim() !== '' && post.author.avatar !== '/hero.png' ? (
                        <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                          <span className="font-extrabold text-blue-700 text-lg md:text-2xl">
                            {getInitial(post.author.name)}
                          </span>
                        </div>
                      )}
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
                        {/* Facebook */}
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg"
                          aria-label="Share on Facebook"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        </a>

                        {/* Twitter/X */}
                        <a
                          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(post.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg"
                          aria-label="Share on Twitter"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                          </svg>
                        </a>

                        {/* LinkedIn */}
                        <a
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg"
                          aria-label="Share on LinkedIn"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </a>

                        {/* WhatsApp */}
                        <a
                          href={`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + (typeof window !== 'undefined' ? window.location.href : ''))}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg"
                          aria-label="Share on WhatsApp"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                        </a>
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
                      {/* Avatar - Letter */}
                      <div className="relative w-7 h-7 md:w-8 md:h-8 rounded-full ring-2 ring-blue-200 flex-shrink-0 overflow-hidden">
                        {otherPost.author.avatar && otherPost.author.avatar.trim() !== '' && otherPost.author.avatar !== '/hero.png' ? (
                          <Image src={otherPost.author.avatar} alt={otherPost.author.name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                            <span className="font-extrabold text-blue-700 text-xs md:text-sm">
                              {getInitial(otherPost.author.name)}
                            </span>
                          </div>
                        )}
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
