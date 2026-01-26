'use client';

import React, { useState, useEffect } from 'react';
import { Toast, ConfirmModal, LoadingModal } from '@/components/Modals';

interface NewsItem {
  id: number;
  badge: string;
  title: string;
  icon: string;
  link: string;
  gradient: string;
  lightGradient: string;
  createdAt?: string;
}

const BADGE_OPTIONS = [
  'New Batch',
  'Achievement', 
  'Admissions Open',
  'Free Webinar',
  'Limited Offer',
  'Success Story',
  'Announcement',
  'Event',
  'Workshop',
  'Scholarship',
  'Other'
];

const ICON_OPTIONS = [
  { value: 'graduation', label: 'Graduation', icon: '🎓' },
  { value: 'trophy', label: 'Trophy', icon: '🏆' },
  { value: 'plane', label: 'Plane', icon: '✈️' },
  { value: 'calendar', label: 'Calendar', icon: '📅' },
  { value: 'sparkles', label: 'Sparkles', icon: '✨' },
  { value: 'star', label: 'Star', icon: '⭐' },
  { value: 'megaphone', label: 'Megaphone', icon: '📣' },
  { value: 'bell', label: 'Bell', icon: '🔔' },
  { value: 'gift', label: 'Gift', icon: '🎁' },
];

const GRADIENT_PRESETS = [
  {
    name: 'Orange-Red',
    gradient: 'from-orange-500 via-red-500 to-pink-600',
    lightGradient: 'from-orange-400/10 to-red-500/10'
  },
  {
    name: 'Green-Teal',
    gradient: 'from-emerald-500 via-green-500 to-teal-600',
    lightGradient: 'from-emerald-400/10 to-green-500/10'
  },
  {
    name: 'Blue-Purple',
    gradient: 'from-blue-500 via-indigo-500 to-purple-600',
    lightGradient: 'from-blue-400/10 to-indigo-500/10'
  },
  {
    name: 'Purple-Pink',
    gradient: 'from-purple-500 via-pink-500 to-rose-600',
    lightGradient: 'from-purple-400/10 to-pink-500/10'
  },
  {
    name: 'Cyan-Blue',
    gradient: 'from-cyan-500 via-blue-500 to-indigo-600',
    lightGradient: 'from-cyan-400/10 to-blue-500/10'
  },
  {
    name: 'Amber-Orange',
    gradient: 'from-amber-500 via-orange-500 to-red-600',
    lightGradient: 'from-amber-400/10 to-orange-500/10'
  },
  {
    name: 'Pink-Rose',
    gradient: 'from-pink-500 via-rose-500 to-red-600',
    lightGradient: 'from-pink-400/10 to-rose-500/10'
  },
  {
    name: 'Indigo-Blue',
    gradient: 'from-indigo-500 via-blue-500 to-cyan-600',
    lightGradient: 'from-indigo-400/10 to-blue-500/10'
  },
  {
    name: 'Violet-Purple',
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-600',
    lightGradient: 'from-violet-400/10 to-purple-500/10'
  },
  {
    name: 'Lime-Green',
    gradient: 'from-lime-500 via-green-500 to-emerald-600',
    lightGradient: 'from-lime-400/10 to-green-500/10'
  },
  {
    name: 'Yellow-Amber',
    gradient: 'from-yellow-500 via-amber-500 to-orange-600',
    lightGradient: 'from-yellow-400/10 to-amber-500/10'
  },
  {
    name: 'Teal-Cyan',
    gradient: 'from-teal-500 via-cyan-500 to-sky-600',
    lightGradient: 'from-teal-400/10 to-cyan-500/10'
  }
];

export default function NewsManagementPage() {
  const [view, setView] = useState<'list' | 'create'>('list');
  const [news, setNews] = useState<NewsItem[]>([]);
  
  // Form State
  const [badge, setBadge] = useState('New Batch');
  const [customBadge, setCustomBadge] = useState('');
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState('sparkles');
  const [selectedGradient, setSelectedGradient] = useState(0);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  
  // UI State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{ title: string; message: string; onConfirm: () => void } | null>(null);
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await fetch('/api/news');
      const data = await res.json();
      if (data.success) setNews(data.news);
    } catch (error) {
      console.error('Error fetching news');
    }
  };

  const handleDelete = async (id: number) => {
    setConfirmDialog({
      title: 'Delete News',
      message: 'Are you sure you want to delete this news item?',
      onConfirm: async () => {
        setConfirmDialog(null);
        setLoadingMessage('Deleting news...');
        try {
          await fetch('/api/news', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
          });
          setToast({ message: 'News deleted successfully', type: 'success' });
          fetchNews();
        } catch {
          setToast({ message: 'Error deleting news', type: 'error' });
        } finally {
          setLoadingMessage(null);
        }
      }
    });
  };

  const handleEdit = (item: NewsItem) => {
    const predefinedBadge = BADGE_OPTIONS.find(b => b === item.badge);
    if (predefinedBadge) {
      setBadge(predefinedBadge);
      setCustomBadge('');
    } else {
      setBadge('Other');
      setCustomBadge(item.badge);
    }
    
    setTitle(item.title);
    setIcon(item.icon);
    
    const gradientIndex = GRADIENT_PRESETS.findIndex(g => g.gradient === item.gradient);
    setSelectedGradient(gradientIndex >= 0 ? gradientIndex : 0);
    
    setEditingId(item.id);
    setView('create');
  };

  const handlePublish = async () => {
    const finalBadge = badge === 'Other' ? customBadge : badge;
    
    if (!finalBadge) { setToast({ message: 'Please select or enter a badge', type: 'error' }); return; }
    if (!title) { setToast({ message: 'Please enter a news title', type: 'error' }); return; }

    setLoadingMessage(editingId ? 'Updating news...' : 'Publishing news...');
    
    const newsData = {
      id: editingId || Date.now(),
      badge: finalBadge,
      title,
      icon,
      link: '#',
      gradient: GRADIENT_PRESETS[selectedGradient].gradient,
      lightGradient: GRADIENT_PRESETS[selectedGradient].lightGradient,
    };

    try {
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch('/api/news', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newsData)
      });
      
      const data = await res.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to publish');
      }
      
      setToast({ message: editingId ? 'Updated Successfully!' : 'Published Successfully!', type: 'success' });
      
      if (!editingId) {
        setView('list');
      }
      
      fetchNews();
      
      // Reset form only for new items
      if (!editingId) {
        setBadge('New Batch');
        setCustomBadge('');
        setTitle('');
        setIcon('sparkles');
        setSelectedGradient(0);
      }
      setEditingId(null);
    } catch (error: any) { 
      console.error('Publish error:', error);
      setToast({ message: error.message || 'Failed to publish', type: 'error' }); 
    } finally {
      setLoadingMessage(null);
    }
  };

  // Preview Component
  const PreviewNews = () => {
    const finalBadge = badge === 'Other' ? customBadge : badge;
    const previewItem = {
      id: 999,
      badge: finalBadge || 'Badge',
      title: title || 'Your news title will appear here...',
      icon,
      link: '#',
      gradient: GRADIENT_PRESETS[selectedGradient].gradient,
      lightGradient: GRADIENT_PRESETS[selectedGradient].lightGradient,
    };

    const selectedIcon = ICON_OPTIONS.find(i => i.value === icon);

    return (
      <div className="mt-6 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-bold text-gray-700">Preview</h4>
          <span className="text-xs text-gray-500">How it will look in the scroll bar</span>
        </div>
        <div className="bg-white p-4 rounded-lg overflow-hidden">
          <div className={`
            relative bg-gradient-to-br ${previewItem.lightGradient}
            backdrop-blur-sm
            rounded-xl
            border border-slate-200/60
            shadow-md
            overflow-hidden
            max-w-[340px]
          `}>
            <div className={`absolute inset-0 bg-gradient-to-r ${previewItem.gradient} opacity-5 rounded-xl`}></div>
            
            <div className="relative bg-white/80 backdrop-blur-md rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className={`
                  flex-shrink-0 w-10 h-10
                  rounded-xl
                  bg-gradient-to-br ${previewItem.gradient}
                  flex items-center justify-center
                  text-white text-xl
                  shadow-lg
                `}>
                  {selectedIcon?.icon || '✨'}
                </div>

                <div className="flex-1 min-w-0">
                  <div className={`
                    inline-flex items-center gap-1 px-2 py-0.5 rounded-md mb-1
                    bg-gradient-to-r ${previewItem.gradient}
                    text-white text-[10px] font-bold uppercase tracking-wider
                    shadow-sm
                  `}>
                    <span className="w-1 h-1 rounded-full bg-white/80"></span>
                    {previewItem.badge}
                  </div>

                  <h3 className="text-slate-800 font-semibold text-sm leading-tight">
                    {previewItem.title}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- LIST VIEW ---
  if (view === 'list') {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center font-sans text-gray-900 overflow-x-hidden">
        <div className="w-full max-w-5xl p-4 md:p-6 lg:p-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 lg:mb-10 border-b border-gray-200 pb-4 md:pb-6 gap-3 md:gap-4">
            <div className="w-full md:w-auto">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600">
                News Management
              </h1>
              <p className="text-gray-500 font-medium mt-1 md:mt-2 text-xs md:text-sm lg:text-base">Manage your Sparkle news scroll bar</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <a
                href="/admin"
                className="flex-1 md:flex-none bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 md:px-5 py-2.5 md:py-3 rounded-full font-bold text-sm md:text-base shadow-lg transform hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                ← Back to Admin
              </a>
              <button 
                onClick={() => {
                  setBadge('New Batch');
                  setCustomBadge('');
                  setTitle('');
                  setIcon('sparkles');
                  setSelectedGradient(0);
                  setEditingId(null);
                  setView('create');
                }}
                className="flex-1 md:flex-none bg-gradient-to-r from-blue-600 to-red-600 hover:opacity-90 text-white px-5 md:px-6 lg:px-8 py-2.5 md:py-3 rounded-full font-bold text-sm md:text-base shadow-lg transform hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <span className="text-lg">＋</span> <span>Create News</span>
              </button>
            </div>
          </div>

          <div className="grid gap-4">
            {news.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-200">
                <p className="text-gray-400 text-xl font-medium">No news items found.</p>
                <p className="text-gray-400 text-sm mt-2">Click the button above to create your first news item.</p>
              </div>
            ) : (
              news.map(item => {
                const selectedIcon = ICON_OPTIONS.find(i => i.value === item.icon);
                return (
                  <div key={item.id} className="bg-white p-3 md:p-4 lg:p-5 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 group hover:shadow-md transition-all overflow-hidden">
                    <div className="flex flex-col gap-3 md:gap-4">
                      <div className="flex items-start gap-2.5 md:gap-3 lg:gap-4 min-w-0">
                        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white text-2xl flex-shrink-0`}>
                          {selectedIcon?.icon || '📰'}
                        </div>
                        <div className="flex-1 min-w-0 overflow-hidden">
                          <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md mb-1 bg-gradient-to-r ${item.gradient} text-white text-[10px] md:text-xs font-bold uppercase`}>
                            {item.badge}
                          </div>
                          <h3 className="font-bold text-gray-900 text-sm md:text-base lg:text-lg mb-1 line-clamp-2">{item.title}</h3>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>Icon: {selectedIcon?.label || item.icon}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 w-full">
                        <button 
                          onClick={() => handleEdit(item)}
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 text-gray-600 font-bold text-xs hover:bg-gray-50 hover:text-blue-600 transition-all"
                        >
                          <svg className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          <span className="truncate">Edit</span>
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)} 
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
                );
              })
            )}
          </div>
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
      </div>
    );
  }

  // --- CREATE VIEW ---
  return (
    <>
    <div className="min-h-screen bg-gray-50 pb-20 font-sans text-gray-900 overflow-x-hidden">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200 px-3 md:px-6 lg:px-8 py-2.5 md:py-3 lg:py-4 flex justify-between items-center shadow-sm">
        <button 
          onClick={() => setView('list')}
          className="bg-white border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-500 w-9 h-9 md:w-auto md:h-auto md:px-4 lg:px-5 md:py-2 rounded-full font-bold text-xs md:text-sm flex items-center justify-center gap-1.5 md:gap-2 transition-all shadow-sm flex-shrink-0"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          <span className="hidden md:inline">Back to List</span>
        </button>
        <button 
          onClick={handlePublish}
          className="bg-gradient-to-r from-blue-600 to-red-600 text-white px-4 md:px-6 lg:px-8 py-1.5 md:py-2 lg:py-2.5 rounded-full text-xs md:text-sm font-bold transition-all shadow-lg hover:shadow-xl hover:opacity-90 flex items-center gap-1 md:gap-2 transform active:scale-95 whitespace-nowrap"
        >
          <span className="hidden sm:inline">{editingId ? 'Update News' : 'Publish News'}</span>
          <span className="sm:hidden">{editingId ? 'Update' : 'Publish'}</span>
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-3 md:px-4 lg:px-6 py-4 md:py-6 lg:py-10">
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-red-600 h-2 w-full"></div>

          <div className="p-3 md:p-6 lg:p-10 xl:p-12 space-y-5 md:space-y-8 lg:space-y-10">
            
            {/* Badge */}
            <div>
              <label className="block text-xs font-extrabold text-blue-600 uppercase tracking-widest mb-2 md:mb-3">
                Badge Category <span className="text-red-500">*</span>
              </label>
              <select 
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full bg-gray-50 px-3 md:px-4 py-2.5 md:py-3 rounded-xl border-none font-bold text-sm md:text-base text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
              >
                {BADGE_OPTIONS.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
              {badge === 'Other' && (
                <input 
                  type="text" 
                  value={customBadge}
                  onChange={(e) => setCustomBadge(e.target.value)}
                  className="mt-3 w-full bg-blue-50 px-3 md:px-4 py-2.5 md:py-3 rounded-xl border border-blue-200 font-bold text-sm md:text-base text-blue-800 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter custom badge text"
                />
              )}
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-extrabold text-blue-600 uppercase tracking-widest mb-2 md:mb-3">
                News Headline <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-2">Write a clear, engaging headline for your news announcement</p>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-xl md:text-2xl lg:text-3xl font-bold placeholder-gray-300 border-none focus:ring-0 p-0 outline-none text-gray-900 leading-tight"
                placeholder="e.g., IELTS Intensive Batch Starting Jan 25th"
              />
            </div>

            {/* Icon */}
            <div className="pt-6 md:pt-8 border-t border-gray-100">
              <label className="block text-xs font-extrabold text-blue-600 uppercase tracking-widest mb-3 md:mb-4">Select Icon</label>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {ICON_OPTIONS.map((iconOption) => (
                  <button
                    key={iconOption.value}
                    type="button"
                    onClick={() => setIcon(iconOption.value)}
                    className={`p-3 md:p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                      icon === iconOption.value 
                        ? 'border-blue-600 bg-blue-50 ring-4 ring-blue-100' 
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-3xl md:text-4xl">{iconOption.icon}</span>
                    <span className="text-xs font-bold text-gray-700">{iconOption.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Gradient */}
            <div className="pt-6 md:pt-8 border-t border-gray-100">
              <label className="block text-xs font-extrabold text-blue-600 uppercase tracking-widest mb-3 md:mb-4">Color Theme</label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {GRADIENT_PRESETS.map((preset, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedGradient(index)}
                    className={`p-3 md:p-4 rounded-xl border-2 transition-all ${selectedGradient === index ? 'border-blue-600 ring-4 ring-blue-100' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <div className={`h-10 md:h-12 rounded-lg bg-gradient-to-r ${preset.gradient} mb-2`}></div>
                    <p className="text-xs font-bold text-gray-700">{preset.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Preview */}
            <PreviewNews />

          </div>
        </div>
      </div>

      {/* Modals */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {loadingMessage && (
        <LoadingModal message={loadingMessage} />
      )}
    </div>
    </>
  );
}
