'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Toast, ConfirmModal, LoadingModal } from '@/components/Modals';

interface BlogPost {
  id: number;
  slug?: string;
  title: string;
  excerpt?: string;
  content?: string;
  category: string;
  date: string;
  image: string;
  readTime?: string;
  author?: {
    name: string;
    verified: boolean;
    avatar: string;
  };
}

export default function AdminPage() {
  const [view, setView] = useState<'list' | 'create'>('list');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  
  // -- Form State --
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorTitle, setAuthorTitle] = useState('Dr.');
  const [readTime, setReadTime] = useState('5');
  const [featuredImage, setFeaturedImage] = useState('');
  const [postDate, setPostDate] = useState(new Date().toISOString().split('T')[0]);
  
  // -- Editor State --
  const [activeFormats, setActiveFormats] = useState<string[]>([]);
  
  // -- UI State --
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState<'mobile' | 'desktop'>('desktop');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [editContent, setEditContent] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  // -- Modal State --
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{ title: string; message: string; onConfirm: () => void } | null>(null);
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
  
  // -- New Features State --
  const [authorAvatar, setAuthorAvatar] = useState('');
  const [isImageGalleryOpen, setIsImageGalleryOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  // Effect to load content into the editor once the view switches and ref is available
  useEffect(() => {
    if (view === 'create' && contentRef.current && editContent) {
      contentRef.current.innerHTML = editContent;
      // We don't clear editContent immediately to allow for view toggling if needed, 
      // but strictly speaking for this flow it handles the initial load.
    }
  }, [view, editContent]);

  const predefinedCategories = ['IELTS', 'PTE', 'TOEFL', 'OET', 'French', 'German', 'Spanish', 'Japanese'];
  const authorTitles = ['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.', 'Rev.', 'Hon.', 'Capt.', 'Sir', 'Madam', 'Mx.', 'Er.', 'Ar.'];
  const readTimeOptions = Array.from({length: 20}, (_, i) => i + 1); // 1 to 20

  useEffect(() => {
    fetchPosts();
  }, []);

  // Fetch all images from Cloudinary when gallery opens
  useEffect(() => {
    if (isImageGalleryOpen) {
      fetchAllImages();
    }
  }, [isImageGalleryOpen]);

  const fetchAllImages = async () => {
    try {
      const res = await fetch('/api/images');
      const data = await res.json();
      if (data.success) {
        setUploadedImages(data.images);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  // Helper function to get first letter of name (skip titles)
  const getInitial = (name: string) => {
    if (!name) return 'A';
    const words = name.trim().split(' ');
    // Skip common titles
    const titles = ['Dr.', 'Mr.', 'Mrs.', 'Ms.', 'Prof.'];
    const firstWord = words.find(word => !titles.includes(word)) || words[0];
    return firstWord.charAt(0).toUpperCase();
  };

  // Generate color based on letter
  const getAvatarColor = (letter: string) => {
    const colors = [
      'from-blue-500 to-blue-600',    // A-C
      'from-purple-500 to-purple-600', // D-F
      'from-pink-500 to-pink-600',     // G-I
      'from-red-500 to-red-600',       // J-L
      'from-orange-500 to-orange-600', // M-O
      'from-yellow-500 to-yellow-600', // P-R
      'from-green-500 to-green-600',   // S-U
      'from-teal-500 to-teal-600',     // V-X
      'from-cyan-500 to-cyan-600',     // Y-Z
    ];
    const index = Math.floor((letter.charCodeAt(0) - 65) / 3) % colors.length;
    return colors[index];
  };

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      if (data.success) setPosts(data.posts);
    } catch (error) { console.error('Error fetching posts'); }
  };

  const handleDelete = async (id: number) => {
    setConfirmDialog({
      title: 'Delete Post',
      message: 'Are you sure you want to permanently delete this post?',
      onConfirm: async () => {
        setConfirmDialog(null);
        setLoadingMessage('Deleting post...');
        try {
          await fetch('/api/posts', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
          });
          setToast({ message: 'Post deleted successfully', type: 'success' });
          fetchPosts();
        } catch {
          setToast({ message: 'Error deleting post', type: 'error' });
        } finally {
          setLoadingMessage(null);
        }
      }
    });
  };

  const handleEdit = (post: BlogPost) => {
    setTitle(post.title || '');
    setCategory(predefinedCategories.includes(post.category) ? post.category : 'Other');
    if (!predefinedCategories.includes(post.category)) {
      setCustomCategory(post.category);
    }
    setFeaturedImage(post.image || '');
    
    // Parse Date
    const d = new Date(post.date);
    if (!isNaN(d.getTime())) {
       setPostDate(d.toISOString().split('T')[0]);
    }

    // Parse Author
    if (post.author?.name) {
      const parts = post.author.name.split(' ');
      const possibleTitle = parts[0];
      if (authorTitles.includes(possibleTitle)) {
        setAuthorTitle(possibleTitle);
        setAuthorName(parts.slice(1).join(' '));
      } else {
        setAuthorTitle('Dr.'); // Default
        setAuthorName(post.author.name);
      }
    } else {
        setAuthorTitle('Dr.');
        setAuthorName('Admin');
    }

    // Parse Read Time
    if (post.readTime) {
       const time = post.readTime.split(' ')[0]; // "5 min read" -> "5"
       setReadTime(time);
    } else {
       setReadTime('5');
    }
    
    // Set content state for the effect to pick up
    setEditContent(post.content || '');
    
    // Set Editing ID
    setEditingId(post.id);
    
    // Switch view
    setView('create');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Optimistic preview (optional, but good for UX)
      // const reader = new FileReader();
      // reader.onloadend = () => setFeaturedImage(reader.result as string);
      // reader.readAsDataURL(file);

      // Real Upload
      try {
        setLoadingMessage('Uploading image...');
        const formData = new FormData();
        formData.append('file', file);
        
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        
        if (data.url) {
          setFeaturedImage(data.url);
          setToast({ message: 'Image uploaded successfully', type: 'success' });
        } else {
          setToast({ message: 'Failed to upload image', type: 'error' });
        }
      } catch (error) {
        console.error('Error uploads:', error);
        setToast({ message: 'Error uploading image', type: 'error' });
      } finally {
        setLoadingMessage(null);
      }
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setLoadingMessage('Uploading avatar...');
        const formData = new FormData();
        formData.append('file', file);
        
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        
        if (data.url) {
          setAuthorAvatar(data.url);
          setUploadedImages(prev => [data.url, ...prev]);
          setToast({ message: 'Avatar uploaded successfully', type: 'success' });
        } else {
          setToast({ message: 'Failed to upload avatar', type: 'error' });
        }
      } catch (error) {
        console.error('Error uploading avatar:', error);
        setToast({ message: 'Error uploading avatar', type: 'error' });
      } finally {
        setLoadingMessage(null);
      }
    }
  };


  // -- Editor Logic --
  const execCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    contentRef.current?.focus();
    checkFormats(); // Update active buttons immediately
  };

  const checkFormats = () => {
    const formats = [];
    if (document.queryCommandState('bold')) formats.push('bold');
    if (document.queryCommandState('italic')) formats.push('italic');
    if (document.queryCommandState('insertUnorderedList')) formats.push('ul');
    if (document.queryCommandState('insertOrderedList')) formats.push('ol');
    // For headings we verify the computed tag name of the parent block
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const parentBlock = selection.getRangeAt(0).commonAncestorContainer.parentElement;
      if (parentBlock) {
        if (parentBlock.tagName === 'H2') formats.push('h2');
        if (parentBlock.tagName === 'H3') formats.push('h3');
      }
    }
    setActiveFormats(formats);
  };

  const handlePublish = async () => {
    const finalCategory = category === 'Other' ? customCategory : category;
    
    // Strict Validation
    if (!title) { setToast({ message: 'Missing Title', type: 'error' }); return; }
    if (!finalCategory) { setToast({ message: 'Missing Category', type: 'error' }); return; }
    if (!featuredImage) { setToast({ message: 'Missing Featured Image', type: 'error' }); return; }
    if (!authorName) { setToast({ message: 'Missing Author Name', type: 'error' }); return; }
    if (!contentRef.current?.innerHTML || contentRef.current.innerText.trim() === '') { 
      setToast({ message: 'Content is empty', type: 'error' }); 
      return; 
    }

    setLoadingMessage(editingId ? 'Updating post...' : 'Publishing post...');
    
    // Create excerpt
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = contentRef.current.innerHTML;
    const plainText = tempDiv.textContent || tempDiv.innerText || '';
    const excerpt = plainText.substring(0, 150) + '...';

    // Format Date: "Jan 18, 2026"
    const dateObj = new Date(postDate);
    const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const postData = {
      id: editingId || Date.now(),
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title,
      excerpt,
      content: contentRef.current.innerHTML,
      image: featuredImage,
      author: {
        name: `${authorTitle} ${authorName}`,
        verified: true,
        avatar: authorAvatar || ''
      },
      date: formattedDate,
      readTime: `${readTime} min read`,
      category: finalCategory,

    };

    try {
      const method = editingId ? 'PUT' : 'POST';
      await fetch('/api/posts', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });
      setToast({ message: editingId ? 'Updated Successfully!' : 'Published Successfully!', type: 'success' });
      
      // Only go back to list if it's a new post
      if (!editingId) {
        setView('list');
      }
      
      fetchPosts();
      
      // Reset form only for new posts
      if (!editingId) {
        setTitle('');
        if(contentRef.current) contentRef.current.innerHTML = '';
        setCategory('');
        setCustomCategory('');
        setAuthorName('');
        setReadTime('5');
        setFeaturedImage('');
        setPostDate(new Date().toISOString().split('T')[0]);
        setEditContent('');
      }
      setEditingId(null);
    } catch (error) { 
      setToast({ message: 'Failed to publish', type: 'error' }); 
    } finally {
      setLoadingMessage(null);
    }
  };

  // --- DASHBOARD LIST VIEW ---
  if (view === 'list') {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center font-sans text-gray-900 overflow-x-hidden">
        <div className="w-full max-w-5xl p-4 md:p-6 lg:p-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 lg:mb-10 border-b border-gray-200 pb-4 md:pb-6 gap-3 md:gap-4">
            <div className="w-full md:w-auto">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600">
                Admin Dashboard
              </h1>
              <p className="text-gray-500 font-medium mt-1 md:mt-2 text-xs md:text-sm lg:text-base">Manage your blog content professionally</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3 w-full md:w-auto">
              <a
                href="/admin/news"
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white px-4 md:px-5 lg:px-6 py-2 md:py-2.5 rounded-full font-bold text-sm md:text-base shadow-lg transform hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span>Manage News</span>
              </a>
              <button 
                onClick={() => {
                  setEditContent('');
                  setEditingId(null);
                  setAuthorName('');
                  setTitle('');
                  if (contentRef.current) contentRef.current.innerHTML = '';
                  setView('create');
                  // Reset other fields if needed to ensure clean slate
                  setCategory('');
                  setFeaturedImage('');
                }}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-red-600 hover:opacity-90 text-white px-5 md:px-6 lg:px-8 py-2.5 md:py-3 rounded-full font-bold text-sm md:text-base shadow-lg transform hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <span className="text-lg">＋</span> <span>Create New Post</span>
              </button>
            </div>
          </div>

          <div className="grid gap-4">
            {posts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-200">
                <p className="text-gray-400 text-xl font-medium">No blog posts found.</p>
                <p className="text-gray-400 text-sm mt-2">Click the button above to start writing.</p>
              </div>
            ) : (
              posts.map(post => (
                <div key={post.id} className="bg-white p-3 md:p-4 lg:p-5 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 group hover:shadow-md transition-all overflow-hidden">
                  <div className="flex flex-col gap-3 md:gap-4">
                    {/* Post Info */}
                    <div className="flex items-start gap-2.5 md:gap-3 lg:gap-4 min-w-0">
                      <div className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-gray-100 rounded-lg md:rounded-xl overflow-hidden relative flex-shrink-0 border border-gray-200 shadow-sm">
                        {post.image ? (
                          <Image src={post.image} alt="" fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">Img</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0 overflow-hidden">
                        <h3 className="font-bold text-gray-900 text-sm md:text-base lg:text-lg mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">{post.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500 flex-wrap">
                          <span className="px-2 py-0.5 md:py-1 rounded-full bg-blue-50 text-blue-700 font-bold text-[10px] md:text-xs uppercase tracking-wide whitespace-nowrap">
                            {post.category}
                          </span>
                          <span className="text-[10px] md:text-xs whitespace-nowrap">{post.date}</span>
                        </div>
                      </div>
                    </div>
                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 w-full">
                      <button 
                        onClick={() => handleEdit(post)}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 text-gray-600 font-bold text-xs hover:bg-gray-50 hover:text-blue-600 transition-all"
                      >
                        <svg className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span className="truncate">Edit</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(post.id)} 
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-red-100 text-red-600 bg-red-50 font-bold text-xs hover:bg-red-100 transition-all"
                      >
                        <svg className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span className="truncate">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Modals for List View */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}

        {confirmDialog && (
          <ConfirmModal
            title={confirmDialog.title}
            message={confirmDialog.message}
            onConfirm={confirmDialog.onConfirm}
            onCancel={() => setConfirmDialog(null)}
          />
        )}

        {loadingMessage && (
          <LoadingModal message={loadingMessage} />
        )}
      </div>
    );
  }

  // --- CREATE POST VIEW ---
  return (
    <>
    <div className="min-h-screen bg-gray-50 pb-20 font-sans text-gray-900 overflow-x-hidden">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200 px-3 md:px-6 lg:px-8 py-2.5 md:py-3 lg:py-4 flex justify-between items-center shadow-sm">
        <button 
          onClick={() => setView('list')}
          className="bg-white border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-500 w-9 h-9 md:w-auto md:h-auto md:px-4 lg:px-5 md:py-2 rounded-full font-bold text-xs md:text-sm flex items-center justify-center gap-1.5 md:gap-2 transition-all shadow-sm flex-shrink-0"
          title="Back to Dashboard"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          <span className="hidden md:inline">Back to Dashboard</span>
        </button>
        <div className="flex items-center gap-1.5 md:gap-3 lg:gap-4">
          <button 
            onClick={() => setIsPreviewOpen(true)}
            className="border border-gray-200 bg-white text-gray-700 hover:border-blue-500 hover:text-blue-600 px-3 md:px-5 lg:px-6 py-1.5 md:py-2 lg:py-2.5 rounded-full text-xs md:text-sm font-bold transition-all shadow-sm hover:shadow-md flex items-center gap-1 md:gap-2 whitespace-nowrap"
          >
             Preview
          </button>
          <button 
            onClick={handlePublish}
            disabled={isSubmitting}
            className="bg-gradient-to-r from-blue-600 to-red-600 text-white px-4 md:px-6 lg:px-8 py-1.5 md:py-2 lg:py-2.5 rounded-full text-xs md:text-sm font-bold transition-all shadow-lg hover:shadow-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 md:gap-2 transform active:scale-95 whitespace-nowrap"
          >
            {isSubmitting ? '🚀' : (
              <>
                <span className="hidden sm:inline">{editingId ? 'Update Post' : 'Publish Post'}</span>
                <span className="sm:hidden">{editingId ? 'Update' : 'Publish'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-3 md:px-4 lg:px-6 py-4 md:py-6 lg:py-10">
        
        {/* Main Form Area */}
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-red-600 h-2 w-full"></div>

          <div className="p-3 md:p-6 lg:p-10 xl:p-12 space-y-5 md:space-y-8 lg:space-y-10">
            
            {/* 1. Title Input */}
            <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-4 md:gap-6">
              <div className="md:col-span-3">
                <label className="block text-xs font-extrabold text-blue-600 uppercase tracking-widest mb-2 md:mb-3">Blog Title <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-2xl md:text-4xl lg:text-5xl font-bold placeholder-gray-300 border-none focus:ring-0 p-0 outline-none text-gray-900 leading-tight"
                  placeholder="Enter an engaging title..."
                />
              </div>
              <div>
                 <label className="block text-xs font-extrabold text-blue-600 uppercase tracking-widest mb-2 md:mb-3">Publish Date</label>
                 <input 
                    type="date"
                    value={postDate}
                    onChange={(e) => setPostDate(e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full bg-gray-50 px-3 md:px-4 py-2.5 md:py-3 rounded-xl border-none font-bold text-sm md:text-base text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
                 />
              </div>
            </div>

            {/* 2. Metadata Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pt-6 md:pt-8 border-t border-gray-100">
              {/* Category */}
              <div>
                <label className="block text-xs font-extrabold text-blue-600 uppercase tracking-widest mb-2 md:mb-3">Category <span className="text-red-500">*</span></label>
                <div className="relative group">
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-gray-50 hover:bg-gray-100 cursor-pointer px-3 md:px-4 py-2.5 md:py-3 rounded-xl border border-transparent focus:border-blue-500 font-bold text-sm md:text-base text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-all appearance-none"
                  >
                    <option value="">Select...</option>
                    {predefinedCategories.map(c => <option key={c} value={c}>{c}</option>)}
                    <option value="Other">Other...</option>
                  </select>
                  <div className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-transform group-hover:translate-y-0">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
                {category === 'Other' && (
                  <input 
                    type="text" 
                    placeholder="Type category name"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    className="mt-2 md:mt-3 w-full px-3 md:px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm font-bold text-blue-800 placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>

              {/* Author */}
              <div>
                <label className="block text-xs font-extrabold text-blue-600 uppercase tracking-widest mb-2 md:mb-3">Author <span className="text-red-500">*</span></label>
                <div className="flex gap-2">
                   <div className="relative w-1/3">
                      <select 
                        value={authorTitle}
                        onChange={(e) => setAuthorTitle(e.target.value)}
                        className="w-full bg-gray-50 px-1 md:px-2 py-2.5 md:py-3 rounded-xl border-none font-bold text-xs md:text-base text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-center"
                      >
                        {authorTitles.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                   </div>
                   <input 
                    type="text" 
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-2/3 bg-gray-50 px-3 md:px-4 py-2.5 md:py-3 rounded-xl border-none font-bold text-sm md:text-base text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Name"
                  />
                </div>
              </div>
            </div>

            {/* Featured Image - Full Width Row */}
            <div className="pt-6 md:pt-8 border-t border-gray-100">
              <div className="flex items-center gap-2 mb-2 md:mb-3">
                <label className="block text-xs font-extrabold text-blue-600 uppercase tracking-widest">Cover Image <span className="text-red-500">*</span></label>
                <div className="relative group/tooltip">
                  <span className="cursor-help flex items-center justify-center w-4 h-4 rounded-full bg-blue-100 text-blue-600 text-[10px] font-bold">?</span>
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-48 bg-gray-800 text-white text-xs rounded-lg p-2 opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none text-center shadow-lg z-10">
                    Recommended: 1200x630px<br/>High quality JPG/PNG
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-2 h-2 bg-gray-800 rotate-45"></div>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className={`flex items-center gap-3 p-3 md:p-4 rounded-xl border-2 border-dashed transition-all ${featuredImage ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50 hover:border-blue-500 hover:bg-blue-50'}`}>
                  {featuredImage ? (
                    <>
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden relative shadow-sm flex-shrink-0">
                        <Image src={featuredImage} alt="Preview" fill className="object-cover" />
                      </div>
                      <span className="text-xs md:text-sm font-bold text-green-700 flex-1">Image Loaded!</span>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setFeaturedImage(''); }}
                        className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors z-20 flex-shrink-0"
                      >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </>
                  ) : (
                    <>
                       <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gray-200 flex items-center justify-center text-gray-400 text-xl md:text-2xl flex-shrink-0">📷</div>
                       <div className="flex flex-col flex-1 min-w-0">
                          <span className="text-xs md:text-sm font-bold text-gray-700 group-hover:text-blue-600">Click to Upload Cover Image</span>
                          <span className="text-[10px] md:text-xs text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</span>
                       </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* 2.5 Avatar & Image Gallery Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pt-6 md:pt-8 border-t border-gray-100">
              {/* Author Avatar */}
              <div>
                <label className="block text-xs font-extrabold text-blue-600 uppercase tracking-widest mb-2 md:mb-3">Author Avatar (Optional)</label>
                <div className="relative group">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className={`flex items-center gap-3 p-3 rounded-xl border-2 border-dashed transition-all ${authorAvatar ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50 hover:border-blue-500 hover:bg-blue-50'}`}>
                    {authorAvatar ? (
                      <>
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden relative shadow-sm ring-2 ring-blue-600 flex-shrink-0">
                          <Image src={authorAvatar} alt="Avatar" fill className="object-cover" />
                        </div>
                        <span className="text-xs md:text-sm font-bold text-green-700 flex-1">Avatar Uploaded!</span>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setAuthorAvatar(''); }}
                          className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors z-20 flex-shrink-0"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        </button>
                      </>
                    ) : (
                      <>
                         <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-lg md:text-xl font-bold flex-shrink-0">👤</div>
                         <span className="text-xs md:text-sm font-bold text-gray-500 group-hover:text-blue-600 flex-1">Click to Upload Avatar</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Image Gallery Button */}
              <div>
                <label className="block text-xs font-extrabold text-blue-600 uppercase tracking-widest mb-2 md:mb-3">Image Library</label>
                <button
                  type="button"
                  onClick={() => setIsImageGalleryOpen(true)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 md:px-6 py-3 md:py-4 rounded-xl font-bold text-xs md:text-sm hover:opacity-90 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 md:gap-3"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="truncate">View Uploaded Images ({uploadedImages.length})</span>
                </button>
              </div>
            </div>

            {/* 3. Editor */}
            <div className="pt-6 md:pt-8 border-t border-gray-100">
              <label className="block text-xs font-extrabold text-blue-600 uppercase tracking-widest mb-3 md:mb-4">Content <span className="text-red-500">*</span></label>
              
              <div className="border-2 border-gray-200 rounded-xl md:rounded-2xl overflow-hidden focus-within:border-blue-500 focus-within:ring-2 md:focus-within:ring-4 focus-within:ring-blue-50 transition-all">
                {/* Toolbar */}
                <div className="bg-gray-50 border-b border-gray-200 px-2 md:px-4 py-2 md:py-3 flex flex-wrap gap-1.5 md:gap-2 sticky top-0 z-10">
                  <button 
                    onClick={() => execCommand('bold')} 
                    className={`px-2.5 md:px-4 py-1.5 md:py-2 rounded-lg font-bold text-xs md:text-sm transition-all ${activeFormats.includes('bold') ? 'bg-gradient-to-r from-blue-600 to-red-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                  >
                    Bold
                  </button>
                  <button 
                    onClick={() => execCommand('italic')} 
                    className={`px-2.5 md:px-4 py-1.5 md:py-2 rounded-lg italic text-xs md:text-sm transition-all ${activeFormats.includes('italic') ? 'bg-gradient-to-r from-blue-600 to-red-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                  >
                    Italic
                  </button>
                  <div className="w-px h-5 md:h-6 bg-gray-300 mx-1 md:mx-2 self-center"></div>
                  <button 
                    onClick={() => execCommand('formatBlock', 'h2')} 
                    className={`px-2.5 md:px-4 py-1.5 md:py-2 rounded-lg font-extrabold text-xs md:text-sm transition-all ${activeFormats.includes('h2') ? 'bg-gradient-to-r from-blue-600 to-red-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                  >
                    H1
                  </button>
                  <button 
                    onClick={() => execCommand('formatBlock', 'h3')} 
                    className={`px-2.5 md:px-4 py-1.5 md:py-2 rounded-lg font-bold text-xs transition-all ${activeFormats.includes('h3') ? 'bg-gradient-to-r from-blue-600 to-red-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                  >
                    H2
                  </button>
                  <div className="w-px h-5 md:h-6 bg-gray-300 mx-1 md:mx-2 self-center"></div>
                  <button 
                    onClick={() => execCommand('insertUnorderedList')} 
                    className={`px-2.5 md:px-4 py-1.5 md:py-2 rounded-lg font-bold text-xs md:text-sm transition-all ${activeFormats.includes('ul') ? 'bg-gradient-to-r from-blue-600 to-red-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                  >
                    • List
                  </button>
                  <button 
                    onClick={() => execCommand('insertOrderedList')} 
                    className={`px-2.5 md:px-4 py-1.5 md:py-2 rounded-lg font-bold text-xs md:text-sm transition-all ${activeFormats.includes('ol') ? 'bg-gradient-to-r from-blue-600 to-red-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                  >
                    1. List
                  </button>
                </div>
                
                {/* Writing Area */}
                <div 
                  ref={contentRef}
                  contentEditable
                  onKeyUp={checkFormats}
                  onMouseUp={checkFormats}
                  data-placeholder="Paste or write your article content here..."
                  className="p-4 md:p-8 lg:p-12 focus:outline-none prose prose-sm md:prose-lg max-w-none text-gray-800 leading-relaxed min-h-[300px] md:min-h-[500px] empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400 block"
                />
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* --- REAL PREVIEW MODAL --- */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-[100] bg-gray-50/50 backdrop-blur-sm flex flex-col font-sans">
          
          {/* Perfected Preview Header - Light Theme */}
          <div className="bg-white/95 backdrop-blur-md text-gray-900 px-4 md:px-8 py-3 flex items-center justify-between shadow-sm border-b border-gray-200 z-[110]">
            
            {/* Left: Title */}
            <div className="flex-1 flex items-center">
               <span className="hidden md:flex items-center gap-2 font-bold text-gray-500 text-xs tracking-[0.2em] uppercase">
                 <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                 Preview Mode
               </span>
               {/* Mobile only simplified label */}
               <span className="md:hidden font-bold text-gray-800 text-sm">Preview</span>
            </div>
            
            {/* Center: Toggle Switch */}
            <div className="flex bg-gray-100 p-1 rounded-full border border-gray-200">
                 <button 
                  onClick={() => setPreviewMode('mobile')}
                  className={`px-4 md:px-6 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${previewMode === 'mobile' ? 'bg-white text-blue-600 shadow-sm ring-1 ring-gray-200' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                  Mobile
                </button>
                <button 
                  onClick={() => setPreviewMode('desktop')}
                  className={`px-4 md:px-6 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${previewMode === 'desktop' ? 'bg-white text-blue-600 shadow-sm ring-1 ring-gray-200' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  Desktop
                </button>
            </div>

            {/* Right: Close Action */}
            <div className="flex-1 flex justify-end">
              <button 
                onClick={() => setIsPreviewOpen(false)} 
                className="group flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50"
              >
                <span className="hidden md:inline text-xs font-bold uppercase tracking-wider">Close</span>
                <span className="bg-gray-100 group-hover:bg-red-100 text-gray-500 group-hover:text-red-600 rounded-full p-1 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </span>
              </button>
            </div>
          </div>

          {/* Actual Preview Content - EXACT REPLICA OF blog/[slug]/page.tsx */}
          <div className="flex-1 overflow-y-auto bg-gray-100 flex justify-center pt-8 pb-20">
             
             {/* Dynamic Width Container */}
             <div className={`${
               previewMode === 'mobile' 
               ? 'w-[400px] h-[800px] border-[12px] border-gray-900 rounded-[3rem] overflow-hidden bg-white shadow-2xl my-auto' 
               : 'w-full min-h-full bg-transparent'
             } transition-all duration-300`}>
                
                {/* Simulated Viewport - Content Wrapper */}
                <div className={`h-full overflow-y-auto ${previewMode === 'mobile' ? 'scrollbar-hide' : ''}`}>
                  
                  {/* --- BLOG PAGE CONTENT START --- */}
                  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50 relative">
                     {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none">
                      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl"></div>
                      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600 rounded-full filter blur-3xl"></div>
                    </div>

                    <div className="relative z-10 py-6 md:py-8 px-4 md:px-4">
                      <div className="max-w-7xl mx-auto">
                        {/* Fake Back Button */}
                        <div className="mb-5 md:mb-6">
                           <div className="group inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold text-sm md:text-base cursor-pointer">
                              <span>← Back to all articles</span>
                           </div>
                        </div>

                        {/* 
                            CRITICAL FIX: Manual Layout Toggle 
                            Because Tailwind's responsive classes (lg:grid-cols-3) use the browser window width (which is desktop),
                            they will force the desktop layout even inside the small mobile preview box.
                            We must manually switch classes based on 'previewMode'.
                        */}
                        <div className={`grid gap-5 md:gap-8 ${previewMode === 'mobile' ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'}`}>
                           
                           {/* Main Article */}
                           <div className={`${previewMode === 'mobile' ? 'col-span-1' : 'lg:col-span-2'}`}>
                              <article className="bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                                 {/* Featured Image */}
                                 <div className={`relative overflow-hidden bg-gray-200 ${previewMode === 'mobile' ? 'h-[220px]' : 'h-[220px] md:h-[400px]'}`}>
                                   {featuredImage ? (
                                      <img src={featuredImage} alt="Cover" className="w-full h-full object-cover" />
                                   ) : (
                                      <div className="w-full h-full flex items-center justify-center text-gray-400">No Image Selected</div>
                                   )}
                                  </div>


                                 {/* Content */}
                                 <div className={`${previewMode === 'mobile' ? 'p-6' : 'p-6 md:p-8 lg:p-12'}`}>
                                    <h1 className={`font-bold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 leading-tight ${previewMode === 'mobile' ? 'text-2xl' : 'text-xl md:text-4xl lg:text-5xl'}`}>
                                      {title || 'Your Blog Title'}
                                    </h1>
                                    
                                     {/* Meta Info */}
                                     <div className={`flex items-center gap-3 mb-6 pb-6 border-b border-gray-200 ${previewMode === 'mobile' ? '' : 'md:gap-4 md:mb-8 md:pb-8'}`}>
                                        {/* Avatar - Letter or Image */}
                                        <div className={`relative rounded-full flex-shrink-0 ring-2 ring-blue-600 ${previewMode === 'mobile' ? 'w-11 h-11' : 'w-11 h-11 md:w-14 md:h-14 md:ring-4'}`}>
                                           {authorName ? (
                                             <div className={`w-full h-full rounded-full bg-gradient-to-br ${getAvatarColor(getInitial(authorName))} flex items-center justify-center`}>
                                               <span className={`font-extrabold text-white ${previewMode === 'mobile' ? 'text-lg' : 'text-lg md:text-2xl'}`}>
                                                 {getInitial(authorName)}
                                               </span>
                                             </div>
                                           ) : (
                                             <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center">
                                               <span className={`font-extrabold text-white ${previewMode === 'mobile' ? 'text-lg' : 'text-lg md:text-2xl'}`}>A</span>
                                             </div>
                                           )}
                                        </div>
                                       <div>
                                          <div className="flex items-center gap-2 mb-1">
                                             <span className={`font-bold text-gray-900 ${previewMode === 'mobile' ? 'text-sm' : 'text-sm md:text-lg'}`}>{authorName || 'Author Name'}</span>
                                             <svg className={`text-blue-600 ${previewMode === 'mobile' ? 'w-4 h-4' : 'w-4 h-4 md:w-5 md:h-5'}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                          </div>
                                          <div className={`flex items-center gap-2 text-gray-500 ${previewMode === 'mobile' ? 'text-xs' : 'text-xs md:text-sm md:gap-3'}`}>
                                             <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                          </div>
                                       </div>
                                    </div>

                                    {/* Article Body */}
                                    <div 
                                      className={`prose max-w-none
                                      prose-headings:text-transparent prose-headings:bg-clip-text prose-headings:bg-gradient-to-r prose-headings:from-gray-900 prose-headings:to-gray-700 prose-headings:font-bold prose-headings:leading-tight
                                      prose-p:text-gray-700 prose-p:leading-relaxed 
                                      prose-strong:text-gray-900 prose-strong:font-bold
                                      prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                                      ${previewMode === 'mobile' 
                                        ? 'prose-sm prose-p:mb-4 prose-h2:text-lg prose-h2:mt-6 prose-h2:mb-3' 
                                        : 'prose-sm md:prose-lg prose-p:mb-5 md:prose-p:mb-5 prose-h2:text-lg md:prose-h2:text-3xl prose-h2:mt-8 md:prose-h2:mt-10 prose-h2:mb-4 md:prose-h2:mb-5'
                                      }`}
                                      dangerouslySetInnerHTML={{ __html: contentRef.current?.innerHTML || '<p>Content preview...</p>' }}
                                    />

                                    {/* Share Section */}
                                    <div className="mt-8 pt-8 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                                      <p className="font-extrabold text-gray-900 text-sm md:text-base">Share this article:</p>
                                      <div className="flex gap-3">
                                        {/* Facebook */}
                                        <button className="w-10 h-10 rounded-full bg-gradient-to-b from-blue-600 to-blue-700 text-white flex items-center justify-center shadow-md hover:scale-110 hover:shadow-lg transition-all">
                                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                                        </button>
                                        {/* Twitter */}
                                        <button className="w-10 h-10 rounded-full bg-gradient-to-b from-sky-400 to-sky-500 text-white flex items-center justify-center shadow-md hover:scale-110 hover:shadow-lg transition-all">
                                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                                        </button>
                                        {/* LinkedIn */}
                                        <button className="w-10 h-10 rounded-full bg-gradient-to-b from-blue-700 to-blue-800 text-white flex items-center justify-center shadow-md hover:scale-110 hover:shadow-lg transition-all">
                                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                                        </button>
                                        {/* WhatsApp */}
                                        <button className="w-10 h-10 rounded-full bg-gradient-to-b from-green-500 to-green-600 text-white flex items-center justify-center shadow-md hover:scale-110 hover:shadow-lg transition-all">
                                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                                        </button>
                                      </div>
                                    </div>
                                 </div>
                              </article>
                           </div>
                           
                           {/* Empty Sidebar Placeholder - HIDDEN ON MOBILE PREVIEW */}
                           <div className={`space-y-6 ${previewMode === 'mobile' ? 'hidden' : 'hidden lg:block'} opacity-50 pointer-events-none grayscale`}>
                              <h3 className="text-2xl font-bold text-gray-900 px-1 mb-2">Recent Posts</h3>
                              <div className="bg-white rounded-2xl h-64 shadow-lg p-5 flex items-center justify-center text-center text-gray-400">
                                 Other posts will appear here
                              </div>
                           </div>
                        </div>

                      </div>
                    </div>
                  </div>
                  {/* --- BLOG PAGE CONTENT END --- */}

                </div>
             </div>
          </div>
        </div>
      )}
    </div>

    {/* Modals */}
    {toast && (
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast(null)}
      />
    )}

    {confirmDialog && (
      <ConfirmModal
        title={confirmDialog.title}
        message={confirmDialog.message}
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog(null)}
      />
    )}

    {loadingMessage && (
      <LoadingModal message={loadingMessage} />
    )}

    {/* Image Gallery Modal */}
    {isImageGalleryOpen && (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
        <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[85vh] overflow-hidden animate-scaleIn">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold text-xl">Image Library</h3>
                <p className="text-white/80 text-sm">{uploadedImages.length} images available</p>
              </div>
            </div>
            <button
              onClick={() => setIsImageGalleryOpen(false)}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="p-8 overflow-y-auto max-h-[calc(85vh-100px)] bg-gradient-to-br from-gray-50 to-gray-100">
            {uploadedImages.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl flex items-center justify-center">
                  <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">No Images Yet</h4>
                <p className="text-gray-500">Upload images using the form to see them here</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {uploadedImages.map((imageUrl, index) => (
                  <div key={index} className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      <Image
                        src={imageUrl}
                        alt={`Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      
                      {/* Image Number Badge */}
                      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full">
                        #{index + 1}
                      </div>
                    </div>

                    {/* Action Buttons - Always Visible on Mobile, Hover on Desktop */}
                    <div className="p-3 bg-gradient-to-t from-white to-gray-50 md:absolute md:inset-0 md:bg-gradient-to-t md:from-black/90 md:via-black/50 md:to-transparent md:opacity-0 md:group-hover:opacity-100 md:transition-opacity md:flex md:flex-col md:justify-end md:p-4 space-y-2">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(imageUrl);
                          setToast({ message: 'URL copied to clipboard!', type: 'success' });
                        }}
                        className="w-full bg-white hover:bg-gray-50 text-gray-900 px-4 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg md:bg-white/95 md:hover:bg-white"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy URL
                      </button>
                      <a
                        href={imageUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )}
  </>
  );
}
