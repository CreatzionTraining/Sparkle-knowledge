'use client';

import React, { useState, useEffect } from 'react';
import { Toast, ConfirmModal, LoadingModal } from '@/components/Modals';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    score: string;
    rating: number;
    text: string;
    location: string;
}

export default function TestimonialsAdmin() {
    const [view, setView] = useState<'list' | 'create'>('list');
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

    const [editingId, setEditingId] = useState<number | null>(null);
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [score, setScore] = useState('');
    const [rating, setRating] = useState(5);
    const [text, setText] = useState('');
    const [location, setLocation] = useState('Student');

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
    const [confirmDialog, setConfirmDialog] = useState<{ title: string; message: string; onConfirm: () => void; onCancel: () => void; } | null>(null);
    const [loadingMessage, setLoadingMessage] = useState<string | null>(null);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const res = await fetch('/api/testimonials');
            const data = await res.json();
            if (data.success) setTestimonials(data.testimonials);
        } catch (error) { console.error('Error fetching testimonials'); }
    };

    const handleDelete = async (id: number) => {
        setConfirmDialog({
            title: 'Delete Testimonial',
            message: 'Are you sure you want to permanently delete this testimonial?',
            onConfirm: async () => {
                setConfirmDialog(null);
                setLoadingMessage('Deleting testimonial...');
                try {
                    await fetch('/api/testimonials', {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id })
                    });
                    setToast({ message: 'Testimonial deleted successfully', type: 'success' });
                    fetchTestimonials();
                } catch {
                    setToast({ message: 'Error deleting testimonial', type: 'error' });
                } finally {
                    setLoadingMessage(null);
                }
            },
            onCancel: () => setConfirmDialog(null)
        });
    };

    const handleEdit = (testimonial: Testimonial) => {
        setEditingId(testimonial.id);
        setName(testimonial.name);
        setRole(testimonial.role);
        setScore(testimonial.score);
        setRating(testimonial.rating);
        setText(testimonial.text);
        setLocation(testimonial.location);
        setView('create');
    };

    const handlePublish = async () => {
        if (!name || !role || !text) {
            setToast({ message: 'Please fill in all required fields.', type: 'error' });
            return;
        }

        setLoadingMessage(editingId ? 'Updating testimonial...' : 'Saving testimonial...');
        setIsSubmitting(true);

        const data = {
            id: editingId || Date.now(),
            name,
            role,
            score,
            rating,
            text,
            location
        };

        try {
            const method = editingId ? 'PUT' : 'POST';
            await fetch('/api/testimonials', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            setToast({ message: editingId ? 'Updated Successfully!' : 'Saved Successfully!', type: 'success' });

            if (!editingId) {
                setView('list');
            }
            fetchTestimonials();

            if (!editingId) {
                setName('');
                setRole('');
                setScore('');
                setRating(5);
                setText('');
                setLocation('Student');
            }
            setEditingId(null);
        } catch (error) {
            setToast({ message: 'Failed to save', type: 'error' });
        } finally {
            setLoadingMessage(null);
            setIsSubmitting(false);
        }
    };

    if (view === 'list') {
        return (
            <div className="h-screen overflow-y-auto w-full bg-gray-50 flex justify-center font-sans text-gray-900 overflow-x-hidden">
                <div className="w-full max-w-5xl p-4 md:p-6 lg:p-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 lg:mb-10 border-b border-gray-200 pb-4 md:pb-6 gap-3 md:gap-4">
                        <div className="w-full md:w-auto">
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-600">
                                Testimonials Admin
                            </h1>
                            <p className="text-gray-500 font-medium mt-1 md:mt-2 text-xs md:text-sm lg:text-base">Manage student success stories</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 md:gap-3 w-full md:w-auto">
                            <a href="/admin" className="w-full sm:w-auto bg-white border border-gray-200 hover:border-blue-500 text-gray-700 px-4 py-2 rounded-full font-bold text-sm md:text-base shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2">
                                Back to Main
                            </a>
                            <button
                                onClick={() => {
                                    setEditingId(null);
                                    setName('');
                                    setRole('');
                                    setScore('');
                                    setRating(5);
                                    setText('');
                                    setLocation('Student');
                                    setView('create');
                                }}
                                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-red-600 hover:opacity-90 text-white px-5 md:px-6 lg:px-8 py-2.5 md:py-3 rounded-full font-bold text-sm md:text-base shadow-lg transform hover:scale-105 transition-all flex items-center justify-center gap-2"
                            >
                                <span className="text-lg">＋</span> <span>Add Testimonial</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid gap-4">
                        {testimonials.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-200">
                                <p className="text-gray-400 text-xl font-medium">No testimonials found.</p>
                            </div>
                        ) : (
                            testimonials.map(item => (
                                <div key={item.id} className="bg-white p-4 lg:p-5 rounded-2xl shadow-sm border border-gray-100 group transition-all">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                                            <p className="text-sm text-gray-500 mt-1">{item.role} • <span className="text-blue-600 font-semibold">{item.score}</span></p>
                                        </div>
                                        <div className="flex items-center gap-2 w-full md:w-auto">
                                            <button onClick={() => handleEdit(item)} className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 font-bold text-xs hover:bg-gray-50 flex-1 md:flex-none">Edit</button>
                                            <button onClick={() => handleDelete(item.id)} className="px-4 py-2 rounded-lg bg-red-50 text-red-600 font-bold text-xs hover:bg-red-100 flex-1 md:flex-none">Delete</button>
                                        </div>
                                    </div>
                                    <p className="mt-4 text-sm text-gray-600 italic line-clamp-2">"{item.text}"</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
                {confirmDialog && <ConfirmModal title={confirmDialog.title} message={confirmDialog.message} onConfirm={confirmDialog.onConfirm} onCancel={confirmDialog.onCancel} />}
                {loadingMessage && <LoadingModal message={loadingMessage} />}
            </div>
        );
    }

    return (
        <div className="h-screen overflow-y-auto w-full bg-gray-50 pb-20 font-sans text-gray-900 overflow-x-hidden">
            <div className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200 px-4 py-3 flex justify-between items-center shadow-sm">
                <button onClick={() => setView('list')} className="bg-white border text-gray-600 px-4 py-2 rounded-full font-bold text-sm">Cancel</button>
                <button onClick={handlePublish} disabled={isSubmitting} className="bg-gradient-to-r from-blue-600 to-red-600 text-white px-6 py-2 rounded-full font-bold text-sm">
                    {editingId ? 'Update' : 'Save'} Testimonial
                </button>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-red-600 h-2 w-full"></div>
                    <div className="p-6 md:p-10 space-y-6">

                        <div>
                            <label className="block text-xs font-extrabold text-blue-600 uppercase mb-2">Student Name *</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 font-bold text-gray-700 outline-none focus:border-blue-500" placeholder="John Doe" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-extrabold text-blue-600 uppercase mb-2">Role/Course *</label>
                                <input type="text" value={role} onChange={(e) => setRole(e.target.value)} className="w-full bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 font-bold text-gray-700 outline-none focus:border-blue-500" placeholder="IELTS Student" />
                            </div>
                            <div>
                                <label className="block text-xs font-extrabold text-blue-600 uppercase mb-2">Score/Achievement</label>
                                <input type="text" value={score} onChange={(e) => setScore(e.target.value)} className="w-full bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 font-bold text-gray-700 outline-none focus:border-blue-500" placeholder="Band 8.0" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-extrabold text-blue-600 uppercase mb-2">Rating (1-5)</label>
                                <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(parseInt(e.target.value) || 5)} className="w-full bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 font-bold text-gray-700 outline-none focus:border-blue-500" />
                            </div>
                            <div>
                                <label className="block text-xs font-extrabold text-blue-600 uppercase mb-2">Location/Type</label>
                                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 font-bold text-gray-700 outline-none focus:border-blue-500" placeholder="Student" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-extrabold text-blue-600 uppercase mb-2">Review Text *</label>
                            <textarea value={text} onChange={(e) => setText(e.target.value)} rows={5} className="w-full bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 font-medium text-gray-700 outline-none focus:border-blue-500" placeholder="Write quote here..." />
                        </div>

                    </div>
                </div>
            </div>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            {loadingMessage && <LoadingModal message={loadingMessage} />}
        </div>
    );
}
